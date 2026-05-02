import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Mic, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  { icon: BookOpen, titleKey: 'feature1Title', descKey: 'feature1Desc', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Gamepad2, titleKey: 'feature2Title', descKey: 'feature2Desc', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Mic, titleKey: 'feature3Title', descKey: 'feature3Desc', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: GraduationCap, titleKey: 'feature4Title', descKey: 'feature4Desc', color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

export default function Home() {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32 px-4">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 font-jp text-8xl text-primary/5 font-black select-none hidden lg:block">橋</div>
        <div className="absolute bottom-20 right-10 font-jp text-8xl text-primary/5 font-black select-none hidden lg:block">学</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-medium">{t('appNameJp')}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight whitespace-pre-line">
              {t('heroTitle')}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link to="/verbs">
                <Button size="lg" className="bg-primary text-primary-foreground px-8 text-lg glow-gold">
                  {t('startFree')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/games">
                <Button size="lg" variant="outline" className="px-8 text-lg border-border/50">
                  {t('gameHub')}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating kanji */}
          <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
            {['食', '書', '読', '話', '見', '行', '来', '飲'].map((char, i) => (
              <motion.span
                key={char}
                className="absolute font-jp text-primary/[0.04] font-black"
                style={{
                  fontSize: `${30 + Math.random() * 40}px`,
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.titleKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Card className="p-6 bg-card border-border/50 hover:border-primary/20 transition-all duration-300 h-full group">
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feat.icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t(feat.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(feat.descKey)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Preview */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-jp text-3xl font-bold text-foreground mb-3">日本語の動詞</h2>
            <p className="text-muted-foreground mb-8">{t('exploreVerbs')}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { kanji: '食べる', reading: 'たべる', meaning: 'to eat' },
                { kanji: '飲む', reading: 'のむ', meaning: 'to drink' },
                { kanji: '行く', reading: 'いく', meaning: 'to go' },
                { kanji: '見る', reading: 'みる', meaning: 'to see' },
              ].map((verb, i) => (
                <motion.div
                  key={verb.kanji}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-5 bg-card border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
                    <p className="font-jp text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{verb.kanji}</p>
                    <p className="font-jp text-sm text-primary mt-1">{verb.reading}</p>
                    <p className="text-xs text-muted-foreground mt-1">{verb.meaning}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Link to="/verbs">
              <Button variant="outline" className="mt-8 border-primary/30 text-primary hover:bg-primary/10">
                {t('exploreVerbs')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://media.base44.com/images/public/69f421629a32baa29433f382/c02d2eefc_Screenshot2026-05-02111817.jpg"
              alt="Lighthouse logo"
              className="h-8 w-auto object-contain rounded"
            />
            <div className="leading-tight">
              <div className="font-bold text-foreground text-sm tracking-wide">LIGHTHOUSE <span className="font-jp text-primary">橋</span></div>
              <div className="text-[9px] text-muted-foreground tracking-widest uppercase">Kioku Interactive</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Interactive Japanese Memory Game</p>
        </div>
      </footer>
    </div>
  );
}