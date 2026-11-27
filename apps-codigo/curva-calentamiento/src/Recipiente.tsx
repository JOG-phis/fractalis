/* Recipiente cerrado con las partículas de la sustancia (SVG animado).
   Todas las partículas son iguales (es la misma sustancia): lo que cambia es cómo están.
   - Sólido: ordenadas en una red, vibrando más cuanto mayor es la temperatura.
   - Líquido: juntas en el fondo, moviéndose y resbalando unas sobre otras.
   - Gas: separadas, moviéndose deprisa por todo el recipiente.
   En los cambios de estado, las partículas pasan una a una de un estado a otro: primero se van las de arriba de la red,
   y las que se evaporan salen de la superficie del líquido. */
import { useEffect, useRef } from 'react';
import type { Estado } from './fisica';

const X0 = 30, X1 = 230, Y0 = 34, Y1 = 266; // interior del recipiente
const N = 48, R = 6;
const COLS = 8, PASO = 15.5;                // red del sólido
const LIQ_AREA = 15 * 15;                   // superficie que ocupa cada partícula en el líquido

// Posiciones de la red, de abajo arriba
const RED = Array.from({ length: N }, (_, i) => {
  const fila = Math.floor(i / COLS), col = i % COLS;
  const x0 = (X0 + X1) / 2 - ((COLS - 1) * PASO) / 2;
  return { x: x0 + col * PASO, y: Y1 - R - 1 - fila * PASO };
});

interface Props {
  e: Estado;
  fusionK: number; // punto de fusión en kelvin (para la amplitud de vibración)
  calentando: boolean;
  potencia: number; // 0..1
  activo: boolean;
  nivel: number; // altura del termómetro, 0..1
}

