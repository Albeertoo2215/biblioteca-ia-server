// Año del pie
document.getElementById('year').textContent = new Date().getFullYear();

// Partículas 3D de fondo: forman un cerebro, se deshacen y se recomponen en otras figuras al hacer scroll
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 900px)').matches;
  const N = mobile ? 2000 : 4600;

  const COLORS = ['#ffb829', '#f59e0b', '#8052ff', '#b9a3ff', '#f3f0ff', '#d946ef', '#2bd4b0', '#4b7bff'];
  const GOLD = 0, AMBER = 1, IRIS = 2, LILAC = 3, WHITE = 4, MAGENTA = 5, TEAL = 6, BLUE = 7;

  // Generador pseudoaleatorio con semilla para que las figuras sean estables
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const pick = (weights) => {
    let r = rnd(), acc = 0;
    for (const [c, w] of weights) { acc += w; if (r < acc) return c; }
    return weights[weights.length - 1][0];
  };
  const randDir = () => {
    const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    return [s * Math.cos(th), u, s * Math.sin(th)];
  };

  // ---- Figuras: cada una devuelve posiciones (x, y, z) y un color por partícula ----
  function brain() {
    const pos = new Float32Array(N * 3), col = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      let x, y, z, f = 0;
      const r = rnd();
      if (r < 0.84) {
        // Cerebro: elipsoide con circunvoluciones (f) y surco entre hemisferios
        const [dx, dy, dz] = randDir();
        f = 0.6 * Math.sin(13 * dx + 5 * dy + 2) * Math.sin(11 * dy + 7 * dz) + 0.4 * Math.sin(19 * dz + 9 * dx) * Math.cos(15 * dy);
        let k = 1 + 0.06 * f;
        if (Math.abs(dz) < 0.07 && dy > -0.1) k *= 0.9;
        k *= 0.96 + rnd() * 0.05;
        x = dx * 1.32 * k; y = dy * 0.98 * k; z = dz * 1.02 * k;
        if (y < -0.3) y = -0.3 + (y + 0.3) * 0.5;
      } else if (r < 0.97) {
        // Cerebelo
        const [dx, dy, dz] = randDir();
        f = Math.sin(26 * dy);
        const k = 0.96 + rnd() * 0.05 + 0.04 * f;
        x = -0.78 + dx * 0.46 * k; y = -0.55 + dy * 0.26 * k; z = dz * 0.7 * k;
      } else {
        // Tronco encefálico
        const t = rnd(), a = rnd() * Math.PI * 2, rr = 0.13 * (0.9 + rnd() * 0.2);
        x = -0.3 - t * 0.12 + Math.cos(a) * rr; y = -0.5 - t * 0.55; z = Math.sin(a) * rr;
      }
      pos.set([x, y, z], i * 3);
      // Crestas doradas y surcos violetas para que se lean los pliegues
      col[i] = f > 0.25 ? pick([[GOLD, 0.55], [AMBER, 0.2], [WHITE, 0.25]])
        : f < -0.25 ? pick([[IRIS, 0.45], [LILAC, 0.3], [MAGENTA, 0.15], [BLUE, 0.1]])
        : pick([[WHITE, 0.35], [LILAC, 0.25], [GOLD, 0.3], [TEAL, 0.1]]);
    }
    return { pos, col };
  }

  function bulb() {
    const pos = new Float32Array(N * 3), col = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      let x, y, z;
      const r = rnd();
      if (r < 0.62) {
        const [dx, dy, dz] = randDir();
        const k = 0.97 + rnd() * 0.05;
        // Esfera superior que se estrecha hacia el cuello
        if (dy < -0.55) { i--; continue; }
        x = dx * k; y = 0.45 + dy * k; z = dz * k;
      } else if (r < 0.84) {
        const t = rnd(), a = rnd() * Math.PI * 2;
        const rad = 0.83 - 0.42 * Math.pow(t, 0.8);
        x = Math.cos(a) * rad; y = -0.38 - t * 0.62; z = Math.sin(a) * rad;
      } else {
        const t = rnd(), a = rnd() * Math.PI * 2;
        const rad = 0.42 + 0.035 * Math.sin(t * Math.PI * 10) - (t > 0.85 ? (t - 0.85) * 1.6 : 0);
        x = Math.cos(a) * rad; y = -1.0 - t * 0.55; z = Math.sin(a) * rad;
      }
      // Inclinación como en una bombilla vista en tres cuartos
      const ang = -0.35, cx = x * Math.cos(ang) - y * Math.sin(ang), cy = x * Math.sin(ang) + y * Math.cos(ang);
      pos.set([cx, cy + 0.2, z], i * 3);
      col[i] = y > 0.5 ? pick([[GOLD, 0.45], [AMBER, 0.25], [WHITE, 0.3]])
        : y > -0.4 ? pick([[WHITE, 0.35], [LILAC, 0.35], [GOLD, 0.15], [IRIS, 0.15]])
        : y > -1.0 ? pick([[IRIS, 0.5], [LILAC, 0.2], [MAGENTA, 0.3]])
        : pick([[IRIS, 0.35], [TEAL, 0.35], [BLUE, 0.3]]);
    }
    return { pos, col };
  }

  function sphere() {
    const pos = new Float32Array(N * 3), col = new Uint8Array(N);
    const g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = g * i;
      const k = 1.2 * (0.97 + rnd() * 0.05);
      const x = Math.cos(th) * rr * k, z = Math.sin(th) * rr * k;
      pos.set([x, y * k, z], i * 3);
      const band = Math.sin(th * 0.02 + y * 4);
      col[i] = band > 0.3 ? pick([[GOLD, 0.6], [AMBER, 0.25], [WHITE, 0.15]])
        : band < -0.4 ? pick([[IRIS, 0.5], [LILAC, 0.3], [MAGENTA, 0.2]])
        : pick([[WHITE, 0.4], [LILAC, 0.3], [GOLD, 0.2], [TEAL, 0.1]]);
    }
    return { pos, col };
  }

  function scatter() {
    const pos = new Float32Array(N * 3), col = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      pos.set([(rnd() * 2 - 1) * 3.2, (rnd() * 2 - 1) * 2, (rnd() * 2 - 1) * 2.2], i * 3);
      col[i] = pick([[GOLD, 0.35], [AMBER, 0.15], [WHITE, 0.2], [LILAC, 0.15], [IRIS, 0.15]]);
    }
    return { pos, col };
  }

  const SHAPES = { brain: brain(), bulb: bulb(), sphere: sphere(), scatter: scatter() };
  // Dispersión de cada partícula durante las transiciones
  const burst = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const d = randDir(), m = 0.6 + rnd() * 1.8; burst.set([d[0] * m, d[1] * m, d[2] * m], i * 3); }
  const sizes = new Float32Array(N);
  for (let i = 0; i < N; i++) sizes[i] = 0.7 + rnd() * 0.9;
  const angles = new Float32Array(N);
  for (let i = 0; i < N; i++) angles[i] = rnd() * Math.PI * 2;

  // Triángulos grandes decorativos con parallax
  const deco = Array.from({ length: mobile ? 6 : 12 }, () => ({
    x: rnd(), y: rnd() * 3, s: 8 + rnd() * 10, a: rnd() * 6.28, c: COLORS[[GOLD, IRIS, TEAL, LILAC, MAGENTA][(rnd() * 5) | 0]], d: 0.2 + rnd() * 0.6,
  }));

  // ---- Anclas de scroll: cada sección define figura, posición, giro y escala ----
  let anchors = [];
  function readAnchors() {
    anchors = [...document.querySelectorAll('[data-shape]')].map((el) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      return {
        at: top + Math.min(rect.height, window.innerHeight) / 2 - window.innerHeight / 2,
        shape: SHAPES[el.dataset.shape],
        x: mobile ? 0 : parseFloat(el.dataset.x || 0),
        ry: parseFloat(el.dataset.ry || 0),
        scale: parseFloat(el.dataset.scale || 1) * (mobile ? 0.85 : 1),
        dim: parseFloat(el.dataset.dim || (mobile ? 0.55 : 1)),
      };
    });
    if (mobile && anchors[0]) anchors[0].dim = 0.75;
  }

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    readAnchors();
  }

  const smooth = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  let scrollSmooth = window.scrollY;

  function frame(time) {
    scrollSmooth = reduced ? window.scrollY : lerp(scrollSmooth, window.scrollY, 0.12);
    const sy = scrollSmooth;

    // Sección actual y progreso hacia la siguiente
    let i = 0;
    while (i < anchors.length - 1 && sy >= anchors[i + 1].at) i++;
    const A = anchors[i], B = anchors[Math.min(i + 1, anchors.length - 1)];
    const span = B.at - A.at;
    const raw = span > 0 ? Math.min(Math.max((sy - A.at) / span, 0), 1) : 0;
    // La figura se mantiene un tramo y luego se transforma
    const t = smooth(Math.min(Math.max((raw - 0.25) / 0.6, 0), 1));
    const sameShape = A.shape === B.shape;
    const explode = sameShape ? 0 : Math.sin(Math.PI * t) * 1.15;

    const offX = lerp(A.x, B.x, t) * W * 0.5;
    const scale = lerp(A.scale, B.scale, t) * Math.min(W, H) * (mobile ? 0.34 : 0.3);
    const ry = lerp(A.ry, B.ry, t) + (reduced ? 0 : Math.sin(time / 5200) * 0.22) + sy * 0.0007;
    const rx = 0.12 + (reduced ? 0 : Math.sin(time / 7300) * 0.06);
    const dim = lerp(A.dim, B.dim, t);
    const cy = Math.cos(ry), sny = Math.sin(ry), cx = Math.cos(rx), snx = Math.sin(rx);
    const pa = A.shape.pos, pb = B.shape.pos;
    const ca = A.shape.col, cb = B.shape.col;
    const breathe = reduced ? 0 : 0.012;

    ctx.clearRect(0, 0, W, H);

    // Agrupamos por color y profundidad para trazar pocos caminos por fotograma
    const paths = new Array(COLORS.length * 2);
    for (let k = 0; k < paths.length; k++) paths[k] = new Path2D();

    for (let p = 0; p < N; p++) {
      const j = p * 3;
      let x = lerp(pa[j], pb[j], t) + burst[j] * explode;
      let y = lerp(pa[j + 1], pb[j + 1], t) + burst[j + 1] * explode;
      let z = lerp(pa[j + 2], pb[j + 2], t) + burst[j + 2] * explode;
      if (breathe) {
        const w = Math.sin(time / 1400 + p);
        x += w * breathe; y += Math.cos(time / 1700 + p) * breathe;
      }
      // Rotación Y y luego X
      const x1 = x * cy + z * sny, z1 = -x * sny + z * cy;
      const y1 = y * cx - z1 * snx, z2 = y * snx + z1 * cx;
      const persp = 3.6 / (3.6 - z2);
      if (persp <= 0) continue;
      const sx = W / 2 + offX + x1 * scale * persp;
      const syp = H / 2 - y1 * scale * persp;
      if (sx < -20 || sx > W + 20 || syp < -20 || syp > H + 20) continue;
      const s = sizes[p] * (mobile ? 2 : 2.4) * persp;
      const a = angles[p] + (reduced ? 0 : time / 9000);
      const path = paths[(t < 0.5 ? ca[p] : cb[p]) * 2 + (z2 > 0 ? 1 : 0)];
      path.moveTo(sx + Math.cos(a) * s, syp + Math.sin(a) * s);
      path.lineTo(sx + Math.cos(a + 2.094) * s, syp + Math.sin(a + 2.094) * s);
      path.lineTo(sx + Math.cos(a + 4.189) * s, syp + Math.sin(a + 4.189) * s);
      path.closePath();
    }

    ctx.lineWidth = 1;
    for (let c = 0; c < COLORS.length; c++) {
      ctx.strokeStyle = COLORS[c];
      ctx.globalAlpha = 0.38 * dim; ctx.stroke(paths[c * 2]);
      ctx.globalAlpha = 0.95 * dim; ctx.stroke(paths[c * 2 + 1]);
    }

    // Triángulos decorativos
    ctx.lineWidth = 1.5;
    for (const d of deco) {
      const px = d.x * W, py = ((d.y * H - sy * d.d) % (H * 3) + H * 3) % (H * 3) - H;
      if (py < -40 || py > H + 40) continue;
      const a = d.a + (reduced ? 0 : time / 12000);
      ctx.globalAlpha = 0.55;
      ctx.strokeStyle = d.c;
      ctx.beginPath();
      for (let k = 0; k < 3; k++) {
        const ang = a + k * 2.094;
        k ? ctx.lineTo(px + Math.cos(ang) * d.s, py + Math.sin(ang) * d.s) : ctx.moveTo(px + Math.cos(ang) * d.s, py + Math.sin(ang) * d.s);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(frame);
  }

  resize();
  let timer;
  window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(resize, 150); });
  window.addEventListener('load', readAnchors);
  requestAnimationFrame(frame);
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
