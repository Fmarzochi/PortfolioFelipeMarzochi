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
          Bem-vindo ao CatchUp OS Terminal v1.0.0
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
            <p><span className="text-green-400 font-bold w-20 inline-block">about</span> - Exibe informações sobre o desenvolvedor</p>
            <p><span className="text-green-400 font-bold w-20 inline-block">skills</span> - Lista as proficiências técnicas</p>
            <p><span className="text-green-400 font-bold w-20 inline-block">whoami</span> - Identidade atual</p>
            <p><span className="text-green-400 font-bold w-20 inline-block">clear</span> - Limpa o histórico do terminal</p>
            <p><span className="text-green-400 font-bold w-20 inline-block">sudo</span> - ???</p>
          </div>
        );
        break;
      case 'whoami':
        output = <p>Felipe Marzochi - Software Engineer & Founder da CatchUp Tech</p>;
        break;
      case 'about':
        output = (
          <p className="leading-relaxed">
            Engenheiro de Software com foco em alta performance e arquiteturas robustas. <br/>
            Com um background único (transição da Medicina Veterinária), trago uma visão analítica e metódica para a resolução de problemas complexos.<br/>
            Priorizo a adoção estrita do Clean Code e princípios SOLID para criar sistemas "nível Ferrari".
          </p>
        );
        break;
      case 'skills':
        output = (
          <div className="grid grid-cols-2 gap-2 text-blue-300">
            <p>❯ Java / Spring Boot</p>
            <p>❯ React / Next.js</p>
            <p>❯ PostgreSQL</p>
            <p>❯ Linux (Ubuntu) / Terminal</p>
            <p>❯ SOLID & Clean Code</p>
            <p>❯ Software Architecture</p>
          </div>
        );
        break;
      case 'sudo':
        output = <p className="text-red-400">Permissão negada. Este incidente será reportado.</p>;
        break;
      case 'clear':
        setHistory([]);
        return; // Retorna cedo para não adicionar o comando 'clear' ao histórico
      case '':
        output = '';
        break;
      default:
        output = <p className="text-red-400">Comando não encontrado: {cmd}. Digite 'help' para ajuda.</p>;
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
      className="h-full w-full overflow-y-auto bg-black/90 p-4 font-mono text-[14px] text-gray-200"
      onClick={handleTerminalClick}
    >
      <div className="flex flex-col gap-2">
        {history.map((record, index) => (
          <div key={index} className="flex flex-col gap-1">
            {record.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold">felipe@catchup-tech:~$</span>
                <span>{record.command}</span>
              </div>
            )}
            <div className="ml-4">{record.output}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-green-500 font-bold">felipe@catchup-tech:~$</span>
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