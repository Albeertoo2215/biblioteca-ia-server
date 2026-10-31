// Eje (demo): app del paciente de una clínica de fisioterapia. Pauta del día, ejercicio guiado con tempo,
// registro de dolor (escala EVA 0–10) y evolución que ve su fisioterapeuta.
const $ = (s) => document.querySelector(s);
const PACIENTE = { n: 'Carmen', lesion: 'Rodilla derecha · reconstrucción de LCA', semana: 6, de: 12, fase: 'Fase 2 · fuerza y control' };
const SEMANA = [['L', 'ok'], ['M', 'hoy'], ['X', ''], ['J', 'rev'], ['V', ''], ['S', ''], ['D', 'desc']];
const EJ = [
  { id: 'bici', n: 'Bicicleta estática', pres: '10 min · resistencia baja', fig: 'bici', est: 'hecho', dolor: 1 },
  { id: 'ext', n: 'Extensión de rodilla sentada', pres: '3 × 12 · tobillera de 1 kg', fig: 'ext', est: 'curso', series: 3, reps: 12, serie: 3, rep: 10 },
  { id: 'pared', n: 'Sentadilla en la pared', pres: '3 × 8 · baja hasta 60°', fig: 'pared', est: 'pend' },
  { id: 'puente', n: 'Puente de glúteo a una pierna', pres: '3 × 10 por lado', fig: 'puente', est: 'pend' },
];
// Evolución semanal: dolor medio (EVA) y flexión de rodilla en grados
const EVOL = [
  { s: 1, dolor: 6.8, flex: 78 }, { s: 2, dolor: 5.9, flex: 88 }, { s: 3, dolor: 4.7, flex: 97 },
  { s: 4, dolor: 3.9, flex: 106 }, { s: 5, dolor: 3.1, flex: 112 }, { s: 6, dolor: 2.4, flex: 118 },
];
const TEMPO = [['Sube', 0.9], ['Mantén', 0.9], ['Baja', 0.9]]; // segundos por fase (ritmo de la demo)
// Vídeo de demostración de cada ejercicio: lo sube la clínica; si no hay, se muestra la ilustración
EJ.forEach((e) => { e.video = null; });
const st = { vista: location.hash === '#clinica' ? 'clinica' : 'hoy', ej: 'ext', corre: false, t0: 0, fase: 0, eva: null, raf: 0 };

// ---------- Ilustraciones (trazo propio) ----------
function figura(tipo, ang = 0) {
  const P = 'stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  if (tipo === 'ext') {
    const k = [148, 112], L = 52, r = (ang * Math.PI) / 180;
    const a = [k[0] + L * Math.sin(r), k[1] + L * Math.cos(r)];
    const pie = [a[0] + 14 * Math.cos(r), a[1] - 14 * Math.sin(r)];
    return `<g class="silla"><path d="M64 118h66M70 118v56M126 118v56M64 118V52" stroke-width="4"/></g>
      <path class="arco" d="M${k[0]} ${k[1] + 64}A64 64 0 0 0 ${k[0] + 64} ${k[1]}" />
      <g ${P}><path d="M92 112 L86 62"/><path d="M86 66 L106 92 L118 108"/><path d="M92 112 L${k[0]} ${k[1]}"/>
      <path class="tibia" d="M${k[0]} ${k[1]} L${a[0].toFixed(1)} ${a[1].toFixed(1)} L${pie[0].toFixed(1)} ${pie[1].toFixed(1)}"/></g>
      <circle cx="84" cy="44" r="12" fill="currentColor"/>
      <rect class="peso" x="${(a[0] - 8).toFixed(1)}" y="${(a[1] - 8).toFixed(1)}" width="16" height="16" rx="4" transform="rotate(${(-ang).toFixed(1)} ${a[0].toFixed(1)} ${a[1].toFixed(1)})"/>
      <path d="M30 176h200" class="suelo"/>`;
  }
  if (tipo === 'bici') return `<g ${P}><circle cx="34" cy="64" r="16"/><circle cx="96" cy="64" r="16"/><path d="M34 64 56 40h28l12 24M56 40l8 24h-30M84 40l-4-10h-8"/></g><circle cx="64" cy="18" r="8" fill="currentColor"/><path ${P} d="M64 26l-6 14 10 14"/>`;
  if (tipo === 'pared') return `<g ${P}><path d="M100 6v84"/><path d="M90 26 88 56 58 58 58 86"/><path d="M90 30 72 44"/></g><circle cx="90" cy="14" r="8" fill="currentColor"/><path d="M20 88h90" ${P} stroke-width="3"/>`;
  return `<g ${P}><path d="M6 84h118" stroke-width="3"/><path d="M26 78 64 56 88 48 98 78"/><path d="M64 56 116 34"/><path d="M30 78 48 70"/></g><circle cx="16" cy="74" r="8" fill="currentColor"/>`;
}

