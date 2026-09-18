import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from '../lib/translations';

type Language = 'bn' | 'en' | 'hi' | 'ar' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_language') as Language;
      if (saved && translations[saved]) return saved;
    } catch {
      // ignore
    }
    return 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr';
    } catch {
      // ignore
    }
  };

  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = (language === 'ar' || language === 'ur') ? 'rtl' : 'ltr';
  }, [language]);

  const t = translations[language] || translations['en'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
