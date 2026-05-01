import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { languageNames } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, Flame, Coins, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function LangPicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => setOpen(o => !o)}>
        <Globe className="w-4 h-4" />
        <span className="text-xs">{languageNames[lang]?.flag}</span>
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
          {Object.entries(languageNames).map(([code, { name, flag }]) => (
            <button
              key={code}
              className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors ${lang === code ? 'text-primary bg-primary/5' : 'text-popover-foreground'}`}
              onClick={() => { setLang(code); setOpen(false); }}
            >
              <span>{flag}</span>{name}
            </button>
          ))}
        </div>
      )}
    </div>
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
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-gold">
              <span className="text-primary-foreground font-jp font-bold text-sm">橋</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-latin font-bold text-foreground">Bridge2</span>
              <span className="font-jp text-xs text-primary ml-1">ブリッジ</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side: Stats + Language */}
          <div className="flex items-center gap-2">
            {playerStats && (
              <div className="hidden sm:flex items-center gap-3 mr-2 text-xs">
                <div className="flex items-center gap-1 text-primary">
                  <Coins className="w-3.5 h-3.5" />
                  <span className="font-bold">{playerStats.coins || 0}</span>
                </div>
                <div className="flex items-center gap-1 text-accent-foreground">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="font-bold">{playerStats.xp || 0}</span>
                </div>
                {(playerStats.streak_days || 0) > 0 && (
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-3.5 h-3.5" />
                    <span className="font-bold">{playerStats.streak_days}</span>
                  </div>
                )}
              </div>
            )}

            <LangPicker lang={lang} setLang={setLang} />

            {/* Mobile menu toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                    size="sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              {playerStats && (
                <div className="flex items-center gap-4 pt-2 px-3 text-sm">
                  <span className="text-primary flex items-center gap-1">
                    <Coins className="w-4 h-4" /> {playerStats.coins || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-4 h-4" /> {playerStats.xp || 0} XP
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