// Portada de un ejercicio con vídeo: el primer fotograma, con un icono de reproducir encima
const portada = (e) => `<video src="${e.video}#t=0.1" muted playsinline preload="metadata" aria-hidden="true"></video><i class="play-ico" aria-hidden="true"><svg><use href="#i-play"/></svg></i>`;

// ---------- Hoy ----------
function hoy() {
  const hechos = EJ.filter((e) => e.est === 'hecho').length;
  return `
  <header class="top">
    <svg class="logo"><use href="#logo"/></svg>
    <div class="who"><span>Martes, 14 de octubre</span><b>Hola, ${PACIENTE.n}</b></div>
    <span class="av">CR</span>
  </header>
  <section class="plan">
    <p class="k">${PACIENTE.lesion}</p>
    <h1>Semana ${PACIENTE.semana} <span>de ${PACIENTE.de}</span></h1>
    <div class="track"><i data-w="${(PACIENTE.semana / PACIENTE.de) * 100}"></i></div>
    <p class="fase">${PACIENTE.fase}</p>
    <ol class="semana">${SEMANA.map(([d, e]) => `<li class="${e}"><span>${d}</span><i>${e === 'ok' ? '<svg><use href="#i-check"/></svg>' : ''}</i></li>`).join('')}</ol>
  </section>
  <section class="sesion">
    <div class="h"><h2>Sesión de hoy</h2><span>${hechos} de ${EJ.length} · 25 min</span></div>
    <ul class="ejs">${EJ.map((e) => `
      <li class="${e.est}"><button type="button" data-ej="${e.id}">
        <span class="fig">${e.video ? portada(e) : `<svg viewBox="0 0 ${e.fig === 'ext' ? '240 190' : '130 92'}">${figura(e.fig, 70)}</svg>`}</span>
        <span class="tx"><b>${e.n}</b><small>${e.pres}</small>
          <em>${e.est === 'hecho' ? `<svg><use href="#i-check"/></svg>Hecho · dolor ${e.dolor}/10` : e.est === 'curso' ? `En curso · serie ${e.serie} de ${e.series}` : 'Pendiente'}</em></span>
        <svg class="chev"><use href="#i-chev"/></svg>
      </button></li>`).join('')}</ul>
  </section>
  <section class="cita">
    <svg><use href="#i-cal"/></svg>
    <div><b>Jueves 16, 16:30 · revisión</b><span>Marta Ibarra · Clínica Eje, sala 2</span></div>
  </section>
  <p class="demo">Demo de Folzia · clínica y paciente ficticios. No sustituye el criterio de tu fisioterapeuta. <button type="button" class="lnk" data-go="clinica">Ver el panel de la clínica</button></p>`;
}

