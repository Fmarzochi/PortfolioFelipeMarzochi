'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Compass, Image as LucideImage, BookOpen, Code2, MessageSquare, MapPin, ChevronRight } from 'lucide-react';
import { useWindowManager } from '../../store/useWindowManager';
import { FocusTrap } from '../common/FocusTrap';

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
  { id: 'safari',   title: 'Portfólio',          subtitle: 'Perfil profissional, projetos e contato', icon: <Compass size={16} />,      accent: 'text-blue-400' },
  { id: 'skills',   title: 'Skills',             subtitle: 'Competências técnicas e certificações',  icon: <Code2 size={16} />,        accent: 'text-slate-400' },
  { id: 'photos',   title: 'Galeria de Projetos', subtitle: 'Estudos de caso dos projetos entregues', icon: <LucideImage size={16} />,        accent: 'text-pink-400' },
  { id: 'finder',   title: 'Diplomas',           subtitle: 'Diplomas e certificações acadêmicas',    icon: <BookOpen size={16} />,     accent: 'text-amber-400' },
  { id: 'messages', title: 'Contato',            subtitle: 'WhatsApp, email e redes sociais',       icon: <MessageSquare size={16} />,accent: 'text-green-400' },
  { id: 'maps',     title: 'Experiência',         subtitle: 'Linha do tempo da carreira',             icon: <MapPin size={16} />,       accent: 'text-emerald-400' },
];

const PROJECTS = [
  { title: 'Everything Gemini Code (EGC) · AI OS', subtitle: 'Python · TypeScript · SQLite · Agent Orchestration', app: 'photos', accent: 'text-blue-400' },
  { title: 'DuAutomação Residencial',            subtitle: 'Java · React.js · PostgreSQL · REST API',              app: 'photos', accent: 'text-blue-400'   },
  { title: 'Laboratório Unilab',                 subtitle: 'Next.js · Tailwind CSS · Framer Motion',               app: 'photos', accent: 'text-teal-400'   },
  { title: "Career Scout AI",                    subtitle: 'Python · Gemini API · GitHub Actions',                 app: 'photos', accent: 'text-violet-400' },
  { title: 'CalibraFlow: SaaS de Gestão de ISO',   subtitle: 'Java 21 · Spring Boot · Docker · React',               app: 'photos', accent: 'text-amber-400'  },
  { title: 'Big Data ANS: Processamento em Escala', subtitle: 'Java 21 · FastAPI · Vue.js · PostgreSQL',           app: 'photos', accent: 'text-sky-400'    },
  { title: 'Pipeline Transacional AWS',          subtitle: 'Node.js · AWS SQS · Lambda · DynamoDB',               app: 'photos', accent: 'text-yellow-400' },
];

const SKILLS = [
  { title: 'React.js / Hooks / Context API',     subtitle: 'Front End',   app: 'skills' },
  { title: 'TypeScript',                         subtitle: 'Front End',   app: 'skills' },
  { title: 'Next.js / SSR / SSG',               subtitle: 'Front End',   app: 'skills' },
  { title: 'Java / OOP / Collections',           subtitle: 'Back End',    app: 'skills' },
  { title: 'Spring Boot / JPA / Hibernate',      subtitle: 'Back End',    app: 'skills' },
  { title: 'PostgreSQL / SQL Avançado',          subtitle: 'Banco de Dados', app: 'skills' },
  { title: 'Docker / Containerização',           subtitle: 'DevOps',      app: 'skills' },
  { title: 'AWS CloudFront / Cloud',             subtitle: 'DevOps',      app: 'skills' },
  { title: 'SOLID / Clean Code',                 subtitle: 'Arquitetura', app: 'skills' },
  { title: 'SaaS Multi tenant',                  subtitle: 'Arquitetura', app: 'skills' },
];

