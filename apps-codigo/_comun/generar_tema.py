"""Genera tema.css: el tema de Tailwind de las apps de Fractalis (color «acento» de cada curso, modo oscuro por clase, formas).

Uso (desde apps-codigo/_comun, con node_modules instalado en alguna app):
    python generar_tema.py ../<app>/node_modules/tailwindcss/theme.css

Toma las escalas de color de Tailwind para que el «acento» de cada curso sea exactamente su color de la web
(acento-400 = color del curso). Del 500 en adelante va un paso más oscuro: así el texto blanco sobre bg-acento-600
cumple el contraste AA.
"""
import re
import sys

T = open(sys.argv[1], encoding='utf-8').read()


def paleta(familia):
    return {int(n): v for n, v in re.findall(rf'--color-{familia}-(\d+):\s*([^;]+);', T)}


# Curso -> familia de Tailwind de su color en la web (data/cursos.json)
CURSOS = [('2eso', 'sky'), ('3eso', 'teal'), ('4eso', 'green'), ('1bach', 'violet'),
          ('2bach-quimica', 'amber'), ('2bach-fisica', 'red'), ('proyectos', 'pink')]
PASOS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
DESPLAZA = {50: 50, 100: 100, 200: 200, 300: 300, 400: 400, 500: 600, 600: 700, 700: 800, 800: 900, 900: 950, 950: 950}

L = ['''/* Tema de Fractalis para las apps (Tailwind CSS v4). Se importa en el index.css de cada app, después de tailwindcss:
     @import "tailwindcss";
     @import "../../_comun/tema.css";
   Generado por generar_tema.py (en esta carpeta). Qué hace:
   - Color «acento»: bg-acento-600, text-acento-700, border-acento-300… es el color del curso de la app
     (acento-400 = el color exacto del curso; del 500 en adelante va un paso más oscuro para que el texto blanco se lea bien).
     El curso lo pone el kit en <html data-curso="…"> a partir de la cabecera.
   - Modo oscuro por clase (<html class="dark">): lo pone el kit, siguiendo a la web cuando la app está incrustada
     y al sistema cuando se abre sola.
   - Formas sobrias, como la web: esquinas moderadas y sombras suaves.
   - Fuente del sistema. */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-display: var(--font-sans);
  --font-mono: ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace;
  /* Esquinas: tarjetas y paneles como mucho 0.75rem (la web usa 0.375–0.75rem) */
  --radius-2xl: 0.75rem;
  --radius-3xl: 0.875rem;
  /* Sombras suaves: en Fractalis los bloques se separan con bordes, no con sombras */
  --shadow-sm: 0 1px 2px 0 rgb(15 23 42 / 0.06);
  --shadow: 0 1px 3px 0 rgb(15 23 42 / 0.08);
  --shadow-md: 0 2px 6px -1px rgb(15 23 42 / 0.08);
  --shadow-lg: 0 6px 16px -4px rgb(15 23 42 / 0.12);
  --shadow-xl: 0 10px 24px -6px rgb(15 23 42 / 0.14);
  --shadow-2xl: 0 16px 36px -10px rgb(15 23 42 / 0.18);''']
L += [f'  --color-acento-{p}: var(--fx-a-{p});' for p in PASOS]
L.append('}\n')
for curso, familia in CURSOS:
    P = paleta(familia)
    selector = ':root, :root[data-curso="2eso"]' if curso == '2eso' else f':root[data-curso="{curso}"]'
    L.append(f'{selector} {{ /* {familia} */\n  ' + ' '.join(f'--fx-a-{p}: {P[DESPLAZA[p]]};' for p in PASOS) + '\n}')
L.append('''
/* Fondo y texto de la página. Incrustada en Fractalis, el fondo es transparente para que se vea el de la web. */
:root { color-scheme: light; }
:root.dark { color-scheme: dark; }
body { margin: 0; font-family: var(--font-sans); background-color: var(--color-slate-50); color: var(--color-slate-900); }
.dark body { background-color: var(--color-slate-950); color: var(--color-slate-100); }
:root.fx-en-web body { background-color: transparent; }
''')
open('tema.css', 'w', encoding='utf-8').write('\n'.join(L))
print('tema.css generado')
