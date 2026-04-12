'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BatteryMedium, Wifi, Signal, Compass, Map as MapIcon, Image as ImageIcon, Folder, TerminalSquare, Users, MessageCircle } from 'lucide-react';
import { AppRegistry } from '../apps/AppRegistry';
import { ControlCenter } from './ControlCenter';
import { playSound } from '../../utils/audioEngine';
import { DynamicIsland } from './DynamicIsland';

const HOME_APPS = [
  { id: 'safari', title: 'Portfólio', icon: Compass, color: 'text-blue-500' },
  { id: 'maps', title: 'Jornada', icon: MapIcon, color: 'text-green-400' },
  { id: 'photos', title: 'Galeria', icon: ImageIcon, color: 'text-purple-400' },
  { id: 'finder', title: 'Arquivos', icon: Folder, color: 'text-blue-300' },
  { id: 'skills', title: 'Skills', icon: TerminalSquare, color: 'text-gray-300' },
  { id: 'contacts', title: 'Equipe', icon: Users, color: 'text-gray-400' },
];

const DOCK_APPS = [
  { id: 'messages', title: 'Contato', icon: MessageCircle, color: 'text-green-500' },
  { id: 'safari', title: 'Safari', icon: Compass, color: 'text-blue-500' },
  { id: 'skills', title: 'Skills', icon: TerminalSquare, color: 'text-gray-300' },
  { id: 'photos', title: 'Fotos', icon: ImageIcon, color: 'text-purple-400' },
];

export const IOSMobile = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleOpenApp = (appId: string) => {
    playSound('click');
    setActiveApp(appId);
  };

  const handleCloseApp = () => {
    playSound('click');
    setActiveApp(null);
  };

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden overscroll-none bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-blue-900/20" />
      <DynamicIsland />
      <div className="relative z-[60] flex h-14 flex-shrink-0 items-center justify-between px-6 pt-safe pointer-events-none">
        <div className="w-16 text-[14px] font-semibold tracking-wider pointer-events-auto">
          {time ? formatTime(time) : '--:--'}
        </div>
        <div
          className="flex w-16 cursor-pointer items-center justify-end gap-1.5 transition-opacity hover:opacity-70 pointer-events-auto"
          onClick={() => {
            playSound('click');
            setIsControlCenterOpen(!isControlCenterOpen);
          }}
        >
          <Signal size={14} className="fill-white" />
          <Wifi size={14} />
          <BatteryMedium size={16} className="fill-white" />
        </div>
      </div>
      <div className="absolute right-0 top-0 z-[70]">
        <ControlCenter isOpen={isControlCenterOpen} />
      </div>
      <AnimatePresence>
        {isControlCenterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsControlCenterOpen(false)}
            className="absolute inset-0 z-[65] bg-black/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
      <div className="relative z-10 flex-1 flex flex-col justify-start px-6 pt-4">
        <div className="grid grid-cols-4 gap-x-4 gap-y-7">
          {HOME_APPS.map((app) => (
            <div key={app.id} className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleOpenApp(app.id)}
                className="group relative flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-white/10 ring-1 ring-white/20 backdrop-blur-md transition-transform active:scale-90"
              >
                <app.icon className={`h-7 w-7 ${app.color}`} strokeWidth={1.5} />
              </button>
              <span className="text-[11px] font-medium text-white/80">{app.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex-shrink-0 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+24px)]">
        <div className="flex h-[76px] items-center justify-around rounded-[28px] bg-white/10 px-3 ring-1 ring-white/20 backdrop-blur-2xl">
          {DOCK_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => handleOpenApp(app.id)}
              className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-white/5 ring-1 ring-white/10 transition-transform active:scale-90"
            >
              <app.icon className={`h-7 w-7 ${app.color}`} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ y: '100%', scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: '100%', scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-40 bg-black"
          >
            <div className="h-full w-full overflow-hidden pt-14 pb-[calc(env(safe-area-inset-bottom,0px)+32px)]">
              <AppRegistry appId={activeApp} />
            </div>
            <div
              className="absolute bottom-[env(safe-area-inset-bottom,0px)] left-0 right-0 flex h-12 cursor-pointer items-center justify-center pb-2"
              onClick={handleCloseApp}
            >
              <div className="h-[5px] w-36 rounded-full bg-white/50 transition-colors hover:bg-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};