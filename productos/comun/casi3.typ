// Plantilla editorial de Casitres (casi3) para Typst.
// Portada, índice, capítulos con apertura, cabecera con logo y pie «Creado con IA» en todas las páginas.

#let marino = rgb("#0f2340")
#let gris = rgb("#5b6b82")
#let linea = rgb("#e1e7ef")
#let fondo = rgb("#f3f6fa")
#let naranja = rgb("#c2410c")
#let sans = ("Bricolage Grotesque",)
#let serif = ("Source Serif 4",)

#let documento(titulo: "", subtitulo: "", seccion: "", color: rgb("#2f6fde"), actualizado: "Octubre de 2026", fuentes: none, cuerpo) = {
  set document(title: titulo, author: "Casitres")
  set text(font: serif, size: 10.5pt, lang: "es", fill: marino, hyphenate: true)
  set par(justify: true, leading: 0.68em, spacing: 1.05em)
  set page(paper: "a4", margin: (top: 25mm, bottom: 22mm, inside: 22mm, outside: 20mm),
    header: context {
      let p = here().page()
      if p > 2 {
        set text(font: sans, size: 7.5pt, fill: gris)
        let caps = query(selector(heading.where(level: 1)).before(here()))
        let derecha = if caps.len() > 0 { upper(caps.last().body) } else { titulo }
        grid(columns: (1fr, auto), align: (left + horizon, right + horizon),
          image("logo.svg", height: 4.4mm), derecha)
        v(-2.2mm); line(length: 100%, stroke: 0.4pt + linea)
      }
    },
    footer: context {
      let p = here().page()
      if p > 1 {
        set text(font: sans, size: 7.5pt, fill: gris)
        grid(columns: (1fr, auto), titulo + "  ·  Creado con IA  ·  casi3",
          text(weight: 700, fill: color)[#counter(page).display()] + text[ \/ #counter(page).final().first()])
      }
    })

  // Encabezados
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    let n = counter(heading).get().first()
    block(width: 100%, inset: (y: 4mm), {
      if it.numbering != none { text(font: sans, size: 64pt, weight: 800, fill: color)[#if n < 10 [0]#n]; v(-6mm) }
      text(font: sans, size: 26pt, weight: 800, tracking: -0.02em)[#it.body]
    })
    v(2mm); line(length: 22mm, stroke: 2.4pt + color); v(5mm)
  }
  show heading.where(level: 2): it => { v(4mm); text(font: sans, size: 14pt, weight: 700, fill: marino)[#it.body]; v(1mm) }
  show heading.where(level: 3): it => { v(2mm); text(font: sans, size: 11pt, weight: 700, fill: color)[#it.body] }
  set heading(numbering: "1.")
  show heading.where(level: 2): set heading(numbering: none)
  show heading.where(level: 3): set heading(numbering: none)

  // Tablas
  set table(stroke: (x, y) => (bottom: 0.4pt + linea), inset: (x: 2.6mm, y: 2.2mm),
    fill: (x, y) => if y == 0 { color } else if calc.even(y) { fondo } else { white })
  show table.cell.where(y: 0): set text(font: sans, weight: 700, fill: white, size: 9pt)
  show table: set text(size: 9.4pt)
  set list(marker: text(fill: color)[•], indent: 1mm)
  show link: set text(fill: color)
  show strong: set text(font: sans, weight: 700, size: 0.96em)

  // Portada
  page(margin: 0pt, header: none, footer: none, fill: color, {
    place(top + right, dx: 40mm, dy: -45mm, circle(radius: 75mm, fill: white.transparentize(90%)))
    place(bottom + right, dx: -18mm, dy: -40mm, rotate(14deg, rect(width: 90mm, height: 90mm, radius: 20mm, fill: white.transparentize(88%))))
    place(bottom + left, dx: 120mm, dy: -95mm, circle(radius: 22mm, stroke: 3mm + white.transparentize(82%)))
    place(top + left, dx: 22mm, dy: 24mm, text(font: sans, size: 10pt, weight: 700, fill: white.transparentize(15%), tracking: 0.06em, upper(seccion)))
    set par(justify: false)
    place(left + horizon, dx: 22mm, dy: -10mm, block(width: 150mm, {
      text(font: sans, size: 42pt, weight: 800, fill: white, tracking: -0.025em, hyphenate: false)[#titulo]
      v(6mm)
      text(font: sans, size: 14pt, fill: white.transparentize(8%))[#subtitulo]
    }))
    place(bottom + left, dx: 22mm, dy: -22mm, text(font: sans, size: 9pt, fill: white.transparentize(10%))[Actualizado: #actualizado \ Creado con IA y revisado por Casitres])
    place(bottom + right, dx: -22mm, dy: -20mm, box(fill: white, radius: 3mm, inset: (x: 4mm, y: 3mm), image("logo.svg", height: 9mm)))
  })

  // Índice
  page({
    text(font: sans, size: 26pt, weight: 800)[Índice]
    v(2mm); line(length: 22mm, stroke: 2.4pt + color); v(6mm)
    set par(justify: false)
    show outline.entry.where(level: 1): it => block(above: 5mm, below: 1.5mm,
      text(font: sans, size: 12.5pt, weight: 700)[#link(it.element.location(), [#box(width: 9mm, text(fill: color)[#it.prefix()]) #it.body() #box(width: 1fr, repeat(text(fill: linea)[.#h(1.2mm)])) #text(fill: color)[#it.page()]])])
    show outline.entry.where(level: 2): it => block(above: 2mm, below: 2mm,
      text(size: 10pt, fill: gris)[#link(it.element.location(), [#h(9mm)#it.body() #box(width: 1fr, repeat(text(fill: linea)[.#h(1.2mm)])) #it.page()])])
    outline(title: none, depth: 2, indent: 0pt)
  })
  cuerpo
  if fuentes != none {
    heading(numbering: none, level: 1)[Fuentes]
    set text(size: 9pt)
    fuentes
  }
}

// ── Componentes ──
#let aviso(titulo: "", color: rgb("#2f6fde"), cuerpo) = block(width: 100%, fill: color.transparentize(92%), stroke: (left: 1.4mm + color), radius: (right: 2.5mm), inset: (x: 5mm, y: 4mm), breakable: false, {
  if titulo != "" { text(font: sans, weight: 700, fill: color)[#titulo]; v(-1mm) }
  cuerpo
})
#let cuidado(cuerpo, titulo: "Cuidado") = aviso(titulo: titulo, color: naranja, cuerpo)
#let dato(numero, texto, color: rgb("#2f6fde")) = block(width: 100%, fill: fondo, radius: 3mm, inset: 4.5mm, breakable: false, {
  text(font: sans, size: 24pt, weight: 800, fill: color, tracking: -0.02em)[#numero]
  v(-2mm); set par(justify: false); text(size: 9.5pt)[#texto]
})
#let datos(..items) = grid(columns: (1fr,) * items.pos().len(), gutter: 4mm, ..items.pos())
#let checklist(..items) = { set par(justify: false); for i in items.pos() { block(above: 1.6mm, below: 1.6mm, grid(columns: (6mm, 1fr), box(width: 3.8mm, height: 3.8mm, radius: 0.8mm, stroke: 0.5pt + gris), i)); line(length: 100%, stroke: 0.3pt + linea) } }
#let cita(cuerpo) = block(inset: (x: 8mm, y: 3mm), text(font: sans, size: 15pt, weight: 600, style: "normal", fill: marino)[“#cuerpo”])
#let ficha(titulo, cuerpo, color: rgb("#2f6fde")) = block(width: 100%, fill: white, stroke: 0.5pt + linea, radius: 3mm, inset: 5mm, breakable: false, {
  text(font: sans, weight: 700, size: 11pt, fill: color)[#titulo]; v(-1mm); set par(justify: false); cuerpo })
#let lineas(n) = { for _ in range(n) { v(6.5mm); line(length: 100%, stroke: 0.4pt + linea) } }
#let barras(datos, color: rgb("#2f6fde"), sufijo: "", alto: 42mm) = {
  let m = calc.max(..datos.map(d => d.at(1)))
  grid(columns: (1fr,) * datos.len(), gutter: 3mm, align: bottom,
    ..datos.map(d => align(center, stack(dir: ttb, spacing: 1.5mm,
      text(font: sans, size: 8pt, weight: 700)[#d.at(1)#sufijo],
      rect(width: 70%, height: alto * d.at(1) / m, fill: color, radius: (top: 1.5mm)),
      text(font: sans, size: 7.5pt, fill: gris)[#d.at(0)]))))
}
