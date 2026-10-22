// Animación: GSAP + ScrollTrigger + Lenis (public/vendor). Sin ellos, o con reduced-motion, la página queda estática y completa.
const { gsap, ScrollTrigger, Lenis } = window;
const motion = document.documentElement.classList.contains('js') && gsap && ScrollTrigger;
if (!motion) document.documentElement.classList.remove('js');
else gsap.registerPlugin(ScrollTrigger);
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

const cardsEl = document.getElementById('cards');
const errorEl = document.getElementById('error');
document.getElementById('year').textContent = new Date().getFullYear();

const money = (cents, cur) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: cur.toUpperCase() }).format(cents / 100);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Parte un texto en palabras: <span class="w"><span class="wi">palabra</span></span>
function splitWords(el) {
  el.innerHTML = el.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w"><span class="wi">${esc(w)}</span></span>`).join(' ');
  el.classList.add('ready');
  return el.querySelectorAll('.wi');
}

/* ── Scroll suave + navegación ── */
let lenis = null;
if (motion && Lenis) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { offset: -56, duration: 1.4 });
  else target.scrollIntoView({ behavior: 'smooth' });
});

const nav = document.querySelector('.nav');
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 4);
  nav.classList.toggle('hide', motion && y > 480 && y > lastY);
  lastY = y;
}, { passive: true });

/* ── Compra ── */
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

/* ── Plantillas ── */
const cover = (p) => `
  <div class="cover" style="--c:${esc(p.color)}">
    ${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : ''}
    ${p.format ? `<span class="fmt">${esc(p.format)}</span>` : '<span></span>'}
    ${p.image ? '' : `<span class="t">${esc(p.name)}</span>`}
  </div>`;

const cardHTML = (p) => `
  <article class="card" data-cat="${esc(p.category || '')}" data-text="${esc([p.name, p.tagline, p.description, p.catName, ...(p.tags || [])].join(' ').toLowerCase())}">
    <div class="card-in">
      <div class="stage">${cover(p)}</div>
      <div class="body">
        ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
        ${p.catName ? `<span class="kind">${esc(p.catName)}</span>` : ''}
        <h3>${esc(p.name)}</h3>
        <p class="desc">${esc(p.description)}</p>
        <ul class="feats">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <div class="buy">
          <span class="price">${money(p.price, p.currency)}</span>
          <button class="btn" type="button" data-slug="${esc(p.slug)}" aria-label="Comprar ${esc(p.name)}">Comprar</button>
        </div>
      </div>
    </div>
  </article>`;

