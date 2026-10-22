// Animación: GSAP + ScrollTrigger + Lenis (public/vendor). Sin ellos, o con reduced-motion, la página queda estática y completa.
const { gsap, ScrollTrigger, Lenis } = window;
const motion = document.documentElement.classList.contains('js') && gsap && ScrollTrigger;
if (!motion) document.documentElement.classList.remove('js');
else gsap.registerPlugin(ScrollTrigger);
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

const cardsEl = document.getElementById('cards');
const fan = document.getElementById('fan');
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
  <article class="card">
    <div class="card-in">
      <div class="stage">${cover(p)}</div>
      <div class="body">
        ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ''}
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
function heroIntro() {
  const words = splitWords(document.querySelector('[data-split="hero"]'));
  if (!motion) return;
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(words, { y: 48, opacity: 0, filter: 'blur(12px)', duration: 1.2, stagger: 0.07 })
    .from('.hero [data-fade]', { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.8');
}

// Abanico de portadas: entra al cargar y se abre al hacer scroll
function buildFan(products) {
  const list = products.slice(0, 5);
  fan.innerHTML = list.map(cover).join('');
  const covers = [...fan.children];
  const mid = (covers.length - 1) / 2;
  const rest = (i) => { const k = i - mid; return { xPercent: k * 62, yPercent: Math.abs(k) * 6, rotation: k * 7, zIndex: 10 - Math.abs(Math.round(k)) }; };
  if (!motion) {
    covers.forEach((c, i) => { const r = rest(i); c.style.transform = `translate(${r.xPercent}%, ${r.yPercent}%) rotate(${r.rotation}deg)`; c.style.zIndex = r.zIndex; });
    return;
  }
  covers.forEach((c, i) => gsap.set(c, rest(i)));
  gsap.from(covers, { yPercent: 60, opacity: 0, rotation: 0, xPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.08, delay: 0.35 });
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } })
    .to(covers, { xPercent: (i) => (i - mid) * 92, rotation: (i) => (i - mid) * 13, yPercent: -12, scale: 1.08, ease: 'none' }, 0)
    .to('.hero .wrap', { yPercent: -30, opacity: 0, ease: 'none' }, 0);
}

function statement() {
  const p = document.getElementById('statement');
  const words = p.textContent.trim().split(/\s+/);
  const accent = new Set(['Solo', 'tu', 'archivo.']);
  p.innerHTML = words.map((w, i) => `<span class="w${i >= words.length - 3 && accent.has(w) ? ' hl' : ''}">${esc(w)} </span>`).join('');
  if (!motion) return;
  gsap.to(p.querySelectorAll('.w'), { opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: '.statement', start: 'top top', end: 'bottom bottom', scrub: true } });
}

function revealOnScroll() {
  document.querySelectorAll('.split:not([data-split="hero"])').forEach((el) => {
    const words = splitWords(el);
    if (motion) gsap.from(words, { y: 60, opacity: 0, filter: 'blur(10px)', duration: 1.1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  if (!motion) return;
  document.querySelectorAll('[data-fade]').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.from(el, { y: 32, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.from('.closing .btn', { scale: 0.85, opacity: 0, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.closing', start: 'top 70%' } });
}

// Cómo funciona: la palabra grande cambia según el bloque visible
function howItWorks() {
  const spans = document.querySelectorAll('.how .words span');
  const set = (n) => spans.forEach((s, i) => { s.classList.toggle('on', i === n); s.classList.toggle('past', i < n); });
  if (!motion) return;
  document.querySelectorAll('.how .block').forEach((b) => {
    const n = Number(b.dataset.step);
    ScrollTrigger.create({ trigger: b, start: 'top 60%', end: 'bottom 60%', onEnter: () => set(n), onEnterBack: () => set(n) });
    gsap.from(b, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: b, start: 'top 80%' } });
  });
  gsap.to('#how-bar', { '--p': 1, ease: 'none', scrollTrigger: { trigger: '.how .blocks', start: 'top 60%', end: 'bottom 60%', scrub: true } });
}

// Tarjetas: entrada en cascada, foco que sigue al cursor e inclinación 3D
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

heroIntro();
statement();
revealOnScroll();
howItWorks();
magnetic();

try {
  const products = await (await fetch('/api/products')).json();
  document.getElementById('count').textContent = `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`;
  cardsEl.innerHTML = products.map(cardHTML).join('');
  cardsEl.removeAttribute('aria-busy');
  buildFan(products);
  cards();
} catch {
  cardsEl.innerHTML = '';
  errorEl.textContent = 'No se pudo cargar el catálogo. Recarga la página.';
}
if (motion) ScrollTrigger.refresh();
