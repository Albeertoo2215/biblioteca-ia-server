"""Plantilla común de todos los productos de Casitres (casi3).
Cada documento: portada, páginas A4 con cabecera (logo casi3) y pie («Creado con IA» + nº de página)."""
import base64, html, os

AQUI = os.path.dirname(__file__)
LOGO_SVG = open(os.path.join(AQUI, 'logo.svg')).read()
LOGO_URI = 'data:image/svg+xml;base64,' + base64.b64encode(LOGO_SVG.encode()).decode()

COLORES = {'azul': '#2f6fde', 'marino': '#0f2340', 'verde': '#1f8a7a', 'naranja': '#c2410c',
           'violeta': '#6d5bd0', 'rosa': '#d6456b', 'oro': '#b7791f'}

CSS = r'''
@page { size: A4; margin: 22mm 16mm 20mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Inter", "Helvetica Neue", Arial, sans-serif; color: #0f2340; font-size: 10.5pt; line-height: 1.5; }
h1, h2, h3 { line-height: 1.12; letter-spacing: -.02em; margin: 0; }
h2 { font-size: 20pt; margin: 0 0 4mm; }
h3 { font-size: 12.5pt; margin: 5mm 0 2mm; }
p { margin: 0 0 3mm; }
.muted { color: #5b6b82; }
.page { break-after: page; }
.page:last-child { break-after: auto; }
/* Portada a sangre */
.cover { position: relative; height: 253mm; margin: -2mm 0 0; border-radius: 8mm; overflow: hidden; background: var(--a); color: #fff; padding: 18mm 16mm; display: flex; flex-direction: column; justify-content: space-between; }
.cover .shape1 { position: absolute; width: 150mm; height: 150mm; border-radius: 50%; right: -55mm; top: -45mm; background: rgba(255,255,255,.10); }
.cover .shape2 { position: absolute; width: 90mm; height: 90mm; border-radius: 22mm; right: 18mm; bottom: 38mm; transform: rotate(14deg); background: rgba(255,255,255,.12); }
.cover .shape3 { position: absolute; width: 46mm; height: 46mm; border-radius: 50%; left: 120mm; bottom: 92mm; border: 3mm solid rgba(255,255,255,.18); }
.cover .kicker { position: relative; font-size: 11pt; font-weight: 700; letter-spacing: .04em; opacity: .85; }
.cover h1 { position: relative; font-size: 40pt; font-weight: 800; max-width: 150mm; }
.cover .sub { position: relative; font-size: 14pt; max-width: 125mm; opacity: .92; margin-top: 5mm; }
.cover .foot { position: relative; display: flex; justify-content: space-between; align-items: end; font-size: 9.5pt; opacity: .9; }
.cover .logo { background: #fff; border-radius: 4mm; padding: 3mm 4mm; }
.cover .logo img { height: 9mm; display: block; }
/* Componentes */
.lead { font-size: 12.5pt; color: #33465f; max-width: 160mm; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; }
.card { border-radius: 4mm; background: #f3f6fa; padding: 5mm; break-inside: avoid; }
.card.line { background: #fff; border: .35mm solid #e1e7ef; }
.card h3 { margin-top: 0; }
.tag { display: inline-block; font-size: 8pt; font-weight: 700; letter-spacing: .03em; padding: 1mm 2.5mm; border-radius: 10mm; background: var(--a); color: #fff; }
.callout { border-left: 1.4mm solid var(--a); background: color-mix(in srgb, var(--a) 8%, #fff); padding: 4mm 5mm; border-radius: 0 3mm 3mm 0; margin: 4mm 0; break-inside: avoid; }
.callout b { color: var(--a); }
.warn { border-left-color: #c2410c; background: #fff4ec; }
.warn b { color: #c2410c; }
.num { font-size: 26pt; font-weight: 800; color: var(--a); letter-spacing: -.03em; line-height: 1; }
.steps { counter-reset: s; list-style: none; padding: 0; margin: 0; }
.steps li { counter-increment: s; position: relative; padding: 0 0 4mm 12mm; break-inside: avoid; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 0; width: 8mm; height: 8mm; border-radius: 50%; background: var(--a); color: #fff; font-weight: 800; display: grid; place-items: center; font-size: 10pt; }
.check { list-style: none; padding: 0; margin: 0; }
.check li { position: relative; padding: 1.4mm 0 1.4mm 8mm; border-bottom: .25mm solid #e1e7ef; break-inside: avoid; }
.check li::before { content: ""; position: absolute; left: 0; top: 2mm; width: 4mm; height: 4mm; border: .45mm solid var(--a); border-radius: 1mm; }
table { width: 100%; border-collapse: collapse; font-size: 9.5pt; break-inside: auto; }
th { text-align: left; background: var(--a); color: #fff; padding: 2mm 3mm; font-weight: 700; }
td { padding: 2mm 3mm; border-bottom: .25mm solid #e1e7ef; vertical-align: top; }
tr { break-inside: avoid; }
tr:nth-child(even) td { background: #f8fafc; }
.prompt { font-family: "SFMono-Regular", Menlo, Consolas, monospace; font-size: 8.8pt; background: #0f2340; color: #e6eefc; border-radius: 3mm; padding: 4mm; white-space: pre-wrap; break-inside: avoid; margin: 2mm 0 4mm; }
.lines { height: var(--h, 40mm); background: repeating-linear-gradient(#fff 0 7.5mm, #d7dfea 7.5mm 7.8mm); border-radius: 2mm; }
.src { font-size: 8pt; color: #5b6b82; margin-top: 4mm; }
.toc { list-style: none; padding: 0; }
.toc li { display: flex; gap: 3mm; padding: 2.4mm 0; border-bottom: .25mm dashed #cbd5e1; font-size: 11pt; }
.toc li b { color: var(--a); min-width: 9mm; }
'''

