{{- $n := int (replace .Name "tema-" "") -}}
---
title: "Topic {{ $n }}: TITLE"
description: "Unit summary: ..."
summary: "..."
date: {{ .Date }}
weight: {{ mul $n 10 }}
tema: {{ $n }}
materia: []                         # obligatorio: fisica | quimica | computacion-robotica | docencia (data/vocabulario.yaml)
pdf: "apuntes-NOMBRE.pdf"          # el mismo PDF que la versión en español
tags: []                            # 2-5 concepts, lower case
draft: true
showTableOfContents: true
showTaxonomies: true
---

{{"{{<"}} katex {{">}}"}}

## 1. First section
