---
title: "Topic 5: Motion"
description: "Unit summary: frame of reference, position and path, displacement, speed, uniform rectilinear motion, acceleration, uniformly accelerated rectilinear motion and their graphs."
summary: "Frame of reference, path, displacement, speed, URM, acceleration, UARM and motion graphs."
date: 2026-11-22
weight: 50
showHero: true
heroStyle: "background"
imagen_autor: "Nicolas Hoizey"
imagen_autor_url: "https://unsplash.com/@nhoizey"
imagen_fuente: "Unsplash"
imagen_url: "https://unsplash.com/photos/poa-Ycw1W8U"
tema: 5
materia: ["fisica"]
tags: ["motion", "speed", "URM", "acceleration", "UARM"]
pdf: "apuntes-movimiento.pdf"
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. Motion and the frame of reference

{{< caja idea "Motion:" >}}
a body is **in motion** if its position changes relative to a **frame of reference**, and **at rest** if it does not.
{{< /caja >}}

{{< figura src="referencia-en.svg" alt="Pablo is sitting on a train and María watches it go by from the platform" pie="Relative to the train, Pablo is at rest. Relative to the platform, Pablo moves along with the train." ancho="560" >}}

{{< caja nota "Remember:" >}}
motion and rest are **relative**: they depend on the frame of reference we choose.
{{< /caja >}}

## 2. Position and path

- **Position** (\(x\)): where the body is relative to the origin. It is measured in metres (m).
- **Path** (trajectory): the line the body traces as it moves.

{{< figura src="posicion-en.svg" alt="A number line with the origin at a house, a tree at x = −200 m and a car at x = +300 m" ancho="520" >}}

{{< figura src="tray-rectilinea.svg|tray-circular.svg|tray-eliptica.svg|tray-parabolica.svg" alt="Rectilinear path|Circular path|Elliptical path|Parabolic path" ancho="125|100|125|135" rotulos="Rectilinear|Circular|Elliptical|Parabolic" >}}

## 3. Displacement and distance travelled

- **Displacement:** \(\Delta x = x - x_0\). It only depends on where the motion starts and where it ends.
- **Distance travelled** (\(d\)): the total length of the route, adding up all the stretches.

{{< figura src="desplazamiento-en.svg" alt="Going from home to the bakery (400 m) and back to the kiosk (300 m): distance travelled 700 m and displacement 100 m" ancho="580" >}}

{{< caja nota "Remember:" >}}
displacement and distance travelled are only the same if the body moves in a straight line **without turning back**.
{{< /caja >}}

## 4. Speed

{{< figtexto lado="derecha" src="triangulo-velocidad.svg" alt="A triangle with d at the top and v and t at the bottom to help remember the formulas" ancho="140" >}}
{{< formula >}}v = \frac{d}{t} \qquad d = v \cdot t \qquad t = \frac{d}{v}{{< /formula >}}

- Units: **m/s** (International System) and **km/h**.
- **Average speed:** the one we calculate with the formula. **Instantaneous speed:** the one the speedometer shows at each moment.
{{< /figtexto >}}

{{< formula >}}\text{km/h} \xrightarrow{\ \div\,3.6\ } \text{m/s} \qquad\qquad \text{m/s} \xrightarrow{\ \times\,3.6\ } \text{km/h}{{< /formula >}}

## 5. Uniform rectilinear motion (URM)

{{< caja idea "URM:" >}}
motion along a **straight** path at **constant velocity**: the body covers equal distances in equal times. *(In the Spanish notes: MRU.)*
{{< /caja >}}

{{< formula >}}x = x_0 + v \cdot t{{< /formula >}}

{{< figura src="mru-xt.svg|mru-vt.svg" alt="Position–time graph for URM: a sloping straight line|Velocity–time graph for URM: a horizontal straight line" ancho="300|295" pie="URM graphs: position–time (sloping line) and velocity–time (horizontal line)." >}}

- On the \(x\)–\(t\) graph, the **steeper** the line, the **greater** the velocity.
- **Negative velocity:** the body moves towards decreasing positions (the line goes down).
- **Meeting point:** two bodies meet when they are at the same position at the same instant; it is the point where their lines cross.

## 6. Acceleration and UARM

{{< caja idea "Acceleration:" >}}
tells us how much the velocity changes each second. It is **positive** if the velocity increases and **negative** if the body slows down. It is measured in m/s².
{{< /caja >}}

{{< formula >}}a = \frac{v - v_0}{t} \qquad\qquad v = v_0 + a \cdot t{{< /formula >}}

**UARM** (uniformly accelerated rectilinear motion; *MRUA* in the Spanish notes) has a **straight** path and **constant acceleration**.

{{< figura src="mrua-xt.svg|mrua-vt.svg" alt="Position–time graph for UARM: a curve|Velocity–time graph for UARM: a sloping straight line" ancho="295|295" pie="UARM graphs: position–time (curve) and velocity–time (sloping line)." >}}

## Motion graphs

| Motion | Velocity | \(x\)–\(t\) graph | \(v\)–\(t\) graph |
| :--- | :--- | :---: | :---: |
| **At rest** | zero | {{< mini src="mg-reposo-xt.svg" alt="Horizontal line" >}} | {{< mini src="mg-reposo-vt.svg" alt="Line along the time axis" >}} |
| **URM** | constant | {{< mini src="mg-mru-xt.svg" alt="Sloping line" >}} | {{< mini src="mg-mru-vt.svg" alt="Horizontal line" >}} |
| **UARM** (speeding up) | increases by the same amount every second | {{< mini src="mg-mrua-xt.svg" alt="Curve" >}} | {{< mini src="mg-mrua-vt.svg" alt="Sloping line" >}} |
