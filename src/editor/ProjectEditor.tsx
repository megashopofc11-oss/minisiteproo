import React, { useState, useEffect, useRef } from 'react';
import { ProjectData, PhotoItem } from '../types';
import {
  BioProjectData,
  BioDesignConfig,
  BioItem,
  DesignMeta,
  HeroVariant,
  ContentVariant,
  GalleryVariant,
  CtaVariant,
  ContactVariant
} from '../types/designs';
import { saveProject } from '../firebase/firestoreService';
import { exportProjectZip, downloadStandaloneHtml } from '../exporter/generateZip';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import { StyleSelectorModal } from '../designs/StyleSelectorModal';
import { getDesignById, shuffleDesignConfig, normalizeProjectDataAndConfig } from '../designs/registry';
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Eye,
  Edit3,
  Plus,
  Trash2,
  Save,
  Download,
  Dices,
  Sparkles,
  Layers,
  Palette,
  Image as ImageIcon,
  MessageCircle,
  MapPin,
  Star,
  Check,
  FileCode,
  Archive,
  MoveUp,
  MoveDown,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Sliders,
  Type
} from 'lucide-react';

interface ProjectEditorProps {
  initialProject: ProjectData;
  onBack: () => void;
}

type TabKey = 'conteudo' | 'design' | 'fotos' | 'secoes' | 'contato' | 'exportar';

