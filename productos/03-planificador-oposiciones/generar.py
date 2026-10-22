"""Planificador de oposiciones: hoja con temario y repasos espaciados + método en PDF."""
import os, sys, datetime as dt
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from openpyxl import Workbook
from openpyxl.chart import LineChart, BarChart, Reference
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import CellIsRule, DataBarRule, FormulaRule
from openpyxl.styles import PatternFill, Font, Alignment
from excel import *
from plantilla import documento, barras
from construir import pdf
DIST = os.path.join(os.path.dirname(__file__), '..', '..', 'dist')
wb = Workbook()
ws = wb.active; ws.title = 'Empieza aquí'
cabecera(ws, 'Planificador de oposiciones', 'Temario, repasos espaciados, simulacros y progreso en un solo archivo.', {'A': 3, 'B': 26, 'C': 80})
for i, (a, b) in enumerate([('1. Temario', 'Escribe tus temas (hasta 120). Pon la fecha en que lo estudias por primera vez.'),
    ('2. Repasos', 'La hoja calcula 5 repasos: a 1, 3, 7, 16 y 35 días. Las fechas de hoy se pintan en azul y las atrasadas en rojo.'),
    ('3. Estado', 'Marca cada tema: Sin empezar, Estudiado, Repasando o Dominado.'),
    ('4. Hoy toca', 'La hoja «Hoy toca» te dice cuántos repasos tienes pendientes hoy.'),
    ('5. Simulacros', 'Apunta la nota de cada examen de prueba. El gráfico enseña si subes.'),
    ('6. Semana', 'Reparte tus horas por días. Ajusta el objetivo semanal arriba.')]):
    r = 8 + i * 2; celda(ws, f'B{r}', a, F_BOLD); celda(ws, f'C{r}', b); ws[f'C{r}'].alignment = Alignment(wrap_text=True)

t = wb.create_sheet('Temario')
cabecera(t, 'Temario y repasos', 'Repaso espaciado: cada repaso llega justo cuando empiezas a olvidar.', {'A': 3, 'B': 7, 'C': 40, 'D': 15, 'E': 13, 'F': 12, 'G': 12, 'H': 12, 'I': 12, 'J': 12, 'K': 10})
encabezados(t, 7, 2, ['Nº', 'Tema', 'Estado', 'Estudiado el', 'Repaso 1 (+1)', 'Repaso 2 (+3)', 'Repaso 3 (+7)', 'Repaso 4 (+16)', 'Repaso 5 (+35)', 'Dificultad'])
dv = DataValidation(type='list', formula1='"Sin empezar,Estudiado,Repasando,Dominado"'); t.add_data_validation(dv)
dv2 = DataValidation(type='list', formula1='"Fácil,Media,Difícil"'); t.add_data_validation(dv2)
N = 120; hoy = dt.date.today()
for i in range(N):
    r = 8 + i
    celda(t, f'B{r}', i + 1, F_BOLD); celda(t, f'C{r}', f'Tema {i+1}' if i < 10 else None, entrada=True)
    celda(t, f'D{r}', 'Sin empezar', entrada=True); dv.add(f'D{r}')
    celda(t, f'E{r}', None, fmt='dd/mm/yy', entrada=True)
    for j, (col, dias) in enumerate(zip('FGHIJ', (1, 3, 7, 16, 35))):
        celda(t, f'{col}{r}', f'=IF($E{r}="","",$E{r}+{dias})', fmt='dd/mm/yy')
    celda(t, f'K{r}', None, entrada=True); dv2.add(f'K{r}')
rng = f'F8:J{7+N}'
t.conditional_formatting.add(rng, FormulaRule(formula=['AND(F8<>"",F8=TODAY())'], fill=PatternFill('solid', fgColor='2F6FDE'), font=Font(color='FFFFFF', bold=True)))
t.conditional_formatting.add(rng, FormulaRule(formula=['AND(F8<>"",F8<TODAY(),$D8<>"Dominado")'], fill=PatternFill('solid', fgColor='FDECEA'), font=Font(color='C0261B')))
t.conditional_formatting.add(f'D8:D{7+N}', CellIsRule(operator='equal', formula=['"Dominado"'], fill=PatternFill('solid', fgColor='E3F4EC'), font=Font(color='1F8A7A', bold=True)))
t.freeze_panes = 'D8'

