---
name: apple-design
description: Reglas de diseño estilo Apple para esta tienda (limpio, tipografía grande, botones pill, claro/oscuro). Úsala al crear o modificar cualquier página, componente, botón o CSS de public/.
---

# Diseño estilo Apple

Fuente de verdad visual: variables y componentes de `public/styles.css`. Reutilízalos; no inventes estilos nuevos si ya existe uno.

## Principios
1. **Menos es más.** Una idea por sección. Mucho espacio en blanco (padding vertical 80–100px).
2. **Tipografía protagonista.** Titulares enormes (`clamp(40px, 8vw, 80px)`), peso 600–700, `letter-spacing` ligeramente negativo, `line-height` 1.05–1.1. Texto secundario en `--muted`.
3. **Sin ruido.** Sin bordes gruesos, sin sombras fuertes, sin más de un color de acento (`--blue`). Los degradados solo en las "artes" de producto.
4. **Fuente del sistema:** `-apple-system, "SF Pro", Helvetica Neue…`. No cargar webfonts.

## Componentes
- **Botón primario:** pill (`border-radius: 980px`), fondo `--blue`, texto blanco, 17px, padding `12px 22px`. Hover más claro; `:active` `scale(.97)`.
- **Botón secundario:** `.btn.ghost` (borde azul, fondo transparente).
- **Tarjetas:** radio 28px, fondo `--card` sobre sección `--bg-alt`, sombra muy sutil.
- **Nav:** 48px, sticky, translúcida con `backdrop-filter: saturate(180%) blur(20px)`.
- **Esquinas:** 18–28px en contenedores, 980px en botones. Nunca esquinas rectas.

## Color
Todo con variables CSS. Modo oscuro automático con `prefers-color-scheme`; cualquier color nuevo debe tener valor claro **y** oscuro. Contraste mínimo AA.

## Movimiento
Transiciones de 0.1–0.2s, solo en `background` y `transform`. Respetar `prefers-reduced-motion`.

## Accesibilidad y responsive
Mobile-first; la rejilla usa `auto-fit/minmax`. `:focus-visible` visible, `alt`/`aria-label` en lo informativo, objetivos táctiles ≥ 44px, HTML semántico (`nav`, `main`, `article`).

## Antes de terminar
Revisa en 375px y 1440px, en claro y oscuro. Si añades texto, que esté en español y sea corto y directo (estilo Apple: frases cortas con punto).
