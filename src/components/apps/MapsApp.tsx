'use client';

import { useState, useRef } from 'react';
import { Navigation, Compass, Stethoscope, Code2, GraduationCap, Briefcase, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  type: string;
  status: 'completed' | 'current';
  category: 'work' | 'education';
  icon: React.ReactNode;
  color: string;
  location: { x: number; y: number };
  activities: string;
  results: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: '5',
    period: 'Jan/2026 · Atual',
    role: 'Dev. de Software (Front-end) / Tech Lead',
    company: 'Conecta 360° · Remoto',
    type: 'Remoto',
    status: 'current',
    category: 'work',
    icon: <Briefcase size={18} />,
    color: 'bg-violet-500',
    location: { x: 12, y: 22 },
    activities: 'Responsável pelo desenvolvimento front-end do Conecta 360°, plataforma SaaS de gestão de RH e conformidade NR-1 (PGR/GRO). Estruturação da interface com React.js e TypeScript, definição da arquitetura de componentes e padronização de código. Integração com APIs REST, autenticação e controle de permissões, containerização com Docker e persistência em PostgreSQL. Em Mai/2026 promovido a Tech Lead, passando a contribuir com arquitetura, code review, pipelines CI/CD e boas práticas de engenharia de software.',
    results: 'Entrega de uma base de código de alta performance sob os princípios de Clean Code e componentização avançada. O projeto assegura total responsividade e prepara o terreno para a integração de Inteligência Artificial voltada à análise de dados e insights operacionais.',
  },
  {
    id: '4',
    period: 'Jan/2022 · Atual',
    role: 'Dev. de Software (Front-end)',
    company: 'Remoto',
    type: 'Remoto',
    status: 'current',
    category: 'work',
    icon: <Code2 size={18} />,
    color: 'bg-green-500',
    location: { x: 30, y: 38 },
    activities: 'Consultoria especializada no desenvolvimento de ecossistemas web e aplicações SaaS escaláveis. Atuo em todo o ciclo de vida do software, entregando interfaces premium com React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3 e Tailwind CSS. Especialista no projeto de sistemas multi tenant e SPAs complexas com gerenciamento de estado via Redux e React Hooks. Responsável pela integração de APIs REST e webhooks, consumo de serviços back end em Node.js e orquestração de infraestrutura em nuvem com Git, GitHub, Docker e pipelines CI/CD via AWS CloudFront.',
    results: 'Elevação expressiva na performance e qualidade técnica através da padronização de componentes e implementação de testes. Otimização estratégica de SEO técnico e UX, resultando em maior conversão e estabilidade sistêmica. Implementação de processos que garantem entregas contínuas com alta escalabilidade e mínima taxa de retrabalho.',
  },
  {
    id: '3',
    period: 'Set/2024 · Ago/2025',
    role: 'Engenharia de Suporte (Estágio)',
    company: 'Secretaria da Educação Americana, SP · Presencial',
    type: 'Estágio',
    status: 'completed',
    category: 'work',
    icon: <Building2 size={18} />,
    color: 'bg-teal-500',
    location: { x: 50, y: 30 },
    activities: 'Engenharia de suporte e diagnóstico de incidentes críticos para assegurar a continuidade operacional de sistemas educacionais. Atuação preventiva na infraestrutura tecnológica e resolução ágil de gargalos técnicos para garantir a estabilidade do ecossistema administrativo e escolar.',
    results: 'Redução expressiva na taxa de indisponibilidade sistêmica através de diagnósticos assertivos e atendimento padronizado. Otimização da experiência do usuário interno e fortalecimento da resiliência do ambiente tecnológico institucional.',
  },
  {
    id: '0',
    period: 'Set/2024 · Set/2026',
    role: 'Bacharelado em Análise e Desenvolvimento de Sistemas',
    company: 'Estácio · Bacharelado · 2026',
    type: 'Bacharelado',
    status: 'current',
    category: 'education',
    icon: <GraduationCap size={18} />,
    color: 'bg-sky-500',
    location: { x: 58, y: 50 },
    activities: 'Graduação focada no desenvolvimento de sistemas de alta complexidade, engenharia de software e arquitetura de banco de dados. Estudo aprofundado de programação orientada a objetos e redes de computadores, com aplicação prática voltada às demandas reais do mercado de tecnologia.',
    results: 'Consolidação de uma base acadêmica rigorosa que fundamenta minha experiência prática, garantindo o domínio teórico necessário para projetar arquiteturas de software eficientes e escaláveis.',
  },
  {
    id: '2',
    period: 'Fev/2022 · Fev/2023',
    role: 'MBA em Engenharia de Software',
    company: 'Faculdade Metropolitana · Pós Graduação',
    type: 'Pós Graduação',
    status: 'completed',
    category: 'education',
    icon: <GraduationCap size={18} />,
    color: 'bg-blue-500',
    location: { x: 74, y: 65 },
    activities: 'Especialização avançada focada em arquitetura de sistemas, princípios SOLID e metodologias ágeis. Estudo aprofundado de engenharia de requisitos, padrões de projeto e estratégias de desenvolvimento orientadas à qualidade e escalabilidade sistêmica.',
    results: 'Consolidação de uma visão executiva e técnica necessária para atuar com excelência no ciclo completo de vida do software, garantindo entregas alinhadas aos objetivos estratégicos de negócio e padrões internacionais de engenharia.',
  },
  {
    id: '1',
    period: '2009 · 2013',
    role: 'Bacharelado em Medicina Veterinária',
    company: 'UNIP · Bacharelado',
    type: 'Bacharelado',
    status: 'completed',
    category: 'education',
    icon: <Stethoscope size={18} />,
    color: 'bg-indigo-500',
    location: { x: 88, y: 80 },
    activities: 'Formação superior e atuação clínica fundamentadas no rigor do raciocínio analítico e na tomada de decisão crítica sob pressão. A disciplina necessária para o diagnóstico clínico moldou minha abordagem sistemática e estruturada para a resolução de problemas complexos em ecossistemas de software.',
    results: 'Desenvolvimento de um diferencial estratégico baseado na precisão investigativa, permitindo identificar a causa raiz de falhas técnicas e projetar soluções resilientes com foco absoluto em qualidade e performance.',
  },
];

