'use client';

import { motion } from 'framer-motion';
import { Compass, Image as ImageIcon, Folder, TerminalSquare, MessageCircle, Settings } from 'lucide-react';
import { playSound } from '../../utils/audioEngine';
import { useWindowManager } from '../../store/useWindowManager';

const DOCK_ITEMS = [
  { id: 'finder', title: 'Arquivos', icon: Folder, color: 'text-blue-400' },
  { id: 'safari', title: 'Portfólio', icon: Compass, color: 'text-blue-500' },
  { id: 'skills', title: 'Skills', icon: TerminalSquare, color: 'text-gray-300' },
  { id: 'messages', title: 'Contato', icon: MessageCircle, color: 'text-green-500' },
  { id: 'photos', title: 'Galeria', icon: ImageIcon, color: 'text-purple-400' },
  { id: 'settings', title: 'Ajustes', icon: Settings, color: 'text-gray-400' },
] as const;

export const MacDock = () => {
  const { openApp, windows } = useWindowManager();

  const handleAppClick = (id: string, title: string) => {
    playSound('click');
    openApp(id, title);
  };

  const isRunning = (id: string) =>
    windows.some((w) => w.id === id && w.isOpen && !w.isMinimized);

  return (
    <div className="absolute left-1/2 z-50 flex -translate-x-1/2 items-end gap-2 md:gap-4 rounded-2xl bg-white/10 px-3 pt-2 pb-2 shadow-2xl ring-1 ring-white/20 backdrop-blur-3xl select-none w-[90%] max-w-[400px] md:max-w-none md:w-max overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] md:bottom-4">
      {DOCK_ITEMS.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.3, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAppClick(item.id, item.title)}
          className="group relative flex h-10 w-10 md:h-12 md:w-12 cursor-pointer items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
        >
          <item.icon className={`h-1/2 w-1/2 ${item.color}`} strokeWidth={1.5} />
          <div className="absolute -top-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:block group-hover:opacity-100 ring-1 ring-white/10">
            {item.title}
          </div>
          <div
            className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-colors ${isRunning(item.id) ? 'bg-white' : 'bg-white/30'
              }`}
          />
        </motion.div>
      ))}
    </div>
  );
};