const rows = document.getElementById('rows');
const feature = document.getElementById('feature');
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

// Aparición al entrar en pantalla, una sola vez
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
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
addEventListener('pageshow', () => document.querySelectorAll('[aria-busy="true"]').forEach((b) => b.removeAttribute('aria-busy')));
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-slug]');
  if (btn) buy(btn.dataset.slug, btn);
});

// Portada: imagen real del producto si existe; si no, portada tipográfica con su color
const cover = (p) => `
  <div class="cover" style="--c:${esc(p.color)}">
    ${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : ''}
    ${p.format ? `<span class="fmt">${esc(p.format)}</span>` : '<span></span>'}
    ${p.image ? '' : `<span class="t">${esc(p.name)}</span>`}
  </div>`;

const buyBtn = (p) => `<button class="btn" type="button" data-slug="${esc(p.slug)}" aria-label="Comprar ${esc(p.name)}">Comprar</button>`;

const rowHTML = (p, i) => `
  <article class="row reveal" style="--i:${i}">
    ${cover(p)}
    <div class="info">
      ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
      <h3>${esc(p.name)}</h3>
      <p class="desc">${esc(p.description)}</p>
      <ul class="feats">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    </div>
    <div class="buy"><span class="price">${money(p.price, p.currency)}</span>${buyBtn(p)}</div>
  </article>`;

const featureHTML = (p) => `
  <div class="feature-back" aria-hidden="true"></div>
  <article class="feature-card">
    ${cover(p)}
    <div class="meta">
      <p>${esc(p.tagline)}</p>
      <div><span class="price">${money(p.price, p.currency)}</span>${buyBtn(p)}</div>
    </div>
  </article>`;

try {
  const products = await (await fetch('/api/products')).json();
  const featured = products.find((p) => p.featured) || products[0];
  if (featured) feature.innerHTML = featureHTML(featured);
  else feature.hidden = true;
  document.getElementById('count').textContent = `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`;
  rows.innerHTML = products.map(rowHTML).join('');
  rows.removeAttribute('aria-busy');
  observe(rows);
} catch {
  rows.innerHTML = '';
  feature.hidden = true;
  errorEl.textContent = 'No se pudo cargar el catálogo. Recarga la página.';
}
