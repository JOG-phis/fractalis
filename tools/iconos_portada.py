#!/usr/bin/env python3
"""Genera los iconos de la portada: content/course-<curso>.svg, con el fractal y el color de data/cursos.json.

Uso:  python tools/iconos_portada.py            (todos los cursos)
      python tools/iconos_portada.py 4eso       (solo uno)
"""
import sys
from comun import RAIZ, CURSOS, curso
from fractales import FRACTALES, a_svg

ids = sys.argv[1:] or list(CURSOS)
for cid in ids:
    c = curso(cid)
    svg = a_svg(FRACTALES[c['fractal']](), c['color'], c['nombre_fractal'])
    destino = RAIZ / 'content' / f'course-{cid}.svg'
    destino.write_text(svg, encoding='utf-8')
    print(f'{destino.relative_to(RAIZ)}  ({len(svg) // 1024} KB)')
