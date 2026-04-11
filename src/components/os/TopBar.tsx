'use client';

import { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Search, Command } from 'lucide-react';

export const TopBar = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    const formatted = date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
    // Remove pontos e converte a primeira letra para maiúscula para ficar padrão Apple
    return formatted.replace('.', '').replace(',', '').replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-7 items-center justify-between bg-black/40 px-3 text-[13px] font-medium tracking-wide text-white shadow-sm backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center justify-center transition-colors hover:text-white/70">
          <Command size={14} className="fill-current" />
        </div>
        <div className="cursor-default font-bold">CatchUp Tech</div>
        <div className="hidden cursor-default space-x-4 md:flex">
          <span className="cursor-pointer transition-colors hover:text-white/70">File</span>
          <span className="cursor-pointer transition-colors hover:text-white/70">Edit</span>
          <span className="cursor-pointer transition-colors hover:text-white/70">View</span>
          <span className="cursor-pointer transition-colors hover:text-white/70">Go</span>
          <span className="cursor-pointer transition-colors hover:text-white/70">Window</span>
          <span className="cursor-pointer transition-colors hover:text-white/70">Help</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex cursor-pointer items-center gap-3 transition-colors hover:text-white/70">
          <BatteryMedium size={16} />
          <Wifi size={14} />
          <Search size={14} />
        </div>
        <div className="cursor-default text-[13px]">
          {time ? `${formatDate(time)}  ${formatTime(time)}` : '...'}
        </div>
      </div>
    </div>
  );
};