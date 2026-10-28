document.documentElement.classList.replace('no-js', 'js');
document.getElementById('year').textContent = new Date().getFullYear();

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Bloques del hero: se separan, giran y suben al hacer scroll
(function () {
  const wraps = [...document.querySelectorAll('.disc-wrap')];
  const title = document.querySelector('.hero-bottom');
  if (!wraps.length || reduced) return;
  let ticking = false;
  const render = () => {
    const p = Math.min(window.scrollY / window.innerHeight, 1.2);
    wraps.forEach((w, i) => {
      const d = parseFloat(w.style.getPropertyValue('--d')) || 0.5;
      const dir = i % 2 ? 1 : -1;
      w.style.transform = `translate3d(${dir * p * 60 * d}px, ${-p * 320 * d}px, 0) rotateY(${p * 40 * dir}deg) rotateZ(${p * 25 * d}deg)`;
    });
    if (title) {
      title.style.transform = `translateY(${-p * 80}px)`;
      title.style.opacity = String(Math.max(1 - p * 1.4, 0));
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } }, { passive: true });
  render();
})();

// Manifiesto: las palabras se iluminan según avanza el scroll
(function () {
  const el = document.getElementById('manifesto-text');
  if (!el) return;
  const wrapWords = (node, em) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span');
          s.className = 'w' + (em ? ' em' : '');
          s.textContent = part;
          frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        wrapWords(n, n.tagName === 'EM');
      }
    });
  };
  wrapWords(el, false);
  const words = [...el.querySelectorAll('.w')];
  if (reduced) { words.forEach((w) => w.classList.add('lit')); return; }
  let ticking = false;
  const render = () => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('lit', i < n));
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } }, { passive: true });
  render();
})();

// Aparición de bloques al entrar en pantalla
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach((i) => i.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach((i, k) => { i.style.transitionDelay = `${(k % 4) * 70}ms`; io.observe(i); });
})();

// Indicador del proceso y barra inferior según la sección visible
(function () {
  const marks = [...document.querySelectorAll('.indicator li')];
  const steps = [...document.querySelectorAll('.step')];
  if (marks.length && steps.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const k = Number(e.target.dataset.step);
        marks.forEach((m, i) => m.classList.toggle('on', i === k));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => io.observe(s));
  }
  const links = [...document.querySelectorAll('.dock a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io2.observe(s));
  }
})();

// Formulario de contacto
(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const endpoint = form.getAttribute('action');
    if (!endpoint || endpoint === 'FORM_ENDPOINT') {
      status.textContent = 'El formulario todavía no está conectado. Escríbenos directamente por correo, por favor.';
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Enviando…';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Gracias. Hemos recibido tu solicitud y te contestaremos lo antes posible.';
    } catch (err) {
      status.textContent = 'No se ha podido enviar. Inténtalo de nuevo o escríbenos por correo.';
    } finally {
      button.disabled = false;
    }
  });
})();
