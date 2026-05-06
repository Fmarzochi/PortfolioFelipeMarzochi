'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowManager } from '../../store/useWindowManager';

interface CommandRecord {
  command: string;
  output: React.ReactNode;
}

const FILESYSTEM: Record<string, string[] | string> = {
  '/': ['projects/', 'skills/', 'about.txt', 'experience.txt', 'contact.txt'],
  '/projects': [
    'duautomacao.md',
    'unilab.md',
    'careerscout.md',
    'calibraflow.md',
    'bigdata.md',
    'pipeline.md'
  ],
  '/skills': [
    'frontend.md',
    'backend.md',
    'database.md',
    'devops.md',
    'architecture.md'
  ]
};

const FILE_CONTENT: Record<string, React.ReactNode> = {
  'about.txt': (
    <p className="leading-relaxed">
      Engenheiro de Software com foco em arquiteturas front end escaláveis utilizando React.js e Next.js.<br/>
      Especialista com MBA em Engenharia de Software e sólida base em Análise de Sistemas.<br/>
      Trabalho na construção de sistemas resilientes e performáticos, aplicando rigor técnico e excelência em UX.
    </p>
  ),
  'experience.txt': (
    <div className="flex flex-col gap-1">
      <p><span className="text-violet-400">2026</span> · Dev Front End @ Conecta 360°</p>
      <p><span className="text-violet-400">2022-Pres</span> · Dev Full Stack @ Freelance</p>
      <p><span className="text-violet-400">2024-25</span> · Suporte Técnico @ Sec. Educação</p>
    </div>
  ),
  'contact.txt': (
    <div className="flex flex-col gap-1 text-blue-300">
      <p>Email: fmarzochi@gmail.com</p>
      <p>LinkedIn: /in/felipemarzochi</p>
      <p>GitHub: /Fmarzochi</p>
    </div>
  ),
  'projects/duautomacao.md': <p><span className="text-blue-400 font-bold">DuAutomação:</span> ERP centralizado com economia de R$ 24k/ano.</p>,
  'projects/unilab.md': <p><span className="text-blue-400 font-bold">Unilab:</span> 30% de aumento em captação de doadores.</p>,
  'projects/careerscout.md': <p><span className="text-blue-400 font-bold">Scout AI:</span> Triagem de 50 vagas/dia via LLM.</p>,
  'projects/calibraflow.md': <p><span className="text-blue-400 font-bold">CalibraFlow:</span> Gestão de conformidade Petrobras.</p>,
  'projects/bigdata.md': <p><span className="text-blue-400 font-bold">ANS Big Data:</span> Governança de R$ 100M anuais.</p>,
  'projects/pipeline.md': <p><span className="text-blue-400 font-bold">AWS Pipeline:</span> 60% de redução em custos de infra.</p>,
  'skills/frontend.md': <p>React.js · Next.js · TS · Tailwind · Framer</p>,
  'skills/backend.md': <p>Java 21 · Spring Boot · Node.js · APIs REST</p>,
  'skills/database.md': <p>PostgreSQL · MongoDB · Otimização de Performance</p>,
  'skills/devops.md': <p>Docker · CI/CD · AWS (SQS, Lambda, S3)</p>,
  'skills/architecture.md': <p>SOLID · Clean Code · SaaS Multi tenant · Scrum</p>,
};

