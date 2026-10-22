"""Compila un .typ con la plantilla de Casitres: tipografia.pdf('fuente.typ', 'salida.pdf')."""
import os, shutil, tempfile, typst
AQUI = os.path.dirname(os.path.abspath(__file__))
def pdf(typ_src, salida):
    os.makedirs(os.path.dirname(salida), exist_ok=True)
    with tempfile.TemporaryDirectory() as t:
        for f in ('casi3.typ', 'logo.svg'): shutil.copy(os.path.join(AQUI, f), t)
        src = os.path.join(t, 'doc.typ'); open(src, 'w').write(typ_src)
        typst.compile(src, output=salida, font_paths=[os.path.join(AQUI, 'fuentes')], root=t)
    print('PDF', salida)
