#!/usr/bin/env python3
"""Imágenes de las tarjetas «Apuntes» y «Actividades» de un curso: un abanico con contenido real
sobre el contorno del fractal del curso. Escribe <curso>/apuntes/feature.png y <curso>/actividades/feature.png (1200 × 720).

Uso:  python tools/imagen_seccion.py 2eso
      python tools/imagen_seccion.py 2eso --solo apuntes --figuras a.png b.png c.png d.png e.png
      python tools/imagen_seccion.py 2eso --solo actividades --actividades lectura-eureka breakout-base-luna ...

Por defecto, Apuntes usa la imagen (feature.png o feature.jpg) de hasta 5 temas y Actividades la de hasta 5 actividades
(intentando que sean de tipos distintos). La del centro, que queda delante, es la tercera de la lista.
"""
import argparse
import pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from comun import RAIZ, FONDO, curso
from fractales import FRACTALES, mascara, color_rgb

W, H = 1200, 720


def fondo(prim, col):
    im = Image.new('RGBA', (W, H), FONDO + (255,))
    S0 = 1080
    borde = mascara(prim, S0).filter(ImageFilter.FIND_EDGES).point(lambda p: 255 if p > 60 else 0)
    borde = borde.filter(ImageFilter.MaxFilter(3)).point(lambda p: int(p * 0.30))
    capa = Image.new('RGBA', (S0, S0), col + (255,)); capa.putalpha(borde)
    im.alpha_composite(capa, ((W - S0) // 2, (H - S0) // 2))
    # halo suave detrás del abanico
    v = Image.new('L', (W, H), 0); ImageDraw.Draw(v).ellipse((150, 60, 1050, 660), fill=150)
    v = v.filter(ImageFilter.GaussianBlur(120)).point(lambda p: p // 5)
    halo = Image.new('RGBA', (W, H), col + (0,)); halo.putalpha(v)
    im.alpha_composite(halo)
    return im


def recorte(f):
    """Recorta el margen liso (el fondo de la miniatura) y deja solo el contenido."""
    im = Image.open(f).convert('RGB'); a = np.asarray(im).astype(int)
    m = np.abs(a - a[5, 5]).sum(2) > 12
    ys, xs = np.where(m)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)) if len(xs) else im


def tarjeta(img, size, margen=0.08, r=22):
    w, h = size
    c = Image.new('RGBA', size, (248, 250, 252, 255))
    im = img.copy(); im.thumbnail((int(w * (1 - 2 * margen)), int(h * (1 - 2 * margen))), Image.LANCZOS)
    c.alpha_composite(im.convert('RGBA'), ((w - im.width) // 2, (h - im.height) // 2))
    m = Image.new('L', size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, w - 1, h - 1), r, fill=255)
    o = Image.new('RGBA', size, (0, 0, 0, 0)); o.paste(c, (0, 0), m)
    ImageDraw.Draw(o).rounded_rectangle((0, 0, w - 1, h - 1), r, outline=(255, 255, 255, 120), width=3)
    return o


def colocar(base, im, cx, cy, ang):
    pad = 60
    s = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
    sombra = Image.new('RGBA', im.size, (0, 0, 0, 150))
    s.paste(sombra, (pad + 6, pad + 16), im.split()[-1]); s = s.filter(ImageFilter.GaussianBlur(16))
    s.alpha_composite(im, (pad, pad))
    s = s.rotate(ang, resample=Image.BICUBIC, expand=True)
    base.alpha_composite(s, (int(cx - s.width / 2), int(cy - s.height / 2)))


def abanico(base, imgs, size, giro, dx):
    n = len(imgs); mid = (n - 1) / 2
    for i in sorted(range(n), key=lambda i: -abs(i - mid)):     # la del centro, la última (delante)
        k = i - mid
        colocar(base, tarjeta(imgs[i], size), W / 2 + k * dx, H / 2 + abs(k) ** 1.6 * 14 + 8, -k * giro)
    return base.convert('RGB')


def por_defecto_actividades(carpeta):
    """Hasta 5 actividades, una de cada tipo primero, con un breakout en el centro si lo hay."""
    import re
    elegidas, tipos = [], set()
    paginas = sorted(p for p in (carpeta / 'actividades').glob('*/index.md') if (p.parent / 'feature.png').exists())
    for p in paginas:
        m = re.search(r'^clase:\s*"?(\w+)', p.read_text(encoding='utf-8'), re.M)
        t = m.group(1) if m else ''
        if t not in tipos:
            tipos.add(t); elegidas.append((t, p.parent))
    centro = [e for e in elegidas if e[0] == 'breakouts'][:1]
    resto = [e for e in elegidas if e not in centro][:5 - len(centro)]
    orden = resto[:2] + centro + resto[2:]
    return [e[1] / 'feature.png' for e in orden]


ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('curso')
ap.add_argument('--solo', choices=['apuntes', 'actividades'])
ap.add_argument('--figuras', nargs='+', help='PNG para el abanico de Apuntes (por defecto, feature.png de los temas)')
ap.add_argument('--actividades', nargs='+', help='carpetas (slugs) de las actividades del abanico')
a = ap.parse_args()

c = curso(a.curso); col = color_rgb(c['color']); prim = FRACTALES[c['fractal']]()
carpeta = RAIZ / c['carpeta']

if a.solo in (None, 'apuntes'):
    figs = [pathlib.Path(f) for f in a.figuras] if a.figuras else \
        sorted(f for f in (carpeta / 'apuntes').glob('tema-*/feature.*') if f.suffix in ('.png', '.jpg'))[:5]
    if figs:
        # Las fotos de cabecera (feature.jpg) van enteras; a las figuras (feature.png) se les quita el margen.
        abanico(fondo(prim, col), [recorte(f) if f.suffix == '.png' else Image.open(f).convert('RGB') for f in figs],
                (420, 315), 9, 165).save(carpeta / 'apuntes' / 'feature.png', optimize=True)
        print(f'{c["carpeta"]}/apuntes/feature.png  ({len(figs)} figuras)')
if a.solo in (None, 'actividades'):
    figs = [carpeta / 'actividades' / s / 'feature.png' for s in a.actividades] if a.actividades else \
        por_defecto_actividades(carpeta)
    if figs:
        abanico(fondo(prim, col), [recorte(f) for f in figs], (290, 410), 8, 150).save(carpeta / 'actividades' / 'feature.png', optimize=True)
        print(f'{c["carpeta"]}/actividades/feature.png  ({len(figs)} fichas)')
