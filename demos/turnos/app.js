// Marea (demo): cuadrante semanal de turnos con avisos de horas y descansos. Cambios en localStorage.
const KEY = 'demo-turnos-marea';
const TURNOS = { M: { n: 'Mañana', h: '07–15', ini: 7, fin: 15 }, T: { n: 'Tarde', h: '15–23', ini: 15, fin: 23 }, N: { n: 'Noche', h: '23–07', ini: 23, fin: 31 }, L: { n: 'Libre' }, V: { n: 'Vacaciones' } };
const CICLO = ['M', 'T', 'N', 'L', 'V'];
const DEPTS = {
  recepcion: { n: 'Recepción', cobertura: { M: 1, T: 1, N: 1 }, gente: [['Lucía Varela', 'Jefa de recepción'], ['Iker Domínguez', 'Recepcionista'], ['Nerea Campos', 'Recepcionista'], ['Óscar Lago', 'Recepcionista'], ['Sara Quintana', 'Auditor nocturno']] },
  pisos: { n: 'Pisos', cobertura: { M: 2, T: 1 }, gente: [['Rosa Prieto', 'Gobernanta'], ['Miriam Sanz', 'Camarera de pisos'], ['Ana Belén Ríos', 'Camarera de pisos'], ['Yolanda Paz', 'Camarera de pisos'], ['Carmen Vidal', 'Camarera de pisos'], ['Hugo Martín', 'Mozo de habitaciones']] },
  cocina: { n: 'Cocina', cobertura: { M: 1, T: 1 }, gente: [['Pablo Iglesias Rey', 'Jefe de cocina'], ['Laura Cid', 'Cocinera'], ['Andrés Mora', 'Cocinero'], ['Elena Fraga', 'Ayudante'], ['Rubén Seoane', 'Ayudante']] },
};
const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const $ = (s) => document.querySelector(s);
let datos;
try { datos = JSON.parse(localStorage.getItem(KEY)) || { cambios: {}, publicadas: {} }; } catch (e) { datos = { cambios: {}, publicadas: {} }; }
const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(datos)); } catch (e) { /* sin almacenamiento */ } };
const estado = { dept: 'recepcion', semana: 0 };

function lunes(offset) {
  const d = new Date(); d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + offset * 7);
  return d;
}
const claveSemana = (o) => { const l = lunes(o); return `${l.getFullYear()}-${l.getMonth() + 1}-${l.getDate()}`; };
function numSemana(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  return Math.ceil(((t - new Date(Date.UTC(t.getUTCFullYear(), 0, 1))) / 864e5 + 1) / 7);
}

// Plantilla base: cada persona libra 2 días escalonados y el resto se reparte para cubrir los mínimos,
// respetando el turno habitual de cada uno y evitando pasar de tarde a mañana (menos de 12 h de descanso).
const cacheBase = {};
function plantilla(dept, sem) {
  const k = dept + '|' + sem;
  if (cacheBase[k]) return cacheBase[k];
  const d = DEPTS[dept];
  const cob = Object.keys(d.cobertura);
  const m = d.gente.map((_, p) => DIAS.map((__, dia) => ([(p * 3 + sem) % 7, (p * 3 + sem + 1) % 7].includes(dia) ? 'L' : (dept === 'recepcion' && p === d.gente.length - 1 ? 'N' : cob[(p + sem) % Math.min(cob.length, 2)]))));
  for (let dia = 0; dia < 7; dia++) {
    for (const [t, req] of Object.entries(d.cobertura)) {
      let hay = m.filter((f) => f[dia] === t).length;
      while (hay < req) {
        const cuenta = (x) => m.filter((f) => f[dia] === x).length;
        const cand = m.findIndex((f) => f[dia] !== 'L' && f[dia] !== t && cuenta(f[dia]) > (d.cobertura[f[dia]] || 0) && !(t === 'M' && dia > 0 && ['T', 'N'].includes(f[dia - 1])));
        if (cand < 0) break;
        m[cand][dia] = t; hay++;
      }
    }
  }
  return (cacheBase[k] = m);
}
const base = (dept, p, dia, sem) => plantilla(dept, sem)[p][dia];
const turno = (dept, p, dia) => datos.cambios[`${claveSemana(estado.semana)}|${dept}|${p}|${dia}`] ?? base(dept, p, dia, numSemana(lunes(estado.semana)));

