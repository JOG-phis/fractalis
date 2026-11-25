---
title: "{{ replace .Name "-" " " | title }}"
description: "..."
summary: "..."
date: {{ .Date }}
clase: "proyectos"
cursos: ["1 ESO"]
formato: "Project"                  # Project, App, Teacher guide, Teaching unit...
materia: ["computacion-robotica"]
# herramienta: []
# metodologia: []
sesiones: 1
agrupamiento: "parejas"
# materiales:
#   - "..."
# pdf: "{{ .Name }}.pdf"
# paginas: 1
# enlace: "https://..."
# boton: "Open the app"
tags: []                            # 2-5 concepts, lower case
draft: true
showTableOfContents: true
showTaxonomies: true
---

{{"{{<"}} lead {{">}}"}}
One or two sentences introducing the project.
{{"{{</"}} lead {{">}}"}}

## What students do

...

Optional: how it went in class (no student names, no photos with faces):

{{"{{<"}} en-el-aula grupo="1 ESO" curso="2026-27" {{">}}"}}
**How I set it up:** ...

**What worked:** ...

**What I would change:** ...
{{"{{</"}} en-el-aula {{">}}"}}
