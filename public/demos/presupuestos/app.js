// TRAMO reformas (demo): el precio se recalcula con cada cambio. Precios de ejemplo, no reales.
const TIPOS = {
  bano: { n: 'Baño', icono: 'i-bano', min: 2, max: 15, def: 5, ayuda: 'Superficie del baño.', fijo: 1200, m2: [550, 850, 1300], dias: (m) => 8 + m * 0.8,
    extras: [
      { id: 'plato', n: 'Plato de ducha en vez de bañera', p: 650 },
      { id: 'mampara', n: 'Mampara de vidrio', p: 420 },
      { id: 'mueble', n: 'Mueble de lavabo suspendido', p: 480 },
      { id: 'toallero', n: 'Radiador toallero', p: 320 },
    ] },
  cocina: { n: 'Cocina', icono: 'i-cocina', min: 4, max: 30, def: 10, ayuda: 'Superficie de la cocina.', fijo: 2200, m2: [650, 950, 1450], dias: (m) => 10 + m * 0.6,
    extras: [
      { id: 'cuarzo', n: 'Encimera de cuarzo', p: 1100 },
      { id: 'electro', n: 'Electrodomésticos integrados', p: 2800 },
      { id: 'isla', n: 'Isla o península', p: 1600 },
      { id: 'led', n: 'Luz LED bajo los muebles', p: 350 },
    ] },
  pintura: { n: 'Pintura', icono: 'i-pintura', min: 30, max: 250, def: 80, ayuda: 'Metros de la vivienda: paredes y techos se calculan solos.', fijo: 150, m2: [14, 19, 27], dias: (m) => 2 + m / 40,
    extras: [
      { id: 'gotele', n: 'Quitar gotelé y alisar', pm2: 9 },
      { id: 'molduras', n: 'Molduras y techos decorados', pm2: 4 },
      { id: 'puertas', n: 'Lacar puertas y marcos', p: 900 },
    ] },
  suelos: { n: 'Suelos', icono: 'i-suelos', min: 10, max: 200, def: 50, ayuda: 'Metros de suelo a cambiar.', fijo: 250, m2: [32, 48, 78], dias: (m) => 2 + m / 25,
    extras: [
      { id: 'retirar', n: 'Retirar el suelo antiguo', pm2: 9 },
      { id: 'rodapie', n: 'Rodapié nuevo', pm2: 6 },
      { id: 'radiante', n: 'Suelo radiante', pm2: 55 },
    ] },
  integral: { n: 'Integral', icono: 'i-integral', min: 30, max: 250, def: 80, ayuda: 'Metros de la vivienda.', fijo: 3000, m2: [520, 760, 1100], dias: (m) => 20 + m * 0.7,
    extras: [
      { id: 'electrica', n: 'Instalación eléctrica nueva', pm2: 45 },
      { id: 'fontaneria', n: 'Fontanería nueva', pm2: 35 },
      { id: 'ventanas', n: 'Ventanas de PVC', p: 4200 },
      { id: 'clima', n: 'Aire acondicionado por conductos', p: 5200 },
    ] },
};
const CALIDADES = [
  { n: 'Básica', d: 'Gama de entrada, resistente' },
  { n: 'Media', d: 'La que más se pide' },
  { n: 'Alta', d: 'Materiales premium' },
];
const PARTES = ['Mano de obra', 'Materiales', 'Extras', 'Residuos y licencias'];
const KEY = 'demo-presupuestos-tramo';

const $ = (s) => document.querySelector(s);
const numero = (n) => n.toLocaleString('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' });
const euros = (n) => numero(n) + ' €';
const rango = (r) => `${numero(r.min)} – ${numero(r.max)} €`;
const redondear = (n) => Math.round(n / 50) * 50;
const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
const guardar = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };

const estado = { tipo: 'bano', m2: 5, calidad: 1, extras: new Set() };

