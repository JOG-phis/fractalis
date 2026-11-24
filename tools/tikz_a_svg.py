#!/usr/bin/env python3
r"""Compila figuras TikZ de unos apuntes LaTeX a SVG (una por figura, recortada) para la web.

Uso:
  python tools/tikz_a_svg.py APUNTES.tex CARPETA nombre=\\macro [nombre2=\\macro2 ...]
  python tools/tikz_a_svg.py APUNTES.tex CARPETA --reemplazos rotulos-en.tsv --idioma en nombre=\\macro ...

  nombre=\\macro   la figura que dibuja \\macro (definida con \\newcommand en el .tex) se guarda como nombre.svg.
                   Si la macro no contiene un tikzpicture, se envuelve en uno.
  nombre=@código   código LaTeX literal (por ejemplo, un tikzpicture copiado del documento).

  --reemplazos F   fichero de texto con una pareja por línea, separada por un tabulador:  {Fusión}<TAB>{Melting}
                   Se aplican a todo el documento de figuras antes de compilar (versión en inglés).
                   Conviene incluir las llaves para no tocar nombres de estilos o de macros. Avisa de los que no encuentra.
  --idioma XX      añade -XX al nombre de cada SVG (p. ej. --idioma en  →  cambios-estado-en.svg).
  --max-kb N       si un SVG pasa de N KB (por defecto 400), se sustituye por un PNG transparente a 3× (216 ppp).
                   Pasa con los degradados (\shade, bolas con «ball color»): pdftocairo los convierte en miles de
                   polígonos y el SVG puede pesar varios MB. En la página, la figura se enlaza entonces como nombre.png.

Necesita pdflatex (TeX Live o MiKTeX) y pdftocairo (Poppler). Usa el preámbulo completo del .tex,
cambia babel por inglés (para no depender del paquete en español; no se nota en las figuras) y añade lmodern y preview.
Deja en CARPETA/_build el documento figs.tex, el PDF y una vista previa PNG de cada figura.
"""
import argparse
import pathlib
import re
import subprocess
import sys

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument('tex')
ap.add_argument('carpeta')
ap.add_argument('figuras', nargs='+', help='nombre=\\macro o nombre=@código')
ap.add_argument('--reemplazos')
ap.add_argument('--idioma', default='')
ap.add_argument('--max-kb', type=int, default=400)
a = ap.parse_args()

tex, out = pathlib.Path(a.tex), pathlib.Path(a.carpeta)
src = tex.read_text(encoding='utf-8')
pre = src.split(r'\begin{document}')[0]
pre = re.sub(r'\\usepackage\[[^\]]*\]\{babel\}', r'\\usepackage[english]{babel}', pre)
pre = pre.replace(r'\usetikzlibrary{babel}', '')
pre += '\n\\usepackage{lmodern}\n\\usepackage[active,tightpage]{preview}\n\\setlength\\PreviewBorder{4pt}\n'


def cuerpo(macro):
    m = re.search(r'\\newcommand\{\\' + re.escape(macro.lstrip('\\')) + r'\}(\[\d\])?\{', src)
    if not m:
        return ''
    sig = src.find(r'\newcommand', m.end())
    return src[m.end(): sig if sig > 0 else len(src)]


paginas = []
for par in a.figuras:
    if '=' not in par:
        sys.exit(f'Argumento sin «=»: {par}')
    nombre, val = par.split('=', 1)
    if val.startswith('@'):
        codigo = val[1:]
    else:
        if not cuerpo(val):
            print(f'Aviso: no encuentro \\newcommand para {val}; se usa tal cual.')
        codigo = val if 'begin{tikzpicture}' in cuerpo(val) else r'\begin{tikzpicture}[x=1cm,y=1cm]' + val + r'\end{tikzpicture}'
    paginas.append((nombre + (f'-{a.idioma}' if a.idioma else ''), codigo))

doc = pre + '\\begin{document}\n' + ''.join(
    f'\\begin{{preview}}{c}\\end{{preview}}\n' for _, c in paginas) + '\\end{document}\n'

if a.reemplazos:
    for n, linea in enumerate(pathlib.Path(a.reemplazos).read_text(encoding='utf-8').splitlines(), 1):
        if not linea.strip() or linea.startswith('#'):
            continue
        if '\t' not in linea:
            sys.exit(f'{a.reemplazos}:{n}: falta el tabulador entre original y traducción')
        orig, trad = linea.split('\t', 1)
        if orig not in doc:
            print(f'Aviso: no encuentro «{orig}» ({a.reemplazos}:{n})')
        doc = doc.replace(orig, trad)

trabajo = out / '_build'
trabajo.mkdir(parents=True, exist_ok=True)
(trabajo / 'figs.tex').write_text(doc, encoding='utf-8')
r = subprocess.run(['pdflatex', '-interaction=nonstopmode', '-halt-on-error', 'figs.tex'],
                   cwd=trabajo, capture_output=True, text=True)
if r.returncode:
    log = (trabajo / 'figs.log').read_text(errors='replace')
    i = log.find('\n!')
    sys.exit('ERROR de LaTeX:' + log[i:i + 900])
for i, (nombre, _) in enumerate(paginas, 1):
    subprocess.run(['pdftocairo', '-svg', '-f', str(i), '-l', str(i), 'figs.pdf', f'../{nombre}.svg'], cwd=trabajo, check=True)
    subprocess.run(['pdftocairo', '-png', '-r', '110', '-f', str(i), '-l', str(i), '-singlefile', 'figs.pdf', nombre],
                   cwd=trabajo, check=True)
    svg = out / f'{nombre}.svg'
    if svg.stat().st_size > a.max_kb * 1024:
        kb = svg.stat().st_size // 1024
        subprocess.run(['pdftocairo', '-png', '-transp', '-r', '216', '-f', str(i), '-l', str(i), '-singlefile', 'figs.pdf',
                        f'../{nombre}'], cwd=trabajo, check=True)
        svg.unlink()
        print(f'{nombre}: el SVG pesaba {kb} KB; se deja como {nombre}.png')
print(f'{len(paginas)} figuras en {out}')
