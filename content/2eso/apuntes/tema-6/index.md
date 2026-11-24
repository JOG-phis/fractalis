---
title: "Tema 6: Las fuerzas"
description: "Resumen del tema: la fuerza y sus efectos, ley de Hooke, fuerza resultante, leyes de Newton, peso, rozamiento, fuerzas eléctricas y magnéticas y máquinas simples."
summary: "Fuerzas y sus efectos, ley de Hooke, fuerza resultante, leyes de Newton, peso, rozamiento y máquinas simples."
date: 2026-11-22
weight: 60
showHero: true
heroStyle: "background"
imagen_autor: "Xuan Duong"
imagen_autor_url: "https://pixabay.com/users/xuanduongvan87-22814888/"
imagen_fuente: "Pixabay"
imagen_url: "https://pixabay.com/"
tags: ["fuerzas", "ley de Hooke", "leyes de Newton", "peso", "máquinas simples"]
tema: 6
materia: ["fisica"]
pdf: "apuntes-fuerzas.pdf"
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. La fuerza y sus efectos

{{< caja idea "Fuerza:" >}}
es toda acción capaz de **deformar** un cuerpo o de **cambiar su movimiento**. Se mide en **newtons** (N) con el **dinamómetro**.
{{< /caja >}}

{{< figura src="deformacion.svg|efecto-movimiento.svg" alt="Un muelle sin fuerza y el mismo muelle estirado por una fuerza F|Una fuerza F cambia la dirección de un cuerpo que se mueve" ancho="200|170" rotulos="Deforma|Cambia el movimiento" >}}

- Hay fuerzas **de contacto** (empujar, tirar) y fuerzas **a distancia** (el peso, los imanes).
- Los materiales **elásticos** recuperan su forma al dejar de actuar la fuerza; los **plásticos** se quedan deformados.

### La ley de Hooke

{{< figtexto lado="derecha" src="hooke.svg" alt="Muelle de longitud inicial L0 que se alarga hasta L al tirar de él con una fuerza F" ancho="240" >}}
{{< formula >}}F = k \cdot \Delta x \qquad \Delta x = L - L_0{{< /formula >}}

El alargamiento de un muelle es proporcional a la fuerza. \(\Delta x\) se mide en m y la constante \(k\) en N/m.
{{< /figtexto >}}

### La fuerza se representa con una flecha

{{< figura src="vector.svg" alt="Una fuerza sobre una caja representada como flecha con su punto de aplicación, dirección, sentido y módulo" pie="Una fuerza es un **vector**: tiene punto de aplicación, dirección, sentido y módulo." ancho="480" >}}

## 2. La fuerza resultante

La **resultante** es una sola fuerza que produce el mismo efecto que todas las fuerzas juntas.

{{< figura src="mismo-sentido.svg|sentido-contrario.svg|perpendiculares.svg" alt="Dos fuerzas de 30 N y 20 N en el mismo sentido dan una resultante de 50 N|Fuerzas de 120 N y 90 N en sentido contrario dan una resultante de 30 N|Fuerzas perpendiculares de 9 N y 12 N dan una resultante de 15 N" ancho="200|165|200" rotulos="**Mismo sentido:** se suman<br>\(F_R = F_1 + F_2\)|**Sentido contrario:** se restan<br>\(F_R = F_1 - F_2\)|**Perpendiculares:** Pitágoras<br>\(F_R = \sqrt{F_1^{\,2} + F_2^{\,2}}\)" >}}

- Con fuerzas en **varias direcciones**, primero se suman las horizontales, luego las verticales y después se aplica Pitágoras.
- **Equilibrio:** si \(F_R = 0\), el cuerpo que estaba quieto sigue quieto.

## 3. Las leyes de Newton

| Ley | Qué dice |
| :--- | :--- |
| **1.ª ley: inercia** | Si \(F_R = 0\), el cuerpo sigue en reposo o en MRU. Los cuerpos tienden a seguir como están. |
| **2.ª ley: principio fundamental** | \(F_R = m \cdot a\) (\(F_R\) en N, \(m\) en kg, \(a\) en m/s²). |
| **3.ª ley: acción y reacción** | Si A empuja a B, B empuja a A con una fuerza igual y de sentido contrario. Actúan sobre cuerpos distintos y no se anulan. |

