// Lúa café (demo): carta, cuenta y comandas sincronizadas entre pestañas (localStorage + evento storage).
const CARTA = [
  { cat: 'Cafés', icono: 'i-cafe', items: [
    { id: 'esp', n: 'Espresso', d: 'Tueste medio, de Huila', p: 1.6 },
    { id: 'cor', n: 'Cortado', d: 'Con una nube de leche', p: 1.8 },
    { id: 'cap', n: 'Capuchino', d: 'Doble y espumoso', p: 2.6 },
    { id: 'fla', n: 'Flat white', d: 'Ristretto y leche fina', p: 2.9 },
    { id: 'mat', n: 'Matcha', d: 'Con bebida de avena', p: 3.4 },
  ] },
  { cat: 'Desayunos', icono: 'i-desayuno', items: [
    { id: 'tos', n: 'Pan con tomate', d: 'Masa madre y aceite', p: 3.2 },
    { id: 'agu', n: 'Tostada verde', d: 'Aguacate y huevo poché', p: 6.5 },
    { id: 'yog', n: 'Bol de yogur', d: 'Granola de la casa', p: 5.2 },
    { id: 'tor', n: 'Tortilla', d: 'Pincho, poco hecha', p: 3.5 },
  ] },
  { cat: 'Dulces', icono: 'i-dulce', items: [
    { id: 'cro', n: 'Cruasán', d: 'De mantequilla', p: 2.2 },
    { id: 'can', n: 'Rollo de canela', d: 'Glaseado de queso', p: 3.2 },
    { id: 'tar', n: 'Tarta de queso', d: 'La de la abuela', p: 4.5 },
  ] },
  { cat: 'Zumos', icono: 'i-zumo', items: [
    { id: 'nar', n: 'Naranja', d: 'Recién exprimida', p: 3.2 },
    { id: 'lim', n: 'Limonada', d: 'Con hierbabuena', p: 3 },
    { id: 'agua', n: 'Agua', d: '50 cl', p: 1.5 },
  ] },
];
const PRODUCTOS = Object.fromEntries(CARTA.flatMap((c, ci) => c.items.map((i) => [i.id, { ...i, ci }])));
const ESTADOS = ['nuevo', 'preparando', 'listo', 'entregado'];
const FASES = [['nuevo', 'Recibido'], ['preparando', 'En marcha'], ['listo', '¡Listo! Te lo llevamos']];
const KEY = 'demo-pedidos-lua';
const MIOS = 'demo-pedidos-lua-mios';

const $ = (s) => document.querySelector(s);
const euros = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const escapar = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const leerJSON = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch (e) { return def; } };
const guardarJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };
const pedidos = () => leerJSON(KEY, null) ?? sembrar();
const guardarPedidos = (p) => guardarJSON(KEY, p);

// Comandas de ejemplo para que la barra no esté vacía la primera vez
function sembrar() {
  const ahora = Date.now();
  const p = [
    { id: ahora - 1, mesa: 3, items: [{ id: 'cap', q: 2 }, { id: 'cro', q: 2 }], nota: '', estado: 'preparando', t: ahora - 6 * 60000 },
    { id: ahora - 2, mesa: 12, items: [{ id: 'fla', q: 1 }, { id: 'agu', q: 1 }, { id: 'nar', q: 1 }], nota: 'Bebida de avena en el flat white', estado: 'nuevo', t: ahora - 2 * 60000 },
  ];
  guardarPedidos(p);
  return p;
}

const params = new URLSearchParams(location.search);
const estado = { mesa: Math.min(Math.max(parseInt(params.get('mesa'), 10) || 7, 1), 20), carrito: {} };
const total = (items) => items.reduce((a, it) => a + PRODUCTOS[it.id].p * it.q, 0);
const carritoItems = () => Object.entries(estado.carrito).filter(([, q]) => q > 0).map(([id, q]) => ({ id, q }));
const hace = (t) => { const m = Math.floor((Date.now() - t) / 60000); return m < 1 ? 'ahora' : `hace ${m} min`; };
const hora = (t) => new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

