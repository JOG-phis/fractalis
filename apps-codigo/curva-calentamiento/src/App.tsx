/* Curva de calentamiento · Fractalis
   Laboratorio virtual: se calienta (o se enfría) una sustancia pura con una potencia constante y se dibuja
   la gráfica temperatura-tiempo mientras se ven sus partículas. En los cambios de estado la temperatura se queda fija. */
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, FastForward } from 'lucide-react';
import { CabeceraFractalis, IntroFractalis, PieFractalis } from '@fractalis';
import {
  EXPLICACION, MISTERIOSAS, NOMBRE_FASE, POTENCIAS, SUSTANCIAS, TABLA,
  estado, num, tiempo, tramos, type Fase,
} from './fisica';
import Recipiente from './Recipiente';
import Grafica, { type Curva, type Punto } from './Grafica';

const TARJETA = 'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5';
const TITULO = 'text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400';
const DURACION = 20; // s reales que dura una experiencia con potencia media

type Proceso = 'calentar' | 'enfriar';

function Grupo<T extends string>({ etiqueta, opciones, valor, onCambio }: {
  etiqueta: string; opciones: { id: T; nombre: string }[]; valor: T; onCambio: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={etiqueta}>
      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{etiqueta}</span>
      <div className="flex flex-wrap gap-1.5">
        {opciones.map((o) => (
          <button key={o.id} aria-pressed={o.id === valor} onClick={() => onCambio(o.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-semibold cursor-pointer transition-colors ${o.id === valor
              ? 'border-acento-500 bg-acento-50 text-acento-800 dark:bg-acento-950/40 dark:text-acento-200'
              : 'border-slate-200 dark:border-slate-700 hover:border-acento-300 dark:hover:border-acento-700'}`}>
            {o.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

const COLOR_FASE: Record<Fase, string> = {
  solido: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-700',
  liquido: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-700',
  gas: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-900/40 dark:text-violet-100 dark:border-violet-700',
  fusion: 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600',
  ebullicion: 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600',
};

const otraMisteriosa = (actual?: string) => {
  const opciones = MISTERIOSAS.filter((m) => m !== actual);
  return opciones[Math.floor(Math.random() * opciones.length)];
};

export default function App() {
  const [eleccion, setEleccion] = useState<'agua' | 'etanol' | 'misteriosa'>('agua');
  const [misteriosa, setMisteriosa] = useState(() => otraMisteriosa());
  const [proceso, setProceso] = useState<Proceso>('calentar');
  const [pot, setPot] = useState(1);
  const [rapido, setRapido] = useState(false);
  const [corriendo, setCorriendo] = useState(false);
  const [mostrarPuntos, setMostrarPuntos] = useState(false);
  const [anteriores, setAnteriores] = useState<Curva[]>([]);
  const [respuesta, setRespuesta] = useState<string | null>(null);

  const s = SUSTANCIAS[eleccion === 'misteriosa' ? misteriosa : eleccion];
  const esMisteriosa = eleccion === 'misteriosa';
  const acertada = esMisteriosa && respuesta === s.id;
  const etot = tramos(s)[4];
  const tMax = etot / POTENCIAS[0].W; // con la potencia baja: así caben todas las curvas

  // estado de la simulación: en refs para el bucle; en React para pintar
  const sim = useRef({ E: 0, t: 0, puntos: [[0, estado(s, 0).T]] as Punto[] });
  const [vista, setVista] = useState(sim.current);

  // experiencia nueva (sustancia y proceso dados), en el mismo clic: sin esperar a un efecto
  const empezarCon = (sid: string, pr: Proceso, borrarAnteriores: boolean) => {
    const sx = SUSTANCIAS[sid];
    const E0 = pr === 'calentar' ? 0 : tramos(sx)[4];
    setCorriendo(false);
    sim.current = { E: E0, t: 0, puntos: [[0, estado(sx, E0).T]] };
    setVista({ ...sim.current });
    if (borrarAnteriores) setAnteriores([]);
  };
  const reiniciar = (borrarAnteriores: boolean) => empezarCon(s.id, proceso, borrarAnteriores);
  const cambiarSustancia = (v: 'agua' | 'etanol' | 'misteriosa', mist = misteriosa) => {
    setEleccion(v); setMisteriosa(mist); setRespuesta(null);
    if (v === 'misteriosa') setMostrarPuntos(false);
    empezarCon(v === 'misteriosa' ? mist : v, proceso, true);
  };
  const cambiarProceso = (p: Proceso) => { setProceso(p); empezarCon(s.id, p, true); };

  const terminada = proceso === 'calentar' ? vista.E >= etot : vista.E <= 0;
  const potRef = useRef(pot); potRef.current = pot;
  const rapidoRef = useRef(rapido); rapidoRef.current = rapido;

  // bucle de la simulación
  useEffect(() => {
    if (!corriendo) return;
    const velocidad = etot / POTENCIAS[1].W / DURACION; // s simulados por s real
    let anterior = performance.now(), id = 0;
    const paso = (ahora: number) => {
      const dt = Math.min(0.05, (ahora - anterior) / 1000) * velocidad * (rapidoRef.current ? 3 : 1);
      anterior = ahora;
      const c = sim.current;
      const P = POTENCIAS[potRef.current].W;
      let E = c.E + (proceso === 'calentar' ? P : -P) * dt;
      let t = c.t + dt;
      const fin = proceso === 'calentar' ? E >= etot : E <= 0;
      if (fin) { // ajusta el último paso al final exacto
        const sobra = proceso === 'calentar' ? (E - etot) / P : -E / P;
        t -= sobra; E = proceso === 'calentar' ? etot : 0;
      }
      const puntos = [...c.puntos, [t, estado(s, E).T] as Punto];
      sim.current = { E, t, puntos };
      setVista(sim.current);
      if (fin) {
        setCorriendo(false);
        setAnteriores((a) => [...a.slice(-2), { puntos, etiqueta: `${POTENCIAS[potRef.current].nombre.toLowerCase()}` }]);
        return;
      }
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [corriendo, proceso, s, etot]);

  const e = estado(s, vista.E);
  const nombre = esMisteriosa && !acertada ? 'Sustancia misteriosa' : s.nombre;
  const accion = proceso === 'calentar' ? 'Calentar' : 'Enfriar';
  const empezada = vista.t > 0;

  const botonPrincipal = () => {
    if (terminada) { reiniciar(false); setCorriendo(true); return; }
    setCorriendo((c) => !c);
  };

  const fracciones = [
    e.fs > 0 && `sólido ${num(e.fs * 100)} %`,
    e.fl > 0 && `líquido ${num(e.fl * 100)} %`,
    e.fg > 0 && `gas ${num(e.fg * 100)} %`,
  ].filter(Boolean).join(' · ');

  return (
    <div className="text-slate-900 dark:text-slate-100">
      <CabeceraFractalis titulo="Curva de calentamiento" subtitulo="Cambios de estado y temperatura" curso="2eso" tema="Tema 2" />

      <main className="max-w-6xl mx-auto px-4 py-5 space-y-5">
        <IntroFractalis titulo="¿Por qué no sube la temperatura del agua mientras hierve?" curso="2eso">
          <p>
            Calienta una sustancia desde sólido hasta gas, o enfríala, y mira a la vez sus partículas y la gráfica de la temperatura.
            Fíjate en los tramos horizontales: ¿qué está pasando ahí? Prueba con distintas potencias y descubre una sustancia misteriosa por sus mesetas.
          </p>
        </IntroFractalis>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Laboratorio */}
          <section className={`${TARJETA} lg:col-span-5`} aria-labelledby="t-lab">
            <div className="flex items-baseline justify-between gap-2">
              <h2 id="t-lab" className={TITULO}>Laboratorio</h2>
              <span className="text-sm font-semibold">{nombre} · 100 g</span>
            </div>
            <div className="mt-3">
              <Recipiente e={e} fusionK={s.fusion + 273} calentando={proceso === 'calentar'} potencia={pot / 2} activo={corriendo}
                nivel={(e.T - s.desde) / (s.hasta - s.desde) * 0.8 + 0.1} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center" aria-live="polite">
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-2">
                <span className="block text-xs text-slate-500 dark:text-slate-400">Temperatura</span>
                <span className="block text-2xl font-bold tabular-nums">{num(e.T, 1)} °C</span>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-2">
                <span className="block text-xs text-slate-500 dark:text-slate-400">Tiempo</span>
                <span className="block text-2xl font-bold tabular-nums">{tiempo(vista.t)}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${COLOR_FASE[e.fase]}`}>{NOMBRE_FASE[e.fase][proceso]}</span>
              {(e.fase === 'fusion' || e.fase === 'ebullicion') && <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">{fracciones}</span>}
            </div>

            {/* Controles */}
            <div className="mt-5 space-y-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
              <Grupo etiqueta="Sustancia" valor={eleccion} onCambio={(v) => cambiarSustancia(v)}
                opciones={[{ id: 'agua', nombre: 'Agua' }, { id: 'etanol', nombre: 'Etanol' }, { id: 'misteriosa', nombre: 'Misteriosa' }]} />
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <Grupo etiqueta="Proceso" valor={proceso} onCambio={cambiarProceso}
                  opciones={[{ id: 'calentar', nombre: 'Calentar' }, { id: 'enfriar', nombre: 'Enfriar' }]} />
                <Grupo etiqueta={proceso === 'calentar' ? 'Potencia del mechero' : 'Potencia del refrigerador'} valor={String(pot)} onCambio={(v) => setPot(Number(v))}
                  opciones={POTENCIAS.map((p, i) => ({ id: String(i), nombre: p.nombre }))} />
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button onClick={botonPrincipal}
                  className="inline-flex items-center gap-2 rounded-lg bg-acento-600 hover:bg-acento-700 text-white font-semibold px-4 py-2 cursor-pointer">
                  {corriendo ? <><Pause className="w-4 h-4" aria-hidden="true" /> Pausa</>
                    : terminada ? <><RotateCcw className="w-4 h-4" aria-hidden="true" /> Repetir</>
                    : <><Play className="w-4 h-4" aria-hidden="true" /> {empezada ? 'Seguir' : accion}</>}
                </button>
                <button onClick={() => setRapido((r) => !r)} aria-pressed={rapido}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold cursor-pointer ${rapido
                    ? 'border-acento-500 bg-acento-50 text-acento-800 dark:bg-acento-950/40 dark:text-acento-200'
                    : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <FastForward className="w-4 h-4" aria-hidden="true" /> Rápido
                </button>
                {empezada && !corriendo && !terminada && (
                  <button onClick={() => reiniciar(false)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <RotateCcw className="w-4 h-4" aria-hidden="true" /> Empezar de nuevo
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Gráfica y explicación */}
          <div className="lg:col-span-7 space-y-5">
            <section className={TARJETA} aria-labelledby="t-graf">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 id="t-graf" className={TITULO}>Gráfica de {proceso === 'calentar' ? 'calentamiento' : 'enfriamiento'}</h2>
                <label className={`flex items-center gap-2 text-sm ${esMisteriosa && !acertada ? 'opacity-50' : 'cursor-pointer'}`}>
                  <input type="checkbox" checked={mostrarPuntos} disabled={esMisteriosa && !acertada}
                    onChange={(ev) => setMostrarPuntos(ev.target.checked)} className="accent-acento-600 w-4 h-4" />
                  Mostrar puntos de fusión y ebullición
                </label>
              </div>
              <div className="mt-2">
                <Grafica s={s} tMax={tMax} actual={vista.puntos} anteriores={anteriores} mostrarPuntos={mostrarPuntos} enfriando={proceso === 'enfriar'} />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {anteriores.length > 0
                  ? 'En gris, las experiencias anteriores con su potencia. ¿Cambia la temperatura de las mesetas al cambiar la potencia? ¿Y su duración?'
                  : 'Cuando termines, cambia la potencia y repite: la curva anterior se queda en gris para comparar.'}
              </p>
            </section>

            <section className={TARJETA} aria-labelledby="t-pasa">
              <h2 id="t-pasa" className={TITULO}>¿Qué está pasando?</h2>
              <p className="mt-2 leading-relaxed text-slate-700 dark:text-slate-300">{EXPLICACION[e.fase][proceso]}</p>
            </section>
          </div>
        </div>

        {esMisteriosa && (
          <section className={TARJETA} aria-labelledby="t-mist">
            <h2 id="t-mist" className={TITULO}>¿Qué sustancia es?</h2>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              Caliéntala hasta el final y lee en la gráfica la temperatura de las dos mesetas. Después búscala en la tabla.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full max-w-xl text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-left">
                    <th scope="col" className="py-2 pr-3">Sustancia</th>
                    <th scope="col" className="py-2 pr-3">Punto de fusión</th>
                    <th scope="col" className="py-2 pr-3">Punto de ebullición</th>
                    <th scope="col" className="py-2"><span className="sr-only">Elegir</span></th>
                  </tr>
                </thead>
                <tbody>
                  {TABLA.map((id) => {
                    const x = SUSTANCIAS[id];
                    const elegida = respuesta === id;
                    return (
                      <tr key={id} className={`border-b border-slate-100 dark:border-slate-800 ${elegida ? (id === s.id ? 'bg-green-50 dark:bg-green-950/40' : 'bg-red-50 dark:bg-red-950/40') : ''}`}>
                        <td className="py-1.5 pr-3 font-semibold">{x.nombre}</td>
                        <td className="py-1.5 pr-3">{num(x.fusion, x.fusion % 1 ? 1 : 0)} °C</td>
                        <td className="py-1.5 pr-3">{num(x.ebullicion)} °C</td>
                        <td className="py-1.5 text-right">
                          <button onClick={() => setRespuesta(id)} disabled={acertada}
                            className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-default disabled:opacity-50">
                            Es esta
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 min-h-6 font-semibold" role="status">
              {respuesta && (acertada
                ? <span className="text-green-700 dark:text-green-300">¡Correcto! Es {s.nombre.toLowerCase()}: funde a {num(s.fusion, s.fusion % 1 ? 1 : 0)} °C y hierve a {num(s.ebullicion)} °C.</span>
                : <span className="text-red-700 dark:text-red-300">No es esa. Fíjate en la temperatura de cada meseta: los puntos de fusión y de ebullición identifican a cada sustancia.</span>)}
            </p>
            {acertada && (
              <button onClick={() => cambiarSustancia('misteriosa', otraMisteriosa(misteriosa))}
                className="mt-1 rounded-lg bg-acento-600 hover:bg-acento-700 text-white font-semibold px-4 py-2 cursor-pointer">
                Otra sustancia misteriosa
              </button>
            )}
          </section>
        )}
      </main>

      <PieFractalis pagina="proyectos/curva-calentamiento/" curso="2eso" />
    </div>
  );
}
