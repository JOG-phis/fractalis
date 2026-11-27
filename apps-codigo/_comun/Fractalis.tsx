/* Kit de identidad de las apps de Fractalis (ver LEEME.md de esta carpeta).
   Uso en una app:
     import { CabeceraFractalis, IntroFractalis, PieFractalis } from "@fractalis";
     <CabeceraFractalis titulo="…" subtitulo="…" curso="2eso" tema="Tema 1">  …botones de la app con className="fx-boton"…  </CabeceraFractalis>
     <IntroFractalis titulo="¿Puedes…?" curso="2eso">Texto de presentación</IntroFractalis>   (en la pantalla de inicio)
     …contenido (colores: acento-*, slate, y green/red/amber para acierto/error/pista; ver LEEME.md)…
     <PieFractalis pagina="proyectos/mi-app/" curso="2eso" />
   Y en el index.css de la app:  @import "tailwindcss";  @import "../../_comun/tema.css";
*/
import { useLayoutEffect, useMemo, type ReactNode, type CSSProperties } from "react";
import "./fractalis.css";

/** Fractales de cada curso (los mismos que los iconos de la web), en SVG que toma el color del texto */
const FRACTALES = Object.fromEntries(
  Object.entries(import.meta.glob("./fractales/*.svg", { query: "?raw", import: "default", eager: true }) as Record<string, string>)
    .map(([ruta, svg]) => [ruta.replace(/^.*\/|\.svg$/g, ""), svg]),
);

/** Cursos de Fractalis: nombre y color (los mismos que data/cursos.json de la web) */
export const CURSOS: Record<string, { nombre: string; color: string }> = {
  "2eso": { nombre: "2º ESO", color: "#38bdf8" },
  "3eso": { nombre: "3º ESO", color: "#2dd4bf" },
  "4eso": { nombre: "4º ESO", color: "#4ade80" },
  "1bach": { nombre: "1º Bachillerato", color: "#a78bfa" },
  "2bach-quimica": { nombre: "Química 2º Bach", color: "#fbbf24" },
  "2bach-fisica": { nombre: "Física 2º Bach", color: "#f87171" },
  "proyectos": { nombre: "Proyectos", color: "#f472b6" },
};

/** Dirección de la web relativa a la app (las apps viven en /apps/<app>/) */
const WEB = "../../";

/** ¿Está la app dentro de una página de Fractalis? (iframe, o ?incrustada en la URL) */
export function useIncrustada(): boolean {
  return useMemo(() => {
    try {
      if (new URLSearchParams(window.location.search).has("incrustada")) return true;
      return window.self !== window.top;
    } catch {
      return true; // si el navegador no deja mirar la ventana de arriba, es que estamos dentro de otra
    }
  }, []);
}

/* ------------------------------------------------------------ Tema claro / oscuro
   Abierta sola: sigue al sistema (prefers-color-scheme).
   Incrustada en una página de Fractalis: sigue a la web (la clase «dark» de su <html>), también cuando se cambia con el botón de la web.
   Se aplica al cargar el módulo, antes de que React pinte nada, para que no haya parpadeo. */
function enLaWeb(): Document | null {
  try {
    if (window.self !== window.top && window.parent.document) return window.parent.document;
  } catch { /* otra web: no se puede mirar */ }
  return null;
}

