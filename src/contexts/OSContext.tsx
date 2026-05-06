'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { setAudioVolume } from '../utils/audioEngine';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';

// ... rest of imports

// ---------------------------------------------------------------------------
// Wallpaper definitions — inline CSS gradients avoid Tailwind purge issues
// ---------------------------------------------------------------------------
export const WALLPAPERS = [
  { label: 'Carvão',         gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%)' },
  { label: 'Oceano Profundo', gradient: 'linear-gradient(135deg, #0a0a2e 0%, #0f3460 50%, #000814 100%)' },
  { label: 'Aurora Violeta', gradient: 'linear-gradient(135deg, #1a0038 0%, #2d1b69 50%, #0a0a1e 100%)' },
  { label: 'Floresta Sombria', gradient: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #022c22 100%)' },
  { label: 'Meia-Noite Carmim', gradient: 'linear-gradient(135deg, #2e0a0a 0%, #7f1d1d 40%, #1c0a0a 100%)' },
];

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------
interface OSContextValue {
  // Audio
  volume: number;              // 0 – 100
  setVolume: (v: number) => void;

  // Display
  brightness: number;          // 0 – 100
  setBrightness: (b: number) => void;

  // Wallpaper
  wallpaperIndex: number;
  wallpaperStyle: string;      // full CSS gradient string, ready for backgroundImage
  prevWallpaperStyle: string;  // previous wallpaper for crossfade
  cycleWallpaper: () => void;

  // Focus / Do Not Disturb
  focusMode: boolean;
  toggleFocusMode: () => void;

  // Performance
  fps: number;
  lowPerformance: boolean;
}

const OSContext = createContext<OSContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [volume, setVolumeState] = useState(50);
  const [brightness, setBrightnessState] = useState(100);
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  const [prevWallpaperIndex, setPrevWallpaperIndex] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  
  const { fps, lowPerformance } = usePerformanceMonitor(35); // Limite de 35 FPS

  // Sync volume to audioEngine module — no window hack needed
  useEffect(() => {
    setAudioVolume(volume / 100);
  }, [volume]);

  // Apply brightness and performance classes to the document body
  useEffect(() => {
    const safe = 30 + brightness * 0.7; // clamp: min 30%, max 100%
    document.body.style.filter = `brightness(${safe}%)`;
    document.body.style.transition = 'filter 0.1s ease-out';
    
    if (lowPerformance) {
      document.body.classList.add('low-perf');
    } else {
      document.body.classList.remove('low-perf');
    }
  }, [brightness, lowPerformance]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(100, v)));
  }, []);

  const setBrightness = useCallback((b: number) => {
    setBrightnessState(Math.max(0, Math.min(100, b)));
  }, []);

  const cycleWallpaper = useCallback(() => {
    setWallpaperIndex((prev) => {
      setPrevWallpaperIndex(prev);
      return (prev + 1) % WALLPAPERS.length;
    });
  }, []);

  const toggleFocusMode = useCallback(() => {
    setFocusMode((prev) => !prev);
  }, []);

  const value: OSContextValue = {
    volume,
    setVolume,
    brightness,
    setBrightness,
    wallpaperIndex,
    wallpaperStyle: WALLPAPERS[wallpaperIndex].gradient,
    prevWallpaperStyle: WALLPAPERS[prevWallpaperIndex].gradient,
    cycleWallpaper,
    focusMode,
    toggleFocusMode,
    fps,
    lowPerformance,
  };

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
};

// ---------------------------------------------------------------------------
// Hook — throws a clear error if used outside the provider
// ---------------------------------------------------------------------------
export const useOSContext = (): OSContextValue => {
  const ctx = useContext(OSContext);
  if (!ctx) {
    throw new Error('useOSContext must be used inside <OSProvider>');
  }
  return ctx;
};