/* ── Animaciones ── */
// Arranca una vez cuando el elemento entra en pantalla
function onView(el, fn, threshold = 0.3) {
  if (!el) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fn(); } }), { threshold });
  io.observe(el);
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const countUp = (el, ms, delay = 0) => {
  const t0 = performance.now() + delay;
  const tick = (t) => { const p = Math.max(0, Math.min(1, (t - t0) / ms)); el.textContent = `${Math.round(100 * (1 - (1 - p) ** 3))} %`; if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
};

function heroIntro() {
  const words = splitWords(document.querySelector('[data-split="hero"]'));
  if (!motion) return;
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from('.glass', { y: 40, opacity: 0, scale: 0.96, duration: 1.2 })
    .from(words, { y: 40, opacity: 0, filter: 'blur(12px)', duration: 1.1, stagger: 0.06 }, '-=0.9')
    .from('.glass [data-fade]', { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.8');
}

// Portada: columnas de portadas de producto que suben y bajan sin parar (decorativo)
function buildMosaic(products) {
  const mosaic = document.getElementById('mosaic');
  if (!products.length) return;
  const tones = [null, 'var(--tint)', 'var(--navy-2)', '#1f8a7a'];
  const cols = Array.from({ length: 6 }, (_, c) => {
    const items = Array.from({ length: 5 }, (_, i) => {
      const n = c * 5 + i;
      const p = products[n % products.length];
      const tone = tones[(c + i) % tones.length];
      return cover({ ...p, image: (n % 3 === 0) && p.image, color: tone || p.color })
        .replace('class="cover"', `class="cover${tone === 'var(--tint)' ? ' light' : ''}"`);
    }).join('');
    return `<div class="col">${items}${items}</div>`; // duplicado para que el bucle no tenga corte
  });
  mosaic.innerHTML = cols.join('');
  requestAnimationFrame(() => mosaic.classList.add('ready'));
}

// Por qué: cada bloque del bento se anima al verse
function bento() {
  const el = document.getElementById('bento');
  const typed = document.getElementById('typed');
  if (!motion) return;
  const text = typed.textContent;
  typed.textContent = '';
  onView(el, () => {
    el.classList.add('play');
    countUp(document.getElementById('dl-pct'), 2200, 400);
    [...text].forEach((ch, i) => setTimeout(() => { typed.textContent += ch; }, 700 + i * 90));
  });
}

// Cómo funciona: los paneles se abren por turnos y cada uno reproduce su escena
function panels() {
  const box = document.getElementById('panels');
  const list = [...box.querySelectorAll('.panel')];
  let current = 0, paused = false, timer = 0, run = 0;

  const moveTo = (cur, scene, target) => {
    const s = scene.getBoundingClientRect(), r = target.getBoundingClientRect();
    cur.style.left = `${((r.left - s.left + r.width * 0.6) / s.width) * 100}%`;
    cur.style.top = `${((r.top - s.top + r.height * 0.6) / s.height) * 100}%`;
  };
  const scenes = {
    async elige(scene, id) {
      const cur = scene.querySelector('.cursor'), btn = scene.querySelector('.sbtn');
      cur.style.left = '85%'; cur.style.top = '20%'; cur.style.opacity = 1;
      await wait(700); if (id !== run) return; moveTo(cur, scene, btn);
      await wait(1100); if (id !== run) return; btn.classList.add('press');
      await wait(220); btn.classList.remove('press');
    },
    async paga(scene, id) {
      const cur = scene.querySelector('.cursor'), btn = scene.querySelector('.sbtn');
      btn.classList.remove('done'); btn.textContent = 'Pagar';
      cur.style.left = '85%'; cur.style.top = '15%'; cur.style.opacity = 1;
      await wait(700); if (id !== run) return; moveTo(cur, scene, btn);
      await wait(1100); if (id !== run) return; btn.classList.add('press');
      await wait(220); btn.classList.remove('press'); btn.classList.add('done'); btn.textContent = '✓ Pagado';
    },
    async descarga(scene) {
      scene.classList.remove('go'); void scene.offsetWidth; scene.classList.add('go');
      countUp(scene.querySelector('.pct'), 1800, 600);
    },
  };
  const open = (i) => {
    current = i; run += 1;
    list.forEach((p, j) => p.classList.toggle('on', j === i));
    if (motion) scenes[list[i].dataset.scene](list[i].querySelector('.scene'), run);
  };
  const loop = () => { clearInterval(timer); timer = setInterval(() => { if (!paused) open((current + 1) % list.length); }, 4800); };

  list.forEach((p, i) => {
    p.addEventListener('mouseenter', () => { paused = true; if (current !== i) open(i); });
    p.addEventListener('mouseleave', () => { paused = false; loop(); });
    p.addEventListener('click', () => { if (current !== i) open(i); loop(); });
    p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); loop(); } });
  });
  if (!motion) return;
  onView(box, () => { open(0); loop(); });
}

// Datos reales del primer producto en las escenas
function fillScenes(products) {
  const p = products.find((x) => x.featured) || products[0];
  if (!p) return;
  const price = money(p.price, p.currency);
  const file = `${p.slug}.${(p.format || 'pdf').toLowerCase()}`;
  document.getElementById('scene-cover').outerHTML = cover(p);
  document.getElementById('scene-name').textContent = p.name;
  document.getElementById('scene-price').textContent = price;
  document.getElementById('scene-price2').textContent = price;
  document.getElementById('scene-file').textContent = file;
  document.getElementById('dl-name').textContent = file;
}

