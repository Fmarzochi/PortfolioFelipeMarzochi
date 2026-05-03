'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Compass, Image, BookOpen, Code2, MessageSquare, MapPin, ChevronRight } from 'lucide-react';
import { useWindowManager } from '../../store/useWindowManager';

/* ── Searchable index ─────────────────────────────────────────────────────── */
interface SearchResult {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  action: () => void;
  icon: React.ReactNode;
  accent: string;
}

const APPS = [
  { id: 'safari',   title: 'Portfólio',          subtitle: 'Perfil profissional, projetos e contato', icon: <Compass size={16} />,      accent: 'text-blue-400',   gradient: 'from-blue-500 to-cyan-400' },
  { id: 'skills',   title: 'Skills',             subtitle: 'Competências técnicas e certificações',  icon: <Code2 size={16} />,        accent: 'text-slate-400',  gradient: 'from-slate-500 to-slate-700' },
  { id: 'photos',   title: 'Galeria de Projetos', subtitle: 'Estudos de caso dos projetos entregues', icon: <Image size={16} />,        accent: 'text-pink-400',   gradient: 'from-pink-400 to-violet-600' },
  { id: 'finder',   title: 'Diplomas',           subtitle: 'Diplomas e certificações acadêmicas',    icon: <BookOpen size={16} />,     accent: 'text-amber-400',  gradient: 'from-amber-400 to-orange-500' },
  { id: 'messages', title: 'Contato',            subtitle: 'WhatsApp, e-mail e redes sociais',       icon: <MessageSquare size={16} />,accent: 'text-green-400',  gradient: 'from-green-500 to-emerald-600' },
  { id: 'maps',     title: 'Experiência',         subtitle: 'Linha do tempo da carreira',             icon: <MapPin size={16} />,       accent: 'text-emerald-400',gradient: 'from-emerald-500 to-teal-500' },
];

const PROJECTS = [
  { title: 'ERP para Gestão de Negócios',        subtitle: 'Java · React.js · PostgreSQL · REST API',              app: 'photos', accent: 'text-blue-400'   },
  { title: 'Laboratório Unilab',                 subtitle: 'Next.js · Tailwind CSS · Framer Motion',               app: 'photos', accent: 'text-teal-400'   },
  { title: "Felipe's Dream Agent",               subtitle: 'Python · Gemini API · GitHub Actions',                 app: 'photos', accent: 'text-violet-400' },
  { title: 'CalibraFlow — SaaS de Calibração',   subtitle: 'Java 21 · Spring Boot · Docker · React',               app: 'photos', accent: 'text-amber-400'  },
  { title: 'Dashboard ANS — Engenharia de Dados',subtitle: 'Java 21 · FastAPI · Vue.js · PostgreSQL',              app: 'photos', accent: 'text-sky-400'    },
  { title: 'Pipeline Transacional AWS',          subtitle: 'Node.js · AWS SQS · Lambda · DynamoDB',               app: 'photos', accent: 'text-yellow-400' },
];

const SKILLS = [
  { title: 'React.js / Hooks / Context API',     subtitle: 'Front-End · 95%',   app: 'skills' },
  { title: 'TypeScript',                         subtitle: 'Front-End · 92%',   app: 'skills' },
  { title: 'Next.js / SSR / SSG',               subtitle: 'Front-End · 88%',   app: 'skills' },
  { title: 'Java / OOP / Collections',           subtitle: 'Back-End · 80%',    app: 'skills' },
  { title: 'Spring Boot / JPA / Hibernate',      subtitle: 'Back-End · 76%',    app: 'skills' },
  { title: 'PostgreSQL / SQL Avançado',          subtitle: 'Banco de Dados · 85%', app: 'skills' },
  { title: 'Docker / Containerização',           subtitle: 'DevOps · 78%',      app: 'skills' },
  { title: 'AWS CloudFront / Cloud',             subtitle: 'DevOps · 70%',      app: 'skills' },
  { title: 'SOLID / Clean Code',                 subtitle: 'Arquitetura · 87%', app: 'skills' },
  { title: 'SaaS Multi-tenant',                  subtitle: 'Arquitetura · 85%', app: 'skills' },
];

