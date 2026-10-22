import { findProduct, json, paidSession, purchasedSlugs } from '../_lib/stripe.js';

// GET /api/download?session_id=cs_...&product=slug
// Solo entrega el archivo si Stripe confirma que esa sesión está pagada e incluye ese producto.
export async function onRequestGet({ request, env }) {
  const q = new URL(request.url).searchParams;
  const slug = q.get('product');
  const product = findProduct(slug);
  if (!product) return json({ error: 'Producto no encontrado' }, 404);

  let session;
  try {
    session = await paidSession(env, q.get('session_id'));
  } catch (e) {
    return json({ error: e.message }, 502);
  }
  if (!session || !purchasedSlugs(session).includes(slug)) return json({ error: 'No autorizado' }, 403);

  const file = await env.FILES.get(product.file);
  if (!file) return json({ error: 'Archivo no disponible, contacta con soporte' }, 404);

  return new Response(file.body, {
    headers: {
      'content-type': file.httpMetadata?.contentType || 'application/octet-stream',
      'content-disposition': `attachment; filename="${product.file}"`,
      'cache-control': 'private, no-store',
    },
  });
}
