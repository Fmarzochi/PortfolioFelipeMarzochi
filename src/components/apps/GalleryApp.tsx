'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeft, Search, Plus, X, Heart, Image as ImageIcon, LayoutGrid, Github } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';

interface Project {
  id: string;
  title: string;
  albumKey: string;
  gradient: string;
  tag: string;
  dor: string;
  solucao: string;
  resultado: string;
  stack: string[];
  svg: React.ReactNode;
  github?: string;
}

const DashboardSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    <line x1="20" y1="10" x2="20" y2="90" stroke="white" strokeWidth="0.5" />
    <line x1="20" y1="90" x2="185" y2="90" stroke="white" strokeWidth="0.5" />
    <rect x="35" y="45" width="22" height="45" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="70" y="30" width="22" height="60" rx="2" fill="white" fillOpacity="0.4" />
    <rect x="105" y="55" width="22" height="35" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="140" y="20" width="22" height="70" rx="2" fill="white" fillOpacity="0.4" />
  </svg>
);

const MobilePawSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    <rect x="75" y="5" width="50" height="90" rx="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="100" cy="38" r="7" fill="white" fillOpacity="0.5" />
    <circle cx="88" cy="30" r="4" fill="white" fillOpacity="0.4" />
    <circle cx="112" cy="30" r="4" fill="white" fillOpacity="0.4" />
  </svg>
);

const NetworkGraphSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    <circle cx="100" cy="50" r="12" fill="white" fillOpacity="0.55" />
    <line x1="100" y1="50" x2="40" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="160" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="40" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="160" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
  </svg>
);

const GaugeSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    <path d="M 40 80 A 60 60 0 0 1 160 80" stroke="white" strokeWidth="6" strokeOpacity="0.3" strokeLinecap="round" />
    <path d="M 40 80 A 60 60 0 0 1 130 32" stroke="white" strokeWidth="6" strokeOpacity="0.65" strokeLinecap="round" />
    <circle cx="100" cy="80" r="6" fill="white" fillOpacity="0.6" />
  </svg>
);

const BarChartLineSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    <line x1="25" y1="15" x2="25" y2="85" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
    <rect x="35" y="50" width="18" height="35" rx="2" fill="white" fillOpacity="0.45" />
    <rect x="65" y="30" width="18" height="55" rx="2" fill="white" fillOpacity="0.55" />
    <polyline points="44,50 74,30 104,60" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
  </svg>
);

const CloudPipelineSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    <path d="M 60 65 Q 40 65 40 50 Q 52 36 65 22 Q 100 12 120 28 L 60 52 Z" stroke="white" strokeWidth="1.5" strokeOpacity="0.55" fill="white" fillOpacity="0.06" />
    <rect x="22" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="62" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

