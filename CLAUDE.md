# Tienda Digital

Tienda de productos digitales. Stack único: **Cloudflare (Pages, Functions, R2, dominio) + Stripe**. Sin base de datos ni otros servicios; no añadas dependencias externas sin pedirlo.
Animación: GSAP 3.12.5 + ScrollTrigger y Lenis 1.1.13, servidos desde `public/vendor/` (copiados con `npm run vendor`, nunca desde un CDN). Con `prefers-reduced-motion` o sin JS la página queda estática y completa.

- Web: `public/` (HTML/CSS/JS plano, sin build). Diseño estilo Apple → skills `apple-store-ui` (aspecto, valores de apple.com) y `apple-design` (movimiento e interacción; de emilkowalski/skills, MIT, no editar).
  Anti-plantilla → `taste-skill` (de myreportify-adri, no editar): sin hero centrado, sin etiquetas decorativas, sin texto en degradado, sin brillos, sin rayas largas (—), sin tres tarjetas iguales. Movimiento → `animate` y `make-interfaces-feel-better`.
- API: `functions/api/`, helper en `functions/_lib/stripe.js` (fetch directo a Stripe, sin SDK).
- Catálogo: `data/products.json` (precios en céntimos, única fuente de precios) → skill `add-product`.
- Despliegue, dominio y Stripe → skill `cloudflare-stripe-deploy`.

Reglas: textos en español; secretos solo en `.dev.vars` (ignorado) o secretos de Cloudflare; los archivos de producto nunca van al repo.
