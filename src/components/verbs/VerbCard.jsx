import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import SpeakButton from '@/components/shared/SpeakButton';
import LevelBadge from '@/components/shared/LevelBadge';
import { verbAudioMap } from '@/lib/verbAudio';

const formLabels = {
  present: 'present', present_polite: 'presentPolite',
  past: 'past', past_polite: 'pastPolite',
  negative: 'negative', negative_polite: 'negativePolite',
  te_form: 'teForm', potential: 'potential',
  volitional: 'volitional', imperative: 'imperative',
  passive: 'passive', causative: 'causative',
};

export default function VerbCard({ verb }) {
  const [flipped, setFlipped] = useState(false);
  const [showAllForms, setShowAllForms] = useState(false);
  const { t } = useLang();
  const audioUrl = verbAudioMap[verb.romaji];

  const mainForms = ['present', 'past', 'negative', 'te_form'];
  const extraForms = ['present_polite', 'past_polite', 'negative_polite', 'potential', 'volitional', 'passive', 'causative'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="perspective-1000"
    >
      <Card
        className="relative overflow-hidden cursor-pointer bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        {!flipped ? (
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-jp text-3xl font-bold text-foreground">{verb.dictionary}</h3>
                <p className="font-jp text-sm text-primary mt-1">{verb.hiragana}</p>
                <p className="font-latin text-xs text-muted-foreground">{verb.romaji}</p>
              </div>
              <div className="flex items-center gap-1">
                <SpeakButton text={verb.dictionary} audioUrl={audioUrl} />
                <LevelBadge level={verb.level} />
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3">{verb.meaning_en}</p>
            {verb.example_sentence && (
              <div className="bg-secondary/50 rounded-lg p-3 mt-2">
                <div className="flex items-center gap-1">
                  <p className="font-jp text-sm text-foreground/90">{verb.example_sentence}</p>
                  <SpeakButton text={verb.example_sentence} size="sm" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{verb.example_sentence_en}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground/50 text-center mt-3">{t('flipCard')} ↻</p>
          </div>
        ) : (
          /* Back - conjugation forms */
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-jp text-xl font-bold text-foreground">{verb.dictionary}</h3>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setFlipped(false); }}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {mainForms.map(form => verb.forms?.[form] && (
                <div key={form} className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-xs text-muted-foreground">{t(formLabels[form])}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-jp text-sm font-medium">{verb.forms[form]}</span>
                    <SpeakButton text={verb.forms[form]} size="sm" />
                  </div>
                </div>
              ))}

              {showAllForms && extraForms.map(form => verb.forms?.[form] && (
                <div key={form} className="flex items-center justify-between py-1.5 border-b border-border/30">
                  <span className="text-xs text-muted-foreground">{t(formLabels[form])}</span>
                  <div className="flex items-center gap-1">
                    <span className="font-jp text-sm font-medium">{verb.forms[form]}</span>
                    <SpeakButton text={verb.forms[form]} size="sm" />
                  </div>
                </div>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={(e) => { e.stopPropagation(); setShowAllForms(!showAllForms); }}
              >
                {showAllForms ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}
                {showAllForms ? 'Less' : 'All forms'}
              </Button>
            </div>
          </div>
        )}

        {/* Group indicator */}
        <div className={`absolute top-0 left-0 w-1 h-full ${
          verb.group === 'ichidan' ? 'bg-emerald-500' :
          verb.group === 'godan' ? 'bg-blue-500' : 'bg-orange-500'
        }`} />
      </Card>
    </motion.div>
  );
}