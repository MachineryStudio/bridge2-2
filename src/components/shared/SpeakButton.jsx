import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { speakJapanese } from '@/lib/speechUtils';
import { motion } from 'framer-motion';

export default function SpeakButton({ text, size = 'sm', className = '' }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = async (e) => {
    e?.stopPropagation();
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    await speakJapanese(text, () => setSpeaking(false));
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleSpeak}
      title={speaking ? 'Stop' : 'Hear pronunciation'}
      className={`text-primary hover:text-primary/80 transition-colors ${className} ${speaking ? 'text-accent' : ''}`}
    >
      <motion.div
        animate={speaking ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ repeat: speaking ? Infinity : 0, duration: 0.55 }}
      >
        <Volume2 className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      </motion.div>
    </Button>
  );
}