// Arce (demo): agenda por profesional, sala de espera y ficha clínica con consulta y cobro.
const AHORA = new Date(2026, 9, 13, 10, 40); // fecha fija de la demo
const INI = 9 * 60, FIN = 17 * 60, PX = 1.42;  // de 9:00 a 17:00, píxeles por minuto
const VETS = [
  { id: 'lp', n: 'Dra. Lucía Peral', rol: 'Medicina general' },
  { id: 'tg', n: 'Dr. Tomás Gil', rol: 'Cirugía y traumatología' },
  { id: 'na', n: 'Noa Arias', rol: 'Auxiliar · peluquería' },
];
const TIPOS = { consulta: 'Consulta', vacuna: 'Vacunación', cirugia: 'Cirugía', revision: 'Revisión', peluqueria: 'Peluquería', urgencia: 'Urgencia' };
const PETS = {
  toby: { n: 'Toby', esp: 'Perro', raza: 'Beagle', sexo: 'Macho', nac: [2019, 3], chip: '941000024···318', duena: 'Elena Vidal', tel: '6·· ··· 412', alerta: 'Alérgico a la penicilina',
    pesos: [[2024, 9, 12.1], [2025, 1, 12.6], [2025, 5, 13.4], [2025, 9, 13.1], [2026, 2, 13.6], [2026, 6, 14.2]],
    vac: [['Polivalente (DHPPi+L)', [2025, 9, 14], [2026, 9, 14]], ['Rabia', [2025, 9, 14], [2026, 9, 14]], ['Tos de las perreras', [2026, 2, 3], [2027, 2, 3]]],
    hist: [[[2026, 6, 2], 'Revisión', 'Otitis externa oído izquierdo. Limpieza y gotas 7 días.', 'LP'], [[2026, 2, 3], 'Vacunación', 'Tos de las perreras. Sin reacciones.', 'LP'], [[2025, 9, 14], 'Vacunación anual', 'Polivalente y rabia. Peso 13,1 kg.', 'TG'], [[2025, 5, 21], 'Consulta', 'Cojera leve pata trasera derecha. Reposo y antiinflamatorio.', 'TG']] },
  luna: { n: 'Luna', esp: 'Gata', raza: 'Europea común', sexo: 'Hembra esterilizada', nac: [2021, 7], chip: '941000031···077', duena: 'Marcos León', tel: '6·· ··· 089', pesos: [[2025, 4, 3.9], [2026, 1, 4.2], [2026, 7, 4.1]], vac: [['Trivalente felina', [2025, 10, 2], [2026, 10, 2]]], hist: [[[2026, 7, 9], 'Consulta', 'Vómitos ocasionales. Cambio de pienso.', 'LP']] },
  rocky: { n: 'Rocky', esp: 'Perro', raza: 'Pastor alemán', sexo: 'Macho', nac: [2017, 1], chip: '941000011···552', duena: 'Ana Ruiz', tel: '6·· ··· 230', pesos: [[2025, 3, 37], [2026, 3, 35.6]], vac: [['Rabia', [2025, 11, 1], [2026, 11, 1]]], hist: [] },
  kiwi: { n: 'Kiwi', esp: 'Conejo', raza: 'Belier', sexo: 'Hembra', nac: [2023, 5], chip: '—', duena: 'Sofía Pardo', tel: '6·· ··· 771', pesos: [[2026, 4, 1.9]], vac: [['Mixomatosis y VHD', [2026, 3, 20], [2027, 3, 20]]], hist: [] },
  mia: { n: 'Mía', esp: 'Gata', raza: 'Siamesa', sexo: 'Hembra', nac: [2020, 11], chip: '941000027···640', duena: 'Jorge Sanz', tel: '6·· ··· 315', pesos: [[2026, 5, 3.6]], vac: [], hist: [] },
  bruno: { n: 'Bruno', esp: 'Perro', raza: 'Bulldog francés', sexo: 'Macho', nac: [2022, 2], chip: '941000039···118', duena: 'Paula Gómez', tel: '6·· ··· 556', pesos: [[2026, 6, 12.8]], vac: [], hist: [] },
  nala: { n: 'Nala', esp: 'Perra', raza: 'Golden retriever', sexo: 'Hembra', nac: [2020, 6], chip: '941000020···903', duena: 'Iker Mora', tel: '6·· ··· 742', pesos: [[2026, 4, 29.5]], vac: [], hist: [] },
  coco: { n: 'Coco', esp: 'Hurón', raza: '—', sexo: 'Macho', nac: [2024, 1], chip: '941000044···021', duena: 'Lara Díez', tel: '6·· ··· 908', pesos: [[2026, 2, 1.2]], vac: [], hist: [] },
  simba: { n: 'Simba', esp: 'Gato', raza: 'Maine coon', sexo: 'Macho', nac: [2021, 2], chip: '941000030···455', duena: 'Raúl Ibáñez', tel: '6·· ··· 127', pesos: [[2026, 3, 7.4]], vac: [], hist: [] },
};
const CITAS = [
  ['lp', '09:00', 30, 'luna', 'consulta', 'Control de peso', 'hecha'],
  ['lp', '09:30', 20, 'kiwi', 'vacuna', 'Refuerzo VHD', 'hecha'],
  ['lp', '10:00', 30, 'mia', 'consulta', 'Picor y caída de pelo', 'hecha'],
  ['lp', '10:45', 30, 'toby', 'vacuna', 'Vacunación anual', 'sala'],
  ['lp', '11:30', 30, 'simba', 'revision', 'Revisión dental', 'pend'],
  ['lp', '12:15', 30, 'bruno', 'consulta', 'Ronquidos y fatiga', 'pend'],
  ['lp', '15:30', 30, 'luna', 'revision', 'Resultado analítica', 'pend'],
  ['tg', '09:00', 120, 'rocky', 'cirugia', 'Extirpación de nódulo cutáneo', 'hecha'],
  ['tg', '11:30', 30, 'nala', 'revision', 'Control post-operatorio', 'pend'],
  ['tg', '12:30', 45, 'coco', 'urgencia', 'No come desde ayer', 'pend'],
  ['tg', '15:00', 90, 'bruno', 'cirugia', 'Corrección de narinas', 'pend'],
  ['na', '09:30', 90, 'nala', 'peluqueria', 'Baño y deslanado', 'hecha'],
  ['na', '11:00', 60, 'simba', 'peluqueria', 'Corte higiénico', 'pend'],
  ['na', '13:00', 60, 'toby', 'peluqueria', 'Baño', 'pend'],
].map(([v, h, d, p, t, m, s], i) => ({ id: i, v, ini: +h.slice(0, 2) * 60 + +h.slice(3), dur: d, p, t, m, s }));
const LLEGADAS = { 3: 10 * 60 + 31 };
const CATALOGO = [
  ['Consulta general', 35], ['Vacuna polivalente', 38], ['Vacuna antirrábica', 30], ['Desparasitación interna', 12],
  ['Pipeta antiparasitaria', 18], ['Analítica sanguínea', 65], ['Amoxicilina-clavulánico 10 comp.', 14.5],
];