// ---------- Ejercicio guiado ----------
function ejercicio() {
  const e = EJ.find((x) => x.id === st.ej);
  return `
  <header class="top bar">
    <button type="button" class="back" data-go="hoy" aria-label="Volver"><svg><use href="#i-back"/></svg></button>
    <div class="who"><span>Ejercicio 2 de 4</span><b>${e.n}</b></div>
  </header>
  <section class="escena">
    ${e.video ? `<video id="vid-ej" class="vid-ej" src="${e.video}" muted loop playsinline preload="auto" aria-label="Vídeo del ejercicio grabado por la clínica"></video><span class="por">Vídeo de tu clínica</span>` : `<svg viewBox="0 0 240 190" id="fig" class="fig-xl" aria-label="Ilustración del ejercicio">${figura('ext', 0)}</svg>
    <span class="grados"><b id="grados">0°</b> flexión</span>`}
    <span class="carga">Tobillera 1 kg</span>
  </section>
  <div class="tempo" aria-label="Ritmo">${TEMPO.map(([n, s], i) => `<div data-f="${i}"><span>${n}</span><small>${s.toFixed(1).replace('.', ',')} s</small><i></i></div>`).join('')}</div>
  <section class="cuenta">
    <div class="reps"><b id="rep">${e.rep}</b><span>/ ${e.reps}<br>repeticiones</span></div>
    <ol class="series">${Array.from({ length: e.series }, (_, i) => `<li class="${i + 1 < e.serie ? 'ok' : i + 1 === e.serie ? 'on' : ''}">Serie ${i + 1}</li>`).join('')}</ol>
  </section>
  <button type="button" class="main" data-play><svg><use href="#i-${st.corre ? 'pause' : 'play'}"/></svg>${st.corre ? 'Pausar' : 'Seguir con la serie 3'}</button>
  <section class="tecnica" id="tecnica">${tecnica()}</section>
  <details class="como"><summary><svg><use href="#i-info"/></svg>Cómo hacerlo</summary>
    <ol><li>Sentada al fondo de la silla, espalda apoyada.</li><li>Estira la rodilla del todo y aprieta el muslo arriba.</li><li>Baja despacio, sin dejar caer la pierna.</li></ol>
  </details>
  <p class="aviso"><svg><use href="#i-alert"/></svg>Si notas dolor punzante o la rodilla se hincha, para y escribe a Marta.</p>`;
}
// Vídeo del paciente haciendo el ejercicio, para que la fisioterapeuta corrija la técnica
function tecnica() {
  const v = st.subida;
  if (!v) return `<label class="subir"><input type="file" accept="video/*" id="vid-in" class="sr"><span class="ic"><svg><use href="#i-video"/></svg></span><span><b>Sube un vídeo tuyo</b><small>Grábate haciendo una serie y Marta te corrige la técnica.</small></span><svg class="up"><use href="#i-up"/></svg></label>`;
  return `<div class="clip ${v.pct >= 100 ? 'ok' : ''}">
    <span class="mini"><svg><use href="#i-play"/></svg><em>${v.dur}</em></span>
    <div><b>${v.pct >= 100 ? 'Enviado a Marta' : 'Subiendo tu vídeo…'}</b><small>${v.pct >= 100 ? 'Suele responder en menos de 24 h' : `${v.n} · ${v.mb} MB`}</small>
    <span class="prog"><i id="vid-pct" data-w="${v.pct}"></i></span></div>
  </div>
  <p class="priv"><svg><use href="#i-lock"/></svg>Solo lo ve tu fisioterapeuta. Se borra a los 30 días.</p>`;
}
function subir(f) {
  const dur = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  st.subida = { n: f.name.length > 22 ? f.name.slice(0, 19) + '…' : f.name, mb: (f.size / 1048576).toFixed(1).replace('.', ','), pct: 0, dur: '0:24' };
  const v = document.createElement('video'); v.preload = 'metadata'; v.muted = true;
  v.onloadedmetadata = () => { if (isFinite(v.duration)) { st.subida.dur = dur(v.duration); const em = document.querySelector('.mini em'); if (em) em.textContent = st.subida.dur; } URL.revokeObjectURL(v.src); };
  v.src = URL.createObjectURL(f);
  const pinta = () => { const el = $('#tecnica'); if (el) { el.innerHTML = tecnica(); const i = $('#vid-pct'); if (i) i.style.width = st.subida.pct + '%'; } };
  pinta();
  const paso = () => { st.subida.pct = Math.min(100, st.subida.pct + 7 + Math.random() * 9); pinta(); if (st.subida.pct < 100) setTimeout(paso, 120); else aviso('Vídeo enviado a Marta'); };
  setTimeout(paso, 150);
}
document.addEventListener('change', (e) => {
  if (e.target.id === 'vid-in' && e.target.files[0]) subir(e.target.files[0]);
  if (e.target.dataset.cl && e.target.files[0]) subirClinica(e.target.dataset.cl, e.target.files[0]);
});

