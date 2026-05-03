'use client';

import { useState, useEffect, useRef } from 'react';

/* ── Dados extraídos do currículo ─────────────────────────────────────────── */
const BOOT_LOGS = [
  '[  OK  ] Inicializando perfil de desenvolvedor...',
  '[  OK  ] Front-end: React.js, TypeScript, Next.js, Tailwind CSS...',
  '[  OK  ] Back-end: Node.js, Java, Spring Boot, APIs REST, JWT...',
  '[  OK  ] Banco de Dados: PostgreSQL, MongoDB, MySQL, SQL Avançado...',
  '[  OK  ] DevOps: Git, GitHub, Docker, CI/CD, AWS CloudFront...',
  '[  OK  ] Arquitetura: SaaS Multi-tenant, SOLID, Clean Code, Scrum...',
  '[  OK  ] 50+ certificados verificados. Stack pronto para produção.',
];

interface Skill { name: string; level: number; }

const SKILL_GROUPS: { label: string; color: string; tag: string; skills: Skill[] }[] = [
  {
    label: 'Front-End',
    tag: 'FRONT',
    color: 'text-blue-400',
    skills: [
      { name: 'React.js / Hooks / Context API', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'Next.js / SSR / SSG', level: 88 },
      { name: 'JavaScript ES6+', level: 94 },
      { name: 'HTML5 / CSS3 / Tailwind CSS', level: 91 },
      { name: 'Redux / Zustand', level: 82 },
    ],
  },
  {
    label: 'Back-End',
    tag: 'BACK ',
    color: 'text-green-400',
    skills: [
      { name: 'Node.js / Express', level: 83 },
      { name: 'Java / OOP / Collections', level: 80 },
      { name: 'Spring Boot / JPA / Hibernate', level: 76 },
      { name: 'APIs REST / Webhooks', level: 88 },
      { name: 'JWT / Autenticação & Autorização', level: 76 },
    ],
  },
  {
    label: 'Banco de Dados',
    tag: 'DATA ',
    color: 'text-yellow-400',
    skills: [
      { name: 'PostgreSQL / SQL Avançado', level: 85 },
      { name: 'MongoDB / NoSQL', level: 78 },
      { name: 'MySQL / Oracle DB', level: 80 },
    ],
  },
  {
    label: 'DevOps & Cloud',
    tag: 'DEVOP',
    color: 'text-purple-400',
    skills: [
      { name: 'Git / GitHub / Code Review', level: 90 },
      { name: 'Docker / Containerização', level: 78 },
      { name: 'CI/CD / Pipelines', level: 75 },
      { name: 'AWS CloudFront / Serviços Cloud', level: 70 },
      { name: 'Oracle Cloud OCI', level: 68 },
    ],
  },
  {
    label: 'Arquitetura & Metodologia',
    tag: 'ARCH ',
    color: 'text-cyan-400',
    skills: [
      { name: 'Arquitetura em Camadas / SOLID', level: 87 },
      { name: 'SaaS Multi-tenant', level: 85 },
      { name: 'Clean Code / Design Patterns', level: 86 },
      { name: 'Scrum / Kanban', level: 88 },
      { name: 'Testes Unitários / TDD', level: 78 },
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'Java Completo — Spring Boot, JPA, Hibernate, MySQL, MongoDB', inst: 'Udemy', year: '2026 (em curso)' },
  { name: 'JavaScript Completo — TypeScript, Node.js, MongoDB, OOP, MVC', inst: 'Udemy', year: '2025' },
  { name: 'JavaScript & TypeScript — Node, Express, React, Redux, Design Patterns', inst: 'Udemy', year: '2025' },
  { name: 'Web Front-end Fundamentos — HTML, CSS, JavaScript + Projetos', inst: 'Udemy', year: '2025' },
  { name: 'Oracle Next Education (ONE) — Desenvolvedor Full Stack', inst: 'Oracle / Alura', year: '2022' },
  { name: 'Formação Business Agility', inst: 'Oracle / Alura', year: '2022' },
  { name: 'Git e GitHub', inst: 'Oracle / Alura', year: '2022' },
  { name: 'Bancos de Dados SQL e NoSQL', inst: 'Udemy', year: '2022' },
];

const SKILL_DESCRIPTIONS: Record<string, string> = {
  'FRONT': 'Especialidade principal: interfaces modernas com React.js, TypeScript e Next.js. Foco em componentização, performance e acessibilidade.',
  'BACK ': 'Transição ativa para backend: Node.js, Java com Spring Boot, APIs REST robustas com autenticação JWT e tratamento estruturado de erros.',
  'DATA ': 'Modelagem relacional com PostgreSQL, queries complexas, índices e otimização. Experiência com MongoDB para aplicações de alta escala.',
  'DEVOP': 'Git/GitHub como ferramenta central, Docker para containerização, CI/CD automatizado e deploy em AWS CloudFront e serviços cloud.',
  'ARCH ': 'Aplicação de SOLID e Clean Code do back ao front. Arquitetura em camadas, SaaS multi-tenant, design patterns e metodologias ágeis.',
};

const buildGroupOutput = (tag: string): string => {
  const group = SKILL_GROUPS.find(g => g.tag === tag);
  if (!group) return '';
  const separator = '──────────────────────────────';
  const lines = [
    `→ ${group.label}`,
    separator,
    ...group.skills.map(sk => `  ${sk.level}% ${sk.name}`),
    separator,
    SKILL_DESCRIPTIONS[tag] ?? '',
  ];
  return lines.join('\n');
};

const HELP_TEXT = `
  Comandos disponíveis:
  ─────────────────────────────────
  help          → Exibe esta ajuda
  skills        → Ver competências técnicas
  certs         → Ver certificações
  frontend      → Filtrar habilidades Front-End
  backend       → Filtrar habilidades Back-End
  devops        → Filtrar DevOps & Cloud
  database      → Filtrar Banco de Dados
  arch          → Filtrar Arquitetura
  clear         → Limpar histórico do terminal
  ─────────────────────────────────`.trim();

/* ── Barra de progresso em ASCII ─────────────────────────────────────────── */
const BAR_WIDTH = 16;
const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = 30;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAnimated(Math.min(level, Math.round((level / steps) * step)));
        if (step >= steps) clearInterval(interval);
      }, 18);
      return () => clearInterval(interval);
    }, Math.random() * 300);
    return () => clearTimeout(timeout);
  }, [level]);

  const filled = Math.round((animated / 100) * BAR_WIDTH);
  const bar = '█'.repeat(filled) + '░'.repeat(BAR_WIDTH - filled);

  return (
    <div className="flex items-center gap-2 text-xs md:text-[13px] leading-relaxed">
      <span className={`${color} font-bold w-[42px] text-right flex-shrink-0`}>{animated}%</span>
      <span className={`${color} font-mono tracking-tighter`}>{bar}</span>
      <span className="text-gray-300 truncate">{name}</span>
    </div>
  );
};

