import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { speakJapanese } from '@/lib/speechUtils';
import { Timer, Zap, Trophy, RotateCcw, Flame } from 'lucide-react';
import SpeakButton from '@/components/shared/SpeakButton';

const formKeys = ['present', 'past', 'negative', 'te_form', 'present_polite', 'past_polite'];

export default function TypingAttackGame({ verbs, onComplete }) {
  const { t } = useLang();
  const [currentVerb, setCurrentVerb] = useState(null);
  const [targetForm, setTargetForm] = useState('');
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);
  const [totalRounds] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const nextQuestion = useCallback(() => {
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const availableForms = formKeys.filter(f => verb.forms?.[f]);
    const form = availableForms[Math.floor(Math.random() * availableForms.length)];
    setCurrentVerb(verb);
    setTargetForm(form);
    setAnswer('');
    setTimeLeft(15);
    setFeedback(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [verbs]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setRound(0);
    setGameOver(false);
    setGameStarted(true);
    nextQuestion();
  };

  useEffect(() => {
    if (!gameStarted || gameOver || feedback) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameStarted, gameOver, feedback, round]);

  const handleAnswer = (timedOut = false) => {
    clearInterval(timerRef.current);
    const correct = currentVerb.forms[targetForm];
    const correctRomaji = currentVerb.forms_romaji?.[targetForm];
    const isCorrect = !timedOut && (
      answer.trim() === correct ||
      answer.trim().toLowerCase() === correctRomaji?.toLowerCase()
    );

    if (isCorrect) {
      const points = 10 + streak * 2;
      setScore(s => s + points);
      setStreak(s => s + 1);
      setFeedback({ correct: true, answer: correct });
      speakJapanese(correct);
    } else {
      setStreak(0);
      setFeedback({ correct: false, answer: correct });
    }

    const nextRound = round + 1;
    setRound(nextRound);

    setTimeout(() => {
      if (nextRound >= totalRounds) {
        setGameOver(true);
        onComplete?.({ score: isCorrect ? score + 10 + streak * 2 : score, rounds: totalRounds });
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && answer.trim()) handleAnswer();
  };

  if (!gameStarted) {
    return (
      <div className="text-center py-12">
        <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-jp text-2xl font-bold text-foreground mb-2">{t('typingGame')}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Type the correct conjugation form before time runs out! Answer in Japanese or romaji.
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground px-8">
          {t('play')}
        </Button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-jp text-2xl font-bold text-primary mb-1">ゲーム終了！</h3>
        <p className="text-3xl font-bold text-foreground">{score} pts</p>
        <Button onClick={startGame} className="mt-6 bg-primary text-primary-foreground">
          <RotateCcw className="w-4 h-4 mr-2" /> {t('play')}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Stats bar */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Round {round + 1}/{totalRounds}</span>
        <div className="flex items-center gap-4">
          <span className="text-primary font-bold">{score} pts</span>
          {streak > 1 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-orange-400"
            >
              <Flame className="w-4 h-4" /> {streak}x
            </motion.span>
          )}
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Timer className={`w-4 h-4 ${timeLeft <= 5 ? 'text-destructive' : 'text-muted-foreground'}`} />
        <Progress value={(timeLeft / 15) * 100} className="h-2" />
        <span className={`text-sm font-mono ${timeLeft <= 5 ? 'text-destructive font-bold' : 'text-muted-foreground'}`}>
          {timeLeft}s
        </span>
      </div>

      {/* Question */}
      {currentVerb && (
        <Card className="p-6 bg-card border-border/50 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="font-jp text-3xl font-bold text-foreground">{currentVerb.dictionary}</h2>
            <SpeakButton text={currentVerb.dictionary} />
          </div>
          <p className="text-sm text-muted-foreground mb-1">{currentVerb.meaning_en}</p>
          <p className="text-primary font-bold mt-3">
            → {t(formKeys.includes(targetForm) ? {
              present: 'present', past: 'past', negative: 'negative',
              te_form: 'teForm', present_polite: 'presentPolite', past_polite: 'pastPolite'
            }[targetForm] : targetForm)} ?
          </p>
        </Card>
      )}

      {/* Input */}
      <AnimatePresence mode="wait">
        {feedback ? (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center py-4 rounded-lg ${
              feedback.correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-destructive/20 text-destructive'
            }`}
          >
            <p className="font-bold">{feedback.correct ? t('correct') : t('tryAgain')}</p>
            <p className="font-jp text-lg mt-1">{feedback.answer}</p>
          </motion.div>
        ) : (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Input
              ref={inputRef}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type answer (日本語 or romaji)..."
              className="text-center text-lg font-jp bg-secondary border-border"
              autoComplete="off"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}