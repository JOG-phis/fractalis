export interface ScientificStep {
  id: string;
  stepNumber: number; // 1 to 5
  stepName: "Observación" | "Hipótesis" | "Experimentación" | "Análisis de resultados" | "Comunicación";
  text: string;
}

export interface Exercise {
  id: number;
  title: string;
  subtitle: string;
  icon: string; // Emoji character for visual identity
  steps: ScientificStep[];
}

export interface UserProgress {
  currentExerciseIndex: number;
  completedExercises: number[]; // Array of exercise IDs completed
  score: number; // Current points
  isFinished: boolean;
}
