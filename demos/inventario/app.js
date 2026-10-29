// Grano (demo): existencias, movimientos y pedido a proveedores. Datos de ejemplo guardados en localStorage.
const KEY = 'demo-inventario-grano';
const BASE = [
  ['ARZ-010', 'Arroz bomba 1 kg', 'Secos', 'A-01-2', 340, 120, 'Molinos del Júcar'],
  ['ARZ-022', 'Arroz largo 5 kg', 'Secos', 'A-01-3', 86, 60, 'Molinos del Júcar'],
  ['LEG-104', 'Garbanzo pedrosillano 1 kg', 'Secos', 'A-02-1', 44, 80, 'Legumbres Tierra'],
  ['LEG-117', 'Lenteja pardina 1 kg', 'Secos', 'A-02-2', 212, 80, 'Legumbres Tierra'],
  ['HAR-002', 'Harina de trigo 25 kg', 'Secos', 'A-03-1', 18, 20, 'Harinera Norte'],
  ['AZU-005', 'Azúcar blanco 1 kg', 'Secos', 'A-03-4', 0, 100, 'Azucarera Sur'],
  ['ACE-300', 'Aceite de oliva virgen extra 5 l', 'Aceites', 'B-01-1', 96, 40, 'Almazara Olivar'],
  ['ACE-310', 'Aceite de girasol 5 l', 'Aceites', 'B-01-2', 31, 40, 'Oleícola Centro'],
  ['VIN-021', 'Vinagre de Jerez 1 l', 'Aceites', 'B-02-1', 75, 30, 'Bodegas Ejemplo'],
  ['CON-410', 'Tomate triturado 3 kg', 'Conservas', 'C-01-1', 160, 90, 'Conservas Ribera'],
  ['CON-422', 'Atún en aceite 1 kg', 'Conservas', 'C-01-3', 58, 50, 'Conservas Atlántico'],
  ['CON-435', 'Pimiento del piquillo 1 kg', 'Conservas', 'C-02-1', 9, 30, 'Conservas Ribera'],
  ['CAF-001', 'Café en grano natural 1 kg', 'Café', 'D-01-1', 128, 60, 'Tostadero Lúa'],
  ['CAF-004', 'Café molido mezcla 1 kg', 'Café', 'D-01-2', 72, 60, 'Tostadero Lúa'],
  ['CAF-020', 'Descafeinado en grano 1 kg', 'Café', 'D-01-3', 14, 25, 'Tostadero Lúa'],
  ['LAC-200', 'Leche entera 1 l (caja 6)', 'Lácteos', 'F-01-1', 240, 150, 'Granja Valle'],
  ['LAC-215', 'Bebida de avena 1 l (caja 6)', 'Lácteos', 'F-01-2', 63, 50, 'Granja Valle'],
  ['LAC-230', 'Nata para cocinar 1 l', 'Lácteos', 'F-02-1', 0, 40, 'Granja Valle'],
  ['LIM-050', 'Lavavajillas profesional 10 l', 'Limpieza', 'L-01-1', 22, 15, 'Química Brillo'],
  ['LIM-061', 'Bayeta microfibra (pack 10)', 'Limpieza', 'L-01-3', 37, 20, 'Química Brillo'],
];
const $ = (s) => document.querySelector(s);
const fmt = (n) => n.toLocaleString('es-ES', { useGrouping: 'always' });
const escapar = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const dia = (t) => new Date(t).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
const horaDia = (t) => new Date(t).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

function semilla() {
  const ahora = Date.now();
  const productos = BASE.map(([sku, n, cat, ubic, stock, min, prov]) => ({ sku, n, cat, ubic, stock, min, prov }));
  const movs = [];
  // Movimientos de ejemplo deterministas para el histórico
  productos.forEach((p, i) => {
    for (let k = 0; k < 6; k++) {
      // Siempre en horario de almacén (7:00 a 18:00)
      const f = new Date(ahora - (k * 5 + (i % 5) + 1) * 86400000);
      f.setHours(7 + ((i * 3 + k * 5) % 11), (i * 17 + k * 7) % 60, 0, 0);
      const t = f.getTime();
      const salida = (i + k) % 3 !== 0;
      movs.push({ t, sku: p.sku, tipo: salida ? 'salida' : 'entrada', cant: salida ? 6 + ((i * 7 + k * 3) % 24) : 40 + ((i * 11 + k) % 60), user: ['R. Gil', 'M. Soto', 'A. Ruiz'][(i + k) % 3], nota: salida ? `Pedido cliente ${4800 + i * 13 + k}` : `Albarán ${210 + i + k}` });
    }
  });
  return { productos, movs: movs.sort((a, b) => b.t - a.t), pedido: {} };
}
let db;
try { db = JSON.parse(localStorage.getItem(KEY)) || semilla(); } catch (e) { db = semilla(); }
const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* sin almacenamiento */ } };
const estado = { f: 'todo', cat: '', q: '', sel: null };

const nivel = (p) => (p.stock === 0 ? 'agotado' : p.stock < p.min ? 'bajo' : 'ok');
const ultimo = (sku) => db.movs.find((m) => m.sku === sku);

