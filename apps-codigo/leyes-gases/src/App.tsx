/* Leyes de los gases · Fractalis
   Laboratorio virtual: Boyle-Mariotte (T fija), Charles (P fija) y Gay-Lussac (V fija).
   Un mismo recipiente, los mismos instrumentos; en cada ley solo cambia qué magnitud queda fija. */
import { useEffect, useMemo, useState } from 'react';
import { ClipboardPlus, RotateCcw, Trash2 } from 'lucide-react';
import { CabeceraFractalis, IntroFractalis, PieFractalis } from '@fractalis';
import { COLOR, LEYES, LIMITES, NOMBRE, REF, UNIDAD, estado, num, type Estado, type Magnitud, type Modo } from './fisica';
import Recipiente from './Recipiente';
import { Fija, Manometro, Termometro } from './Instrumentos';
import Formula from './Formula';
import Grafica from './Grafica';

const TARJETA = 'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5';
const TITULO = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400';
const MAX_MEDIDAS = 10;

const vacias = (): Record<Modo, Estado[]> => ({ boyle: [], charles: [], gay: [] });

export default function App() {
  const [modo, setModo] = useState<Modo>('boyle');
  const [valor, setValor] = useState<Record<Modo, number>>({ boyle: REF.V, charles: REF.T, gay: REF.T });
  const [medidas, setMedidas] = useState(vacias);
  const [verLey, setVerLey] = useState(false);
  const [aviso, setAviso] = useState('');

  const ley = LEYES.find((l) => l.id === modo)!;
  const e = useMemo(() => estado(modo, valor[modo]), [modo, valor]);
  const lim = LIMITES[ley.control];
  const cambiar = (x: number) => setValor((v) => ({ ...v, [modo]: x }));

  useEffect(() => setAviso(''), [modo]);

  const anotar = () => {
    const lista = medidas[modo];
    if (lista.length >= MAX_MEDIDAS) { setAviso(`La tabla ya tiene ${MAX_MEDIDAS} medidas. Bórrala para empezar otra serie.`); return; }
    if (lista.some((m) => Math.abs(m[ley.control] - e[ley.control]) < 1e-9)) { setAviso(`Esa medida ya está en la tabla: cambia ${ley.control === 'V' ? 'el volumen' : 'la temperatura'} y vuelve a anotar.`); return; }
    setMedidas((m) => ({ ...m, [modo]: [...m[modo], e].sort((a, b) => a[ley.control] - b[ley.control]) }));
    setAviso('');
  };

  const reiniciar = () => {
    setValor({ boyle: REF.V, charles: REF.T, gay: REF.T });
    setMedidas(vacias());
    setVerLey(false);
    setAviso('');
  };

  // columnas de la tabla: lo que mueve el alumno, lo que cambia y la constante
  const cambia: Magnitud = modo === 'boyle' ? 'P' : modo === 'charles' ? 'V' : 'P';
  const columnas: { m: Magnitud | 'k'; titulo: string; dato: (x: Estado) => string }[] = [
    { m: ley.control, titulo: `${ley.control} (${UNIDAD[ley.control]})`, dato: (x) => (ley.control === 'V' ? num(x.V, 1) : String(Math.round(x.T))) },
    { m: cambia, titulo: `${cambia} (${UNIDAD[cambia]})`, dato: (x) => num(x[cambia]) },
    modo === 'boyle'
      ? { m: 'k', titulo: 'P · V (atm·L)', dato: (x) => num(x.P * x.V) }
      : { m: 'k', titulo: `${cambia} / T (${UNIDAD[cambia]}/K)`, dato: (x) => num(x[cambia] / x.T, 4) },
  ];

  return (
    <div className="text-slate-900 dark:text-slate-100">
      <CabeceraFractalis titulo="Leyes de los gases" subtitulo="Boyle-Mariotte, Charles y Gay-Lussac" curso="2eso" tema="Tema 2">
        <button className="fx-boton" onClick={reiniciar} title="Volver al estado inicial y borrar las tablas">
          <RotateCcw /> <span>Reiniciar</span>
        </button>
      </CabeceraFractalis>

      <main className="max-w-6xl mx-auto px-4 py-5 space-y-5">
        <IntroFractalis titulo="¿Cómo se comporta un gas?" curso="2eso">
          <p>
            Un gas está formado por partículas que se mueven sin parar y chocan contra las paredes del recipiente: esos choques son la presión.
            Cambia el volumen o la temperatura, observa el manómetro y anota tus medidas para descubrir las tres leyes de los gases.
          </p>
        </IntroFractalis>

        {/* Elección de ley */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="group" aria-label="Ley de los gases">
          {LEYES.map((l) => {
            const activa = l.id === modo;
            return (
              <button key={l.id} onClick={() => setModo(l.id)} aria-pressed={activa}
                className={`text-left rounded-xl border px-4 py-3 transition-colors cursor-pointer ${activa
                  ? 'border-acento-500 bg-acento-50 dark:bg-acento-950/40 dark:border-acento-500'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-acento-300 dark:hover:border-acento-700'}`}>
                <span className={`block font-bold ${activa ? 'text-acento-800 dark:text-acento-200' : ''}`}>{l.nombre}</span>
                <span className="block text-sm text-slate-600 dark:text-slate-400">{NOMBRE[l.fija]} constante · <span className="font-serif italic">{l.relacion}</span></span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Laboratorio */}
          <section className={`${TARJETA} lg:col-span-7`} aria-labelledby="t-lab">
            <h2 id="t-lab" className={TITULO}>Laboratorio</h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-4 items-center">
              <div>
                <Recipiente modo={modo} V={e.V} T={e.T} onVolumen={modo === 'boyle' ? cambiar : undefined} />
                <p className="mt-1 text-center">
                  <span className="block text-xs text-slate-500 dark:text-slate-400">Volumen</span>
                  <span className={`font-bold tabular-nums ${COLOR.V.texto}`}>{num(e.V, modo === 'boyle' ? 1 : 2)} L</span>{' '}
                  {ley.fija === 'V' && <Fija />}
                </p>
              </div>
              <div className="flex sm:flex-col justify-center gap-4">
                <Manometro P={e.P} fija={ley.fija === 'P'} />
                <Termometro T={e.T} fija={ley.fija === 'T'} />
              </div>
            </div>

            {/* Control */}
            <div className="mt-5 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
              <label htmlFor="control" className="flex items-baseline justify-between gap-2 text-sm font-semibold">
                <span>{ley.control === 'V' ? 'Mueve el émbolo: volumen' : 'Calienta o enfría: temperatura'}</span>
                <span className={`tabular-nums ${COLOR[ley.control].texto}`}>
                  {ley.control === 'V' ? `${num(e.V, 1)} L` : `${Math.round(e.T)} K (${Math.round(e.T - 273)} °C)`}
                </span>
              </label>
              <input id="control" type="range" min={lim.min} max={lim.max} step={lim.paso} value={valor[modo]}
                onChange={(ev) => cambiar(Number(ev.target.value))}
                className="mt-2 w-full accent-acento-600 dark:accent-acento-400 cursor-pointer"
                aria-valuetext={ley.control === 'V' ? `${num(e.V, 1)} litros; presión ${num(e.P)} atmósferas` : `${Math.round(e.T)} kelvin; ${ley.id === 'charles' ? `volumen ${num(e.V)} litros` : `presión ${num(e.P)} atmósferas`}`} />
              {modo === 'boyle' && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">También puedes arrastrar el asa del émbolo.</p>}
            </div>
          </section>

          {/* La ley */}
          <div className="lg:col-span-5 space-y-5">
            <section className={TARJETA} aria-labelledby="t-ley">
              <h2 id="t-ley" className={TITULO}>Ley de {ley.nombre}</h2>
              <Formula modo={modo} e={e} />
              <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{ley.frase}</p>
            </section>
            <section className={TARJETA} aria-labelledby="t-porque">
              <h2 id="t-porque" className={TITULO}>¿Por qué ocurre?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{ley.porque}</p>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{ley.historia}</p>
            </section>
          </div>
        </div>

        {/* Gráfica y tabla */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <section className={TARJETA} aria-labelledby="t-graf">
            <div className="flex items-center justify-between gap-2">
              <h2 id="t-graf" className={TITULO}>Gráfica</h2>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={verLey} onChange={(ev) => setVerLey(ev.target.checked)} className="accent-acento-600 w-4 h-4" />
                Mostrar la ley
              </label>
            </div>
            <div className="mt-2"><Grafica modo={modo} e={e} medidas={medidas[modo]} verLey={verLey} /></div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              El círculo es el estado actual; los rombos, tus medidas.{modo !== 'boyle' && ' La recta apunta a 0 K: por eso la temperatura va en kelvin.'}
            </p>
          </section>

          <section className={TARJETA} aria-labelledby="t-tabla">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 id="t-tabla" className={TITULO}>Tabla de medidas</h2>
              <div className="flex gap-2">
                <button onClick={anotar} className="inline-flex items-center gap-1.5 rounded-lg bg-acento-600 hover:bg-acento-700 text-white text-sm font-semibold px-3 py-1.5 cursor-pointer">
                  <ClipboardPlus className="w-4 h-4" aria-hidden="true" /> Anotar medida
                </button>
                {medidas[modo].length > 0 && (
                  <button onClick={() => setMedidas((m) => ({ ...m, [modo]: [] }))} title="Borrar la tabla"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-semibold px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <Trash2 className="w-4 h-4" aria-hidden="true" /> Borrar
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2 min-h-5 text-sm text-amber-700 dark:text-amber-300" role="status">{aviso}</p>
            <table className="mt-1 w-full text-sm tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-left">
                  {columnas.map((c) => (
                    <th key={c.titulo} scope="col" className={`py-2 pr-2 font-semibold ${c.m === 'k' ? 'text-slate-900 dark:text-white' : COLOR[c.m].texto}`}>{c.titulo}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {medidas[modo].map((x, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                    {columnas.map((c) => <td key={c.titulo} className={`py-1.5 pr-2 ${c.m === 'k' ? 'font-bold bg-acento-50 dark:bg-acento-950/40' : ''}`}>{c.dato(x)}</td>)}
                  </tr>
                ))}
                {medidas[modo].length === 0 && (
                  <tr><td colSpan={3} className="py-4 text-slate-500 dark:text-slate-400">
                    Mueve {ley.control === 'V' ? 'el émbolo' : 'la temperatura'}, pulsa «Anotar medida» y repite varias veces. ¿Qué observas en la última columna?
                  </td></tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      <PieFractalis pagina="proyectos/leyes-gases/" curso="2eso" />
    </div>
  );
}