const $ = (s) => document.querySelector(s);
const eur = (n) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: 'always' }) + ' €';
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const ahoraMin = AHORA.getHours() * 60 + AHORA.getMinutes();
const fecha = ([y, m, d]) => new Date(y, m, d || 1);
const edad = ([y, m]) => { const meses = (AHORA.getFullYear() - y) * 12 + AHORA.getMonth() - m; return meses >= 24 ? `${Math.floor(meses / 12)} años` : `${meses} meses`; };
const estado = { cita: null, tab: 'consulta', lineas: [], factura: 1043 };

// ---------- Agenda ----------
function pintarAgenda() {
  const horas = []; for (let m = INI; m <= FIN; m += 60) horas.push(m);
  $('#ag').innerHTML = `
    <div class="ag-head"><div></div>${VETS.map((v) => `<div class="vh"><b>${v.n}</b><span>${v.rol}</span></div>`).join('')}</div>
    <div class="ag-grid" id="grid">
      <div class="ruler">${horas.map((m) => `<span data-top="${(m - INI) * PX}">${hhmm(m)}</span>`).join('')}</div>
      ${VETS.map((v) => `<div class="col" data-v="${v.id}">${horas.map((m) => `<i class="line" data-top="${(m - INI) * PX}"></i>`).join('')}${CITAS.filter((c) => c.v === v.id).map((c) => {
        const p = PETS[c.p];
        return `<button type="button" class="ap t-${c.t} s-${c.s}" data-c="${c.id}" data-top="${(c.ini - INI) * PX}" data-h="${c.dur * PX - 3}">
          <span class="ap-top"><b>${p.n}</b><em>${hhmm(c.ini)}</em></span><span class="ap-m">${c.m}</span>${c.dur >= 30 ? `<span class="ap-o">${p.raza !== '—' ? p.raza : p.esp} · ${p.duena}</span>` : ''}
          ${c.s === 'sala' ? '<i class="tag">En sala</i>' : c.s === 'cobrada' ? '<i class="tag ok">Cobrada</i>' : ''}</button>`;
      }).join('')}</div>`).join('')}
      <div class="now" data-top="${(ahoraMin - INI) * PX}"><span>${hhmm(ahoraMin)}</span></div>
    </div>`;
  document.querySelectorAll('#ag [data-top]').forEach((el) => { el.style.top = el.dataset.top + 'px'; if (el.dataset.h) el.style.height = el.dataset.h + 'px'; });
  $('#grid').style.height = (FIN - INI) * PX + 'px';

  const hoy = CITAS.length, hechas = CITAS.filter((c) => c.s === 'hecha' || c.s === 'cobrada').length;
  $('#sum').innerHTML = `<h2>Hoy</h2><dl><div><dt>Citas</dt><dd>${hoy}</dd></div><div><dt>Atendidas</dt><dd>${hechas}</dd></div><div><dt>Cirugías</dt><dd>${CITAS.filter((c) => c.t === 'cirugia').length}</dd></div></dl>`;
  const sala = CITAS.filter((c) => c.s === 'sala');
  const proximas = CITAS.filter((c) => c.s === 'pend' && c.ini >= ahoraMin).sort((a, b) => a.ini - b.ini).slice(0, 3);
  $('#wait').innerHTML = sala.map((c) => `<li class="w-in"><button type="button" data-c="${c.id}"><b>${PETS[c.p].n}</b><span>${PETS[c.p].raza} · con ${VETS.find((v) => v.id === c.v).n.split(' ').slice(0, 2).join(' ')}</span><em>Llegó ${hhmm(LLEGADAS[c.id])} · espera ${ahoraMin - LLEGADAS[c.id]} min</em></button></li>`).join('')
    + proximas.map((c) => `<li><button type="button" data-c="${c.id}"><b>${PETS[c.p].n}</b><span>${TIPOS[c.t]} · ${hhmm(c.ini)}</span><em>Aún no ha llegado</em></button></li>`).join('');
}

