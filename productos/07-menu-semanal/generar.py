"""Planificador de menú semanal imprimible con lista de la compra y batch cooking."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from plantilla import documento, esc
from construir import pdf
DIST = os.path.join(os.path.dirname(__file__), '..', '..', 'dist')
DIAS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']
SECC = ['Frutas y verduras','Carne y pescado','Lácteos y huevos','Despensa','Congelados','Panadería','Limpieza y hogar','Otros']
plato = '''<h2>El plato equilibrado</h2><p class="lead">La forma más sencilla de planificar sin contar calorías: llena el plato así en comidas y cenas.</p>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 100 100" style="width:100%"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#e1e7ef" stroke-width="2"/>
<path d="M50 50 L50 6 A44 44 0 0 1 50 94 Z" fill="#1f8a7a"/><path d="M50 50 L50 94 A44 44 0 0 1 6 50 Z" fill="#2f6fde"/><path d="M50 50 L6 50 A44 44 0 0 1 50 6 Z" fill="#c2410c"/>
<text x="72" y="52" font-size="6" fill="#fff" font-weight="700" text-anchor="middle">Verduras</text><text x="72" y="59" font-size="4.5" fill="#fff" text-anchor="middle">la mitad</text>
<text x="31" y="72" font-size="5.5" fill="#fff" font-weight="700" text-anchor="middle">Proteína</text><text x="30" y="32" font-size="5.5" fill="#fff" font-weight="700" text-anchor="middle">Cereales</text></svg>
<div><p><b style="color:#1f8a7a">Medio plato de verduras y hortalizas</b>, crudas o cocinadas.</p><p><b style="color:#2f6fde">Un cuarto de proteína:</b> legumbres, pescado, huevo, carne (mejor blanca) o tofu.</p><p><b style="color:#c2410c">Un cuarto de cereales integrales o patata:</b> arroz, pasta, pan o patata.</p>
<p>Agua como bebida, aceite de oliva para cocinar y fruta de postre.</p><p class="src">Basado en el «plato saludable» de la Escuela de Salud Pública de Harvard, el mismo modelo que recomienda la Agencia Española de Seguridad Alimentaria y Nutrición (AESAN). Información general, no es una dieta personalizada.</p></div></div>
<h3>Cómo usar este planificador</h3><ol class="steps"><li><b>Domingo, 10 minutos:</b> rellena el menú de la semana pensando primero en lo que ya tienes en la nevera.</li><li><b>Lista de la compra:</b> pasa los ingredientes a la lista, ordenada por pasillos.</li><li><b>Batch cooking:</b> cocina de una vez las bases (legumbre, cereal, verdura asada, salsa) para toda la semana.</li></ol>'''
def menu():
    filas = ''.join(f'<tr><td class="dd">{d}</td><td></td><td></td></tr>' for d in DIAS)
    return f'<h2>Menú de la semana</h2><p class="muted">Semana del ____ al ____</p><table class="menu"><tr><th style="width:18%">Día</th><th>Comida</th><th>Cena</th></tr>{filas}</table><div class="grid2" style="margin-top:4mm"><div class="card line"><b>Desayunos y meriendas</b><div class="lines" style="--h:22mm"></div></div><div class="card line"><b>Lo que hay que gastar ya</b><div class="lines" style="--h:22mm"></div></div></div>'
def lista():
    return '<h2>Lista de la compra</h2><p class="muted">Ordenada por pasillos para no dar vueltas.</p><div class="grid2">' + ''.join(f'<div class="card line"><b>{s}</b><div class="lines" style="--h:{30 if i<6 else 22}mm"></div></div>' for i, s in enumerate(SECC)) + '</div>'
batch = '''<h2>Batch cooking: 2 horas el domingo</h2><p class="lead">Cocina bases, no platos. Con 5 bases combinas comidas distintas toda la semana.</p>
<table><tr><th>Minuto</th><th>Qué haces</th><th>Para qué</th></tr><tr><td>0</td><td>Horno a 200 °C con bandejas de verduras troceadas (calabacín, pimiento, cebolla, calabaza).</td><td>Guarniciones, cremas, bocadillos.</td></tr>
<tr><td>5</td><td>Olla con legumbre (o abre botes ya cocidos y acláralos).</td><td>Ensaladas, guisos rápidos, hummus.</td></tr><tr><td>10</td><td>Cereal: arroz integral, quinoa o pasta.</td><td>Base de bowls y salteados.</td></tr>
<tr><td>30</td><td>Proteína al horno o a la plancha: pollo, pescado, tofu, huevos cocidos.</td><td>Comidas de lunes a miércoles.</td></tr><tr><td>60</td><td>Una salsa: tomate casero, yogur con hierbas o pesto.</td><td>Cambia el sabor de todo.</td></tr>
<tr><td>90</td><td>Enfría, reparte en táperes y etiqueta con el día.</td><td>Orden en la nevera.</td></tr></table>
<div class="callout warn"><b>Seguridad alimentaria:</b> enfría la comida cocinada antes de 2 horas y guárdala en la nevera. Consúmela en 3 o 4 días; lo que vayas a comer después, congélalo el mismo día.</div>
<h3>Inventario de la despensa</h3><table><tr><th>Producto</th><th>Hay</th><th>Comprar</th><th>Producto</th><th>Hay</th><th>Comprar</th></tr>''' + ''.join('<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>' for _ in range(8)) + '</table>'
EXTRA = '<style>.menu td{height:24mm}.menu td.dd{font-weight:800;color:var(--a);vertical-align:middle}</style>'
html = documento('Menú semanal sin complicarte', 'Planificador para imprimir: plato equilibrado, 4 semanas de menú, listas de la compra y batch cooking.', 'Planificadores · casi3', 'verde',
                 [plato] + [x for _ in range(4) for x in (menu(), lista())] + [batch]).replace('</head>', EXTRA + '</head>')
pdf(html, os.path.join(DIST, 'Menu semanal y lista de la compra - casi3.pdf'), 'Menú semanal')