def esc(t):
    return html.escape(str(t))

def documento(titulo, subtitulo, categoria, color, paginas, actualizado='Octubre 2026'):
    a = COLORES.get(color, color)
    portada = f'''<section class="page"><div class="cover">
  <div class="shape1"></div><div class="shape2"></div><div class="shape3"></div>
  <div class="kicker">{esc(categoria)}</div>
  <div><h1>{esc(titulo)}</h1><p class="sub">{esc(subtitulo)}</p></div>
  <div class="foot"><span>Actualizado: {esc(actualizado)}<br>Creado con IA y revisado por Casitres</span>
  <span class="logo"><img src="{LOGO_URI}" alt="casi3"></span></div></div></section>'''
    cuerpo = ''.join(f'<section class="page">{p}</section>' for p in paginas)
    return f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><title>{esc(titulo)}</title>
<style>:root{{--a:{a}}}{CSS}</style></head><body>{portada}{cuerpo}</body></html>'''

# Cabecera y pie de cada página (Chromium los pinta fuera del margen)
def cabecera():
    return f'<div style="width:100%;padding:0 16mm;display:flex;justify-content:space-between;align-items:center;font-size:7pt;color:#5b6b82;font-family:Arial"><img src="{LOGO_URI}" style="height:4.2mm"><span>casitres</span></div>'

def pie(titulo):
    return f'<div style="width:100%;padding:0 16mm;display:flex;justify-content:space-between;font-size:7pt;color:#5b6b82;font-family:Arial"><span>{esc(titulo)} · Creado con IA · casi3</span><span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span></div>'

# ── Gráficos SVG sencillos ──
def barras(datos, alto=55, color=None, sufijo=''):
    color = color or 'var(--a)'
    n = len(datos); w = 170; bw = w / n * .62; m = max(v for _, v in datos) or 1
    out = [f'<svg viewBox="0 0 {w} {alto+14}" style="width:100%;height:auto">']
    for i, (k, v) in enumerate(datos):
        x = i * w / n + (w / n - bw) / 2; h = v / m * alto
        out.append(f'<rect x="{x:.1f}" y="{alto-h+4:.1f}" width="{bw:.1f}" height="{h:.1f}" rx="1.5" fill="{color}"/>')
        out.append(f'<text x="{x+bw/2:.1f}" y="{alto-h+2.5:.1f}" font-size="3.4" text-anchor="middle" fill="#0f2340" font-weight="700">{esc(v)}{sufijo}</text>')
        out.append(f'<text x="{x+bw/2:.1f}" y="{alto+10:.1f}" font-size="3.3" text-anchor="middle" fill="#5b6b82">{esc(k)}</text>')
    out.append('</svg>')
    return ''.join(out)

def donut(partes, centro=''):
    import math
    tot = sum(v for _, v, _ in partes); a0 = -math.pi / 2; r, R = 26, 40; out = ['<svg viewBox="0 0 100 100" style="width:100%;height:auto">']
    for _, v, c in partes:
        a1 = a0 + 2 * math.pi * v / tot; big = 1 if a1 - a0 > math.pi else 0
        p = lambda rr, a: (50 + rr * math.cos(a), 50 + rr * math.sin(a))
        x0, y0 = p(R, a0); x1, y1 = p(R, a1); x2, y2 = p(r, a1); x3, y3 = p(r, a0)
        out.append(f'<path d="M{x0:.2f},{y0:.2f} A{R},{R} 0 {big} 1 {x1:.2f},{y1:.2f} L{x2:.2f},{y2:.2f} A{r},{r} 0 {big} 0 {x3:.2f},{y3:.2f}Z" fill="{c}"/>')
        a0 = a1
    out.append(f'<text x="50" y="53" font-size="9" font-weight="800" text-anchor="middle" fill="#0f2340">{esc(centro)}</text></svg>')
    return ''.join(out)
