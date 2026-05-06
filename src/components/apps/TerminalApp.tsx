'use client';

import { useState, useRef, useEffect } from 'react';

interface CommandRecord {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandRecord[]>([
    {
      command: '',
      output: (
        <div className="text-gray-400">
          Boas vindas ao Marzochi OS Terminal v1.0.0
          <br />
          Digite <span className="text-green-400">'help'</span> para ver os comandos disponíveis.
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mantém o scroll sempre no final quando um novo comando é inserido
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Mantém o foco no input se o usuário clicar em qualquer lugar do terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-gray-300">
            {[
              ['whoami',     'Identidade e perfil profissional'],
              ['about',      'Sobre o desenvolvedor'],
              ['skills',     'Stack técnica completa'],
              ['projects',   'Projetos entregues'],
              ['experience', 'Trajetória profissional'],
              ['certs',      'Certificações (50+)'],
              ['contact',    'Formas de contato'],
              ['stack',      'Tecnologias por categoria'],
              ['sudo',       '???'],
              ['clear',      'Limpar histórico'],
            ].map(([cmd, desc]) => (
              <p key={cmd}><span className="text-green-400 font-bold min-w-[100px] inline-block">{cmd}</span> · {desc}</p>
            ))}
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="flex flex-col gap-0.5">
            <p className="text-green-400 font-bold">Felipe Marzochi</p>
            <p>Desenvolvedor de Software · Full Stack</p>
            <p className="text-gray-400">Americana, SP · Remoto · CLT + Freelance</p>
            <p className="text-gray-400">fmarzochi@gmail.com · github.com/Fmarzochi</p>
          </div>
        );
        break;
      case 'about':
        output = (
          <p className="leading-relaxed">
            Full Stack developer especializado em React.js, TypeScript e Next.js no front end,<br/>
            com foco em arquitetura Java com Spring Boot e JPA no back end.<br/>
            Formação anterior em Medicina Veterinária · diagnosticar antes de agir é um hábito.<br/>
            Aplico SOLID, Clean Code e arquitetura em camadas do levantamento de requisitos ao deploy.
          </p>
        );
        break;
      case 'skills':
        output = (
          <div className="flex flex-col gap-1 text-blue-300">
            <p className="text-white/50 mb-1">── Stack completa ──</p>
            <p>Front End    → React.js · TypeScript · Next.js · Tailwind CSS · Redux</p>
            <p>Back End     → Java · Spring Boot · Node.js · APIs REST · JWT</p>
            <p>Banco        → PostgreSQL · MongoDB · MySQL · SQL Avançado</p>
            <p>DevOps       → Git · Docker · CI/CD · AWS CloudFront · GitHub Actions</p>
            <p>Arquitetura  → SOLID · Clean Code · SaaS Multi tenant · Scrum</p>
          </div>
        );
        break;
      case 'stack':
        output = (
          <div className="flex flex-col gap-2">
            {[
              { label: 'FRONT END',    items: 'React.js · TypeScript · Next.js · Tailwind CSS · Redux · Framer Motion',      color: 'text-blue-400'   },
              { label: 'BACK END',     items: 'Java 21 · Spring Boot · JPA · Hibernate · Node.js · Express · JWT',           color: 'text-green-400'  },
              { label: 'BANCO',        items: 'PostgreSQL · MongoDB · MySQL · SQL Avançado · Hibernate Filters',              color: 'text-yellow-400' },
              { label: 'DEVOPS',       items: 'Git · Docker · CI/CD · AWS (SQS, Lambda, CloudFront, DynamoDB)',              color: 'text-orange-400' },
              { label: 'ARQUITETURA',  items: 'SOLID · Clean Code · Design Patterns · SaaS Multi tenant · Scrum · Kanban',   color: 'text-violet-400' },
            ].map(({ label, items, color }) => (
              <div key={label}>
                <span className={`${color} font-bold text-xs`}>{label}</span>
                <p className="text-gray-300 text-xs ml-2">{items}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="flex flex-col gap-1.5">
            <p className="text-white/50 mb-1">── Projetos entregues ──</p>
            {[
              ['DuAutomação Residencial',              'Java · React.js · PostgreSQL'],
              ['Laboratório Unilab',                   'Next.js · Tailwind CSS · Framer Motion'],
              ["Career Scout AI",                      'Python · Gemini API · GitHub Actions'],
              ['CalibraFlow: SaaS de Gestão de ISO',  'Java 21 · Spring Boot · Docker'],
              ['Dashboard ANS: Engenharia de Dados',  'Java · FastAPI · Vue.js · PostgreSQL'],
              ['Pipeline Transacional AWS',            'Node.js · SQS · Lambda · DynamoDB'],
            ].map(([name, stack]) => (
              <p key={name}><span className="text-green-400">▸</span> <span className="text-white/80">{name}</span> <span className="text-gray-500">· {stack}</span></p>
            ))}
          </div>
        );
        break;
      case 'experience':
        output = (
          <div className="flex flex-col gap-1.5">
            <p className="text-white/50 mb-1">── Trajetória profissional ──</p>
            {[
              ['Jan/2026 · Atual', 'Dev Front End · Conecta 360°',         'CLT · Remoto'],
              ['Jan/2022 · Atual', 'Dev Full Stack · Freelance / Autônomo', 'Autônomo'],
              ['Set/2024 · Ago/2025', 'Suporte Técnico · Sec. da Educação', 'Estágio'],
              ['Abr/2024 · Jun/2024', 'Dev Front End · DuAutomações',      'Freelance'],
            ].map(([period, role, type]) => (
              <p key={role}><span className="text-violet-400">{period}</span> · <span className="text-white/80">{role}</span> <span className="text-gray-500">({type})</span></p>
            ))}
          </div>
        );
        break;
      case 'certs':
        output = (
          <div className="flex flex-col gap-1">
            <p className="text-white/50 mb-1">── Certificações principais (50+) · abra o app Diplomas para ver todos ──</p>
            {[
              'Java Completo: Spring Boot, JPA, Hibernate · Udemy 2026',
              'JavaScript Completo: TypeScript, Node.js · Udemy 2025',
              'Oracle Next Education (ONE): Full Stack · Oracle / Alura 2022',
              'Bancos de Dados SQL e NoSQL · Udemy 2022',
              'AWS Cloud Practitioner · 2024',
              'Python para Data Science · Udemy 2024',
              'Web Front end Fundamentos · Udemy 2025',
              'Docker · Udemy 2024',
            ].map(cert => (
              <p key={cert} className="text-gray-300"><span className="text-amber-400">✓</span> {cert}</p>
            ))}
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="flex flex-col gap-1">
            <p><span className="text-green-400">Email     </span> fmarzochi@gmail.com</p>
            <p><span className="text-green-400">WhatsApp  </span> +55 (19) 98234-1110</p>
            <p><span className="text-green-400">LinkedIn  </span> linkedin.com/in/felipemarzochi</p>
            <p><span className="text-green-400">GitHub    </span> github.com/Fmarzochi</p>
          </div>
        );
        break;
      case 'sudo':
        output = <p className="text-red-400">Permissão negada. Este incidente será reportado.</p>;
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = '';
        break;
      default:
        output = <p className="text-red-400">Comando não encontrado: &apos;{cmd}&apos;. Digite &apos;help&apos; para ver os comandos.</p>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    }
  };

  return (
    <div
      className="h-full w-full overflow-y-auto p-4 font-mono text-[14px] text-gray-200" style={{ background: 'rgba(10,10,12,0.92)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.08)' }}
      onClick={handleTerminalClick}
    >
      <div className="flex flex-col gap-2">
        {history.map((record, index) => (
          <div key={index} className="flex flex-col gap-1">
            {record.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">felipe@marzochi-tech:~$</span>
                <span>{record.command}</span>
              </div>
            )}
            <div className="ml-4">{record.output}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-green-500 font-bold">felipe@marzochi-tech:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent text-gray-200 outline-none ring-0 placeholder:text-gray-600"
        />
      </div>
      <div ref={bottomRef} className="h-4 w-full" />
    </div>
  );
};