# Genera public/llms-full.txt: el texto completo de la web, para que los asistentes de IA lo lean de una vez
import re, html, glob, os
os.chdir('/home/user/folzia/public')
def texto(f):
    t = open(f).read()
    t = re.sub(r'<(script|style|header|footer|nav|form|svg|video)[\s\S]*?</\1>', '', t)
    m = re.search(r'<main[\s\S]*?</main>', t); t = m.group(0) if m else t
    t = re.sub(r'<h1[^>]*>', '\n# ', t); t = re.sub(r'<h2[^>]*>', '\n\n## ', t); t = re.sub(r'<h3[^>]*>', '\n\n### ', t)
    t = re.sub(r'<li[^>]*>', '\n- ', t); t = re.sub(r'<(p|summary|tr)[^>]*>', '\n\n', t); t = re.sub(r'</t[hd]>', ' | ', t)
    t = html.unescape(re.sub(r'<[^>]+>', '', t))
    t = re.sub(r'[ \t]+', ' ', t); t = re.sub(r'\n\s*\n+', '\n\n', t)
    return t.strip()
paginas = ['index.html', 'apps-web-a-medida.html', 'webs-y-tiendas-online.html', 'programas-para-empresas.html', 'primera-version-de-tu-idea.html']
paginas += [x for x in sorted(glob.glob('ejemplos/*.html')) if not x.endswith('index.html')]
paginas += [x for x in sorted(glob.glob('guias/*.html')) if not x.endswith('index.html')]
out = '# Folzia, texto completo de la web\n\n> Estudio de software a medida de Alberto García Marcos, en Madrid. Contacto: contacto@folzia.com, +34 606 430 834, https://folzia.com/\n'
for f in paginas:
    out += f'\n\n---\n\nFuente: https://folzia.com/{"" if f == "index.html" else f}\n\n' + texto(f)
open('llms-full.txt', 'w').write(out)
print(len(paginas), 'páginas,', len(out), 'caracteres')
