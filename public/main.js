// «Pausar movimiento» (WCAG 2.2.2): un botón para parar partículas y vídeos; se recuerda en este navegador
(function () {
  let quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { if (localStorage.getItem('folziaQuieto') === '1') quieto = true; } catch (e) { /* sin almacenamiento */ }
  window.folziaQuieto = () => quieto;
  const b = document.getElementById('mov');
  if (!b) return;
  const pinta = () => { b.dataset.quieto = String(quieto); b.querySelector('.mov-t').textContent = quieto ? 'Reanudar' : 'Pausar'; };
  pinta();
  b.addEventListener('click', () => {
    quieto = !quieto; pinta();
    try { localStorage.setItem('folziaQuieto', quieto ? '1' : '0'); } catch (e) { /* nada */ }
    document.dispatchEvent(new CustomEvent('folzia:movimiento', { detail: { quieto } }));
  });
})();

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
    uniform float uTwist; uniform float uCollapse; uniform float uFlash; uniform float uGalaxy; uniform float uSpin;
    uniform float uMode; uniform float uProg; uniform float uRot;
    varying vec3 vColor; varying float vAlpha;
    void main() {
      vec3 p = p0*w0 + p1*w1 + p2*w2 + p3*w3 + p4*w4 + p5*w5 + p6*w6;
      p += r.xyz * uBurst * (0.8 + r.w * 1.6);
      // Intro: vórtice (giro que crece con la distancia al centro) y colapso hacia un punto
      p *= 1.0 - uCollapse * 0.955;
      float ang = uTwist * (0.35 + length(p.xy)) * (0.6 + r.w);
      float ca = cos(ang), sa = sin(ang);
      p.xy = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);
      // Galaxia de tres brazos que gira y se contrae hacia el centro
      float core = 0.0;
      if (uGalaxy > 0.0) {
        float arm = floor(r.w * 3.0);
        float rad = (0.1 + 2.3 * fract(r.w * 7.31 + r.x * 0.13)) * (1.0 - uCollapse * 0.97);
        float a = rad * 2.8 + arm * 2.0944 + uSpin / (0.35 + rad) + r.y * 0.32;
        vec3 g = vec3(cos(a) * rad, sin(a) * rad * 0.6, r.z * 0.07);
        p = mix(p, g, uGalaxy);
        core = uGalaxy * (1.0 - smoothstep(0.0, 1.4, rad / max(1.0 - uCollapse * 0.97, 0.05)));
      }
      // Variantes de intro (uMode): 2 escáner, 3 lluvia magnética, 4 cubo
      float glow = 0.0;
      if (uMode > 1.5 && uMode < 2.5 && uProg < 1.0) {
        float scan = -1.75 + uProg * 3.6;
        float d = p.x - scan;
        vec3 onLine = vec3(scan + r.x * 0.015, r.y * 0.95 + p.y * 0.25, r.z * 0.05);
        float k = clamp(-d / 0.3, 0.0, 1.0); k = 1.0 - pow(1.0 - k, 3.0);
        p = d > 0.0 ? onLine : mix(onLine, p, k);
        glow = d > 0.0 ? 1.0 : 1.0 - k;
      }
      if (uMode > 2.5 && uMode < 3.5 && uProg < 1.0) {
        float k = clamp((uProg - r.w * 0.55) / 0.45, 0.0, 1.0);
        // Caída con rebote (easeOutBounce)
        float b = k < 0.3636 ? 7.5625 * k * k : k < 0.7272 ? 7.5625 * (k - 0.5454) * (k - 0.5454) + 0.75 : k < 0.909 ? 7.5625 * (k - 0.818) * (k - 0.818) + 0.9375 : 7.5625 * (k - 0.9545) * (k - 0.9545) + 0.984375;
        p.y = mix(p.y + 2.8 + r.x * 0.9, p.y, b);
        p.x += (1.0 - k) * r.y * 0.12;
        glow = 1.0 - k;
      }
      if (uMode > 4.5 && uMode < 5.5 && uProg < 1.0) {
        // Hiperespacio: túnel de estrellas que viene hacia la cámara y frena formando el logo
        float a = atan(r.y, r.x) * 2.0 + r.z * 3.0, R = 0.3 + fract(r.z * 7.13 + r.w * 3.71) * 1.7;
        float z = mod(fract(r.x * 13.1 + r.y * 7.7 + r.w * 2.3) * 11.0 + uRot, 11.0) - 8.5;
        vec3 wp = vec3(cos(a) * R * 1.6, sin(a) * R, z);
        float k = clamp((uProg - 0.55 - r.w * 0.2) / 0.25, 0.0, 1.0); k = 1.0 - pow(1.0 - k, 3.0);
        p = mix(wp, p, k);
        glow = (1.0 - k) * smoothstep(-8.5, 2.0, z);
      }
      if (uMode > 5.5 && uMode < 6.5 && uProg < 1.0) {
        // Doble hélice que gira y se abre de izquierda a derecha
        float x = fract(r.w * 17.3) * 3.6 - 1.8;
        float strand = step(0.5, fract(r.w * 7.7));
        float ang = x * 3.2 + uRot + strand * 3.14159;
        vec3 hp = vec3(x, cos(ang) * 0.38, sin(ang) * 0.38);
        if (fract(r.w * 3.3) < 0.18) { float t2 = fract(r.w * 91.0) * 2.0 - 1.0; float xr = floor(x * 4.0) / 4.0; float a2 = xr * 3.2 + uRot; hp = vec3(xr, cos(a2) * 0.38 * t2, sin(a2) * 0.38 * t2); }
        float k = clamp(uProg * 1.6 - (x + 1.8) / 3.6 * 0.6, 0.0, 1.0); k = k * k * (3.0 - 2.0 * k);
        p = mix(hp, p, k);
        glow = (1.0 - k) * strand;
      }
      if (uMode > 6.5 && uProg < 1.0) {
        // Mar de partículas ondulante del que emerge el logo
        float gx = fract(r.x * 7.31 + r.w * 3.1) * 5.0 - 2.5, gz = fract(r.z * 5.17 + r.y * 2.3) * 4.0 - 3.2;
        float wy = sin(gx * 2.2 + uRot * 2.4) * 0.14 + cos(gz * 2.7 + uRot * 1.9) * 0.12 + sin((gx + gz) * 4.0 + uRot * 3.0) * 0.04;
        vec3 sp = vec3(gx * (1.0 - gz * 0.12), wy - 0.35 - gz * 0.42, gz * 0.4);
        float k = clamp((uProg - 0.45 - fract(r.w * 5.3) * 0.25) / 0.3, 0.0, 1.0); k = 1.0 - pow(1.0 - k, 3.0);
        p = mix(sp, p + vec3(0.0, 0.0, 0.0), k);
        glow = (1.0 - k) * smoothstep(-0.2, 0.25, wy);
      }
      if (uMode > 3.5 && uMode < 4.5 && uProg < 1.0) {
        float u = fract(r.w * 13.7) * 2.0 - 1.0, v = fract(r.w * 71.3) * 2.0 - 1.0;
        if (fract(r.w * 5.1) < 0.5) u = sign(u);
        float f = floor(fract(r.w * 37.9) * 6.0);
        vec3 cb = f < 1.0 ? vec3(1.0, u, v) : f < 2.0 ? vec3(-1.0, u, v) : f < 3.0 ? vec3(u, 1.0, v) : f < 4.0 ? vec3(u, -1.0, v) : f < 5.0 ? vec3(u, v, 1.0) : vec3(u, v, -1.0);
        cb *= 0.85;
        float c1 = cos(uRot), s1 = sin(uRot), c2 = cos(uRot * 0.6 + 0.5), s2 = sin(uRot * 0.6 + 0.5);
        cb = vec3(cb.x * c1 + cb.z * s1, cb.y, -cb.x * s1 + cb.z * c1);
        cb = vec3(cb.x, cb.y * c2 - cb.z * s2, cb.y * s2 + cb.z * c2);
        float k = clamp((uProg - r.w * 0.35) / 0.65, 0.0, 1.0); k = k * k * (3.0 - 2.0 * k);
        p = mix(cb, p, k);
        glow = sin(3.14159 * k) * 0.9;
      }
      p += vec3(sin(uTime*0.7 + r.w*40.0), cos(uTime*0.6 + r.w*31.0), sin(uTime*0.5 + r.w*17.0)) * 0.012 * (1.0 - w6);
      float cy = cos(uRotY), sy = sin(uRotY), cx = cos(uRotX), sx = sin(uRotX);
      vec3 q = vec3(p.x*cy + p.z*sy, p.y, -p.x*sy + p.z*cy);
      q = vec3(q.x, q.y*cx - q.z*sx, q.y*sx + q.z*cx);
      float persp = 3.2 / max(3.2 - q.z, 1.6);
      vec2 s = q.xy * persp * uScale;
      gl_Position = vec4(s.x / uAspect + uOffX, s.y + uOffY, 0.0, 1.0);
      gl_PointSize = uSize * (0.6 + r.w * 0.9) * persp * (1.0 + uFlash * 2.2);
      if (uMode > 4.5 && uMode < 5.5 && uProg < 1.0) gl_PointSize *= 0.55 + glow * 1.1;
      vec3 orange = vec3(0.969, 0.231, 0.125);
      vec3 ink = vec3(0.09, 0.067, 0.059);
      vec3 onWhite = r.w > 0.82 ? ink : (r.w > 0.55 ? vec3(1.0, 0.55, 0.42) : orange);
      vec3 onOrange = r.w > 0.82 ? ink : (r.w > 0.55 ? vec3(1.0, 0.82, 0.74) : vec3(1.0));
      vec3 c = mix(onWhite, onOrange, uBg);
      vec3 logoC = lc > 0.5 ? mix(orange, vec3(1.0), uBg) : ink;
      vColor = mix(mix(c, logoC, w6), orange, max(core * 0.85, glow * 0.9));
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
  ['w0', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'uTime', 'uBurst', 'uRotY', 'uRotX', 'uBg', 'uAspect', 'uScale', 'uOffX', 'uOffY', 'uSize', 'uDim', 'uTwist', 'uCollapse', 'uFlash', 'uGalaxy', 'uSpin', 'uMode', 'uProg', 'uRot'].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

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

  // ---------- Intro: vórtice → singularidad → explosión en el logo → primera figura ----------
  let introDone = reduced || scrollY > 10;
  try { if (sessionStorage.getItem('folziaIntro')) introDone = true; } catch (e) { /* sin almacenamiento */ }
  // Tiempos (s): giro hacia el centro, destello, explosión en el logo, pausa y salida
  const T_VORT = 1.6, T_FLASH = 1.85, T_LOGO = 2.45;
  // Variante de intro (por defecto 6, ADN): 1 galaxia, 2 escáner, 3 lluvia, 4 cubo, 5 hiperespacio, 6 ADN, 7 mar (?intro=N)
  const MODO = +(new URLSearchParams(location.search).get('intro') || 6);
  const T_HOLD = MODO === 1 ? 3.25 : MODO === 6 ? 2.45 : 3.0, T_OUT = T_HOLD + 0.7;
  let introStart = null;
  const finishIntro = () => { if (introDone) return; introDone = true; ready(); try { sessionStorage.setItem('folziaIntro', '1'); } catch (e) { /* nada */ } };
  ['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, finishIntro, { passive: true, once: true }));
  if (window.folziaQuieto()) introDone = true;
  if (introDone) ready();
  document.addEventListener('folzia:movimiento', finishIntro);

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
    let twist = 0, collapse = 0, flash = 0, galaxy = 0, spin = 0, modo = 1, prog = 1, rot = 0;

    // La intro manda durante los primeros segundos
    if (!introDone) {
      if (introStart === null) introStart = time;
      const t = time - introStart;
      w.fill(0);
      const easeOutBack = (x) => 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2);
      offX = 0; offY = 0;
      if (t < T_HOLD) {
        w[LOGO] = 1; scale = mobile ? 0.3 : 0.42;
        if (MODO === 2) { modo = 2; prog = clamp01((t - 0.25) / 1.7); }
        else if (MODO === 3) { modo = 3; prog = clamp01((t - 0.1) / 2.0); }
        else if (MODO === 4) { modo = 4; rot = t * 1.2 + t * t * 0.9; prog = clamp01((t - 1.2) / 1.2); }
        else if (MODO === 5) { modo = 5; prog = clamp01(t / 2.4); const v = Math.max(0, 1 - Math.max(0, t - 1.0) / 1.0); rot += 0; rot = t * 7 - Math.max(0, t - 1.0) * Math.max(0, t - 1.0) * 3.2; }
        else if (MODO === 6) { modo = 6; rot = t * 2.4; prog = clamp01((t - 1.0) / 0.8); }
        else if (MODO === 7) { modo = 7; rot = t; prog = clamp01((t - 0.2) / 2.2); }
        else if (t < T_VORT) {
          // Las partículas llegan girando en espiral y se comprimen hacia el centro
          const k = t / T_VORT, e = k * k * (3 - 2 * k);
          // Primero gira despacio a tamaño completo; al contraerse acelera, como un remolino
          galaxy = 1; spin = k * 1.6 + k * k * k * 6.5; collapse = Math.pow(e, 2.3); twist = 0.5 * e;
        } else if (t < T_FLASH) {
          // Singularidad: todo en un punto que destella
          const k = (t - T_VORT) / (T_FLASH - T_VORT);
          collapse = 1; twist = 0.5; flash = Math.sin(Math.PI * k);
        } else {
          // Onda expansiva: el logo aparece con un pequeño rebote
          const k = clamp01((t - T_FLASH) / (T_LOGO - T_FLASH));
          collapse = 1 - easeOutBack(k); twist = 0.5 * (1 - k) * (1 - k) * (1 - k); flash = Math.max(0, 1 - k * 3) * 0.6;
          burst = Math.sin(Math.PI * k) * 0.12;
        }
      } else {
        const m = sm(clamp01((t - T_HOLD) / (T_OUT - T_HOLD)));
        w[LOGO] = 1 - m; w[A.shape] += m;
        burst = Math.sin(Math.PI * m) * 0.7;
        twist = -Math.sin(Math.PI * m) * 1.1;
        offX = lerp(0, A.x, m); offY = lerp(0, A.y, m);
        scale = lerp(mobile ? 0.3 : 0.42, mobile ? 0.34 : 0.46, m);
        if (t > T_HOLD + 0.2) ready();
        if (t >= T_OUT) finishIntro();
      }
    }

    for (let j = 0; j < 7; j++) gl.uniform1f(U['w' + j], w[j]);
    const logoW = w[LOGO];
    gl.uniform1f(U.uTime, reduced || window.folziaQuieto() ? 0 : time);
    gl.uniform1f(U.uBurst, burst);
    gl.uniform1f(U.uRotY, ((reduced || window.folziaQuieto() ? 0 : Math.sin(time * 0.25) * 0.35) + smx * 0.6) * (1 - logoW));
    gl.uniform1f(U.uRotX, ((reduced || window.folziaQuieto() ? 0 : Math.sin(time * 0.2) * 0.08) - smy * 0.3) * (1 - logoW));
    gl.uniform1f(U.uBg, bg);
    gl.uniform1f(U.uAspect, W / H);
    gl.uniform1f(U.uScale, scale);
    gl.uniform1f(U.uOffX, offX);
    gl.uniform1f(U.uOffY, offY);
    gl.uniform1f(U.uSize, (mobile ? 3.0 : 3.4) * dpr);
    gl.uniform1f(U.uDim, dim);
    gl.uniform1f(U.uTwist, twist);
    gl.uniform1f(U.uCollapse, collapse);
    gl.uniform1f(U.uFlash, flash);
    gl.uniform1f(U.uGalaxy, galaxy);
    gl.uniform1f(U.uSpin, spin);
    gl.uniform1f(U.uMode, modo);
    gl.uniform1f(U.uProg, prog);
    gl.uniform1f(U.uRot, rot);

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

