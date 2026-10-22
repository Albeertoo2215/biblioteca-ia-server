---
name: apple-store-ui
description: Aspecto visual de apple.com aplicado a esta tienda (tokens, botones pill, bloques de portada, tarjetas de producto, nav translúcida, footer). Úsala al crear o modificar cualquier página, componente o CSS de public/. Para movimiento, interacción y tipografía fina, combínala con la skill apple-design.
---

# Apple Store UI

Dos fuentes, en este orden:
1. **Esta skill**: qué aspecto tiene (valores sacados de apple.com).
2. **Skill `apple-design`** (Emil Kowalski, MIT): cómo se mueve y responde (respuesta en pointer-down, springs, materiales, reduced-motion, tracking por tamaño).

Fuente de verdad en código: variables y clases de `public/styles.css`. Reutiliza antes de crear.

## Tokens (paleta E · Claro con bandas)
Solo modo claro: el negro no se usa. Variables en `public/styles.css`.
| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#fff` | Fondo base |
| `--tint` | `#eaf2ff` | Degradado de la portada (arriba) |
| `--bg-alt` | `#f3f6fa` | Bandas suaves (FAQ, footer) |
| `--navy` | `#0f2340` | Banda de contraste (catálogo), con `.section.navy` |
| `--text` | `#0f2340` | Texto principal |
| `--muted` | `#5b6b82` | Texto secundario |
| `--blue` / `--blue-top` / `--blue-deep` | `#2f6fde` / `#4d8af0` / `#2156b8` | Botones y acento |
| `--badge` | `#c2410c` | Etiqueta "Nuevo" |

Ritmo de bandas: portada con tinte, banda marino, blanco, gris suave. Nunca dos bandas iguales seguidas.
Color vivo solo en botones, portadas de producto (`color` en `data/products.json`) y paneles de «Cómo funciona». Sin texto en degradado ni manchas de luz.

## Tipografía
Fuente del sistema (`-apple-system, system-ui, "SF Pro"…`), nunca webfonts.
| Uso | Tamaño | Peso | Line-height | Tracking |
| --- | --- | --- | --- | --- |
| Titular hero | `clamp(2.5rem, 5.2vw, 4rem)` (64px) | 700 | 1.04 | `-0.035em` |
| Titular sección | `clamp(2rem, 4vw, 2.75rem)` (44px) | 700 | 1.1 | `-0.03em` |
| Subtítulo hero | `clamp(1.3rem, 2.4vw, 1.75rem)` (28px) | 400 | 1.14 | `0.007em` |
| Titular tarjeta | `1.5rem` (24px) | 600 | 1.17 | `0.009em` |
| Cuerpo | `1.0625rem` (17px) | 400 | 1.47 | `0` |
| Legal / nav | `0.75rem` (12px) | 400 | 1.33 | `0.01em` |


## Componentes y movimiento (elegidos por el usuario el 2026-10-22)
- **Nav** fija 56px, translúcida; se esconde al bajar y vuelve al subir.
- **Botón** pill azul con relieve (degradado, brillo interior, sombra marino). `.shimmer`: reflejo cada pocos segundos. `.magnetic`: se acerca al cursor. `:active` se hunde.
- **Portada (opción C)**: mosaico de portadas de producto en 6 columnas inclinadas que suben y bajan sin parar (`#mosaic`, se construye con los productos reales), con un panel de cristal centrado: titular palabra a palabra, subtítulo, botón + enlace.
- **Por qué comprar aquí (opción A)**: bento de 4 bloques, cada uno con su animación al verse: tarjeta que entra y «✓ Pagado», barra de descarga que cuenta hasta 100 %, email que se escribe solo, sobre con aviso.
- **Catálogo** en banda marino: tarjetas con borde que se ilumina donde está el cursor, inclinación 3D y entrada en cascada.
- **Cómo funciona (opción C con escenas)**: tres paneles de color (Elige, Paga, Descarga) que se abren por turnos cada 4,8 s y al pasar el ratón; el abierto reproduce su escena: cursor que pulsa Comprar, pago que pasa a «✓ Pagado», check que se dibuja y barra de descarga. Las escenas usan el producto destacado real.
- **Preguntas** en dos columnas. **Cierre** con titular grande y botón.
- Animaciones en `public/app.js`, una función por efecto. Solo `transform`, `opacity` y `filter` (salvo los paneles, que animan `flex`).
- Nombres de `@keyframes` únicos en todo `styles.css`: uno repetido sustituye al anterior sin avisar.

## Prohibido (señales de plantilla IA)
Etiqueta "NUEVO" sobre el titular, texto en degradado, manchas de luz, cajas que imitan archivos o pantallas, bandas con puntos de colores, tres tarjetas iguales numeradas, frases ingeniosas ("Ni uno más"), raya larga (—) en cualquier texto.

## Layout
- Ancho de contenido 980px (texto) / 1200px (rejillas), gutter lateral 22px (16px en móvil).
- Rejillas con `auto-fit, minmax(...)`; en móvil una columna.
- Una idea por bloque. Si un bloque necesita más de un titular, son dos bloques.

## Copy
Español, frases cortas acabadas en punto ("Compra una vez. Descarga al instante."). Etiquetas concretas, no genéricas.

## Accesibilidad
Contraste AA, `:focus-visible` visible, objetivos ≥ 44px, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast` (ver skill `apple-design` §14).

## Antes de terminar
Captura en 375px y 1440px, en claro y oscuro (`npm run dev` + navegador). Comprueba que no hay scroll horizontal.
