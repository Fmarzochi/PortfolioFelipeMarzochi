'use client';

import { Globe, Shield, Zap, Download, Brain, Target, Lightbulb, Users, CheckCircle2, Layers } from 'lucide-react';
import signatureImg from '../../assets/images/signature.png';

const PROFILE_TRAITS = [
  { label: 'Organização & Qualidade',    value: 94, color: 'bg-blue-500',   icon: CheckCircle2 },
  { label: 'Orientação a Resultados',    value: 87, color: 'bg-violet-500', icon: Target       },
  { label: 'Proatividade',              value: 87, color: 'bg-cyan-500',   icon: Lightbulb    },
  { label: 'Raciocínio Analítico',      value: 85, color: 'bg-green-500',  icon: Brain        },
  { label: 'Colaboração em Equipe',     value: 85, color: 'bg-pink-500',   icon: Users        },
];

const WORK_STYLE = [
  { label: 'Componentização reutilizável', desc: 'React.js, Hooks, Context API e design system com padrão de reuso desde o primeiro componente'  },
  { label: 'Arquitetura orientada a qualidade', desc: 'SOLID, Clean Code e design patterns aplicados do backend Java ao frontend React'          },
  { label: 'Entrega full cycle',           desc: 'Do levantamento de requisitos ao deploy em AWS CloudFront, com CI/CD e code review no caminho' },
  { label: 'Integração sem atrito',        desc: 'APIs REST, webhooks e autenticação JWT implementados com tratamento estruturado de erros'       },
  { label: 'Evolução contínua de stack',   desc: 'Base sólida em React/TypeScript/Next.js migrando para backend Java · Spring Boot · PostgreSQL' },
];

interface Project {
  title: string;
  gradientClass: string;
  svgIllustration: React.ReactNode;
  dor: string;
  solucao: string;
  resultado: string;
  stack: string[];
}

const DashboardSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Grid lines */}
    <line x1="20" y1="10" x2="20" y2="90" stroke="white" strokeWidth="0.5" />
    <line x1="20" y1="90" x2="185" y2="90" stroke="white" strokeWidth="0.5" />
    <line x1="20" y1="70" x2="185" y2="70" stroke="white" strokeWidth="0.3" strokeDasharray="4 3" />
    <line x1="20" y1="50" x2="185" y2="50" stroke="white" strokeWidth="0.3" strokeDasharray="4 3" />
    <line x1="20" y1="30" x2="185" y2="30" stroke="white" strokeWidth="0.3" strokeDasharray="4 3" />
    {/* Bar charts */}
    <rect x="35" y="45" width="22" height="45" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="70" y="30" width="22" height="60" rx="2" fill="white" fillOpacity="0.4" />
    <rect x="105" y="55" width="22" height="35" rx="2" fill="white" fillOpacity="0.6" />
    <rect x="140" y="20" width="22" height="70" rx="2" fill="white" fillOpacity="0.4" />
    {/* Circle outlines */}
    <circle cx="170" cy="35" r="10" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <circle cx="170" cy="35" r="5" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
  </svg>
);

const MobilePawSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Phone frame */}
    <rect x="75" y="5" width="50" height="90" rx="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
    <rect x="82" y="14" width="36" height="65" rx="3" fill="white" fillOpacity="0.08" />
    <circle cx="100" cy="87" r="3" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    {/* Paw print inside screen */}
    <circle cx="100" cy="38" r="7" fill="white" fillOpacity="0.5" />
    <circle cx="88" cy="30" r="4" fill="white" fillOpacity="0.4" />
    <circle cx="112" cy="30" r="4" fill="white" fillOpacity="0.4" />
    <circle cx="83" cy="41" r="3" fill="white" fillOpacity="0.35" />
    <circle cx="117" cy="41" r="3" fill="white" fillOpacity="0.35" />
  </svg>
);

const NetworkGraphSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Connection lines */}
    <line x1="100" y1="50" x2="40" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="160" y2="20" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="40" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="160" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="170" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="100" y1="50" x2="30" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
    <line x1="40" y1="20" x2="160" y2="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
    <line x1="40" y1="80" x2="160" y2="80" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
    {/* Outer nodes */}
    <circle cx="40" cy="20" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="160" cy="20" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="40" cy="80" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="160" cy="80" r="6" fill="white" fillOpacity="0.4" />
    <circle cx="170" cy="50" r="5" fill="white" fillOpacity="0.3" />
    <circle cx="30" cy="50" r="5" fill="white" fillOpacity="0.3" />
    {/* Central node */}
    <circle cx="100" cy="50" r="12" fill="white" fillOpacity="0.55" />
    <circle cx="100" cy="50" r="6" fill="white" fillOpacity="0.8" />
  </svg>
);

const GaugeSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Gauge arc */}
    <path d="M 40 80 A 60 60 0 0 1 160 80" stroke="white" strokeWidth="6" strokeOpacity="0.3" strokeLinecap="round" />
    <path d="M 40 80 A 60 60 0 0 1 130 32" stroke="white" strokeWidth="6" strokeOpacity="0.65" strokeLinecap="round" />
    {/* Tick marks */}
    <line x1="40" y1="80" x2="34" y2="74" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="56" y1="45" x2="51" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="100" y1="20" x2="100" y2="14" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="144" y1="45" x2="149" y2="40" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    <line x1="160" y1="80" x2="166" y2="74" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
    {/* Needle */}
    <line x1="100" y1="80" x2="128" y2="34" stroke="white" strokeWidth="2" strokeOpacity="0.9" strokeLinecap="round" />
    {/* Center */}
    <circle cx="100" cy="80" r="6" fill="white" fillOpacity="0.6" />
    <circle cx="100" cy="80" r="3" fill="white" fillOpacity="0.9" />
  </svg>
);

const BarChartLineSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Grid background */}
    <line x1="25" y1="15" x2="25" y2="85" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
    <line x1="25" y1="85" x2="185" y2="85" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
    {[65, 45, 25].map((y, i) => (
      <line key={i} x1="25" y1={y} x2="185" y2={y} stroke="white" strokeWidth="0.3" strokeOpacity="0.2" strokeDasharray="4 3" />
    ))}
    {/* Bars */}
    <rect x="35" y="50" width="18" height="35" rx="2" fill="white" fillOpacity="0.45" />
    <rect x="65" y="30" width="18" height="55" rx="2" fill="white" fillOpacity="0.55" />
    <rect x="95" y="60" width="18" height="25" rx="2" fill="white" fillOpacity="0.45" />
    <rect x="125" y="20" width="18" height="65" rx="2" fill="white" fillOpacity="0.55" />
    <rect x="155" y="40" width="18" height="45" rx="2" fill="white" fillOpacity="0.45" />
    {/* Line connecting bar tops */}
    <polyline
      points="44,50 74,30 104,60 134,20 164,40"
      stroke="white"
      strokeWidth="1.5"
      strokeOpacity="0.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {[44,50, 74,30, 104,60, 134,20, 164,40].reduce<number[][]>((acc, v, i) => {
      if (i % 2 === 0) acc.push([v]);
      else acc[acc.length - 1].push(v);
      return acc;
    }, []).map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="white" fillOpacity="0.9" />
    ))}
  </svg>
);

