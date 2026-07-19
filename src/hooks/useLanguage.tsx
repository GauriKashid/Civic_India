import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, LanguageCode } from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('app_language') as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[language];
    if (!translation) return translations['en'][key] || key;
    return translation[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
