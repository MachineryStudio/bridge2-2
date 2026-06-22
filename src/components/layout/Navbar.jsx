import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Flame, Coins, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/69f421629a32baa29433f382/b4ec08f13_Screenshot2026-05-11202143.jpg";

function LangPicker({ lang, setLang }) {
  const isJa = lang === 'ja';
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-xs border-border/60 gap-1 font-bold rounded-full px-3"
      onClick={() => setLang(isJa ? 'en' : 'ja')}
    >
      <span>{isJa ? '🇬🇧' : '🇯🇵'}</span>
      {isJa ? 'EN' : 'JP'}
    </Button>
  );
}

export default function Navbar({ playerStats }) {
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/verbs', label: t('verbStudy') },
    { path: '/grammar', label: t('grammarStudy') },
    { path: '/games', label: t('gameHub') },
    { path: '/quiz', label: 'Quiz' },
    { path: '/profile', label: 'Profile' },
    { path: '/kumago', label: 'kumaGO 橋' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-border/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={LOGO_URL}
              alt="kumaGO 橋"
              className="h-10 w-auto object-contain rounded-lg"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    isActive(item.path)
                      ? "bg-primary text-white font-semibold rounded-full px-4"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/60 rounded-full px-4"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side: Stats + Language */}
          <div className="flex items-center gap-2 shrink-0">
            {playerStats && (
              <div className="hidden sm:flex items-center gap-3 mr-1 text-xs bg-secondary/50 rounded-full px-3 py-1">
                <div className="flex items-center gap-1 text-primary font-bold">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{playerStats.coins || 0}</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-foreground/70">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <span>{playerStats.xp || 0}</span>
                </div>
                {(playerStats.streak_days || 0) > 0 && (
                  <div className="flex items-center gap-1 text-orange-500 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{playerStats.streak_days}</span>
                  </div>
                )}
              </div>
            )}

            <LangPicker lang={lang} setLang={setLang} />

            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border/50 bg-white/98 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl ${isActive(item.path) ? 'bg-primary text-white' : ''}`}
                    size="sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              {playerStats && (
                <div className="flex items-center gap-4 pt-2 px-3 text-sm">
                  <span className="text-primary flex items-center gap-1 font-bold">
                    <Coins className="w-4 h-4" /> {playerStats.coins || 0}
                  </span>
                  <span className="flex items-center gap-1 font-bold">
                    <Zap className="w-4 h-4 text-accent" /> {playerStats.xp || 0} XP
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}