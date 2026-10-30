// VÍA (demo): ruta de reparto con mapa, escaneo de bultos y prueba de entrega con firma.
const PARADAS = [
  { n: 'Óptica Lumen', dir: 'C/ Colón 18', rec: 'Marta · dependienta', b: 2, eta: '09:05', est: 'ok', x: 48, y: 260 },
  { n: 'Farmacia Ruzafa', dir: 'C/ Sueca 41', rec: 'Recepción', b: 1, eta: '09:18', est: 'ok', x: 92, y: 205 },
  { n: 'Estudio Calma', dir: 'C/ Cádiz 7, 2.º', rec: 'Ana Bel', b: 3, eta: '09:31', est: 'ok', x: 150, y: 232 },
  { n: 'Laura Peris', dir: 'C/ Literato Azorín 22, 4.º C', rec: 'Particular', b: 1, eta: '09:44', est: 'ko', x: 190, y: 180, nota: 'Ausente · aviso dejado' },
  { n: 'Ferretería Nova', dir: 'Av. Reino de Valencia 64', rec: 'Paco · mostrador', b: 4, eta: '09:58', est: 'next', x: 236, y: 140, tel: true },
  { n: 'Bodega La Tasca', dir: 'C/ Puerto Rico 12', rec: 'Cocina', b: 2, eta: '10:12', est: 'pend', x: 290, y: 165 },
  { n: 'Coworking Pinazo', dir: 'C/ Pintor Salvador Abril 31', rec: 'Recepción', b: 1, eta: '10:25', est: 'pend', x: 320, y: 98 },
  { n: 'Clínica Dental Sur', dir: 'C/ Cuba 55', rec: 'Recepción', b: 2, eta: '10:39', est: 'pend', x: 352, y: 140 },
];
const TOTAL = 32;
const $ = (s) => document.querySelector(s);
const st = { vista: 'ruta', sel: 4, escaneados: [], firmado: false, prueba: 'firma' };

// ---------- Mapa (SVG dibujado aquí, sin servicios externos) ----------
function mapa(alto) {
  const W = 390, H = alto;
  let s = `<rect width="${W}" height="${H}" fill="#ecebe7" stroke="none"/>`;
  s += `<path d="M-20 ${H * 0.82} C 90 ${H * 0.7}, 170 ${H * 0.98}, 260 ${H * 0.8} S 360 ${H * 0.6}, 420 ${H * 0.66}" stroke="#cfdde3" stroke-width="26" fill="none"/>`;
  s += `<path d="M18 22 L118 14 L128 76 L30 86 Z" fill="#dde6d4" stroke="none"/><path d="M300 210 h70 v60 h-70z" fill="#dde6d4" stroke="none"/>`;
  for (let y = 18; y < H; y += 38) s += `<path d="M0 ${y} H${W}" stroke="#fff" stroke-width="${y % 76 === 18 ? 8 : 4}"/>`;
  for (let x = 14; x < W; x += 46) s += `<path d="M${x} 0 V${H}" stroke="#fff" stroke-width="${x % 92 === 14 ? 8 : 4}"/>`;
  s += `<path d="M0 ${H - 20} L${W} 30" stroke="#fff" stroke-width="10"/><path d="M0 ${H - 20} L${W} 30" stroke="#f3e7b8" stroke-width="4"/>`;
  const seg = (a, b) => `M${a.x} ${a.y} L${b.x} ${a.y} L${b.x} ${b.y}`;
  for (let i = 1; i < PARADAS.length; i++) {
    const hecho = ['ok', 'ko'].includes(PARADAS[i].est) || PARADAS[i].est === 'next';
    s += `<path d="${seg(PARADAS[i - 1], PARADAS[i])}" stroke="${hecho ? '#141414' : '#141414'}" stroke-opacity="${hecho ? 1 : 0.35}" stroke-width="${hecho ? 4.5 : 3}" fill="none" stroke-linejoin="round" ${hecho ? '' : 'stroke-dasharray="2 6" stroke-linecap="round"'}/>`;
  }
  PARADAS.forEach((p, i) => {
    const c = p.est === 'ok' ? '#141414' : p.est === 'ko' ? '#9b9b98' : p.est === 'next' ? '#d7261e' : '#fff';
    const t = p.est === 'pend' ? '#141414' : '#fff';
    const r = p.est === 'next' ? 14 : 10;
    s += `${p.est === 'next' ? `<circle cx="${p.x}" cy="${p.y}" r="24" fill="#d7261e" fill-opacity=".15" stroke="none" class="pulse"/>` : ''}<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${c}" stroke="${p.est === 'pend' ? '#141414' : '#fff'}" stroke-width="2.5"/><text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="${p.est === 'next' ? 12 : 10}" font-weight="800" fill="${t}">${p.est === 'ok' ? '✓' : i + 1}</text>`;
  });
  // La furgoneta va camino de la parada siguiente
  const sig = PARADAS[st.sel], ant = PARADAS[Math.max(st.sel - 1, 0)];
  const v = { x: (sig.x + ant.x) / 2, y: ant.y };
  s += `<g><circle cx="${v.x}" cy="${v.y}" r="9" fill="#2a6df4" stroke="#fff" stroke-width="3"/></g>`;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa de la ruta">${s}</svg>`;
}

// ---------- Ruta ----------
function ruta() {
  const hechas = 13 + PARADAS.filter((p) => p.est === 'ok' || p.est === 'ko').length;
  const p = PARADAS[st.sel];
  return `
  <header class="bar"><svg class="logo"><use href="#logo"/></svg><div class="who"><b>Ruta VLC-07</b><span>Javier Soler · furgoneta 4417 KLM</span></div><span class="live">En ruta</span></header>
  <div class="map">${mapa(330)}
    <div class="eta"><b>${p.eta}</b><span>llegada · 1,2 km</span></div>
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

// ---------- Entrega ----------
function entrega() {
  const p = PARADAS[st.sel];
  const codes = Array.from({ length: p.b }, (_, i) => `VIA-${(48213 + st.sel * 17 + i * 3).toString().padStart(6, '0')}`);
  const listos = st.escaneados.length >= p.b;
  return `
  <header class="bar dark"><button type="button" class="back" data-go="ruta" aria-label="Volver"><svg><use href="#i-back"/></svg></button><div class="who"><b>${p.n}</b><span>Parada ${st.sel + 1} · ${p.b} bultos</span></div></header>
  <div class="scan ${listos ? 'done' : ''}">
    <div class="cam"><div class="frame"><i></i><i></i><i></i><i></i><span class="laser"></span></div><div class="label"><span class="bars"></span><b>${codes[Math.min(st.escaneados.length, p.b - 1)]}</b></div></div>
    <p>${listos ? 'Todos los bultos escaneados' : 'Apunta al código del bulto'}</p>
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
  if (st.vista === 'entrega') firma();
}
function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2400); }

document.addEventListener('click', (e) => {
  const go = e.target.closest('[data-go]'); if (go) { st.vista = go.dataset.go; if (st.vista === 'entrega') { st.escaneados = []; st.firmado = false; } pintar(); scrollTo(0, 0); return; }
  if (e.target.closest('[data-scan]')) {
    const p = PARADAS[st.sel]; st.escaneados.push(st.escaneados.length);
    document.querySelector('.scan').classList.add('flash');
    if (navigator.vibrate) navigator.vibrate(40);
    setTimeout(() => { pintar(); if (st.escaneados.length >= p.b) aviso(`${p.b} de ${p.b} bultos escaneados`); }, 220);
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
