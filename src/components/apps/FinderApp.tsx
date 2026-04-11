'use client';

import { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Search, LayoutGrid, List, ChevronRight, Clock, Award, Briefcase, ChevronDown } from 'lucide-react';

type SidebarItem = 'recentes' | 'certificados' | 'projetos';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'image';
  date: string;
  size: string;
}

const mockData: Record<SidebarItem, FileItem[]> = {
  recentes: [
    { id: '1', name: 'Arquitetura_DuAutomacoes.pdf', type: 'pdf', date: 'Hoje, 09:41', size: '2.4 MB' },
    { id: '2', name: 'Certificado_Java_Avancado.pdf', type: 'pdf', date: 'Ontem, 14:20', size: '1.1 MB' },
    { id: '3', name: 'Diagrama_Unilab.png', type: 'image', date: 'Ontem, 10:15', size: '4.5 MB' },
  ],
  certificados: [
    { id: '4', name: 'Udemy_Java_Spring_Boot.pdf', type: 'pdf', date: '15 Mar 2026', size: '1.2 MB' },
    { id: '5', name: 'Arquitetura_Software_Avancada.pdf', type: 'pdf', date: '10 Fev 2026', size: '980 KB' },
    { id: '6', name: 'SOLID_Clean_Code_Mastery.pdf', type: 'pdf', date: '05 Jan 2026', size: '1.5 MB' },
  ],
  projetos: [
    { id: '7', name: 'Unilab_Serverless', type: 'folder', date: '10 Abr 2026', size: '--' },
    { id: '8', name: 'DuAutomacoes_ERP', type: 'folder', date: '20 Mar 2026', size: '--' },
    { id: '9', name: 'CalibrFlow_ISO', type: 'folder', date: '15 Fev 2026', size: '--' },
    { id: '10', name: 'CatchUp_Landing_Page', type: 'folder', date: '05 Mar 2026', size: '--' },
  ],
};

export const FinderApp = () => {
  const [activeTab, setActiveTab] = useState<SidebarItem>('projetos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const files = mockData[activeTab];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder size={48} className="text-blue-400 fill-blue-500/20" strokeWidth={1} />;
      case 'pdf': return <FileText size={48} className="text-red-400 fill-red-500/20" strokeWidth={1} />;
      case 'image': return <ImageIcon size={48} className="text-purple-400 fill-purple-500/20" strokeWidth={1} />;
      default: return <FileText size={48} className="text-gray-400" strokeWidth={1} />;
    }
  };

  const renderSmallIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder size={18} className="text-blue-400 fill-blue-500/20" />;
      case 'pdf': return <FileText size={18} className="text-red-400 fill-red-500/20" />;
      case 'image': return <ImageIcon size={18} className="text-purple-400 fill-purple-500/20" />;
      default: return <FileText size={18} className="text-gray-400" />;
    }
  };

  return (
    <div className="flex h-full w-full bg-[#1e1e1e]/80 text-white/90 backdrop-blur-3xl">
      {/* Sidebar */}
      <div className="w-[200px] flex-shrink-0 border-r border-white/10 bg-black/20 pt-4">
        <div className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
          Favoritos
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <button
            onClick={() => setActiveTab('recentes')}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
              activeTab === 'recentes' ? 'bg-blue-500/90 text-white' : 'hover:bg-white/10'
            }`}
          >
            <Clock size={16} className={activeTab === 'recentes' ? 'text-white' : 'text-blue-400'} />
            Recentes
          </button>
          <button
            onClick={() => setActiveTab('certificados')}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
              activeTab === 'certificados' ? 'bg-blue-500/90 text-white' : 'hover:bg-white/10'
            }`}
          >
            <Award size={16} className={activeTab === 'certificados' ? 'text-white' : 'text-yellow-400'} />
            Certificados
          </button>
          <button
            onClick={() => setActiveTab('projetos')}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
              activeTab === 'projetos' ? 'bg-blue-500/90 text-white' : 'hover:bg-white/10'
            }`}
          >
            <Briefcase size={16} className={activeTab === 'projetos' ? 'text-white' : 'text-blue-400'} />
            Projetos
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex h-14 items-center justify-between border-b border-white/10 bg-white/5 px-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-2 text-white/40">
              <ChevronRight size={20} className="rotate-180 cursor-not-allowed" />
              <ChevronRight size={20} className="cursor-not-allowed" />
            </div>
            <h2 className="text-sm font-semibold capitalize tracking-wide">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex rounded-md bg-black/40 ring-1 ring-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'} rounded-l-md`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'} rounded-r-md`}
              >
                <List size={16} />
              </button>
            </div>
            <div className="flex items-center rounded-md bg-black/40 px-2 py-1 ring-1 ring-white/10 focus-within:ring-blue-500">
              <Search size={14} className="text-white/40" />
              <input
                type="text"
                placeholder="Buscar"
                className="ml-2 w-32 bg-transparent text-sm outline-none placeholder:text-white/30"
              />
            </div>
          </div>
        </div>

        {/* Files Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-6 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
              {files.map((file) => (
                <div key={file.id} className="group flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-white/10">
                  {renderIcon(file.type)}
                  <span className="text-center text-xs font-medium text-white/90 line-clamp-2">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center border-b border-white/10 pb-2 text-xs font-semibold text-white/50">
                <div className="flex-1 px-4">Nome</div>
                <div className="w-32 text-left">Data de Modificação</div>
                <div className="w-24 text-right pr-4">Tamanho</div>
              </div>
              <div className="mt-2 flex flex-col gap-1">
                {files.map((file) => (
                  <div key={file.id} className="flex cursor-pointer items-center rounded-md py-1.5 hover:bg-white/10">
                    <div className="flex flex-1 items-center gap-3 px-4">
                      {renderSmallIcon(file.type)}
                      <span className="text-sm font-medium text-white/90">{file.name}</span>
                    </div>
                    <div className="w-32 text-xs text-white/50">{file.date}</div>
                    <div className="w-24 text-right text-xs text-white/50 pr-4">{file.size}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};