function pintarKpis() {
  const ps = db.productos;
  const bajo = ps.filter((p) => nivel(p) === 'bajo').length;
  const ago = ps.filter((p) => nivel(p) === 'agotado').length;
  const hoy = db.movs.filter((m) => new Date(m.t).toDateString() === new Date().toDateString()).length;
  $('#kpis').innerHTML = `
    <div><dt>Referencias</dt><dd>${ps.length}</dd></div>
    <div><dt>Unidades en almacén</dt><dd>${fmt(ps.reduce((a, p) => a + p.stock, 0))}</dd></div>
    <div class="warn"><dt>Bajo mínimo</dt><dd>${bajo}</dd></div>
    <div class="bad"><dt>Agotadas</dt><dd>${ago}</dd></div>
    <div><dt>Movimientos hoy</dt><dd>${hoy}</dd></div>`;
}
function filtrados() {
  const q = estado.q.toLowerCase();
  return db.productos.filter((p) => (estado.f === 'todo' || nivel(p) === estado.f) && (!estado.cat || p.cat === estado.cat) && (!q || (p.n + ' ' + p.sku).toLowerCase().includes(q)));
}
function pintarTabla() {
  const lista = filtrados();
  $('#rows').innerHTML = lista.length ? lista.map((p) => {
    const nv = nivel(p);
    const u = ultimo(p.sku);
    const pct = Math.min(p.stock / (p.min * 2), 1) * 100;
    const enPedido = db.pedido[p.sku];
    return `<tr data-sku="${p.sku}" class="${estado.sel === p.sku ? 'sel' : ''}">
      <td class="mono">${p.sku}</td><td class="strong">${p.n}</td><td>${p.cat}</td><td class="mono">${p.ubic}</td>
      <td class="num ${nv}">${fmt(p.stock)}</td>
      <td><span class="meter ${nv}" data-pct="${pct.toFixed(0)}"><i></i></span><span class="lvl ${nv}">${nv === 'ok' ? 'Correcto' : nv === 'bajo' ? `Mín. ${p.min}` : 'Agotado'}</span></td>
      <td class="muted">${u ? `${u.tipo === 'entrada' ? '+' : '−'}${u.cant} · ${dia(u.t)}` : '—'}</td>
      <td class="act">${enPedido ? `<span class="tag">En pedido · ${enPedido}</span>` : nv !== 'ok' ? `<button type="button" class="link" data-pedir="${p.sku}">Pedir</button>` : ''}</td>
    </tr>`;
  }).join('') : '<tr><td colspan="8" class="empty">Ningún producto coincide con la búsqueda.</td></tr>';
  // Ancho de las barras de nivel por CSSOM (compatible con la CSP)
  document.querySelectorAll('.meter').forEach((m) => { m.firstElementChild.style.width = m.dataset.pct + '%'; });
}
function pintarMovs() {
  const mapa = Object.fromEntries(db.productos.map((p) => [p.sku, p.n]));
  $('#mov-rows').innerHTML = db.movs.slice(0, 80).map((m) => `<tr><td class="mono">${horaDia(m.t)}</td><td><span class="kind ${m.tipo}">${m.tipo === 'entrada' ? 'Entrada' : 'Salida'}</span></td><td class="mono">${m.sku}</td><td class="strong">${mapa[m.sku] || ''}</td><td class="num">${m.tipo === 'entrada' ? '+' : '−'}${m.cant}</td><td>${m.user}</td><td class="muted">${escapar(m.nota || '')}</td></tr>`).join('');
}
function pintarPedido() {
  const lineas = Object.entries(db.pedido);
  $('#n-pedido').textContent = lineas.length;
  $('#n-pedido').hidden = !lineas.length;
  if (!lineas.length) { $('#order').innerHTML = '<p class="empty-big">No hay nada pendiente de pedir.<br><span>Desde Existencias, pulsa «Pedir» en los productos bajo mínimo.</span></p>'; return; }
  const porProv = {};
  lineas.forEach(([sku, cant]) => { const p = db.productos.find((x) => x.sku === sku); (porProv[p.prov] = porProv[p.prov] || []).push({ p, cant }); });
  $('#order').innerHTML = Object.entries(porProv).map(([prov, ls]) => `
    <section class="supplier"><header><h2>${prov}</h2><span>${ls.length} ${ls.length === 1 ? 'línea' : 'líneas'}</span><button type="button" class="btn sm" data-enviar="${escapar(prov)}">Enviar pedido</button></header>
      <table class="grid"><tbody>${ls.map(({ p, cant }) => `<tr><td class="mono">${p.sku}</td><td class="strong">${p.n}</td><td class="muted">Stock ${p.stock} · mín. ${p.min}</td><td class="num"><input type="number" min="1" value="${cant}" data-cant="${p.sku}" aria-label="Cantidad de ${p.n}"></td><td class="act"><button type="button" class="link" data-quitar="${p.sku}">Quitar</button></td></tr>`).join('')}</tbody></table>
    </section>`).join('');
}
function pintarDrawer() {
  const p = db.productos.find((x) => x.sku === estado.sel);
  $('#drawer').hidden = !p;
  document.querySelector('.shell').classList.toggle('open', Boolean(p));
  if (!p) return;
  $('#d-sku').textContent = `${p.sku} · ${p.ubic}`;
  $('#d-name').textContent = p.n;
  $('#d-facts').innerHTML = `<div><dt>Stock</dt><dd class="${nivel(p)}">${fmt(p.stock)}</dd></div><div><dt>Mínimo</dt><dd>${p.min}</dd></div><div><dt>Proveedor</dt><dd class="small">${p.prov}</dd></div>`;
  // Evolución del stock reconstruida hacia atrás desde los movimientos
  const pts = []; let s = p.stock; const ahora = Date.now();
  const ms = db.movs.filter((m) => m.sku === p.sku);
  for (let d = 0; d <= 30; d++) {
    ms.filter((m) => Math.floor((ahora - m.t) / 86400000) === d).forEach((m) => { s += m.tipo === 'entrada' ? -m.cant : m.cant; });
    pts.unshift(Math.max(s, 0));
  }
  const max = Math.max(...pts, p.min) * 1.15 || 1;
  const xy = pts.map((v, i) => `${(i / 30) * 300},${70 - (v / max) * 66}`).join(' ');
  const yMin = 70 - (p.min / max) * 66;
  $('#spark').innerHTML = `<line x1="0" x2="300" y1="${yMin}" y2="${yMin}" class="sp-min"/><polyline points="${xy}" class="sp-line"/>`;
}
function pintarTodo() { pintarKpis(); pintarTabla(); pintarPedido(); pintarDrawer(); }
function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2600); }

