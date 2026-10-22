"""Genera todos los productos y los empaqueta en dist/descargas/ (lo que se sube a R2)."""
import os, subprocess, sys, zipfile
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.dirname(AQUI)
DIST = os.path.join(RAIZ, 'dist'); OUT = os.path.join(DIST, 'descargas'); PY = os.path.join(RAIZ, '.venv', 'bin', 'python')
for d in sorted(os.listdir(AQUI)):
    g = os.path.join(AQUI, d, 'generar.py')
    if os.path.exists(g): subprocess.run([PY, g], check=True, cwd=os.path.join(AQUI, d))
# Producto: nombre del archivo en R2 -> archivos que incluye
PAQUETES = {
 'calendario-2027.pdf': ['Calendario 2027 para imprimir - casi3.pdf'],
 'presupuesto-mensual.zip': ['Presupuesto mensual - casi3.xlsx', 'Presupuesto mensual - guia de uso - casi3.pdf'],
 'planificador-oposiciones.zip': ['Planificador de oposiciones - casi3.xlsx', 'Planificador de oposiciones - metodo de estudio - casi3.pdf'],
 'prompts-encontrar-trabajo.pdf': ['Prompts para encontrar trabajo - casi3.pdf'],
 'guia-alquilar-piso-2026.pdf': ['Guia para alquilar piso 2026 - casi3.pdf'],
 'kit-instagram-negocio.pdf': ['Kit Instagram para tu negocio - casi3.pdf'],
 'menu-semanal.pdf': ['Menu semanal y lista de la compra - casi3.pdf'],
 'pack-organiza-tu-2027.zip': ['Calendario 2027 para imprimir - casi3.pdf', 'Presupuesto mensual - casi3.xlsx', 'Presupuesto mensual - guia de uso - casi3.pdf', 'Menu semanal y lista de la compra - casi3.pdf'],
}
os.makedirs(OUT, exist_ok=True)
for destino, archivos in PAQUETES.items():
    ruta = os.path.join(OUT, destino)
    if destino.endswith('.zip'):
        with zipfile.ZipFile(ruta, 'w', zipfile.ZIP_DEFLATED) as z:
            for a in archivos: z.write(os.path.join(DIST, a), a)
    else:
        import shutil; shutil.copy(os.path.join(DIST, archivos[0]), ruta)
    print('listo', destino)
print('\nSubir a R2:\n' + '\n'.join(f'npx wrangler r2 object put casitres-files/{d} --file "dist/descargas/{d}"' for d in PAQUETES))
