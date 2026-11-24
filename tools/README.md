# Herramientas de Fractalis

Scripts para preparar el contenido de la web. No forman parte de la web (Hugo ignora esta carpeta). Se ejecutan **desde la carpeta del sitio**, por ejemplo `python tools/iconos_portada.py`.

## Requisitos

- Python 3.10 o posterior y las librerías de `requirements.txt`: `pip install -r tools/requirements.txt`
- Solo para figuras y miniaturas de PDF:
  - **pdflatex**, de TeX Live o MiKTeX.
  - **pdftocairo**, de Poppler. En Windows: `winget install oschwartz10612.Poppler`.

## Qué hay

| Script | Para qué | Escribe en |
|---|---|---|
| `tikz_a_svg.py` | Compila las figuras TikZ de unos apuntes `.tex` a SVG. Con `--reemplazos` y `--idioma en` hace la versión en inglés. | la carpeta que le indiques |
| `miniatura_pdf.py` | Miniatura de una actividad: primera página del PDF sobre fondo gris. | `feature.png` junto al PDF |
| `iconos_portada.py` | Iconos de los cursos en la portada (SVG). | `content/course-<curso>.svg` |
| `imagen_seccion.py` | Imágenes de las tarjetas «Apuntes» y «Actividades» de un curso: un abanico con contenido real sobre el fractal del curso. | `content/<curso>/apuntes/feature.png` y `.../actividades/feature.png` |
| `vista_previa.py` | Imagen que sale al compartir el enlace de un curso (WhatsApp, Classroom…). | `content/<curso>/feature.png` |
| `revisar_front_matter.py` | Revisa el front matter de apuntes, actividades y proyectos: que lleven `materia`, `tema` y `clase`, que usen solo términos de `data/vocabulario.yaml` y que la versión inglesa coincida con la española. Con `--paginas` crea las páginas de las taxonomías que falten. | `content/materia/`, `content/herramienta/`, `content/metodologia/` (solo con `--paginas`) |
| `fichas.py` | Rellena sesiones, agrupamiento, materiales, herramienta, metodología y guía del profesor de todas las actividades desde una tabla (`tools/fichas.csv`, se abre en Excel). `generar` crea la tabla; `aplicar` la escribe en `index.md` e `index.en.md`. | front matter de las actividades |
| `data/vocabulario.yaml` | Términos permitidos en `materia`, `herramienta`, `metodologia`, `clase` y `agrupamiento`, con su nombre en español e inglés. | — |
| `data/cursos.json` | Datos de cada curso: nombre, carpeta, color, fractal. Lo usan los tres scripts anteriores. | — |
| `fractales.py`, `comun.py` | Código compartido: geometría de los fractales y utilidades. | — |

Cada script tiene ayuda con ejemplos: `python tools/<script>.py --help`.

## Recetas

### Figuras de un tema

1. Busca en el `.tex` la macro que dibuja cada figura (`\figcambios`, `\dibsolido`…).
2. Compila las que vayan a la web:
   ```
   python tools/tikz_a_svg.py "C:\Proyectos\Recursos\2eso\apuntes\tema-2\estados-materia\apuntes-estados-materia.tex" figs cambios-estado=\figcambios grafica-calentamiento=\figcalentamiento
   ```
3. Revisa las vistas previas en `figs/_build/*.png` y copia solo los SVG que use la página al bundle del tema. Si un SVG pasa de 400 KB (pasa con los degradados, como las bolas sombreadas), el script lo deja como PNG transparente a 3×: en la página se enlaza entonces `nombre.png`.
4. Para la versión en inglés, prepara `rotulos-en.tsv` con una pareja por línea, separada por un tabulador (`{Fusión}` TAB `{Melting}`). Después compila de nuevo con `--reemplazos rotulos-en.tsv --idioma en`: saldrán `cambios-estado-en.svg`, etc.

   Pon las llaves en los reemplazos para no cambiar nombres de estilos o macros (`agua` puede ser un estilo; `{agua}` es un rótulo). El script avisa de los que no encuentra.

### Abrir un curso nuevo (p. ej. 4º ESO)

1. Comprueba sus datos en `data/cursos.json` (nombre, carpeta, color, fractal). De ahí salen también su tarjeta en la portada y los nombres de las secciones.
2. Crea la estructura con los arquetipos de Hugo (desde la carpeta del sitio):
   ```
   hugo new content --kind curso 4eso
   hugo new content --kind tema 4eso/apuntes/tema-1
   hugo new content --kind actividad 4eso/actividades/breakout-lo-que-sea
   ```
   - `curso` crea el curso con «Apuntes de 4º ESO» y «Actividades de 4º ESO», en español e inglés, y deja puesto el listado con filtros. Si la carpeta del curso ya existe (como pasa ahora con 3º, 4º, 1º y 2º Bach), añade `--force` para que sobrescriba su `_index.md`.
   - `tema` crea `index.md` e `index.en.md` con `tema:` y `weight` sacados del nombre de la carpeta (tiene que ser `tema-N`).
   - `actividad` deja preparados `clase`, `tema`, `formato`, `paginas`, `pdf` y `soluciones`.

   Las páginas nuevas nacen como borrador (`draft: true`): se ven con `hugo server -D` y no se publican hasta quitarlo.
