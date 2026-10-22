---
name: apple-store-ui
description: Aspecto visual de apple.com aplicado a esta tienda (tokens, botones pill, bloques de portada, tarjetas de producto, nav translúcida, footer). Úsala al crear o modificar cualquier página, componente o CSS de public/. Para movimiento, interacción y tipografía fina, combínala con la skill apple-design.
---

# Apple Store UI

Dos fuentes, en este orden:
1. **Esta skill**: qué aspecto tiene (valores sacados de apple.com).
2. **Skill `apple-design`** (Emil Kowalski, MIT): cómo se mueve y responde (respuesta en pointer-down, springs, materiales, reduced-motion, tracking por tamaño).

Fuente de verdad en código: variables y clases de `public/styles.css`. Reutiliza antes de crear.

## Tokens (apple.com)
| Token | Claro | Oscuro |
| --- | --- | --- |
| `--bg` | `#fff` | `#000` |
| `--bg-alt` (bloques, footer) | `#f5f5f7` | `#161617` |
| `--card` | `#fff` | `#1d1d1f` |
| `--text` | `#1d1d1f` | `#f5f5f7` |
| `--muted` | `#6e6e73` | `#86868b` |
| `--blue` (botón) | `#0071e3` | `#0071e3` |
| `--link` | `#0066cc` | `#2997ff` |

Un solo color de acento. Degradados solo en el arte de producto.

## Tipografía
Fuente del sistema (`-apple-system, system-ui, "SF Pro"…`), nunca webfonts.
| Uso | Tamaño | Peso | Line-height | Tracking |
| --- | --- | --- | --- | --- |
| Titular hero | `clamp(2.5rem, 6vw, 3.5rem)` (56px) | 600 | 1.07 | `-0.005em` |
| Titular sección | `clamp(2rem, 4.5vw, 3rem)` (48px) | 600 | 1.08 | `-0.003em` |
| Subtítulo hero | `clamp(1.3rem, 2.4vw, 1.75rem)` (28px) | 400 | 1.14 | `0.007em` |
| Titular tarjeta | `1.5rem` (24px) | 600 | 1.17 | `0.009em` |
| Cuerpo | `1.0625rem` (17px) | 400 | 1.47 | `0` |
| Legal / nav | `0.75rem` (12px) | 400 | 1.33 | `0.01em` |

Patrón Apple Store: titular en dos tonos, `<b>Tienda.</b> <span class="muted">Frase gris.</span>`.

## Componentes
- **Nav** 44px, sticky, translúcida (`rgba` + `backdrop-filter: saturate(180%) blur(20px)`). Sin borde fijo: el separador aparece al hacer scroll (`.nav.scrolled`).
- **Botones** pill (`border-radius: 980px`), 17px, padding `11px 21px`.
  - `.btn` primario azul relleno ("Comprar").
  - `.btn.ghost` contorno azul ("Más información").
  - Siempre en pareja primario + ghost en portada, centrados, separados 14px.
  - Feedback en `:active` (pointer-down): se hunde, 100ms.
- **Enlace con chevron** `.link-more`: "Ver más ›", color `--link`.
- **Bloque hero** a ancho completo, texto centrado, mucho aire (padding vertical ≥ 56px móvil, 88px escritorio).
- **Tarjeta de producto** con doble bisel (ver abajo), sombra en capas `--shadow`; hover sube 6px con `--shadow-hover` (solo con puntero fino).
- **Footer** fondo `--bg-alt`, texto 12px `--muted`, separadores finos.
- **Botón 3D**: degradado vertical (`--blue-top` → `--blue` → `--blue-deep`), brillo interior arriba, sombra azul en capas; hover sube 2px y cruza un reflejo; `:active` se hunde (`translateY(1px) scale(.97)`, sombra interior).
- **Doble bisel** (`.card` + `.card-core`, `.step` + `.step-core`): carcasa translúcida de 6px y núcleo con radio concéntrico (30px fuera, 24px dentro).
- **Profundidad**: tarjetas de producto con portada 3D (`.cover`) e inclinación con el puntero; hero con pila de archivos en perspectiva y orbes de luz. Todo con `transform`/`opacity`, desactivado con reduced-motion y en táctil.

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
