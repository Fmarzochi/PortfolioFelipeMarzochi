'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeft, Search, Plus, X, Heart, Image as ImageIcon, LayoutGrid } from 'lucide-react';

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
}

/* ── SVG Illustrations ────────────────────────────────────────────────────── */
const DashboardSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="20" y1="10" x2="20" y2="90" stroke="white" strokeWidth="0.5" />
    <line x1="20" y1="90" x2="185" y2="90" stroke="white" strokeWidth="0.5" />
    <line x1="20" y1="70" x2="185" y2="70" stroke="white" strokeWidth="0.3" strokeDasharray="4 3" />
    <line x1="20" y1="50" x2="185" y2="50" stroke="white" strokeWidth="0.3" strokeDasharray="4 3" />
    <line x1="20" y1="30" x2="185" y2="30" stroke="white" strokeWidth="0.3" strokeDasharray="4 3" />
    <rect x="35" y="45" width="22" height="45" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="70" y="30" width="22" height="60" rx="2" fill="white" fillOpacity="0.4" />
    <rect x="105" y="55" width="22" height="35" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="140" y="20" width="22" height="70" rx="2" fill="white" fillOpacity="0.4" />
    <circle cx="170" cy="35" r="10" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <circle cx="170" cy="35" r="5" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);

const MobilePawSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="75" y="5" width="50" height="90" rx="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
    <rect x="82" y="14" width="36" height="65" rx="3" fill="white" fillOpacity="0.08" />
    <circle cx="100" cy="87" r="3" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <circle cx="100" cy="38" r="7" fill="white" fillOpacity="0.5" />
    <circle cx="88" cy="30" r="4" fill="white" fillOpacity="0.4" />
    <circle cx="112" cy="30" r="4" fill="white" fillOpacity="0.4" />
    <circle cx="83" cy="41" r="3" fill="white" fillOpacity="0.35" />
    <circle cx="117" cy="41" r="3" fill="white" fillOpacity="0.35" />
  </svg>
);

const NetworkGraphSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="100" y1="50" x2="40" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="160" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="40" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="160" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="170" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="30" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <circle cx="40" cy="20" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="160" cy="20" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="40" cy="80" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="160" cy="80" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="170" cy="50" r="5" fill="white" fillOpacity="0.3" />
    <circle cx="30" cy="50" r="5" fill="white" fillOpacity="0.3" />
    <circle cx="100" cy="50" r="12" fill="white" fillOpacity="0.55" />
    <circle cx="100" cy="50" r="6" fill="white" fillOpacity="0.8" />
  </svg>
);

const GaugeSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M 40 80 A 60 60 0 0 1 160 80" stroke="white" strokeWidth="6" strokeOpacity="0.3" strokeLinecap="round" />
    <path d="M 40 80 A 60 60 0 0 1 130 32" stroke="white" strokeWidth="6" strokeOpacity="0.65" strokeLinecap="round" />
    <line x1="40" y1="80" x2="34" y2="74" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="56" y1="45" x2="51" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="100" y1="20" x2="100" y2="14" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="144" y1="45" x2="149" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="160" y1="80" x2="166" y2="74" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="100" y1="80" x2="128" y2="34" stroke="white" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="round" />
    <circle cx="100" cy="80" r="6" fill="white" fillOpacity="0.6" />
    <circle cx="100" cy="80" r="3" fill="white" fillOpacity="0.9" />
  </svg>
);

const BarChartLineSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <line x1="25" y1="15" x2="25" y2="85" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
    <line x1="25" y1="85" x2="185" y2="85" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
    <rect x="35" y="50" width="18" height="35" rx="2" fill="white" fillOpacity="0.45" />
    <rect x="65" y="30" width="18" height="55" rx="2" fill="white" fillOpacity="0.55" />
    <rect x="95" y="60" width="18" height="25" rx="2" fill="white" fillOpacity="0.45" />
    <rect x="125" y="20" width="18" height="65" rx="2" fill="white" fillOpacity="0.55" />
    <rect x="155" y="40" width="18" height="45" rx="2" fill="white" fillOpacity="0.45" />
    <polyline points="44,50 74,30 104,60 134,20 164,40" stroke="white" strokeWidth="1.5" strokeOpacity="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {[[44,50],[74,30],[104,60],[134,20],[164,40]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="white" fillOpacity="0.9" />
    ))}
  </svg>
);

const CloudPipelineSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M 60 65 Q 40 65 40 50 Q 40 38 52 36 Q 52 22 65 22 Q 72 14 82 18 Q 88 10 100 12 Q 118 12 120 28 Q 132 28 132 40 Q 132 52 120 52 L 60 52 Z" stroke="white" strokeWidth="1.5" strokeOpacity="0.55" fill="white" fillOpacity="0.06" />
    <rect x="22" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="62" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="102" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="142" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <text x="36" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="5">API</text>
    <text x="76" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="5">SQS</text>
    <text x="116" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="4.5">Lambda</text>
    <text x="156" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="5">DB</text>
    <line x1="50" y1="80" x2="62" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="62,77 62,83 67,80" fill="white" fillOpacity="0.5" />
    <line x1="90" y1="80" x2="102" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="102,77 102,83 107,80" fill="white" fillOpacity="0.5" />
    <line x1="130" y1="80" x2="142" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="142,77 142,83 147,80" fill="white" fillOpacity="0.5" />
    <line x1="60" y1="52" x2="36" y2="70" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 2" />
  </svg>
);

/* ── Data ─────────────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: '1',
    albumKey: 'erp',
    title: 'ERP para Gestão de Negócios',
    gradient: 'from-blue-600 to-cyan-500',
    tag: 'Java · React.js · PostgreSQL',
    dor: 'Cliente perdia tempo e receita emitindo orçamentos manualmente e não conseguia acompanhar ordens de serviço em andamento.',
    solucao: 'Sistema ERP completo em Java + React.js com controle de estoque, dashboard financeiro em tempo real, gestão de fornecedores e clientes, emissão instantânea de orçamentos e rastreamento de ordens de serviço.',
    resultado: 'Orçamentos gerados em segundos, visibilidade total das OS em tempo real e redução de falhas operacionais com dados sempre atualizados.',
    stack: ['Java', 'React.js', 'PostgreSQL', 'REST API'],
    svg: <DashboardSVG />,
  },
  {
    id: '2',
    albumKey: 'unilab',
    title: 'Laboratório Unilab',
    gradient: 'from-teal-500 to-emerald-600',
    tag: 'Next.js · Tailwind · Framer Motion',
    dor: 'Clínica veterinária sem presença digital profissional e com fluxo de agendamento e captação de doadores de sangue totalmente manual.',
    solucao: 'Site institucional customizado com Next.js e Tailwind CSS, UX premium com bottom sheet navigation para mobile, triagem interativa para doadores e formulário AJAX com Framer Motion.',
    resultado: 'Presença digital profissional entregue, experiência mobile premium com navegação por dedão, fluxo de captação simplificado e taxa de conversão otimizada.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    svg: <MobilePawSVG />,
  },
  {
    id: '3',
    albumKey: 'agent',
    title: "Felipe's Dream Agent",
    gradient: 'from-violet-600 to-purple-700',
    tag: 'Python · Gemini API · GitHub Actions',
    dor: 'Busca ativa por vagas consome horas diárias com listagens genéricas, requisitos irreais e processo de triagem completamente manual.',
    solucao: 'Agente autônomo em Python que roda 3 vezes ao dia, raspa vagas do LinkedIn via BeautifulSoup, usa Gemini 1.5 para análise semântica cruzando a vaga com o currículo, organiza resultados via Google Sheets API e dispara alerta no WhatsApp quando o match supera 90%.',
    resultado: 'Processo de candidatura automatizado com scoring de compatibilidade por IA, zero tempo gasto em triagem manual e notificação imediata das melhores oportunidades via GitHub Actions.',
    stack: ['Python', 'Gemini API', 'Gmail API', 'Google Sheets', 'GitHub Actions'],
    svg: <NetworkGraphSVG />,
  },
  {
    id: '4',
    albumKey: 'calibra',
    title: 'CalibraFlow — SaaS de Calibração',
    gradient: 'from-amber-500 to-orange-600',
    tag: 'Java 21 · Spring Boot · Docker · React',
    dor: 'Empresas industriais gerenciavam calibração de instrumentos em planilhas, perdendo rastreabilidade, falhando em auditorias ISO e operando com instrumentos vencidos sem perceber.',
    solucao: 'Plataforma SaaS multi-tenant com isolamento total via Hibernate Filters e AOP, máquina de estados imutável com registro de IP e CPF em cada alteração, robô Spring Scheduling que bloqueia instrumentos vencidos à meia-noite e upload isolado de certificados PDF por empresa.',
    resultado: 'Conformidade ISO garantida com rastreabilidade 100% auditável, eliminação de erro humano no controle de vencimentos e dados de empresas completamente isolados em arquitetura multi-tenant.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT/Auth0', 'React'],
    svg: <GaugeSVG />,
  },
  {
    id: '5',
    albumKey: 'ans',
    title: 'Dashboard ANS — Engenharia de Dados',
    gradient: 'from-sky-500 to-blue-700',
    tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
    dor: 'Processar e visualizar mais de 2,1 milhões de registros contábeis da ANS com ORMs tradicionais levava horas e travava o sistema inteiro.',
    solucao: 'Arquitetura híbrida com ETL em Java 21 usando protocolo COPY nativo do PostgreSQL para ingestão em segundos, API em Python FastAPI com processamento assíncrono e dashboard Vue.js com paginação server-side.',
    resultado: '2,1 milhões de registros ingeridos em segundos — contra horas com ORM convencional — com dashboard analítico em tempo real mostrando distribuição por UF e ranking de operadoras.',
    stack: ['Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Vue.js', 'PostgreSQL', 'Docker'],
    svg: <BarChartLineSVG />,
  },
  {
    id: '6',
    albumKey: 'aws',
    title: 'Pipeline Transacional AWS',
    gradient: 'from-yellow-500 to-orange-500',
    tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
    dor: 'Desafio técnico exigindo processamento confiável de 100 transações simultâneas com arquitetura cloud-native e desacoplamento entre produção e consumo de mensagens.',
    solucao: 'API Node.js publicando transações no AWS SQS via SDK, função Lambda consumindo a fila e persistindo no DynamoDB, com frontend Next.js exibindo as transações em tempo real via rota GET.',
    resultado: 'Pipeline serverless completo com garantia de entrega via fila, desacoplamento total entre camadas e 100 transações processadas com sucesso em ambiente AWS.',
    stack: ['Node.js', 'AWS SQS', 'AWS Lambda', 'DynamoDB', 'Next.js'],
    svg: <CloudPipelineSVG />,
  },
];

/* ── Sidebar section types ────────────────────────────────────────────────── */
type View = 'all' | 'favorites' | string; // string = project albumKey

