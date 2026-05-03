'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
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
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
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
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
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
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
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
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
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
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
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
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
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

/* ── Projects data ────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: '1',
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

/* ── Component ────────────────────────────────────────────────────────────── */
export const GalleryApp = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const selectedProject = PROJECTS.find((p) => p.id === selected);

  return (
    <div className="flex h-full w-full flex-col bg-[#161616] text-white">
      {/* Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <span className="text-sm font-semibold tracking-wide text-white/70">
          Portfólio — {PROJECTS.length} projetos
        </span>
        <div className="flex items-center gap-1 rounded-lg bg-white/10 p-1">
          <button
            onClick={() => setLayout('grid')}
            className={`rounded-md p-1.5 transition-colors ${layout === 'grid' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <Grid size={14} />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`rounded-md p-1.5 transition-colors ${layout === 'list' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Grid / list */}
        <div className="flex-1 overflow-y-auto p-4">
          {layout === 'grid' ? (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(project.id === selected ? null : project.id)}
                  className={`group relative aspect-video cursor-pointer overflow-hidden rounded-xl ring-2 transition-all ${
                    selected === project.id
                      ? 'ring-blue-500 shadow-lg shadow-blue-500/20'
                      : 'ring-white/10 hover:ring-white/30'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />
                  <div className="absolute inset-0">{project.svg}</div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/30">
                    <span className="text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">Ver caso</span>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 backdrop-blur-sm">
                    <p className="truncate text-xs font-semibold text-white">{project.title}</p>
                    <p className="text-[10px] text-white/50 truncate">{project.tag}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(project.id === selected ? null : project.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-3 py-2.5 transition-colors ${
                    selected === project.id
                      ? 'bg-blue-500/20 ring-1 ring-blue-500/40'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`relative h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${project.gradient}`}>
                    <div className="absolute inset-0">{project.svg}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{project.title}</p>
                    <p className="text-xs text-white/40 truncate">{project.tag}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key={selectedProject.id}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-64 shrink-0 border-l border-white/10 bg-black/30 overflow-y-auto backdrop-blur-xl"
            >
              {/* Thumbnail */}
              <div className={`relative h-28 w-full bg-gradient-to-br ${selectedProject.gradient} overflow-hidden`}>
                <div className="absolute inset-0">{selectedProject.svg}</div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 rounded-full bg-black/40 p-1 text-white/70 hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold leading-snug text-white">{selectedProject.title}</h3>
                  <p className="mt-1 text-[11px] text-white/40">{selectedProject.tag}</p>
                </div>

                <div className="space-y-3 text-[11px] leading-relaxed">
                  <div>
                    <span className="block font-bold text-red-400 uppercase tracking-wider mb-1">Problema</span>
                    <p className="text-white/60">{selectedProject.dor}</p>
                  </div>
                  <div>
                    <span className="block font-bold text-blue-400 uppercase tracking-wider mb-1">Solução</span>
                    <p className="text-white/60">{selectedProject.solucao}</p>
                  </div>
                  <div>
                    <span className="block font-bold text-green-400 uppercase tracking-wider mb-1">Resultado</span>
                    <p className="text-white/60">{selectedProject.resultado}</p>
                  </div>
                </div>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((s) => (
                    <span key={s} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