function iniciarTema() {
  if (typeof window === "undefined") return;
  const raiz = document.documentElement;
  const web = enLaWeb();
  if (web) {
    raiz.classList.add("fx-en-web");
    const copiar = () => {
      raiz.classList.toggle("dark", web.documentElement.classList.contains("dark"));
      // mismo color-scheme que la web, para que el navegador no ponga un fondo opaco detrás del iframe
      raiz.style.colorScheme = getComputedStyle(web.documentElement).colorScheme || "normal";
    };
    copiar();
    new MutationObserver(copiar).observe(web.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
  } else {
    const oscuro = window.matchMedia("(prefers-color-scheme: dark)");
    const copiar = () => raiz.classList.toggle("dark", oscuro.matches);
    copiar();
    oscuro.addEventListener("change", copiar);
  }
}
iniciarTema();

/** Pone el curso en <html data-curso="…">: de ahí sale el color «acento» de tema.css */
function useCurso(curso: string) {
  useLayoutEffect(() => { document.documentElement.dataset.curso = CURSOS[curso] ? curso : "proyectos"; }, [curso]);
}

/** Logo de Fractalis: triángulo de Sierpinski (toma el color del texto) */
export function LogoFractalis({ className = "fx-logo", nivel = 4 }: { className?: string; nivel?: number }) {
  const triangulos = useMemo(() => {
    const t: string[] = [];
    const dividir = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, n: number) => {
      if (n === 0) { t.push(`${ax},${ay} ${bx},${by} ${cx},${cy}`); return; }
      const abx = (ax + bx) / 2, aby = (ay + by) / 2, bcx = (bx + cx) / 2, bcy = (by + cy) / 2, cax = (cx + ax) / 2, cay = (cy + ay) / 2;
      dividir(ax, ay, abx, aby, cax, cay, n - 1); dividir(abx, aby, bx, by, bcx, bcy, n - 1); dividir(cax, cay, bcx, bcy, cx, cy, n - 1);
    };
    dividir(50, 4, 96, 92, 4, 92, nivel);
    return t;
  }, [nivel]);
  return (
    <svg className={className} viewBox="0 0 100 96" aria-hidden="true" focusable="false">
      {triangulos.map((p, i) => <polygon key={i} points={p} fill="currentColor" />)}
    </svg>
  );
}

type Cabecera = { titulo: string; subtitulo?: string; curso?: keyof typeof CURSOS | string; tema?: string; children?: ReactNode };

/** Cabecera común: logo + «Fractalis» + nombre de la app + curso y tema; a la derecha, los controles de la app */
export function CabeceraFractalis({ titulo, subtitulo, curso = "proyectos", tema, children }: Cabecera) {
  const incrustada = useIncrustada();
  useCurso(curso);
  const c = CURSOS[curso] ?? CURSOS.proyectos;
  const estilo = { "--fx-acento": c.color } as CSSProperties;
  return (
    <header className={`fx-cabecera${incrustada ? " fx-incrustada" : ""}`} style={estilo}>
      <div className="fx-cab-int">
        <a className="fx-marca" href={WEB} target="_top" title="Fractalis — Física y Química en cada escala">
          <LogoFractalis /><span className="fx-nombre-web">Fractalis</span>
        </a>
        <span className="fx-sep" aria-hidden="true" />
        <div className="fx-titulos">
          <h1 className="fx-titulo">{titulo}</h1>
          {subtitulo && <span className="fx-subtitulo">{subtitulo}</span>}
        </div>
        <span className="fx-chip">{[c.nombre, tema].filter(Boolean).join(" · ")}</span>
        {children && <div className="fx-acciones">{children}</div>}
      </div>
    </header>
  );
}

type Intro = { titulo: string; curso?: string; antetitulo?: string; children?: ReactNode; className?: string };

/** Presentación de la pantalla de inicio: título, texto y el fractal del curso de fondo (como las tarjetas de la web) */
export function IntroFractalis({ titulo, curso = "proyectos", antetitulo, children, className = "" }: Intro) {
  const svg = FRACTALES[curso] ?? FRACTALES.proyectos ?? "";
  const c = CURSOS[curso] ?? CURSOS.proyectos;
  return (
    <section className={`fx-intro ${className}`} style={{ "--fx-acento": c.color } as CSSProperties}>
      <span className="fx-intro-fractal" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg.replace('role="img"', "") }} />
      <div className="fx-intro-texto">
        {antetitulo && <p className="fx-intro-ante">{antetitulo}</p>}
        <h2 className="fx-intro-titulo">{titulo}</h2>
        {children && <div className="fx-intro-cuerpo">{children}</div>}
      </div>
    </section>
  );
}

/** Pie común (no se muestra cuando la app está incrustada en Fractalis, porque la página ya lo dice) */
export function PieFractalis({ pagina, curso = "proyectos" }: { pagina?: string; curso?: string }) {
  const incrustada = useIncrustada();
  if (incrustada) return null;
  const c = CURSOS[curso] ?? CURSOS.proyectos;
  return (
    <footer className="fx-pie" style={{ "--fx-acento": c.color } as CSSProperties}>
      <div className="fx-pie-int">
        <span>Una app de <b>Fractalis</b> · Física y Química en cada escala</span>
        <div className="fx-pie-der">
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>
          <a href={`${WEB}contacto/`} target="_top">Contacto</a>
          {pagina && <a href={`${WEB}${pagina}`} target="_top">Ver en Fractalis ↗</a>}
        </div>
      </div>
    </footer>
  );
}
