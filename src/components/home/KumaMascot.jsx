import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  "こんにちは！ Ready to learn? 🌟",
  "Let's practice together! がんばろう！",
  "You're doing great! すごい！✨",
  "Nihongo is fun! 日本語楽しい！",
  "一緒に勉強しよう！",
  "頑張って！ Keep going! 🐻",
  "今日も一緒に！ Let's go!",
  "Japanese every day! 毎日！",
];

// Full-body SVG anime bear character
function KumaBear({ blinking, mouthOpen, waveArm }) {
  return (
    <svg
      viewBox="0 0 160 220"
      width="160"
      height="220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Shadow ── */}
      <ellipse cx="80" cy="214" rx="36" ry="6" fill="rgba(0,0,0,0.10)" />

      {/* ── Body ── */}
      <ellipse cx="80" cy="158" rx="38" ry="46" fill="#7EC8E3" />

      {/* Tummy patch */}
      <ellipse cx="80" cy="162" rx="22" ry="28" fill="#B8E4F2" />

      {/* ── Legs ── */}
      <rect x="52" y="192" width="20" height="22" rx="10" fill="#7EC8E3" />
      <rect x="88" y="192" width="20" height="22" rx="10" fill="#7EC8E3" />
      {/* Paw pads */}
      <ellipse cx="62" cy="214" rx="10" ry="6" fill="#5BAFC8" />
      <ellipse cx="98" cy="214" rx="10" ry="6" fill="#5BAFC8" />

      {/* ── Left arm (static) ── */}
      <motion.g
        style={{ originX: '28px', originY: '140px' }}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="18" y="136" width="18" height="38" rx="9" fill="#7EC8E3" />
        <ellipse cx="27" cy="176" rx="9" ry="7" fill="#5BAFC8" />
      </motion.g>

      {/* ── Right arm (waves) ── */}
      <motion.g
        style={{ originX: '132px', originY: '140px' }}
        animate={waveArm
          ? { rotate: [0, -30, 0, -30, 0] }
          : { rotate: [4, -4, 4] }
        }
        transition={waveArm
          ? { duration: 0.8, repeat: 3, repeatType: 'loop' }
          : { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }
        }
      >
        <rect x="124" y="136" width="18" height="38" rx="9" fill="#7EC8E3" />
        <ellipse cx="133" cy="176" rx="9" ry="7" fill="#5BAFC8" />
      </motion.g>

      {/* ── Head ── */}
      {/* Ears */}
      <circle cx="44" cy="68" r="16" fill="#7EC8E3" />
      <circle cx="44" cy="68" r="10" fill="#B8E4F2" />
      <circle cx="116" cy="68" r="16" fill="#7EC8E3" />
      <circle cx="116" cy="68" r="10" fill="#B8E4F2" />

      {/* Head main */}
      <circle cx="80" cy="88" r="46" fill="#7EC8E3" />

      {/* Muzzle */}
      <ellipse cx="80" cy="104" rx="18" ry="13" fill="#B8E4F2" />

      {/* ── Eyes ── */}
      {/* Left eye white */}
      <ellipse cx="64" cy="84" rx="9" ry={blinking ? 1.5 : 10} fill="white" />
      {/* Left pupil */}
      {!blinking && (
        <>
          <circle cx="65" cy="85" r="5.5" fill="#1A2A4A" />
          {/* Shine */}
          <circle cx="67" cy="83" r="2" fill="white" />
        </>
      )}

      {/* Right eye white */}
      <ellipse cx="96" cy="84" rx="9" ry={blinking ? 1.5 : 10} fill="white" />
      {/* Right pupil */}
      {!blinking && (
        <>
          <circle cx="97" cy="85" r="5.5" fill="#1A2A4A" />
          {/* Shine */}
          <circle cx="99" cy="83" r="2" fill="white" />
        </>
      )}

      {/* Blush cheeks */}
      <ellipse cx="50" cy="98" rx="9" ry="5" fill="#FFB3C6" opacity="0.55" />
      <ellipse cx="110" cy="98" rx="9" ry="5" fill="#FFB3C6" opacity="0.55" />

      {/* Nose */}
      <ellipse cx="80" cy="100" rx="5" ry="3.5" fill="#1A2A4A" />

      {/* Mouth */}
      {mouthOpen ? (
        // Happy open mouth
        <>
          <path d="M70 108 Q80 118 90 108" stroke="#1A2A4A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M70 108 Q80 116 90 108" fill="#FF6B8A" opacity="0.7" />
        </>
      ) : (
        // Small smile
        <path d="M72 107 Q80 114 88 107" stroke="#1A2A4A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      )}

      {/* Ear inner accent */}
      <circle cx="44" cy="68" r="5" fill="#FFB3C6" opacity="0.5" />
      <circle cx="116" cy="68" r="5" fill="#FFB3C6" opacity="0.5" />

      {/* Scarf / ribbon */}
      <rect x="54" y="126" width="52" height="10" rx="5" fill="#FF6B8A" opacity="0.85" />
      <rect x="76" y="124" width="8" height="14" rx="4" fill="#FF6B8A" />
    </svg>
  );
}

export default function KumaMascot() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [waveArm, setWaveArm] = useState(false);

  // Rotate message every 3.5s
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
      setMouthOpen(true);
      setWaveArm(true);
      setTimeout(() => setMouthOpen(false), 1400);
      setTimeout(() => setWaveArm(false), 2600);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Random blink
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 130);
      setTimeout(blink, 2200 + Math.random() * 2800);
    };
    const t = setTimeout(blink, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Glow halo */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-44 h-44 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute w-32 h-32 rounded-full bg-pink-200/40 blur-2xl" />

        {/* Floating sparkles */}
        {[
          { x: -80, y: -30, delay: 0,   size: 14, color: '#FFD700' },
          { x:  80, y: -50, delay: 0.5, size: 11, color: '#FF9ECD' },
          { x: -70, y:  60, delay: 1.0, size: 10, color: '#7EC8E3' },
          { x:  75, y:  50, delay: 1.5, size: 13, color: '#FFD700' },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none z-20"
            style={{ left: `calc(50% + ${s.x}px)`, top: `calc(50% + ${s.y}px)` }}
            animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5], rotate: [0, 18, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill={s.color}>
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
            </svg>
          </motion.div>
        ))}

        {/* Bear — gentle bob */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <KumaBear blinking={blinking} mouthOpen={mouthOpen} waveArm={waveArm} />
        </motion.div>
      </div>

      {/* Speech bubble */}
      <div className="relative mt-2 h-12 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIdx}
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl px-5 py-2 shadow-md border border-sky-100 text-xs font-bold text-primary text-center max-w-[240px]"
          >
            {MESSAGES[msgIdx]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}