// Anima la pierna siguiendo el ritmo: sube (90°→0°), mantén, baja (0°→90°)
function bucle(t) {
  const e = EJ.find((x) => x.id === st.ej);
  if (!st.corre || st.vista !== 'ejercicio') { st.raf = 0; return; }
  st.raf = requestAnimationFrame(bucle);
  if (!st.t0) st.t0 = t;
  const dur = TEMPO.reduce((a, [, s]) => a + s, 0) * 1000;
  const el = t - st.t0, ciclo = Math.floor(el / dur), u = (el % dur) / 1000;
  if (ciclo >= 1) { st.t0 = t; e.rep++; $('#rep').textContent = e.rep; if (e.rep >= e.reps) { terminarSerie(); return; } }
  let fase = 0, x = u;
  while (fase < 2 && x > TEMPO[fase][1]) { x -= TEMPO[fase][1]; fase++; }
  const k = Math.min(x / TEMPO[fase][1], 1), suave = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  const ang = fase === 0 ? 90 * suave : fase === 1 ? 90 : 90 * (1 - suave);
  if ($('#fig')) { $('#fig').innerHTML = figura('ext', ang); $('#grados').textContent = Math.round(90 - ang) + '°'; }
  document.querySelectorAll('.tempo > div').forEach((d, i) => { d.classList.toggle('on', i === fase); d.querySelector('i').style.width = (i < fase ? 100 : i === fase ? k * 100 : 0) + '%'; });
}
function terminarSerie() {
  const e = EJ.find((x) => x.id === st.ej);
  st.corre = false; e.est = 'hecho';
  if ($('#fig')) { $('#fig').innerHTML = figura('ext', 0); $('#grados').textContent = '90°'; }
  if ($('#vid-ej')) $('#vid-ej').pause();
  abrir(`
    <div class="grip"></div>
    <p class="k">Serie 3 completada · 36 repeticiones hoy</p>
    <h2>¿Cuánto dolor has notado?</h2>
    <div class="eva">${Array.from({ length: 11 }, (_, i) => `<button type="button" data-eva="${i}" class="e${i}" aria-pressed="false">${i}</button>`).join('')}</div>
    <div class="eva-l"><span>Nada</span><span>Moderado</span><span>Insoportable</span></div>
    <p class="nota" id="eva-txt">Toca un número. Marta verá tu respuesta antes de la revisión.</p>
    <button type="button" class="main" data-guardar disabled>Guardar ejercicio</button>`);
}

