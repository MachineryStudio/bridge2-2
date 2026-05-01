import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useLang } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import SpeakButton from '@/components/shared/SpeakButton';
import LevelBadge from '@/components/shared/LevelBadge';
import { initialGrammar } from '@/lib/gameData';

function GrammarCard({ point }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-card border-border/50 hover:border-primary/20 transition-all overflow-hidden">
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-jp text-xl font-bold text-foreground">{point.pattern}</h3>
              <SpeakButton text={point.pattern} size="sm" />
            </div>
            <p className="text-sm text-muted-foreground">{point.meaning_en}</p>
          </div>
          <div className="flex items-center gap-2">
            <LevelBadge level={point.level} />
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-border/30">
              {point.explanation_en && (
                <p className="text-sm text-foreground/80 mt-4 mb-4 leading-relaxed">{point.explanation_en}</p>
              )}
              {point.category && (
                <Badge variant="outline" className="mb-3 text-xs">{point.category.replace(/_/g, ' ')}</Badge>
              )}
              {point.examples?.length > 0 && (
                <div className="space-y-3 mt-3">
                  {point.examples.map((ex, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <p className="font-jp text-sm font-medium text-foreground">{ex.sentence}</p>
                        <SpeakButton text={ex.sentence} size="sm" />
                      </div>
                      {ex.romaji && <p className="text-xs text-muted-foreground mt-1 italic">{ex.romaji}</p>}
                      <p className="text-xs text-primary mt-1">{ex.translation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function GrammarStudy() {
  const { t } = useLang();
  const [levelFilter, setLevelFilter] = useState('all');

  const { data: grammarPoints, isLoading } = useQuery({
    queryKey: ['grammar'],
    queryFn: async () => {
      const data = await base44.entities.GrammarPoint.list('-created_date', 100);
      if (data.length === 0) {
        await base44.entities.GrammarPoint.bulkCreate(initialGrammar);
        return base44.entities.GrammarPoint.list('-created_date', 100);
      }
      return data;
    },
    initialData: [],
  });

  const filtered = grammarPoints.filter(p =>
    levelFilter === 'all' || p.level === levelFilter
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">{t('grammarStudy')}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{filtered.length} grammar points</p>
      </motion.div>

      <Tabs value={levelFilter} onValueChange={setLevelFilter} className="mb-6">
        <TabsList className="bg-secondary">
          {['all', 'N5', 'N4', 'N3', 'N2', 'N1'].map(l => (
            <TabsTrigger key={l} value={l} className="text-xs">
              {l === 'all' ? t('allLevels') : l}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(point => (
            <GrammarCard key={point.id} point={point} />
          ))}
        </div>
      )}
    </div>
  );
}