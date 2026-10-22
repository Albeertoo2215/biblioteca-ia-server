---
name: add-product
description: Añadir, editar o retirar un producto digital de la tienda (precio, archivo en R2, tarjeta en la web). Úsala cuando el usuario quiera vender un producto nuevo.
---

# Añadir un producto

1. Edita `data/products.json` y añade un objeto:
   ```json
   {
     "slug": "mi-producto",
     "name": "Mi producto",
     "tagline": "Frase corta.",
     "description": "Descripción.",
     "price": 2500,
     "currency": "eur",
     "file": "mi-producto.pdf",
     "color": "#2f6fde",
     "image": "/img/mi-producto.jpg",
     "featured": true,
     "badge": "Nuevo",
     "features": ["Punto 1", "Punto 2", "Punto 3"]
   }
   ```
   - `slug`: único, minúsculas y guiones. No cambiarlo después de vender (las compras lo guardan en Stripe).
   - `price`: **en céntimos** (25 € = 2500).
   - `file`: nombre del objeto en R2.
   - `color`: fondo de la portada si no hay imagen. Usa `#2f6fde` (azul) o `#0f2340` (marino).
   - `image` (opcional): portada real, 4:3, en `public/img/`. Mejor que la portada de color.
   - `featured` (opcional): sale en la portada de la web. Solo uno.
   - `badge` (opcional): texto corto sobre el nombre ("Nuevo"). Solo en uno o dos productos.
2. Sube el archivo al bucket privado:
   `npx wrangler r2 object put tienda-digital-files/mi-producto.pdf --file ./ruta/mi-producto.pdf`
3. Despliega (`npm run deploy`) o haz push si hay despliegue automático.
4. Prueba con tarjeta de test `4242 4242 4242 4242` en modo test antes de pasar a live.

Para retirar un producto: quítalo del JSON (los compradores previos pierden la descarga; mejor mantener el archivo y el objeto si ya hay ventas).
No metas archivos de producto en el repositorio: viven solo en R2.
