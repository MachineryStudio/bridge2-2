import React, { useState, useCallback } from 'react';
import { Mic, MicOff, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { startRecognition } from '@/lib/speechUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

export default function PronunciationMic({ targetText, onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState(null);
  const { t } = useLang();

  const handleListen = useCallback(() => {
    setIsListening(true);
    setResult(null);

    startRecognition(
      (results) => {
        setIsListening(false);
        const best = results[0];
        const isCorrect = best.transcript.replace(/\s/g, '') === targetText.replace(/\s/g, '') 
          || best.confidence > 0.7;
        const res = {
          transcript: best.transcript,
          confidence: Math.round(best.confidence * 100),
          isCorrect,
        };
        setResult(res);
        onResult?.(res);
      },
      (error) => {
        setIsListening(false);
        setResult({ transcript: '', confidence: 0, isCorrect: false, error });
      }
    );
  }, [targetText, onResult]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleListen}
        disabled={isListening}
        variant={isListening ? "destructive" : "outline"}
        size="lg"
        className="rounded-full w-16 h-16 relative"
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <MicOff className="w-6 h-6" />
          </motion.div>
        ) : (
          <Mic className="w-6 h-6" />
        )}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-destructive"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </Button>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
              result.isCorrect
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-destructive/20 text-destructive'
            }`}
          >
            {result.isCorrect ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span className="font-jp">{result.transcript || '...'}</span>
            <span className="text-xs opacity-70">{result.confidence}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      {isListening && (
        <p className="text-xs text-muted-foreground animate-pulse">{t('speak')}...</p>
      )}
    </div>
  );
}