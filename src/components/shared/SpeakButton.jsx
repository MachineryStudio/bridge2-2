import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { speakJapanese } from '@/lib/speechUtils';
import { motion } from 'framer-motion';

export default function SpeakButton({ text, size = 'sm', className = '' }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e) => {
    e?.stopPropagation();
    setSpeaking(true);
    speakJapanese(text, () => setSpeaking(false));
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={handleSpeak}
      className={`text-primary hover:text-primary/80 ${className}`}
    >
      <motion.div
        animate={speaking ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: speaking ? Infinity : 0, duration: 0.6 }}
      >
        <Volume2 className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      </motion.div>
    </Button>
  );
}