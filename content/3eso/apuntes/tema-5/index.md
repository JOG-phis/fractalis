---
title: "Tema 5: El movimiento"
description: "Resumen del tema: sistema de referencia, magnitudes escalares y vectoriales, desplazamiento, velocidad, MRU, aceleración, MRUA, caída libre, gráficas del movimiento y problemas de encuentro."
summary: "Sistema de referencia, velocidad, MRU, aceleración, MRUA, caída libre, gráficas y problemas de encuentro."
date: 2026-11-22
weight: 50
tema: 5
materia: ["fisica"]
pdf: "apuntes-movimiento.pdf"
tags: ["movimiento", "MRU", "MRUA", "caída libre", "gráficas"]
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. El movimiento y sus magnitudes

{{< figtexto lado="derecha" src="referencia.svg" alt="Pablo va sentado en un tren y María lo ve pasar desde el andén" ancho="300" >}}
El movimiento y el reposo son **relativos**: dependen del **sistema de referencia** (un origen y un sentido positivo). Pablo está en reposo respecto al tren, pero se mueve respecto al andén.
{{< /figtexto >}}

{{< columnas >}}
{{< caja idea "Magnitud escalar:" >}}
queda definida con un número y su unidad: tiempo, masa, espacio recorrido.
{{< /caja >}}
{{< caja idea "Magnitud vectorial:" >}}
además necesita **dirección y sentido**: desplazamiento, velocidad, aceleración. En una recta, el sentido es el **signo**.
{{< /caja >}}
{{< /columnas >}}

{{< figura src="vector.svg" alt="Un vector con su punto de aplicación, su dirección, su sentido y su módulo de 20 m/s" ancho="420" >}}

## 2. Desplazamiento y espacio recorrido

- **Posición** \(x\) (m): dónde está el cuerpo respecto al origen.
- **Desplazamiento:** \(\Delta x = x - x_0\). Puede ser **negativo**.
- **Espacio recorrido** \(s\): longitud del camino sobre la trayectoria. **Nunca** es negativo.

{{< figura src="piscina.svg" alt="Un nadador hace tres largos de 50 m en una piscina: recorre 150 m pero su desplazamiento es de 50 m" pie="Tres largos de 50 m: el espacio recorrido es 150 m, pero el desplazamiento es 50 m." ancho="500" >}}

## 3. La velocidad

{{< formula >}}v_m = \frac{\Delta x}{\Delta t}\ \ (\text{m/s}) \qquad\qquad \text{km/h} \xrightarrow{\ :\,3{,}6\ } \text{m/s} \qquad \text{m/s} \xrightarrow{\ \cdot\,3{,}6\ } \text{km/h}{{< /formula >}}

La **velocidad instantánea** es la de un instante concreto (la que marca el velocímetro). Antes de calcular, pasa todos los datos al **Sistema Internacional**.

## 4. El movimiento rectilíneo uniforme (MRU)

{{< caja idea "MRU:" >}}
trayectoria **recta** y **velocidad constante**.
{{< /caja >}}

{{< formula >}}x = x_0 + v \cdot t{{< /formula >}}

Si \(v > 0\), las posiciones aumentan; si \(v < 0\), disminuyen (el cuerpo va en sentido contrario). En una tabla de datos, es un MRU si \(\Delta x / \Delta t\) sale igual en todos los intervalos.

## 5. La aceleración y el MRUA

{{< caja idea "Aceleración:" >}}
cuánto cambia la velocidad cada segundo: \(a = \dfrac{v - v_0}{t}\) (m/s²). Si el cuerpo va en sentido positivo, \(a > 0\) acelera y \(a < 0\) frena.
{{< /caja >}}

El **MRUA** tiene trayectoria **recta** y **aceleración constante**. Se usa la ecuación que tenga una sola incógnita:

{{< formula >}}v = v_0 + a \cdot t \qquad x = x_0 + v_0 \cdot t + \tfrac{1}{2}\, a \cdot t^2 \qquad v^2 - v_0^2 = 2 \cdot a \cdot \Delta x{{< /formula >}}

