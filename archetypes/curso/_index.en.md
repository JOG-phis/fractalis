{{- $c := dict }}{{ range hugo.Data.cursos }}{{ if eq .carpeta (printf "content/%s" (strings.TrimSuffix "/" $.File.Dir)) }}{{ $c = . }}{{ end }}{{ end -}}
---
title: "{{ $c.nombre_en | default "COURSE NAME" }}"
showHero: true
heroStyle: "background"
cardView: false
showCards: false
---

{{"{{<"}} curso-vacio {{">}}"}}
