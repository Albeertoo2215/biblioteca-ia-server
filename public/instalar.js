// Instalar folzia.com como app. El botón abre un panel con dos partes:
// arriba, la instalación con un toque (Chrome, Edge y Android, cuando el navegador lo permite);
// abajo, los pasos para quien no puede usar ese botón o tiene iPhone, iPad o Mac.
(function () {
  // Sin service worker, Chrome no ofrece la instalación con un toque
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  const cajas = document.querySelectorAll('[data-instalar]');
  if (!cajas.length || !window.HTMLDialogElement) return;
  const ua = navigator.userAgent;
  const mostrar = (si) => cajas.forEach((c) => { c.hidden = !si; });
  const instalada = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  const dentroDeOtraApp = /FBAN|FBAV|Instagram|Line\/|LinkedInApp|TikTok|; wv\)/.test(ua);
  const ipad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const apple = ipad || /iPhone|iPod/.test(ua);
  const android = /Android/.test(ua);
  const firefoxPC = /Firefox/.test(ua) && !android;
  if (instalada || dentroDeOtraApp || firefoxPC) return; // ya instalada, o el navegador no permite instalar webs
  const conUnToque = 'BeforeInstallPromptEvent' in window && !apple; // Chrome, Edge, Samsung Internet...

  const compartir = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v11M8 7.5l4-4 4 4M7 10.5H5.5v10h13v-10H17"/></svg>';
  const PASOS = {
    apple: ['iPhone o iPad', [
      'Pulsa <strong>Compartir</strong> ' + compartir + ' en la barra del navegador. Si no lo ves, está dentro del menú <strong>···</strong>',
      'Elige <strong>Añadir a pantalla de inicio</strong>',
      'Pulsa <strong>Añadir</strong>']],
    android: ['Android', [
      'Abre el menú del navegador, el botón <strong>⋮</strong> de arriba a la derecha',
      'Elige <strong>Instalar app</strong> o <strong>Añadir a pantalla de inicio</strong>',
      'Confirma']],
    pc: ['Ordenador', [
      'En Chrome o Edge, pulsa el icono de <strong>instalar</strong> a la derecha de la barra de direcciones, o búscalo en el menú (<strong>⋮</strong> en Chrome, <strong>···</strong> en Edge)',
      'En Safari de Mac, abre el menú <strong>Archivo</strong> y elige <strong>Añadir al Dock</strong>',
      'Confirma y Folzia se abrirá en su propia ventana']],
  };
  const mio = apple ? 'apple' : android ? 'android' : 'pc';

  // El panel se crea aquí para no repetirlo en cada página
  const guia = document.createElement('dialog');
  guia.className = 'inst-guia';
  guia.setAttribute('aria-labelledby', 'inst-t');
  guia.innerHTML =
    '<h2 id="inst-t">Instala Folzia como app</h2>' +
    '<p class="inst-sub">Queda en tu pantalla de inicio con su icono y se abre como cualquier otra app.</p>' +
    '<section class="inst-bloque" aria-labelledby="inst-t1"><h3 id="inst-t1">Android y ordenador</h3>' +
      (conUnToque
        ? '<p>Con Chrome o Edge se instala con este botón.</p><button type="button" class="btn btn-sm" id="inst-ya">Instalar ahora</button><p class="inst-msg" id="inst-msg" role="status"></p>'
        : '<p>Con Chrome o Edge se instala con un solo botón. ' + (apple ? 'En iPhone y iPad Apple no lo permite, así que sigue los pasos de abajo.' : 'En este navegador no está disponible, así que sigue los pasos de abajo.') + '</p>') +
    '</section>' +
    '<section class="inst-bloque" aria-labelledby="inst-t2"><h3 id="inst-t2">¿No te deja o tienes iPhone? Hazlo así</h3>' +
      '<div class="inst-tabs" role="group" aria-label="Elige tu dispositivo">' +
        Object.keys(PASOS).map((k) => '<button type="button" data-disp="' + k + '" aria-pressed="' + (k === mio) + '">' + PASOS[k][0] + '</button>').join('') +
      '</div><ol id="inst-pasos" aria-live="polite"></ol>' +
    '</section>' +
    '<form method="dialog"><button class="btn btn-sm btn-line">Cerrar</button></form>';
  document.body.appendChild(guia);

  const lista = guia.querySelector('#inst-pasos');
  const elegir = (k) => {
    guia.querySelectorAll('[data-disp]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.disp === k)));
    lista.innerHTML = PASOS[k][1].map((t) => '<li>' + t + '</li>').join('');
  };
  elegir(mio);
  guia.querySelectorAll('[data-disp]').forEach((b) => b.addEventListener('click', () => elegir(b.dataset.disp)));
  guia.addEventListener('click', (e) => { if (e.target === guia) guia.close(); }); // tocar fuera lo cierra

  let aviso = null; // aviso de instalación del navegador, cuando lo ofrece
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); aviso = e; });
  const ya = guia.querySelector('#inst-ya'), msg = guia.querySelector('#inst-msg');
  if (ya) ya.addEventListener('click', async () => {
    if (!aviso) {
      msg.textContent = 'Tu navegador todavía no lo permite con un toque. Usa los pasos de abajo.';
      elegir(mio);
      return;
    }
    aviso.prompt();
    const r = await aviso.userChoice;
    aviso = null;
    if (r && r.outcome === 'accepted') { guia.close(); mostrar(false); }
    else msg.textContent = 'Sin problema, puedes instalarla cuando quieras con los pasos de abajo.';
  });
  document.querySelectorAll('[data-instalar-btn]').forEach((b) => b.addEventListener('click', () => {
    if (msg) msg.textContent = '';
    guia.showModal();
  }));
  addEventListener('appinstalled', () => { mostrar(false); if (guia.open) guia.close(); });
  mostrar(true);

  // El flotante se aparta en la sección de contacto para no tapar el formulario
  const flot = document.querySelector('.inst-flot'), contacto = document.getElementById('contacto');
  if (flot && contacto && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => flot.classList.toggle('oculto', e.isIntersecting), { rootMargin: '0px 0px -25% 0px' }).observe(contacto);
  }
})();
