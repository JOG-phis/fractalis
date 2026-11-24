---
title: "{{ replace .Name "-" " " | title }}"
description: "..."
summary: "..."
date: {{ .Date }}
weight: 000                         # tema × 100 + orden dentro del tema (p. ej. 305)
clase: "ejercicios"                 # ejercicios | breakouts | lecturas | practicas | simulaciones | tareas | proyectos
tema: 0
materia: []                         # obligatorio: fisica | quimica | computacion-robotica | docencia (data/vocabulario.yaml)
# herramienta: []                   # opcional: phet, geogebra, app-fractalis, arduino... (data/vocabulario.yaml)
# metodologia: []                   # opcional: gamificacion, aprendizaje-cooperativo, indagacion, abp, clase-invertida
sesiones: 1                         # número de sesiones de clase (entero)
agrupamiento: "individual"          # individual | parejas | equipos | gran-grupo
# materiales:                       # opcional, en el idioma de la página
#   - "..."
# guia_profesor: "bajo-peticion"    # breakouts: la guía no se publica y se pide por el formulario de contacto
formato: "Hoja de ejercicios"       # lo que se lee en la ficha: Hoja de ejercicios, Breakout, Lectura, Laboratorio virtual...
paginas: 1
pdf: "{{ .Name }}.pdf"
# soluciones: "{{ .Name }}-soluciones.pdf"
tags: []                            # 2-5 conceptos en minúscula; ni el nombre del tema ni el tipo de actividad (eso ya es «clase»)
draft: true
showTableOfContents: false
showTaxonomies: true
---

{{"{{<"}} lead {{">}}"}}
Una o dos frases que presenten la actividad.
{{"{{</"}} lead {{">}}"}}

La ficha, los botones de descarga, el enlace a los apuntes del tema y la licencia los pone la plantilla.
La miniatura (feature.png) se hace con:  python tools/miniatura_pdf.py <ruta del PDF>

Si quieres contar cómo fue en clase (opcional; sin nombres de alumnos ni fotos con caras):

{{"{{<"}} en-el-aula grupo="2º ESO" curso="2025-26" {{">}}"}}
**Cómo lo planteé:** ...

**Qué funcionó:** ...

**Qué cambiaría:** ...
{{"{{</"}} en-el-aula {{">}}"}}