function calcular() {
  const t = TIPOS[estado.tipo];
  const base = t.fijo + estado.m2 * t.m2[estado.calidad];
  const extras = t.extras.filter((x) => estado.extras.has(x.id)).map((x) => ({ n: x.n, p: x.p ?? x.pm2 * estado.m2 }));
  const totalExtras = extras.reduce((a, x) => a + x.p, 0);
  const total = base + totalExtras;
  const dias = Math.round(t.dias(estado.m2) * [1, 1.1, 1.25][estado.calidad]);
  return { base, total, extras, dias, min: redondear(total * 0.92), max: redondear(total * 1.12), partes: [base * 0.48, base * 0.42, totalExtras, base * 0.1] };
}
const semanas = (d) => Math.max(1, Math.round(d / 5));
const plazo = (d) => (d <= 6 ? `${d} días` : `${semanas(d)}–${semanas(d) + 1} semanas`);

// ---------- Pintado ----------
function pintarTipos() {
  $('#types').innerHTML = Object.entries(TIPOS).map(([id, t]) => `<label class="type"><input type="radio" name="tipo" value="${id}" ${id === estado.tipo ? 'checked' : ''}><span><svg><use href="#${t.icono}"/></svg>${t.n}</span></label>`).join('');
}
function pintarCalidad() {
  $('#quality').innerHTML = CALIDADES.map((c, i) => `<label class="sw q${i}"><input type="radio" name="calidad" value="${i}" ${i === estado.calidad ? 'checked' : ''}><span class="sw-chip"></span><span class="sw-txt"><strong>${c.n}</strong><small>${c.d}</small></span></label>`).join('');
}
function pintarExtras() {
  const t = TIPOS[estado.tipo];
  $('#extras').innerHTML = t.extras.map((x) => `<label class="toggle"><input type="checkbox" name="extra" value="${x.id}" ${estado.extras.has(x.id) ? 'checked' : ''}><span class="toggle-txt">${x.n}</span><em>${x.p ? '+' + euros(x.p) : '+' + x.pm2 + ' €/m²'}</em><span class="knob" aria-hidden="true"></span></label>`).join('');
}
function pintarCinta() {
  const t = TIPOS[estado.tipo];
  const r = $('#m2');
  r.min = t.min; r.max = t.max; r.value = estado.m2;
  $('#m2-out').firstElementChild.textContent = estado.m2;
  $('#m2-help').textContent = t.ayuda;
  // Relleno de la cinta métrica hasta el valor (por CSSOM, compatible con la CSP)
  r.style.setProperty('--fill', `${((estado.m2 - t.min) / (t.max - t.min)) * 100}%`);
  const paso = (t.max - t.min) / 5;
  $('#ticks').innerHTML = Array.from({ length: 6 }, (_, i) => `<span>${Math.round(t.min + paso * i)}</span>`).join('');
}
function pintarPrecio() {
  const r = calcular();
  $('#p-min').textContent = numero(r.min);
  $('#p-max').textContent = numero(r.max);
  $('#duration').textContent = plazo(r.dias);
  $('#mini-price').textContent = rango(r);
  // Barra apilada con el reparto del precio
  const suma = r.partes.reduce((a, p) => a + p, 0) || 1;
  $('#stack').innerHTML = r.partes.map((p, i) => `<span class="s${i}"></span>`).join('');
  [...$('#stack').children].forEach((el, i) => { el.style.flexGrow = r.partes[i] / suma; });
  $('#legend').innerHTML = r.partes.map((p, i) => `<li class="s${i}"><span>${PARTES[i]}</span><b>${euros(redondear(p))}</b></li>`).join('');
  // Semanas de obra: una casilla por semana (hasta 20)
  const n = Math.min(semanas(r.dias) + (r.dias > 6 ? 1 : 0), 20);
  $('#weeks').innerHTML = Array.from({ length: Math.max(n, 1) }, (_, i) => `<i class="${i < semanas(r.dias) ? 'on' : ''}"></i>`).join('');
  pintarDocumento(r);
}
function pintarTodo() { pintarCinta(); pintarExtras(); pintarPrecio(); }

