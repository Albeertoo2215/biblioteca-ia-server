import { findProduct, json, stripe } from '../_lib/stripe.js';

// POST /api/checkout  { "items": ["slug", ...] }  ->  { url }
export async function onRequestPost({ request, env }) {
  let items;
  try {
    ({ items } = await request.json());
  } catch {
    return json({ error: 'Petición no válida' }, 400);
  }
  const products = [...new Set(items || [])].map(findProduct);
  if (!products.length || products.some((p) => !p)) return json({ error: 'Producto no válido' }, 400);

  const origin = new URL(request.url).origin;
  try {
    const session = await stripe(env, 'POST', '/checkout/sessions', {
      mode: 'payment',
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#catalogo`,
      // El precio sale SIEMPRE del servidor, nunca del navegador.
      line_items: products.map((p) => ({
        quantity: 1,
        price_data: {
          currency: p.currency,
          unit_amount: p.price,
          product_data: { name: p.name, description: p.tagline },
        },
      })),
      metadata: { products: products.map((p) => p.slug).join(',') },
    });
    return json({ url: session.url });
  } catch (e) {
    return json({ error: e.message }, 502);
  }
}
