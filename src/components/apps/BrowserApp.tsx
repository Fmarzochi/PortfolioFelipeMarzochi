'use client';

import { Globe, Shield, Zap, ChevronLeft, ChevronRight, RotateCw, Home, Download, Brain, Target, Lightbulb, Users, CheckCircle2, Layers } from 'lucide-react';
import signatureImg from '../../assets/images/signature.png';

const PROFILE_TRAITS = [
  { label: 'Organização & Qualidade',    value: 94, color: 'bg-blue-500',   icon: CheckCircle2 },
  { label: 'Orientação a Resultados',    value: 87, color: 'bg-violet-500', icon: Target       },
  { label: 'Proatividade',              value: 87, color: 'bg-cyan-500',   icon: Lightbulb    },
  { label: 'Raciocínio Analítico',      value: 85, color: 'bg-green-500',  icon: Brain        },
  { label: 'Colaboração em Equipe',     value: 85, color: 'bg-pink-500',   icon: Users        },
];

const WORK_STYLE = [
  { label: 'Clean Code obsessivo',       desc: 'Escreve como se o próximo dev fosse um médico de plantão' },
  { label: 'Entrega antecipada',         desc: 'Antecipa gargalos antes que virem bloqueadores de sprint'  },
  { label: 'Autonomia com alinhamento',  desc: 'Performa melhor com liberdade, sem abrir mão do contexto'  },
  { label: 'Delegação inteligente',      desc: 'Avalia problema por problema e distribui com quem entende' },
  { label: 'Orientado ao negócio',       desc: 'Enxerga o impacto do código além do PR aprovado'          },
];

export const BrowserApp = () => {
  return (
    <div className="flex h-full w-full flex-col bg-[#050505] text-white">
      {/* Browser Toolbar */}
      <div className="flex h-12 items-center gap-4 border-b border-white/5 bg-white/5 px-4 backdrop-blur-md">
        <div className="flex gap-3 text-white/40">
          <ChevronLeft size={18} className="cursor-not-allowed" />
          <ChevronRight size={18} className="cursor-not-allowed" />
          <RotateCw size={16} className="cursor-pointer transition-colors hover:text-white/80" />
          <Home size={16} className="ml-2 cursor-pointer transition-colors hover:text-white/80" />
        </div>
        <div className="flex h-7 flex-1 items-center justify-center rounded-md bg-black/40 px-3 text-[13px] text-white/60 shadow-inner ring-1 ring-white/10">
          <Globe size={12} className="mr-2 opacity-50" />
          <span className="tracking-wide">https://felipe.marzochi.dev</span>
        </div>
        <div className="w-[88px]" />
      </div>

      {/* Web Content */}
      <div className="flex-1 overflow-y-auto pb-10">

        {/* Hero */}
        <div className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-[#050505] to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(90,40,200,0.18),transparent)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
              <Globe size={42} className="text-blue-500" strokeWidth={1} />
            </div>
            <div className="mb-4 flex items-center justify-center">
              <img
                src={signatureImg.src}
                alt="Felipe Marzochi"
                draggable={false}
                className="h-auto w-[260px] md:w-[320px] pointer-events-none"
                style={{ filter: 'invert(1) brightness(5) contrast(2)', mixBlendMode: 'screen', opacity: 0.78 }}
              />
            </div>
            <p className="max-w-md text-base text-white/50 leading-relaxed">
              Software Factory de alta performance. Arquiteturas robustas, Clean Code e design focado na experiência do usuário.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Iniciar Projeto
              </button>
              <button className="rounded-lg bg-white/5 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/10">
                Ver Portfólio
              </button>
              <a
                href="/cv/CV_FELIPE_MARZOCHI.pdf"
                download="CV_Felipe_Marzochi.pdf"
                className="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/20 hover:ring-white/40"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* ── Perfil Profissional ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-6 py-8 space-y-8">

          {/* Sobre mim — narrative */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={16} className="text-blue-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400">Perfil Profissional</h2>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Desenvolvedor movido por qualidade e impacto real. Combino planejamento excepcional com iniciativa — antecipo gargalos, estruturo soluções antes que se tornem problemas e entrego com consistência.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Oriento-me pelo resultado do negócio, não apenas pelo ticket fechado. Performa com autonomia em ambientes ágeis, mas colaboro naturalmente em equipe — avaliando contextos, delegando com inteligência e priorizando o que realmente move o ponteiro.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Minha formação em Medicina Veterinária me treinou para raciocinar sob pressão e diagnosticar com precisão antes de agir. Hoje aplico essa mesma mentalidade analítica ao desenvolvimento de software: primeiro entendo, depois executo, sempre valido.
            </p>
          </div>

          {/* DNA Profissional — Big Five bars */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Brain size={16} className="text-violet-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-violet-400">DNA Profissional</h2>
            </div>
            <div className="space-y-4">
              {PROFILE_TRAITS.map((trait) => (
                <div key={trait.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <trait.icon size={13} className="text-white/40" />
                      <span className="text-xs text-white/75 font-medium">{trait.label}</span>
                    </div>
                    <span className="text-xs font-bold text-white/50 tabular-nums">{trait.value}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${trait.color} opacity-80`}
                      style={{ width: `${trait.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] text-white/30 leading-relaxed italic">
              Perfil investigativo-analítico com alta orientação a processos de qualidade, autonomia e resultado de negócio.
            </p>
          </div>

          {/* Como trabalho */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/8 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target size={16} className="text-green-400" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-green-400">Como Trabalho</h2>
            </div>
            <div className="space-y-3">
              {WORK_STYLE.map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-white/85">{item.label}</span>
                    <span className="text-xs text-white/40 ml-2">— {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/5 transition-all hover:bg-white/10 hover:ring-white/10">
              <Zap className="mb-4 text-blue-500 transition-transform group-hover:scale-110" size={24} strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-white/90 tracking-wide">Performance Extrema</h3>
              <p className="text-sm text-white/40 leading-relaxed">Sistemas construídos para velocidade máxima. Otimização implacável rodando sobre infraestruturas escaláveis.</p>
            </div>
            <div className="group flex flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/5 transition-all hover:bg-white/10 hover:ring-white/10">
              <Shield className="mb-4 text-blue-500 transition-transform group-hover:scale-110" size={24} strokeWidth={1.5} />
              <h3 className="mb-2 text-lg font-medium text-white/90 tracking-wide">Arquitetura Sólida</h3>
              <p className="text-sm text-white/40 leading-relaxed">Fundações erguidas sob estrita obediência aos princípios SOLID, garantindo manutenção e evolução seguras.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
