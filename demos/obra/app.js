// Hormigo (demo): parte diario del encargado de obra. Horas de la cuadrilla por partida, albaranes imputados
// y desviación de cada partida (consumo frente a avance físico) calculada al momento.
const $ = (s) => document.querySelector(s);
const fmt = (n, d = 1) => n.toLocaleString('es-ES', { minimumFractionDigits: n % 1 ? d : 0, maximumFractionDigits: d });
const PARTIDAS = [
  { id: 'forj', cod: '04.03', cap: 'Estructura', n: 'Forjado reticular planta 3', pres: 380, prev: 346, avance: 90, c: 'p1', mat: { n: 'Hormigón', u: 'm³', pres: 64, cons: 61 } },
  { id: 'tab', cod: '05.01', cap: 'Albañilería', n: 'Tabiquería planta 1', pres: 260, prev: 147, avance: 64, c: 'p2', mat: { n: 'Ladrillo', u: 'ud', pres: 9800, cons: 6050 } },
  { id: 'san', cod: '06.02', cap: 'Saneamiento', n: 'Red horizontal enterrada', pres: 120, prev: 35, avance: 40, c: 'p3', mat: { n: 'Tubo PVC Ø160', u: 'm', pres: 210, cons: 88 } },
];
const P = Object.fromEntries(PARTIDAS.map((p) => [p.id, p]));
const CUADRILLA = [
  { id: 'ivan', n: 'Iván Roldán', cat: 'Oficial 1ª · encofrador', h: { forj: 6 } },
  { id: 'jona', n: 'Jonatan Ferrer', cat: 'Oficial 1ª · encofrador', h: { forj: 8 } },
  { id: 'mihai', n: 'Mihai Popescu', cat: 'Ayudante', h: { forj: 5, san: 3 } },
  { id: 'rafa', n: 'Rafael Cano', cat: 'Oficial 1ª · albañil', h: { tab: 8 } },
  { id: 'samir', n: 'Samir El Idrissi', cat: 'Peón', h: { tab: 4, san: 4 } },
  { id: 'lucas', n: 'Lucas Benítez', cat: 'Fontanero · Instalaciones Lledó', h: { san: 8 }, sub: true },
];
const ALBARANES = [
  { id: 23817, prov: 'Hormigones del Henares', mat: 'Hormigón HA-25/B/20/IIa', cant: 7.5, u: 'm³', h: '09:40', part: null, sug: 'forj' },
  { id: 5521, prov: 'Cerámicas Valdemoro', mat: 'Ladrillo hueco doble 24×11×8', cant: 1200, u: 'ud', h: '08:15', part: 'tab' },
];
const JORNADA = 8;
const st = { vista: 'parte', enviado: false };
const iniciales = (n) => n.split(' ').slice(0, 2).map((x) => x[0]).join('');
const horasDe = (w) => Object.values(w.h).reduce((a, b) => a + b, 0);
const hoyPart = (id) => CUADRILLA.reduce((a, w) => a + (w.h[id] || 0), 0);
function estado(p) {
  const consH = p.prev + hoyPart(p.id);
  const pctH = (consH / p.pres) * 100;
  const mat = p.mat.cons + ALBARANES.filter((a) => a.part === p.id && a.u === p.mat.u && a.nuevo).reduce((s, a) => s + a.cant, 0);
  const pctM = (mat / p.mat.pres) * 100;
  const desv = (pctH / p.avance - 1) * 100;
  return { consH, pctH, mat, pctM, desv, nivel: desv > 10 || pctM > 100 ? 'mal' : desv > 3 ? 'ojo' : 'bien' };
}

