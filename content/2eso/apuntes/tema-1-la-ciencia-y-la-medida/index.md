---
title: "Tema 1: La ciencia y la medida"
description: "El método científico, la medida (el sistema internacional), múltiplos y submúltiplos, material y seguridad en el laboratorio, factores de conversión."
summary: "El método científico, la medida, el sistema internacional, factores de conversión y seguridad en el laboratorio."
date: 2026-07-30
weight: 10
showHero: true
heroStyle: "background"
tipo: ["apuntes"]
tags: ["materia", "densidad", "física", "química", "método científico"]
draft: false
---
{{< katex >}}

## 1. El Método Científico

{{< lead >}}
La ciencia no es solo un conjunto de conocimientos, es una forma de **interrogar a la naturaleza**. Para ello, utilizamos un proceso riguroso llamado **método científico**.
{{< /lead >}}

> **Definición:** El método científico es el procedimiento sistemático que permite a los científicos resolver problemas, responder preguntas y crear nuevo conocimiento.



<div class="flex justify-center">

{{< mermaid >}}
graph TD
    A[Observación] --> B[Pregunta]
    B --> C[Hipótesis]
    C --> D[Experimentación]
    D --> E{Análisis de datos}
    E -->|Hipótesis Correcta| F[Conclusión / Ley / Teoría]
    E -->|Hipótesis Incorrecta| C
    F --> G[Comunicación de resultados]
{{< /mermaid >}}

</div>

### Etapas principales:

1.  **Observación:** Identificamos un fenómeno o problema en nuestro entorno.
2.  **Hipótesis:** Formulamos una posible explicación o "suposición educada" (\(Si... entonces...\)).
3.  **Experimentación:** Diseñamos pruebas controladas para verificar si la hipótesis es cierta. Aquí manejamos **variables** (dependientes, independientes y controladas).
4.  **Análisis de datos:** Interpretamos los resultados obtenidos (gráficas, tablas).
5.  **Conclusión:**
    * Si la hipótesis se confirma \(\rightarrow\) Se formulan **Leyes** o **Teorías**.
    * Si la hipótesis falla \(\rightarrow\) Se formula una nueva hipótesis y se repite el proceso.

---

## 2. La Medida y el Sistema Internacional (SI)

En física y química, decir "es grande" o "pesa mucho" no sirve. Necesitamos medir.

* **Magnitud:** Cualquier propiedad de la materia que se puede medir (ej: longitud, tiempo).
* **Unidad:** Cantidad de referencia que se usa para comparar (ej: metro, segundo).

Para hablar el mismo idioma en todo el mundo, usamos el **Sistema Internacional de Unidades (SI)**.

### Las 7 Magnitudes Fundamentales

<div style="margin: 0 auto; width: fit-content;">

| Magnitud | Unidad SI | Símbolo |
| :--- | :--- | :---: |
| Longitud | metro | \(m\) |
| Masa | kilogramo | \(kg\) |
| Tiempo | segundo | \(s\) |
| Temperatura | kelvin | \(K\) |
| Intensidad de corriente | amperio | \(A\) |
| Intensidad luminosa | candela | \(cd\) |
| Cantidad de sustancia | mol | \(mol\) |

</div>


> **Nota importante:** Observa que la temperatura en el SI se mide en **Kelvin**, no en grados Celsius. La relación es:  
> $$T(K) = T(^\circ C) + 273$$

---

## 3. Múltiplos, Submúltiplos y Notación Científica

A veces medimos cosas gigantescas (distancia a una estrella) o minúsculas (tamaño de un átomo). Para no escribir tantos ceros, usamos la **notación científica** y los prefijos.

{{< accordion >}}
  {{< accordionItem title="Ver tabla completa de prefijos" icon="list-ol" >}}
| Prefijo | Símbolo | Factor | Ejemplo |
| :--- | :---: | :--- | :--- |
| **Giga** | \(G\) | $$10^9$$ | Gigabyte |
| **Mega** | \(M\) | \(10^6\) | Megavatio |
| **Kilo** | \(k\) | \(10^3\) | Kilómetro |
| *(Unidad base)* | - | \(10^0\) | Metro, Litro... |
| **Centi** | \(c\) | \(10^{-2}\) | Centímetro |
| **Mili** | \(m\) | \(10^{-3}\) | Miligramo |
| **Micro** | \(\mu\) | \(10^{-6}\) | Micrómetro |
| **Nano** | \(n\) | \(10^{-9}\) | Nanotecnología |
  {{< /accordionItem >}}
{{< /accordion >}}

### Notación Científica
Consiste en escribir cualquier número como un producto de un número decimal (entre 1 y 10) y una potencia de 10.

* Ejemplo grande: \(300.000.000 \rightarrow 3 \cdot 10^8\)
* Ejemplo pequeño: \(0,000005 \rightarrow 5 \cdot 10^{-6}\)

---

## 4. Factores de Conversión

Olvídate de la "regla de tres". En ciencia usamos **factores de conversión**. Son fracciones que valen 1, donde el numerador y el denominador representan la misma cantidad pero en distintas unidades.

**Pasos para convertir unidades:**
1.  Escribir el dato inicial.
2.  Multiplicar por una fracción (el factor).
3.  Colocar la unidad que queremos eliminar en el lado contrario (si está arriba, la ponemos abajo).
4.  Colocar la equivalencia.

**Ejemplo: Pasar 72 km/h a m/s**

$$72 \, \frac{\text{km}}{\text{h}} \cdot \frac{1000 \, \text{m}}{1 \, \text{km}} \cdot \frac{1 \, \text{h}}{3600 \, \text{s}} = 20 \, \text{m/s}$$

> **Truco:** Siempre tacha las unidades que se repiten arriba y abajo para asegurarte de que el resultado tiene las unidades correctas.

---

## 5. Material y Seguridad en el Laboratorio

El laboratorio es un lugar de trabajo serio. Conocer el material y los riesgos es vital.

### Pictogramas de peligro
Debes saber identificar las etiquetas de los reactivos:
* 🔥 **Inflamable:** Arde con facilidad.
* ☠️ **Tóxico:** Puede causar la muerte o daños graves por ingestión o inhalación.
* 🧪 **Corrosivo:** Destruye tejidos vivos (piel) y materiales.
* 💥 **Explosivo:** Puede explotar por choque o calor.

{{< accordion >}}
  {{< accordionItem title="Ver material básico de laboratorio" >}}
Podemos clasificar el material de vidrio en dos grandes grupos según su precisión:

1.  **Material volumétrico (Preciso):** Sirve para medir volúmenes exactos.
    * *Probeta:* Para medir volúmenes generales.
    * *Pipeta y Bureta:* Para medidas muy exactas y trasvases.
    * *Matraz aforado:* Para preparar disoluciones de concentración exacta.

2.  **Material no volumétrico (Aproximado):** Sirve para contener, calentar o mezclar, pero sus marcas de volumen no son fiables.
    * *Vaso de precipitados.*
    * *Matraz Erlenmeyer.*
  {{< /accordionItem >}}
{{< /accordion >}}