const FAVORITES = ['1', '4', '6']; // highlighted projects

/* ── Thumbnail card ───────────────────────────────────────────────────────── */
const PhotoCard = ({
  project,
  isSelected,
  onClick,
}: {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`group relative overflow-hidden rounded-xl aspect-video text-left ring-2 transition-all ${
      isSelected ? 'ring-blue-500 shadow-lg shadow-blue-500/30' : 'ring-transparent hover:ring-white/20'
    }`}
  >
    {/* Gradient background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
    {/* SVG illustration — full opacity, acting as the "photo" */}
    <div className="absolute inset-0 opacity-40">{project.svg}</div>

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

    {/* Bottom label */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent pt-8 px-3 pb-2.5">
      <p className="text-[11px] font-semibold text-white leading-tight truncate">{project.title}</p>
      <p className="text-[9px] text-white/55 mt-0.5 truncate">{project.tag}</p>
    </div>

    {/* Fav heart */}
    {FAVORITES.includes(project.id) && (
      <div className="absolute top-2 right-2">
        <Heart size={11} className="text-red-400 fill-red-400 drop-shadow" />
      </div>
    )}
  </motion.button>
);

/* ── Detail panel ─────────────────────────────────────────────────────────── */
const ProjectDetail = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2 }}
    className="flex-1 flex flex-col overflow-hidden"
  >
    {/* Banner */}
    <div className={`relative w-full h-40 shrink-0 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
      <div className="absolute inset-0 opacity-40">{project.svg}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
        <p className="text-xs text-white/60 mb-0.5">{project.tag}</p>
        <h2 className="text-lg font-bold text-white">{project.title}</h2>
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-[11px] text-white/60 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full transition-colors"
      >
        ← Todas as Fotos
      </button>
    </div>

    {/* Body */}
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-red-500/8 ring-1 ring-red-500/20 p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Problema</span>
          <p className="text-xs text-white/65 leading-relaxed">{project.dor}</p>
        </div>
        <div className="rounded-xl bg-blue-500/8 ring-1 ring-blue-500/20 p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Solução</span>
          <p className="text-xs text-white/65 leading-relaxed">{project.solucao}</p>
        </div>
        <div className="rounded-xl bg-green-500/8 ring-1 ring-green-500/20 p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">Resultado</span>
          <p className="text-xs text-white/65 leading-relaxed">{project.resultado}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-2">Stack utilizada</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full bg-white/8 ring-1 ring-white/12 px-3 py-1 text-[11px] text-white/60">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Main Component ───────────────────────────────────────────────────────── */
export const GalleryApp = () => {
  const [view, setView] = useState<View>('all');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const detailProject = detailId ? PROJECTS.find((p) => p.id === detailId) ?? null : null;

  /* Which projects to show in the grid based on sidebar selection */
  const visibleProjects = useMemo(() => {
    let pool = PROJECTS;
    if (view === 'favorites') pool = PROJECTS.filter((p) => FAVORITES.includes(p.id));
    else if (view !== 'all') pool = PROJECTS.filter((p) => p.albumKey === view);

    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)),
    );
  }, [view, query]);

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
  };

  return (
    <div className="flex h-full w-full bg-[#111111] text-white overflow-hidden">

      {/* ── Left Sidebar ───────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 230, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="shrink-0 flex flex-col border-r border-white/8 bg-[#0e0e0e] overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto py-4 space-y-5 px-3">

              {/* BIBLIOTECA */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 px-2 mb-2">Biblioteca</p>
                <div className="space-y-0.5">
                  <SidebarItem
                    icon={<ImageIcon size={14} />}
                    label="Todas as Fotos"
                    active={view === 'all'}
                    onClick={() => handleViewChange('all')}
                    count={PROJECTS.length}
                  />
                  <SidebarItem
                    icon={<Heart size={14} />}
                    label="Favoritos"
                    active={view === 'favorites'}
                    onClick={() => handleViewChange('favorites')}
                    count={FAVORITES.length}
                  />
                </div>
              </div>

              {/* PROJETOS (ÁLBUNS) */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 px-2 mb-2">Projetos (Álbuns)</p>
                <div className="space-y-1">
                  {PROJECTS.map((project) => {
                    const isActive = view === project.albumKey;
                    return (
                      <button
                        key={project.id}
                        onClick={() => handleViewChange(project.albumKey)}
                        className={`w-full flex items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                          isActive ? 'bg-blue-600/20 ring-1 ring-blue-500/40' : 'hover:bg-white/5'
                        }`}
                      >
                        {/* Thumbnail — the "foto" */}
                        <div className={`relative h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${project.gradient}`}>
                          <div className="absolute inset-0 opacity-50">{project.svg}</div>
                          {FAVORITES.includes(project.id) && (
                            <div className="absolute top-0.5 right-0.5">
                              <Heart size={7} className="text-red-400 fill-red-400" />
                            </div>
                          )}
                        </div>
                        {/* Title */}
                        <div className="min-w-0 flex-1">
                          <p className={`text-[11px] font-semibold leading-tight line-clamp-2 ${isActive ? 'text-blue-300' : 'text-white/65'}`}>
                            {project.title}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main Area ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar */}
        <div className="h-11 shrink-0 flex items-center gap-3 px-4 border-b border-white/8 bg-[#0e0e0e]/80">
          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={`p-1.5 rounded-md transition-colors shrink-0 ${sidebarOpen ? 'text-white/70 bg-white/10' : 'text-white/30 hover:text-white/55 hover:bg-white/5'}`}
            title="Alternar painel"
          >
            <PanelLeft size={15} />
          </button>

          {/* Current view title */}
          <span className="text-[13px] font-semibold text-white/75 tracking-wide truncate">
            {query.trim() ? `Resultados para "${query.trim()}"` : viewLabel}
          </span>

          <div className="flex-1" />

          {/* Search */}
          <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ring-1 transition-all shrink-0 ${searchFocused ? 'bg-white/10 ring-white/30' : 'bg-white/5 ring-white/10'}`}>
            <Search size={12} className="text-white/40 shrink-0" />
            <input
              type="text"
              placeholder="Buscar fotos..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setDetailId(null); }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent text-[12px] text-white/80 placeholder-white/30 outline-none w-28 focus:w-40 transition-all duration-200"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors">
                <X size={11} />
              </button>
            )}
          </div>

          {/* Add = opens LinkedIn */}
          <button
            onClick={() => window.open('https://www.linkedin.com/in/felipemarzochi/', '_blank')}
            className="flex items-center justify-center h-7 w-7 rounded-md bg-white/8 hover:bg-white/15 text-white/50 hover:text-white transition-colors ring-1 ring-white/10 shrink-0"
            title="Ver mais no LinkedIn"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {detailProject ? (
              <ProjectDetail
                key={detailProject.id}
                project={detailProject}
                onClose={() => setDetailId(null)}
              />
            ) : (
              <motion.div
                key={`grid-${view}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 overflow-y-auto p-4"
              >
                {visibleProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-white/20 gap-3">
                    <Search size={32} strokeWidth={1} />
                    <p className="text-sm">Nenhum projeto encontrado</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                    {visibleProjects.map((project) => (
                      <PhotoCard
                        key={project.id}
                        project={project}
                        isSelected={detailId === project.id}
                        onClick={() => setDetailId(project.id)}
                      />
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

/* ── Sidebar Item ─────────────────────────────────────────────────────────── */
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
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-white/50 hover:bg-white/6 hover:text-white/75'
    }`}
  >
    {/* Icon or mini thumbnail */}
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
