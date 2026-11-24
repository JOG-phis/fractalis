---
title: "Tema 5: El movimiento"
description: "Resumen del tema: sistema de referencia, posición y trayectoria, desplazamiento, velocidad, MRU, aceleración, MRUA y sus gráficas."
summary: "Sistema de referencia, trayectoria, desplazamiento, velocidad, MRU, aceleración, MRUA y gráficas del movimiento."
date: 2026-11-22
weight: 50
showHero: true
heroStyle: "background"
imagen_autor: "Nicolas Hoizey"
imagen_autor_url: "https://unsplash.com/@nhoizey"
imagen_fuente: "Unsplash"
imagen_url: "https://unsplash.com/photos/poa-Ycw1W8U"
tags: ["movimiento", "velocidad", "MRU", "aceleración", "MRUA"]
tema: 5
materia: ["fisica"]
pdf: "apuntes-movimiento.pdf"
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. El movimiento y el sistema de referencia

{{< caja idea "Movimiento:" >}}
un cuerpo está en **movimiento** si su posición cambia respecto a un **sistema de referencia**, y en **reposo** si no cambia.
{{< /caja >}}

{{< figura src="referencia.svg" alt="Pablo viaja sentado en un tren y María lo ve pasar desde el andén" pie="Respecto al tren, Pablo está en reposo. Respecto al andén, Pablo se mueve junto con el tren." ancho="560" >}}

{{< caja nota "Recuerda:" >}}
el movimiento y el reposo son **relativos**: dependen del sistema de referencia que elijamos.
{{< /caja >}}

## 2. La posición y la trayectoria

- **Posición** (\(x\)): dónde está el cuerpo respecto al origen. Se mide en metros (m).
- **Trayectoria:** la línea que dibuja el cuerpo al moverse.

{{< figura src="posicion.svg" alt="Recta numérica con el origen en una casa, un árbol en x = −200 m y un coche en x = +300 m" ancho="520" >}}

{{< figura src="tray-rectilinea.svg|tray-circular.svg|tray-eliptica.svg|tray-parabolica.svg" alt="Trayectoria rectilínea|Trayectoria circular|Trayectoria elíptica|Trayectoria parabólica" ancho="125|100|125|135" rotulos="Rectilínea *(rectilinear)*|Circular *(circular)*|Elíptica *(elliptical)*|Parabólica *(parabolic)*" >}}

## 3. Desplazamiento y distancia recorrida

- **Desplazamiento:** \(\Delta x = x - x_0\). Solo depende de dónde empieza y dónde acaba el movimiento.
- **Distancia recorrida** (\(d\)): la longitud total del camino, sumando todos los tramos.

{{< figura src="desplazamiento.svg" alt="Ir de casa a la panadería (400 m) y volver hasta el quiosco (300 m): distancia recorrida 700 m y desplazamiento 100 m" ancho="580" >}}

{{< caja nota "Recuerda:" >}}
el desplazamiento y la distancia recorrida solo coinciden si el cuerpo va en línea recta **sin dar la vuelta**.
{{< /caja >}}

## 4. La velocidad

{{< figtexto lado="derecha" src="triangulo-velocidad.svg" alt="Triángulo con d arriba y v y t abajo para recordar las fórmulas" ancho="140" >}}
{{< formula >}}v = \frac{d}{t} \qquad d = v \cdot t \qquad t = \frac{d}{v}{{< /formula >}}

- Unidades: **m/s** (Sistema Internacional) y **km/h**.
- **Velocidad media:** la que calculamos con la fórmula. **Velocidad instantánea:** la que marca el velocímetro en cada momento.
{{< /figtexto >}}

{{< formula >}}\text{km/h} \xrightarrow{\ :\,3{,}6\ } \text{m/s} \qquad\qquad \text{m/s} \xrightarrow{\ \cdot\,3{,}6\ } \text{km/h}{{< /formula >}}

## 5. El movimiento rectilíneo uniforme (MRU)

{{< caja idea "MRU:" >}}
movimiento con trayectoria **recta** y **velocidad constante**: el cuerpo recorre distancias iguales en tiempos iguales.
{{< /caja >}}

{{< formula >}}x = x_0 + v \cdot t{{< /formula >}}

{{< figura src="mru-xt.svg|mru-vt.svg" alt="Gráfica posición-tiempo del MRU: una recta inclinada|Gráfica velocidad-tiempo del MRU: una recta horizontal" ancho="300|295" pie="Gráficas del MRU: posición-tiempo (recta inclinada) y velocidad-tiempo (recta horizontal)." >}}

- En la gráfica \(x\)–\(t\), cuanto **más inclinada** es la recta, **mayor** es la velocidad.
- **Velocidad negativa:** el cuerpo va hacia donde disminuyen las posiciones (la recta baja).
- **Encuentro:** dos cuerpos se encuentran cuando están en la misma posición en el mismo instante; es el punto donde se cortan sus rectas.

## 6. La aceleración y el MRUA

{{< caja idea "Aceleración:" >}}
indica cuánto cambia la velocidad en cada segundo. Es **positiva** si la velocidad aumenta y **negativa** si el cuerpo frena. Se mide en m/s².
{{< /caja >}}

{{< formula >}}a = \frac{v - v_0}{t} \qquad\qquad v = v_0 + a \cdot t{{< /formula >}}

El **MRUA** (movimiento rectilíneo uniformemente acelerado) tiene trayectoria **recta** y **aceleración constante**.

{{< figura src="mrua-xt.svg|mrua-vt.svg" alt="Gráfica posición-tiempo del MRUA: una curva|Gráfica velocidad-tiempo del MRUA: una recta inclinada" ancho="295|295" pie="Gráficas del MRUA: posición-tiempo (curva) y velocidad-tiempo (recta inclinada)." >}}

## Las gráficas de los movimientos

| Movimiento | Velocidad | Gráfica \(x\)–\(t\) | Gráfica \(v\)–\(t\) |
| :--- | :--- | :---: | :---: |
| **Reposo** | cero | {{< mini src="mg-reposo-xt.svg" alt="Recta horizontal" >}} | {{< mini src="mg-reposo-vt.svg" alt="Recta sobre el eje del tiempo" >}} |
| **MRU** | constante | {{< mini src="mg-mru-xt.svg" alt="Recta inclinada" >}} | {{< mini src="mg-mru-vt.svg" alt="Recta horizontal" >}} |
| **MRUA** (acelera) | aumenta lo mismo cada segundo | {{< mini src="mg-mrua-xt.svg" alt="Curva" >}} | {{< mini src="mg-mrua-vt.svg" alt="Recta inclinada" >}} |
