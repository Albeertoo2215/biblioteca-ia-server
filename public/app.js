const grid = document.getElementById('grid');
const errorEl = document.getElementById('error');
document.getElementById('year').textContent = new Date().getFullYear();

const money = (cents, cur) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: cur.toUpperCase() }).format(cents / 100);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

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

// Inclinación 3D siguiendo al puntero (solo ratón/trackpad y sin reduced-motion)
function tilt(el, target, max, onMove) {
  if (reduceMotion || !finePointer) return;
  let frame = 0;
  el.addEventListener('pointermove', (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      onMove(x, y);
      target.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
      target.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
    });
  });
  el.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    target.style.removeProperty('--rx');
    target.style.removeProperty('--ry');
    onMove(null);
  });
}

// Escenario del hero: la pila de archivos gira un poco con el ratón
const stage = document.getElementById('stage');
const stack = stage?.querySelector('.stack');
if (stack && !reduceMotion && finePointer) {
  const hero = document.querySelector('.hero');
  hero.addEventListener('pointermove', (e) => {
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    stack.style.setProperty('--sy', `${-6 + x * 16}deg`);
    stack.style.setProperty('--sx', `${12 - y * 10}deg`);
  });
  hero.addEventListener('pointerleave', () => { stack.style.removeProperty('--sy'); stack.style.removeProperty('--sx'); });
}

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

const cardHTML = (p, i) => `
  <article class="card reveal" style="--i:${i}">
    <div class="card-core">
      <div class="art" style="--a1:${esc(p.accent[0])};--a2:${esc(p.accent[1])}" aria-hidden="true">
        <div class="cover"><span class="cover-mark">${esc(p.name[0])}</span><span class="cover-title">${esc(p.name)}</span></div>
      </div>
      <div class="glare"></div>
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
    </div>
  </article>`;

try {
  const products = await (await fetch('/api/products')).json();
  grid.innerHTML = products.map(cardHTML).join('');
  grid.removeAttribute('aria-busy');
  grid.querySelectorAll('.card').forEach((card) => {
    const core = card.querySelector('.card-core');
    tilt(card, core, 5, (x, y) => {
      card.classList.toggle('tilting', x !== null);
      if (x !== null) { core.style.setProperty('--gx', `${x * 100}%`); core.style.setProperty('--gy', `${y * 100}%`); }
    });
  });
  observe(grid);
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-slug]');
    if (btn) buy(btn.dataset.slug, btn);
  });
} catch {
  grid.innerHTML = '';
  errorEl.textContent = 'No se pudo cargar el catálogo. Recarga la página.';
}
