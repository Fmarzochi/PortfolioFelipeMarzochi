'use client';

import { useState, useEffect } from 'react';

export const SkillsApp = () => {
  const [bootLog, setBootLog] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const logs = [
      'Carregando perfil do desenvolvedor...',
      'Analisando stack Front-end: React.js, TypeScript, Next.js...',
      'Estabelecendo conexões Back-end: Java, Spring Boot, Node.js...',
      'Verificando bancos de dados: PostgreSQL, MongoDB...',
      'Sistema pronto. Executando script de competências...'
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setBootLog((prev) => [...prev, logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowPrompt(true), 400);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-[#0c0c0c] font-mono text-sm md:text-base text-gray-300 overflow-y-auto p-4 md:p-6 select-text">
      
      <div className="mb-6 space-y-1 text-gray-500 text-xs md:text-sm">
        {bootLog.map((log, index) => (
          <div key={index}>{`[  OK  ] ${log}`}</div>
        ))}
      </div>

      {showPrompt && (
        <div className="animate-in fade-in duration-500">
          <div className="mb-4">
            <span className="text-green-500 font-bold">visitante@felipe-marzochi</span>
            <span className="text-white">:</span>
            <span className="text-blue-400 font-bold">~/skills</span>
            <span className="text-white">$ ./ver_curriculo.sh</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-4">
            <div className="flex-shrink-0 text-blue-500 font-bold leading-tight hidden sm:block">
              <pre>
{`
 _____ __  __ 
|  ___|  \\/  |
| |_  | \\  / |
|  _| | |\\/| |
| |   | |  | |
\\_|   \\_|  |_/
`}
              </pre>
            </div>

            <div className="flex-col space-y-3 w-full text-xs md:text-sm">
              <div><span className="text-blue-400 font-semibold w-24 inline-block">Nome:</span> Felipe Marzochi</div>
              <div><span className="text-blue-400 font-semibold w-24 inline-block">Perfil:</span> Desenvolvedor de Software Full Stack</div>
              <div><span className="text-blue-400 font-semibold w-24 inline-block">Local:</span> Americana, SP</div>
              
              <div className="py-2 border-b border-gray-800 border-dashed w-full max-w-md"></div>

              <div><span className="text-green-400 font-semibold w-24 inline-block">Front-end:</span> React.js, TypeScript, HTML5, CSS3</div>
              <div><span className="text-green-400 font-semibold w-24 inline-block">Back-end:</span> Node.js, Java, Spring Boot, APIs REST</div>
              <div><span className="text-green-400 font-semibold w-24 inline-block">Data:</span> SQL, PostgreSQL, MongoDB</div>
              <div><span className="text-green-400 font-semibold w-24 inline-block">DevOps:</span> Git, GitHub, Docker, CI/CD</div>
              
              <div className="py-2 border-b border-gray-800 border-dashed w-full max-w-md"></div>

              <div><span className="text-purple-400 font-semibold w-24 inline-block">Formação:</span> ADS (Em andamento), MBA Eng. de Software</div>
              <div><span className="text-purple-400 font-semibold w-24 inline-block">Transição:</span> Bacharelado em Medicina Veterinária</div>

              <div className="flex gap-2 mt-4">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-red-500"></div>
                <div className="w-4 h-4 bg-green-500"></div>
                <div className="w-4 h-4 bg-yellow-500"></div>
                <div className="w-4 h-4 bg-blue-500"></div>
                <div className="w-4 h-4 bg-purple-500"></div>
                <div className="w-4 h-4 bg-cyan-500"></div>
                <div className="w-4 h-4 bg-white"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <span className="text-green-500 font-bold">visitante@felipe-marzochi</span>
            <span className="text-white">:</span>
            <span className="text-blue-400 font-bold">~/skills</span>
            <span className="text-white ml-1">$ <span className="animate-pulse">_</span></span>
          </div>
        </div>
      )}
    </div>
  );
};
