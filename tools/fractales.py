"""Fractales de Fractalis: geometría común para los iconos (SVG) y las imágenes (PNG).

Cada fractal devuelve una lista de primitivas dibujadas en un lienzo de 400 × 400 unidades:
  ('relleno', [polígonos], evenodd)   polígonos rellenos; con evenodd=True los interiores se alternan (huecos)
  ('trazo', [polilíneas], grosor)      líneas con extremos y uniones redondeados
  ('circulos', [(x, y, r), ...])       círculos rellenos
Con esas primitivas, a_svg() escribe un SVG y mascara() dibuja una máscara en escala de grises
que luego se colorea con el color de cada curso.
"""
import math
import numpy as np
from PIL import Image, ImageDraw, ImageChops

LADO = 400


def _encajar(P, margen=10):
    """Escala y centra un array de puntos para que ocupe el lienzo dejando un margen."""
    P = np.asarray(P, float)
    mn, mx = P.min(0), P.max(0)
    k = (LADO - 2 * margen) / (mx - mn).max()
    return (P - mn) * k + (LADO - (mx - mn) * k) / 2, k


# ---------------------------------------------------------------- fractales

def alfombra(nivel=3):
    """Alfombra de Sierpinski (2º ESO)."""
    polis = [[(20, 20), (380, 20), (380, 380), (20, 380)]]
    def hueco(x, y, s, n):
        if n == 0:
            return
        t = s / 3
        polis.append([(x + t, y + t), (x + 2 * t, y + t), (x + 2 * t, y + 2 * t), (x + t, y + 2 * t)])
        for i in range(3):
            for j in range(3):
                if (i, j) != (1, 1):
                    hueco(x + i * t, y + j * t, t, n - 1)
    hueco(20, 20, 360, nivel)
    return [('relleno', polis, True)]


def koch(nivel=4):
    """Copo de nieve de Koch (3º ESO)."""
    def seg(p, q, n):
        if n == 0:
            return [p]
        (x1, y1), (x2, y2) = p, q
        dx, dy = (x2 - x1) / 3, (y2 - y1) / 3
        a = (x1 + dx, y1 + dy); b = (x1 + 2 * dx, y1 + 2 * dy)
        c = (a[0] + dx * 0.5 - dy * 0.866, a[1] + dy * 0.5 + dx * 0.866)
        return seg(p, a, n - 1) + seg(a, c, n - 1) + seg(c, b, n - 1) + seg(b, q, n - 1)
    r = 176
    v = [(200 + r * math.sin(math.radians(a)), 208 - r * math.cos(math.radians(a))) for a in (0, 240, 120)]
    pts = []
    for i in range(3):
        pts += seg(v[i], v[(i + 1) % 3], nivel)
    P, _ = _encajar(pts, 15)
    return [('relleno', [P.tolist()], False)]


def sierpinski(nivel=5):
    """Triángulo de Sierpinski (reservado para el logo de la web)."""
    tris = []
    def t(a, b, c, n):
        if n == 0:
            tris.append([a, b, c]); return
        m = lambda u, v: ((u[0] + v[0]) / 2, (u[1] + v[1]) / 2)
        t(a, m(a, b), m(a, c), n - 1); t(m(a, b), b, m(b, c), n - 1); t(m(a, c), m(b, c), c, n - 1)
    h = 0.866 * 380
    y0 = (LADO - h) / 2
    t((10, y0 + h), (390, y0 + h), (200, y0), nivel)
    return [('relleno', tris, False)]


def arbol(niveles=5, angulo=38, ratio=0.68, grosor=26):
    """Árbol fractal abierto (4º ESO)."""
    por_grosor = {}
    def rama(x, y, a, L, n, w):
        x2 = x + L * math.cos(a); y2 = y - L * math.sin(a)
        por_grosor.setdefault(round(w, 1), []).append([(x, y), (x2, y2)])
        if n:
            rama(x2, y2, a + math.radians(angulo), L * ratio, n - 1, w * 0.74)
            rama(x2, y2, a - math.radians(angulo), L * ratio, n - 1, w * 0.74)
    rama(200, 392, math.pi / 2, 118, niveles, grosor)
    return [('trazo', segs, w) for w, segs in sorted(por_grosor.items(), reverse=True)]


def mandelbrot(resolucion=1400, iteraciones=120, vertical=True):
    """Contorno del conjunto de Mandelbrot (1º Bachillerato). Necesita matplotlib.
    vertical=True: eje de simetría vertical, con la «antena» hacia arriba (como los demás iconos, simétricos)."""
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    # encuadre: en vertical se recorta la punta de la antena, casi invisible a tamaño de icono, para que el cuerpo se vea más grande
    x0, x1, y0, y1 = (-1.62, 0.52, -1.07, 1.07) if vertical else (-1.82, 0.50, -1.16, 1.16)
    xs = np.linspace(x0, x1, resolucion); ys = np.linspace(y0, y1, resolucion)
    c = xs[None, :] + 1j * ys[:, None]
    z = np.zeros_like(c); dentro = np.ones(c.shape, bool)
    for _ in range(iteraciones):
        z[dentro] = z[dentro] ** 2 + c[dentro]
        dentro &= np.abs(z) <= 2
    cs = plt.contour(xs, ys, dentro.astype(float), levels=[0.5])
    polis = []
    for p in cs.get_paths():
        for poly in p.to_polygons():
            if len(poly) < 8:
                continue
            X = (poly[:, 0] - x0) / (x1 - x0) * 380 + 10
            Y = (poly[:, 1] - y0) / (y1 - y0) * 380 + 10
            pts = np.c_[Y, X] if vertical else np.c_[X, Y]; quedan = [pts[0]]
            for q in pts[1:]:
                if np.hypot(*(q - quedan[-1])) > 0.9:
                    quedan.append(q)
            polis.append([tuple(q) for q in quedan])
    plt.close('all')
    return [('relleno', polis, True)]


