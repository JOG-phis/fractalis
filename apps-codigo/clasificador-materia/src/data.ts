export interface MatterItem {
  id: string;
  name: string;
  type: 'matter' | 'non-matter';
  icon: string;
  explanation: string;
  exampleImage?: string;
  hint: string;
  color: string;
}

export interface StateOfMatterItem {
  id: string;
  name: string;
  state: 'solid' | 'liquid' | 'gas';
  icon: string;
  explanation: string;
  hint: string;
  color: string;
  isTricky: boolean;
}

export const MATTER_NOT_MATTER_ITEMS: MatterItem[] = [
  {
    id: 'madera',
    name: 'Madera',
    type: 'matter',
    icon: 'TreePine',
    hint: 'Forma parte de los árboles y podemos tocarla.',
    explanation: 'La madera tiene masa, podemos pesarla y ocupa un lugar en el espacio. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'aluminio',
    name: 'Aluminio',
    type: 'matter',
    icon: 'Cpu',
    hint: 'Se usa para hacer latas y papel de cocina brillante.',
    explanation: 'El aluminio es un elemento metálico con masa definida y volumen fijo. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'aire',
    name: 'Aire',
    type: 'matter',
    icon: 'Wind',
    hint: 'No lo vemos, pero llena nuestros pulmones y globos.',
    explanation: 'Aunque invisible, el aire está formado por gases que tienen masa y ocupan espacio (volumen). ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'agua',
    name: 'Agua',
    type: 'matter',
    icon: 'Droplet',
    hint: 'La bebemos y moja todo.',
    explanation: 'El agua es una sustancia líquida que se puede pesar e introducida en un vaso ocupa su volumen. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'oxigeno',
    name: 'Oxígeno',
    type: 'matter',
    icon: 'FlameKindling',
    hint: 'Gas vital que respiramos del aire.',
    explanation: 'El oxígeno es un gas puro. Tiene átomos, masa propia y llena el contenedor donde se encuentre. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'ideas',
    name: 'Ideas',
    type: 'non-matter',
    icon: 'Lightbulb',
    hint: 'Viven en tu mente cuando creas o piensas.',
    explanation: 'Las ideas son procesos mentales o información. ¡No tienen masa ni ocupan espacio físico!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'sentimientos',
    name: 'Sentimientos',
    type: 'non-matter',
    icon: 'Heart',
    hint: 'Como la alegría, el miedo o la curiosidad.',
    explanation: 'Los sentimientos son respuestas emocionales en el cerebro. No los puedes pesar en una balanza. ¡No son materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'luz',
    name: 'Luz',
    type: 'non-matter',
    icon: 'Sun',
    hint: 'Ilumina los días y se mueve rapidísimo.',
    explanation: 'La luz es radiación electromagnética (energía), no está hecha de átomos, por tanto no tiene masa ni ocupa espacio. ¡No es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'sonido',
    name: 'Sonido',
    type: 'non-matter',
    icon: 'Volume2',
    hint: 'Vibraciones que viajan en el aire hacia tu oído.',
    explanation: 'El sonido es una onda de vibración mecánica de energía que viaja a través del aire, pero la onda en sí no tiene masa. ¡No es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'tiempo',
    name: 'Tiempo',
    type: 'non-matter',
    icon: 'Hourglass',
    hint: 'Los minutos y segundos que pasan.',
    explanation: 'El tiempo es una dimensión para medir eventos. No puedes meter tiempo en un tarro ni pesarlo. ¡No es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'gravedad',
    name: 'Gravedad',
    type: 'non-matter',
    icon: 'ArrowDown',
    hint: 'La fuerza invisible que te mantiene pegado al suelo.',
    explanation: 'La gravedad es una fuerza física y distorsión espacial, es decir, una interacción de energía, no un objeto físico con masa. ¡No es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'amor',
    name: 'Amor',
    type: 'non-matter',
    icon: 'Sparkles',
    hint: 'Lo que sientes por tu familia y amigos.',
    explanation: 'El amor es una emoción y concepto abstracto. No se compone de moles de átomos ni tiene volumen. ¡No es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'calor',
    name: 'Calor',
    type: 'non-matter',
    icon: 'Flame',
    hint: 'La sensación térmica cuando estás cerca de una fogata.',
    explanation: 'El calor es transferencia de energía térmica (movimiento de átomos), pero la energía misma no es materia física.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'electricidad',
    name: 'Electricidad',
    type: 'non-matter',
    icon: 'Zap',
    hint: 'Energía que corre por los cables para dar luz.',
    explanation: 'La electricidad es el flujo de carga de electrones (energía corriente), se clasifica como fenómeno electromagnético y energía. ¡No es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'roca',
    name: 'Roca',
    type: 'matter',
    icon: 'Mountain',
    hint: 'Rígida, pesada, puedes encontrarla en la montaña.',
    explanation: 'La roca es un conglomerado sólido de minerales. Tiene masa alta y ocupa un espacio visible determinado. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'leche',
    name: 'Leche',
    type: 'matter',
    icon: 'CupSoda',
    hint: 'Líquida, blanca y nutritiva.',
    explanation: 'La leche líquida tiene masa (la botella pesa más llena que vacía) y adopta el volumen del cartón. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'helio',
    name: 'Helio',
    type: 'matter',
    icon: 'Activity',
    hint: 'El gas que infla los globos que flotan solos.',
    explanation: 'Aunque flota porque es menos denso que el aire, el helio es un gas noble compuesto de átomos con masa propia. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'humo',
    name: 'Humo',
    type: 'matter',
    icon: 'CloudRain',
    hint: 'Sale del fuego y es grisáceo.',
    explanation: 'El humo consiste en pequeñas partículas sólidas de ceniza flotando en gases. Todo ello posee masa y volumen. ¡Es materia!',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  }
];

