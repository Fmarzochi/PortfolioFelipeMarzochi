'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type ColorMode =
  | 'normal'
  | 'high-contrast'
  | 'deuteranopia'
  | 'protanopia'
  | 'tritanopia'
  | 'grayscale';

interface AccessibilityContextValue {
  colorMode: ColorMode;
  setColorMode: (m: ColorMode) => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  panelOpen: boolean;
  togglePanel: () => void;
  closePanel: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const FONT_STEPS = [100, 115, 130];
const STORAGE_KEY = 'a11y-prefs';

const COLOR_MODE_CLASS: Record<ColorMode, string> = {
  normal: '',
  'high-contrast': 'a11y-high-contrast',
  deuteranopia: 'a11y-deuteranopia',
  protanopia: 'a11y-protanopia',
  tritanopia: 'a11y-tritanopia',
  grayscale: 'a11y-grayscale',
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorModeState] = useState<ColorMode>('normal');
  const [fontIndex, setFontIndex] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      if (saved.colorMode) setColorModeState(saved.colorMode as ColorMode);
      if (typeof saved.fontIndex === 'number') setFontIndex(saved.fontIndex);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ colorMode, fontIndex }));
    } catch {}

    document.documentElement.style.fontSize = `${FONT_STEPS[fontIndex]}%`;

    const all = Object.values(COLOR_MODE_CLASS).filter(Boolean);
    document.documentElement.classList.remove(...all);
    const cls = COLOR_MODE_CLASS[colorMode];
    if (cls) document.documentElement.classList.add(cls);
  }, [colorMode, fontIndex]);

  const setColorMode = useCallback((m: ColorMode) => setColorModeState(m), []);
  const increaseFontSize = useCallback(() => setFontIndex((i) => Math.min(i + 1, FONT_STEPS.length - 1)), []);
  const decreaseFontSize = useCallback(() => setFontIndex((i) => Math.max(i - 1, 0)), []);
  const resetFontSize = useCallback(() => setFontIndex(0), []);
  const togglePanel = useCallback(() => setPanelOpen((v) => !v), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  return (
    <AccessibilityContext.Provider value={{
      colorMode,
      setColorMode,
      fontSize: FONT_STEPS[fontIndex],
      increaseFontSize,
      decreaseFontSize,
      resetFontSize,
      panelOpen,
      togglePanel,
      closePanel,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextValue => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used inside <AccessibilityProvider>');
  return ctx;
};
