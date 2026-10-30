// Cuadra (demo): cuentas de una autónoma. Resumen trimestral con lo que hay que apartar para Hacienda,
// movimientos, emisión de facturas con IVA y retención, y borrador de los modelos 303 y 130.
const HOY = new Date(2026, 9, 6);
const CLIENTES = [
  { n: 'Lumen Studio, S.L.', nif: 'B·····204', ret: true },
  { n: 'Grupo Hostelero Bahía, S.L.', nif: 'B·····871', ret: true },
  { n: 'Hanna Becker (Berlín)', nif: 'DE·······', ret: false, ue: true },
  { n: 'Asociación Cultural Faro', nif: 'G·····336', ret: true },
];
let MOVS = [
  ['2026-07-03', 'i', 'Factura 2026-038 · Lumen Studio', 2400, 21, 0],
  ['2026-07-05', 'g', 'Cuota de autónomos', 294, 0, 'Seguridad Social'],
  ['2026-07-08', 'g', 'Portátil de trabajo', 1420, 21, 'Equipos'],
  ['2026-07-12', 'g', 'Coworking La Nave', 180, 21, 'Oficina'],
  ['2026-07-18', 'i', 'Factura 2026-039 · Grupo Hostelero Bahía', 1150, 21, 1],
  ['2026-07-29', 'i', 'Factura 2026-040 · Asociación Cultural Faro', 860, 21, 3],
  ['2026-08-02', 'g', 'Cuota de autónomos', 294, 0, 'Seguridad Social'],
  ['2026-08-04', 'g', 'Licencias de diseño', 71, 21, 'Software'],
  ['2026-08-12', 'g', 'Coworking La Nave', 180, 21, 'Oficina'],
  ['2026-08-20', 'i', 'Factura 2026-041 · Hanna Becker', 1900, 0, 2],
  ['2026-09-01', 'g', 'Cuota de autónomos', 294, 0, 'Seguridad Social'],
  ['2026-09-04', 'g', 'Licencias de diseño', 71, 21, 'Software'],
  ['2026-09-09', 'i', 'Factura 2026-042 · Lumen Studio', 2750, 21, 0],
  ['2026-09-12', 'g', 'Coworking La Nave', 180, 21, 'Oficina'],
  ['2026-09-17', 'g', 'Tren Madrid · reunión cliente', 86.4, 10, 'Viajes'],
  ['2026-09-22', 'i', 'Factura 2026-043 · Grupo Hostelero Bahía', 1200, 21, 1],
  ['2026-09-26', 'g', 'Teléfono e internet', 52, 21, 'Suministros'],
  ['2026-09-30', 'i', 'Factura 2026-044 · Asociación Cultural Faro', 640, 21, 3],
].map(([f, t, c, base, iva, extra], id) => ({ id, f, t, c, base, iva, cli: t === 'i' ? extra : null, cat: t === 'g' ? extra : 'Ventas' }));
let siguiente = 45;
const CATS = ['Oficina', 'Software', 'Equipos', 'Viajes', 'Suministros', 'Formación'];

