import { Exercise } from "./types";

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: "Descubrimiento de la Penicilina",
    subtitle: "Fleming y la sustancia milagrosa que mata bacterias (1928)",
    icon: "🧫",
    steps: [
      {
        id: "ex1-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Fleming observó en unas placas de laboratorio que se había detenido el crecimiento de una bacteria.",
      },
      {
        id: "ex1-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Fleming pensó que un hongo de la especie Penicillium fabricaba una sustancia que producía la muerte de la bacteria.",
      },
      {
        id: "ex1-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Fleming trabajó con el hongo para comprobar su acción sobre las bacterias.",
      },
      {
        id: "ex1-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Los ensayos clínicos confirmaron que el hongo fabricaba la sustancia que mataba a las bacterias.",
      },
      {
        id: "ex1-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Se comunicó el descubrimiento a otros laboratorios, que repitieron el experimento y verificaron los datos.",
      },
    ],
  },
  {
    id: 2,
    title: "Descubrimiento de la Estructura del ADN",
    subtitle: "Watson, Crick y la doble hélice de la vida (1953)",
    icon: "🧬",
    steps: [
      {
        id: "ex2-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Watson y Crick observaron fotografías de rayos X tomadas por Rosalind Franklin.",
      },
      {
        id: "ex2-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Propusieron que la molécula del ADN tenía forma de doble hélice.",
      },
      {
        id: "ex2-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Construyeron modelos para comprobar si esa forma podía explicar los resultados experimentales.",
      },
      {
        id: "ex2-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Comprobaron que el modelo coincidía con los datos y podía explicar cómo se copiaba el ADN.",
      },
      {
        id: "ex2-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicaron sus resultados en una revista científica.",
      },
    ],
  },
  {
    id: 3,
    title: "Benjamin Franklin y la Electricidad",
    subtitle: "El legendario experimento de la cometa en la tormenta (1752)",
    icon: "⚡",
    steps: [
      {
        id: "ex3-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Franklin observó que los rayos y las chispas eléctricas tenían comportamientos similares.",
      },
      {
        id: "ex3-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que los rayos eran una forma de electricidad natural.",
      },
      {
        id: "ex3-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Lanzó una cometa durante una tormenta con una llave metálica para comprobarlo.",
      },
      {
        id: "ex3-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "El experimento confirmó que las nubes estaban cargadas eléctricamente.",
      },
      {
        id: "ex3-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Franklin publicó sus descubrimientos sobre la electricidad atmosférica.",
      },
    ],
  },
  {
    id: 4,
    title: "Descubrimiento de la Fotosíntesis",
    subtitle: "Priestley y el soplo de vida de las plantas (1771)",
    icon: "🌱",
    steps: [
      {
        id: "ex4-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Priestley observó que una vela se apagaba dentro de un frasco cerrado y que una planta la mantenía encendida más tiempo.",
      },
      {
        id: "ex4-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que las plantas producían una sustancia necesaria para la combustión.",
      },
      {
        id: "ex4-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Colocó plantas en frascos con velas y midió el tiempo que tardaban en apagarse.",
      },
      {
        id: "ex4-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Concluyó que las plantas producían oxígeno durante la fotosíntesis.",
      },
      {
        id: "ex4-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicó sus resultados para que otros científicos pudieran verificarlos.",
      },
    ],
  },
  {
    id: 5,
    title: "Descubrimiento de la Insulina",
    subtitle: "Banting y el control del nivel de azúcar en sangre (1921)",
    icon: "💉",
    steps: [
      {
        id: "ex5-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Banting observó que los perros con el páncreas dañado desarrollaban diabetes.",
      },
      {
        id: "ex5-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que el páncreas producía una sustancia que regulaba el nivel de azúcar en la sangre.",
      },
      {
        id: "ex5-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Extrajo esa sustancia del páncreas y la inyectó en animales diabéticos.",
      },
      {
        id: "ex5-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Los animales tratados recuperaron niveles normales de glucosa.",
      },
      {
        id: "ex5-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicaron los resultados, y otros laboratorios confirmaron el hallazgo.",
      },
    ],
  },
  {
    id: 6,
    title: "Teoría de la Deriva Continental",
    subtitle: "Alfred Wegener y los continentes errantes (1912)",
    icon: "🌋",
    steps: [
      {
        id: "ex6-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Wegener observó que las costas de África y Sudamérica encajaban como piezas de un rompecabezas.",
      },
      {
        id: "ex6-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que los continentes se habían desplazado lentamente a lo largo del tiempo.",
      },
      {
        id: "ex6-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Reunió pruebas geológicas y fósiles para comprobar su idea.",
      },
      {
        id: "ex6-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Concluyó que todos los continentes habían estado unidos en un solo supercontinente, Pangea.",
      },
      {
        id: "ex6-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicó su teoría, que más tarde fue verificada por otros científicos.",
      },
    ],
  },
  {
    id: 7,
    title: "Pasteur y la Generación Espontánea",
    subtitle: "Los matraces en cuello de cisne y el origen de la vida (1859)",
    icon: "🔬",
    steps: [
      {
        id: "ex7-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Pasteur observó que los caldos nutritivos se llenaban de microorganismos si se dejaban abiertos.",
      },
      {
        id: "ex7-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que los microorganismos procedían del aire y no surgían por generación espontánea.",
      },
      {
        id: "ex7-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Calentó caldos en matraces con cuello de cisne para evitar que el polvo del aire entrara.",
      },
      {
        id: "ex7-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Comprobó que los caldos permanecían sin microorganismos si no entraba aire contaminado.",
      },
      {
        id: "ex7-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicó sus resultados demostrando que la vida no surge de manera espontánea.",
      },
    ],
  },
  {
    id: 8,
    title: "Galileo y la Caída de los Cuerpos",
    subtitle: "Desafiando a Aristóteles desde la Torre de Pisa (1589)",
    icon: "⚙️",
    steps: [
      {
        id: "ex8-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Galileo observó que los objetos pesados y ligeros caían casi al mismo tiempo.",
      },
      {
        id: "ex8-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que la velocidad de caída no dependía del peso.",
      },
      {
        id: "ex8-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Dejó caer bolas de distintos materiales desde la Torre de Pisa.",
      },
      {
        id: "ex8-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Comprobó que caían al suelo casi simultáneamente.",
      },
      {
        id: "ex8-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicó sus resultados, contradiciendo las ideas de Aristóteles.",
      },
    ],
  },
  {
    id: 9,
    title: "Descubrimiento de las Vacunas de Pasteur",
    subtitle: "Inmunidad y la primera victoria sobre la rabia (1885)",
    icon: "🧫",
    steps: [
      {
        id: "ex9-s1",
        stepNumber: 1,
        stepName: "Observación",
        text: "Pasteur observó que algunos animales quedaban inmunes después de una infección leve.",
      },
      {
        id: "ex9-s2",
        stepNumber: 2,
        stepName: "Hipótesis",
        text: "Pensó que era posible crear una versión debilitada del virus para proteger sin causar la enfermedad.",
      },
      {
        id: "ex9-s3",
        stepNumber: 3,
        stepName: "Experimentación",
        text: "Preparó muestras atenuadas del virus de la rabia y las probó en animales.",
      },
      {
        id: "ex9-s4",
        stepNumber: 4,
        stepName: "Análisis de resultados",
        text: "Comprobó que los animales vacunados no enfermaban al exponerse al virus.",
      },
      {
        id: "ex9-s5",
        stepNumber: 5,
        stepName: "Comunicación",
        text: "Publicó sus resultados y aplicó la vacuna en humanos con éxito.",
      },
    ],
  },
];

// Helper to define the steps metadata in detail
export const STEP_METADATA = {
  1: { name: "Observación", color: "from-acento-500 to-acento-700", bg: "bg-acento-50 dark:bg-acento-950/30", border: "border-acento-200 dark:border-acento-900", icon: "👁️" },
  2: { name: "Hipótesis", color: "from-acento-500 to-acento-700", bg: "bg-acento-50 dark:bg-acento-950/30", border: "border-acento-200 dark:border-acento-900", icon: "💡" },
  3: { name: "Experimentación", color: "from-acento-500 to-acento-700", bg: "bg-acento-50 dark:bg-acento-950/30", border: "border-acento-200 dark:border-acento-900", icon: "⚗️" },
  4: { name: "Análisis de resultados", color: "from-acento-500 to-acento-700", bg: "bg-acento-50 dark:bg-acento-950/30", border: "border-acento-200 dark:border-acento-900", icon: "📊" },
  5: { name: "Comunicación", color: "from-acento-500 to-acento-700", bg: "bg-acento-50 dark:bg-acento-950/30", border: "border-acento-200 dark:border-acento-900", icon: "📢" },
} as const;
