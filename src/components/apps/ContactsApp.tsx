'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../common/IconRegistry';

const INFO_ITEMS = [
  { label: 'Cargo',       value: 'Dev. de Software (Front-end) · Tech Lead'   },
  { label: 'Foco',        value: 'React.js · TypeScript · Java Spring Boot'   },
  { label: 'Localização', value: 'Americana, SP · Remoto'                     },
  { label: 'Formação',    value: 'Análise e Desenvolvimento de Sistemas · MBA em Engenharia de Software' },
  { label: 'Stack',       value: 'React · Next.js · Node.js · Java Spring Boot' },
  { label: 'Email',       value: 'fmarzochi@gmail.com', isEmail: true         },
];

const ACTIONS = [
  {
    label: 'WhatsApp',
    Icon: MessageCircle,
    color: 'bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 ring-[#25D366]/20',
    onClick: () => window.open('https://wa.me/5519982341110?text=Olá Felipe, vi seu portfólio de Engenharia de Software e gostaria de conversar!', '_blank', 'noopener,noreferrer'),
  },
  {
    label: 'Email',
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

      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 shadow-2xl ring-4 ring-white/10">
        <span className="text-4xl font-bold text-white">FM</span>
      </div>

      <h2 className="text-xl font-bold tracking-tight text-white">Felipe Marzochi</h2>
      <p className="mt-1 text-sm text-white/45 text-center">Dev. de Software · Tech Lead | Front-end</p>

      <div className="mt-6 grid grid-cols-4 gap-2 w-full">
        {ACTIONS.map(({ label, Icon, color, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 ring-1 transition-colors border border-white/10 ${color}`}
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 w-full rounded-2xl divide-y divide-white/8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {INFO_ITEMS.map(({ label, value, isEmail }) => (
          <div key={label} className="flex items-start gap-3 px-4 py-3">
            <span className="w-24 flex-shrink-0 text-[11px] text-white/60 uppercase tracking-wide pt-px">{label}</span>
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
