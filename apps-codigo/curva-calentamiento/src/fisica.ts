/* Modelo: 100 g de una sustancia pura en un recipiente cerrado, calentada (o enfriada) con una potencia constante.
   La energía comunicada se reparte por tramos:
     sólido que se calienta (m·c·ΔT) → fusión (m·Lf) → líquido que se calienta → ebullición (m·Lv) → gas que se calienta.
   Con calores específicos y latentes aproximados reales: así las mesetas salen con su longitud real
   (en el agua, la de ebullición es casi 7 veces la de fusión). */

export interface Sustancia {
  id: string;
  nombre: string;
  fusion: number;     // °C
  ebullicion: number; // °C
  cs: number; cl: number; cg: number; // calores específicos, J/(g·°C)
  Lf: number; Lv: number;             // calores latentes, J/g
  desde: number; hasta: number;       // temperaturas inicial y final del experimento, °C
}

export const MASA = 100; // g

export const SUSTANCIAS: Record<string, Sustancia> = {
  agua: { id: 'agua', nombre: 'Agua', fusion: 0, ebullicion: 100, cs: 2.1, cl: 4.18, cg: 2.0, Lf: 334, Lv: 2257, desde: -20, hasta: 120 },
  etanol: { id: 'etanol', nombre: 'Etanol (alcohol)', fusion: -114, ebullicion: 78, cs: 1.1, cl: 2.44, cg: 1.4, Lf: 108, Lv: 841, desde: -130, hasta: 100 },
  acetico: { id: 'acetico', nombre: 'Ácido acético', fusion: 17, ebullicion: 118, cs: 1.5, cl: 2.05, cg: 1.1, Lf: 192, Lv: 390, desde: -10, hasta: 140 },
  benceno: { id: 'benceno', nombre: 'Benceno', fusion: 5.5, ebullicion: 80, cs: 1.5, cl: 1.74, cg: 1.05, Lf: 127, Lv: 394, desde: -20, hasta: 100 },
  naftaleno: { id: 'naftaleno', nombre: 'Naftaleno', fusion: 80, ebullicion: 218, cs: 1.3, cl: 1.7, cg: 1.3, Lf: 147, Lv: 337, desde: 50, hasta: 240 },
  mercurio: { id: 'mercurio', nombre: 'Mercurio', fusion: -39, ebullicion: 357, cs: 0.14, cl: 0.14, cg: 0.1, Lf: 11.4, Lv: 295, desde: -60, hasta: 380 },
};

/** Tabla para identificar la sustancia misteriosa */
export const TABLA = ['agua', 'etanol', 'acetico', 'benceno', 'naftaleno', 'mercurio'];
/** Las que pueden salir como misteriosas */
export const MISTERIOSAS = ['acetico', 'benceno', 'naftaleno'];

export const POTENCIAS = [
  { id: 'baja', nombre: 'Baja', W: 300 },
  { id: 'media', nombre: 'Media', W: 600 },
  { id: 'alta', nombre: 'Alta', W: 900 },
] as const;

export type Fase = 'solido' | 'fusion' | 'liquido' | 'ebullicion' | 'gas';

export interface Estado {
  T: number;      // °C
  fs: number;     // fracción de sólido
  fl: number;     // fracción de líquido
  fg: number;     // fracción de gas
  fase: Fase;
}

/** Límites de energía de cada tramo (J, desde el sólido a la temperatura inicial) */
export function tramos(s: Sustancia) {
  const e1 = MASA * s.cs * (s.fusion - s.desde);
  const e2 = e1 + MASA * s.Lf;
  const e3 = e2 + MASA * s.cl * (s.ebullicion - s.fusion);
  const e4 = e3 + MASA * s.Lv;
  const e5 = e4 + MASA * s.cg * (s.hasta - s.ebullicion);
  return [e1, e2, e3, e4, e5];
}

/** Estado de la sustancia según la energía comunicada E (J) */
export function estado(s: Sustancia, E: number): Estado {
  const [e1, e2, e3, e4, e5] = tramos(s);
  const x = Math.min(Math.max(E, 0), e5);
  if (x < e1) return { T: s.desde + x / (MASA * s.cs), fs: 1, fl: 0, fg: 0, fase: 'solido' };
  if (x < e2) { const f = (x - e1) / (e2 - e1); return { T: s.fusion, fs: 1 - f, fl: f, fg: 0, fase: 'fusion' }; }
  if (x < e3) return { T: s.fusion + (x - e2) / (MASA * s.cl), fs: 0, fl: 1, fg: 0, fase: 'liquido' };
  if (x < e4) { const f = (x - e3) / (e4 - e3); return { T: s.ebullicion, fs: 0, fl: 1 - f, fg: f, fase: 'ebullicion' }; }
  return { T: s.ebullicion + (x - e4) / (MASA * s.cg), fs: 0, fl: 0, fg: 1, fase: 'gas' };
}

/** Número en formato español */
export const num = (x: number, d = 0) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });

/** Tiempo en «m min s s» */
export function tiempo(seg: number) {
  const m = Math.floor(seg / 60), s = Math.floor(seg % 60);
  return m > 0 ? `${m} min ${String(s).padStart(2, '0')} s` : `${s} s`;
}

export const NOMBRE_FASE: Record<Fase, { calentar: string; enfriar: string }> = {
  solido: { calentar: 'Sólido', enfriar: 'Sólido' },
  fusion: { calentar: 'Fusión: sólido + líquido', enfriar: 'Solidificación: líquido + sólido' },
  liquido: { calentar: 'Líquido', enfriar: 'Líquido' },
  ebullicion: { calentar: 'Ebullición: líquido + gas', enfriar: 'Condensación: gas + líquido' },
  gas: { calentar: 'Gas', enfriar: 'Gas' },
};

/** Qué está pasando, con partículas */
export const EXPLICACION: Record<Fase, { calentar: string; enfriar: string }> = {
  solido: {
    calentar: 'Las partículas del sólido vibran en sus posiciones cada vez con más energía: la temperatura sube.',
    enfriar: 'Las partículas del sólido vibran cada vez menos: la temperatura baja.',
  },
  fusion: {
    calentar: 'La energía se usa en deshacer la estructura ordenada del sólido, no en mover más deprisa las partículas. Por eso la temperatura no sube hasta que se funde todo el sólido.',
    enfriar: 'Las partículas se ordenan y se unen formando el sólido, y al hacerlo desprenden energía. Por eso la temperatura no baja hasta que se solidifica todo el líquido.',
  },
  liquido: {
    calentar: 'Las partículas del líquido se mueven cada vez más deprisa, sin dejar de estar juntas: la temperatura sube.',
    enfriar: 'Las partículas del líquido se mueven cada vez más despacio: la temperatura baja.',
  },
  ebullicion: {
    calentar: 'La energía se usa en separar las partículas del líquido para que escapen como gas. Mientras quede líquido, la temperatura se queda fija en el punto de ebullición.',
    enfriar: 'Las partículas del gas se juntan y forman el líquido, y al hacerlo desprenden energía. Mientras quede gas, la temperatura se queda fija.',
  },
  gas: {
    calentar: 'Las partículas del gas, muy separadas, se mueven cada vez más deprisa: la temperatura sube.',
    enfriar: 'Las partículas del gas se mueven cada vez más despacio: la temperatura baja.',
  },
};
