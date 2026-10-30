// VÍA (demo): ruta de reparto con mapa, escaneo de bultos y prueba de entrega con firma.
const PARADAS = [
  { n: 'Óptica Lumen', dir: 'C/ Colón 18', rec: 'Marta · dependienta', b: 2, eta: '09:05', est: 'ok' },
  { n: 'Farmacia Ruzafa', dir: 'C/ Sueca 41', rec: 'Recepción', b: 1, eta: '09:18', est: 'ok' },
  { n: 'Estudio Calma', dir: 'C/ Cádiz 7, 2.º', rec: 'Ana Bel', b: 3, eta: '09:31', est: 'ok' },
  { n: 'Laura Peris', dir: 'C/ Literato Azorín 22, 4.º C', rec: 'Particular', b: 1, eta: '09:44', est: 'ko', nota: 'Ausente · aviso dejado' },
  { n: 'Ferretería Nova', dir: 'Av. Reino de Valencia 64', rec: 'Paco · mostrador', b: 4, eta: '09:58', est: 'next', tel: true },
  { n: 'Bodega La Tasca', dir: 'C/ Puerto Rico 12', rec: 'Cocina', b: 2, eta: '10:12', est: 'pend' },
  { n: 'Coworking Pinazo', dir: 'C/ Pintor Salvador Abril 31', rec: 'Recepción', b: 1, eta: '10:25', est: 'pend' },
  { n: 'Clínica Dental Sur', dir: 'C/ Cuba 55', rec: 'Recepción', b: 2, eta: '10:39', est: 'pend' },
];
const TOTAL = 32;
const $ = (s) => document.querySelector(s);
const st = { vista: 'ruta', sel: 4, escaneados: [], firmado: false, prueba: 'firma' };

