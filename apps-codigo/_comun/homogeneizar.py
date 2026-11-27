"""Pasa las clases de color de una app generada con AI Studio a la paleta de Fractalis.
   python homogeneizar.py archivo.tsx [...]   (modifica los archivos)
   - indigo, blue, purple  -> acento (color del curso); violet, sky, amber y teal quedan para categorías
   - emerald -> green (acierto) · rose -> red (error)
   - tonos inventados (indigo-650, slate-705, blue-55…) -> el tono estándar más cercano
   - font-mono -> tabular-nums (la web no usa monoespaciada en la interfaz)
   Revisar después a mano los colores con significado (categorías)."""
import re, sys
FAM = r'(slate|gray|indigo|blue|sky|purple|violet|emerald|green|rose|red|amber|orange|teal|pink|yellow|cyan|lime|fuchsia)'
def normaliza(s):
    s = re.sub(rf'\b{FAM}-([1-8])50\b', lambda m: f'{m[1]}-{m[2]}00', s)   # 150…850 (950 sí existe)
    s = re.sub(rf'\b{FAM}-(\d)0([1-9])\b', lambda m: f'{m[1]}-{m[2]}00', s)  # 705 -> 700
    s = re.sub(rf'\b{FAM}-55\b', lambda m: f'{m[1]}-50', s)
    return s
def paleta(s):
    s = re.sub(r'\b(indigo|blue|purple)-(\d+)\b', r'acento-\2', s)   # violet queda libre para categorías
    s = re.sub(r'\bemerald-(\d+)\b', r'green-\1', s)
    s = re.sub(r'\brose-(\d+)\b', r'red-\1', s)
    return s.replace('font-mono', 'tabular-nums')
if __name__ == '__main__':
    for f in sys.argv[1:]:
        t = open(f, encoding='utf-8').read()
        open(f, 'w', encoding='utf-8').write(paleta(normaliza(t)))
        print('homogeneizado', f)