{{< figura src="mrua-xt.svg|mrua-vt.svg" alt="Gráfica posición-tiempo de un MRUA: una curva|Gráfica velocidad-tiempo de un MRUA: una recta inclinada; la velocidad aumenta 4 m/s en 2 s" ancho="270|270" pie="Gráficas de un MRUA: posición-tiempo (curva) y velocidad-tiempo (recta inclinada)." >}}

## 6. Caída libre y lanzamiento vertical

{{< figtexto lado="derecha" src="vertical.png" alt="Tres casos: se deja caer desde un edificio, se lanza hacia abajo y se lanza hacia arriba hasta la altura máxima; el eje y es positivo hacia arriba y la aceleración es −g" ancho="340" >}}
Con el eje \(y\) hacia arriba y el origen en el suelo, la aceleración es \(a = -g = -9{,}8\ \text{m/s}^2\):

{{< formula >}}v = v_0 - g \cdot t{{< /formula >}}
{{< formula >}}y = y_0 + v_0 \cdot t - \tfrac{1}{2}\, g \cdot t^2{{< /formula >}}

- **Se deja caer:** \(v_0 = 0\). **Hacia abajo:** \(v_0 < 0\). **Hacia arriba:** \(v_0 > 0\).
- **Altura máxima:** \(v = 0\). **Llega al suelo:** \(y = 0\) (se descarta el tiempo negativo).
{{< /figtexto >}}

## 7. Las gráficas del movimiento

| Movimiento | Velocidad | \(x\)–\(t\) | \(v\)–\(t\) |
| :--- | :--- | :---: | :---: |
| **Reposo** | cero | {{< mini src="g-x-reposo.svg" alt="Recta horizontal" >}} | {{< mini src="g-v-reposo.svg" alt="Recta sobre el eje del tiempo" >}} |
| **MRU** | constante | {{< mini src="g-x-mru.svg" alt="Recta inclinada" >}} | {{< mini src="g-v-mru.svg" alt="Recta horizontal" >}} |
| **MRUA que acelera** | aumenta lo mismo cada segundo | {{< mini src="g-x-acelera.svg" alt="Curva hacia arriba" >}} | {{< mini src="g-v-acelera.svg" alt="Recta que sube" >}} |
| **MRUA que frena** | disminuye lo mismo cada segundo | {{< mini src="g-x-frena.svg" alt="Curva que se aplana" >}} | {{< mini src="g-v-frena.svg" alt="Recta que baja" >}} |

{{< figtexto lado="derecha" src="tramos.svg" alt="Gráfica velocidad-tiempo por tramos: A acelera de 4 a 20 m/s, B mantiene 20 m/s y C frena hasta pararse; el área bajo cada tramo es el espacio recorrido" ancho="300" >}}
En una gráfica \(v\)–\(t\):

- Tramo **horizontal**: MRU. Tramo **inclinado**: MRUA.
- La **aceleración** es la inclinación de la recta: \(a = \Delta v / \Delta t\).
- El **espacio recorrido** es el **área** bajo la gráfica (rectángulos, triángulos y trapecios).
{{< /figtexto >}}

## 8. Problemas de encuentro

1. Un único **sistema de referencia** y todos los datos en el SI.
2. La **ecuación de la posición** de cada cuerpo (con \(v\) negativa si va en sentido contrario).
3. **Iguala** las posiciones y despeja \(t\).
4. **Sustituye** \(t\) para hallar dónde se encuentran.

{{< figura src="encuentro-esquema.svg|encuentro-grafica.svg" alt="Un autobús sale de x = 0 a +15 m/s y un coche de x = 1200 m a −25 m/s; se encuentran en x = 450 m|Gráfica posición-tiempo: las rectas del autobús y del coche se cortan a los 30 s en 450 m" ancho="330|260" >}}

{{< formula >}}0 + 15\,t = 1200 - 25\,t \ \Rightarrow\ t = 30\ \text{s} \qquad x = 15 \cdot 30 = 450\ \text{m}{{< /formula >}}
