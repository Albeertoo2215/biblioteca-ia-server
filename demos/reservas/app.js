// alba fisioterapia (demo): tratamientos, días, horas y citas guardadas en localStorage.
const SERVICIOS = [
  { id: 'fisio', nombre: 'Fisioterapia', texto: 'Espalda, cuello, lesiones', min: 45, precio: 40, icono: 'i-espalda' },
  { id: 'osteo', nombre: 'Osteopatía', texto: 'Tratamiento global y suave', min: 60, precio: 55, icono: 'i-osteo' },
  { id: 'deportiva', nombre: 'Masaje deportivo', texto: 'Antes o después de competir', min: 30, precio: 30, icono: 'i-deporte' },
  { id: 'valoracion', nombre: 'Primera visita', texto: 'Valoración y plan a tu medida', min: 30, precio: 25, icono: 'i-valoracion' },
];
const HORAS = ['09:00', '09:45', '10:30', '11:15', '12:00', '12:45', '16:00', '16:45', '17:30', '18:15', '19:00'];
const KEY = 'demo-reservas-alba';

const $ = (s) => document.querySelector(s);
const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
const guardar = (c) => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* sin almacenamiento */ } };
// Fecha local (no UTC) en formato AAAA-MM-DD
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fecha = (s) => new Date(s + 'T12:00');
const fechaLarga = (s) => fecha(s).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
const horasDe = (dia) => (fecha(dia).getDay() === 6 ? HORAS.filter((h) => h < '14:00') : HORAS);
const escapar = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const servicio = (id) => SERVICIOS.find((s) => s.id === id);

// Huecos "ocupados" de ejemplo para que la agenda parezca real
function ocupadaDeEjemplo(dia, hora) {
  const n = [...(dia + hora)].reduce((a, c) => a + c.charCodeAt(0), 0);
  return n % 5 === 0;
}
const servicioDeEjemplo = (dia, hora) => SERVICIOS[[...(hora + dia)].reduce((a, c) => a + c.charCodeAt(0), 0) % SERVICIOS.length];

const estado = { servicio: null, dia: null, hora: null, diaAgenda: null, ultima: null };

function dias(n) {
  const out = []; const d = new Date();
  while (out.length < n) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0) out.push(new Date(d)); }
  return out;
}

// ---------- Reservar ----------
function pintarServicios() {
  $('#services').innerHTML = SERVICIOS.map((s) => `
    <li><button type="button" class="svc" data-id="${s.id}" aria-pressed="${estado.servicio === s.id}">
      <svg class="ico"><use href="#${s.icono}"/></svg>
      <span class="svc-txt"><strong>${s.nombre}</strong><small>${s.texto}</small></span>
      <span class="svc-meta">${s.min}′<b>${s.precio} €</b></span>
    </button></li>`).join('');
}
function pintarSemana(cont, sel, onPick) {
  cont.innerHTML = dias(14).map((d) => `<button type="button" class="d" data-dia="${iso(d)}" aria-pressed="${sel === iso(d)}" aria-label="${d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}"><small>${d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '')}</small><strong>${d.getDate()}</strong></button>`).join('');
  cont.onclick = (e) => { const b = e.target.closest('.d'); if (b) onPick(b.dataset.dia); };
}
function pintarHoras() {
  const cont = $('#slots');
  $('#month').textContent = fecha(estado.dia || iso(dias(1)[0])).toLocaleDateString('es-ES', { month: 'long' });
  if (!estado.dia) { cont.innerHTML = '<p class="note">Toca un día para ver las horas libres.</p>'; return; }
  const citas = leer();
  const grupo = (titulo, icono, horas) => horas.length ? `
    <div class="slot-group"><p class="slot-title"><svg class="ico"><use href="#${icono}"/></svg>${titulo}</p><div class="slot-row">
      ${horas.map((h) => {
        const ocupada = ocupadaDeEjemplo(estado.dia, h) || citas.some((c) => c.dia === estado.dia && c.hora === h);
        return `<button type="button" class="slot" data-hora="${h}" ${ocupada ? 'disabled aria-label="' + h + ', ocupada"' : ''} aria-pressed="${estado.hora === h}">${h}</button>`;
      }).join('')}
    </div></div>` : '';
  const horas = horasDe(estado.dia);
  cont.innerHTML = grupo('Mañana', 'i-manana', horas.filter((h) => h < '14:00')) + grupo('Tarde', 'i-tarde', horas.filter((h) => h >= '14:00'));
}
function pintarResumen() {
  const s = servicio(estado.servicio);
  const ok = s && estado.dia && estado.hora;
  let txt = 'Elige un tratamiento';
  if (s && !estado.dia) txt = `${s.nombre} · elige día`;
  if (s && estado.dia && !estado.hora) txt = `${s.nombre} · elige hora`;
  if (ok) txt = `${s.nombre} · ${fecha(estado.dia).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} · ${estado.hora}`;
  $('#summary').textContent = txt;
  $('#confirm').disabled = !ok;
  $('#bookbar').classList.toggle('ready', Boolean(ok));
}

