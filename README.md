# Tienda Digital

Vende productos digitales con una web estilo Apple. Solo **Cloudflare** (dominio, hosting, archivos) y **Stripe** (pagos).

```
npm install
cp .dev.vars.example .dev.vars   # claves de TEST de Stripe
npm run dev                      # http://localhost:8788
```

Despliegue paso a paso: `.claude/skills/cloudflare-stripe-deploy/SKILL.md`.
Añadir productos: `.claude/skills/add-product/SKILL.md`.

Flujo: Comprar → Stripe Checkout → `/success.html` → `/api/download` (verifica el pago en Stripe y sirve el archivo desde R2).
