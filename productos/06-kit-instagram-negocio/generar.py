"""Kit «Lanza tu negocio en Instagram»: estrategia, 30 días de contenido, textos y medición."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from plantilla import documento, esc, donut
from construir import pdf
DIST = os.path.join(os.path.dirname(__file__), '..', '..', 'dist')
TIPOS = {'Enseña': '#2f6fde', 'Demuestra': '#1f8a7a', 'Conecta': '#d6456b', 'Vende': '#c2410c'}
DIAS = [('Enseña','Reel','El error más común de tus clientes y cómo evitarlo'),('Conecta','Carrusel','Quién está detrás del negocio y por qué empezaste'),('Demuestra','Reel','Antes y después de un trabajo real'),
 ('Enseña','Carrusel','5 preguntas que te hacen siempre, respondidas'),('Vende','Historia','Tu producto o servicio estrella: qué incluye y precio'),('Conecta','Reel','Un día normal de trabajo en 30 segundos'),
 ('Enseña','Carrusel','Mito frente a realidad de tu sector'),('Demuestra','Publicación','Opinión de un cliente (con su permiso)'),('Enseña','Reel','Truco rápido que se puede aplicar hoy'),
 ('Vende','Carrusel','Para quién es y para quién no es tu servicio'),('Conecta','Historia','Encuesta: qué quieren que expliques'),('Demuestra','Reel','Proceso paso a paso de un encargo'),
 ('Enseña','Carrusel','Guía para elegir bien en tu sector'),('Vende','Reel','Oferta de lanzamiento con fecha de fin real'),('Conecta','Carrusel','Tus valores: lo que nunca harás'),
 ('Enseña','Reel','Responde a la pregunta más votada de la encuesta'),('Demuestra','Carrusel','Caso real con cifras: problema, solución, resultado'),('Enseña','Reel','Qué mirar antes de contratar a alguien como tú'),
 ('Vende','Historia','Preguntas frecuentes sobre cómo comprar o reservar'),('Conecta','Reel','Fallo que cometiste al empezar y qué aprendiste'),('Enseña','Carrusel','Checklist descargable de tu especialidad'),
 ('Demuestra','Reel','Reacción de un cliente al recibir el trabajo'),('Enseña','Carrusel','Comparativa: opción barata frente a opción buena'),('Vende','Reel','Recordatorio: quedan pocos días de la oferta'),
 ('Conecta','Historia','Pregúntame lo que quieras'),('Enseña','Reel','Herramienta que usas cada día'),('Demuestra','Carrusel','Detrás de cámaras de un proyecto'),
 ('Enseña','Carrusel','Resumen del mes: lo más útil que has compartido'),('Vende','Publicación','Cómo trabajar contigo: pasos y contacto'),('Conecta','Reel','Gracias: lo que ha pasado este mes')]
p1 = f'''<h2>Antes de publicar nada</h2><p class="lead">La mayoría de cuentas de negocio fallan por lo mismo: publican lo que les apetece, no lo que su cliente necesita. Este kit te da un mes completo planificado con un reparto probado.</p>
<div class="grid2" style="align-items:center"><div>{donut([(k, v, TIPOS[k]) for k, v in [('Enseña', 40), ('Demuestra', 20), ('Conecta', 20), ('Vende', 20)]], '30 días')}</div>
<div>{''.join(f'<p><b style="color:{c}">{k}</b> · {d}</p>' for (k, c), d in zip(TIPOS.items(), ['Contenido útil que se guarda y se comparte. Te posiciona como experto.', 'Pruebas: trabajos, casos y opiniones reales.', 'La persona detrás. La gente compra a quien conoce.', 'Oferta clara con precio y cómo comprar. Sin vergüenza.']))}</div></div>
<h3>Tu cliente ideal en 4 respuestas</h3><div class="grid2"><div class="card line"><b>¿Quién es?</b> (edad, situación, dónde vive)<div class="lines" style="--h:16mm"></div></div><div class="card line"><b>¿Qué problema tiene?</b><div class="lines" style="--h:16mm"></div></div><div class="card line"><b>¿Qué ha probado ya?</b><div class="lines" style="--h:16mm"></div></div><div class="card line"><b>¿Qué le frena a comprar?</b><div class="lines" style="--h:16mm"></div></div></div>'''
cal = ''.join(f'<div class="dia" style="--c:{TIPOS[t]}"><span class="n">{i+1}</span><span class="t">{t} · {f}</span><p>{esc(x)}</p></div>' for i, (t, f, x) in enumerate(DIAS))
p2 = f'<h2>Calendario de 30 días</h2><p class="lead">Una idea por día, con el formato recomendado. Adáptala a tu negocio en 2 minutos.</p><div class="cal30">{cal}</div>'
p3 = '''<h2>Perfil que convierte</h2><div class="grid2"><div class="card"><h3>Nombre</h3><p>El campo «Nombre» aparece en las búsquedas: pon tu marca y lo que haces. Ejemplo: <b>Marta Ruiz · Fisioterapia deportiva</b>.</p></div>
<div class="card"><h3>Biografía (150 caracteres)</h3><p>Qué haces, para quién y qué resultado. Una línea de prueba y una llamada a la acción.</p><div class="prompt">Ayudo a [quién] a [resultado] sin [problema].
+[dato de prueba: años, clientes, premios]
Reserva tu cita aquí</div></div>
<div class="card"><h3>Destacadas</h3><p>Cuatro como mucho: Servicios, Precios, Opiniones, Cómo trabajo. Son tu escaparate fijo.</p></div><div class="card"><h3>Enlace</h3><p>Un único enlace a donde se compra o reserva. Si necesitas varios, una página sencilla con botones.</p></div></div>
<h2 style="margin-top:6mm">Plantillas de texto</h2>
<h3>Para enseñar</h3><div class="prompt">Si [haces X], deja de hacerlo.
Es el error que más veo en [tipo de cliente].
Haz esto en su lugar: [3 pasos cortos].
Guárdalo para cuando lo necesites.</div>
<h3>Para vender</h3><div class="prompt">[Servicio] para [quién] que quiere [resultado].
Incluye: [3 cosas].
Precio: [precio]. Plazas este mes: [número real].
Escríbeme «QUIERO» por mensaje y te cuento.</div>
<h3>Para conectar</h3><div class="prompt">Hace [tiempo] [situación difícil].
Lo que aprendí: [lección].
Por eso hoy [cómo trabajas].
¿Te ha pasado algo parecido?</div>'''
p4 = '''<h2>Mide lo que importa</h2><p class="lead">Los «me gusta» engañan. Estas son las cifras que dicen si Instagram te trae clientes.</p>
<table><tr><th>Métrica</th><th>Qué te dice</th><th>Dónde verla</th></tr><tr><td>Guardados</td><td>Si tu contenido es útil de verdad.</td><td>Estadísticas de cada publicación</td></tr>
<tr><td>Compartidos</td><td>Si llegas a gente nueva.</td><td>Estadísticas de cada publicación</td></tr><tr><td>Visitas al perfil</td><td>Si el contenido despierta interés por ti.</td><td>Panel profesional</td></tr>
<tr><td>Clics en el enlace</td><td>Intención de compra.</td><td>Panel profesional</td></tr><tr><td>Mensajes recibidos</td><td>Clientes potenciales reales.</td><td>Tu bandeja</td></tr></table>
<h3>Tu registro semanal</h3><table><tr><th>Semana</th><th>Seguidores</th><th>Visitas perfil</th><th>Clics enlace</th><th>Mensajes</th><th>Ventas</th></tr><tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>4</td><td></td><td></td><td></td><td></td><td></td></tr></table>
<div class="callout"><b>La regla de las 3 semanas:</b> no cambies de estrategia antes de 3 semanas publicando con constancia. Los resultados en redes llegan acumulados, no al día siguiente.</div>'''
EXTRA = '<style>.cal30{display:grid;grid-template-columns:repeat(3,1fr);gap:2.4mm}.dia{border-radius:2.5mm;background:#f3f6fa;border-top:1.2mm solid var(--c);padding:2mm 3mm;break-inside:avoid}.dia .n{font-weight:800;font-size:13pt;color:var(--c);margin-right:2mm}.dia .t{font-size:7.5pt;font-weight:700;color:#5b6b82}.dia p{margin:1mm 0 0;font-size:8.6pt;line-height:1.3}</style>'
html = documento('Lanza tu negocio en Instagram', 'Kit completo: cliente ideal, 30 días de contenido, perfil que convierte, plantillas de texto y medición.', 'Kits hechos · casi3', 'rosa', [p1, p2, p3, p4]).replace('</head>', EXTRA + '</head>')
pdf(html, os.path.join(DIST, 'Kit Instagram para tu negocio - casi3.pdf'), 'Lanza tu negocio en Instagram')