const CERTS = [
  { title: 'Java Completo: Spring Boot, JPA, Hibernate',            subtitle: 'Udemy · 2026',            app: 'finder' },
  { title: 'JavaScript Completo: TypeScript, Node.js, MongoDB',     subtitle: 'Udemy · 2025',            app: 'finder' },
  { title: 'Oracle Next Education (ONE): Full Stack',               subtitle: 'Oracle / Alura · 2022',   app: 'finder' },
  { title: 'Bancos de Dados SQL e NoSQL',                            subtitle: 'Udemy · 2022',            app: 'finder' },
  { title: 'Web Front end Fundamentos',                              subtitle: 'Udemy · 2025',            app: 'finder' },
  { title: 'Python para Data Science e Machine Learning',            subtitle: 'Udemy · 2024',            app: 'finder' },
  { title: 'Docker: Fundamentos e Prática',                         subtitle: 'Udemy · 2024',            app: 'finder' },
  { title: 'AWS Cloud Practitioner',                                 subtitle: 'AWS · 2024',              app: 'finder' },
  { title: 'MBA em Engenharia de Software',                          subtitle: 'Fac. Metropolitana · 2023', app: 'finder' },
  { title: 'Bacharelado em ADS',                                     subtitle: 'Estácio · 2026',            app: 'finder' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotlightSearch = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openApp } = useWindowManager();

  const results = useMemo((): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: SearchResult[] = [];

    APPS.filter((a) => a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q))
      .forEach((a) => out.push({
        id: `app-${a.id}`, category: 'Aplicativos', title: a.title, subtitle: a.subtitle,
        icon: <span className={a.accent}>{a.icon}</span>, accent: a.accent,
        action: () => { openApp(a.id, a.title); onClose(); }
      }));

    PROJECTS.filter((p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q))
      .forEach((p, i) => out.push({
        id: `proj-${i}`, category: 'Projetos', title: p.title, subtitle: p.subtitle,
        icon: <span className={p.accent}><LucideImage size={16} /></span>, accent: p.accent,
        action: () => { openApp(p.app, 'Galeria de Projetos'); onClose(); }
      }));

    SKILLS.filter((s) => s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q))
      .forEach((s, i) => out.push({
        id: `skill-${i}`, category: 'Skills', title: s.title, subtitle: s.subtitle,
        icon: <span className="text-slate-400"><Code2 size={16} /></span>, accent: 'text-slate-400',
        action: () => { openApp(s.app, 'Skills'); onClose(); }
      }));

    CERTS.filter((c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q))
      .forEach((c, i) => out.push({
        id: `cert-${i}`, category: 'Certificações', title: c.title, subtitle: c.subtitle,
        icon: <span className="text-amber-400"><BookOpen size={16} /></span>, accent: 'text-amber-400',
        action: () => { openApp(c.app, 'Skills'); onClose(); }
      }));

    return out;
  }, [query, openApp, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && results[activeIdx]) { results[activeIdx].action(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIdx]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    results.forEach((r) => {
      if (!map.has(r.category)) map.set(r.category, []);
      map.get(r.category)!.push(r);
    });
    return map;
  }, [results]);

  const flatResults = useMemo(() => [...grouped.values()].flat(), [grouped]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-[500] bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="fixed z-[600] left-1/2 top-[18%] -translate-x-1/2 w-full max-w-[600px] px-4" onClick={(e) => e.stopPropagation()}>
            <FocusTrap isActive={isOpen} onEscape={onClose}>
              <div className="rounded-2xl overflow-hidden liquid-glass-spotlight">
                <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  <Search size={18} className="text-white/40 shrink-0" aria-hidden="true" />
                  <input ref={inputRef} type="text" placeholder="Buscar projetos, skills, apps..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-[15px] text-white placeholder-white/30 outline-none" role="combobox" aria-autocomplete="list" aria-expanded={isOpen && results.length > 0} aria-haspopup="listbox" aria-controls="spotlight-results" aria-label="Campo de busca global" aria-activedescendant={results[activeIdx] ? results[activeIdx].id : undefined} />
                  {query && <button onClick={() => setQuery('')} className="text-white/30 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 rounded-sm" aria-label="Limpar busca"><X size={15} /></button>}
                </div>
                <div className="max-h-[400px] overflow-y-auto" id="spotlight-results" role="listbox" aria-label="Resultados da busca">
                  {query.trim() === '' && <div className="px-4 py-8 text-center text-sm text-white/25">Digite para buscar projetos, skills, apps ou certificações</div>}
                  {query.trim() !== '' && results.length === 0 && <div className="px-4 py-8 text-center text-sm text-white/25">Nenhum resultado para &quot;{query}&quot;</div>}
                  {[...grouped.entries()].map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 pt-3 pb-1"><p className="text-[10px] font-bold uppercase tracking-widest text-white/25">{category}</p></div>
                      {items.map((result) => {
                        const flatIdx = flatResults.indexOf(result);
                        const isActive = flatIdx === activeIdx;
                        return (
                          <button key={result.id} onClick={result.action} className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset" style={{ background: isActive ? 'rgba(59,130,246,0.22)' : '' }} onMouseEnter={e => { setActiveIdx(flatIdx); if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }} onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = ''; }}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/5 ring-1 ring-white/8`}>{result.icon}</div>
                            <div className="min-w-0 flex-1"><p className="text-[13px] font-medium text-white/90 truncate">{result.title}</p><p className="text-[11px] text-white/65 truncate">{result.subtitle}</p></div>
                            {isActive && <ChevronRight size={14} className="text-white/30 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  {results.length > 0 && <div className="px-4 py-2.5 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}><p className="text-[10px] text-white/20 text-center">↑↓ navegar · Enter abrir · Esc fechar</p></div>}
                </div>
              </div>
            </FocusTrap>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
