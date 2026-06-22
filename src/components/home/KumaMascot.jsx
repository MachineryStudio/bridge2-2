import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MASCOT_IMAGES = [
  "https://media.base44.com/images/public/69f421629a32baa29433f382/45159e0bf_Screenshot2026-05-11204106.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/365753c65_Screenshot2026-05-11204140.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/e95b3160a_Screenshot2026-05-11204149.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/6b7f7fe3a_Screenshot2026-05-11204159.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/dd139dae1_Screenshot2026-05-11204208.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/9acc0e2b7_Screenshot2026-05-11204231.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/5d4052410_Screenshot2026-05-11204240.jpg",
  "https://media.base44.com/images/public/69f421629a32baa29433f382/dce2df14f_Screenshot2026-05-11213807.jpg",
];

// Cute speech bubbles that rotate with the mascot
const MESSAGES = [
  "こんにちは！ Ready to learn? 🌟",
  "Let's practice together! がんばろう！",
  "You're doing great! すごい！✨",
  "Nihongo is fun! 日本語楽しい！",
  "一緒に勉強しよう！ Let's study!",
  "頑張って！ Keep going! 🐻",
  "今日も一緒に！ Let's go today!",
  "Japanese every day! 毎日日本語！",
];

export default function KumaMascot() {
  const [idx, setIdx] = useState(0);
  const [blinking, setBlinking] = useState(false);

  // Rotate every 3s
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % MASCOT_IMAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  // Blink randomly
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
      setTimeout(blink, 2000 + Math.random() * 3000);
    };
    const t = setTimeout(blink, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Outer stage */}
      <div className="relative flex items-center justify-center">
        {/* Big soft glow */}
        <div className="absolute w-72 h-72 rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute w-56 h-56 rounded-full bg-pink-200/30 blur-2xl" />

        {/* Floating anime sparkles */}
        {[
          { x: -110, y: -60, delay: 0,   size: 18, color: '#FFD700' },
          { x:  110, y: -80, delay: 0.4, size: 14, color: '#FF9ECD' },
          { x: -90,  y:  80, delay: 0.8, size: 12, color: '#7EC8E3' },
          { x:  100, y:  60, delay: 1.2, size: 16, color: '#FFD700' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y}px)` }}
            animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6], rotate: [0, 20, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: s.delay }}
          >
            {/* Anime star / sparkle */}
            <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill={s.color}>
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
            </svg>
          </motion.div>
        ))}

        {/* Character card — gentle bob */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          {/* Card frame */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={MASCOT_IMAGES[idx]}
                alt="kumaGO mascot"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.08, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotate: 2 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />
            </AnimatePresence>

            {/* Anime eye-shine overlay — blink */}
            <AnimatePresence>
              {blinking && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.08 }}
                >
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Left eye blink line */}
                    <rect x="28" y="34" width="14" height="4" rx="2" fill="white" opacity="0.9" />
                    {/* Right eye blink line */}
                    <rect x="58" y="34" width="14" height="4" rx="2" fill="white" opacity="0.9" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Anime sparkle shine on card corner */}
            <motion.div
              className="absolute top-2 right-3 pointer-events-none"
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
              </svg>
            </motion.div>
          </div>

          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="relative bg-white rounded-2xl px-4 py-2 shadow-lg border border-sky-100 text-xs font-bold text-primary text-center max-w-[220px]">
                {MESSAGES[idx]}
                {/* Bubble tail */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-sky-100 rotate-45" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dot nav — below speech bubble gap */}
      <div className="flex justify-center gap-2 mt-16">
        {MASCOT_IMAGES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIdx(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-6 bg-primary' : 'w-2 bg-primary/25'}`}
          />
        ))}
      </div>
    </div>
  );
}