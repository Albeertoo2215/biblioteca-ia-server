/**
 * ════════════════════════════════════════════════════════════════
 * BIBLIOTECA IA — Servidor Backend
 * Node.js + Express + Stripe + Supabase + Resend
 * ════════════════════════════════════════════════════════════════
 */

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const stripe   = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const app = express();

// ── Clientes de servicios externos ───────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // service_role: acceso total (solo backend)
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ── CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      process.env.FRONTEND_URL,
      'http://localhost:5500',
      'http://127.0.0.1:5500',
    ];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
}));

// ── IMPORTANTE: el webhook de Stripe necesita el body RAW ────
// Por eso lo registramos antes de express.json()
app.post('/webhook/stripe',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// Para el resto de rutas, parsear JSON normal
app.use(express.json());

// ════════════════════════════════════════════════════════════════
// RUTA: Crear sesión de Stripe Checkout
// POST /api/create-checkout-session
// Body: { items, userId, userEmail }
// ════════════════════════════════════════════════════════════════
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, userId, userEmail } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Convertir items del carrito a line_items de Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.type === 'module'
            ? `Módulo individual — ${item.group || 'Biblioteca IA'}`
            : item.type === 'group'
            ? `Pack completo de grupo — Biblioteca IA`
            : 'Biblioteca IA Completa (52 módulos)',
        },
        unit_amount: Math.round(item.price * 100), // en céntimos
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: userEmail || undefined,

      // Tras el pago, redirigir con el session_id en la URL
      success_url: `${process.env.FRONTEND_URL}/confirmacion.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.FRONTEND_URL}/checkout.html`,

      // Metadatos para recuperar en el webhook
      metadata: {
        userId:  userId  || 'guest',
        itemIds: JSON.stringify(items.map(i => i.id)),
        // Guardamos info extra por si se necesita en el email
        itemNames: JSON.stringify(items.map(i => i.name)),
        itemPrices: JSON.stringify(items.map(i => i.price)),
      },

      locale: 'es',
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error('[Stripe] Error creando sesión:', err.message);
    res.status(500).json({ error: 'No se pudo crear la sesión de pago' });
  }
});

// ════════════════════════════════════════════════════════════════
// RUTA: Webhook de Stripe
// POST /webhook/stripe
// Se dispara automáticamente cuando un pago se completa
// ════════════════════════════════════════════════════════════════
async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  // Verificar que el evento viene realmente de Stripe
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('[Webhook] Firma inválida:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Solo nos interesa el evento de pago completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      await processPaidOrder(session);
    } catch (err) {
      console.error('[Webhook] Error procesando pago:', err.message);
      // Devolvemos 200 para que Stripe no reintente — ya lo logueamos
    }
  }

  res.json({ received: true });
}

// ── Procesar un pago completado ───────────────────────────────
async function processPaidOrder(session) {
  const { userId, itemIds, itemNames, itemPrices } = session.metadata;
  const userEmail = session.customer_email || session.customer_details?.email;

  const ids    = JSON.parse(itemIds    || '[]');
  const names  = JSON.parse(itemNames  || '[]');
  const prices = JSON.parse(itemPrices || '[]');

  console.log(`[Webhook] Procesando pago de ${userEmail} — ${ids.length} producto(s)`);

  // 1. Guardar cada compra en Supabase
  if (userId && userId !== 'guest') {
    const purchases = ids.map(productId => ({
      user_id:           userId,
      product_id:        productId,
      stripe_session_id: session.id,
    }));

    const { error: dbError } = await supabase
      .from('purchases')
      .upsert(purchases, { onConflict: 'user_id,product_id,stripe_session_id' });

    if (dbError) {
      console.error('[Supabase] Error guardando compras:', dbError.message);
    } else {
      console.log(`[Supabase] ${ids.length} compra(s) guardadas para ${userId}`);
    }
  }

  // 2. Generar enlaces de descarga firmados (24h) para cada producto
  const downloadLinks = await generateDownloadLinks(ids, names);

  // 3. Enviar email de confirmación con Resend
  if (userEmail) {
    await sendConfirmationEmail({
      email:         userEmail,
      downloadLinks,
      items:         names.map((name, i) => ({ name, price: prices[i] })),
      total:         session.amount_total / 100,
    });
  }
}