const PROJECTS: Project[] = [
  {
    id: '1',
    albumKey: 'erp',
    title: 'DuAutomação Residencial',
    gradient: 'from-blue-600 to-cyan-500',
    tag: 'Java · React.js · PostgreSQL',
    dor: 'Ineficiências críticas no ciclo de vendas e faturamento, onde processos manuais de orçamento e falta de rastreabilidade de ordens de serviço geravam gargalos operacionais e perda de receita direta.',
    solucao: 'Desenvolvimento de um ecossistema ERP completo utilizando Java e React.js. A arquitetura centraliza a gestão financeira, controle rigoroso de estoque e monitoramento em tempo real de cada etapa da prestação de serviço, eliminando silos de dados.',
    resultado: 'Digitalização absoluta da operação com geração instantânea de orçamentos precisos. A solução resultou em uma economia operacional estimada de R$ 24.000 anuais e garantiu total previsibilidade financeira para o negócio.',
    stack: ['Java', 'React.js', 'PostgreSQL', 'REST API'],
    svg: <DashboardSVG />,
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '2',
    albumKey: 'unilab',
    title: 'Laboratório Unilab',
    gradient: 'from-teal-500 to-emerald-600',
    tag: 'Next.js · Tailwind · Framer Motion',
    dor: 'Ausência de autoridade no ambiente digital e fluxos operacionais arcaicos na triagem de doadores de sangue, que dependiam de interação humana constante e limitavam a capacidade de escala da clínica.',
    solucao: 'Criação de uma plataforma institucional premium com Next.js e Tailwind CSS, focada em UX mobile first através de navegação por dedão e sistemas de triagem automatizada com lógica condicional.',
    resultado: 'Fortalecimento estratégico da marca online e aumento comprovado de 30% na captação de doadores. A automação da jornada reduziu o tempo de triagem manual e elevou a satisfação dos usuários.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    svg: <MobilePawSVG />,
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '3',
    albumKey: 'agent',
    title: "Career Scout AI",
    gradient: 'from-violet-600 to-purple-700',
    tag: 'Python · Gemini API · GitHub Actions',
    dor: 'Gargalo severo de produtividade na análise manual de grandes volumes de vagas profissionais, resultando em fadiga de decisão e perda de oportunidades estratégicas devido ao ruído de listagens genéricas.',
    solucao: 'Engenharia de um agente inteligente autônomo com Python e Gemini AI. O sistema realiza o processamento semântico profundo de requisitos, orquestrado via GitHub Actions para automação total da busca e alertas.',
    resultado: 'Filtragem preditiva de alta precisão que analisa 50 oportunidades diárias, convertendo apenas 10 vagas com scoring superior a 90%. O sistema eliminou o tempo gasto em 40 itens irrelevantes por dia.',
    stack: ['Python', 'Gemini API', 'Gmail API', 'Google Sheets', 'GitHub Actions'],
    svg: <NetworkGraphSVG />,
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '4',
    albumKey: 'calibra',
    title: 'CalibraFlow: SaaS de Gestão de ISO',
    gradient: 'from-amber-500 to-orange-600',
    tag: 'Java 21 · Spring Boot · Docker · React',
    dor: 'Elevado risco de não conformidade normativa e perdas milionárias no ecossistema Petrobras e prestadoras, devido à gestão descentralizada de instrumentos críticos sob as normas ISO 9001 e ISO 10012.',
    solucao: 'Plataforma SaaS multi tenant com isolamento total de dados via Hibernate Filters. Integra rastreabilidade metrológica imutável, automação de conformidade via Spring Scheduling e dashboards de governança industrial.',
    resultado: 'Mitigação estratégica de desperdícios na ordem de milhões através do controle absoluto do ciclo de calibração. Garantiu conformidade auditável imediata e eliminou riscos de operação com instrumentos vencidos.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT/Auth0', 'React'],
    svg: <GaugeSVG />,
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '5',
    albumKey: 'ans',
    title: 'Big Data ANS: Processamento em Escala',
    gradient: 'from-sky-500 to-blue-700',
    tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
    dor: 'Instabilidade sistêmica e latência crítica no processamento de milhões de registros financeiros da ANS em arquiteturas tradicionais, impossibilitando auditorias ágeis e governança de dados.',
    solucao: 'Arquitetura de dados de alta disponibilidade utilizando protocolo COPY nativo para ingestão em massa e FastAPI para processamento assíncrono, permitindo consultas analíticas sobre grandes volumes com latência zero.',
    resultado: 'Visibilidade e governança sobre R$ 100 milhões anuais em registros contábeis. A solução reduziu o tempo de auditoria em 95%, transformando a análise de 2,1 milhões de dados em um processo de poucos segundos.',
    stack: ['Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Vue.js', 'PostgreSQL', 'Docker'],
    svg: <BarChartLineSVG />,
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '6',
    albumKey: 'aws',
    title: 'Pipeline Transacional AWS',
    gradient: 'from-yellow-500 to-orange-500',
    tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
    dor: 'Necessidade de arquitetar um sistema resiliente para processamento transacional com alta concorrência, garantindo o desacoplamento absoluto entre os serviços e a integridade total de cada mensagem trafegada.',
    solucao: 'Implementação de pipeline serverless com arquitetura orientada a eventos. Utiliza AWS SQS para mensageria persistente, Lambda para processamento elástico e DynamoDB para armazenamento de alta performance.',
    resultado: 'Ecossistema 100% cloud native com escalabilidade automática sob demanda. A modernização da infraestrutura garantiu a entrega imediata de transações simultâneas e uma redução estratégica de 60% nos custos fixos.',
    stack: ['Node.js', 'AWS SQS', 'AWS Lambda', 'DynamoDB', 'Next.js'],
    svg: <CloudPipelineSVG />,
    github: 'https://github.com/Fmarzochi',
  },
];

type View = 'all' | 'favorites' | string;

const INITIAL_FAVORITES: string[] = [];

