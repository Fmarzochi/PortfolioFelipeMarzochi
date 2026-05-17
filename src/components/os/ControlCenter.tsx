'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Volume2, Gauge } from 'lucide-react';
import { useOSContext, WALLPAPERS } from '../../contexts/OSContext';
import { FocusTrap } from '../common/FocusTrap';

interface ControlCenterProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const ControlCenter = ({ isOpen, onClose }: ControlCenterProps) => {
  const { 
    volume, setVolume, brightness, setBrightness, 
    focusMode, toggleFocusMode, cycleWallpaper, 
    wallpaperIndex, fps, lowPerformance 
  } = useOSContext();

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
          className="absolute right-2 top-8 z-50 w-72 rounded-2xl p-3 text-white liquid-glass"
        >
          <FocusTrap isActive={isOpen} onEscape={onClose}>
            <div
              onClick={toggleFocusMode}
              className={`mb-3 flex cursor-pointer items-center gap-3 rounded-xl p-3 shadow-inner transition-all duration-300 ${
                focusMode
                  ? 'bg-indigo-500 ring-1 ring-indigo-400'
                  : 'bg-white/10 ring-1 ring-white/10 hover:bg-white/15'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleFocusMode(); }}
              aria-label={focusMode ? 'Desativar modo foco' : 'Ativar modo foco'}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${focusMode ? 'bg-white/20' : 'bg-indigo-500/20'}`}>
                <Moon size={18} className={focusMode ? 'fill-white text-white' : 'text-indigo-400'} />
              </div>
              <div>
                <p className="text-sm font-semibold">{focusMode ? 'Foco Ativado' : 'Foco'}</p>
                <p className="text-[11px] text-white/60">{focusMode ? 'Desktop escurecido' : 'Silenciar distrações'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3">
                <Sun size={14} className="shrink-0 text-white/60" />
                <div
                  className="relative h-[22px] flex-1 cursor-ew-resize touch-none overflow-hidden rounded-full"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '0.5px solid rgba(255,255,255,0.08)' }}
                  onPointerDown={(e) => handleSliderDrag(e, setBrightness)}
                  role="slider"
                  aria-label="Brilho do sistema"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(brightness)}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'ArrowRight') setBrightness(Math.min(100, brightness + 5));
                    if (e.key === 'ArrowLeft') setBrightness(Math.max(0, brightness - 5));
                  }}
                >
                  <div
                    className="h-full transition-all duration-75 ease-out"
                    style={{ width: `${brightness}%`, background: 'rgba(255,255,255,0.88)' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 size={14} className="shrink-0 text-white/60" />
                <div
                  className="relative h-[22px] flex-1 cursor-ew-resize touch-none overflow-hidden rounded-full"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '0.5px solid rgba(255,255,255,0.08)' }}
                  onPointerDown={(e) => handleSliderDrag(e, setVolume)}
                  role="slider"
                  aria-label="Volume do sistema"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(volume)}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'ArrowRight') setVolume(Math.min(100, volume + 5));
                    if (e.key === 'ArrowLeft') setVolume(Math.max(0, volume - 5));
                  }}
                >
                  <div
                    className="h-full transition-all duration-75 ease-out"
                    style={{ width: `${volume}%`, background: 'rgba(255,255,255,0.88)' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl p-3 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
              <span className="text-xs font-medium">Fundo: {WALLPAPERS[wallpaperIndex].label}</span>
              <button
                onClick={cycleWallpaper}
                className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white/80 transition-colors"
                style={{ background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.15)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
              >
                Mudar
              </button>
            </div>

            <div className="mt-2 rounded-xl px-3 py-2 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <Gauge size={12} className={lowPerformance ? 'text-amber-400' : 'text-green-400'} />
                <span className="text-[10px] font-medium text-white/60 uppercase tracking-wider">Performance</span>
              </div>
              <div className="flex items-center gap-2">
                {lowPerformance && <span className="text-[9px] font-bold text-amber-400/80 animate-pulse">MODO ECO</span>}
                <span className={`text-[11px] font-mono ${lowPerformance ? 'text-amber-400' : 'text-green-400'}`}>{fps} FPS</span>
              </div>
            </div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
