# Folza — web

Web del negocio Folza: **aplicaciones a medida para pymes**, construidas con Claude Code.

Herramientas internas, portales para clientes y automatizaciones que sustituyen hojas de cálculo y tareas manuales, con presupuesto por escrito antes de empezar y entregas por fases.

## Estructura
- `public/index.html`: web de una sola página (HTML/CSS/JS, sin framework) con formulario de contacto detallado.
- `public/aviso-legal.html`, `privacidad.html`, `cookies.html`: textos legales (LSSI-CE, RGPD/LOPDGDD).
- `public/main.js`: escena de scroll (hoja de cálculo → aplicación → automatización), indicador del proceso y envío del formulario.
- `public/fonts/`: tipografía DM Sans autoalojada (sin peticiones a Google Fonts).
- `public/_headers`: cabeceras de seguridad para Cloudflare Pages.
- `wrangler.toml`: configuración de Cloudflare Pages.

## Desarrollo local
```bash
npx serve public
```

## Despliegue en Cloudflare Pages
- **Panel:** Workers & Pages → Create → Pages → conectar este repo. Build command vacío y directorio de salida `public`.
- **CLI:** `npx wrangler pages deploy public`.

## Pendiente antes de publicar
- Buscar y sustituir todos los marcadores entre corchetes: `grep -rn "\[" public/*.html` (`[CORREO]`, `[NIF]`, `[DOMICILIO COMPLETO]`, `[FECHA]`, proveedores...).
- Conectar el formulario: sustituir `FORM_ENDPOINT` en `public/index.html` por el endpoint del servicio elegido (Formspree, Web3Forms...) y añadir ese proveedor en la tabla de encargados de `privacidad.html`.
- Revisar los textos legales con un profesional antes de publicar.
- Quitar la línea `X-Robots-Tag: noindex` de `public/_headers` para que los buscadores indexen la web.

La versión anterior (Biblioteca IA) está en la rama `archive/bibliotecaia-old`.
