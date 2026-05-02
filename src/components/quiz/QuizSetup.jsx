import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Zap, Brain, Target } from 'lucide-react';

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const DURATIONS = [
  { label: '1 min', value: 60 },
  { label: '2 min', value: 120 },
  { label: '3 min', value: 180 },
];
const QUESTION_TYPES = [
  { id: 'conjugation', label: 'Conjugation', desc: 'Choose the correct verb form', icon: Brain },
  { id: 'meaning', label: 'Meaning', desc: 'Match verb to English meaning', icon: Target },
  { id: 'mixed', label: 'Mixed', desc: 'Both types combined', icon: Zap },
];

export default function QuizSetup({ onStart }) {
  const [selectedLevels, setSelectedLevels] = useState(['N5']);
  const [duration, setDuration] = useState(60);
  const [questionType, setQuestionType] = useState('mixed');

  const toggleLevel = (lvl) => {
    setSelectedLevels(prev =>
      prev.includes(lvl)
        ? prev.length > 1 ? prev.filter(l => l !== lvl) : prev
        : [...prev, lvl]
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Duration */}
      <Card className="p-5 bg-card border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <Timer className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground">Time Limit</h3>
        </div>
        <div className="flex gap-2">
          {DURATIONS.map(d => (
            <Button
              key={d.value}
              size="sm"
              variant={duration === d.value ? 'default' : 'outline'}
              className={duration === d.value ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground'}
              onClick={() => setDuration(d.value)}
            >
              {d.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* JLPT Level */}
      <Card className="p-5 bg-card border-border/50">
        <h3 className="font-semibold text-foreground mb-3">JLPT Levels</h3>
        <div className="flex gap-2 flex-wrap">
          {LEVELS.map(lvl => (
            <button
              key={lvl}
              onClick={() => toggleLevel(lvl)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${
                selectedLevels.includes(lvl)
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-secondary border-border/50 text-muted-foreground hover:border-primary/30'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </Card>

      {/* Question type */}
      <Card className="p-5 bg-card border-border/50">
        <h3 className="font-semibold text-foreground mb-3">Question Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {QUESTION_TYPES.map(qt => (
            <button
              key={qt.id}
              onClick={() => setQuestionType(qt.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                questionType === qt.id
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border/50 bg-secondary/30 hover:border-primary/20'
              }`}
            >
              <qt.icon className={`w-5 h-5 mb-2 ${questionType === qt.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="font-semibold text-sm text-foreground">{qt.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{qt.desc}</div>
            </button>
          ))}
        </div>
      </Card>

      <Button
        className="w-full bg-primary text-primary-foreground text-lg py-6 glow-gold"
        onClick={() => onStart({ duration, selectedLevels, questionType })}
      >
        <Timer className="w-5 h-5 mr-2" /> Start Quiz
      </Button>
    </motion.div>
  );
}