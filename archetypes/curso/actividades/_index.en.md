{{- $c := dict }}{{ range hugo.Data.cursos }}{{ if eq .carpeta (printf "content/%s" (strings.TrimSuffix "/" (path.Dir (strings.TrimSuffix "/" $.File.Dir)))) }}{{ $c = . }}{{ end }}{{ end -}}
---
title: "{{ $c.nombre_en | default "COURSE" }} activities"
linkTitle: "Activities"
description: "Exercises, breakouts, readings, lab practicals, simulations, tasks and projects for each unit. Use the filters to find what you need."
summary: "Exercises, breakouts, readings, lab practicals, simulations, tasks and projects for each unit. Use the filters to find what you need."
showSummary: true
showDate: false
weight: 20
layout: "actividades"
---
