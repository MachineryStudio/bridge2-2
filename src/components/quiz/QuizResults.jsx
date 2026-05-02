import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Coins, Flame, RotateCcw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function QuizResults({ result, onPlayAgain }) {
  const { correct, wrong, total, bestStreak, perfect } = result;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const xpEarned = correct * 10 + (perfect ? 50 : 0);
  const coinsEarned = correct * 2 + (perfect ? 20 : 0);

  const grade =
    accuracy >= 90 ? { label: 'S', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' } :
    accuracy >= 75 ? { label: 'A', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' } :
    accuracy >= 60 ? { label: 'B', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' } :
    accuracy >= 40 ? { label: 'C', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/30' } :
    { label: 'D', color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-block"
        >
          <Trophy className="w-16 h-16 text-primary mx-auto mb-3" />
        </motion.div>
        <h2 className="font-jp text-2xl font-bold text-primary">結果発表</h2>
        <p className="text-muted-foreground text-sm mt-1">Quiz Complete!</p>
      </div>

      {/* Grade + accuracy */}
      <Card className={`p-6 border text-center ${grade.bg}`}>
        <div className={`text-7xl font-black ${grade.color} mb-2`}>{grade.label}</div>
        <div className="text-3xl font-bold text-foreground">{accuracy}%</div>
        <div className="text-muted-foreground text-sm mt-1">accuracy</div>
        {perfect && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center justify-center gap-1 text-yellow-400 font-bold text-sm"
          >
            <Star className="w-4 h-4" /> Perfect Score!
          </motion.div>
        )}
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Correct', value: correct, color: 'text-emerald-400' },
          { label: 'Wrong', value: wrong, color: 'text-destructive' },
          { label: 'Total', value: total, color: 'text-foreground' },
          { label: 'Best Streak', value: bestStreak, color: 'text-orange-400', icon: Flame },
        ].map(stat => (
          <Card key={stat.label} className="p-4 bg-card border-border/50 text-center">
            {stat.icon && <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />}
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Rewards */}
      <Card className="p-5 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Rewards Earned</h3>
        <div className="flex items-center justify-around">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Zap className="w-5 h-5 text-accent-foreground" />
            <span className="text-2xl font-bold text-foreground">+{xpEarned}</span>
            <span className="text-sm text-muted-foreground">XP</span>
          </motion.div>
          <div className="w-px h-8 bg-border/50" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold text-foreground">+{coinsEarned}</span>
            <span className="text-sm text-muted-foreground">Coins</span>
          </motion.div>
        </div>
      </Card>

      <Button
        className="w-full bg-primary text-primary-foreground py-5"
        onClick={onPlayAgain}
      >
        <RotateCcw className="w-4 h-4 mr-2" /> Play Again
      </Button>
    </motion.div>
  );
}