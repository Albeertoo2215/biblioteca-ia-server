// Quilla (demo): planificación de proyectos de arquitectura en diagrama de Gantt. Cambios en localStorage.
const KEY = 'demo-proyectos-quilla';
const SEMANAS = 30;   // semanas visibles
const ANTES = 8;      // semanas antes de la actual
const TIPOS = { ante: 'Anteproyecto', basico: 'Proyecto básico', licencia: 'Licencia de obras', ejecucion: 'Proyecto de ejecución', obra: 'Dirección de obra', entrega: 'Entrega de llaves' };
const EQUIPO = { MA: 'Marta Alonso', JL: 'Javier Lema', CR: 'Clara Rubio', DS: 'Diego Saiz' };
const BASE = [
  { id: 'Q-2026-014', n: 'Casa Ribera', tipo: 'Vivienda unifamiliar · 240 m²', cliente: 'Cliente particular', fases: [
    ['ante', 0, 4, 100, 'MA'], ['basico', 4, 5, 100, 'MA'], ['licencia', 9, 8, 55, 'JL'], ['ejecucion', 10, 6, 80, 'CR'], ['obra', 18, 11, 0, 'JL'], ['entrega', 29, 0, 0, 'MA']] },
  { id: 'Q-2026-009', n: 'Ático en la calle Real', tipo: 'Reforma integral · 120 m²', cliente: 'Comunidad de propietarios', fases: [
    ['ante', 0, 2, 100, 'CR'], ['ejecucion', 2, 4, 100, 'CR'], ['licencia', 5, 3, 100, 'JL'], ['obra', 8, 12, 45, 'DS'], ['entrega', 20, 0, 0, 'CR']] },
  { id: 'Q-2025-031', n: 'Nave logística Polígono Sur', tipo: 'Industrial · 2.400 m²', cliente: 'Empresa de transportes', fases: [
    ['obra', 0, 14, 72, 'DS'], ['entrega', 14, 0, 0, 'DS']] },
  { id: 'Q-2026-021', n: 'Escuela infantil Los Pinos', tipo: 'Equipamiento · 650 m²', cliente: 'Concurso municipal', fases: [
    ['ante', 6, 4, 70, 'MA'], ['basico', 10, 7, 0, 'MA'], ['ejecucion', 17, 8, 0, 'CR'], ['licencia', 17, 6, 0, 'JL']] },
  { id: 'Q-2026-018', n: 'Obrador para panadería', tipo: 'Local comercial · 90 m²', cliente: 'Negocio local', fases: [
    ['ante', 3, 2, 100, 'JL'], ['ejecucion', 5, 3, 90, 'JL'], ['licencia', 7, 4, 25, 'JL'], ['obra', 11, 5, 0, 'DS'], ['entrega', 16, 0, 0, 'JL']] },
];
const NOTAS = {
  ante: 'Programa de necesidades, implantación y primeras volumetrías con el cliente.',
  basico: 'Planos de distribución, alzados y memoria para solicitar licencia.',
  licencia: 'Expediente en el ayuntamiento. Pendiente de informe técnico.',
  ejecucion: 'Detalles constructivos, instalaciones y mediciones para pedir precios.',
  obra: 'Visitas semanales de obra, actas y certificaciones mensuales.',
  entrega: 'Final de obra, documentación y entrega al cliente.',
};

const $ = (s) => document.querySelector(s);
let cambios;
try { cambios = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cambios = {}; }
const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(cambios)); } catch (e) { /* sin almacenamiento */ } };
const proyectos = () => BASE.map((p) => ({ ...p, fases: p.fases.map(([t, ini, dur, prog, resp], i) => ({ i, t, ini, dur, prog, resp, ...(cambios[`${p.id}|${i}`] || {}) })) }));
const estado = { p: BASE[0].id, f: 2 };

function lunesInicial() { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7) - ANTES * 7); return d; }
const L0 = lunesInicial();
const fechaSemana = (w) => { const d = new Date(L0); d.setDate(L0.getDate() + w * 7); return d; };
const corta = (d) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');
const avance = (p) => { const fs = p.fases.filter((f) => f.dur > 0); const tot = fs.reduce((a, f) => a + f.dur, 0); return Math.round(fs.reduce((a, f) => a + f.dur * f.prog, 0) / (tot || 1)); };
const hoyCol = () => ANTES + ((new Date().getDay() + 6) % 7) / 7;

function pintarLista() {
  $('#projects').innerHTML = proyectos().map((p) => `<li><button type="button" data-p="${p.id}" aria-current="${p.id === estado.p}"><span class="pl-code">${p.id}</span><b>${p.n}</b><span class="pl-bar"><i data-w="${avance(p)}"></i></span><span class="pl-pct">${avance(p)} %</span></button></li>`).join('');
  document.querySelectorAll('.pl-bar i').forEach((i) => { i.style.width = i.dataset.w + '%'; });
}

