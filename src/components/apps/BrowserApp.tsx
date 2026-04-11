'use client';

import { Globe, Shield, Zap, ChevronLeft, ChevronRight, RotateCw, Home } from 'lucide-react';

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

        {/* Address Bar */}
        <div className="flex h-7 flex-1 items-center justify-center rounded-md bg-black/40 px-3 text-[13px] text-white/60 shadow-inner ring-1 ring-white/10">
          <Globe size={12} className="mr-2 opacity-50" />
          <span className="tracking-wide">https://catchup.tech</span>
        </div>

        <div className="w-[88px]" /> {/* Spacer para manter a barra de endereço centralizada */}
      </div>

      {/* Web Content */}
      <div className="flex-1 overflow-y-auto pb-10">
        {/* Hero Section */}
        <div className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-[#050505] to-[#050505]"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-xl shadow-2xl">
              <Globe size={42} className="text-blue-500" strokeWidth={1} />
            </div>
            <h1 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
              CatchUp Tech
            </h1>
            <p className="max-w-md text-base text-white/50 leading-relaxed">
              Software Factory de alta performance. Arquiteturas robustas, Clean Code e design focado na experiência do usuário.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Iniciar Projeto
              </button>
              <button className="rounded-lg bg-white/5 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-white/10">
                Ver Portfólio
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-4 px-8 md:grid-cols-2">
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
  );
};