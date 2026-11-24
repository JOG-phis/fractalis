---
title: "Topic 1: The atom and nuclear energy"
description: "Unit summary: atomic models, atomic and mass number, isotopes and atomic mass, ions, electron configuration, radioactivity, nuclear fission and fusion."
summary: "Atomic models, atomic notation, isotopes, ions, electron configuration and nuclear energy."
date: 2026-11-22
weight: 10
tema: 1
materia: ["quimica"]
pdf: "apuntes-atomo-energia-nuclear.pdf"
tags: ["atomic models", "isotopes", "ions", "electron configuration", "radioactivity", "nuclear energy"]
draft: false
showTableOfContents: true
showTaxonomies: true
---

{{< katex >}}

## 1. Atomic models

Each new atomic model appears when an experiment cannot be explained with the previous one.

{{< figura src="lineatiempo-en.png" alt="Timeline of atomic models: Dalton 1808, Thomson 1897, Rutherford 1911, Bohr 1913, Schrödinger 1926 and Chadwick 1932" pie="The distances on the timeline are not to scale." ancho="640" >}}

| Model | What is the atom like? | Why was it replaced? |
| :--- | :--- | :--- |
| **Dalton** (1808) | A very small, indivisible particle. | The electron is discovered: the atom can be divided. |
| **Thomson** (1897) | A positive sphere with the electrons embedded in it (plum pudding). | It cannot explain Rutherford's experiment. |
| **Rutherford** (1911) | A small, positive nucleus with almost all the mass; the electrons orbit around it; the atom is mostly empty. | It cannot explain why the electrons do not fall into the nucleus. |
| **Bohr** (1913) | Electrons in fixed orbits, arranged in shells. | It only works well for the hydrogen atom. |
| **Current** (1926) | Electrons in orbitals: regions where they are most likely to be found. | It is the model in use today. |

{{< caja cuidado "Watch out! Orbit ≠ orbital." >}}
an **orbit** (Bohr) is a circular path along which the electron moves; an **orbital** (current model) is a region of space where the electron is most likely to be found.
{{< /caja >}}

## 2. The atom and its notation

| Particle | Where it is | Charge | Mass |
| :--- | :--- | :---: | :---: |
| **Proton** | nucleus | \(+1\) | 1 u |
| **Neutron** | nucleus | 0 | 1 u |
| **Electron** | electron cloud | \(-1\) | \(\tfrac{1}{1836}\) u |

{{< columnas >}}
{{< caja idea "Atomic number (Z):" >}}
the number of **protons** in the nucleus. It identifies the element.
{{< /caja >}}
{{< caja idea "Mass number (A):" >}}
the number of **protons plus neutrons**. It is always a whole number.
{{< /caja >}}
{{< /columnas >}}

{{< figura src="notacion-en.svg" alt="Notation of an atom: the mass number A at the top left, the atomic number Z at the bottom left and the charge q at the top right of the symbol X" ancho="440" >}}

{{< caja nota "Remember:" >}}
a neutral atom has the same number of protons as electrons.
{{< /caja >}}

## 3. Isotopes and atomic mass

{{< caja idea "Isotopes:" >}}
atoms of the same element (same \(Z\)) with a different number of neutrons and, therefore, a different \(A\). They are named after their mass number: carbon-14 or C-14 is \(\ce{^{14}_{6}C}\).
{{< /caja >}}

{{< figura src="isotopos-h-en.png" alt="The three isotopes of hydrogen: protium (1 proton), deuterium (1 proton and 1 neutron) and tritium (1 proton and 2 neutrons), all with 1 electron" ancho="480" >}}

The **atomic mass** in the periodic table is the weighted average of the masses of the isotopes according to their **abundance**:

{{< formula >}}\text{Atomic mass} = \frac{\sum \left(\text{isotope mass} \cdot \text{abundance}\right)}{100}{{< /formula >}}

{{< caja cuidado "Watch out! Mass number ≠ atomic mass." >}}
the mass number is a **whole number** and belongs to **one isotope** (Cl-35: \(A = 35\)); the atomic mass is a **decimal** and is the average of **all** the isotopes (Cl: 35.45 u).
{{< /caja >}}

## 4. Ions

{{< caja idea "Ion:" >}}
an atom that has **gained or lost electrons** and therefore has an electric charge. The protons do not change.
{{< /caja >}}

{{< columnas >}}
{{< caja nota "Cation (+):" >}}
it has **lost** electrons. \(\ce{Na -> Na+ + e-}\)
{{< /caja >}}
{{< caja nota "Anion (−):" >}}
it has **gained** electrons. \(\ce{Cl + e- -> Cl-}\)
{{< /caja >}}
{{< /columnas >}}

| Compared with the neutral atom… | Protons | Neutrons | Electrons |
| :--- | :---: | :---: | :---: |
| **An ion** | same | same | **different** |
| **An isotope** | same | **different** | same |
| **Another element** | **different** | — | — |