const CloudPipelineSVG = () => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Cloud shape */}
    <path
      d="M 60 65 Q 40 65 40 50 Q 40 38 52 36 Q 52 22 65 22 Q 72 14 82 18 Q 88 10 100 12 Q 118 12 120 28 Q 132 28 132 40 Q 132 52 120 52 L 60 52 Z"
      stroke="white"
      strokeWidth="1.5"
      strokeOpacity="0.55"
      fill="white"
      fillOpacity="0.06"
    />
    {/* Nodes below cloud */}
    <rect x="22" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="62" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="102" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <rect x="142" y="70" width="28" height="20" rx="4" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    {/* Labels */}
    <text x="36" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="5">API</text>
    <text x="76" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="5">SQS</text>
    <text x="116" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="4.5">Lambda</text>
    <text x="156" y="83" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="5">DB</text>
    {/* Arrows between nodes */}
    <line x1="50" y1="80" x2="62" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="62,77 62,83 67,80" fill="white" fillOpacity="0.5" />
    <line x1="90" y1="80" x2="102" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="102,77 102,83 107,80" fill="white" fillOpacity="0.5" />
    <line x1="130" y1="80" x2="142" y2="80" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
    <polygon points="142,77 142,83 147,80" fill="white" fillOpacity="0.5" />
    {/* Cloud to first node arrow */}
    <line x1="60" y1="52" x2="36" y2="70" stroke="white" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 2" />
  </svg>
);

const PROJECTS: Project[] = [
  {
    title: 'ERP para Gestão de Negócios',
    gradientClass: 'from-blue-600 to-cyan-500',
    svgIllustration: <DashboardSVG />,
    dor: 'Cliente perdia tempo e receita emitindo orçamentos manualmente e não conseguia acompanhar ordens de serviço em andamento.',
    solucao: 'Sistema ERP completo em Java + React.js com controle de estoque, dashboard financeiro em tempo real, gestão de fornecedores e clientes, emissão instantânea de orçamentos e rastreamento de ordens de serviço.',
    resultado: 'Orçamentos gerados em segundos, visibilidade total das OS em tempo real e redução de falhas operacionais com dados sempre atualizados.',
    stack: ['Java', 'React.js', 'PostgreSQL', 'REST API'],
  },
  {
    title: 'Laboratório Unilab',
    gradientClass: 'from-teal-500 to-emerald-600',
    svgIllustration: <MobilePawSVG />,
    dor: 'Clínica veterinária sem presença digital profissional e com fluxo de agendamento e captação de doadores de sangue totalmente manual.',
    solucao: 'Site institucional customizado com Next.js e Tailwind CSS, UX premium com bottom sheet navigation para mobile, triagem interativa para doadores e formulário AJAX com Framer Motion.',
    resultado: 'Presença digital profissional entregue, experiência mobile premium com navegação por dedão, fluxo de captação simplificado e taxa de conversão otimizada.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: "Felipe's Dream Agent",
    gradientClass: 'from-violet-600 to-purple-700',
    svgIllustration: <NetworkGraphSVG />,
    dor: 'Busca ativa por vagas consome horas diárias com listagens genéricas, requisitos irreais e processo de triagem completamente manual.',
    solucao: 'Agente autônomo em Python que roda 3 vezes ao dia, raspa vagas do LinkedIn via BeautifulSoup, usa Gemini 1.5 para análise semântica cruzando a vaga com o currículo, organiza resultados via Google Sheets API e dispara alerta no WhatsApp quando o match supera 90%.',
    resultado: 'Processo de candidatura automatizado com scoring de compatibilidade por IA, zero tempo gasto em triagem manual e notificação imediata das melhores oportunidades via GitHub Actions.',
    stack: ['Python', 'Gemini API', 'Gmail API', 'Google Sheets', 'GitHub Actions'],
  },
  {
    title: 'CalibraFlow — SaaS de Calibração',
    gradientClass: 'from-amber-500 to-orange-600',
    svgIllustration: <GaugeSVG />,
    dor: 'Empresas industriais gerenciavam calibração de instrumentos em planilhas, perdendo rastreabilidade, falhando em auditorias ISO e operando com instrumentos vencidos sem perceber.',
    solucao: 'Plataforma SaaS multi-tenant com isolamento total via Hibernate Filters e AOP, máquina de estados imutável com registro de IP e CPF em cada alteração, robô Spring Scheduling que bloqueia instrumentos vencidos à meia-noite e upload isolado de certificados PDF por empresa.',
    resultado: 'Conformidade ISO garantida com rastreabilidade 100% auditável, eliminação de erro humano no controle de vencimentos e dados de empresas completamente isolados em arquitetura multi-tenant.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT/Auth0', 'React'],
  },
  {
    title: 'Dashboard ANS — Engenharia de Dados',
    gradientClass: 'from-sky-500 to-blue-700',
    svgIllustration: <BarChartLineSVG />,
    dor: 'Processar e visualizar mais de 2,1 milhões de registros contábeis da ANS com ORMs tradicionais levava horas e travava o sistema inteiro.',
    solucao: 'Arquitetura híbrida com ETL em Java 21 usando protocolo COPY nativo do PostgreSQL para ingestão em segundos, API em Python FastAPI com processamento assíncrono e dashboard Vue.js com paginação server-side.',
    resultado: '2,1 milhões de registros ingeridos em segundos — contra horas com ORM convencional — com dashboard analítico em tempo real mostrando distribuição por UF e ranking de operadoras.',
    stack: ['Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Vue.js', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Pipeline Transacional AWS',
    gradientClass: 'from-yellow-500 to-orange-500',
    svgIllustration: <CloudPipelineSVG />,
    dor: 'Desafio técnico exigindo processamento confiável de 100 transações simultâneas com arquitetura cloud-native e desacoplamento entre produção e consumo de mensagens.',
    solucao: 'API Node.js publicando transações no AWS SQS via SDK, função Lambda consumindo a fila e persistindo no DynamoDB, com frontend Next.js exibindo as transações em tempo real via rota GET.',
    resultado: 'Pipeline serverless completo com garantia de entrega via fila, desacoplamento total entre camadas e 100 transações processadas com sucesso em ambiente AWS.',
    stack: ['Node.js', 'AWS SQS', 'AWS Lambda', 'DynamoDB', 'Next.js'],
  },
];

