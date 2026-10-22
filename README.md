# Casitres

Casitres: productos digitales de todo tipo a 2,99 €, con una web estilo Apple. Solo **Cloudflare** (dominio, hosting, archivos) y **Stripe** (pagos).

```
npm install
cp .dev.vars.example .dev.vars   # claves de TEST de Stripe
npm run dev                      # http://localhost:8788
```

Despliegue paso a paso: `.claude/skills/cloudflare-stripe-deploy/SKILL.md`.
Añadir productos: `.claude/skills/add-product/SKILL.md`.
Diseño: `.claude/skills/apple-store-ui` (aspecto de apple.com) + `.claude/skills/apple-design` (movimiento e interacción, de [emilkowalski/skills](https://github.com/emilkowalski/skills), MIT).

Flujo: Comprar → Stripe Checkout → `/success.html` → `/api/download` (verifica el pago en Stripe y sirve el archivo desde R2).
