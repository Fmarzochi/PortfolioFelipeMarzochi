'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useWindowManager } from '../../store/useWindowManager';

const BOOT_LOGS = [
  '[  OK  ] Inicializando perfil de engenheiro...',
  '[  OK  ] Front End: React.js, TypeScript, Next.js, Tailwind CSS...',
  '[  OK  ] Back End: Node.js, Java, Spring Boot, APIs REST, JWT...',
  '[  OK  ] Banco de Dados: PostgreSQL, MongoDB, MySQL, SQL Avançado...',
  '[  OK  ] DevOps: Git, GitHub, Docker, CI/CD, AWS CloudFront...',
  '[  OK  ] Arquitetura: SaaS Multi tenant, SOLID, Clean Code, Scrum...',
  '[  OK  ] 50+ certificados verificados. Shell pronto para execução.',
];

interface Skill { name: string; level: number; }

const SKILL_GROUPS: { label: string; color: string; tag: string; skills: Skill[] }[] = [
  {
    label: 'Front End',
    tag: 'FRONT',
    color: 'text-blue-400',
    skills: [
      { name: 'React.js / Hooks / Context API', level: 86 },
      { name: 'TypeScript', level: 82 },
      { name: 'Next.js / SSR / SSG', level: 80 },
      { name: 'JavaScript ES6+', level: 85 },
      { name: 'HTML5 / CSS3 / Tailwind CSS', level: 88 },
      { name: 'Redux / Zustand', level: 74 },
    ],
  },
  {
    label: 'Back End',
    tag: 'BACK ',
    color: 'text-green-400',
    skills: [
      { name: 'Node.js / Express', level: 75 },
      { name: 'Java / OOP / Collections', level: 68 },
      { name: 'Spring Boot / JPA / Hibernate', level: 65 },
      { name: 'APIs REST / Webhooks', level: 82 },
      { name: 'JWT / Autenticação & Autorização', level: 72 },
    ],
  },
  {
    label: 'Banco de Dados',
    tag: 'DATA ',
    color: 'text-yellow-400',
    skills: [
      { name: 'PostgreSQL / SQL Avançado', level: 78 },
      { name: 'MongoDB / NoSQL', level: 70 },
      { name: 'MySQL / Oracle DB', level: 72 },
    ],
  },
  {
    label: 'DevOps & Cloud',
    tag: 'DEVOP',
    color: 'text-purple-400',
    skills: [
      { name: 'Git / GitHub / Code Review', level: 86 },
      { name: 'Docker / Containerização', level: 68 },
      { name: 'CI/CD / Pipelines', level: 62 },
      { name: 'AWS Services / Cloud', level: 58 },
    ],
  },
  {
    label: 'Arquitetura & Metodologia',
    tag: 'ARCH ',
    color: 'text-cyan-400',
    skills: [
      { name: 'Arquitetura em Camadas / SOLID', level: 80 },
      { name: 'SaaS Multi tenant', level: 76 },
      { name: 'Clean Code / Design Patterns', level: 84 },
      { name: 'Scrum / Kanban', level: 82 },
    ],
  },
];

import { PROJECTS } from '../../constants/projects';

const egc = PROJECTS.find(p => p.albumKey === 'egc')!;
const erp = PROJECTS.find(p => p.albumKey === 'erp')!;
const unilab = PROJECTS.find(p => p.albumKey === 'unilab')!;
const agent = PROJECTS.find(p => p.albumKey === 'agent')!;
const calibra = PROJECTS.find(p => p.albumKey === 'calibra')!;
const ans = PROJECTS.find(p => p.albumKey === 'ans')!;
const aws = PROJECTS.find(p => p.albumKey === 'aws')!;

