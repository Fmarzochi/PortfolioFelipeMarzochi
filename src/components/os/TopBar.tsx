'use client';

import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Search, SlidersHorizontal } from 'lucide-react';
import { ControlCenter } from './ControlCenter';

export const TopBar = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/,/g, '');
  };

  return (
    <div className="relative z-50 flex h-7 w-full items-center justify-between bg-black/40 px-4 text-[13px] font-medium text-white/90 backdrop-blur-md">
      {/* Lado Esquerdo - Menus */}
      <div className="flex items-center gap-4">
        <span className="font-bold tracking-wide cursor-pointer hover:text-white">Felipe Marzochi</span>
        <div className="flex gap-4 text-white/80">
          <span className="cursor-pointer hover:text-white">File</span>
          <span className="cursor-pointer hover:text-white">Edit</span>
          <span className="cursor-pointer hover:text-white">View</span>
          <span className="cursor-pointer hover:text-white">Go</span>
          <span className="cursor-pointer hover:text-white">Window</span>
          <span className="cursor-pointer hover:text-white">Help</span>
        </div>
      </div>

      {/* Lado Direito - Status e Central de Controle */}
      <div className="flex items-center gap-4 text-white/80">
        <BatteryMedium size={14} className="cursor-pointer hover:text-white" />
        <Wifi size={14} className="cursor-pointer hover:text-white" />
        <Search size={14} className="cursor-pointer hover:text-white" />

        {/* Botão da Central de Controle */}
        <SlidersHorizontal
          size={14}
          className={`cursor-pointer transition-colors ${isControlCenterOpen ? 'text-blue-400' : 'hover:text-white'}`}
          onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
        />

        <span className="cursor-pointer hover:text-white">
          {time ? formatTime(time) : 'Carregando...'}
        </span>
      </div>

      {/* Renderiza a Central de Controle */}
      <ControlCenter isOpen={isControlCenterOpen} />
    </div>
  );
};