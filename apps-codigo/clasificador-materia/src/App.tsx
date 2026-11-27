import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Volume2,
  VolumeX,
  Bookmark,
  ChevronLeft,
  Trophy,
  CheckCircle,
  XCircle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Play,
  Lightbulb,
  Layers,
  HelpCircle
} from 'lucide-react';

import {
  MATTER_NOT_MATTER_ITEMS,
  STATES_OF_MATTER_ITEMS,
  LEVEL_3_ITEMS,
  MatterItem,
  StateOfMatterItem,
  Classification3Item
} from './data';

import LucideIcon from './components/LucideIcon';
import Confetti from './components/Confetti';
import { CabeceraFractalis, IntroFractalis, PieFractalis } from "@fractalis";

import {
  playCorrectSound,
  playIncorrectSound,
  playVictorySound,
  playStarSound
} from './utils/audio';

type ViewState = 'menu' | 'level1' | 'level2' | 'level3';

export default function App() {
  // Navigation & High-Level State
  const [view, setView] = useState<ViewState>('menu');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // High scores stored locally
  const [highScore1, setHighScore1] = useState<number>(() => {
    const saved = localStorage.getItem('matter_hs_level1');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [highScore2, setHighScore2] = useState<number>(() => {
    const saved = localStorage.getItem('matter_hs_level2');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [highScore3, setHighScore3] = useState<number>(() => {
    const saved = localStorage.getItem('matter_hs_level3');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Sound helper wrapper
  const triggerSound = (type: 'correct' | 'incorrect' | 'victory' | 'star') => {
    if (!soundEnabled) return;
    if (type === 'correct') playCorrectSound();
    if (type === 'incorrect') playIncorrectSound();
    if (type === 'victory') playVictorySound();
    if (type === 'star') playStarSound();
  };


  // ==========================================
  // LEVEL 1: MATERIA O NO MATERIA
  // ==========================================
  const [l1Items, setL1Items] = useState<MatterItem[]>([]);
  const [l1CurrentIdx, setL1CurrentIdx] = useState<number>(0);
  const [l1Score, setL1Score] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [l1ShowFeedback, setL1ShowFeedback] = useState<boolean>(false);
  const [l1LastAnswerCorrect, setL1LastAnswerCorrect] = useState<boolean | null>(null);
  const [l1ShowHint, setL1ShowHint] = useState<boolean>(false);
  const [l1Completed, setL1Completed] = useState<boolean>(false);
  const [l1FeedbackMsg, setL1FeedbackMsg] = useState<string>('');

  const initLevel1 = () => {
    const shuffled = [...MATTER_NOT_MATTER_ITEMS].sort(() => Math.random() - 0.5);
    setL1Items(shuffled);
    setL1CurrentIdx(0);
    setL1Score({ correct: 0, incorrect: 0 });
    setL1ShowFeedback(false);
    setL1LastAnswerCorrect(null);
    setL1ShowHint(false);
    setL1Completed(false);
    setL1FeedbackMsg('');
  };

  const handleL1Classification = (selection: 'matter' | 'non-matter') => {
    if (l1ShowFeedback || l1Completed) return;

    const currentItem = l1Items[l1CurrentIdx];
    const isCorrect = (selection === 'matter' && currentItem.type === 'matter') ||
                      (selection === 'non-matter' && currentItem.type === 'non-matter');

    setL1LastAnswerCorrect(isCorrect);
    setL1FeedbackMsg(currentItem.explanation);

    if (isCorrect) {
      setL1Score(prev => ({ ...prev, correct: prev.correct + 1 }));
      triggerSound('correct');
    } else {
      setL1Score(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      triggerSound('incorrect');
    }

    setL1ShowFeedback(true);
  };

  const handleL1Next = () => {
    setL1ShowFeedback(false);
    setL1ShowHint(false);
    setL1LastAnswerCorrect(null);

    if (l1CurrentIdx < l1Items.length - 1) {
      setL1CurrentIdx(prev => prev + 1);
    } else {
      setL1Completed(true);
      triggerSound('victory');
      const finalPercentage = Math.round((l1Score.correct / l1Items.length) * 100);
      if (finalPercentage > highScore1) {
        setHighScore1(finalPercentage);
        localStorage.setItem('matter_hs_level1', finalPercentage.toString());
      }
    }
  };


  // ==========================================
  // LEVEL 2: SÓLIDO, LÍQUIDO O GAS
  // ==========================================
  const [l2Items, setL2Items] = useState<StateOfMatterItem[]>([]);
  const [l2CurrentIdx, setL2CurrentIdx] = useState<number>(0);
  const [l2Score, setL2Score] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [l2ShowFeedback, setL2ShowFeedback] = useState<boolean>(false);
  const [l2LastAnswerCorrect, setL2LastAnswerCorrect] = useState<boolean | null>(null);
  const [l2ShowHint, setL2ShowHint] = useState<boolean>(false);
  const [l2Completed, setL2Completed] = useState<boolean>(false);
  const [l2FeedbackMsg, setL2FeedbackMsg] = useState<string>('');

  const initLevel2 = () => {
    const shuffled = [...STATES_OF_MATTER_ITEMS].sort(() => Math.random() - 0.5);
    setL2Items(shuffled);
    setL2CurrentIdx(0);
    setL2Score({ correct: 0, incorrect: 0 });
    setL2ShowFeedback(false);
    setL2LastAnswerCorrect(null);
    setL2ShowHint(false);
    setL2Completed(false);
    setL2FeedbackMsg('');
  };

  const handleL2Classification = (selection: 'solid' | 'liquid' | 'gas') => {
    if (l2ShowFeedback || l2Completed) return;

    const currentItem = l2Items[l2CurrentIdx];
    const isCorrect = selection === currentItem.state;

    setL2LastAnswerCorrect(isCorrect);
    setL2FeedbackMsg(currentItem.explanation);

    if (isCorrect) {
      setL2Score(prev => ({ ...prev, correct: prev.correct + 1 }));
      triggerSound('correct');
    } else {
      setL2Score(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      triggerSound('incorrect');
    }

    setL2ShowFeedback(true);
  };

  const handleL2Next = () => {
    setL2ShowFeedback(false);
    setL2ShowHint(false);
    setL2LastAnswerCorrect(null);

    if (l2CurrentIdx < l2Items.length - 1) {
      setL2CurrentIdx(prev => prev + 1);
    } else {
      setL2Completed(true);
      triggerSound('victory');
      const finalPercentage = Math.round((l2Score.correct / l2Items.length) * 100);
      if (finalPercentage > highScore2) {
        setHighScore2(finalPercentage);
        localStorage.setItem('matter_hs_level2', finalPercentage.toString());
      }
    }
  };


  // ==========================================
  // LEVEL 3: ELEMENTO, COMPUESTO, HOMOGÉNEA, HETEROGÉNEA
  // ==========================================
  const [l3Items, setL3Items] = useState<Classification3Item[]>([]);
  const [l3CurrentIdx, setL3CurrentIdx] = useState<number>(0);
  const [l3Score, setL3Score] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [l3ShowFeedback, setL3ShowFeedback] = useState<boolean>(false);
  const [l3LastAnswerCorrect, setL3LastAnswerCorrect] = useState<boolean | null>(null);
  const [l3ShowHint, setL3ShowHint] = useState<boolean>(false);
  const [l3Completed, setL3Completed] = useState<boolean>(false);
  const [l3FeedbackMsg, setL3FeedbackMsg] = useState<string>('');

  const initLevel3 = () => {
    const shuffled = [...LEVEL_3_ITEMS].sort(() => Math.random() - 0.5);
    setL3Items(shuffled);
    setL3CurrentIdx(0);
    setL3Score({ correct: 0, incorrect: 0 });
    setL3ShowFeedback(false);
    setL3LastAnswerCorrect(null);
    setL3ShowHint(false);
    setL3Completed(false);
    setL3FeedbackMsg('');
  };

  const handleL3Classification = (selection: 'elemento' | 'compuesto' | 'homogenea' | 'heterogenea') => {
    if (l3ShowFeedback || l3Completed) return;

    const currentItem = l3Items[l3CurrentIdx];
    const isCorrect = selection === currentItem.category;

    setL3LastAnswerCorrect(isCorrect);
    setL3FeedbackMsg(currentItem.explanation);

    if (isCorrect) {
      setL3Score(prev => ({ ...prev, correct: prev.correct + 1 }));
      triggerSound('correct');
    } else {
      setL3Score(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      triggerSound('incorrect');
    }

    setL3ShowFeedback(true);
  };

  const handleL3Next = () => {
    setL3ShowFeedback(false);
    setL3ShowHint(false);
    setL3LastAnswerCorrect(null);

    if (l3CurrentIdx < l3Items.length - 1) {
      setL3CurrentIdx(prev => prev + 1);
    } else {
      setL3Completed(true);
      triggerSound('victory');
      const finalPercentage = Math.round((l3Score.correct / l3Items.length) * 100);
      if (finalPercentage > highScore3) {
        setHighScore3(finalPercentage);
        localStorage.setItem('matter_hs_level3', finalPercentage.toString());
      }
    }
  };

  return (
    <div className="text-slate-900 font-sans flex flex-col antialiased dark:text-slate-100">
      {/* ───────────────── TOP BAR ───────────────── */}
      <CabeceraFractalis titulo="Clasificador de la materia" subtitulo="Materia, estados y sustancias" curso="2eso" tema="Temas 1-3">
        {view !== 'menu' && (
          <button
            className="fx-boton"
            onClick={() => {
              setView('menu');
              triggerSound('star');
            }}
          >
            <ChevronLeft /> <span>Menú</span>
          </button>
        )}
        <button
          className="fx-boton"
          aria-pressed={soundEnabled}
          onClick={() => {
            setSoundEnabled(prev => !prev);
            setTimeout(() => {
              if (!soundEnabled) playStarSound();
            }, 40);
          }}
          title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
        >
          {soundEnabled ? <Volume2 /> : <VolumeX />}
        </button>
      </CabeceraFractalis>

      {/* ───────────────── VIEW SWITCHER ───────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          
          {/* MENU VIEW */}
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 py-4 max-w-4xl mx-auto w-full"
            >
              {/* Presentación (kit común de Fractalis) con la definición de materia */}
              <IntroFractalis titulo="¿Qué es materia?" curso="2eso">
                <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-100">
                  &ldquo;<span className="text-acento-700 dark:text-acento-300 font-bold">Materia</span> es todo lo que tiene <span className="text-amber-700 dark:text-amber-300 font-bold">masa</span> y ocupa un <span className="text-green-700 dark:text-green-300 font-bold">lugar en el espacio</span>.&rdquo;
                </p>
                <p>Clasifica sustancias y objetos en tres niveles: si son materia o no, en qué estado se encuentran y qué tipo de sustancia son.</p>
              </IntroFractalis>

              {/* Three modular levels selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

                {/* Level 1: Materia o No */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col justify-between hover:border-acento-300 hover:shadow-lg transition-all relative overflow-hidden dark:bg-slate-900 dark:border-slate-800 dark:hover:border-acento-700">
                  <div className="absolute top-0 right-0 p-3 bg-acento-50 rounded-bl-2xl text-acento-700 font-bold font-display text-[10px] tracking-wide uppercase dark:bg-acento-950/40 dark:text-acento-300">
                    Nivel 1
                  </div>
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-acento-100 text-acento-600 flex items-center justify-center text-xl shadow-xs dark:bg-acento-900/40 dark:text-acento-400">
                      📦
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-slate-800 dark:text-slate-100">Materia o No Materia</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed dark:text-slate-400">
                        Aprende a diferenciar las cosas materiales (que puedes pesar y tocar) de conceptos abstractos y flujos energéticos.
                      </p>
                    </div>

                    {highScore1 > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-acento-700 bg-acento-50 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold dark:text-acento-300 dark:bg-acento-950/40">
                        <Trophy className="w-3.5 h-3.5" /> Mejor puntuación: {highScore1}%
                      </div>
                    )}
                  </div>
                  <div className="pt-6">
                    <button
                      id="play-l1-btn"
                      onClick={() => {
                        initLevel1();
                        setView('level1');
                        triggerSound('star');
                      }}
                      className="w-full py-2.5 px-4 bg-acento-600 hover:bg-acento-700 active:scale-95 text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow shadow-acento-600/10 cursor-pointer text-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Jugar Nivel 1
                    </button>
                  </div>
                </div>

                {/* Level 2: Sólido, Líquido o Gas */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col justify-between hover:border-acento-300 hover:shadow-lg transition-all relative overflow-hidden dark:bg-slate-900 dark:border-slate-800 dark:hover:border-acento-700">
                  <div className="absolute top-0 right-0 p-3 bg-acento-50 rounded-bl-2xl text-acento-700 font-bold font-display text-[10px] tracking-wide uppercase dark:bg-acento-950/40 dark:text-acento-300">
                    Nivel 2
                  </div>
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-acento-100 text-acento-600 flex items-center justify-center text-xl shadow-xs dark:bg-acento-900/40 dark:text-acento-400">
                      💧
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-slate-800 dark:text-slate-100">Estados de la Materia</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed dark:text-slate-400">
                        Clasifica en sólido, líquido o gas. Contiene casos pícaros menos evidentes como la arena, esponjas y plastilina.
                      </p>
                    </div>

                    {highScore2 > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-acento-700 bg-acento-50 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold dark:text-acento-300 dark:bg-acento-950/40">
                        <Trophy className="w-3.5 h-3.5" /> Mejor puntuación: {highScore2}%
                      </div>
                    )}
                  </div>
                  <div className="pt-6">
                    <button
                      id="play-l2-btn"
                      onClick={() => {
                        initLevel2();
                        setView('level2');
                        triggerSound('star');
                      }}
                      className="w-full py-2.5 px-4 bg-acento-600 hover:bg-acento-700 active:scale-95 text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow shadow-acento-500/10 cursor-pointer text-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Jugar Nivel 2
                    </button>
                  </div>
                </div>

                {/* Level 3: Mezcla Homogénea, Heterogénea, Elemento o Compuesto */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex flex-col justify-between hover:border-acento-300 hover:shadow-lg transition-all relative overflow-hidden dark:bg-slate-900 dark:border-slate-800 dark:hover:border-acento-700">
                  <div className="absolute top-0 right-0 p-3 bg-acento-50 rounded-bl-2xl text-acento-700 font-bold font-display text-[10px] tracking-wide uppercase dark:bg-acento-950/40 dark:text-acento-300">
                    Nivel 3
                  </div>
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-xl bg-acento-100 text-acento-600 flex items-center justify-center text-xl shadow-xs dark:bg-acento-900/40 dark:text-acento-400">
                      🧬
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-slate-800 dark:text-slate-100">Clasificación de Elementos</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed dark:text-slate-400">
                        Nivel avanzado: clasifica sustancias de la naturaleza en elementos, compuestos, mezclas homogéneas y heterogéneas.
                      </p>
                    </div>

                    {highScore3 > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-acento-700 bg-acento-50 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold dark:text-acento-300 dark:bg-acento-950/40">
                        <Trophy className="w-3.5 h-3.5" /> Mejor puntuación: {highScore3}%
                      </div>
                    )}
                  </div>
                  <div className="pt-6">
                    <button
                      id="play-l3-btn"
                      onClick={() => {
                        initLevel3();
                        setView('level3');
                        triggerSound('star');
                      }}
                      className="w-full py-2.5 px-4 bg-acento-600 hover:bg-acento-700 active:scale-95 text-white font-display font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow shadow-acento-600/10 cursor-pointer text-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" /> Jugar Nivel 3
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}


          {/* ───────────────── LEVEL 1 IN-GAME ───────────────── */}
          {view === 'level1' && (
            <motion.div
              key="level1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto w-full space-y-6 py-4"
            >
              {/* Toolbar information */}
              <div className="flex items-center justify-between">
                <button
                  id="exit-l1-btn"
                  onClick={() => setView('menu')}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-semibold hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" /> Menú
                </button>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-sans">Nivel 1</span>
                  <span className="text-base font-display font-bold text-slate-800 dark:text-slate-100">
                    {!l1Completed && l1Items.length > 0 ? `Palabra ${l1CurrentIdx + 1} de ${l1Items.length}` : 'Finalizado'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 tabular-nums text-sm">
                  <span className="bg-green-50 text-green-700 border border-green-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold dark:bg-green-950/40 dark:text-green-300 dark:border-green-800">
                    ✔️ {l1Score.correct}
                  </span>
                  <span className="bg-red-50 text-red-700 border border-red-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold dark:bg-red-950/40 dark:text-red-300 dark:border-red-800">
                    ❌ {l1Score.incorrect}
                  </span>
                </div>
              </div>

              {!l1Completed && l1Items.length > 0 && (
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden dark:bg-slate-700">
                  <div
                    className="bg-acento-500 h-full transition-all duration-300"
                    style={{ width: `${((l1CurrentIdx) / l1Items.length) * 100}%` }}
                  />
                </div>
              )}

              {/* GAMEPLAY NOT COMPLETED */}
              {!l1Completed && l1Items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left Box Target: Materia */}
                  <div
                    id="l1-target-matter"
                    onClick={() => handleL1Classification('matter')}
                    className="md:col-span-3 bg-sky-50/60 hover:bg-sky-50 border-2 border-dashed border-sky-200 hover:border-sky-400 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-102 group active:scale-98 shadow-sm dark:bg-sky-950/40 dark:hover:bg-sky-950/40 dark:border-sky-800"
                  >
                    <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:scale-110 transition-transform dark:bg-sky-900/40">
                      🟢
                    </div>
                    <h4 className="text-lg font-display font-medium text-sky-900 uppercase tracking-wide dark:text-sky-100">Materia</h4>
                    <p className="text-xs text-sky-600 mt-2 font-sans dark:text-sky-400">
                      Tiene existencia física. Se puede tocar, ver o medir en un espacio real.
                    </p>
                    <span className="mt-4 px-3 py-1 bg-sky-600 text-white text-[10px] font-display font-medium rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
                      Clasificar aquí
                    </span>
                  </div>

                  {/* Center Interactive card display */}
                  <div className="md:col-span-6 bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col justify-between space-y-6 relative overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md dark:bg-slate-800/50">
                        Clasificar palabra
                      </span>
                      <button
                        id="l1-hint-btn"
                        onClick={() => { setL1ShowHint(prev => !prev); triggerSound('star'); }}
                        className="text-xs text-amber-700 hover:text-amber-800 flex items-center gap-1 font-semibold hover:bg-amber-50 px-2 py-1 rounded transition-colors dark:text-amber-300 dark:hover:text-amber-200 dark:hover:bg-amber-950/40"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Ver pista
                      </button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 space-y-4">
                      {/* Active category card */}
                      <motion.div
                        key={l1CurrentIdx}
                        initial={{ scale: 0.94, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.94, opacity: 0 }}
                        className={`w-44 h-44 rounded-2xl ${l1Items[l1CurrentIdx].color} border-2 flex flex-col items-center justify-center p-4 text-center shadow-sm select-none`}
                      >
                        <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-inner mb-3 dark:bg-slate-900">
                          <LucideIcon name={l1Items[l1CurrentIdx].icon} className="w-8 h-8" />
                        </div>
                        <span className="text-xl font-display font-bold tracking-tight">
                          {l1Items[l1CurrentIdx].name}
                        </span>
                      </motion.div>

                      {/* Hint popover */}
                      <AnimatePresence>
                        {l1ShowHint && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-amber-50 text-amber-900 border border-amber-100 p-3 rounded-xl text-xs text-center font-sans w-full max-w-xs shadow-inner dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900"
                          >
                            {l1Items[l1CurrentIdx].hint}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Feedback wrapper inside card flow */}
                    <AnimatePresence>
                      {l1ShowFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border flex flex-col items-center text-center space-y-2 text-xs ${
                            l1LastAnswerCorrect ? 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/40 dark:text-green-100 dark:border-green-800' : 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-100 dark:border-red-800'
                          }`}
                        >
                          <div className="font-display font-bold flex items-center gap-1.5">
                            {l1LastAnswerCorrect ? (
                              <span className="text-green-700 flex items-center gap-1 dark:text-green-300">✔️ ¡Correcto!</span>
                            ) : (
                              <span className="text-red-700 flex items-center gap-1 dark:text-red-300">❌ ¡Opps, inténtalo de nuevo!</span>
                            )}
                          </div>
                          <p className="font-sans leading-relaxed text-slate-600 dark:text-slate-300">
                            {l1FeedbackMsg}
                          </p>
                          <button
                            id="l1-next-btn"
                            onClick={handleL1Next}
                            className="mt-1 px-4 py-1.5 bg-acento-600 hover:bg-acento-700 text-white font-display text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Continuar <ArrowRight className="w-3 h-3" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Classic clean buttons (materia o no) */}
                    {!l1ShowFeedback && (
                      <div className="flex gap-4 pt-2">
                        <button
                          id="btn-choice-matter"
                          onClick={() => handleL1Classification('matter')}
                          className="bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 dark:bg-sky-900/40 dark:hover:bg-sky-900/70 dark:text-sky-100 dark:border-sky-700 flex-1 py-3 active:scale-95 font-display font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer text-sm"
                        >
                          Materia
                        </button>
                        <button
                          id="btn-choice-nonmatter"
                          onClick={() => handleL1Classification('non-matter')}
                          className="bg-violet-100 hover:bg-violet-200 text-violet-900 border border-violet-300 dark:bg-violet-900/40 dark:hover:bg-violet-900/70 dark:text-violet-100 dark:border-violet-700 flex-1 py-3 active:scale-95 font-display font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer text-sm"
                        >
                          No Materia
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Box Target: No Materia */}
                  <div
                    id="l1-target-nonmatter"
                    onClick={() => handleL1Classification('non-matter')}
                    className="md:col-span-3 bg-violet-50/60 hover:bg-violet-50 border-2 border-dashed border-violet-200 hover:border-violet-400 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-102 group active:scale-98 shadow-sm dark:bg-violet-950/40 dark:hover:bg-violet-950/40 dark:border-violet-800"
                  >
                    <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:scale-110 transition-transform dark:bg-violet-900/40">
                      💭
                    </div>
                    <h4 className="text-lg font-display font-medium text-violet-900 uppercase tracking-wide dark:text-violet-100">No Materia</h4>
                    <p className="text-xs text-violet-600 mt-2 font-sans dark:text-violet-400">
                      Energías, fuerzas del universo, o constructos y sentimientos intangibles dentro de tu imaginación.
                    </p>
                    <span className="mt-4 px-3 py-1 bg-violet-600 text-white text-[10px] font-display font-medium rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
                      Clasificar aquí
                    </span>
                  </div>

                </div>
              )}

              {/* LEVEL 1 COMPLETED SCREEN */}
              {l1Completed && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg text-center space-y-6 max-w-md mx-auto relative overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                  <Confetti />
                  <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm animate-bounce dark:bg-amber-900/40">
                    🏆
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100">
                      ¡Nivel 1 Superado!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto dark:text-slate-400">
                      Buen análisis científico. Clasificaste las {l1Items.length} palabras de materia y abstracciones con éxito.
                    </p>
                  </div>

                  <div className="flex justify-center gap-2 text-2xl">
                    <span className="text-amber-400">⭐️</span>
                    <span className={`text-amber-400 ${l1Score.correct >= 13 ? 'opacity-100' : 'opacity-20'}`}>⭐️</span>
                    <span className={`text-amber-400 ${l1Score.correct >= 17 ? 'opacity-100' : 'opacity-20'}`}>⭐️</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2 max-w-xs mx-auto dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Aciertos:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{l1Score.correct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fallos:</span>
                      <span className="font-bold text-red-600 dark:text-red-400">{l1Score.incorrect}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-800 dark:border-slate-800 dark:text-slate-100">
                      <span>Puntuación final:</span>
                      <span>{Math.round((l1Score.correct / l1Items.length) * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      id="retry-l1-btn"
                      onClick={() => {
                        initLevel1();
                        triggerSound('star');
                      }}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-medium rounded-xl transition-all border border-slate-200 text-xs cursor-pointer flex items-center justify-center gap-1 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-800"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Repetir
                    </button>
                    <button
                      id="next-level2-btn"
                      onClick={() => {
                        initLevel2();
                        setView('level2');
                        triggerSound('star');
                      }}
                      className="flex-1 py-2.5 bg-acento-500 hover:bg-acento-600 text-white font-display font-bold rounded-xl transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Nivel 2 <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}


          {/* ───────────────── LEVEL 2 IN-GAME ───────────────── */}
          {view === 'level2' && (
            <motion.div
              key="level2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto w-full space-y-6 py-4"
            >
              {/* Toolbar information */}
              <div className="flex items-center justify-between">
                <button
                  id="exit-l2-btn"
                  onClick={() => setView('menu')}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-semibold hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" /> Menú
                </button>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-sans">Nivel 2</span>
                  <span className="text-base font-display font-bold text-slate-800 dark:text-slate-100">
                    {!l2Completed && l2Items.length > 0 ? `Compuesto ${l2CurrentIdx + 1} de ${l2Items.length}` : 'Finalizado'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 tabular-nums text-sm">
                  <span className="bg-green-50 text-green-700 border border-green-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold dark:bg-green-950/40 dark:text-green-300 dark:border-green-800">
                    ✔️ {l2Score.correct}
                  </span>
                  <span className="bg-red-50 text-red-700 border border-red-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold dark:bg-red-950/40 dark:text-red-300 dark:border-red-800">
                    ❌ {l2Score.incorrect}
                  </span>
                </div>
              </div>

              {!l2Completed && l2Items.length > 0 && (
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden dark:bg-slate-700">
                  <div
                    className="bg-acento-500 h-full transition-all duration-300"
                    style={{ width: `${((l2CurrentIdx) / l2Items.length) * 100}%` }}
                  />
                </div>
              )}

              {/* LEVEL 2 ACTIVE SUBSTANCE BOARD */}
              {!l2Completed && l2Items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left explanation card with live hints */}
                  <div className="md:col-span-4 bg-white rounded-3xl border border-slate-100 shadow p-5 flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-acento-700 bg-acento-50 px-2.5 py-1 rounded-full uppercase tracking-wider dark:text-acento-300 dark:bg-acento-950/40">
                        Curiosidad del Estado
                      </span>
                      <h4 className="text-base font-display font-bold text-slate-800 dark:text-slate-100">
                        ¿Qué estás clasificando?
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans dark:text-slate-400">
                        La materia se presenta en tres estados clásicos según la fuerza con que se atraigan sus partículas microscópicas.
                      </p>

                      <div className="space-y-2 pt-2 text-xs">
                        <div className="p-2 border-l-2 border-amber-400 bg-amber-50/50 rounded-r-lg font-sans dark:bg-amber-950/40">
                          <strong>Sólidos:</strong> Forma y volumen fijos. Partículas muy juntas.
                        </div>
                        <div className="p-2 border-l-2 border-sky-400 bg-sky-50/50 rounded-r-lg font-sans dark:bg-sky-950/40">
                          <strong>Líquidos:</strong> Volumen fijo pero forma adaptable. Fluyen.
                        </div>
                        <div className="p-2 border-l-2 border-violet-400 bg-violet-50/50 rounded-r-lg font-sans dark:bg-violet-950/40">
                          <strong>Gases:</strong> No tienen forma ni volumen definidos. Se expanden.
                        </div>
                      </div>
                    </div>

                    <button
                      id="l2-hint-toggle"
                      onClick={() => { setL2ShowHint(prev => !prev); triggerSound('star'); }}
                      className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 font-display text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100 dark:border-slate-800"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> {l2ShowHint ? 'Ocultar pista' : 'Ver pista científica'}
                    </button>
                  </div>

                  {/* Right active card visual selection */}
                  <div className="md:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col justify-between space-y-6 dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex flex-col items-center justify-center py-6 space-y-4">
                      
                      <motion.div
                        key={l2CurrentIdx}
                        initial={{ scale: 0.94, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.94, opacity: 0 }}
                        className={`w-40 h-40 rounded-3xl ${l2Items[l2CurrentIdx].color} border-2 flex flex-col items-center justify-center p-5 text-center shadow-sm select-none relative`}
                      >
                        {l2Items[l2CurrentIdx].isTricky && (
                          <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow-md animate-pulse">
                            ¡Pillina/Tricky!
                          </span>
                        )}
                        <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur flex items-center justify-center shadow-inner mb-3 dark:bg-slate-900">
                          <LucideIcon name={l2Items[l2CurrentIdx].icon} className="w-8 h-8" />
                        </div>
                        <span className="text-xl font-display font-extrabold tracking-tight">
                          {l2Items[l2CurrentIdx].name}
                        </span>
                      </motion.div>

                      {/* Level 2 Hint Display */}
                      <AnimatePresence>
                        {l2ShowHint && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-amber-50 text-amber-900 border border-amber-100 p-3 rounded-xl text-xs text-center font-sans w-full max-w-sm shadow-inner dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900"
                          >
                            {l2Items[l2CurrentIdx].hint}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Explanatory feedback */}
                    <AnimatePresence>
                      {l2ShowFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3.5 rounded-xl border flex flex-col items-center text-center space-y-2 text-xs ${
                            l2LastAnswerCorrect ? 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/40 dark:text-green-100 dark:border-green-800' : 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-100 dark:border-red-800'
                          }`}
                        >
                          <span className="font-display font-semibold text-xs flex items-center gap-1.5">
                            {l2LastAnswerCorrect ? (
                              <span className="text-green-700 dark:text-green-300">✔️ ¡Estupendo acierto!</span>
                            ) : (
                              <span className="text-red-700 dark:text-red-300">✖️ ¡Casi! Revisa la explicación</span>
                            )}
                          </span>
                          <p className="font-sans leading-relaxed text-slate-600 dark:text-slate-300">
                            {l2FeedbackMsg}
                          </p>
                          <button
                            id="l2-continue-btn"
                            onClick={handleL2Next}
                            className="px-4 py-1 bg-acento-600 hover:bg-acento-700 text-white font-display text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Continuar <ArrowRight className="w-3 h-3" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Decision Button Triggers Solid / Liquid / Gas */}
                    {!l2ShowFeedback && (
                      <div className="grid grid-cols-3 gap-3.5 pt-2">
                        <button
                          id="btn-l2-solid"
                          onClick={() => handleL2Classification('solid')}
                          className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 dark:bg-amber-900/40 dark:hover:bg-amber-900/70 dark:text-amber-100 dark:border-amber-700 py-3 px-2 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          🧱 Sólido
                        </button>
                        <button
                          id="btn-l2-liquid"
                          onClick={() => handleL2Classification('liquid')}
                          className="bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 dark:bg-sky-900/40 dark:hover:bg-sky-900/70 dark:text-sky-100 dark:border-sky-700 py-3 px-2 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          💧 Líquido
                        </button>
                        <button
                          id="btn-l2-gas"
                          onClick={() => handleL2Classification('gas')}
                          className="bg-violet-100 hover:bg-violet-200 text-violet-900 border border-violet-300 dark:bg-violet-900/40 dark:hover:bg-violet-900/70 dark:text-violet-100 dark:border-violet-700 py-3 px-2 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          💨 Gas
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* LEVEL 2 COMPLETED SUMMARY */}
              {l2Completed && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg text-center space-y-6 max-w-md mx-auto relative overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                  <Confetti />
                  <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm animate-bounce dark:bg-amber-900/40">
                    🏆
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100">
                      ¡Nivel 2 Superado!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto dark:text-slate-400">
                      ¡Fascinante! Lograste sobrepasar las trampas físicas de la gelatina, la plastilina y la arena.
                    </p>
                  </div>

                  <div className="flex justify-center gap-2 text-2xl">
                    <span className="text-amber-400">⭐️</span>
                    <span className={`text-amber-400 ${l2Score.correct >= 8 ? 'opacity-100' : 'opacity-20'}`}>⭐️</span>
                    <span className={`text-amber-400 ${l2Score.correct >= 11 ? 'opacity-100' : 'opacity-20'}`}>⭐️</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2 max-w-xs mx-auto dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Aciertos:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{l2Score.correct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fallos:</span>
                      <span className="font-bold text-red-600 dark:text-red-400">{l2Score.incorrect}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-800 dark:border-slate-800 dark:text-slate-100">
                      <span>Puntuación final:</span>
                      <span>{Math.round((l2Score.correct / l2Items.length) * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      id="retry-l2-btn"
                      onClick={() => {
                        initLevel2();
                        triggerSound('star');
                      }}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-medium rounded-xl transition-all border border-slate-200 text-xs cursor-pointer flex items-center justify-center gap-1 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-800"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Repetir
                    </button>
                    <button
                      id="next-level3-btn"
                      onClick={() => {
                        initLevel3();
                        setView('level3');
                        triggerSound('star');
                      }}
                      className="flex-1 py-2.5 bg-acento-600 hover:bg-acento-700 text-white font-display font-bold rounded-xl transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Nivel 3 <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}


          {/* ───────────────── LEVEL 3 IN-GAME ───────────────── */}
          {view === 'level3' && (
            <motion.div
              key="level3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto w-full space-y-6 py-4"
            >
              {/* Toolbar information */}
              <div className="flex items-center justify-between">
                <button
                  id="exit-l3-btn"
                  onClick={() => setView('menu')}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-semibold hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" /> Menú
                </button>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider font-sans">Nivel 3: Materia y Enlaces</span>
                  <span className="text-base font-display font-bold text-slate-800 dark:text-slate-100">
                    {!l3Completed && l3Items.length > 0 ? `Sustancia ${l3CurrentIdx + 1} de ${l3Items.length}` : 'Finalizado'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 tabular-nums text-sm">
                  <span className="bg-green-50 text-green-700 border border-green-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold dark:bg-green-950/40 dark:text-green-300 dark:border-green-800">
                    ✔️ {l3Score.correct}
                  </span>
                  <span className="bg-red-50 text-red-700 border border-red-200/50 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold dark:bg-red-950/40 dark:text-red-300 dark:border-red-800">
                    ❌ {l3Score.incorrect}
                  </span>
                </div>
              </div>

              {!l3Completed && l3Items.length > 0 && (
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden dark:bg-slate-700">
                  <div
                    className="bg-acento-500 h-full transition-all duration-300"
                    style={{ width: `${((l3CurrentIdx) / l3Items.length) * 100}%` }}
                  />
                </div>
              )}

              {/* LEVEL 3 ACTIVE GAMEPLAY BOARD */}
              {!l3Completed && l3Items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left explanation card with chemistry summary */}
                  <div className="md:col-span-4 bg-white rounded-3xl border border-slate-100 shadow p-5 flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800">
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-acento-700 bg-acento-50 px-2.5 py-1 rounded-full uppercase tracking-wider dark:text-acento-300 dark:bg-acento-950/40">
                        Esquema Químico
                      </span>
                      <h4 className="text-base font-display font-bold text-slate-800 dark:text-slate-100">
                        Clasificación Química
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans dark:text-slate-400">
                        La materia se clasifica químicamente en sustancias puras y mezclas:
                      </p>

                      <div className="space-y-1.5 pt-1 text-[11px] leading-relaxed">
                        <div className="p-1 px-2.5 bg-slate-50 rounded border-l-2 border-amber-400 font-sans dark:bg-slate-800/50">
                          <strong>Elemento:</strong> Átomos iguales. No se descompone más (ej. Oro, Oxígeno).
                        </div>
                        <div className="p-1 px-2.5 bg-slate-50 rounded border-l-2 border-sky-400 font-sans dark:bg-slate-800/50">
                          <strong>Compuesto:</strong> Átomos distintos unidos químicamente en proporción constante (ej. Agua H₂O).
                        </div>
                        <div className="p-1 px-2.5 bg-slate-50 rounded border-l-2 border-teal-400 font-sans dark:bg-slate-800/50">
                          <strong>Mezcla Homogénea:</strong> Mezclado perfectamente. Solo se ve una fase (ej. Aire, Agua con sal disuelta).
                        </div>
                        <div className="p-1 px-2.5 bg-slate-50 rounded border-l-2 border-violet-400 font-sans dark:bg-slate-800/50">
                          <strong>Mezcla Heterogénea:</strong> Componentes evidentes a simple vista (ej. Agua y aceite, Ensalada).
                        </div>
                      </div>
                    </div>

                    <button
                      id="l3-hint-toggle-btn"
                      onClick={() => { setL3ShowHint(prev => !prev); triggerSound('star'); }}
                      className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 font-display text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 focus:outline-none dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100 dark:border-slate-800"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> {l3ShowHint ? 'Ocultar pista' : 'Ver pista científica'}
                    </button>
                  </div>

                  {/* Right main card displaying elements in level 3 */}
                  <div className="md:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-md p-6 flex flex-col justify-between space-y-6 dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex flex-col items-center justify-center py-4 space-y-4">
                      
                      <motion.div
                        key={l3CurrentIdx}
                        initial={{ scale: 0.94, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.94, opacity: 0 }}
                        className={`w-40 h-40 rounded-3xl ${l3Items[l3CurrentIdx].color} border-2 flex flex-col items-center justify-center p-5 text-center shadow-sm select-none`}
                      >
                        <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur flex items-center justify-center shadow-inner mb-3 dark:bg-slate-900">
                          <LucideIcon name={l3Items[l3CurrentIdx].icon} className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-display font-extrabold tracking-tight">
                          {l3Items[l3CurrentIdx].name}
                        </span>
                      </motion.div>

                      {/* Display level 3 hint */}
                      <AnimatePresence>
                        {l3ShowHint && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-acento-50 text-acento-950 border border-acento-100 p-3 rounded-xl text-xs text-center font-sans w-full max-w-sm shadow-inner dark:bg-acento-950/40 dark:text-acento-100 dark:border-acento-900"
                          >
                            <strong>Clave:</strong> {l3Items[l3CurrentIdx].hint}
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Explanatory feedback modal for Level 3 */}
                    <AnimatePresence>
                      {l3ShowFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3.5 rounded-xl border flex flex-col items-center text-center space-y-1.5 text-xs ${
                            l3LastAnswerCorrect ? 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950/40 dark:text-green-100 dark:border-green-800' : 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-100 dark:border-red-800'
                          }`}
                        >
                          <span className="font-display font-semibold text-xs flex items-center gap-1.5">
                            {l3LastAnswerCorrect ? (
                              <span className="text-green-700 dark:text-green-300">✔️ ¡Excelente deducción científica!</span>
                            ) : (
                              <span className="text-red-700 dark:text-red-300">✖️ ¡Incorrecto! Sigue aprendiendo</span>
                            )}
                          </span>
                          <p className="font-sans leading-relaxed text-slate-600 dark:text-slate-300">
                            {l3FeedbackMsg}
                          </p>
                          <button
                            id="l3-continue-btn"
                            onClick={handleL3Next}
                            className="px-4 py-1.5 bg-acento-600 hover:bg-acento-700 text-white font-display text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            Siguiente <ArrowRight className="w-3" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 4 buttons choices: Elemento, Compuesto, Mezcla Homogénea, Mezcla Heterogénea */}
                    {!l3ShowFeedback && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          id="btn-l3-elem"
                          onClick={() => handleL3Classification('elemento')}
                          className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 dark:bg-amber-900/40 dark:hover:bg-amber-900/70 dark:text-amber-100 dark:border-amber-700 py-3 px-3 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          ⚛️ Elemento
                        </button>
                        <button
                          id="btn-l3-comp"
                          onClick={() => handleL3Classification('compuesto')}
                          className="bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 dark:bg-sky-900/40 dark:hover:bg-sky-900/70 dark:text-sky-100 dark:border-sky-700 py-3 px-3 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          🧬 Compuesto
                        </button>
                        <button
                          id="btn-l3-homo"
                          onClick={() => handleL3Classification('homogenea')}
                          className="bg-teal-100 hover:bg-teal-200 text-teal-900 border border-teal-300 dark:bg-teal-900/40 dark:hover:bg-teal-900/70 dark:text-teal-100 dark:border-teal-700 py-3 px-3 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          ⚗️ Mezcla Homogénea
                        </button>
                        <button
                          id="btn-l3-hetero"
                          onClick={() => handleL3Classification('heterogenea')}
                          className="bg-violet-100 hover:bg-violet-200 text-violet-900 border border-violet-300 dark:bg-violet-900/40 dark:hover:bg-violet-900/70 dark:text-violet-100 dark:border-violet-700 py-3 px-3 active:scale-95 font-display font-bold rounded-xl transition-all shadow-xs text-xs md:text-sm cursor-pointer"
                        >
                          🏺 Mezcla Heterogénea
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* LEVEL 3 COMPLETED SUMMARY */}
              {l3Completed && (
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg text-center space-y-6 max-w-md mx-auto relative overflow-hidden dark:bg-slate-900 dark:border-slate-800">
                  <Confetti />
                  <div className="w-16 h-16 bg-acento-100 text-acento-500 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm animate-bounce dark:bg-acento-900/40">
                    🎓
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-100">
                      ¡Nivel 3 Superado!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto dark:text-slate-400">
                      ¡Un absoluto maestro de la química básica! Sabes clasificar compuestos, elementos puros y mezclas de forma asombrosa.
                    </p>
                  </div>

                  <div className="flex justify-center gap-2 text-2xl">
                    <span className="text-acento-400">⭐️</span>
                    <span className={`text-acento-400 ${l3Score.correct >= 9 ? 'opacity-100' : 'opacity-20'}`}>⭐️</span>
                    <span className={`text-acento-400 ${l3Score.correct >= 12 ? 'opacity-100' : 'opacity-20'}`}>⭐️</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2 max-w-xs mx-auto dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Aciertos:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{l3Score.correct}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fallos:</span>
                      <span className="font-bold text-red-600 dark:text-red-400">{l3Score.incorrect}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-800 dark:border-slate-800 dark:text-slate-100">
                      <span>Puntuación final:</span>
                      <span>{Math.round((l3Score.correct / l3Items.length) * 100)}%</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      id="retry-l3-btn"
                      onClick={() => {
                        initLevel3();
                        triggerSound('star');
                      }}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-medium rounded-xl transition-all border border-slate-200 text-xs cursor-pointer flex items-center justify-center gap-1 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-800"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Repetir
                    </button>
                    <button
                      id="l3-back-btn"
                      onClick={() => {
                        setView('menu');
                        triggerSound('star');
                      }}
                      className="flex-1 py-2.5 bg-acento-600 hover:bg-acento-700 text-white font-display font-bold rounded-xl transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Volver al Inicio
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ───────────────── FOOTER ───────────────── */}
      <PieFractalis pagina="proyectos/clasificador-materia/" curso="2eso" />
    </div>
  );
}
