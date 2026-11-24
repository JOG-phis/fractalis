"""Rellena las fichas de las actividades (sesiones, agrupamiento, materiales...) desde una tabla.

Dos pasos:
  1. python tools/fichas.py generar
     Crea tools/fichas.csv con una fila por actividad (curso, carpeta, título, tipo, tema)
     y los valores que ya tenga cada una. Se abre con doble clic en Excel (separador «;»).
  2. Rellenas en Excel las columnas que falten y guardas como «CSV UTF-8 (delimitado por comas)»
     o simplemente Guardar (Excel conserva el formato).
  3. python tools/fichas.py aplicar
     Escribe esos datos en el front matter de index.md y de index.en.md.

Columnas que se escriben (las demás son informativas y no se tocan):
  sesiones       número entero de sesiones de clase
  agrupamiento   individual | parejas | equipos | gran-grupo
  materiales     en español, separados por  |   (p. ej.  8 sobres impresos | candados)
  materiales_en  lo mismo en inglés (si está vacío, la versión inglesa no lleva materiales)
  herramienta    términos de data/vocabulario.yaml separados por comas (phet, geogebra...)
  metodologia    términos de data/vocabulario.yaml separados por comas (gamificacion...)
  guia_profesor  «bajo-peticion» o vacío
Una celda vacía deja el campo como esté. Para borrar un campo, escribe un guion: -
"""
import csv
import re
import sys
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
CONTENT = RAIZ / "content"
CSV = RAIZ / "tools" / "fichas.csv"
INFO = ["curso", "carpeta", "titulo", "tipo", "tema", "paginas"]
CAMPOS = ["sesiones", "agrupamiento", "materiales", "materiales_en", "herramienta", "metodologia", "guia_profesor"]
LISTAS = {"herramienta", "metodologia"}


def partes(f: Path):
    t = f.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?\n)---", t, re.S)
    return m.group(1), t[m.end():]


def actividades():
    for f in sorted(CONTENT.glob("*/actividades/*/index.md")) + sorted(CONTENT.glob("*/*/actividades/*/index.md")):
        yield f


