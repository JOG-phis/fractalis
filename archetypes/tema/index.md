{{- $n := int (replace .Name "tema-" "") -}}
---
title: "Tema {{ $n }}: TÍTULO DEL TEMA"
description: "Resumen del tema: ..."
summary: "..."
date: {{ .Date }}
weight: {{ mul $n 10 }}
tema: {{ $n }}
materia: []                         # obligatorio: fisica | quimica | computacion-robotica | docencia (data/vocabulario.yaml)
pdf: "apuntes-NOMBRE.pdf"          # el PDF completo, copiado en esta carpeta
tags: []                            # 2-5 conceptos en minúscula; ni el nombre del tema ni el tipo de actividad (eso ya es «clase»)
draft: true                         # quitar (o poner false) para publicar
showTableOfContents: true
showTaxonomies: true
---

{{"{{<"}} katex {{">}}"}}

## 1. Primer apartado

La entradilla, los botones de descarga, «Actividades de este tema» y la licencia los pone la plantilla.
Aquí solo va el resumen del tema.
