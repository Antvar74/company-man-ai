// Ruta: src/contexts/i18n-context.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { translations, TranslationKey, Language, NestedTranslation } from '@/lib/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, options?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en'); // Default to English

  useEffect(() => {
    const storedLang = localStorage.getItem('appLanguage') as Language;
    if (storedLang && translations[storedLang]) {
      setLanguageState(storedLang);
    } else {
        const browserLang = navigator.language.split('-')[0] as Language;
        if (translations[browserLang]) {
          setLanguageState(browserLang);
        }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const t = useCallback((key: TranslationKey, options?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let currentTranslation: string | NestedTranslation | undefined = translations[language];
    let fallbackTranslation: string | NestedTranslation | undefined = translations['en'];

    for (const k of keys) {
      if (currentTranslation && typeof currentTranslation === 'object' && k in currentTranslation) {
        currentTranslation = (currentTranslation as NestedTranslation)[k];
      } else {
        currentTranslation = undefined;
        break;
      }
    }

    if (currentTranslation === undefined) {
        for (const k of keys) {
            if (fallbackTranslation && typeof fallbackTranslation === 'object' && k in fallbackTranslation) {
                fallbackTranslation = (fallbackTranslation as NestedTranslation)[k];
            } else {
                fallbackTranslation = key;
                break;
            }
        }
        currentTranslation = fallbackTranslation;
    }

    if (typeof currentTranslation === 'string') {
      if (options) {
        return Object.entries(options).reduce((str, [optKey, optValue]) => {
          return str.replace(`{{${optKey}}}`, String(optValue));
        }, currentTranslation);
      }
      return currentTranslation;
    }
    return key;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};