import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Timer, Trophy, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizSetup from '@/components/quiz/QuizSetup';
import QuizSession from '@/components/quiz/QuizSession';
import QuizResults from '@/components/quiz/QuizResults';
import { verbData } from '@/lib/verbData';

export default function TimedQuiz() {
  const queryClient = useQueryClient();
  const [phase, setPhase] = useState('setup'); // setup | playing | results
  const [quizConfig, setQuizConfig] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const { data: verbs = [] } = useQuery({
    queryKey: ['verbs'],
    queryFn: async () => {
      const data = await base44.entities.Verb.list('-created_date', 500);
      return data.length > 0 ? data : verbData;
    },
    initialData: [],
  });

  const { data: progressList = [] } = useQuery({
    queryKey: ['playerProgress'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return base44.entities.PlayerProgress.filter({ created_by: user.email });
    },
    initialData: [],
  });

  const playerStats = progressList[0] || null;

  const handleStart = (config) => {
    setQuizConfig(config);
    setPhase('playing');
  };

  const handleFinish = async (result) => {
    setQuizResult(result);
    setPhase('results');

    // Award XP + coins
    const xpEarned = result.correct * 10 + (result.perfect ? 50 : 0);
    const coinsEarned = result.correct * 2 + (result.perfect ? 20 : 0);

    const user = await base44.auth.me();
    if (playerStats?.id) {
      await base44.entities.PlayerProgress.update(playerStats.id, {
        xp: (playerStats.xp || 0) + xpEarned,
        coins: (playerStats.coins || 0) + coinsEarned,
        games_played: (playerStats.games_played || 0) + 1,
        best_streak: Math.max(playerStats.best_streak || 0, result.bestStreak || 0),
      });
    } else {
      await base44.entities.PlayerProgress.create({
        player_name: user.full_name || user.email,
        xp: xpEarned,
        coins: coinsEarned,
        games_played: 1,
      });
    }
    queryClient.invalidateQueries({ queryKey: ['playerProgress'] });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Timer className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Timed Quiz</h1>
        </div>
        <p className="text-muted-foreground text-sm">Test your conjugation mastery under pressure</p>

        {playerStats && (
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1 text-primary font-bold">
              <Zap className="w-3.5 h-3.5" /> {playerStats.xp || 0} XP
            </span>
            <span className="flex items-center gap-1 text-yellow-400 font-bold">
              <Trophy className="w-3.5 h-3.5" /> {playerStats.coins || 0} coins
            </span>
          </div>
        )}
      </motion.div>

      {phase === 'setup' && <QuizSetup onStart={handleStart} />}
      {phase === 'playing' && quizConfig && (
        <QuizSession verbs={verbs} config={quizConfig} onFinish={handleFinish} />
      )}
      {phase === 'results' && quizResult && (
        <QuizResults
          result={quizResult}
          onPlayAgain={() => setPhase('setup')}
        />
      )}
    </div>
  );
}