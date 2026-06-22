import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Gamepad2, Mic, GraduationCap, ArrowRight, Star } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/69f421629a32baa29433f382/b4ec08f13_Screenshot2026-05-11202143.jpg";

// Rotating mascot images
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

const features = [
  { icon: BookOpen,     titleKey: 'feature1Title', descKey: 'feature1Desc', color: 'text-sky-500',    bg: 'bg-sky-100',    border: 'border-sky-200' },
  { icon: Gamepad2,     titleKey: 'feature2Title', descKey: 'feature2Desc', color: 'text-violet-500', bg: 'bg-violet-100', border: 'border-violet-200' },
  { icon: Mic,          titleKey: 'feature3Title', descKey: 'feature3Desc', color: 'text-pink-500',   bg: 'bg-pink-100',   border: 'border-pink-200' },
  { icon: GraduationCap,titleKey: 'feature4Title', descKey: 'feature4Desc', color: 'text-amber-500',  bg: 'bg-amber-100',  border: 'border-amber-200' },
];

export default function Home() {
  const { t } = useLang();
  const [mascotIdx, setMascotIdx] = useState(0);

  // Rotate mascot every 3 s
  useEffect(() => {
    const id = setInterval(() => setMascotIdx(i => (i + 1) % MASCOT_IMAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #EAF4FB 0%, #FFF8EC 60%, #FDE8F0 100%)' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Brand logo */}
            <img src={LOGO_URL} alt="kumaGO 橋" className="h-14 w-auto object-contain mb-6 mx-auto lg:mx-0 rounded-xl shadow-md" />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-tight">
              kuma<span className="text-accent">GO</span>
              <span className="font-jp ml-3 text-primary/80">橋</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mt-8">
              <Link to="/verbs">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full shadow-lg text-base font-bold">
                  {t('startFree')} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/games">
                <Button size="lg" variant="outline" className="px-8 rounded-full border-primary/30 text-primary font-bold text-base">
                  {t('gameHub')}
                </Button>
              </Link>
            </div>

            {/* Small trust badges */}
            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start flex-wrap">
              {['N5–N1 JLPT', 'Free to start', '日本語学習'].map(badge => (
                <span key={badge} className="flex items-center gap-1 text-xs font-semibold text-primary/70 bg-white/70 border border-border/40 rounded-full px-3 py-1 shadow-sm">
                  <Star className="w-3 h-3 text-accent" /> {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mascot side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 relative"
          >
            {/* Soft glow circle */}
            <div className="absolute inset-0 rounded-full bg-sky-200/40 blur-3xl scale-110" />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
              <AnimatePresence mode="wait">
                <motion.img
                  key={mascotIdx}
                  src={MASCOT_IMAGES[mascotIdx]}
                  alt="kumaGO mascot"
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-3">
              {MASCOT_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMascotIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === mascotIdx ? 'bg-primary w-4' : 'bg-primary/25'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-2xl font-black text-primary mb-8"
          >
            {t('heroTitle') || 'Learn Japanese the fun way'} 🎌
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`p-6 bg-white/80 border ${feat.border} hover:shadow-md transition-all duration-300 h-full group rounded-2xl`}>
                  <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feat.icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5">{t(feat.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(feat.descKey)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERB PREVIEW ─────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="font-jp text-3xl font-bold text-primary mb-2">日本語の動詞</h2>
            <p className="text-muted-foreground mb-8">{t('exploreVerbs')}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { kanji: '食べる', reading: 'たべる', meaning: 'to eat' },
                { kanji: '飲む',   reading: 'のむ',   meaning: 'to drink' },
                { kanji: '行く',   reading: 'いく',   meaning: 'to go' },
                { kanji: '見る',   reading: 'みる',   meaning: 'to see' },
              ].map((verb, i) => (
                <motion.div
                  key={verb.kanji}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-5 bg-white/80 border border-sky-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group rounded-2xl">
                    <p className="font-jp text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{verb.kanji}</p>
                    <p className="font-jp text-sm text-sky-600 mt-1">{verb.reading}</p>
                    <p className="text-xs text-muted-foreground mt-1">{verb.meaning}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Link to="/verbs">
              <Button variant="outline" className="mt-8 border-primary/30 text-primary hover:bg-primary/10 rounded-full font-semibold">
                {t('exploreVerbs')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-border/40 py-8 px-4 bg-primary/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="kumaGO 橋" className="h-10 w-auto object-contain rounded-xl" />
            <div className="leading-tight">
              <div className="font-black text-foreground text-sm tracking-wide">
                kuma<span className="text-accent">GO</span> <span className="font-jp">橋</span>
              </div>
              <div className="text-[9px] text-muted-foreground tracking-widest uppercase">LIGHTHOUSE 橋 · Kioku Interactive</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Interactive Japanese Learning · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}