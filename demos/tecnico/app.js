// Frigo Norte (demo): avisos del día del técnico, revisión con lecturas, materiales, firma del cliente y parte.
const HOY = new Date(2026, 9, 14, 9, 38);
const AVISOS = [
  { id: 1182, h: '08:00–09:00', cli: 'Farmacia Puerto', dir: 'C/ Mayor 14, bajo', tipo: 'Preventivo', est: 'hecho', eq: 'Cassette 4 vías · 10 kW · R-32', urg: false },
  { id: 1185, h: '09:30–10:30', cli: 'Restaurante Mareas', dir: 'Paseo del Muelle 3', tipo: 'Avería', est: 'pend', eq: 'Cámara frigorífica · equipo partido · R-449A', urg: true, nota: 'La cámara no baja de 9 °C desde anoche. Género dentro.', contacto: 'Iñaki · encargado de cocina', serie: 'CF-2219-0457', ult: 'Revisión preventiva el 12 may 2026' },
  { id: 1187, h: '11:00–12:00', cli: 'Oficinas Atalaya', dir: 'Av. de Galicia 88, 3.º', tipo: 'Preventivo', est: 'pend', eq: '3 splits 1x1 · 3,5 kW · R-32', urg: false },
  { id: 1190, h: '12:30–14:00', cli: 'Clínica dental Robles', dir: 'C/ Uría 41, 1.º B', tipo: 'Instalación', est: 'pend', eq: 'Split 1x1 · 5,0 kW · R-32 (nuevo)', urg: false },
  { id: 1194, h: '16:00–17:00', cli: 'Panadería Lorea', dir: 'C/ San Bernabé 6', tipo: 'Preventivo', est: 'pend', eq: 'Bomba de calor · 7 kW · R-32', urg: false },
];
const CHECKS = ['Limpieza de filtros y batería', 'Revisión de desagüe y bandeja', 'Estado del aislamiento de tuberías', 'Ventiladores y rodamientos', 'Prueba de fugas con detector'];
const LECTURAS = [
  { id: 'pb', n: 'Presión de baja', u: 'bar', min: 1.5, max: 3.5 },
  { id: 'pa', n: 'Presión de alta', u: 'bar', min: 14, max: 22 },
  { id: 'ti', n: 'Temperatura de cámara', u: '°C', min: 0, max: 4 },
  { id: 'ic', n: 'Consumo del compresor', u: 'A', min: 4, max: 9 },
];
const MATERIALES = [
  { id: 'gas', n: 'Refrigerante R-449A', u: 'kg', paso: 0.5, p: 68 },
  { id: 'val', n: 'Válvula de expansión', u: 'ud', paso: 1, p: 142 },
  { id: 'fil', n: 'Filtro deshidratador', u: 'ud', paso: 1, p: 26 },
  { id: 'pre', n: 'Presostato de alta', u: 'ud', paso: 1, p: 58 },
];

const $ = (s) => document.querySelector(s);
const hhmm = (d) => d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
const num = (v) => parseFloat(String(v).replace(',', '.'));
const eur = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const st = { vista: 'hoy', aviso: null, tab: 'revision', llegada: null, checks: {}, lect: {}, mat: {}, obs: '', firmado: false, firmante: '', reloj: 0 };

// ---------- Hoy ----------
function hoy() {
  const hechos = AVISOS.filter((a) => a.est === 'hecho').length;
  return `
  <header class="bar">
    <div class="bar-row"><svg class="logo"><use href="#logo"/></svg><div class="who"><b>Rubén Prieto</b><span>Furgoneta 07 · Zona centro</span></div><span class="demo">demo</span></div>
    <h1>${HOY.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</h1>
    <div class="dayprog"><div class="dp-bar">${AVISOS.map((a) => `<i class="${a.est}"></i>`).join('')}</div><span>${hechos} de ${AVISOS.length} avisos</span></div>
  </header>
  <ol class="jobs">${AVISOS.map((a) => `
    <li><button type="button" class="job ${a.est} ${a.urg ? 'urg' : ''}" data-aviso="${a.id}">
      <span class="j-time">${a.h.replace('–', '<br>')}</span>
      <span class="j-main"><span class="j-top"><b>${a.cli}</b>${a.urg ? '<em class="flag">Urgente</em>' : ''}</span><span class="j-dir">${a.dir}</span><span class="j-eq"><i class="type">${a.tipo}</i>${a.eq}</span></span>
      <span class="j-st">${a.est === 'hecho' ? '<svg><use href="#i-check"/></svg>' : a.est === 'curso' ? '<span class="pulse"></span>' : ''}</span>
    </button></li>`).join('')}</ol>`;
}

