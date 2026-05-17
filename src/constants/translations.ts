export interface Translations {
  lock: {
    subtitle: string;
    passwordPlaceholder: string;
    touchToEnter: string;
    clickToEnter: string;
    swipeUp: string;
    accessibilityBadge: string;
    muteOn: string;
    muteOff: string;
    unlockSystem: string;
    passwordLabel: string;
    enter: string;
  };
  apps: {
    safari: string;
    maps: string;
    photos: string;
    finder: string;
    messages: string;
  };
  menu: {
    open: string;
    close: string;
    reload: string;
  };
  gallery: {
    library: string;
    allPhotos: string;
    favorites: string;
    albums: string;
    searchPlaceholder: string;
    noResults: string;
    back: string;
    problem: string;
    solution: string;
    result: string;
    stackUsed: string;
    viewOnGithub: string;
    addToFav: string;
    removeFromFav: string;
    favorited: string;
    favorite: string;
  };
  browser: {
    profileTitle: string;
    dnaTitle: string;
    workStyleTitle: string;
    projectsTitle: string;
    projectsSubtitle: string;
    viewPortfolio: string;
    downloadCV: string;
    problem: string;
    solution: string;
    result: string;
    viewOnGithub: string;
    viewDemo: string;
    heroSubtitle: string;
    bio1: string;
    bio2: string;
    bio3: string;
    traits: Array<{ label: string; evidence: string }>;
    workStyle: Array<{ label: string; desc: string }>;
  };
  finder: {
    searchPlaceholder: string;
    searchAriaLabel: string;
    certificates: string;
    noneFound: string;
    closePreview: string;
    items: string;
  };
  ios: {
    recentApps: string;
    dragToClose: string;
    appsOpenSingular: string;
    appsOpenPlural: string;
    close: string;
  };
  projects: Record<string, {
    title: string;
    tag: string;
    dor: string;
    solucao: string;
    resultado: string;
  }>;
}

