document.documentElement.classList.replace('no-js', 'js');
document.getElementById('year').textContent = new Date().getFullYear();

// Fondo de partículas en WebGL.
// Las partículas forman figuras (planeta, móvil, navegador, gráfico, red neuronal, bombilla y el logo),
// se transforman según la sección visible y el fondo alterna entre blanco y naranja.
(function () {
  const root = document.documentElement;
  const canvas = document.getElementById('gl');
  const gl = canvas && (canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false }) || canvas.getContext('experimental-webgl'));
  const ready = () => root.classList.add('ready');
  // Sin WebGL (o si falla el arranque) se muestra todo igual, con los fondos naranjas pintados por CSS
  const sinGL = () => { root.classList.add('no-gl'); ready(); };
  if (!gl) { sinGL(); return; }
  setTimeout(ready, 5000);
  // Safari puede perder el contexto gráfico al volver de segundo plano: se pasa al modo CSS
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); sinGL(); });

  const mobile = matchMedia('(max-width: 900px)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = mobile ? 6500 : 13000;
  const LOGO = 6;

  // ---------- Generador pseudoaleatorio estable ----------
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const jit = (a) => (rnd() * 2 - 1) * a;

  // ---------- Primitivas de muestreo ----------
  const line = (x1, y1, x2, y2) => { const t = rnd(); return [x1 + (x2 - x1) * t + jit(0.006), y1 + (y2 - y1) * t + jit(0.006), jit(0.03)]; };
  const circle = (cx, cy, r) => { const a = rnd() * Math.PI * 2; return [cx + Math.cos(a) * r + jit(0.006), cy + Math.sin(a) * r + jit(0.006), jit(0.03)]; };
  const disc = (cx, cy, r) => { const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd()) * r; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, jit(0.03)]; };
  const fill = (x, y, w, h) => [x + rnd() * w, y + rnd() * h, jit(0.03)];
  function rrect(x, y, w, h, r) {
    const sh = w - 2 * r, sv = h - 2 * r, arc = (Math.PI / 2) * r;
    const seg = [sh, arc, sv, arc, sh, arc, sv, arc];
    let d = rnd() * seg.reduce((a, b) => a + b, 0), i = 0;
    while (d > seg[i]) { d -= seg[i]; i++; }
    const t = d / seg[i];
    let px, py, a;
    switch (i) {
      case 0: px = x + r + t * sh; py = y; break;
      case 1: a = -Math.PI / 2 + t * Math.PI / 2; px = x + w - r + Math.cos(a) * r; py = y + r + Math.sin(a) * r; break;
      case 2: px = x + w; py = y + r + t * sv; break;
      case 3: a = t * Math.PI / 2; px = x + w - r + Math.cos(a) * r; py = y + h - r + Math.sin(a) * r; break;
      case 4: px = x + w - r - t * sh; py = y + h; break;
      case 5: a = Math.PI / 2 + t * Math.PI / 2; px = x + r + Math.cos(a) * r; py = y + h - r + Math.sin(a) * r; break;
      case 6: px = x; py = y + h - r - t * sv; break;
      default: a = Math.PI + t * Math.PI / 2; px = x + r + Math.cos(a) * r; py = y + r + Math.sin(a) * r;
    }
    return [px + jit(0.005), py + jit(0.005), jit(0.06)];
  }
  function pick(parts) {
    let r = rnd() * parts.reduce((s, p) => s + p[0], 0);
    for (const [w, f] of parts) if ((r -= w) <= 0) return f();
    return parts[parts.length - 1][1]();
  }

  // ---------- Figuras ----------
  const shapeFns = [
    // 0 · Planeta con anillo
    () => {
      if (rnd() < 0.8) { const u = rnd() * 2 - 1, a = rnd() * 6.2832, s = Math.sqrt(1 - u * u), r = 0.95 + jit(0.03); return [s * Math.cos(a) * r, u * r, s * Math.sin(a) * r]; }
      const a = rnd() * 6.2832, r = 1.25 + jit(0.02);
      return [Math.cos(a) * r, Math.sin(a) * r * 0.22 + jit(0.01), Math.sin(a) * r * 0.9];
    },
    // 1 · Móvil con iconos
    () => pick([
      [40, () => rrect(-0.5, -1.0, 1.0, 2.0, 0.16)],
      [6, () => fill(-0.12, 0.88, 0.24, 0.03)],
      [4, () => fill(-0.16, -0.92, 0.32, 0.02)],
      [50, () => { const c = (rnd() * 3) | 0, r = (rnd() * 4) | 0, x = -0.36 + c * 0.27, y = 0.48 - r * 0.32; return rnd() < 0.55 ? rrect(x, y, 0.2, 0.2, 0.05) : fill(x + 0.03, y + 0.03, 0.14, 0.14); }],
    ]),
    // 2 · Navegador con tienda
    () => pick([
      [26, () => rrect(-1.25, -0.8, 2.5, 1.6, 0.08)],
      [7, () => line(-1.25, 0.58, 1.25, 0.58)],
      [5, () => disc(-1.12 + ((rnd() * 3) | 0) * 0.09, 0.69, 0.025)],
      [6, () => rrect(-0.85, 0.64, 1.3, 0.1, 0.05)],
      [16, () => fill(-1.1, 0.12, 1.0, 0.36)],
      [10, () => { const k = (rnd() * 3) | 0; return line(-1.1, -0.02 - k * 0.1, -0.1 - rnd() * 0.3, -0.02 - k * 0.1); }],
      [30, () => { const x = 0.05 + ((rnd() * 3) | 0) * 0.38; return rnd() < 0.6 ? rrect(x, -0.65, 0.32, 0.6, 0.04) : fill(x + 0.04, -0.3, 0.24, 0.2); }],
    ]),
    // 3 · Gráfico con engranaje
    () => pick([
      [8, () => line(-1.2, -0.8, 1.0, -0.8)],
      [6, () => line(-1.2, -0.8, -1.2, 0.8)],
      [40, () => { const h = [0.5, 0.85, 0.65, 1.15, 0.9, 1.4], k = (rnd() * 6) | 0; return fill(-1.05 + k * 0.33, -0.8, 0.2, h[k]); }],
      [18, () => { const t = rnd(); return [-1.1 + t * 2.0, -0.1 + Math.sin(t * 5.5) * 0.25 + t * 0.6 + jit(0.008), jit(0.03)]; }],
      [28, () => { const a = rnd() * 6.2832, r = 0.28 + (Math.cos(a * 8) > 0.3 ? 0.08 : 0); return rnd() < 0.8 ? [1.05 + Math.cos(a) * r, 0.62 + Math.sin(a) * r, jit(0.04)] : circle(1.05, 0.62, 0.1); }],
    ]),
    // 4 · Red neuronal
    (() => {
      const nodes = [[-1.1, 4], [-0.37, 6], [0.37, 6], [1.1, 3]].map(([x, n]) => Array.from({ length: n }, (_, i) => [x, (i - (n - 1) / 2) * 0.32]));
      return () => {
        if (rnd() < 0.35) { const L = nodes[(rnd() * 4) | 0], [x, y] = L[(rnd() * L.length) | 0]; return rnd() < 0.5 ? circle(x, y, 0.07) : disc(x, y, 0.045); }
        const l = (rnd() * 3) | 0, A = nodes[l][(rnd() * nodes[l].length) | 0], B = nodes[l + 1][(rnd() * nodes[l + 1].length) | 0];
        return line(A[0], A[1], B[0], B[1]);
      };
    })(),
    // 5 · Bombilla
    () => pick([
      [40, () => { const a = -Math.PI * 0.22 + rnd() * Math.PI * 1.44; return [Math.cos(a) * 0.62 + jit(0.006), 0.28 + Math.sin(a) * 0.62 + jit(0.006), jit(0.05)]; }],
      [10, () => { const t = rnd(), s = rnd() < 0.5 ? -1 : 1; return [s * (0.48 - t * 0.2), -0.12 - t * 0.38 + jit(0.005), jit(0.04)]; }],
      [14, () => { const k = (rnd() * 4) | 0; return line(-0.28, -0.56 - k * 0.09, 0.28, -0.56 - k * 0.09); }],
      [14, () => { const t = rnd(); return [-0.2 + t * 0.4, 0.2 + Math.abs(Math.sin(t * Math.PI * 4)) * 0.16 + jit(0.006), jit(0.02)]; }],
      [22, () => { const a = Math.PI * (0.1 + ((rnd() * 7) | 0) * 0.133); return line(Math.cos(a) * 0.82, 0.28 + Math.sin(a) * 0.82, Math.cos(a) * 1.05, 0.28 + Math.sin(a) * 1.05); }],
    ]),
  ];

  const shapes = shapeFns.map((fn) => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) a.set(fn(), i * 3); return a; });
  // 6 · Logo: se rellena al cargar la imagen; mientras tanto, una copia del planeta
  const logoPos = new Float32Array(shapes[0]);
  const logoCol = new Float32Array(N);
  const rand = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) { const u = rnd() * 2 - 1, a = rnd() * 6.2832, s = Math.sqrt(1 - u * u); rand.set([s * Math.cos(a), u, s * Math.sin(a), rnd()], i * 4); }

  // ---------- Shaders ----------
  const vs = `
    attribute vec3 p0; attribute vec3 p1; attribute vec3 p2; attribute vec3 p3; attribute vec3 p4; attribute vec3 p5; attribute vec3 p6;
    attribute vec4 r; attribute float lc;
    uniform float w0; uniform float w1; uniform float w2; uniform float w3; uniform float w4; uniform float w5; uniform float w6;
    uniform float uTime; uniform float uBurst; uniform float uRotY; uniform float uRotX; uniform float uBg;
    uniform float uAspect; uniform float uScale; uniform float uOffX; uniform float uOffY; uniform float uSize; uniform float uDim;
    varying vec3 vColor; varying float vAlpha;
    void main() {
      vec3 p = p0*w0 + p1*w1 + p2*w2 + p3*w3 + p4*w4 + p5*w5 + p6*w6;
      p += r.xyz * uBurst * (0.8 + r.w * 1.6);
      p += vec3(sin(uTime*0.7 + r.w*40.0), cos(uTime*0.6 + r.w*31.0), sin(uTime*0.5 + r.w*17.0)) * 0.012 * (1.0 - w6);
      float cy = cos(uRotY), sy = sin(uRotY), cx = cos(uRotX), sx = sin(uRotX);
      vec3 q = vec3(p.x*cy + p.z*sy, p.y, -p.x*sy + p.z*cy);
      q = vec3(q.x, q.y*cx - q.z*sx, q.y*sx + q.z*cx);
      float persp = 3.2 / max(3.2 - q.z, 1.6);
      vec2 s = q.xy * persp * uScale;
      gl_Position = vec4(s.x / uAspect + uOffX, s.y + uOffY, 0.0, 1.0);
      gl_PointSize = uSize * (0.6 + r.w * 0.9) * persp;
      vec3 orange = vec3(0.969, 0.231, 0.125);
      vec3 ink = vec3(0.09, 0.067, 0.059);
      vec3 onWhite = r.w > 0.82 ? ink : (r.w > 0.55 ? vec3(1.0, 0.55, 0.42) : orange);
      vec3 onOrange = r.w > 0.82 ? ink : (r.w > 0.55 ? vec3(1.0, 0.82, 0.74) : vec3(1.0));
      vec3 c = mix(onWhite, onOrange, uBg);
      vec3 logoC = lc > 0.5 ? mix(orange, vec3(1.0), uBg) : ink;
      vColor = mix(c, logoC, w6);
      vAlpha = clamp(0.45 + (persp - 0.8) * 1.2, 0.25, 1.0) * uDim;
    }`;
  const fs = `
    precision mediump float;
    varying vec3 vColor; varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.15, d) * vAlpha;
      gl_FragColor = vec4(vColor, a);
    }`;
  const compile = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buffers = {};
  const attr = (name, data, size) => {
    const b = gl.createBuffer(); buffers[name] = b;
    gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  shapes.forEach((d, i) => attr('p' + i, d, 3));
  attr('p6', logoPos, 3);
  attr('r', rand, 4);
  attr('lc', logoCol, 1);
  const U = {};
  ['w0', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'uTime', 'uBurst', 'uRotY', 'uRotX', 'uBg', 'uAspect', 'uScale', 'uOffX', 'uOffY', 'uSize', 'uDim'].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // ---------- Logo en partículas: se muestrea la imagen del logo ----------
  const img = new Image();
  img.onload = () => {
    try {
      const c = document.createElement('canvas'); const s = 2;
      c.width = img.naturalWidth * s; c.height = img.naturalHeight * s;
      const x = c.getContext('2d'); x.drawImage(img, 0, 0, c.width, c.height);
      const d = x.getImageData(0, 0, c.width, c.height).data;
      const pts = [];
      for (let y = 0; y < c.height; y += 2) for (let xx = 0; xx < c.width; xx += 2) {
        const k = (y * c.width + xx) * 4; if (d[k + 3] > 140) pts.push([xx, y, d[k] > 180 && d[k + 1] < 140 ? 1 : 0]);
      }
      if (!pts.length) return;
      const w = c.width, h = c.height, sc = 3.0 / w;
      for (let i = 0; i < N; i++) {
        const [px, py, o] = pts[(rnd() * pts.length) | 0];
        logoPos.set([(px - w / 2) * sc + jit(0.004), (h / 2 - py) * sc + jit(0.004), jit(0.02)], i * 3);
        logoCol[i] = o;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.p6); gl.bufferData(gl.ARRAY_BUFFER, logoPos, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.lc); gl.bufferData(gl.ARRAY_BUFFER, logoCol, gl.STATIC_DRAW);
    } catch (e) { /* si no se puede leer la imagen, la intro usa el planeta */ }
  };
  img.src = 'logo.png';

  // ---------- Tamaño y anclas ----------
  let W = 0, H = 0, dpr = 1, anchors = [];
  function readAnchors() {
    anchors = [...document.querySelectorAll('[data-shape]')].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        at: r.top + scrollY + Math.min(r.height, innerHeight) / 2 - innerHeight / 2,
        shape: +el.dataset.shape,
        x: mobile ? 0 : parseFloat(el.dataset.x || 0),
        y: mobile ? 0.42 : 0,
        bg: +(el.dataset.bg || 0),
        dim: parseFloat(el.dataset.dim || 1),
      };
    });
  }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
    readAnchors();
  }

  // ---------- Intro: dispersión → logo → planeta ----------
  let introDone = reduced || scrollY > 10;
  try { if (sessionStorage.getItem('folziaIntro')) introDone = true; } catch (e) { /* sin almacenamiento */ }
  const T_IN = 1.3, T_HOLD = 2.3, T_OUT = 3.3;
  let introStart = null;
  const finishIntro = () => { if (introDone) return; introDone = true; ready(); try { sessionStorage.setItem('folziaIntro', '1'); } catch (e) { /* nada */ } };
  ['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, finishIntro, { passive: true, once: true }));
  if (introDone) ready();

  // ---------- Bucle ----------
  let mx = 0, my = 0, smx = 0, smy = 0, sy = scrollY, running = true;
  addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(frame); });
  const sm = (t) => t * t * (3 - 2 * t);
  const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
  const lerp = (a, b, t) => a + (b - a) * t;
  const ORANGE = [0.969, 0.231, 0.125];

  function frame(now) {
    if (!running) return;
    const time = now / 1000;
    sy += (scrollY - sy) * (reduced ? 1 : 0.12);
    smx += (mx - smx) * 0.05; smy += (my - smy) * 0.05;

    // Estado según el scroll
    let i = 0;
    while (i < anchors.length - 1 && sy >= anchors[i + 1].at) i++;
    const A = anchors[i], B = anchors[Math.min(i + 1, anchors.length - 1)];
    const span = B.at - A.at;
    const k = sm(clamp01(((span > 0 ? (sy - A.at) / span : 0) - 0.3) / 0.5));
    const w = [0, 0, 0, 0, 0, 0, 0];
    w[A.shape] += 1 - k; w[B.shape] += k;
    let burst = A.shape === B.shape || reduced ? 0 : Math.sin(Math.PI * k) * 0.9;
    let offX = lerp(A.x, B.x, k), offY = lerp(A.y, B.y, k), bg = lerp(A.bg, B.bg, k), dim = lerp(A.dim, B.dim, k);
    let scale = mobile ? 0.34 : 0.46;

    // La intro manda durante los primeros segundos
    if (!introDone) {
      if (introStart === null) introStart = time;
      const t = time - introStart;
      w.fill(0);
      if (t < T_HOLD) {
        w[LOGO] = 1;
        burst = t < T_IN ? Math.pow(1 - sm(t / T_IN), 2) * 3.2 : 0;
        offX = 0; offY = 0; scale = mobile ? 0.3 : 0.42;
      } else {
        const m = sm(clamp01((t - T_HOLD) / (T_OUT - T_HOLD)));
        w[LOGO] = 1 - m; w[A.shape] += m;
        burst = Math.sin(Math.PI * m) * 1.1;
        offX = lerp(0, offX, m); offY = lerp(0, offY, m);
        scale = lerp(mobile ? 0.3 : 0.42, scale, m);
        if (t > T_HOLD + 0.35) ready();
        if (t >= T_OUT) finishIntro();
      }
    }

    for (let j = 0; j < 7; j++) gl.uniform1f(U['w' + j], w[j]);
    const logoW = w[LOGO];
    gl.uniform1f(U.uTime, reduced ? 0 : time);
    gl.uniform1f(U.uBurst, burst);
    gl.uniform1f(U.uRotY, ((reduced ? 0 : Math.sin(time * 0.25) * 0.35) + smx * 0.6) * (1 - logoW));
    gl.uniform1f(U.uRotX, ((reduced ? 0 : Math.sin(time * 0.2) * 0.08) - smy * 0.3) * (1 - logoW));
    gl.uniform1f(U.uBg, bg);
    gl.uniform1f(U.uAspect, W / H);
    gl.uniform1f(U.uScale, scale);
    gl.uniform1f(U.uOffX, offX);
    gl.uniform1f(U.uOffY, offY);
    gl.uniform1f(U.uSize, (mobile ? 3.0 : 3.4) * dpr);
    gl.uniform1f(U.uDim, dim);

    const r = lerp(1, ORANGE[0], bg), g = lerp(1, ORANGE[1], bg), b = lerp(1, ORANGE[2], bg);
    gl.clearColor(r, g, b, 1);
    root.style.setProperty('--page-bg', `rgb(${(r * 255) | 0}, ${(g * 255) | 0}, ${(b * 255) | 0})`);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, N);
    requestAnimationFrame(frame);
  }

  resize();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 120); });
  addEventListener('load', readAnchors);
  requestAnimationFrame(frame);
})();