def generar():
    filas = []
    for f in actividades():
        fm_txt, _ = partes(f)
        fm = yaml.safe_load(fm_txt) or {}
        if fm.get("draft"):
            continue
        en = f.with_name("index.en.md")
        fm_en = yaml.safe_load(partes(en)[0]) if en.exists() else {}
        rel = f.parent.relative_to(CONTENT).parts
        fila = {
            "curso": "/".join(rel[:-2]), "carpeta": rel[-1], "titulo": fm.get("title", ""),
            "tipo": fm.get("clase", ""), "tema": fm.get("tema", ""), "paginas": fm.get("paginas", ""),
            "sesiones": fm.get("sesiones", ""), "agrupamiento": fm.get("agrupamiento", ""),
            "materiales": " | ".join(fm.get("materiales") or []),
            "materiales_en": " | ".join((fm_en or {}).get("materiales") or []),
            "herramienta": ", ".join(fm.get("herramienta") or []),
            "metodologia": ", ".join(fm.get("metodologia") or []),
            "guia_profesor": fm.get("guia_profesor", ""),
        }
        filas.append(fila)
    if CSV.exists() and "--forzar" not in sys.argv:
        sys.exit(f"Ya existe {CSV.relative_to(RAIZ)}. Si quieres empezar de nuevo (se pierde lo que hayas escrito), añade --forzar")
    with CSV.open("w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=INFO + CAMPOS, delimiter=";")
        w.writeheader()
        w.writerows(filas)
    print(f"{len(filas)} actividades en {CSV.relative_to(RAIZ)}")


def valor_yaml(campo, valor):
    if campo in LISTAS:
        return "[" + ", ".join(f'"{x.strip()}"' for x in valor.split(",") if x.strip()) + "]"
    if campo == "sesiones":
        return str(int(valor))
    return f'"{valor}"'


def escribir_campos(f: Path, valores: dict):
    """valores: campo -> texto (o lista para materiales); None = borrar. Solo toca esos campos."""
    fm, cuerpo = partes(f)
    lineas = fm.splitlines(keepends=True)
    # quitar las líneas actuales de esos campos (y las de la lista de materiales)
    salida, i = [], 0
    while i < len(lineas):
        clave = re.match(r"^([A-Za-z_]+):", lineas[i])
        if clave and clave.group(1) in valores:
            i += 1
            while i < len(lineas) and re.match(r"^\s+-\s", lineas[i]):
                i += 1
            continue
        salida.append(lineas[i])
        i += 1
    nuevas = []
    for campo in ["herramienta", "metodologia", "sesiones", "agrupamiento", "guia_profesor", "materiales"]:
        if campo not in valores or valores[campo] is None:
            continue
        v = valores[campo]
        if campo == "materiales":
            nuevas.append("materiales:\n" + "".join(f'  - "{m}"\n' for m in v))
        else:
            nuevas.append(f"{campo}: {valor_yaml(campo, v)}\n")
    # insertar detrás de materia / herramienta / metodologia (lo último que haya de ellos)
    pos = 0
    for j, l in enumerate(salida):
        if re.match(r"^(materia|herramienta|metodologia):", l):
            pos = j + 1
    if not pos:
        pos = next((j + 1 for j, l in enumerate(salida) if l.startswith("tema:")), len(salida))
    salida[pos:pos] = nuevas
    f.write_text("---\n" + "".join(salida) + "---" + cuerpo, encoding="utf-8")


def aplicar():
    vocab = yaml.safe_load((RAIZ / "data" / "vocabulario.yaml").read_text(encoding="utf-8"))
    with CSV.open(encoding="utf-8-sig", newline="") as fh:
        muestra = fh.read(2048); fh.seek(0)
        dialecto = csv.Sniffer().sniff(muestra, delimiters=";,")
        filas = list(csv.DictReader(fh, dialect=dialecto))
    errores, cambios = [], 0
    for n, fila in enumerate(filas, start=2):
        carpeta = CONTENT / fila["curso"] / "actividades" / fila["carpeta"]
        es, en = carpeta / "index.md", carpeta / "index.en.md"
        if not es.exists():
            errores.append(f"fila {n}: no existe {carpeta.relative_to(RAIZ)}"); continue
        comun, solo_es, solo_en = {}, {}, {}
        for campo in CAMPOS:
            v = (fila.get(campo) or "").strip()
            if not v:
                continue
            if v == "-":
                destino = solo_es if campo == "materiales" else solo_en if campo == "materiales_en" else comun
                destino["materiales" if campo.startswith("materiales") else campo] = None
                continue
            if campo == "sesiones" and not v.isdigit():
                errores.append(f"fila {n} ({fila['carpeta']}): «sesiones» debe ser un número"); continue
            if campo == "agrupamiento" and v not in vocab["agrupamiento"]:
                errores.append(f"fila {n} ({fila['carpeta']}): agrupamiento «{v}» no vale"); continue
            if campo in LISTAS:
                malos = [x.strip() for x in v.split(",") if x.strip() not in vocab[campo]["terminos"]]
                if malos:
                    errores.append(f"fila {n} ({fila['carpeta']}): {campo} «{', '.join(malos)}» no está en data/vocabulario.yaml"); continue
            if campo == "guia_profesor" and v != "bajo-peticion":
                errores.append(f"fila {n} ({fila['carpeta']}): guia_profesor solo puede ser «bajo-peticion»"); continue
            if campo == "materiales":
                solo_es["materiales"] = [m.strip().replace('"', "'") for m in v.split("|") if m.strip()]
            elif campo == "materiales_en":
                solo_en["materiales"] = [m.strip().replace('"', "'") for m in v.split("|") if m.strip()]
            else:
                comun[campo] = v
        if comun or solo_es:
            escribir_campos(es, {**comun, **solo_es}); cambios += 1
        if en.exists() and (comun or solo_en):
            escribir_campos(en, {**comun, **solo_en})
    print(f"Actividades actualizadas: {cambios}")
    if errores:
        print(f"{len(errores)} fila(s) con problemas (no se han aplicado esos datos):")
        for e in errores:
            print("  -", e)
        sys.exit(1)


if __name__ == "__main__":
    orden = sys.argv[1] if len(sys.argv) > 1 else ""
    if orden == "generar":
        generar()
    elif orden == "aplicar":
        aplicar()
    else:
        print(__doc__)