const CERTS = [
  { title: 'Java Completo — Spring Boot, JPA, Hibernate',            subtitle: 'Udemy · 2026', app: 'skills' },
  { title: 'JavaScript Completo — TypeScript, Node.js, MongoDB',     subtitle: 'Udemy · 2025', app: 'skills' },
  { title: 'Oracle Next Education (ONE) — Full Stack',               subtitle: 'Oracle / Alura · 2022', app: 'skills' },
  { title: 'Bancos de Dados SQL e NoSQL',                            subtitle: 'Udemy · 2022', app: 'skills' },
  { title: 'Web Front-end Fundamentos',                              subtitle: 'Udemy · 2025', app: 'skills' },
];

/* ── Component ────────────────────────────────────────────────────────────── */
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotlightSearch = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openApp } = useWindowManager();

  /* Focus input when opening */
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Build results */
  const results = useMemo((): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const out: SearchResult[] = [];

    /* Apps */
    APPS.filter((a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q))
      .forEach((a) =>
        out.push({
          id: `app-${a.id}`,
          category: 'Aplicativos',
          title: a.title,
          subtitle: a.subtitle,
          icon: <span className={a.accent}>{a.icon}</span>,
          accent: a.accent,
          action: () => { openApp(a.id, a.title); onClose(); },
        }),
      );

    /* Projects */
    PROJECTS.filter((p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q))
      .forEach((p, i) =>
        out.push({
          id: `proj-${i}`,
          category: 'Projetos',
          title: p.title,
          subtitle: p.subtitle,
          icon: <span className={p.accent}><Image size={16} /></span>,
          accent: p.accent,
          action: () => { openApp(p.app, 'Galeria de Projetos'); onClose(); },
        }),
      );

    /* Skills */
    SKILLS.filter((s) => s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q))
      .forEach((s, i) =>
        out.push({
          id: `skill-${i}`,
          category: 'Skills',
          title: s.title,
          subtitle: s.subtitle,
          icon: <span className="text-slate-400"><Code2 size={16} /></span>,
          accent: 'text-slate-400',
          action: () => { openApp(s.app, 'Skills'); onClose(); },
        }),
      );

    /* Certs */
    CERTS.filter((c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q))
      .forEach((c, i) =>
        out.push({
          id: `cert-${i}`,
          category: 'Certificações',
          title: c.title,
          subtitle: c.subtitle,
          icon: <span className="text-amber-400"><BookOpen size={16} /></span>,
          accent: 'text-amber-400',
          action: () => { openApp(c.app, 'Skills'); onClose(); },
        }),
      );

    return out;
  }, [query, openApp, onClose]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && results[activeIdx]) { results[activeIdx].action(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, results, activeIdx]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  /* Group results by category */
  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    results.forEach((r) => {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    });
    return map;
  }, [results]);

  /* Flat index for keyboard nav */
  const flatResults = useMemo(() => [...grouped.values()].flat(), [grouped]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[500] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Spotlight panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed z-[600] left-1/2 top-[18%] -translate-x-1/2 w-full max-w-[600px] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/10 bg-[#1c1c1e]/90 backdrop-blur-2xl">

              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
                <Search size={18} className="text-white/40 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar projetos, skills, apps..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-[15px] text-white placeholder-white/30 outline-none"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors">
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {query.trim() === '' && (
                  <div className="px-4 py-8 text-center text-sm text-white/25">
                    Digite para buscar projetos, skills, apps ou certificações
                  </div>
                )}

                {query.trim() !== '' && results.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm text-white/25">
                    Nenhum resultado para &quot;{query}&quot;
                  </div>
                )}

                {[...grouped.entries()].map(([category, items]) => {
                  return (
                    <div key={category}>
                      <div className="px-4 pt-3 pb-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">{category}</p>
                      </div>
                      {items.map((result) => {
                        const flatIdx = flatResults.indexOf(result);
                        const isActive = flatIdx === activeIdx;
                        return (
                          <button
                            key={result.id}
                            onClick={result.action}
                            onMouseEnter={() => setActiveIdx(flatIdx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                              isActive ? 'bg-blue-600/25' : 'hover:bg-white/5'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 ring-1 ring-white/8`}>
                              {result.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] font-medium text-white/90 truncate">{result.title}</p>
                              <p className="text-[11px] text-white/35 truncate">{result.subtitle}</p>
                            </div>
                            {isActive && <ChevronRight size={14} className="text-white/30 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}

                {results.length > 0 && (
                  <div className="px-4 py-2.5 border-t border-white/5 mt-1">
                    <p className="text-[10px] text-white/20 text-center">
                      ↑↓ navegar · Enter abrir · Esc fechar
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