export const BrowserApp = () => {
  return (
    <div className="flex h-full w-full flex-col bg-[#050505] text-white">
      {/* Web Content */}
      <div className="flex-1 overflow-y-auto pb-10">

        {/* Hero */}
        <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-[#050505] to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(90,40,200,0.18),transparent)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
              <Globe size={42} className="text-blue-500" strokeWidth={1} />
            </div>
            <div className="mb-4 flex items-center justify-center">
              <img
                src={signatureImg.src}
                alt="Felipe Marzochi"
                draggable={false}
                className="h-auto w-[260px] md:w-[320px] pointer-events-none"
                style={{ filter: 'invert(1) brightness(5) contrast(2)', mixBlendMode: 'screen', opacity: 0.78 }}
              />
            </div>
            <p className="max-w-md text-base text-white/50 leading-relaxed">
              Desenvolvimento de alta performance. Arquiteturas robustas, Clean Code e interfaces focadas na experiência do usuário.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Iniciar Projeto
              </button>
              <button
                onClick={() => window.open('/?unlock=1', '_blank')}
                className="rounded-lg bg-white/5 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/10"
              >
                Ver Portfólio
              </button>
              <a
                href="/cv/CV_FELIPE_MARZOCHI.pdf"
                download="CV_Felipe_Marzochi.pdf"
                className="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/20 hover:ring-white/40"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* ── Perfil Profissional ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-6 py-8 space-y-8">

          {/* Sobre mim — narrative */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={16} className="text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400">Perfil Profissional</h2>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Desenvolvedor Full Stack com foco atual em backend Java, especializado em React.js, TypeScript e Next.js no front-end, e em transição ativa para Java com Spring Boot, JPA e Hibernate no back-end. Trabalho com PostgreSQL, MongoDB e MySQL como bancos de dados, e com Docker, CI/CD e AWS CloudFront na infraestrutura.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Formado em Análise e Desenvolvimento de Sistemas, com MBA em Engenharia de Software. Aplico SOLID, Clean Code e arquitetura em camadas em todo o ciclo de desenvolvimento — do levantamento de requisitos ao deploy — dentro de metodologias ágeis como Scrum e Kanban.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Minha formação anterior em Medicina Veterinária me treinou para diagnosticar com precisão antes de agir. Hoje aplico essa mesma mentalidade ao software: entendo o problema, estruturo a solução e valido antes de escalar.
            </p>
          </div>

          {/* DNA Profissional — Big Five bars */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Brain size={16} className="text-violet-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-violet-400">DNA Profissional</h2>
            </div>
            <div className="space-y-4">
              {PROFILE_TRAITS.map((trait) => (
                <div key={trait.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <trait.icon size={13} className="text-white/40" />
                      <span className="text-xs text-white/75 font-medium">{trait.label}</span>
                    </div>
                    <span className="text-xs font-bold text-white/50 tabular-nums">{trait.value}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${trait.color} opacity-80`}
                      style={{ width: `${trait.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-white/30 leading-relaxed italic">
              Perfil investigativo-analítico com alta orientação a processos de qualidade, autonomia e resultado de negócio.
            </p>
          </div>

          {/* Como trabalho */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target size={16} className="text-green-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-green-400">Como Trabalho</h2>
            </div>
            <div className="space-y-3">
              {WORK_STYLE.map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-white/85">{item.label}</span>
                    <span className="text-xs text-white/40 ml-2">— {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Projetos Entregues ──────────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers size={16} className="text-orange-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-orange-400">Projetos Entregues</h2>
            </div>
            <p className="text-xs text-white/35 mb-6">
              Problemas reais. Soluções sob medida. Resultados mensuráveis.
            </p>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {PROJECTS.map((project) => (
                <div
                  key={project.title}
                  className="flex flex-col rounded-2xl bg-white/[0.04] ring-1 ring-white/8 overflow-hidden"
                >
                  {/* Colored header with SVG illustration */}
                  <div className={`relative h-32 bg-gradient-to-br ${project.gradientClass} overflow-hidden flex-shrink-0`}>
                    <div className="absolute inset-0">
                      {project.svgIllustration}
                    </div>
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-4 gap-3">
                    {/* Title */}
                    <h3 className="text-base font-bold text-white/90 leading-snug">
                      {project.title}
                    </h3>

                    {/* Problema */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-red-400/80 block mb-1">
                        Problema
                      </span>
                      <p className="text-xs text-white/65 leading-relaxed">{project.dor}</p>
                    </div>

                    {/* Solucao */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400/80 block mb-1">
                        Solução
                      </span>
                      <p className="text-xs text-white/65 leading-relaxed">{project.solucao}</p>
                    </div>

                    {/* Resultado */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-green-400/80 block mb-1">
                        Resultado
                      </span>
                      <p className="text-xs text-white/65 leading-relaxed">{project.resultado}</p>
                    </div>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/8 px-2 py-0.5 text-[10px] text-white/50 ring-1 ring-white/6"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/5 transition-all hover:bg-white/10 hover:ring-white/10">
              <Zap className="mb-4 text-blue-500 transition-transform group-hover:scale-110" size={24} strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-white/90 tracking-wide">Performance Extrema</h3>
              <p className="text-sm text-white/40 leading-relaxed">Sistemas construídos para velocidade máxima. Otimização implacável sobre infraestruturas escaláveis com CI/CD e AWS CloudFront.</p>
            </div>
            <div className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/5 transition-all hover:bg-white/10 hover:ring-white/10">
              <Shield className="mb-4 text-blue-500 transition-transform group-hover:scale-110" size={24} strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-white/90 tracking-wide">Arquitetura Solida</h3>
              <p className="text-sm text-white/40 leading-relaxed">Fundações erguidas sob SOLID, Clean Code e design patterns — garantindo manutenção segura tanto no backend Java quanto no frontend React.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