// ---------- Evolución ----------
function grafica(clave, max, min, color, meta, suf) {
  const W = 320, H = 130, px = (i) => 24 + (i * (W - 48)) / (EVOL.length - 1), py = (v) => 12 + ((max - v) * (H - 34)) / (max - min);
  const pts = EVOL.map((d, i) => [px(i), py(d[clave])]);
  let s = [0, 0.5, 1].map((f) => { const v = min + (max - min) * f; return `<path d="M24 ${py(v)}H${W - 10}" class="g"/><text x="0" y="${py(v) + 4}" class="ax">${Math.round(v)}</text>`; }).join('');
  if (meta) s += `<path d="M24 ${py(meta)}H${W - 10}" class="meta"/><text x="${W - 10}" y="${py(meta) - 6}" class="ax" text-anchor="end">objetivo ${meta}${suf}</text>`;
  s += `<path d="M${pts.map((p) => p.join(' ')).join(' L')} L${pts[pts.length - 1][0]} ${H - 22} L24 ${H - 22}Z" fill="${color}" fill-opacity=".09"/>`;
  s += `<path d="M${pts.map((p) => p.join(' ')).join(' L')}" stroke="${color}" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`;
  s += pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === pts.length - 1 ? 5 : 3.2}" fill="${i === pts.length - 1 ? color : '#fff'}" stroke="${color}" stroke-width="2"/>`).join('');
  s += EVOL.map((d, i) => `<text x="${px(i)}" y="${H - 4}" class="ax" text-anchor="middle">S${d.s}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="graf">${s}</svg>`;
}
function progreso() {
  const u = EVOL[EVOL.length - 1], p = EVOL[0];
  return `
  <header class="top"><svg class="logo"><use href="#logo"/></svg><div class="who"><span>${PACIENTE.lesion}</span><b>Tu evolución</b></div></header>
  <section class="met">
    <div class="h"><h2>Dolor medio</h2><span class="delta ok">${p.dolor.toFixed(1).replace('.', ',')} → ${u.dolor.toFixed(1).replace('.', ',')}</span></div>
    <p class="sub">Escala 0–10, media de lo que anotas tras cada ejercicio.</p>
    ${grafica('dolor', 8, 0, '#d9653b', 0, '')}
  </section>
  <section class="met">
    <div class="h"><h2>Flexión de rodilla</h2><span class="delta ok">+${u.flex - p.flex}°</span></div>
    <p class="sub">Medida por Marta en cada revisión.</p>
    ${grafica('flex', 140, 60, '#24453c', 130, '°')}
  </section>
  <section class="adh"><div><b>26<small>/30</small></b><span>sesiones hechas</span></div><div><b>87 %</b><span>adherencia</span></div><div><b>12</b><span>días seguidos</span></div></section>
  <section class="msg">
    <span class="av sm">MI</span>
    <div><b>Marta Ibarra <small>· fisioterapeuta</small></b><p>Muy buen avance, Carmen. Ya pasas de 115°: el jueves probamos la sentadilla con carga y empezamos a trotar en cinta.</p><time>Ayer, 19:12</time></div>
  </section>`;
}

// ---------- Panel de la clínica: vídeos de cada ejercicio ----------
function clinica() {
  return `
  <header class="top"><svg class="logo"><use href="#logo"/></svg><div class="who"><span>Clínica Eje · Marta Ibarra</span><b>Vídeos de ejercicios</b></div></header>
  <p class="cl-intro">Graba cada ejercicio con el móvil y súbelo aquí. Tus pacientes lo verán en su pauta en lugar de la ilustración.</p>
  <ul class="cl-lista">${EJ.map((e) => `
    <li class="${e.video ? 'con' : ''}">
      <span class="cl-mini">${e.video ? portada(e) : `<svg viewBox="0 0 ${e.fig === 'ext' ? '240 190' : '130 92'}">${figura(e.fig, 70)}</svg>`}</span>
      <span class="cl-tx"><b>${e.n}</b><small>${e.video ? 'Con vídeo de la clínica' : 'Sin vídeo, se muestra la ilustración'}</small><span class="prog" id="cl-p-${e.id}" hidden><i></i></span></span>
      <span class="cl-acc">
        <label class="cl-btn"><input type="file" accept="video/*" class="sr" data-cl="${e.id}"><svg><use href="#i-up"/></svg>${e.video ? 'Cambiar' : 'Subir vídeo'}</label>
        ${e.video ? `<button type="button" class="cl-quitar" data-quitar="${e.id}">Quitar</button>` : ''}
      </span>
    </li>`).join('')}</ul>
  <p class="priv"><svg><use href="#i-lock"/></svg>Si sale una persona en el vídeo, necesitas su consentimiento por escrito.</p>
  <button type="button" class="main" data-go="hoy">Ver la pauta como paciente</button>
  <p class="demo">Demo de Folzia · clínica y paciente ficticios.</p>`;
}
function subirClinica(id, f) {
  const e = EJ.find((x) => x.id === id), barra = $('#cl-p-' + id);
  if (barra) barra.hidden = false;
  let pct = 0;
  const paso = () => {
    pct = Math.min(100, pct + 9 + Math.random() * 12);
    if (barra) barra.querySelector('i').style.width = pct + '%';
    if (pct < 100) { setTimeout(paso, 110); return; }
    if (e.video && e.video.startsWith('blob:')) URL.revokeObjectURL(e.video);
    e.video = URL.createObjectURL(f);
    pintar(); aviso('Vídeo publicado. Tus pacientes ya lo ven en su pauta');
  };
  setTimeout(paso, 120);
}

