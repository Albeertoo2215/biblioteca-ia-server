# Tienda Digital

Tienda de productos digitales. Stack único: **Cloudflare (Pages, Functions, R2, dominio) + Stripe**. Sin base de datos ni otros servicios; no añadas dependencias externas sin pedirlo.

- Web: `public/` (HTML/CSS/JS plano, sin build). Diseño estilo Apple → skill `apple-design`.
- API: `functions/api/`, helper en `functions/_lib/stripe.js` (fetch directo a Stripe, sin SDK).
- Catálogo: `data/products.json` (precios en céntimos, única fuente de precios) → skill `add-product`.
- Despliegue, dominio y Stripe → skill `cloudflare-stripe-deploy`.

Reglas: textos en español; secretos solo en `.dev.vars` (ignorado) o secretos de Cloudflare; los archivos de producto nunca van al repo.
