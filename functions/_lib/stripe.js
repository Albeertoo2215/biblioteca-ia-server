// Cliente mínimo de Stripe sobre fetch (sin dependencias, válido en Workers).
import products from '../../data/products.json';

export const catalog = products;
export const findProduct = (slug) => products.find((p) => p.slug === slug);

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// Stripe espera application/x-www-form-urlencoded con claves anidadas: a[0][b]=c
function encode(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v && typeof v === 'object') encode(v, key, out);
    else if (v !== undefined && v !== null) out.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
  }
  return out;
}

export async function stripe(env, method, path, body) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      ...(body && { 'content-type': 'application/x-www-form-urlencoded' }),
    },
    body: body ? encode(body).join('&') : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `Stripe ${res.status}`);
  return data;
}

export const isSessionId = (id) => /^cs_(test|live)_[A-Za-z0-9]+$/.test(id || '');

// Devuelve la sesión solo si está pagada; si no, null.
export async function paidSession(env, sessionId) {
  if (!isSessionId(sessionId)) return null;
  const s = await stripe(env, 'GET', `/checkout/sessions/${sessionId}`);
  return s.payment_status === 'paid' ? s : null;
}

export const purchasedSlugs = (session) => (session.metadata?.products || '').split(',').filter(Boolean);
