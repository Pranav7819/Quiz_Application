import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Timer, Zap, SplitSquareHorizontal, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (index: number) => void;
  currentStreak: number;
  onUsePowerUp: (type: 'fiftyFifty' | 'timeFreeze') => void;
  powerUps: { fiftyFifty: number; timeFreeze: number };
  disabledOptions: number[];
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  currentStreak,
  onUsePowerUp,
  powerUps,
  disabledOptions,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100"
        whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full"
              animate={{
                scale: currentStreak > 0 ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Streak: {currentStreak}</span>
            </motion.div>
          </div>
          <div className="flex space-x-3">
            <motion.button
              onClick={() => onUsePowerUp('fiftyFifty')}
              disabled={powerUps.fiftyFifty === 0}
              className={`relative p-3 rounded-lg ${
                powerUps.fiftyFifty > 0 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' 
                  : 'bg-gray-100 text-gray-400'
              } transition-all`}
              whileHover={{ scale: powerUps.fiftyFifty > 0 ? 1.05 : 1 }}
              whileTap={{ scale: powerUps.fiftyFifty > 0 ? 0.95 : 1 }}
            >
              <SplitSquareHorizontal className="w-5 h-5" />
              <motion.span 
                className="absolute -top-2 -right-2 bg-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-purple-600 border-2 border-purple-200"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                {powerUps.fiftyFifty}
              </motion.span>
            </motion.button>
            <motion.button
              onClick={() => onUsePowerUp('timeFreeze')}
              disabled={powerUps.timeFreeze === 0}
              className={`relative p-3 rounded-lg ${
                powerUps.timeFreeze > 0 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600' 
                  : 'bg-gray-100 text-gray-400'
              } transition-all`}
              whileHover={{ scale: powerUps.timeFreeze > 0 ? 1.05 : 1 }}
              whileTap={{ scale: powerUps.timeFreeze > 0 ? 0.95 : 1 }}
            >
              <Timer className="w-5 h-5" />
              <motion.span 
                className="absolute -top-2 -right-2 bg-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-purple-600 border-2 border-purple-200"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                {powerUps.timeFreeze}
              </motion.span>
            </motion.button>
          </div>
        </div>

        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {question.question}
        </motion.h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: disabledOptions.includes(index) ? 1 : 1.02 }}
              whileTap={{ scale: disabledOptions.includes(index) ? 1 : 0.98 }}
              disabled={disabledOptions.includes(index)}
              onClick={() => onAnswer(index)}
              className={`group relative p-4 text-left rounded-xl border-2 transition-all overflow-hidden ${
                disabledOptions.includes(index)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'hover:border-purple-500 border-purple-200 hover:bg-purple-50'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                animate={disabledOptions.includes(index) ? { opacity: 0 } : {}}
              />
              <span className="relative font-medium flex items-center gap-2">
                {option}
                {!disabledOptions.includes(index) && (
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                )}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="mt-6 text-sm text-gray-500 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>Points: {question.points}</span>
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>Bonus points for streaks!</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};