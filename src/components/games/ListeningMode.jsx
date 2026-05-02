import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { speakJapanese } from '@/lib/speechUtils';
import { useLang } from '@/lib/LanguageContext';
import {
  Volume2, RotateCcw, Trophy, ArrowRight, CheckCircle, XCircle, Headphones
} from 'lucide-react';

const FORM_KEYS = [
  'present', 'present_polite', 'past', 'past_polite',
  'negative', 'negative_polite', 'neg_past', 'te_form',
  'potential', 'volitional', 'passive', 'causative', 'imperative', 'conditional'
];

const FORM_LABELS = {
  present: 'Present (plain)', present_polite: 'Present (polite)',
  past: 'Past (plain)', past_polite: 'Past (polite)',
  negative: 'Negative (plain)', negative_polite: 'Negative (polite)',
  neg_past: 'Neg. Past', te_form: 'Te-form',
  potential: 'Potential', volitional: 'Volitional',
  passive: 'Passive', causative: 'Causative',
  imperative: 'Imperative', conditional: 'Conditional',
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(verbs) {
  const questions = [];
  const pool = shuffle(verbs).slice(0, 15);

  pool.forEach(verb => {
    const available = FORM_KEYS.filter(k => verb.forms?.[k]);
    if (!available.length) return;

    // Randomly decide: identify dictionary form OR identify meaning
    const mode = Math.random() > 0.5 ? 'dictionary' : 'meaning';
    const form = available[Math.floor(Math.random() * available.length)];
    const audio = verb.forms[form];
    const formLabel = FORM_LABELS[form] || form;

    // Build 4 options
    const correctAnswer = mode === 'dictionary' ? verb.dictionary : verb.meaning_en;
    const distractors = shuffle(verbs.filter(v => v.id !== verb.id))
      .slice(0, 3)
      .map(v => mode === 'dictionary' ? v.dictionary : v.meaning_en);

    const options = shuffle([correctAnswer, ...distractors]);

    questions.push({ verb, form, formLabel, audio, mode, correctAnswer, options });
  });

  return questions;
}

export default function ListeningMode({ verbs, onComplete }) {
  const { t } = useLang();
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const startGame = useCallback(() => {
    const qs = buildQuestions(verbs);
    setQuestions(qs);
    setIdx(0);
    setSelected(null);
    setScore(0);
    setGameOver(false);
    setStarted(true);
  }, [verbs]);

  const playAudio = useCallback((text) => {
    setPlaying(true);
    speakJapanese(text, () => setPlaying(false));
  }, []);

  // Auto-play when question changes
  useEffect(() => {
    if (started && questions[idx] && !gameOver) {
      const timeout = setTimeout(() => playAudio(questions[idx].audio), 400);
      return () => clearTimeout(timeout);
    }
  }, [idx, started, questions, gameOver]);

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === questions[idx].correctAnswer;
    if (correct) {
      setScore(s => s + 1);
      speakJapanese(questions[idx].audio);
    }

    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setGameOver(true);
        onComplete?.({ score: correct ? score + 1 : score, total: questions.length });
      } else {
        setIdx(i => i + 1);
        setSelected(null);
      }
    }, 1400);
  };

  if (!started) {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Headphones className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Listening Mode</h3>
        <p className="text-muted-foreground mb-2">A conjugated form will be played aloud.</p>
        <p className="text-muted-foreground mb-6">Identify the <strong className="text-foreground">dictionary form</strong> or <strong className="text-foreground">meaning</strong> from the choices.</p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground px-8">
          Start Listening
        </Button>
      </div>
    );
  }

  if (gameOver) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-jp text-2xl font-bold text-primary mb-2">結果</h3>
        <p className="text-4xl font-bold text-foreground">{score}/{questions.length}</p>
        <p className="text-muted-foreground mt-1">{pct}%</p>
        <Button onClick={startGame} className="mt-6 bg-primary text-primary-foreground gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  const q = questions[idx];
  if (!q) return null;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{idx + 1} / {questions.length}</span>
        <span className="text-primary font-bold">{score} correct</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-1.5">
        <div
          className="bg-primary h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((idx) / questions.length) * 100}%` }}
        />
      </div>

      {/* Audio card */}
      <Card className="p-6 bg-card border-border/50 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">
          {q.mode === 'dictionary' ? 'Which verb is this?' : 'What does this mean?'}
          <span className="ml-2 text-primary font-bold">{q.formLabel}</span>
        </p>

        <button
          onClick={() => playAudio(q.audio)}
          disabled={playing}
          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-200 ${
            playing
              ? 'bg-primary/20 border-2 border-primary scale-110'
              : 'bg-primary/10 border-2 border-primary/30 hover:bg-primary/20 hover:scale-105'
          }`}
        >
          <motion.div
            animate={playing ? { scale: [1, 1.15, 1] } : {}}
            transition={{ repeat: playing ? Infinity : 0, duration: 0.7 }}
          >
            <Volume2 className={`w-10 h-10 ${playing ? 'text-primary' : 'text-primary/60'}`} />
          </motion.div>
        </button>

        <p className="text-xs text-muted-foreground mt-4">
          {playing ? 'Playing...' : 'Tap to replay'}
        </p>

        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-jp text-lg font-bold text-primary"
          >
            {q.audio}
          </motion.div>
        )}
      </Card>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        <AnimatePresence>
          {q.options.map((option, i) => {
            const isCorrect = option === q.correctAnswer;
            const isSelected = selected === option;
            let cls = 'bg-secondary/50 border-border/50 hover:border-primary/30 text-foreground';
            if (selected !== null) {
              if (isCorrect) cls = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
              else if (isSelected) cls = 'bg-destructive/20 border-destructive/50 text-destructive';
            }

            return (
              <motion.div
                key={`${option}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start py-5 text-left font-jp text-base ${cls}`}
                  onClick={() => handleSelect(option)}
                  disabled={selected !== null}
                >
                  <span className="mr-3 text-xs text-muted-foreground w-5">{String.fromCharCode(65 + i)}.</span>
                  {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 mr-2 shrink-0" />}
                  {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 mr-2 shrink-0" />}
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