// ---------- Aviso ----------
function aviso() {
  const a = AVISOS.find((x) => x.id === st.aviso);
  const enSitio = st.llegada ? Math.max(0, Math.round(st.reloj)) : 0;
  return `
  <header class="bar slim">
    <div class="bar-row"><button type="button" class="back" data-go="hoy" aria-label="Volver"><svg><use href="#i-back"/></svg></button><div class="who"><b>Aviso ${a.id}</b><span>${a.tipo}${a.urg ? ' · urgente' : ''}</span></div>${st.llegada ? `<span class="onsite"><svg><use href="#i-clock"/></svg>${String(Math.floor(enSitio / 60)).padStart(2, '0')}:${String(enSitio % 60).padStart(2, '0')}</span>` : ''}</div>
  </header>
  <section class="client">
    <h1>${a.cli}</h1>
    <p class="addr"><svg><use href="#i-pin"/></svg>${a.dir}</p>
    <p class="addr"><svg><use href="#i-phone"/></svg>${a.contacto || 'Contacto en recepción'}</p>
    ${a.nota ? `<p class="note"><svg><use href="#i-warn"/></svg>${a.nota}</p>` : ''}
    <div class="equip"><svg><use href="#i-unit"/></svg><div><b>${a.eq}</b><span>N.º de serie ${a.serie || '—'} · ${a.ult || 'Sin visitas previas'}</span></div></div>
  </section>
  ${st.llegada ? `
  <nav class="seg" aria-label="Pasos">${[['revision', 'Revisión'], ['material', 'Material'], ['cierre', 'Cierre']].map(([k, n]) => `<button type="button" data-tab="${k}" aria-current="${st.tab === k}">${n}${k === 'revision' ? ` <small>${Object.keys(st.checks).length + Object.keys(st.lect).filter((x) => st.lect[x] !== '').length}/${CHECKS.length + LECTURAS.length}</small>` : ''}</button>`).join('')}</nav>
  <section class="pane">${{ revision, material, cierre }[st.tab]()}</section>` : `
  <div class="arrive"><button type="button" class="big" data-arrive>He llegado</button><p>Registra la hora de llegada y empieza el parte.</p></div>`}`;
}
function revision() {
  return `
  <h2>Comprobaciones</h2>
  <ul class="checks">${CHECKS.map((c, i) => `<li><span>${c}</span><div class="okko">${['ok', 'ko'].map((v) => `<button type="button" data-check="${i}" data-v="${v}" aria-pressed="${st.checks[i] === v}">${v.toUpperCase()}</button>`).join('')}</div></li>`).join('')}</ul>
  <h2>Lecturas</h2>
  <div class="reads">${LECTURAS.map((l) => {
    const v = st.lect[l.id]; const n = num(v); const fuera = v !== undefined && v !== '' && (n < l.min || n > l.max);
    return `<label class="read ${fuera ? 'out' : v ? 'in' : ''}"><span>${l.n}</span><div><input inputmode="decimal" data-read="${l.id}" value="${v ?? ''}" placeholder="—"><em>${l.u}</em></div><small>${fuera ? `Fuera de rango (${String(l.min).replace('.', ',')}–${l.max})` : `Normal ${String(l.min).replace('.', ',')}–${l.max} ${l.u}`}</small></label>`;
  }).join('')}</div>`;
}
function material() {
  const total = MATERIALES.reduce((a, m) => a + (st.mat[m.id] || 0) * m.p, 0);
  return `
  <h2>Material usado</h2>
  <ul class="mats">${MATERIALES.map((m) => { const q = st.mat[m.id] || 0; return `<li class="${q ? 'on' : ''}"><div><b>${m.n}</b><span>${eur(m.p)} / ${m.u}</span></div><div class="stepper"><button type="button" data-mat="${m.id}" data-d="-1" aria-label="Menos">−</button><output>${String(q).replace('.', ',')} ${m.u}</output><button type="button" data-mat="${m.id}" data-d="1" aria-label="Más">+</button></div></li>`; }).join('')}</ul>
  <p class="mtot"><span>Material</span><b>${eur(total)}</b></p>`;
}
function cierre() {
  return `
  <h2>Trabajo realizado</h2>
  <textarea id="obs" rows="4" placeholder="Qué se ha hecho, qué queda pendiente…">${st.obs}</textarea>
  <h2>Conformidad del cliente</h2>
  <div class="sign"><canvas id="pad" width="680" height="300" aria-label="Firma del cliente"></canvas><span class="sign-hint">${st.firmado ? '' : 'Firme aquí'}</span><button type="button" class="clear" data-clear>Borrar</button></div>
  <input id="firmante" class="who-in" placeholder="Nombre de quien firma" value="${st.firmante}">
  <button type="button" class="big" data-close ${st.firmado ? '' : 'disabled'}>Cerrar parte y enviar</button>`;
}