// ---------- Carta ----------
function pintarCarta() {
  $('#cats').innerHTML = CARTA.map((c, i) => `<a href="#cat-${i}">${c.cat}</a>`).join('');
  $('#menu').innerHTML = CARTA.map((c, i) => `
    <section class="cat" id="cat-${i}">
      <h2>${c.cat}</h2>
      <ul class="tiles">${c.items.map((it) => `<li class="tile-wrap c${i}" data-id="${it.id}"></li>`).join('')}</ul>
    </section>`).join('');
  pintarTiles();
}
function pintarTiles() {
  document.querySelectorAll('#menu .tile-wrap').forEach((li) => {
    const it = PRODUCTOS[li.dataset.id];
    const q = estado.carrito[it.id] || 0;
    li.classList.toggle('on', q > 0);
    li.innerHTML = `
      <button type="button" class="tile" data-d="1" aria-label="Añadir ${it.n}, ${euros(it.p)} euros">
        <svg class="tile-ico"><use href="#${CARTA[it.ci].icono}"/></svg>
        <strong>${it.n}</strong><small>${it.d}</small><span class="tag">${euros(it.p)}</span>
      </button>
      ${q ? `<span class="tile-q" aria-label="${q} en la cuenta">${q}</span><button type="button" class="tile-minus" data-d="-1" aria-label="Quitar un ${it.n}">−</button>` : ''}`;
  });
  const items = carritoItems();
  const qty = items.reduce((a, it) => a + it.q, 0);
  $('#cart-bar').hidden = qty === 0 || !$('#cocina').hidden;
  $('#cart-qty').textContent = qty;
  $('#cart-total').textContent = `${euros(total(items))} €`;
}
function cambiar(id, d) {
  estado.carrito[id] = Math.max((estado.carrito[id] || 0) + d, 0);
  pintarTiles();
  if (!$('#sheet').hidden) pintarCuenta();
}

// ---------- La cuenta (ticket) ----------
function pintarCuenta() {
  const items = carritoItems();
  if (!items.length) { cerrarCuenta(); return; }
  $('#sheet-mesa').textContent = estado.mesa;
  $('#sheet-hora').textContent = hora(Date.now());
  $('#lines').innerHTML = items.map((it) => `<li data-id="${it.id}">
      <span class="r-step"><button type="button" data-d="-1" aria-label="Quitar uno">−</button><b>${it.q}</b><button type="button" data-d="1" aria-label="Añadir otro">+</button></span>
      <span class="r-name">${PRODUCTOS[it.id].n.toUpperCase()}</span><span class="r-dots"></span><span>${euros(PRODUCTOS[it.id].p * it.q)}</span></li>`).join('');
  $('#r-total').textContent = `${euros(total(items))} €`;
}
function abrirCuenta() { $('#sheet').hidden = false; pintarCuenta(); document.body.classList.add('lock'); $('#send').focus(); }
function cerrarCuenta() { $('#sheet').hidden = true; document.body.classList.remove('lock'); }

// Seguimiento con fases de la luna: nueva → cuarto → llena
function pintarSeguimiento() {
  const mios = leerJSON(MIOS, []);
  const activos = pedidos().filter((p) => mios.includes(p.id) && p.estado !== 'entregado');
  $('#tracker').innerHTML = activos.map((p) => {
    const paso = ESTADOS.indexOf(p.estado);
    return `<div class="track">
      <p class="track-top"><span>Tu pedido · mesa ${p.mesa}</span><small>${hace(p.t)}</small></p>
      <ol class="moons">${FASES.map(([, txt], i) => `<li class="${i < paso ? 'past' : i === paso ? 'now' : ''}"><svg><use href="#i-luna-${i}"/></svg><span>${txt}</span></li>`).join('')}</ol>
      <p class="track-items">${p.items.map((it) => `${it.q}× ${PRODUCTOS[it.id].n}`).join(' · ')}</p></div>`;
  }).join('');
}

