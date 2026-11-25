---
title: "Tabla periódica interactiva"
description: "Tabla periódica interactiva en español e inglés: familias, bloques, estados, tendencias periódicas, ficha de cada elemento con sus estados de oxidación y versión para imprimir."
summary: "Familias, bloques, tendencias periódicas, ficha de cada elemento con sus estados de oxidación y versión para imprimir en A4."
date: 2026-11-25
layout: "app"
clase: "proyectos"
cursos: ["2eso", "3eso", "4eso", "1bach", "2bach-quimica"]
formato: "App"
materia: ["quimica"]
herramienta: ["app-fractalis"]
tags: ["tabla periódica", "configuración electrónica", "propiedades periódicas", "números de oxidación"]
showTaxonomies: true
---

{{< lead >}}
Los 118 elementos, con todo lo que necesitas de 2º de ESO a 2º de Bachillerato. Pulsa un elemento para ver su ficha.
{{< /lead >}}

{{< tabla-periodica >}}

## Cómo usarla en clase

- **Colorear por** cambia lo que muestra la tabla: las familias, los bloques s, p, d y f, el estado a 25 °C, los metales y no metales, o las **tendencias periódicas** (electronegatividad, radio atómico, energía de ionización, densidad y punto de fusión). Con las tendencias, el alumnado ve de un vistazo cómo cambian a lo largo de un grupo y de un periodo.
- La **ficha** de cada elemento reúne la masa atómica, la configuración electrónica, los electrones por capa y los **estados de oxidación habituales para formular**. Los datos de Bachillerato (energía de ionización, afinidad electrónica, radios…) están en un apartado aparte.
- Si un elemento aparece en algún tema o actividad de la web, la ficha enlaza con ellos.
- Puedes **enlazar directamente** un elemento o un modo: por ejemplo, `…/tabla-periodica/?modo=en_pauling#F` abre la tabla coloreada por electronegatividad con la ficha del flúor, y `?modo=tipo&ox=1` la abre con los estados de oxidación y los metales y no metales.
- El interruptor **Estados de oxidación** cambia, en cada casilla, el nombre y la masa por los estados de oxidación habituales (los negativos, en cursiva). Los colores siguen el modo elegido: por ejemplo, con «Metales y no metales» queda una tabla de estados de oxidación lista para formular.
- El botón **Imprimir (A4)** genera una tabla limpia en A4 apaisado para fotocopiar, con los colores del modo elegido (si estás viendo una tendencia, con los de las familias) y, si el interruptor está activado, con los estados de oxidación.
- Se puede recorrer con el teclado: tabulador para entrar en la tabla y flechas para moverse por ella.

## De dónde salen los datos

Los datos numéricos proceden del conjunto abierto [Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON), basado en Wikipedia (CC BY-SA). Los nombres siguen la nomenclatura de la IUPAC en español. Los estados de oxidación son los habituales en la formulación de Secundaria y Bachillerato, no todos los posibles. En los elementos sintéticos más pesados, varias propiedades son predicciones teóricas.
