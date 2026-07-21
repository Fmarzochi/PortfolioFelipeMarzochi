<div align="center">

# Portfolio Felipe Marzochi

### Web OS: Um sistema operacional interativo no browser

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![A11y](https://img.shields.io/badge/Acessibilidade-WCAG_2.1-blue?style=for-the-badge&logo=accessibility)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![VLibras](https://img.shields.io/badge/VLibras-MCTIC%2FUFPB-009688?style=for-the-badge&logo=accessibility&logoColor=white)](https://vlibras.gov.br/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand_4-433E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![CI](https://github.com/Fmarzochi/PortfolioFelipeMarzochi/actions/workflows/ci.yml/badge.svg)](https://github.com/Fmarzochi/PortfolioFelipeMarzochi/actions/workflows/ci.yml)

</div>

---

## Sobre o Projeto

Construí este portfólio com uma proposta diferente: em vez de uma página estática com seções empilhadas, desenvolvi um **sistema operacional completo rodando no browser**. A experiência simula um OS real, com tela de bloqueio, janelas arrastáveis, dock com magnificação, apps funcionais e dois layouts adaptativos: **macOS no desktop** e **iOS no mobile**.

Todo o estado do sistema vive no `localStorage` via Zustand, sem nenhum banco de dados e sem servidor de estado externo. O browser é o hardware.

---

## Screenshots

### Desktop Experience

<p align="center">
  <img src="public/screenshots/01-login-screen.webp" width="45%" alt="Login Screen" />
  <img src="public/screenshots/02-welcome-screen.webp" width="45%" alt="Welcome Overlay" />
</p>
<p align="center">
  <img src="public/screenshots/03-portfolio-app.webp" width="45%" alt="Portfolio App" />
  <img src="public/screenshots/04-gallery-app.webp" width="45%" alt="Gallery App" />
</p>
<p align="center">
  <img src="public/screenshots/05-skills-app.webp" width="45%" alt="Skills App" />
  <img src="public/screenshots/06-finder-app.webp" width="45%" alt="Finder App" />
</p>
<p align="center">
  <img src="public/screenshots/07-contacts-app.webp" width="45%" alt="Contacts App" />
</p>

### Mobile Experience (iOS Style)

<p align="center">
  <img src="public/screenshots/08-mobile-view-1.webp" width="30%" alt="Mobile View 1" />
  <img src="public/screenshots/09-mobile-view-2.webp" width="30%" alt="Mobile View 2" />
</p>

---

## Arquitetura

```
src/
├── app/                    # Next.js App Router (layout, page, globals.css)
├── assets/images/          # Recursos estáticos importados pelo código
├── components/
│   ├── apps/               # Cada aplicativo do sistema isolado em seu componente
│   │   ├── AppRegistry.tsx     # Roteador central de apps
│   │   ├── BrowserApp.tsx      # Portfólio de projetos
│   │   ├── ContactsApp.tsx     # Informações de contato
│   │   ├── FinderApp.tsx       # Certificados e conquistas
│   │   ├── GalleryApp.tsx      # Galeria de projetos detalhada
│   │   ├── MapsApp.tsx         # Localização e experiência profissional
│   │   ├── MessagesApp.tsx     # Contato via WhatsApp e e-mail
│   │   ├── SkillsApp.tsx       # Terminal interativo de habilidades
│   │   └── TerminalApp.tsx     # Terminal do sistema
│   ├── common/             # Utilitários e componentes compartilhados
│   │   ├── AccessibilityIcon.tsx  # Botão ISA que abre o painel de acessibilidade
│   │   ├── AccessibilityPanel.tsx # Painel com filtros de daltonismo, fonte e VLibras
│   │   ├── AppErrorBoundary.tsx   # Error boundary global da aplicação
│   │   ├── FocusTrap.tsx          # Armadilha de foco para modais e dialogs
│   │   ├── IconRegistry.tsx       # Registro central de ícones SVG do sistema
│   │   └── VLibrasWidget.tsx      # Plugin VLibras (MCTIC/UFPB) para Libras
│   └── os/                 # Infraestrutura do sistema operacional
│       ├── AppWindow.tsx       # Janela arrastável e redimensionável
│       ├── ContextMenu.tsx     # Menu de contexto (clique direito / long-press)
│       ├── ControlCenter.tsx   # Central de controle (volume, brilho, wallpaper)
│       ├── Desktop.tsx         # Area de trabalho com crossfade de wallpaper
│       ├── IOSMobile.tsx       # Layout completo iOS
│       ├── LockScreen.tsx      # Tela de bloqueio
│       ├── MacDock.tsx         # Dock com magnificação (macOS)
│       ├── SpotlightSearch.tsx # Busca global (Win + Espaço / Cmd + Espaço)
│       ├── TopBar.tsx          # Barra de menu superior (macOS)
│       └── WebOS.tsx           # Orquestrador principal do sistema
├── constants/
│   ├── projects.ts         # Dados dos projetos (metadados, stack, imagens)
│   └── translations.ts     # Dicionário i18n completo (PT · EN · ES)
├── contexts/
│   ├── AccessibilityContext.tsx # Estado global de acessibilidade (modo de cor, fonte)
│   ├── LanguageContext.tsx      # Detecção automática de idioma e provider i18n
│   └── OSContext.tsx            # Estado global do OS (volume, brilho, wallpaper)
├── hooks/
│   ├── useContextMenu.ts        # Lógica de long-press e clique direito
│   ├── useIconReorder.ts        # Reordenação de ícones no layout iOS
│   ├── useIsMobile.ts           # Detecção de dispositivo
│   └── usePerformanceMonitor.ts # Monitor de performance da aplicação
├── store/
│   └── useWindowManager.ts # Gerenciador de janelas via Zustand (posição, z-index, tamanho)
└── utils/
    └── audioEngine.ts      # Motor de áudio do sistema
```

---

## Aplicativos

| App | Equivalente | Conteúdo |
|-----|-------------|----------|
| **Browser** | Safari | Portfólio de projetos com links para o GitHub |
| **Finder** | Finder | Certificados organizados por categoria |
| **Skills** | Terminal | Terminal interativo com minhas habilidades técnicas |
| **Maps** | Maps | Localização e trajetória profissional |
| **Messages** | iMessage | Contato direto via WhatsApp ou e-mail |
| **Gallery** | Photos | Galeria de Projetos com métricas de impacto |
| **Contacts** | Contacts | Informações profissionais completas |
| **Terminal** | Terminal | Terminal do sistema operacional |

---

## Projetos

| # | Projeto | Stack Principal |
|---|---------|----------------|
| 1 | **EGC · Extended Global Context** | Node.js · TypeScript · MCP · SQLite · Markdown · Bash |
| 2 | **Conecta 360° · SaaS de RH e NR-1** | React.js · TypeScript · Next.js · Node.js · Docker · AWS · Kubernetes · GitHub Actions |
| 3 | **DuAutomação Residencial** | Java · React.js · PostgreSQL · REST API |
| 4 | **Laboratório Unilab** | Next.js · React · Tailwind CSS · Framer Motion |
| 5 | **Career Scout AI** | Python · Gemini API · Gmail API · Google Sheets · GitHub Actions |
| 6 | **CalibraFlow: SaaS de Gestão de ISO** | Java 21 · Spring Boot · PostgreSQL · Docker · JWT/Auth0 · React |
| 7 | **Big Data ANS: Processamento em Escala** | Java 21 · Spring Boot · Python · FastAPI · Vue.js · PostgreSQL · Docker |
| 8 | **Pipeline Transacional AWS** | Node.js · AWS SQS · AWS Lambda · DynamoDB · Next.js |
| 9 | **Caroll Buratto · Psicanalista Clínica** | Next.js · Node.js · PostgreSQL · Docker · TypeScript · Tailwind CSS |

---

## Funcionalidades do Sistema

- **Acessibilidade completa (A11y)**: infraestrutura semântica com roles e labels para suporte total a leitores de tela (VoiceOver/TalkBack)
- **Painel de acessibilidade visual**: filtros de daltonismo (deuteranopia, protanopia, tritanopia), escala de cinza, alto contraste e controle de tamanho de fonte, com preferências salvas no localStorage
- **Skip to content (WCAG 2.4.1)**: link invisível que aparece ao pressionar Tab e leva o foco direto ao conteúdo principal, pulando a navegação do OS
- **VLibras (MCTIC/UFPB)**: plugin oficial do governo brasileiro para tradução do conteúdo em Língua Brasileira de Sinais (Libras), acessível pelo painel de acessibilidade e pelo widget flutuante
- **Badge de inclusão na tela de bloqueio**: indicador visual "100% Acessível · Libras" exibido ao usuário desde o primeiro contato com o sistema
- **Navegação completa por teclado (Tab)**: todos os componentes do OS e dos apps com tabIndex, focus-visible rings e handlers de Enter/Space para operação sem mouse
- **Fotos reais nos cards de projetos**: cada card do portfólio (Browser e Gallery) exibe a foto real do projeto com gradiente como fallback e overlay para preservar legibilidade
- **Otimização de Performance (Next/Image)**: carregamento inteligente e conversão automática de ativos para WebP, com atributo `sizes` calibrado por breakpoint para cada grade responsiva
- **Normalização de zIndex**: gerenciamento determinístico de camadas para janelas, prevenindo conflitos de profundidade no estado persistido
- **UX Mobile Blindada**: prevenção de gestos nativos de sistema (pull-to-refresh) e remoção de artefatos visuais do navegador (tap-highlight)
- **Ergonomia de Desktop**: janelas com travas de segurança (clamping) e áreas de redimensionamento otimizadas para precisão
- **Arquitetura Centralizada de Ícones**: registro único de recursos SVG para consistência visual e manutenção simplificada
- **Áreas de toque otimizadas (Hit Targets)**: botões e controles com área mínima de 44px, garantindo precisão em dispositivos móveis
- **Tela de bloqueio** com desbloqueio por teclado (desktop) ou toque (mobile)
- **Janelas arrastáveis e redimensionáveis** com física de molas via Framer Motion
- **Dock com magnificação** ao passar o mouse (macOS)
- **Central de controle** com ajuste de volume, brilho e troca de wallpaper
- **Spotlight Search** (Win + Espaço / Cmd + Espaço) com busca entre os apps
- **Menu de contexto** por clique direito (desktop) e long-press (mobile)
- **Ícones móveis no estilo iOS** com drag livre e snap de retorno à posição original
- **Crossfade de wallpaper** animado ao trocar o plano de fundo
- **Múltiplas janelas** abertas simultaneamente com gerenciamento de z-index
- **Persistência de estado**: posição e tamanho das janelas salvas no `localStorage`
- **Layout adaptativo**: iOS no mobile, macOS no desktop (sem media queries manuais)
- **Glassmorphism nativo Apple**: todas as superfícies do sistema e dos apps com vidro fosco fiel ao iOS/macOS

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.2 | Framework principal, App Router, otimização de imagens |
| [React](https://react.dev/) | 18 | UI e gerenciamento de estado local |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática em todo o projeto |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Estilização utilitária |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animações, física de molas, drag e drop |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4 | Estado global do OS e gerenciador de janelas |
| [Lucide React](https://lucide.dev/) | 0.360 | Ícones do sistema |
| [vlibras-nextjs](https://www.npmjs.com/package/vlibras-nextjs) | 1.1 | Integração do VLibras com Next.js App Router |
| [i18n via Context API](https://react.dev/reference/react/createContext) | - | Internacionalização PT · EN · ES com detecção automática por IP e navigator.language |
| [ipapi.co](https://ipapi.co/) | - | Geolocalização por IP para detecção de cidade, país e idioma preferido |
| [Acessibilidade](https://www.w3.org/WAI/standards-guidelines/wcag/) | WCAG 2.1 | Padrões semânticos ARIA e navegação inclusiva |
| [VLibras](https://vlibras.gov.br/) | MCTIC/UFPB | Tradução automática do conteúdo para Libras via widget oficial do governo brasileiro |

---

## Funcionalidades Recentes

- **Painel de acessibilidade visual**: 6 modos de cor (normal, alto contraste, deuteranopia, protanopia, tritanopia, escala de cinza) com filtros SVG calibrados e controle de tamanho de fonte A- / A / A+
- **Skip to content (WCAG 2.4.1)**: link de teclado que aparece no primeiro Tab e ancora o foco no conteúdo principal
- **VLibras integrado ao painel**: acesso ao widget de Libras a partir do painel de acessibilidade, além do botão flutuante nativo
- **Navegação por Tab em todos os componentes**: todos os apps e componentes do OS receberam tabIndex, focus-visible e handlers de teclado
- **CI com GitHub Actions**: pipeline de type-check, lint e build em cada push na branch main
- **8 projetos reais na galeria**: cada projeto com foto real, DOR/Solução/Resultado e stack detalhada
- **Internacionalização completa (PT · EN · ES)**: detecção automática por IP e navigator.language com fallback para português
- **Conecta 360° em destaque**: SaaS de RH e NR-1 com liderança técnica de front-end, posicionado como primeiro projeto

---

## Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18.17 ou superior
- [npm](https://www.npmjs.com/) 9 ou superior

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/Fmarzochi/PortfolioFelipeMarzochi.git

# 2. Entre na pasta do projeto
cd PortfolioFelipeMarzochi

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no browser.

### Outros comandos

```bash
# Build de produção
npm run build

# Iniciar servidor de produção (após o build)
npm start

# Lint do projeto
npm run lint

# Type check
npx tsc --noEmit
```

---

## Deploy

O projeto é deployado automaticamente na [Vercel](https://vercel.com/) a cada push na branch `main`. O pipeline de CI no GitHub Actions executa type-check, lint e build antes do deploy. O `package-lock.json` é mantido no repositório para garantir builds determinísticos.

---

## Contato

**Felipe Marzochi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipemarzochi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Fmarzochi)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:fmarzochi@gmail.com)
