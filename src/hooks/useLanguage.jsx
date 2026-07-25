const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\hooks\\useLanguage.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import React, { createContext, useContext, useState, } from 'react';
import { translations, } from '@/lib/translations';







const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return (localStorage.getItem('app_language') ) || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key) => {
    const translation = translations[language];
    if (!translation) return translations['en'][key] || key;
    return translation[key] || translations['en'][key] || key;
  };

  return (
    _jsxDEV(LanguageContext.Provider, { value: { language, setLanguage, t }, children: 
      children
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this)
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