### How to work out protons, neutrons and electrons

From the notation \(\ce{^{A}_{Z}X^{q}}\):

{{< formula >}}\text{protons} = Z \qquad \text{neutrons} = A - Z \qquad \text{electrons} = Z - \text{charge}{{< /formula >}}

{{< caja cuidado "Watch out! Subtracting a negative charge." >}}
in anions, subtracting the charge means adding: \(\ce{O^{2-}}\) has \(8 - (-2) = 10\) electrons.
{{< /caja >}}

## 5. Electron configuration

{{< caja idea "Electron configuration:" >}}
a way of showing how the electrons of an atom are distributed among the energy levels (\(n = 1, 2, 3\ldots\)) and sublevels (\(s, p, d, f\)).
{{< /caja >}}

{{< figtexto lado="derecha" src="moeller.svg" alt="Moeller diagram: diagonal arrows that give the filling order 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p..." ancho="190" >}}
| Sublevel | \(s\) | \(p\) | \(d\) | \(f\) |
| :--- | :---: | :---: | :---: | :---: |
| **Max. electrons** | 2 | 6 | 10 | 14 |

Electrons fill the lowest-energy sublevels first, in the order given by the **Moeller diagram**:

\(1s\ 2s\ 2p\ 3s\ 3p\ 4s\ 3d\ 4p\ 5s\ 4d\ 5p\ 6s\ldots\)

*Example:* Fe (\(Z = 26\)): \(1s^2\,2s^2\,2p^6\,3s^2\,3p^6\,4s^2\,3d^6\)
{{< /figtexto >}}

{{< caja cuidado >}}
\(4s\) fills **before** \(3d\). And in an ion you have to place \(Z - \text{charge}\) electrons.
{{< /caja >}}

## 6. Radiation and nuclear energy

{{< caja idea "Radiation:" >}}
the emission, propagation and transfer of energy as waves or particles. It is **ionising** if it has enough energy to remove electrons from atoms (X-rays, gamma rays) and **non-ionising** if it does not (radio, microwaves, visible light).
{{< /caja >}}

{{< figura src="espectro-en.svg" alt="Electromagnetic spectrum from lowest to highest energy: radio waves, microwaves, infrared, visible and ultraviolet (non-ionising); X-rays and gamma rays (ionising)" ancho="620" >}}

{{< caja idea "Radioactivity:" >}}
the process by which an unstable nucleus turns into another one and emits ionising radiation. It is measured in **becquerels** (Bq): one decay per second.
{{< /caja >}}

{{< figtexto lado="derecha" src="penetracion-en.svg" alt="Penetrating power: paper stops alpha radiation, aluminium stops beta, lead stops X-rays and gamma rays, and concrete stops neutrons" ancho="330" >}}
| Radiation | It is stopped by… |
| :--- | :--- |
| **Alpha** (\(\alpha\)) | a sheet of paper |
| **Beta** (\(\beta\)) | a sheet of aluminium |
| **Gamma** (\(\gamma\)) | thick lead or concrete |
| **Neutrons** | boron or cadmium |
{{< /figtexto >}}

Radiation has many uses: X-rays and the diagnosis and treatment of cancer in **medicine**, process control and sterilisation in **industry**, and carbon-14 dating.

{{< columnas >}}
{{< caja idea "Nuclear fission:" >}}
a **heavy** nucleus (U-235, Pu-239) **splits** into two smaller ones and releases energy and neutrons, which cause new fissions: a **chain reaction**. It is used in nuclear power stations.
{{< /caja >}}
{{< caja idea "Nuclear fusion:" >}}
two **light** nuclei (deuterium and tritium) **join** to form a heavier one. It releases even more energy: it is the energy source of the Sun and the stars.
{{< /caja >}}
{{< /columnas >}}

{{< figura src="fision-en.png|fusion-en.png" alt="Fission: a neutron hits a uranium-235 nucleus, which splits into barium-141 and krypton-92, releasing energy and 3 neutrons|Fusion: deuterium and tritium join to form helium-4 and a neutron, releasing energy" ancho="330|300" rotulos="**Fission**|**Fusion**" >}}

## Practice

{{< columnas >}}
{{< simulacion titulo="Rutherford Scattering (PhET)" url="https://phet.colorado.edu/en/simulations/rutherford-scattering" >}}
Fire alpha particles at atoms and compare the Thomson and Rutherford models.
{{< /simulacion >}}
{{< simulacion titulo="Build an Atom (PhET)" url="https://phet.colorado.edu/en/simulations/build-an-atom" >}}
Add protons, neutrons and electrons and see how the element, the charge and the mass number change.
{{< /simulacion >}}
{{< simulacion titulo="Isotopes and Atomic Mass (PhET)" url="https://phet.colorado.edu/en/simulations/isotopes-and-atomic-mass" >}}
Build isotopes and see how the average atomic mass changes when you mix them.
{{< /simulacion >}}
{{< /columnas >}}
