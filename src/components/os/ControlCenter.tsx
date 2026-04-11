'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Airplay, Moon, Sun, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface ControlCenterProps {
  isOpen: boolean;
}

export const ControlCenter = ({ isOpen }: ControlCenterProps) => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute right-2 top-8 z-50 w-80 rounded-2xl bg-black/40 p-3 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl"
        >
          {/* Grid Superior: Conexões e Foco */}
          <div className="mb-3 grid grid-cols-2 gap-3">
            {/* Bloco de Conexões */}
            <div className="flex flex-col gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/10 shadow-inner">
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

            {/* Bloco de Não Perturbe */}
            <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-white/10 p-3 ring-1 ring-white/10 shadow-inner transition-colors hover:bg-white/15">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                <Moon size={18} />
              </div>
              <span className="text-xs font-medium">Foco</span>
            </div>
          </div>

          {/* Sliders: Brilho e Volume */}
          <div className="flex flex-col gap-3 rounded-xl bg-white/10 p-3 ring-1 ring-white/10 shadow-inner">
            <div className="flex items-center gap-3">
              <Sun size={14} className="text-white/50" />
              <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/5">
                <div className="h-full w-[80%] bg-white/80 transition-all" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Volume2 size={14} className="text-white/50" />
              <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/5">
                <div className="h-full w-[50%] bg-white/80 transition-all" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};