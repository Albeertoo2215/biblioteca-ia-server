import { json } from '../_lib/stripe.js';

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function verify(body, header, secret) {
  const parts = Object.fromEntries((header || '').split(',').map((kv) => kv.split('=')));
  if (!parts.t || !parts.v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const expected = hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${parts.t}.${body}`)));
  if (expected.length !== parts.v1.length) return false;
  let diff = 0; // comparación en tiempo constante
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ parts.v1.charCodeAt(i);
  return diff === 0;
}

// POST /api/webhook  (Stripe -> tu web). La descarga NO depende de este webhook:
// se valida contra Stripe en /api/download. Úsalo para avisos, p. ej. un email tuyo.
export async function onRequestPost({ request, env }) {
  const body = await request.text();
  if (!(await verify(body, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET))) {
    return json({ error: 'Firma no válida' }, 400);
  }
  const event = JSON.parse(body);
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    console.log('Venta', s.id, s.metadata?.products, s.amount_total, s.customer_details?.email);
  }
  return json({ received: true });
}