// ---------- Ficha clínica ----------
function pintarFicha() {
  const c = CITAS[estado.cita]; const p = PETS[c.p];
  const tab = $('#tab-ficha'); tab.hidden = false; tab.textContent = `${p.n} · ${p.duena}`;
  const tabs = [['consulta', c.s === 'cobrada' ? 'Consulta de hoy' : 'Consulta de hoy'], ['historial', 'Historial'], ['vacunas', 'Vacunas'], ['peso', 'Peso']];
  $('#ficha').innerHTML = `
    <div class="pt-head">
      <span class="pt-av">${p.n[0]}</span>
      <div class="pt-id"><h1>${p.n}</h1><p>${p.esp} · ${p.raza} · ${p.sexo} · ${edad(p.nac)}</p></div>
      <dl class="pt-facts"><div><dt>Peso</dt><dd>${String(p.pesos[p.pesos.length - 1][2]).replace('.', ',')} kg</dd></div><div><dt>Microchip</dt><dd class="mono">${p.chip}</dd></div><div><dt>Propietaria</dt><dd>${p.duena}<small>${p.tel}</small></dd></div></dl>
      ${p.alerta ? `<p class="alert"><svg><use href="#i-alert"/></svg>${p.alerta}</p>` : ''}
    </div>
    <nav class="sub" aria-label="Ficha">${tabs.map(([k, n]) => `<button type="button" data-tab="${k}" aria-current="${estado.tab === k}">${n}</button>`).join('')}</nav>
    <div class="tab-body">${{ consulta: consulta, historial: historial, vacunas: vacunas, peso: peso }[estado.tab](c, p)}</div>`;
  if (estado.tab === 'peso') dibujarPeso(p);
}
function consulta(c, p) {
  const base = estado.lineas.reduce((a, [, x]) => a + x, 0);
  const cerrada = c.s === 'cobrada';
  return `<div class="consult">
    <form class="notes" id="notes">
      <div class="row3">
        <label><span>Motivo</span><input value="${c.m}" ${cerrada ? 'disabled' : ''}></label>
        <label><span>Temperatura</span><div class="unit"><input id="temp" inputmode="decimal" value="${cerrada ? '38,6' : ''}" placeholder="38,5" ${cerrada ? 'disabled' : ''}><em>°C</em></div></label>
        <label><span>Peso hoy</span><div class="unit"><input id="peso" inputmode="decimal" value="${cerrada ? '14,4' : ''}" placeholder="${String(p.pesos[p.pesos.length - 1][2]).replace('.', ',')}" ${cerrada ? 'disabled' : ''}><em>kg</em></div></label>
      </div>
      <label><span>Exploración</span><textarea rows="3" id="explo" placeholder="Mucosas, auscultación, palpación…" ${cerrada ? 'disabled' : ''}>${cerrada ? 'Buen estado general. Mucosas rosadas. Auscultación normal.' : ''}</textarea></label>
      <label><span>Diagnóstico y tratamiento</span><textarea rows="3" id="diag" placeholder="Pauta, dosis, próxima revisión…" ${cerrada ? 'disabled' : ''}>${cerrada ? 'Apto para vacunación. Se administran polivalente y antirrábica.' : ''}</textarea></label>
    </form>
    <div class="bill">
      <h3>Conceptos</h3>
      ${cerrada ? '' : `<div class="cat">${CATALOGO.map(([n, x], i) => `<button type="button" data-add="${i}"><svg><use href="#i-plus"/></svg>${n}<em>${eur(x)}</em></button>`).join('')}</div>`}
      <table class="lines">${estado.lineas.length ? estado.lineas.map(([n, x], i) => `<tr><td>${n}</td><td>${eur(x)}</td><td>${cerrada ? '' : `<button type="button" class="rm" data-rm="${i}" aria-label="Quitar ${n}"><svg><use href="#i-x"/></svg></button>`}</td></tr>`).join('') : '<tr><td class="none" colspan="3">Añade los conceptos de la visita.</td></tr>'}</table>
      <dl class="tot"><div><dt>Base</dt><dd>${eur(base)}</dd></div><div><dt>IVA 21 %</dt><dd>${eur(base * 0.21)}</dd></div><div class="big"><dt>Total</dt><dd>${eur(base * 1.21)}</dd></div></dl>
      ${cerrada ? `<p class="paid"><svg><use href="#i-check"/></svg>Cobrada · factura F-2026-${estado.factura - 1}</p>` : `<button type="button" class="btn" id="fin" ${estado.lineas.length ? '' : 'disabled'}>Finalizar y cobrar</button>`}
    </div></div>`;
}
const historial = (c, p) => `<ol class="tl">${p.hist.length ? p.hist.map(([f, t, txt, v]) => `<li><time>${fecha(f).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</time><div><b>${t}</b><p>${txt}</p><span>${v === 'LP' ? 'Dra. Lucía Peral' : 'Dr. Tomás Gil'}</span></div></li>`).join('') : '<li class="none">Sin visitas anteriores.</li>'}</ol>`;
const vacunas = (c, p) => `<table class="vac"><thead><tr><th>Vacuna</th><th>Última dosis</th><th>Próxima</th><th></th></tr></thead><tbody>${p.vac.map(([n, u, s]) => { const vence = fecha(s); const dias = Math.round((vence - AHORA) / 864e5); return `<tr><td>${n}</td><td>${fecha(u).toLocaleDateString('es-ES')}</td><td>${vence.toLocaleDateString('es-ES')}</td><td>${dias < 0 ? `<span class="due late">Vencida hace ${-dias} días</span>` : dias < 30 ? `<span class="due soon">En ${dias} días</span>` : '<span class="due">Al día</span>'}</td></tr>`; }).join('') || '<tr><td colspan="4" class="none">Sin vacunas registradas.</td></tr>'}</tbody></table>`;
const peso = () => '<svg class="chart" id="chart" viewBox="0 0 640 220" role="img" aria-label="Evolución del peso"></svg>';
function dibujarPeso(p) {
  const pts = p.pesos.map(([y, m, kg]) => ({ t: new Date(y, m).getTime(), kg }));
  const t0 = pts[0].t, t1 = Math.max(pts[pts.length - 1].t, t0 + 1);
  const lo = Math.floor(Math.min(...pts.map((x) => x.kg)) - 1), hi = Math.ceil(Math.max(...pts.map((x) => x.kg)) + 1);
  const X = (t) => 50 + ((t - t0) / (t1 - t0)) * 560, Y = (kg) => 190 - ((kg - lo) / (hi - lo)) * 160;
  let g = '';
  for (let k = lo; k <= hi; k++) g += `<line x1="50" x2="610" y1="${Y(k)}" y2="${Y(k)}" class="gl"/><text x="40" y="${Y(k) + 4}" class="gt" text-anchor="end">${k}</text>`;
  g += `<polyline class="pl" points="${pts.map((x) => `${X(x.t)},${Y(x.kg)}`).join(' ')}"/>`;
  g += pts.map((x) => `<circle cx="${X(x.t)}" cy="${Y(x.kg)}" r="4" class="pd"/><text x="${X(x.t)}" y="212" class="gt" text-anchor="middle">${new Date(x.t).toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })}</text>`).join('');
  $('#chart').innerHTML = g;
}

function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2800); }
function ir(v) {
  document.querySelectorAll('.tabs [data-view]').forEach((b) => (b.dataset.view === v ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  document.querySelectorAll('.view').forEach((s) => { s.hidden = s.id !== v; });
  if (v === 'agenda') pintarAgenda(); else pintarFicha();
}

// ---------- Eventos ----------
document.addEventListener('click', (e) => {
  const cita = e.target.closest('[data-c]');
  if (cita) { const id = +cita.dataset.c; if (estado.cita !== id) { estado.cita = id; estado.lineas = CITAS[id].s === 'cobrada' ? estado.lineas : []; } estado.tab = 'consulta'; ir('ficha'); return; }
  const v = e.target.closest('.tabs [data-view]'); if (v) { ir(v.dataset.view); return; }
  const t = e.target.closest('[data-tab]'); if (t) { estado.tab = t.dataset.tab; pintarFicha(); return; }
  const add = e.target.closest('[data-add]'); if (add) { estado.lineas.push(CATALOGO[+add.dataset.add]); pintarFicha(); return; }
  const rm = e.target.closest('[data-rm]'); if (rm) { estado.lineas.splice(+rm.dataset.rm, 1); pintarFicha(); return; }
  if (e.target.closest('#fin')) { const base = estado.lineas.reduce((a, [, x]) => a + x, 0); $('#m-total').textContent = eur(base * 1.21); $('#cobro').hidden = false; return; }
  if (e.target.closest('[data-close-modal]')) { $('#cobro').hidden = true; return; }
  if (e.target.closest('#cobrar')) {
    const c = CITAS[estado.cita]; const base = estado.lineas.reduce((a, [, x]) => a + x, 0);
    const forma = document.querySelector('[name=pago]:checked').value;
    c.s = 'cobrada'; $('#cobro').hidden = true; estado.factura++;
    pintarFicha();
    aviso(`Cobrado ${eur(base * 1.21)} con ${forma.toLowerCase()} · factura F-2026-${estado.factura - 1} enviada a ${PETS[c.p].duena}`);
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#cobro').hidden = true; });

$('#hora').textContent = hhmm(ahoraMin);
$('#fecha').textContent = AHORA.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
pintarAgenda();
