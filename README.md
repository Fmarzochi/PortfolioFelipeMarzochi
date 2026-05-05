<div align="center">

# Portfolio Felipe Marzochi

### Web OS — Um sistema operacional interativo no browser

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand_4-433E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## Sobre o Projeto

Construí este portfólio com uma proposta diferente: em vez de uma página estática com seções empilhadas, desenvolvi um **sistema operacional completo rodando no browser**. A experiência simula um OS real — com tela de bloqueio, janelas arrastáveis, dock com magnificação, apps funcionais e dois layouts adaptativos: **macOS no desktop** e **iOS no mobile**.

Todo o estado do sistema vive no `localStorage` via Zustand — sem nenhum banco de dados, sem servidor de estado externo. O browser é o hardware.

---

## Arquitetura

```
src/
├── app/                    # Next.js App Router (layout, page, globals.css)
├── assets/images/          # Recursos estáticos importados pelo código
├── components/
│   ├── apps/               # Cada aplicativo do sistema isolado em seu componente
│   │   ├── AppRegistry.tsx     # Roteador central de apps
│   │   ├── BrowserApp.tsx      # Portfólio de projetos (estilo Safari)
│   │   ├── ContactsApp.tsx     # Informações de contato
│   │   ├── FinderApp.tsx       # Certificados e conquistas (estilo Finder)
│   │   ├── GalleryApp.tsx      # Galeria de imagens
│   │   ├── MapsApp.tsx         # Localização e experiência profissional
│   │   ├── MessagesApp.tsx     # Contato via WhatsApp e e-mail
│   │   ├── PhotosApp.tsx       # Projetos em destaque
│   │   ├── SkillsApp.tsx       # Terminal interativo de habilidades
│   │   └── TerminalApp.tsx     # Terminal do sistema
│   └── os/                 # Infraestrutura do sistema operacional
│       ├── AppWindow.tsx       # Janela arrastável e redimensionável
│       ├── ContextMenu.tsx     # Menu de contexto (clique direito / long-press)
│       ├── ControlCenter.tsx   # Central de controle (volume, brilho, wallpaper)
│       ├── Desktop.tsx         # Área de trabalho com crossfade de wallpaper
│       ├── DynamicIsland.tsx   # Dynamic Island (mobile)
│       ├── IOSMobile.tsx       # Layout completo iOS
│       ├── LockScreen.tsx      # Tela de bloqueio
│       ├── MacDock.tsx         # Dock com magnificação (macOS)
│       ├── SpotlightSearch.tsx # Busca global (Win + Espaço / ⌘ + Espaço)
│       ├── TopBar.tsx          # Barra de menu superior (macOS)
│       └── WebOS.tsx           # Orquestrador principal do sistema
├── contexts/
│   └── OSContext.tsx       # Estado global do OS (volume, brilho, wallpaper)
├── hooks/
│   ├── useContextMenu.ts   # Lógica de long-press e clique direito
│   └── useIsMobile.ts      # Detecção de dispositivo
├── store/
│   └── useWindowManager.ts # Gerenciador de janelas via Zustand (posição, z-index, tamanho)
└── utils/
    └── audioEngine.ts      # Motor de áudio do sistema
```

---

## Aplicativos

| App | Equivalente | Conteúdo |
|-----|-------------|----------|
| **Browser** | Safari | Projetos com links para o GitHub |
| **Finder** | Finder | Certificados organizados por categoria |
| **Skills** | Terminal | Terminal interativo com minhas habilidades técnicas |
| **Maps** | Maps | Localização e trajetória profissional |
| **Messages** | iMessage | Contato direto via WhatsApp ou e-mail |
| **Photos** | Photos | Projetos em destaque com overlay de título |
| **Contacts** | Contacts | Informações profissionais completas |
| **Terminal** | Terminal | Terminal do sistema operacional |

---

## Funcionalidades do Sistema

- **Tela de bloqueio** com desbloqueio por teclado (desktop) ou toque (mobile)
- **Janelas arrastáveis e redimensionáveis** com física de molas via Framer Motion
- **Dock com magnificação** ao passar o mouse (macOS)
- **Dynamic Island** no topo da tela (mobile)
- **Central de controle** com ajuste de volume, brilho e troca de wallpaper
- **Spotlight Search** (Win + Espaço / ⌘ + Espaço) com busca entre os apps
- **Menu de contexto** por clique direito (desktop) e long-press (mobile)
- **Ícones móveis no estilo iOS** — drag livre com snap de retorno à posição original
- **Crossfade de wallpaper** animado ao trocar o plano de fundo
- **Múltiplas janelas** abertas simultaneamente com gerenciamento de z-index
- **Persistência de estado** — posição e tamanho das janelas salvas no `localStorage`
- **Layout adaptativo** — iOS no mobile, macOS no desktop (sem media queries manuais)
- **Glassmorphism nativo Apple** — todas as superfícies do sistema e dos apps com vidro fosco fiel ao iOS/macOS

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.2 | Framework principal, App Router, otimização de imagens |
| [React](https://react.dev/) | 18 | UI e gerenciamento de estado local |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática em todo o projeto |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Estilização utilitária |
| [Framer Motion](https://www.framer.com/motion/) | 11 | Animações, física de molas, drag & drop |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4 | Estado global do OS e gerenciador de janelas |
| [Lucide React](https://lucide.dev/) | 0.360 | Ícones do sistema |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | — | Composição de classes CSS |

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
```

---

## Deploy

O projeto é deployado automaticamente na [Vercel](https://vercel.com/) a cada push na branch `main`. O `package-lock.json` é mantido no repositório para garantir builds determinísticos.

---

## Contato

**Felipe Marzochi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipemarzochi)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Fmarzochi)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:fmarzochi@gmail.com)
