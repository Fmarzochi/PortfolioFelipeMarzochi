'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS, Translations } from '../constants/translations';

interface LocationInfo {
  city?: string;
  country?: string;
  countryCode?: string;
}

interface LanguageContextType {
  t: Translations;
  location: LocationInfo | null;
}

const LanguageContext = createContext<LanguageContextType>({
  t: TRANSLATIONS,
  location: null,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationInfo | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        setLocation({ city: data.city, country: data.country_name, countryCode: data.country_code });
      })
      .catch(() => {});
  }, []);

  return (
    <LanguageContext.Provider value={{ t: TRANSLATIONS, location }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