3. Copia el PDF a la carpeta de cada tema o actividad. Para las actividades, haz la miniatura con `python tools/miniatura_pdf.py <ruta del PDF>`.
4. Cuando tenga temas y actividades con su `feature.png`:
   ```
   python tools/imagen_seccion.py 4eso
   python tools/vista_previa.py 4eso
   ```
   `imagen_seccion.py` elige por defecto cinco temas y cinco actividades de tipos distintos. Con `--figuras` o `--actividades` se eligen a mano; la tercera de la lista queda en el centro, delante.

### Qué pone la plantilla y qué se escribe a mano

Los textos repetidos los añade la plantilla a partir del front matter. Están en `i18n/es.yaml` y `i18n/en.yaml`, así que salen en el idioma de cada página:

| | Lo pone la plantilla | Se escribe en la página |
|---|---|---|
| **Tema** (`tema:` + `pdf:`) | entradilla, botón de descarga arriba y abajo, «Actividades de este tema», licencia | el resumen del tema (`{{< katex >}}` si lleva fórmulas) |
| **Actividad** (`clase:` + `pdf:`) | ficha (tema, `formato`, `paginas`), botones de la actividad y de las `soluciones`, enlace a los apuntes del tema, licencia | la entradilla (`lead`) y el contenido |

Si una página no tiene `pdf:` en el front matter, la plantilla no añade nada (como la práctica de tensión superficial).

### Etiquetas y tipos de actividad

- `clase:` es una taxonomía: cada tipo tiene su página con las actividades de todos los cursos (`/clase/breakouts/`, `/clase/lecturas/`…), y la etiqueta del tipo sale sola en cada actividad. Sus títulos están en `content/clase/<tipo>/_index.md`.
- `tags:` son solo conceptos (2-5, en minúscula): ni el nombre del tema ni el tipo de actividad ni «física»/«química».
- Mientras un curso no tenga ninguna página publicada, su página muestra el aviso «Hic sunt dracones» (shortcode `curso-vacio`) y su tarjeta de la portada sale atenuada con «Próximamente». Desaparecen solos al publicar el primer tema o actividad.

### Cambiar el color o el fractal de un curso

Edita `data/cursos.json` y vuelve a generar lo que lo usa:
```
python tools/iconos_portada.py
python tools/imagen_seccion.py <curso>
python tools/vista_previa.py <curso>
```
Los fractales disponibles están en `fractales.py`: alfombra, koch, sierpinski (reservado para el logo), arbol, mandelbrot, dendrimero y dragon.

## Nota

Las imágenes actuales de 2º ESO se hicieron a mano con versiones previas de estos scripts. Si regeneras las de Apuntes, saldrán con las figuras por defecto (las `feature.png` de los temas), que no son exactamente las mismas.

### Clasificar un recurso (materia, herramienta, metodología)

1. En el front matter, usa solo términos de `data/vocabulario.yaml`, iguales en `index.md` e `index.en.md`:
   ```yaml
   materia: ["quimica"]              # obligatorio
   herramienta: ["phet"]             # solo si usa alguna
   metodologia: ["gamificacion"]     # solo si es parte esencial (los breakouts, siempre)
   ```
   No repitas en `tags` lo que ya va aquí (nada de «gamificación» en las etiquetas).
2. Antes de publicar, comprueba:
   ```
   python tools/revisar_front_matter.py --paginas
   ```
   Si un término se usa por primera vez, crea su página (con el nombre bonito, p. ej. «Computación y Robótica»). Si sale «Todo en orden», listo.
3. Para un término nuevo, añádelo antes a `data/vocabulario.yaml`.

### Rellenar las fichas de muchas actividades a la vez

1. `python tools/fichas.py generar` crea `tools/fichas.csv` (si ya existe, no la pisa).
2. Ábrela con Excel, rellena `sesiones`, `agrupamiento` y `materiales` (separados por `|`) y guarda.
3. `python tools/fichas.py aplicar` y después `python tools/revisar_front_matter.py`.

Una celda vacía no cambia nada; un guion (`-`) borra ese campo. `materiales_en` es la traducción inglesa (la hace Claude si se lo pides).