export default function Recipiente({ e, fusionK, calentando, potencia, activo, nivel }: Props) {
  const capa = useRef<SVGGElement>(null);
  const datos = useRef({ e, fusionK });
  datos.current = { e, fusionK };

  useEffect(() => {
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenta = reducido ? 0.3 : 1;
    const circulos = Array.from(capa.current!.children) as SVGCircleElement[];
    const p = RED.map((r, i) => {
      const a = Math.random() * Math.PI * 2;
      return { x: r.x, y: r.y, dx: Math.cos(a), dy: Math.sin(a), fase: Math.random() * 6.28, i };
    });
    let anterior = performance.now(), t = 0, id = 0;

    const paso = (ahora: number) => {
      const dt = Math.min(0.05, (ahora - anterior) / 1000);
      anterior = ahora; t += dt;
      const { e: es, fusionK: fk } = datos.current;
      const TK = es.T + 273;
      const nS = Math.round(N * es.fs);
      const nL = Math.round(N * (es.fs + es.fl)) - nS;
      // superficie del líquido: el sólido y el líquido ocupan el fondo
      const alturaCond = (nS * PASO * PASO + nL * LIQ_AREA) / (X1 - X0);
      const superficie = Y1 - Math.max(alturaCond, nL > 0 ? 2 * R + 2 : 0);
      const ocupadas = RED.slice(0, nS);
      const amp = (0.8 + 2.2 * Math.min(1.6, TK / fk)) * lenta;
      const vLiq = 28 * Math.sqrt(TK / 300) * lenta;
      const vGas = 130 * Math.sqrt(TK / 373) * lenta;

      for (let k = 0; k < N; k++) {
        const q = p[k];
        if (k < nS) {
          // sólido: va a su sitio en la red y vibra
          const r = RED[k];
          const tx = r.x + amp * Math.sin(t * 23 + q.fase), ty = r.y + amp * Math.cos(t * 19 + q.fase * 1.3);
          const s = Math.min(1, dt * 5);
          q.x += (tx - q.x) * s; q.y += (ty - q.y) * s;
        } else {
          const liquido = k < nS + nL;
          const v = liquido ? vLiq : vGas;
          // dirección algo aleatoria (más en el líquido: las partículas se empujan unas a otras)
          const giro = (Math.random() - 0.5) * (liquido ? 2.4 : 0.4) * dt * 10;
          const c = Math.cos(giro), sn = Math.sin(giro);
          [q.dx, q.dy] = [q.dx * c - q.dy * sn, q.dx * sn + q.dy * c];
          q.x += q.dx * v * dt; q.y += q.dy * v * dt;
          const techo = liquido ? superficie + R : Y0 + R;
          const suelo = liquido ? Y1 - R : (nL > 0 ? superficie - R : Y1 - R);
          if (q.x < X0 + R) { q.x = X0 + R; q.dx = Math.abs(q.dx); }
          if (q.x > X1 - R) { q.x = X1 - R; q.dx = -Math.abs(q.dx); }
          if (q.y > suelo) {
            // un gas que se condensa cae hasta el líquido; si no, rebota
            if (!liquido || q.y - suelo < 4) { q.y = suelo; q.dy = -Math.abs(q.dy); }
            else q.y -= Math.min(q.y - suelo, 160 * dt);
          }
          if (q.y < techo) {
            if (liquido && techo - q.y > 4) q.y += Math.min(techo - q.y, 160 * dt); // cae al líquido
            else { q.y = techo; q.dy = Math.abs(q.dy); }
          }
          // no atravesar el sólido
          for (const o of ocupadas) {
            const ddx = q.x - o.x, ddy = q.y - o.y, d2 = ddx * ddx + ddy * ddy, min = 2 * R + 1;
            if (d2 < min * min && d2 > 0.01) {
              const d = Math.sqrt(d2);
              q.x = o.x + (ddx / d) * min; q.y = o.y + (ddy / d) * min;
              q.dx = ddx / d; q.dy = ddy / d;
            }
          }
        }
        circulos[k].setAttribute('cx', q.x.toFixed(1));
        circulos[k].setAttribute('cy', q.y.toFixed(1));
      }
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, []);

  // termómetro dentro del recipiente
  const llama = activo && calentando ? 0.5 + potencia * 0.7 : 0;
  return (
    <svg viewBox="0 0 260 330" className="w-full max-w-[17rem] mx-auto block" aria-hidden="true">
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} className="fill-slate-50 dark:fill-slate-950/60" />
      <g ref={capa} className="fill-acento-500 dark:fill-acento-400">
        {RED.map((r, i) => <circle key={i} r={R} cx={r.x} cy={r.y} />)}
      </g>
      {/* paredes y tapa */}
      <rect x={X0 - 2} y={Y0 - 2} width={X1 - X0 + 4} height={Y1 - Y0 + 4} rx="4" className="fill-none stroke-slate-400 dark:stroke-slate-500" strokeWidth="4" />
      <rect x={X0 - 8} y={Y0 - 12} width={X1 - X0 + 16} height="9" rx="3" className="fill-slate-400 dark:fill-slate-500" />
      {/* termómetro */}
      <g>
        <rect x="205" y="6" width="10" height="236" rx="5" className="fill-white dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" opacity="0.92" />
        <rect x="207.5" y={240 - 222 * Math.min(1, Math.max(0, nivel))} width="5" height={222 * Math.min(1, Math.max(0, nivel)) + 4} className="fill-red-500" style={{ transition: 'all 0.2s linear' }} />
        <circle cx="210" cy="246" r="8" className="fill-red-500" />
      </g>
      {/* fuente de calor o de frío */}
      {calentando ? (
        <g>
        <rect x={(X0 + X1) / 2 - 22} y={Y1 + 40} width="44" height="9" rx="3" className="fill-slate-400 dark:fill-slate-600" />
        <g transform={`translate(${(X0 + X1) / 2} ${Y1 + 40})`} opacity={llama ? 1 : 0.25}>
          <path className={`fill-amber-400 ${llama ? 'fx-llama' : ''}`} style={{ transform: `scale(${Math.max(0.5, llama)})`, transformOrigin: '0 0' }}
            d="M0 0 C-14 -6 -12 -18 -4 -28 C-4 -20 2 -18 2 -24 C10 -16 14 -6 0 0 Z" />
          <path className="fill-red-500" style={{ transform: `scale(${Math.max(0.5, llama) * 0.55})`, transformOrigin: '0 0' }}
            d="M0 0 C-14 -6 -12 -18 -4 -28 C-4 -20 2 -18 2 -24 C10 -16 14 -6 0 0 Z" />
        </g>
        </g>
      ) : (
        <g opacity={activo ? 1 : 0.35}>
          <rect x={X0 + 10} y={Y1 + 8} width={X1 - X0 - 20} height="12" rx="3" className="fill-sky-400" opacity={0.4 + potencia * 0.6} />
          <text x={(X0 + X1) / 2} y={Y1 + 31} textAnchor="middle" fontSize="10" className="fill-sky-700 dark:fill-sky-300">refrigerando</text>
        </g>
      )}
    </svg>
  );
}