{{< figura src="accion-reaccion.svg" alt="Dos patinadores A y B se empujan: la fuerza de A sobre B y la de B sobre A son iguales y de sentido contrario" ancho="440" >}}

## 4. Las fuerzas en la naturaleza

{{< caja idea "Gravitación universal:" >}}
todos los cuerpos con masa se atraen. Cuanta más masa, más fuerza; a doble distancia, la fuerza es cuatro veces menor.
{{< /caja >}}

{{< formula >}}F = G \cdot \frac{M \cdot m}{d^{\,2}}{{< /formula >}}

{{< figtexto lado="derecha" src="peso.svg" alt="La Tierra y varios cuerpos a su alrededor con su peso apuntando hacia el centro" ancho="170" >}}
**Peso:** la fuerza con la que la Tierra atrae a un cuerpo; apunta hacia el **centro de la Tierra**.

{{< formula >}}P = m \cdot g \qquad g = 9{,}8\,\text{m/s}^2{{< /formula >}}
{{< /figtexto >}}

{{< caja cuidado >}}
la **masa** (kg, se mide con la balanza) no cambia; el **peso** (N, se mide con el dinamómetro) cambia según la gravedad del lugar.
{{< /caja >}}

- **Fuerza normal:** la que hace una superficie sobre un cuerpo apoyado; es perpendicular a la superficie.
- **Rozamiento:** fuerza de contacto que siempre **se opone al movimiento**.

{{< figura src="normal.svg|rozamiento.svg" alt="Fuerza normal sobre una caja en el suelo y en una rampa|Fuerza de rozamiento opuesta al movimiento de una caja que empujamos" ancho="400|300" >}}

- **Fuerzas eléctricas:** entre cuerpos con carga. Cargas de distinto signo se atraen; del mismo signo, se repelen.
- **Fuerzas magnéticas:** las hacen los imanes, que atraen el hierro, el níquel y el cobalto. Polos distintos se atraen; polos iguales se repelen. La Tierra es un imán gigante: por eso la brújula señala el norte.

{{< figura src="cargas.svg|imanes.svg" alt="Cargas de distinto signo se atraen y del mismo signo se repelen|Polos distintos de dos imanes se atraen y polos iguales se repelen" ancho="460|440" >}}

## 5. Las máquinas simples

Permiten hacer **menos fuerza** o hacerla de forma más cómoda. **Potencia** (\(F\)): la fuerza que hacemos. **Resistencia** (\(R\)): la fuerza que vencemos.

{{< figtexto lado="derecha" src="ley-palanca.svg" alt="Palanca que levanta una piedra de 600 N con el apoyo a 0,5 m de la piedra y la fuerza a 1,5 m del apoyo" ancho="380" >}}
**Palanca:** barra que gira sobre un punto de apoyo.

{{< formula >}}F \cdot d_F = R \cdot d_R{{< /formula >}}
{{< /figtexto >}}

| Tipo | En el medio está… | Esquema | Ejemplos |
| :--- | :--- | :---: | :--- |
| **Primer género** *(first-class)* | el punto de apoyo | {{< mini src="palanca-1.svg" alt="Palanca de primer género" ancho="150" >}} | balancín, tijeras, alicates |
| **Segundo género** *(second-class)* | la resistencia | {{< mini src="palanca-2.svg" alt="Palanca de segundo género" ancho="150" >}} | carretilla, cascanueces, abrebotellas |
| **Tercer género** *(third-class)* | la potencia | {{< mini src="palanca-3.svg" alt="Palanca de tercer género" ancho="150" >}} | pinzas, caña de pescar, antebrazo |

{{< figura src="polea-fija.svg|polea-movil.svg|plano-inclinado.svg" alt="Polea fija: la fuerza es igual a la resistencia|Polea móvil: la fuerza es la mitad de la resistencia|Plano inclinado: subir una caja por una rampa" ancho="130|130|330" rotulos="**Polea fija** *(fixed pulley)*<br>\(F = R\), pero tiramos hacia abajo|**Polea móvil** *(movable pulley)*<br>\(F = R/2\)|**Plano inclinado** *(inclined plane)*<br>cuanto más larga la rampa, menos fuerza" >}}

{{< caja nota "Recuerda:" >}}
si hacemos menos fuerza, tenemos que recorrer más distancia.
{{< /caja >}}
