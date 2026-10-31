# Páginas «Cómo está pensada»: decisiones de diseño reales de cada app de ejemplo
import re, json
P='/home/user/folzia/public/'
base=open(P+'apps-web-a-medida.html').read()
HEAD_TOP=re.search(r'<body.*?</header>', base, re.S).group(0)
FOOT=re.search(r'<footer class="foot">.*?</footer>', base, re.S).group(0)
idx=open(P+'index.html').read()
def ex_txt(k): return re.search(r'data-n="%s"(?:(?!data-n=).)*?<span class="ex-text">(.*?)</span>'%k, idx, re.S).group(1)
VER={'fisio':'?v=2'}
A=[
 ('eje','fisio','Eje','Fisioterapia','movil','App del paciente de una clínica de fisioterapia. La clínica le envía los vídeos de sus ejercicios, el paciente los hace guiado en casa y la fisio ve cómo evoluciona.',
  [('Letra pensada para leer sin esfuerzo','Uso Atkinson Hyperlegible, una tipografía diseñada para personas con baja visión, y tamaños grandes. Muchos pacientes de fisioterapia son personas mayores.'),
   ('Los vídeos son de la propia clínica','La fisio graba cada ejercicio y se lo envía a sus pacientes. Ven a su clínica explicándolo, no un dibujo genérico.'),
   ('El ritmo lo marca la app','La barra «Sube, Mantén, Baja» marca el tempo y cuenta las repeticiones, así el paciente se concentra en hacerlo bien y no en contar.'),
   ('El dolor, en una escala que se entiende','Del 0 al 10, con colores y una frase que explica qué significa cada valor. Si es alto, la fisio recibe un aviso.'),
   ('Privacidad por defecto','El vídeo que sube el paciente solo lo ve su fisioterapeuta y se borra a los 30 días.'),
   ('Color con intención','El verde es el de la clínica. El coral se reserva para el dolor y para lo que pide atención.')],
  [('#24453c','Verde clínica'),('#e4ece7','Verde suave'),('#d9653b','Coral'),('#f7f5f0','Fondo')],'Atkinson Hyperlegible para los textos e IBM Plex Mono para las cifras.'),
 ('cuadra','finanzas','Cuadra','Finanzas','movil','App de cuentas para autónomos. Resumen del trimestre, movimientos, facturas con IVA y retención, y borrador de los modelos 303 y 130.',
  [('Es una app de cifras','Números grandes y de ancho fijo, para que las columnas cuadren y se comparen de un vistazo.'),
   ('Lo de Hacienda, siempre a la vista','La cantidad que conviene apartar para Hacienda aparece en el resumen, para que no haya sustos al final del trimestre.'),
   ('Cada color significa algo','Verde para los ingresos y rojo para los gastos. El azul cobalto de la marca solo aparece en las acciones y en la parte de Hacienda.'),
   ('Las cuentas las hace la app','Al emitir una factura, el IVA y la retención se calculan al momento, y los modelos trimestrales salen ya en borrador.')],
  [('#2341e0','Cobalto'),('#0f7a4a','Ingresos'),('#c23b2a','Gastos'),('#111318','Tinta')],'Onest, una tipografía clara con cifras tabulares.'),
 ('hormigo','obra','Hormigo','Construcción','movil','Parte diario del encargado de obra. Reparte las horas de la cuadrilla por partida, imputa los albaranes y ve la desviación de cada partida al momento.',
  [('Pensada para el sol y los guantes','Negro y amarillo de seguridad para que se lea a pleno sol, y botones de 44 píxeles como mínimo para pulsarlos con guantes.'),
   ('Rótulos condensados','Los nombres de las partidas son largos. Una tipografía condensada hace que quepan sin cortarse.'),
   ('La desviación se ve sin leer números','La marca negra de cada barra es el avance real de la obra. Si la barra la pasa, se está gastando más de lo que se avanza.'),
   ('El rojo solo para lo que importa','Solo las desviaciones van en rojo, para que una alerta se tome como alerta.'),
   ('Como se trabaja en obra','Las horas se apuntan en medias horas, y el parte no se envía hasta que todas están repartidas y los albaranes imputados.')],
  [('#f5c400','Amarillo seguridad'),('#161616','Negro'),('#ebe9e4','Hormigón'),('#d0341c','Desviación')],'Archivo en su versión condensada, para que quepan los nombres largos.'),
 ('vertice','gestoria','Vértice asesores','Gestoría','escritorio','Programa de un despacho de asesoría. Seguimiento de los modelos trimestrales de cada cliente, bandeja de documentos y calendario fiscal.',
  [('Cada estado tiene su color','Faltan documentos, en revisión, listo para presentar y presentado. Cada uno con su color y siempre el mismo en toda la app.'),
   ('El granate se gana su sitio','El color de la marca solo aparece en el logo y en la acción de presentar, que es la más delicada.'),
   ('Cifras sin errores de lectura','Importes, NIF y casillas van en letra monoespaciada, donde cada carácter ocupa lo mismo y no se confunden.'),
   ('El plazo, siempre presente','El plazo general y los días que quedan están arriba, en todas las pantallas.')],
  [('#7b1e2c','Granate'),('#17633f','Presentado'),('#1f4f99','Listo'),('#8a5300','En revisión')],'Public Sans para los textos y JetBrains Mono para cifras y NIF.'),
 ('arce','veterinaria','Arce','Clínica veterinaria','escritorio','Programa de una clínica veterinaria. Agenda por profesional, sala de espera y ficha clínica con la consulta y el cobro.',
  [('Un color por tipo de cita','Consulta, vacunación, cirugía o urgencia tienen siempre el mismo color, en la agenda y en la ficha.'),
   ('Una agenda a escala','Cada cita ocupa el espacio de su duración y una línea marca la hora real, así se ven los huecos de un vistazo.'),
   ('Columnas por profesional','Cada veterinario tiene su columna, con la sala de espera al lado.'),
   ('El color de la marca, con función','El teja marca el momento actual, las urgencias y la acción de cobrar.')],
  [('#b4472b','Teja'),('#1d6040','Verde'),('#1d1f1c','Tinta'),('#f8f8f5','Fondo')],'Hanken Grotesk, cercana y muy legible en pantallas densas.'),
 ('quilla','proyectos','Quilla','Arquitectura','escritorio','Planificación de un estudio de arquitectura. Fases, dependencias, honorarios y avance de cada proyecto en un diagrama de Gantt.',
  [('Como un plano','Papel blanco y tinta negra. La lima solo marca «hoy» y lo que tienes seleccionado.'),
   ('Lo que no depende de ti, distinto','La licencia va rayada porque depende del ayuntamiento, no del estudio.'),
   ('Las dependencias se ven','Cada fase muestra de qué depende, así se entiende qué se retrasa si algo se mueve.'),
   ('Fechas y cifras alineadas','Fechas y honorarios en letra monoespaciada, para leerlos en columna.')],
  [('#c8f031','Lima'),('#191919','Tinta'),('#fafaf7','Papel'),('#dcdfe3','Barras')],'Overpass para los textos y Overpass Mono para fechas y cifras.'),
]
WA='https://wa.me/34606430834?text=Hola%20Alberto%2C%20te%20escribo%20desde%20folzia.com'
def head(title,desc,url,ld):
    return f'''<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | Folzia</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="{url}">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Folzia">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="https://folzia.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://folzia.com/og-image.png">
  {''.join(f'<script type="application/ld+json">{json.dumps(x, ensure_ascii=False)}</script>' for x in ld)}
  <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="apple-mobile-web-app-title" content="Folzia">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
'''
for slug,k,n,sector,tipo,lead,dec,pal,tipo_letra in A:
    v=VER.get(k,'')
    url=f'https://folzia.com/ejemplos/{slug}.html'
    title=f'Cómo está pensada {n}, app de {sector.lower()}'
    desc=f'Las decisiones de diseño de {n}, una app de ejemplo de {sector.lower()} hecha por Folzia: qué problema resuelve y por qué es como es.'
    miga={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://folzia.com/"},{"@type":"ListItem","position":2,"name":"Ejemplos","item":"https://folzia.com/ejemplos/"},{"@type":"ListItem","position":3,"name":n,"item":url}]}
    decs=''.join(f'<li><h3>{t}</h3><p>{p}</p></li>' for t,p in dec)
    pals=''.join(f'<li><svg class="sw" viewBox="0 0 10 10" aria-hidden="true"><rect width="10" height="10" fill="{c}"/></svg><b>{nom}</b><code>{c}</code></li>' for c,nom in pal)
    otros=''.join(f'<li><a href="/ejemplos/{s2}.html">{n2} <span>{sec2}</span></a></li>' for s2,_,n2,sec2,*__ in A if s2!=slug)
    page=head(title,desc,url,[miga])+f'''{HEAD_TOP}
  <main class="wrap srv caso" id="contenido">
    <nav class="migas" aria-label="Estás en"><a href="/">Inicio</a> <span aria-hidden="true">/</span> <a href="/ejemplos/">Ejemplos</a> <span aria-hidden="true">/</span> <span>{n}</span></nav>
    <p class="kicker">{sector}</p>
    <h1>Cómo está pensada {n}</h1>
    <p class="srv-lead">{lead}</p>
    <p class="srv-p">Es una app de ejemplo: el negocio es inventado, pero la app funciona de verdad.</p>
    <div class="caso-top">
      <figure class="srv-ej {tipo}"><div class="srv-vid"><video controls muted playsinline preload="none" poster="/img/poster-{k}.webp{v}" aria-label="Vídeo de {n} en uso"><source src="/video/{k}.webm{v}" type="video/webm"><source src="/video/{k}.mp4{v}" type="video/mp4"></video></div></figure>
      <div class="caso-reto"><h2>El problema que resuelve</h2><p>{ex_txt(k)}</p></div>
    </div>
    <section class="srv-sec" aria-labelledby="dd">
      <h2 id="dd">Decisiones de diseño</h2>
      <ol class="decisiones">{decs}</ol>
    </section>
    <section class="srv-sec" aria-labelledby="pc">
      <h2 id="pc">Colores y tipografía</h2>
      <ul class="paleta">{pals}</ul>
      <p class="srv-p">{tipo_letra}</p>
    </section>
    <section class="srv-cta" aria-labelledby="co">
      <h2 id="co">¿Quieres algo así para tu negocio?</h2>
      <p>Cuéntame cómo trabajáis hoy y te propongo cómo lo haría, por escrito.</p>
      <div class="directo"><a class="btn btn-ink" href="{WA}" rel="noopener">WhatsApp</a><a class="btn btn-line" href="tel:+34606430834">606 430 834</a><a class="btn btn-line" href="/#contacto">Formulario</a></div>
    </section>
    <section class="srv-otros" aria-labelledby="ot"><h2 id="ot">Otros ejemplos</h2><ul>{otros}</ul></section>
  </main>
  {FOOT}
</body>
</html>
'''
    open(P+f'ejemplos/{slug}.html','w').write(page); print('ok',slug)
items=''.join(f'<li><a href="/ejemplos/{s}.html"><span class="ej-img {t}"><img src="/img/poster-{k}.webp{VER.get(k,"")}" alt="" loading="lazy"></span><span class="ex-kind">{sec}</span><b>{n}</b><span class="ej-t">{l}</span></a></li>' for s,k,n,sec,t,l,*_ in A)
ix=head('Ejemplos explicados: apps y programas a medida','Seis apps de ejemplo hechas por Folzia, con las decisiones de diseño de cada una: por qué son como son y qué problema resuelven.','https://folzia.com/ejemplos/',[])+f'''{HEAD_TOP}
  <main class="wrap srv" id="contenido">
    <nav class="migas" aria-label="Estás en"><a href="/">Inicio</a> <span aria-hidden="true">/</span> <span>Ejemplos</span></nav>
    <p class="kicker">Ejemplos explicados</p>
    <h1>Por qué cada app es como es</h1>
    <p class="srv-lead">Seis apps de ejemplo, de sectores muy distintos. En cada una te cuento qué problema resuelve y las decisiones de diseño que hay detrás.</p>
    <ul class="ejemplos-lista">{items}</ul>
  </main>
  {FOOT}
</body>
</html>
'''
open(P+'ejemplos/index.html','w').write(ix); print('ok indice')
