---
title: "{{ replace .Name "-" " " | title }}"
description: "..."
summary: "..."
date: {{ .Date }}
clase: "proyectos"
cursos: ["1º ESO"]                  # niveles a los que va dirigido: ids de data/cursos.json (2eso, 3eso...) o texto («1º ESO», «Docentes»)
formato: "Proyecto"                 # lo que se lee en la ficha: Proyecto, App, Guía para docentes, Unidad didáctica...
materia: ["computacion-robotica"]   # obligatorio: fisica | quimica | computacion-robotica | docencia (data/vocabulario.yaml)
# herramienta: []                   # opcional: arduino, microbit, scratch, impresion-3d, ia-generativa, app-fractalis...
# metodologia: []                   # opcional: abp, aprendizaje-cooperativo, indagacion, gamificacion, clase-invertida
sesiones: 1                         # número de sesiones de clase (entero)
agrupamiento: "parejas"             # individual | parejas | equipos | gran-grupo
# materiales:                       # opcional, en el idioma de la página
#   - "..."
# pdf: "{{ .Name }}.pdf"            # opcional: guía o fichas descargables, copiadas en esta carpeta
# paginas: 1                        # si hay pdf
# enlace: "https://..."             # opcional: app, simulador, repositorio... (botón «Abrir»)
# boton: "Abrir la app"             # opcional: texto del botón del enlace
tags: []                            # 2-5 conceptos en minúscula
draft: true
showTableOfContents: true
showTaxonomies: true
---

{{"{{<"}} lead {{">}}"}}
Una o dos frases que presenten el proyecto.
{{"{{</"}} lead {{">}}"}}

## Qué se hace

...

La ficha (niveles, sesiones, agrupamiento, materiales), los botones de descarga o de «Abrir» y la licencia los pone la plantilla.
La miniatura (feature.png) puede ser una foto del resultado (sin caras de alumnos) o, si hay PDF:  python tools/miniatura_pdf.py <ruta del PDF>

Si quieres contar cómo fue en clase (opcional; sin nombres de alumnos ni fotos con caras):

{{"{{<"}} en-el-aula grupo="1º ESO" curso="2026-27" {{">}}"}}
**Cómo lo planteé:** ...

**Qué funcionó:** ...

**Qué cambiaría:** ...
{{"{{</"}} en-el-aula {{">}}"}}
