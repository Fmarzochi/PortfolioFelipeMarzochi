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
    title: 'Everything Gemini Code (EGC)',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    tag: 'Python · TypeScript · SQLite · Node.js · Bash · Tkinter',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Python', 'TypeScript', 'SQLite', 'Node.js', 'Bash', 'Tkinter', 'Gemini API', 'Docker'],
    image: '/projects/egc.webp',
    github: 'https://github.com/Fmarzochi/everything-gemini',
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
    github: 'https://github.com/Fmarzochi',
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
    github: 'https://github.com/Fmarzochi',
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
    github: 'https://github.com/Fmarzochi',
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
    github: 'https://github.com/Fmarzochi',
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
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '6',
    albumKey: 'aws',
    title: 'Pipeline Transacional AWS',
    gradient: 'from-yellow-500 to-orange-500',
    tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
    dor: 'A fragmentação de assistentes de IA e a falta de uma infraestrutura de orquestração rigorosa impedem a aplicação da inteligência artificial em ambientes de engenharia de alta complexidade. A ausência de determinismo, a volatilidade de contexto e a opacidade na execução tornam os fluxos de trabalho imprevisíveis e difíceis de escalar profissionalmente.',
    solucao: 'Desenvolvimento de um ecossistema operacional robusto e um fabric de orquestração de runtime para o Gemini. A arquitetura centraliza a governança através de filas determinísticas, persistência de contexto via Memory Mesh e um Plano de Controle GUI de baixa latência em Tkinter, permitindo a gestão e monitoramento em tempo real de frotas de agentes cognitivos.',
    resultado: 'Consolidação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades escaláveis. A solução estabelece novos padrões de estabilidade, segurança avançada via AgentShield e observabilidade total, elevando a orquestração de IA de simples janelas de chat para sistemas de engenharia de produção.',
    stack: ['Node.js', 'AWS SQS', 'AWS Lambda', 'DynamoDB', 'Next.js'],
    image: '/projects/pipeline.webp',
    github: 'https://github.com/Fmarzochi',
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
    github: 'https://github.com/Fmarzochi',
    demoUrl: 'https://carollpsicanalise.vercel.app',
    objectPosition: 'top',
  },
];
