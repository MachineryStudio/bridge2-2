import React, { createContext, useContext, useState } from 'react';
import { getTranslation } from './i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('bridge2_lang') || 'en';
    } catch { return 'en'; }
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    try { localStorage.setItem('bridge2_lang', newLang); } catch {}
  };

  const t = (key) => getTranslation(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}