/* ── Componente principal ─────────────────────────────────────────────────── */
export const SkillsApp = () => {
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<'skills' | 'certs'>('skills');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  // Terminal state
  const [cmdInput, setCmdInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<{ text: string; type: 'input' | 'output' | 'error' }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LOGS.length) {
        setBootLog((prev) => [...prev, BOOT_LOGS[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowPrompt(true), 400);
      }
    }, 280);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cmdHistory]);

  const processCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const inputLine = { text: `$ ${raw}`, type: 'input' as const };

    const navigate = (tab: 'skills' | 'certs', group?: string) => {
      setActiveTab(tab);
      if (group !== undefined) setActiveGroup(group);
    };

    let output: { text: string; type: 'output' | 'error' } | null = null;

    switch (cmd) {
      case 'help':
        output = { text: HELP_TEXT, type: 'output' };
        break;
      case 'skills':
      case '1':
        navigate('skills', null as unknown as string);
        setActiveGroup(null);
        output = { text: '→ Exibindo todas as competências técnicas', type: 'output' };
        break;
      case 'certs':
      case 'certifications':
      case '2':
        navigate('certs');
        output = { text: `→ Exibindo ${CERTIFICATIONS.length} certificações`, type: 'output' };
        break;
      case 'frontend':
      case 'front':
        navigate('skills');
        setActiveGroup('FRONT');
        output = { text: buildGroupOutput('FRONT'), type: 'output' };
        break;
      case 'backend':
      case 'back':
        navigate('skills');
        setActiveGroup('BACK ');
        output = { text: buildGroupOutput('BACK '), type: 'output' };
        break;
      case 'devops':
        navigate('skills');
        setActiveGroup('DEVOP');
        output = { text: buildGroupOutput('DEVOP'), type: 'output' };
        break;
      case 'database':
      case 'db':
        navigate('skills');
        setActiveGroup('DATA ');
        output = { text: buildGroupOutput('DATA '), type: 'output' };
        break;
      case 'arch':
      case 'arquitetura':
        navigate('skills');
        setActiveGroup('ARCH ');
        output = { text: buildGroupOutput('ARCH '), type: 'output' };
        break;
      case 'clear':
        setCmdHistory([]);
        return;
      default:
        output = { text: `Comando não encontrado: "${raw}". Digite help para ver os comandos.`, type: 'error' };
    }

    setCmdHistory((prev) => [...prev, inputLine, ...(output ? [output] : [])]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(cmdInput);
    setCmdInput('');
  };

  const visibleGroups = activeGroup
    ? SKILL_GROUPS.filter((g) => g.tag === activeGroup)
    : SKILL_GROUPS;

  return (
    <div className="h-full w-full bg-[#0c0c0c] font-mono text-sm text-gray-300 select-text flex flex-col">

      <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
        {/* Boot log */}
        <div className="mb-5 space-y-[3px] text-[11px] md:text-xs text-gray-500">
          {bootLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>

        {showPrompt && (
          <div className="animate-in fade-in duration-500 space-y-6">

            {/* Prompt line */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-green-500 font-bold">visitante@felipe-marzochi</span>
              <span className="text-white">:</span>
              <span className="text-blue-400 font-bold">~/skills</span>
              <span className="text-white">$ ./ver_curriculo.sh --full-stack</span>
            </div>

            {/* Header neofetch-style */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 border border-white/5 rounded-lg p-4 bg-white/[0.02]">
              <div className="text-blue-500 font-bold leading-none hidden sm:block text-[11px]">
                <pre>{`
 ███████╗███╗   ███╗
 ██╔════╝████╗ ████║
 █████╗  ██╔████╔██║
 ██╔══╝  ██║╚██╔╝██║
 ██║     ██║ ╚═╝ ██║
 ╚═╝     ╚═╝     ╚═╝`}</pre>
              </div>
              <div className="space-y-1.5 text-xs md:text-sm flex-1">
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Nome:</span>Felipe Marzochi</div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Perfil:</span>Desenvolvedor Full Stack</div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Foco atual:</span>Backend Java · Spring Boot</div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Localização:</span>Americana, SP</div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Idiomas:</span>Português (nativo) · Inglês (intermediário)</div>
                <div className="pt-1 border-t border-white/5">
                  <span className="text-blue-400 font-semibold w-28 inline-block">Formação:</span>
                  <span className="text-gray-300">Análise e Desenvolvimento de Sistemas · MBA Eng. Software</span>
                </div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Certificados:</span><span className="text-green-400 font-bold">50+</span> verificados</div>
                <div className="pt-2">
                  <a
                    href="/cv/CV_FELIPE_MARZOCHI.pdf"
                    download="CV_Felipe_Marzochi.pdf"
                    className="inline-flex items-center gap-2 rounded border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs text-green-400 transition-colors hover:bg-green-500/20 hover:text-green-300"
                  >
                    <span>⬇</span> $ download cv.pdf
                  </a>
                </div>
              </div>
            </div>

            {/* Tab selector */}
            <div className="flex gap-4 text-xs border-b border-white/10 pb-2">
              <button
                onClick={() => { setActiveTab('skills'); setActiveGroup(null); }}
                className={`transition-colors pb-1 border-b-2 ${activeTab === 'skills' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                [1] Competências Técnicas
              </button>
              <button
                onClick={() => setActiveTab('certs')}
                className={`transition-colors pb-1 border-b-2 ${activeTab === 'certs' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                [2] Certificações ({CERTIFICATIONS.length}+)
              </button>
            </div>

            {/* Skills tab */}
            {activeTab === 'skills' && (
              <div className="space-y-5 animate-in fade-in duration-300">
                {activeGroup && (
                  <div className="flex items-center gap-2 text-[11px] text-white/40">
                    <span>Filtro ativo:</span>
                    <span className="text-blue-400">{SKILL_GROUPS.find(g => g.tag === activeGroup)?.label}</span>
                    <button onClick={() => setActiveGroup(null)} className="text-white/30 hover:text-white/60 ml-1">[limpar]</button>
                  </div>
                )}
                {visibleGroups.map((group) => (
                  <div key={group.tag}>
                    <div className={`text-[11px] font-bold uppercase tracking-widest ${group.color} mb-2 opacity-70`}>
                      ── {group.label} {'─'.repeat(40)}
                    </div>
                    <div className="space-y-1.5 pl-2">
                      {group.skills.map((sk) => (
                        <SkillBar key={sk.name} name={sk.name} level={sk.level} color={group.color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications tab */}
            {activeTab === 'certs' && (
              <div className="space-y-2 animate-in fade-in duration-300">
                <div className="text-[11px] text-gray-500 mb-3">
                  {CERTIFICATIONS.length} certificações principais · ver pasta <span className="text-blue-400">~/arquivos</span> para diplomas completos
                </div>
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className="flex gap-3 items-start text-xs md:text-sm border-l-2 border-blue-500/30 pl-3 py-1">
                    <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                    <div className="flex-1">
                      <span className="text-gray-200">{cert.name}</span>
                      <span className="text-gray-500 ml-2">| {cert.inst} | {cert.year}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-[11px] text-gray-600 italic">
                  + 42 certificados adicionais — Java, SQL, Python, Oracle Cloud, Agile, Data Science...
                </div>
              </div>
            )}

            {/* Terminal command history */}
            {cmdHistory.length > 0 && (
              <div className="space-y-1 border-t border-white/8 pt-4 text-xs">
                {cmdHistory.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap leading-relaxed ${
                      line.type === 'input' ? 'text-green-400' :
                      line.type === 'error' ? 'text-red-400' :
                      'text-gray-400'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Terminal prompt input (sticky at bottom) ── */}
      {showPrompt && (
        <div className="flex-shrink-0 border-t border-white/8 pt-3 px-4 md:px-6 pb-3 bg-[#0c0c0c]">
          <form onSubmit={handleSubmit} className="flex items-center gap-1 flex-wrap">
            <span className="text-green-500 font-bold text-xs">visitante@felipe-marzochi</span>
            <span className="text-white text-xs">:</span>
            <span className="text-blue-400 font-bold text-xs">~/skills</span>
            <span className="text-white text-xs">$</span>
            <input
              ref={inputRef}
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="digite help para ver os comandos"
              className="flex-1 min-w-[120px] bg-transparent text-xs text-gray-200 outline-none placeholder-gray-600 caret-green-400"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
          <p className="mt-1.5 text-[10px] text-gray-700">
            help · skills · certs · frontend · backend · devops · database · arch · clear
          </p>
        </div>
      )}
    </div>
  );
};
