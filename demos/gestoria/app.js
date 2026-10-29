// Vértice asesores (demo): seguimiento de modelos trimestrales, bandeja de documentos y calendario fiscal.
const HOY = new Date(2026, 9, 12, 10, 24); // fecha fija de la demo: 12 de octubre de 2026
const PLAZO = new Date(2026, 9, 20);
const MODELOS = [
  { id: '303', n: 'IVA' }, { id: '111', n: 'Retenciones' }, { id: '115', n: 'Alquileres' }, { id: '130', n: 'IRPF' }, { id: '349', n: 'Intracom.' },
];
const ESTADOS = {
  docs: { n: 'Faltan documentos', c: 'docs' },
  revision: { n: 'En revisión', c: 'rev' },
  listo: { n: 'Listo para presentar', c: 'listo' },
  presentado: { n: 'Presentado', c: 'ok' },
};
const ORDEN = ['docs', 'revision', 'listo', 'presentado'];
const CLIENTES = [
  ['Panadería Esteve, S.L.', 'B·····412', 'Sociedad', 'IC', '303 111 115', 'Iván Esteve'],
  ['Laura Martín Cid', '·····318K', 'Autónoma', 'IC', '303 130', 'Laura Martín'],
  ['Talleres Ribas, S.L.', 'B·····907', 'Sociedad', 'RM', '303 111 349', 'Montse Ribas'],
  ['Estudio Nébula, S.L.P.', 'B·····233', 'Sociedad', 'AP', '303 111 115', 'Diego Ferrer'],
  ['Javier Ortega Vidal', '·····774M', 'Autónomo', 'RM', '303 130', 'Javier Ortega'],
  ['Clínica dental Sorolla', 'B·····561', 'Sociedad', 'IC', '111 115', 'Carmen Sorolla'],
  ['Marta Gil Andreu', '·····090P', 'Autónoma', 'AP', '303 130', 'Marta Gil'],
  ['Exportaciones Lleida, S.A.', 'A·····148', 'Sociedad', 'RM', '303 111 349', 'Pere Vall'],
  ['Hostal La Ribera', 'B·····655', 'Sociedad', 'IC', '303 111 115', 'Rosa Prats'],
  ['Andrés Peña Soler', '·····251T', 'Autónomo', 'AP', '303 130', 'Andrés Peña'],
  ['Viveros del Turia, S.L.', 'B·····389', 'Sociedad', 'RM', '303 111', 'Joan Turia'],
  ['Nuria Campos Rey', '·····612S', 'Autónoma', 'IC', '303 130 349', 'Nuria Campos'],
  ['Arquitectura Oeste, S.L.P.', 'B·····740', 'Sociedad', 'AP', '303 111 115', 'Sergio Oeste'],
  ['Pablo Sanz Ruiz', '·····503B', 'Autónomo', 'RM', '130', 'Pablo Sanz'],
];
const KEY = 'demo-gestoria-vertice';

const $ = (s) => document.querySelector(s);
const eur = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' }) + ' €';
const h = (n) => [...String(n)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 7);
const fechaCorta = (d) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');

// Estado inicial determinista: la mayoría avanzados, algunos atascados
function inicial() {
  const exp = {};
  CLIENTES.forEach(([n, , , , mods], ci) => mods.split(' ').forEach((m) => {
    const r = h(n + m) % 10;
    const est = r < 4 ? 'presentado' : r < 6 ? 'listo' : r < 8 ? 'revision' : 'docs';
    const base = (h(m + n) % 900) * 7 + 120;
    exp[`${ci}|${m}`] = { est, importe: m === '303' && r === 9 ? -base / 3 : base + (h(n) % 100) / 100, docs: [r !== 9, r !== 8 || m !== '303', r < 8], just: est === 'presentado' ? `${m}${(h(n + m) * 99991).toString().slice(0, 9)}` : null, dom: r % 2 === 0, pedido: false };
  }));
  return { exp, archivados: [] };
}
let db;
try { db = JSON.parse(localStorage.getItem(KEY)) || inicial(); } catch (e) { db = inicial(); }
const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* sin almacenamiento */ } };
const estado = { sel: null, filtro: '', gestor: '', q: '', vista: 'trimestre', doc: 0 };

