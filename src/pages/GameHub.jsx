import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useLang } from '@/lib/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Gamepad2, Grid3X3, Keyboard, HelpCircle, Mic, Headphones } from 'lucide-react';
import MemoryMatchGame from '@/components/games/MemoryMatchGame';
import TypingAttackGame from '@/components/games/TypingAttackGame';
import ConjugationQuiz from '@/components/games/ConjugationQuiz';
import PronunciationMic from '@/components/shared/PronunciationMic';
import ListeningMode from '@/components/games/ListeningMode';
import { initialVerbs } from '@/lib/gameData';

const games = [
  { id: 'memory', icon: Grid3X3, titleKey: 'matchGame', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { id: 'typing', icon: Keyboard, titleKey: 'typingGame', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'quiz', icon: HelpCircle, titleKey: 'fillBlank', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'pronunciation', icon: Mic, titleKey: 'speak', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { id: 'listening', icon: Headphones, titleKey: 'listening', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

function PronunciationGame({ verbs }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const verb = verbs[currentIdx];
  if (!verb) return null;

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div>
        <h3 className="font-jp text-4xl font-bold text-foreground mb-2">{verb.dictionary}</h3>
        <p className="font-jp text-lg text-primary">{verb.hiragana}</p>
        <p className="text-sm text-muted-foreground mt-1">{verb.meaning_en}</p>
      </div>
      <PronunciationMic
        targetText={verb.dictionary}
        onResult={(res) => {
          if (res.isCorrect) {
            setTimeout(() => setCurrentIdx((currentIdx + 1) % verbs.length), 1500);
          }
        }}
      />
      <p className="text-xs text-muted-foreground">{currentIdx + 1} / {verbs.length}</p>
    </div>
  );
}

export default function GameHub() {
  const { t } = useLang();
  const [activeGame, setActiveGame] = useState('memory');

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

  const handleGameComplete = async (result) => {
    // Could update player progress here
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Gamepad2 className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">{t('gameHub')}</h1>
        </div>
        <p className="text-muted-foreground text-sm">{t('tagline')}</p>
      </motion.div>

      {/* Game selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {games.map((game) => (
          <motion.div key={game.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              className={`p-4 cursor-pointer transition-all duration-200 ${
                activeGame === game.id
                  ? 'border-primary/50 bg-primary/5 glow-gold'
                  : 'border-border/50 bg-card hover:border-primary/20'
              }`}
              onClick={() => setActiveGame(game.id)}
            >
              <div className={`w-10 h-10 rounded-lg ${game.bg} flex items-center justify-center mb-3`}>
                <game.icon className={`w-5 h-5 ${game.color}`} />
              </div>
              <h3 className="font-bold text-sm text-foreground">{t(game.titleKey)}</h3>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Game area */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <Card className="p-6 sm:p-8 bg-card border-border/50">
          {activeGame === 'memory' && <MemoryMatchGame verbs={verbs} onComplete={handleGameComplete} />}
          {activeGame === 'typing' && <TypingAttackGame verbs={verbs} onComplete={handleGameComplete} />}
          {activeGame === 'quiz' && <ConjugationQuiz verbs={verbs} onComplete={handleGameComplete} />}
          {activeGame === 'pronunciation' && <PronunciationGame verbs={verbs} />}
          {activeGame === 'listening' && <ListeningMode verbs={verbs} onComplete={handleGameComplete} />}
        </Card>
      )}
    </div>
  );
}