const WORK = EXPERIENCES.filter((e) => e.category === 'work');
const EDUCATION = EXPERIENCES.filter((e) => e.category === 'education');

const SidebarItem = ({
  exp,
  isSelected,
  onClick,
}: {
  exp: Experience;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    data-id={exp.id}
    onClick={onClick}
    className={`flex w-full items-start gap-2.5 rounded-xl p-2.5 transition-all text-left outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent ${
      isSelected ? 'bg-blue-600/20 ring-1 ring-blue-500/40' : 'hover:bg-white/5'
    }`}
  >
    <div
      className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
        isSelected ? exp.color + ' text-white' : 'bg-white/10 text-white/50'
      }`}
    >
      {exp.icon}
    </div>
    <div className="flex flex-col min-w-0 flex-1">
      <span className="text-[10px] font-bold text-blue-400 truncate">{exp.period}</span>
      <span className="text-xs font-semibold truncate leading-tight">{exp.role}</span>
      <span className="text-[10px] text-white/40 truncate">{exp.company}</span>
    </div>
    {exp.status === 'current' && (
      <div className="flex-shrink-0 h-2 w-2 rounded-full bg-blue-400 animate-pulse mt-1.5" />
    )}
  </button>
);

interface DetailCardProps {
  selected: Experience;
  expanded: boolean;
  onToggleExpanded: () => void;
}

const DetailCard = ({ selected, expanded, onToggleExpanded }: DetailCardProps) => (
  <>
    <div className="flex items-start gap-3 p-4">
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${selected.color} text-white shadow-lg`}>
        {selected.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm font-bold tracking-tight leading-tight">{selected.role}</h2>
          {selected.status === 'current' && (
            <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-2 py-0.5">ATUAL</span>
          )}
          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${selected.category === 'work' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'}`}>
            {selected.category === 'work' ? 'Profissional' : 'Acadêmico'}
          </span>
        </div>
        <p className="text-[11px] text-white/50 mt-0.5">{selected.company}</p>
      </div>
      <button
        onClick={onToggleExpanded}
        className="flex-shrink-0 flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded"
      >
        {expanded ? <><ChevronUp size={13} />Menos</> : <><ChevronDown size={13} />Detalhes</>}
      </button>
    </div>

    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-4 pt-3 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-1.5">Atividades</p>
              <p className="text-xs text-white/70 leading-relaxed">{selected.activities}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-green-400 mb-1.5">Resultados</p>
              <p className="text-xs text-white/70 leading-relaxed">{selected.results}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {!expanded && (
      <p className="px-4 pb-4 text-xs text-white/45 leading-relaxed line-clamp-2">
        {selected.activities}
      </p>
    )}
  </>
);

export const MapsApp = () => {
  const [selected, setSelected] = useState<Experience>(EXPERIENCES[0]);
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleSelect = (exp: Experience) => {
    setSelected(exp);
    setExpanded(false);
    setTimeout(() => {
      const el = sidebarRef.current?.querySelector<HTMLElement>(`[data-id="${exp.id}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full text-white" style={{ background: 'rgba(10,10,12,0.92)' }}>

      <div ref={sidebarRef} className="w-full max-h-[40dvh] md:max-h-none md:w-[280px] flex-shrink-0 p-3 overflow-y-auto" style={{ background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(40px) saturate(180%)', borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mb-3 flex items-center gap-2 rounded-xl p-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Navigation size={13} className="text-blue-500 flex-shrink-0" />
          <span className="text-xs text-white/40">Linha do Tempo · Experiência</span>
        </div>

        <div className="space-y-1 mb-3">
          <h3 className="px-2 text-[10px] font-bold uppercase tracking-wider text-blue-400/60 mb-1.5 flex items-center gap-1.5">
            <Briefcase size={9} /> Experiência Profissional · {WORK.length}
          </h3>
          {WORK.map((exp) => (
            <SidebarItem key={exp.id} exp={exp} isSelected={selected.id === exp.id} onClick={() => handleSelect(exp)} />
          ))}
        </div>

        <div className="h-px my-2" style={{ background: 'rgba(255,255,255,0.08)' }} />

        <div className="space-y-1">
          <h3 className="px-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400/60 mb-1.5 flex items-center gap-1.5">
            <GraduationCap size={9} /> Formação Acadêmica · {EDUCATION.length}
          </h3>
          {EDUCATION.map((exp) => (
            <SidebarItem key={exp.id} exp={exp} isSelected={selected.id === exp.id} onClick={() => handleSelect(exp)} />
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

        {/* Mapa visual — altura fixa no mobile, flex-1 no desktop */}
        <div className="relative h-[100px] md:flex-1 flex-shrink-0" style={{ background: 'rgba(10,10,12,0.92)' }}>

          {/* Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          {/* Linhas de conexão SVG */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none">
            <polyline
              points={WORK.map(e => `${e.location.x}%,${e.location.y}%`).join(' ')}
              fill="none" stroke="rgba(59,130,246,0.22)" strokeWidth="2" strokeDasharray="8 5"
            />
            <polyline
              points={EDUCATION.map(e => `${e.location.x}%,${e.location.y}%`).join(' ')}
              fill="none" stroke="rgba(99,102,241,0.22)" strokeWidth="2" strokeDasharray="8 5"
            />
          </svg>

          {/* Hint clicavel */}
          <div className="absolute bottom-3 right-4 text-[10px] text-white/20 pointer-events-none select-none">
            Clique nos pontos para ver detalhes
          </div>

          {/* Pins */}
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.id}
              initial={false}
              animate={{ scale: selected.id === exp.id ? 1.35 : 1 }}
              whileHover={{ scale: selected.id === exp.id ? 1.4 : 1.2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="absolute cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded-full"
              style={{ left: `${exp.location.x}%`, top: `${exp.location.y}%`, transform: 'translate(-50%,-50%)' }}
              onClick={() => handleSelect(exp)}
              tabIndex={0}
              role="button"
              aria-label={`${exp.role} — ${exp.company}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(exp); } }}
            >
              <div className="relative">
                <div className={`h-4 w-4 rounded-full ${exp.color} ring-4 ring-blue-500/20 shadow-[0_0_14px_rgba(59,130,246,0.5)] ${exp.status === 'current' ? 'animate-pulse' : ''} group-hover:ring-8 transition-all`} />
                {selected.id !== exp.id && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-0.5 text-[10px] text-white/80 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {exp.role.split(' (')[0].split(' em ')[0]}
                  </div>
                )}
                {selected.id === exp.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-black shadow-xl z-10"
                  >
                    {exp.role.split(' (')[0].split(' em ')[0]}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Legenda */}
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5 pointer-events-none">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-0.5">Trajetória</p>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-violet-500 flex-shrink-0" />
              <span className="text-[10px] text-white/70">Profissional</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-sky-500 flex-shrink-0" />
              <span className="text-[10px] text-white/70">Acadêmico</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
              <span className="text-[10px] text-white/70">Em andamento</span>
            </div>
          </div>

          {/* Compass */}
          <div className="absolute right-4 top-4 text-white/10 pointer-events-none">
            <Compass size={56} strokeWidth={1} />
          </div>
        </div>

        {/* Card de detalhe — área scrollável no mobile */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <motion.div
            layout
            className="mx-3 mb-3 mt-2 rounded-2xl overflow-hidden" style={{ background: 'rgba(22,22,26,0.85)', backdropFilter: 'blur(52px) saturate(180%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.06)' }}
          >
            <DetailCard
              selected={selected}
              expanded={expanded}
              onToggleExpanded={() => setExpanded(!expanded)}
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};
