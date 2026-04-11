'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Store,
  Compass,
  Map as MapIcon,
  Image as ImageIcon,
  Folder,
  TerminalSquare,
  Users,
  MessageCircle
} from 'lucide-react';
import { useWindowManager } from '../../store/useWindowManager';

const DOCK_ITEMS = [
  { id: 'appstore', title: 'App Store', icon: Store, color: 'text-blue-400' },
  { id: 'safari', title: 'CatchUp Tech', icon: Compass, color: 'text-blue-500' },
  { id: 'maps', title: 'Jornada', icon: MapIcon, color: 'text-green-400' },
  { id: 'photos', title: 'Galeria', icon: ImageIcon, color: 'text-purple-400' },
  { id: 'finder', title: 'Certificados', icon: Folder, color: 'text-blue-300' },
  { id: 'terminal', title: 'Skills', icon: TerminalSquare, color: 'text-gray-300' },
  { id: 'contacts', title: 'Equipe', icon: Users, color: 'text-gray-400' },
  { id: 'messages', title: 'Contato', icon: MessageCircle, color: 'text-green-500' },
];

function DockIcon({ item, mouseX }: { item: typeof DOCK_ITEMS[0], mouseX: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { openApp } = useWindowManager();

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onClick={() => openApp(item.id, item.title)}
      className="group relative flex cursor-pointer items-center justify-center rounded-2xl bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md hover:bg-white/20 transition-colors"
    >
      <item.icon className={`h-1/2 w-1/2 ${item.color}`} strokeWidth={1.5} />

      <span className="absolute -top-12 scale-0 rounded-md bg-black/60 px-3 py-1 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all group-hover:scale-100">
        {item.title}
      </span>
    </motion.div>
  );
}

export const MacDock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2 rounded-3xl bg-white/10 p-2 shadow-2xl shadow-black/50 ring-1 ring-white/20 backdrop-blur-xl">
      <div
        className="flex h-[48px] items-end gap-2"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {DOCK_ITEMS.map((item) => (
          <DockIcon key={item.id} item={item} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
};