// ---------- Trimestre ----------
function cuenta() {
  const c = { docs: 0, revision: 0, listo: 0, presentado: 0 };
  Object.values(db.exp).forEach((e) => { c[e.est]++; });
  return c;
}
function pintarCabecera() {
  const dias = Math.round((PLAZO - new Date(HOY.getFullYear(), HOY.getMonth(), HOY.getDate())) / 864e5);
  $('#plazo').innerHTML = `Plazo general: <b>1–20 de octubre</b> · quedan <b class="${dias <= 7 ? 'hot' : ''}">${dias} días</b>`;
  const c = cuenta(); const tot = Object.values(c).reduce((a, b) => a + b, 0);
  $('#pct').textContent = Math.round((c.presentado / tot) * 100) + ' %';
  $('#pct-det').textContent = `· ${c.presentado} de ${tot} modelos`;
  $('#stack').innerHTML = ['presentado', 'listo', 'revision', 'docs'].map((k) => `<i class="s-${ESTADOS[k].c}" data-w="${(c[k] / tot) * 100}"></i>`).join('');
  document.querySelectorAll('#stack i').forEach((i) => { i.style.width = i.dataset.w + '%'; });
  $('#leg').innerHTML = ['presentado', 'listo', 'revision', 'docs'].map((k) => `<li><i class="s-${ESTADOS[k].c}"></i>${ESTADOS[k].n} <b>${c[k]}</b></li>`).join('');
  $('#f-estado').innerHTML = [['', 'Todos'], ...ORDEN.map((k) => [k, ESTADOS[k].n])].map(([k, n]) => `<button type="button" data-f="${k}" aria-pressed="${estado.filtro === k}">${n}${k ? ` <span>${c[k]}</span>` : ''}</button>`).join('');
}
function pintarMatriz() {
  const q = estado.q.toLowerCase();
  const filas = CLIENTES.map((c, i) => ({ c, i })).filter(({ c, i }) =>
    (!estado.gestor || c[3] === estado.gestor) &&
    (!q || (c[0] + c[1]).toLowerCase().includes(q)) &&
    (!estado.filtro || c[4].split(' ').some((m) => db.exp[`${i}|${m}`].est === estado.filtro)));
  $('#matrix').innerHTML = `
    <thead><tr><th class="cl">Cliente</th>${MODELOS.map((m) => `<th><b>${m.id}</b><span>${m.n}</span></th>`).join('')}<th class="g">Gestor</th></tr></thead>
    <tbody>${filas.map(({ c, i }) => `<tr>
      <th class="cl"><b>${c[0]}</b><span>${c[2]} · ${c[1]}</span></th>
      ${MODELOS.map((m) => {
        if (!c[4].split(' ').includes(m.id)) return '<td class="na">—</td>';
        const e = db.exp[`${i}|${m.id}`]; const k = `${i}|${m.id}`;
        const dim = estado.filtro && e.est !== estado.filtro ? ' dim' : '';
        return `<td><button type="button" class="cell s-${ESTADOS[e.est].c}${estado.sel === k ? ' sel' : ''}${dim}" data-k="${k}" aria-label="${c[0]}, modelo ${m.id}: ${ESTADOS[e.est].n}">${e.est === 'presentado' ? '<svg><use href="#i-check"/></svg>' : ''}<span>${ESTADOS[e.est].n}</span>${e.pedido && e.est === 'docs' ? '<i class="req">pedido</i>' : ''}</button></td>`;
      }).join('')}
      <td class="g"><span class="av sm">${c[3]}</span></td></tr>`).join('')}
    </tbody>`;
}

