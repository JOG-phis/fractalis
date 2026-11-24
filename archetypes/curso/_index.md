{{- $c := dict }}{{ range hugo.Data.cursos }}{{ if eq .carpeta (printf "content/%s" (strings.TrimSuffix "/" $.File.Dir)) }}{{ $c = . }}{{ end }}{{ end -}}
---
title: "{{ $c.nombre | default "NOMBRE DEL CURSO" }}"
showHero: true
heroStyle: "background"
cardView: false
showCards: false
---

{{"{{<"}} curso-vacio {{">}}"}}
