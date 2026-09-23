import React, { useState, useEffect } from 'react';
import { ProjectData } from '../types';
import { fetchUserProjects, deleteProject, saveProject } from '../firebase/firestoreService';
import { exportProjectZip, downloadStandaloneHtml } from '../exporter/generateZip';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import { StyleCarousel } from '../components/StyleCarousel';
import { StyleSelectorModal } from '../designs/StyleSelectorModal';
import { DesignMeta } from '../types/designs';
import {
  Plus,
  Search,
  Edit3,
  Eye,
  Trash2,
  Download,
  Calendar,
  Sparkles,
  X,
  Layers,
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface MyProjectsProps {
  userId: string;
  onEditProject: (project: ProjectData) => void;
  onNewProject: (design?: DesignMeta) => void;
}

export const MyProjects: React.FC<MyProjectsProps> = ({
  userId,
  onEditProject,
  onNewProject
}) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);

  // Preview & Delete Modals
  const [previewProject, setPreviewProject] = useState<ProjectData | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<ProjectData | null>(null);
  const [renameProject, setRenameProject] = useState<ProjectData | null>(null);
  const [renameInput, setRenameInput] = useState('');
  const [exportingId, setExportingId] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchUserProjects(userId);
      setProjects(data);
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadProjects();
  }, [userId]);

  const handleConfirmDelete = async () => {
    if (!deleteConfirmProject) return;
    try {
      await deleteProject(userId, deleteConfirmProject.projectId);
      setDeleteConfirmProject(null);
      await loadProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Não foi possível excluir o projeto.');
    }
  };

  const handleConfirmRename = async () => {
    if (!renameProject || !renameInput.trim()) return;
    try {
      const updated = { ...renameProject, nome: renameInput.trim(), updatedAt: Date.now() };
      await saveProject(updated);
      setRenameProject(null);
      await loadProjects();
    } catch (err) {
      console.error('Error renaming:', err);
      alert('Erro ao renomear.');
    }
  };

  const handleDirectDownload = async (p: ProjectData) => {
    setExportingId(p.projectId);
    try {
      await exportProjectZip(p);
    } catch (err) {
      console.error('Error downloading:', err);
    } finally {
      setExportingId(null);
    }
  };

  const filteredProjects = projects.filter((p) => {
    return (
      p.nome?.toLowerCase().includes(search.toLowerCase()) ||
      p.identity?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-12 animate-fadeIn pb-16">

      {/* 1. TOPO DA NOVA HOME */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 p-6 sm:p-12 shadow-2xl bg-gradient-to-b from-[#0F121E] via-[#090B14] to-[#06070B] text-center sm:text-left">
        {/* Atmosphere Glow */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles size={14} className="text-amber-400" />
            <span>BIO FÁCIL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Crie uma presença digital que tenha a sua identidade.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Escolha um estilo, personalize suas informações e publique seu biosite.
          </p>

          {/* Botão Principal: + CRIAR BIOSITE */}
          <div className="pt-3 flex justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => setIsStyleModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm flex items-center gap-2.5 shadow-[0_4px_25px_rgba(245,158,11,0.35)] active:scale-95 transition-all cursor-pointer"
            >
              <Plus size={20} className="text-slate-950 stroke-[3]" />
              <span>CRIAR BIOSITE</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MEUS PROJETOS (Mostra projetos recentes do cliente se ele já criou algum) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              <span>MEUS PROJETOS</span>
              {projects.length > 0 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {projects.length}
                </span>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {projects.length > 0 ? 'Seus biosites criados prontos para edição e download' : 'Você ainda não possui projetos salvos'}
            </p>
          </div>

          {projects.length > 2 && (
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar projeto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-44 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0A0C14] text-center space-y-4 max-w-lg mx-auto shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <Sparkles size={26} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-white">Nenhum biosite criado ainda</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Escolha um estilo visual abaixo e crie seu primeiro biosite com alta direção de arte.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsStyleModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase cursor-pointer transition-all active:scale-95"
            >
              + Começar Agora
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((p) => (
              <div
                key={p.projectId}
                className="p-5 rounded-2xl border border-white/10 hover:border-amber-400/50 bg-[#0C0F1A] transition-all duration-300 flex flex-col justify-between group shadow-lg space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase text-slate-400">
                      {p.designConfig?.designId || p.templateId || 'Biosite'}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(p.updatedAt || p.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors truncate">
                    {p.nome || p.identity?.name || 'Meu Biosite'}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {p.identity?.headline || p.identity?.slogan || p.identity?.description || 'Biosite personalizado'}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onEditProject(p)}
                      className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                    >
                      <Edit3 size={12} />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewProject(p)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                      title="Visualizar biosite"
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      type="button"
                      disabled={exportingId === p.projectId}
                      onClick={() => handleDirectDownload(p)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-400 border border-white/5 transition-colors cursor-pointer"
                      title="Baixar ZIP do biosite"
                    >
                      <Download size={15} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmProject(p)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. EXPLORE OS ESTILOS (Carrossel dos estilos disponíveis) */}
      <section className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
              <Layers size={22} className="text-amber-400" />
              <span>EXPLORE OS ESTILOS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Deslize e escolha a direção de arte perfeita para o seu biosite
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsStyleModalOpen(true)}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 py-1.5 px-3 rounded-xl border border-amber-400/20 bg-amber-500/5 hover:bg-amber-500/15 transition-all cursor-pointer"
          >
            Ver Grade Completa →
          </button>
        </div>

        {/* Carrossel Automático de Estilos */}
        <StyleCarousel
          onSelectDesign={(design) => onNewProject(design)}
          onPreviewDesign={(design) => {
            setIsStyleModalOpen(true);
          }}
        />
      </section>

      {/* Modal Seletor de Estilos */}
      <StyleSelectorModal
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
        onSelectDesign={(design) => {
          setIsStyleModalOpen(false);
          onNewProject(design);
        }}
      />

      {/* Modal de Preview do Projeto Salvo */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md h-[90vh] bg-[#07080D] border border-white/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-3 border-b border-white/10 flex items-center justify-between bg-[#0A0C14] shrink-0">
              <span className="text-xs font-bold text-white truncate max-w-[200px]">
                {previewProject.nome}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const p = previewProject;
                    setPreviewProject(null);
                    onEditProject(p);
                  }}
                  className="py-1 px-3 rounded-lg bg-amber-500 text-slate-950 font-black text-xs cursor-pointer"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <TemplateRenderer project={previewProject} viewport="mobile" />
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Exclusão */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-sm w-full p-6 rounded-3xl bg-[#0F121C] border border-white/15 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Excluir biosite?</h3>
              <p className="text-xs text-slate-400">
                Esta ação não pode ser desfeita. O projeto "{deleteConfirmProject.nome}" será apagado.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/5 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black cursor-pointer"
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
