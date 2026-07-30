---
title: "Topic 1: Science and Measurement"
description: "The scientific method, measurement (the International System), multiples and submultiples, lab equipment and safety, conversion factors."
summary: "The scientific method, measurement, the International System, conversion factors, and lab safety."
date: 2026-07-30
weight: 10
tipo: ["notes"]
tags: ["matter", "density", "physics", "chemistry", "scientific method"]
draft: false
---
{{< katex >}}

## 1. The Scientific Method

Science is not just a collection of knowledge; it's a way of **questioning nature**. To do this, we use a rigorous process called the **scientific method**.

> **Definition:** The scientific method is the systematic procedure that allows scientists to solve problems, answer questions, and create new knowledge.



<div class="flex justify-center">

{{< mermaid >}}
graph TD
    A[Observation] --> B[Question]
    B --> C[Hypothesis]
    C --> D[Experimentation]
    D --> E{Data analysis}
    E -->|Hypothesis confirmed| F[Conclusion / Law / Theory]
    E -->|Hypothesis rejected| C
    F --> G[Communication of results]
{{< /mermaid >}}

</div>

### Main stages:

1.  **Observation:** We identify a phenomenon or problem in our environment.
2.  **Hypothesis:** We formulate a possible explanation, an "educated guess" (\(If... then...\)).
3.  **Experimentation:** We design controlled tests to check whether the hypothesis is true. Here we handle **variables** (dependent, independent, and controlled).
4.  **Data analysis:** We interpret the results obtained (graphs, tables).
5.  **Conclusion:**
    * If the hypothesis is confirmed \(\rightarrow\) **Laws** or **Theories** are formulated.
    * If the hypothesis fails \(\rightarrow\) A new hypothesis is formulated and the process is repeated.

---

## 2. Measurement and the International System (SI)

In physics and chemistry, saying "it's big" or "it's heavy" isn't good enough. We need to measure.

* **Quantity:** Any property of matter that can be measured (e.g. length, time).
* **Unit:** A reference amount used for comparison (e.g. metre, second).

To speak the same language all over the world, we use the **International System of Units (SI)**.

### The 7 Base Quantities

<div style="margin: 0 auto; width: fit-content;">

| Quantity | SI Unit | Symbol |
| :--- | :--- | :---: |
| Length | metre | \(m\) |
| Mass | kilogram | \(kg\) |
| Time | second | \(s\) |
| Temperature | kelvin | \(K\) |
| Electric current | ampere | \(A\) |
| Luminous intensity | candela | \(cd\) |
| Amount of substance | mole | \(mol\) |

</div>


> **Important note:** Notice that temperature in the SI is measured in **Kelvin**, not in degrees Celsius. The relationship is:  
> $$T(K) = T(^\circ C) + 273$$

---

## 3. Multiples, Submultiples, and Scientific Notation

Sometimes we measure gigantic things (the distance to a star) or tiny things (the size of an atom). To avoid writing so many zeros, we use **scientific notation** and prefixes.

### Most common prefixes

| Prefix | Symbol | Factor | Example |
| :--- | :---: | :--- | :--- |
| **Giga** | \(G\) | $$10^9$$ | Gigabyte |
| **Mega** | \(M\) | \(10^6\) | Megawatt |
| **Kilo** | \(k\) | \(10^3\) | Kilometre |
| *(base unit)* | - | \(10^0\) | Metre, Litre... |
| **Centi** | \(c\) | \(10^{-2}\) | Centimetre |
| **Milli** | \(m\) | \(10^{-3}\) | Milligram |
| **Micro** | \(\mu\) | \(10^{-6}\) | Micrometre |
| **Nano** | \(n\) | \(10^{-9}\) | Nanotechnology |

### Scientific Notation
It consists of writing any number as a product of a decimal number (between 1 and 10) and a power of 10.

* Large example: \(300,000,000 \rightarrow 3 \cdot 10^8\)
* Small example: \(0.000005 \rightarrow 5 \cdot 10^{-6}\)

---

## 4. Conversion Factors

Forget the "rule of three". In science we use **conversion factors**. These are fractions that equal 1, where the numerator and denominator represent the same quantity but in different units.

**Steps to convert units:**
1.  Write down the starting value.
2.  Multiply by a fraction (the factor).
3.  Place the unit you want to cancel out on the opposite side (if it's on top, put it on the bottom).
4.  Write in the equivalence.

**Example: Convert 72 km/h to m/s**

$$72 \, \frac{\text{km}}{\text{h}} \cdot \frac{1000 \, \text{m}}{1 \, \text{km}} \cdot \frac{1 \, \text{h}}{3600 \, \text{s}} = 20 \, \text{m/s}$$

> **Tip:** Always cross out the units that repeat on top and bottom to make sure your result has the correct units.

---

## 5. Lab Equipment and Safety

The laboratory is a serious workplace. Knowing the equipment and the risks involved is essential.

### Hazard pictograms
You should be able to identify the labels on reagents:
* 🔥 **Flammable:** Burns easily.
* ☠️ **Toxic:** Can cause death or serious harm if swallowed or inhaled.
* 🧪 **Corrosive:** Destroys living tissue (skin) and materials.
* 💥 **Explosive:** Can explode from shock or heat.

### Basic equipment

Glassware can be classified into two broad groups according to their precision:

1.  **Volumetric equipment (precise):** Used to measure exact volumes.
    * *Graduated cylinder:* For measuring general volumes.
    * *Pipette and burette:* For very precise measurements and transfers.
    * *Volumetric flask:* For preparing solutions of an exact concentration.

2.  **Non-volumetric equipment (approximate):** Used to hold, heat, or mix, but its volume markings aren't reliable.
    * *Beaker.*
    * *Erlenmeyer flask.*