function referencia() { return `TR-${new Date().getFullYear()}-${String(leer().length + 1).padStart(4, '0')}`; }
function pintarDocumento(r) {
  const t = TIPOS[estado.tipo];
  const hoy = new Date();
  const validez = new Date(hoy.getTime() + 30 * 864e5);
  $('#doc').innerHTML = `
    <header><div><strong>TRAMO reformas</strong><small>Empresa ficticia · demo de Folzia</small></div><div class="doc-ref"><strong>Presupuesto orientativo</strong><small>${referencia()} · ${hoy.toLocaleDateString('es-ES')}</small></div></header>
    <table><thead><tr><th>Concepto</th><th>Importe</th></tr></thead><tbody>
      <tr><td>${t.n} · ${estado.m2} m² · acabados ${CALIDADES[estado.calidad].n.toLowerCase()}</td><td>${euros(redondear(r.base))}</td></tr>
      ${r.extras.map((x) => `<tr><td>${x.n}</td><td>${euros(redondear(x.p))}</td></tr>`).join('')}
    </tbody><tfoot><tr><td>Horquilla estimada (IVA no incluido)</td><td>${rango(r)}</td></tr></tfoot></table>
    <p>Duración estimada de la obra: ${plazo(r.dias)}.</p>
    <p class="doc-fine">Cifra orientativa válida hasta el ${validez.toLocaleDateString('es-ES')}. El presupuesto definitivo se entrega tras visitar la obra. Precios de ejemplo de una demo.</p>`;
}

function pintarGuardados() {
  const lista = leer();
  $('#count').textContent = lista.length;
  $('#saved').innerHTML = lista.length ? lista.slice().reverse().map((p) => `
    <li class="file"><div class="file-tab">${p.ref}</div><div class="file-body">
      <div><small>${p.fecha}</small><strong>${p.titulo}</strong><span>${p.detalle}</span></div>
      <div class="file-side"><b>${p.rango}</b><button type="button" class="del" data-ref="${p.ref}">Borrar</button></div>
    </div></li>`).join('') : '<li class="empty">Aquí aparecerán los presupuestos que guardes.</li>';
}

function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2600); }

// ---------- Eventos ----------
$('#calc').addEventListener('change', (e) => {
  const el = e.target;
  if (el.name === 'tipo') { estado.tipo = el.value; estado.m2 = TIPOS[el.value].def; estado.extras.clear(); pintarTodo(); }
  if (el.name === 'calidad') { estado.calidad = +el.value; pintarPrecio(); }
  if (el.name === 'extra') { if (el.checked) estado.extras.add(el.value); else estado.extras.delete(el.value); pintarPrecio(); }
});
$('#m2').addEventListener('input', (e) => { estado.m2 = +e.target.value; pintarCinta(); pintarPrecio(); });
$('#calc').addEventListener('submit', (e) => e.preventDefault());
$('#save').addEventListener('click', () => {
  const r = calcular();
  const t = TIPOS[estado.tipo];
  const lista = leer();
  lista.push({ ref: referencia(), fecha: new Date().toLocaleDateString('es-ES'), titulo: `${t.n} · ${estado.m2} m²`, detalle: `Acabados ${CALIDADES[estado.calidad].n.toLowerCase()}${r.extras.length ? ' · ' + r.extras.map((x) => x.n.toLowerCase()).join(', ') : ''}`, rango: rango(r) });
  guardar(lista);
  pintarGuardados(); pintarPrecio();
  aviso('Guardado en «Mis presupuestos»');
});
$('#print').addEventListener('click', () => window.print());
$('#saved').addEventListener('click', (e) => { const b = e.target.closest('.del'); if (!b) return; guardar(leer().filter((p) => p.ref !== b.dataset.ref)); pintarGuardados(); pintarPrecio(); });
document.querySelector('.tabs').addEventListener('click', (e) => {
  const t = e.target.closest('[data-view]'); if (!t) return;
  document.querySelectorAll('.tabs [data-view]').forEach((b) => (b === t ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  document.querySelectorAll('.view').forEach((v) => { v.hidden = v.id !== t.dataset.view; });
  document.body.classList.toggle('on-saved', t.dataset.view === 'guardados');
  if (t.dataset.view === 'guardados') pintarGuardados();
});

// En móvil, barra fija con el precio mientras el desglose no está a la vista
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => document.body.classList.toggle('price-visible', e.isIntersecting), { threshold: 0.15 }).observe($('#precio'));
}

pintarTipos(); pintarCalidad(); pintarTodo(); pintarGuardados();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
