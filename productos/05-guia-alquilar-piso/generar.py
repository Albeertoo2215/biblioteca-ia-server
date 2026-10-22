"""Guía para alquilar piso en España (LAU tras la Ley 12/2023). Datos revisados en octubre de 2026."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from plantilla import documento, barras
from construir import pdf
DIST = os.path.join(os.path.dirname(__file__), '..', '..', 'dist')
p1 = '''<h2>Alquilar en 2026, en una página</h2><p class="lead">Lo que dice la ley, lo que conviene revisar y lo que puedes negociar. Para inquilinos de vivienda habitual en España.</p>
<div class="grid3" style="margin:5mm 0">
<div class="card"><div class="num">5 años</div><p>de duración mínima si el casero es una persona (7 si es una empresa), aunque el contrato diga uno.</p></div>
<div class="card"><div class="num">1 mes</div><p>de fianza obligatoria. Las garantías extra no pueden pasar de 2 mensualidades más.</p></div>
<div class="card"><div class="num">0 €</div><p>de gastos de inmobiliaria para ti: desde la Ley 12/2023 los paga el propietario.</p></div></div>
<ul class="toc"><li><b>01</b>Cuánto puedes pagar</li><li><b>02</b>La visita: qué mirar</li><li><b>03</b>El contrato: cláusulas clave</li><li><b>04</b>Fianza, garantías y subidas</li><li><b>05</b>Durante el contrato y al irte</li></ul>
<p class="src">Base legal: Ley 29/1994 de Arrendamientos Urbanos (LAU), modificada por la Ley 12/2023 por el derecho a la vivienda. Esta guía informa, no sustituye asesoramiento legal.</p>'''
p2 = f'''<div style="display:flex;gap:4mm;align-items:baseline"><span class="num">01</span><h2>Cuánto puedes pagar</h2></div>
<p class="lead">La recomendación habitual es no dedicar al alquiler más del 30 % de tus ingresos netos. Por encima del 40 %, cualquier imprevisto se vuelve un problema.</p>
<div class="card line"><h3>Alquiler máximo recomendado (30 %) según tu sueldo neto mensual</h3>{barras([('1.200 €', 360), ('1.500 €', 450), ('1.800 €', 540), ('2.100 €', 630), ('2.500 €', 750), ('3.000 €', 900)], sufijo=' €')}</div>
<h3>Suma también estos gastos</h3><table><tr><th>Concepto</th><th>Qué comprobar</th></tr>
<tr><td>Luz, agua y gas</td><td>Pide al casero o al inquilino anterior una factura reciente. Mira el certificado energético: la letra (A a G) anticipa la factura de calefacción.</td></tr>
<tr><td>Comunidad e IBI</td><td>Normalmente los paga el propietario. Si el contrato los traslada a ti, debe decirlo por escrito con la cantidad anual.</td></tr>
<tr><td>Internet</td><td>Pregunta qué operadoras llegan al edificio (fibra) antes de firmar.</td></tr>
<tr><td>Seguro</td><td>El de hogar es del propietario; el de tus cosas y responsabilidad civil, recomendable para ti.</td></tr></table>'''
p3 = '''<div style="display:flex;gap:4mm;align-items:baseline"><span class="num">02</span><h2>La visita: qué mirar</h2></div><p class="lead">Lleva esta lista y haz fotos de todo. En 15 minutos sabes si el piso esconde problemas.</p>
<div class="grid2"><div><h3>El piso</h3><ul class="check"><li>Manchas de humedad en techos, esquinas y detrás de muebles.</li><li>Olor a cerrado o a humedad en armarios.</li><li>Abre grifos: presión y tiempo hasta salir agua caliente.</li><li>Ventanas: cierran bien, hay ruido de la calle.</li><li>Enchufes suficientes y cuadro eléctrico en buen estado.</li><li>Calefacción y aire: tipo y si funcionan.</li><li>Electrodomésticos incluidos y su estado.</li></ul></div>
<div><h3>El edificio y la zona</h3><ul class="check"><li>Ascensor, portero, estado de la escalera.</li><li>Cobertura del móvil dentro del piso.</li><li>Ruido de bares o tráfico a la hora en que estarás en casa.</li><li>Transporte, supermercado y centro de salud cerca.</li><li>Aparcamiento si tienes coche.</li></ul>
<h3>Pregunta siempre</h3><ul class="check"><li>¿Por qué se va el inquilino anterior?</li><li>¿Se admiten mascotas? (que conste en el contrato)</li><li>¿Qué incluye el precio exactamente?</li></ul></div></div>
<div class="callout"><b>Documento obligatorio:</b> el anuncio y el contrato deben incluir la calificación del certificado de eficiencia energética. Pídelo.</div>'''
p4 = '''<div style="display:flex;gap:4mm;align-items:baseline"><span class="num">03</span><h2>El contrato: cláusulas clave</h2></div>
<table><tr><th style="width:30%">Cláusula</th><th>Lo que dice la ley</th><th style="width:28%">Revisa</th></tr>
<tr><td>Duración</td><td>Aunque firmes un año, puedes prorrogar año a año hasta 5 (7 si el casero es empresa). Después, si nadie avisa, se prorroga hasta 3 años más.</td><td>Que no te hagan renunciar a la prórroga: esa renuncia no vale.</td></tr>
<tr><td>Irte antes</td><td>Puedes irte a partir de los 6 meses avisando con 30 días. El contrato puede fijar una indemnización de hasta un mes por cada año que falte.</td><td>Si hay indemnización, que sea proporcional.</td></tr>
<tr><td>Renta y subidas</td><td>Solo sube una vez al año y solo si el contrato lo prevé. En contratos desde el 26 de mayo de 2023 se usa el índice IRAV del INE.</td><td>Que diga qué índice se aplica.</td></tr>
<tr><td>Fianza</td><td>Una mensualidad, depositada por el casero en el organismo de tu comunidad.</td><td>Que conste la cantidad.</td></tr>
<tr><td>Garantías extra</td><td>Aval o depósito: como máximo 2 mensualidades más.</td><td>No aceptes más.</td></tr>
<tr><td>Gastos de agencia</td><td>Los gastos de gestión y de formalizar el contrato los paga el propietario.</td><td>Que no te cobren «honorarios».</td></tr>
<tr><td>Obras y reparaciones</td><td>Las necesarias para que la vivienda sea habitable las paga el propietario. Las pequeñas por el uso diario, tú.</td><td>Que no te carguen todas.</td></tr>
<tr><td>Inventario</td><td>No es obligatorio, pero te protege al devolver la fianza.</td><td>Anexo con fotos fechadas.</td></tr></table>
<div class="callout warn"><b>Zonas tensionadas:</b> en los municipios declarados así (por ejemplo, en buena parte de Cataluña) hay límites al precio del alquiler. Consulta si tu zona lo está en la web de vivienda de tu comunidad.</div>'''
irav = barras([('Ene', 2.14), ('May', 2.48), ('Jul', 2.49), ('Ago', 2.47), ('Sep', 2.54)], sufijo=' %')
p5 = f'''<div style="display:flex;gap:4mm;align-items:baseline"><span class="num">04</span><h2>Fianza, garantías y subidas</h2></div>
<div class="grid2" style="align-items:start"><div class="card line"><h3>IRAV en 2026: cuánto puede subir tu alquiler</h3>{irav}<p class="src">Valores mensuales publicados por el INE en 2026 (meses disponibles). Antes de aceptar una subida, consulta el IRAV del mes de tu actualización en ine.es.</p></div>
<div><h3>Cómo se calcula tu subida</h3><p>Renta actual × IRAV del mes en que toca actualizar. Ejemplo: 800 € con un IRAV de 2,47 % suben 19,76 €, hasta 819,76 €.</p>
<h3>Contratos anteriores a mayo de 2023</h3><p>Siguen el índice que diga su contrato (normalmente el IPC).</p>
<div class="callout"><b>Pide la subida por escrito</b> con el cálculo. Si el contrato no prevé actualización, la renta no puede subir durante su vigencia.</div></div></div>'''
p6 = '''<div style="display:flex;gap:4mm;align-items:baseline"><span class="num">05</span><h2>Durante el contrato y al irte</h2></div>
<div class="grid2"><div class="card"><h3>Mientras vives allí</h3><ul class="check"><li>Paga siempre por transferencia: es tu justificante.</li><li>Comunica averías por escrito (email o WhatsApp) y guarda la respuesta.</li><li>Empadrónate: lo necesitas para el centro de salud y muchas ayudas.</li><li>Consulta las ayudas al alquiler de tu comunidad: cambian cada año.</li></ul></div>
<div class="card"><h3>Al irte</h3><ul class="check"><li>Avisa por escrito con 30 días de antelación como mínimo.</li><li>Deja el piso limpio y haz fotos el día de la entrega de llaves.</li><li>Firma un documento de entrega de llaves con la fecha.</li><li>El casero tiene un mes para devolver la fianza. Si se retrasa, debe pagar el interés legal.</li><li>Solo puede quedarse con la parte que corresponda a daños o deudas que justifique.</li></ul></div></div>
<h3>Mis datos del alquiler</h3><table><tr><th>Dato</th><th>Apunta aquí</th></tr><tr><td>Fecha de firma</td><td></td></tr><tr><td>Renta mensual</td><td></td></tr><tr><td>Fianza y garantías entregadas</td><td></td></tr><tr><td>Mes de actualización anual</td><td></td></tr><tr><td>Contacto del propietario o agencia</td><td></td></tr></table>
<p class="src">Fuentes: LAU (Ley 29/1994), artículos 9, 10, 11, 18, 20 y 36, en su redacción vigente tras la Ley 12/2023; INE (IRAV); Real Decreto 390/2021 (certificado de eficiencia energética).</p>'''
html = documento('Alquilar piso sin sustos', 'Guía práctica 2026: tus derechos, la visita, el contrato, la fianza y las subidas.', 'Guías · casi3', 'verde', [p1, p2, p3, p4, p5, p6])
pdf(html, os.path.join(DIST, 'Guia para alquilar piso 2026 - casi3.pdf'), 'Alquilar piso sin sustos')
