import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', greeting: 'Hello! I\'m MIYU ♡' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', greeting: 'こんにちは！MIYUです ♡' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', greeting: 'Bonjour! Je suis MIYU ♡' },
  { code: 'zh', label: '中文', flag: '🇨🇳', greeting: '你好！我是MIYU ♡' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', greeting: '안녕하세요! MIYU예요 ♡' },
  { code: 'es', label: 'Español', flag: '🇪🇸', greeting: '¡Hola! Soy MIYU ♡' },
];

const MIYU_IMG = 'https://media.base44.com/images/public/69f421629a32baa29433f382/fd3148364_generated_image.png';

export default function MiyuSetup({ onComplete, onClose }) {
  const [name, setName] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');

  const handleStart = () => {
    onComplete({ name: name.trim(), lang: selectedLang });
  };

  const labels = {
    en: { title: 'Customer Service Friend', subtitle: 'Enter your name (optional)', namePlaceholder: 'Your name...', start: 'Start Chat', skip: 'Skip' },
    ja: { title: 'カスタマーサービス', subtitle: 'お名前を入力してください（任意）', namePlaceholder: 'お名前...', start: 'チャット開始', skip: 'スキップ' },
    fr: { title: 'Service Client', subtitle: 'Entrez votre nom (optionnel)', namePlaceholder: 'Votre nom...', start: 'Commencer', skip: 'Passer' },
    zh: { title: '客户服务', subtitle: '请输入您的姓名（可选）', namePlaceholder: '您的姓名...', start: '开始聊天', skip: '跳过' },
    ko: { title: '고객 서비스', subtitle: '이름을 입력하세요 (선택 사항)', namePlaceholder: '이름...', start: '채팅 시작', skip: '건너뛰기' },
    es: { title: 'Servicio al Cliente', subtitle: 'Ingresa tu nombre (opcional)', namePlaceholder: 'Tu nombre...', start: 'Iniciar', skip: 'Omitir' },
  };

  const L = labels[selectedLang];

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary font-jp text-sm font-bold">MIYU</span>
          <span className="text-xs text-muted-foreground">✦ {L.title}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Character */}
      <motion.div
        className="flex justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={MIYU_IMG}
          alt="MIYU"
          className="h-44 object-contain drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 4px 16px hsla(43,55%,52%,0.25))' }}
        />
      </motion.div>

      {/* Greeting bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm font-medium"
        style={{ background: 'linear-gradient(135deg, hsl(260,35%,28%), hsl(225,25%,22%))' }}
      >
        <span className="text-foreground">{LANGUAGES.find(l => l.code === selectedLang)?.greeting}</span>
        <br />
        <span className="text-muted-foreground text-xs mt-1 block">{L.subtitle}</span>
      </motion.div>

      {/* Name input */}
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={L.namePlaceholder}
        className="bg-secondary/50 border-border/50 text-foreground text-sm"
        onKeyDown={e => e.key === 'Enter' && handleStart()}
      />

      {/* Language selector */}
      <div className="flex flex-wrap gap-1.5">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
              selectedLang === lang.code
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-secondary/30 border-border/50 text-muted-foreground hover:border-primary/30'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>

      {/* Start button */}
      <Button
        className="w-full bg-primary text-primary-foreground font-bold"
        onClick={handleStart}
      >
        {L.start} ♡
      </Button>
    </div>
  );
}