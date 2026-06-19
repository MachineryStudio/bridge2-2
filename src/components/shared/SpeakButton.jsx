import React, { useState, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { speakJapanese } from '@/lib/speechUtils';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

// Cache generated audio URLs so we don't regenerate (and re-spend credits) for the same text
const audioCache = new Map();

export default function SpeakButton({ text, size = 'sm', className = '' }) {
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);

  const stop = () => {
    window.speechSynthesis?.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSpeaking(false);
  };

  const playUrl = (url) => {
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setSpeaking(false);
    audio.onerror = () => setSpeaking(false);
    audio.play().catch(() => setSpeaking(false));
  };

  const handleSpeak = async (e) => {
    e?.stopPropagation();
    if (speaking) {
      stop();
      return;
    }
    setSpeaking(true);

    // 1. Try the device's native Japanese voice (free, instant)
    const usedNative = await speakJapanese(text, () => setSpeaking(false));
    if (usedNative) return;

    // 2. No native Japanese voice on this device → use server-generated native speech
    if (audioCache.has(text)) {
      playUrl(audioCache.get(text));
      return;
    }
    try {
      const { url } = await base44.integrations.Core.GenerateSpeech({
        text,
        voice: 'honey',
        language_code: 'ja',
      });
      audioCache.set(text, url);
      playUrl(url);
    } catch {
      setSpeaking(false);
    }
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