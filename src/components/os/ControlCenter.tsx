'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Volume2 } from 'lucide-react';
import { useOSContext, WALLPAPERS } from '../../contexts/OSContext';

interface ControlCenterProps {
  isOpen: boolean;
}

export const ControlCenter = ({ isOpen }: ControlCenterProps) => {
  const { volume, setVolume, brightness, setBrightness, focusMode, toggleFocusMode, cycleWallpaper, wallpaperIndex } = useOSContext();

  const handleSliderDrag = (
    e: React.PointerEvent<HTMLDivElement>,
    setter: (v: number) => void
  ) => {
    const slider = e.currentTarget;
    e.currentTarget.setPointerCapture(e.pointerId);

    const updateValue = (clientX: number) => {
      const rect = slider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setter(pct);
    };

    updateValue(e.clientX);

    const onMove = (ev: PointerEvent) => updateValue(ev.clientX);
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute right-2 top-8 z-50 w-72 rounded-2xl bg-black/40 p-3 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl"
        >
          {/* Focus / Do Not Disturb */}
          <div
            onClick={toggleFocusMode}
            className={`mb-3 flex cursor-pointer items-center gap-3 rounded-xl p-3 shadow-inner transition-all duration-300 ${
              focusMode
                ? 'bg-indigo-500 ring-1 ring-indigo-400'
                : 'bg-white/10 ring-1 ring-white/10 hover:bg-white/15'
            }`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${focusMode ? 'bg-white/20' : 'bg-indigo-500/20'}`}>
              <Moon size={18} className={focusMode ? 'fill-white text-white' : 'text-indigo-400'} />
            </div>
            <div>
              <p className="text-sm font-semibold">{focusMode ? 'Foco Ativado' : 'Foco'}</p>
              <p className="text-[11px] text-white/50">{focusMode ? 'Desktop escurecido' : 'Silenciar distrações'}</p>
            </div>
          </div>

          {/* Sliders: Brilho e Volume */}
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 shadow-inner ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <Sun size={14} className="shrink-0 text-white/50" />
              <div
                className="relative h-6 flex-1 cursor-ew-resize touch-none overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10"
                onPointerDown={(e) => handleSliderDrag(e, setBrightness)}
              >
                <div
                  className="h-full bg-white/90 transition-all duration-75 ease-out"
                  style={{ width: `${brightness}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Volume2 size={14} className="shrink-0 text-white/50" />
              <div
                className="relative h-6 flex-1 cursor-ew-resize touch-none overflow-hidden rounded-full bg-black/40 ring-1 ring-white/10"
                onPointerDown={(e) => handleSliderDrag(e, setVolume)}
              >
                <div
                  className="h-full bg-white/90 transition-all duration-75 ease-out"
                  style={{ width: `${volume}%` }}
                />
              </div>
            </div>
          </div>

          {/* Wallpaper picker */}
          <div className="mt-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/10 flex items-center justify-between">
            <span className="text-xs font-medium">Fundo: {WALLPAPERS[wallpaperIndex].label}</span>
            <button
              onClick={cycleWallpaper}
              className="rounded-lg bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/80 hover:bg-white/25 transition-colors"
            >
              Mudar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
