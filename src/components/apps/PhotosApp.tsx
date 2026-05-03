'use client';

import { useState } from 'react';
import { Image as ImageIcon, Calendar, LayoutGrid, Heart, Search, Sidebar, Plus, MonitorPlay, Activity, FileSpreadsheet, Briefcase } from 'lucide-react';

interface PhotoMock {
  id: string;
  title: string;
  project: string;
  gradient: string;
  icon: React.ReactNode;
}

const mockPhotos: PhotoMock[] = [
  { id: '1', title: 'Dashboard Principal', project: 'Unilab', gradient: 'from-blue-600 to-cyan-400', icon: <Activity size={32} className="text-white/50" /> },
  { id: '2', title: 'Agendamento de Exames', project: 'Unilab', gradient: 'from-cyan-500 to-blue-500', icon: <Calendar size={32} className="text-white/50" /> },
  { id: '3', title: 'Gestão Financeira ERP', project: 'DuAutomações PRO', gradient: 'from-orange-500 to-amber-500', icon: <FileSpreadsheet size={32} className="text-white/50" /> },
  { id: '4', title: 'Controle de Serviços', project: 'DuAutomações PRO', gradient: 'from-amber-400 to-orange-600', icon: <MonitorPlay size={32} className="text-white/50" /> },
  { id: '5', title: 'Certificados de Calibração', project: 'CalibrFlow', gradient: 'from-emerald-500 to-teal-400', icon: <FileSpreadsheet size={32} className="text-white/50" /> },
  { id: '6', title: 'Landing Page Oficial', project: 'Portfólio Pessoal', gradient: 'from-blue-900 to-blue-600', icon: <Briefcase size={32} className="text-white/50" /> },
  { id: '7', title: 'Sistema de Doadores', project: 'Unilab', gradient: 'from-blue-400 to-indigo-500', icon: <Heart size={32} className="text-white/50" /> },
  { id: '8', title: 'Fluxo ISO', project: 'CalibrFlow', gradient: 'from-teal-500 to-emerald-600', icon: <Activity size={32} className="text-white/50" /> },
];

export const PhotosApp = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPhotos = activeFilter === 'all'
    ? mockPhotos
    : mockPhotos.filter(p => p.project === activeFilter);

  return (
    <div className="flex h-full w-full bg-[#1e1e1e]/90 text-white/90 backdrop-blur-3xl">
      {/* Sidebar de Álbuns */}
      <div className="w-[200px] flex-shrink-0 border-r border-white/10 bg-black/20 pt-4">
        <div className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
          Biblioteca
        </div>
        <nav className="mb-6 flex flex-col gap-1 px-2">
          <button onClick={() => setActiveFilter('all')} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${activeFilter === 'all' ? 'bg-blue-500/90 text-white' : 'hover:bg-white/10'}`}>
            <ImageIcon size={16} className={activeFilter === 'all' ? 'text-white' : 'text-blue-400'} />
            Todas as Fotos
          </button>
          <button className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-white/10 text-white/80">
            <Heart size={16} className="text-white/40" />
            Favoritos
          </button>
        </nav>

        <div className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
          Projetos (Álbuns)
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {['Unilab', 'DuAutomações PRO', 'CalibrFlow', 'Portfólio Pessoal'].map(project => (
            <button
              key={project}
              onClick={() => setActiveFilter(project)}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                activeFilter === project ? 'bg-blue-500/90 text-white' : 'hover:bg-white/10'
              }`}
            >
              <LayoutGrid size={16} className={activeFilter === project ? 'text-white' : 'text-white/40'} />
              <span className="truncate">{project}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Área Principal - Grid de Fotos */}
      <div className="flex flex-1 flex-col overflow-hidden bg-black/40">
        {/* Toolbar da Galeria */}
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Sidebar size={18} className="text-white/60 cursor-pointer hover:text-white" />
            <h2 className="text-sm font-semibold tracking-wide">
              {activeFilter === 'all' ? 'Todas as Fotos' : activeFilter}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md bg-white/10 px-2 py-1 ring-1 ring-white/10 focus-within:ring-blue-500">
              <Search size={14} className="text-white/40" />
              <input type="text" placeholder="Buscar fotos..." className="ml-2 w-32 bg-transparent text-sm outline-none placeholder:text-white/30" />
            </div>
            <Plus size={18} className="text-white/60 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Grid de Imagens */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 transition-transform hover:scale-[1.02] hover:z-10 hover:shadow-2xl">
                {/* Background simulando a imagem */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient} opacity-80 transition-opacity group-hover:opacity-100 flex items-center justify-center`}>
                  {photo.icon}
                </div>

                {/* Overlay de informações — sempre visível */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                  <p className="truncate text-sm font-semibold text-white drop-shadow-md">{photo.title}</p>
                  <p className="text-xs text-white/65">{photo.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};