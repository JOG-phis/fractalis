---
title: "Tema 1: El átomo y la energía nuclear"
description: "Resumen del tema: modelos atómicos, número atómico y másico, isótopos y masa atómica, iones, configuración electrónica, radiactividad, fisión y fusión nuclear."
summary: "Modelos atómicos, notación del átomo, isótopos, iones, configuración electrónica y energía nuclear."
date: 2026-11-22
weight: 10
tema: 1
materia: ["quimica"]
pdf: "apuntes-atomo-energia-nuclear.pdf"
tags: ["modelos atómicos", "isótopos", "iones", "configuración electrónica", "radiactividad", "energía nuclear"]
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. Los modelos atómicos

Cada modelo atómico nuevo aparece cuando un experimento no se puede explicar con el anterior.

{{< figura src="lineatiempo.png" alt="Línea del tiempo de los modelos atómicos: Dalton 1808, Thomson 1897, Rutherford 1911, Bohr 1913, Schrödinger 1926 y Chadwick 1932" pie="Las distancias de la línea del tiempo no están a escala." ancho="640" >}}

| Modelo | ¿Cómo es el átomo? | ¿Por qué se supera? |
| :--- | :--- | :--- |
| **Dalton** (1808) | Partícula muy pequeña e indivisible. | Se descubre el electrón: el átomo es divisible. |
| **Thomson** (1897) | Esfera positiva con los electrones incrustados (pastel de pasas). | No explica el experimento de Rutherford. |
| **Rutherford** (1911) | Núcleo pequeño y positivo con casi toda la masa; los electrones giran alrededor; el átomo está casi vacío. | No explica por qué los electrones no caen al núcleo. |
| **Bohr** (1913) | Electrones en órbitas concretas, organizados en capas. | Solo explica bien el átomo de hidrógeno. |
| **Actual** (1926) | Electrones en orbitales: regiones donde es más probable encontrarlos. | Es el modelo vigente. |

{{< caja cuidado "¡Cuidado! Órbita ≠ orbital." >}}
una **órbita** (Bohr) es un camino circular por el que gira el electrón; un **orbital** (modelo actual) es una región del espacio donde es más probable encontrarlo.
{{< /caja >}}

## 2. El átomo y su notación

| Partícula | Dónde está | Carga | Masa |
| :--- | :--- | :---: | :---: |
| **Protón** | núcleo | \(+1\) | 1 u |
| **Neutrón** | núcleo | 0 | 1 u |
| **Electrón** | corteza | \(-1\) | \(\tfrac{1}{1836}\) u |

{{< columnas >}}
{{< caja idea "Número atómico (Z):" >}}
número de **protones** del núcleo. Identifica al elemento.
{{< /caja >}}
{{< caja idea "Número másico (A):" >}}
número de **protones más neutrones**. Es siempre un número entero.
{{< /caja >}}
{{< /columnas >}}

{{< figura src="notacion.svg" alt="Notación de un átomo: el número másico A arriba a la izquierda, el número atómico Z abajo a la izquierda y la carga q arriba a la derecha del símbolo X" ancho="440" >}}

{{< caja nota "Recuerda:" >}}
un átomo neutro tiene el mismo número de protones que de electrones.
{{< /caja >}}

## 3. Isótopos y masa atómica

{{< caja idea "Isótopos:" >}}
átomos de un mismo elemento (igual \(Z\)) con distinto número de neutrones y, por tanto, distinto \(A\). Se nombran con el número másico: carbono-14 o C-14 es \(\ce{^{14}_{6}C}\).
{{< /caja >}}

{{< figura src="isotopos-h.png" alt="Los tres isótopos del hidrógeno: protio (1 protón), deuterio (1 protón y 1 neutrón) y tritio (1 protón y 2 neutrones), todos con 1 electrón" ancho="480" >}}

La **masa atómica** de la tabla periódica es la media ponderada de las masas de los isótopos según su **abundancia**:

{{< formula >}}\text{Masa atómica} = \frac{\sum \left(\text{masa del isótopo} \cdot \text{abundancia}\right)}{100}{{< /formula >}}

{{< caja cuidado "¡Cuidado! Número másico ≠ masa atómica." >}}
el número másico es **entero** y es de **un isótopo** (Cl-35: \(A = 35\)); la masa atómica es **decimal** y es la media de **todos** los isótopos (Cl: 35,45 u).
{{< /caja >}}

## 4. Los iones

{{< caja idea "Ion:" >}}
átomo que ha **ganado o perdido electrones** y, por tanto, tiene carga eléctrica. Los protones no cambian.
{{< /caja >}}

{{< columnas >}}
{{< caja nota "Catión (+):" >}}
ha **perdido** electrones. \(\ce{Na -> Na+ + e-}\)
{{< /caja >}}
{{< caja nota "Anión (−):" >}}
ha **ganado** electrones. \(\ce{Cl + e- -> Cl-}\)
{{< /caja >}}
{{< /columnas >}}

| Comparado con el átomo neutro… | Protones | Neutrones | Electrones |
| :--- | :---: | :---: | :---: |
| **Un ion** | igual | igual | **distinto** |
| **Un isótopo** | igual | **distinto** | igual |
| **Otro elemento** | **distinto** | — | — |

### Cómo calcular protones, neutrones y electrones

