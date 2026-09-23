import React, { useState, useEffect } from 'react';
import { ProjectData, NichoId } from '../types';
import { fetchUserProjects, deleteProject, duplicateProject, saveProject } from '../firebase/firestoreService';
import { exportProjectZip, downloadStandaloneHtml } from '../exporter/generateZip';
import { NICHOS_LIST } from '../templates/data';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import { NicheIcon3D } from '../components/NicheIcon3D';
import { NicheCarousel } from '../components/NicheCarousel';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Download,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  Check,
  AlertTriangle,
  Flame,
  ArrowRight,
  Shield,
  Smartphone,
  ChevronRight,
  Layers
} from 'lucide-react';

interface MyProjectsProps {
  userId: string;
  onEditProject: (project: ProjectData) => void;
  onNewProject: (nichoId?: NichoId) => void;
}

export const MyProjects: React.FC<MyProjectsProps> = ({
  userId,
  onEditProject,
  onNewProject
}) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNicho, setSelectedNicho] = useState<string>('todos');

  // Modal states
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
    loadProjects();
  }, [userId]);

  const handleDuplicate = async (p: ProjectData) => {
    try {
      await duplicateProject(userId, p);
      await loadProjects();
    } catch (err) {
      console.error('Error duplicating project:', err);
      alert('Não foi possível duplicar o projeto.');
    }
  };

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
    const matchesSearch =
      p.nome?.toLowerCase().includes(search.toLowerCase()) ||
      p.identity?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesNicho = selectedNicho === 'todos' || p.nicho === selectedNicho;
    return matchesSearch && matchesNicho;
  });

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      {/* 1. HERO RECONSTRUÍDO (Requisito: Crie Presença. Não Apenas Links) */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 p-6 sm:p-12 shadow-2xl bg-gradient-to-br from-[#0E111C] via-[#090B14] to-[#05060A]">
        {/* Cinematic Background Lighting */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles size={14} className="text-amber-400" />
            BIO FÁCIL • CRIE PRESENÇA. NÃO APENAS LINKS.
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] uppercase">
            CRIE PRESENÇA. <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              NÃO APENAS LINKS.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Biosites profissionais criados para transformar uma simples página em uma verdadeira presença digital:
            design gráfico autoral, fotografia protagonista, iluminação de estúdio e conversão direta via WhatsApp.
          </p>

          {/* Action CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onNewProject()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              <Plus size={18} className="text-slate-950 stroke-[3]" />
              <span>CRIAR NOVO BIOSITE</span>
            </button>
          </div>
        </div>

        {/* 4 Pilares de Excelência (Sem contagens técnicas de modelos) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8 mt-8 border-t border-white/10 relative z-10">
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-amber-400 font-black block mb-0.5">DIREÇÃO DE ARTE</span>
            <h4 className="text-xs sm:text-sm font-black text-white">Design Publicitário</h4>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-amber-400 font-black block mb-0.5">FOTOGRAFIA</span>
            <h4 className="text-xs sm:text-sm font-black text-white">Recortes & Protagonismo</h4>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-amber-400 font-black block mb-0.5">INDEPENDÊNCIA</span>
            <h4 className="text-xs sm:text-sm font-black text-white">Zero Mensalidade</h4>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-amber-400 font-black block mb-0.5">ALTA PERFORMANCE</span>
            <h4 className="text-xs sm:text-sm font-black text-white">Mobile First & Veloz</h4>
          </div>
        </div>
      </div>

      {/* 2. ESCOLHA UMA EXPERIÊNCIA (CARROSSEL AUTOMÁTICO INFINITO) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <Layers size={20} className="text-amber-400" />
              <span>ESCOLHA UMA EXPERIÊNCIA</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Deslize e toque em qualquer coleção para abrir a galeria de biosites
            </p>
          </div>
          <button
            onClick={() => onNewProject()}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer py-1 px-3 rounded-lg hover:bg-white/5"
          >
            <span>Ver Todos</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Carrossel Horizontal Infinito */}
        <NicheCarousel nichos={NICHOS_LIST} onSelectNicho={(nichoId) => onNewProject(nichoId)} />
      </div>

      {/* 3. SEUS BIOSITES RECENTES (Requisito 3) */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
              <span>Seus Biosites Recentes</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Gerencie, edite e exporte seus biosites criados
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              type="text"
              placeholder="Buscar pelo nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#0B0D17] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <Sparkles size={28} />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Nenhum biosite criado ainda</h3>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Escolha uma das 10 coleções exclusivas e monte seu primeiro biosite de alta conversão em minutos!
            </p>
            <button
              onClick={() => onNewProject()}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer"
            >
              <Plus size={16} /> Explorar Modelos & Começar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => {
              const nichoData = NICHOS_LIST.find((n) => n.id === proj.nicho);
              const thumbUrl = proj.identity?.bannerUrl || proj.identity?.avatarUrl || proj.photos?.[0]?.url;

              return (
                <div
                  key={proj.projectId}
                  className="group relative bg-[#0B0D17] border border-white/10 hover:border-amber-400/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail Preview Area */}
                  <div className="h-44 relative overflow-hidden bg-slate-950">
                    {thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={proj.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Sparkles size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-transparent to-black/40" />

                    {/* Badge Nicho */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase text-amber-300">
                        {nichoData?.name || proj.nicho}
                      </span>
                    </div>

                    {/* Quick Preview Button */}
                    <button
                      type="button"
                      onClick={() => setPreviewProject(proj)}
                      className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-black/70 border border-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white hover:text-amber-300 cursor-pointer shadow-xl"
                      title="Pré-visualizar Biosite"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-black text-base text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                          {proj.nome}
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setRenameProject(proj);
                            setRenameInput(proj.nome);
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                          title="Renomear Projeto"
                        >
                          <Edit3 size={13} />
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {proj.identity?.slogan || 'Biosite Profissional'}
                      </p>
                    </div>

                    {/* Actions Grid */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onEditProject(proj)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Edit3 size={14} />
                        <span>Editar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDirectDownload(proj)}
                        disabled={exportingId === proj.projectId}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        title="Baixar ZIP do Site"
                      >
                        <Download size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(proj)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        title="Duplicar Biosite"
                      >
                        <Copy size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmProject(proj)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors cursor-pointer"
                        title="Excluir Biosite"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
          <div className="w-full max-w-lg h-[90vh] bg-[#07080D] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            <div className="h-14 px-5 bg-[#0A0C14] border-b border-white/10 flex items-center justify-between shrink-0">
              <span className="font-extrabold text-sm text-white truncate max-w-xs">
                Preview: {previewProject.nome}
              </span>
              <button
                type="button"
                onClick={() => setPreviewProject(null)}
                className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TemplateRenderer project={previewProject} viewport="mobile" />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D0F1C] border border-rose-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">Excluir este biosite?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tem certeza que deseja apagar <strong>{deleteConfirmProject.nome}</strong>? Esta ação é definitiva e não poderá ser desfeita.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D0F1C] border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Renomear Biosite</h3>
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
              autoFocus
            />
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRenameProject(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmRename}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black cursor-pointer shadow-md"
              >
                Salvar Nome
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