const $ = (s) => document.querySelector(s);
const eur = (n, sign) => (sign && n > 0 ? '+' : '') + n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' }) + ' €';
const eur0 = (n) => n.toLocaleString('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' }) + ' €';
const fechaTxt = (s) => new Date(s + 'T12:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
const st = { vista: 'resumen', filtro: 'todo', fac: { cli: 0, concepto: 'Diseño de interfaz · app de reservas', base: 1800 }, emitida: null };

function cuentas() {
  const ing = MOVS.filter((m) => m.t === 'i'), gas = MOVS.filter((m) => m.t === 'g');
  const base = (l) => l.reduce((a, m) => a + m.base, 0);
  const ivaRep = ing.reduce((a, m) => a + m.base * m.iva / 100, 0);
  const ivaSop = gas.reduce((a, m) => a + m.base * m.iva / 100, 0);
  const ret = ing.filter((m) => CLIENTES[m.cli].ret).reduce((a, m) => a + m.base * 0.15, 0);
  const rend = base(ing) - base(gas);
  const r130 = Math.max(rend * 0.2 - ret, 0);
  const ueBase = ing.filter((m) => CLIENTES[m.cli].ue).reduce((a, m) => a + m.base, 0);
  return { ingresos: base(ing), gastos: base(gas), ivaRep, ivaSop, iva: ivaRep - ivaSop, ret, rend, r130, ueBase };
}

// ---------- Resumen ----------
function resumen() {
  const c = cuentas();
  const apartar = c.iva + c.r130;
  const meses = ['07', '08', '09'].map((mm) => ({ n: new Date(2026, +mm - 1).toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''), i: MOVS.filter((m) => m.t === 'i' && m.f.slice(5, 7) === mm).reduce((a, m) => a + m.base, 0), g: MOVS.filter((m) => m.t === 'g' && m.f.slice(5, 7) === mm).reduce((a, m) => a + m.base, 0) }));
  const max = Math.max(...meses.flatMap((m) => [m.i, m.g]));
  const dias = Math.round((new Date(2026, 9, 20) - HOY) / 864e5);
  return `
  <section class="hero">
    <p class="lbl">Beneficio del trimestre</p>
    <p class="big">${eur0(c.rend)}</p>
    <div class="pair"><div><span>Ingresos</span><b>${eur0(c.ingresos)}</b></div><div><span>Gastos</span><b>${eur0(c.gastos)}</b></div></div>
  </section>
  <section class="aside">
    <div class="aside-top"><p class="lbl">Aparta para Hacienda</p><b>${eur(apartar)}</b></div>
    <div class="split"><i data-w="${(c.iva / apartar) * 100}"></i><i class="b" data-w="${(c.r130 / apartar) * 100}"></i></div>
    <ul class="kv"><li><span><i></i>IVA · modelo 303</span><b>${eur(c.iva)}</b></li><li><span><i class="b"></i>IRPF · modelo 130</span><b>${eur(c.r130)}</b></li></ul>
    <p class="due">Presentar antes del 20 de octubre · quedan ${dias} días</p>
  </section>
  <section class="bank"><span class="bk">B</span><div><b>Cuenta de empresa ·· 4471</b><span>Sincronizada hace 3 min</span></div><strong>${eur(saldoFinal())}</strong></section>
  <section class="chart">
    <div class="ch-top"><p class="lbl">Saldo de la cuenta</p><em>+${eur0(saldoFinal() - SALDO0)} en el trimestre</em></div>
    ${grafSaldo()}
  </section>
  <section class="cats-sec">
    <p class="lbl">Gastos por categoría</p>
    ${porCategoria()}
  </section>
  <section class="pend"><p class="lbl">Por cobrar</p><ul>${[['Grupo Hostelero Bahía, S.L.', '2026-043', 1200 * 1.06, 'vence en 6 días'], ['Asociación Cultural Faro', '2026-044', 640 * 1.06, 'vence en 24 días']].map(([n, f, x, v]) => `<li><span class="ini">${n.split(' ').slice(0, 2).map((w) => w[0]).join('')}</span><div><b>${n}</b><small>Factura ${f} · ${v}</small></div><strong>${eur(x)}</strong></li>`).join('')}</ul></section>
  <p class="foot">Demo de Folzia · persona y cifras ficticias.</p>`;
}