// ---------- Mapa: capa base con calles y edificios reales (OpenStreetMap, ver mapa-osm.js) ----------
const linea = (pts) => 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' L');
// Punto a una fracción t del recorrido; devuelve [hecho, resto, punto, rumbo]
function partir(pts, t) {
  const L = pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  let falta = L * t;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i], l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (falta <= l) {
      const q = [a[0] + (b[0] - a[0]) * (falta / l), a[1] + (b[1] - a[1]) * (falta / l)];
      return [[...pts.slice(0, i), q], [q, ...pts.slice(i)], q, Math.atan2(b[1] - a[1], b[0] - a[0])];
    }
    falta -= l;
  }
  return [pts, [pts[pts.length - 1]], pts[pts.length - 1], 0];
}
// Próximo giro desde la posición de la furgoneta: distancia en metros y sentido
function giro(resto) {
  let m = 0;
  for (let i = 1; i < resto.length - 1; i++) {
    const a = resto[i - 1], b = resto[i], c = resto[i + 1];
    m += Math.hypot(b[0] - a[0], b[1] - a[1]);
    const r1 = Math.atan2(b[1] - a[1], b[0] - a[0]), r2 = Math.atan2(c[1] - b[1], c[0] - b[0]);
    let dr = r2 - r1; while (dr > Math.PI) dr -= 2 * Math.PI; while (dr < -Math.PI) dr += 2 * Math.PI;
    if (Math.abs(dr) > 0.6) return { m: Math.round(m * MAPA.mpp / 10) * 10, lado: dr > 0 ? 'derecha' : 'izquierda' };
  }
  const u = resto[resto.length - 1], v = resto[resto.length - 2] || u;
  return { m: Math.round((m + Math.hypot(u[0] - v[0], u[1] - v[1])) * MAPA.mpp / 10) * 10, lado: null };
}
function mapa() {
  const { W, H } = MAPA;
  const pos = PARADAS.map((p, i) => MAPA.paradas[i]);
  const trazo = (d, c, w, extra = '') => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  let s = MAPA.base;
  const [hecho, resto, van, rumbo] = partir(MAPA.tramos[st.sel - 1] || [pos[0], pos[0]], 0.45);
  // Tramos ya recorridos, en gris
  MAPA.tramos.slice(0, st.sel - 1).concat([hecho]).forEach((t) => { s += trazo(linea(t), '#fff', 7) + trazo(linea(t), '#9d9c97', 4); });
  // Tramos pendientes, punteados
  MAPA.tramos.slice(st.sel).forEach((t) => { s += trazo(linea(t), '#fff', 6, 'stroke-opacity=".9"') + trazo(linea(t), '#141414', 3, 'stroke-opacity=".55" stroke-dasharray=".5 6"'); });
  // Tramo activo hasta la parada siguiente, en azul de navegación
  s += trazo(linea(resto), '#1748b8', 9) + trazo(linea(resto), '#2a6df4', 6);
  s += MAPA.rotulos;
  PARADAS.forEach((p, i) => {
    const [x, y] = pos[i];
    if (p.est === 'next') {
      s += `<circle cx="${x}" cy="${y}" r="22" fill="#d7261e" fill-opacity=".16" stroke="none" class="pulse"/><g transform="translate(${x} ${y})"><path d="M0 0 C-4 -9 -15 -14 -15 -26 A15 15 0 1 1 15 -26 C15 -14 4 -9 0 0Z" fill="#d7261e" stroke="#fff" stroke-width="2.5"/><text y="-21.5" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">${i + 1}</text></g>`;
      return;
    }
    const c = p.est === 'ok' ? '#141414' : p.est === 'ko' ? '#9b9b98' : '#fff';
    s += `<circle cx="${x}" cy="${y}" r="9" fill="${c}" stroke="${p.est === 'pend' ? '#141414' : '#fff'}" stroke-width="2.2"/><text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="9.5" font-weight="800" fill="${p.est === 'pend' ? '#141414' : '#fff'}">${p.est === 'ok' ? '✓' : i + 1}</text>`;
  });
  // Furgoneta: punto azul con halo de precisión y cono de rumbo
  const g = (rumbo * 180) / Math.PI + 90;
  s += `<g transform="translate(${van[0].toFixed(1)} ${van[1].toFixed(1)})"><circle r="20" fill="#2a6df4" fill-opacity=".14" stroke="none"/><path d="M0 0 L-13 -26 A28 28 0 0 1 13 -26 Z" fill="url(#via-cono)" stroke="none" transform="rotate(${g.toFixed(0)})"/><circle r="8.5" fill="#2a6df4" stroke="#fff" stroke-width="3"/></g>`;
  // Escala y atribución
  const m = 100, px = m / MAPA.mpp;
  s += `<g transform="translate(12 ${H - 40})"><path d="M0 -5 V0 H${px.toFixed(1)} V-5" stroke="#4d4d4b" stroke-width="1.6" fill="none"/><text x="${(px / 2).toFixed(1)}" y="-6" text-anchor="middle" font-size="9" font-weight="700" fill="#4d4d4b" class="lbl">${m} m</text></g>`;
  s += `<text x="${W - 8}" y="${H - 30}" text-anchor="end" font-size="7.5" fill="#6d6c68" class="lbl">© OpenStreetMap</text>`;
  const defs = '<defs><radialGradient id="via-cono" cx="0.5" cy="1" r="1"><stop offset="0" stop-color="#2a6df4" stop-opacity=".55"/><stop offset="1" stop-color="#2a6df4" stop-opacity="0"/></radialGradient></defs>';
  return { svg: `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa de la ruta">${defs}${s}</svg>`, giro: giro(resto) };
}

