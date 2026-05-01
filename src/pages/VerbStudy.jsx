import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useLang } from '@/lib/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import LevelBadge from '@/components/shared/LevelBadge';
import SpeakButton from '@/components/shared/SpeakButton';
import VerbDetailCard from '@/components/verbs/VerbDetailCard';
import { verbData } from '@/lib/verbData';

const LEVELS = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'];
const groupColor = { ichidan: 'bg-emerald-500', godan: 'bg-blue-500', irregular: 'bg-orange-500' };

export default function VerbStudy() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const { data: verbs, isLoading } = useQuery({
    queryKey: ['verbs'],
    queryFn: async () => {
      const data = await base44.entities.Verb.list('-created_date', 500);
      // If DB is empty or far fewer verbs than our data, seed with our verbData
      if (data.length < verbData.length) {
        const existing = new Set(data.map(v => v.dictionary));
        const toAdd = verbData.filter(v => !existing.has(v.dictionary));
        if (toAdd.length > 0) {
          // Batch insert in chunks of 50
          for (let i = 0; i < toAdd.length; i += 50) {
            await base44.entities.Verb.bulkCreate(toAdd.slice(i, i + 50));
          }
          return base44.entities.Verb.list('-created_date', 500);
        }
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

  const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">{t('verbStudy')}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{filtered.length} {t('totalVerbs').toLowerCase()}</p>
      </motion.div>

      {/* Search + Level filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            className="pl-10 bg-secondary border-border/50"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {LEVELS.map(l => (
            <Button
              key={l}
              size="sm"
              variant={levelFilter === l ? "default" : "outline"}
              className={`text-xs ${levelFilter === l ? 'bg-primary text-primary-foreground' : 'border-border/50 text-muted-foreground'}`}
              onClick={() => setLevelFilter(l)}
            >
              {l === 'all' ? t('allLevels') : l}
            </Button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Ichidan (る)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Godan (う)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> Irregular</span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="ml-3 text-muted-foreground text-sm">Loading verbs...</span>
        </div>
      )}

      {/* Verb list */}
      <div className="space-y-2">
        {filtered.map((verb) => (
          <div key={verb.id}>
            {/* Row */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer border transition-all duration-200 ${
                expandedId === verb.id
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-card border-border/50 hover:border-primary/20 hover:bg-card/80'
              }`}
              onClick={() => toggleExpand(verb.id)}
            >
              {/* Group color */}
              <div className={`w-1.5 h-10 rounded-full shrink-0 ${groupColor[verb.group] || 'bg-muted'}`} />

              {/* Dictionary */}
              <div className="w-20 shrink-0">
                <span className="font-jp text-xl font-bold text-foreground">{verb.dictionary}</span>
              </div>

              {/* Speak */}
              <div onClick={e => e.stopPropagation()}>
                <SpeakButton text={verb.dictionary} size="sm" />
              </div>

              {/* Romaji */}
              <div className="w-28 shrink-0 hidden sm:block">
                <span className="text-sm font-medium text-foreground/80">{verb.romaji}</span>
              </div>

              {/* Hiragana */}
              <div className="w-24 shrink-0 hidden md:block">
                <span className="font-jp text-sm text-primary">{verb.hiragana}</span>
              </div>

              {/* Meaning */}
              <div className="flex-1 min-w-0">
                <span className="text-sm text-foreground/80 truncate block">{verb.meaning_en}</span>
              </div>

              {/* Level */}
              <LevelBadge level={verb.level} className="shrink-0 hidden sm:flex" />

              {/* Expand chevron */}
              <div className="shrink-0 text-muted-foreground">
                {expandedId === verb.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </motion.div>

            {/* Expanded detail */}
            <AnimatePresence>
              {expandedId === verb.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-1 mb-2"
                >
                  <VerbDetailCard verb={verb} onClose={() => setExpandedId(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-jp text-4xl text-muted-foreground/20 mb-2">見つからない</p>
          <p className="text-muted-foreground text-sm">No verbs found for "{search}"</p>
        </div>
      )}
    </div>
  );
}