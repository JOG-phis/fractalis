{{- $c := dict }}{{ range hugo.Data.cursos }}{{ if eq .carpeta (printf "content/%s" (strings.TrimSuffix "/" (path.Dir (strings.TrimSuffix "/" $.File.Dir)))) }}{{ $c = . }}{{ end }}{{ end -}}
---
title: "Apuntes de {{ $c.nombre | default "CURSO" }}"
linkTitle: "Apuntes"
description: "Aquí encontrarás teoría y explicaciones de todos los temas."
summary: "Aquí encontrarás teoría y explicaciones de todos los temas."
showSummary: true
showDate: false
weight: 10
---
