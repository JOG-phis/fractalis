#!/usr/bin/env python3
"""Miniatura de una actividad: la primera página del PDF sobre fondo gris claro (feature.png, 1200 × 800).

Uso:  python tools/miniatura_pdf.py content/2eso/actividades/lectura-eureka/lectura-eureka.pdf
      (escribe feature.png en la misma carpeta; con --salida se elige otro destino)
"""
import argparse
import pathlib
import tempfile
from PIL import Image
from comun import pdftocairo

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('pdf')
ap.add_argument('--salida')
a = ap.parse_args()

pdf = pathlib.Path(a.pdf)
with tempfile.TemporaryDirectory() as t:
    base = pathlib.Path(t) / 'pagina'
    pdftocairo('-png', '-r', '80', '-f', '1', '-l', '1', '-singlefile', str(pdf), str(base))
    im = Image.open(str(base) + '.png').convert('RGB')
W, H = 1200, 800
fondo = Image.new('RGB', (W, H), '#e2e8f0')
im.thumbnail((W, H - 60))
fondo.paste(im, ((W - im.width) // 2, 30))
destino = pathlib.Path(a.salida) if a.salida else pdf.parent / 'feature.png'
fondo.save(destino, optimize=True)
print(destino)