// ── Generar enlaces firmados desde Supabase Storage ──────────
async function generateDownloadLinks(productIds, productNames) {
  const links = [];

  for (let i = 0; i < productIds.length; i++) {
    const id   = productIds[i];
    const name = productNames[i] || id;

    // Buscar el file_path en la tabla products
    const { data: product } = await supabase
      .from('products')
      .select('file_path')
      .eq('id', id)
      .single();

    if (product?.file_path) {
      // Crear URL firmada que expira en 24 horas
      const { data: signed } = await supabase.storage
        .from('modulos')
        .createSignedUrl(product.file_path, 86400, { download: true });

      links.push({ name, url: signed?.signedUrl || null });
    } else {
      // Si el producto no tiene archivo en Storage, apuntar a la biblioteca
      links.push({ name, url: null });
    }
  }

  return links;
}

// ── Enviar email con Resend ───────────────────────────────────
async function sendConfirmationEmail({ email, downloadLinks, items, total }) {
  const orderDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const htmlEmail = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','DM Sans',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#16161f;border-radius:16px;overflow:hidden;border:1px solid #2a2a38;">

    <!-- Cabecera -->
    <div style="background:linear-gradient(135deg,#6c63ff,#00d4aa);padding:40px 32px;text-align:center;">
      <div style="font-size:2.8rem;margin-bottom:10px;">📚</div>
      <h1 style="color:#fff;font-size:1.7rem;font-weight:800;margin:0;letter-spacing:-0.02em;">BIBLIOTECA IA</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:1rem;">Tu acceso está listo</p>
    </div>

    <!-- Cuerpo -->
    <div style="padding:40px 32px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div style="display:inline-block;background:rgba(0,212,170,0.1);border:1px solid rgba(0,212,170,0.3);border-radius:100px;padding:10px 24px;color:#00d4aa;font-size:0.9rem;font-weight:600;">
          ✅ ¡Compra confirmada!
        </div>
      </div>

      <p style="color:#ccc;font-size:1rem;line-height:1.7;margin:0 0 28px;text-align:center;">
        Aquí tienes tus <strong style="color:#fff;">enlaces de descarga</strong>.<br/>
        Los enlaces son <strong style="color:#ff9f43;">personales y expiran en 24 horas</strong>.
      </p>

      <!-- Lista de productos -->
      <div style="background:#111118;border:1px solid #2a2a38;border-radius:12px;overflow:hidden;margin-bottom:28px;">
        <div style="padding:14px 20px;border-bottom:1px solid #2a2a38;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#5a5a72;">
          Productos adquiridos
        </div>

        ${downloadLinks.map(link => `
        <div style="padding:16px 20px;border-bottom:1px solid #2a2a38;display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <div>
            <div style="font-size:0.68rem;color:#6c63ff;font-family:monospace;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">📄 Módulo</div>
            <div style="color:#f0f0f5;font-weight:600;font-size:0.92rem;">${link.name}</div>
          </div>
          ${link.url
            ? `<a href="${link.url}" style="background:#6c63ff;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:0.82rem;font-weight:700;white-space:nowrap;flex-shrink:0;">⬇ Descargar</a>`
            : `<span style="color:#555;font-size:0.8rem;">Accede en Mi Biblioteca</span>`
          }
        </div>
        `).join('')}

        <div style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#888;font-size:0.87rem;">Total pagado</span>
          <span style="color:#00d4aa;font-family:monospace;font-size:1.1rem;font-weight:700;">${total}€</span>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:32px 0;">
        <a href="${process.env.FRONTEND_URL}/biblioteca.html"
           style="background:#6c63ff;color:#fff;text-decoration:none;padding:16px 36px;border-radius:10px;font-weight:700;font-size:1rem;display:inline-block;letter-spacing:-0.01em;">
          📚 Ir a mi Biblioteca →
        </a>
      </div>

      <!-- Aviso copyright -->
      <div style="background:#111118;border:1px solid #2a2a38;border-radius:8px;padding:16px 18px;">
        <p style="color:#5a5a72;font-size:0.78rem;margin:0;line-height:1.7;">
          🔒 <strong style="color:#888;">Acceso personal e intransferible.</strong>
          Este contenido está protegido por copyright. Su distribución, reproducción o reventa está estrictamente prohibida.
        </p>
      </div>
    </div>

    <!-- Pie -->
    <div style="padding:20px 32px;border-top:1px solid #2a2a38;background:#111118;text-align:center;">
      <p style="color:#5a5a72;font-size:0.72rem;line-height:1.8;margin:0;">
        © 2025 BIBLIOTECA IA · Todos los derechos reservados<br/>
        Email enviado a <strong>${email}</strong> el ${orderDate}.<br/>
        <a href="mailto:soporte@bibliotecaia.com" style="color:#6c63ff;text-decoration:none;">soporte@bibliotecaia.com</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from:    'Biblioteca IA <onboarding@resend.dev>',
      to:      'biblioteca-ia@outlook.es', // TODO: cambiar a `email` cuando tengas dominio propio
      subject: '✅ Tu compra en Biblioteca IA — acceso y descargas',
      html:    htmlEmail,
    });
    console.log('[Resend] Email enviado a', email);
  } catch (err) {
    console.error('[Resend] Error enviando email:', err.message);
    // No lanzar error — el pago ya fue procesado
  }
}

