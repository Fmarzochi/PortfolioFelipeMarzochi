'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, TRANSLATIONS, Translations } from '../constants/translations';

interface LocationInfo {
  city?: string;
  country?: string;
  countryCode?: string;
}

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  location: LocationInfo | null;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  setLang: () => undefined,
  t: TRANSLATIONS['pt'],
  location: null,
});

function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'pt';
  const nav = navigator.language || '';
  const base = nav.split('-')[0].toLowerCase();
  if (base === 'pt') return 'pt';
  if (base === 'es') return 'es';
  if (base === 'en') return 'en';
  return 'pt';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt');
  const [location, setLocation] = useState<LocationInfo | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as Lang | null;
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      setLangState(saved);
    } else {
      const detected = detectLang();
      setLangState(detected);
    }

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        setLocation({ city: data.city, country: data.country_name, countryCode: data.country_code });
        if (!localStorage.getItem('portfolio_lang')) {
          const cc = (data.country_code || '').toLowerCase();
          if (cc === 'br' || cc === 'pt') {
            setLangState('pt');
          } else if (['es', 'mx', 'ar', 'co', 'cl', 'pe', 've', 'ec', 'bo', 'py', 'uy'].includes(cc)) {
            setLangState('es');
          } else {
            setLangState('en');
          }
        }
      })
      .catch(() => {});
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('portfolio_lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang], location }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
