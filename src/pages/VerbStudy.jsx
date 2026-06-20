import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useLang } from '@/lib/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Menu, Download, Tag, PenLine, ChevronDown, ChevronUp } from 'lucide-react';
import LevelBadge from '@/components/shared/LevelBadge';
import SpeakButton from '@/components/shared/SpeakButton';
import ConjugationDrawer from '@/components/verbs/ConjugationDrawer';
import TagManagerModal from '@/components/verbs/TagManagerModal';
import VerbTagAssigner from '@/components/verbs/VerbTagAssigner';
import ConjugationPractice from '@/components/verbs/ConjugationPractice';
import { verbData } from '@/lib/verbData';

const LEVELS = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'];
const groupColor = { ichidan: 'bg-emerald-500', godan: 'bg-blue-500', irregular: 'bg-orange-500' };

function exportToCSV(verbs) {
  const formKeys = [
    'present','present_polite','past','past_polite',
    'negative','negative_polite','neg_past','neg_past_polite',
    'te_form','neg_te','ing_form','tai_form',
    'potential','potential_neg','volitional','passive',
    'causative','imperative','conditional','conditional_neg'
  ];

  const headers = [
    'Dictionary','Hiragana','Romaji','Meaning','Group','Level',
    ...formKeys.map(k => `${k} (kanji)`),
    ...formKeys.map(k => `${k} (romaji)`),
    'Example (JP)','Example (EN)'
  ];

  const rows = verbs.map(v => [
    v.dictionary, v.hiragana, v.romaji, v.meaning_en, v.group, v.level,
    ...formKeys.map(k => v.forms?.[k] || ''),
    ...formKeys.map(k => v.forms_romaji?.[k] || ''),
    v.example_sentence || '', v.example_sentence_en || ''
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'japanese_verbs.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function VerbStudy() {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState(null); // tag id or null
  const [drawerVerb, setDrawerVerb] = useState(null);
  const [showTagManager, setShowTagManager] = useState(false);
  const [showPractice, setShowPractice] = useState(false);

  const { data: verbs, isLoading } = useQuery({
    queryKey: ['verbs'],
    queryFn: async () => {
      const data = await base44.entities.Verb.list('-created_date', 500);
      if (data.length < verbData.length) {
        const existing = new Set(data.map(v => v.dictionary));
        const toAdd = verbData.filter(v => !existing.has(v.dictionary));
        if (toAdd.length > 0) {
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

  const { data: tags = [] } = useQuery({
    queryKey: ['verbTags'],
    queryFn: () => base44.entities.VerbTag.list(),
  });

  const activeTag = tags.find(t => t.id === tagFilter) || null;

  const filtered = verbs.filter(v => {
    const matchSearch = !search ||
      v.dictionary?.includes(search) ||
      v.romaji?.toLowerCase().includes(search.toLowerCase()) ||
      v.hiragana?.includes(search) ||
      v.meaning_en?.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === 'all' || v.level === levelFilter;
    const matchTag = !tagFilter || (activeTag?.verb_ids || []).includes(v.id);
    return matchSearch && matchLevel && matchTag;
  }).sort((a, b) => (a.romaji || '').localeCompare(b.romaji || ''));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">{t('verbStudy')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showPractice ? "default" : "outline"}
              size="sm"
              className={`gap-2 border-border/50 ${showPractice ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setShowPractice(p => !p)}
            >
              <PenLine className="w-4 h-4" />
              Practice
              {showPractice ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/50 text-muted-foreground hover:text-foreground"
              onClick={() => setShowTagManager(true)}
            >
              <Tag className="w-4 h-4" />
              Tags
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/50 text-muted-foreground hover:text-foreground"
              onClick={() => exportToCSV(filtered)}
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{filtered.length} {t('totalVerbs').toLowerCase()}</p>
      </motion.div>

      {/* Conjugation Practice Section */}
      <AnimatePresence>
        {showPractice && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <ConjugationPractice verbs={verbs} />
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Tag filter row */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Filter by tag:</span>
          <button
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${!tagFilter ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-secondary border-border/50 text-muted-foreground hover:border-primary/30'}`}
            onClick={() => setTagFilter(null)}
          >
            All
          </button>
          {tags.map(tag => (
            <button
              key={tag.id}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${tagFilter === tag.id ? 'border-white/30 text-white' : 'bg-secondary border-border/50 text-muted-foreground hover:border-primary/30'}`}
              style={tagFilter === tag.id ? { backgroundColor: tag.color + '33', borderColor: tag.color, color: tag.color } : {}}
              onClick={() => setTagFilter(tagFilter === tag.id ? null : tag.id)}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color || '#6366f1' }} />
              {tag.name}
              <span className="opacity-60">({(tag.verb_ids || []).length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Column headers */}
      <div className="hidden sm:flex items-center gap-3 px-4 mb-1 text-xs text-muted-foreground font-medium">
        <div className="w-1.5 shrink-0" />
        <div className="w-20 shrink-0">Kanji</div>
        <div className="w-8 shrink-0" />
        <div className="w-36 shrink-0">Romaji</div>
        <div className="w-24 shrink-0 hidden md:block">Hiragana</div>
        <div className="flex-1">Meaning</div>
        <div className="w-10 shrink-0 hidden sm:block">Level</div>
        <div className="w-8 shrink-0">Forms</div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Ichidan</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Godan</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Irregular</span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="ml-3 text-muted-foreground text-sm">Loading verbs...</span>
        </div>
      )}

      {/* Verb list */}
      <div className="space-y-1">
        {filtered.map((verb) => (
          <motion.div
            key={verb.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-all duration-150"
          >
            {/* Group color bar */}
            <div className={`w-1.5 h-10 rounded-full shrink-0 ${groupColor[verb.group] || 'bg-muted'}`} />

            {/* Kanji */}
            <div className="w-20 shrink-0">
              <span className="font-jp text-xl font-bold text-foreground">{verb.dictionary}</span>
            </div>

            {/* Speak kanji */}
            <div className="w-8 shrink-0" onClick={e => e.stopPropagation()}>
              <SpeakButton text={verb.dictionary} size="sm" />
            </div>

            {/* Romaji + speak romaji */}
            <div className="w-36 shrink-0 hidden sm:flex items-center gap-1">
              <span className="text-sm font-medium text-foreground/80">{verb.romaji}</span>
              <div onClick={e => e.stopPropagation()}>
                <SpeakButton text={verb.hiragana} size="sm" />
              </div>
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

            {/* Tag assigner */}
            <div onClick={e => e.stopPropagation()}>
              <VerbTagAssigner verb={verb} />
            </div>

            {/* Hamburger — open conjugation drawer */}
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-primary"
              onClick={(e) => { e.stopPropagation(); setDrawerVerb(verb); }}
              title="View conjugation"
            >
              <Menu className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-jp text-4xl text-muted-foreground/20 mb-2">見つからない</p>
          <p className="text-muted-foreground text-sm">No verbs found for "{search}"</p>
        </div>
      )}

      {/* Conjugation drawer */}
      {drawerVerb && (
        <ConjugationDrawer verb={drawerVerb} onClose={() => setDrawerVerb(null)} />
      )}

      {/* Tag manager modal */}
      <AnimatePresence>
        {showTagManager && <TagManagerModal onClose={() => setShowTagManager(false)} />}
      </AnimatePresence>
    </div>
  );
}