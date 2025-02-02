import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Sparkles, ArrowRight, Brain } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  maxScore: number;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  maxScore,
  onRestart,
}) => {
  const percentage = (score / maxScore) * 100;
  const medals = [
    { min: 90, icon: Trophy, color: 'text-yellow-500', text: 'Gold Medal', bg: 'bg-yellow-100' },
    { min: 75, icon: Star, color: 'text-gray-400', text: 'Silver Medal', bg: 'bg-gray-100' },
    { min: 60, icon: Award, color: 'text-amber-600', text: 'Bronze Medal', bg: 'bg-amber-100' },
  ];

  const earnedMedal = medals.find(medal => percentage >= medal.min);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-purple-100"
        whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
      >
        <div className="mb-8">
          {earnedMedal ? (
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                duration: 1.5,
                bounce: 0.5
              }}
              className="relative inline-block"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className={`p-6 rounded-full ${earnedMedal.bg}`}
              >
                <earnedMedal.icon className={`w-24 h-24 ${earnedMedal.color}`} />
              </motion.div>
              <motion.div
                animate={{ scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-6 bg-purple-100 rounded-full"
            >
              <Brain className="w-24 h-24 text-purple-500" />
            </motion.div>
          )}
        </div>

        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Quiz Complete!
        </motion.h1>
        
        {earnedMedal && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xl ${earnedMedal.color} font-semibold mb-6`}
          >
            You earned a {earnedMedal.text}!
          </motion.p>
        )}

        <div className="space-y-4 mb-8">
          <motion.p 
            className="text-2xl font-semibold text-gray-700"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Score: {score} / {maxScore}
          </motion.p>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            />
          </div>

          <motion.p 
            className="text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            You answered {Math.round((score / maxScore) * totalQuestions)} out of {totalQuestions} questions correctly
          </motion.p>
        </div>

        <motion.button
          onClick={onRestart}
          className="group relative px-8 py-3 rounded-xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x" />
          <span className="relative text-white flex items-center gap-2 font-semibold">
            Play Again
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};