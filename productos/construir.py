"""Compila todos los documentos Typst (carpeta/doc.typ) y ejecuta los generar.py (hojas de cálculo, Word).
Cada doc.typ empieza con «// archivo: Nombre - casi3.pdf». Salida en dist/."""
import os, re, subprocess, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.dirname(AQUI)
sys.path.insert(0, os.path.join(AQUI, 'comun'))
from tipografia import pdf
solo = sys.argv[1:]
for d in sorted(os.listdir(AQUI)):
    if solo and not any(s in d for s in solo): continue
    carpeta = os.path.join(AQUI, d)
    t = os.path.join(carpeta, 'doc.typ')
    if os.path.exists(t):
        src = open(t).read(); nombre = re.match(r'// archivo: (.+)', src).group(1).strip()
        pdf(src, os.path.join(RAIZ, 'dist', nombre))
    g = os.path.join(carpeta, 'generar.py')
    if os.path.exists(g): subprocess.run([sys.executable, g], check=True, cwd=carpeta)
