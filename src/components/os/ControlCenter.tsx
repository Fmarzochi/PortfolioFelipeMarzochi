'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Airplay, Moon, Sun, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { useOSContext } from '../../contexts/OSContext';

interface ControlCenterProps {
  isOpen: boolean;
}

export const ControlCenter = ({ isOpen }: ControlCenterProps) => {
  // Local-only UI toggles (connectivity indicators, no global side-effects)
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(true);

  // Global OS state — no more window.osGlobalVolume hack
  const { volume, setVolume, brightness, setBrightness, focusMode, toggleFocusMode } = useOSContext();

  // ---------------------------------------------------------------------------
  // Pointer-drag engine for sliders (works with mouse AND touch)
  // ---------------------------------------------------------------------------
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
          className="absolute right-2 top-8 z-50 w-80 rounded-2xl bg-black/40 p-3 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl"
        >
          {/* Grid Superior: Conexões e Foco */}
          <div className="mb-3 grid grid-cols-2 gap-3">
            {/* Connectivity panel */}
            <div className="flex flex-col gap-3 rounded-xl bg-white/10 p-3 shadow-inner ring-1 ring-white/10">
              <div className="flex cursor-pointer items-center gap-2" onClick={() => setWifi(!wifi)}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${wifi ? 'bg-blue-500' : 'bg-white/20'}`}>
                  <Wifi size={14} className={wifi ? 'text-white' : 'text-white/50'} />
                </div>
                <span className="text-xs font-medium tracking-wide">Wi-Fi</span>
              </div>

              <div className="flex cursor-pointer items-center gap-2" onClick={() => setBluetooth(!bluetooth)}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${bluetooth ? 'bg-blue-500' : 'bg-white/20'}`}>
                  <Bluetooth size={14} className={bluetooth ? 'text-white' : 'text-white/50'} />
                </div>
                <span className="text-xs font-medium tracking-wide">Bluetooth</span>
              </div>

              <div className="flex cursor-pointer items-center gap-2" onClick={() => setAirdrop(!airdrop)}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${airdrop ? 'bg-blue-500' : 'bg-white/20'}`}>
                  <Airplay size={14} className={airdrop ? 'text-white' : 'text-white/50'} />
                </div>
                <span className="text-xs font-medium tracking-wide">AirDrop</span>
              </div>
            </div>

            {/* Focus / Do Not Disturb */}
            <div
              onClick={toggleFocusMode}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-3 shadow-inner transition-all duration-300 ${
                focusMode
                  ? 'bg-indigo-500 text-white ring-1 ring-indigo-400'
                  : 'bg-white/10 text-white/80 ring-1 ring-white/10 hover:bg-white/15'
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${focusMode ? 'bg-white/20' : 'bg-indigo-500/20 text-indigo-400'}`}>
                <Moon size={18} className={focusMode ? 'fill-white text-white' : ''} />
              </div>
              <span className="text-xs font-medium">{focusMode ? 'Foco Ativado' : 'Foco'}</span>
            </div>
          </div>

          {/* Sliders: Brilho e Volume */}
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 shadow-inner ring-1 ring-white/10">
            {/* Brightness */}
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

            {/* Volume */}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