// ---------- Parte del día ----------
function parte() {
  const total = CUADRILLA.reduce((a, w) => a + horasDe(w), 0);
  const falta = CUADRILLA.filter((w) => horasDe(w) < JORNADA);
  const sinImputar = ALBARANES.filter((a) => !a.part);
  return `
  <header class="top">
    <svg class="logo"><use href="#logo"/></svg>
    <div class="who"><b>Residencial Alameda · F2</b><span>Parte nº 118 · mar 14 oct · A. Pozo</span></div>
  </header>
  <div class="clima"><svg><use href="#i-rain"/></svg><span><b>Lluvia 13:00–15:00</b> · la grúa paró 2 h</span></div>
  <section class="bloque">
    <div class="h"><h2>Cuadrilla</h2><span class="${total < CUADRILLA.length * JORNADA ? 'warn' : 'ok'}">${fmt(total)} / ${CUADRILLA.length * JORNADA} h</span></div>
    <ul class="gente">${CUADRILLA.map((w) => { const h = horasDe(w); return `
      <li><button type="button" data-w="${w.id}" class="${h < JORNADA ? 'incompleto' : ''} ${w.id === st.flash ? 'flash' : ''}">
        <span class="ini">${iniciales(w.n)}</span>
        <span class="nm"><b>${w.n}</b><small>${w.cat}</small></span>
        <span class="hh"><b>${fmt(h)}</b>/${JORNADA} h</span>
        <span class="reparto">${Object.entries(w.h).filter(([, v]) => v).map(([k, v]) => `<i class="${P[k].c}" data-pct="${(v / JORNADA) * 100}"></i>`).join('')}</span>
      </button></li>`; }).join('')}</ul>
    <ul class="ley">${PARTIDAS.map((p) => `<li class="${p.c}">${p.cod}</li>`).join('')}</ul>
  </section>
  ${sinImputar.length ? `<button type="button" class="alb-pend" data-alb="${sinImputar[0].id}"><svg><use href="#i-truck"/></svg><span><b>${sinImputar.length} albarán sin imputar</b><small>${sinImputar[0].prov} · ${fmt(sinImputar[0].cant)} ${sinImputar[0].u} · ${sinImputar[0].h}</small></span><em>Imputar</em></button>` : ''}
  <section class="bloque">
    <div class="h"><h2>Partidas</h2><span>horas · material · avance</span></div>
    ${PARTIDAS.map((p) => { const e = estado(p); return `
    <article class="partida ${e.nivel} ${p.id === st.flashP ? 'flash' : ''}">
      <header><span class="cod ${p.c}">${p.cod}</span><div><small>${p.cap}</small><b>${p.n}</b></div>${e.nivel === 'mal' ? '<span class="badge"><svg><use href="#i-warn"/></svg>Desviación</span>' : ''}</header>
      <div class="medida"><span>Horas</span><div class="barra"><i data-pct="${Math.min(e.pctH, 100)}"></i><b class="av" data-pct="${p.avance}"></b></div><em>${fmt(e.consH)} / ${p.pres} h</em></div>
      <div class="medida"><span>${p.mat.n}</span><div class="barra"><i data-pct="${Math.min(e.pctM, 100)}" class="${e.pctM > 100 ? 'over' : ''}"></i><b class="av" data-pct="${p.avance}"></b></div><em>${fmt(e.mat)} / ${fmt(p.mat.pres)} ${p.mat.u}</em></div>
      <footer><span>Avance físico <b>${p.avance} %</b></span><span>Hoy <b>${fmt(hoyPart(p.id))} h</b></span><span class="dv">${e.desv >= 0 ? '+' : ''}${fmt(e.desv, 0)} % horas</span></footer>
    </article>`; }).join('')}
    <p class="nota-av">La marca negra de cada barra es el avance físico: si la barra la pasa, se está gastando más de lo que se avanza.</p>
  </section>
  <div class="envio">
    <p>${falta.length ? `Faltan horas de ${falta.map((w) => w.n.split(' ')[0]).join(', ')}` : sinImputar.length ? 'Queda un albarán por imputar' : 'Parte completo · listo para enviar'}</p>
    <button type="button" class="main" data-enviar ${falta.length || sinImputar.length ? 'disabled' : ''}><svg><use href="#i-send"/></svg>Enviar a oficina técnica</button>
  </div>
  <p class="demo">Demo de Folzia · obra, empresa y personas ficticias.</p>`;
}

// ---------- Hojas: horas de un operario y albarán ----------
function hojaHoras(w) {
  const h = horasDe(w);
  return `
  <div class="grip"></div>
  <div class="sh-h"><span class="ini">${iniciales(w.n)}</span><div><b>${w.n}</b><small>${w.cat}</small></div><span class="tot ${h === JORNADA ? 'ok' : h > JORNADA ? 'mal' : ''}">${fmt(h)} / ${JORNADA} h</span></div>
  <ul class="steps">${PARTIDAS.map((p) => `<li><span class="cod ${p.c}">${p.cod}</span><span class="pn">${p.n}</span><div class="step"><button type="button" data-h="${w.id}|${p.id}|-0.5" aria-label="Quitar media hora"><svg><use href="#i-minus"/></svg></button><b>${fmt(w.h[p.id] || 0)}</b><button type="button" data-h="${w.id}|${p.id}|0.5" aria-label="Añadir media hora"><svg><use href="#i-plus"/></svg></button></div></li>`).join('')}</ul>
  <p class="sh-n">${h < JORNADA ? `Quedan ${fmt(JORNADA - h)} h por repartir.` : h > JORNADA ? `${fmt(h - JORNADA)} h extra: se marcarán como horas extraordinarias.` : 'Jornada completa.'}</p>
  <button type="button" class="main" data-close>Guardar</button>`;
}
function hojaAlbaran(a) {
  return `
  <div class="grip"></div>
  <p class="k">Albarán ${a.id} · ${a.h}</p>
  <h2>${a.mat}</h2>
  <p class="prov">${a.prov} · <b>${fmt(a.cant)} ${a.u}</b></p>
  <p class="lab">Imputar a la partida</p>
  <ul class="opts">${PARTIDAS.map((p) => `<li><button type="button" data-imp="${a.id}|${p.id}" aria-pressed="${p.id === a.sel}"><span class="cod ${p.c}">${p.cod}</span><span>${p.n}</span>${p.id === a.sug ? '<em>Sugerida</em>' : ''}</button></li>`).join('')}</ul>
  <button type="button" class="main" data-imputar="${a.id}" ${a.sel ? '' : 'disabled'}>Imputar albarán</button>`;
}