export const STATES_OF_MATTER_ITEMS: StateOfMatterItem[] = [
  {
    id: 'oxigeno_g',
    name: 'Oxígeno',
    state: 'gas',
    icon: 'FlameKindling',
    hint: 'Se expande libremente por toda la habitación.',
    explanation: 'El oxígeno gaseoso no tiene forma ni volumen propio; se adapta y llena por completo cualquier envase.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: false
  },
  {
    id: 'madera_s',
    name: 'Madera',
    state: 'solid',
    icon: 'TreePine',
    hint: 'Mantiene su forma aun si la cambias de caja.',
    explanation: 'La madera es un sólido clásico con volumen estable, partículas muy ordenadas y una estructura firme y rígida.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: false
  },
  {
    id: 'aceite_l',
    name: 'Aceite',
    state: 'liquid',
    icon: 'Droplet',
    hint: 'Se vierte despacio pero se adapta a la botella.',
    explanation: 'El aceite es un líquido viscoso. Su volumen es fijo, pero cambia de forma adaptándose al recipiente.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: false
  },
  {
    id: 'arena_s',
    name: 'Arena',
    state: 'solid',
    icon: 'Grain',
    hint: 'Tricky: ¿Fluye como el agua pero cada granito es duro?',
    explanation: '¡Interesante! Aunque un puñado de arena toma la forma del recipiente y fluye, cada granito individual es un sólido rígido e indeformable con su propio volumen fijo.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: true
  },
  {
    id: 'esponja_s',
    name: 'Esponja',
    state: 'solid',
    icon: 'Grid',
    hint: 'Tricky: Se puede aplastar mucho. ¿Sigue siendo sólida?',
    explanation: '¡Sí! La esponja es sólida. Su capacidad de encogerse es porque tiene poros llenos de aire (gas). Al exprimirla, expulsas el gas, pero el material de la esponja sigue siendo un sólido.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: true
  },
  {
    id: 'plastilina_s',
    name: 'Plastilina',
    state: 'solid',
    icon: 'SmileCheck',
    hint: 'Tricky: Puedes moldearla por completo con los dedos.',
    explanation: '¡Es un sólido maleable! Aunque cambia de forma con facilidad si presionas, conserva esa forma de manera estable sin fluir sola ni evaporarse.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: true
  },
  {
    id: 'humo_g',
    name: 'Humo',
    state: 'gas',
    icon: 'Cloud',
    hint: 'Tricky: Sale del fuego y se disipa en el cielo.',
    explanation: 'El humo consiste mayormente en una mezcla de gases de combustión calientes arrastrando micropartículas de hollín sólido. Al dominar el espacio y expandirse, se comporta como un gas.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: true
  },
  {
    id: 'gelatina_s',
    name: 'Gelatina',
    state: 'solid',
    icon: 'Dessert',
    hint: 'Tricky: Tiembla, rebota pero no se desborda sola.',
    explanation: '¡Es un gel (coloide)! Químicamente es un estado intermedio donde un esqueleto sólido rico en proteínas atrapa moléculas líquidas, pero macroscópicamente conserva su volumen y forma estable al reposo, por lo que actúa como sólido blando.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: true
  },
  {
    id: 'vapor_g',
    name: 'Vapor de agua',
    state: 'gas',
    icon: 'Wind',
    hint: 'Agua gaseosa flotante al hervir una tetera.',
    explanation: 'Es el agua en su estado gaseoso. Las moléculas están tan libres y con tanta energía que se expanden ocupando todo el aire disponible.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: false
  },
  {
    id: 'leche_l',
    name: 'Leche',
    state: 'liquid',
    icon: 'CupSoda',
    hint: 'Blanca, se derrama si se cae el vaso.',
    explanation: 'La leche es líquida. Mantiene un volumen exacto pero se esparce adoptando la superficie del suelo o la taza donde se derrame.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: false
  },
  {
    id: 'helio_g',
    name: 'Helio',
    state: 'gas',
    icon: 'Activity',
    hint: 'El gas noble de los globos feriantes.',
    explanation: 'El helio es un gas. Sus átomos flotan muy separados con gran ligereza, sin volumen ni forma definida.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: false
  },
  {
    id: 'miel_l',
    name: 'Miel',
    state: 'liquid',
    icon: 'Moon',
    hint: 'Tricky: Es super pegajosa e increíblemente lenta.',
    explanation: '¡Es un líquido muy viscoso! Fluye lentísimo debido a la fuerte atracción de sus azúcares, pero sigue derramándose y adaptándose a la forma del tarro lentamente.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700',
    isTricky: true
  }
];