// ---------- Ruta ----------
function ruta() {
  const hechas = 13 + PARADAS.filter((p) => p.est === 'ok' || p.est === 'ko').length;
  const p = PARADAS[st.sel], m = mapa();
  return `
  <header class="bar"><svg class="logo"><use href="#logo"/></svg><div class="who"><b>Ruta VLC-07</b><span>Javier Soler · furgoneta 4417 KLM</span></div><span class="live">En ruta</span></header>
  <div class="map">${m.svg}
    <div class="turn"><svg><use href="#i-${m.giro.lado ? 'giro-' + m.giro.lado : 'meta'}"/></svg><div><b>${m.giro.m} m</b><span>${m.giro.lado ? `Gira a la ${m.giro.lado}` : 'Llegas al destino'}</span></div></div>
    <div class="eta"><b>${p.eta}</b><span>llegada · ${(MAPA.metros[st.sel - 1] / 1000 * 0.55 + 0.4).toFixed(1).replace('.', ',')} km</span></div>
  </div>
  <section class="sheet">
    <div class="grip"></div>
    <div class="prog"><div><b>${hechas}</b><span>/ ${TOTAL} entregas</span></div><div class="pbar"><i data-w="${(hechas / TOTAL) * 100}"></i></div><em>Fin estimado 13:40</em></div>
    <p class="k">Siguiente parada · ${st.sel + 1}</p>
    <h1>${p.n}</h1>
    <p class="addr">${p.dir}</p>
    <div class="facts"><span><svg><use href="#i-box"/></svg>${p.b} bultos</span><span>${p.rec}</span><span>Franja 09:30–11:00</span></div>
    <div class="acts"><button type="button" class="ghost"><svg><use href="#i-phone"/></svg>Llamar</button><button type="button" class="ghost"><svg><use href="#i-nav"/></svg>Navegar</button><button type="button" class="main" data-go="entrega">Llegué</button></div>
    <ol class="stops">${PARADAS.map((s, i) => `<li class="${s.est}"><span class="n">${s.est === 'ok' ? '<svg><use href="#i-check"/></svg>' : s.est === 'ko' ? '<svg><use href="#i-x"/></svg>' : i + 1}</span><div><b>${s.n}</b><small>${s.nota || s.dir}</small></div><time>${s.eta}</time></li>`).join('')}</ol>
    <p class="demo">Demo de Folzia · empresa y destinatarios ficticios.</p>
  </section>`;
}

