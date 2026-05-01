import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { speakJapanese } from '@/lib/speechUtils';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import SpeakButton from '@/components/shared/SpeakButton';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const formKeys = ['present', 'past', 'negative', 'te_form', 'potential', 'volitional'];

export default function ConjugationQuiz({ verbs, onComplete }) {
  const { t } = useLang();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateQuestions = useCallback(() => {
    const qs = [];
    const shuffled = shuffleArray(verbs).slice(0, 10);
    shuffled.forEach(verb => {
      const availableForms = formKeys.filter(f => verb.forms?.[f]);
      if (availableForms.length === 0) return;
      const form = availableForms[Math.floor(Math.random() * availableForms.length)];
      const correctAnswer = verb.forms[form];
      
      const wrongAnswers = verbs
        .filter(v => v.id !== verb.id && v.forms?.[form])
        .map(v => v.forms[form])
        .slice(0, 3);
      
      if (wrongAnswers.length < 2) return;
      
      const options = shuffleArray([correctAnswer, ...wrongAnswers.slice(0, 3)]);
      qs.push({ verb, form, correctAnswer, options });
    });
    return qs;
  }, [verbs]);

  const startGame = () => {
    setQuestions(generateQuestions());
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    if (verbs.length > 0) startGame();
  }, [verbs]);

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    const isCorrect = option === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
      speakJapanese(option);
    }

    setTimeout(() => {
      if (currentIdx + 1 >= questions.length) {
        setGameOver(true);
        onComplete?.({ score: isCorrect ? score + 1 : score, total: questions.length });
      } else {
        setCurrentIdx(i => i + 1);
        setSelected(null);
      }
    }, 1200);
  };

  if (gameOver) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-jp text-2xl font-bold text-primary mb-2">結果</h3>
        <p className="text-3xl font-bold text-foreground">{score}/{questions.length}</p>
        <p className="text-muted-foreground mt-1">{Math.round((score / questions.length) * 100)}%</p>
        <Button onClick={startGame} className="mt-6 bg-primary text-primary-foreground">
          <RotateCcw className="w-4 h-4 mr-2" /> {t('play')}
        </Button>
      </motion.div>
    );
  }

  const q = questions[currentIdx];
  if (!q) return null;

  const formLabel = {
    present: 'present', past: 'past', negative: 'negative',
    te_form: 'teForm', potential: 'potential', volitional: 'volitional'
  }[q.form] || q.form;

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        <span className="text-primary font-bold">{score} {t('correct').replace('!', '')}</span>
      </div>

      <Card className="p-6 bg-card border-border/50 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="font-jp text-3xl font-bold">{q.verb.dictionary}</h2>
          <SpeakButton text={q.verb.dictionary} />
        </div>
        <p className="text-sm text-muted-foreground">{q.verb.meaning_en}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <ArrowRight className="w-4 h-4 text-primary" />
          <span className="text-primary font-bold">{t(formLabel)}</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence>
          {q.options.map((option, i) => {
            const isCorrect = option === q.correctAnswer;
            const isSelected = selected === option;
            let variant = 'outline';
            let extra = 'bg-secondary/50 border-border/50 hover:border-primary/30';
            if (selected !== null) {
              if (isCorrect) extra = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
              else if (isSelected) extra = 'bg-destructive/20 border-destructive/50 text-destructive';
            }

            return (
              <motion.div
                key={`${option}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Button
                  variant={variant}
                  className={`w-full justify-start font-jp text-lg py-6 ${extra}`}
                  onClick={() => handleSelect(option)}
                  disabled={selected !== null}
                >
                  {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 mr-2" />}
                  {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 mr-2" />}
                  {option}
                </Button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}