/* Gráfica en directo: el punto actual se mueve sobre la curva; las medidas anotadas quedan marcadas.
   Boyle: P frente a V (hipérbola). Charles: V frente a T. Gay-Lussac: P frente a T (rectas que pasan por 0 K). */
import { K, REF, num, type Estado, type Magnitud, type Modo } from './fisica';

const W = 340, H = 250, ML = 44, MR = 14, MT = 14, MB = 40;
const ANCHO = W - ML - MR, ALTO = H - MT - MB;

interface Ejes { x: Magnitud; y: Magnitud; xMax: number; yMax: number; xPaso: number; yPaso: number }
const EJES: Record<Modo, Ejes> = {
  boyle: { x: 'V', y: 'P', xMax: 4.5, yMax: 4.5, xPaso: 1, yPaso: 1 },
  charles: { x: 'T', y: 'V', xMax: 650, yMax: 4.5, xPaso: 100, yPaso: 1 },
  gay: { x: 'T', y: 'P', xMax: 650, yMax: 2.5, xPaso: 100, yPaso: 0.5 },
};
const ETIQUETA: Record<Magnitud, string> = { P: 'P (atm)', V: 'V (L)', T: 'T (K)' };

export default function Grafica({ modo, e, medidas, verLey }: { modo: Modo; e: Estado; medidas: Estado[]; verLey: boolean }) {
  const ej = EJES[modo];
  const sx = (x: number) => ML + (x / ej.xMax) * ANCHO;
  const sy = (y: number) => MT + ALTO - (y / ej.yMax) * ALTO;
  const marcasX = Array.from({ length: Math.floor(ej.xMax / ej.xPaso) + 1 }, (_, i) => i * ej.xPaso);
  const marcasY = Array.from({ length: Math.floor(ej.yMax / ej.yPaso + 1e-9) + 1 }, (_, i) => i * ej.yPaso);

  // la ley: hipérbola o recta por el origen
  let ley = '', extrapolacion = '';
  if (modo === 'boyle') {
    const pts: string[] = [];
    for (let v = (K * REF.T) / ej.yMax; v <= ej.xMax + 1e-9; v += 0.02) pts.push(`${sx(v).toFixed(1)},${sy((K * REF.T) / v).toFixed(1)}`);
    ley = 'M' + pts.join(' L');
  } else {
    const f = (t: number) => (modo === 'charles' ? (K * t) / REF.P : (K * t) / REF.V);
    ley = `M${sx(150)},${sy(f(150))} L${sx(600)},${sy(f(600))}`;
    extrapolacion = `M${sx(0)},${sy(0)} L${sx(150)},${sy(f(150))}`;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img"
      aria-label={`Gráfica de ${ETIQUETA[ej.y]} frente a ${ETIQUETA[ej.x]}, con ${medidas.length} medidas anotadas`}>
      {/* rejilla y ejes */}
      <g className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1">
        {marcasX.map((m) => <line key={'x' + m} x1={sx(m)} x2={sx(m)} y1={MT} y2={MT + ALTO} />)}
        {marcasY.map((m) => <line key={'y' + m} x1={ML} x2={ML + ANCHO} y1={sy(m)} y2={sy(m)} />)}
      </g>
      <g className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="1.5">
        <line x1={ML} x2={ML + ANCHO} y1={MT + ALTO} y2={MT + ALTO} />
        <line x1={ML} x2={ML} y1={MT} y2={MT + ALTO} />
      </g>
      <g fontSize="10" className="fill-slate-500 dark:fill-slate-400">
        {marcasX.map((m) => <text key={'tx' + m} x={sx(m)} y={MT + ALTO + 14} textAnchor="middle">{ej.xPaso < 1 ? num(m, 1) : m}</text>)}
        {marcasY.map((m) => <text key={'ty' + m} x={ML - 6} y={sy(m) + 3.5} textAnchor="end">{ej.yPaso < 1 ? num(m, 1) : m}</text>)}
        <text x={ML + ANCHO / 2} y={H - 6} textAnchor="middle" fontWeight="600">{ETIQUETA[ej.x]}</text>
        <text x={12} y={MT + ALTO / 2} textAnchor="middle" fontWeight="600" transform={`rotate(-90 12 ${MT + ALTO / 2})`}>{ETIQUETA[ej.y]}</text>
      </g>

      {verLey && (
        <g className="fill-none stroke-acento-500 dark:stroke-acento-400" strokeWidth="2">
          <path d={ley} />
          {extrapolacion && <path d={extrapolacion} strokeDasharray="4 4" />}
          {extrapolacion && (
            <g stroke="none" className="fill-acento-700 dark:fill-acento-300" fontSize="10">
              <circle cx={sx(0)} cy={sy(0)} r="3" />
              <text x={ML + 8} y={MT + 14}>Prolongada, la recta llega a</text>
              <text x={ML + 8} y={MT + 27} fontWeight="700">0 K = −273 °C</text>
            </g>
          )}
        </g>
      )}

      {/* medidas anotadas */}
      <g className="fill-slate-700 dark:fill-slate-200">
        {medidas.map((m, i) => <rect key={i} x={sx(m[ej.x]) - 3.5} y={sy(m[ej.y]) - 3.5} width="7" height="7" transform={`rotate(45 ${sx(m[ej.x])} ${sy(m[ej.y])})`} />)}
      </g>
      {/* estado actual */}
      <circle cx={sx(e[ej.x])} cy={sy(e[ej.y])} r="6" className="fill-acento-500 dark:fill-acento-400 stroke-white dark:stroke-slate-900" strokeWidth="2" />
    </svg>
  );
}
