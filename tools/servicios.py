# Genera las páginas de servicio a partir de los textos que ya están en la portada
import re, json, html as H
P='/home/user/folzia/public/'
idx=open(P+'index.html').read()
def panel(n):
    m=re.search(r'<h2 id="s%d">(.*?)</h2>\s*<p>(.*?)</p>\s*<p class="mas-texto">(.*?)</p>'%n, idx, re.S)
    return m.group(1), m.group(2), m.group(3)
steps=re.search(r'<ol class="steps">.*?</ol>', idx, re.S).group(0)
# Bloque de garantías de la portada (termina justo antes del bloque de calidad)
garantias=re.search(r'<div class="garantias">.*?</div>\s*</div>(?=\s*<div class="calidad">)', idx, re.S).group(0)
garantias=garantias.replace('href="accesibilidad.html"','href="/accesibilidad.html"')
faqs=dict(re.findall(r'<details class="faq-i"><summary>(.*?)</summary><p>(.*?)</p></details>', idx))
WA='https://wa.me/34606430834?text=Hola%20Alberto%2C%20te%20escribo%20desde%20folzia.com'
EJ={
 'fisio':('Eje','Fisioterapia','movil'),'obra':('Hormigo','Construcción','movil'),
 'gestoria':('Vértice asesores','Gestoría','escritorio'),'veterinaria':('Arce','Clínica veterinaria','escritorio'),'proyectos':('Quilla','Arquitectura','escritorio'),
}
# El texto de cada ejemplo: el primer ex-text tras su data-n sin cruzar el de otro ejemplo
ej_txt={k:re.search(r'data-n="%s"(?:(?!data-n=).)*?<span class="ex-text">(.*?)</span>'%k, idx, re.S).group(1) for k in EJ}
PAG=[
 ('apps-web-a-medida.html',1,'Apps web a medida en Madrid','Apps web a medida en Madrid para tu equipo o tus clientes. Funcionan en el navegador y se instalan en el móvil, sin pasar por App Store ni Google Play.',['fisio','veterinaria'],['¿Hay que descargar la app desde App Store o Google Play?','¿Cuánto cuesta?','¿Cuánto se tarda?','¿Qué pasa con los datos de mis clientes?']),
 ('webs-y-tiendas-online.html',2,'Webs y tiendas online a medida en Madrid','Webs y tiendas online a medida en Madrid, rápidas y con tu marca. Preparadas para reservas, pedidos y pagos, y para que te encuentren desde el móvil.',[],['¿Mi app tiene que ser accesible?','¿Cuánto cuesta?','¿Cuánto se tarda?','¿Trabajas solo en Madrid?']),
 ('programas-para-empresas.html',3,'Programas a medida para empresas en Madrid','Programas a medida para empresas en Madrid. Sustituyen las hojas de cálculo, los papeles y los grupos de WhatsApp por una herramienta hecha para tu equipo.',['gestoria','proyectos'],['¿Tengo que saber de tecnología?','¿Con quién hablo durante el proyecto?','¿Qué pasa cuando la app está terminada?','¿Qué pasa con los datos de mis clientes?']),
 ('primera-version-de-tu-idea.html',4,'La primera versión de tu idea de app, en Madrid','Construyo la primera versión de tu idea de app para que la pruebes con usuarios reales cuanto antes y sin gastar de más. Desde Madrid, para toda España.',[],['¿Tengo que saber de tecnología?','¿Cuánto cuesta?','¿Cuánto se tarda?','¿Con quién hablo durante el proyecto?']),
]
SERV=[(f, panel(n)[0]) for f,n,*_ in PAG]
GU={'app-web-o-app-de-tienda':'¿App web o app de tienda? Cuál necesita tu negocio','cuanto-cuesta-una-app-a-medida':'Cuánto cuesta una app a medida y de qué depende el precio','ley-accesibilidad-web':'Qué tiene que cumplir tu web o tu app con la ley de accesibilidad','rgpd-en-tu-app':'Qué tiene que cumplir tu app con el RGPD','dejar-el-excel-y-el-papel':'Cómo dejar el Excel y el papel en tu negocio, paso a paso','programa-de-serie-o-a-medida':'¿Programa de serie o a medida? Cómo decidir'}
GUIAS_DE={'apps-web-a-medida.html':['app-web-o-app-de-tienda','cuanto-cuesta-una-app-a-medida'],'webs-y-tiendas-online.html':['ley-accesibilidad-web','cuanto-cuesta-una-app-a-medida'],'programas-para-empresas.html':['programa-de-serie-o-a-medida','dejar-el-excel-y-el-papel','rgpd-en-tu-app'],'primera-version-de-tu-idea.html':['cuanto-cuesta-una-app-a-medida','app-web-o-app-de-tienda']}
def otros(actual):
    return ''.join(f'<li><a href="/{f}">{t}</a></li>' for f,t in SERV if f!=actual)
