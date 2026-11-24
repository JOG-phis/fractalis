---
title: "Topic 6: Forces"
description: "Unit summary: force and its effects, Hooke's law, resultant force, Newton's laws, weight, normal force, friction and tension, dynamics problems and universal gravitation."
summary: "Forces and their effects, Hooke's law, resultant force, Newton's laws, everyday forces, dynamics and gravitation."
date: 2026-11-22
weight: 60
tema: 6
materia: ["fisica"]
pdf: "apuntes-fuerzas.pdf"
tags: ["forces", "Hooke's law", "Newton's laws", "friction", "gravitation"]
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. Force and its effects

{{< caja idea "Force:" >}}
an action that **deforms** a body or **changes its state of motion**. It appears when two bodies interact. It is measured in **newtons** (N) with a **force meter**.
{{< /caja >}}

{{< figura src="deformacion-en.svg|movimiento-en.svg|dinamometro-en.svg" alt="A spring with no force on it and the same spring stretched by a force F|A force F changes the direction of a moving body|Force meter: a spring with a scale in newtons with a 300 g mass hanging from it" ancho="190|150|190" rotulos="It deforms|It changes motion|Force meter" >}}

There are **contact** forces (pushing, pulling, rubbing) and **non-contact** forces (gravitational, electric, magnetic). Force is a **vector** quantity: it has a point of application, a direction, a sense and a magnitude.

{{< figura src="vector-en.svg" alt="A force on a box drawn as an arrow: point of application, horizontal direction, sense to the right and magnitude of 30 N" ancho="440" >}}

## 2. Hooke's law

{{< formula >}}F = k \cdot \Delta x \qquad \Delta x = L - L_0\ \ (\text{in m}){{< /formula >}}

{{< figura src="hooke-en.svg|hooke-grafica-en.svg" alt="A spring of initial length L0 that stretches to L when pulled with a force F|Force–extension graph: a straight line through the origin up to the elastic limit" ancho="250|290" >}}

The **spring constant** \(k\) (N/m) measures how stiff the spring is. The \(F\)–\(\Delta x\) graph is a straight line through the origin and its slope is \(k\). The law only holds up to the **elastic limit**.

## 3. The resultant force

- **Forces along the same line:** add them with their signs.
- **Perpendicular forces:** \(F_R = \sqrt{F_1^{\,2} + F_2^{\,2}}\).
- **Several directions:** add the horizontal ones on one side and the vertical ones on the other, and then apply Pythagoras.
- **Equilibrium:** \(F_R = 0\). The **equilibrant** force is equal to the resultant but in the opposite sense.

{{< figura src="linea.svg|perpendiculares.svg|varias.svg" alt="Three forces along the same line, of +60, +40 and −30 N, give a resultant of +70 N|Perpendicular forces of 8 and 6 N give a resultant of 10 N|Four forces in several directions reduce to 16 N horizontally and 12 N vertically" ancho="260|190|300" rotulos="Same line|Perpendicular|Several directions" >}}

## 4. Newton's laws

| Law | What it says |
| :--- | :--- |
| **1st law: inertia** | If \(F_R = 0\), the body stays at rest or keeps moving with URM. |
| **2nd law: fundamental principle** | \(F_R = m \cdot a\). The acceleration is in the sense of the resultant force; if \(F_R\) is constant, the motion is UARM. \(1\ \text{N} = 1\ \text{kg} \cdot 1\ \text{m/s}^2\). |
| **3rd law: action and reaction** | If A pushes B, B pushes A with an equal force in the opposite sense. They act on different bodies: they **do not cancel out**. |

{{< figura src="accion-en.svg" alt="Two skaters, A and B, push each other: the force of A on B and the force of B on A are equal and in opposite senses" ancho="380" >}}

## 5. Everyday forces

| Force | What it is like | How to calculate it |
| :--- | :--- | :--- |
| **Weight** | non-contact, towards the centre of the Earth | \(W = m \cdot g\) |
| **Normal** | contact, perpendicular to the surface | on a horizontal floor, \(N = W\) |
| **Friction** | contact, parallel to the surface and against the motion | \(F_r = \mu \cdot N\) |
| **Tension** | contact, along the rope; it always pulls | at rest or at constant \(v\), \(T = W\) |

{{< figura src="peso-en.svg|normal.svg|rozamiento.svg|tension.svg" alt="Weight points downwards|The normal force is perpendicular to the floor and to the ramp|Friction opposes the velocity|The tension in the rope pulls the lamp upwards" ancho="110|190|170|110" rotulos="Weight|Normal|Friction|Tension" >}}

{{< caja cuidado >}}
friction does **not** make a body move: it only **slows it down**. If the force we apply is smaller than friction, the body stays still.
{{< /caja >}}

### How to solve a dynamics problem

{{< figtexto lado="derecha" src="diagrama-en.svg" alt="Force diagram of a 25 kg box pushed with 99 N: weight 245 N, normal 245 N and friction 49 N" ancho="300" >}}
1. Draw the **force diagram**.
2. Take the sense of **motion** as positive.
3. **Vertical axis:** if the body does not go up or down, the forces cancel out (\(N = W\)).
4. **Axis of motion:** \(F_r = \mu \cdot N\), add with signs and \(F_R = m \cdot a\).
5. Velocities, times and distances, with the **UARM equations**.
{{< /figtexto >}}

{{< caja ejemplo "a box pushed against friction" >}}
A 25 kg box is pushed with 99 N; \(\mu = 0.2\). \(N = W = 25 \cdot 9.8 = 245\ \text{N}\); \(F_r = 0.2 \cdot 245 = 49\ \text{N}\).

{{< formula >}}F_R = 99 - 49 = 50\ \text{N} \qquad a = \frac{F_R}{m} = \frac{50\ \text{N}}{25\ \text{kg}} = 2\ \text{m/s}^2{{< /formula >}}
{{< /caja >}}

## 6. Universal gravitation

{{< figtexto lado="derecha" src="gravitacion.png" alt="Two masses M and m attract each other with a force F; at twice the distance, the force is four times smaller" ancho="300" >}}
{{< formula >}}F = G \cdot \frac{M \cdot m}{d^{\,2}}{{< /formula >}}

with \(G = 6.67 \cdot 10^{-11}\ \text{N·m}^2/\text{kg}^2\). It is **always attractive**. At twice the distance, the force is four times smaller.

The gravity at the surface of a planet or star, \(g = G \cdot \dfrac{M}{R^{\,2}}\), **does not depend** on the mass of the falling body.
{{< /figtexto >}}
