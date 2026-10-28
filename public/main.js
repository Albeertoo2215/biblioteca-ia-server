// Año del pie
document.getElementById('year').textContent = new Date().getFullYear();

// Constelación de triángulos del hero
(function () {
  const canvas = document.getElementById('constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colors = ['#8052ff', '#ffb829', '#15846e', '#c24bff', '#4b7bff', '#ff4fa3', '#9a7bff'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let size = 0;
  let particles = [];

  function inShape(x, y) {
    // Silueta orgánica: dos lóbulos solapados con borde irregular
    const a = Math.atan2(y, x);
    const r = Math.hypot(x, y);
    const edge = 0.78 + 0.08 * Math.sin(3 * a) + 0.05 * Math.sin(7 * a + 1.3);
    return r < edge * (Math.abs(x) < 0.05 ? 0.9 : 1);
  }

  function build() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = rect.width;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = size < 500 ? 700 : 1300;
    particles = [];
    while (particles.length < count) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const inside = inShape(x, y * 1.15);
      if (!inside && Math.random() > 0.06) continue;
      particles.push({
        x, y,
        s: (inside ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2),
        a: Math.random() * Math.PI * 2,
        c: colors[(Math.random() * colors.length) | 0],
        o: inside ? 0.55 + Math.random() * 0.45 : 0.2 + Math.random() * 0.25,
        p: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, size, size);
    const half = size / 2;
    ctx.lineWidth = 1;
    for (const p of particles) {
      const drift = reduced ? 0 : Math.sin(t / 2600 + p.p) * 0.012;
      const px = half + (p.x + drift) * half * 0.95;
      const py = half + (p.y + drift * 0.6) * half * 0.95;
      const rot = p.a + (reduced ? 0 : t / 9000);
      ctx.globalAlpha = p.o;
      ctx.strokeStyle = p.c;
      ctx.beginPath();
      for (let k = 0; k < 3; k++) {
        const ang = rot + (k * 2 * Math.PI) / 3;
        const vx = px + Math.cos(ang) * p.s;
        const vy = py + Math.sin(ang) * p.s;
        k ? ctx.lineTo(vx, vy) : ctx.moveTo(vx, vy);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (!reduced) requestAnimationFrame(draw);
  }

  build();
  requestAnimationFrame(draw);
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { build(); if (reduced) draw(0); }, 150);
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