function analizar() {
  const d = DEPTS[estado.dept];
  const avisos = [];
  const filas = d.gente.map(([nombre], p) => {
    const t = DIAS.map((_, i) => turno(estado.dept, p, i));
    const horas = t.filter((x) => TURNOS[x].ini !== undefined).length * 8;
    const cortos = [];
    for (let i = 1; i < 7; i++) {
      const a = TURNOS[t[i - 1]], b = TURNOS[t[i]];
      if (a.fin !== undefined && b.ini !== undefined && b.ini + 24 - a.fin < 12) cortos.push(i);
    }
    if (horas > 40) avisos.push({ tipo: 'horas', txt: `${nombre} suma ${horas} h esta semana (máximo 40 h).` });
    cortos.forEach((i) => avisos.push({ tipo: 'descanso', txt: `${nombre}: menos de 12 h de descanso antes del ${DIAS[i].toLowerCase()}.` }));
    return { t, horas, cortos };
  });
  const cobertura = DIAS.map((_, i) => Object.entries(d.cobertura).map(([k, req]) => {
    const hay = filas.filter((f) => f.t[i] === k).length;
    if (hay < req) avisos.push({ tipo: 'cobertura', txt: `${DIAS[i]}: faltan ${req - hay} en el turno de ${TURNOS[k].n.toLowerCase()}.` });
    return { k, req, hay };
  }));
  return { filas, cobertura, avisos };
}

function pintar() {
  const d = DEPTS[estado.dept];
  const l = lunes(estado.semana);
  const dom = new Date(l); dom.setDate(l.getDate() + 6);
  const f = (x) => x.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '');
  $('#week-label').textContent = `Semana ${numSemana(l)}`;
  $('#week-range').textContent = `${f(l)} – ${f(dom)}`;
  const pub = datos.publicadas[claveSemana(estado.semana)];
  $('#status').innerHTML = pub ? `<span class="dot ok"></span>Publicado el ${new Date(pub).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}` : '<span class="dot"></span>Borrador';
  $('#depts').innerHTML = Object.entries(DEPTS).map(([id, x]) => `<button type="button" data-d="${id}" aria-pressed="${id === estado.dept}">${x.n}<span>${x.gente.length}</span></button>`).join('');

  const { filas, cobertura, avisos } = analizar();
  const hoy = new Date().toDateString();
  const fechas = DIAS.map((_, i) => { const x = new Date(l); x.setDate(l.getDate() + i); return x; });
  $('#rota').innerHTML = `
    <thead><tr><th class="who">Persona</th>${fechas.map((x, i) => `<th class="${x.toDateString() === hoy ? 'today' : ''} ${i > 4 ? 'we' : ''}"><span>${DIAS[i]}</span><b>${x.getDate()}</b></th>`).join('')}<th class="hrs">Horas</th></tr></thead>
    <tbody>${d.gente.map(([nombre, rol], p) => `
      <tr><th class="who"><span class="ini">${nombre.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><span><b>${nombre}</b><small>${rol}</small></span></th>
        ${filas[p].t.map((k, i) => `<td><button type="button" class="cell s-${k} ${filas[p].cortos.includes(i) ? 'short' : ''}" data-p="${p}" data-i="${i}" aria-label="${nombre}, ${DIAS[i]}: ${TURNOS[k].n}"><b>${k === 'L' || k === 'V' ? TURNOS[k].n : k}</b>${TURNOS[k].h ? `<small>${TURNOS[k].h}</small>` : ''}</button></td>`).join('')}
        <td class="hrs ${filas[p].horas > 40 ? 'over' : ''}"><b>${filas[p].horas}</b><small>/ 40</small></td></tr>`).join('')}
    </tbody>
    <tfoot><tr><th class="who">Cobertura</th>${cobertura.map((c) => `<td>${c.map((x) => `<span class="cov ${x.hay < x.req ? 'low' : ''}">${x.k} ${x.hay}/${x.req}</span>`).join('')}</td>`).join('')}<td></td></tr></tfoot>`;

  $('#issues').innerHTML = avisos.length
    ? `<h2><svg><use href="#i-warn"/></svg>${avisos.length} ${avisos.length === 1 ? 'aviso' : 'avisos'} antes de publicar</h2><ul>${avisos.map((a) => `<li class="${a.tipo}">${a.txt}</li>`).join('')}</ul>`
    : '<h2 class="clean">Sin avisos: el cuadrante cumple horas, descansos y cobertura.</h2>';
}

function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2800); }

$('#rota').addEventListener('click', (e) => {
  const c = e.target.closest('.cell'); if (!c) return;
  const p = +c.dataset.p, i = +c.dataset.i;
  const actual = turno(estado.dept, p, i);
  datos.cambios[`${claveSemana(estado.semana)}|${estado.dept}|${p}|${i}`] = CICLO[(CICLO.indexOf(actual) + 1) % CICLO.length];
  delete datos.publicadas[claveSemana(estado.semana)];
  guardar(); pintar();
});
$('#depts').addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) { estado.dept = b.dataset.d; pintar(); } });
$('#prev').addEventListener('click', () => { estado.semana--; pintar(); });
$('#next').addEventListener('click', () => { estado.semana++; pintar(); });
$('#publish').addEventListener('click', () => {
  datos.publicadas[claveSemana(estado.semana)] = Date.now();
  guardar(); pintar();
  const total = Object.values(DEPTS).reduce((a, x) => a + x.gente.length, 0);
  aviso(`Cuadrante publicado · ${total} personas avisadas`);
});

pintar();
