"""Pack de prompts para buscar trabajo con ChatGPT o Claude."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from plantilla import documento, esc
from construir import pdf
DIST = os.path.join(os.path.dirname(__file__), '..', '..', 'dist')

BLOQUES = [
 ('Tu punto de partida', 'Antes de escribir nada, que la IA entienda quién eres.', [
  ('Inventario de logros', 'Te voy a contar mi experiencia laboral de forma desordenada. Conviértela en una lista de logros concretos, cada uno con: qué hice, cómo lo hice y qué resultado tuvo (con números si los menciono). Si falta un resultado, pregúntame por él en vez de inventarlo.\n\n[cuenta aquí tus trabajos, tareas y proyectos]'),
  ('Encontrar tu perfil', 'Con estos logros, dime 3 perfiles profesionales a los que podría optar en España, de más a menos encaje. Para cada uno: títulos de puesto que se usan en las ofertas, qué me sobra, qué me falta y cómo cubrir lo que falta en 3 meses.\n\n[pega tu lista de logros]'),
  ('Palabras clave del sector', 'Te pego 3 ofertas reales del puesto que busco. Extrae las 15 palabras clave y competencias que más se repiten, ordenadas por frecuencia, y marca cuáles aparecen ya en mi CV.\n\nOfertas: [pega las ofertas]\nMi CV: [pega tu CV]')]),
 ('Currículum', 'Un CV que pase el filtro automático y que un humano lea en 30 segundos.', [
  ('Reescribir el CV para una oferta', 'Actúa como reclutador del sector [sector] en España. Reescribe mi CV para esta oferta concreta: mismo formato de texto, máximo 2 páginas, verbos de acción, logros con cifras y las palabras clave de la oferta donde sean verdad. No añadas experiencia ni títulos que no tengo. Señala con [COMPROBAR] cualquier dato que debas confirmar.\n\nOferta: [pega la oferta]\nCV: [pega tu CV]'),
  ('Resumen profesional', 'Escribe 3 versiones del resumen de cabecera de mi CV (máximo 3 líneas cada una): una sobria, una orientada a resultados y una para cambio de sector. Sin adjetivos vacíos como «proactivo» o «apasionado».\n\n[pega tu CV]'),
  ('Revisión de filtro ATS', 'Revisa mi CV como lo haría un sistema automático de selección: dime qué títulos de sección no reconocería, qué formatos dan problemas (tablas, columnas, iconos) y qué palabras de la oferta faltan. Dame la lista de cambios ordenada por importancia.\n\nOferta: [pega]\nCV: [pega]')]),
 ('LinkedIn', 'Que te encuentren los reclutadores que buscan, no solo los que publican.', [
  ('Titular', 'Dame 5 titulares de LinkedIn (máx. 220 caracteres) para alguien con este perfil. Deben incluir el puesto que busco y 2 o 3 palabras clave que los reclutadores escriben en el buscador.\n\n[pega tu resumen]'),
  ('Sección «Acerca de»', 'Escribe mi sección «Acerca de» de LinkedIn en primera persona, 1.200 caracteres como máximo: qué hago, en qué soy bueno con 2 ejemplos con cifras, qué busco y cómo contactarme. Tono cercano y profesional.'),
  ('Mensaje a un reclutador', 'Escribe un mensaje de conexión de LinkedIn (máx. 300 caracteres) para un reclutador de [empresa]. Menciona el puesto, un dato concreto de mi experiencia y una pregunta fácil de responder. Sin peloteo.')]),
 ('Carta y candidatura', 'Para las ofertas que de verdad quieres.', [
  ('Carta de presentación corta', 'Escribe una carta de presentación de 180 palabras como máximo para esta oferta. Estructura: por qué esta empresa (usa algo concreto de la oferta o de su web), 2 logros míos que resuelven lo que piden, y cierre pidiendo una entrevista. Nada de frases hechas.\n\nOferta: [pega]\nMis logros: [pega]'),
  ('Email de candidatura espontánea', 'Escribe un email breve para enviar mi candidatura a [empresa] sin oferta publicada. Asunto incluido. Muestra que conozco la empresa y propone una llamada de 15 minutos.'),
  ('Seguimiento tras enviar el CV', 'Escribe un email de seguimiento educado para enviar 7 días después de presentar mi candidatura a [puesto] en [empresa], sin sonar insistente.')]),
 ('Entrevista', 'Ensaya con la IA hasta que las respuestas te salgan solas.', [
  ('Simulación de entrevista', 'Hazme una entrevista para [puesto] en [empresa]. Hazme una pregunta cada vez y espera mi respuesta. Después de cada respuesta, puntúala del 1 al 10 y dime cómo mejorarla con el método STAR (situación, tarea, acción, resultado). Al final, un resumen de mis puntos fuertes y débiles.'),
  ('Preguntas difíciles', 'Dame las 10 preguntas más difíciles que me pueden hacer para este puesto teniendo en cuenta mi CV (huecos, cambios de sector, falta de experiencia en algo que piden). Para cada una, una respuesta modelo honesta que yo pueda adaptar.\n\nCV: [pega]\nOferta: [pega]'),
  ('Preguntas para hacer tú', 'Dame 8 preguntas inteligentes para hacer al final de la entrevista que demuestren interés y me den información útil sobre el día a día, el equipo y cómo se mide el éxito en el puesto.')]),
 ('Oferta y salario', 'El momento en que más dinero se gana o se pierde.', [
  ('Rango salarial', 'Ayúdame a preparar la conversación salarial para [puesto] en [ciudad]. Dime qué fuentes públicas consultar para conocer el rango (portales de empleo con salarios, convenio colectivo del sector, informes de consultoras) y cómo calcular el bruto anual que necesito a partir del neto mensual que quiero. No me des cifras inventadas.'),
  ('Responder a «¿cuánto quieres cobrar?»', 'Escribe 3 formas de responder a «¿cuáles son tus expectativas salariales?» en una entrevista: una que da un rango, una que devuelve la pregunta con educación y una para cuando ya tengo otra oferta.'),
  ('Negociar una oferta', 'Tengo esta oferta: [condiciones]. Escribe un email para negociar [mejor salario / teletrabajo / fecha de incorporación], agradeciendo la oferta, argumentando con mi valor y proponiendo algo concreto.')])]

def bloque(i, titulo, desc, prompts):
    h = f'<div style="display:flex;align-items:baseline;gap:4mm"><span class="num">{i:02d}</span><h2 style="margin:0">{esc(titulo)}</h2></div><p class="lead" style="margin:2mm 0 5mm">{esc(desc)}</p>'
    for nom, txt in prompts:
        h += f'<h3>{esc(nom)}</h3><div class="prompt">{esc(txt)}</div>'
    return h

indice = '<h2>Qué hay dentro</h2><p class="lead">18 instrucciones probadas, ordenadas por fases de la búsqueda. Copia, cambia lo que está entre corchetes y pega en ChatGPT, Claude o Gemini.</p><ul class="toc">' + ''.join(f'<li><b>{i+1:02d}</b>{esc(t)}<span class="muted" style="margin-left:auto">{len(p)} instrucciones</span></li>' for i, (t, _, p) in enumerate(BLOQUES)) + '</ul>' + '''
<h3>Tres reglas para que funcionen</h3><div class="grid3"><div class="card"><h3>Dale contexto</h3><p>Cuanto más le pegues (oferta completa, tu CV, tus logros), mejor resultado. Sin contexto, todo sale genérico.</p></div>
<div class="card"><h3>Pide que pregunte</h3><p>Añade «si te falta información, pregúntame antes de escribir». Evita que rellene con inventos.</p></div>
<div class="card"><h3>Revisa siempre</h3><p>Lee todo antes de enviarlo. Nunca pongas en tu CV algo que no podrías defender en una entrevista.</p></div></div>
<div class="callout"><b>Privacidad:</b> antes de pegar tu CV, quita DNI, dirección completa y teléfono. La IA no los necesita para ayudarte.</div>'''
html = documento('Prompts para encontrar trabajo', '18 instrucciones para ChatGPT y Claude: CV, LinkedIn, carta, entrevista y salario.', 'Packs de IA · casi3', 'violeta',
                 [indice] + [bloque(i + 1, *b) for i, b in enumerate(BLOQUES)])
pdf(html, os.path.join(DIST, 'Prompts para encontrar trabajo - casi3.pdf'), 'Prompts para encontrar trabajo')