h = wb.create_sheet('Hoy toca')
cabecera(h, 'Hoy toca', 'Lo que tienes pendiente según tus fechas.', {'A': 3, 'B': 34, 'C': 16})
R = f'Temario!$F$8:$J${7+N}'
filas = [('Repasos para hoy', f'=COUNTIF({R},TODAY())'), ('Repasos atrasados', f'=SUMPRODUCT(({R}<>"")*({R}<TODAY())*(Temario!$D$8:$D${7+N}<>"Dominado"))'),
         ('Temas en el temario', f'=COUNTA(Temario!$C$8:$C${7+N})'), ('Temas dominados', f'=COUNTIF(Temario!$D$8:$D${7+N},"Dominado")'),
         ('Temas sin empezar', f'=COUNTIFS(Temario!$D$8:$D${7+N},"Sin empezar",Temario!$C$8:$C${7+N},"<>")'), ('Progreso del temario', '=IF(C10=0,0,C11/C10)')]
for i, (k, f) in enumerate(filas):
    r = 8 + i; celda(h, f'B{r}', k, F_BOLD); c = celda(h, f'C{r}', f, Font(name='Arial', size=14, bold=True, color=AZUL)); h.row_dimensions[r].height = 26
h['C13'].number_format = '0%'
h.conditional_formatting.add('C13', DataBarRule(start_type='num', start_value=0, end_type='num', end_value=1, color='1F8A7A'))

s = wb.create_sheet('Simulacros')
cabecera(s, 'Simulacros', 'Una nota por examen de prueba. Lo que importa es la tendencia.', {'A': 3, 'B': 8, 'C': 14, 'D': 12, 'E': 12, 'F': 12, 'G': 12, 'H': 30})
encabezados(s, 7, 2, ['Nº', 'Fecha', 'Aciertos', 'Fallos', 'En blanco', 'Nota (0-10)', 'Notas'])
s['B5'] = 'La nota usa la penalización más habitual (cada fallo resta 1/3 de acierto). Cambia el 3 de la fórmula si tu convocatoria es distinta.'; s['B5'].font = F_PIE
for i in range(30):
    r = 8 + i
    celda(s, f'B{r}', i + 1, F_BOLD); celda(s, f'C{r}', None, fmt='dd/mm/yy', entrada=True)
    for col in 'DEF': celda(s, f'{col}{r}', None, entrada=True)
    celda(s, f'G{r}', f'=IF(D{r}="","",ROUND(MAX(0,(D{r}-E{r}/3)/(D{r}+E{r}+F{r})*10),2))', fmt='0.00'); celda(s, f'H{r}', None, entrada=True)
lc = LineChart(); lc.title = 'Evolución de la nota'; lc.height = 8; lc.width = 18; lc.y_axis.scaling.min = 0; lc.y_axis.scaling.max = 10
lc.add_data(Reference(s, min_col=7, min_row=7, max_row=37), titles_from_data=True); lc.set_categories(Reference(s, min_col=2, min_row=8, max_row=37))
s.add_chart(lc, 'J7')

