const grid = document.getElementById('grid');
const errorEl = document.getElementById('error');

const money = (cents, cur) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: cur.toUpperCase() }).format(cents / 100);

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function buy(slug, btn) {
  btn.disabled = true;
  errorEl.textContent = '';
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ items: [slug] }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    location.href = data.url;
  } catch (e) {
    errorEl.textContent = e.message || 'No se pudo iniciar el pago.';
    btn.disabled = false;
  }
}

try {
  const products = await (await fetch('/api/products')).json();
  grid.innerHTML = products.map((p) => `
    <article class="card">
      <div class="art" style="background:linear-gradient(135deg,${p.accent[0]},${p.accent[1]})" aria-hidden="true">${esc(p.name[0])}</div>
      <div class="body">
        <h3>${esc(p.name)}</h3>
        <p class="tag">${esc(p.tagline)}</p>
        <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <div class="buy">
          <span class="price">${money(p.price, p.currency)}</span>
          <button class="btn" data-slug="${esc(p.slug)}">Comprar</button>
        </div>
      </div>
    </article>`).join('');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-slug]');
    if (btn) buy(btn.dataset.slug, btn);
  });
} catch {
  errorEl.textContent = 'No se pudo cargar el catálogo.';
}
