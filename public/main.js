// Año del pie
document.getElementById('year').textContent = new Date().getFullYear();

// Barra de navegación: fondo esmerilado al hacer scroll
(function () {
  const top = document.getElementById('top');
  if (!top) return;
  const update = () => top.classList.toggle('scrolled', window.scrollY > 24);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Parallax suave de las capas del paisaje
(function () {
  const layers = [...document.querySelectorAll('.landscape .layer')];
  if (!layers.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const render = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    for (const l of layers) l.style.transform = `translateY(${-y * parseFloat(l.dataset.depth)}px)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(render); }
  }, { passive: true });
})();

// Captura del hero: pasa el correo al formulario y baja hasta él
(function () {
  const capture = document.getElementById('hero-capture');
  if (!capture) return;
  capture.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('hero-email').value.trim();
    const target = document.getElementById('form-email');
    if (email && target) target.value = email;
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.querySelector('#contact-form input[name="nombre"]').focus({ preventScroll: true }), 600);
  });
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