def dendrimero():
    """Dendrímero: molécula que se ramifica desde un núcleo (Química)."""
    c = 200; R = [0, 48, 98, 142, 180]
    nivel = [[(c, c, 0)]]
    nivel.append([(c + R[1] * math.cos(a), c + R[1] * math.sin(a), a)
                  for a in [math.radians(-90 + 120 * i) for i in range(3)]])
    for g in range(2, 5):
        abre = math.radians(60 / (2 ** (g - 2))); nuevo = []
        for (x, y, a) in nivel[-1]:
            for s in (-1, 1):
                aa = a + s * abre / 2
                nuevo.append((c + R[g] * math.cos(aa), c + R[g] * math.sin(aa), aa))
        nivel.append(nuevo)
    enlaces = [[(c, c), q[:2]] for q in nivel[1]]
    for g in range(2, 5):
        for i, q in enumerate(nivel[g]):
            p = nivel[g - 1][i // 2]
            enlaces.append([p[:2], q[:2]])
    radios = [20, 15, 12, 10, 11]
    bolas = [(x, y, radios[g]) for g, l in enumerate(nivel) for x, y, _ in l]
    return [('trazo', enlaces, 7), ('circulos', bolas)]


def dragon(iteraciones=8, giro=135):
    """Curva del dragón con las esquinas achaflanadas (Física)."""
    s = 'FX'
    for _ in range(iteraciones):
        s = ''.join({'X': 'X+YF+', 'Y': '-FX-Y'}.get(ch, ch) for ch in s)
    x = y = 0; a = 0; pts = [(0, 0)]
    for ch in s:
        if ch == 'F':
            x += round(math.cos(a)); y += round(math.sin(a)); pts.append((x, y))
        elif ch == '+':
            a += math.pi / 2
        elif ch == '-':
            a -= math.pi / 2
    P = np.array(pts, float)
    M = np.vstack([P[0], (P[1:] + P[:-1]) / 2, P[-1]])   # vértices en los puntos medios: la curva no se toca
    t = math.radians(giro)
    M = M @ np.array([[math.cos(t), -math.sin(t)], [math.sin(t), math.cos(t)]]).T
    M, k = _encajar(M, 10)
    return [('trazo', [M.tolist()], k * 0.52)]


FRACTALES = {'alfombra': alfombra, 'koch': koch, 'sierpinski': sierpinski, 'arbol': arbol,
             'mandelbrot': mandelbrot, 'dendrimero': dendrimero, 'dragon': dragon}

# ---------------------------------------------------------------- salida

def _n(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def a_svg(primitivas, color, titulo=''):
    partes = []
    for p in primitivas:
        if p[0] == 'relleno':
            d = ''.join('M' + ' '.join(f'{_n(x)} {_n(y)}' for x, y in poli) + 'z' for poli in p[1])
            regla = ' fill-rule="evenodd"' if p[2] else ''
            partes.append(f'<path fill="{color}"{regla} d="{d}"/>')
        elif p[0] == 'trazo':
            d = ''.join('M' + ' '.join(f'{_n(x)} {_n(y)}' for x, y in l) for l in p[1])
            partes.append(f'<path fill="none" stroke="{color}" stroke-width="{_n(p[2])}" '
                          f'stroke-linecap="round" stroke-linejoin="round" d="{d}"/>')
        elif p[0] == 'circulos':
            partes.append(f'<g fill="{color}">' + ''.join(
                f'<circle cx="{_n(x)}" cy="{_n(y)}" r="{_n(r)}"/>' for x, y, r in p[1]) + '</g>')
    t = f'<title>{titulo}</title>' if titulo else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {LADO} {LADO}" role="img">'
            f'{t}{"".join(partes)}</svg>\n')


def mascara(primitivas, tam, sobremuestreo=4):
    """Máscara 'L' de tam × tam píxeles (255 = fractal)."""
    T = tam * sobremuestreo; k = T / LADO
    total = Image.new('L', (T, T), 0)
    for p in primitivas:
        capa = Image.new('L', (T, T), 0); d = ImageDraw.Draw(capa)
        if p[0] == 'relleno':
            if p[2]:
                acum = Image.new('1', (T, T), 0)
                for poli in p[1]:
                    m = Image.new('1', (T, T), 0)
                    ImageDraw.Draw(m).polygon([(x * k, y * k) for x, y in poli], fill=1)
                    acum = ImageChops.logical_xor(acum, m)
                capa = acum.convert('L')
            else:
                for poli in p[1]:
                    d.polygon([(x * k, y * k) for x, y in poli], fill=255)
        elif p[0] == 'trazo':
            w = max(1, int(p[2] * k)); r = w / 2
            for l in p[1]:
                pts = [(x * k, y * k) for x, y in l]
                d.line(pts, fill=255, width=w, joint='curve')
                for x, y in (pts[0], pts[-1]):
                    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
        elif p[0] == 'circulos':
            for x, y, r in p[1]:
                d.ellipse(((x - r) * k, (y - r) * k, (x + r) * k, (y + r) * k), fill=255)
        total = ImageChops.lighter(total, capa)
    return total.resize((tam, tam), Image.LANCZOS)


def color_rgb(hexa):
    hexa = hexa.lstrip('#')
    return tuple(int(hexa[i:i + 2], 16) for i in (0, 2, 4))


def imagen(primitivas, tam, color):
    """PNG RGBA transparente con el fractal del color dado."""
    m = mascara(primitivas, tam)
    im = Image.new('RGBA', (tam, tam), color_rgb(color) + (0,))
    im.putalpha(m)
    return im
