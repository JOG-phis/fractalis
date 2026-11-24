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
