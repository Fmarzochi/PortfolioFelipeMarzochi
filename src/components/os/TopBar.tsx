'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, SlidersHorizontal, Moon } from 'lucide-react';
import { useOSContext } from '../../contexts/OSContext';
import { ControlCenter } from './ControlCenter';
import { SpotlightSearch } from './SpotlightSearch';
import { useWindowManager } from '../../store/useWindowManager';
import signatureImg from '../../assets/images/signature.webp';
import { LinkedInIcon, GitHubIcon } from '../common/IconRegistry';

export const TopBar = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const { windows } = useWindowManager();
  const { focusMode } = useOSContext();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isSpace = (e.metaKey || e.ctrlKey) && e.key === ' ';
      const isK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';

      if (isSpace || isK) {
        e.preventDefault();
        setIsSpotlightOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

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
    <div className={`group/topbar absolute top-0 left-0 right-0 z-[200] transition-[height] duration-300 ${anyFullScreen ? 'h-1' : 'h-7'}`}>
      <div
        className={`relative z-50 flex h-7 w-full items-center justify-between px-3 text-[13px] font-medium text-white/88 liquid-glass-menubar select-none
          transition-transform duration-300 ease-in-out
          ${anyFullScreen ? '-translate-y-full group-hover/topbar:translate-y-0' : 'translate-y-0'}
        `}
      >
        <div className="flex items-center relative h-5 w-32">
          <Image
            src={signatureImg}
            alt="Felipe Marzochi"
            draggable={false}
            fill
            className="pointer-events-none object-contain"
            style={{
              filter: 'invert(1) brightness(12) contrast(3)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        <div className="flex items-center gap-3 text-white/78">

          <a
            href="https://www.linkedin.com/in/felipemarzochi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-colors hover:text-[#0A66C2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 rounded-sm"
            title="LinkedIn"
            aria-label="Acessar perfil no LinkedIn"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://github.com/Fmarzochi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 rounded-sm"
            title="GitHub"
            aria-label="Acessar perfil no GitHub"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
          </a>

          {focusMode && (
            <span title="Foco ativado" aria-label="Modo foco está ativado">
              <Moon size={13} className="fill-indigo-400 text-indigo-400" />
            </span>
          )}

          <div className="h-3 w-px bg-white/20" aria-hidden="true" />

          <button
            onClick={() => setIsSpotlightOpen((v) => !v)}
            title="Spotlight (⌘ Espaço)"
            aria-label="Abrir busca global"
            className="flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded-sm"
          >
            <Search
              size={14}
              className={`cursor-pointer transition-colors ${isSpotlightOpen ? 'text-blue-400' : 'hover:text-white'}`}
            />
          </button>

          <button
            onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
            aria-label="Abrir central de controle"
            className="flex items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded-sm"
          >
            <SlidersHorizontal
              size={14}
              className={`cursor-pointer transition-colors ${
                isControlCenterOpen ? 'text-blue-400' : 'hover:text-white'
              }`}
            />
          </button>

          <span 
            className="cursor-pointer hover:text-white transition-colors tabular-nums text-white/90"
            aria-label={`Horário atual: ${time ? formatTime(time) : ''}`}
          >
            {time ? formatTime(time) : '···'}
          </span>
        </div>

        <ControlCenter isOpen={isControlCenterOpen} onClose={() => setIsControlCenterOpen(false)} />
      </div>

      <SpotlightSearch isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />
    </div>
  );
};