// ---------- Escáner: vista de cámara simulada sobre la etiqueta real del bulto ----------
const codigos = () => Array.from({ length: PARADAS[st.sel].b }, (_, i) => `VIA${(48213 + st.sel * 17 + i * 3).toString().padStart(7, '0')}`);
const cam = { lock: null, cambio: null, desde: 0, raf: 0 };
const azar = (() => { let x = 7; return () => ((x = (x * 16807) % 2147483647) / 2147483647); })();
const lienzo = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
// Cartón: base kraft con fibras, generado una sola vez
const CARTON = (() => {
  const c = lienzo(700, 460), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 700, 460); g.addColorStop(0, '#c49563'); g.addColorStop(1, '#a87a49');
  x.fillStyle = g; x.fillRect(0, 0, 700, 460);
  for (let i = 0; i < 5200; i++) {
    const a = azar() * 700, b = azar() * 460, l = 2 + azar() * 9, r = azar() * Math.PI;
    x.strokeStyle = azar() < 0.5 ? `rgba(80,48,18,${0.05 + azar() * 0.1})` : `rgba(240,205,160,${0.05 + azar() * 0.1})`;
    x.lineWidth = 0.6 + azar(); x.beginPath(); x.moveTo(a, b); x.lineTo(a + Math.cos(r) * l, b + Math.sin(r) * l * 0.3); x.stroke();
  }
  for (let y = 0; y < 460; y += 9) { x.fillStyle = 'rgba(70,40,10,.035)'; x.fillRect(0, y, 700, 4); }
  return c;
})();
const GRANO = [0, 1, 2].map(() => { const c = lienzo(160, 160), x = c.getContext('2d'), d = x.createImageData(160, 160); for (let i = 0; i < d.data.length; i += 4) { const v = azar() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 22; } x.putImageData(d, 0, 0); return c; });
// Etiqueta de envío (a 2x) con código de barras Code128 real
const ETIQ = {};
function etiqueta(i) {
  const cod = codigos()[i], key = st.sel + ':' + i;
  if (ETIQ[key]) return ETIQ[key];
  const p = PARADAS[st.sel], c = lienzo(500, 320), x = c.getContext('2d'), F = getComputedStyle(document.body).fontFamily;
  x.fillStyle = '#f8f7f2'; x.fillRect(0, 0, 500, 320);
  x.fillStyle = '#141414'; x.fillRect(0, 0, 500, 54);
  x.fillStyle = '#fff'; x.font = `900 34px ${F}`; x.fillText('VÍA', 18, 39);
  x.font = `700 17px ${F}`; x.fillText('ENTREGA 24H', 100, 34);
  x.textAlign = 'right'; x.font = `800 26px ${F}`; x.fillText('VLC-07 · P' + (st.sel + 1), 482, 37); x.textAlign = 'left';
  x.fillStyle = '#141414'; x.font = `700 13px ${F}`; x.fillText('DESTINATARIO', 18, 82);
  x.font = `800 23px ${F}`; x.fillText(p.n, 18, 108);
  x.font = `500 17px ${F}`; x.fillText(p.dir, 18, 131); x.fillText('46005 València', 18, 152);
  x.strokeStyle = '#141414'; x.lineWidth = 2; x.strokeRect(372, 68, 110, 84);
  x.font = `700 12px ${F}`; x.fillText('BULTO', 384, 88);
  x.font = `900 30px ${F}`; x.fillText(`${i + 1}/${p.b}`, 384, 120);
  x.font = `600 14px ${F}`; x.fillText(`${(2.1 + i * 1.3).toFixed(1).replace('.', ',')} kg`, 384, 142);
  x.fillRect(18, 166, 464, 2);
  const bc = lienzo(10, 10); JsBarcode(bc, cod, { format: 'CODE128', width: 3, height: 96, displayValue: false, margin: 0, background: '#f8f7f2', lineColor: '#141414' });
  const bw = Math.min(bc.width, 440), bx = (500 - bw) / 2;
  x.drawImage(bc, bx, 182, bw, 96);
  x.textAlign = 'center'; x.font = `600 17px ${F}`; x.fillText(cod.replace(/^(VIA)(\d{3})(\d{4})$/, '$1 $2 $3'), 250, 302);
  return (ETIQ[key] = { c, caja: [bx - 10, 176, bw + 20, 108] });
}
function escena(x, W, H, t, i, dx) {
  // Pulso de la mano: deriva lenta y algo de temblor
  const ox = dx + Math.sin(t * 0.0011) * 5 + Math.sin(t * 0.0047) * 1.2, oy = Math.sin(t * 0.0009 + 1) * 4 + Math.sin(t * 0.0053) * 1;
  const rot = -0.05 + Math.sin(t * 0.0007) * 0.012, esc = 1 + Math.sin(t * 0.0006) * 0.015;
  x.save(); x.translate(W / 2 + ox, H / 2 + oy); x.rotate(rot * 0.4);
  x.drawImage(CARTON, -CARTON.width / 2 - 30, -CARTON.height / 2);
  // Cinta de embalar
  x.save(); x.rotate(0.06); const g = x.createLinearGradient(0, -H, 0, -H + 120); x.fillStyle = 'rgba(214,180,120,.55)'; x.fillRect(-CARTON.width / 2, -H * 0.62, CARTON.width, 64);
  x.fillStyle = 'rgba(255,255,255,.16)'; x.fillRect(-CARTON.width / 2, -H * 0.62 + 8, CARTON.width, 10); x.restore();
  x.restore();
  const e = etiqueta(i), s = (W * 0.78) / 500 * esc;
  x.save(); x.translate(W / 2 + ox * 1.15, H / 2 + oy * 1.15 + 4); x.rotate(rot); x.transform(1, 0.018, -0.03, 1, 0, 0); x.scale(s, s); x.translate(-250, -160);
  x.shadowColor = 'rgba(40,20,0,.45)'; x.shadowBlur = 18; x.shadowOffsetY = 6; x.drawImage(e.c, 0, 0); x.shadowColor = 'transparent';
  const m = x.getTransform(), [a, b, w, h] = e.caja; // getTransform incluye el dpr (2)
  const quad = [[a, b], [a + w, b], [a + w, b + h], [a, b + h]].map(([u, v]) => { const q = m.transformPoint(new DOMPoint(u, v)); return [q.x / 2, q.y / 2]; });
  x.restore();
  return quad;
}
function dibujarCam(t) {
  const c = $('#cam'); if (!c) { cam.raf = 0; return; }
  cam.raf = requestAnimationFrame(dibujarCam);
  const dpr = 2, W = c.clientWidth, H = c.clientHeight;
  if (c.width !== W * dpr) { c.width = W * dpr; c.height = H * dpr; }
  const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const p = PARADAS[st.sel], n = Math.min(st.escaneados.length, p.b - 1);
  let quad;
  if (cam.cambio) {
    const k = Math.min((t - cam.cambio) / 520, 1), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    escena(x, W, H, t, n - 1, -e * W * 1.15);
    quad = escena(x, W, H, t, n, (1 - e) * W * 1.15);
    if (k >= 1) cam.cambio = null;
  } else quad = escena(x, W, H, t, n, 0);
  // Luz de la escena, viñeta y grano del sensor
  let g = x.createRadialGradient(W * 0.3, H * 0.2, 10, W * 0.5, H * 0.5, W * 0.75);
  g.addColorStop(0, 'rgba(255,250,235,.16)'); g.addColorStop(0.55, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.5)');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.fillStyle = x.createPattern(GRANO[Math.floor(t / 70) % 3], 'repeat'); x.fillRect(0, 0, W, H);
  // Visor: esquinas del área de lectura
  const vw = W * 0.82, vh = H * 0.4, vx = (W - vw) / 2, vy = H * 0.47;
  x.strokeStyle = 'rgba(255,255,255,.95)'; x.lineWidth = 3.5; x.lineCap = 'round';
  [[vx, vy, 1, 1], [vx + vw, vy, -1, 1], [vx + vw, vy + vh, -1, -1], [vx, vy + vh, 1, -1]].forEach(([a, b, sx, sy]) => { x.beginPath(); x.moveTo(a, b + sy * 20); x.lineTo(a, b); x.lineTo(a + sx * 20, b); x.stroke(); });
  // Lectura: el recuadro verde se ajusta al código detectado
  if (cam.lock && !cam.cambio) {
    const k = Math.min((t - cam.lock.desde) / 160, 1);
    const cx = quad.reduce((a, q) => a + q[0], 0) / 4, cy = quad.reduce((a, q) => a + q[1], 0) / 4;
    const q2 = quad.map(([a, b]) => [cx + (a - cx) * (1.25 - 0.25 * k), cy + (b - cy) * (1.25 - 0.25 * k)]);
    x.beginPath(); q2.forEach(([a, b], j) => (j ? x.lineTo(a, b) : x.moveTo(a, b))); x.closePath();
    x.fillStyle = `rgba(52,199,110,${0.22 * k})`; x.fill(); x.strokeStyle = `rgba(52,199,110,${k})`; x.lineWidth = 3; x.lineJoin = 'round'; x.stroke();
    const txt = codigos()[cam.lock.i]; x.font = `800 13px ${getComputedStyle(document.body).fontFamily}`;
    const tw = x.measureText(txt).width + 34, top = Math.min(...q2.map((q) => q[1])) - 34;
    x.globalAlpha = k; x.fillStyle = '#34c76e'; x.beginPath(); x.roundRect(cx - tw / 2, top, tw, 26, 13); x.fill();
    x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('✓ ' + txt, cx, top + 17.5); x.textAlign = 'left'; x.globalAlpha = 1;
  }
}

