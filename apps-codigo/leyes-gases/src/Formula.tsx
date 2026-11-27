/* La ley escrita con letras que crecen y encogen con cada magnitud, y debajo las cuentas:
   las magnitudes cambian, el resultado no. */
import type { ReactNode } from 'react';
import { COLOR, num, type Estado, type Magnitud, type Modo } from './fisica';

// tamaño de letra según el valor respecto al de referencia (raíz cuadrada: el cambio se ve, pero no desborda)
const tam = (x: number, ref: number) => `${Math.min(4.2, Math.max(1.1, 2.4 * Math.sqrt(x / ref))).toFixed(2)}rem`;

function Letra({ m, x, refv }: { m: Magnitud; x: number; refv: number }) {
  return (
    <span className={`font-serif italic font-bold leading-none ${COLOR[m].texto}`} style={{ fontSize: tam(x, refv), transition: 'font-size 0.15s ease-out' }}>
      {m}
    </span>
  );
}

function Fraccion({ arriba, abajo }: { arriba: ReactNode; abajo: ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center justify-center">
      <span className="px-2 flex items-end justify-center min-h-[4.6rem]">{arriba}</span>
      <span className="w-full border-t-[3px] border-slate-700 dark:border-slate-300" />
      <span className="px-2 flex items-start justify-center min-h-[4.6rem]">{abajo}</span>
    </span>
  );
}

export default function Formula({ modo, e }: { modo: Modo; e: Estado }) {
  const igual = <span className="text-3xl font-semibold text-slate-700 dark:text-slate-200">=</span>;
  const cte = <span className="text-2xl font-semibold text-slate-700 dark:text-slate-200">constante</span>;
  let ley: ReactNode, cuenta: ReactNode;

  if (modo === 'boyle') {
    ley = (
      <div className="flex items-center justify-center gap-3 min-h-[9.6rem]">
        <Letra m="P" x={e.P} refv={1.4} />
        <span className="text-3xl font-bold text-slate-700 dark:text-slate-200">·</span>
        <Letra m="V" x={e.V} refv={1.4} />
        {igual}{cte}
      </div>
    );
    cuenta = <><b className={COLOR.P.texto}>{num(e.P)} atm</b> · <b className={COLOR.V.texto}>{num(e.V, 1)} L</b> = <b>{num(e.P * e.V)} atm·L</b></>;
  } else {
    const m: Magnitud = modo === 'charles' ? 'V' : 'P';
    const x = modo === 'charles' ? e.V : e.P;
    const u = modo === 'charles' ? 'L' : 'atm';
    ley = (
      <div className="flex items-center justify-center gap-3 min-h-[9.6rem]">
        <Fraccion arriba={<Letra m={m} x={x} refv={modo === 'charles' ? 2 : 1} />} abajo={<Letra m="T" x={e.T} refv={300} />} />
        {igual}{cte}
      </div>
    );
    cuenta = <><b className={COLOR[m].texto}>{num(x)} {u}</b> ÷ <b className={COLOR.T.texto}>{Math.round(e.T)} K</b> = <b>{num(x / e.T, 4)} {u}/K</b></>;
  }

  return (
    <div>
      <div aria-hidden="true">{ley}</div>
      <p className="mt-2 text-center text-base tabular-nums text-slate-700 dark:text-slate-200">{cuenta}</p>
    </div>
  );
}