function revealOnScroll() {
  document.querySelectorAll('.split:not([data-split="hero"])').forEach((el) => {
    const words = splitWords(el);
    if (motion) gsap.from(words, { y: 50, opacity: 0, filter: 'blur(10px)', duration: 1.1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  if (!motion) return;
  document.querySelectorAll('[data-fade]').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.from(el, { y: 32, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.from('.tile', { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '#bento', start: 'top 80%' } });
  gsap.from('.panel', { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '#panels', start: 'top 82%' } });
  gsap.from('.closing .btn', { scale: 0.85, opacity: 0, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.closing', start: 'top 70%' } });
}

// Tarjetas del catálogo: entrada en cascada, foco que sigue al cursor e inclinación 3D
function cards() {
  const els = cardsEl.querySelectorAll('.card');
  if (!motion) return;
  gsap.from(els, { y: 100, rotationX: 14, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12,
    scrollTrigger: { trigger: cardsEl, start: 'top 82%' } });
  if (!finePointer) return;
  els.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      gsap.to(card, { rotationY: (x - 0.5) * 8, rotationX: (0.5 - y) * 8, duration: 0.6, ease: 'power3.out' });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }));
  });
}

// Botones magnéticos: se acercan al cursor
function magnetic() {
  if (!motion || !finePointer) return;
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: 'power3.out' });
    });
    btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }));
  });
}

// Catálogo: categorías (píldora que se desliza) + buscador por palabra, sin tildes ni mayúsculas
const norm = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function catalogFilters(products, categories) {
  const cats = document.getElementById('cats'), pill = document.getElementById('pill-bg');
  const q = document.getElementById('q'), pitch = document.getElementById('cat-pitch'), empty = document.getElementById('empty');
  const counts = products.reduce((a, p) => ((a[p.category] = (a[p.category] || 0) + 1), a), {});
  const list = [{ id: '', name: 'Todo', pitch: 'Todo el catálogo a 2,99 €.' }, ...categories.filter((c) => counts[c.id])];
  cats.insertAdjacentHTML('beforeend', list.map((c) => `<button class="cat" role="tab" type="button" data-id="${esc(c.id)}" aria-selected="false">${esc(c.name)} <i>${c.id ? counts[c.id] : products.length}</i></button>`).join(''));
  let current = '';
  const movePill = () => { const b = cats.querySelector('[aria-selected="true"]'); pill.style.width = `${b.offsetWidth}px`; pill.style.transform = `translateX(${b.offsetLeft}px)`; };
  const apply = () => {
    const words = norm(q.value).split(/\s+/).filter(Boolean);
    let k = 0, shown = 0;
    cardsEl.querySelectorAll('.card').forEach((card) => {
      const ok = (!current || card.dataset.cat === current) && words.every((w) => norm(card.dataset.text).includes(w));
      card.classList.toggle('out', !ok); card.classList.remove('enter');
      if (ok) { shown++; void card.offsetWidth; card.style.setProperty('--k', k++); card.classList.add('enter'); }
    });
    empty.hidden = shown > 0;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  };
  const select = (id) => {
    current = id;
    cats.querySelectorAll('.cat').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.id === id)));
    pitch.textContent = list.find((c) => c.id === id).pitch;
    movePill(); apply();
  };
  cats.addEventListener('click', (e) => { const b = e.target.closest('.cat'); if (b) select(b.dataset.id); });
  let t; q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(apply, 120); });
  addEventListener('resize', movePill);
  select('');
}

heroIntro();
bento();
panels();
revealOnScroll();
magnetic();

try {
  const products = await (await fetch('/api/products')).json();
  document.getElementById('count').textContent = `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`;
  const categories = await (await fetch('/api/categories')).json().catch(() => []);
  const catName = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  products.forEach((p) => { p.catName = catName[p.category]; });
  cardsEl.innerHTML = products.map(cardHTML).join('');
  catalogFilters(products, categories);
  cardsEl.removeAttribute('aria-busy');
  buildMosaic(products);
  fillScenes(products);
  cards();
} catch {
  cardsEl.innerHTML = '';
  errorEl.textContent = 'No se pudo cargar el catálogo. Recarga la página.';
}
if (motion) ScrollTrigger.refresh();
