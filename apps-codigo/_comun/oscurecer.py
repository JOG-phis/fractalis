"""Añade el modo oscuro (variantes dark:) a una app hecha solo en claro.
   python oscurecer.py archivo.tsx [...]   (modifica los archivos)

Recorre las cadenas de clases de Tailwind y, a cada clase de color sin pareja oscura, le añade su versión dark:
fondos blancos y claros -> pizarra oscura o tinte del color; textos oscuros -> claros; bordes claros -> oscuros.
Si la cadena ya tiene una clase dark: para esa propiedad (p. ej. dark:bg-…), no la toca.
Es un punto de partida: revisar después las capturas en modo oscuro."""
import re
import sys

TOKEN = re.compile(r'(?<![\w:/-])((?:hover:|group-hover:|focus:)?)(bg|text|border)-([a-z]+)(?:-(\d+))?(?:/(\d+))?(?![\w-])')
CADENA = re.compile(r'"[^"\n]*"|\'[^\'\n]*\'|`[^`]*`')
NEUTROS = {'slate', 'gray', 'zinc', 'neutral', 'stone'}


def oscuro(util, fam, n):
    if fam == 'white' and util == 'bg':
        return 'bg-slate-900'
    if n is None:
        return None
    n = int(n)
    if fam in NEUTROS:
        if util == 'bg':
            return {50: 'bg-slate-800/50', 100: 'bg-slate-800', 200: 'bg-slate-700', 300: 'bg-slate-600'}.get(n)
        if util == 'text':
            return {950: 'text-slate-50', 900: 'text-slate-100', 800: 'text-slate-100', 700: 'text-slate-200',
                    600: 'text-slate-300', 500: 'text-slate-400'}.get(n)
        if util == 'border':
            return {50: 'border-slate-800', 100: 'border-slate-800', 200: 'border-slate-800', 300: 'border-slate-700'}.get(n)
        return None
    if fam in ('black', 'transparent', 'current', 'inherit'):
        return None
    if util == 'bg':
        return {50: f'bg-{fam}-950/40', 100: f'bg-{fam}-900/40', 200: f'bg-{fam}-900/60'}.get(n)
    if util == 'text':
        return {950: f'text-{fam}-100', 900: f'text-{fam}-100', 800: f'text-{fam}-200', 700: f'text-{fam}-300',
                600: f'text-{fam}-400'}.get(n)
    if util == 'border':
        return {50: f'border-{fam}-900', 100: f'border-{fam}-900', 200: f'border-{fam}-800', 300: f'border-{fam}-700'}.get(n)
    return None


def es_color(util, fam):
    # text-xs, border-2, bg-gradient… no son colores
    return not (util == 'text' and fam in ('xs', 'sm', 'base', 'lg', 'xl', 'center', 'left', 'right', 'balance', 'wrap')) \
        and fam not in ('gradient', 'opacity', 'clip', 'dashed', 'dotted', 'solid', 'none', 'l', 'r', 't', 'b', 'x', 'y')


def tratar(cadena):
    nuevas = []
    for m in TOKEN.finditer(cadena):
        var, util, fam, n, _ = m.groups()
        if not es_color(util, fam):
            continue
        if re.search(rf'(?<![\w-])dark:{re.escape(var)}{util}-', cadena):
            continue  # ya tiene pareja oscura para esta propiedad
        o = oscuro(util, fam, n)
        if o and f'dark:{var}{o}' not in nuevas:
            nuevas.append(f'dark:{var}{o}')
    if not nuevas:
        return cadena
    q = cadena[-1]
    return cadena[:-1].rstrip() + ' ' + ' '.join(nuevas) + q


def plantilla(cadena):
    """`…${…}…`: las clases fijas reciben su pareja al final; lo de dentro de ${…} se trata aparte
    (así una clase que solo aparece en una rama de un ternario no gana una pareja oscura fija)."""
    trozos, fijo, i = [], [], 1
    while i < len(cadena) - 1:
        if cadena.startswith('${', i):
            nivel, j = 1, i + 2
            while j < len(cadena) and nivel:
                nivel += {'{': 1, '}': -1}.get(cadena[j], 0)
                j += 1
            trozos.append(('expr', oscurecer(cadena[i:j])))
            i = j
        else:
            k = cadena.find('${', i)
            k = len(cadena) - 1 if k == -1 else k
            trozos.append(('fijo', cadena[i:k]))
            fijo.append(cadena[i:k])
            i = k
    extra = tratar('"' + ' '.join(fijo) + '"')[1:-1][len(' '.join(fijo)):].strip()
    cuerpo = ''.join(t for _, t in trozos)
    return '`' + (cuerpo.rstrip() + ' ' + extra if extra else cuerpo) + '`'


def oscurecer(texto):
    return CADENA.sub(lambda m: plantilla(m.group(0)) if m.group(0)[0] == '`' else tratar(m.group(0)), texto)


if __name__ == '__main__':
    for f in sys.argv[1:]:
        t = open(f, encoding='utf-8').read()
        open(f, 'w', encoding='utf-8').write(oscurecer(t))
        print('oscurecido', f)
