# Productos de Casitres

Cada carpeta genera un producto con `generar.py`. Nada de lo generado se sube a git: sale a `dist/` (ignorado) y se vende desde R2.

| Carpeta | Producto | Sección | Archivo en R2 |
|---|---|---|---|
| `01-calendario-2027` | Calendario 2027 (16 págs.) | Imprimibles | `calendario-2027.pdf` |
| `02-presupuesto-mensual` | Hoja de cálculo + guía | Plantillas | `presupuesto-mensual.zip` |
| `03-planificador-oposiciones` | Hoja de cálculo + método | Estudio y oposiciones | `planificador-oposiciones.zip` |
| `04-prompts-buscar-trabajo` | 18 prompts | Packs de IA | `prompts-encontrar-trabajo.pdf` |
| `05-guia-alquilar-piso` | Guía LAU 2026 | Guías | `guia-alquilar-piso-2026.pdf` |
| `06-kit-instagram-negocio` | Kit de 30 días | Kits hechos | `kit-instagram-negocio.pdf` |
| `07-menu-semanal` | Planificador 4 semanas | Planificadores | `menu-semanal.pdf` |
| (empaquetar.py) | Pack Organiza tu 2027 | Packs | `pack-organiza-tu-2027.zip` |

## Generar y subir
```
python3 -m venv .venv && .venv/bin/pip install openpyxl pillow   # una vez
.venv/bin/python productos/empaquetar.py                          # genera todo en dist/descargas/
```
Al final imprime los comandos `npx wrangler r2 object put ...` para subir cada archivo.

## Reglas (todas las piezas)
- `comun/plantilla.py`: portada, logo casi3 en la cabecera de cada página y «Creado con IA · casi3» en el pie. Las hojas de cálculo llevan logo y aviso en cada pestaña (`comun/excel.py`).
- Datos oficiales con su fuente y fecha en el propio documento. Si un dato cambia (festivos, IRAV, leyes), se actualiza el `generar.py` y se regenera.
- Nombres de archivo en español claro, sin símbolos raros.
