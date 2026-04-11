'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Fingerprint } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [time, setTime] = useState<Date | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options).replace(/^\w/, c => c.toUpperCase());
  };

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsAuthenticating(true);

    // Simula um tempo de carregamento de 800ms para a animação do spinner antes de abrir o OS
    setTimeout(() => {
      onUnlock();
    }, 800);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background unificado para transição suave para a área de trabalho */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#121212] z-0" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Relógio */}
        <div className="mb-12 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[80px] font-bold tracking-tighter text-white/90 drop-shadow-2xl"
          >
            {time ? formatTime(time) : '--:--'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-medium tracking-wide text-white/60 capitalize"
          >
            {time ? formatDate(time) : 'Carregando...'}
          </motion.p>
        </div>

        {/* User Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center"
        >
          {/* Avatar com Gradiente Laranja/Azul Tecnológico */}
          <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-orange-500 shadow-2xl ring-4 ring-white/10 backdrop-blur-xl">
            <span className="text-4xl font-bold text-white drop-shadow-md">FM</span>
          </div>

          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white/90">Felipe Marzochi</h2>

          {/* Password Input */}
          <form onSubmit={handleLogin} className="relative flex w-64 items-center">
            <input
              type="password"
              placeholder="Digite a senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isAuthenticating}
              className="w-full rounded-full bg-white/10 py-2.5 pl-5 pr-10 text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/40 focus:bg-white/20 focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
            />
            {isAuthenticating ? (
              <div className="absolute right-3 flex h-5 w-5 animate-spin items-center justify-center rounded-full border-2 border-white/20 border-t-white" />
            ) : (
              <button
                type="submit"
                className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <ArrowRight size={16} className="text-white/60 hover:text-white" />
              </button>
            )}
          </form>

          <div className="mt-8 flex items-center gap-2 text-xs font-medium text-white/40">
            <Fingerprint size={14} />
            <span>Touch ID ou Senha</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};