export interface Classification3Item {
  id: string;
  name: string;
  category: 'elemento' | 'compuesto' | 'homogenea' | 'heterogenea';
  icon: string;
  explanation: string;
  hint: string;
  color: string;
}

export const LEVEL_3_ITEMS: Classification3Item[] = [
  {
    id: 'oro_e',
    name: 'Oro',
    category: 'elemento',
    icon: 'Sparkles',
    hint: 'Metal dorado noble formado únicamente por átomos de oro (Au).',
    explanation: 'El oro es un elemento químico puro. Está compuesto de un único tipo de átomos, por lo que no se puede dividir en sustancias más simples.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'oxigeno_e',
    name: 'Oxígeno gas',
    category: 'elemento',
    icon: 'FlameKindling',
    hint: 'Formado exclusivamente por átomos de oxígeno enlazados (O₂).',
    explanation: 'El oxígeno gas es un elemento puro. Aunque sus moléculas viajan emparejadas (O₂), todos los átomos constituyentes son idénticos del casillero de la tabla periódica.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'cobre_e',
    name: 'Cobre',
    category: 'elemento',
    icon: 'Cpu',
    hint: 'Metal rojizo maleable que conforma los hilos de los cables.',
    explanation: 'El cobre (Cu) es un elemento puro. Se trata de una red metálica uniforme hecha enteramente de átomos de cobre.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'agua_c',
    name: 'Agua pura',
    category: 'compuesto',
    icon: 'Droplet',
    hint: 'Unión química de Hidrógeno y Oxígeno (H₂O).',
    explanation: 'El agua pura es un compuesto químico. Une átomos de distintos elementos (hidrógeno y oxígeno) en proporciones constantes gracias a enlaces químicos.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'sal_c',
    name: 'Sal de mesa',
    category: 'compuesto',
    icon: 'Grid',
    hint: 'Unión química sólida de Sodio y Cloro (cloruro de sodio, NaCl).',
    explanation: 'La sal es un compuesto iónico (NaCl). Está muy unida químicamente y sus cristales tienen propiedades totalmente distintas al gas cloro o al metal sodio por separado.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'co2_c',
    name: 'Dióxido de Carbono',
    category: 'compuesto',
    icon: 'Wind',
    hint: 'Gas exhalado en la respiración formado por Carbono y Oxígeno (CO₂).',
    explanation: 'El CO₂ es un compuesto gaseoso en el que átomos de carbono y oxígeno están integrados químicamente en moléculas de estructura constante (CO₂).',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'aire_mh',
    name: 'Aire atmosférico',
    category: 'homogenea',
    icon: 'Activity',
    hint: 'Mezcla transparente de gases (nitrógeno, oxígeno, vapor...) que no ves.',
    explanation: 'El aire es una mezcla homogénea. Aunque contiene diversos gases independientes, están mezclados de forma uniforme en una sola fase invisible.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'aguasal_mh',
    name: 'Agua con sal disuelta',
    category: 'homogenea',
    icon: 'CupSoda',
    hint: 'Mezcla translúcida. No verás los granitos de sal pero sí sabe saluda.',
    explanation: 'Es una mezcla homogénea (disolución). La sal se disuelve a escala microscópica, resultando en una sola fase líquida transparente.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'bronce_mh',
    name: 'Bronce',
    category: 'homogenea',
    icon: 'ShieldAlert',
    hint: 'Aleación uniforme fabricada fundiendo cobre y estaño.',
    explanation: 'El bronce es una aleación sólida, clasificada como mezcla homogénea de sólidos porque los metales constitutivos se distribuyen uniformemente.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'aguaaceite_mhe',
    name: 'Agua y aceite',
    category: 'heterogenea',
    icon: 'Database',
    hint: 'No se mezclan y forman dos fases transparentes aceitosa y acuosa.',
    explanation: 'Es una mezcla heterogénea de líquidos insolubles. Al tener distinta polaridad, quedan divididos claramente en dos capas visibles.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'granito_mhe',
    name: 'Granito',
    category: 'heterogenea',
    icon: 'Mountain',
    hint: 'Famosa roca moteada donde ves granos grises, rosas y negros.',
    explanation: 'El granito es una mezcla heterogénea de sólidos. A simple vista distingues perfectamente los granos de cuarzo, feldespato y mica.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'ensalada_mhe',
    name: 'Ensalada',
    category: 'heterogenea',
    icon: 'TreePine',
    hint: 'Distingues la lechuga, el tomate y aceitunas sin esfuerzo.',
    explanation: 'Es una mezcla heterogénea clásica en la cocina. Los ingredientes están distribuidos al azar, no hay enlace químico y se diferencian de un vistazo.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  },
  {
    id: 'aguaarena_mhe',
    name: 'Agua con arena',
    category: 'heterogenea',
    icon: 'Compass',
    hint: 'La arena no se disuelve y precipita cansadamente en el fondo del agua.',
    explanation: 'Es una mezcla heterogénea líquida-sólida. Al no disolverse, las partículas pesadas de arena se diferencian claramente y caen al fondo.',
    color: 'bg-white text-slate-900 border-acento-300 dark:bg-slate-800 dark:text-slate-100 dark:border-acento-700'
  }
];
