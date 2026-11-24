{{- $c := dict }}{{ range hugo.Data.cursos }}{{ if eq .carpeta (printf "content/%s" (strings.TrimSuffix "/" (path.Dir (strings.TrimSuffix "/" $.File.Dir)))) }}{{ $c = . }}{{ end }}{{ end -}}
---
title: "{{ $c.nombre_en | default "COURSE" }} notes"
linkTitle: "Notes"
description: "Here you'll find theory and explanations for all the topics."
summary: "Here you'll find theory and explanations for all the topics."
showSummary: true
showDate: false
weight: 10
---
