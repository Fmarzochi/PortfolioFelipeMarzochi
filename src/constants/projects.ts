export interface Project {
  id: string;
  albumKey: string;
  title: string;
  tag: string;
  dor: string;
  solucao: string;
  resultado: string;
  stack: string[];
  image: string;
  github?: string;
  demoUrl?: string;
  gradient: string;
  objectPosition?: string;
}

export const PROJECTS: Project[] = [
  { 
    id: '9',
    albumKey: 'egc',
    title: 'EGC · Extended Global Context',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    tag: 'Node.js · TypeScript · MCP · SQLite · Markdown',
    dor: 'Assistentes de IA para código sofrem de amnésia total entre sessões: cada nova janela de chat ou troca de ferramenta apaga decisões técnicas, preferências e o histórico do que já foi tentado e falhou. O desenvolvedor perde os primeiros minutos de cada sessão reexplicando o contexto do projeto, e cada reexplicação consome tokens pagos à toa.',
    solucao: 'Criei o EGC (Extended Global Context), um runtime open source local-first com dois servidores MCP: egc-memory, que persiste decisões, preferências e estado do projeto em Markdown e SQLite na própria máquina, e egc-guardian, que valida comandos e bloqueia escritas em caminhos sensíveis antes da execução. Funciona sem nuvem, sem assinatura, integrado a mais de 20 ferramentas de IA (Claude Code, Cursor, Copilot, Gemini CLI, entre outras).',
    resultado: 'Projeto open source com 29 colaboradores externos, documentação em 11 idiomas e lançamento no Product Hunt. Reduz o consumo de tokens de recontextualização de cerca de 1.500 para cerca de 200 por sessão, uma queda de aproximadamente 87%. Sou também autor da especificação aberta Agent Memory Interchange (AMI), que padroniza memória portátil entre agentes de IA.',
    stack: ['Node.js', 'TypeScript', 'MCP', 'SQLite', 'Markdown', 'Bash'],
    image: '/projects/egc.webp',
    github: 'https://github.com/Fmarzochi/EGC',
  },

  {
    id: '8',
    albumKey: 'conecta',
    title: 'Conecta 360° · SaaS de RH e NR-1',
    gradient: 'from-slate-900 to-amber-500',
    tag: 'React.js · TypeScript · Node.js · Next.js',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['React.js', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'Docker', 'AWS', 'Kubernetes', 'GitHub Actions'],
    image: '/projects/conecta360.webp',
    github: 'https://github.com/conecta-360rh',
    objectPosition: 'top',
  },
  {
    id: '1',
    albumKey: 'erp',
    title: 'DuAutomação Residencial',
    gradient: 'from-blue-600 to-cyan-500',
    tag: 'Java · React.js · PostgreSQL',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Java', 'React.js', 'PostgreSQL', 'REST API'],
    image: '/projects/du-automacao-residencial.webp',
    github: 'https://github.com/Catch-Up-Technologies/duautomacoes',
    demoUrl: 'https://duautomacoes-frontend.onrender.com/',
  },
  {
    id: '2',
    albumKey: 'unilab',
    title: 'Laboratório Unilab',
    gradient: 'from-teal-500 to-emerald-600',
    tag: 'Next.js · Tailwind · Framer Motion',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/unilab.webp',
    github: 'https://github.com/Fmarzochi/unilab',
    demoUrl: 'https://unilab-nu.vercel.app/',
  },
  {
    id: '3',
    albumKey: 'agent',
    title: "Career Scout AI",
    gradient: 'from-violet-600 to-purple-700',
    tag: 'Python · Gemini API · GitHub Actions',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Python', 'Gemini API', 'Gmail API', 'Google Sheets', 'GitHub Actions'],
    image: '/projects/career-scout.webp',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '4',
    albumKey: 'calibra',
    title: 'CalibraFlow: SaaS de Gestão de ISO',
    gradient: 'from-amber-500 to-orange-600',
    tag: 'Java 21 · Spring Boot · Docker · React',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT/Auth0', 'React'],
    image: '/projects/calibraflow.webp',
    github: 'https://github.com/Fmarzochi/CalibraFlow',
  },
  {
    id: '5',
    albumKey: 'ans',
    title: 'Big Data ANS: Processamento em Escala',
    gradient: 'from-sky-500 to-blue-700',
    tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Vue.js', 'PostgreSQL', 'Docker'],
    image: '/projects/big-data-ans.webp',
    github: 'https://github.com/Fmarzochi/DesafioIntuitiveCare',
  },
  {
    id: '6',
    albumKey: 'aws',
    title: 'Pipeline Transacional AWS',
    gradient: 'from-yellow-500 to-orange-500',
    tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solution estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Node.js', 'AWS SQS', 'AWS Lambda', 'DynamoDB', 'Next.js'],
    image: '/projects/pipeline.webp',
    github: 'https://github.com/Fmarzochi/APIConvemDesafio',
  },
  {
    id: '7',
    albumKey: 'caroll',
    title: 'Caroll Buratto · Psicanalista Clínica',
    gradient: 'from-purple-500 to-rose-500',
    tag: 'Next.js · Node.js · PostgreSQL · Docker',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/caroll-psicanalise.webp',
    github: 'https://github.com/Fmarzochi/ca-psicanalise',
    demoUrl: 'https://carollpsicanalise.vercel.app/',
    objectPosition: 'top',
  },
];
