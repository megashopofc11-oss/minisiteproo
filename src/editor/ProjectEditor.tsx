import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ProjectData,
  PhotoItem,
  ServiceItem,
  CustomButton,
  GalleryStyle,
  ThemeConfig
} from '../types';
import { saveProject } from '../firebase/firestoreService';
import { exportProjectZip } from '../exporter/generateZip';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import { IconLibraryModal } from '../components/IconLibrary';
import { AppIcon } from '../components/BrandIcons';
import {
  Save,
  Download,
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Edit3,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Palette,
  Image as ImageIcon,
  Check,
  Share2,
  MapPin,
  Globe,
  Layers,
  Sparkles,
  Link,
  Sliders,
  Type
} from 'lucide-react';

interface ProjectEditorProps {
  initialProject: ProjectData;
  onBack: () => void;
}

type EditorTab =
  | 'identidade'
  | 'conteudo'
  | 'fotos'
  | 'servicos'
  | 'cores'
  | 'botoes'
  | 'redes'
  | 'localizacao'
  | 'seo'
  | 'exportar';

const PRESET_PALETTES: { name: string; colors: Partial<ThemeConfig> }[] = [
  {
    name: 'Ouro Real & Amadeirado',
    colors: { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#090806', surface: '#16130D', text: '#FFFBEB' }
  },
  {
    name: 'Dark Cyber Neon',
    colors: { primary: '#10B981', secondary: '#047857', accent: '#34D399', background: '#050B07', surface: '#0D1A12', text: '#ECFDF5' }
  },
  {
    name: 'Rosé Glamour & Nude',
    colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6', background: '#0C070A', surface: '#191016', text: '#FDF2F8' }
  },
  {
    name: 'Roxo Elétrico & Violeta',
    colors: { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#C4B5FD', background: '#08070D', surface: '#14121F', text: '#F5F3FF' }
  },
  {
    name: 'Fogo Artesanal & Terracota',
    colors: { primary: '#EF4444', secondary: '#B91C1C', accent: '#FCA5A5', background: '#0B0606', surface: '#191010', text: '#FEF2F2' }
  },
  {
    name: 'Azul Corporativo & Safira',
    colors: { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#93C5FD', background: '#070A10', surface: '#101524', text: '#F8FAFC' }
  },
  {
    name: 'Minimal Monocromático',
    colors: { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#060608', surface: '#121217', text: '#FFFFFF' }
  }
];

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  initialProject,
  onBack
}) => {
  const [project, setProject] = useState<ProjectData>(initialProject);
  const [activeTab, setActiveTab] = useState<EditorTab>('identidade');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobileViewMode, setMobileViewMode] = useState<'edit' | 'preview'>('edit');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Icon picker state
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [iconTargetKey, setIconTargetKey] = useState<{ type: 'service' | 'button'; id: string } | null>(null);

  // Debounced auto-save ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  // Auto-save logic (800ms debounce)
  const triggerAutoSave = useCallback((dataToSave: ProjectData) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setSaveStatus('saving');
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveProject(dataToSave);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } catch (err) {
        console.error('Auto-save error:', err);
        setSaveStatus('error');
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    triggerAutoSave(project);
  }, [project, triggerAutoSave]);

  const updateProject = (updater: (prev: ProjectData) => ProjectData) => {
    setProject((prev) => updater(prev));
  };

  // Manual save
  const handleManualSave = async () => {
    setSaveStatus('saving');
    try {
      await saveProject(project);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    }
  };

  // Handle Export ZIP
  const handleDownloadZip = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    try {
      const blob = await exportProjectZip(project);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.nome.toLowerCase().replace(/[^a-z0-9]/g, '-')}-biosite.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
    } catch (err) {
      console.error('Export error:', err);
      alert('Houve um erro ao gerar o pacote ZIP. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  // Photo handlers
  const handleAddPhoto = () => {
    const newPhoto: PhotoItem = {
      id: `p-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      caption: 'Nova Foto de Destaque',
      alt: 'Foto de serviço',
      position: (project.photos?.length || 0) + 1
    };
    updateProject((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), newPhoto]
    }));
  };

  const handleUpdatePhoto = (id: string, updates: Partial<PhotoItem>) => {
    updateProject((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }));
  };

  const handleDeletePhoto = (id: string) => {
    updateProject((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id)
    }));
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const list = [...project.photos];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateProject((prev) => ({ ...prev, photos: list }));
  };

  // Service handlers
  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: 'Novo Serviço Premium',
      description: 'Descrição detalhada do atendimento com benefícios e diferenciais.',
      price: 'R$ 90,00',
      iconName: 'sparkles',
      ctaText: 'Agendar Horário'
    };
    updateProject((prev) => ({
      ...prev,
      services: [...(prev.services || []), newService]
    }));
  };

  const handleUpdateService = (id: string, updates: Partial<ServiceItem>) => {
    updateProject((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updates } : s))
    }));
  };

  const handleDeleteService = (id: string) => {
    updateProject((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id)
    }));
  };

  // Button handlers
  const handleAddButton = () => {
    const newBtn: CustomButton = {
      id: `btn-${Date.now()}`,
      text: 'Novo Botão de Ação',
      url: 'https://',
      iconName: 'link',
      style: 'gradient',
      color: project.theme.primary,
      size: 'md',
      align: 'center'
    };
    updateProject((prev) => ({
      ...prev,
      buttons: [...(prev.buttons || []), newBtn]
    }));
  };

  const handleUpdateButton = (id: string, updates: Partial<CustomButton>) => {
    updateProject((prev) => ({
      ...prev,
      buttons: prev.buttons.map((b) => (b.id === id ? { ...b, ...updates } : b))
    }));
  };

  const handleDeleteButton = (id: string) => {
    updateProject((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((b) => b.id !== id)
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-[#07080D] text-slate-100 overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 px-4 border-b border-white/10 bg-[#0B0D14]/90 backdrop-blur-md flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Meus Projetos</span>
          </button>

          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

          <div>
            <input
              type="text"
              value={project.nome}
              onChange={(e) => updateProject((prev) => ({ ...prev, nome: e.target.value }))}
              className="bg-transparent font-bold text-white text-sm sm:text-base border-b border-transparent hover:border-white/20 focus:border-purple-500 focus:outline-none transition-colors px-1 max-w-[160px] sm:max-w-xs truncate"
            />
          </div>
        </div>

        {/* Viewport switchers for desktop */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Celular"
          >
            <Smartphone size={16} />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'tablet' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Tablet"
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Desktop"
          >
            <Monitor size={16} />
          </button>
        </div>

        {/* Save & Export Actions */}
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div className="text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 hidden sm:flex">
            {saveStatus === 'saving' && (
              <span className="text-purple-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                Salvando…
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check size={13} />
                ✓ Salvo na Nuvem
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-rose-400">Falha ao salvar</span>
            )}
          </div>

          <button
            onClick={handleManualSave}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white flex items-center gap-1.5 transition-colors border border-white/10"
            title="Salvar Manualmente"
          >
            <Save size={15} />
            <span className="hidden sm:inline">Salvar</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <Download size={15} />
            <span>{isExporting ? 'Empacotando…' : 'Baixar Biosite'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Toggle Bar */}
      <div className="flex md:hidden bg-[#0B0D14] border-b border-white/10 px-4 py-2 justify-between items-center text-xs">
        <span className="text-slate-400 font-medium">Modo:</span>
        <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
          <button
            onClick={() => setMobileViewMode('edit')}
            className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1 ${
              mobileViewMode === 'edit' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            <Edit3 size={13} /> Editar
          </button>
          <button
            onClick={() => setMobileViewMode('preview')}
            className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1 ${
              mobileViewMode === 'preview' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            <Eye size={13} /> Ver Preview
          </button>
        </div>
      </div>

      {/* Main Workspace (Editor Panel Left, Live Preview Right) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Left Column */}
        <aside
          className={`w-full md:w-[480px] lg:w-[520px] border-r border-white/10 flex flex-col bg-[#0A0C13] shrink-0 z-10 ${
            mobileViewMode === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-white/10 bg-[#0E111C] p-1.5 gap-1 scrollbar-none shrink-0">
            {[
              { id: 'identidade', label: 'Identidade', icon: Type },
              { id: 'conteudo', label: 'Conteúdo', icon: Sliders },
              { id: 'fotos', label: 'Fotos', icon: ImageIcon },
              { id: 'servicos', label: 'Serviços', icon: Sparkles },
              { id: 'cores', label: 'Cores', icon: Palette },
              { id: 'botoes', label: 'Botões', icon: Link },
              { id: 'redes', label: 'Redes', icon: Share2 },
              { id: 'localizacao', label: 'Local', icon: MapPin },
              { id: 'seo', label: 'SEO', icon: Globe },
              { id: 'exportar', label: 'Exportar', icon: Download }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as EditorTab)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComp size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Form */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* TAB 1: IDENTIDADE */}
            {activeTab === 'identidade' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Identidade do Negócio</h3>
                  <p className="text-xs text-slate-400">Defina o nome, avatar e fotos principais da marca</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nome do Negócio</label>
                  <input
                    type="text"
                    value={project.identity.name}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, name: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Slogan / Chamada Principal</label>
                  <input
                    type="text"
                    value={project.identity.slogan}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, slogan: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Selo / Badge de Destaque</label>
                  <input
                    type="text"
                    value={project.identity.badge}
                    placeholder="Ex: Atendimento VIP, Verificado, 10 Anos de Tradição"
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, badge: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Logo / Avatar (URL)</label>
                    <input
                      type="text"
                      value={project.identity.avatarUrl}
                      onChange={(e) => updateProject((prev) => ({
                        ...prev,
                        identity: { ...prev.identity, avatarUrl: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 mb-2"
                    />
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-slate-800">
                      <img src={project.identity.avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Banner / Fundo (URL)</label>
                    <input
                      type="text"
                      value={project.identity.bannerUrl}
                      onChange={(e) => updateProject((prev) => ({
                        ...prev,
                        identity: { ...prev.identity, bannerUrl: e.target.value }
                      }))}
                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 mb-2"
                    />
                    <div className="w-full h-16 rounded-xl overflow-hidden border border-white/10 bg-slate-800">
                      <img src={project.identity.bannerUrl} alt="Banner preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CONTEÚDO */}
            {activeTab === 'conteudo' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Textos & Apresentação</h3>
                  <p className="text-xs text-slate-400">Conte a história e o diferencial da sua empresa</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Título da Seção Sobre</label>
                  <input
                    type="text"
                    value={project.identity.title}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, title: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sobre / Apresentação Completa</label>
                  <textarea
                    rows={4}
                    value={project.identity.about}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      identity: { ...prev.identity, about: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: FOTOS */}
            {activeTab === 'fotos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Galeria de Fotos</h3>
                    <p className="text-xs text-slate-400">Adicione fotos ilimitadas via URL com legendas</p>
                  </div>
                  <button
                    onClick={handleAddPhoto}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-md"
                  >
                    <Plus size={14} /> Adicionar Foto
                  </button>
                </div>

                {/* Gallery Style Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estilo da Galeria</label>
                  <select
                    value={project.galleryStyle || 'masonry'}
                    onChange={(e) => updateProject((prev) => ({ ...prev, galleryStyle: e.target.value as GalleryStyle }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="masonry">Masonry (Staggered Grid)</option>
                    <option value="editorial">Editorial (Destaque Grande + Detalhes)</option>
                    <option value="carousel">Carrossel / Horizontal Scroll</option>
                    <option value="cards">Cards Modernos</option>
                    <option value="full-width">Full Width Cinemático</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  {project.photos?.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className="p-3 bg-slate-900/80 border border-white/10 rounded-2xl flex gap-3 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-800 border border-white/10">
                        <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <input
                          type="text"
                          placeholder="URL da imagem (PNG, JPG, WebP)"
                          value={photo.url}
                          onChange={(e) => handleUpdatePhoto(photo.id, { url: e.target.value })}
                          className="w-full px-2.5 py-1 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                        <input
                          type="text"
                          placeholder="Legenda da foto"
                          value={photo.caption}
                          onChange={(e) => handleUpdatePhoto(photo.id, { caption: e.target.value })}
                          className="w-full px-2.5 py-1 bg-black/40 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          onClick={() => handleMovePhoto(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMovePhoto(idx, 'down')}
                          disabled={idx === project.photos.length - 1}
                          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30"
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SERVIÇOS */}
            {activeTab === 'servicos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Serviços & Produtos</h3>
                    <p className="text-xs text-slate-400">Cardápio de serviços ilimitados com preços e CTAs</p>
                  </div>
                  <button
                    onClick={handleAddService}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-md"
                  >
                    <Plus size={14} /> Adicionar
                  </button>
                </div>

                <div className="space-y-3">
                  {project.services?.map((service) => (
                    <div
                      key={service.id}
                      className="p-3.5 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={service.name}
                          placeholder="Nome do Serviço"
                          onChange={(e) => handleUpdateService(service.id, { name: e.target.value })}
                          className="flex-1 font-bold text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white"
                        />
                        <input
                          type="text"
                          value={service.price}
                          placeholder="Preço (ex: R$ 80,00)"
                          onChange={(e) => handleUpdateService(service.id, { price: e.target.value })}
                          className="w-28 font-bold text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-amber-400"
                        />
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={service.description}
                        placeholder="Descrição curta do atendimento"
                        onChange={(e) => handleUpdateService(service.id, { description: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-slate-300"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIconTargetKey({ type: 'service', id: service.id });
                            setIconModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-lg text-xs text-slate-300 flex items-center gap-1.5"
                        >
                          <AppIcon name={service.iconName || 'sparkles'} size={14} />
                          <span>Ícone: {service.iconName || 'sparkles'}</span>
                        </button>

                        <label className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!service.featured}
                            onChange={(e) => handleUpdateService(service.id, { featured: e.target.checked })}
                            className="rounded bg-black border-white/20 text-purple-600 focus:ring-0"
                          />
                          Destaque
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CORES & TEMA */}
            {activeTab === 'cores' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Paleta de Cores</h3>
                  <p className="text-xs text-slate-400">Escolha uma paleta pronta ou personalize cada tom</p>
                </div>

                {/* Preset Palettes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Paletas Prontas Recomendadas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_PALETTES.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateProject((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, ...preset.colors }
                        }))}
                        className="p-2.5 rounded-xl border border-white/10 bg-slate-900/60 hover:border-purple-500/50 flex flex-col gap-1.5 text-left transition-colors"
                      >
                        <span className="text-xs font-bold text-white">{preset.name}</span>
                        <div className="flex gap-1">
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.accent }} />
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.background }} />
                          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.colors.surface }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Pickers */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">Cor Principal (Primary)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={project.theme.primary}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, primary: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-400">{project.theme.primary}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">Cor de Destaque (Accent)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={project.theme.accent}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, accent: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-400">{project.theme.accent}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">Cor de Fundo (Background)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={project.theme.background}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, background: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-400">{project.theme.background}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">Superfície dos Cards (Surface)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={project.theme.surface}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, surface: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-xs font-mono text-slate-400">{project.theme.surface}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: BOTÕES */}
            {activeTab === 'botoes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Botões de Ação</h3>
                    <p className="text-xs text-slate-400">Configure botões primários com estilos e ícones</p>
                  </div>
                  <button
                    onClick={handleAddButton}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-md"
                  >
                    <Plus size={14} /> Novo Botão
                  </button>
                </div>

                <div className="space-y-3">
                  {project.buttons?.map((btn) => (
                    <div
                      key={btn.id}
                      className="p-3.5 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={btn.text}
                          placeholder="Texto do Botão"
                          onChange={(e) => handleUpdateButton(btn.id, { text: e.target.value })}
                          className="flex-1 font-bold text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white"
                        />
                        <button
                          onClick={() => handleDeleteButton(btn.id)}
                          className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={btn.url}
                        placeholder="Link / URL de destino (https://...)"
                        onChange={(e) => handleUpdateButton(btn.id, { url: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-slate-300"
                      />

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Estilo Visual</label>
                          <select
                            value={btn.style}
                            onChange={(e) => handleUpdateButton(btn.id, { style: e.target.value as CustomButton['style'] })}
                            className="w-full text-xs px-2 py-1.5 bg-black/60 border border-white/10 rounded-lg text-white"
                          >
                            <option value="solid">Sólido</option>
                            <option value="gradient">Gradiente</option>
                            <option value="glass">Glassmorphism</option>
                            <option value="outline">Outline</option>
                            <option value="glow">Glow Neon</option>
                            <option value="3d">3D Button</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Ícone</label>
                          <button
                            onClick={() => {
                              setIconTargetKey({ type: 'button', id: btn.id });
                              setIconModalOpen(true);
                            }}
                            className="w-full text-xs px-2 py-1.5 bg-black/60 border border-white/10 rounded-lg text-white flex items-center justify-between"
                          >
                            <span className="flex items-center gap-1.5">
                              <AppIcon name={btn.iconName || 'link'} size={14} />
                              {btn.iconName || 'link'}
                            </span>
                            <span className="text-[10px] text-purple-400">Trocar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: REDES SOCIAIS */}
            {activeTab === 'redes' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Redes Sociais Oficiais</h3>
                  <p className="text-xs text-slate-400">Ative ou desative links diretos para cada rede</p>
                </div>

                {/* WhatsApp */}
                <div className="p-3.5 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <AppIcon name="whatsapp" size={16} /> WhatsApp
                    </span>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.socials?.whatsapp?.enabled ?? true}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            whatsapp: { ...prev.socials.whatsapp, enabled: e.target.checked }
                          }
                        }))}
                        className="rounded bg-black border-white/20 text-emerald-500"
                      />
                      Ativo
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Número com DDD (Ex: 11999999999)"
                    value={project.socials?.whatsapp?.number || ''}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      socials: {
                        ...prev.socials,
                        whatsapp: { ...prev.socials.whatsapp, number: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    placeholder="Mensagem padrão pré-preenchida"
                    value={project.socials?.whatsapp?.message || ''}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      socials: {
                        ...prev.socials,
                        whatsapp: { ...prev.socials.whatsapp, message: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-slate-300"
                  />
                </div>

                {/* Instagram */}
                <div className="p-3.5 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                      <AppIcon name="instagram" size={16} /> Instagram
                    </span>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.socials?.instagram?.enabled ?? true}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            instagram: { ...prev.socials.instagram, enabled: e.target.checked }
                          }
                        }))}
                        className="rounded bg-black border-white/20 text-pink-500"
                      />
                      Ativo
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Link do perfil (https://instagram.com/...)"
                    value={project.socials?.instagram?.url || ''}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      socials: {
                        ...prev.socials,
                        instagram: { ...prev.socials.instagram, url: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white"
                  />
                </div>

                {/* TikTok */}
                <div className="p-3.5 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <AppIcon name="tiktok" size={16} /> TikTok
                    </span>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.socials?.tiktok?.enabled ?? false}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            tiktok: { ...prev.socials.tiktok, enabled: e.target.checked }
                          }
                        }))}
                        className="rounded bg-black border-white/20 text-cyan-500"
                      />
                      Ativo
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Link do perfil TikTok"
                    value={project.socials?.tiktok?.url || ''}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      socials: {
                        ...prev.socials,
                        tiktok: { ...prev.socials.tiktok, url: e.target.value }
                      }
                    }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white"
                  />
                </div>

                {/* Facebook Opcional */}
                <div className="p-3.5 bg-slate-900/80 border border-white/10 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <AppIcon name="facebook" size={16} /> Facebook (Opcional)
                    </span>
                    <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.socials?.facebook?.enabled ?? false}
                        onChange={(e) => updateProject((prev) => ({
                          ...prev,
                          socials: {
                            ...prev.socials,
                            facebook: { ...prev.socials.facebook, enabled: e.target.checked }
                          }
                        }))}
                        className="rounded bg-black border-white/20 text-indigo-500"
                      />
                      Mostrar Facebook
                    </label>
                  </div>
                  {project.socials?.facebook?.enabled && (
                    <input
                      type="text"
                      placeholder="Link da página no Facebook"
                      value={project.socials?.facebook?.url || ''}
                      onChange={(e) => updateProject((prev) => ({
                        ...prev,
                        socials: {
                          ...prev.socials,
                          facebook: { ...prev.socials.facebook, url: e.target.value }
                        }
                      }))}
                      className="w-full text-xs px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white animate-in fade-in"
                    />
                  )}
                </div>
              </div>
            )}

            {/* TAB 8: LOCALIZAÇÃO */}
            {activeTab === 'localizacao' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Localização & Contato</h3>
                  <p className="text-xs text-slate-400">Endereço, horários de atendimento e Google Maps</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Endereço Completo</label>
                  <input
                    type="text"
                    value={project.location.address}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      location: { ...prev.location, address: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cidade / Estado</label>
                  <input
                    type="text"
                    value={project.location.city}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      location: { ...prev.location, city: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Horário de Funcionamento</label>
                  <input
                    type="text"
                    value={project.location.hours}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      location: { ...prev.location, hours: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Link do Google Maps (Como Chegar)</label>
                  <input
                    type="text"
                    value={project.location.mapsUrl}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      location: { ...prev.location, mapsUrl: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Link para Avaliação no Google (Google Reviews)</label>
                  <input
                    type="text"
                    value={project.socials?.googleReview?.url || ''}
                    placeholder="https://search.google.com/local/writereview?..."
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      socials: {
                        ...prev.socials,
                        googleReview: { enabled: true, url: e.target.value }
                      }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 9: SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Configurações de SEO</h3>
                  <p className="text-xs text-slate-400">Otimize a visualização no Google e compartilhamento no WhatsApp</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Título da Página (Meta Title)</label>
                  <input
                    type="text"
                    value={project.seo.title}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, title: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Descrição nos Buscadores (Meta Description)</label>
                  <textarea
                    rows={3}
                    value={project.seo.description}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, description: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Imagem de Compartilhamento (Open Graph)</label>
                  <input
                    type="text"
                    value={project.seo.ogImage}
                    onChange={(e) => updateProject((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, ogImage: e.target.value }
                    }))}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 10: EXPORTAR */}
            {activeTab === 'exportar' && (
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-600/20 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                  <Download size={32} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Exportar BioSite Pronto</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Gere o pacote final estático independente com HTML autocontido, compatível com Vercel, Netlify e qualquer hospedagem.
                  </p>
                </div>

                <div className="p-4 bg-slate-900/60 border border-white/10 rounded-2xl text-left text-xs space-y-2 text-slate-300">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Check size={14} className="text-emerald-400" />
                    <span>Totalmente independente do BioSite Pro</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Check size={14} className="text-emerald-400" />
                    <span>Sem dependência de Firebase ou banco de dados</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Check size={14} className="text-emerald-400" />
                    <span>Inclui vercel.json e README de publicação</span>
                  </div>
                </div>

                {exportSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold animate-in fade-in">
                    ✓ Arquivo ZIP baixado com sucesso!
                  </div>
                )}

                <button
                  onClick={handleDownloadZip}
                  disabled={isExporting}
                  className="w-full py-3.5 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 text-sm transition-all active:scale-98 disabled:opacity-50"
                >
                  <Download size={18} />
                  {isExporting ? 'Empacotando Arquivos…' : '⬇ BAIXAR PACOTE COMPLETO (.ZIP)'}
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Live Preview Right Column */}
        <main
          className={`flex-1 flex flex-col items-center justify-center bg-[#07080D] p-3 sm:p-6 overflow-hidden relative ${
            mobileViewMode === 'edit' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Subtle Ambient Backdrops */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Preview Container Frame */}
          <div
            className={`transition-all duration-300 relative bg-[#090A0F] shadow-2xl overflow-hidden flex flex-col ${
              viewport === 'mobile'
                ? 'w-full max-w-[390px] h-[85vh] rounded-[40px] border-[8px] border-[#1C1F2E] shadow-purple-950/20 ring-1 ring-white/10'
                : viewport === 'tablet'
                ? 'w-full max-w-[768px] h-[85vh] rounded-[32px] border-[8px] border-[#1C1F2E] ring-1 ring-white/10'
                : 'w-full h-full rounded-2xl border border-white/10'
            }`}
          >
            {/* Top Phone Notch / Island for mobile viewport */}
            {viewport === 'mobile' && (
              <div className="h-6 bg-[#1C1F2E] flex items-center justify-center shrink-0">
                <div className="w-20 h-3 bg-black rounded-full" />
              </div>
            )}

            {/* Scrollable Live Renderer Frame */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <TemplateRenderer project={project} viewport={viewport} />
            </div>
          </div>
        </main>
      </div>

      {/* Global Icon Picker Modal */}
      <IconLibraryModal
        isOpen={iconModalOpen}
        onClose={() => {
          setIconModalOpen(false);
          setIconTargetKey(null);
        }}
        selectedIcon={
          iconTargetKey?.type === 'service'
            ? project.services?.find((s) => s.id === iconTargetKey.id)?.iconName || ''
            : iconTargetKey?.type === 'button'
            ? project.buttons?.find((b) => b.id === iconTargetKey.id)?.iconName || ''
            : ''
        }
        onSelect={(iconName) => {
          if (!iconTargetKey) return;
          if (iconTargetKey.type === 'service') {
            handleUpdateService(iconTargetKey.id, { iconName });
          } else if (iconTargetKey.type === 'button') {
            handleUpdateButton(iconTargetKey.id, { iconName });
          }
        }}
      />
    </div>
  );
};