// ---------- Parte cerrado ----------
function parte() {
  const a = AVISOS.find((x) => x.id === st.aviso);
  const mats = MATERIALES.filter((m) => st.mat[m.id]);
  const total = mats.reduce((t, m) => t + st.mat[m.id] * m.p, 0) + 85;
  const kos = CHECKS.filter((_, i) => st.checks[i] === 'ko');
  return `
  <header class="bar done-bar"><svg class="okbig"><use href="#i-check"/></svg><h1>Parte ${a.id} cerrado</h1><p>Enviado a ${a.cli} y a la oficina · ${hhmm(new Date(HOY.getTime() + 52 * 60000))}</p></header>
  <section class="report">
    <dl><div><dt>Llegada</dt><dd>${hhmm(st.llegada)}</dd></div><div><dt>Salida</dt><dd>${hhmm(new Date(HOY.getTime() + 52 * 60000))}</dd></div><div><dt>Tiempo</dt><dd>52 min</dd></div></dl>
    <h2>Resultado</h2>
    <p>${st.obs || 'Revisión completa del equipo.'}</p>
    ${kos.length ? `<p class="ko">Incidencias: ${kos.join(', ').toLowerCase()}.</p>` : ''}
    <h2>Importe</h2>
    <table>${mats.map((m) => `<tr><td>${m.n} · ${String(st.mat[m.id]).replace('.', ',')} ${m.u}</td><td>${eur(st.mat[m.id] * m.p)}</td></tr>`).join('')}<tr><td>Mano de obra · 1 h</td><td>${eur(85)}</td></tr><tr class="t"><td>Total sin IVA</td><td>${eur(total)}</td></tr></table>
    <p class="signed">Conforme: ${st.firmante || 'Cliente'}</p>
    <button type="button" class="big ghost" data-go="hoy">Siguiente aviso</button>
  </section>`;
}

// ---------- Firma ----------
function prepararFirma() {
  const c = $('#pad'); if (!c) return;
  const x = c.getContext('2d');
  x.lineWidth = 4.5; x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = '#0b3c49';
  let pintando = false, last = null;
  const pos = (e) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * (c.width / r.width), (e.clientY - r.top) * (c.height / r.height)]; };
  c.addEventListener('pointerdown', (e) => { pintando = true; last = pos(e); c.setPointerCapture(e.pointerId); });
  c.addEventListener('pointermove', (e) => { if (!pintando) return; const p = pos(e); x.beginPath(); x.moveTo(...last); x.lineTo(...p); x.stroke(); last = p; if (!st.firmado) { st.firmado = true; document.querySelector('[data-close]').disabled = false; document.querySelector('.sign-hint').textContent = ''; } });
  c.addEventListener('pointerup', () => { pintando = false; });
}

