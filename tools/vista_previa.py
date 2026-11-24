#!/usr/bin/env python3
"""Imagen de vista previa de un curso (la que sale al compartir el enlace): <carpeta del curso>/feature.png, 1200 × 630.

Uso:  python tools/vista_previa.py 2eso
      python tools/vista_previa.py 3eso --lineas "Física y Química" "Apuntes, actividades y prácticas"
"""
import argparse
from PIL import Image, ImageDraw, ImageFilter
from comun import RAIZ, FONDO, curso, fuente
from fractales import FRACTALES, mascara, color_rgb, sierpinski

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('curso')
ap.add_argument('--lineas', nargs='+',
                help='líneas bajo el nombre del curso (la primera va en el color del curso). '
                     'Por defecto, las de data/cursos.json o «Física y Química / Apuntes y actividades»')
ap.add_argument('--salida', help='por defecto, feature.png en la carpeta del curso')
a = ap.parse_args()

c = curso(a.curso)
lineas = a.lineas or c.get('lineas', ['Física y Química', 'Apuntes y actividades'])
col = color_rgb(c['color']); prim = FRACTALES[c['fractal']]()
W, H = 1200, 630
im = Image.new('RGB', (W, H), FONDO)

# fondo: contorno del fractal muy tenue, grande y desplazado a la derecha
grande = mascara(prim, 900).filter(ImageFilter.FIND_EDGES).point(lambda p: 255 if p > 60 else 0)
grande = grande.filter(ImageFilter.MaxFilter(3)).point(lambda p: int(p * 0.13))
capa = Image.new('RGB', grande.size, col)
im.paste(capa, (W - 900 + 260, (H - 900) // 2), grande)

# icono del curso a la izquierda
icono = mascara(prim, 300)
im.paste(Image.new('RGB', (300, 300), col), (110, (H - 300) // 2), icono)

d = ImageDraw.Draw(im)
tx = 110 + 300 + 80
# marca: triángulo de Sierpinski + Fractalis
logo = mascara(sierpinski(3), 44)
im.paste(Image.new('RGB', (44, 44), (255, 255, 255)), (tx, 106), logo)
d.text((tx + 60, 106), 'Fractalis', font=fuente('SemiBold', 34), fill=(255, 255, 255))
d.text((tx, 205), c['nombre'], font=fuente('Bold', 120 if len(c['nombre']) < 9 else 84), fill=(255, 255, 255))
colores = [col] + [(203, 213, 225)] * 5
for i, linea in enumerate(lineas):
    d.text((tx, 352 + 60 * i), linea, font=fuente('Medium', 44), fill=colores[i])

destino = RAIZ / (a.salida or f"{c['carpeta']}/feature.png")
im.save(destino, optimize=True)
print(destino)