// ---------- Mis citas ----------
function pintarMias() {
  const citas = leer().sort((a, b) => (a.dia + a.hora).localeCompare(b.dia + b.hora));
  $('#count').textContent = citas.length;
  $('#count').hidden = !citas.length;
  $('#mine').innerHTML = citas.length ? citas.map((c) => {
    const f = fecha(c.dia);
    return `<li class="stub">
      <div class="stub-date"><strong>${f.getDate()}</strong><small>${f.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}</small></div>
      <div class="stub-body"><strong>${escapar(c.servicio)}</strong><small>${f.toLocaleDateString('es-ES', { weekday: 'long' })} a las ${c.hora}</small>
        <div class="stub-actions"><button type="button" data-ics="${c.id}">Al calendario</button><button type="button" class="cancel" data-cancel="${c.id}">Cancelar</button></div></div>
    </li>`;
  }).join('') : '<li class="empty"><p>Aún no tienes citas.</p><button type="button" data-go="reservar">Pedir la primera</button></li>';
}

// ---------- Agenda de la clínica ----------
function pintarAgenda() {
  if (!estado.diaAgenda) estado.diaAgenda = iso(dias(1)[0]);
  pintarSemana($('#agenda-days'), estado.diaAgenda, (d) => { estado.diaAgenda = d; pintarAgenda(); });
  const citas = leer();
  $('#timeline').innerHTML = horasDe(estado.diaAgenda).map((h) => {
    const mia = citas.find((c) => c.dia === estado.diaAgenda && c.hora === h);
    if (mia) return `<li class="busy t-${mia.sid}"><time>${h}</time><div><strong>${escapar(mia.servicio)}</strong><small>${escapar(mia.nombre)} · ${escapar(mia.telefono)}</small></div></li>`;
    if (ocupadaDeEjemplo(estado.diaAgenda, h)) { const s = servicioDeEjemplo(estado.diaAgenda, h); return `<li class="busy t-${s.id}"><time>${h}</time><div><strong>${s.nombre}</strong><small>Paciente de ejemplo</small></div></li>`; }
    return `<li class="free"><time>${h}</time><div>Libre</div></li>`;
  }).join('');
}

// ---------- Calendario (.ics) ----------
function descargarICS(c) {
  const s = SERVICIOS.find((x) => x.nombre === c.servicio) || SERVICIOS[0];
  const ini = new Date(`${c.dia}T${c.hora}:00`);
  const fin = new Date(ini.getTime() + s.min * 60000);
  const f = (d) => `${iso(d).replace(/-/g, '')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//alba demo//ES', 'BEGIN:VEVENT', `UID:${c.id}@alba-demo`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(ini)}`, `DTEND:${f(fin)}`, `SUMMARY:${c.servicio} · alba fisioterapia (demo)`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'cita-alba.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ---------- Navegación ----------
function ir(vista) {
  document.querySelectorAll('.tabbar [data-view]').forEach((b) => (b.dataset.view === vista ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
  document.querySelectorAll('.view').forEach((v) => { v.hidden = v.id !== vista; });
  $('#bookbar').hidden = vista !== 'reservar';
  if (vista === 'mis-citas') pintarMias();
  if (vista === 'agenda') pintarAgenda();
  scrollTo({ top: 0 });
}

// ---------- Eventos ----------
$('#services').addEventListener('click', (e) => {
  const b = e.target.closest('.svc'); if (!b) return;
  estado.servicio = b.dataset.id; estado.hora = null;
  pintarServicios(); pintarHoras(); pintarResumen();
});
function elegirDia(d) { estado.dia = d; estado.hora = null; pintarSemana($('#days'), d, elegirDia); pintarHoras(); pintarResumen(); }
$('#slots').addEventListener('click', (e) => {
  const b = e.target.closest('.slot'); if (!b || b.disabled) return;
  estado.hora = b.dataset.hora; pintarHoras(); pintarResumen();
});
$('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!e.target.checkValidity()) { e.target.reportValidity(); return; }
  const f = new FormData(e.target);
  const s = servicio(estado.servicio);
  const cita = { id: Date.now(), sid: s.id, servicio: s.nombre, dia: estado.dia, hora: estado.hora, nombre: String(f.get('nombre')).trim(), telefono: String(f.get('telefono')).trim() };
  guardar([...leer(), cita]);
  estado.ultima = cita;
  $('#done-title').textContent = `Te esperamos, ${cita.nombre.split(' ')[0]}.`;
  $('#done-when').textContent = `${s.nombre} · ${fechaLarga(cita.dia)} a las ${cita.hora}`;
  $('#done').hidden = false;
  $('#done-ok').focus();
  estado.hora = null; e.target.reset();
  pintarHoras(); pintarResumen(); pintarMias();
});
$('#ics').addEventListener('click', () => { if (estado.ultima) descargarICS(estado.ultima); });
$('#done-ok').addEventListener('click', () => { $('#done').hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#done').hidden = true; });
$('#mine').addEventListener('click', (e) => {
  const c = e.target.closest('[data-cancel]'); const i = e.target.closest('[data-ics]'); const g = e.target.closest('[data-go]');
  if (c) { guardar(leer().filter((x) => String(x.id) !== c.dataset.cancel)); pintarMias(); }
  if (i) { const cita = leer().find((x) => String(x.id) === i.dataset.ics); if (cita) descargarICS(cita); }
  if (g) ir(g.dataset.go);
});
document.querySelector('.tabbar').addEventListener('click', (e) => { const t = e.target.closest('[data-view]'); if (t) ir(t.dataset.view); });

const h = new Date().getHours();
$('#hola').textContent = h < 14 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
pintarServicios(); pintarSemana($('#days'), null, elegirDia); pintarHoras(); pintarResumen(); pintarMias();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