function tabbar() {
  return `<nav class="tabbar">${[['hoy', 'i-home', 'Hoy'], ['progreso', 'i-chart', 'Evolución'], ['msg', 'i-chat', 'Mensajes'], ['citas', 'i-cal', 'Citas']].map(([k, i, n]) => `<button type="button" data-tab="${k}" ${st.vista === k ? 'aria-current="page"' : ''}><svg><use href="#${i}"/></svg>${n}${k === 'msg' ? '<i>1</i>' : ''}</button>`).join('')}</nav>`;
}
function pintar() {
  $('#app').innerHTML = (st.vista === 'hoy' ? hoy() : st.vista === 'ejercicio' ? ejercicio() : st.vista === 'clinica' ? clinica() : progreso()) + (st.vista === 'ejercicio' || st.vista === 'clinica' ? '' : tabbar());
  document.querySelectorAll('[data-w]').forEach((i) => { i.style.width = i.dataset.w + '%'; });
  document.body.dataset.vista = st.vista;
}
function abrir(html) { $('#sheet-in').innerHTML = html; $('#sheet').hidden = false; requestAnimationFrame(() => $('#sheet').classList.add('on')); }
function cerrar() { $('#sheet').classList.remove('on'); setTimeout(() => { $('#sheet').hidden = true; }, 240); }
function aviso(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(aviso.t); aviso.t = setTimeout(() => el.classList.remove('on'), 2600); }
const EVA_TXT = ['Sin dolor.', 'Muy leve, apenas lo notas.', 'Leve. Normal en esta fase.', 'Leve. Normal en esta fase.', 'Moderado. Coméntalo en la revisión.', 'Moderado. Coméntalo en la revisión.', 'Alto. Baja la carga la próxima vez.', 'Alto. Marta recibirá un aviso.', 'Muy alto. Marta recibirá un aviso.', 'Muy alto. Marta recibirá un aviso.', 'Insoportable. Para y llama a la clínica.'];

document.addEventListener('click', (e) => {
  const q = (s) => e.target.closest(s); let b;
  if ((b = q('[data-ej]'))) { if (b.dataset.ej === 'ext') { st.vista = 'ejercicio'; pintar(); scrollTo(0, 0); } else aviso('En la demo solo se abre la extensión de rodilla'); return; }
  if ((b = q('[data-go]'))) { st.corre = false; st.vista = b.dataset.go; pintar(); scrollTo(0, 0); return; }
  if ((b = q('[data-tab]'))) { if (['hoy', 'progreso'].includes(b.dataset.tab)) { st.vista = b.dataset.tab; pintar(); scrollTo(0, 0); } return; }
  if (q('[data-play]')) {
    st.corre = !st.corre; st.t0 = 0;
    const btn = q('[data-play]'); btn.innerHTML = `<svg><use href="#i-${st.corre ? 'pause' : 'play'}"/></svg>${st.corre ? 'Pausar' : 'Seguir con la serie 3'}`;
    if (st.corre && !st.raf) st.raf = requestAnimationFrame(bucle);
    const v = $('#vid-ej'); if (v) { if (st.corre) { const pr = v.play(); if (pr) pr.catch(() => {}); } else v.pause(); }
    return;
  }
  if ((b = q('[data-quitar]'))) {
    const ej = EJ.find((x) => x.id === b.dataset.quitar);
    if (ej.video && ej.video.startsWith('blob:')) URL.revokeObjectURL(ej.video);
    ej.video = null; pintar(); aviso('Vídeo quitado. Se vuelve a mostrar la ilustración'); return;
  }
  if ((b = q('[data-eva]'))) {
    st.eva = +b.dataset.eva;
    document.querySelectorAll('[data-eva]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $('#eva-txt').textContent = EVA_TXT[st.eva]; $('[data-guardar]').disabled = false; return;
  }
  if (q('[data-guardar]')) {
    const ej = EJ.find((x) => x.id === st.ej); ej.dolor = st.eva;
    cerrar(); st.vista = 'hoy'; pintar(); scrollTo(0, 0);
    aviso(`Guardado · dolor ${st.eva}/10 · lo verá Marta`);
  }
});
pintar();
