# Tienda Digital

Tienda de productos digitales. Stack único: **Cloudflare (Pages, Functions, R2, dominio) + Stripe**. Sin base de datos ni otros servicios; no añadas dependencias externas sin pedirlo.

- Web: `public/` (HTML/CSS/JS plano, sin build). Diseño estilo Apple → skills `apple-store-ui` (aspecto, valores de apple.com) y `apple-design` (movimiento e interacción; de emilkowalski/skills, MIT, no editar).
  Volumen, botones 3D y animación → `soft-skill` (high-end-visual-design), `animate`, `make-interfaces-feel-better` (copiadas de myreportify-adri, no editar). Mantén el estilo Apple: estas skills aportan acabado, no cambian la identidad (sin fuentes externas, sin nav flotante).
- API: `functions/api/`, helper en `functions/_lib/stripe.js` (fetch directo a Stripe, sin SDK).
- Catálogo: `data/products.json` (precios en céntimos, única fuente de precios) → skill `add-product`.
- Despliegue, dominio y Stripe → skill `cloudflare-stripe-deploy`.

Reglas: textos en español; secretos solo en `.dev.vars` (ignorado) o secretos de Cloudflare; los archivos de producto nunca van al repo.