A partir de la notación \(\ce{^{A}_{Z}X^{q}}\):

{{< formula >}}\text{protones} = Z \qquad \text{neutrones} = A - Z \qquad \text{electrones} = Z - \text{carga}{{< /formula >}}

{{< caja cuidado "¡Cuidado! Restar una carga negativa." >}}
en los aniones, restar la carga es sumar: \(\ce{O^{2-}}\) tiene \(8 - (-2) = 10\) electrones.
{{< /caja >}}

## 5. Configuración electrónica

{{< caja idea "Configuración electrónica:" >}}
forma de indicar cómo se reparten los electrones de un átomo en los niveles (\(n = 1, 2, 3\ldots\)) y subniveles (\(s, p, d, f\)) de energía.
{{< /caja >}}

{{< figtexto lado="derecha" src="moeller.svg" alt="Diagrama de Moeller: flechas diagonales que dan el orden de llenado 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p..." ancho="190" >}}
| Subnivel | \(s\) | \(p\) | \(d\) | \(f\) |
| :--- | :---: | :---: | :---: | :---: |
| **Máx. electrones** | 2 | 6 | 10 | 14 |

Los electrones llenan primero los subniveles de menor energía, en el orden que marca el **diagrama de Moeller**:

\(1s\ 2s\ 2p\ 3s\ 3p\ 4s\ 3d\ 4p\ 5s\ 4d\ 5p\ 6s\ldots\)

*Ejemplo:* Fe (\(Z = 26\)): \(1s^2\,2s^2\,2p^6\,3s^2\,3p^6\,4s^2\,3d^6\)
{{< /figtexto >}}

{{< caja cuidado >}}
el \(4s\) se llena **antes** que el \(3d\). Y en un ion hay que colocar \(Z - \text{carga}\) electrones.
{{< /caja >}}

## 6. La radiación y la energía nuclear

{{< caja idea "Radiación:" >}}
emisión, propagación y transferencia de energía mediante ondas o partículas. Es **ionizante** si tiene energía suficiente para arrancar electrones a los átomos (rayos X, rayos gamma) y **no ionizante** si no la tiene (radio, microondas, luz visible).
{{< /caja >}}

{{< figura src="espectro.svg" alt="Espectro electromagnético de menor a mayor energía: ondas de radio, microondas, infrarrojo, visible y ultravioleta (no ionizantes); rayos X y rayos gamma (ionizantes)" ancho="620" >}}

{{< caja idea "Radiactividad:" >}}
proceso por el que un núcleo inestable se transforma en otro y emite radiación ionizante. Se mide en **becquerelios** (Bq): una desintegración por segundo.
{{< /caja >}}

{{< figtexto lado="derecha" src="penetracion.svg" alt="Poder de penetración: el papel detiene la radiación alfa, el aluminio la beta, el plomo los rayos X y gamma, y el hormigón los neutrones" ancho="330" >}}
| Radiación | La detiene… |
| :--- | :--- |
| **Alfa** (\(\alpha\)) | una hoja de papel |
| **Beta** (\(\beta\)) | una lámina de aluminio |
| **Gamma** (\(\gamma\)) | plomo grueso u hormigón |
| **Neutrones** | boro o cadmio |
{{< /figtexto >}}

La radiación tiene muchas aplicaciones: radiografías, diagnóstico y tratamiento del cáncer en **medicina**, control de procesos y esterilización en la **industria** y datación con carbono-14.

{{< columnas >}}
{{< caja idea "Fisión nuclear:" >}}
un núcleo **pesado** (U-235, Pu-239) se **rompe** en dos más pequeños y libera energía y neutrones, que provocan nuevas fisiones: **reacción en cadena**. Se usa en las centrales nucleares.
{{< /caja >}}
{{< caja idea "Fusión nuclear:" >}}
dos núcleos **ligeros** (deuterio y tritio) se **unen** y forman uno más pesado. Libera aún más energía: es la fuente de energía del Sol y las estrellas.
{{< /caja >}}
{{< /columnas >}}

{{< figura src="fision.png|fusion.png" alt="Fisión: un neutrón choca con un núcleo de uranio-235, que se rompe en bario-141 y kriptón-92 liberando energía y 3 neutrones|Fusión: deuterio y tritio se unen para formar helio-4 y un neutrón, liberando energía" ancho="330|300" rotulos="**Fisión**|**Fusión**" >}}

## Para practicar

{{< columnas >}}
{{< simulacion titulo="Dispersión de Rutherford (PhET)" url="https://phet.colorado.edu/es/simulations/rutherford-scattering" >}}
Lanza partículas alfa contra átomos y compara los modelos de Thomson y de Rutherford.
{{< /simulacion >}}
{{< simulacion titulo="Construye un átomo (PhET)" url="https://phet.colorado.edu/es/simulations/build-an-atom" >}}
Añade protones, neutrones y electrones y observa cómo cambian el elemento, la carga y el número másico.
{{< /simulacion >}}
{{< simulacion titulo="Isótopos y masa atómica (PhET)" url="https://phet.colorado.edu/es/simulations/isotopes-and-atomic-mass" >}}
Construye isótopos y comprueba cómo cambia la masa atómica media al mezclarlos.
{{< /simulacion >}}
{{< /columnas >}}
