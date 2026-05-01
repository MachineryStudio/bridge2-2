import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SpeakButton from '@/components/shared/SpeakButton';
import LevelBadge from '@/components/shared/LevelBadge';
import { useLang } from '@/lib/LanguageContext';

// A single form row: kanji + romaji + speak button
function FormRow({ kanji, romaji, label }) {
  if (!kanji) return null;
  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <div className="flex items-center gap-1 flex-1">
        <div className="flex flex-col">
          <span className="font-jp text-sm font-medium text-blue-400">{kanji}</span>
          {romaji && <span className="text-xs text-muted-foreground">{romaji}</span>}
        </div>
        <SpeakButton text={kanji} size="sm" />
      </div>
    </div>
  );
}

// A conjugation block like Reverso: title + positive/negative rows
function ConjBlock({ title, rows }) {
  return (
    <div className="bg-secondary/40 rounded-lg p-3 border border-border/30">
      <h4 className="text-xs font-bold text-foreground/70 uppercase tracking-wide mb-2 pb-1 border-b border-border/40">{title}</h4>
      <div className="space-y-0.5">
        {rows.map((row, i) => (
          <FormRow key={i} {...row} />
        ))}
      </div>
    </div>
  );
}

const groupColors = {
  ichidan: 'bg-emerald-500',
  godan: 'bg-blue-500',
  irregular: 'bg-orange-500',
};

export default function VerbDetailCard({ verb, onClose }) {
  const { t, lang } = useLang();
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
      rows: [
        { label: 'form', kanji: f.ing_form, romaji: r.ing_form },
      ]
    },
    {
      title: t('tai'),
      rows: [
        { label: 'form', kanji: f.tai_form, romaji: r.tai_form },
      ]
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
      rows: [
        { label: 'form', kanji: f.volitional, romaji: r.volitional },
      ]
    },
    {
      title: t('passive'),
      rows: [
        { label: 'form', kanji: f.passive, romaji: r.passive },
      ]
    },
    {
      title: t('causative'),
      rows: [
        { label: 'form', kanji: f.causative, romaji: r.causative },
      ]
    },
    {
      title: t('imperative'),
      rows: [
        { label: 'form', kanji: f.imperative, romaji: r.imperative },
      ]
    },
    {
      title: t('conditional'),
      rows: [
        { label: 'positive', kanji: f.conditional, romaji: r.conditional },
        { label: 'negative', kanji: f.conditional_neg, romaji: r.conditional_neg },
      ]
    },
  ].filter(b => b.rows.some(row => row.kanji));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full"
    >
      <Card className="bg-card border-border/50 overflow-hidden">
        {/* Verb header */}
        <div className="flex items-start justify-between p-5 border-b border-border/40">
          <div className="flex items-start gap-4">
            {/* Group bar */}
            <div className={`w-1 h-16 rounded-full ${groupColors[verb.group] || 'bg-muted'} shrink-0 mt-1`} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-jp text-3xl font-bold text-foreground">{verb.dictionary}</h2>
                <SpeakButton text={verb.dictionary} size="default" />
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-xs text-muted-foreground block">Romaji</span>
                  <span className="text-sm font-medium text-foreground">{verb.romaji}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Hiragana</span>
                  <span className="font-jp text-sm font-medium text-primary">{verb.hiragana}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <LevelBadge level={verb.level} />
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <span className="text-xs text-muted-foreground capitalize">{verb.group}</span>
          </div>
        </div>

        {/* Meaning */}
        <div className="px-5 py-3 bg-secondary/20 border-b border-border/30">
          <p className="text-sm text-foreground">{verb.meaning_en}</p>
          {verb.example_sentence && (
            <div className="flex items-center gap-1 mt-1">
              <span className="font-jp text-xs text-primary">{verb.example_sentence}</span>
              <SpeakButton text={verb.example_sentence} size="sm" />
              <span className="text-xs text-muted-foreground">— {verb.example_sentence_en}</span>
            </div>
          )}
        </div>

        {/* Conjugation grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {blocks.map((block, i) => (
              <ConjBlock key={i} title={block.title} rows={block.rows} />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}