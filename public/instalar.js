// Instalar folzia.com como app. El botón sale siempre que el navegador permita instalar webs:
// si el navegador ofrece su aviso de instalación se usa ese, y si no se explican los pasos para ese dispositivo
(function () {
  const cajas = document.querySelectorAll('[data-instalar]');
  if (!cajas.length || !window.HTMLDialogElement) return;
  const ua = navigator.userAgent;
  const mostrar = (si) => cajas.forEach((c) => { c.hidden = !si; });
  const instalada = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  const dentroDeOtraApp = /FBAN|FBAV|Instagram|Line\/|LinkedInApp|TikTok|; wv\)/.test(ua);
  const ipad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const iphone = /iPhone|iPod/.test(ua);
  const android = /Android/.test(ua);
  const safariMac = /Macintosh/.test(ua) && !ipad && /Safari\//.test(ua) && !/Chrome|Chromium|Edg|Firefox|OPR/.test(ua);
  const firefoxPC = /Firefox/.test(ua) && !android;
  if (instalada || dentroDeOtraApp || firefoxPC) return; // ya instalada, o el navegador no permite instalar webs

  const compartir = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5v11M8 7.5l4-4 4 4M7 10.5H5.5v10h13v-10H17"/></svg>';
  let guion;
  if (iphone || ipad) guion = ['tu ' + (ipad ? 'iPad' : 'iPhone'), [
    'Pulsa <strong>Compartir</strong> ' + compartir + ' en la barra del navegador. Si no lo ves, está dentro del menú <strong>···</strong>',
    'Elige <strong>Añadir a pantalla de inicio</strong>',
    'Pulsa <strong>Añadir</strong> y tendrás Folzia como una app más']];
  else if (android) guion = ['tu móvil', [
    'Abre el menú del navegador, el botón <strong>⋮</strong> de arriba a la derecha',
    'Elige <strong>Instalar app</strong> o <strong>Añadir a pantalla de inicio</strong>',
    'Confirma y tendrás Folzia como una app más']];
  else if (safariMac) guion = ['tu Mac', [
    'En la barra de menús de arriba, abre <strong>Archivo</strong>',
    'Elige <strong>Añadir al Dock</strong>',
    'Pulsa <strong>Añadir</strong> y Folzia se abrirá en su propia ventana']];
  else guion = ['tu ordenador', [
    'Pulsa el icono de <strong>instalar</strong> que aparece a la derecha de la barra de direcciones',
    'Si no lo ves, abre el menú del navegador (<strong>⋮</strong> en Chrome, <strong>···</strong> en Edge) y busca la opción <strong>Instalar</strong>',
    'Confirma y Folzia se abrirá en su propia ventana']];
  // La ventana con los pasos se crea aquí para no repetirla en cada página
  const guia = document.createElement('dialog');
  guia.className = 'inst-guia';
  guia.setAttribute('aria-labelledby', 'inst-guia-t');
  guia.innerHTML = '<h2 id="inst-guia-t">Instala Folzia en ' + guion[0] + '</h2><ol>' + guion[1].map((t) => '<li>' + t + '</li>').join('') +
    '</ol><form method="dialog"><button class="btn btn-sm">Entendido</button></form>';
  document.body.appendChild(guia);
  mostrar(true);

  let aviso = null; // aviso de instalación del navegador (Chrome, Edge y Android), si llega
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); aviso = e; });
  document.querySelectorAll('[data-instalar-btn]').forEach((b) => b.addEventListener('click', async () => {
    if (!aviso) { guia.showModal(); return; }
    aviso.prompt();
    const r = await aviso.userChoice;
    aviso = null;
    if (r && r.outcome === 'accepted') mostrar(false);
  }));
  guia.addEventListener('click', (e) => { if (e.target === guia) guia.close(); }); // tocar fuera la cierra
  addEventListener('appinstalled', () => mostrar(false));
  // El flotante se aparta en la sección de contacto para no tapar el formulario
  const flot = document.querySelector('.inst-flot'), contacto = document.getElementById('contacto');
  if (flot && contacto && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => flot.classList.toggle('oculto', e.isIntersecting), { rootMargin: '0px 0px -25% 0px' }).observe(contacto);
  }
})();
