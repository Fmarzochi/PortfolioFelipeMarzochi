'use client';

import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Search, SlidersHorizontal } from 'lucide-react';
import { ControlCenter } from './ControlCenter';
import { useWindowManager } from '../../store/useWindowManager';

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

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MENU_ITEMS = ['Arquivo', 'Editar', 'Exibir', 'Ir', 'Janela', 'Ajuda'] as const;

export const TopBar = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const { windows } = useWindowManager();

  const anyFullScreen = windows.some((w) => w.isOpen && !w.isMinimized && w.isFullScreen);

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
    /* Wrapper: always occupies the top strip (28px). When fullscreen, the inner
       bar slides up out of view but the wrapper stays as an invisible hover trigger. */
    <div className="group/topbar absolute top-0 left-0 right-0 z-[200] h-7">
      <div
        className={`relative z-50 flex h-7 w-full items-center justify-between px-3 text-[13px] font-medium text-white/88 liquid-glass-menubar select-none
          transition-transform duration-300 ease-in-out
          ${anyFullScreen ? '-translate-y-full group-hover/topbar:translate-y-0' : 'translate-y-0'}
        `}
      >
        {/* ── Left: Apple Logo + App Name + Menus ─────────────────────────── */}
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

        {/* ── Right: Social Links + Status Icons + Clock ───────────────────── */}
        <div className="flex items-center gap-3 text-white/78">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/felipemarzochi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-colors hover:text-[#0A66C2]"
            title="LinkedIn"
          >
            <LinkedInIcon />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Fmarzochi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-colors hover:text-white"
            title="GitHub"
          >
            <GitHubIcon />
          </a>

          <div className="h-3 w-px bg-white/20" />

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

        {/* ── Control Center ───────────────────────────────────────────────── */}
        <ControlCenter isOpen={isControlCenterOpen} />
      </div>
    </div>
  );
};
