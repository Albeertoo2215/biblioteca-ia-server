# Folzia — web

Web del negocio Folzia: **aplicaciones a medida para pymes**, construidas con Claude Code.

Herramientas internas, portales para clientes y automatizaciones que sustituyen hojas de cálculo y tareas manuales, con presupuesto por escrito antes de empezar y entregas por fases.

## Estructura
- `public/index.html`: web de una sola página (HTML/CSS/JS, sin framework) con formulario de contacto detallado.
- `public/aviso-legal.html`, `privacidad.html`, `cookies.html`: textos legales (LSSI-CE, RGPD/LOPDGDD).
- `public/main.js`: fondo de partículas en WebGL (intro con el logo, figuras por sección y fondos alternos blanco/naranja) y envío del formulario.
- `public/fonts/`: tipografía Archivo autoalojada (sin peticiones a Google Fonts).
- `demos/`: código de las apps de ejemplo (negocios ficticios). **No se publica**: solo sirve para grabar los vídeos de la galería.
  - En la galería: móvil `fisio` (Eje), `finanzas` (Cuadra), `obra` (Hormigo); escritorio `gestoria` (Vértice), `veterinaria` (Arce), `proyectos` (Quilla).
  - `demos/fisio/media/`: vídeo del puente de glúteo (Pexels, vídeo 6525525) y fotos de la bicicleta estática y de la extensión de rodilla en máquina (Pexels). Licencia de Pexels: uso gratuito, también comercial, sin atribución obligatoria. Recortados para que no se vea la cara.
- `public/video/` y `public/img/`: vídeos cortos de las apps de ejemplo (WebM y MP4 para Safari, 60 fps) y sus portadas, para la galería.
- `public/_headers`: cabeceras de seguridad para Cloudflare Pages.
- `wrangler.toml`: configuración de Cloudflare Workers (recursos estáticos de `public/`).

## Desarrollo local
```bash
npx serve public
```

## Despliegue en Cloudflare
- **Panel:** Workers & Pages → Create application → importar este repo desde GitHub. Rama `reconversion` (o `main` tras fusionar), build command vacío, deploy command `npx wrangler deploy`.
- **CLI:** `npx wrangler deploy`.

## Pendiente antes de publicar
- Buscar y sustituir todos los marcadores entre corchetes: `grep -rn "\[" public/*.html` (`[NIF]`, `[DOMICILIO COMPLETO]`, `[FECHA]`, proveedores...).
- Revisar los textos legales con un profesional antes de publicar.
- Quitar la línea `X-Robots-Tag: noindex` de `public/_headers` para que los buscadores indexen la web.

La versión anterior (Biblioteca IA) está en la rama `archive/bibliotecaia-old`.
