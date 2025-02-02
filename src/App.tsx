import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, Trophy } from 'lucide-react';
import { QuizCard } from './components/QuizCard';
import { ResultsScreen } from './components/ResultsScreen';
import type { QuizQuestion, QuizState } from './types';

// Quiz data
const quizData: QuizQuestion[] = [
  {
    id: 3342,
    question: "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is :",
    options: ["5'UUUU3'", "3'UUUU5'", "5'AAAU3'", "3'AAAU5'"],
    correctAnswer: 2,
    points: 4,
  },
  {
    id: 3315,
    question: "Avery, MacLeod and Mc Carty used the S(virulent) and R (avirulent) strains of streptococcus pneumoniae. They isolated and purified protein, DNA, RNA from the bacteria and treated them with related enzymes. They concluded that :",
    options: ["DNA was transforming agent", "RNA was transforming agent", "Protein was transforming agent", "All are correct"],
    correctAnswer: 0,
    points: 4,
  },
  {
    id: 3381,
    question: "Identify the characteristic which is not applicable to the genetic code:",
    options: ["Non-Polar", "Non-Overlapping", "Commaless", "Universal"],
    correctAnswer: 0,
    points: 4,
  },
  {
    id: 3295,
    question: "Ribose is differentiable from deoxyribose in having :",
    options: ["Two extra oxygen", "No oxygen", "Hydroxyl group at 2nd carbon", "One extra hydrogen"],
    correctAnswer: 2,
    points: 4,
  },
  {
    id: 3356,
    question: "A DNA strand is directly involved in the synthesis of all the following except:",
    options: ["Another DNA", "t-RNA & m-RNA", "r-RNA", "Protein"],
    correctAnswer: 3,
    points: 4,
  },
  {
    id: 3343,
    question: "The genes are responsible for growth and differentiation in an organism through regulation of :",
    options: ["Translocation", "Transformation", "Transduction and translation", "Translation and transcription"],
    correctAnswer: 3,
    points: 4,
  },
  {
    id: 3316,
    question: "Genetic information is carried out by long chain molecule made up of :",
    options: ["Amino acids", "Enzymes", "Nucleotides", "Histone proteins"],
    correctAnswer: 2,
    points: 4,
  },
  {
    id: 3376,
    question: "Anticodons are found in:",
    options: ["mRNA", "tRNA", "rRNA", "In all"],
    correctAnswer: 1,
    points: 4,
  },
  {
    id: 3302,
    question: "Which of the following element is not found in nitrogenous base :",
    options: ["Nitrogen", "Hydrogen", "Carbon", "Phosphorus"],
    correctAnswer: 3,
    points: 4,
  },
  {
    id: 3378,
    question: "Transfer of genetic information from a polymer of nucleotides to a polymer of amino acids is:",
    options: ["Replication", "Transcription", "Translation", "Reverse transcription"],
    correctAnswer: 2,
    points: 4,
  }
];

function App() {
  const [gameState, setGameState] = useState<QuizState>({
    currentQuestion: -1,
    score: 0,
    answers: [],
    isComplete: false,
    streak: 0,
    powerUps: {
      fiftyFifty: 2,
      timeFreeze: 2,
    },
  });
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);

  const startQuiz = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestion: 0,
      score: 0,
      answers: [],
      isComplete: false,
      streak: 0,
      powerUps: { fiftyFifty: 2, timeFreeze: 2 },
    }));
    setDisabledOptions([]);
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQ = quizData[gameState.currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    let pointsEarned = currentQ.points;

    // Apply streak bonus
    if (isCorrect) {
      const streakBonus = Math.floor(gameState.streak / 3) * 50;
      pointsEarned += streakBonus;
    }

    setGameState(prev => ({
      ...prev,
      score: prev.score + (isCorrect ? pointsEarned : 0),
      streak: isCorrect ? prev.streak + 1 : 0,
      answers: [...prev.answers, answerIndex],
      currentQuestion: prev.currentQuestion + 1,
      isComplete: prev.currentQuestion + 1 >= quizData.length,
    }));
  };

  const handlePowerUp = (type: 'fiftyFifty' | 'timeFreeze') => {
    if (type === 'fiftyFifty' && gameState.powerUps.fiftyFifty > 0) {
      const currentQ = quizData[gameState.currentQuestion];
      const wrongAnswers = currentQ.options
        .map((_, index) => index)
        .filter(index => index !== currentQ.correctAnswer);
      
      // Randomly select two wrong answers to disable
      const shuffled = wrongAnswers.sort(() => 0.5 - Math.random());
      const toDisable = shuffled.slice(0, 2);
      
      setDisabledOptions(toDisable);
      setGameState(prev => ({
        ...prev,
        powerUps: {
          ...prev.powerUps,
          fiftyFifty: prev.powerUps.fiftyFifty - 1,
        },
      }));
    }
    
    if (type === 'timeFreeze' && gameState.powerUps.timeFreeze > 0) {
      setGameState(prev => ({
        ...prev,
        powerUps: {
          ...prev.powerUps,
          timeFreeze: prev.powerUps.timeFreeze - 1,
        },
      }));
      // Implement timer freeze logic here
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-purple-100 to-pink-100 p-6 relative overflow-hidden">
      {/* Floating DNA animations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
              opacity: 0 
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360,
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          >
            <div className="text-purple-300/30 text-4xl">🧬</div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {gameState.currentQuestion === -1 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 0.98, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-8"
            >
              <Brain className="w-24 h-24 text-purple-600 mx-auto" />
            </motion.div>
            
            <motion.h1 
              className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text mb-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Genetics Quiz Challenge
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Test your knowledge of genetics and molecular biology!
            </motion.p>

            <motion.button
              onClick={startQuiz}
              className="group relative px-8 py-4 text-xl font-semibold rounded-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x" />
              <span className="relative text-white flex items-center gap-2">
                Start Quiz
                <Sparkles className="w-5 h-5 animate-pulse" />
              </span>
            </motion.button>

            {/* Achievement badges */}
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {['Master of DNA', 'Gene Genius', 'Evolution Expert'].map((title, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                >
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">{title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : gameState.isComplete ? (
          <ResultsScreen
            score={gameState.score}
            totalQuestions={quizData.length}
            maxScore={quizData.reduce((acc, q) => acc + q.points, 0)}
            onRestart={startQuiz}
          />
        ) : (
          <AnimatePresence mode="wait">
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
              <div className="w-full">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-600 font-medium flex items-center justify-center gap-2">
                    <span>Question {gameState.currentQuestion + 1} of {quizData.length}</span>
                    {gameState.streak > 0 && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                        <Zap className="w-4 h-4" />
                        {gameState.streak} Streak!
                      </span>
                    )}
                  </p>
                </motion.div>
                <QuizCard
                  question={quizData[gameState.currentQuestion]}
                  onAnswer={handleAnswer}
                  currentStreak={gameState.streak}
                  onUsePowerUp={handlePowerUp}
                  powerUps={gameState.powerUps}
                  disabledOptions={disabledOptions}
                />
              </div>
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default App;