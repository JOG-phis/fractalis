/* Gráfica temperatura-tiempo que se dibuja en directo. Las curvas de experiencias anteriores quedan en gris para comparar. */
import { num, type Sustancia } from './fisica';

const W = 460, H = 310, ML = 50, MR = 14, MT = 16, MB = 46;
const ANCHO = W - ML - MR, ALTO = H - MT - MB;

export type Punto = [number, number]; // [tiempo en s, temperatura en °C]
export interface Curva { puntos: Punto[]; etiqueta: string }

function pasoBonito(rango: number, marcas = 7, factores = [1, 2, 2.5, 5, 10]) {
  const bruto = rango / marcas;
  const pot = 10 ** Math.floor(Math.log10(bruto));
  return factores.map((f) => f * pot).find((p) => p >= bruto) ?? bruto;
}

interface Props {
  s: Sustancia;
  tMax: number; // s
  actual: Punto[];
  anteriores: Curva[];
  mostrarPuntos: boolean; // líneas de fusión y ebullición con sus nombres
  enfriando: boolean;
}

export default function Grafica({ s, tMax, actual, anteriores, mostrarPuntos, enfriando }: Props) {
  const minutos = tMax / 60;
  const pasoT = pasoBonito(s.hasta - s.desde);
  const tMin = Math.floor(s.desde / pasoT) * pasoT, tTop = Math.ceil(s.hasta / pasoT) * pasoT;
  const pasoX = pasoBonito(minutos, 8, [1, 2, 5, 10]);
  const xMax = Math.ceil(minutos / pasoX) * pasoX;
  const sx = (seg: number) => ML + (seg / 60 / xMax) * ANCHO;
  const sy = (T: number) => MT + ALTO - ((T - tMin) / (tTop - tMin)) * ALTO;
  const marcasX = Array.from({ length: Math.round(xMax / pasoX) + 1 }, (_, i) => i * pasoX);
  const marcasY = Array.from({ length: Math.round((tTop - tMin) / pasoT) + 1 }, (_, i) => tMin + i * pasoT);
  const camino = (pts: Punto[]) => (pts.length ? 'M' + pts.map(([t, T]) => `${sx(t).toFixed(1)},${sy(T).toFixed(1)}`).join(' L') : '');
  const ultimo = actual[actual.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label={`Gráfica de la temperatura frente al tiempo${ultimo ? `; ahora, ${num(ultimo[1])} grados a los ${num(ultimo[0] / 60, 1)} minutos` : ''}`}>
      <g className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1">
        {marcasX.map((m) => <line key={'x' + m} x1={sx(m * 60)} x2={sx(m * 60)} y1={MT} y2={MT + ALTO} />)}
        {marcasY.map((m) => <line key={'y' + m} x1={ML} x2={ML + ANCHO} y1={sy(m)} y2={sy(m)} />)}
      </g>
      {tMin < 0 && <line x1={ML} x2={ML + ANCHO} y1={sy(0)} y2={sy(0)} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />}
      <g className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5">
        <line x1={ML} x2={ML + ANCHO} y1={MT + ALTO} y2={MT + ALTO} />
        <line x1={ML} x2={ML} y1={MT} y2={MT + ALTO} />
      </g>
      <g fontSize="12" className="fill-slate-500 dark:fill-slate-400">
        {marcasX.map((m) => <text key={'tx' + m} x={sx(m * 60)} y={MT + ALTO + 16} textAnchor="middle">{num(m, pasoX < 1 ? 1 : 0)}</text>)}
        {marcasY.map((m) => <text key={'ty' + m} x={ML - 7} y={sy(m) + 4} textAnchor="end">{num(m)}</text>)}
        <text x={ML + ANCHO / 2} y={H - 6} textAnchor="middle" fontWeight="600">tiempo (min)</text>
        <text x={14} y={MT + ALTO / 2} textAnchor="middle" fontWeight="600" transform={`rotate(-90 14 ${MT + ALTO / 2})`}>temperatura (°C)</text>
      </g>

      {mostrarPuntos && (
        <g fontSize="11" fontWeight="600">
          {[
            { T: s.fusion, txt: `punto de fusión: ${num(s.fusion, s.fusion % 1 ? 1 : 0)} °C` },
            { T: s.ebullicion, txt: `punto de ebullición: ${num(s.ebullicion)} °C` },
          ].map(({ T, txt }) => (
            <g key={txt}>
              <line x1={ML} x2={ML + ANCHO} y1={sy(T)} y2={sy(T)} strokeDasharray="5 4" strokeWidth="1.5" className="stroke-acento-500 dark:stroke-acento-400" />
              <text x={ML + ANCHO - 4} y={sy(T) - 6} textAnchor="end" className="fill-acento-700 dark:fill-acento-300">{txt}</text>
            </g>
          ))}
        </g>
      )}

      {/* experiencias anteriores */}
      <g className="fill-none stroke-slate-400 dark:stroke-slate-500" strokeWidth="2" opacity="0.55">
        {anteriores.map((c, i) => <path key={i} d={camino(c.puntos)} />)}
      </g>
      <g fontSize="10" className="fill-slate-500 dark:fill-slate-400">
        {anteriores.map((c, i) => {
          const [t, T] = c.puntos[c.puntos.length - 1];
          return <text key={i} x={Math.min(sx(t) + 4, W - MR - 40)} y={sy(T) + (enfriando ? 12 : -6)}>{c.etiqueta}</text>;
        })}
      </g>
      {/* experiencia actual */}
      <path d={camino(actual)} className="fill-none stroke-slate-800 dark:stroke-slate-100" strokeWidth="2.6" strokeLinejoin="round" />
      {ultimo && <circle cx={sx(ultimo[0])} cy={sy(ultimo[1])} r="6" className="fill-acento-500 dark:fill-acento-400 stroke-white dark:stroke-slate-900" strokeWidth="2" />}
    </svg>
  );
}