// ---------- Panel del expediente ----------
function pintarPanel() {
  const p = $('#panel');
  if (!estado.sel) { p.hidden = true; document.body.classList.remove('with-panel'); return; }
  p.hidden = false; document.body.classList.add('with-panel');
  const [ci, m] = estado.sel.split('|');
  const c = CLIENTES[+ci]; const e = db.exp[estado.sel]; const mod = MODELOS.find((x) => x.id === m);
  const docsN = m === '303' ? ['Facturas emitidas', 'Facturas recibidas', 'Extracto bancario'] : m === '111' ? ['Nóminas del trimestre', 'Facturas de profesionales', 'Resumen de retenciones'] : m === '115' ? ['Contrato de alquiler', 'Recibos del trimestre', 'Datos del arrendador'] : m === '130' ? ['Libro de ingresos', 'Libro de gastos', 'Pagos fraccionados anteriores'] : ['Facturas a clientes UE', 'NIF-IVA validados', 'Libro de operaciones'];
  const cuentas = [h(c[0]) % 60 + 12, h(c[0] + 'r') % 50 + 9, 3];
  const resultado = e.importe;
  const pasos = ORDEN.map((k, i) => `<li class="${ORDEN.indexOf(e.est) >= i ? 'done' : ''} ${e.est === k ? 'now' : ''}"><i></i>${ESTADOS[k].n}</li>`).join('');
  p.innerHTML = `
    <header><div><p class="k">Modelo ${m} · ${mod.n} · 3T 2026</p><h2>${c[0]}</h2><p class="who">${c[2]} · contacto: ${c[5]}</p></div><button type="button" class="x" data-close aria-label="Cerrar"><svg><use href="#i-x"/></svg></button></header>
    <ol class="steps">${pasos}</ol>
    <h3>Documentación</h3>
    <ul class="checks">${docsN.map((d, i) => `<li class="${e.docs[i] ? 'ok' : 'no'}"><span class="b">${e.docs[i] ? '<svg><use href="#i-check"/></svg>' : ''}</span>${d}<em>${e.docs[i] ? (i < 2 ? `${cuentas[i]} archivos` : 'recibido') : 'pendiente'}</em></li>`).join('')}</ul>
    <h3>Resultado</h3>
    <div class="result"><span>${m === '303' ? 'Casilla 71' : m === '130' ? 'Casilla 19' : 'Casilla 28'}</span><b class="${resultado < 0 ? 'neg' : ''}">${resultado < 0 ? 'A compensar ' + eur(-resultado) : 'A ingresar ' + eur(resultado)}</b></div>
    <label class="sw"><input type="checkbox" id="dom" ${e.dom ? 'checked' : ''} ${e.est === 'presentado' ? 'disabled' : ''}><span></span>Domiciliar el pago (cargo el 20 oct)</label>
    ${e.just ? `<div class="just"><svg><use href="#i-check"/></svg><div><b>Presentado en la AEAT</b><span>Justificante ${e.just}</span></div></div>` : ''}
    <div class="acts">
      ${e.est === 'docs' ? `<button type="button" class="btn ghost" data-act="pedir" ${e.pedido ? 'disabled' : ''}><svg><use href="#i-mail"/></svg>${e.pedido ? 'Documentación pedida' : 'Pedir documentación'}</button><button type="button" class="btn" data-act="avanzar">Pasar a revisión</button>` : ''}
      ${e.est === 'revision' ? '<button type="button" class="btn" data-act="avanzar">Marcar como revisado</button>' : ''}
      ${e.est === 'listo' ? '<button type="button" class="btn brand" data-act="presentar">Presentar en la AEAT</button>' : ''}
    </div>`;
}