// ---------- Enviado ----------
function enviado() {
  const total = CUADRILLA.reduce((a, w) => a + horasDe(w), 0);
  const alertas = PARTIDAS.filter((p) => estado(p).nivel === 'mal');
  return `
  <header class="top"><svg class="logo"><use href="#logo"/></svg><div class="who"><b>Parte nº 118 enviado</b><span>Oficina técnica · Laura Gil · 18:42</span></div></header>
  <section class="hecho">
    <span class="sello"><svg><use href="#i-check"/></svg></span>
    <div class="nums"><div><b>${fmt(total)} h</b><span>6 personas</span></div><div><b>${PARTIDAS.length}</b><span>partidas</span></div><div><b>${ALBARANES.length}</b><span>albaranes</span></div></div>
  </section>
  <section class="bloque">
    <div class="h"><h2>Avisos para la oficina</h2></div>
    ${alertas.map((p) => { const e = estado(p); return `<div class="alerta"><svg><use href="#i-warn"/></svg><div><b>${p.cod} ${p.n}</b><p>Horas al ${fmt(e.pctH, 0)} % con un avance del ${p.avance} %. ${e.pctM > 100 ? `${p.mat.n}: ${fmt(e.mat)} de ${p.mat.pres} ${p.mat.u} presupuestados (${fmt(e.pctM, 0)} %).` : ''}</p></div></div>`; }).join('')}
    <div class="alerta info"><svg><use href="#i-rain"/></svg><div><b>Climatología</b><p>2 h de parada de grúa por lluvia, anotadas para el plazo.</p></div></div>
  </section>
  <button type="button" class="main ghost" data-go="parte"><svg><use href="#i-doc"/></svg>Ver el parte</button>`;
}

function pintar() {
  $('#app').innerHTML = st.vista === 'parte' ? parte() : enviado();
  document.querySelectorAll('[data-pct]').forEach((el) => { if (el.classList.contains('av')) el.style.left = el.dataset.pct + '%'; else el.style.width = el.dataset.pct + '%'; });
}
function abrir(html) { $('#sheet-in').innerHTML = html; $('#sheet').hidden = false; requestAnimationFrame(() => $('#sheet').classList.add('on')); }
function cerrar() { $('#sheet').classList.remove('on'); setTimeout(() => { $('#sheet').hidden = true; }, 220); }
function aviso(t, mal) { const el = $('#toast'); el.textContent = t; el.classList.toggle('mal', !!mal); el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2600); }
let abierto = null;

document.addEventListener('click', (e) => {
  const q = (s) => e.target.closest(s); let b;
  if ((b = q('[data-w]'))) { abierto = CUADRILLA.find((w) => w.id === b.dataset.w); abrir(hojaHoras(abierto)); return; }
  if ((b = q('[data-h]'))) {
    const [wid, pid, d] = b.dataset.h.split('|'); const w = CUADRILLA.find((x) => x.id === wid);
    w.h[pid] = Math.max(0, (w.h[pid] || 0) + +d); $('#sheet-in').innerHTML = hojaHoras(w); return;
  }
  if (q('[data-close]')) {
    cerrar();
    if (abierto) { st.flash = abierto.id; st.flashP = 'forj'; pintar(); const e2 = estado(P.forj); aviso(`${abierto.n.split(' ')[0]}: ${fmt(horasDe(abierto))} h guardadas · 04.03 al ${fmt(e2.pctH, 0)} %`); abierto = null; }
    return;
  }
  if ((b = q('[data-alb]'))) { const a = ALBARANES.find((x) => x.id === +b.dataset.alb); abrir(hojaAlbaran(a)); return; }
  if ((b = q('[data-imp]'))) { const [id, pid] = b.dataset.imp.split('|'); const a = ALBARANES.find((x) => x.id === +id); a.sel = pid; $('#sheet-in').innerHTML = hojaAlbaran(a); return; }
  if ((b = q('[data-imputar]'))) {
    const a = ALBARANES.find((x) => x.id === +b.dataset.imputar); a.part = a.sel; a.nuevo = true;
    cerrar(); st.flash = null; st.flashP = a.part; pintar();
    const e2 = estado(P[a.part]);
    aviso(e2.pctM > 100 ? `Hormigón de 04.03 al ${fmt(e2.pctM, 0)} % del presupuesto` : 'Albarán imputado', e2.pctM > 100);
    return;
  }
  if (q('[data-enviar]')) { st.vista = 'enviado'; pintar(); scrollTo(0, 0); return; }
  if ((b = q('[data-go]'))) { st.vista = b.dataset.go; pintar(); scrollTo(0, 0); }
});
pintar();