// ---------- Entrega ----------
function entrega() {
  const p = PARADAS[st.sel];
  const codes = codigos();
  const listos = st.escaneados.length >= p.b;
  return `
  <header class="bar dark"><button type="button" class="back" data-go="ruta" aria-label="Volver"><svg><use href="#i-back"/></svg></button><div class="who"><b>${p.n}</b><span>Parada ${st.sel + 1} · ${p.b} bultos</span></div></header>
  <div class="scan ${listos ? 'done' : ''}">
    <div class="cam"><canvas id="cam" aria-label="Cámara apuntando a la etiqueta del bulto"></canvas><span class="cnt">${Math.min(st.escaneados.length + (listos ? 0 : 1), p.b)} / ${p.b}</span><span class="flashbtn" aria-hidden="true"><svg><use href="#i-flash"/></svg></span></div>
    <p>${listos ? 'Todos los bultos escaneados' : 'Encuadra el código de barras de la etiqueta'}</p>
    <button type="button" class="shoot" data-scan ${listos ? 'disabled' : ''} aria-label="Escanear"><svg><use href="#i-scan"/></svg></button>
  </div>
  <section class="sheet flat">
    <ul class="codes">${codes.map((c, i) => `<li class="${st.escaneados.includes(i) ? 'ok' : ''}"><span class="n">${st.escaneados.includes(i) ? '<svg><use href="#i-check"/></svg>' : i + 1}</span><b>${c}</b><em>${st.escaneados.includes(i) ? 'Escaneado' : 'Pendiente'}</em></li>`).join('')}</ul>
    ${listos ? `
    <p class="k">Prueba de entrega</p>
    <div class="seg">${[['firma', 'Firma'], ['foto', 'Foto'], ['vecino', 'Vecino']].map(([k, n]) => `<button type="button" data-prueba="${k}" aria-pressed="${st.prueba === k}">${n}</button>`).join('')}</div>
    <div class="pad"><canvas id="pad" width="700" height="260"></canvas><span>${st.firmado ? '' : 'Firma del destinatario'}</span></div>
    <button type="button" class="main wide" data-entregar ${st.firmado ? '' : 'disabled'}>Confirmar entrega</button>` : ''}
  </section>`;
}

