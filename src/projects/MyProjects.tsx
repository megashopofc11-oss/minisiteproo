import React, { useState, useEffect } from 'react';
import { ProjectData, NichoId } from '../types';
import { fetchUserProjects, deleteProject, duplicateProject, saveProject } from '../firebase/firestoreService';
import { exportProjectZip } from '../exporter/generateZip';
import { NICHOS_LIST } from '../templates/data';
import { TemplateRenderer } from '../preview/TemplateRenderer';
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
  AlertTriangle
} from 'lucide-react';

interface MyProjectsProps {
  userId: string;
  onEditProject: (project: ProjectData) => void;
  onNewProject: () => void;
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
      const blob = await exportProjectZip(p);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${p.nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}-biosite.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting:', err);
      alert('Erro ao baixar biosite.');
    } finally {
      setExportingId(null);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.nome.toLowerCase().includes(search.toLowerCase());
    const matchesNicho = selectedNicho === 'todos' || p.nicho === selectedNicho;
    return matchesSearch && matchesNicho;
  });

  return (
    <div className="space-y-6">
      {/* Top Header / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>Meus Biosites</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
              {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gerencie, edite e exporte seus biosites exclusivos
          </p>
        </div>

        <button
          onClick={onNewProject}
          className="px-4 py-2.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 text-xs transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>+ Novo BioSite</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            placeholder="Buscar por nome do biosite..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <select
            value={selectedNicho}
            onChange={(e) => setSelectedNicho(e.target.value)}
            className="px-3 py-2 bg-slate-900/90 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option value="todos">Todos os Nichos</option>
            {NICHOS_LIST.map((n) => (
              <option key={n.id} value={n.id}>
                {n.number} — {n.name}
              </option>
            ))}
          </select>
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
        <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#0E111C]/60 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-3xl bg-purple-600/10 text-purple-400 flex items-center justify-center mb-3">
            <Sparkles size={28} />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Nenhum biosite encontrado</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-4">
            {projects.length === 0
              ? 'Você ainda não criou nenhum biosite. Escolha um dos 10 nichos e comece agora mesmo!'
              : 'Nenhum resultado corresponde à sua busca ou filtro.'}
          </p>
          <button
            onClick={onNewProject}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-md"
          >
            <Plus size={15} /> Criar Primeiro BioSite
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => {
            const nichoData = NICHOS_LIST.find((n) => n.id === proj.nicho);
            const thumbUrl = proj.identity?.bannerUrl || proj.identity?.avatarUrl || proj.photos?.[0]?.url;

            return (
              <div
                key={proj.projectId}
                className="group relative bg-[#0F121E] border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-200 flex flex-col"
              >
                {/* Thumbnail Preview Area */}
                <div className="h-36 relative overflow-hidden bg-slate-900">
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={proj.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      Sem imagem
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121E] via-transparent to-black/30" />

                  {/* Nicho Tag */}
                  <span
                    className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border border-white/10 text-white"
                    style={{ backgroundColor: `${nichoData?.accentColor || '#8B5CF6'}40` }}
                  >
                    {nichoData?.name || proj.nicho}
                  </span>

                  {/* Quick Preview Button */}
                  <button
                    onClick={() => setPreviewProject(proj)}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                    title="Pré-visualizar em tela cheia"
                  >
                    <Eye size={14} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-white truncate mb-1">
                      {proj.nome}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mb-3">
                      {proj.identity?.slogan || 'Sem slogan definido'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(proj.updatedAt || proj.createdAt).toLocaleDateString('pt-BR')}
                    </span>

                    <span className="text-[10px] font-mono text-purple-400">
                      ID: {proj.templateId}
                    </span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="px-4 py-3 bg-[#0A0C14] border-t border-white/5 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => onEditProject(proj)}
                    className="flex-1 py-1.5 px-2 rounded-xl text-xs font-bold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit3 size={13} /> Editar
                  </button>

                  <button
                    onClick={() => handleDirectDownload(proj)}
                    disabled={exportingId === proj.projectId}
                    className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                    title="Baixar Pacote ZIP"
                  >
                    <Download size={14} />
                  </button>

                  <button
                    onClick={() => handleDuplicate(proj)}
                    className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                    title="Duplicar Projeto"
                  >
                    <Copy size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setRenameProject(proj);
                      setRenameInput(proj.nome);
                    }}
                    className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                    title="Renomear"
                  >
                    <Edit3 size={14} />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmProject(proj)}
                    className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col">
          <div className="h-14 px-4 bg-[#0E111C] border-b border-white/10 flex items-center justify-between shrink-0">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Eye size={15} className="text-purple-400" />
              Pré-visualização: {previewProject.nome}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditProject(previewProject)}
                className="px-3 py-1 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1"
              >
                <Edit3 size={13} /> Editar Agora
              </button>
              <button
                onClick={() => setPreviewProject(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TemplateRenderer project={previewProject} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E111C] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-white mb-1">Excluir biosite?</h3>
              <p className="text-xs text-slate-400">
                Tem certeza que deseja excluir <strong>{deleteConfirmProject.nome}</strong>? Esta ação não pode ser desfeita.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmProject(null)}
                className="flex-1 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E111C] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Renomear biosite</h3>
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setRenameProject(null)}
                className="flex-1 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmRename}
                className="flex-1 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