export const TerminalApp = () => {
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('/');
  const [history, setHistory] = useState<CommandRecord[]>([
    { command: '', output: <div className="text-gray-400">Marzochi OS Shell v2.1.0 · Digite 'help' para começar.</div> }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  
  const { openApp } = useWindowManager();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);
  const handleTerminalClick = () => inputRef.current?.focus();

  const processCommand = useCallback((cmd: string) => {
    const rawInput = cmd.trim();
    if (!rawInput) return;

    setCmdHistory(prev => [rawInput, ...prev].slice(0, 50));
    setHistoryIdx(-1);

    const parts = rawInput.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    let output: React.ReactNode = '';

    const getFullPath = (path: string) => {
      if (path === '/') return '/';
      if (path === '..') return '/';
      const cleanPath = path.replace(/\/$/, '');
      if (cleanPath.startsWith('/')) return cleanPath;
      return currentDir === '/' ? `/${cleanPath}` : `${currentDir}/${cleanPath}`;
    };

    switch (command) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-300">
            {[
              ['ls [dir]',   'Listar arquivos'],
              ['cd [dir]',   'Mudar diretório'],
              ['cat [file]', 'Ler arquivo'],
              ['open [app]', 'Abrir aplicativo'],
              ['pwd',        'Caminho atual'],
              ['whoami',     'Identidade'],
              ['clear',      'Limpar tela'],
            ].map(([c, d]) => (
              <p key={c}><span className="text-green-400 font-bold w-24 inline-block">{c}</span> {d}</p>
            ))}
            <p className="col-span-full text-xs text-gray-500 mt-2">Dica: Tente 'open photos' ou 'cd projects && ls'.</p>
          </div>
        );
        break;

      case 'ls': {
        const target = args[0] ? getFullPath(args[0]) : currentDir;
        const entries = FILESYSTEM[target];
        if (entries && Array.isArray(entries)) {
          output = (
            <div className="flex flex-wrap gap-x-6">
              {entries.map(e => <span key={e} className={e.endsWith('/') ? 'text-blue-400 font-bold' : 'text-gray-300'}>{e}</span>)}
            </div>
          );
        } else {
          output = <p className="text-red-400">ls: diretório não encontrado: {args[0]}</p>;
        }
        break;
      }

      case 'cd': {
        const target = args[0] || '/';
        const newPath = getFullPath(target);
        if (FILESYSTEM[newPath]) {
          setCurrentDir(newPath);
          return;
        }
        output = <p className="text-red-400">cd: {target}: diretório inexistente</p>;
        break;
      }

      case 'cat': {
        if (!args[0]) { output = 'cat: especifique um arquivo'; break; }
        const fileName = args[0];
        const path = currentDir === '/' ? fileName : `${currentDir.substring(1)}/${fileName}`;
        output = FILE_CONTENT[path] || <p className="text-red-400">cat: {fileName}: arquivo não encontrado</p>;
        break;
      }

      case 'open': {
        const appName = args[0]?.toLowerCase();
        const appMap: Record<string, string> = {
          'portfolio': 'safari', 'safari': 'safari',
          'projects': 'photos', 'photos': 'photos', 'galeria': 'photos',
          'skills': 'skills', 'terminal': 'terminal',
          'finder': 'finder', 'diplomas': 'finder',
          'contacts': 'contacts', 'contatos': 'contacts',
          'maps': 'maps', 'experiencia': 'maps',
          'messages': 'messages', 'contato': 'messages'
        };
        const appId = appMap[appName];
        if (appId) {
          openApp(appId, appName);
          output = `Abrindo ${appName}...`;
        } else {
          output = <p className="text-yellow-400">Uso: open [portfolio|projects|skills|finder|maps|contacts]</p>;
        }
        break;
      }

      case 'whoami': output = 'Felipe Marzochi · Engenheiro de Software Full Stack'; break;
      case 'pwd': output = currentDir; break;
      case 'clear': setHistory([]); return;
      default: output = <p className="text-red-400">Comando não encontrado: {command}. Digite 'help'.</p>;
    }

    setHistory(prev => [...prev, { command: rawInput, output }]);
  }, [currentDir, openApp]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const next = historyIdx + 1;
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="h-full w-full overflow-y-auto p-4 font-mono text-[13px] leading-relaxed text-gray-200"
      style={{ background: 'rgba(10,10,12,0.95)', backdropFilter: 'blur(40px)' }}
      onClick={handleTerminalClick}
    >
      <div className="flex flex-col gap-2">
        {history.map((record, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            {record.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">felipe@marzochi-tech:{currentDir === '/' ? '~' : currentDir}$</span>
                <span>{record.command}</span>
              </div>
            )}
            <div className={record.command ? 'ml-4 opacity-90' : ''}>{record.output}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-green-500 font-bold">felipe@marzochi-tech:{currentDir === '/' ? '~' : currentDir}$</span>
        <input
          ref={inputRef} type="text" value={input}
          onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          autoFocus spellCheck={false} autoComplete="off"
          className="flex-1 bg-transparent outline-none ring-0"
          aria-label="Input do terminal"
        />
      </div>
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};
