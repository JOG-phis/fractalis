import { useState, useEffect, DragEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Beaker, 
  Award, 
  Sparkles, 
  RefreshCw, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  CheckCircle2, 
  BookOpen, 
  Info, 
  Trophy, 
  Play, 
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Map,
  XCircle,
  HelpCircle,
  Mail,
  ExternalLink
} from "lucide-react";
import { EXERCISES, STEP_METADATA } from "./data";
import { ScientificStep, Exercise, UserProgress } from "./types";
import { CabeceraFractalis, IntroFractalis, PieFractalis } from "@fractalis";

// Fisher-Yates Shuffling helper with safety guarantee that output order is incorrect at start
const shuffleSteps = (steps: ScientificStep[]): ScientificStep[] => {
  let attempts = 0;
  while (attempts < 100) {
    const arr = [...steps];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const isInOrder = arr.every((step, index) => step.stepNumber === index + 1);
    if (!isInOrder) {
      return arr;
    }
    attempts++;
  }
  return [...steps];
};

export default function App() {
  // --- STATE ---
  const [progress, setProgress] = useState<UserProgress>({
    currentExerciseIndex: 0,
    completedExercises: [],
    score: 0,
    isFinished: false,
  });

  const [viewMode, setViewMode] = useState<"home" | "game" | "finished">("home");
  const [shuffledSteps, setShuffledSteps] = useState<ScientificStep[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [celebrationParticles, setCelebrationParticles] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);
  
  // Manual evaluation trigger states
  const [hasChecked, setHasChecked] = useState(false);
  const [evalResult, setEvalResult] = useState<{ isCorrect: boolean; matchedCount: number }>({
    isCorrect: false,
    matchedCount: 0
  });

  const currentExercise = EXERCISES[progress.currentExerciseIndex];

  // --- PERSISTENCE ---
  useEffect(() => {
    const cached = localStorage.getItem("scientific_method_progress");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Ensure initial fields exist
        setProgress({
          currentExerciseIndex: parsed.currentExerciseIndex ?? 0,
          completedExercises: parsed.completedExercises ?? [],
          score: parsed.score ?? 0,
          isFinished: parsed.isFinished ?? false,
        });
      } catch (err) {
        console.error("Error parsing stored progress:", err);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem("scientific_method_progress", JSON.stringify(newProgress));
  };

  // --- SHUFFLING TRIGGERS ---
  // Re-shuffle steps whenever the exercise changes
  useEffect(() => {
    if (currentExercise) {
      setShuffledSteps(shuffleSteps(currentExercise.steps));
      setHasChecked(false);
    }
  }, [progress.currentExerciseIndex]);

  const triggerSparkles = () => {
    // Colores de Fractalis: el del curso, el oro y el verde
    const colors = ["var(--fx-a-400)", "var(--fx-a-600)", "#fbbf24", "#4ade80"];
    const sparkles = Array.from({ length: 35 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100, // percentage horizontal
      y: 70 + Math.random() * 30, // baseline vertical
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 14 + 6,
    }));
    setCelebrationParticles(sparkles);
    // Clear particles after animation
    setTimeout(() => {
      setCelebrationParticles([]);
    }, 4000);
  };

  // --- REORDER HANDLERS (CLICK SWAPPING & DRAGGING) ---
  const moveUp = (idx: number) => {
    if (idx === 0 || (hasChecked && evalResult.isCorrect)) return;
    const items = [...shuffledSteps];
    const prev = items[idx - 1];
    items[idx - 1] = items[idx];
    items[idx] = prev;
    setShuffledSteps(items);
    // Reset checking validation when the user changes order again
    if (hasChecked) setHasChecked(false);
  };

  const moveDown = (idx: number) => {
    if (idx === shuffledSteps.length - 1 || (hasChecked && evalResult.isCorrect)) return;
    const items = [...shuffledSteps];
    const next = items[idx + 1];
    items[idx + 1] = items[idx];
    items[idx] = next;
    setShuffledSteps(items);
    if (hasChecked) setHasChecked(false);
  };

  const handleDragStart = (e: DragEvent, index: number) => {
    if (hasChecked && evalResult.isCorrect) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: DragEvent, targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex || (hasChecked && evalResult.isCorrect)) return;
    const items = [...shuffledSteps];
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(targetIndex, 0, draggedItem);
    setDraggedIndex(targetIndex);
    setShuffledSteps(items);
    if (hasChecked) setHasChecked(false);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // --- USER MANUAL CHECK ---
  const checkCurrentOrder = () => {
    const isNowCorrect = shuffledSteps.every((step, idx) => step.stepNumber === idx + 1);
    const correctCount = shuffledSteps.filter((step, idx) => step.stepNumber === idx + 1).length;

    setEvalResult({
      isCorrect: isNowCorrect,
      matchedCount: correctCount
    });
    setHasChecked(true);

    if (isNowCorrect) {
      // Award points safely
      const wasCompleted = progress.completedExercises.includes(currentExercise.id);
      let updatedCompleted = [...progress.completedExercises];
      if (!wasCompleted) {
        updatedCompleted.push(currentExercise.id);
      }
      
      const updatedProgress = {
        ...progress,
        completedExercises: updatedCompleted,
        score: updatedCompleted.length,
      };
      
      saveProgress(updatedProgress);
      triggerSparkles();
    }
  };

  // --- ACTIONS ---
  const handleNext = () => {
    setHasChecked(false);
    if (progress.currentExerciseIndex < EXERCISES.length - 1) {
      const nextIndex = progress.currentExerciseIndex + 1;
      saveProgress({
        ...progress,
        currentExerciseIndex: nextIndex,
      });
    } else {
      // Finished all exercises!
      setViewMode("finished");
    }
  };

  const startExercise = (idx: number) => {
    saveProgress({
      ...progress,
      currentExerciseIndex: idx,
    });
    setViewMode("game");
    setHasChecked(false);
  };

  const handleResetCurrent = () => {
    if (currentExercise) {
      setShuffledSteps(shuffleSteps(currentExercise.steps));
      setHasChecked(false);
    }
  };

  const handleRestartFull = () => {
    const rawProgress = {
      currentExerciseIndex: 0,
      completedExercises: [],
      score: 0,
      isFinished: false,
    };
    saveProgress(rawProgress);
    setViewMode("home");
    setHasChecked(false);
    if (EXERCISES[0]) {
      setShuffledSteps(shuffleSteps(EXERCISES[0].steps));
    }
  };

  return (
    <div className="text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 md:pb-6">
      {/* Floating Sparkles Canvas */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {celebrationParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, y: "100vh", x: `${particle.x}vw`, scale: 0 }}
            animate={{ 
              opacity: [1, 1, 0], 
              y: "-10vh", 
              x: `${particle.x + (Math.random() * 20 - 10)}vw`,
              scale: [0.5, 1.2, 0.4],
              rotate: 360 
            }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute rounded-full flex items-center justify-center font-bold"
            style={{ 
              color: particle.color, 
              fontSize: `${particle.size}px`,
              textShadow: "0 0 10px rgba(255,255,255,0.8)"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* HEADER BAR */}
      <CabeceraFractalis titulo="Ordena el método científico" subtitulo="Grandes descubrimientos de la historia de la ciencia" curso="2eso" tema="Tema 1">
        <span className="fx-dato" title="Progreso">{progress.score} / {EXERCISES.length} pts</span>
        {viewMode !== "home" && (
          <button className="fx-boton" onClick={() => setViewMode("home")} title="Volver al selector de descubrimientos">
            <Map /> <span>Selector</span>
          </button>
        )}
      </CabeceraFractalis>

      {/* CORE FRAME LAYOUT */}
      <main className="max-w-6xl mx-auto px-4 py-5 font-sans">
        <AnimatePresence mode="wait">
          
          {/* ==================== HOME SCREEN ==================== */}
          {viewMode === "home" && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Presentación (kit común de Fractalis) */}
              <IntroFractalis titulo="¿Puedes ordenar el método científico?" curso="2eso" className="max-w-4xl mx-auto">
                <p>
                  Los grandes avances de la ciencia no ocurrieron por casualidad: siguen un orden de razonamiento. Recompón los 5 pasos del método en 9 descubrimientos históricos.
                </p>
                <ol className="grid grid-cols-1 sm:grid-cols-5 gap-2 list-none p-0">
                  {Object.entries(STEP_METADATA).map(([stepKey, item]) => (
                    <li key={stepKey} className="flex sm:block items-center gap-3 sm:text-center sm:space-y-1.5">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-acento-600 text-white flex items-center justify-center font-bold text-sm sm:mx-auto">
                        {stepKey}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block leading-tight">
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ol>
              </IntroFractalis>

              {/* Instructions and Map Launcher Section */}
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="font-extrabold text-xs tracking-wider uppercase text-slate-400 tabular-nums">
                    Selecciona un Descubrimiento Científico para Ordenar
                  </h3>
                  <span className="text-xs text-acento-500 tabular-nums">
                    Completados: {progress.completedExercises.length} de {EXERCISES.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {EXERCISES.map((ex, idx) => {
                    const done = progress.completedExercises.includes(ex.id);
                    const isNextIndex = idx === progress.currentExerciseIndex;

                    return (
                      <button
                        key={ex.id}
                        onClick={() => startExercise(idx)}
                        className={`text-left p-4 rounded-2xl border transition-all text-sm relative group flex flex-col justify-between ${
                          done 
                            ? "bg-green-50/10 hover:bg-green-50/30 border-green-200 dark:border-green-900/60" 
                            : isNextIndex
                              ? "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border-acento-500 dark:border-acento-500 shadow-xs"
                              : "bg-white hover:bg-slate-50 border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-2xl">{ex.icon}</span>
                            {done ? (
                              <span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 tabular-nums font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3 text-green-500" /> ¡Completado!
                              </span>
                            ) : (
                              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 tabular-nums px-2 py-0.5 rounded-full">
                                Ejercicio {idx + 1}
                              </span>
                            )}
                          </div>
                          
                          <h4 className="font-bold text-slate-950 dark:text-white group-hover:text-acento-600 dark:group-hover:text-acento-400 transition-colors">
                            {ex.title}
                          </h4>
                          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {ex.subtitle}
                          </p>
                        </div>

                        <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 tabular-nums">
                          <span>Esfuerzo: 1 pt</span>
                          <span className="text-acento-500 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                            Entrar <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Reset Progress trigger at map footer */}
                <div className="pt-4 text-center">
                  <button
                    onClick={handleRestartFull}
                    className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reiniciar marcas de progreso de la clase
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==================== SCREEN: ACTIVE GAME WORKSPACE ==================== */}
          {viewMode === "game" && currentExercise && (
            <motion.div
              key="game-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto space-y-4"
            >
              
              {/* COMPACT ACTIVE MODULE HEADER (NO SIDEBARS, FULL HORIZONTAL ECOSYSTEM) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs relative overflow-hidden flex flex-col gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="text-4xl shrink-0 select-none">{currentExercise.icon}</div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                      {currentExercise.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      {currentExercise.subtitle}
                    </p>
                  </div>
                </div>

                {/* Linear Scientific Steps Scheme Guide: Clear, responsive, and wraps smoothly without overflowing */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10.5px] tabular-nums font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      Secuencia del Método Científico:
                    </span>
                    <span className="text-[10px] tabular-nums text-slate-400 dark:text-slate-400 hidden sm:inline">
                      (5 fases ordenadas)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
                    {Object.entries(STEP_METADATA).map(([numStr, stepVal]) => {
                      const stepNumInt = parseInt(numStr);
                      return (
                        <div 
                          key={numStr} 
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-semibold ${stepVal.bg} ${stepVal.border} shadow-2xs`}
                        >
                          <span className="w-4 h-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] tabular-nums font-bold text-slate-700 dark:text-slate-300 shrink-0">
                            {stepNumInt}
                          </span>
                          <span className="shrink-0 text-sm">{stepVal.icon}</span>
                          <span className="truncate text-slate-800 dark:text-slate-200 leading-tight">
                            {stepVal.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CARD DRILL-DOWN BLOCKS (5 CARDS REORDER POOL) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1 text-xs text-slate-400 tabular-nums uppercase">
                  <span>Lista Desordenada (Arrastra para recolocar en orden de 1 a 5)</span>
                  <span>Pasos 1...5</span>
                </div>

                <div className="space-y-2.5">
                  <AnimatePresence initial={false}>
                    {shuffledSteps.map((step, idx) => {
                      const stepNum = idx + 1;
                      const hasEvaluatedCorrect = step.stepNumber === stepNum;
                      
                      // Identify card styles depending on check evaluation status
                      let borderStyle = "border-slate-200 dark:border-slate-800 hover:border-acento-300 dark:hover:border-slate-700";
                      let bgStyle = "bg-white dark:bg-slate-900";
                      let indicatorBg = "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400";
                      
                      if (hasChecked) {
                        if (hasEvaluatedCorrect) {
                          borderStyle = "border-green-500 dark:border-green-600";
                          bgStyle = "bg-green-50/10 dark:bg-green-950/5";
                          indicatorBg = "bg-green-500 text-white";
                        } else {
                          borderStyle = "border-red-300 dark:border-red-900/80";
                          bgStyle = "bg-red-50/10 dark:bg-red-950/5";
                          indicatorBg = "bg-red-400 text-white";
                        }
                      } else if (draggedIndex === idx) {
                        borderStyle = "border-acento-500 bg-acento-50/10 opacity-50 scale-95";
                      }

                      const meta = STEP_METADATA[step.stepNumber as 1 | 2 | 3 | 4 | 5];

                      return (
                        <motion.div
                          key={step.id}
                          layout
                          draggable={!(hasChecked && evalResult.isCorrect)}
                          onDragStart={(e) => handleDragStart(e, idx)}
                          onDragOver={(e) => handleDragOver(e, idx)}
                          onDragEnter={(e) => handleDragEnter(e, idx)}
                          onDragEnd={handleDragEnd}
                          whileHover={(hasChecked && evalResult.isCorrect) ? {} : { scale: 1.006, zIndex: 5 }}
                          whileTap={(hasChecked && evalResult.isCorrect) ? {} : { scale: 0.994, cursor: "grabbing" }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`relative flex items-center justify-between gap-3 border-2 rounded-2xl p-3 sm:p-4 transition-all ${borderStyle} ${bgStyle} ${
                            (hasChecked && evalResult.isCorrect) ? "" : "cursor-grab"
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            {/* Sequence number holder */}
                            <div className="flex flex-col items-center justify-center shrink-0">
                              <span className="text-[9px] tabular-nums uppercase text-slate-400">Paso</span>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center tabular-nums font-black text-sm shadow-xs ${indicatorBg}`}>
                                {stepNum}
                              </div>
                            </div>

                            {/* Card text content */}
                            <div className="min-w-0 pr-1">
                              {/* If evaluated correct / incorrect, show the actual step moniker */}
                              {hasChecked && (
                                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r ${meta.color} text-white uppercase tracking-wider`}>
                                    <span>{meta.icon}</span>
                                    <span>{meta.name}</span>
                                  </span>

                                  {hasEvaluatedCorrect ? (
                                    <span className="inline-flex items-center gap-0.5 text-[9.5px] tabular-nums px-1.5 py-0.5 bg-green-100/60 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded">
                                      ✓ Correcto
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-0.5 text-[9.5px] tabular-nums px-1.5 py-0.5 bg-red-100/60 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded">
                                      ✗ Descolocado (es {meta.name})
                                    </span>
                                  )}
                                </div>
                              )}

                              <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                                {step.text}
                              </p>
                            </div>
                          </div>

                          {/* Swap utility handlers */}
                          <div className="flex flex-row sm:flex-col gap-0.5 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveUp(idx);
                              }}
                              disabled={idx === 0 || (hasChecked && evalResult.isCorrect)}
                              className={`p-1.5 rounded transition-colors ${
                                idx === 0 || (hasChecked && evalResult.isCorrect)
                                  ? "text-slate-200 dark:text-slate-800 cursor-not-allowed"
                                  : "text-slate-400 hover:text-acento-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                              title="Subir tarjeta"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveDown(idx);
                              }}
                              disabled={idx === shuffledSteps.length - 1 || (hasChecked && evalResult.isCorrect)}
                              className={`p-1.5 rounded transition-colors ${
                                idx === shuffledSteps.length - 1 || (hasChecked && evalResult.isCorrect)
                                  ? "text-slate-200 dark:text-slate-800 cursor-not-allowed"
                                  : "text-slate-400 hover:text-acento-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                              title="Bajar tarjeta"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* ACTION PANEL (CHECK, CORRECTION OR NEXT MODULE) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Feedback summary metadata */}
                  <div className="flex items-center gap-3">
                    {!hasChecked ? (
                      <>
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                          <HelpCircle className="w-5 h-5 text-acento-500 animate-pulse" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                            ¿Listo para entregar?
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Una vez creas tener el orden correcto de los {shuffledSteps.length} bloques, presiona Comprobar solución.
                          </p>
                        </div>
                      </>
                    ) : evalResult.isCorrect ? (
                      <>
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-950/60 rounded-full flex items-center justify-center shrink-0 glow-success">
                          <Check className="w-6 h-6 text-green-500 font-extrabold" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-extrabold text-lg text-green-500">
                            ¡CORRECTO!
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Secuencia del método científico validada con pleno éxito para este descubrimiento.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-950/60 rounded-full flex items-center justify-center shrink-0">
                          <XCircle className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-red-500">
                            Orden incorrecto ({evalResult.matchedCount} de 5 correctos)
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Revisa el orden sugerido de las tarjetas con la teoría y ajústalas para volver a intentar.
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {/* Reset State button */}
                    {!evalResult.isCorrect && (
                      <button
                        onClick={handleResetCurrent}
                        className="flex-1 sm:flex-initial text-xs border border-slate-200 hover:border-acento-200 dark:border-slate-800 dark:hover:border-slate-700 bg-white hover:bg-slate-50 dark:bg-slate-900 font-bold px-4 py-3 rounded-xl transition duration-150 flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Mezclar
                      </button>
                    )}

                    {/* Left Switch Buttons depending on evaluation outcome */}
                    {hasChecked ? (
                      evalResult.isCorrect ? (
                        <button
                          onClick={handleNext}
                          className="flex-1 sm:flex-initial bg-acento-600 hover:bg-acento-700 dark:bg-acento-500 dark:hover:bg-acento-600 text-white font-black text-xs px-5 py-3 rounded-xl transition duration-150 shadow-md flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-acento-400 focus:ring-offset-2 animate-bounce"
                        >
                          {progress.currentExerciseIndex < EXERCISES.length - 1 ? (
                            <>
                              <span>Siguiente Descubrimiento</span>
                              <ChevronRight className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <span>Ver Calificación Final</span>
                              <Award className="w-4 h-4 text-amber-300 animate-pulse" />
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => setHasChecked(false)}
                          className="flex-1 sm:flex-initial bg-acento-600 hover:bg-acento-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition duration-150"
                        >
                          Seguir Intentando
                        </button>
                      )
                    ) : (
                      <button
                        onClick={checkCurrentOrder}
                        className="flex-1 sm:flex-initial bg-acento-600 hover:bg-acento-700 text-white font-black text-xs px-5 py-3 rounded-xl transition duration-155 shadow-xs"
                      >
                        Comprobar solución
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* QUICK DISCOVERY CARD NAVIGATOR FOOTER */}
              <div className="flex justify-between items-center px-1 text-xs text-slate-400 dark:text-slate-500">
                <button 
                  onClick={() => setViewMode("home")}
                  className="hover:text-acento-500 flex items-center gap-1.5 transition-colors"
                >
                  <Map className="w-3.5 h-3.5" /> Volver al selector de descubrimientos
                </button>
                <span>Descubrimiento {progress.currentExerciseIndex + 1} de 9</span>
              </div>

            </motion.div>
          )}

          {/* ==================== SCHEMATIC FINISHED VIEW ==================== */}
          {viewMode === "finished" && (
            <motion.div
              key="finished-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-xl"
            >
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/40 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-amber-400">
                <Trophy className="w-10 h-10 text-amber-500 animate-pulse" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
                ¡Enhorabuena, Joven Científico!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-3 max-w-lg mx-auto">
                Has ordenado correctamente las etapas del método científico para los {EXERCISES.length} descubrimientos cruciales de la historia.
              </p>

              {/* Progress Summary Statistics Card */}
              <div className="grid grid-cols-3 gap-3 my-8 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums text-acento-600 dark:text-acento-400">9 / 9</div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Ejercicios</p>
                </div>
                <div className="text-center border-x border-slate-200 dark:border-slate-800">
                  <div className="text-2xl font-bold tabular-nums text-green-500">100%</div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Precisión</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold tabular-nums text-acento-500">9 Puntos</div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Calificación</p>
                </div>
              </div>

              {/* Verified Certificate Section */}
              <div className="border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6 text-left mb-8 relative overflow-hidden">
                <div className="absolute right-4 top-4 text-green-500 opacity-20">
                  <Award className="w-20 h-20" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider tabular-nums">Diploma de Competencia</h3>
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">Metodología Científica Aplicada</h4>
                <p className="text-xs text-slate-500 mt-2 max-w-sm">
                  Otorgado a todo estudiante que demuestre conocer la secuencia de:
                </p>
                <div className="flex flex-wrap gap-2 mt-3 text-[11px] tabular-nums text-slate-600 dark:text-slate-300">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">1. Observación</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">2. Hipótesis</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">3. Experimentación</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">4. Análisis</span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">5. Comunicación</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRestartFull}
                  className="bg-acento-600 hover:bg-acento-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Volver a Empezar
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER METADATA OUTCOMES */}
      <PieFractalis pagina="proyectos/ordena-metodo-cientifico/" curso="2eso" />
    </div>
  );
}
