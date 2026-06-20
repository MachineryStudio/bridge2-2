import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpeakButton from '@/components/shared/SpeakButton';
import LevelBadge from '@/components/shared/LevelBadge';
import { verbAudioMap } from '@/lib/verbAudio';
import { useLang } from '@/lib/LanguageContext';

const groupColors = {
  ichidan: 'bg-emerald-500',
  godan: 'bg-blue-500',
  irregular: 'bg-orange-500',
};

function FormRow({ kanji, romaji, label }) {
  if (!kanji) return null;
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-border/20 last:border-0">
      <span className="text-xs text-muted-foreground w-20 shrink-0">{label}</span>
      <div className="flex items-center gap-1 flex-1 min-w-0">
        <div className="flex flex-col min-w-0">
          <span className="font-jp text-sm font-medium text-blue-400">{kanji}</span>
          {romaji && <span className="text-xs text-muted-foreground">{romaji}</span>}
        </div>
        <SpeakButton text={kanji} size="sm" />
      </div>
    </div>
  );
}

function ConjBlock({ title, rows }) {
  const hasData = rows.some(r => r.kanji);
  if (!hasData) return null;
  return (
    <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
      <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">{title}</h4>
      {rows.map((row, i) => <FormRow key={i} {...row} />)}
    </div>
  );
}

export default function ConjugationDrawer({ verb, onClose }) {
  const { t } = useLang();
  if (!verb) return null;
  const audioUrl = verbAudioMap[verb.romaji];

  const f = verb.forms || {};
  const r = verb.forms_romaji || {};

  const blocks = [
    {
      title: t('present'),
      rows: [
        { label: 'plain +', kanji: f.present, romaji: r.present },
        { label: 'polite +', kanji: f.present_polite, romaji: r.present_polite },
        { label: 'plain −', kanji: f.negative, romaji: r.negative },
        { label: 'polite −', kanji: f.negative_polite, romaji: r.negative_polite },
      ]
    },
    {
      title: t('past'),
      rows: [
        { label: 'plain +', kanji: f.past, romaji: r.past },
        { label: 'polite +', kanji: f.past_polite, romaji: r.past_polite },
        { label: 'plain −', kanji: f.neg_past, romaji: r.neg_past },
        { label: 'polite −', kanji: f.neg_past_polite, romaji: r.neg_past_polite },
      ]
    },
    {
      title: t('teForm'),
      rows: [
        { label: 'positive', kanji: f.te_form, romaji: r.te_form },
        { label: 'negative', kanji: f.neg_te, romaji: r.neg_te },
      ]
    },
    {
      title: t('ing'),
      rows: [{ label: 'form', kanji: f.ing_form, romaji: r.ing_form }]
    },
    {
      title: t('tai'),
      rows: [{ label: 'form', kanji: f.tai_form, romaji: r.tai_form }]
    },
    {
      title: t('potential'),
      rows: [
        { label: 'positive', kanji: f.potential, romaji: r.potential },
        { label: 'negative', kanji: f.potential_neg, romaji: r.potential_neg },
      ]
    },
    {
      title: t('volitional'),
      rows: [{ label: 'form', kanji: f.volitional, romaji: r.volitional }]
    },
    {
      title: t('passive'),
      rows: [{ label: 'form', kanji: f.passive, romaji: r.passive }]
    },
    {
      title: t('causative'),
      rows: [{ label: 'form', kanji: f.causative, romaji: r.causative }]
    },
    {
      title: t('imperative'),
      rows: [{ label: 'form', kanji: f.imperative, romaji: r.imperative }]
    },
    {
      title: t('conditional'),
      rows: [
        { label: 'positive', kanji: f.conditional, romaji: r.conditional },
        { label: 'negative', kanji: f.conditional_neg, romaji: r.conditional_neg },
      ]
    },
  ];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-background border-l border-border z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-10 rounded-full ${groupColors[verb.group] || 'bg-muted'}`} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-jp text-2xl font-bold text-foreground">{verb.dictionary}</span>
                <SpeakButton text={verb.dictionary} audioUrl={audioUrl} />
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                <span>{verb.romaji}</span>
                <span className="font-jp text-primary">{verb.hiragana}</span>
                <LevelBadge level={verb.level} />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Meaning + example */}
        <div className="px-4 py-3 bg-secondary/20 border-b border-border/30 shrink-0">
          <p className="text-sm font-medium text-foreground">{verb.meaning_en}</p>
          {verb.example_sentence && (
            <div className="mt-1.5">
              <div className="flex items-center gap-1">
                <span className="font-jp text-xs text-primary">{verb.example_sentence}</span>
                <SpeakButton text={verb.example_sentence} size="sm" />
              </div>
              {verb.example_sentence_romaji && (
                <p className="text-xs text-muted-foreground italic">{verb.example_sentence_romaji}</p>
              )}
              <p className="text-xs text-muted-foreground">{verb.example_sentence_en}</p>
            </div>
          )}
        </div>

        {/* Conjugation blocks — scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-3">
            {blocks.map((block, i) => (
              <ConjBlock key={i} title={block.title} rows={block.rows} />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}