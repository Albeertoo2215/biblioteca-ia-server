"""Construye un PDF: construir.pdf(html, ruta_salida, titulo)."""
import os, subprocess, tempfile
from plantilla import cabecera, pie
AQUI = os.path.dirname(os.path.abspath(__file__))
def pdf(html, salida, titulo):
    os.makedirs(os.path.dirname(salida), exist_ok=True)
    with tempfile.TemporaryDirectory() as t:
        h, c, p = (os.path.join(t, n) for n in ('doc.html', 'cab.html', 'pie.html'))
        open(h, 'w').write(html); open(c, 'w').write(cabecera()); open(p, 'w').write(pie(titulo))
        subprocess.run(['node', os.path.join(AQUI, 'render.cjs'), h, salida, c, p], check=True)
    print('PDF', salida)
