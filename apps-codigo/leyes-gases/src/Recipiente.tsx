/* Recipiente con émbolo y partículas del gas (SVG animado).
   - Boyle: el émbolo se arrastra (también con el control deslizante).
   - Charles: el émbolo lleva una pesa y sube o baja solo al cambiar la temperatura.
   - Gay-Lussac: el émbolo está bloqueado con dos topes.
   Las partículas se mueven más deprisa cuanto mayor es la temperatura; cada choque contra el émbolo
   o las paredes deja un destello breve: con más choques por segundo, más presión. */
import { useEffect, useRef, type PointerEvent } from 'react';
import { LIMITES, type Modo } from './fisica';

const X0 = 34, X1 = 226;        // paredes interiores
const FONDO = 330;              // fondo del recipiente
const PX_POR_L = 66;            // altura de 1 L
const N = 36, R = 4.5;          // partículas
const DESTELLOS = 14;
const ALTO_EMBOLO = 14;

const yEmbolo = (V: number) => FONDO - V * PX_POR_L;

interface Props {
  modo: Modo;
  V: number;
  T: number;
  onVolumen?: (V: number) => void; // solo en Boyle
}

export default function Recipiente({ modo, V, T, onVolumen }: Props) {
  const svg = useRef<SVGSVGElement>(null);
  const capaParticulas = useRef<SVGGElement>(null);
  const capaDestellos = useRef<SVGGElement>(null);
  const grupoEmbolo = useRef<SVGGElement>(null);
  const objetivo = useRef({ V, T });
  objetivo.current = { V, T };
  const arrastrando = useRef(false);

  // Animación: posiciones en refs, sin re-pintar React en cada fotograma
  useEffect(() => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const yIni = yEmbolo(objetivo.current.V);
    const p = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2;
      return { x: X0 + R + Math.random() * (X1 - X0 - 2 * R), y: yIni + R + Math.random() * (FONDO - yIni - 2 * R), dx: Math.cos(a), dy: Math.sin(a) };
    });
    const circulos = Array.from(capaParticulas.current!.children) as SVGCircleElement[];
    const destellos = Array.from(capaDestellos.current!.children) as SVGCircleElement[];
    const vidaDestello = new Array(DESTELLOS).fill(0);
    let siguiente = 0;
    let vVis = objetivo.current.V; // volumen dibujado: se acerca suavemente al real
    let anterior = performance.now();
    let id = 0;

    const destello = (x: number, y: number) => {
      const d = destellos[siguiente];
      d.setAttribute('cx', x.toFixed(1)); d.setAttribute('cy', y.toFixed(1));
      vidaDestello[siguiente] = 1;
      siguiente = (siguiente + 1) % DESTELLOS;
    };

    const paso = (ahora: number) => {
      const dt = Math.min(0.05, (ahora - anterior) / 1000);
      anterior = ahora;
      const { V: vObj, T: tObj } = objetivo.current;
      // al arrastrar, el émbolo sigue al dedo; si no, se mueve con suavidad (sube y baja solo en Charles)
      vVis += (vObj - vVis) * (arrastrando.current ? 1 : Math.min(1, dt * 6));
      const tope = yEmbolo(vVis);
      grupoEmbolo.current?.setAttribute('transform', `translate(0 ${tope.toFixed(1)})`);

      const rapidez = 75 * Math.sqrt(tObj / 300) * (reducido ? 0.3 : 1); // px/s
      for (let i = 0; i < N; i++) {
        const q = p[i];
        q.x += q.dx * rapidez * dt;
        q.y += q.dy * rapidez * dt;
        if (q.x < X0 + R) { q.x = X0 + R; q.dx = Math.abs(q.dx); destello(X0, q.y); }
        if (q.x > X1 - R) { q.x = X1 - R; q.dx = -Math.abs(q.dx); destello(X1, q.y); }
        if (q.y > FONDO - R) { q.y = FONDO - R; q.dy = -Math.abs(q.dy); destello(q.x, FONDO); }
        if (q.y < tope + R) { q.y = tope + R; q.dy = Math.abs(q.dy); destello(q.x, tope); }
        circulos[i].setAttribute('cx', q.x.toFixed(1));
        circulos[i].setAttribute('cy', q.y.toFixed(1));
      }
      for (let i = 0; i < DESTELLOS; i++) {
        if (vidaDestello[i] > 0) {
          vidaDestello[i] = Math.max(0, vidaDestello[i] - dt * 4);
          destellos[i].setAttribute('opacity', (vidaDestello[i] * 0.9).toFixed(2));
          destellos[i].setAttribute('r', (3 + (1 - vidaDestello[i]) * 5).toFixed(1));
        }
      }
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, []);

  // Arrastrar el émbolo (Boyle)
  const volumenDesdePuntero = (e: PointerEvent) => {
    const s = svg.current!;
    const pt = s.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const y = pt.matrixTransform(s.getScreenCTM()!.inverse()).y;
    const { min, max, paso } = LIMITES.V;
    const v = Math.round(Math.min(max, Math.max(min, (FONDO - y) / PX_POR_L)) / paso) * paso;
    onVolumen?.(Number(v.toFixed(1)));
  };
  const arrastrable = modo === 'boyle' && !!onVolumen;

  // Placa: azul al enfriar, roja al calentar (por debajo o por encima de 300 K)
  const calor = (T - 300) / 300;

  return (
    <svg ref={svg} viewBox="0 0 260 372" className="w-full max-w-[17rem] mx-auto block touch-none select-none" aria-hidden="true">
      {/* escala de volumen (probeta graduada) */}
      <g className="fill-slate-500 dark:fill-slate-400 stroke-slate-400 dark:stroke-slate-500" fontSize="10">
        {[1, 2, 3, 4].map((l) => (
          <g key={l}>
            <line x1={X0} x2={X0 + 10} y1={yEmbolo(l)} y2={yEmbolo(l)} strokeWidth="1.2" />
            <text x={X0 - 6} y={yEmbolo(l) + 3.5} textAnchor="end" stroke="none">{l} L</text>
          </g>
        ))}
        {[0.5, 1.5, 2.5, 3.5].map((l) => <line key={l} x1={X0} x2={X0 + 5} y1={yEmbolo(l)} y2={yEmbolo(l)} strokeWidth="1" />)}
      </g>

      {/* partículas y destellos de los choques */}
      <g ref={capaParticulas} className="fill-acento-500 dark:fill-acento-400">
        {Array.from({ length: N }, (_, i) => <circle key={i} r={R} cx={-20} cy={-20} />)}
      </g>
      <g ref={capaDestellos} className="fill-none stroke-acento-600 dark:stroke-acento-300" strokeWidth="1.5">
        {Array.from({ length: DESTELLOS }, (_, i) => <circle key={i} r={3} cx={-20} cy={-20} opacity={0} />)}
      </g>

      {/* paredes */}
      <path d={`M${X0} 22 V${FONDO} H${X1} V22`} className="fill-none stroke-slate-400 dark:stroke-slate-500" strokeWidth="4" strokeLinejoin="round" />

      {/* émbolo (se mueve con transform desde la animación) */}
      <g ref={grupoEmbolo} transform={`translate(0 ${yEmbolo(V)})`}>
        <rect x="140" y={-ALTO_EMBOLO - 400} width="12" height="400" rx="2" className="fill-slate-300 dark:fill-slate-600" />
        <rect x={X0 + 2} y={-ALTO_EMBOLO} width={X1 - X0 - 4} height={ALTO_EMBOLO} rx="3" className="fill-slate-500 dark:fill-slate-400" />
        {modo === 'boyle' && (
          <g className={arrastrable ? 'cursor-grab active:cursor-grabbing' : ''}
            onPointerDown={(e) => { if (!arrastrable) return; arrastrando.current = true; (e.target as Element).setPointerCapture(e.pointerId); volumenDesdePuntero(e); }}
            onPointerMove={(e) => { if (arrastrando.current) volumenDesdePuntero(e); }}
            onPointerUp={() => { arrastrando.current = false; }}
            onPointerCancel={() => { arrastrando.current = false; }}>
            {/* zona de agarre amplia (también para el dedo) */}
            <rect x={X0} y={-ALTO_EMBOLO - 34} width={X1 - X0} height={ALTO_EMBOLO + 40} fill="transparent" />
            <rect x="118" y={-ALTO_EMBOLO - 26} width="56" height="16" rx="8" className="fill-acento-600 dark:fill-acento-500" />
            <path d={`M138 ${-ALTO_EMBOLO - 21} l8 -0 M138 ${-ALTO_EMBOLO - 15} l8 0`} className="stroke-white" strokeWidth="1.6" strokeLinecap="round" />
            <path d={`M152 ${-ALTO_EMBOLO - 18} l3 -3 l3 3 M152 ${-ALTO_EMBOLO - 18} l3 3 l3 -3`} className="fill-none stroke-white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
        {modo === 'charles' && (
          <g>
            <rect x="96" y={-ALTO_EMBOLO - 34} width="100" height="34" rx="4" className="fill-slate-700 dark:fill-slate-300" />
            <text x="146" y={-ALTO_EMBOLO - 13} textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white dark:fill-slate-900">pesa</text>
          </g>
        )}
      </g>

      {/* Gay-Lussac: topes que bloquean el émbolo */}
      {modo === 'gay' && (
        <g className="fill-red-600 dark:fill-red-400">
          <rect x={X0 - 6} y={yEmbolo(2) - ALTO_EMBOLO - 9} width="22" height="8" rx="2" />
          <rect x={X1 - 16} y={yEmbolo(2) - ALTO_EMBOLO - 9} width="22" height="8" rx="2" />
          <rect x={X0 - 6} y={yEmbolo(2) + 1} width="22" height="8" rx="2" />
          <rect x={X1 - 16} y={yEmbolo(2) + 1} width="22" height="8" rx="2" />
        </g>
      )}

      {/* placa: calienta o enfría */}
      <rect x={X0 - 4} y={FONDO + 10} width={X1 - X0 + 8} height="12" rx="3" className="fill-slate-300 dark:fill-slate-700" />
      {modo !== 'boyle' && Math.abs(calor) > 0.01 && (
        <rect x={X0 - 4} y={FONDO + 10} width={X1 - X0 + 8} height="12" rx="3"
          className={calor > 0 ? 'fill-red-500' : 'fill-sky-400'} opacity={Math.min(1, Math.abs(calor) * 1.4)} />
      )}
      {modo === 'boyle' && <text x={(X0 + X1) / 2} y={FONDO + 36} textAnchor="middle" fontSize="10" className="fill-slate-500 dark:fill-slate-400">temperatura constante</text>}
      {modo !== 'boyle' && <text x={(X0 + X1) / 2} y={FONDO + 36} textAnchor="middle" fontSize="10" className="fill-slate-500 dark:fill-slate-400">placa térmica a {Math.round(T)} K</text>}
    </svg>
  );
}
