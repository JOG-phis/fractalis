---
title: "Tema 6: Las fuerzas"
description: "Resumen del tema: la fuerza y sus efectos, ley de Hooke, fuerza resultante, leyes de Newton, peso, normal, rozamiento y tensión, problemas de dinámica y gravitación universal."
summary: "Fuerzas y sus efectos, ley de Hooke, fuerza resultante, leyes de Newton, fuerzas habituales, dinámica y gravitación."
date: 2026-11-22
weight: 60
tema: 6
materia: ["fisica"]
pdf: "apuntes-fuerzas.pdf"
tags: ["fuerzas", "ley de Hooke", "leyes de Newton", "rozamiento", "gravitación"]
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. La fuerza y sus efectos

{{< caja idea "Fuerza:" >}}
acción que **deforma** un cuerpo o **cambia su estado de movimiento**. Aparece cuando dos cuerpos interaccionan. Se mide en **newtons** (N) con el **dinamómetro**.
{{< /caja >}}

{{< figura src="deformacion.svg|movimiento.svg|dinamometro.svg" alt="Un muelle sin fuerza y el mismo muelle estirado por una fuerza F|Una fuerza F cambia la dirección de un cuerpo en movimiento|Dinamómetro: un muelle con una escala en newtons del que cuelga una pesa de 300 g" ancho="190|150|190" rotulos="Deforma|Cambia el movimiento|Dinamómetro" >}}

Hay fuerzas **de contacto** (empujar, tirar, rozar) y **a distancia** (gravitatoria, eléctrica, magnética). La fuerza es una magnitud **vectorial**: tiene punto de aplicación, dirección, sentido y módulo.

{{< figura src="vector.svg" alt="Una fuerza sobre una caja representada con una flecha: punto de aplicación, dirección horizontal, sentido hacia la derecha y módulo de 30 N" ancho="440" >}}

## 2. La ley de Hooke

{{< formula >}}F = k \cdot \Delta x \qquad \Delta x = L - L_0\ \ (\text{en m}){{< /formula >}}

{{< figura src="hooke.svg|hooke-grafica.svg" alt="Un muelle de longitud inicial L0 que se alarga hasta L al tirar con una fuerza F|Gráfica fuerza-alargamiento: una recta que pasa por el origen hasta el límite de elasticidad" ancho="250|290" >}}

La **constante elástica** \(k\) (N/m) mide lo duro que es el muelle. La gráfica \(F\)–\(\Delta x\) es una recta que pasa por el origen y su inclinación es \(k\). La ley solo se cumple hasta el **límite de elasticidad**.

## 3. La fuerza resultante

- **Fuerzas en la misma recta:** se suman con su signo.
- **Perpendiculares:** \(F_R = \sqrt{F_1^{\,2} + F_2^{\,2}}\).
- **Varias direcciones:** se suman por un lado las horizontales y por otro las verticales, y después se aplica Pitágoras.
- **Equilibrio:** \(F_R = 0\). La fuerza **equilibrante** es igual que la resultante pero de sentido contrario.

{{< figura src="linea.svg|perpendiculares.svg|varias.svg" alt="Tres fuerzas en la misma recta, de +60, +40 y −30 N, dan una resultante de +70 N|Fuerzas perpendiculares de 8 y 6 N dan una resultante de 10 N|Cuatro fuerzas en varias direcciones se reducen a 16 N horizontales y 12 N verticales" ancho="260|190|300" rotulos="Misma recta|Perpendiculares|Varias direcciones" >}}

## 4. Las leyes de Newton

| Ley | Qué dice |
| :--- | :--- |
| **1.ª Inercia** | Si \(F_R = 0\), el cuerpo sigue en reposo o con MRU. |
| **2.ª Principio fundamental** | \(F_R = m \cdot a\). La aceleración tiene el sentido de la fuerza resultante; si \(F_R\) es constante, el movimiento es un MRUA. \(1\ \text{N} = 1\ \text{kg} \cdot 1\ \text{m/s}^2\). |
| **3.ª Acción y reacción** | Si A empuja a B, B empuja a A con una fuerza igual y de sentido contrario. Actúan sobre cuerpos distintos: **no se anulan**. |

{{< figura src="accion.svg" alt="Dos patinadores, A y B, se empujan: la fuerza de A sobre B y la de B sobre A son iguales y de sentidos contrarios" ancho="380" >}}

## 5. Las fuerzas habituales

| Fuerza | Cómo es | Cómo se calcula |
| :--- | :--- | :--- |
| **Peso** | a distancia, hacia el centro de la Tierra | \(P = m \cdot g\) |
| **Normal** | de contacto, perpendicular a la superficie | en un suelo horizontal, \(N = P\) |
| **Rozamiento** | de contacto, paralelo a la superficie y en contra del movimiento | \(F_r = \mu \cdot N\) |
| **Tensión** | de contacto, en la dirección de la cuerda; siempre tira | en reposo o con \(v\) constante, \(T = P\) |

{{< figura src="peso.svg|normal.svg|rozamiento.svg|tension.svg" alt="El peso apunta hacia abajo|La normal es perpendicular al suelo y a la rampa|El rozamiento se opone a la velocidad|La tensión de la cuerda tira hacia arriba de la lámpara" ancho="110|190|170|110" rotulos="Peso|Normal|Rozamiento|Tensión" >}}

{{< caja cuidado >}}
el rozamiento **no** hace que un cuerpo se mueva: solo **frena**. Si la fuerza que aplicamos es menor que el rozamiento, el cuerpo se queda quieto.
{{< /caja >}}

### Cómo resolver un problema de dinámica

{{< figtexto lado="derecha" src="diagrama.svg" alt="Diagrama de fuerzas de una caja de 25 kg empujada con 99 N: peso 245 N, normal 245 N y rozamiento 49 N" ancho="300" >}}
1. Dibuja el **diagrama de fuerzas**.
2. Toma como positivo el sentido del **movimiento**.
3. **Eje vertical:** si no sube ni baja, las fuerzas se anulan (\(N = P\)).
4. **Eje del movimiento:** \(F_r = \mu \cdot N\), suma con signos y \(F_R = m \cdot a\).
5. Velocidades, tiempos y distancias, con las **ecuaciones del MRUA**.
{{< /figtexto >}}

{{< caja ejemplo "una caja empujada con rozamiento" >}}
Caja de 25 kg empujada con 99 N; \(\mu = 0{,}2\). \(N = P = 25 \cdot 9{,}8 = 245\ \text{N}\); \(F_r = 0{,}2 \cdot 245 = 49\ \text{N}\).

{{< formula >}}F_R = 99 - 49 = 50\ \text{N} \qquad a = \frac{F_R}{m} = \frac{50\ \text{N}}{25\ \text{kg}} = 2\ \text{m/s}^2{{< /formula >}}
{{< /caja >}}

## 6. La gravitación universal

{{< figtexto lado="derecha" src="gravitacion.png" alt="Dos masas M y m se atraen con una fuerza F; al doble de distancia, la fuerza es cuatro veces menor" ancho="300" >}}
{{< formula >}}F = G \cdot \frac{M \cdot m}{d^{\,2}}{{< /formula >}}

con \(G = 6{,}67 \cdot 10^{-11}\ \text{N·m}^2/\text{kg}^2\). Es **siempre atractiva**. Al doble de distancia, la fuerza es cuatro veces menor.

La gravedad en la superficie de un astro, \(g = G \cdot \dfrac{M}{R^{\,2}}\), **no depende** de la masa del cuerpo que cae.
{{< /figtexto >}}