function pintarGantt() {
  const p = proyectos().find((x) => x.id === estado.p);
  $('#p-code').textContent = p.id;
  $('#p-name').textContent = p.n;
  $('#p-meta').textContent = `${p.tipo} · ${p.cliente}`;
  const fin = p.fases.reduce((a, f) => Math.max(a, f.ini + f.dur), 0);
  const prox = p.fases.filter((f) => f.ini + f.dur >= ANTES && f.prog < 100).sort((a, b) => a.ini - b.ini)[0];
  $('#figures').innerHTML = `<div><dt>Avance</dt><dd>${avance(p)} %</dd></div><div><dt>Entrega prevista</dt><dd>${corta(fechaSemana(fin))}</dd></div><div><dt>Fase en curso</dt><dd class="sm">${prox ? TIPOS[prox.t] : '—'}</dd></div>`;

  // Cabecera de meses y semanas
  let meses = '', semanas = '';
  for (let w = 0; w < SEMANAS; w++) {
    const d = fechaSemana(w);
    if (d.getDate() <= 7) meses += `<span class="mo" data-c="${w + 2}">${d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}${d.getMonth() === 0 ? ' ' + String(d.getFullYear()).slice(2) : ''}</span>`;
    // Una de cada dos semanas lleva número para que no se amontonen
    semanas += `<span class="wk ${w === ANTES ? 'now' : ''}" data-c="${w + 2}">${w % 2 === 0 || w === ANTES ? d.getDate() : ''}</span>`;
  }
  const filas = p.fases.map((f, r) => {
    const sel = f.i === estado.f;
    const etiqueta = `<button type="button" class="row-l ${sel ? 'sel' : ''}" data-f="${f.i}" data-r="${r + 3}"><b>${TIPOS[f.t]}</b><span>${EQUIPO[f.resp]}</span></button>`;
    const barra = f.dur === 0
      ? `<button type="button" class="ms ${sel ? 'sel' : ''}" data-f="${f.i}" data-r="${r + 3}" data-c="${f.ini + 2}" aria-label="${TIPOS[f.t]}, ${corta(fechaSemana(f.ini))}"><i></i><span>${corta(fechaSemana(f.ini))}</span></button>`
      : `<button type="button" class="bar t-${f.t} ${sel ? 'sel' : ''} ${f.prog === 100 ? 'done' : ''}" data-f="${f.i}" data-r="${r + 3}" data-c="${f.ini + 2}" data-e="${f.ini + f.dur + 2}" data-prog="${f.prog}" aria-label="${TIPOS[f.t]}: ${f.prog} %"><i></i><span>${f.prog} %</span></button>`;
    return etiqueta + barra;
  }).join('');
  $('#gantt').innerHTML = `<div class="g">${meses}${semanas}<span class="corner" data-c="1"></span>${filas}<span class="today" aria-hidden="true"></span>${Array.from({ length: p.fases.length }, (_, r) => `<span class="lane" data-r="${r + 3}"></span>`).join('')}</div>`;
  colocar($('#gantt'), p.fases.length);
}

// Coloca cada pieza en la rejilla por CSSOM (compatible con la CSP)
function colocar(root, n) {
  root.querySelectorAll('.mo').forEach((el) => { el.style.gridColumn = el.dataset.c; el.style.gridRow = 1; });
  root.querySelectorAll('.wk').forEach((el) => { el.style.gridColumn = el.dataset.c; el.style.gridRow = 2; });
  root.querySelectorAll('.lane').forEach((el) => { el.style.gridRow = el.dataset.r; el.style.gridColumn = `1 / ${SEMANAS + 2}`; });
  root.querySelectorAll('.row-l').forEach((el) => { el.style.gridRow = el.dataset.r; el.style.gridColumn = 1; });
  root.querySelectorAll('.bar, .ms').forEach((el) => { el.style.gridRow = el.dataset.r; el.style.gridColumn = el.dataset.e ? `${el.dataset.c} / ${el.dataset.e}` : el.dataset.c; });
  root.querySelectorAll('.bar i').forEach((i) => { i.style.width = i.parentElement.dataset.prog + '%'; });
  const t = root.querySelector('.today');
  if (t) { t.style.gridColumn = `${ANTES + 2}`; t.style.gridRow = `2 / ${n + 3}`; t.style.marginLeft = `${(hoyCol() - ANTES) * 100}%`; }
}

