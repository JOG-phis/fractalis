---
title: "Topic 6: Forces"
description: "Unit summary: force and its effects, Hooke's law, resultant force, Newton's laws, weight, friction, electric and magnetic forces and simple machines."
summary: "Forces and their effects, Hooke's law, resultant force, Newton's laws, weight, friction and simple machines."
date: 2026-11-22
weight: 60
showHero: true
heroStyle: "background"
imagen_autor: "Xuan Duong"
imagen_autor_url: "https://pixabay.com/users/xuanduongvan87-22814888/"
imagen_fuente: "Pixabay"
imagen_url: "https://pixabay.com/"
tema: 6
materia: ["fisica"]
tags: ["forces", "Hooke's law", "Newton's laws", "weight", "simple machines"]
pdf: "apuntes-fuerzas.pdf"
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. Force and its effects

{{< caja idea "Force:" >}}
any action that can **deform** a body or **change its motion**. It is measured in **newtons** (N) with a **force meter** (dynamometer).
{{< /caja >}}

{{< figura src="deformacion-en.svg|efecto-movimiento-en.svg" alt="A spring with no force on it and the same spring stretched by a force F|A force F changes the direction of a moving body" ancho="200|170" rotulos="It deforms|It changes motion" >}}

- There are **contact** forces (pushing, pulling) and **non-contact** forces (weight, magnets).
- **Elastic** materials get their shape back when the force stops acting; **plastic** materials stay deformed.

### Hooke's law

{{< figtexto lado="derecha" src="hooke-en.svg" alt="A spring with initial length L0 that stretches to L when pulled with a force F" ancho="240" >}}
{{< formula >}}F = k \cdot \Delta x \qquad \Delta x = L - L_0{{< /formula >}}

The extension of a spring is proportional to the force. \(\Delta x\) is measured in m and the constant \(k\) in N/m.
{{< /figtexto >}}

### A force is drawn as an arrow

{{< figura src="vector-en.svg" alt="A force on a box drawn as an arrow with its point of application, direction, sense and magnitude" pie="A force is a **vector**: it has a point of application, a direction, a sense and a magnitude." ancho="480" >}}

## 2. The resultant force

The **resultant** is a single force that has the same effect as all the forces together.

{{< figura src="mismo-sentido.svg|sentido-contrario.svg|perpendiculares.svg" alt="Two forces of 30 N and 20 N in the same sense give a resultant of 50 N|Forces of 120 N and 90 N in opposite senses give a resultant of 30 N|Perpendicular forces of 9 N and 12 N give a resultant of 15 N" ancho="200|165|200" rotulos="**Same sense:** add them<br>\(F_R = F_1 + F_2\)|**Opposite senses:** subtract them<br>\(F_R = F_1 - F_2\)|**Perpendicular:** Pythagoras<br>\(F_R = \sqrt{F_1^{\,2} + F_2^{\,2}}\)" >}}

- With forces in **several directions**, first add the horizontal ones, then the vertical ones, and then apply Pythagoras.
- **Equilibrium:** if \(F_R = 0\), a body that was at rest stays at rest.

## 3. Newton's laws

| Law | What it says |
| :--- | :--- |
| **1st law: inertia** | If \(F_R = 0\), the body stays at rest or in uniform rectilinear motion. Bodies tend to keep doing what they are doing. |
| **2nd law: fundamental principle** | \(F_R = m \cdot a\) (\(F_R\) in N, \(m\) in kg, \(a\) in m/s²). |
| **3rd law: action and reaction** | If A pushes B, B pushes A with an equal force in the opposite sense. They act on different bodies and do not cancel out. |

{{< figura src="accion-reaccion-en.svg" alt="Two skaters A and B push each other: the force of A on B and the force of B on A are equal and in opposite senses" ancho="440" >}}

## 4. Forces in nature

{{< caja idea "Universal gravitation:" >}}
all bodies with mass attract each other. The more mass, the greater the force; at twice the distance, the force is four times smaller.
{{< /caja >}}

{{< formula >}}F = G \cdot \frac{M \cdot m}{d^{\,2}}{{< /formula >}}

{{< figtexto lado="derecha" src="peso-en.svg" alt="The Earth and several bodies around it, with their weight pointing towards the centre" ancho="170" >}}
**Weight:** the force with which the Earth pulls a body; it points towards the **centre of the Earth**.

{{< formula >}}W = m \cdot g \qquad g = 9.8\,\text{m/s}^2{{< /formula >}}
{{< /figtexto >}}

{{< caja cuidado >}}
**mass** (kg, measured with a balance) does not change; **weight** (N, measured with a force meter) changes with the gravity of the place.
{{< /caja >}}

- **Normal force:** the force a surface exerts on a body resting on it; it is perpendicular to the surface.
- **Friction:** a contact force that always **opposes motion**.

{{< figura src="normal-en.svg|rozamiento-en.svg" alt="Normal force on a box on the floor and on a ramp|Friction force opposing the motion of a box we push" ancho="400|300" >}}

- **Electric forces:** between charged bodies. Opposite charges attract; like charges repel.
- **Magnetic forces:** exerted by magnets, which attract iron, nickel and cobalt. Unlike poles attract; like poles repel. The Earth is a giant magnet: that is why a compass points north.

{{< figura src="cargas-en.svg|imanes-en.svg" alt="Opposite charges attract and like charges repel|Unlike poles of two magnets attract and like poles repel" ancho="460|440" >}}

## 5. Simple machines

They let us use **less force** or apply it more comfortably. **Effort** (\(F\)): the force we apply. **Load** (\(R\), the resistance): the force we overcome.

{{< figtexto lado="derecha" src="ley-palanca-en.svg" alt="A lever lifting a 600 N stone with the fulcrum 0.5 m from the stone and the effort 1.5 m from the fulcrum" ancho="380" >}}
**Lever:** a bar that turns about a fulcrum.

{{< formula >}}F \cdot d_F = R \cdot d_R{{< /formula >}}
{{< /figtexto >}}

| Class | In the middle is… | Diagram | Examples |
| :--- | :--- | :---: | :--- |
| **First-class** | the fulcrum | {{< mini src="palanca-1.svg" alt="First-class lever" ancho="150" >}} | seesaw, scissors, pliers |
| **Second-class** | the load | {{< mini src="palanca-2.svg" alt="Second-class lever" ancho="150" >}} | wheelbarrow, nutcracker, bottle opener |
| **Third-class** | the effort | {{< mini src="palanca-3.svg" alt="Third-class lever" ancho="150" >}} | tweezers, fishing rod, forearm |

{{< figura src="polea-fija.svg|polea-movil.svg|plano-inclinado-en.svg" alt="Fixed pulley: the effort equals the load|Movable pulley: the effort is half the load|Inclined plane: pushing a box up a ramp" ancho="130|130|330" rotulos="**Fixed pulley**<br>\(F = R\), but we pull downwards|**Movable pulley**<br>\(F = R/2\)|**Inclined plane**<br>the longer the ramp, the less force" >}}

{{< caja nota "Remember:" >}}
if we use less force, we have to move it over a longer distance.
{{< /caja >}}
