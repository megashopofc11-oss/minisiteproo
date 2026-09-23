import React, { useState, useMemo, useRef } from 'react';
import { V2DesignMeta, V2Tone } from '../types';
import { V2_DESIGNS, getV2DesignById } from '../registry/templateRegistryV2';
import { V2Hero } from '../components/V2Hero';
import { StreamingRail } from '../components/StreamingRail';
import { StreamingCoverCard } from '../components/StreamingCoverCard';
import { PreviewModalV2 } from '../components/PreviewModalV2';
import {
  Sparkles,
  Search,
  FolderKanban,
  MoreHorizontal,
  X,
  LogOut,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface V2HomeProps {
  onSelectDesign: (design: V2DesignMeta) => void;
  onGoToProjects: () => void;
  onGoToAdmin?: () => void;
  isAdmin?: boolean;
  userName?: string;
  onLogout: () => void;
  hasProjects?: boolean;
}

type FilterTag = 'todos' | 'claros' | 'escuros' | 'editoriais' | 'fotograficos' | 'criativos' | 'minimalistas';

export const V2Home: React.FC<V2HomeProps> = ({
  onSelectDesign,
  onGoToProjects,
  onGoToAdmin,
  isAdmin,
  userName,
  onLogout,
  hasProjects
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTag>('todos');
  const [previewDesign, setPreviewDesign] = useState<V2DesignMeta | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const railsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToRails = () => {
    railsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered designs for search / filter chip mode
  const isFiltering = searchQuery.trim().length > 0 || activeFilter !== 'todos';

  const filteredDesigns = useMemo(() => {
    return V2_DESIGNS.filter((d) => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesTagline = d.tagline.toLowerCase().includes(q);
        const matchesSegment = d.demoData.segment.toLowerCase().includes(q);
        const matchesTags = d.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesSegment && !matchesTags) {
          return false;
        }
      }

      // Filter chips
      if (activeFilter === 'claros') return d.tone === 'claro';
      if (activeFilter === 'escuros') return d.tone === 'escuro';
      if (activeFilter === 'editoriais') return d.family === 'editorial';
      if (activeFilter === 'fotograficos') return d.family === 'portfolio' || d.family === 'cinematic';
      if (activeFilter === 'criativos') return d.family === 'graphic' || d.family === 'poster' || d.family === 'bento';
      if (activeFilter === 'minimalistas') return d.family === 'minimal';

      return true;
    });
  }, [searchQuery, activeFilter]);

  // Rails categorized by discovery vibe
  const rails = useMemo(() => {
    return {
      destaques: V2_DESIGNS.filter((d) => d.rails.includes('destaques')),
      impacto: V2_DESIGNS.filter((d) => d.rails.includes('impacto') || d.family === 'cinematic' || d.family === 'graphic'),
      elegantes: V2_DESIGNS.filter((d) => d.rails.includes('elegantes') || d.tone === 'claro' || d.family === 'editorial'),
      fotografia: V2_DESIGNS.filter((d) => d.rails.includes('fotografia') || d.family === 'portfolio'),
      ousados: V2_DESIGNS.filter((d) => d.rails.includes('ousados') || d.family === 'poster' || d.family === 'bento'),
      locais: V2_DESIGNS.filter((d) => d.rails.includes('locais') || d.family === 'story' || d.family === 'personal')
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Minimal Top Navbar */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/5 bg-[#090A10]/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => {
            setSearchQuery('');
            setActiveFilter('todos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Sparkles size={16} className="text-slate-950 stroke-[2.5]" />
          </div>
          <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
            BIO <span className="text-amber-400">FÁCIL</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>

        {/* Center: Quick Search Bar */}
        <div className="flex-1 max-w-md mx-4 sm:mx-8 hidden md:block">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por estilo, característica ou segmento…"
              className="w-full h-10 pl-10 pr-9 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onGoToProjects}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all cursor-pointer"
          >
            <FolderKanban size={14} className="text-amber-400" />
            <span>Meus Projetos</span>
          </button>

          {/* Menu Dropdown Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Menu de Opções"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0E111B] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <div className="text-xs font-bold text-white truncate">{userName || 'Usuário'}</div>
                  <div className="text-[10px] text-amber-400 font-semibold uppercase">
                    {isAdmin ? 'Administrador' : 'Acesso Liberado'}
                  </div>
                </div>

                {isAdmin && onGoToAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onGoToAdmin();
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-indigo-300 hover:bg-indigo-600/20 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShieldCheck size={14} />
                    <span>Painel Administrativo</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onGoToProjects();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FolderKanban size={14} />
                  <span>Meus Biosites</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Sair da Conta</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Inline Search */}
      <div className="md:hidden px-4 pt-3">
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por estilo, característica ou segmento…"
            className="w-full h-10 pl-10 pr-9 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* 2. Platform Hero */}
      {!isFiltering && (
        <V2Hero
          onExploreClick={scrollToRails}
          onProjectsClick={onGoToProjects}
          featuredDesigns={[V2_DESIGNS[0], V2_DESIGNS[1], V2_DESIGNS[2]]}
          onSelectDesign={(design) => setPreviewDesign(design)}
        />
      )}

      {/* 3. Filter Chips (Zero-Pill Discipline) */}
      <div ref={railsSectionRef} className="px-4 sm:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
            Filtros:
          </span>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'claros', label: 'Claros & Marfim' },
            { id: 'escuros', label: 'Escuros & Noturnos' },
            { id: 'editoriais', label: 'Editoriais' },
            { id: 'fotograficos', label: 'Fotográficos' },
            { id: 'criativos', label: 'Criativos & Bento' },
            { id: 'minimalistas', label: 'Minimalistas' }
          ].map((chip) => {
            const active = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id as FilterTag)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                    : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Content Area: Search / Filter Mode OR Streaming Rails */}
      <main className="flex-1 pb-16">
        {isFiltering ? (
          /* Filter / Search Results Grid */
          <div className="px-4 sm:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                Resultados ({filteredDesigns.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('todos');
                }}
                className="text-xs text-amber-400 font-bold hover:underline"
              >
                Limpar filtros
              </button>
            </div>

            {filteredDesigns.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-sm text-slate-400">Nenhum estilo encontrado para essa busca.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('todos');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Ver Todos os Estilos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDesigns.map((design) => (
                  <div key={design.id} className="flex justify-center">
                    <StreamingCoverCard
                      design={design}
                      onPreview={(d) => setPreviewDesign(d)}
                      onSelect={(d) => onSelectDesign(d)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Streaming Rails (Netflix/Spotify Discovery Style) */
          <div className="pt-6">
            <StreamingRail
              title="Destaques para Você"
              subtitle="Os designs mais admirados e com maior impacto de conversão"
              designs={rails.destaques}
              onPreview={(d) => setPreviewDesign(d)}
              onSelect={(d) => onSelectDesign(d)}
            />

            <StreamingRail
              title="Impacto Visual & Alta Densidade"
              subtitle="Fotografia marcante, profundidade e composições de peso"
              designs={rails.impacto}
              onPreview={(d) => setPreviewDesign(d)}
              onSelect={(d) => onSelectDesign(d)}
            />

            <StreamingRail
              title="Elegantes & Minimalistas"
              subtitle="Fundos claros, tipografia refinada e espaço negativo generoso"
              designs={rails.elegantes}
              onPreview={(d) => setPreviewDesign(d)}
              onSelect={(d) => onSelectDesign(d)}
            />

            <StreamingRail
              title="Fotografia em Destaque"
              subtitle="Projetos pensados para valorizar suas melhores fotos e trabalhos"
              designs={rails.fotografia}
              onPreview={(d) => setPreviewDesign(d)}
              onSelect={(d) => onSelectDesign(d)}
            />

            <StreamingRail
              title="Ousados & Criativos"
              subtitle="Bento assimétrico, posters monumentais e contrastes intensos"
              designs={rails.ousados}
              onPreview={(d) => setPreviewDesign(d)}
              onSelect={(d) => onSelectDesign(d)}
            />

            <StreamingRail
              title="Negócios Locais & Profissionais"
              subtitle="Autoridade pessoal, jornadas em etapas e conversão direta"
              designs={rails.locais}
              onPreview={(d) => setPreviewDesign(d)}
              onSelect={(d) => onSelectDesign(d)}
            />
          </div>
        )}
      </main>

      {/* 5. Preview Modal V2 (Iframe Isolated) */}
      {previewDesign && (
        <PreviewModalV2
          design={previewDesign}
          onClose={() => setPreviewDesign(null)}
          onUseDesign={(d) => {
            setPreviewDesign(null);
            onSelectDesign(d);
          }}
        />
      )}
    </div>
  );
};