const CERTIFICATIONS = [
  { name: 'Java Completo · Spring Boot, JPA, Hibernate, MySQL, MongoDB', inst: 'Udemy', year: '2026' },
  { name: 'JavaScript Completo · TypeScript, Node.js, MongoDB, OOP, MVC', inst: 'Udemy', year: '2025' },
  { name: 'Javascript e TypeScript · Node, Express, React, Redux, Design Patterns', inst: 'Udemy', year: '2025' },
  { name: 'Web Front-end Fundamentos · HTML, CSS, JavaScript + Projetos', inst: 'Udemy', year: '2025' },
  { name: 'Oracle Next Education (ONE) · Full Stack', inst: 'Oracle / Alura', year: '2022' },
  { name: 'Bancos de Dados SQL e NoSQL', inst: 'Udemy', year: '2022' },
  { name: 'AWS Cloud Practitioner', inst: 'AWS', year: '2024' },
];

const FILESYSTEM: Record<string, string[]> = {
  '/': ['projects/', 'skills/', 'about.txt', 'experience.txt', 'contact.txt'],
  '/projects': ['egc.md', 'duautomacao.md', 'unilab.md', 'careerscout.md', 'calibraflow.md', 'bigdata.md', 'pipeline.md'],
  '/skills': ['frontend.md', 'backend.md', 'database.md', 'devops.md', 'architecture.md']
};

const FILE_CONTENT: Record<string, React.ReactNode> = {
  'about.txt': <p>Engenheiro de Software com foco em sistemas escaláveis, aplicando SOLID e Clean Code.</p>,
  'experience.txt': <p>4 anos de trajetória atuando como Full Stack (React · Next.js · Java · Node.js).</p>,
  'contact.txt': <p>Email: fmarzochi@gmail.com | LinkedIn: /in/felipemarzochi</p>,
  'projects/egc.md': <p>{egc.resultado}</p>,
  'projects/duautomacao.md': <p>{erp.resultado}</p>,
  'projects/unilab.md': <p>{unilab.resultado}</p>,
  'projects/careerscout.md': <p>{agent.resultado}</p>,
  'projects/calibraflow.md': <p>{calibra.resultado}</p>,
  'projects/bigdata.md': <p>{ans.resultado}</p>,
  'projects/pipeline.md': <p>{aws.resultado}</p>,
};

const HELP_TEXT = `
  Comandos do Sistema:
  ─────────────────────────────────
  ls [dir]      → Listar arquivos
  cd [dir]      → Navegar em diretórios
  cat [file]    → Ler conteúdo de arquivo
  open [app]    → Abrir aplicativo do OS
  
  Filtros de Interface:
  ─────────────────────────────────
  skills        → Ver todas habilidades
  certs         → Ver certificações
  frontend      → Filtrar Front End
  backend       → Filtrar Back End
  devops        → Filtrar DevOps
  database      → Filtrar Banco de Dados
  arch          → Filtrar Arquitetura
  clear         → Limpar terminal
  ─────────────────────────────────`.trim();

const BAR_WIDTH = 16;
const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => {
  const [animated, setAnimated] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      let step = 0;
      intervalRef.current = setInterval(() => {
        step++;
        setAnimated(Math.min(level, Math.round((level / 30) * step)));
        if (step >= 30 && intervalRef.current) clearInterval(intervalRef.current);
      }, 15);
    }, 200);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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

