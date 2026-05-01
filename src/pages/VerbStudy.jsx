import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useLang } from '@/lib/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import VerbCard from '@/components/verbs/VerbCard';
import LevelBadge from '@/components/shared/LevelBadge';
import PronunciationMic from '@/components/shared/PronunciationMic';
import { initialVerbs } from '@/lib/gameData';

export default function VerbStudy() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [practiceVerb, setPracticeVerb] = useState(null);

  const { data: verbs, isLoading } = useQuery({
    queryKey: ['verbs'],
    queryFn: async () => {
      const data = await base44.entities.Verb.list('-created_date', 100);
      if (data.length === 0) {
        await base44.entities.Verb.bulkCreate(initialVerbs);
        return base44.entities.Verb.list('-created_date', 100);
      }
      return data;
    },
    initialData: [],
  });

  const filtered = verbs.filter(v => {
    const matchSearch = !search || 
      v.dictionary?.includes(search) ||
      v.romaji?.toLowerCase().includes(search.toLowerCase()) ||
      v.hiragana?.includes(search) ||
      v.meaning_en?.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || v.level === levelFilter;
    return matchSearch && matchLevel;
  });

  const levels = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">{t('verbStudy')}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t('verbConjugation')} — {filtered.length} {t('totalVerbs').toLowerCase()}</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            className="pl-10 bg-secondary border-border/50"
          />
        </div>
        <Tabs value={levelFilter} onValueChange={setLevelFilter}>
          <TabsList className="bg-secondary">
            {levels.map(l => (
              <TabsTrigger key={l} value={l} className="text-xs">
                {l === 'all' ? t('allLevels') : l}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Verb Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((verb, i) => (
          <VerbCard key={verb.id} verb={verb} />
        ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t('search')} — No results</p>
        </div>
      )}
    </div>
  );
}