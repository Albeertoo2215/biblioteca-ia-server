# Genera las guías con la misma cabecera y pie que las páginas de servicio
import re, json
P='/home/user/folzia/public/'
base=open(P+'apps-web-a-medida.html').read()
HEAD_TOP=re.search(r'<body.*?</header>', base, re.S).group(0)
FOOT=re.search(r'<footer class="foot">.*?</footer>', base, re.S).group(0)
WA='https://wa.me/34606430834?text=Hola%20Alberto%2C%20te%20escribo%20desde%20folzia.com'
G=[
('ley-accesibilidad-web','Qué tiene que cumplir tu web o tu app con la ley de accesibilidad',
 'Qué exige la Ley 11/2023 a webs y apps desde junio de 2025, a quién afecta, quién está exento y qué hacer si te toca. Explicado en claro, con fuentes.',
 '''<p class="srv-lead">Desde el 28 de junio de 2025, la Ley 11/2023 obliga a que muchas webs y apps de empresas sean accesibles para personas con discapacidad. Te cuento a quién afecta, qué pide y qué hacer si te toca.</p>
<p class="srv-p">Lo he resumido a partir de los análisis de despachos y medios especializados que enlazo al final. Sirve para orientarte, pero no sustituye el consejo de un abogado.</p>
<h2>Qué es la Ley 11/2023</h2>
<p>Es la ley que trae a España la Directiva europea de accesibilidad, conocida como European Accessibility Act. Exige que determinados productos y servicios se puedan usar sin barreras, también por personas ciegas o con baja visión, por quien solo usa el teclado o por quien necesita la letra más grande.</p>
<h2>A quién afecta</h2>
<p>Se aplica a algunos servicios concretos, entre ellos estos.</p>
<ul><li>Comercio electrónico, es decir, tiendas online y servicios que se contratan por internet.</li><li>Servicios bancarios.</li><li>Transporte de pasajeros, en sus webs, apps y venta de billetes.</li><li>Comunicaciones electrónicas.</li><li>Libros electrónicos.</li></ul>
<p>Si tu web solo informa de lo que haces, sin vender ni cobrar, normalmente no entra en esta ley.</p>
<h2>Quién está exento</h2>
<p>Las microempresas que prestan servicios están exentas. Se considera microempresa la que tiene menos de 10 personas y un volumen de negocio o un balance anual de hasta 2 millones de euros. La exención es para servicios, no para quien fabrica productos.</p>
<h2>Otras normas que ya existían</h2>
<p>Las webs y apps del sector público ya estaban obligadas por el Real Decreto 1112/2018, que además exige publicar una declaración de accesibilidad. Y las grandes empresas de sectores como la banca, los seguros, la energía, el agua, el transporte o las telecomunicaciones tienen obligaciones parecidas por la LSSI.</p>
<h2>Qué pide en la práctica</h2>
<p>La referencia técnica es la norma europea EN 301 549, que se apoya en las pautas WCAG de nivel AA. En el día a día eso se traduce en cosas como estas.</p>
<ul><li>Contraste suficiente entre el texto y el fondo.</li><li>Que todo se pueda usar con el teclado, con el foco siempre visible.</li><li>Textos alternativos en las imágenes que aportan información.</li><li>Formularios con etiquetas en cada campo y errores explicados junto al campo.</li><li>Poder pausar lo que se mueve y que la página se adapte a pantallas pequeñas y al zoom.</li></ul>
<p>Además, quien presta el servicio tiene que informar de cómo cumple esos requisitos, normalmente en sus condiciones o en una declaración.</p>
<h2>Qué pasa si no se cumple</h2>
<p>La ley prevé sanciones. Los análisis publicados citan multas que van desde decenas de miles de euros en las infracciones leves hasta cientos de miles en las más graves.</p>
<h2>Qué hacer si te afecta</h2>
<ol><li>Revisa tu web o tu app con una herramienta automática y también a mano, con el teclado.</li><li>Corrige lo que salga, empezando por el contraste, los formularios y la navegación con teclado.</li><li>Publica la información sobre cómo cumples.</li><li>Repite la revisión cada vez que hagas un cambio importante.</li></ol>
<p>Es lo que hago en cada proyecto. Puedes ver <a href="/accesibilidad.html">cómo lo aplico en esta misma web</a>.</p>
<h2>Fuentes</h2>
<ul class="fuentes"><li><a href="https://www.cuatrecasas.com/es/global/propiedad-intelectual/art/claves-proxima-entrada-vigor-ley-accesibilidad-espana" rel="noopener">Cuatrecasas, claves de la Ley de Accesibilidad</a></li><li><a href="https://www.fieldfisher.com/es-es/locations/espana/actualidad/accesibilidad-obligatoria-claves-de-la-transposicion-accesibility-act" rel="noopener">Fieldfisher, claves de la transposición española</a></li><li><a href="https://www.legalitas.com/actualidad/european-accessibility-act" rel="noopener">Legálitas, qué es la European Accessibility Act</a></li><li><a href="https://maldita.es/malditatecnologia/20230518/accesibilidad-web-obligaciones-leyes-espana/" rel="noopener">Maldita, obligaciones de accesibilidad en España</a></li></ul>'''),
('app-web-o-app-de-tienda','¿App web o app de tienda? Cuál necesita tu negocio',
 'Diferencias entre una app web y una app de App Store o Google Play, ventajas de cada una y cuándo conviene cada opción para un negocio.',
 '''<p class="srv-lead">Cuando alguien me pide una app, casi siempre piensa en App Store y Google Play. Muchas veces no hace falta pasar por ellas. Te explico la diferencia y cuándo conviene cada opción.</p>
<h2>Qué es una app web</h2>
<p>Es una aplicación que funciona en el navegador, en cualquier móvil, tablet u ordenador. Se puede instalar desde el propio navegador y queda en la pantalla de inicio con su icono, como cualquier otra app, tanto en Android como en iPhone. Cuando la actualizo, el cambio le llega a todo el mundo al momento.</p>
<h2>Qué es una app de tienda</h2>
<p>Es la que se descarga desde App Store o Google Play. Se programa para cada sistema, o con herramientas que generan las dos versiones, y cada actualización pasa por la revisión de la tienda antes de llegar a los usuarios.</p>
<h2>Ventajas de una app web</h2>
<ul><li>Una sola versión sirve para todos los dispositivos, ordenador incluido.</li><li>No necesitas cuentas de desarrollador. Apple cobra 99 dólares al año y Google Play, 25 dólares una sola vez.</li><li>Los cambios llegan al momento, sin esperar revisiones.</li><li>Se comparte con un enlace y puede aparecer en Google.</li><li>Si vendes contenido digital dentro de una app de tienda, Apple y Google se quedan una comisión que suele ir del 15 al 30 %. En una app web no hay comisión de tienda.</li></ul>
<p>En iPhone, las notificaciones de una app web funcionan si se instala en la pantalla de inicio, algo que Apple permite desde iOS 16.4.</p>
<h2>Cuándo conviene una app de tienda</h2>
<ul><li>Si necesitas funciones del teléfono que el navegador no ofrece o limita, como algunos usos del Bluetooth o la localización en segundo plano.</li><li>Si tu público busca la app directamente en la tienda.</li><li>Si es un juego o algo con mucha carga gráfica.</li></ul>
<h2>Lo que suelo recomendar</h2>
<p>Para reservas, pedidos, partes de trabajo, áreas de cliente o la gestión interna de un negocio, una app web suele ser la opción más rápida y barata de mantener. Si más adelante hace falta estar en las tiendas, se puede dar ese paso partiendo de lo que ya funciona.</p>
<p>Si tienes dudas con tu caso, <a href="/#contacto">cuéntamelo</a> y te digo qué haría yo.</p>'''),
('cuanto-cuesta-una-app-a-medida','Cuánto cuesta una app a medida y de qué depende el precio',
 'Qué hace que una app a medida cueste más o menos, cómo pedir un presupuesto que se pueda comparar y cómo empezar sin gastar de más.',
 '''<p class="srv-lead">Es la primera pregunta que me hacen casi siempre. No te voy a dar una cifra genérica, porque sin saber qué necesitas sería engañarte. Lo que sí puedo contarte es de qué depende el precio, para que entiendas cualquier presupuesto que te pasen.</p>
<h2>Lo que más influye</h2>
<ul><li><strong>Cuántas cosas tiene que hacer.</strong> No es lo mismo una agenda de citas que una app con agenda, cobros, informes y área de clientes.</li><li><strong>Quién la usa.</strong> Si hay varios tipos de usuario con permisos distintos, como el equipo, los encargados y los clientes, hay más trabajo.</li><li><strong>Con qué se conecta.</strong> Pagos online, programa de facturación, calendario o correo. Cada conexión suma.</li><li><strong>Qué datos maneja.</strong> Los datos de salud, económicos o de menores piden más medidas de seguridad.</li><li><strong>El diseño.</strong> Una app con tu marca y pensada para tu forma de trabajar lleva más tiempo que una plantilla.</li><li><strong>Dónde funciona.</strong> Una app web sirve para todos los dispositivos. Si además tiene que estar en App Store y Google Play, el trabajo crece. Lo explico en <a href="/guias/app-web-o-app-de-tienda.html">esta guía</a>.</li></ul>
<h2>Lo que se suele olvidar</h2>
<p>Además de hacerla, una app necesita alojamiento, un dominio y, con el tiempo, pequeños cambios y actualizaciones. Pregunta siempre qué incluye el presupuesto después de la entrega.</p>
<h2>Cómo pedir un presupuesto que puedas comparar</h2>
<ol><li>Explica el problema con tus palabras y cómo lo resuelves hoy.</li><li>Pide que el presupuesto venga por escrito, con el alcance, los plazos y lo que queda fuera.</li><li>Pregunta cómo se va a probar la app durante el desarrollo y qué pasa después de entregarla.</li></ol>
<h2>Cómo empezar sin gastar de más</h2>
<p>Lo más eficaz es empezar por lo que más tiempo te hace perder y dejar el resto para después. Una primera versión con lo esencial sale antes, cuesta menos y te enseña qué merece la pena ampliar.</p>
<p>Si quieres saber cuánto costaría lo tuyo, <a href="/#contacto">cuéntamelo</a> y te paso una propuesta por escrito.</p>'''),
('rgpd-en-tu-app','Qué tiene que cumplir tu app con el RGPD',
 'Lo esencial del RGPD para una app o web de negocio, desde la información al usuario y los derechos hasta los proveedores, la seguridad y las cookies.',
 '''<p class="srv-lead">Si tu app guarda datos de personas, como clientes, pacientes o empleados, tiene que cumplir el Reglamento General de Protección de Datos. Te resumo lo esencial para que sepas qué preguntar y qué revisar.</p>
<p class="srv-p">Es una guía para orientarte y no sustituye el consejo de un abogado o de un delegado de protección de datos.</p>
<h2>Guardar solo lo necesario</h2>
<p>El RGPD pide recoger únicamente los datos que hacen falta para lo que vas a hacer con ellos. Cada campo de más en un formulario es un dato más que proteger.</p>
<h2>Informar con claridad</h2>
<p>Cuando alguien te da sus datos, tiene que saber quién es el responsable, para qué los usas, con qué base legal, a quién se comunican, cuánto tiempo los guardas y qué derechos tiene. Por eso los formularios llevan una información básica y un enlace a la política de privacidad.</p>
<h2>Los derechos de las personas</h2>
<p>Cada persona puede pedir acceder a sus datos, corregirlos, borrarlos, oponerse a un uso, limitarlo o llevárselos. Una buena app permite atender esas peticiones sin buscar a mano en todas partes, por ejemplo exportando o borrando los datos de un usuario.</p>
<h2>Proveedores y contratos</h2>
<p>Si un proveedor trata datos por ti, como el alojamiento, el correo o quien desarrolla y mantiene la app, hace falta un contrato de encargado del tratamiento, que exige el artículo 28 del RGPD. Si los datos salen del Espacio Económico Europeo, tiene que haber garantías, como una decisión de adecuación o cláusulas contractuales tipo.</p>
<h2>Seguridad</h2>
<p>El artículo 32 pide medidas de seguridad adecuadas al riesgo. Los datos de salud, por ejemplo, son una categoría especial y necesitan más protección. Si hay una brecha de seguridad que suponga un riesgo, hay que notificarla a la Agencia Española de Protección de Datos en un plazo de 72 horas.</p>
<h2>Cookies</h2>
<p>Las cookies que no son necesarias para que la web funcione, como las de analítica o publicidad, necesitan el consentimiento previo del usuario, según la LSSI. Las técnicas imprescindibles no lo necesitan.</p>
<h2>Cómo lo aplico</h2>
<p>En cada proyecto guardo solo lo necesario, uso servidores en la UE siempre que se puede, firmo contigo el contrato de encargado del tratamiento y preparo la app para exportar y borrar los datos de cada usuario.</p>'''),
('dejar-el-excel-y-el-papel','Cómo dejar el Excel y el papel en tu negocio, paso a paso',
 'Pasos prácticos para digitalizar un negocio que funciona con hojas de cálculo, papeles y grupos de WhatsApp, empezando por lo que más tiempo hace perder.',
 '''<p class="srv-lead">Muchos negocios funcionan con una mezcla de hojas de cálculo, papeles y grupos de WhatsApp. Funciona, hasta que deja de hacerlo. Estos son los pasos que sigo para ordenarlo sin parar el negocio.</p>
<h2>1. Apunta lo que se hace a mano</h2>
<p>Durante una semana, anota cada tarea que se repite, quién la hace, con qué herramienta y cuánto tiempo lleva. Pasar pedidos del correo a una hoja, preparar presupuestos o apuntar horas son ejemplos típicos.</p>
<h2>2. Elige lo que más duele</h2>
<p>No hace falta digitalizarlo todo a la vez. Empieza por la tarea que más tiempo te quita o que más errores provoca.</p>
<h2>3. Mira primero lo que ya existe</h2>
<p>Para algunas tareas ya hay programas que encajan bien y salen más baratos que hacer algo a medida. Merece la pena probarlos. Lo a medida tiene sentido cuando ninguno se adapta a tu forma de trabajar o te obliga a usar varios a la vez.</p>
<h2>4. Empieza pequeño</h2>
<p>Una primera versión que resuelva solo ese problema se pone en marcha antes y te deja comprobar si funciona. A partir de ahí se amplía.</p>
<h2>5. Aprovecha lo que ya tienes</h2>
<p>Los datos de tus hojas de cálculo se pueden importar, así que no se empieza de cero.</p>
<h2>6. Cuenta con tu equipo</h2>
<p>Quien va a usar la herramienta cada día es quien mejor sabe qué le sobra y qué le falta. Enséñasela pronto y escucha lo que te diga.</p>
<p>Si quieres ver cómo quedaría en tu caso, mira los <a href="/#ejemplos">ejemplos</a> o <a href="/#contacto">cuéntame qué usáis hoy</a>.</p>'''),
('programa-de-serie-o-a-medida','¿Programa de serie o a medida? Cómo decidir',
 'Cuándo te conviene un programa ya hecho y cuándo uno a medida para tu negocio, con una comparación clara de puesta en marcha, coste, cambios y datos.',
 '''<p class="srv-lead">Antes de encargar un programa a medida, merece la pena preguntarse si ya existe uno que te sirva. A veces sí, y te lo digo aunque me dedique a hacerlos a medida.</p>
<h2>Qué es un programa de serie</h2>
<p>Es un programa ya hecho que usan muchas empresas a la vez y que normalmente se paga con una cuota mensual. Los hay para facturar, para la agenda, para montar una tienda online y para casi todo.</p>
<h2>Cuándo te conviene uno de serie</h2>
<ul><li>Tu forma de trabajar es parecida a la de la mayoría de negocios de tu sector.</li><li>Hay uno que hace casi todo lo que necesitas.</li><li>Necesitas empezar ya.</li></ul>
<h2>Cuándo compensa hacerlo a medida</h2>
<ul><li>Ningún programa se adapta a cómo trabajáis y te obliga a cambiar lo que funciona.</li><li>Usas varios programas que no se hablan entre sí y pasas datos de uno a otro a mano.</li><li>Pagas por usuarios o funciones que no usas.</li><li>Quieres que tus clientes usen una app con tu marca.</li><li>Manejas datos delicados y quieres decidir dónde se guardan.</li></ul>
<h2>Las diferencias, de un vistazo</h2>
<div class="tabla" tabindex="0" role="region" aria-label="Comparación entre programa de serie y a medida"><table><thead><tr><th scope="col"></th><th scope="col">De serie</th><th scope="col">A medida</th></tr></thead><tbody>
<tr><th scope="row">Puesta en marcha</th><td>Rápida, a veces el mismo día</td><td>Por fases, con una primera versión</td></tr>
<tr><th scope="row">Encaje con tu forma de trabajar</th><td>Te adaptas tú al programa</td><td>El programa se adapta a ti</td></tr>
<tr><th scope="row">Coste</th><td>Cuota mensual, que suele crecer con los usuarios</td><td>Desarrollo inicial y después mantenimiento</td></tr>
<tr><th scope="row">Cambios</th><td>Dependes de lo que decida el proveedor</td><td>Se hacen cuando los necesitas</td></tr>
<tr><th scope="row">Tus datos</th><td>En los servidores del proveedor</td><td>Donde decidas</td></tr>
</tbody></table></div>
<h2>Lo que suelo aconsejar</h2>
<p>Prueba primero lo que ya existe. Si encaja, perfecto. Si no, lo a medida no tiene por qué sustituirlo todo: muchas veces basta con una herramienta que haga lo que te falta y se conecte con lo que ya usas, como tu programa de facturación.</p>
<p>Si tienes dudas con tu caso, <a href="/#contacto">cuéntamelo</a> y te digo con sinceridad qué haría.</p>'''),
]
for slug,h1,desc,cuerpo in G:
    art={"@context":"https://schema.org","@type":"Article","headline":h1,"description":desc,"datePublished":"2026-10-31","inLanguage":"es","author":{"@type":"Person","name":"Alberto García Marcos","url":"https://folzia.com/#quien-soy"},"publisher":{"@type":"Organization","name":"Folzia","logo":{"@type":"ImageObject","url":"https://folzia.com/icon-512.png"}},"mainEntityOfPage":f"https://folzia.com/guias/{slug}.html"}
    miga={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://folzia.com/"},{"@type":"ListItem","position":2,"name":"Guías","item":"https://folzia.com/guias/"},{"@type":"ListItem","position":3,"name":h1,"item":f"https://folzia.com/guias/{slug}.html"}]}
    page=f'''<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{h1} | Folzia</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="https://folzia.com/guias/{slug}.html">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Folzia">
  <meta property="og:title" content="{h1}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="https://folzia.com/guias/{slug}.html">
  <meta property="og:image" content="https://folzia.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{h1}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://folzia.com/og-image.png">
  <script type="application/ld+json">{json.dumps(art, ensure_ascii=False)}</script>
  <script type="application/ld+json">{json.dumps(miga, ensure_ascii=False)}</script>
  <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="apple-mobile-web-app-title" content="Folzia">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
{HEAD_TOP}
  <main class="wrap srv guia" id="contenido">
    <nav class="migas" aria-label="Estás en"><a href="/">Inicio</a> <span aria-hidden="true">/</span> <a href="/guias/">Guías</a> <span aria-hidden="true">/</span> <span>{h1}</span></nav>
    <p class="kicker">Guía</p>
    <h1>{h1}</h1>
    <p class="autor">Por Alberto García Marcos, 31 de octubre de 2026</p>
    <article class="guia-cuerpo">
{cuerpo}
    </article>
    <section class="srv-cta" aria-labelledby="co">
      <h2 id="co">¿Hablamos?</h2>
      <p>Cuéntame qué tienes en mente, con tus palabras. Te respondo yo mismo con una propuesta por escrito.</p>
      <div class="directo"><a class="btn btn-ink" href="{WA}" rel="noopener">WhatsApp</a><a class="btn btn-line" href="tel:+34606430834">606 430 834</a><a class="btn btn-line" href="/#contacto">Formulario</a></div>
    </section>
  </main>
  {FOOT}
</body>
</html>
'''
    open(P+f'guias/{slug}.html','w').write(page); print('ok',slug)
# Índice de guías
items=''.join(f'<li><a href="/guias/{s}.html"><b>{h}</b><span>{d}</span></a></li>' for s,h,d,_ in G)
idx=f'''<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Guías sobre apps, webs y accesibilidad | Folzia</title>
  <meta name="description" content="Guías claras para negocios sobre apps, webs y lo que exige la ley, escritas por Alberto García Marcos, desarrollador de software a medida en Madrid.">
  <link rel="canonical" href="https://folzia.com/guias/">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Folzia">
  <meta property="og:title" content="Guías sobre apps, webs y accesibilidad">
  <meta property="og:description" content="Guías claras para negocios sobre apps, webs y lo que exige la ley.">
  <meta property="og:url" content="https://folzia.com/guias/">
  <meta property="og:image" content="https://folzia.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="https://folzia.com/og-image.png">
  <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="apple-mobile-web-app-title" content="Folzia">
</head>
{HEAD_TOP}
  <main class="wrap srv" id="contenido">
    <nav class="migas" aria-label="Estás en"><a href="/">Inicio</a> <span aria-hidden="true">/</span> <span>Guías</span></nav>
    <h1>Guías</h1>
    <p class="srv-lead">Explicaciones claras sobre apps, webs y lo que pide la ley, para que decidas con información.</p>
    <ul class="guias-lista">{items}</ul>
  </main>
  {FOOT}
</body>
</html>
'''
open(P+'guias/index.html','w').write(idx); print('ok indice')
