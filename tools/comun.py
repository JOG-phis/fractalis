"""Utilidades compartidas por los scripts de tools/."""
import json
import pathlib
import subprocess
import sys

RAIZ = pathlib.Path(__file__).resolve().parents[1]          # carpeta del sitio (donde está hugo.toml / config/)
CURSOS = json.loads((RAIZ / 'data' / 'cursos.json').read_text(encoding='utf-8'))   # también lo usa Hugo (site.Data.cursos)
FONDO = (15, 23, 42)                                         # azul marino de las tarjetas de la portada


def curso(cid):
    if cid not in CURSOS:
        sys.exit(f'Curso desconocido: {cid}. Opciones: {", ".join(CURSOS)}')
    return CURSOS[cid]


def fuente(peso='Bold', tam=40):
    """Busca Inter (la fuente de la web) y, si no está, otra sans serif del sistema."""
    from PIL import ImageFont
    nombres = {'Bold': ['Inter-Bold.otf', 'Inter-Bold.ttf', 'segoeuib.ttf', 'arialbd.ttf', 'DejaVuSans-Bold.ttf'],
               'SemiBold': ['Inter-SemiBold.otf', 'Inter-SemiBold.ttf', 'seguisb.ttf', 'arialbd.ttf', 'DejaVuSans-Bold.ttf'],
               'Medium': ['Inter-Medium.otf', 'Inter-Medium.ttf', 'segoeui.ttf', 'arial.ttf', 'DejaVuSans.ttf']}[peso]
    carpetas = [pathlib.Path('/usr/share/fonts'), pathlib.Path('C:/Windows/Fonts'),
                pathlib.Path.home() / 'AppData/Local/Microsoft/Windows/Fonts',
                pathlib.Path('/Library/Fonts'), pathlib.Path.home() / 'Library/Fonts']
    for n in nombres:
        for c in carpetas:
            if c.exists():
                for f in c.rglob(n):
                    return ImageFont.truetype(str(f), tam)
    return ImageFont.load_default(size=tam)


def pdftocairo(*args):
    try:
        subprocess.run(['pdftocairo', *args], check=True)
    except FileNotFoundError:
        sys.exit('Falta pdftocairo (Poppler). En Windows: winget install oschwartz10612.Poppler (o conda install poppler).')