// ---------- Bandeja ----------
const DOCS = [
  { f: 'Factura 2026-118.pdf', t: 'pdf', ci: 0, de: 'Iván Esteve', hace: '08:12', sug: 'Factura recibida', imp: 1284.5, prov: 'Harinas del Ebro, S.L.' },
  { f: 'Extracto septiembre.pdf', t: 'pdf', ci: 2, de: 'Montse Ribas', hace: '07:55', sug: 'Extracto bancario', imp: null },
  { f: 'ticket-gasolina.jpg', t: 'img', ci: 4, de: 'Javier Ortega', hace: 'ayer', sug: 'Gasto deducible', imp: 72.4, prov: 'Estación de servicio' },
  { f: 'Nóminas 3T.pdf', t: 'pdf', ci: 5, de: 'Carmen Sorolla', hace: 'ayer', sug: 'Nóminas', imp: null },
  { f: 'Factura A-2026-077.pdf', t: 'pdf', ci: 7, de: 'Pere Vall', hace: 'ayer', sug: 'Factura emitida UE', imp: 18450, prov: 'Exportaciones Lleida, S.A.' },
  { f: 'Recibo alquiler oct.pdf', t: 'pdf', ci: 8, de: 'Rosa Prats', hace: 'vie', sug: 'Recibo de alquiler', imp: 1450 },
  { f: 'Facturas proveedores.zip', t: 'pdf', ci: 10, de: 'Joan Turia', hace: 'vie', sug: '23 facturas recibidas', imp: null },
];
function pintarBandeja() {
  const pend = DOCS.map((d, i) => ({ d, i })).filter(({ i }) => !db.archivados.includes(i));
  $('#n-bandeja').textContent = pend.length || '';
  if (!pend.some(({ i }) => i === estado.doc)) estado.doc = pend.length ? pend[0].i : -1;
  $('#docs').innerHTML = pend.length ? pend.map(({ d, i }) => `<li><button type="button" class="doc ${i === estado.doc ? 'sel' : ''}" data-doc="${i}"><svg><use href="#i-${d.t === 'img' ? 'img' : 'doc'}"/></svg><span class="d-main"><b>${d.f}</b><span>${CLIENTES[d.ci][0]} · ${d.de}</span></span><span class="d-side"><time>${d.hace}</time><em>${d.sug}</em></span></button></li>`).join('') : '<li class="empty">Bandeja al día. Todo archivado en su expediente.</li>';
  const d = DOCS[estado.doc];
  if (!d) { $('#preview').innerHTML = ''; return; }
  const c = CLIENTES[d.ci];
  $('#preview').innerHTML = `
    <div class="pv-head"><div><p class="k">Vista previa</p><h2>${d.f}</h2></div></div>
    <div class="paper">${d.imp ? `
      <div class="pp-top"><b>${d.prov || c[0]}</b><span>FACTURA</span></div>
      <div class="pp-meta"><span>Cliente<b>${d.sug.includes('emitida') ? 'Distribuidora Rhein GmbH' : c[0]}</b></span><span>Fecha<b>${fechaCorta(new Date(2026, 8, 28))} 2026</b></span></div>
      <table><tr><td>Concepto</td><td>Base</td></tr><tr><td>${d.sug.includes('UE') ? 'Venta intracomunitaria exenta (art. 25 LIVA)' : 'Suministro según albarán'}</td><td>${eur(d.imp)}</td></tr>
      <tr><td>IVA ${d.sug.includes('UE') ? '0 %' : '21 %'}</td><td>${eur(d.sug.includes('UE') ? 0 : d.imp * 0.21)}</td></tr>
      <tr class="tot"><td>Total</td><td>${eur(d.sug.includes('UE') ? d.imp : d.imp * 1.21)}</td></tr></table>` : `<div class="pp-lines"><i></i><i></i><i></i><i class="s"></i><i></i><i></i><i class="s"></i></div>`}
    </div>
    <div class="classify">
      <p class="k">Clasificación</p>
      <div class="cl-row"><span>Expediente</span><b>${c[0]} · 3T 2026</b></div>
      <div class="cl-row"><span>Tipo</span><b>${d.sug}</b></div>
      ${d.imp ? `<div class="cl-row"><span>Importe</span><b>${eur(d.imp)}</b></div>` : ''}
      <button type="button" class="btn brand" data-archivar="${estado.doc}">Archivar en el expediente</button>
    </div>`;
}

