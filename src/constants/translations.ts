export type Lang = 'pt' | 'en' | 'es';

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
    viewDemo: string;
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

export const TRANSLATIONS: Record<Lang, Translations> = {
  pt: {
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
      viewDemo: 'Ver Demo',
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
      '1': {
        title: 'DuAutomação Residencial',
        tag: 'Java · React.js · PostgreSQL',
        dor: 'O cliente enfrentava estagnação no crescimento devido à dependência total de processos manuais exaustivos para emissão de orçamentos e uma visibilidade nula sobre o status real das ordens de serviço em campo.',
        solucao: 'Desenvolvimento de um ecossistema ERP centralizado utilizando Java no back end e React.js no front end. A solução integra módulos de gestão financeira, controle dinâmico de inventário e um dashboard de monitoramento em tempo real para equipes técnicas.',
        resultado: 'Transformação digital completa com geração automatizada de documentos e orçamentos em segundos. A automação gerou uma economia operacional direta estimada em R$ 24.000 anuais, permitindo o escalonamento do negócio sem aumento de head count.',
      },
      '2': {
        title: 'Laboratório Unilab',
        tag: 'Next.js · Tailwind · Framer Motion',
        dor: 'Limitações na captação de doadores de sangue e agendamentos devido à ausência de uma plataforma digital intuitiva. O fluxo anterior dependia de contatos telefônicos repetitivos e triagens manuais propensas a erros operacionais.',
        solucao: 'Criação de uma aplicação web premium com Next.js e Tailwind CSS, priorizando a usabilidade mobile através de componentes de navegação por dedão e um sistema inteligente de triagem com lógica de negócio automatizada.',
        resultado: 'Aumento real de 30% na captação de doadores e consolidação da autoridade digital da clínica. A jornada do usuário foi otimizada para ser concluída em poucos cliques, resultando em fluxos de trabalho mais limpos e eficientes.',
      },
      '3': {
        title: 'Career Scout AI',
        tag: 'Python · Gemini API · GitHub Actions',
        dor: 'Ineficiência massiva no processo de busca ativa por oportunidades de carreira, onde a análise manual de centenas de listagens genéricas resultava em perda de tempo estratégico e fadiga cognitiva severa.',
        solucao: 'Engenharia de um agente autônomo de elite em Python integrado à Gemini AI. O sistema realiza o processamento semântico profundo de requisitos técnicos e cultura organizacional, operando de forma contínua via GitHub Actions.',
        resultado: 'Redução radical do ruído informativo: o agente analisa 50 vagas diariamente e entrega apenas 10 opções de alta relevância com scoring preditivo superior a 90%. O sistema atua como um filtro de inteligência que economiza horas de triagem manual.',
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
        dor: 'Desafio de projetar um sistema transacional que suportasse picos de concorrência sem perda de dados, mantendo o custo de infraestrutura sob controle e o desacoplamento total entre produtores e consumidores de mensagens.',
        solucao: 'Arquitetura event driven serverless em AWS utilizando SQS para enfileiramento resiliente, funções Lambda para processamento elástico e DynamoDB para persistência de baixa latência e alta disponibilidade operacional.',
        resultado: 'Sistema 100% resiliente com escalabilidade infinita sob demanda. A modernização para um modelo cloud native resultou em uma redução estratégica de 60% nos custos fixos de servidor e manutenção tecnológica.',
      },
    },
  },

  en: {
    lock: {
      subtitle: 'A different portfolio · explore like an operating system',
      passwordPlaceholder: 'Enter password...',
      touchToEnter: 'Tap to enter',
      clickToEnter: 'Click or press any key',
      swipeUp: 'Swipe up',
      accessibilityBadge: '100% Accessible · Sign Language',
      muteOn: 'Unmute',
      muteOff: 'Mute',
      unlockSystem: 'Unlock system',
      passwordLabel: 'Access password',
      enter: 'Enter',
    },
    apps: {
      safari: 'Portfolio',
      maps: 'Experience',
      photos: 'Project Gallery',
      finder: 'Diplomas',
      messages: 'Contact',
    },
    menu: {
      open: 'Open',
      close: 'Close',
      reload: 'Reload',
    },
    gallery: {
      library: 'Library',
      allPhotos: 'All Photos',
      favorites: 'Favorites',
      albums: 'Projects (Albums)',
      searchPlaceholder: 'Search photos...',
      noResults: 'No projects found',
      back: '← Back',
      problem: 'Problem',
      solution: 'Solution',
      result: 'Result',
      stackUsed: 'Tech stack',
      viewOnGithub: 'View on GitHub',
      viewDemo: 'View Demo',
      addToFav: 'Add to favorites',
      removeFromFav: 'Remove from favorites',
      favorited: 'Favorited',
      favorite: 'Favorite',
    },
    browser: {
      profileTitle: 'Professional Profile',
      dnaTitle: 'Professional DNA',
      workStyleTitle: 'How I Work',
      projectsTitle: 'Delivered Projects',
      projectsSubtitle: 'Real problems. Tailored solutions. Measurable results.',
      viewPortfolio: 'View Portfolio',
      downloadCV: 'Download CV',
      problem: 'Problem',
      solution: 'Solution',
      result: 'Result',
      viewOnGithub: 'View on GitHub',
      viewDemo: 'View Demo',
      heroSubtitle: 'Scalable architectures, Clean Code and user experience-focused interfaces.',
      bio1: 'Software Engineer focused on scalable front-end architectures using React.js and Next.js. On the backend, I design high-performance systems with Java Spring Boot, ensuring data integrity with PostgreSQL and MongoDB. My infrastructure is built on Docker and CI/CD pipelines distributed via AWS CloudFront.',
      bio2: 'A specialist with an MBA in Software Engineering and a solid foundation in Systems Analysis. I apply SOLID principles and Clean Code to build sustainable solutions, covering everything from initial technical design to continuous production delivery under agile methodologies.',
      bio3: 'My professional trajectory is guided by analytical rigor focused on precise diagnosis of complex problems, structuring validated solutions that sustain business growth.',
      traits: [
        { label: 'Technical Excellence', evidence: 'MBA in Software Engineering applied in resilient architectures and high-quality deliveries without rework' },
        { label: 'Real Scalability', evidence: 'Ingestion of 2.1 million records per second through native database optimization' },
        { label: 'Operational Efficiency', evidence: 'DuAutomação system development that eliminated manual processes and increased client profitability' },
        { label: 'Analytical Thinking', evidence: 'Applied engineering with analytical rigor focused on precise diagnosis of complex problems' },
        { label: 'Team Collaboration', evidence: 'Code review, pair programming and shared documentation in multidisciplinary CLT and freelance teams' },
      ],
      workStyle: [
        { label: 'End-to-End Engineering', desc: 'Complete view of the software lifecycle: from strategic requirements gathering to automated cloud deployment' },
        { label: 'Sustainable Code', desc: 'Rigorous application of SOLID and Clean Code ensuring easily maintainable and safely evolvable systems' },
        { label: 'High-Performance Design', desc: 'Architectures designed for high data volume where performance is treated as a fundamental design requirement' },
        { label: 'Frictionless Integration', desc: 'REST APIs, webhooks and JWT authentication with structured error handling and well-defined contracts' },
      ],
    },
    finder: {
      searchPlaceholder: 'Search',
      searchAriaLabel: 'Search certificates',
      certificates: 'Certificates',
      noneFound: 'No certificate found',
      closePreview: 'Close preview',
      items: 'certificates',
    },
    ios: {
      recentApps: 'Recent Apps',
      dragToClose: '↓ drag to close',
      appsOpenSingular: 'app open',
      appsOpenPlural: 'apps open',
      close: 'close',
    },
    projects: {
      '1': {
        title: 'DuAutomação Residencial',
        tag: 'Java · React.js · PostgreSQL',
        dor: 'The client faced growth stagnation due to total reliance on manual, time-consuming processes for generating quotes and zero visibility into real-time work order status in the field.',
        solucao: 'Development of a centralized ERP ecosystem using Java on the backend and React.js on the frontend, integrating financial management, dynamic inventory control, and a real-time monitoring dashboard for field teams.',
        resultado: 'Complete digital transformation with automated document and quote generation in seconds. The automation delivered an estimated annual operational saving of R$ 24,000, enabling business scaling without increasing headcount.',
      },
      '2': {
        title: 'Unilab Laboratory',
        tag: 'Next.js · Tailwind · Framer Motion',
        dor: 'Limited capacity for attracting blood donors and managing appointments due to the absence of an intuitive digital platform. The previous workflow depended on repetitive phone contacts and manual screenings prone to operational errors.',
        solucao: 'A premium web application built with Next.js and Tailwind CSS, prioritizing mobile usability through thumb-navigation components and an intelligent screening system with automated business logic.',
        resultado: 'A real 30% increase in donor acquisition and consolidation of the clinic\'s digital authority. The user journey was optimized to complete in just a few taps, resulting in cleaner and more efficient workflows.',
      },
      '3': {
        title: 'Career Scout AI',
        tag: 'Python · Gemini API · GitHub Actions',
        dor: 'Massive inefficiency in the job search process: manually analyzing hundreds of generic listings wasted strategic time and caused severe cognitive fatigue.',
        solucao: 'An elite autonomous Python agent integrated with Gemini AI that performs deep semantic processing of technical requirements and company culture, running continuously via GitHub Actions.',
        resultado: 'Radical noise reduction: the agent analyzes 50 jobs daily and surfaces only 10 high-relevance matches with a predictive fit score above 90% — saving hours of manual screening.',
      },
      '4': {
        title: 'CalibraFlow: ISO Management SaaS',
        tag: 'Java 21 · Spring Boot · Docker · React',
        dor: 'Critical compliance risks for ISO 9001 and ISO 10012 within the Petrobras ecosystem. Lack of measurement instrument traceability generated million-dollar waste and posed industrial safety threats.',
        solucao: 'A robust multi-tenant SaaS platform for calibration lifecycle management, with full data isolation via Hibernate Filters and automated expiration alerts via Spring scheduled tasks.',
        resultado: 'Strategic risk mitigation with savings in the millions through reduced material waste and fines. Delivered a 100% digital and immutable audit trail for major industrial service providers.',
      },
      '5': {
        title: 'Big Data ANS: Large-Scale Processing',
        tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
        dor: 'Critical latency and instability when processing millions of ANS accounting records. Conventional systems failed to consolidate massive financial data for audit and governance purposes.',
        solucao: 'A high-availability data architecture combining PostgreSQL\'s native COPY protocol speed with an async processing layer in FastAPI, enabling Big Data ingestion and analysis with extreme efficiency.',
        resultado: 'Absolute governance over R$ 100M in annual financial records. Reduced complex audit time by 95%, delivering analytical visualizations of 2.1 million data points in seconds.',
      },
      '6': {
        title: 'AWS Transactional Pipeline',
        tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
        dor: 'The challenge of designing a transactional system that handles concurrency spikes without data loss, while keeping infrastructure costs in check and maintaining full decoupling between message producers and consumers.',
        solucao: 'A serverless event-driven architecture on AWS using SQS for resilient queuing, Lambda for elastic processing, and DynamoDB for low-latency, high-availability persistence.',
        resultado: '100% resilient system with infinite on-demand scalability. Migration to a cloud-native model achieved a 60% reduction in fixed server and maintenance costs.',
      },
      '9': {
        title: 'EGC · Extended Global Context',
        tag: 'Node.js · TypeScript · MCP · SQLite · Markdown',
        dor: 'AI coding assistants suffer from total amnesia between sessions: every new chat window or tool switch wipes out technical decisions, preferences, and the history of what was already tried and failed. Developers lose the first minutes of every session re-explaining project context, and every re-explanation burns tokens for nothing.',
        solucao: 'I built EGC (Extended Global Context), an open source, local-first runtime with two MCP servers: egc-memory, which persists decisions, preferences, and project state in Markdown and SQLite on your own machine, and egc-guardian, which validates commands and blocks writes to sensitive paths before execution. No cloud, no subscription, works across 20+ AI tools (Claude Code, Cursor, Copilot, Gemini CLI, and more).',
        resultado: 'Open source project with 29 external contributors, documentation in 11 languages, and a Product Hunt launch. Cuts re-context tokens from about 1,500 to about 200 per session, a roughly 87% drop. I am also the author of the open Agent Memory Interchange (AMI) specification, which standardizes portable memory across AI agents.',
      },
    },
  },

  es: {
    lock: {
      subtitle: 'Un portafolio diferente · explora como un sistema operativo',
      passwordPlaceholder: 'Ingresa la contraseña...',
      touchToEnter: 'Toca para entrar',
      clickToEnter: 'Haz clic o presiona cualquier tecla',
      swipeUp: 'Desliza hacia arriba',
      accessibilityBadge: '100% Accesible · Lengua de Señas',
      muteOn: 'Activar sonido',
      muteOff: 'Silenciar',
      unlockSystem: 'Desbloquear sistema',
      passwordLabel: 'Contraseña de acceso',
      enter: 'Entrar',
    },
    apps: {
      safari: 'Portafolio',
      maps: 'Experiencia',
      photos: 'Galería de Proyectos',
      finder: 'Diplomas',
      messages: 'Contacto',
    },
    menu: {
      open: 'Abrir',
      close: 'Cerrar',
      reload: 'Recargar',
    },
    gallery: {
      library: 'Biblioteca',
      allPhotos: 'Todas las Fotos',
      favorites: 'Favoritos',
      albums: 'Proyectos (Álbumes)',
      searchPlaceholder: 'Buscar fotos...',
      noResults: 'Ningún proyecto encontrado',
      back: '← Volver',
      problem: 'Problema',
      solution: 'Solución',
      result: 'Resultado',
      stackUsed: 'Stack utilizado',
      viewOnGithub: 'Ver en GitHub',
      viewDemo: 'Ver Demo',
      addToFav: 'Agregar a favoritos',
      removeFromFav: 'Quitar de favoritos',
      favorited: 'Guardado',
      favorite: 'Guardar',
    },
    browser: {
      profileTitle: 'Perfil Profesional',
      dnaTitle: 'ADN Profesional',
      workStyleTitle: 'Cómo Trabajo',
      projectsTitle: 'Proyectos Entregados',
      projectsSubtitle: 'Problemas reales. Soluciones a medida. Resultados medibles.',
      viewPortfolio: 'Ver Portafolio',
      downloadCV: 'Descargar CV',
      problem: 'Problema',
      solution: 'Solución',
      result: 'Resultado',
      viewOnGithub: 'Ver en GitHub',
      viewDemo: 'Ver Demo',
      heroSubtitle: 'Arquitecturas escalables, Clean Code e interfaces centradas en la experiencia del usuario.',
      bio1: 'Ingeniero de Software enfocado en arquitecturas frontend escalables con React.js y Next.js. En el backend, diseño sistemas de alto rendimiento con Java Spring Boot, garantizando la integridad de datos con PostgreSQL y MongoDB. Mi infraestructura está basada en Docker y CI/CD con distribución vía AWS CloudFront.',
      bio2: 'Especialista con MBA en Ingeniería de Software y sólida base en Análisis de Sistemas. Aplico los principios SOLID y Clean Code para construir soluciones sostenibles, desde el diseño técnico inicial hasta la entrega continua en producción bajo metodologías ágiles.',
      bio3: 'Mi trayectoria profesional está guiada por el rigor analítico, enfocado en el diagnóstico preciso de problemas complejos y estructurando soluciones validadas que sustentan el crecimiento del negocio.',
      traits: [
        { label: 'Excelencia Técnica', evidence: 'MBA en Ingeniería de Software aplicado en arquitecturas resilientes y entregas de alta calidad sin retrabajo' },
        { label: 'Escalabilidad Real', evidence: 'Ingesta de 2,1 millones de registros por segundo mediante optimización nativa de base de datos' },
        { label: 'Eficiencia Operacional', evidence: 'Desarrollo del sistema DuAutomação que eliminó procesos manuales y elevó la rentabilidad del cliente' },
        { label: 'Pensamiento Analítico', evidence: 'Ingeniería aplicada con rigor analítico enfocado en el diagnóstico preciso de problemas complejos' },
        { label: 'Colaboración en Equipo', evidence: 'Code review, pair programming y documentación compartida en equipos multidisciplinares CLT y freelance' },
      ],
      workStyle: [
        { label: 'Ingeniería End to End', desc: 'Visión completa del ciclo de vida del software: desde el levantamiento estratégico de requisitos hasta el despliegue automatizado en la nube' },
        { label: 'Código Sostenible', desc: 'Aplicación rigurosa de SOLID y Clean Code garantizando sistemas de fácil mantenimiento y evolución segura' },
        { label: 'Diseño de Alta Performance', desc: 'Arquitecturas diseñadas para alto volumen de datos donde el rendimiento es un requisito fundamental de diseño' },
        { label: 'Integración sin Fricción', desc: 'APIs REST, webhooks y autenticación JWT con manejo estructurado de errores y contratos bien definidos' },
      ],
    },
    finder: {
      searchPlaceholder: 'Buscar',
      searchAriaLabel: 'Buscar certificados',
      certificates: 'Certificados',
      noneFound: 'Ningún certificado encontrado',
      closePreview: 'Cerrar vista previa',
      items: 'certificados',
    },
    ios: {
      recentApps: 'Apps Recientes',
      dragToClose: '↓ arrastra para cerrar',
      appsOpenSingular: 'app abierta',
      appsOpenPlural: 'apps abiertas',
      close: 'cerrar',
    },
    projects: {
      '1': {
        title: 'DuAutomação Residencial',
        tag: 'Java · React.js · PostgreSQL',
        dor: 'El cliente enfrentaba estancamiento en el crecimiento debido a la dependencia total de procesos manuales agotadores para la emisión de presupuestos y una visibilidad nula sobre el estado real de las órdenes de servicio en campo.',
        solucao: 'Desarrollo de un ecosistema ERP centralizado usando Java en el backend y React.js en el frontend. La solución integra módulos de gestión financiera, control dinámico de inventario y un dashboard de monitoreo en tiempo real para equipos técnicos.',
        resultado: 'Transformación digital completa con generación automatizada de documentos y presupuestos en segundos. La automatización generó un ahorro operacional directo estimado en R$ 24.000 anuales, permitiendo escalar el negocio sin aumentar el personal.',
      },
      '2': {
        title: 'Laboratorio Unilab',
        tag: 'Next.js · Tailwind · Framer Motion',
        dor: 'Limitaciones en la captación de donantes de sangre y agendamiento de citas debido a la ausencia de una plataforma digital intuitiva. El flujo anterior dependía de contactos telefónicos repetitivos y triajes manuales propensos a errores operacionales.',
        solucao: 'Creación de una aplicación web premium con Next.js y Tailwind CSS, priorizando la usabilidad móvil mediante componentes de navegación por pulgar y un sistema inteligente de triaje con lógica de negocio automatizada.',
        resultado: 'Aumento real del 30% en la captación de donantes y consolidación de la autoridad digital de la clínica. El recorrido del usuario fue optimizado para completarse en pocos clics, resultando en flujos de trabajo más limpios y eficientes.',
      },
      '3': {
        title: 'Career Scout AI',
        tag: 'Python · Gemini API · GitHub Actions',
        dor: 'Ineficiencia masiva en el proceso de búsqueda activa de oportunidades de carrera, donde el análisis manual de cientos de listados genéricos resultaba en pérdida de tiempo estratégico y fatiga cognitiva severa.',
        solucao: 'Ingeniería de un agente autónomo de élite en Python integrado con Gemini AI. El sistema realiza procesamiento semántico profundo de requisitos técnicos y cultura organizacional, operando de forma continua vía GitHub Actions.',
        resultado: 'Reducción radical del ruido informativo: el agente analiza 50 vacantes diariamente y entrega solo 10 opciones de alta relevancia con scoring predictivo superior al 90%. El sistema actúa como filtro de inteligencia ahorrando horas de triaje manual.',
      },
      '4': {
        title: 'CalibraFlow: SaaS de Gestión ISO',
        tag: 'Java 21 · Spring Boot · Docker · React',
        dor: 'Riesgos críticos de conformidad normativa en ISO 9001 e ISO 10012 dentro del ecosistema Petrobras. La falta de trazabilidad de instrumentos de medición generaba desperdicios millonarios y amenazas a la seguridad industrial.',
        solucao: 'Plataforma SaaS multi tenant robusta para gestión del ciclo de calibración. Implementa aislamiento total de datos vía Hibernate Filters y automatización de alertas de vencimiento mediante tareas programadas en el ecosistema Spring.',
        resultado: 'Mitigación estratégica de fallas con ahorro en el orden de millones en reducción de desperdicio de material y multas. Garantizó una pista de auditoría 100% digital e inmutable para grandes prestadoras de servicio del sector industrial.',
      },
      '5': {
        title: 'Big Data ANS: Procesamiento a Escala',
        tag: 'Java 21 · FastAPI · Vue.js · PostgreSQL',
        dor: 'Latencia crítica e inestabilidad en el procesamiento analítico de millones de registros contables de la ANS. Los sistemas convencionales fallaban al intentar consolidar datos financieros masivos para auditoría y gobernanza.',
        solucao: 'Arquitectura de datos de alta disponibilidad uniendo la velocidad del protocolo COPY nativo de PostgreSQL con una capa de procesamiento asíncrono en FastAPI, permitiendo la ingesta y análisis de Big Data con eficiencia extrema.',
        resultado: 'Gobernanza absoluta sobre R$ 100 millones anuales en registros financieros. La solución redujo el tiempo de auditoría compleja en un 95%, entregando visualizaciones analíticas de 2,1 millones de datos en pocos segundos.',
      },
      '6': {
        title: 'Pipeline Transaccional AWS',
        tag: 'Node.js · AWS SQS · Lambda · DynamoDB',
        dor: 'El desafío de diseñar un sistema transaccional que soportara picos de concurrencia sin pérdida de datos, manteniendo el costo de infraestructura bajo control y el desacoplamiento total entre productores y consumidores de mensajes.',
        solucao: 'Arquitectura event driven serverless en AWS utilizando SQS para encolamiento resiliente, funciones Lambda para procesamiento elástico y DynamoDB para persistencia de baja latencia y alta disponibilidad operacional.',
        resultado: 'Sistema 100% resiliente con escalabilidad infinita bajo demanda. La modernización a un modelo cloud native resultó en una reducción estratégica del 60% en costos fijos de servidor y mantenimiento tecnológico.',
      },
      '9': {
        title: 'EGC · Extended Global Context',
        tag: 'Node.js · TypeScript · MCP · SQLite · Markdown',
        dor: 'Los asistentes de IA para código sufren amnesia total entre sesiones: cada nueva ventana de chat o cambio de herramienta borra decisiones técnicas, preferencias y el historial de lo que ya se intentó y falló. El desarrollador pierde los primeros minutos de cada sesión reexplicando el contexto del proyecto, y cada reexplicación consume tokens pagados en vano.',
        solucao: 'Creé EGC (Extended Global Context), un runtime open source local-first con dos servidores MCP: egc-memory, que persiste decisiones, preferencias y el estado del proyecto en Markdown y SQLite en la propia máquina, y egc-guardian, que valida comandos y bloquea escrituras en rutas sensibles antes de la ejecución. Funciona sin nube, sin suscripción, integrado con más de 20 herramientas de IA (Claude Code, Cursor, Copilot, Gemini CLI, entre otras).',
        resultado: 'Proyecto open source con 29 colaboradores externos, documentación en 11 idiomas y lanzamiento en Product Hunt. Reduce el consumo de tokens de recontextualización de cerca de 1.500 a cerca de 200 por sesión, una caída de aproximadamente 87%. También soy autor de la especificación abierta Agent Memory Interchange (AMI), que estandariza la memoria portátil entre agentes de IA.',
      },
    },
  },
};
