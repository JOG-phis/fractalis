/* Manómetro (presión) y termómetro (temperatura) */
import { Lock } from 'lucide-react';
import { num } from './fisica';

const P_MAX = 4.5;

function Fija() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
      <Lock className="w-3 h-3" aria-hidden="true" /> fija
    </span>
  );
}

export function Manometro({ P, fija }: { P: number; fija: boolean }) {
  // esfera de 240°: 0 atm abajo a la izquierda, 4,5 atm abajo a la derecha
  const ang = (x: number) => ((150 + (240 * Math.min(x, P_MAX)) / P_MAX) * Math.PI) / 180;
  const pto = (x: number, r: number) => [70 + r * Math.cos(ang(x)), 70 + r * Math.sin(ang(x))];
  const [ax, ay] = pto(P, 46);
  const marcas = Array.from({ length: 10 }, (_, i) => i * 0.5);
  return (
    <figure className="flex flex-col items-center gap-1 m-0">
      <svg viewBox="0 0 140 122" className="w-36" aria-hidden="true">
        <circle cx="70" cy="70" r="58" className="fill-white dark:fill-slate-950 stroke-slate-400 dark:stroke-slate-500" strokeWidth="3" />
        {marcas.map((m) => {
          const [x1, y1] = pto(m, 52), [x2, y2] = pto(m, Number.isInteger(m) ? 43 : 47);
          return <line key={m} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth={Number.isInteger(m) ? 2 : 1} />;
        })}
        {[0, 1, 2, 3, 4].map((m) => {
          const [x, y] = pto(m, 34);
          return <text key={m} x={x} y={y + 3.5} textAnchor="middle" fontSize="10" className="fill-slate-600 dark:fill-slate-300">{m}</text>;
        })}
        <text x="70" y="98" textAnchor="middle" fontSize="9" className="fill-slate-500 dark:fill-slate-400">atm</text>
        <line x1="70" y1="70" x2={ax} y2={ay} className="stroke-violet-600 dark:stroke-violet-400" strokeWidth="3" strokeLinecap="round" style={{ transition: 'all 0.25s ease-out' }} />
        <circle cx="70" cy="70" r="5" className="fill-slate-600 dark:fill-slate-300" />
      </svg>
      <figcaption className="text-center">
        <span className="block text-xs text-slate-500 dark:text-slate-400">Manómetro</span>
        <span className="block font-bold tabular-nums text-violet-700 dark:text-violet-300">{num(P)} atm</span>
        {fija && <Fija />}
      </figcaption>
    </figure>
  );
}

export function Termometro({ T, fija }: { T: number; fija: boolean }) {
  const T_MAX = 650;
  const alto = 120, base = 132;
  const nivel = base - (alto * T) / T_MAX;
  return (
    <figure className="flex flex-col items-center gap-1 m-0">
      <svg viewBox="0 0 70 160" className="h-36" aria-hidden="true">
        <rect x="27" y="8" width="16" height="132" rx="8" className="fill-white dark:fill-slate-950 stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" />
        <circle cx="35" cy="144" r="12" className="fill-amber-500 stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" />
        <rect x="31" y={nivel} width="8" height={base - nivel + 6} className="fill-amber-500" style={{ transition: 'all 0.25s ease-out' }} />
        {[100, 200, 300, 400, 500, 600].map((t) => {
          const y = base - (alto * t) / T_MAX;
          return (
            <g key={t}>
              <line x1="43" x2="49" y1={y} y2={y} className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.2" />
              <text x="51" y={y + 3} fontSize="8" className="fill-slate-500 dark:fill-slate-400">{t}</text>
            </g>
          );
        })}
        <text x="22" y="14" textAnchor="end" fontSize="8" className="fill-slate-500 dark:fill-slate-400">K</text>
      </svg>
      <figcaption className="text-center">
        <span className="block text-xs text-slate-500 dark:text-slate-400">Termómetro</span>
        <span className="block font-bold tabular-nums text-amber-700 dark:text-amber-300">{Math.round(T)} K</span>
        <span className="block text-xs tabular-nums text-slate-500 dark:text-slate-400">{Math.round(T - 273)} °C</span>
        {fija && <Fija />}
      </figcaption>
    </figure>
  );
}

export { Fija };