// Vídeos de las apps: solo se reproducen a la vista. En el portátil se encadenan las tres apps con un fundido.
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const quieto = () => (window.folziaQuieto ? window.folziaQuieto() : false);
  const play = (v) => { if (quieto()) return; const p = v.play(); if (p) p.catch(() => {}); };
  const enVista = new Set();

  // Teléfonos: cada vídeo en bucle mientras se ve
  const moviles = [...document.querySelectorAll('.phone-frame .vid')];
  const ioMovil = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { enVista.add(e.target); e.target.preload = 'auto'; play(e.target); } else { enVista.delete(e.target); e.target.pause(); }
  }), { threshold: 0.35 });
  document.addEventListener('folzia:movimiento', (e) => {
    if (e.detail.quieto) document.querySelectorAll('video').forEach((v) => v.pause());
    else enVista.forEach(play);
  });
  moviles.forEach((v) => ioMovil.observe(v));

  // Portátil
  const desk = document.getElementById('desk');
  const vids = [...document.querySelectorAll('.desk-vid')];
  const tabs = [...document.querySelectorAll('.desk-tabs [data-n]')];
  if (!desk || !vids.length) return;
  let actual = 0, visible = false;
  const barra = (i) => tabs[i].querySelector('.bar i');
  function mostrar(i) {
    const antes = vids[actual];
    actual = i;
    const v = vids[i];
    v.currentTime = 0;
    if (visible) play(v);
    vids.forEach((x) => x.classList.toggle('on', x === v));
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); barra(k).style.width = '0'; });
    // El anterior se para cuando ya se ha fundido
    if (antes !== v) setTimeout(() => { if (vids[actual] !== antes) antes.pause(); }, 500);
  }
  vids.forEach((v, i) => {
    v.addEventListener('ended', () => { if (i === actual) mostrar((i + 1) % vids.length); });
    v.addEventListener('timeupdate', () => { if (i === actual && v.duration) barra(i).style.width = `${(v.currentTime / v.duration) * 100}%`; });
  });
  tabs.forEach((t, i) => t.addEventListener('click', () => mostrar(i)));
  document.addEventListener('folzia:movimiento', (e) => { if (!e.detail.quieto && visible) play(vids[actual]); });
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) { vids.forEach((v) => { v.preload = 'auto'; }); play(vids[actual]); } else vids[actual].pause();
  }, { threshold: 0.3 }).observe(desk);
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

  // Errores junto a cada campo (WCAG 3.3.1): se anuncian y se quitan en cuanto el campo es válido
  const contenedor = (el) => el.closest('.field, .consent');
  const mensaje = (el) => {
    const v = el.validity;
    if (el.type === 'checkbox') return 'Necesito tu consentimiento para poder responderte.';
    if (el.type === 'radio' || el.tagName === 'SELECT') return v.valueMissing ? 'Elige una opción.' : '';
    if (v.valueMissing) return 'Este campo es obligatorio.';
    if (v.typeMismatch && el.type === 'email') return 'Escribe un correo válido, por ejemplo nombre@empresa.com.';
    if (v.tooLong) return 'El texto es demasiado largo.';
    return 'Revisa este campo.';
  };
  const grupo = (el) => (el.type === 'radio' ? [...form.querySelectorAll(`input[name="${el.name}"]`)] : [el]);
  function quitarError(el) {
    const c = contenedor(el); const p = c && c.querySelector('.err');
    if (p) p.remove();
    grupo(el).forEach((x) => { x.removeAttribute('aria-invalid'); x.removeAttribute('aria-describedby'); });
  }
  function ponerError(el) {
    const c = contenedor(el); if (!c) return;
    quitarError(el);
    const p = document.createElement('span'); p.className = 'err'; p.id = 'err-' + el.name; p.textContent = mensaje(el);
    c.appendChild(p);
    grupo(el).forEach((x) => { x.setAttribute('aria-invalid', 'true'); x.setAttribute('aria-describedby', p.id); });
  }
  form.addEventListener('input', (e) => { if (e.target.name && e.target.validity && e.target.validity.valid) quitarError(e.target); });
  form.addEventListener('change', (e) => { if (e.target.name && e.target.validity && e.target.validity.valid) quitarError(e.target); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      const vistos = new Set(); const malos = [];
      [...form.elements].forEach((el) => { if (!el.name || vistos.has(el.name) || !el.willValidate) return; vistos.add(el.name); if (!el.validity.valid) { ponerError(el); malos.push(el); } else quitarError(el); });
      status.textContent = malos.length === 1 ? 'Revisa el campo marcado.' : `Revisa los ${malos.length} campos marcados.`;
      if (malos[0]) malos[0].focus();
      return;
    }
    const endpoint = form.getAttribute('action');
    if (!endpoint) {
      status.textContent = 'El formulario todavía no está conectado. Escríbeme directamente por correo, por favor.';
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
      status.textContent = 'Recibido. Te escribiré para hablar de tu proyecto.';
    } catch (err) {
      status.textContent = 'No se ha podido enviar. Revisa tu conexión e inténtalo de nuevo, o escríbeme por correo.';
    } finally {
      button.disabled = false;
    }
  });
})();
