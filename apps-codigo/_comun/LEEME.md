# Kit de identidad de las apps de Fractalis

Todo lo que hace que una app «sea de Fractalis»: cabecera, pie, presentación con el fractal del curso, colores, formas, tipografía y modo oscuro.
Estilo A: barra azul marino con el color del curso. La guía completa está en el proyecto «Web personal docente» de Claude: `claude/06-apps-fractalis.md`.

## Qué hay

- `Fractalis.tsx`: componentes `CabeceraFractalis`, `IntroFractalis`, `PieFractalis` y `LogoFractalis`, el gancho `useIncrustada()` y la lista `CURSOS` (nombre y color de cada curso, los mismos que `data/cursos.json` de la web). Además pone el modo claro u oscuro (siguiendo a la web si la app está incrustada, o al sistema si se abre sola) y el curso en `<html data-curso="…">`.
- `fractalis.css`: estilos de la cabecera, el pie y la presentación (CSS normal, no depende de Tailwind).
- `tema.css`: el tema de Tailwind v4 (color `acento-*` del curso, modo oscuro por clase, esquinas y sombras sobrias, fuente del sistema, fondo). Lo genera `generar_tema.py`.
- `fractales/`: el fractal de cada curso en SVG (los de la web, generados con `tools/fractales.py`).
- `homogeneizar.py`: pasa los colores de una app de AI Studio a la paleta de Fractalis (ver abajo).
- `oscurecer.py`: añade el modo oscuro (`dark:`) a una app hecha solo en claro. Es un punto de partida: hay que revisar las capturas.

## Paleta de Fractalis en las apps

| Papel | Clases | Ejemplos |
|---|---|---|
| Principal (color del curso) | `acento-*` | botones principales, progreso, enlaces, pasos de una secuencia, niveles |
| Neutros | `slate-*` | fondos, textos, bordes |
| Acierto / error / pista | `green-*` / `red-*` / `amber-*` | correcciones, marcadores, pistas, estrellas |
| Categorías (cuando hay que distinguir grupos) | `sky`, `amber`, `violet`, `teal` (en ese orden) | sólido / líquido / gas; elemento / compuesto / mezclas |

`acento-400` es el color exacto del curso; del 500 en adelante va un paso más oscuro para que el texto blanco se lea bien.
Los botones de categoría van tintados (`bg-sky-100 text-sky-900 border-sky-300` y su versión `dark:`), no en color sólido.
Los objetos que el alumnado tiene que clasificar van en tarjeta neutra: su color no debe dar pistas.

## Cómo se usa en una app (React + Vite + Tailwind v4)

1. En `vite.config.ts` de la app, dentro de `resolve`:
   ```ts
   alias: { '@fractalis': path.resolve(__dirname, '../_comun/Fractalis.tsx') },
   dedupe: ['react', 'react-dom'],
   ```
2. En `src/index.css`:
   ```css
   @import "tailwindcss";
   @import "../../_comun/tema.css";
   ```
3. En `App.tsx`:
   ```tsx
   import { CabeceraFractalis, IntroFractalis, PieFractalis } from "@fractalis";

   <CabeceraFractalis titulo="Nombre de la app" subtitulo="Qué se practica" curso="3eso" tema="Tema 2">
     {/* controles propios de la app, con className="fx-boton" (botones) o "fx-dato" (marcadores) */}
   </CabeceraFractalis>
   <IntroFractalis titulo="¿Pregunta o título de la portada?" curso="3eso">
     <p>Presentación breve de la app.</p>
   </IntroFractalis>
   …contenido…
   <PieFractalis pagina="proyectos/nombre-de-la-app/" curso="3eso" />
   ```
4. Sin fondo en el contenedor principal (el fondo lo pone `tema.css`; dentro de la web es transparente), sin `min-h-screen` (dentro de la web la app tiene que poder encoger) y sin fuentes de Google.

Para una app nueva de AI Studio:
```
python ../_comun/homogeneizar.py src/App.tsx src/data.ts
python ../_comun/oscurecer.py src/App.tsx        # solo si no tiene modo oscuro
```
y después revisar a mano los colores con significado (categorías) y las capturas en claro, oscuro, móvil y dentro de la web.

Cuando la app está dentro de una página de Fractalis, la cabecera se reduce a una barra fina, el pie desaparece y el fondo se vuelve transparente, solos.