const PhotoCard = ({
  project,
  isSelected,
  isFav,
  onToggleFav,
  onClick,
}: {
  project: Project;
  isSelected: boolean;
  isFav: boolean;
  onToggleFav: (e: React.MouseEvent) => void;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className={`group relative overflow-hidden rounded-xl aspect-video ring-2 transition-all cursor-pointer ${
      isSelected ? 'ring-blue-500 shadow-lg shadow-blue-500/30' : 'ring-transparent hover:ring-white/20'
    }`}
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
    <div className="absolute inset-0 opacity-40">{project.svg}</div>
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
    <button
      onClick={onToggleFav}
      className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all ${isFav ? 'bg-black/30 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 opacity-100'}`}
      title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart size={13} className={`transition-colors ${isFav ? 'text-red-400 fill-red-400' : 'text-white/70'}`} />
    </button>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pt-8 px-3 pb-2.5">
      <p className="text-[11px] font-semibold text-white leading-tight truncate">{project.title}</p>
      <p className="text-[9px] text-white/55 mt-0.5 truncate">{project.tag}</p>
    </div>
  </motion.div>
);

const ProjectDetail = ({
  project,
  isFav,
  onToggleFav,
  onClose,
}: {
  project: Project;
  isFav: boolean;
  onToggleFav: () => void;
  onClose: () => void;
}) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2 }}
    className="flex-1 flex flex-col overflow-hidden"
  >
    <div className={`relative w-full h-32 sm:h-40 shrink-0 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
      <div className="absolute inset-0 opacity-40">{project.svg}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pr-20">
        <p className="text-[10px] text-white/60 mb-0.5 truncate">{project.tag}</p>
        <h2 className="text-base sm:text-lg font-bold text-white leading-tight">{project.title}</h2>
      </div>
      <button onClick={onClose} className="absolute top-3 left-3 text-[11px] text-white/60 hover:text-white bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full transition-colors">
        ← Voltar
      </button>
      <button onClick={onToggleFav} className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all backdrop-blur-sm ${isFav ? 'bg-red-500/30 text-red-300 ring-1 ring-red-400/40' : 'bg-black/30 text-white/60 hover:text-white hover:bg-black/50'}`} title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
        <Heart size={12} className={isFav ? 'fill-red-400 text-red-400' : ''} />
        {isFav ? 'Favoritado' : 'Favoritar'}
      </button>
    </div>
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {project.github && (
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-[11px] text-white/60 hover:text-white transition-all" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <Github size={13} />
          Ver no GitHub
        </a>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-[10px] p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Problema</span>
          <p className="text-xs text-white/65 leading-relaxed">{project.dor}</p>
        </div>
        <div className="rounded-[10px] p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Solução</span>
          <p className="text-xs text-white/65 leading-relaxed">{project.solucao}</p>
        </div>
        <div className="rounded-[10px] p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Resultado</span>
          <p className="text-xs text-white/65 leading-relaxed">{project.resultado}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2">Stack utilizada</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full px-3 py-1 text-[11px] text-white/60" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
  count,
  gradient,
  svg,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
  gradient?: string;
  svg?: React.ReactNode;
}) => (
  <button onClick={onClick} className={`w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors ${active ? 'bg-blue-600 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white/75'}`}>
    {gradient && svg ? (
      <div className={`relative h-6 w-9 shrink-0 overflow-hidden rounded-md bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 opacity-50 scale-150 origin-center">{svg}</div>
      </div>
    ) : (
      <span className={active ? 'text-white' : 'text-white/35'}>{icon}</span>
    )}
    <span className="text-[12px] font-medium truncate flex-1">{label}</span>
    {count !== undefined && (
      <span className={`text-[10px] tabular-nums ${active ? 'text-white/70' : 'text-white/25'}`}>{count}</span>
    )}
  </button>
);