export const SkillsApp = () => {
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [activeTab, setActiveTab] = useState<'skills' | 'certs'>('skills');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  const [cmdInput, setCmdInput] = useState('');
  const [currentDir, setCurrentDir] = useState('/');
  const [cmdHistory, setCmdHistory] = useState<{ text: string | React.ReactNode; type: 'input' | 'output' | 'error' }[]>([]);
  
  const { openApp } = useWindowManager();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LOGS.length) { setBootLog(p => [...p, BOOT_LOGS[i]]); i++; }
      else { clearInterval(interval); setTimeout(() => setShowPrompt(true), 400); }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [cmdHistory]);

  const processCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const inputLine = { text: `$ ${raw}`, type: 'input' as const };
    let output: { text: string | React.ReactNode; type: 'output' | 'error' } | null = null;

    const getFullPath = (path: string) => {
      if (path === '/') return '/';
      if (path === '..') return '/';
      const clean = path.replace(/\/$/, '');
      if (clean.startsWith('/')) return clean;
      return currentDir === '/' ? `/${clean}` : `${currentDir}/${clean}`;
    };

    switch (command) {
      case 'help': output = { text: HELP_TEXT, type: 'output' }; break;
      case 'skills': setActiveTab('skills'); setActiveGroup(null); output = { text: '→ Exibindo dashboard de competências', type: 'output' }; break;
      case 'certs': setActiveTab('certs'); output = { text: '→ Exibindo certificações principais', type: 'output' }; break;
      case 'frontend': setActiveTab('skills'); setActiveGroup('FRONT'); output = { text: '→ Filtrando: Front End', type: 'output' }; break;
      case 'backend': setActiveTab('skills'); setActiveGroup('BACK '); output = { text: '→ Filtrando: Back End', type: 'output' }; break;
      case 'devops': setActiveTab('skills'); setActiveGroup('DEVOP'); output = { text: '→ Filtrando: DevOps', type: 'output' }; break;
      case 'database': setActiveTab('skills'); setActiveGroup('DATA '); output = { text: '→ Filtrando: Banco de Dados', type: 'output' }; break;
      case 'arch': setActiveTab('skills'); setActiveGroup('ARCH '); output = { text: '→ Filtrando: Arquitetura', type: 'output' }; break;
      
      case 'ls': {
        const target = args[0] ? getFullPath(args[0]) : currentDir;
        const entries = FILESYSTEM[target];
        output = entries ? { text: entries.join('  '), type: 'output' } : { text: `ls: ${args[0]}: diretório não encontrado`, type: 'error' };
        break;
      }
      case 'cd': {
        const next = getFullPath(args[0] || '/');
        if (FILESYSTEM[next]) { setCurrentDir(next); output = null; }
        else output = { text: `cd: ${args[0]}: diretório inexistente`, type: 'error' };
        break;
      }
      case 'cat': {
        if (!args[0]) { output = { text: 'cat: especifique um arquivo', type: 'error' }; break; }
        const path = currentDir === '/' ? args[0] : `${currentDir.substring(1)}/${args[0]}`;
        output = FILE_CONTENT[path] ? { text: FILE_CONTENT[path], type: 'output' } : { text: `cat: ${args[0]}: arquivo não encontrado`, type: 'error' };
        break;
      }
      case 'open': {
        const map: Record<string, string> = { 'portfolio': 'safari', 'projects': 'photos', 'skills': 'skills', 'finder': 'finder' };
        const id = map[args[0]?.toLowerCase()];
        if (id) { openApp(id, args[0]); output = { text: `Abrindo ${args[0]}...`, type: 'output' }; }
        else output = { text: 'open: aplicativo não encontrado', type: 'error' };
        break;
      }
      case 'clear': setCmdHistory([]); return;
      default: output = { text: `Comando não encontrado: "${command}". Digite help.`, type: 'error' };
    }

    setCmdHistory(prev => [...prev, inputLine, ...(output ? [output] : [])]);
  }, [currentDir, openApp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(cmdInput);
    setCmdInput('');
  };

  const visibleGroups = activeGroup ? SKILL_GROUPS.filter(g => g.tag === activeGroup) : SKILL_GROUPS;

  return (
    <div className="h-full w-full font-mono text-sm text-gray-300 flex flex-col" style={{ background: 'rgba(10,10,12,0.92)', backdropFilter: 'blur(40px)' }}>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
        <div className="mb-5 space-y-[3px] text-[11px] md:text-xs text-gray-500">
          {bootLog.map((log, i) => <div key={i}>{log}</div>)}
        </div>

        {showPrompt && (
          <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-green-500 font-bold">visitante@felipe-marzochi</span>
              <span className="text-white">:</span>
              <span className="text-blue-400 font-bold">{currentDir === '/' ? '~' : currentDir}</span>
              <span className="text-white">$ ./ver_curriculo.sh --full-stack</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-blue-500 font-bold leading-none hidden sm:block text-[11px]">
                <pre>{` ███████╗███╗   ███╗\n ██╔════╝████╗ ████║\n █████╗  ██╔████╔██║\n ██╔══╝  ██║╚██╔╝██║\n ██║     ██║ ╚═╝ ██║\n ╚═╝     ╚═╝     ╚═╝`}</pre>
              </div>
              <div className="space-y-1.5 text-xs md:text-sm flex-1">
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Nome:</span>Felipe Marzochi</div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Perfil:</span>Engenheiro de Software</div>
                <div><span className="text-blue-400 font-semibold w-28 inline-block">Foco:</span>Sistemas de alta performance e UX premium</div>
                <div className="pt-2"><a href="/cv/CV_FELIPE_MARZOCHI.pdf" download className="inline-flex items-center gap-2 rounded border border-green-500/40 bg-green-500/10 px-3 py-1 text-xs text-green-400 transition-colors hover:bg-green-500/20"><span>⬇</span> $ download cv.pdf</a></div>
              </div>
            </div>

            <div className="flex gap-4 text-xs pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => { setActiveTab('skills'); setActiveGroup(null); }} className={`transition-colors pb-1 border-b-2 ${activeTab === 'skills' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>[1] Competências Técnicas</button>
              <button onClick={() => setActiveTab('certs')} className={`transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${activeTab === 'certs' ? 'border-blue-500 text-blue-400 font-bold' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>[2] Certificações <span className="rounded-full bg-green-500/20 px-1.5 py-0.5 text-[9px] font-bold text-green-400 ring-1 ring-green-500/30">50+</span></button>
            </div>

            {activeTab === 'skills' ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                {activeGroup && <div className="flex items-center gap-2 text-[11px] text-white/40"><span>Filtro:</span><span className="text-blue-400">{SKILL_GROUPS.find(g => g.tag === activeGroup)?.label}</span><button onClick={() => setActiveGroup(null)} className="text-white/30 hover:text-white/60 ml-1">[limpar]</button></div>}
                {visibleGroups.map((group) => (
                  <div key={group.tag}><div className={`text-[11px] font-bold uppercase tracking-widest ${group.color} mb-2 opacity-70`}>── {group.label} {'─'.repeat(40)}</div><div className="space-y-1.5 pl-2">{group.skills.map((sk) => (<SkillBar key={sk.name} name={sk.name} level={sk.level} color={group.color} />))}</div></div>
                ))}
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-3 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}><span className="text-green-400 text-base">✓</span><span>Principais certificados listados abaixo · <span className="text-blue-400">abra o app Diplomas</span> para ver todos</span></div>
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className="flex gap-3 items-start text-xs md:text-sm border-l-2 border-blue-500/30 pl-3 py-1"><span className="text-blue-500 font-bold flex-shrink-0">✓</span><div className="flex-1"><span className="text-gray-200">{cert.name}</span><span className="text-gray-500 ml-2">| {cert.inst} | {cert.year}</span></div></div>
                ))}
              </div>
            )}

            {cmdHistory.length > 0 && (
              <div className="space-y-1 pt-4 text-xs border-t border-white/5">
                {cmdHistory.map((line, i) => (
                  <div key={i} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-green-400' : line.type === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                    {line.text}
                  </div>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {showPrompt && (
        <div className="flex-shrink-0 pt-3 px-4 md:px-6 pb-[max(16px,env(safe-area-inset-bottom,16px))]" style={{ background: 'rgba(10,10,12,0.92)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <form onSubmit={handleSubmit} className="flex items-center gap-1 flex-wrap">
            <span className="text-green-500 font-bold text-xs">visitante@felipe-marzochi</span>
            <span className="text-white text-xs">:</span>
            <span className="text-blue-400 font-bold text-xs">{currentDir === '/' ? '~' : currentDir}</span>
            <span className="text-white text-xs">$</span>
            <input ref={inputRef} type="text" value={cmdInput} onChange={(e) => setCmdInput(e.target.value)} placeholder="digite help para ver os comandos" className="flex-1 min-w-[120px] bg-transparent text-xs text-gray-200 outline-none border-none ring-0 p-0 caret-green-400" autoComplete="off" spellCheck={false} />
          </form>
          <p className="mt-1.5 text-[10px] text-gray-700">help · skills · certs · frontend · backend · devops · database · arch · ls · cd · cat · clear</p>
        </div>
      )}
    </div>
  );
};
