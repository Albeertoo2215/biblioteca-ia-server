document.documentElement.classList.replace('no-js', 'js');
document.getElementById('year').textContent = new Date().getFullYear();

// Borde inferior de la barra superior al hacer scroll
(function () {
  const top = document.getElementById('top');
  if (!top) return;
  const update = () => top.classList.toggle('scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Pausa las piezas 3D del hero cuando salen de pantalla
(function () {
  const v = document.querySelector('.hero-visual');
  if (!v || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e]) => v.classList.toggle('paused', !e.isIntersecting)).observe(v);
})();

// Escena: la hoja de cálculo pasa a aplicación y luego a automatización según el scroll
(function () {
  const scene = document.getElementById('escena');
  if (!scene) return;
  const steps = [...scene.querySelectorAll('.scene-step')];
  const bar = scene.querySelector('.scene-progress span');
  const title = scene.querySelector('.device-title');
  let current = -1;
  let ticking = false;

  const setStage = (i) => {
    if (i === current) return;
    current = i;
    scene.dataset.stage = String(i);
    steps.forEach((s, k) => s.classList.toggle('on', k === i));
    if (title) title.textContent = title.dataset['t' + i];
  };

  const render = () => {
    const r = scene.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const p = total > 0 ? Math.min(Math.max(-r.top / total, 0), 1) : 0;
    if (bar) bar.style.setProperty('--p', p.toFixed(3));
    setStage(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  }, { passive: true });
  window.addEventListener('resize', render);
  render();
})();

// Indicador del proceso: marca el paso que está en el centro de la pantalla
(function () {
  const marks = [...document.querySelectorAll('.indicator li')];
  const steps = [...document.querySelectorAll('.step')];
  if (!marks.length || !steps.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const k = Number(e.target.dataset.step);
      marks.forEach((m, i) => m.classList.toggle('on', i === k));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  steps.forEach((s) => io.observe(s));
})();

// Formulario de contacto
// Une en una sola línea los campos con varias opciones marcadas (funciones, dispositivos, datos)
function toObject(data) {
  const out = {};
  for (const [k, v] of data.entries()) out[k] = k in out ? out[k] + ', ' + v : v;
  return out;
}

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
    if (!endpoint) {
      status.textContent = 'El formulario todavía no está conectado. Escríbenos directamente por correo, por favor.';
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Enviando…';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(toObject(new FormData(form))),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = 'Recibido. Te escribiremos para hablar de tu proyecto.';
    } catch (err) {
      status.textContent = 'No se ha podido enviar. Revisa tu conexión e inténtalo de nuevo, o escríbenos por correo.';
    } finally {
      button.disabled = false;
    }
  });
})();
