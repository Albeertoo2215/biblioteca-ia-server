// Service worker de folzia.com. Permite que Chrome, Edge y Android ofrezcan instalar la web como app
// y muestra un aviso si se abre sin conexión. No guarda páginas ni datos: todo se pide siempre a la red.
const SIN_CONEXION = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sin conexión · Folzia</title></head>' +
  '<body><h1>Ahora mismo no tienes conexión</h1><p>Cuando vuelvas a tener internet, recarga la página. Si lo necesitas, puedes llamarme al <a href="tel:+34606430834">606 430 834</a>.</p></body></html>';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return; // imágenes, vídeos, estilos, formularios: el navegador los gestiona como siempre
  e.respondWith(fetch(e.request).catch(() => new Response(SIN_CONEXION, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
