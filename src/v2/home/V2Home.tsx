import React, { useState, useEffect, useMemo } from 'react';
import { BioFacilTemplate, INITIAL_NICHES } from '../../types/biofacil';
import { fetchPublishedTemplates } from '../../firebase/firestoreService';
import {
  Sparkles,
  Search,
  FolderKanban,
  Eye,
  Edit3,
  ShieldCheck,
  LogOut,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface V2HomeProps {
  onSelectTemplate: (template: BioFacilTemplate) => void;
  onGoToProjects: () => void;
  onGoToAdmin?: () => void;
  isAdmin?: boolean;
  userName?: string;
  onLogout: () => void;
  hasProjects?: boolean;
}

export const V2Home: React.FC<V2HomeProps> = ({
  onSelectTemplate,
  onGoToProjects,
  onGoToAdmin,
  isAdmin,
  userName,
  onLogout,
  hasProjects
}) => {
  const [templates, setTemplates] = useState<BioFacilTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNiche, setActiveNiche] = useState<string>('todos');
  const [previewTemplate, setPreviewTemplate] = useState<BioFacilTemplate | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchPublishedTemplates()
      .then((data) => {
        if (isMounted) {
          setTemplates(data || []);
        }
      })
      .catch((err) => {
        console.error('Error fetching published templates:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available niches dynamically from published templates
  const availableNiches = useMemo(() => {
    const presentCategories = new Set(templates.map((t) => t.categoryId.toLowerCase()));
    return INITIAL_NICHES.filter((n) => presentCategories.has(n.id.toLowerCase()));
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      if (activeNiche !== 'todos' && t.categoryId.toLowerCase() !== activeNiche.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = t.name.toLowerCase().includes(q);
        const matchCat = (t.categoryName || t.categoryId).toLowerCase().includes(q);
        if (!matchName && !matchCat) return false;
      }
      return true;
    });
  }, [templates, activeNiche, searchQuery]);

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* 1. Minimal Top Navbar */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/5 bg-[#090A10]/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-amber-500/20">
            BF
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
              BIO FÁCIL
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                PRO
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {hasProjects && (
            <button
              type="button"
              onClick={onGoToProjects}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-colors cursor-pointer"
            >
              <FolderKanban size={14} className="text-amber-400" />
              <span>Meus Projetos</span>
            </button>
          )}

          {isAdmin && onGoToAdmin && (
            <button
              type="button"
              onClick={onGoToAdmin}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-xs font-bold text-purple-300 border border-purple-500/30 transition-colors cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>Painel Admin</span>
            </button>
          )}

          <button
            type="button"
            onClick={onLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="px-4 sm:px-8 pt-12 pb-8 max-w-6xl mx-auto w-full text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          <span>Modelos Exclusivos Bio Fácil</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Escolha seu modelo e personalize <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            em poucos minutos.
          </span>
        </h1>

        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Designs profissionais com direção de arte completa. Escolha, personalize seus textos e fotos, e baixe seu site pronto para publicação.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por segmento ou estilo..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Dynamic Category Chips (only categories with published models) */}
        {availableNiches.length > 0 && (
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            <button
              type="button"
              onClick={() => setActiveNiche('todos')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeNiche === 'todos'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Todos
            </button>
            {availableNiches.map((nicho) => (
              <button
                key={nicho.id}
                type="button"
                onClick={() => setActiveNiche(nicho.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeNiche === nicho.id
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {nicho.name}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Catalog Body */}
      <main className="flex-1 px-4 sm:px-8 pb-16 max-w-6xl mx-auto w-full">
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Carregando catálogo...</p>
          </div>
        ) : templates.length === 0 ? (
          /* Exact required empty state when 0 published models exist */
          <div className="py-20 text-center max-w-lg mx-auto space-y-5 rounded-3xl border border-white/5 bg-[#0A0C14] p-8 sm:p-12 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/5">
              <Sparkles size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
                NOVOS MODELOS ESTÃO CHEGANDO
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Nossa biblioteca está sendo preparada com novas experiências profissionais.
              </p>
            </div>

            {isAdmin && onGoToAdmin && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGoToAdmin}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                >
                  <ShieldCheck size={16} />
                  <span>Cadastrar Primeiro Modelo no Painel Admin</span>
                </button>
              </div>
            )}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-bold text-white">Nenhum modelo encontrado com esses filtros.</p>
            <p className="text-xs text-slate-500">Tente buscar por outro termo ou selecione "Todos".</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.templateId}
                className="group rounded-3xl border border-white/10 bg-[#0E111C] overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-400/5"
              >
                {/* Thumbnail */}
                <div className="aspect-[16/10] bg-slate-950 relative overflow-hidden">
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E111C] via-transparent to-black/30"></div>

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                      {template.categoryName || template.categoryId}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-amber-300 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {template.biofacilSchema?.tagline || `${template.biofacilSchema?.fields?.length || 0} seções e campos personalizáveis`}
                    </p>
                  </div>

                  {/* Customer Actions ONLY: VISUALIZAR and PERSONALIZAR (URL is never shown!) */}
                  <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(template)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>VISUALIZAR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectTemplate(template)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md shadow-amber-400/20 transition-all cursor-pointer"
                    >
                      <Edit3 size={14} />
                      <span>PERSONALIZAR</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. Modal de Visualização Isolada (Iframe) */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                  {previewTemplate.name}
                </h3>
                <span className="text-[11px] text-amber-400 font-mono">
                  {previewTemplate.categoryName || previewTemplate.categoryId}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const t = previewTemplate;
                  setPreviewTemplate(null);
                  onSelectTemplate(t);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                <Edit3 size={14} />
                <span>USAR ESTE MODELO</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 rounded-2xl overflow-hidden mt-3 border border-white/10 bg-white">
            <iframe
              srcDoc={previewTemplate.htmlContent || ''}
              title={previewTemplate.name}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
};
