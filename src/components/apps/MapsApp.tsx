'use client';

import { useState } from 'react';
import { MapPin, Navigation, Compass, Star, ChevronRight, Stethoscope, Code2, Rocket, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current';
  location: { x: number; y: number };
}

const milestones: Milestone[] = [
  {
    id: '1', year: 'Passado', title: 'Medicina Veterinária',
    description: 'Graduação e atuação clínica. Desenvolvimento de raciocínio analítico e diagnóstico.',
    icon: <Stethoscope size={20} />, status: 'completed', location: { x: 20, y: 70 }
  },
  {
    id: '2', year: 'Transição', title: 'Engenharia de Software',
    description: 'Imersão em lógica, algoritmos e as bases da computação.',
    icon: <GraduationCap size={20} />, status: 'completed', location: { x: 40, y: 40 }
  },
  {
    id: '3', year: 'Atual', title: 'Arquitetura Java & Spring',
    description: 'Especialização em sistemas de alta performance e princípios SOLID.',
    icon: <Code2 size={20} />, status: 'current', location: { x: 65, y: 55 }
  },
  {
    id: '4', year: 'Futuro', title: 'Fintech Solutions',
    description: 'Fundação da software factory e desenvolvimento de produtos financeiros disruptivos.',
    icon: <Rocket size={20} />, status: 'current', location: { x: 85, y: 25 }
  },
];

export const MapsApp = () => {
  const [selected, setSelected] = useState<Milestone>(milestones[2]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#121212] text-white">
      {/* Search & List Panel */}
      <div className="w-full max-h-[35vh] md:max-h-none md:w-[300px] flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 p-4 backdrop-blur-md overflow-y-auto">
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
          <Navigation size={16} className="text-blue-500" />
          <input
            type="text"
            placeholder="Destino: Senioridade"
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
          />
        </div>

        <div className="space-y-4">
          <h3 className="px-2 text-[11px] font-bold uppercase tracking-wider text-white/40">Sugestões de Rota</h3>
          {milestones.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className={`flex w-full items-start gap-3 rounded-xl p-3 transition-all ${
                selected.id === m.id ? 'bg-blue-600/20 ring-1 ring-blue-500/50' : 'hover:bg-white/5'
              }`}
            >
              <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${selected.id === m.id ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'}`}>
                {m.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-blue-400">{m.year}</span>
                <span className="text-sm font-semibold">{m.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="relative flex-1 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-[#0a0a0a]">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 h-full w-full">
          <polyline
            points={milestones.map(m => `${m.location.x}%,${m.location.y}%`).join(' ')}
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>

        {/* Milestone Pins */}
        {milestones.map((m) => (
          <motion.div
            key={m.id}
            initial={false}
            animate={{ scale: selected.id === m.id ? 1.2 : 1 }}
            className="absolute cursor-pointer"
            style={{ left: `${m.location.x}%`, top: `${m.location.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => setSelected(m)}
          >
            <div className="relative">
              <div className={`h-4 w-4 rounded-full ${m.status === 'completed' ? 'bg-blue-500' : 'bg-blue-400 animate-pulse'} ring-4 ring-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]`}></div>
              {selected.id === m.id && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-bold text-black shadow-xl">
                  {m.title}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Bottom Info Card */}
        <motion.div
          layout
          className="absolute bottom-4 left-3 right-3 md:bottom-6 md:left-6 md:right-6 rounded-2xl border border-white/10 bg-black/60 p-3 md:p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div className="flex gap-2 md:gap-4">
              <div className="flex h-9 w-9 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                {selected.icon}
              </div>
              <div>
                <h2 className="text-base md:text-xl font-bold tracking-tight">{selected.title}</h2>
                <p className="text-xs md:text-sm text-white/50">{selected.description}</p>
              </div>
            </div>
            <button className="self-end md:self-auto flex h-8 md:h-10 items-center gap-2 rounded-full bg-blue-600 px-4 md:px-6 text-xs md:text-sm font-bold transition-all hover:bg-blue-500">
              <Compass size={14} />
              Explorar
            </button>
          </div>
        </motion.div>

        {/* Compass Overlay */}
        <div className="absolute right-6 top-6 text-white/20">
          <Compass size={80} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};