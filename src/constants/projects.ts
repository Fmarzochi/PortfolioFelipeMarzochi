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
    id: '8',
    albumKey: 'conecta',
    title: 'Conecta 360° · SaaS de RH e NR-1',
    gradient: 'from-slate-900 to-amber-500',
    tag: 'React.js · TypeScript · Node.js · Next.js',
    dor: 'Empresas brasileiras conviviam com a complexidade crescente da conformidade com a NR-1 (PGR/GRO) sem suporte tecnológico adequado. A gestão manual de riscos psicossociais, ausência de dashboards de KPIs e processos descentralizados de RH geravam exposição regulatória e decisões estratégicas baseadas em dados imprecisos.',
    solucao: 'Liderança técnica do front-end de uma plataforma SaaS completa para gestão de RH e conformidade NR-1. A arquitetura de componentes foi estruturada do zero com React.js e TypeScript, com integração robusta de APIs REST, autenticação e controle granular de permissões por perfil. Backend em Node.js com arquitetura de microsserviços e infraestrutura containerizada em Docker.',
    resultado: 'Plataforma em produção ativa com arquitetura escalável, Clean Code e componentes reutilizáveis que reduzem o tempo de evolução do produto. A centralização digital da operação de conformidade NR-1 elimina o risco de não conformidade regulatória, posicionando as empresas clientes com rastreabilidade total e monitoramento inteligente de KPIs em tempo real.',
    stack: ['React.js', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'Docker', 'AWS'],
    image: '/projects/conecta360.jpeg',
    github: 'https://github.com/Fmarzochi',
    objectPosition: 'top',
  },
  {
    id: '1',
    albumKey: 'erp',
    title: 'DuAutomação Residencial',
    gradient: 'from-blue-600 to-cyan-500',
    tag: 'Java · React.js · PostgreSQL',
    dor: 'O cliente enfrentava estagnação no crescimento devido à dependência total de processos manuais exaustivos para emissão de orçamentos e uma visibilidade nula sobre o status real das ordens de serviço em campo.',
    solucao: 'Desenvolvimento de um ecossistema ERP centralizado utilizando Java no back end e React.js no front end. A solução integra módulos de gestão financeira, controle dinâmico de inventário e um dashboard de monitoramento em tempo real para equipes técnicas.',
    resultado: 'Transformação digital completa com geração automatizada de documentos e orçamentos em segundos. A automação gerou uma economia operacional direta estimada em R$ 24.000 anuais, permitindo o escalonamento do negócio sem aumento de head count.',
    stack: ['Java', 'React.js', 'PostgreSQL', 'REST API'],
    image: '/projects/du-automacao-residencial.png',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '2',
    albumKey: 'unilab',
    title: 'Laboratório Unilab',
    gradient: 'from-teal-500 to-emerald-600',
    tag: 'Next.js · Tailwind · Framer Motion',
    dor: 'Limitações na captação de doadores de sangue e agendamentos devido à ausência de uma plataforma digital intuitiva. O fluxo anterior dependia de contatos telefônicos repetitivos e triagens manuais propensas a erros operacionais.',
    solucao: 'Criação de uma aplicação web premium com Next.js e Tailwind CSS, priorizando a usabilidade mobile através de componentes de navegação por dedão e um sistema inteligente de triagem com lógica de negócio automatizada.',
    resultado: 'Aumento real de 30% na captação de doadores e consolidação da autoridade digital da clínica. A jornada do usuário foi otimizada para ser concluída em poucos cliques, resultando em fluxos de trabalho mais limpos e eficientes.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/unilab.png',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '3',
    albumKey: 'agent',
    title: "Career Scout AI",
    gradient: 'from-violet-600 to-purple-700',
    tag: 'Python · Gemini API · GitHub Actions',
    dor: 'Ineficiência massiva no processo de busca ativa por oportunidades de carreira, onde a análise manual de centenas de listagens genéricas resultava em perda de tempo estratégico e fadiga cognitiva severa.',
    solucao: 'Engenharia de um agente autônomo de elite em Python integrado à Gemini AI. O sistema realiza o processamento semântico profundo de requisitos técnicos e cultura organizacional, operando de forma contínua via GitHub Actions.',
    resultado: 'Redução radical do ruído informativo: o agente analisa 50 vagas diariamente e entrega apenas 10 opções de alta relevância com scoring preditivo superior a 90%. O sistema atua como um filtro de inteligência que economiza horas de triagem manual.',
    stack: ['Python', 'Gemini API', 'Gmail API', 'Google Sheets', 'GitHub Actions'],
    image: '/projects/career-scout.png',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '4',
    albumKey: 'calibra',
    title: 'CalibraFlow: SaaS de Gestão de ISO',
    gradient: 'from-amber-500 to-orange-600',
    tag: 'Java 21 · Spring Boot · Docker · React',
    dor: 'Riscos críticos de conformidade normativa nas ISO 9001 e ISO 10012 dentro do ecossistema Petrobras. A falta de rastreabilidade de instrumentos de medição gerava desperdícios milionários e ameaças à segurança industrial.',
    solucao: 'Plataforma SaaS multi tenant robusta para gestão do ciclo de calibração. Implementa isolamento total de dados via Hibernate Filters e automação de alertas de vencimento através de tarefas agendadas no ecossistema Spring.',
    resultado: 'Mitigação estratégica de falhas com economia na ordem de milhões em redução de desperdício de material e multas. Garantiu uma trilha de auditoria 100% digital e imutável para grandes prestadoras de serviço do setor industrial.',
    stack: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'JWT/Auth0', 'React'],
    image: '/projects/calibraflow.png',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '5',
    albumKey: 'ans',
    title: 'Big Data ANS: Processamento em Escala',
    gradient: 'from-sky-500 to-blue-700',
    tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
    dor: 'Latência crítica e instabilidade no processamento analítico de milhões de registros contábeis da ANS. Sistemas convencionais falhavam ao tentar consolidar dados financeiros massivos para fins de auditoria e governança.',
    solucao: 'Arquitetura de dados de alta disponibilidade unindo a velocidade do protocolo COPY nativo do PostgreSQL com uma camada de processamento assíncrono em FastAPI, permitindo a ingestão e análise de Big Data com eficiência extrema.',
    resultado: 'Governança absoluta sobre R$ 100 milhões anuais em registros financeiros. A solução reduziu o tempo de auditoria complexa em 95%, entregando visualizações analíticas de 2,1 milhões de dados em poucos segundos.',
    stack: ['Java 21', 'Spring Boot', 'Python', 'FastAPI', 'Vue.js', 'PostgreSQL', 'Docker'],
    image: '/projects/big-data-ans.png',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '6',
    albumKey: 'aws',
    title: 'Pipeline Transacional AWS',
    gradient: 'from-yellow-500 to-orange-500',
    tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
    dor: 'Desafio de projetar um sistema transacional que suportasse picos de concorrência sem perda de dados, mantendo o custo de infraestrutura sob controle e o desacoplamento total entre produtores e consumidores de mensagens.',
    solucao: 'Arquitetura event driven serverless em AWS utilizando SQS para enfileiramento resiliente, funções Lambda para processamento elástico e DynamoDB para persistência de baixa latência e alta disponibilidade operacional.',
    resultado: 'Sistema 100% resiliente com escalabilidade infinita sob demanda. A modernização para um modelo cloud native resultou em uma redução estratégica de 60% nos custos fixos de servidor e manutenção tecnológica.',
    stack: ['Node.js', 'AWS SQS', 'AWS Lambda', 'DynamoDB', 'Next.js'],
    image: '/projects/pipeline.png',
    github: 'https://github.com/Fmarzochi',
  },
  {
    id: '7',
    albumKey: 'caroll',
    title: 'Caroll Buratto · Psicanalista Clínica',
    gradient: 'from-purple-500 to-rose-500',
    tag: 'Next.js · Node.js · PostgreSQL · Docker',
    dor: 'A profissional necessitava de uma presença digital completa, capaz de integrar em um único ambiente a apresentação institucional e a gestão operacional do negócio. Os processos de agendamento, administração de pacientes, controle financeiro, fluxo de caixa e produção de conteúdo eram realizados de forma manual e descentralizada, comprometendo a eficiência e a escalabilidade da operação.',
    solucao: 'Desenvolvimento de uma plataforma web personalizada utilizando Next.js no frontend e Node.js no backend, reunindo site institucional, sistema de agendamento, blog, gestão de pacientes, controle financeiro com fluxo de caixa e painel administrativo com autenticação segura. A infraestrutura foi estruturada com PostgreSQL containerizado em Docker para garantir desempenho, organização e escalabilidade.',
    resultado: 'Implementação de uma plataforma completa em produção, consolidando digitalmente os 9 anos de experiência da profissional em um ecossistema moderno e centralizado. O sistema eliminou processos manuais, otimizou a gestão operacional e concentrou todas as áreas do negócio em uma solução web personalizada.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/caroll-psicanalise.png',
    github: 'https://github.com/Fmarzochi',
    demoUrl: 'https://carollpsicanalise.vercel.app',
    objectPosition: 'top',
  },
];