// Vídeos de las apps: solo se reproducen a la vista; el portátil va pasando de una app a otra
(function () {
  const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vids = [...document.querySelectorAll('.vid')];
  if (!vids.length || reducir || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { threshold: 0.35 });
  vids.forEach((v) => io.observe(v));

  const video = document.getElementById('desk-video');
  const tabs = [...document.querySelectorAll('.desk-tabs [data-n]')];
  const link = document.getElementById('desk-link');
  if (!video || !tabs.length) return;
  let actual = 0;
  // WebM donde se pueda (Chrome, Firefox); MP4 en el resto (Safari antiguo)
  const formato = video.canPlayType('video/webm; codecs="vp9"') ? 'webm' : 'mp4';
  video.src = `video/${tabs[0].dataset.n}.${formato}`;
  const elegir = (i, reproducir) => {
    actual = i;
    const n = tabs[i].dataset.n;
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.querySelector('.bar i').style.width = '0'; });
    video.src = `video/${n}.${formato}`; video.poster = `img/poster-${n}.webp`;
    link.href = `/demos/${n}/`;
    link.firstChild.textContent = `Probar ${tabs[i].querySelector('b').textContent} `;
    if (reproducir) video.play().catch(() => {});
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => elegir(i, true)));
  video.addEventListener('ended', () => elegir((actual + 1) % tabs.length, true));
  // Barra de progreso bajo la pestaña activa
  video.addEventListener('timeupdate', () => { if (video.duration) tabs[actual].querySelector('.bar i').style.width = `${(video.currentTime / video.duration) * 100}%`; });
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
