'use client';

import { useState } from 'react';
import { FileText, Search, LayoutGrid, List, Clock, Award, Briefcase, GraduationCap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Categorias de certificados — ordenadas do MAIS AVANÇADO ao mais básico
// ---------------------------------------------------------------------------
type CategoryKey =
  | 'formacao_academica'
  | 'mba'
  | 'formacoes'
  | 'python_ds'
  | 'oracle_cloud'
  | 'sql'
  | 'java'
  | 'javascript'
  | 'git'
  | 'html_css'
  | 'fundamentos'
  | 'agile';

interface CertFile {
  id: string;
  name: string;
  /** Caminho relativo dentro de /public/certificados/ */
  path: string;
  /** Se existe um "Verso" correspondente */
  versoPath?: string;
  /** Ano de emissão / conclusão */
  year?: string;
}

interface Category {
  key: CategoryKey;
  label: string;
  folder: string;
  icon: 'award' | 'briefcase' | 'graduation';
  files: CertFile[];
}

// ---------------------------------------------------------------------------
// Dados dos certificados — APENAS frentes (verso disponível via toggle)
// ---------------------------------------------------------------------------
const CATEGORIES: Category[] = [
  {
    key: 'formacao_academica',
    label: 'Formação Acadêmica',
    folder: '12_Formacao_Academica',
    icon: 'graduation',
    files: [
      { id: 'acad-1', name: 'Diploma — Bacharelado em Medicina Veterinária (UNIP)', path: '12_Formacao_Academica/Diploma Medicina Veterinaria.jpg', year: '2013' },
      { id: 'acad-2', name: 'Comprovante de Matrícula — Análise e Desenvolvimento de Sistemas (Estácio)', path: '12_Formacao_Academica/Comprovante Matricula ADS.jpg', year: '2024' },
    ],
  },
  {
    key: 'mba',
    label: 'MBA Eng. Software',
    folder: '11_MBA',
    icon: 'graduation',
    files: [
      { id: 'mba-1', name: 'MBA Engenharia de Software - Diploma', path: '11_MBA/MBA Engenharia de Software - Diploma.jpg', versoPath: '11_MBA/MBA Engenharia de Software - Diploma verso.jpg', year: '2023' },
    ],
  },
  {
    key: 'formacoes',
    label: 'Formações Completas',
    folder: '10_Formacoes_Completas',
    icon: 'award',
    files: [
      { id: 'form-1', name: 'Formação Oracle ONE - Programa Completo', path: '10_Formacoes_Completas/Formacao Oracle ONE Programa Completo - Frente.jpg', year: '2022' },
      { id: 'form-2', name: 'Certificado Maximus Tech', path: '10_Formacoes_Completas/Certificado Maximus - Frente.jpg', versoPath: '10_Formacoes_Completas/Certificado Maximus - Verso.jpg', year: '2022' },
      { id: 'form-3', name: 'Udemy - Certificado Geral', path: '10_Formacoes_Completas/Udemy - Certificado.jpg', year: '2025' },
    ],
  },
  {
    key: 'python_ds',
    label: 'Python & Data Science',
    folder: '08_Python_Data_Science',
    icon: 'award',
    files: [
      { id: 'py-1', name: 'Formação Python Data Science Oracle Analytics ONE', path: '08_Python_Data_Science/Formacao Python Data Science Oracle Analytics ONE - Frente.jpg', versoPath: '08_Python_Data_Science/Formacao Python Data Science Oracle Analytics ONE - Verso.jpg' },
      { id: 'py-2', name: 'Machine Learning — Classificação com Sklearn', path: '08_Python_Data_Science/Machine Learning Classificacao com Sklearn - Frente.jpg', versoPath: '08_Python_Data_Science/Machine Learning Classificacao com Sklearn - Verso.jpg' },
      { id: 'py-3', name: 'Machine Learning — Otimização de Hiperparâmetros', path: '08_Python_Data_Science/Machine Learning Parte 1 Otimizacao Hiperparametros - Frente.jpg', versoPath: '08_Python_Data_Science/Machine Learning Parte 1 Otimizacao Hiperparametros - Verso.jpg' },
      { id: 'py-4', name: 'Machine Learning — Oracle ADS Criação de Modelos', path: '08_Python_Data_Science/Machine Learning Oracle ADS Criacao de Modelos - Frente.jpg', versoPath: '08_Python_Data_Science/Machine Learning Oracle ADS Criacao de Modelos - Verso.jpg' },
      { id: 'py-5', name: 'Data Visualization com Seaborn', path: '08_Python_Data_Science/Data Visualization Seaborn - Frente.jpg', versoPath: '08_Python_Data_Science/Data Visualization Seaborn - Verso.jpg' },
      { id: 'py-6', name: 'Python Pandas — Tratando e Analisando Dados', path: '08_Python_Data_Science/Python Pandas Tratando e Analisando Dados - Frente.jpg', versoPath: '08_Python_Data_Science/Python Pandas Tratando e Analisando Dados - Verso.jpg' },
      { id: 'py-7', name: 'Python Data Science — Funções, Pacotes e Pandas', path: '08_Python_Data_Science/Python Data Science Funcoes Pacotes Pandas - Frente.jpg', versoPath: '08_Python_Data_Science/Python Data Science Funcoes Pacotes Pandas - Verso.jpg' },
      { id: 'py-8', name: 'Python para Data Science', path: '08_Python_Data_Science/Python para Data Science - Frente.jpg', versoPath: '08_Python_Data_Science/Python para Data Science - Verso.jpg' },
    ],
  },
  {
    key: 'oracle_cloud',
    label: 'Oracle Cloud',
    folder: '07_Oracle_Cloud',
    icon: 'award',
    files: [
      { id: 'oci-1', name: 'Formação Oracle Cloud OCI ONE', path: '07_Oracle_Cloud/Formacao Oracle Cloud OCI ONE - Frente.jpg', versoPath: '07_Oracle_Cloud/Formacao Oracle Cloud OCI ONE - Verso.jpg' },
      { id: 'oci-2', name: 'Oracle Cloud OCI — Implantação de Aplicação', path: '07_Oracle_Cloud/Oracle Cloud OCI Implantacao Aplicacao - Frente.jpg', versoPath: '07_Oracle_Cloud/Oracle Cloud OCI Implantacao Aplicacao - Verso.jpg' },
      { id: 'oci-3', name: 'Oracle Cloud OCI — Banco de Dados e Infraestrutura', path: '07_Oracle_Cloud/Oracle Cloud OCI Banco de Dados Infraestrutura - Frente.jpg', versoPath: '07_Oracle_Cloud/Oracle Cloud OCI Banco de Dados Infraestrutura - Verso.jpg' },
      { id: 'oci-4', name: 'Oracle ADS — Análise de Dados na Nuvem', path: '07_Oracle_Cloud/Oracle ADS Analise de Dados na Nuvem - Frente.jpg', versoPath: '07_Oracle_Cloud/Oracle ADS Analise de Dados na Nuvem - Verso.jpg' },
    ],
  },
  {
    key: 'sql',
    label: 'SQL & Banco de Dados',
    folder: '06_SQL_Banco_Dados',
    icon: 'briefcase',
    files: [
      { id: 'sql-0', name: 'Bancos de Dados SQL e NoSQL — Do Básico ao Avançado (52h)', path: '06_SQL_Banco_Dados/Bancos de Dados SQL e NoSQL Basico ao Avancado.jpg' },
      { id: 'sql-1', name: 'Formação SQL MySQL Server Oracle', path: '06_SQL_Banco_Dados/Formacao SQL MySQL Server Oracle - Frente.jpg', versoPath: '06_SQL_Banco_Dados/Formacao SQL MySQL Server Oracle - Verso.jpg' },
      { id: 'sql-2', name: 'SQL Procedures MySQL', path: '06_SQL_Banco_Dados/SQL Procedures MySQL - Frente.jpg', versoPath: '06_SQL_Banco_Dados/SQL Procedures MySQL - Verso.jpg' },
      { id: 'sql-3', name: 'SQL Consultas Avançadas MySQL', path: '06_SQL_Banco_Dados/SQL Consultas Avancadas MySQL - Frente.jpg', versoPath: '06_SQL_Banco_Dados/SQL Consultas Avancadas MySQL - Verso.jpg' },
      { id: 'sql-4', name: 'SQL Comandos DML Manipulação MySQL', path: '06_SQL_Banco_Dados/SQL Comandos DML Manipulacao MySQL - Frente.jpg', versoPath: '06_SQL_Banco_Dados/SQL Comandos DML Manipulacao MySQL - Verso.jpg' },
      { id: 'sql-5', name: 'SQL MySQL — Manipule e Consulte Dados', path: '06_SQL_Banco_Dados/SQL MySQL Manipule e Consulte Dados - Frente.jpg', versoPath: '06_SQL_Banco_Dados/SQL MySQL Manipule e Consulte Dados - Verso.jpg' },
      { id: 'sql-6', name: 'Descubra o SQL', path: '06_SQL_Banco_Dados/Descubra o SQL.jpg' },
    ],
  },
  {
    key: 'java',
    label: 'Java',
    folder: '05_Java',
    icon: 'briefcase',
    files: [
      { id: 'java-1', name: 'Java — Polimorfismo, Herança e Interfaces', path: '05_Java/Java Polimorfismo Heranca Interfaces - Frente.jpg', versoPath: '05_Java/Java Polimorfismo Heranca Interfaces - Verso.jpg' },
      { id: 'java-2', name: 'Java 8 Novidades', path: '05_Java/Java 8 Novidades - Frente.jpg', versoPath: '05_Java/Java 8 Novidades - Verso.jpg' },
      { id: 'java-3', name: 'Java Collections — Listas, Sets e Mapas', path: '05_Java/Java Collections Listas Sets Mapas - Frente.jpg', versoPath: '05_Java/Java Collections Listas Sets Mapas - Verso.jpg' },
      { id: 'java-4', name: 'Java JDBC — Banco de Dados', path: '05_Java/Java JDBC Banco de Dados - Frente.jpg', versoPath: '05_Java/Java JDBC Banco de Dados - Verso.jpg' },
      { id: 'java-5', name: 'Java.IO — Streams, Reader e Writer', path: '05_Java/Java Java.IO Streams Reader Writer - Frente.jpg', versoPath: '05_Java/Java Java.IO Streams Reader Writer - Verso.jpg' },
      { id: 'java-6', name: 'Java.util — Coleções, Wrappers e Lambda', path: '05_Java/Java Java.util Colecoes Wrappers Lambda - Frente.jpg', versoPath: '05_Java/Java Java.util Colecoes Wrappers Lambda - Verso.jpg' },
      { id: 'java-7', name: 'Java.lang — Object e String', path: '05_Java/Java Java.lang Object e String - Frente.jpg', versoPath: '05_Java/Java Java.lang Object e String - Verso.jpg' },
      { id: 'java-8', name: 'Java — Exceções', path: '05_Java/Java Excecoes - Frente.jpg', versoPath: '05_Java/Java Excecoes - Verso.jpg' },
      { id: 'java-9', name: 'Java OO — Orientação a Objetos', path: '05_Java/Java OO Orientacao a Objetos - Frente.jpg', versoPath: '05_Java/Java OO Orientacao a Objetos - Verso.jpg' },
      { id: 'java-10', name: 'Java JRE e JDK', path: '05_Java/Java JRE e JDK - Frente.jpg', versoPath: '05_Java/Java JRE e JDK - Verso.jpg' },
      { id: 'java-11', name: 'Fundamentos de Programação e Design OO', path: '05_Java/Fundamentos Programacao Design OO.jpg' },
      { id: 'java-12', name: 'Java — Aprender em Inglês', path: '05_Java/Java Aprender em Ingles.jpg' },
    ],
  },
  {
    key: 'javascript',
    label: 'JavaScript',
    folder: '04_JavaScript',
    icon: 'briefcase',
    files: [
      { id: 'js-1', name: 'JavaScript — Interfaces e Herança OO', path: '04_JavaScript/JavaScript Interfaces e Heranca OO - Frente.jpg', versoPath: '04_JavaScript/JavaScript Interfaces e Heranca OO - Verso.jpg' },
      { id: 'js-2', name: 'JavaScript — CRUD Assíncrono', path: '04_JavaScript/JavaScript CRUD Assincrono - Frente.jpg' },
      { id: 'js-3', name: 'JavaScript — OO Programando', path: '04_JavaScript/JavaScript OO Programando - Frente.jpg', versoPath: '04_JavaScript/JavaScript OO Programando - Verso.jpg' },
      { id: 'js-4', name: 'JavaScript — Validação de Formulários', path: '04_JavaScript/JavaScript Validacao de Formularios - Frente.jpg' },
      { id: 'js-5', name: 'JavaScript — Armazenando Dados no Navegador', path: '04_JavaScript/JavaScript Armazenando Dados Navegador - Frente.jpg', versoPath: '04_JavaScript/JavaScript Armazenando Dados Navegador - Verso.jpg' },
      { id: 'js-6', name: 'JavaScript — Manipulação do DOM', path: '04_JavaScript/JavaScript Manipulacao DOM - Frente.jpg' },
      { id: 'js-7', name: 'JavaScript — Explorando a Linguagem', path: '04_JavaScript/JavaScript Explorando a Linguagem - Frente.jpg', versoPath: '04_JavaScript/JavaScript Explorando a Linguagem - Verso.jpg' },
      { id: 'js-8', name: 'JavaScript — Programando na Web', path: '04_JavaScript/JavaScript Programando na Web - Frente.jpg' },
      { id: 'js-9', name: 'JavaScript — Formação Básica', path: '04_JavaScript/JavaScript Formacao Basica.jpg' },
    ],
  },
  {
    key: 'git',
    label: 'Git & Versionamento',
    folder: '03_Git_Versionamento',
    icon: 'briefcase',
    files: [
      { id: 'git-1', name: 'Git e GitHub', path: '03_Git_Versionamento/Git e GitHub - Frente.jpg' },
      { id: 'git-2', name: 'Git e GitHub — Formação Básica', path: '03_Git_Versionamento/Git e GitHub Formacao Basica.jpg' },
    ],
  },
  {
    key: 'html_css',
    label: 'HTML & CSS',
    folder: '02_HTML_CSS',
    icon: 'briefcase',
    files: [
      { id: 'css-1', name: 'Layouts Responsivos', path: '02_HTML_CSS/Layouts Responsivos - Frente.jpg' },
      { id: 'css-2', name: 'Arquitetura CSS', path: '02_HTML_CSS/Arquitetura CSS - Frente.jpg' },
      { id: 'css-3', name: 'CSS Grid', path: '02_HTML_CSS/CSS Grid - Frente.jpg' },
      { id: 'css-4', name: 'CSS Flexbox Layout', path: '02_HTML_CSS/CSS Flexbox Layout - Frente.jpg' },
      { id: 'css-5', name: 'Acessibilidade Web', path: '02_HTML_CSS/Acessibilidade Web - Frente.jpg' },
      { id: 'css-6', name: 'HTML5 e CSS3 — Parte 4', path: '02_HTML_CSS/HTML5 e CSS3 Parte 4 - Frente.jpg' },
      { id: 'css-7', name: 'HTML5 e CSS3 — Parte 3', path: '02_HTML_CSS/HTML5 e CSS3 Parte 3 - Frente.jpg' },
      { id: 'css-8', name: 'HTML5 e CSS3 — Parte 2', path: '02_HTML_CSS/HTML5 e CSS3 Parte 2 - Frente.jpg' },
      { id: 'css-9', name: 'HTML5 e CSS3 — Parte 1', path: '02_HTML_CSS/HTML5 e CSS3 Parte 1 - Frente.jpg' },
      { id: 'css-10', name: 'HTML — Formação Básica', path: '02_HTML_CSS/HTML Formacao Basica.jpg' },
      { id: 'css-11', name: 'Descubra o CSS', path: '02_HTML_CSS/Descubra o CSS.jpg' },
      { id: 'css-12', name: 'Discover Conectar — Certificado 1', path: '02_HTML_CSS/Discover Conectar - Certificado 1.jpg' },
      { id: 'css-13', name: 'Discover Conectar — Certificado 2', path: '02_HTML_CSS/Discover Conectar - Certificado 2.jpg' },
    ],
  },
  {
    key: 'fundamentos',
    label: 'Fundamentos',
    folder: '01_Fundamentos',
    icon: 'briefcase',
    files: [
      { id: 'fund-1', name: 'Expressões Regulares', path: '01_Fundamentos/Expressoes Regulares - Frente.jpg', versoPath: '01_Fundamentos/Expressoes Regulares - Verso.jpg' },
      { id: 'fund-2', name: 'Lógica de Programação II com Jogos', path: '01_Fundamentos/Logica de Programacao II com Jogos - Frente.jpg' },
      { id: 'fund-3', name: 'Lógica de Programação I', path: '01_Fundamentos/Logica de Programacao I - Frente.jpg' },
      { id: 'fund-4', name: 'Algoritmo 40 Horas', path: '01_Fundamentos/Algoritmo 40 Horas - Certificado.jpg' },
    ],
  },
  {
    key: 'agile',
    label: 'Agile & Soft Skills',
    folder: '09_Agile_Soft_Skills',
    icon: 'briefcase',
    files: [
      { id: 'agile-1', name: 'Formação Business Agility ONE', path: '09_Agile_Soft_Skills/Formacao Business Agility ONE - Frente.jpg' },
      { id: 'agile-2', name: 'Formação Empreendedorismo ONE', path: '09_Agile_Soft_Skills/Formacao Empreendedorismo ONE - Frente.jpg' },
      { id: 'agile-3', name: 'Formação Desenvolvimento Pessoal ONE', path: '09_Agile_Soft_Skills/Formacao Desenvolvimento Pessoal ONE - Frente.jpg' },
      { id: 'agile-4', name: 'Lean Startup', path: '09_Agile_Soft_Skills/Lean Startup - Frente.jpg' },
      { id: 'agile-5', name: 'Empreendedorismo — Da Ideia ao Plano de Negócios', path: '09_Agile_Soft_Skills/Empreendedorismo Ideia ao Plano de Negocios - Frente.jpg', versoPath: '09_Agile_Soft_Skills/Empreendedorismo Ideia ao Plano de Negocios - Verso.jpg' },
      { id: 'agile-6', name: 'Empreendedorismo — Abrindo Empresa', path: '09_Agile_Soft_Skills/Empreendedorismo Abrindo Empresa - Frente.jpg' },
      { id: 'agile-7', name: 'Hábitos na Liderança', path: '09_Agile_Soft_Skills/Habitos na Lideranca - Frente.jpg' },
      { id: 'agile-8', name: 'Hábitos — Produtividade e Metas Pessoais', path: '09_Agile_Soft_Skills/Habitos Produtividade Metas Pessoais - Frente.jpg' },
      { id: 'agile-9', name: 'Fundamentos de Agilidade', path: '09_Agile_Soft_Skills/Fundamentos Agilidade - Frente.jpg' },
      { id: 'agile-10', name: 'Certificado Evento Agile', path: '09_Agile_Soft_Skills/Certificado Evento Agile - Frente.jpg' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Ícone da sidebar por tipo
// ---------------------------------------------------------------------------
const SIDEBAR_ICONS: Record<Category['icon'], typeof Award> = {
  award: Award,
  briefcase: Briefcase,
  graduation: GraduationCap,
};

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------
export const FinderApp = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('formacao_academica');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<CertFile | null>(null);
  const [showVerso, setShowVerso] = useState(false);

  const activeData = CATEGORIES.find((c) => c.key === activeCategory)!;

  // Filtro de busca
  const filteredFiles = searchQuery
    ? activeData.files.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeData.files;

  // Total de certificados
  const totalCerts = CATEGORIES.reduce((sum, cat) => sum + cat.files.length, 0);

  return (
    <div className="flex flex-col md:flex-row h-full w-full text-white/90" style={{ background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(40px) saturate(180%)' }}>
      {/* Sidebar */}
      <div className="w-full max-h-[35vh] md:max-h-none md:w-[220px] flex-shrink-0 pt-4 overflow-y-auto" style={{ background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(40px) saturate(180%)', borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="px-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
          Certificados ({totalCerts})
        </div>
        <nav className="flex flex-col gap-0.5 px-2 pb-4">
          {CATEGORIES.map((cat) => {
            const IconComp = SIDEBAR_ICONS[cat.icon];
            return (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setSearchQuery(''); }}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-blue-500/90 text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <IconComp
                  size={16}
                  className={activeCategory === cat.key ? 'text-white' : 'text-blue-400'}
                />
                <span className="truncate">{cat.label}</span>
                <span className="ml-auto text-[10px] text-white/40">{cat.files.length}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex h-12 items-center justify-between px-4" style={{ background: 'rgba(28,28,30,0.72)', backdropFilter: 'blur(40px) saturate(180%)', borderBottom: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold tracking-wide">{activeData.label}</h2>
            <span className="text-[10px] text-white/40">
              {filteredFiles.length} {filteredFiles.length === 1 ? 'certificado' : 'certificados'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-md" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'} rounded-l-md`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'} rounded-r-md`}
              >
                <List size={14} />
              </button>
            </div>
            <div className="flex items-center rounded-[10px] px-2 py-1 focus-within:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Search size={14} className="text-white/40" />
              <input
                type="text"
                placeholder="Buscar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 w-20 md:w-28 bg-transparent text-sm outline-none placeholder:text-white/30"
              />
            </div>
          </div>
        </div>

        {/* Files Area */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4">
          {filteredFiles.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-white/30">
              Nenhum certificado encontrado
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => { setPreviewFile(file); setShowVerso(false); }}
                  className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-white/10"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <img
                      src={`/certificados/${file.path}`}
                      alt={file.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="w-full truncate text-center text-[11px] font-medium text-white/80">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center pb-2 text-[10px] font-semibold uppercase text-white/40" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex-1 px-4">Nome</div>
                <div className="hidden md:block w-20 text-right pr-2">Ano</div>
                <div className="hidden md:block w-28 text-right pr-4">Verso</div>
              </div>
              <div className="mt-1 flex flex-col gap-0.5">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => { setPreviewFile(file); setShowVerso(false); }}
                    className="flex cursor-pointer items-center rounded-md py-2 hover:bg-white/10"
                  >
                    <div className="flex flex-1 items-center gap-3 px-4">
                      <FileText size={16} className="text-red-400 fill-red-500/20 flex-shrink-0" />
                      <span className="truncate text-sm font-medium text-white/90">{file.name}</span>
                    </div>
                    <div className="hidden md:block w-20 text-right text-xs text-white/40 pr-2">
                      {file.year ?? '—'}
                    </div>
                    <div className="hidden md:block w-28 text-right text-xs text-white/40 pr-4">
                      {file.versoPath ? '✓ Disponível' : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal — abre ao clicar num certificado */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex max-h-[90%] max-w-[95%] md:max-w-[80%] flex-col items-center rounded-2xl p-3 md:p-4" style={{ background: 'rgba(22,22,26,0.85)', backdropFilter: 'blur(52px) saturate(180%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.06)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do Modal */}
              <div className="mb-3 flex w-full items-center justify-between">
                <div className="flex flex-col gap-0.5 pr-4 min-w-0">
                  <h3 className="truncate text-xs md:text-sm font-semibold text-white/80">
                    {previewFile.name}
                  </h3>
                  {previewFile.year && (
                    <span className="text-[10px] text-white/40 flex items-center gap-1">
                      <Clock size={10} /> Emitido em {previewFile.year}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {previewFile.versoPath && (
                    <button
                      onClick={() => setShowVerso(!showVerso)}
                      className={`rounded-[8px] px-3 py-1 text-[11px] font-semibold transition-colors ${
                        showVerso
                          ? 'bg-blue-500 text-white'
                          : 'text-white/60 hover:text-white/80'
                      }`}
                      style={!showVerso ? { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' } : {}}
                    >
                      {showVerso ? 'Frente' : 'Verso'}
                    </button>
                  )}
                  <button
                    onClick={() => setPreviewFile(null)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Imagem do Certificado */}
              <div className="flex-1 overflow-auto">
                <img
                  src={`/certificados/${showVerso && previewFile.versoPath ? previewFile.versoPath : previewFile.path}`}
                  alt={previewFile.name}
                  className="max-h-[70vh] w-auto rounded-lg object-contain shadow-lg"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};