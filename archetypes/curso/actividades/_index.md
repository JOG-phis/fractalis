{{- $c := dict }}{{ range hugo.Data.cursos }}{{ if eq .carpeta (printf "content/%s" (strings.TrimSuffix "/" (path.Dir (strings.TrimSuffix "/" $.File.Dir)))) }}{{ $c = . }}{{ end }}{{ end -}}
---
title: "Actividades de {{ $c.nombre | default "CURSO" }}"
linkTitle: "Actividades"
description: "Ejercicios, breakouts, lecturas, prácticas de laboratorio, simulaciones, tareas y proyectos para trabajar cada tema. Usa los filtros para encontrar lo que buscas."
summary: "Ejercicios, breakouts, lecturas, prácticas de laboratorio, simulaciones, tareas y proyectos para trabajar cada tema. Usa los filtros para encontrar lo que buscas."
showSummary: true
showDate: false
weight: 20
layout: "actividades"
---