// ---------- Calendario ----------
function pintarCalendario() {
  const y = HOY.getFullYear(), mo = HOY.getMonth();
  $('#cal-title').textContent = HOY.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).replace(/^./, (c) => c.toUpperCase());
  const ev = {
    1: [['Inicio de plazo 3T', 'info']], 7: [['Cita · Estudio Nébula', 'cita']], 13: [['Cita · Talleres Ribas', 'cita']],
    15: [['Cierre de documentación', 'warn']], 16: [['Cita · Hostal La Ribera', 'cita']], 20: [['303 · 111 · 115 · 130 · 349', 'plazo'], ['Cargo domiciliaciones', 'info']],
    27: [['Revisión de cierres con clientes', 'info']], 30: [['Modelo 202 · sociedades', 'plazo']],
  };
  const primero = new Date(y, mo, 1); const desfase = (primero.getDay() + 6) % 7; const dias = new Date(y, mo + 1, 0).getDate();
  let celdas = '';
  for (let i = 0; i < desfase; i++) celdas += '<div class="day out"></div>';
  for (let d = 1; d <= dias; d++) {
    const dt = new Date(y, mo, d);
    celdas += `<div class="day ${d === HOY.getDate() ? 'today' : ''} ${dt.getDay() % 6 === 0 ? 'we' : ''}"><span class="num">${d}</span>${(ev[d] || []).map(([t, k]) => `<span class="ev ${k}">${t}</span>`).join('')}</div>`;
  }
  $('#cal').innerHTML = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => `<div class="dow">${d}</div>`).join('') + celdas;
}

function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2600); }
function pintarTodo() { pintarCabecera(); pintarMatriz(); pintarPanel(); pintarBandeja(); }

// ---------- Eventos ----------
document.addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (cell) { estado.sel = cell.dataset.k; pintarMatriz(); pintarPanel(); return; }
  if (e.target.closest('[data-close]')) { estado.sel = null; pintarMatriz(); pintarPanel(); return; }
  const f = e.target.closest('[data-f]');
  if (f) { estado.filtro = f.dataset.f; pintarCabecera(); pintarMatriz(); return; }
  const act = e.target.closest('[data-act]');
  if (act) {
    const ex = db.exp[estado.sel]; const [ci, m] = estado.sel.split('|');
    if (act.dataset.act === 'pedir') { ex.pedido = true; aviso(`Correo enviado a ${CLIENTES[+ci][5]} con la lista de documentos`); }
    if (act.dataset.act === 'avanzar') { if (ex.est === 'docs') ex.docs = ex.docs.map(() => true); ex.est = ORDEN[ORDEN.indexOf(ex.est) + 1]; }
    if (act.dataset.act === 'presentar') { ex.est = 'presentado'; ex.just = `${m}${String(Date.now()).slice(-9)}`; aviso(`Modelo ${m} presentado · justificante ${ex.just}`); }
    guardar(); pintarTodo(); return;
  }
  const doc = e.target.closest('[data-doc]');
  if (doc) { estado.doc = +doc.dataset.doc; pintarBandeja(); return; }
  const arch = e.target.closest('[data-archivar]');
  if (arch) { const d = DOCS[+arch.dataset.archivar]; db.archivados.push(+arch.dataset.archivar); guardar(); pintarBandeja(); aviso(`${d.f} archivado en ${CLIENTES[d.ci][0]}`); return; }
  const nav = e.target.closest('.nav [data-view]');
  if (nav) {
    estado.vista = nav.dataset.view;
    document.querySelectorAll('.nav [data-view]').forEach((b) => (b === nav ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
    document.querySelectorAll('.view').forEach((v) => { v.hidden = v.id !== estado.vista; });
    if (estado.vista !== 'trimestre') { estado.sel = null; pintarPanel(); }
    if (estado.vista === 'calendario') pintarCalendario();
  }
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'f-gestor') { estado.gestor = e.target.value; pintarMatriz(); }
  if (e.target.id === 'dom') { db.exp[estado.sel].dom = e.target.checked; guardar(); }
});
$('#q').addEventListener('input', (e) => { estado.q = e.target.value; pintarMatriz(); });
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== $('#q')) { e.preventDefault(); $('#q').focus(); }
  if (e.key === 'Escape' && estado.sel) { estado.sel = null; pintarMatriz(); pintarPanel(); }
});

$('#periodo').textContent = '3T 2026';
$('#hoy').textContent = HOY.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
pintarTodo();
