---
title: "Topic 5: Motion"
description: "Unit summary: frame of reference, scalar and vector quantities, displacement, velocity, URM, acceleration, UARM, free fall, motion graphs and meeting problems."
summary: "Frame of reference, velocity, URM, acceleration, UARM, free fall, graphs and meeting problems."
date: 2026-11-22
weight: 50
tema: 5
materia: ["fisica"]
pdf: "apuntes-movimiento.pdf"
tags: ["motion", "URM", "UARM", "free fall", "graphs"]
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. Motion and its quantities

{{< figtexto lado="derecha" src="referencia-en.svg" alt="Pablo is sitting on a train and María watches it go past from the platform" ancho="300" >}}
Motion and rest are **relative**: they depend on the **frame of reference** (an origin and a positive direction). Pablo is at rest relative to the train, but he is moving relative to the platform.
{{< /figtexto >}}

{{< columnas >}}
{{< caja idea "Scalar quantity:" >}}
it is fully described by a number and its unit: time, mass, distance travelled.
{{< /caja >}}
{{< caja idea "Vector quantity:" >}}
it also needs a **direction and sense**: displacement, velocity, acceleration. On a straight line, the sense is the **sign**.
{{< /caja >}}
{{< /columnas >}}

{{< figura src="vector-en.svg" alt="A vector with its point of application, its direction, its sense and its magnitude of 20 m/s" ancho="420" >}}

## 2. Displacement and distance travelled

- **Position** \(x\) (m): where the body is relative to the origin.
- **Displacement:** \(\Delta x = x - x_0\). It can be **negative**.
- **Distance travelled** \(s\): the length of the path along the trajectory. It is **never** negative.

{{< figura src="piscina-en.svg" alt="A swimmer swims three 50 m lengths of a pool: they travel 150 m but their displacement is 50 m" pie="Three 50 m lengths: the distance travelled is 150 m, but the displacement is 50 m." ancho="500" >}}

## 3. Velocity

{{< formula >}}v_m = \frac{\Delta x}{\Delta t}\ \ (\text{m/s}) \qquad\qquad \text{km/h} \xrightarrow{\ :\,3.6\ } \text{m/s} \qquad \text{m/s} \xrightarrow{\ \cdot\,3.6\ } \text{km/h}{{< /formula >}}

The **instantaneous velocity** is the velocity at a particular moment (what the speedometer shows). Before calculating, convert all the data to the **International System** (SI).

## 4. Uniform rectilinear motion (URM)

{{< caja idea "URM:" >}}
a **straight** path and **constant velocity** (*MRU* in the Spanish notes).
{{< /caja >}}

{{< formula >}}x = x_0 + v \cdot t{{< /formula >}}

If \(v > 0\), the positions increase; if \(v < 0\), they decrease (the body moves in the opposite sense). In a table of data, the motion is URM if \(\Delta x / \Delta t\) is the same in every interval.

## 5. Acceleration and UARM

{{< caja idea "Acceleration:" >}}
how much the velocity changes every second: \(a = \dfrac{v - v_0}{t}\) (m/s²). If the body moves in the positive sense, \(a > 0\) speeds it up and \(a < 0\) slows it down.
{{< /caja >}}

**UARM** (uniformly accelerated rectilinear motion; *MRUA* in the Spanish notes) has a **straight** path and **constant acceleration**. Use the equation that has only one unknown:

{{< formula >}}v = v_0 + a \cdot t \qquad x = x_0 + v_0 \cdot t + \tfrac{1}{2}\, a \cdot t^2 \qquad v^2 - v_0^2 = 2 \cdot a \cdot \Delta x{{< /formula >}}

{{< figura src="mrua-xt.svg|mrua-vt.svg" alt="Position–time graph for UARM: a curve|Velocity–time graph for UARM: a sloping straight line; the velocity increases by 4 m/s in 2 s" ancho="270|270" pie="UARM graphs: position–time (curve) and velocity–time (sloping line)." >}}

## 6. Free fall and vertical throws

{{< figtexto lado="derecha" src="vertical-en.png" alt="Three cases: dropped from a building, thrown downwards and thrown upwards up to the maximum height; the y axis is positive upwards and the acceleration is −g" ancho="340" >}}
With the \(y\) axis pointing up and the origin on the ground, the acceleration is \(a = -g = -9.8\ \text{m/s}^2\):

{{< formula >}}v = v_0 - g \cdot t{{< /formula >}}
{{< formula >}}y = y_0 + v_0 \cdot t - \tfrac{1}{2}\, g \cdot t^2{{< /formula >}}

- **Dropped:** \(v_0 = 0\). **Thrown down:** \(v_0 < 0\). **Thrown up:** \(v_0 > 0\).
- **Maximum height:** \(v = 0\). **Hits the ground:** \(y = 0\) (discard the negative time).
{{< /figtexto >}}

## 7. Motion graphs

| Motion | Velocity | \(x\)–\(t\) | \(v\)–\(t\) |
| :--- | :--- | :---: | :---: |
| **Rest** | zero | {{< mini src="g-x-reposo.svg" alt="Horizontal line" >}} | {{< mini src="g-v-reposo.svg" alt="Line along the time axis" >}} |
| **URM** | constant | {{< mini src="g-x-mru.svg" alt="Sloping line" >}} | {{< mini src="g-v-mru.svg" alt="Horizontal line" >}} |
| **UARM speeding up** | increases by the same amount every second | {{< mini src="g-x-acelera.svg" alt="Curve bending upwards" >}} | {{< mini src="g-v-acelera.svg" alt="Rising line" >}} |
| **UARM slowing down** | decreases by the same amount every second | {{< mini src="g-x-frena.svg" alt="Curve that levels off" >}} | {{< mini src="g-v-frena.svg" alt="Falling line" >}} |

{{< figtexto lado="derecha" src="tramos.svg" alt="Velocity–time graph in sections: A speeds up from 4 to 20 m/s, B stays at 20 m/s and C slows down to a stop; the area under each section is the distance travelled" ancho="300" >}}
On a \(v\)–\(t\) graph:

- **Horizontal** section: URM. **Sloping** section: UARM.
- The **acceleration** is the slope of the line: \(a = \Delta v / \Delta t\).
- The **distance travelled** is the **area** under the graph (rectangles, triangles and trapeziums).
{{< /figtexto >}}

## 8. Meeting problems

1. A single **frame of reference** and all the data in SI units.
2. The **position equation** of each body (with a negative \(v\) if it moves in the opposite sense).
3. **Set** the positions **equal** and solve for \(t\).
4. **Substitute** \(t\) to find where they meet.

{{< figura src="encuentro-esquema-en.svg|encuentro-grafica-en.svg" alt="A bus leaves x = 0 at +15 m/s and a car leaves x = 1200 m at −25 m/s; they meet at x = 450 m|Position–time graph: the lines for the bus and the car cross at 30 s and 450 m" ancho="330|260" >}}

{{< formula >}}0 + 15\,t = 1200 - 25\,t \ \Rightarrow\ t = 30\ \text{s} \qquad x = 15 \cdot 30 = 450\ \text{m}{{< /formula >}}