export const GalleryApp = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState<View>('all');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(INITIAL_FAVORITES));

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const detailProject = detailId ? PROJECTS.find((p) => p.id === detailId) ?? null : null;

  const visibleProjects = useMemo(() => {
    let pool = PROJECTS;
    if (view === 'favorites') pool = PROJECTS.filter((p) => favorites.has(p.id));
    else if (view !== 'all') pool = PROJECTS.filter((p) => p.albumKey === view);

    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)),
    );
  }, [view, query, favorites]);

  const viewLabel =
    view === 'all'
      ? 'Todas as Fotos'
      : view === 'favorites'
      ? 'Favoritos'
      : PROJECTS.find((p) => p.albumKey === view)?.title ?? 'Todas as Fotos';

  const handleViewChange = (v: View) => {
    setView(v);
    setDetailId(null);
    setQuery('');
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="flex h-full w-full text-white overflow-hidden relative" style={{ background: 'rgba(10,10,12,0.92)' }}>
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside initial={{ x: isMobile ? -260 : 0, width: isMobile ? 260 : 0, opacity: 0 }} animate={{ x: 0, width: isMobile ? 260 : 240, opacity: 1 }} exit={{ x: isMobile ? -260 : 0, width: isMobile ? 260 : 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeInOut' }} className={`flex flex-col h-full overflow-hidden ${isMobile ? 'absolute left-0 top-0 z-30 shrink-0' : 'shrink-0'}`} style={{ background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(40px) saturate(180%)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex-1 min-h-0 overflow-y-auto py-4 space-y-5 px-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 px-2 mb-2">Biblioteca</p>
                <div className="space-y-0.5">
                  <SidebarItem icon={<ImageIcon size={14} />} label="Todas as Fotos" active={view === 'all'} onClick={() => handleViewChange('all')} count={PROJECTS.length} />
                  <SidebarItem icon={<Heart size={14} />} label="Favoritos" active={view === 'favorites'} onClick={() => handleViewChange('favorites')} count={favorites.size} />
                </div>
                <div className="space-y-1 mt-3">
                  {PROJECTS.map((project) => {
                    const isActive = view === project.albumKey;
                    return (
                      <button key={project.id} onClick={() => handleViewChange(project.albumKey)} className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition-colors ${isActive ? 'bg-blue-600/20 ring-1 ring-blue-500/40' : ''}`}>
                        <div className={`relative h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${project.gradient}`}>
                          <div className="absolute inset-0 opacity-55">{project.svg}</div>
                          {favorites.has(project.id) && <div className="absolute top-0.5 right-0.5"><Heart size={7} className="text-red-400 fill-red-400" /></div>}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[11px] font-semibold leading-tight line-clamp-2 ${isActive ? 'text-blue-300' : 'text-white/65'}`}>{project.title}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 px-2 mb-2">Projetos (Álbuns)</p>
                <div className="space-y-0.5">
                  {PROJECTS.map((project) => (
                    <SidebarItem key={project.id} icon={<LayoutGrid size={13} />} label={project.title} active={view === project.albumKey} onClick={() => handleViewChange(project.albumKey)} />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="h-11 shrink-0 flex items-center gap-2 px-3" style={{ background: 'rgba(28,28,30,0.82)', backdropFilter: 'blur(40px) saturate(180%)', borderBottom: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>
          <button onClick={() => setSidebarOpen((v) => !v)} className={`p-1.5 rounded-md transition-colors shrink-0 ${sidebarOpen && !isMobile ? 'text-white/70 bg-white/10' : 'text-white/30 hover:text-white/55 hover:bg-white/5'}`}>
            <PanelLeft size={15} />
          </button>
          {(!isMobile || !searchFocused) && <span className="text-[12px] sm:text-[13px] font-semibold text-white/75 tracking-wide truncate max-w-[120px] sm:max-w-none">{query.trim() ? `"${query.trim()}"` : viewLabel}</span>}
          <div className="flex-1" />
          <div className="flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 transition-all shrink-0" style={{ background: searchFocused ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.08)', border: searchFocused ? '1px solid rgba(10,132,255,0.6)' : '1px solid rgba(255,255,255,0.12)' }}>
            <Search size={12} className="text-white/40 shrink-0" />
            <input type="text" placeholder="Buscar fotos..." value={query} onChange={(e) => { setQuery(e.target.value); setDetailId(null); }} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} className="bg-transparent text-[12px] text-white/80 placeholder-white/30 outline-none w-20 focus:w-32 sm:w-28 sm:focus:w-40 transition-all duration-200" />
            {query && <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors"><X size={11} /></button>}
          </div>
          <button onClick={() => window.open('https://www.linkedin.com/in/felipemarzochi/', '_blank')} className="flex items-center justify-center h-7 w-7 rounded-[8px] text-white/50 hover:text-white transition-colors shrink-0" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Plus size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {detailProject ? (
              <ProjectDetail key={detailProject.id} project={detailProject} isFav={favorites.has(detailProject.id)} onToggleFav={() => toggleFav(detailProject.id)} onClose={() => setDetailId(null)} />
            ) : (
              <motion.div key={`grid-${view}-${query}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 overflow-y-auto p-4">
                {visibleProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-white/20 gap-3">
                    <Search size={32} strokeWidth={1} />
                    <p className="text-sm">Nenhum projeto encontrado</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-3">
                    {visibleProjects.map((project) => (
                      <PhotoCard key={project.id} project={project} isSelected={detailId === project.id} isFav={favorites.has(project.id)} onToggleFav={(e) => { e.stopPropagation(); toggleFav(project.id); }} onClick={() => setDetailId(project.id)} />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
