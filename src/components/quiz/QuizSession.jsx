import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Flame, Timer } from 'lucide-react';
import SpeakButton from '@/components/shared/SpeakButton';
import { speakJapanese } from '@/lib/speechUtils';

const FORM_KEYS = ['present', 'past', 'negative', 'te_form', 'potential', 'volitional', 'present_polite', 'past_polite'];
const FORM_LABELS = {
  present: 'Present (plain)', past: 'Past (plain)', negative: 'Negative',
  te_form: 'Te-form', potential: 'Potential', volitional: 'Volitional',
  present_polite: 'Present (polite)', past_polite: 'Past (polite)',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(verb, allVerbs, type) {
  if (type === 'meaning') {
    const correct = verb.meaning_en;
    const distractors = shuffle(allVerbs.filter(v => v.id !== verb.id)).slice(0, 3).map(v => v.meaning_en);
    return {
      type: 'meaning',
      prompt: verb.dictionary,
      promptSub: verb.hiragana,
      question: 'What does this verb mean?',
      correct,
      options: shuffle([correct, ...distractors]),
    };
  } else {
    const available = FORM_KEYS.filter(k => verb.forms?.[k]);
    if (!available.length) return null;
    const form = available[Math.floor(Math.random() * available.length)];
    const correct = verb.forms[form];
    const distractors = shuffle(allVerbs.filter(v => v.id !== verb.id && v.forms?.[form]))
      .slice(0, 3).map(v => v.forms[form]);
    if (distractors.length < 2) return null;
    return {
      type: 'conjugation',
      prompt: verb.dictionary,
      promptSub: verb.meaning_en,
      question: `${FORM_LABELS[form]} form?`,
      correct,
      options: shuffle([correct, ...distractors.slice(0, 3)]),
    };
  }
}

export default function QuizSession({ verbs, config, onFinish }) {
  const { duration, selectedLevels, questionType } = config;
  const pool = verbs.filter(v => selectedLevels.includes(v.level));

  const [timeLeft, setTimeLeft] = useState(duration);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const timerRef = useRef(null);

  const nextQuestion = useCallback(() => {
    if (!pool.length) return;
    const verb = pool[Math.floor(Math.random() * pool.length)];
    const type = questionType === 'mixed'
      ? (Math.random() > 0.5 ? 'conjugation' : 'meaning')
      : questionType;
    const q = buildQuestion(verb, pool, type);
    if (!q) return nextQuestion();
    setQuestion(q);
    setSelected(null);
  }, [pool, questionType]);

  useEffect(() => {
    nextQuestion();
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onFinish({ correct, wrong, total, bestStreak, perfect: wrong === 0 && total > 0 });
    }
  }, [timeLeft]);

  const handleSelect = (option) => {
    if (selected !== null || timeLeft === 0) return;
    setSelected(option);
    const isCorrect = option === question.correct;
    setTotal(t => t + 1);

    if (isCorrect) {
      setCorrect(c => c + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(bs => Math.max(bs, newStreak));
      speakJapanese(question.correct);
    } else {
      setStreak(0);
      setWrong(w => w + 1);
    }

    setTimeout(() => nextQuestion(), 900);
  };

  const pct = Math.round((timeLeft / duration) * 100);
  const timerColor = timeLeft <= 10 ? 'bg-destructive' : timeLeft <= 30 ? 'bg-orange-500' : 'bg-primary';

  if (!question) return null;

  return (
    <div className="space-y-5">
      {/* Stats bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-emerald-400 font-bold">✓ {correct}</span>
          <span className="text-destructive font-bold">✗ {wrong}</span>
          {streak >= 2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-orange-400 font-bold"
            >
              <Flame className="w-4 h-4" /> {streak}x streak!
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Timer className={`w-4 h-4 ${timeLeft <= 10 ? 'text-destructive' : 'text-muted-foreground'}`} />
          <span className={`font-mono font-bold text-lg ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-secondary rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full transition-colors ${timerColor}`}
          style={{ width: `${pct}%` }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.prompt + question.question}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6 bg-card border-border/50 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{question.question}</p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-jp text-4xl font-black text-foreground">{question.prompt}</span>
              {question.type === 'conjugation' && <SpeakButton text={question.prompt} />}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{question.promptSub}</p>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          const isCorrect = opt === question.correct;
          const isSelected = selected === opt;
          let cls = 'border-border/50 bg-secondary/40 hover:border-primary/30 text-foreground';
          if (selected !== null) {
            if (isCorrect) cls = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-400';
            else if (isSelected) cls = 'border-destructive/60 bg-destructive/15 text-destructive';
          }
          return (
            <Button
              key={`${opt}-${i}`}
              variant="outline"
              className={`py-5 font-jp text-base justify-between ${cls}`}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
            >
              <span className="text-xs text-muted-foreground w-5">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1 text-center">{opt}</span>
              {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 shrink-0" />}
              {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 shrink-0" />}
            </Button>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">{total} answered</p>
    </div>
  );
}