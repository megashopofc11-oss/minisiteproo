import React, { useState, useEffect, useRef } from 'react';
import { ProjectData } from '../../types';
import { V2ProjectData, V2DesignMeta, V2ServiceItem, V2GalleryItem } from '../types';
import { normalizeToV2ProjectData, renderTemplateV2 } from '../engine/renderTemplateV2';
import { getV2DesignById, V2_DESIGNS } from '../registry/templateRegistryV2';
import { saveProject } from '../../firebase/firestoreService';
import { downloadStandaloneHtml, exportProjectZip } from '../../exporter/generateZip';
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Download,
  Dices,
  Sparkles,
  Layers,
  Palette,
  Image as ImageIcon,
  MessageCircle,
  MapPin,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  RefreshCw,
  Eye,
  Edit3,
  Archive,
  FileCode
} from 'lucide-react';

interface V2EditorProps {
  initialProject: ProjectData;
  onBack: () => void;
}

type EditorTab = 'conteudo' | 'imagens' | 'design' | 'secoes' | 'contato' | 'publicar';

export const V2Editor: React.FC<V2EditorProps> = ({ initialProject, onBack }) => {
  const [v2Data, setV2Data] = useState<V2ProjectData>(() => normalizeToV2ProjectData(initialProject));
  const [activeTab, setActiveTab] = useState<EditorTab>('conteudo');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobileMode, setMobileMode] = useState<'edit' | 'preview'>('edit');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [stylePickerOpen, setStylePickerOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeDesign = getV2DesignById(v2Data.templateId);

  // Sync and trigger autosave
  const updateData = (updater: (prev: V2ProjectData) => V2ProjectData) => {
    setV2Data((prev) => {
      const next = updater(prev);
      setSaveStatus('unsaved');
      return next;
    });
  };

  // Autosave effect (2 seconds debounce)
  useEffect(() => {
    if (saveStatus !== 'unsaved') return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    autosaveTimerRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        const updatedProject: ProjectData = {
          ...initialProject,
          nome: v2Data.brandName || initialProject.nome,
          templateId: v2Data.templateId,
          engineVersion: 2 as any,
          updatedAt: Date.now(),
          // Store V2 data structure
          projectData: v2Data as any
        };
        await saveProject(updatedProject);
        setSaveStatus('saved');
      } catch (err) {
        console.error('Autosave error:', err);
        setSaveStatus('unsaved');
      }
    }, 1800);

    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [v2Data, saveStatus, initialProject]);

  // Handle immediate manual save
  const handleManualSave = async () => {
    setSaveStatus('saving');
    try {
      const updatedProject: ProjectData = {
        ...initialProject,
        nome: v2Data.brandName || initialProject.nome,
        templateId: v2Data.templateId,
        engineVersion: 2 as any,
        updatedAt: Date.now(),
        projectData: v2Data as any
      };
      await saveProject(updatedProject);
      setSaveStatus('saved');
    } catch (err) {
      console.error('Manual save error:', err);
      setSaveStatus('unsaved');
    }
  };

  // Generate live preview HTML using the EXACT same renderTemplateV2 function
  const liveHtml = renderTemplateV2(v2Data);

  // Helper for services
  const addService = () => {
    const newService: V2ServiceItem = {
      id: `srv_${Date.now()}`,
      title: 'Novo Serviço',
      description: 'Descrição detalhada do atendimento.',
      price: 'R$ 150',
      priceEnabled: false
    };
    updateData((prev) => ({
      ...prev,
      items: [...prev.items, newService]
    }));
  };

  const removeService = (id: string) => {
    updateData((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== id)
    }));
  };

  const updateService = (id: string, field: keyof V2ServiceItem, value: any) => {
    updateData((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    }));
  };

  // Helper for gallery
  const addGalleryImage = () => {
    const newImg: V2GalleryItem = {
      id: `img_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80',
      caption: 'Nova Foto'
    };
    updateData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newImg]
    }));
  };

  const removeGalleryImage = (id: string) => {
    updateData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id)
    }));
  };

  // Shuffle design randomly
  const handleShuffleDesign = () => {
    const randomIndex = Math.floor(Math.random() * V2_DESIGNS.length);
    const chosen = V2_DESIGNS[randomIndex];
    updateData((prev) => ({
      ...prev,
      templateId: chosen.id
    }));
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col select-none">
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-6 border-b border-white/10 bg-[#0A0C14] flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="hidden sm:block">
            <h1 className="text-xs font-bold text-white truncate max-w-[200px]">
              {v2Data.brandName || 'Meu BioSite'}
            </h1>
            <span className="text-[10px] text-amber-400 font-mono font-semibold uppercase">
              {activeDesign.name} • {activeDesign.family}
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Selector (Desktop only) */}
        <div className="hidden md:flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewport === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={15} />
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewport === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet size={15} />
          </button>
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              viewport === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor size={15} />
          </button>
        </div>

        {/* Mobile View Mode Switcher */}
        <div className="flex md:hidden items-center bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            type="button"
            onClick={() => setMobileMode('edit')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              mobileMode === 'edit' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => setMobileMode('preview')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              mobileMode === 'preview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Right: Autosave Status & Publish */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            {saveStatus === 'saving' && (
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <RefreshCw size={11} className="animate-spin" /> Salvando…
              </span>
            )}
            {saveStatus === 'saved' && (
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check size={12} /> Salvo na nuvem
              </span>
            )}
            {saveStatus === 'unsaved' && (
              <span className="text-[11px] text-slate-400 font-semibold">Alterações pendentes</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('publicar')}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-tight shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Publicar</span>
          </button>
        </div>
      </header>

      {/* Editor Body Grid: Panels on the left, Live Preview on the right */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form Controls (Hidden on mobile if in 'preview' mode) */}
        <div
          className={`w-full md:w-[480px] lg:w-[520px] flex-shrink-0 flex flex-col border-r border-white/5 bg-[#0A0C14] ${
            mobileMode === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Navigation Tabs */}
          <nav className="flex items-center overflow-x-auto border-b border-white/5 px-2 py-2 gap-1 no-scrollbar flex-shrink-0">
            {[
              { id: 'conteudo', label: 'Conteúdo', icon: Edit3 },
              { id: 'imagens', label: 'Imagens', icon: ImageIcon },
              { id: 'design', label: 'Design', icon: Palette },
              { id: 'secoes', label: 'Seções', icon: Layers },
              { id: 'contato', label: 'Contato', icon: MessageCircle },
              { id: 'publicar', label: 'Exportar', icon: Download }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as EditorTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Form Scroll Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* TAB 1: CONTEÚDO */}
            {activeTab === 'conteudo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Nome da Marca / Profissional
                  </label>
                  <input
                    type="text"
                    value={v2Data.brandName}
                    onChange={(e) => updateData((p) => ({ ...p, brandName: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Segmento / Ramo de Atuação
                  </label>
                  <input
                    type="text"
                    value={v2Data.segment}
                    onChange={(e) => updateData((p) => ({ ...p, segment: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Headline Principal
                  </label>
                  <input
                    type="text"
                    value={v2Data.headline}
                    onChange={(e) => updateData((p) => ({ ...p, headline: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Subtítulo / Tagline
                  </label>
                  <input
                    type="text"
                    value={v2Data.subheadline}
                    onChange={(e) => updateData((p) => ({ ...p, subheadline: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Sobre / Apresentação
                  </label>
                  <textarea
                    rows={4}
                    value={v2Data.about}
                    onChange={(e) => updateData((p) => ({ ...p, about: e.target.value }))}
                    className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Services Section */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Título da Seção de Serviços
                    </label>
                    <button
                      type="button"
                      onClick={addService}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Adicionar Item</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={v2Data.itemsTitle}
                    onChange={(e) => updateData((p) => ({ ...p, itemsTitle: e.target.value }))}
                    className="w-full h-10 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white mb-4"
                  />

                  {/* Services List */}
                  <div className="space-y-3">
                    {v2Data.items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                            Item 0{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeService(item.id)}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateService(item.id, 'title', e.target.value)}
                          placeholder="Nome do serviço"
                          className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />

                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => updateService(item.id, 'description', e.target.value)}
                          placeholder="Breve descrição"
                          className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />

                        {/* Price toggle */}
                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                            <input
                              type="checkbox"
                              checked={!!item.priceEnabled}
                              onChange={(e) => updateService(item.id, 'priceEnabled', e.target.checked)}
                              className="rounded border-white/20 bg-white/10 text-amber-500 focus:ring-0"
                            />
                            <span>Exibir Preço</span>
                          </label>

                          {item.priceEnabled && (
                            <input
                              type="text"
                              value={item.price || ''}
                              onChange={(e) => updateService(item.id, 'price', e.target.value)}
                              placeholder="Ex: R$ 150"
                              className="w-28 h-8 px-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400 font-bold text-right"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: IMAGENS */}
            {activeTab === 'imagens' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Logo da Marca (URL PNG Transparente)
                  </label>
                  <input
                    type="text"
                    value={v2Data.logoUrl || ''}
                    onChange={(e) => updateData((p) => ({ ...p, logoUrl: e.target.value }))}
                    placeholder="https://exemplo.com/logo.png"
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white mb-2"
                  />
                  {v2Data.logoUrl && (
                    <div className="p-3 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center h-20">
                      <img src={v2Data.logoUrl} alt="Logo" className="max-h-full object-contain" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Foto Principal / Imagem de Fundo (Hero)
                  </label>
                  <input
                    type="text"
                    value={v2Data.heroImageUrl || ''}
                    onChange={(e) => updateData((p) => ({ ...p, heroImageUrl: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white mb-2"
                  />
                  {v2Data.heroImageUrl && (
                    <div className="rounded-xl overflow-hidden border border-white/10 h-32">
                      <img src={v2Data.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Foto Recortada do Profissional (PNG)
                  </label>
                  <input
                    type="text"
                    value={v2Data.professionalPhotoUrl || ''}
                    onChange={(e) => updateData((p) => ({ ...p, professionalPhotoUrl: e.target.value }))}
                    placeholder="https://exemplo.com/pessoa-sem-fundo.png"
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white mb-2"
                  />
                </div>

                {/* Gallery */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Galeria de Fotos
                    </label>
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Adicionar Foto</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {v2Data.gallery.map((g, idx) => (
                      <div key={g.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                            Foto 0{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(g.id)}
                            className="text-slate-500 hover:text-red-400"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={g.url}
                          onChange={(e) => {
                            const newUrl = e.target.value;
                            updateData((p) => ({
                              ...p,
                              gallery: p.gallery.map((item) => (item.id === g.id ? { ...item, url: newUrl } : item))
                            }));
                          }}
                          placeholder="URL da Foto"
                          className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={g.caption || ''}
                          onChange={(e) => {
                            const newCap = e.target.value;
                            updateData((p) => ({
                              ...p,
                              gallery: p.gallery.map((item) => (item.id === g.id ? { ...item, caption: newCap } : item))
                            }));
                          }}
                          placeholder="Legenda (opcional)"
                          className="w-full h-8 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DESIGN */}
            {activeTab === 'design' && (
              <div className="space-y-6">
                {/* Active Style Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Estilo Visual Atual
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white">{activeDesign.name}</h3>
                      <p className="text-xs text-amber-400 font-semibold uppercase">{activeDesign.family}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-white/10 text-white">
                      {activeDesign.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{activeDesign.tagline}</p>
                </div>

                {/* Design Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStylePickerOpen(true)}
                    className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Palette size={15} />
                    <span>Trocar Estilo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShuffleDesign}
                    className="py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-400 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Dices size={15} />
                    <span>Misturar Design</span>
                  </button>
                </div>

                {/* Quick Style Switcher Grid */}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Estilos Rápidos em Destaque
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {V2_DESIGNS.slice(0, 10).map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => updateData((p) => ({ ...p, templateId: d.id }))}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          v2Data.templateId === d.id
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-black">{d.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase">{d.family}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SEÇÕES */}
            {activeTab === 'secoes' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 mb-4">
                  Controle a visibilidade das seções estruturais do seu biosite.
                </p>
                {[
                  { key: 'hero', label: 'Cabeçalho / Hero' },
                  { key: 'about', label: 'Seção Sobre / Manifesto' },
                  { key: 'services', label: 'Serviços & Atendimentos' },
                  { key: 'gallery', label: 'Galeria Visual' },
                  { key: 'location', label: 'Localização & Horários' },
                  { key: 'contact', label: 'Redes Sociais & Contato' }
                ].map((sec) => (
                  <label
                    key={sec.key}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-white">{sec.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded border-white/20 bg-white/10 text-amber-500 focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            )}

            {/* TAB 5: CONTATO */}
            {activeTab === 'contato' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Número do WhatsApp (com DDD)
                  </label>
                  <input
                    type="text"
                    value={v2Data.socials.whatsapp?.number || ''}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        socials: {
                          ...p.socials,
                          whatsapp: {
                            enabled: true,
                            number: e.target.value,
                            message: p.socials.whatsapp?.message || '',
                            label: p.socials.whatsapp?.label || 'Falar no WhatsApp'
                          }
                        }
                      }))
                    }
                    placeholder="11999999999"
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Mensagem Inicial Padrão do WhatsApp
                  </label>
                  <input
                    type="text"
                    value={v2Data.socials.whatsapp?.message || ''}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        socials: {
                          ...p.socials,
                          whatsapp: {
                            ...p.socials.whatsapp!,
                            message: e.target.value
                          }
                        }
                      }))
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Texto do Botão Principal de Ação
                  </label>
                  <input
                    type="text"
                    value={v2Data.socials.whatsapp?.label || ''}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        socials: {
                          ...p.socials,
                          whatsapp: {
                            ...p.socials.whatsapp!,
                            label: e.target.value
                          }
                        }
                      }))
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Instagram (Link ou @usuário)
                  </label>
                  <input
                    type="text"
                    value={v2Data.socials.instagram?.url || ''}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        socials: {
                          ...p.socials,
                          instagram: {
                            enabled: true,
                            username: '',
                            url: e.target.value
                          }
                        }
                      }))
                    }
                    placeholder="https://instagram.com/seuperfil"
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Endereço / Localização
                  </label>
                  <input
                    type="text"
                    value={v2Data.location?.address || ''}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        location: {
                          ...p.location,
                          address: e.target.value
                        }
                      }))
                    }
                    placeholder="Rua Oscar Freire, 1000 - Jardins"
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Link do Google Maps
                  </label>
                  <input
                    type="text"
                    value={v2Data.location?.mapsUrl || ''}
                    onChange={(e) =>
                      updateData((p) => ({
                        ...p,
                        location: {
                          ...p.location,
                          mapsUrl: e.target.value
                        }
                      }))
                    }
                    placeholder="https://maps.google.com/..."
                    className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: PUBLICAR / EXPORTAR */}
            {activeTab === 'publicar' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-base font-black text-white mb-1">Seu BioSite Está Pronto!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Exporte o código fonte 100% autônomo e publique em qualquer servidor, Vercel, Netlify ou hospedagem própria.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      const proj: ProjectData = {
                        ...initialProject,
                        nome: v2Data.brandName,
                        templateId: v2Data.templateId,
                        engineVersion: 2 as any,
                        projectData: v2Data as any
                      };
                      downloadStandaloneHtml(proj);
                    }}
                    className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                        <FileCode size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                          Baixar Arquivo index.html
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Arquivo único completo com CSS e fontes embutidas
                        </div>
                      </div>
                    </div>
                    <Download size={16} className="text-slate-400 group-hover:text-white" />
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      setIsExporting(true);
                      try {
                        const proj: ProjectData = {
                          ...initialProject,
                          nome: v2Data.brandName,
                          templateId: v2Data.templateId,
                          engineVersion: 2 as any,
                          projectData: v2Data as any
                        };
                        await exportProjectZip(proj);
                      } finally {
                        setIsExporting(false);
                      }
                    }}
                    disabled={isExporting}
                    className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Archive size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">
                          {isExporting ? 'Compactando...' : 'Baixar Pacote .ZIP Completo'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Inclui index.html + Guia de Publicação passo a passo
                        </div>
                      </div>
                    </div>
                    <Download size={16} className="text-slate-400 group-hover:text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Iframe Preview */}
        <div
          className={`flex-1 bg-[#06070B] overflow-auto p-4 sm:p-8 flex items-center justify-center relative ${
            mobileMode === 'edit' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div
            className={`w-full ${
              viewport === 'mobile'
                ? 'max-w-[400px]'
                : viewport === 'tablet'
                ? 'max-w-[768px]'
                : 'max-w-[1100px]'
            } h-full max-h-[900px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 relative`}
          >
            <iframe
              srcDoc={liveHtml}
              title="Live BioSite Preview"
              className="w-full h-full border-none block"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>
      </div>

      {/* Style Selector Modal */}
      {stylePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E111B] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Escolher Estilo do BioSite</h3>
                <p className="text-xs text-slate-400">Selecione uma das experiências autorais para seu projeto.</p>
              </div>
              <button
                type="button"
                onClick={() => setStylePickerOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {V2_DESIGNS.map((d) => (
                <div
                  key={d.id}
                  onClick={() => {
                    updateData((p) => ({ ...p, templateId: d.id }));
                    setStylePickerOpen(false);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    v2Data.templateId === d.id
                      ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-amber-400">{d.code}</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">{d.family}</span>
                  </div>
                  <h4 className="text-base font-black text-white mb-1">{d.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{d.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