// ════════════════════════════════════════════════════════════════
// RUTA: Generar enlace de descarga bajo demanda
// POST /api/download
// Body: { productId }
// Headers: Authorization: Bearer <supabase-access-token>
// ════════════════════════════════════════════════════════════════
app.post('/api/download', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    // Verificar el token de Supabase y obtener el usuario
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Falta el productId' });
    }

    // Verificar que el usuario ha comprado este producto
    const { data: purchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .maybeSingle();

    if (!purchase) {
      return res.status(403).json({ error: 'No tienes acceso a este producto' });
    }

    // Obtener el file_path del producto
    const { data: product } = await supabase
      .from('products')
      .select('file_path')
      .eq('id', productId)
      .single();

    if (!product?.file_path) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Generar URL firmada (expira en 24h)
    const { data: signed, error: storageError } = await supabase.storage
      .from('modulos')
      .createSignedUrl(product.file_path, 86400);

    if (storageError) {
      return res.status(500).json({ error: 'Error generando enlace de descarga' });
    }

    res.json({ url: signed.signedUrl });

  } catch (err) {
    console.error('[Download] Error:', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ════════════════════════════════════════════════════════════════
// RUTA: Obtener compras del usuario
// GET /api/my-purchases
// Headers: Authorization: Bearer <supabase-access-token>
// ════════════════════════════════════════════════════════════════
app.get('/api/my-purchases', async (req, res) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ error: 'No autenticado' });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Token inválido' });

    const { data: purchases, error: dbError } = await supabase
      .from('purchases')
      .select('product_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (dbError) throw dbError;

    res.json({ purchases: purchases || [] });

  } catch (err) {
    console.error('[Purchases] Error:', err.message);
    res.status(500).json({ error: 'Error obteniendo compras' });
  }
});

// ── Health check ──────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'Biblioteca IA Backend' }));

// ── Iniciar servidor ──────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Biblioteca IA corriendo en http://localhost:${PORT}`);
  console.log(`   Webhook Stripe: POST http://localhost:${PORT}/webhook/stripe`);
  console.log(`   Frontend esperado en: ${process.env.FRONTEND_URL || 'no configurado'}\n`);
});