const SERVICE_TITLE_SUGGESTIONS = [
  'Serviços',
  'Especialidades',
  'Soluções',
  'Tratamentos',
  'Trabalhos',
  'Modalidades',
  'Áreas de Atuação',
  'Criações',
  'Cardápio',
  'Destaques'
];

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  initialProject,
  onBack
}) => {
  // Normalize project to ensure clean separation of projectData and designConfig
  const normalized = normalizeProjectDataAndConfig(initialProject);

  const [project, setProject] = useState<ProjectData>(initialProject);
  const [data, setData] = useState<BioProjectData>(normalized.projectData);
  const [config, setConfig] = useState<BioDesignConfig>(normalized.designConfig);

  const [activeTab, setActiveTab] = useState<TabKey>('conteudo');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobileViewMode, setMobileViewMode] = useState<'edit' | 'preview'>('edit');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Sync state back to ProjectData
  const updateProjectState = (newData: BioProjectData, newConfig: BioDesignConfig) => {
    setData(newData);
    setConfig(newConfig);
    setSaveStatus('unsaved');

    setProject((prev) => ({
      ...prev,
      updatedAt: Date.now(),
      nome: newData.brandName || prev.nome,
      templateId: newConfig.designId,
      projectData: newData,
      designConfig: newConfig,
      itemsTitle: newData.itemsTitle,
      identity: {
        ...prev.identity,
        name: newData.brandName,
        headline: newData.headline,
        subtitle: newData.subtitle,
        slogan: newData.headline,
        description: newData.about,
        logoUrl: newData.logoUrl,
        avatarUrl: newData.professionalPhotoUrl || '',
        bannerUrl: newData.heroImageUrl || '',
        badge: newData.badge || '',
        quote: newData.quote || ''
      },
      photos: newData.gallery,
      services: newData.items.map((it) => ({
        id: it.id,
        name: it.title,
        description: it.description,
        price: it.price || '',
        priceEnabled: it.priceEnabled || false,
        featured: it.featured,
        tag: it.tag,
        imageUrl: it.photoUrl
      })),
      socials: {
        whatsapp: newData.whatsapp,
        instagram: newData.instagram,
        tiktok: newData.tiktok,
        facebook: newData.facebook,
        google: newData.google,
        googleReview: newData.googleReview
      },
      location: {
        address: newData.location.address,
        city: newData.location.city,
        phone: newData.location.phone,
        hours: newData.hours,
        mapsUrl: newData.location.mapsUrl
      }
    }));
  };

  // Autosave with debounce
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (saveStatus !== 'unsaved') return;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        await saveProject(project);
        setSaveStatus('saved');
      } catch (err) {
        console.error('Autosave error:', err);
        setSaveStatus('unsaved');
      }
    }, 1200);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [project, saveStatus]);

  // Manual save
  const handleManualSave = async () => {
    setSaveStatus('saving');
    try {
      await saveProject(project);
      setSaveStatus('saved');
    } catch (err) {
      console.error('Error saving:', err);
      alert('Erro ao salvar projeto.');
      setSaveStatus('unsaved');
    }
  };

  const currentDesignMeta = getDesignById(config.designId);

  // 🎲 MISTURAR DESIGN (Pure JavaScript, No AI)
  const handleShuffleDesign = () => {
    const newConfig = shuffleDesignConfig(config.designId, config);
    updateProjectState(data, newConfig);
  };

  // Switch style completely
  const handleSelectNewStyle = (newDesign: DesignMeta) => {
    const newConfig: BioDesignConfig = {
      designId: newDesign.id,
      heroVariant: 'A',
      contentVariant: 'A',
      galleryVariant: 'A',
      ctaVariant: 'A',
      contactVariant: 'A',
      paletteId: newDesign.palettes[0]?.id || 'cine-noir',
      typographyId: newDesign.typographies[0]?.id || 'cine-typo-syne',
      motionLevel: 'cinematic'
    };
    updateProjectState(data, newConfig);
    setIsStyleModalOpen(false);
  };

  // Content field helper
  const updateDataField = <K extends keyof BioProjectData>(field: K, value: BioProjectData[K]) => {
    const next = { ...data, [field]: value };
    updateProjectState(next, config);
  };

  // Config field helper
  const updateConfigField = <K extends keyof BioDesignConfig>(field: K, value: BioDesignConfig[K]) => {
    const next = { ...config, [field]: value };
    updateProjectState(data, next);
  };

  // Items / Services helpers
  const handleAddItem = () => {
    const newItem: BioItem = {
      id: `item_${Date.now()}`,
      title: 'Novo Serviço ou Especialidade',
      description: 'Breve resumo do que este serviço entrega ao cliente.',
      photoUrl: '',
      price: 'R$ 0,00',
      priceEnabled: false,
      featured: false
    };
    updateDataField('items', [...data.items, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<BioItem>) => {
    const updated = data.items.map((it) => (it.id === id ? { ...it, ...updates } : it));
    updateDataField('items', updated);
  };

  const handleDeleteItem = (id: string) => {
    const filtered = data.items.filter((it) => it.id !== id);
    updateDataField('items', filtered);
  };

  // Gallery helpers
  const handleAddPhoto = () => {
    const newPhoto: PhotoItem = {
      id: `photo_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      caption: '',
      alt: 'Foto do biosite',
      position: data.gallery.length
    };
    updateDataField('gallery', [...data.gallery, newPhoto]);
  };

  const handleUpdatePhoto = (id: string, updates: Partial<PhotoItem>) => {
    const updated = data.gallery.map((p) => (p.id === id ? { ...p, ...updates } : p));
    updateDataField('gallery', updated);
  };

  const handleDeletePhoto = (id: string) => {
    const filtered = data.gallery.filter((p) => p.id !== id);
    updateDataField('gallery', filtered);
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= data.gallery.length) return;
    const newArr = [...data.gallery];
    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;
    updateDataField('gallery', newArr);
  };

  return (
    <div className="h-screen flex flex-col bg-[#07080D] text-slate-100 overflow-hidden font-sans">

      {/* TOPBAR */}
      <header className="h-16 border-b border-white/10 bg-[#090B14] px-4 sm:px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Voltar para a Home"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white uppercase truncate max-w-[160px] sm:max-w-xs">
                {data.brandName || project.nome}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[9px] font-bold">
                {currentDesignMeta.number} {currentDesignMeta.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              {saveStatus === 'saving' && <span className="text-amber-400">Salvando alterações...</span>}
              {saveStatus === 'saved' && <span className="text-emerald-400 flex items-center gap-1"><Check size={10} /> Salvo na nuvem</span>}
              {saveStatus === 'unsaved' && <span className="text-slate-400">Alterações pendentes</span>}
            </div>
          </div>
        </div>

        {/* Viewport Toggles (Desktop only) */}
        <div className="hidden lg:flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'mobile' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Mobile (380px)"
          >
            <Smartphone size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'tablet' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Tablet (640px)"
          >
            <Tablet size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewport === 'desktop' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
            title="Visualização Desktop"
          >
            <Monitor size={16} />
          </button>
        </div>

        {/* Mobile View Toggle (Editar / Preview) */}
        <div className="lg:hidden flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setMobileViewMode('edit')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              mobileViewMode === 'edit' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <Edit3 size={13} />
            <span>Editar</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileViewMode('preview')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
              mobileViewMode === 'preview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffleDesign}
            className="hidden sm:flex py-2 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-300 hover:text-white font-bold text-xs items-center gap-1.5 transition-all cursor-pointer"
            title="Sortear variações visuais sem mudar o conteúdo"
          >
            <Dices size={15} />
            <span>MISTURAR</span>
          </button>

          <button
            type="button"
            onClick={handleManualSave}
            className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <Save size={14} />
            <span>Salvar</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT (SPLIT: LEFT CONTROLS, RIGHT PREVIEW) */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* LEFT PANEL: TABS & INPUTS */}
        <div
          className={`w-full lg:w-[480px] xl:w-[520px] bg-[#0A0C14] border-r border-white/10 flex flex-col shrink-0 overflow-hidden ${
            mobileViewMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* TAB BAR (CONTEÚDO, DESIGN, FOTOS, SEÇÕES, CONTATO, EXPORTAR) */}
          <div className="flex border-b border-white/10 bg-[#07080D] overflow-x-auto no-scrollbar shrink-0 px-2">
            {[
              { id: 'conteudo', label: 'CONTEÚDO', icon: Edit3 },
              { id: 'design', label: 'DESIGN', icon: Palette },
              { id: 'fotos', label: 'FOTOS', icon: ImageIcon },
              { id: 'secoes', label: 'SEÇÕES', icon: Layers },
              { id: 'contato', label: 'CONTATO', icon: MessageCircle },
              { id: 'exportar', label: 'EXPORTAR', icon: Download }
            ].map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as TabKey)}
                  className={`py-3 px-3.5 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-amber-400 text-amber-300 bg-white/[0.03]'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">

            {/* TAB 1: CONTEÚDO */}
            {activeTab === 'conteudo' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Informações Principais
                  </h3>
                  <p className="text-xs text-slate-400">
                    Estes textos preenchem o topo e o corpo do seu biosite.
                  </p>
                </div>

                <div className="space-y-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Nome / Marca / Empresa</label>
                    <input
                      type="text"
                      value={data.brandName}
                      onChange={(e) => updateDataField('brandName', e.target.value)}
                      placeholder="Ex: Dra. Camila Menezes"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Segmento / Ramo de Atuação</label>
                    <input
                      type="text"
                      value={data.segment}
                      onChange={(e) => updateDataField('segment', e.target.value)}
                      placeholder="Ex: Dermatologia & Estética Avançada"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Headline Principal (Frase de Impacto)</label>
                    <input
                      type="text"
                      value={data.headline}
                      onChange={(e) => updateDataField('headline', e.target.value)}
                      placeholder="Ex: CUIDADO MÉDICO QUE ELEVA SUA NATURALIDADE"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Subtítulo / Proposta</label>
                    <textarea
                      rows={2}
                      value={data.subtitle}
                      onChange={(e) => updateDataField('subtitle', e.target.value)}
                      placeholder="Ex: Tratamentos dermatológicos avançados com tecnologia suíça."
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Sobre / Trajetória / Manifesto</label>
                    <textarea
                      rows={3}
                      value={data.about}
                      onChange={(e) => updateDataField('about', e.target.value)}
                      placeholder="Breve história e filosofia da sua marca..."
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Selo / Badge de Autoridade (Opcional)</label>
                    <input
                      type="text"
                      value={data.badge || ''}
                      onChange={(e) => updateDataField('badge', e.target.value)}
                      placeholder="Ex: CRM/SP 148.920 • RQE 62.140"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>
                </div>

                {/* SERVIÇOS / ESPECIALIDADES COM TÍTULO PERSONALIZÁVEL */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-wider">
                        Seção de Serviços
                      </h4>
                      <p className="text-xs text-slate-400">
                        Defina o título da seção e seus itens principais
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Adicionar</span>
                    </button>
                  </div>

                  {/* Custom Title & Suggestions */}
                  <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <label className="text-xs font-bold text-slate-300 block">Título da Seção de Serviços</label>
                    <input
                      type="text"
                      value={data.itemsTitle}
                      onChange={(e) => updateDataField('itemsTitle', e.target.value)}
                      placeholder="Ex: Especialidades de Assinatura"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white font-bold placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />

                    {/* Quick suggestion chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {SERVICE_TITLE_SUGGESTIONS.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => updateDataField('itemsTitle', sug)}
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                            data.itemsTitle === sug
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* List of Items */}
                  <div className="space-y-3">
                    {data.items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl border border-white/10 bg-black/30 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                            Item {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                          placeholder="Nome do serviço"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white font-bold focus:outline-none focus:border-amber-400/50"
                        />

                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                          placeholder="Descrição objetiva do que inclui..."
                          className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-amber-400/50"
                        />

                        {/* Price Switch (DEFAULT OFF) */}
                        <div className="flex items-center justify-between pt-1 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Boolean(item.priceEnabled)}
                                onChange={(e) => handleUpdateItem(item.id, { priceEnabled: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-amber-500" />
                            </label>
                            <span className="text-xs text-slate-400">Exibir Preço</span>
                          </div>

                          {item.priceEnabled && (
                            <input
                              type="text"
                              value={item.price || ''}
                              onChange={(e) => handleUpdateItem(item.id, { price: e.target.value })}
                              placeholder="Ex: R$ 120,00"
                              className="w-28 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-emerald-400 font-mono font-bold text-right focus:outline-none focus:border-amber-400/50"
                            />
                          )}
                        </div>

                        {/* Optional photo URL */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 block">URL da Foto (Opcional)</span>
                          <input
                            type="text"
                            value={item.photoUrl || ''}
                            onChange={(e) => handleUpdateItem(item.id, { photoUrl: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] text-slate-300 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DESIGN */}
            {activeTab === 'design' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Estilo Atual + Ações Principais */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                        ESTILO ATUAL ({currentDesignMeta.number})
                      </span>
                      <h3 className="text-lg font-black text-white uppercase">
                        {currentDesignMeta.name}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-1">{currentDesignMeta.subtitle}</p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                      {currentDesignMeta.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsStyleModalOpen(true)}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      <Layers size={14} />
                      <span>TROCAR ESTILO</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShuffleDesign}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                    >
                      <Dices size={15} />
                      <span>MISTURAR DESIGN</span>
                    </button>
                  </div>
                </div>

                {/* Seletor de Variações: Hero, Conteúdo, Galeria, CTA, Contato */}
                <div className="space-y-5">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    VARIAÇÕES DE SEÇÃO
                  </h4>

                  {/* 1. Hero Variant */}
                  <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Hero (Topo)</span>
                      <span className="text-amber-400 font-mono text-[11px]">Variante {config.heroVariant}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['A', 'B', 'C', 'D'] as HeroVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateConfigField('heroVariant', v)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            config.heroVariant === v
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          Variante {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Conteúdo / Serviços */}
                  <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Conteúdo / Serviços</span>
                      <span className="text-amber-400 font-mono text-[11px]">Variante {config.contentVariant}</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['A', 'B', 'C'] as ContentVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateConfigField('contentVariant', v)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            config.contentVariant === v
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          Variante {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Galeria */}
                  <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Galeria de Fotos</span>
                      <span className="text-amber-400 font-mono text-[11px]">Variante {config.galleryVariant}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['A', 'B', 'C', 'D'] as GalleryVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateConfigField('galleryVariant', v)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            config.galleryVariant === v
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          Variante {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. CTA */}
                  <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Chamada para Ação (CTA)</span>
                      <span className="text-amber-400 font-mono text-[11px]">Variante {config.ctaVariant}</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['A', 'B', 'C'] as CtaVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateConfigField('ctaVariant', v)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            config.ctaVariant === v
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          Variante {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. Contato */}
                  <div className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <label className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Contato & Localização</span>
                      <span className="text-amber-400 font-mono text-[11px]">Variante {config.contactVariant}</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['A', 'B', 'C'] as ContactVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => updateConfigField('contactVariant', v)}
                          className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            config.contactVariant === v
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          Variante {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Paletas de Cor Específicas do Estilo */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    PALETAS DE COR DO ESTILO
                  </h4>
                  <div className="space-y-2">
                    {currentDesignMeta.palettes.map((pal) => {
                      const isSelected = config.paletteId === pal.id;
                      return (
                        <div
                          key={pal.id}
                          onClick={() => updateConfigField('paletteId', pal.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-400 bg-amber-500/10'
                              : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-1.5">
                              <span className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: pal.primary }} />
                              <span className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: pal.secondary }} />
                              <span className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: pal.background }} />
                            </div>
                            <span className="text-xs font-bold text-white">{pal.name}</span>
                          </div>
                          {isSelected && <Check size={16} className="text-amber-400" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tipografias Específicas do Estilo */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    COMBINAÇÕES TIPOGRÁFICAS
                  </h4>
                  <div className="space-y-2">
                    {currentDesignMeta.typographies.map((typo) => {
                      const isSelected = config.typographyId === typo.id;
                      return (
                        <div
                          key={typo.id}
                          onClick={() => updateConfigField('typographyId', typo.id)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'border-amber-400 bg-amber-500/10'
                              : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">{typo.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-mono">{typo.fontCategory}</span>
                          </div>
                          {isSelected && <Check size={16} className="text-amber-400" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FOTOS */}
            {activeTab === 'fotos' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Fotografia & Identidade Visual
                  </h3>
                  <p className="text-xs text-slate-400">
                    Insira URLs de fotos diretas ou use as imagens de alta definição integradas.
                  </p>
                </div>

                {/* 1. Logo (PNG Transparente, sem corte forçado) */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white">Logo (PNG Transparente)</label>
                    {data.logoUrl && (
                      <button
                        type="button"
                        onClick={() => updateDataField('logoUrl', '')}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={data.logoUrl}
                    onChange={(e) => updateDataField('logoUrl', e.target.value)}
                    placeholder="URL do arquivo PNG com fundo transparente"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                  />
                  {data.logoUrl && (
                    <div className="p-3 bg-black/50 rounded-xl border border-white/5 flex justify-center">
                      <img src={data.logoUrl} alt="Logo" className="max-h-16 object-contain" />
                    </div>
                  )}
                </div>

                {/* 2. Foto Profissional Recortada (PNG) */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white">Foto Profissional Recortada (PNG)</label>
                    {data.professionalPhotoUrl && (
                      <button
                        type="button"
                        onClick={() => updateDataField('professionalPhotoUrl', '')}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={data.professionalPhotoUrl}
                    onChange={(e) => updateDataField('professionalPhotoUrl', e.target.value)}
                    placeholder="URL da foto recortada de pessoa/profissional"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                  />
                  {data.professionalPhotoUrl && (
                    <div className="p-3 bg-black/50 rounded-xl border border-white/5 flex justify-center">
                      <img src={data.professionalPhotoUrl} alt="Foto profissional" className="max-h-28 object-contain" />
                    </div>
                  )}
                </div>

                {/* 3. Foto de Fundo / Hero */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white">Foto de Fundo / Hero Banner</label>
                    {data.heroImageUrl && (
                      <button
                        type="button"
                        onClick={() => updateDataField('heroImageUrl', '')}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={data.heroImageUrl}
                    onChange={(e) => updateDataField('heroImageUrl', e.target.value)}
                    placeholder="URL da foto ampla para o fundo ou hero"
                    className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                  />
                  {data.heroImageUrl && (
                    <div className="h-24 rounded-xl overflow-hidden border border-white/5">
                      <img src={data.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* 4. Galeria de Fotos */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-wider">
                        Galeria de Fotos
                      </h4>
                      <span className="text-xs text-slate-400">{data.gallery.length} Fotos cadastradas</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Adicionar Foto</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.gallery.map((photo, idx) => (
                      <div
                        key={photo.id}
                        className="p-3 rounded-2xl border border-white/10 bg-black/30 flex items-center gap-3"
                      >
                        <img src={photo.url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10" />

                        <div className="flex-1 min-w-0 space-y-1">
                          <input
                            type="text"
                            value={photo.url}
                            onChange={(e) => handleUpdatePhoto(photo.id, { url: e.target.value })}
                            placeholder="URL da foto"
                            className="w-full px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] text-white focus:outline-none"
                          />
                          <input
                            type="text"
                            value={photo.caption || ''}
                            onChange={(e) => handleUpdatePhoto(photo.id, { caption: e.target.value })}
                            placeholder="Legenda da foto..."
                            className="w-full px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] text-slate-300 focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMovePhoto(idx, 'up')}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <MoveUp size={13} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === data.gallery.length - 1}
                            onClick={() => handleMovePhoto(idx, 'down')}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <MoveDown size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-1 text-rose-400 hover:text-rose-300 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SEÇÕES */}
            {activeTab === 'secoes' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Organização das Seções
                  </h3>
                  <p className="text-xs text-slate-400">
                    Oculte ou exiba blocos do seu biosite para moldar a experiência ideal.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'hero', name: 'Hero / Apresentação de Topo' },
                    { id: 'about', name: 'Sobre / Trajetória / Manifesto' },
                    { id: 'services', name: 'Serviços & Especialidades' },
                    { id: 'gallery', name: 'Galeria de Fotos' },
                    { id: 'cta', name: 'Chamada para Ação Principal (CTA)' },
                    { id: 'location', name: 'Localização & Horários' },
                    { id: 'reviews', name: 'Avaliações de Clientes' }
                  ].map((sec) => (
                    <div
                      key={sec.id}
                      className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-white">{sec.name}</span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Ativo
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: CONTATO */}
            {activeTab === 'contato' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Canais de Contato & Localização
                  </h3>
                  <p className="text-xs text-slate-400">
                    Conexão direta via WhatsApp, Instagram, Google e GPS.
                  </p>
                </div>

                {/* WhatsApp */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle size={15} />
                    WhatsApp Direto
                  </span>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Número (DDD + Telefone)</label>
                    <input
                      type="text"
                      value={data.whatsapp?.number || ''}
                      onChange={(e) =>
                        updateDataField('whatsapp', { ...data.whatsapp, number: e.target.value })
                      }
                      placeholder="Ex: 11999999999"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Mensagem Padrão de Abertura</label>
                    <input
                      type="text"
                      value={data.whatsapp?.message || ''}
                      onChange={(e) =>
                        updateDataField('whatsapp', { ...data.whatsapp, message: e.target.value })
                      }
                      placeholder="Ex: Olá! Gostaria de agendar um horário."
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Texto do Botão</label>
                    <input
                      type="text"
                      value={data.whatsapp?.label || ''}
                      onChange={(e) =>
                        updateDataField('whatsapp', { ...data.whatsapp, label: e.target.value })
                      }
                      placeholder="Ex: Agendar Atendimento via WhatsApp"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
                    />
                  </div>
                </div>

                {/* Redes Sociais */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider block">
                    Redes Sociais
                  </span>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Instagram (URL Completa)</label>
                    <input
                      type="text"
                      value={data.instagram?.url || ''}
                      onChange={(e) =>
                        updateDataField('instagram', { ...data.instagram, url: e.target.value })
                      }
                      placeholder="https://instagram.com/seu.perfil"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">TikTok (URL Completa)</label>
                    <input
                      type="text"
                      value={data.tiktok?.url || ''}
                      onChange={(e) =>
                        updateDataField('tiktok', { ...data.tiktok, url: e.target.value })
                      }
                      placeholder="https://tiktok.com/@seu.perfil"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Endereço & Horários */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={15} />
                    Localização & Funcionamento
                  </span>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Endereço Completo</label>
                    <input
                      type="text"
                      value={data.location?.address || ''}
                      onChange={(e) =>
                        updateDataField('location', { ...data.location, address: e.target.value })
                      }
                      placeholder="Ex: Rua Oscar Freire, 1420"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Bairro, Cidade - Estado</label>
                    <input
                      type="text"
                      value={data.location?.city || ''}
                      onChange={(e) =>
                        updateDataField('location', { ...data.location, city: e.target.value })
                      }
                      placeholder="Ex: Jardins, São Paulo - SP"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Horário de Atendimento</label>
                    <input
                      type="text"
                      value={data.hours || ''}
                      onChange={(e) => updateDataField('hours', e.target.value)}
                      placeholder="Ex: Segunda a Sábado das 09:00 às 20:00"
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">Link Google Maps / Waze</label>
                    <input
                      type="text"
                      value={data.location?.mapsUrl || ''}
                      onChange={(e) =>
                        updateDataField('location', { ...data.location, mapsUrl: e.target.value })
                      }
                      placeholder="https://maps.google.com/..."
                      className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Google Reviews */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Star size={15} />
                    Avaliações Google
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">Nota Média (ex: 5.0)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={data.googleReview?.rating || 5.0}
                        onChange={(e) =>
                          updateDataField('googleReview', {
                            ...data.googleReview,
                            rating: parseFloat(e.target.value) || 5.0
                          })
                        }
                        className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 block">Total de Avaliações</label>
                      <input
                        type="number"
                        value={data.googleReview?.count || 120}
                        onChange={(e) =>
                          updateDataField('googleReview', {
                            ...data.googleReview,
                            count: parseInt(e.target.value, 10) || 0
                          })
                        }
                        className="w-full px-3 py-1.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: EXPORTAR */}
            {activeTab === 'exportar' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Exportação Profissional
                  </h3>
                  <p className="text-xs text-slate-400">
                    Seu biosite é 100% independente. Sem mensalidade, sem plataformas terceiras.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center gap-3 text-amber-400">
                      <FileCode size={22} />
                      <div>
                        <h4 className="text-sm font-black text-white">Baixar Arquivo HTML Único</h4>
                        <span className="text-xs text-slate-400">Pronto para qualquer hospedagem ou servidor</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isExporting}
                      onClick={() => downloadStandaloneHtml(project)}
                      className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Download size={15} />
                      <span>Baixar index.html</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <div className="flex items-center gap-3 text-amber-400">
                      <Archive size={22} />
                      <div>
                        <h4 className="text-sm font-black text-white">Baixar Pacote ZIP Completo</h4>
                        <span className="text-xs text-slate-400">Inclui index.html, assets e guia de publicação</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isExporting}
                      onClick={async () => {
                        setIsExporting(true);
                        try {
                          await exportProjectZip(project);
                        } finally {
                          setIsExporting(false);
                        }
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                    >
                      <Download size={15} />
                      <span>Baixar Pacote ZIP (.zip)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: LIVE RESPONSIVE PREVIEW */}
        <div
          className={`flex-1 bg-[#05060A] flex justify-center items-start overflow-y-auto p-4 sm:p-8 no-scrollbar ${
            mobileViewMode === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div
            className={`w-full transition-all duration-300 shadow-2xl rounded-3xl overflow-hidden border border-white/15 my-auto ${
              viewport === 'mobile'
                ? 'max-w-[430px]'
                : viewport === 'tablet'
                ? 'max-w-[640px]'
                : 'max-w-4xl'
            }`}
          >
            <TemplateRenderer project={project} viewport={viewport} />
          </div>
        </div>
      </div>

      {/* Modal Seletor de Estilos para Troca Instantânea */}
      <StyleSelectorModal
        isOpen={isStyleModalOpen}
        onClose={() => setIsStyleModalOpen(false)}
        onSelectDesign={handleSelectNewStyle}
      />
    </div>
  );
};