// ---------- Barra y cocina ----------
function pintarCocina() {
  const lista = pedidos();
  const boton = { nuevo: 'Empezar', preparando: 'Está listo', listo: 'Servido' };
  ['nuevo', 'preparando', 'listo'].forEach((e) => {
    const deEstado = lista.filter((p) => p.estado === e).sort((a, b) => a.t - b.t);
    $('#n-' + e).textContent = deEstado.length;
    $('#col-' + e).innerHTML = deEstado.length ? deEstado.map((p) => `
      <li class="ticket ${e}">
        <p class="t-head"><strong>MESA ${p.mesa}</strong><span>${hora(p.t)}<br>${hace(p.t)}</span></p>
        <ul>${p.items.map((it) => `<li><b>${it.q}</b> × ${PRODUCTOS[it.id].n.toUpperCase()}</li>`).join('')}</ul>
        ${p.nota ? `<p class="t-note">» ${escapar(p.nota)}</p>` : ''}
        <button type="button" class="t-btn" data-id="${p.id}">${boton[e]}</button>
      </li>`).join('') : '<li class="col-empty">—</li>';
  });
  const pendientes = lista.filter((p) => p.estado === 'nuevo').length;
  $('#pending').textContent = pendientes;
  $('#pending').classList.toggle('hot', pendientes > 0);
}

function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2600); }
function pintarTodo() { pintarSeguimiento(); pintarCocina(); }

// ---------- Eventos ----------
$('#mesa').innerHTML = Array.from({ length: 20 }, (_, i) => `<option ${i + 1 === estado.mesa ? 'selected' : ''}>${i + 1}</option>`).join('');
$('#mesa').addEventListener('change', (e) => { estado.mesa = +e.target.value; });
$('#menu').addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) cambiar(b.closest('.tile-wrap').dataset.id, +b.dataset.d); });
$('#lines').addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) cambiar(b.closest('li').dataset.id, +b.dataset.d); });
$('#cart-bar').addEventListener('click', abrirCuenta);
$('#sheet').addEventListener('click', (e) => { if (e.target.closest('[data-close]')) cerrarCuenta(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#sheet').hidden) cerrarCuenta(); });
$('#send').addEventListener('click', () => {
  const items = carritoItems();
  if (!items.length) return;
  const p = { id: Date.now(), mesa: estado.mesa, items, nota: $('#nota').value.trim(), estado: 'nuevo', t: Date.now() };
  guardarPedidos([...pedidos(), p]);
  guardarJSON(MIOS, [...leerJSON(MIOS, []), p.id]);
  estado.carrito = {}; $('#nota').value = '';
  cerrarCuenta(); pintarTiles(); pintarTodo();
  scrollTo({ top: 0, behavior: 'smooth' });
  aviso('Pedido en la barra');
});
$('#cocina').addEventListener('click', (e) => {
  const b = e.target.closest('.t-btn'); if (!b) return;
  const lista = pedidos();
  const p = lista.find((x) => String(x.id) === b.dataset.id); if (!p) return;
  p.estado = ESTADOS[ESTADOS.indexOf(p.estado) + 1];
  // Los servidos salen del tablero; guardamos solo los últimos 30 para no llenar el almacenamiento
  guardarPedidos(lista.filter((x) => x.estado !== 'entregado').concat(lista.filter((x) => x.estado === 'entregado').slice(-30)));
  pintarTodo();
});
document.querySelector('.switch').addEventListener('click', (e) => {
  const t = e.target.closest('[data-view]'); if (!t) return;
  document.querySelectorAll('.switch [data-view]').forEach((b) => (b === t ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  document.querySelectorAll('.view').forEach((v) => { v.hidden = v.id !== t.dataset.view; });
  document.body.classList.toggle('night', t.dataset.view === 'cocina');
  pintarTiles(); pintarTodo();
});
// Otra pestaña ha cambiado los pedidos: repintamos al momento
addEventListener('storage', (e) => {
  if (e.key !== KEY) return;
  const antes = +$('#pending').textContent;
  pintarTodo();
  if (!$('#cocina').hidden && +$('#pending').textContent > antes) aviso('¡Comanda nueva!');
});
setInterval(pintarTodo, 30000);

pintarCarta(); pintarTodo();
if (params.get('vista') === 'cocina') document.querySelector('[data-view="cocina"]').click();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
