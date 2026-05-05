'use client';

import { Mail, MessageCircle, Linkedin, Github, Globe } from 'lucide-react';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const INFO_ITEMS = [
  { label: 'Cargo',       value: 'Desenvolvedor de Software · Full Stack'     },
  { label: 'Empresa',     value: 'Conecta 360° · Freelance / Autônomo'        },
  { label: 'Localização', value: 'Americana, SP · Remoto'                     },
  { label: 'Formação',    value: 'ADS · MBA em Engenharia de Software'        },
  { label: 'Stack',       value: 'React · TypeScript · Java · Spring Boot'    },
  { label: 'E-mail',      value: 'fmarzochi@gmail.com', isEmail: true         },
];

const ACTIONS = [
  {
    label: 'WhatsApp',
    Icon: MessageCircle,
    color: 'bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 ring-[#25D366]/20',
    onClick: () => window.open('https://wa.me/5519982341110?text=Olá Felipe, vi seu portfólio!', '_blank', 'noopener,noreferrer'),
  },
  {
    label: 'E-mail',
    Icon: Mail,
    color: 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 ring-blue-500/20',
    onClick: () => window.open('mailto:fmarzochi@gmail.com?subject=Contato via Portfólio', '_blank'),
  },
  {
    label: 'LinkedIn',
    Icon: LinkedInIcon,
    color: 'bg-[#0A66C2]/15 text-[#0A66C2] hover:bg-[#0A66C2]/25 ring-[#0A66C2]/20',
    onClick: () => window.open('https://www.linkedin.com/in/felipemarzochi/', '_blank', 'noopener,noreferrer'),
  },
  {
    label: 'GitHub',
    Icon: GitHubIcon,
    color: 'bg-white/8 text-white/70 hover:bg-white/15 ring-white/10',
    onClick: () => window.open('https://github.com/Fmarzochi', '_blank', 'noopener,noreferrer'),
  },
];

export const ContactsApp = () => (
  <div className="flex h-full w-full items-center justify-center text-white/90 overflow-y-auto p-4" style={{ background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(40px) saturate(180%)' }}>
    <div className="w-full max-w-sm flex flex-col items-center rounded-3xl p-6 shadow-2xl" style={{ background: 'rgba(22,22,26,0.85)', backdropFilter: 'blur(52px) saturate(180%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.06)' }}>

      {/* Avatar */}
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 shadow-2xl ring-4 ring-white/10">
        <span className="text-4xl font-bold text-white">FM</span>
      </div>

      <h2 className="text-xl font-bold tracking-tight text-white">Felipe Marzochi</h2>
      <p className="mt-1 text-sm text-white/45 text-center">Desenvolvedor de Software · Full Stack</p>

      {/* Action buttons */}
      <div className="mt-6 grid grid-cols-4 gap-2 w-full">
        {ACTIONS.map(({ label, Icon, color, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 ring-1 transition-colors border border-white/10 ${color}`}
          >
            <Icon />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>

      {/* Info card */}
      <div className="mt-5 w-full rounded-2xl divide-y divide-white/8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {INFO_ITEMS.map(({ label, value, isEmail }) => (
          <div key={label} className="flex items-start gap-3 px-4 py-3">
            <span className="w-24 flex-shrink-0 text-[11px] text-white/35 uppercase tracking-wide pt-px">{label}</span>
            {isEmail ? (
              <a href={`mailto:${value}`} className="text-sm text-blue-400 hover:text-blue-300 transition-colors break-all">{value}</a>
            ) : (
              <span className="text-sm text-white/70 leading-snug">{value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
