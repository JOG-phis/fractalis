---
title: "TITLE"
description: "..."
summary: "..."
date: {{ .Date }}
weight: 000                         # el mismo que en español
clase: "ejercicios"
tema: 0
materia: []                         # obligatorio: fisica | quimica | computacion-robotica | docencia (data/vocabulario.yaml)
# herramienta: []                   # opcional: phet, geogebra, app-fractalis, arduino... (data/vocabulario.yaml)
# metodologia: []                   # opcional: gamificacion, aprendizaje-cooperativo, indagacion, abp, clase-invertida
sesiones: 1                         # número de sesiones de clase (entero)
agrupamiento: "individual"          # individual | parejas | equipos | gran-grupo
# materiales:                       # opcional, en el idioma de la página
#   - "..."
# guia_profesor: "bajo-peticion"    # breakouts: la guía no se publica y se pide por el formulario de contacto
formato: "Exercise sheet"           # Exercise sheet, Breakout, Reading, Virtual lab, Activity, Homework...
paginas: 1
pdf: "{{ .Name }}.pdf"
# soluciones: "{{ .Name }}-soluciones.pdf"
tags: []                            # 2-5 concepts, lower case
draft: true
showTableOfContents: false
showTaxonomies: true
---

{{"{{<"}} lead {{">}}"}}
One or two sentences introducing the activity.
{{"{{</"}} lead {{">}}"}}

Optional: how it went in class (no student names, no photos with faces):

{{"{{<"}} en-el-aula grupo="2 ESO" curso="2025-26" {{">}}"}}
**How I set it up:** ...

**What worked:** ...

**What I would change:** ...
{{"{{</"}} en-el-aula {{">}}"}}
