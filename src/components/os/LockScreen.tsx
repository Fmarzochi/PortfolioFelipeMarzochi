'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronUp, Fingerprint, Volume2, VolumeX } from 'lucide-react';
import { playSound } from '../../utils/audioEngine';
import profileImg from '../../assets/images/profile.jpg';
import signatureImg from '../../assets/images/signature.png';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [time, setTime] = useState<Date | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const authRef = useRef(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options).replace(/^\w/, (c) => c.toUpperCase());
  };

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (authRef.current) return;
    authRef.current = true;
    setIsAuthenticating(true);
    if (!isMuted) playSound('click');
    setTimeout(() => {
      if (!isMuted) playSound('boot');
      onUnlock();
    }, 800);
  };

  useEffect(() => {
    const handler = () => handleLogin();
    document.addEventListener('keydown', handler, { once: true });
    return () => document.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex h-[100dvh] w-screen flex-col items-center justify-center overflow-hidden bg-black text-white select-none">

      {/* ── Mute toggle ──────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsMuted(v => !v)}
        className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/15 hover:bg-white/15 transition-all"
        title={isMuted ? 'Ativar som' : 'Silenciar'}
      >
        {isMuted ? <VolumeX size={14} className="text-white/50" /> : <Volume2 size={14} className="text-white/50" />}
      </button>

      {/* ── Aurora Wallpaper ─────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b22] via-[#170f38] to-[#09101e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_58%_at_50%_-8%,rgba(105,55,215,0.68),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_48%_at_12%_68%,rgba(25,95,200,0.42),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_42%_at_88%_82%,rgba(0,138,108,0.38),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_38%_32%_at_72%_28%,rgba(175,55,195,0.28),transparent)]" />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Clock */}
        <div className="mb-2 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="text-[56px] md:text-[86px] tracking-tighter tabular-nums"
            style={{
              fontWeight: 250,
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 2px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)',
              letterSpacing: '-0.03em',
            }}
          >
            {time ? formatTime(time) : '--:--'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl tracking-wide capitalize"
            style={{ fontWeight: 300, color: 'rgba(255,255,255,0.65)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            {time ? formatDate(time) : 'Carregando...'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-2 text-[11px] md:text-xs text-white/28 tracking-wide text-center px-8"
          >
            Um portfólio diferente · explore como um sistema operacional
          </motion.p>
        </div>

        {/* ── Signature ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', damping: 22 }}
          className="my-4 md:my-6"
        >
          <img
            src={signatureImg.src}
            alt="Assinatura Felipe Marzochi"
            draggable={false}
            className="h-auto w-[220px] md:w-[290px] pointer-events-none"
            style={{
              filter: 'invert(1) brightness(5) contrast(2)',
              mixBlendMode: 'screen',
              opacity: 0.82,
            }}
          />
        </motion.div>

        {/* Profile + Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex flex-col items-center"
        >
          {/* Avatar */}
          <div className="mb-3 md:mb-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 p-[3px] shadow-2xl ring-4 ring-white/10">
            <div className="h-20 w-20 md:h-28 md:w-28 overflow-hidden rounded-full">
              <img
                src={profileImg.src}
                alt="Felipe Marzochi"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>

          <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold tracking-tight text-white/92">
            Felipe Marzochi
          </h2>

          {/* Password Input */}
          <form onSubmit={handleLogin} className="relative flex w-[min(85vw,220px)] md:w-[min(90vw,256px)] items-center">
            <input
              type="password"
              placeholder="Digite a senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isAuthenticating}
              className="w-full rounded-full bg-white/10 py-2 md:py-2.5 pl-4 md:pl-5 pr-9 md:pr-10 text-xs md:text-sm text-white outline-none backdrop-blur-md transition-all placeholder:text-white/40 focus:bg-white/18 focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
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

          <button
            className="mt-6 md:mt-8 flex flex-col items-center gap-3 cursor-pointer group"
            onClick={() => handleLogin()}
            aria-label="Desbloquear sistema"
          >
            <motion.div
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="flex h-[72px] w-[72px] md:h-[84px] md:w-[84px] items-center justify-center rounded-full bg-white/8 ring-2 ring-white/15 group-hover:bg-white/15 group-hover:ring-white/30 transition-all"
            >
              <Fingerprint size={40} className="text-white/55 group-hover:text-white/80 transition-colors" strokeWidth={1.2} aria-hidden="true" />
            </motion.div>
            <span className="text-[11px] md:text-xs font-medium text-white/40 group-hover:text-white/60 transition-colors text-center px-2">
              {isTouchDevice ? 'Toque para entrar' : 'Clique ou pressione qualquer tecla'}
            </span>
          </button>
        </motion.div>
      </div>

      {/* ── Swipe-up hint (mobile only) ──────────────────────────────────── */}
      {isTouchDevice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronUp size={20} className="text-white/35" />
          </motion.div>
          <span className="text-[11px] text-white/30 tracking-wide">Deslize para cima</span>
        </motion.div>
      )}
    </div>
  );
};