export const TRANSLATIONS: Translations = {
  lock: {
    subtitle: 'Um portfólio diferente · explore como um sistema operacional',
    passwordPlaceholder: 'Digite a senha...',
    touchToEnter: 'Toque para entrar',
    clickToEnter: 'Clique ou pressione qualquer tecla',
    swipeUp: 'Deslize para cima',
    accessibilityBadge: '100% Acessível · Libras',
    muteOn: 'Ativar som',
    muteOff: 'Silenciar',
    unlockSystem: 'Desbloquear sistema',
    passwordLabel: 'Senha de acesso',
    enter: 'Entrar',
  },
  apps: {
    safari: 'Portfólio',
    maps: 'Experiência',
    photos: 'Galeria de Projetos',
    finder: 'Diplomas',
    messages: 'Contato',
  },
  menu: {
    open: 'Abrir',
    close: 'Fechar',
    reload: 'Recarregar',
  },
  gallery: {
    library: 'Biblioteca',
    allPhotos: 'Todas as Fotos',
    favorites: 'Favoritos',
    albums: 'Projetos (Álbuns)',
    searchPlaceholder: 'Buscar fotos...',
    noResults: 'Nenhum projeto encontrado',
    back: '← Voltar',
    problem: 'Problema',
    solution: 'Solução',
    result: 'Resultado',
    stackUsed: 'Stack utilizada',
    viewOnGithub: 'Ver no GitHub',
    addToFav: 'Adicionar aos favoritos',
    removeFromFav: 'Remover dos favoritos',
    favorited: 'Favoritado',
    favorite: 'Favoritar',
  },
  browser: {
    profileTitle: 'Perfil Profissional',
    dnaTitle: 'DNA Profissional',
    workStyleTitle: 'Como Trabalho',
    projectsTitle: 'Projetos Entregues',
    projectsSubtitle: 'Problemas reais. Soluções sob medida. Resultados mensuráveis.',
    viewPortfolio: 'Ver Portfólio',
    downloadCV: 'Download CV',
    problem: 'Problema',
    solution: 'Solução',
    result: 'Resultado',
    viewOnGithub: 'Ver no GitHub',
    viewDemo: 'Ver Demo',
    heroSubtitle: 'Arquiteturas escaláveis, Clean Code e interfaces focadas na experiência do usuário.',
    bio1: 'Engenheiro de Software com foco em arquiteturas front end escaláveis utilizando React.js e Next.js. No ecossistema back end, projeto sistemas de alto desempenho com Java Spring Boot, garantindo a integridade dos dados com PostgreSQL e MongoDB. Minha infraestrutura é fundamentada em Docker e CI/CD com distribuição via AWS CloudFront.',
    bio2: 'Especialista com MBA em Engenharia de Software e sólida base em Análise de Sistemas. Aplico os princípios SOLID e Clean Code para construir soluções sustentáveis, atuando desde o desenho técnico inicial até a entrega contínua em produção sob metodologias ágeis.',
    bio3: 'Minha trajetória profissional é pautada pelo rigor analítico focado no diagnóstico preciso de problemas complexos, estruturando soluções validadas que sustentam o crescimento do negócio.',
    traits: [
      { label: 'Excelência Técnica', evidence: 'MBA em Engenharia de Software aplicado em arquiteturas resilientes e entregas de alta qualidade sem retrabalho' },
      { label: 'Escalabilidade Real', evidence: 'Ingestão de 2,1 milhões de registros em segundos através de otimização nativa de banco de dados' },
      { label: 'Eficiência Operacional', evidence: 'Desenvolvimento do sistema DuAutomação que eliminou processos manuais e elevou a lucratividade do cliente' },
      { label: 'Raciocínio Analítico', evidence: 'Engenharia aplicada com rigor analítico focado no diagnóstico preciso de problemas complexos' },
      { label: 'Colaboração em Equipe', evidence: 'Code review, pair programming e documentação compartilhada em equipes multidisciplinares CLT e freelance' },
    ],
    workStyle: [
      { label: 'Engenharia End to End', desc: 'Visão completa do ciclo de vida do software: do levantamento estratégico de requisitos ao deploy automatizado em nuvem' },
      { label: 'Código Sustentável', desc: 'Aplicação rigorosa de SOLID e Clean Code garantindo sistemas de fácil manutenção e evolução segura' },
      { label: 'Design de Alta Performance', desc: 'Arquiteturas projetadas para alto volume de dados onde a performance é tratada como requisito fundamental de design' },
      { label: 'Integração sem atrito', desc: 'APIs REST, webhooks e autenticação JWT com tratamento estruturado de erros e contratos bem definidos' },
    ],
  },
  finder: {
    searchPlaceholder: 'Buscar',
    searchAriaLabel: 'Buscar certificados',
    certificates: 'Certificados',
    noneFound: 'Nenhum certificado encontrado',
    closePreview: 'Fechar visualização',
    items: 'certificados',
  },
  ios: {
    recentApps: 'Apps Recentes',
    dragToClose: '↓ arraste para fechar',
    appsOpenSingular: 'app aberto',
    appsOpenPlural: 'apps abertos',
    close: 'fechar',
  },
  projects: {
    '9': {
      title: 'Everything Gemini Code (EGC)',
      tag: 'Python · TypeScript · SQLite · Node.js · Bash · Tkinter',
      dor: 'A ausência de uma arquitetura de engenharia rigorosa para agentes de IA limita o uso profissional de assistentes de código, resultando em execuções fragmentadas, falta de observabilidade e perda de contexto em fluxos de trabalho complexos.',
      solucao: 'Engenharia de um ecossistema operacional e fabric de orquestração de runtime para o Gemini. Implementa uma arquitetura de fila determinística, malha de memória persistente e um Plano de Controle GUI em Tkinter para monitoramento em tempo real de uma força de trabalho agentica.',
      resultado: 'Transformação do ecossistema Gemini em uma plataforma de engenharia gerenciada com 62 agentes especializados e 228 habilidades prontas para produção. O sistema garante estabilidade, segurança através do AgentShield e observabilidade total através de um dashboard de comando centralizado.',
    },
    '8': {
      title: 'Conecta 360° · SaaS de RH e NR-1',
      tag: 'React.js · TypeScript · Node.js · Next.js',
      dor: 'Empresas brasileiras conviviam com a crescente complexidade do cumprimento da NR-1 (PGR/GRO) sem suporte tecnológico adequado. A gestão manual de riscos psicossociais, a ausência de dashboards de KPIs e os processos descentralizados de RH geravam exposição regulatória e decisões estratégicas baseadas em dados imprecisos.',
      solucao: 'Liderança técnica do front-end de uma plataforma SaaS completa para gestão de RH e conformidade NR-1. A arquitetura de componentes foi estruturada do zero com React.js e TypeScript, com integração robusta de APIs REST, autenticação e controle granular de permissões por perfil. Backend em Node.js com arquitetura de microserviços e infraestrutura em containers Docker.',
      resultado: 'Plataforma em produção ativa com arquitetura escalável, Clean Code e componentes reutilizáveis que reduzem o tempo de evolução do produto. A centralização digital da operação de conformidade NR-1 elimina o risco de descumprimento regulatório, posicionando as empresas clientes com rastreabilidade total e monitoramento inteligente de KPIs em tempo real.',
    },
    '1': {
      title: 'DuAutomação Residencial',
      tag: 'Java · React.js · PostgreSQL',
      dor: 'O cliente enfrentava estagnação no crescimento devido à dependência total de processos manuais exaustivos para emissão de orçamentos e visibilidade nula sobre o status real das ordens de serviço em campo.',
      solucao: 'Desenvolvimento de um ecossistema ERP centralizado utilizando Java no back end e React.js no front end. A solução integra módulos de gestão financeira, controle dinâmico de inventário e um dashboard de monitoramento em tempo real para equipes técnicas.',
      resultado: 'Transformação digital completa com geração automatizada de documentos e orçamentos em segundos. A automação gerou uma economia operacional direta estimada em R$ 24.000 anuais, permitindo o escalonamento do negócio sem aumento de head count.',
    },
    '2': {
      title: 'Laboratório Unilab',
      tag: 'Next.js · Tailwind · Framer Motion',
      dor: 'Limitações na captação de doadores de sangue e agendamentos devido à ausência de uma plataforma digital intuitiva. O fluxo anterior dependia de contatos telefônicos repetitivos e triagens manuais propensas a erros operacionais.',
      solucao: 'Criação de uma aplicação web premium com Next.js e Tailwind CSS, priorizando a usabilidade mobile através de componentes de navegação por dedão e um sistema inteligente de triagem com lógica de negócio automatizada.',
      resultado: 'Aumento real de 30% na captação de doadores e consolidação da autoridade digital da clínica. A jornada do usuário foi optimizada para ser concluída em poucos cliques, resultando em fluxos de trabalho mais limpos e eficientes.',
    },
    '3': {
      title: 'Career Scout AI',
      tag: 'Python · Gemini API · GitHub Actions',
      dor: 'Ineficiência massiva no processo de busca ativa por oportunidades de carreira, onde a análise manual de centenas de listagens genéricas resultava em perda de tempo estratégico e fadiga cognitiva severa.',
      solucao: 'Engenharia de um agente autônomo de elite em Python integrado à Gemini AI. O sistema realiza o processamento semântico profundo de requisitos técnicos e cultura organizacional, operando de forma contínua via GitHub Actions.',
      resultado: 'Redução radical do ruído informativo: o agente analisa 50 vagas diariamente e entrega apenas 10 opções de alta relevância com scoring predictivo superior a 90%. O sistema atua como um filtro de inteligência que economiza horas de triagem manual.',
    },
    '4': {
      title: 'CalibraFlow: SaaS de Gestão de ISO',
      tag: 'Java 21 · Spring Boot · Docker · React',
      dor: 'Riscos críticos de conformidade normativa nas ISO 9001 e ISO 10012 dentro do ecossistema Petrobras. A falta de rastreabilidade de instrumentos de medição gerava desperdícios milionários e ameaças à segurança industrial.',
      solucao: 'Plataforma SaaS multi tenant robusta para gestão do ciclo de calibração. Implementa isolamento total de dados via Hibernate Filters e automação de alertas de vencimento através de tarefas agendadas no ecossistema Spring.',
      resultado: 'Mitigação estratégica de falhas com economia na ordem de milhões em redução de desperdício de material e multas. Garantiu uma trilha de auditoria 100% digital e imutável para grandes prestadoras de serviço do setor industrial.',
    },
    '5': {
      title: 'Big Data ANS: Processamento em Escala',
      tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
      dor: 'Latência crítica e instabilidade no processamento analítico de milhões de registros contábeis da ANS. Sistemas convencionais falhavam ao tentar consolidar dados financeiros massivos para fins de auditoria e governança.',
      solucao: 'Arquitetura de dados de alta disponibilidade unindo a velocidade do protocolo COPY nativo do PostgreSQL com uma camada de processamento assíncrono em FastAPI, permitindo a ingestão e análise de Big Data com eficiência extrema.',
      resultado: 'Governança absoluta sobre R$ 100 milhões anuais em registros financeiros. A solução reduziu o tempo de auditoria complexa em 95%, entregando visualizações analíticas de 2,1 milhões de dados em poucos segundos.',
    },
    '6': {
      title: 'Pipeline Transacional AWS',
      tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
      dor: 'Desafio de projetar um sistema transacional que suportasse picos de concorrência sem perda de dados, mantendo o custo de infraestrutura sob controle e o desacouplamento total entre produtores e consumidores de mensagens.',
      solucao: 'Arquitetura event driven serverless em AWS utilizando SQS para enfileiramento resiliente, funções Lambda para processamento elástico e DynamoDB para persistência de baixa latência e alta disponibilidade operacional.',
      resultado: 'Sistema 100% resiliente com escalabilidade infinita sob demanda. A modernização para um modelo cloud native resultou em uma redução estratégica de 60% nos custos fixos de servidor e manutenção tecnológica.',
    },
    '7': {
      title: 'Caroll Buratto · Psicanalista Clínica',
      tag: 'Next.js · Node.js · PostgreSQL · Docker',
      dor: 'A profissional necessitava de uma presença digital completa, capaz de integrar em um único ambiente a apresentação institucional e a gestão operacional do negócio. Os processos de agendamento, administração de pacientes, controle financeiro, fluxo de caixa e produção de conteúdo eram realizados de forma manual e descentralizada, comprometendo a eficiência e a escalabilidade da operação.',
      solucao: 'Desenvolvimento de uma plataforma web personalizada utilizando Next.js no frontend e Node.js no backend, reunindo site institucional, sistema de agendamento, blog, gestão de pacientes, controle financeiro com fluxo de caixa e painel administrativo com autenticação segura. A infraestrutura foi estruturada com PostgreSQL containerizado em Docker para garantir desempenho, organização e escalabilidade.',
      resultado: 'Implementação de uma plataforma completa em produção, consolidando digitalmente os 9 anos de experiência da profissional em um ecossistema moderno e centralizado. O sistema eliminou processos manuais, optimizou a gestão operacional e concentrou todas as áreas do negócio em uma solução web personalizada.',
    },
  },
};
