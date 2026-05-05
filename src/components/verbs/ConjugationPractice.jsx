import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Shuffle, ChevronRight, Lightbulb, Volume2 } from 'lucide-react';
import SpeakButton from '@/components/shared/SpeakButton';

const FORM_OPTIONS = [
  { key: 'present',          label: 'Present (plain)',      romaji_key: 'present' },
  { key: 'present_polite',   label: 'Present (polite)',     romaji_key: 'present_polite' },
  { key: 'past',             label: 'Past (plain)',         romaji_key: 'past' },
  { key: 'past_polite',      label: 'Past (polite)',        romaji_key: 'past_polite' },
  { key: 'negative',         label: 'Negative (plain)',     romaji_key: 'negative' },
  { key: 'negative_polite',  label: 'Neg. polite',          romaji_key: 'negative_polite' },
  { key: 'neg_past',         label: 'Neg. past (plain)',    romaji_key: 'neg_past' },
  { key: 'te_form',          label: 'Te-form',              romaji_key: 'te_form' },
  { key: 'potential',        label: 'Potential',            romaji_key: 'potential' },
  { key: 'volitional',       label: 'Volitional (let\'s)',  romaji_key: 'volitional' },
  { key: 'tai_form',         label: 'Want to (たい)',        romaji_key: 'tai_form' },
  { key: 'passive',          label: 'Passive',              romaji_key: 'passive' },
  { key: 'causative',        label: 'Causative',            romaji_key: 'causative' },
  { key: 'conditional',      label: 'Conditional (ば)',     romaji_key: 'conditional' },
];

const GROUP_RULES = {
  ichidan: {
    label: 'Ichidan (る verb)',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    rule: 'Drop the final る then add the ending. e.g. 食べる → 食べ + ます (polite), 食べ + ない (negative)',
  },
  godan: {
    label: 'Godan (う verb)',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    rule: 'Change the final u-row kana to the correct row. e.g. 書く → 書き (i-row) + ます, 書か (a-row) + ない',
  },
  irregular: {
    label: 'Irregular verb',
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200',
    rule: 'する → します/しない/した | くる → きます/こない/きた — must be memorised individually.',
  },
};

function normalize(str) {
  return (str || '').trim().replace(/\s+/g, '');
}

function pickRandom(verbs) {
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const forms = FORM_OPTIONS.filter(f => verb.forms?.[f.key]);
  if (forms.length === 0) return null;
  const form = forms[Math.floor(Math.random() * forms.length)];
  return { verb, form };
}

export default function ConjugationPractice({ verbs }) {
  const practiceVerbs = verbs.filter(v => v.forms && Object.keys(v.forms).length > 0);

  const [question, setQuestion] = useState(() => pickRandom(practiceVerbs) || null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question]);

  const nextQuestion = () => {
    setQuestion(pickRandom(practiceVerbs));
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!question || !userInput.trim()) return;

    const correct = question.verb.forms?.[question.form.key] || '';
    const romajiCorrect = question.verb.forms_romaji?.[question.form.key] || '';

    const isCorrect =
      normalize(userInput) === normalize(correct) ||
      normalize(userInput).toLowerCase() === normalize(romajiCorrect).toLowerCase();

    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setStreak(s => s + 1);
    else setStreak(0);
  };

  const handleKeyDown = (e) => {
    if (feedback && e.key === 'Enter') nextQuestion();
  };

  if (!question || practiceVerbs.length === 0) {
    return (
      <Card className="p-6 border-border/50 text-center text-muted-foreground text-sm">
        No verbs with conjugation data available yet. Try loading more verbs.
      </Card>
    );
  }

  const { verb, form } = question;
  const correctAnswer = verb.forms?.[form.key] || '';
  const romajiAnswer = verb.forms_romaji?.[form.key] || '';
  const groupInfo = GROUP_RULES[verb.group] || GROUP_RULES.irregular;

  return (
    <Card className="border-border/50 bg-card overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-primary/5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Conjugation Practice</span>
          {streak > 1 && (
            <Badge className="bg-orange-400/20 text-orange-600 border-orange-300 text-xs">
              🔥 {streak} streak
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground text-xs" onClick={nextQuestion}>
          <Shuffle className="w-3.5 h-3.5" /> New verb
        </Button>
      </div>

      <div className="p-5 space-y-5">
        {/* Verb display */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Conjugate this verb</p>
            <div className="flex items-center gap-3">
              <span className="font-jp text-4xl font-black text-foreground">{verb.dictionary}</span>
              <SpeakButton text={verb.dictionary} />
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="font-jp text-base text-primary">{verb.hiragana}</span>
              <span className="text-sm text-muted-foreground">{verb.romaji}</span>
              <span className="text-sm text-foreground/70">— {verb.meaning_en}</span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5">
            <Badge variant="outline" className={`text-xs font-semibold ${groupInfo.color} border-current`}>
              {groupInfo.label}
            </Badge>
            <span className="text-xs text-muted-foreground">{verb.level}</span>
          </div>
        </div>

        {/* Target form */}
        <div className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-accent shrink-0" />
          <span className="text-sm font-medium text-foreground">
            What is the <span className="font-bold text-primary">{form.label}</span> form?
          </span>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type in Japanese or romaji…"
            className={`flex-1 font-jp text-base transition-colors ${
              feedback === 'correct' ? 'border-emerald-400 bg-emerald-50' :
              feedback === 'wrong'   ? 'border-destructive bg-destructive/5' : ''
            }`}
            disabled={!!feedback}
          />
          {!feedback ? (
            <Button type="submit" className="bg-primary text-primary-foreground px-5">Check</Button>
          ) : (
            <Button type="button" onClick={nextQuestion} className="bg-primary text-primary-foreground px-5">
              Next →
            </Button>
          )}
        </form>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-xl p-4 border ${
                feedback === 'correct'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              {feedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-5 h-5" /> Correct! よくできました！
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" /> Not quite — here's the answer:
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-jp text-2xl font-bold text-foreground">{correctAnswer}</span>
                    <SpeakButton text={correctAnswer} />
                    <span className="text-sm text-muted-foreground">{romajiAnswer}</span>
                  </div>
                </div>
              )}

              {/* Rule box */}
              <div className={`mt-3 rounded-lg p-3 border text-xs leading-relaxed ${groupInfo.bg} ${groupInfo.color}`}>
                <span className="font-bold">Rule ({groupInfo.label}): </span>
                {groupInfo.rule}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint toggle */}
        {!feedback && (
          <div>
            <button
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowHint(h => !h)}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`mt-2 rounded-lg p-3 border text-xs leading-relaxed ${groupInfo.bg} ${groupInfo.color}`}>
                    <span className="font-bold">Rule ({groupInfo.label}): </span>
                    {groupInfo.rule}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </Card>
  );
}