w = wb.create_sheet('Semana')
cabecera(w, 'Mi semana', 'Horas previstas y reales. Constancia antes que maratones.', {'A': 3, 'B': 14, 'C': 12, 'D': 12, 'E': 34})
celda(w, 'B7', 'Objetivo semanal (h)', F_BOLD); celda(w, 'C7', 25, entrada=True)
encabezados(w, 9, 2, ['Día', 'Previstas', 'Reales', 'Qué toca'])
for i, d in enumerate(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']):
    r = 10 + i; celda(w, f'B{r}', d, F_BOLD); celda(w, f'C{r}', 4 if i < 5 else (5 if i == 5 else 0), entrada=True); celda(w, f'D{r}', None, entrada=True); celda(w, f'E{r}', None, entrada=True)
celda(w, 'B17', 'Total', F_BOLD); celda(w, 'C17', '=SUM(C10:C16)', F_BOLD); celda(w, 'D17', '=SUM(D10:D16)', F_BOLD)
celda(w, 'B18', 'Cumplido', F_BOLD); celda(w, 'D18', '=IF($C$7=0,0,D17/$C$7)', F_BOLD, '0%')
bc = BarChart(); bc.title = 'Horas por día'; bc.height = 7; bc.width = 14
bc.add_data(Reference(w, min_col=3, max_col=4, min_row=9, max_row=16), titles_from_data=True); bc.set_categories(Reference(w, min_col=2, min_row=10, max_row=16))
bc.series[0].graphicalProperties.solidFill = 'C9D8F5'; bc.series[1].graphicalProperties.solidFill = AZUL
w.add_chart(bc, 'G9')
for x in wb.worksheets: x.sheet_properties.tabColor = AZUL
wb.save(os.path.join(DIST, 'Planificador de oposiciones - casi3.xlsx')); print('XLSX ok')

curva = barras([('Día 0', 100), ('Día 1', 58), ('Día 3', 44), ('Día 7', 36), ('Día 16', 30), ('Día 35', 25)], sufijo=' %')
p1 = f'''<h2>Estudiar no es leer muchas veces</h2><p class="lead">Lo que separa a quien aprueba no son las horas, es cómo se reparten. Este método combina tres técnicas con mucha evidencia detrás: repaso espaciado, recuerdo activo y simulacros.</p>
<div class="grid2" style="align-items:center"><div class="card line"><h3>Sin repasar, se olvida rápido</h3>{curva}<p class="src">Ilustración de la curva del olvido descrita por Hermann Ebbinghaus (1885). Los porcentajes son orientativos: varían según la persona y el tema.</p></div>
<div><h3>Con repasos, la curva se aplana</h3><p>Cada repaso, hecho justo cuando empiezas a olvidar, hace que el recuerdo dure más. Por eso la hoja programa repasos a <b>1, 3, 7, 16 y 35 días</b>.</p><div class="callout"><b>La regla:</b> nunca estudies un tema nuevo si tienes repasos atrasados. Primero lo que toca, luego lo nuevo.</div></div></div>'''
p2 = '''<h2>Las tres técnicas</h2><div class="grid3">
<div class="card"><span class="tag">1</span><h3>Recuerdo activo</h3><p>Cierra el temario e intenta escribir el tema de memoria: esquema, artículos clave, fechas. Luego compara. Releer da sensación de saber; recordar es lo que fija.</p></div>
<div class="card"><span class="tag">2</span><h3>Repaso espaciado</h3><p>Repasa cada tema en las fechas que calcula la hoja. Los repasos son cortos (15 a 30 minutos): esquema y preguntas, no relectura completa.</p></div>
<div class="card"><span class="tag">3</span><h3>Simulacros</h3><p>Un examen completo cada semana o cada dos, cronometrado y con la penalización real. Apunta la nota: la tendencia te dice si el método funciona.</p></div></div>
<h3>Una semana tipo (25 horas)</h3><table><tr><th>Día</th><th>Mañana</th><th>Tarde</th></tr>
<tr><td>Lunes a viernes</td><td>Repasos del día (1 h)</td><td>Tema nuevo con recuerdo activo (3 h)</td></tr>
<tr><td>Sábado</td><td>Simulacro cronometrado</td><td>Corregir errores y anotarlos en el tema</td></tr><tr><td>Domingo</td><td colspan="2">Descanso. Dormir bien es parte del estudio: la memoria se consolida durmiendo.</td></tr></table>'''
p3 = '''<h2>Usar la IA sin que te engañe</h2><p class="lead">ChatGPT, Claude y similares ayudan mucho a estudiar, pero se equivocan con datos exactos. Úsalos para practicar, nunca como fuente del temario.</p>
<div class="grid2"><div class="card"><h3>Para lo que sí sirve</h3><ul class="check"><li>Hacerte preguntas de test sobre un tema que le pegas tú.</li><li>Explicarte un concepto de otra forma si no lo entiendes.</li><li>Convertir tu tema en un esquema o en tarjetas de repaso.</li><li>Corregir un desarrollo escrito y señalar lo que falta.</li></ul></div>
<div class="card"><h3>Para lo que no</h3><ul class="check"><li>Números de artículos, fechas, plazos y cuantías: compruébalos siempre en el BOE o en tu temario oficial.</li><li>Cambios legales recientes: puede no conocerlos.</li><li>Sustituir el temario: inventa con seguridad.</li></ul></div></div>
<h3>Instrucción para generar test</h3><div class="prompt">Te paso el tema 12 de mi oposición. Hazme 15 preguntas tipo test de 4 opciones con una sola correcta, del mismo nivel que un examen oficial. No inventes nada que no esté en el texto. Al final dame las soluciones con la frase del tema que justifica cada una.

[pega aquí el texto de tu tema]</div>
<div class="callout warn"><b>Siempre:</b> la convocatoria oficial (BOE o boletín de tu comunidad) manda sobre cualquier otra fuente: temario, penalización por fallos, número de preguntas y fechas.</div>'''
html = documento('Planificador de oposiciones', 'Método de estudio con repaso espaciado, simulacros e IA bien usada. Acompaña a la hoja de cálculo.', 'Estudio y oposiciones · casi3', 'azul', [p1, p2, p3])
pdf(html, os.path.join(DIST, 'Planificador de oposiciones - metodo de estudio - casi3.pdf'), 'Planificador de oposiciones')
