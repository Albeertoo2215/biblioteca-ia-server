"""Guía para alquilar piso en España (LAU tras la Ley 12/2023). Maquetada con Typst."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'comun'))
from tipografia import pdf
AQUI = os.path.dirname(os.path.abspath(__file__))
pdf(open(os.path.join(AQUI, 'guia.typ')).read(), os.path.join(AQUI, '..', '..', 'dist', 'Guia para alquilar piso 2026 - casi3.pdf'))
