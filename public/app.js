const grid = document.getElementById('grid');
const errorEl = document.getElementById('error');
document.getElementById('year').textContent = new Date().getFullYear();

const money = (cents, cur) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: cur.toUpperCase() }).format(cents / 100);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Nav: separador solo cuando el contenido pasa por debajo
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 4);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Aparición al entrar en pantalla
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: 0.15 });
const observe = (root = document) => root.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
observe();

async function buy(slug, btn) {
  btn.setAttribute('aria-busy', 'true');
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
    errorEl.textContent = e.message || 'No se pudo iniciar el pago. Inténtalo de nuevo.';
    btn.removeAttribute('aria-busy');
  }
}

// Al volver atrás desde Stripe, el navegador puede restaurar el botón en estado "cargando"
addEventListener('pageshow', () => grid.querySelectorAll('[aria-busy]').forEach((b) => b.removeAttribute('aria-busy')));

try {
  const products = await (await fetch('/api/products')).json();
  grid.innerHTML = products.map((p) => `
    <article class="card reveal">
      <div class="art" style="background:linear-gradient(135deg,${esc(p.accent[0])},${esc(p.accent[1])})" aria-hidden="true">${esc(p.name[0])}</div>
      <div class="body">
        ${p.badge ? `<p class="eyebrow">${esc(p.badge)}</p>` : ''}
        <h3>${esc(p.name)}</h3>
        <p class="tag">${esc(p.tagline)}</p>
        <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <div class="buy">
          <span class="price">${money(p.price, p.currency)}</span>
          <button class="btn" type="button" data-slug="${esc(p.slug)}" aria-label="Comprar ${esc(p.name)}">Comprar</button>
        </div>
      </div>
    </article>`).join('');
  grid.removeAttribute('aria-busy');
  observe(grid);
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-slug]');
    if (btn) buy(btn.dataset.slug, btn);
  });
} catch {
  grid.innerHTML = '';
  errorEl.textContent = 'No se pudo cargar el catálogo. Recarga la página.';
}
