/* Modelo del gas: una cantidad fija de gas ideal.
   Estado de referencia: 1 atm, 2 L y 300 K (27 °C)  ->  P·V/T = 2/300 atm·L/K en todo momento. */
export const K = 2 / 300; // atm·L/K (es nR para la cantidad de gas del recipiente)

export type Modo = 'boyle' | 'charles' | 'gay';
export type Magnitud = 'P' | 'V' | 'T';

export const REF = { P: 1, V: 2, T: 300 };

export const LIMITES = {
  V: { min: 0.5, max: 4, paso: 0.1 }, // L
  T: { min: 150, max: 600, paso: 5 }, // K
};

export interface Ley {
  id: Modo;
  nombre: string;
  fija: Magnitud;
  control: 'V' | 'T';
  relacion: string; // cómo se escribe la ley
  frase: string; // la ley en palabras
  porque: string; // explicación con partículas
  historia: string;
}

export const LEYES: Ley[] = [
  {
    id: 'boyle',
    nombre: 'Boyle-Mariotte',
    fija: 'T',
    control: 'V',
    relacion: 'P · V = constante',
    frase: 'A temperatura constante, la presión y el volumen son inversamente proporcionales: si el volumen se reduce a la mitad, la presión se hace el doble.',
    porque: 'Con menos volumen, las partículas están más apretadas y chocan más a menudo contra las paredes del recipiente. Más choques por segundo significa más presión.',
    historia: 'Robert Boyle (1662) y Edme Mariotte (1676) la descubrieron por separado.',
  },
  {
    id: 'charles',
    nombre: 'Charles',
    fija: 'P',
    control: 'T',
    relacion: 'V / T = constante',
    frase: 'A presión constante, el volumen es directamente proporcional a la temperatura absoluta (en kelvin): si la temperatura se duplica, el volumen también.',
    porque: 'Al calentar, las partículas se mueven más deprisa y empujan el émbolo con más fuerza. El émbolo sube hasta que los choques vuelven a equilibrar el peso que tiene encima.',
    historia: 'Jacques Charles la estudió hacia 1787; Gay-Lussac la publicó en 1802.',
  },
  {
    id: 'gay',
    nombre: 'Gay-Lussac',
    fija: 'V',
    control: 'T',
    relacion: 'P / T = constante',
    frase: 'A volumen constante, la presión es directamente proporcional a la temperatura absoluta (en kelvin): si la temperatura se duplica, la presión también.',
    porque: 'Al calentar, las partículas se mueven más deprisa: chocan más a menudo y con más fuerza contra las paredes. Como el recipiente no puede crecer, sube la presión.',
    historia: 'Joseph Louis Gay-Lussac la estableció hacia 1802.',
  },
];

export interface Estado { P: number; V: number; T: number }

/** Estado del gas en un modo, a partir del valor que mueve el alumno */
export function estado(modo: Modo, valor: number): Estado {
  if (modo === 'boyle') return { T: REF.T, V: valor, P: (K * REF.T) / valor };
  if (modo === 'charles') return { P: REF.P, T: valor, V: (K * valor) / REF.P };
  return { V: REF.V, T: valor, P: (K * valor) / REF.V };
}

/** Número en formato español con d decimales */
export const num = (x: number, d = 2) => x.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });

export const UNIDAD: Record<Magnitud, string> = { P: 'atm', V: 'L', T: 'K' };
export const NOMBRE: Record<Magnitud, string> = { P: 'Presión', V: 'Volumen', T: 'Temperatura' };

/** Colores de las magnitudes (categorías de Fractalis): presión violeta, volumen turquesa, temperatura oro */
export const COLOR: Record<Magnitud, { texto: string; fondo: string; borde: string; trazo: string }> = {
  P: { texto: 'text-violet-700 dark:text-violet-300', fondo: 'bg-violet-50 dark:bg-violet-950/40', borde: 'border-violet-200 dark:border-violet-800', trazo: 'stroke-violet-600 dark:stroke-violet-400' },
  V: { texto: 'text-teal-700 dark:text-teal-300', fondo: 'bg-teal-50 dark:bg-teal-950/40', borde: 'border-teal-200 dark:border-teal-800', trazo: 'stroke-teal-600 dark:stroke-teal-400' },
  T: { texto: 'text-amber-700 dark:text-amber-300', fondo: 'bg-amber-50 dark:bg-amber-950/40', borde: 'border-amber-200 dark:border-amber-800', trazo: 'stroke-amber-600 dark:stroke-amber-400' },
};
