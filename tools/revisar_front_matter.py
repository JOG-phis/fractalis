"""Revisa el front matter de los apuntes, actividades y proyectos de Fractalis.

Comprueba, en las páginas publicadas (sin draft: true):
  - que apuntes, actividades y proyectos llevan «materia»;
  - que apuntes y actividades llevan «tema», y actividades y proyectos, «clase»;
  - que materia, herramienta, metodologia, clase y agrupamiento usan solo términos
    de data/vocabulario.yaml, y que «sesiones» es un número entero;
  - que la versión en español (index.md) y la inglesa (index.en.md) coinciden en
    esos campos (y en tema, weight y draft);
  - que ninguna etiqueta (tags) repite el nombre de una materia, herramienta o metodología.

Con --paginas crea además las páginas de las taxonomías (content/<taxonomía>/_index.md
y una por cada término usado, en español e inglés). No sobrescribe las que ya existen.

Uso (desde la carpeta del sitio):
    python tools/revisar_front_matter.py
    python tools/revisar_front_matter.py --paginas
Devuelve código 1 si hay avisos.
"""
import argparse
import re
import sys
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
CONTENT = RAIZ / "content"
TAXONOMIAS = ["materia", "herramienta", "metodologia"]
IGUALES_EN_LOS_DOS = ["tema", "clase", "weight", "draft", "sesiones", "agrupamiento",
                      "guia_profesor"] + TAXONOMIAS   # «cursos» no: en los proyectos puede ser texto traducido («1º ESO» / «1 ESO»)


def leer_front_matter(f: Path) -> dict:
    t = f.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---", t, re.S)
    return (yaml.safe_load(m.group(1)) or {}) if m else {}


def como_lista(v):
    if v is None:
        return []
    return v if isinstance(v, list) else [v]


def tipo_de_pagina(f: Path):
    partes = f.relative_to(CONTENT).parts
    if partes[0] == "proyectos" and len(partes) == 3:
        return "proyecto"
    if "apuntes" in partes[:-1] and len(partes) >= 4:
        return "tema"
    if "actividades" in partes[:-1] and len(partes) >= 4:
        return "actividad"
    return None


def revisar(vocab: dict) -> tuple[list[str], dict]:
    avisos, usados = [], {t: set() for t in TAXONOMIAS}
    permitidos = {t: set(vocab[t]["terminos"]) for t in TAXONOMIAS}
    permitidos["clase"] = set(vocab["clase"]["terminos"])
    agrupamientos = set(vocab["agrupamiento"])
    nombres = {n.lower() for t in TAXONOMIAS for d in vocab[t]["terminos"].values() for n in (d["es"], d["en"])}

    for f in sorted(CONTENT.rglob("index*.md")):
        tipo = tipo_de_pagina(f)
        if not tipo:
            continue
        fm = leer_front_matter(f)
        rel = f.relative_to(RAIZ).as_posix()
        if fm.get("draft"):
            continue

        for t in TAXONOMIAS:
            for v in como_lista(fm.get(t)):
                usados[t].add(v)
                if v not in permitidos[t]:
                    avisos.append(f"{rel}: «{t}: {v}» no está en data/vocabulario.yaml")
        if not como_lista(fm.get("materia")):
            avisos.append(f"{rel}: falta «materia»")
        if tipo in ("tema", "actividad") and not fm.get("tema"):
            avisos.append(f"{rel}: falta «tema»")
        if tipo in ("actividad", "proyecto"):
            clase = fm.get("clase")
            if not clase:
                avisos.append(f"{rel}: falta «clase»")
            elif clase not in permitidos["clase"]:
                avisos.append(f"{rel}: «clase: {clase}» no es un tipo conocido")
        if tipo == "proyecto" and not como_lista(fm.get("cursos")):
            avisos.append(f"{rel}: un proyecto necesita «cursos»")
        if "sesiones" in fm and not (isinstance(fm["sesiones"], int) and fm["sesiones"] >= 1):
            avisos.append(f"{rel}: «sesiones» debe ser un número entero (1, 2…)")
        if fm.get("agrupamiento") and fm["agrupamiento"] not in agrupamientos:
            avisos.append(f"{rel}: «agrupamiento: {fm['agrupamiento']}» no vale ({', '.join(sorted(agrupamientos))})")
        for tag in como_lista(fm.get("tags")):
            if str(tag).lower() in nombres:
                avisos.append(f"{rel}: la etiqueta «{tag}» ya es una materia, herramienta o metodología; quítala de tags")

        # Español frente a inglés
        if f.name == "index.md":
            en = f.with_name("index.en.md")
            if en.exists():
                fm_en = leer_front_matter(en)
                for campo in IGUALES_EN_LOS_DOS:
                    if fm.get(campo) != fm_en.get(campo):
                        avisos.append(f"{rel}: «{campo}» distinto en la versión inglesa ({fm.get(campo)!r} / {fm_en.get(campo)!r})")
    return avisos, usados


def escribir(f: Path, titulo: str, descripcion: str | None, creadas: list):
    if f.exists():
        return
    f.parent.mkdir(parents=True, exist_ok=True)
    lineas = ["---", f'title: "{titulo}"']
    if descripcion:
        lineas.append(f'description: "{descripcion}"')
    lineas += ["---", ""]
    f.write_text("\n".join(lineas), encoding="utf-8")
    creadas.append(f.relative_to(RAIZ).as_posix())


def crear_paginas(vocab: dict, usados: dict) -> list[str]:
    creadas = []
    for t in TAXONOMIAS:
        datos = vocab[t]
        if not usados[t]:
            continue
        for idioma, sufijo in (("es", ""), ("en", ".en")):
            escribir(CONTENT / t / f"_index{sufijo}.md", datos["titulo"][idioma], datos["descripcion"][idioma], creadas)
            for termino in sorted(usados[t]):
                d = datos["terminos"].get(termino)
                if d:
                    escribir(CONTENT / t / termino / f"_index{sufijo}.md", d[idioma], d.get(f"desc_{idioma}"), creadas)
    return creadas


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--paginas", action="store_true", help="crear las páginas de taxonomía que falten")
    args = ap.parse_args()
    vocab = yaml.safe_load((RAIZ / "data" / "vocabulario.yaml").read_text(encoding="utf-8"))
    avisos, usados = revisar(vocab)

    if args.paginas:
        for c in crear_paginas(vocab, usados):
            print("creada:", c)
    # Términos usados que aún no tienen página: se verían con el slug (p. ej. «computacion-robotica»)
    for t in TAXONOMIAS:
        for termino in sorted(usados[t]):
            if termino in vocab[t]["terminos"] and not (CONTENT / t / termino / "_index.md").exists():
                avisos.append(f"content/{t}/{termino}/: falta su página; ejecuta con --paginas")

    if avisos:
        print(f"{len(avisos)} aviso(s):")
        for a in avisos:
            print("  -", a)
        sys.exit(1)
    print("Todo en orden.")


if __name__ == "__main__":
    main()
