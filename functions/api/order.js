import { findProduct, json, paidSession, purchasedSlugs } from '../_lib/stripe.js';

// GET /api/order?session_id=cs_...  ->  productos comprados (para la página de éxito)
export async function onRequestGet({ request, env }) {
  const id = new URL(request.url).searchParams.get('session_id');
  try {
    const session = await paidSession(env, id);
    if (!session) return json({ error: 'Pago no encontrado' }, 404);
    const items = purchasedSlugs(session).map(findProduct).filter(Boolean)
      .map(({ slug, name, tagline }) => ({ slug, name, tagline }));
    return json({ items });
  } catch (e) {
    return json({ error: e.message }, 502);
  }
}