function firma() {
  const c = $('#pad'); if (!c) return;
  const x = c.getContext('2d'); x.lineWidth = 5; x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = '#141414';
  let on = false, last = null;
  const pos = (e) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * (c.width / r.width), (e.clientY - r.top) * (c.height / r.height)]; };
  c.addEventListener('pointerdown', (e) => { on = true; last = pos(e); c.setPointerCapture(e.pointerId); });
  c.addEventListener('pointermove', (e) => { if (!on) return; const p = pos(e); x.beginPath(); x.moveTo(...last); x.lineTo(...p); x.stroke(); last = p; if (!st.firmado) { st.firmado = true; $('[data-entregar]').disabled = false; c.nextElementSibling.textContent = ''; } });
  c.addEventListener('pointerup', () => { on = false; });
}

function pintar() {
  $('#app').innerHTML = st.vista === 'ruta' ? ruta() : entrega();
  document.querySelectorAll('[data-w]').forEach((i) => { i.style.width = i.dataset.w + '%'; });
  if (st.vista === 'entrega') { firma(); if (!cam.raf) cam.raf = requestAnimationFrame(dibujarCam); }
}
function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2400); }

document.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]'); if (go) { st.vista = go.dataset.go; if (st.vista === 'entrega') { st.escaneados = []; st.firmado = false; } pintar(); scrollTo(0, 0); return; }
  if (e.target.closest('[data-scan]')) {
    const p = PARADAS[st.sel];
    if (cam.lock || st.escaneados.length >= p.b) return;
    cam.cambio = null;
    cam.lock = { i: st.escaneados.length, desde: performance.now() };
    requestAnimationFrame((t) => { cam.lock.desde = t; });
    if (navigator.vibrate) navigator.vibrate(40);
    setTimeout(() => {
      document.querySelector('.scan').classList.add('flash');
      st.escaneados.push(st.escaneados.length); cam.lock = null;
      pintar();
      if (st.escaneados.length < p.b) requestAnimationFrame((t) => { cam.cambio = t; });
      else aviso(`${p.b} de ${p.b} bultos escaneados`);
    }, 560);
    return;
  }
  const pr = e.target.closest('[data-prueba]'); if (pr) { st.prueba = pr.dataset.prueba; document.querySelectorAll('[data-prueba]').forEach((b) => b.setAttribute('aria-pressed', String(b === pr))); return; }
  if (e.target.closest('[data-entregar]')) {
    const p = PARADAS[st.sel]; p.est = 'ok';
    if (PARADAS[st.sel + 1]) { st.sel++; PARADAS[st.sel].est = 'next'; }
    st.vista = 'ruta'; pintar(); scrollTo(0, 0);
    aviso(`Entregado en ${p.n} · justificante enviado`);
  }
});
pintar();
