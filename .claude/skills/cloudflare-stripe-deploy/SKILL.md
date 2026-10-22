---
name: cloudflare-stripe-deploy
description: Configurar y desplegar la tienda en Cloudflare (Pages, R2, dominio) con Stripe (claves, webhook, modo test/live). Úsala para despliegue, dominio, secretos o fallos de pago/descarga.
---

# Cloudflare + Stripe

## Arquitectura (sin base de datos)
- `public/` → web estática en **Cloudflare Pages**.
- `functions/api/*` → **Pages Functions**: `products`, `checkout`, `order`, `download`, `webhook`.
- **R2** (binding `FILES`) → archivos privados de los productos.
- **Stripe** es la única fuente de verdad: `/api/download` consulta a Stripe que la sesión esté `paid` y contenga el producto. Los precios salen de `data/products.json` en el servidor, nunca del navegador.

## Puesta en marcha
1. `npm install`
2. Login: `npx wrangler login`
3. Bucket: `npx wrangler r2 bucket create tienda-digital-files`
4. Primer despliegue: `npm run deploy` (crea el proyecto Pages `tienda-digital`).
5. Secretos (producción):
   `npx wrangler pages secret put STRIPE_SECRET_KEY --project-name=tienda-digital`
   `npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name=tienda-digital`
6. Stripe → Developers → Webhooks → endpoint `https://TU-DOMINIO/api/webhook`, evento `checkout.session.completed`; copia el `whsec_...` al paso 5.
7. Stripe → Settings → Emails: activar "recibos por email a clientes".
8. Dominio: Cloudflare → Workers & Pages → proyecto → Custom domains → añadir tu dominio (DNS automático si el dominio está en Cloudflare).
9. Conectar el repo de GitHub en Pages para desplegar con cada push (build command vacío, output `public`). El binding R2 también hay que añadirlo en Settings → Functions → R2 bindings (`FILES`).

## Desarrollo local
Copia `.dev.vars.example` a `.dev.vars` con claves **sk_test**. `npm run dev`. Para webhooks locales: `stripe listen --forward-to localhost:8788/api/webhook`.

## Reglas
- Empieza SIEMPRE en modo test; pasa a live cambiando las claves.
- Nunca subas claves ni `.dev.vars`; nunca uses `sk_live` en local.
- No confíes en datos del cliente para precios ni para autorizar descargas.
- Fallos típicos: 403 en descarga = sesión no pagada o producto no incluido; "Archivo no disponible" = falta el objeto en R2 o el binding `FILES`.
