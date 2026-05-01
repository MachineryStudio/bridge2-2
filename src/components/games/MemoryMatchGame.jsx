import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { speakJapanese } from '@/lib/speechUtils';
import { Shuffle, Trophy, RotateCcw, Volume2 } from 'lucide-react';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatchGame({ verbs, onComplete }) {
  const { t } = useLang();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initGame = useCallback(() => {
    const selected = shuffleArray(verbs).slice(0, 6);
    const pairs = selected.flatMap((v, i) => [
      { id: `${i}-a`, pairId: i, text: v.dictionary, type: 'kanji', verb: v },
      { id: `${i}-b`, pairId: i, text: v.meaning_en, type: 'meaning', verb: v },
    ]);
    setCards(shuffleArray(pairs));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  }, [verbs]);

  useEffect(() => {
    if (verbs.length > 0) initGame();
  }, [verbs, initGame]);

  const handleFlip = (card) => {
    if (flipped.length === 2) return;
    if (flipped.find(f => f.id === card.id)) return;
    if (matched.includes(card.pairId)) return;

    if (card.type === 'kanji') speakJapanese(card.text);

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (newFlipped[0].pairId === newFlipped[1].pairId) {
        const newMatched = [...matched, newFlipped[0].pairId];
        setMatched(newMatched);
        setTimeout(() => setFlipped([]), 500);
        if (newMatched.length === cards.length / 2) {
          setGameOver(true);
          onComplete?.({ moves: moves + 1, pairs: newMatched.length });
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isFlipped = (card) => flipped.find(f => f.id === card.id) || matched.includes(card.pairId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">{t('score')}: <strong className="text-foreground">{matched.length}/{cards.length / 2}</strong></span>
          <span className="text-muted-foreground">Moves: <strong className="text-foreground">{moves}</strong></span>
        </div>
        <Button variant="outline" size="sm" onClick={initGame}>
          <Shuffle className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        <AnimatePresence>
          {cards.map(card => (
            <motion.div
              key={card.id}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={!isFlipped(card) ? { scale: 1.05 } : {}}
              whileTap={!isFlipped(card) ? { scale: 0.95 } : {}}
            >
              <Card
                className={`aspect-square flex items-center justify-center cursor-pointer transition-all duration-300 select-none ${
                  matched.includes(card.pairId)
                    ? 'bg-emerald-500/20 border-emerald-500/40'
                    : isFlipped(card)
                    ? 'bg-primary/10 border-primary/40'
                    : 'bg-secondary hover:bg-secondary/80 border-border/50'
                }`}
                onClick={() => handleFlip(card)}
              >
                {isFlipped(card) ? (
                  <motion.div
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    className="text-center px-2"
                  >
                    <span className={`${card.type === 'kanji' ? 'font-jp text-lg sm:text-xl font-bold' : 'font-latin text-xs sm:text-sm'} text-foreground`}>
                      {card.text}
                    </span>
                  </motion.div>
                ) : (
                  <span className="font-jp text-2xl text-muted-foreground/30">?</span>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 bg-card rounded-xl border border-primary/30 glow-gold"
          >
            <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-jp text-2xl font-bold text-primary mb-1">おめでとう！</h3>
            <p className="text-foreground text-lg">{t('correct')}</p>
            <p className="text-muted-foreground text-sm mt-1">{moves} moves</p>
            <Button onClick={initGame} className="mt-4 bg-primary text-primary-foreground">
              <RotateCcw className="w-4 h-4 mr-2" /> {t('play')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}