// Repinta solo las pestañas y el panel del paso actual, sin mover la pantalla
function pintarPaso() {
  const seg = document.querySelector('.seg'), pane = document.querySelector('.pane');
  if (!seg || !pane) { pintar(); return; }
  const tmp = document.createElement('div'); tmp.innerHTML = aviso();
  seg.replaceWith(tmp.querySelector('.seg')); pane.replaceWith(tmp.querySelector('.pane'));
  if (st.tab === 'cierre') prepararFirma();
}
function pintar() {
  $('#app').innerHTML = st.vista === 'hoy' ? hoy() : st.vista === 'aviso' ? aviso() : parte();
  if (st.vista === 'aviso' && st.tab === 'cierre') prepararFirma();
}
function aviso2(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso2.t); aviso2.t = setTimeout(() => el.classList.remove('on'), 2400); }

document.addEventListener('click', (e) => {
  const av = e.target.closest('[data-aviso]');
  if (av) { const a = AVISOS.find((x) => x.id === +av.dataset.aviso); if (a.est === 'hecho') { aviso2('Este aviso ya está cerrado'); return; } st.aviso = a.id; st.vista = 'aviso'; pintar(); scrollTo(0, 0); return; }
  const go = e.target.closest('[data-go]'); if (go) { st.vista = go.dataset.go; pintar(); scrollTo(0, 0); return; }
  if (e.target.closest('[data-arrive]')) {
    st.llegada = new Date(HOY); st.reloj = 0;
    const a = AVISOS.find((x) => x.id === st.aviso); a.est = 'curso';
    pintar(); aviso2(`Llegada registrada a las ${hhmm(st.llegada)}`);
    clearInterval(st.tic); st.tic = setInterval(() => { st.reloj += 1; const el = document.querySelector('.onsite'); if (el) el.lastChild.textContent = `${String(Math.floor(st.reloj / 60)).padStart(2, '0')}:${String(st.reloj % 60).padStart(2, '0')}`; }, 1000);
    return;
  }
  const tab = e.target.closest('[data-tab]'); if (tab) { st.tab = tab.dataset.tab; pintarPaso(); const s = document.querySelector('.seg'); if (s.getBoundingClientRect().top > 80) scrollTo({ top: scrollY + s.getBoundingClientRect().top - 70, behavior: 'smooth' }); return; }
  const ck = e.target.closest('[data-check]'); if (ck) { st.checks[ck.dataset.check] = ck.dataset.v; pintarPaso(); return; }
  const m = e.target.closest('[data-mat]'); if (m) { const mm = MATERIALES.find((x) => x.id === m.dataset.mat); st.mat[mm.id] = Math.max(0, (st.mat[mm.id] || 0) + mm.paso * +m.dataset.d); pintarPaso(); return; }
  if (e.target.closest('[data-clear]')) { st.firmado = false; pintarPaso(); return; }
  if (e.target.closest('[data-close]')) {
    const a = AVISOS.find((x) => x.id === st.aviso); a.est = 'hecho'; clearInterval(st.tic);
    st.vista = 'parte'; pintar(); scrollTo(0, 0);
  }
});
document.addEventListener('input', (e) => {
  if (e.target.dataset.read) {
    st.lect[e.target.dataset.read] = e.target.value;
    const l = LECTURAS.find((x) => x.id === e.target.dataset.read); const lab = e.target.closest('.read'); const n = num(e.target.value);
    const fuera = e.target.value !== '' && (n < l.min || n > l.max);
    lab.classList.toggle('out', fuera); lab.classList.toggle('in', !fuera && e.target.value !== '');
    lab.querySelector('small').textContent = fuera ? `Fuera de rango (${String(l.min).replace('.', ',')}–${l.max})` : `Normal ${String(l.min).replace('.', ',')}–${l.max} ${l.u}`;
  }
  if (e.target.id === 'obs') st.obs = e.target.value;
  if (e.target.id === 'firmante') st.firmante = e.target.value;
});
pintar();
