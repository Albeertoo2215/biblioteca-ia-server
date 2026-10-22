"""Calendario 2027 imprimible. Festivos nacionales: Resolución de 8 de octubre de 2026 (BOE 13-10-2026)."""
import calendar, datetime as dt, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from plantilla import documento, esc
from construir import pdf

FEST = {dt.date(2027,1,1): 'Año Nuevo', dt.date(2027,1,6): 'Epifanía del Señor', dt.date(2027,3,26): 'Viernes Santo',
        dt.date(2027,5,1): 'Fiesta del Trabajo', dt.date(2027,10,12): 'Fiesta Nacional de España', dt.date(2027,11,1): 'Todos los Santos',
        dt.date(2027,12,6): 'Día de la Constitución', dt.date(2027,12,8): 'Inmaculada Concepción', dt.date(2027,12,25): 'Natividad del Señor'}
MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
DIAS = ['L','M','X','J','V','S','D']; DIAS_L = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
COLORES = ['#2f6fde','#6d5bd0','#1f8a7a','#d6456b','#c2410c','#b7791f','#2f6fde','#1f8a7a','#6d5bd0','#c2410c','#b7791f','#d6456b']
FRASES = ['Empieza poco y empieza ya.','Lo que no se apunta, se olvida.','La primavera premia a quien planifica.','Un hábito al mes basta.',
          'Revisa tus objetivos a mitad de año.','Medio año: mira lo que ya has hecho.','Descansar también es productivo.','Agosto: carga pilas.',
          'Septiembre es el otro enero.','Último trimestre: cierra lo pendiente.','Planifica la Navidad antes de que llegue.','Termina el año con una lista de logros.']

def mini(y, m, c):
    filas = calendar.Calendar().monthdatescalendar(y, m)
    h = f'<div class="mini"><b style="color:{c}">{MESES[m-1]}</b><table>' + '<tr>' + ''.join(f'<th>{d}</th>' for d in DIAS) + '</tr>'
    for f in filas:
        h += '<tr>' + ''.join(f'<td class="{"o" if d.month!=m else ""} {"f" if d in FEST and d.month==m else ""} {"w" if d.weekday()>4 else ""}">{d.day if d.month==m else ""}</td>' for d in f) + '</tr>'
    return h + '</table></div>'

def mes(m):
    c = COLORES[m-1]; filas = calendar.Calendar().monthdatescalendar(2027, m)
    fest = [(d, n) for d, n in FEST.items() if d.month == m]
    celdas = ''
    for f in filas:
        for d in f:
            cls = 'o' if d.month != m else ('f' if d in FEST else ('w' if d.weekday() > 4 else ''))
            et = f'<small>{esc(FEST[d])}</small>' if d in FEST and d.month == m else ''
            celdas += f'<div class="d {cls}"><span>{d.day}</span>{et}</div>'
    lista = ''.join(f'<li><b>{d.day} {MESES[m-1].lower()}</b> · {esc(n)} ({DIAS_L[d.weekday()].lower()})</li>' for d, n in fest) or '<li class="muted">Sin festivos nacionales este mes. Revisa los de tu comunidad y tu municipio.</li>'
    return f'''<div class="mhead" style="--c:{c}"><div><span class="mnum">{m:02d}</span><h2 class="mname">{MESES[m-1]} 2027</h2></div><p class="frase">{FRASES[m-1]}</p></div>
<div class="wk">{''.join(f'<span>{d}</span>' for d in DIAS_L)}</div><div class="month" style="--c:{c};--rows:{len(filas)}">{celdas}</div>
<div class="grid2" style="margin-top:4mm"><div class="card line"><h3>Festivos nacionales</h3><ul class="fl">{lista}</ul></div>
<div class="card line"><h3>Objetivos del mes</h3><div class="lines" style="--h:27mm"></div></div></div>'''

