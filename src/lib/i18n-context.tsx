import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type Dict, type Locale, getDict } from '@/lib/i18n';

interface I18nContextValue {
  locale: Locale;
  dict: Dict;
  dir: 'ltr' | 'rtl';
  setLocale: (l: Locale) => void;
  toggle: () => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'yarnmuse-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const dict = getDict(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, dir]);

  const value: I18nContextValue = {
    locale,
    dict,
    dir,
    setLocale: (l) => setLocaleState(l),
    toggle: () => setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en')),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