function pintarInspector() {
  const p = proyectos().find((x) => x.id === estado.p);
  const f = p.fases.find((x) => x.i === estado.f) || p.fases[0];
  const desde = fechaSemana(f.ini), hasta = fechaSemana(f.ini + f.dur);
  hasta.setDate(hasta.getDate() - 3);
  $('#inspector').innerHTML = `
    <p class="ins-k">Fase seleccionada</p>
    <h2>${TIPOS[f.t]}</h2>
    <dl class="ins-dl">
      <div><dt>Fechas</dt><dd class="mono">${f.dur ? `${corta(desde)} → ${corta(hasta)}` : corta(desde)}</dd></div>
      <div><dt>Duración</dt><dd>${f.dur ? `${f.dur} ${f.dur === 1 ? 'semana' : 'semanas'}` : 'Hito'}</dd></div>
      <div><dt>Responsable</dt><dd><span class="av">${f.resp}</span>${EQUIPO[f.resp]}</dd></div>
    </dl>
    ${f.dur ? `<label class="ins-prog"><span>Avance <b id="prog-out">${f.prog} %</b></span><input type="range" id="prog" min="0" max="100" step="5" value="${f.prog}"></label>` : ''}
    <div class="ins-move"><span>Mover</span><button type="button" data-mv="-1">← 1 semana</button><button type="button" data-mv="1">1 semana →</button></div>
    <p class="ins-note">${NOTAS[f.t]}</p>
    ${f.dur && f.prog < 100 ? '<button type="button" class="ins-done" id="done">Marcar como terminada</button>' : ''}`;
}

function pintarCartera() {
  const ps = proyectos();
  $('#overview').innerHTML = `<div class="ov">${ps.map((p, r) => {
    const ini = Math.min(...p.fases.map((f) => f.ini)), fin = Math.max(...p.fases.map((f) => f.ini + f.dur));
    const obra = p.fases.find((f) => f.t === 'obra');
    return `<button type="button" class="ov-l ${p.id === estado.p ? 'sel' : ''}" data-p="${p.id}" data-r="${r + 1}">${p.n}</button>
      <span class="ov-bar" data-r="${r + 1}" data-c="${ini + 2}" data-e="${Math.max(fin, ini + 1) + 2}"></span>
      ${obra ? `<span class="ov-obra" data-r="${r + 1}" data-c="${obra.ini + 2}" data-e="${obra.ini + obra.dur + 2}"></span>` : ''}`;
  }).join('')}<span class="today" aria-hidden="true"></span></div>`;
  const root = $('#overview');
  root.querySelectorAll('.ov-l').forEach((el) => { el.style.gridRow = el.dataset.r; el.style.gridColumn = 1; });
  root.querySelectorAll('.ov-bar, .ov-obra').forEach((el) => { el.style.gridRow = el.dataset.r; el.style.gridColumn = `${el.dataset.c} / ${el.dataset.e}`; });
  const t = root.querySelector('.today');
  t.style.gridColumn = `${ANTES + 2}`; t.style.gridRow = `1 / ${ps.length + 1}`; t.style.marginLeft = `${(hoyCol() - ANTES) * 100}%`;
}

function pintarTodo() { pintarLista(); pintarGantt(); pintarInspector(); pintarCartera(); }
function cambiar(campos) { const k = `${estado.p}|${estado.f}`; cambios[k] = { ...(cambios[k] || {}), ...campos }; guardar(); }
function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2400); }

// ---------- Eventos ----------
document.addEventListener('click', (e) => {
  const pr = e.target.closest('[data-p]');
  if (pr) { estado.p = pr.dataset.p; estado.f = proyectos().find((x) => x.id === estado.p).fases.findIndex((f) => f.prog < 100 && f.dur > 0); if (estado.f < 0) estado.f = 0; pintarTodo(); return; }
  const fa = e.target.closest('[data-f]');
  if (fa) { estado.f = +fa.dataset.f; pintarGantt(); pintarInspector(); return; }
  const mv = e.target.closest('[data-mv]');
  if (mv) {
    const f = proyectos().find((x) => x.id === estado.p).fases[estado.f];
    cambiar({ ini: Math.min(Math.max(f.ini + +mv.dataset.mv, 0), SEMANAS - Math.max(f.dur, 1)) });
    pintarTodo(); return;
  }
  if (e.target.closest('#done')) { cambiar({ prog: 100 }); pintarTodo(); aviso('Fase terminada'); }
});
document.addEventListener('input', (e) => {
  if (e.target.id !== 'prog') return;
  $('#prog-out').textContent = e.target.value + ' %';
  cambiar({ prog: +e.target.value });
  pintarLista(); pintarGantt();
  const f = $('#figures dd'); if (f) f.textContent = avance(proyectos().find((x) => x.id === estado.p)) + ' %';
});

pintarTodo();
