'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, ZoomIn } from 'lucide-react';

// ---------------------------------------------------------------------------
// Mock project screenshots represented as CSS gradient cards.
// Replace the `gradient` value with a real <img> src when assets are ready.
// ---------------------------------------------------------------------------
const PROJECTS = [
  { id: '1',  title: 'Unilab — Dashboard',        tag: 'Java / Spring',   gradient: 'from-blue-600 to-cyan-500'      },
  { id: '2',  title: 'Unilab — Agendamentos',      tag: 'React / REST',    gradient: 'from-cyan-600 to-sky-500'       },
  { id: '3',  title: 'DuAutomações — ERP',         tag: 'Spring / JPA',    gradient: 'from-orange-500 to-amber-400'   },
  { id: '4',  title: 'DuAutomações — Financeiro',  tag: 'React / Charts',  gradient: 'from-amber-500 to-orange-600'   },
  { id: '5',  title: 'CalibrFlow — Certificados',  tag: 'Next.js / PDF',   gradient: 'from-emerald-500 to-teal-500'   },
  { id: '6',  title: 'CalibrFlow — ISO Fluxo',     tag: 'TypeScript',      gradient: 'from-teal-500 to-emerald-600'   },
  { id: '7',  title: 'Portfolio — Landing Page',     tag: 'Next.js / Vercel',gradient: 'from-blue-700 to-indigo-600'    },
  { id: '8',  title: 'Portfolio — Web OS',           tag: 'Framer Motion',   gradient: 'from-indigo-600 to-violet-600'  },
  { id: '9',  title: 'Unilab — Doadores',          tag: 'React / Tailwind',gradient: 'from-blue-500 to-indigo-500'    },
  { id: '10', title: 'DuAutomações — Relatórios',  tag: 'Spring / Jasper', gradient: 'from-rose-500 to-pink-500'      },
  { id: '11', title: 'CalibrFlow — Dashboard',     tag: 'React / Recharts',gradient: 'from-green-600 to-emerald-500'  },
  { id: '12', title: 'Portfolio — API Gateway',      tag: 'Spring / Docker', gradient: 'from-slate-600 to-slate-500'    },
];

export const GalleryApp = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const selectedProject = PROJECTS.find((p) => p.id === selected);

  return (
    <div className="flex h-full w-full flex-col bg-[#161616] text-white">
      {/* Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <span className="text-sm font-semibold tracking-wide text-white/70">
          Portfólio — {PROJECTS.length} projetos
        </span>
        <div className="flex items-center gap-1 rounded-lg bg-white/10 p-1">
          <button
            onClick={() => setLayout('grid')}
            className={`rounded-md p-1.5 transition-colors ${layout === 'grid' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <Grid size={14} />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`rounded-md p-1.5 transition-colors ${layout === 'list' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/70'}`}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Project grid / list */}
        <div className="flex-1 overflow-y-auto p-4">
          {layout === 'grid' ? (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(project.id === selected ? null : project.id)}
                  className={`group relative aspect-video cursor-pointer overflow-hidden rounded-xl ring-2 transition-all ${
                    selected === project.id
                      ? 'ring-blue-500 shadow-lg shadow-blue-500/20'
                      : 'ring-white/10 hover:ring-white/30'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/30">
                    <ZoomIn size={24} className="text-white drop-shadow-md" />
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 backdrop-blur-sm">
                    <p className="truncate text-xs font-semibold text-white">{project.title}</p>
                    <p className="text-[10px] text-white/50">{project.tag}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.id}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(project.id === selected ? null : project.id)}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl px-3 py-2.5 transition-colors ${
                    selected === project.id
                      ? 'bg-blue-500/20 ring-1 ring-blue-500/40'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${project.gradient}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{project.title}</p>
                    <p className="text-xs text-white/40">{project.tag}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel — slides in when a project is selected */}
        {selectedProject && (
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-56 shrink-0 border-l border-white/10 bg-black/30 p-5 backdrop-blur-xl"
          >
            <div className={`mb-4 h-28 w-full rounded-xl bg-gradient-to-br ${selectedProject.gradient}`} />
            <h3 className="text-sm font-semibold leading-snug text-white">{selectedProject.title}</h3>
            <p className="mt-1 text-xs text-white/40">{selectedProject.tag}</p>
            <div className="mt-4 text-xs leading-relaxed text-white/50">
              Projeto desenvolvido como parte do portfólio pessoal. Arquitetura limpa com SOLID e Clean Code.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