// Saldo diario reconstruido a partir de los movimientos (con IVA incluido)
const SALDO0 = 9840;
function serieSaldo() {
  const dias = []; let s = SALDO0;
  for (let d = new Date(2026, 6, 1); d <= new Date(2026, 8, 30); d.setDate(d.getDate() + 1)) {
    const f = `2026-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    MOVS.filter((m) => m.f === f).forEach((m) => { const tot = m.base * (1 + m.iva / 100) - (m.t === 'i' && CLIENTES[m.cli].ret ? m.base * 0.15 : 0); s += m.t === 'i' ? tot : -tot; });
    if (f === '2026-07-20') s -= 1630; // 303 y 130 del 2T
    dias.push(s);
  }
  return dias;
}
const saldoFinal = () => { const s = serieSaldo(); return s[s.length - 1]; };
function grafSaldo() {
  const s = serieSaldo(); const min = Math.min(...s) * 0.95, max = Math.max(...s) * 1.03;
  const X = (i) => (i / (s.length - 1)) * 340 + 10, Y = (v) => 120 - ((v - min) / (max - min)) * 108;
  const pts = s.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  return `<svg class="saldo" viewBox="0 0 360 140" preserveAspectRatio="none"><defs><linearGradient id="gs" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2341e0" stop-opacity=".18"/><stop offset="1" stop-color="#2341e0" stop-opacity="0"/></linearGradient></defs>
    ${[0, 1, 2].map((k) => `<line x1="10" x2="350" y1="${12 + k * 54}" y2="${12 + k * 54}" class="gl"/>`).join('')}
    <polygon points="10,120 ${pts} 350,120" fill="url(#gs)" stroke="none"/><polyline points="${pts}" class="ln"/>
    <circle cx="${X(s.length - 1)}" cy="${Y(s[s.length - 1])}" r="4" class="dot"/>
    ${['jul', 'ago', 'sep'].map((m, k) => `<text x="${10 + k * 113 + 4}" y="136" class="tx">${m}</text>`).join('')}</svg>`;
}
function porCategoria() {
  const g = {}; MOVS.filter((m) => m.t === 'g').forEach((m) => { g[m.cat] = (g[m.cat] || 0) + m.base; });
  const l = Object.entries(g).sort((a, b) => b[1] - a[1]); const max = l[0][1];
  return `<ul class="cbars">${l.map(([n, v]) => `<li><span>${n}</span><i><i data-w="${(v / max) * 100}"></i></i><b>${eur0(v)}</b></li>`).join('')}</ul>`;
}

// ---------- Movimientos ----------
function movs() {
  const lista = MOVS.filter((m) => st.filtro === 'todo' || m.t === st.filtro).sort((a, b) => b.f.localeCompare(a.f) || b.id - a.id);
  const grupos = {};
  lista.forEach((m) => { (grupos[m.f] = grupos[m.f] || []).push(m); });
  return `
  <div class="mv-head"><div class="chips">${[['todo', 'Todo'], ['i', 'Ingresos'], ['g', 'Gastos']].map(([k, n]) => `<button type="button" data-f="${k}" aria-pressed="${st.filtro === k}">${n}</button>`).join('')}</div><button type="button" class="add" data-add><svg><use href="#i-plus"/></svg>Gasto</button></div>
  ${Object.entries(grupos).map(([f, ms]) => `<h3 class="day">${fechaTxt(f)}</h3><ul class="mv">${ms.map((m) => `<li class="${m.nuevo ? 'new' : ''}"><span class="cat c-${m.t}">${m.cat[0]}</span><div><b>${m.c}</b><small>${m.cat}${m.iva ? ` · IVA ${m.iva} %` : ' · sin IVA'}</small></div><strong class="${m.t}">${eur(m.t === 'i' ? m.base : -m.base, true)}</strong></li>`).join('')}</ul>`).join('')}`;
}
function hojaGasto() {
  $('#sheet-in').innerHTML = `
    <h2>Nuevo gasto</h2>
    <label class="amt"><input id="g-imp" inputmode="decimal" placeholder="0,00" autocomplete="off"><span>€ base</span></label>
    <label class="fld"><span>Concepto</span><input id="g-con" placeholder="Ej.: curso de tipografía"></label>
    <p class="fl">Categoría</p>
    <div class="chips wrap" id="g-cat">${CATS.map((c, i) => `<button type="button" data-cat="${c}" aria-pressed="${i === 5}">${c}</button>`).join('')}</div>
    <p class="fl">IVA soportado</p>
    <div class="chips" id="g-iva">${[21, 10, 4, 0].map((v) => `<button type="button" data-iva="${v}" aria-pressed="${v === 21}">${v} %</button>`).join('')}</div>
    <button type="button" class="btn" data-save-gasto>Guardar gasto</button>`;
  $('#sheet').hidden = false;
}

// ---------- Facturar ----------
function facturar() {
  if (st.emitida) {
    const f = st.emitida; const cl = CLIENTES[f.cli];
    return `
    <div class="issued"><svg><use href="#i-check"/></svg><div><b>Factura ${f.num} emitida</b><span>Enviada a ${cl.n}</span></div></div>
    <article class="inv">
      <header><div><b>Clara Méndez Ortiz</b><span>Diseño de producto · NIF ·····512Q</span></div><div class="inv-n"><b>${f.num}</b><span>${HOY.toLocaleDateString('es-ES')}</span></div></header>
      <p class="to">Para<b>${cl.n}</b><span>${cl.nif}</span></p>
      <table><tr><td>${f.concepto}</td><td>${eur(f.base)}</td></tr><tr><td>IVA ${cl.ue ? '0 % (inversión del sujeto pasivo)' : '21 %'}</td><td>${eur(f.iva)}</td></tr>${cl.ret ? `<tr><td>Retención IRPF 15 %</td><td>−${eur(f.ret)}</td></tr>` : ''}<tr class="t"><td>Total</td><td>${eur(f.total)}</td></tr></table>
      <p class="pay">Transferencia a ES·· ···· ···· ·· 4471 · vencimiento 30 días</p>
    </article>
    <button type="button" class="btn ghost" data-new-inv>Nueva factura</button>`;
  }
  const cl = CLIENTES[st.fac.cli]; const b = st.fac.base || 0;
  const iva = cl.ue ? 0 : b * 0.21, ret = cl.ret ? b * 0.15 : 0;
  return `
  <h2 class="ttl">Nueva factura <span>${`2026-0${siguiente}`}</span></h2>
  <p class="fl">Cliente</p>
  <div class="clients">${CLIENTES.map((c, i) => `<button type="button" data-cli="${i}" aria-pressed="${st.fac.cli === i}"><b>${c.n}</b><span>${c.ue ? 'Unión Europea · sin IVA' : c.ret ? 'Empresa · retención 15 %' : 'Particular'}</span></button>`).join('')}</div>
  <label class="fld"><span>Concepto</span><input id="f-con" value="${st.fac.concepto}"></label>
  <label class="fld"><span>Base imponible</span><div class="unit"><input id="f-base" inputmode="decimal" value="${String(st.fac.base).replace('.', ',')}"><em>€</em></div></label>
  <dl class="calc"><div><dt>Base</dt><dd>${eur(b)}</dd></div><div><dt>IVA ${cl.ue ? '0 %' : '21 %'}</dt><dd>${eur(iva)}</dd></div>${cl.ret ? `<div><dt>Retención IRPF 15 %</dt><dd>−${eur(ret)}</dd></div>` : ''}<div class="t"><dt>A cobrar</dt><dd>${eur(b + iva - ret)}</dd></div></dl>
  <button type="button" class="btn" data-emitir ${b > 0 ? '' : 'disabled'}>Emitir y enviar</button>`;
}

// ---------- Impuestos ----------
function impuestos() {
  const c = cuentas();
  const baseNac = c.ingresos - c.ueBase;
  return `
  <h2 class="ttl">Borradores 3T</h2>
  <section class="model"><header><b>Modelo 303</b><span>IVA trimestral</span></header>
    <table><tr><td><i>01</i>Base imponible al 21 %</td><td>${eur(baseNac)}</td></tr><tr><td><i>03</i>Cuota devengada</td><td>${eur(c.ivaRep)}</td></tr><tr><td><i>28</i>Base de gastos deducibles</td><td>${eur(MOVS.filter((m) => m.t === 'g' && m.iva).reduce((a, m) => a + m.base, 0))}</td></tr><tr><td><i>29</i>Cuota deducible</td><td>${eur(c.ivaSop)}</td></tr><tr><td><i>59</i>Entregas intracomunitarias</td><td>${eur(c.ueBase)}</td></tr><tr class="t"><td><i>71</i>Resultado a ingresar</td><td>${eur(c.iva)}</td></tr></table></section>
  <section class="model"><header><b>Modelo 130</b><span>Pago fraccionado IRPF</span></header>
    <table><tr><td><i>01</i>Ingresos computables</td><td>${eur(c.ingresos)}</td></tr><tr><td><i>02</i>Gastos deducibles</td><td>${eur(c.gastos)}</td></tr><tr><td><i>03</i>Rendimiento neto</td><td>${eur(c.rend)}</td></tr><tr><td><i>04</i>20 % del rendimiento</td><td>${eur(c.rend * 0.2)}</td></tr><tr><td><i>06</i>Retenciones soportadas</td><td>−${eur(c.ret)}</td></tr><tr class="t"><td><i>19</i>Resultado a ingresar</td><td>${eur(c.r130)}</td></tr></table></section>
  <button type="button" class="btn" data-export>Enviar a mi gestoría</button>`;
}

function pintar() {
  $('#main').innerHTML = { resumen, movs, facturar, impuestos }[st.vista]();
  document.querySelectorAll('[data-w]').forEach((i) => { i.style.width = i.dataset.w + '%'; });
  document.querySelectorAll('[data-h]').forEach((i) => { i.style.height = Math.max(+i.dataset.h, 2) + '%'; });
  document.querySelectorAll('.tabbar [data-view]').forEach((b) => (b.dataset.view === st.vista ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
}
function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2400); }
const cerrarHoja = () => { $('#sheet').hidden = true; };

document.addEventListener('click', (e) => {
  const v = e.target.closest('.tabbar [data-view]'); if (v) { st.vista = v.dataset.view; pintar(); scrollTo(0, 0); return; }
  const f = e.target.closest('[data-f]'); if (f) { st.filtro = f.dataset.f; pintar(); return; }
  if (e.target.closest('[data-add]')) { hojaGasto(); return; }
  if (e.target.closest('[data-close]')) { cerrarHoja(); return; }
  const cat = e.target.closest('[data-cat]'); if (cat) { document.querySelectorAll('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(b === cat))); return; }
  const iva = e.target.closest('[data-iva]'); if (iva) { document.querySelectorAll('[data-iva]').forEach((b) => b.setAttribute('aria-pressed', String(b === iva))); return; }
  if (e.target.closest('[data-save-gasto]')) {
    const imp = parseFloat(($('#g-imp').value || '0').replace(',', '.')); if (!imp) { $('#g-imp').focus(); return; }
    const c = document.querySelector('[data-cat][aria-pressed="true"]').dataset.cat;
    MOVS.push({ id: MOVS.length, f: '2026-09-30', t: 'g', c: $('#g-con').value || c, base: imp, iva: +document.querySelector('[data-iva][aria-pressed="true"]').dataset.iva, cat: c, nuevo: true });
    cerrarHoja(); pintar(); aviso(`Gasto guardado · ${eur(imp)} en ${c.toLowerCase()}`); return;
  }
  const cli = e.target.closest('[data-cli]'); if (cli) { st.fac.cli = +cli.dataset.cli; pintar(); return; }
  if (e.target.closest('[data-emitir]')) {
    const cl = CLIENTES[st.fac.cli]; const b = st.fac.base; const iv = cl.ue ? 0 : b * 0.21; const r = cl.ret ? b * 0.15 : 0;
    st.emitida = { num: `2026-0${siguiente}`, cli: st.fac.cli, concepto: st.fac.concepto, base: b, iva: iv, ret: r, total: b + iv - r };
    MOVS.push({ id: MOVS.length, f: '2026-09-30', t: 'i', c: `Factura 2026-0${siguiente} · ${cl.n}`, base: b, iva: cl.ue ? 0 : 21, cli: st.fac.cli, cat: 'Ventas', nuevo: true });
    siguiente++; pintar(); scrollTo(0, 0); return;
  }
  if (e.target.closest('[data-new-inv]')) { st.emitida = null; pintar(); return; }
  if (e.target.closest('[data-export]')) { aviso('Borradores enviados a Vértice asesores'); }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'f-con') st.fac.concepto = e.target.value;
  if (e.target.id === 'f-base') { st.fac.base = parseFloat(e.target.value.replace(/\./g, '').replace(',', '.')) || 0; const pos = e.target.selectionStart; pintar(); const i = $('#f-base'); i.focus(); i.setSelectionRange(pos, pos); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarHoja(); });
pintar();