// ---------- Eventos ----------
$('#cat').innerHTML = '<option value="">Todas las categorías</option>' + [...new Set(db.productos.map((p) => p.cat))].map((c) => `<option>${c}</option>`).join('');
$('#cat').addEventListener('change', (e) => { estado.cat = e.target.value; pintarTabla(); });
$('#q').addEventListener('input', (e) => { estado.q = e.target.value; ir('stock'); pintarTabla(); });
$('#filters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-f]'); if (!b) return;
  estado.f = b.dataset.f;
  document.querySelectorAll('#filters [data-f]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  pintarTabla();
});
$('#rows').addEventListener('click', (e) => {
  const pedir = e.target.closest('[data-pedir]');
  if (pedir) { const p = db.productos.find((x) => x.sku === pedir.dataset.pedir); db.pedido[p.sku] = Math.max(p.min * 2 - p.stock, 1); guardar(); pintarTodo(); aviso(`${p.n}: añadido al pedido`); return; }
  const tr = e.target.closest('tr[data-sku]'); if (!tr) return;
  estado.sel = tr.dataset.sku; pintarTabla(); pintarDrawer();
});
$('#d-close').addEventListener('click', () => { estado.sel = null; pintarTabla(); pintarDrawer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && estado.sel) { estado.sel = null; pintarTabla(); pintarDrawer(); } });
$('#d-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const p = db.productos.find((x) => x.sku === estado.sel);
  const cant = Math.max(1, parseInt(f.get('cant'), 10) || 0);
  const tipo = f.get('tipo');
  if (tipo === 'salida' && cant > p.stock) { aviso(`Solo hay ${p.stock} en stock`); return; }
  p.stock += tipo === 'entrada' ? cant : -cant;
  db.movs.unshift({ t: Date.now(), sku: p.sku, tipo, cant, user: 'R. Gil', nota: String(f.get('nota') || '').trim() });
  guardar(); pintarTodo(); pintarMovs();
  aviso(`${tipo === 'entrada' ? 'Entrada' : 'Salida'} de ${cant} · ${p.n}`);
});
$('#order').addEventListener('click', (e) => {
  const q = e.target.closest('[data-quitar]'); const env = e.target.closest('[data-enviar]');
  if (q) { delete db.pedido[q.dataset.quitar]; guardar(); pintarTodo(); }
  if (env) {
    const prov = env.dataset.enviar;
    Object.keys(db.pedido).forEach((sku) => { if (db.productos.find((p) => p.sku === sku).prov === prov) delete db.pedido[sku]; });
    guardar(); pintarTodo(); aviso(`Pedido enviado a ${prov}`);
  }
});
$('#order').addEventListener('change', (e) => { const i = e.target.closest('[data-cant]'); if (i) { db.pedido[i.dataset.cant] = Math.max(1, +i.value || 1); guardar(); } });
function ir(v) {
  document.querySelectorAll('.rail [data-view]').forEach((b) => (b.dataset.view === v ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  document.querySelectorAll('.view').forEach((s) => { s.hidden = s.id !== v; });
  $('#titulo').textContent = { stock: 'Existencias', movs: 'Movimientos', pedido: 'Pedido a proveedores' }[v];
  if (v === 'movs') pintarMovs();
  if (v !== 'stock') { estado.sel = null; pintarDrawer(); }
}
document.querySelector('.rail').addEventListener('click', (e) => { const b = e.target.closest('[data-view]'); if (b) ir(b.dataset.view); });

pintarTodo();
