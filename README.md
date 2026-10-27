# <MARCA> — web

Web del negocio <MARCA>: **aplicaciones a medida para pymes**, construidas con Claude Code.

Herramientas internas, portales para clientes y automatizaciones que sustituyen hojas de cálculo y tareas manuales, con presupuesto cerrado y entrega en semanas.

## Estructura
- `public/`: web estática de una sola página (HTML/CSS, sin framework) y política de privacidad.
- `public/_headers`: cabeceras de seguridad para Cloudflare Pages.
- `wrangler.toml`: configuración de Cloudflare Pages.

## Desarrollo local
```bash
npx serve public
```

## Despliegue en Cloudflare Pages
- **Panel:** Workers & Pages → Create → Pages → conectar este repo. Build command vacío y directorio de salida `public`.
- **CLI:** `npx wrangler pages deploy public`.

## Pendiente
- Sustituir `<MARCA>`, `contacto@TU-DOMINIO` y `<NOMBRE Y NIF>`.
- Sustituir `FORM_ENDPOINT` en `public/index.html` por el endpoint real del formulario.

La versión anterior (Biblioteca IA) está en la rama `archive/bibliotecaia-old`.
