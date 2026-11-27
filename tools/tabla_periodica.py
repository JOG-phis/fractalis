#!/usr/bin/env python3
"""Genera data/elementos.json para la tabla periódica interactiva (Proyectos → Tabla periódica).

Parte de tools/datos/PeriodicTableJSON.json (Bowserinator/Periodic-Table-JSON, datos de Wikipedia, CC BY-SA)
y añade lo que ese conjunto no trae: el nombre en español (nomenclatura IUPAC en español), los estados de
oxidación habituales para formular y la familia tal como se enseña en clase (con halógenos aparte).

Uso:  python tools/tabla_periodica.py
Para actualizar los datos de origen, descarga de nuevo
https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json
en tools/datos/ y vuelve a ejecutar el script.
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "tools" / "datos" / "PeriodicTableJSON.json"
DESTINO = RAIZ / "data" / "elementos.json"

NOMBRES_ES = """hidrógeno helio litio berilio boro carbono nitrógeno oxígeno flúor neón sodio magnesio aluminio silicio
fósforo azufre cloro argón potasio calcio escandio titanio vanadio cromo manganeso hierro cobalto níquel cobre cinc
galio germanio arsénico selenio bromo kriptón rubidio estroncio itrio circonio niobio molibdeno tecnecio rutenio rodio
paladio plata cadmio indio estaño antimonio teluro yodo xenón cesio bario lantano cerio praseodimio neodimio prometio
samario europio gadolinio terbio disprosio holmio erbio tulio iterbio lutecio hafnio tántalo wolframio renio osmio
iridio platino oro mercurio talio plomo bismuto polonio astato radón francio radio actinio torio protactinio uranio
neptunio plutonio americio curio berkelio californio einstenio fermio mendelevio nobelio laurencio rutherfordio dubnio
seaborgio bohrio hasio meitnerio darmstatio roentgenio copernicio nihonio flerovio moscovio livermorio teneso oganesón""".split()

# Estados de oxidación habituales (los que se usan al formular y los más frecuentes); vacío = no se conocen compuestos estables
OXIDACION = {
 1: "-1 +1", 2: "", 3: "+1", 4: "+2", 5: "+3", 6: "-4 +2 +4", 7: "-3 +1 +2 +3 +4 +5", 8: "-2 -1 +2", 9: "-1", 10: "",
 11: "+1", 12: "+2", 13: "+3", 14: "-4 +4", 15: "-3 +3 +5", 16: "-2 +2 +4 +6", 17: "-1 +1 +3 +5 +7", 18: "",
 19: "+1", 20: "+2", 21: "+3", 22: "+2 +3 +4", 23: "+2 +3 +4 +5", 24: "+2 +3 +6", 25: "+2 +3 +4 +6 +7", 26: "+2 +3",
 27: "+2 +3", 28: "+2 +3", 29: "+1 +2", 30: "+2", 31: "+3", 32: "-4 +2 +4", 33: "-3 +3 +5", 34: "-2 +2 +4 +6",
 35: "-1 +1 +3 +5 +7", 36: "+2", 37: "+1", 38: "+2", 39: "+3", 40: "+4", 41: "+3 +5", 42: "+4 +6", 43: "+4 +7",
 44: "+3 +4", 45: "+3", 46: "+2 +4", 47: "+1", 48: "+2", 49: "+3", 50: "-4 +2 +4", 51: "-3 +3 +5", 52: "-2 +2 +4 +6",
 53: "-1 +1 +3 +5 +7", 54: "+2 +4 +6", 55: "+1", 56: "+2", 57: "+3", 58: "+3 +4", 59: "+3", 60: "+3", 61: "+3",
 62: "+2 +3", 63: "+2 +3", 64: "+3", 65: "+3 +4", 66: "+3", 67: "+3", 68: "+3", 69: "+3", 70: "+2 +3", 71: "+3",
 72: "+4", 73: "+5", 74: "+4 +6", 75: "+4 +7", 76: "+2 +3 +4 +8", 77: "+3 +4", 78: "+2 +4", 79: "+1 +3", 80: "+1 +2",
 81: "+1 +3", 82: "+2 +4", 83: "+3 +5", 84: "+2 +4", 85: "-1 +1", 86: "+2", 87: "+1", 88: "+2", 89: "+3", 90: "+4",
 91: "+5", 92: "+3 +4 +5 +6", 93: "+5", 94: "+4", 95: "+3", 96: "+3", 97: "+3", 98: "+3", 99: "+3", 100: "+3",
 101: "+3", 102: "+2", 103: "+3", 104: "+4", 105: "+5", 106: "+6", 107: "+7", 108: "+8",
}

HALOGENOS = {9, 17, 35, 53, 85, 117}
# Sin isótopos estables ni masa atómica estándar: la masa es la del isótopo más estable y se escribe entre corchetes
SIN_MASA_ESTANDAR = {43, 61} | set(range(84, 90)) | set(range(93, 119))


def familia(e):
    n, c = e["number"], e["category"]
    if n in HALOGENOS:
        return "halogenos"
    if "noble gas" in c:
        return "gases-nobles"
    if "alkaline earth" in c:
        return "alcalinoterreos"
    if "alkali" in c:
        return "alcalinos"
    if c == "lanthanide":
        return "lantanidos"
    if c == "actinide":
        return "actinidos"
    if "post-transition" in c:
        return "otros-metales"
    if "transition" in c:
        return "transicion"
    if "metalloid" in c:
        return "semimetales"
    return "no-metales"


def tipo(f):
    if f in ("no-metales", "halogenos", "gases-nobles"):
        return "no-metal"
    if f == "semimetales":
        return "semimetal"
    return "metal"


def redondea(x, d):
    return None if x is None else round(float(x), d)


def main():
    origen = json.loads(ORIGEN.read_text(encoding="utf-8"))["elements"]
    salida = []
    for e in origen:
        n = e["number"]
        if n > 118:
            continue
        f = familia(e)
        radios = e.get("atomic_radii") or {}
        radio = (radios.get("empirical") or radios.get("calculated") or [None])[0]
        dens = e.get("density_g_cm3", e.get("density"))
        ie = (e.get("ionization_energies") or [None])[0]
        masa = e["atomic_mass"]
        salida.append({
            "n": n, "s": e["symbol"], "es": NOMBRES_ES[n - 1], "en": e["name"],
            "x": e["xpos"], "y": e["ypos"], "periodo": e["period"], "grupo": e["group"] if e["ypos"] <= 7 else None,
            "bloque": e["block"], "familia": f, "tipo": tipo(f),
            "masa": round(masa) if n in SIN_MASA_ESTANDAR else redondea(masa, 3),
            "masa_isotopo": n in SIN_MASA_ESTANDAR,
            "config": (e.get("electron_configuration_semantic") or "").lstrip("*") or None,
            "capas": e.get("shells"),
            "en_pauling": e.get("electronegativity_pauling"),
            "radio": radio,
            "ei1": redondea(ie, 1),
            "afinidad": redondea(e.get("electron_affinity"), 1),
            "densidad": None if dens is None else float(f"{float(dens):.4g}"),   # g/cm³ (4 cifras significativas)
            "fusion": redondea(e.get("melt"), 1),          # en K (la tabla lo muestra también en °C)
            "ebullicion": redondea(e.get("boil"), 1),
            "estado": {"Solid": "solido", "Liquid": "liquido", "Gas": "gas"}.get(e.get("phase")),
            "oxidacion": OXIDACION.get(n, "").split(),
            "predicho": n >= 100,
        })
    assert len(salida) == 118, len(salida)
    DESTINO.write_text(json.dumps(salida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{DESTINO.relative_to(RAIZ)}: {len(salida)} elementos, {DESTINO.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
