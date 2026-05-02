'use client';

import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Search, SlidersHorizontal } from 'lucide-react';
import { ControlCenter } from './ControlCenter';

const AppleLogo = () => (
  <svg
    width="13"
    height="15"
    viewBox="0 0 814 1000"
    className="fill-white/90 flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 680.6 0 560.5 0 445.4c0-175 113.8-267.8 225.9-267.8 59.8 0 109.7 39.5 147.4 39.5 36 0 92.7-42.1 159.4-42.1 25.4 0 108.2 2.6 168.5 80.5zm-80.6-155.1c30.2-35.5 49.2-84.7 49.2-133.9 0-6.5-.6-13-1.9-18.3-47.6 1.9-104.3 32.1-137.4 72.1-29.5 35.5-54.2 84.7-54.2 134.6 0 7.1.6 14.3 1.3 16.6 3.2.6 8.4 1.3 13.6 1.3 42.8 0 96.9-29.5 129.4-72.4z" />
  </svg>
);

const MENU_ITEMS = ['Arquivo', 'Editar', 'Exibir', 'Ir', 'Janela', 'Ajuda'] as const;

export const TopBar = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/,/g, '');

  return (
    <div className="relative z-50 flex h-7 w-full items-center justify-between px-3 text-[13px] font-medium text-white/88 liquid-glass-menubar select-none">

      {/* ── Left: Apple Logo + App Name + Menus ───────────────────────────── */}
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center w-5 h-full transition-opacity hover:opacity-70 cursor-pointer">
          <AppleLogo />
        </button>

        <span className="font-semibold tracking-tight text-white cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          Felipe Marzochi
        </span>

        <div className="hidden sm:flex items-center gap-0.5 text-white/78">
          {MENU_ITEMS.map((item) => (
            <span
              key={item}
              className="cursor-pointer hover:bg-white/12 px-2 py-0.5 rounded transition-colors whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right: Status Icons + Clock ────────────────────────────────────── */}
      <div className="flex items-center gap-3 text-white/78">
        <BatteryMedium size={14} className="cursor-pointer hover:text-white transition-colors" />
        <Wifi size={14} className="cursor-pointer hover:text-white transition-colors" />
        <Search size={14} className="cursor-pointer hover:text-white transition-colors" />

        <SlidersHorizontal
          size={14}
          className={`cursor-pointer transition-colors ${
            isControlCenterOpen ? 'text-blue-400' : 'hover:text-white'
          }`}
          onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
        />

        <span className="cursor-pointer hover:text-white transition-colors tabular-nums text-white/90">
          {time ? formatTime(time) : '···'}
        </span>
      </div>

      {/* ── Control Center ─────────────────────────────────────────────────── */}
      <ControlCenter isOpen={isControlCenterOpen} />
    </div>
  );
};