# Versión de cada vídeo: se sube al cambiar el vídeo para que los navegadores no usen el antiguo guardado
VER={'fisio': '?v=2'}
def ejemplos(ks):
    if not ks: return ''
    out=[]
    for k in ks:
        n,kind,tipo=EJ[k]
        out.append(f'''<figure class="srv-ej {tipo}"><div class="srv-vid"><video controls muted playsinline preload="none" poster="/img/poster-{k}.webp{VER.get(k, '')}" aria-label="Vídeo de ejemplo: {n}"><source src="/video/{k}.webm{VER.get(k, '')}" type="video/webm"><source src="/video/{k}.mp4{VER.get(k, '')}" type="video/mp4"></video></div><figcaption><span class="ex-kind">{kind}</span><b>{n}</b><span>{ej_txt[k]}</span></figcaption></figure>''')
    return f'''
    <section class="srv-sec" aria-labelledby="ej">
      <h2 id="ej">Ejemplos</h2>
      <p class="srv-nota">Los negocios son inventados, pero las apps funcionan de verdad.</p>
      <div class="srv-ejs">{''.join(out)}</div>
    </section>'''
FOOT=open(P+'aviso-legal.html').read()
FOOT=re.search(r'<footer class="foot">.*?</footer>', FOOT, re.S).group(0).replace('href="aviso-legal.html"','href="/aviso-legal.html"').replace('href="privacidad.html"','href="/privacidad.html"').replace('href="cookies.html"','href="/cookies.html"').replace('href="accesibilidad.html"','href="/accesibilidad.html"')
for f,n,h1,desc,ks,qs in PAG:
    titulo,lead,mas=panel(n)
    fq=''.join(f'\n        <details class="faq-i"><summary>{q}</summary><p>{faqs[q]}</p></details>' for q in qs)
    ld={"@context":"https://schema.org","@type":"Service","name":h1,"description":desc,"areaServed":[{"@type":"City","name":"Madrid"},{"@type":"Country","name":"España"}],"provider":{"@type":"ProfessionalService","name":"Folzia","url":"https://folzia.com/","telephone":"+34606430834"}}
    faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":re.sub(r'<[^>]+>','',faqs[q])}} for q in qs]}
    gus=''.join(f'<li><a href="/guias/{k}.html">{GU[k]}</a></li>' for k in GUIAS_DE[f])
    miga={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://folzia.com/"},{"@type":"ListItem","position":2,"name":titulo,"item":"https://folzia.com/"+f}]}
    page=f'''<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{h1} | Folzia</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="https://folzia.com/{f}">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Folzia">
  <meta property="og:title" content="{h1}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="https://folzia.com/{f}">
  <meta property="og:image" content="https://folzia.com/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{h1}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://folzia.com/og-image.png">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
  <script type="application/ld+json">{json.dumps(miga, ensure_ascii=False)}</script>
  <script type="application/ld+json">{json.dumps(faqld, ensure_ascii=False)}</script>
  <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="apple-mobile-web-app-title" content="Folzia">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body class="legal-page srv-page">
  <a class="skip" href="#contenido">Saltar al contenido</a>
  <header class="top"><div class="nav"><a href="/" class="logo" aria-label="Folzia, volver al inicio"><img src="/logo.png" alt="Folzia" width="139" height="64"></a><nav class="srv-nav" aria-label="Principal"><a href="/#apps">Qué hago</a><a href="/#ejemplos">Ejemplos</a><a href="/#quien-soy">Quién soy</a><a href="/guias/">Guías</a></nav><a href="/#contacto" class="btn btn-sm">Cuéntame tu idea</a></div></header>
  <main class="wrap srv" id="contenido">
    <nav class="migas" aria-label="Estás en"><a href="/">Inicio</a> <span aria-hidden="true">/</span> <span>{titulo}</span></nav>
    <p class="kicker">Software a medida</p>
    <h1>{h1}</h1>
    <p class="srv-lead">{lead}</p>
    <p class="srv-p">{mas}</p>
    <div class="directo"><a class="btn" href="/#contacto">Cuéntame tu idea</a><a class="btn btn-line" href="{WA}" rel="noopener">Escríbeme por WhatsApp</a></div>
{ejemplos(ks)}
    <section class="srv-sec" aria-labelledby="ct">
      <h2 id="ct">Cómo trabajo</h2>
      <p class="srv-nota">Trabajas directamente conmigo, Alberto García Marcos, de principio a fin.</p>
      {steps}
      {garantias}
    </section>
    <section class="srv-sec" aria-labelledby="pf">
      <h2 id="pf">Preguntas frecuentes</h2>
      <div class="faq-list">{fq}
      </div>
    </section>
    <section class="srv-cta" aria-labelledby="co">
      <h2 id="co">¿Hablamos?</h2>
      <p>Cuéntame qué tienes en mente, con tus palabras. Te respondo yo mismo con una propuesta por escrito.</p>
      <div class="directo"><a class="btn btn-ink" href="{WA}" rel="noopener">WhatsApp</a><a class="btn btn-line" href="tel:+34606430834">606 430 834</a><a class="btn btn-line" href="/#contacto">Formulario</a></div>
    </section>
    <section class="srv-otros" aria-labelledby="gr">
      <h2 id="gr">Guías relacionadas</h2>
      <ul>{gus}</ul>
    </section>
    <section class="srv-otros" aria-labelledby="ot">
      <h2 id="ot">Otros servicios</h2>
      <ul>{otros(f)}</ul>
    </section>
  </main>
  {FOOT}
</body>
</html>
'''
    open(P+f,'w').write(page)
    print('ok',f)