intro = f'''<h2>Cómo usar este calendario</h2>
<p class="lead">Un calendario para imprimir, con los festivos nacionales oficiales de 2027 ya marcados, una vista del año y una página por mes con espacio para tus objetivos.</p>
<div class="grid3" style="margin:4mm 0">
<div class="card"><div class="num">9</div><p>festivos nacionales en 2027, según el BOE del 13 de octubre de 2026.</p></div>
<div class="card"><div class="num">4</div><p>caen en lunes o viernes: fines de semana de tres días.</p></div>
<div class="card"><div class="num">12</div><p>páginas mensuales con objetivos y notas, más la vista anual.</p></div></div>
<h3>Los festivos nacionales de 2027</h3>
<table><tr><th>Fecha</th><th>Día</th><th>Festividad</th></tr>{''.join(f'<tr><td>{d.day} de {MESES[d.month-1].lower()}</td><td>{DIAS_L[d.weekday()]}</td><td>{esc(n)}</td></tr>' for d, n in sorted(FEST.items()))}</table>
<div class="callout"><b>Ojo con tu comunidad y tu municipio.</b> Cada comunidad autónoma añade sus propios festivos (por ejemplo, el Jueves Santo 25 de marzo en casi todas, o el lunes 16 de agosto en varias, porque el 15 cae en domingo) y cada ayuntamiento fija dos fiestas locales. Consúltalas en el boletín oficial de tu comunidad y apúntalas en las páginas de cada mes.</div>
<h3>Fines de semana largos en 2027</h3>
<p>Viernes 1 de enero, viernes 26 de marzo (cuatro días con el Jueves Santo en muchas comunidades), lunes 1 de noviembre y lunes 6 de diciembre. Con un día libre: lunes 11 de octubre o martes 7 de diciembre.</p>
<p class="src">Fuente: Resolución de 8 de octubre de 2026, de la Dirección General de Trabajo, por la que se publica la relación de fiestas laborales para el año 2027 (BOE, 13 de octubre de 2026).</p>'''

anual = '<h2>2027 de un vistazo</h2><div class="year">' + ''.join(mini(2027, m, COLORES[m-1]) for m in range(1, 13)) + '</div><p class="src"><span class="dot"></span> Festivo nacional · los fines de semana en gris.</p>'
cierre = '''<h2>Mi 2027</h2><p class="lead">Escribe a principios de año qué quieres conseguir, y vuelve aquí en diciembre.</p>
<div class="grid2"><div class="card line"><h3>Quiero conseguir</h3><div class="lines" style="--h:62mm"></div></div><div class="card line"><h3>Quiero dejar de</h3><div class="lines" style="--h:62mm"></div></div>
<div class="card line"><h3>Viajes y escapadas</h3><div class="lines" style="--h:62mm"></div></div><div class="card line"><h3>Lo mejor del año (diciembre)</h3><div class="lines" style="--h:62mm"></div></div></div>'''

EXTRA = '''<style>
.page:nth-of-type(2) td{padding:1.3mm 3mm}.page:nth-of-type(2) .callout{margin:3mm 0}
.year{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm 6mm}.mini b{font-size:10pt}.mini table{font-size:7.5pt;margin-top:1mm}.mini th{background:none;color:#5b6b82;padding:.6mm;text-align:center;font-weight:600}
.mini td{text-align:center;padding:.8mm;border:0;background:none!important}.mini td.w{color:#94a3b8}.mini td.f{background:var(--a)!important;color:#fff;border-radius:50%;font-weight:700}
.dot{display:inline-block;width:3mm;height:3mm;border-radius:50%;background:var(--a);vertical-align:-.4mm}
.mhead{display:flex;justify-content:space-between;align-items:end;border-bottom:1mm solid var(--c);padding-bottom:3mm;margin-bottom:3mm}.mnum{font-size:44pt;font-weight:800;color:var(--c);line-height:.9;letter-spacing:-.04em}
.mname{font-size:22pt;margin:0}.frase{color:#5b6b82;font-style:italic;max-width:70mm;text-align:right;margin:0}
.wk{display:grid;grid-template-columns:repeat(7,1fr);font-size:8pt;font-weight:700;color:#5b6b82;padding:0 1mm 1.5mm}
.month{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:calc(150mm / var(--rows));gap:1.2mm}
.d{border-radius:2mm;background:#f3f6fa;padding:1.5mm 2mm;font-size:10pt;font-weight:700;display:flex;flex-direction:column;justify-content:space-between}
.d.w{background:#e9eef5;color:#5b6b82}.d.o{background:none;color:transparent}.d.f{background:var(--c);color:#fff}.d small{font-size:6.5pt;font-weight:600;line-height:1.15}
.fl{margin:0;padding-left:4mm;font-size:9.5pt}
</style>'''
html = documento('Calendario 2027', 'Para imprimir. Con los festivos nacionales oficiales, vista anual y una página por mes.', 'Imprimibles · casi3', 'azul',
                 [intro, anual] + [mes(m) for m in range(1, 13)] + [cierre]).replace('</head>', EXTRA + '</head>')
pdf(html, os.path.join(os.path.dirname(__file__), '..', '..', 'dist', 'Calendario 2027 para imprimir - casi3.pdf'), 'Calendario 2027')
