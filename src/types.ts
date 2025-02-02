export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: number[];
  isComplete: boolean;
  streak: number;
  powerUps: {
    fiftyFifty: number;
    timeFreeze: number;
  };
}