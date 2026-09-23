import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ProjectData,
  PhotoItem,
  ServiceItem,
  CustomButton,
  GalleryStyle,
  ThemeConfig,
  FontCategory,
  SocialIconStyle,
  SectionKey,
  WhatsAppStyle
} from '../types';
import { saveProject } from '../firebase/firestoreService';
import { exportProjectZip, downloadStandaloneHtml } from '../exporter/generateZip';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import { IconLibraryModal } from '../components/IconLibrary';
import { AppIcon, BrandWhatsApp, BrandGoogle } from '../components/BrandIcons';
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
  Type,
  Clock,
  Star,
  FileCode,
  Archive,
  MoveUp,
  MoveDown,
  CheckCircle2,
  ChevronRight,
  X
} from 'lucide-react';

interface ProjectEditorProps {
  initialProject: ProjectData;
  onBack: () => void;
}

const PRESET_PALETTES: { name: string; colors: Partial<ThemeConfig> }[] = [
  {
    name: 'Ouro Nobre & Amadeirado (Barbearia/Luxo)',
    colors: { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#07080D', surface: '#0F121C', text: '#F8FAFC' }
  },
  {
    name: 'Rosa Sofisticado & Nude (Manicure/Beauty)',
    colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6', background: '#0C070A', surface: '#191016', text: '#FDF2F8' }
  },
  {
    name: 'Champagne & Dourado Real (Salão/Editorial)',
    colors: { primary: '#F59E0B', secondary: '#B45309', accent: '#FEF3C7', background: '#0A0A0E', surface: '#16161F', text: '#FAF5FF' }
  },
  {
    name: 'Fogo Rústico & Terracota (Gastronomia/Pizza)',
    colors: { primary: '#EF4444', secondary: '#DC2626', accent: '#FCA5A5', background: '#0B0606', surface: '#191010', text: '#FEF2F2' }
  },
  {
    name: 'Azul Safira & Prata (Imóveis/Arquitetura)',
    colors: { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#93C5FD', background: '#070A10', surface: '#101524', text: '#F8FAFC' }
  },
  {
    name: 'Neon High Performance (Personal/Fitness)',
    colors: { primary: '#10B981', secondary: '#059669', accent: '#34D399', background: '#050B07', surface: '#0D1A12', text: '#ECFDF5' }
  },
  {
    name: 'Cromado & Noite Urbana (Executivo/Motorista)',
    colors: { primary: '#0EA5E9', secondary: '#0369A1', accent: '#7DD3FC', background: '#060A10', surface: '#0D1522', text: '#F0F9FF' }
  },
  {
    name: 'Aço Industrial & Laranja (Mecânica/Racing)',
    colors: { primary: '#F97316', secondary: '#C2410C', accent: '#FDBA74', background: '#08080C', surface: '#14141E', text: '#F8FAFC' }
  },
  {
    name: 'Chocolate Belga & Doces Finos (Confeitaria)',
    colors: { primary: '#F43F5E', secondary: '#92400E', accent: '#FFE4E6', background: '#0D080A', surface: '#1A1114', text: '#FFF1F2' }
  },
  {
    name: 'Minimal Monocromático de Alta Costura',
    colors: { primary: '#FFFFFF', secondary: '#94A3B8', accent: '#E2E8F0', background: '#050505', surface: '#121212', text: '#FFFFFF' }
  }
];

const FONT_PRESETS: { category: FontCategory; name: string; sample: string; headingFont: string }[] = [
  { category: 'MODERNA', name: 'Plus Jakarta Sans (Moderna)', sample: 'Design contemporâneo, limpo e altamente legível', headingFont: 'Plus Jakarta Sans' },
  { category: 'ELEGANTE', name: 'Playfair Display (Elegante & Nobre)', sample: 'Tipografia serifada de luxo e sofisticação tradicional', headingFont: 'Playfair Display' },
  { category: 'BOLD', name: 'Syne (Bold & Imponente)', sample: 'Geometria marcante com presença visual de destaque', headingFont: 'Syne' },
  { category: 'EDITORIAL', name: 'Bodoni Moda (Editorial Fashion)', sample: 'Estética de revista de alta costura e moda internacional', headingFont: 'Bodoni Moda' },
  { category: 'MINIMAL', name: 'DM Sans (Minimalista)', sample: 'Espaçamento sutil e minimalismo refinado para marcas clean', headingFont: 'DM Sans' },
  { category: 'ESPORTIVA', name: 'Chakra Petch (Esportiva & Tecnológica)', sample: 'Traços dinâmicos com energia de alta performance', headingFont: 'Chakra Petch' }
];

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  initialProject,
  onBack
}) => {
  // Ensure default extended properties exist
  const [project, setProject] = useState<ProjectData>(() => ({
    ...initialProject,
    fontCategory: initialProject.fontCategory || 'MODERNA',
    socialIconStyle: initialProject.socialIconStyle || 'glass',
    sectionsOrder: initialProject.sectionsOrder || ['hero', 'status', 'about', 'services', 'gallery', 'reviews', 'hours', 'location', 'socials', 'cta'],
    sectionsVisibility: initialProject.sectionsVisibility || {
      hero: true,
      status: true,
      about: true,
      services: true,
      gallery: true,
      reviews: true,
      hours: true,
      location: true,
      socials: true,
      cta: true
    },
    statusConfig: initialProject.statusConfig || {
      enabled: true,
      autoCalculate: true,
      openTime: '08:00',
      closeTime: '20:00',
      customText: 'ABERTO AGORA',
      customMessage: 'Atendimento com horário agendado'
    },
    whatsappConfig: initialProject.whatsappConfig || {
      enabled: true,
      number: initialProject.socials?.whatsapp?.number || '',
      message: initialProject.socials?.whatsapp?.message || 'Olá! Vim pelo biosite.',
      label: 'Agendar pelo WhatsApp',
      style: 'floating',
      floatingPosition: 'right',
      showFloating: true
    },
    googleReviewConfig: initialProject.googleReviewConfig || {
      enabled: true,
      url: initialProject.socials?.googleReview?.url || 'https://maps.google.com',
      rating: 5.0,
      reviewCount: 147,
      title: 'NOS AVALIE NO GOOGLE',
      subtitle: 'Sua opinião é fundamental para nossa contínua excelência.',
      style: 'gold'
    },
    shareConfig: initialProject.shareConfig || {
      enabled: true,
      label: 'Compartilhar'
    }
  }));

  // Accordion active sections in Editor (Requisito 17)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    identidade: true,
    logo_capa: false,
    textos: false,
    cores: false,
    fontes: false,
    secoes: false,
    status: false,
    whatsapp: false,
    reviews: false,
    botoes: false,
    redes: false,
    servicos: false,
    galeria: false,
    horarios_loc: false,
    seo: false,
    exportar: false
  });

  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [mobilePreviewModalOpen, setMobilePreviewModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Icon picker state
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const [iconTargetKey, setIconTargetKey] = useState<{ type: 'service' | 'button'; id: string } | null>(null);

  // Debounced auto-save ref
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const toggleAccordion = (sectionKey: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Auto-save logic (700ms debounce)
  const triggerAutoSave = useCallback((dataToSave: ProjectData) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setSaveStatus('saving');
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveProject(dataToSave);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2500);
      } catch (err) {
        console.error('Error auto-saving project:', err);
        setSaveStatus('error');
      }
    }, 700);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    triggerAutoSave(project);
  }, [project, triggerAutoSave]);

  // Update Helpers
  const updateIdentity = (field: keyof ProjectData['identity'], val: string) => {
    setProject((prev) => ({
      ...prev,
      identity: { ...prev.identity, [field]: val }
    }));
  };

  const updateTheme = (field: keyof ThemeConfig, val: string) => {
    setProject((prev) => ({
      ...prev,
      theme: { ...prev.theme, [field]: val }
    }));
  };

  const updateStatusConfig = (updates: Partial<NonNullable<ProjectData['statusConfig']>>) => {
    setProject((prev) => ({
      ...prev,
      statusConfig: { ...prev.statusConfig!, ...updates }
    }));
  };

  const updateWhatsAppConfig = (updates: Partial<NonNullable<ProjectData['whatsappConfig']>>) => {
    setProject((prev) => ({
      ...prev,
      whatsappConfig: { ...prev.whatsappConfig!, ...updates }
    }));
  };

  const updateGoogleReviewConfig = (updates: Partial<NonNullable<ProjectData['googleReviewConfig']>>) => {
    setProject((prev) => ({
      ...prev,
      googleReviewConfig: { ...prev.googleReviewConfig!, ...updates }
    }));
  };

  const updateLogoConfig = (updates: Partial<NonNullable<ProjectData['logoConfig']>>) => {
    setProject((prev) => ({
      ...prev,
      logoConfig: {
        size: prev.logoConfig?.size || 'lg',
        align: prev.logoConfig?.align || 'center',
        position: prev.logoConfig?.position || 'hero',
        background: prev.logoConfig?.background || 'none',
        ...updates
      }
    }));
  };

  // Section Ordering & Visibility Controls (Requisito 18)
  const toggleSectionVisibility = (key: SectionKey) => {
    setProject((prev) => ({
      ...prev,
      sectionsVisibility: {
        ...prev.sectionsVisibility,
        [key]: prev.sectionsVisibility?.[key] === false ? true : false
      }
    }));
  };

  const moveSectionOrder = (index: number, direction: 'up' | 'down') => {
    const list = [...(project.sectionsOrder || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    setProject((prev) => ({
      ...prev,
      sectionsOrder: list
    }));
  };

  // Photo Management
  const addPhoto = () => {
    const newP: PhotoItem = {
      id: `p_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      caption: 'Nova Fotografia',
      alt: 'Foto do Atendimento',
      position: (project.photos || []).length
    };
    setProject((prev) => ({ ...prev, photos: [...(prev.photos || []), newP] }));
  };

  const removePhoto = (id: string) => {
    setProject((prev) => ({
      ...prev,
      photos: (prev.photos || []).filter((p) => p.id !== id)
    }));
  };

  const updatePhoto = (id: string, field: keyof PhotoItem, val: string) => {
    setProject((prev) => ({
      ...prev,
      photos: (prev.photos || []).map((p) => (p.id === id ? { ...p, [field]: val } : p))
    }));
  };

  // Service Management
  const addService = () => {
    const newS: ServiceItem = {
      id: `s_${Date.now()}`,
      name: 'Novo Procedimento',
      description: 'Descrição do procedimento e benefícios para o cliente.',
      price: 'R$ 90,00',
      iconName: 'sparkles',
      featured: false
    };
    setProject((prev) => ({ ...prev, services: [...(prev.services || []), newS] }));
  };

  const removeService = (id: string) => {
    setProject((prev) => ({
      ...prev,
      services: (prev.services || []).filter((s) => s.id !== id)
    }));
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setProject((prev) => ({
      ...prev,
      services: (prev.services || []).map((s) => (s.id === id ? { ...s, ...updates } : s))
    }));
  };

  // Action Buttons Management
  const addButton = () => {
    const newBtn: CustomButton = {
      id: `b_${Date.now()}`,
      text: 'Novo Botão de Ação',
      url: 'https://',
      iconName: 'link',
      style: 'solid',
      color: project.theme.primary,
      size: 'md',
      align: 'center'
    };
    setProject((prev) => ({ ...prev, buttons: [...(prev.buttons || []), newBtn] }));
  };

  const removeButton = (id: string) => {
    setProject((prev) => ({
      ...prev,
      buttons: (prev.buttons || []).filter((b) => b.id !== id)
    }));
  };

  const updateButton = (id: string, updates: Partial<CustomButton>) => {
    setProject((prev) => ({
      ...prev,
      buttons: (prev.buttons || []).map((b) => (b.id === id ? { ...b, ...updates } : b))
    }));
  };

  // Export handlers (Requisito 27 & 28)
  const handleExportZip = async () => {
    setIsExporting(true);
    setExportNotice(null);
    try {
      await exportProjectZip(project);
      setExportNotice('Arquivo ZIP exportado com sucesso!');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.error('Error exporting ZIP:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadHtml = () => {
    try {
      downloadStandaloneHtml(project);
      setExportNotice('Arquivo index.html estático baixado com sucesso!');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.error('Error downloading HTML:', err);
    }
  };

  const SECTION_LABELS: Record<SectionKey, string> = {
    hero: 'Capa / Hero Principal',
    status: 'Status Aberto / Fechado',
    about: 'Sobre Nós / História',
    differentials: 'Diferenciais da Marca',
    services: 'Especialidades & Atendimento',
    gallery: 'Galeria Visual de Fotos',
    reviews: 'Avaliações Google Reviews',
    hours: 'Horários de Atendimento',
    location: 'Endereço & Google Maps',
    socials: 'Redes Sociais & Canais',
    cta: 'Rodapé & Botão Final'
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col">
      {/* Top Bar with Brand, Save Status, Viewports, and Actions */}
      <header className="h-16 px-4 sm:px-6 border-b border-white/10 bg-[#0A0C14]/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Voltar aos Projetos"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-white truncate max-w-[140px] sm:max-w-xs">
                {project.nome}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 hidden sm:inline">
                {project.nicho}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              {saveStatus === 'saving' && (
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Salvando alterações...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1 text-emerald-400">
                  <Check size={12} /> Salvo automaticamente
                </span>
              )}
              {saveStatus === 'idle' && <span>Autosave ativo</span>}
            </div>
          </div>
        </div>

        {/* Viewport switcher (Desktop view) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewport === 'mobile' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>390px</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewport === 'tablet' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet size={14} />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewport === 'desktop' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
        </div>

        {/* Export Quick Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadHtml}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold border border-white/15 transition-all cursor-pointer active:scale-95"
            title="Baixar arquivo index.html independente"
          >
            <FileCode size={15} className="text-amber-400" />
            <span>Baixar HTML</span>
          </button>

          <button
            type="button"
            onClick={handleExportZip}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-lg shadow-amber-500/25 active:scale-95"
          >
            <Archive size={15} />
            <span>{isExporting ? 'Gerando...' : 'Baixar ZIP'}</span>
          </button>
        </div>
      </header>

      {/* Export Toast Notification */}
      {exportNotice && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Workspace (Split Grid: Left Accordion Editor, Right Real-Time Preview) */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Collapsible Accordion Editor (Requisito 17) */}
        <aside className="w-full lg:w-[480px] border-r border-white/10 bg-[#080A12] overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sliders size={14} />
              Editor Completo Bio Fácil
            </span>
            <span className="text-[11px] text-slate-400">16 seções recolhíveis</span>
          </div>

          {/* 1. IDENTIDADE DA MARCA */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('identidade')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                IDENTIDADE & NOME
              </span>
              {openSections.identidade ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.identidade && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Nome Principal / Marca</label>
                  <input
                    type="text"
                    value={project.identity.name}
                    onChange={(e) => updateIdentity('name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Slogan / Headline de Impacto</label>
                  <input
                    type="text"
                    value={project.identity.slogan}
                    onChange={(e) => updateIdentity('slogan', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Badge de Exclusividade (Kicker)</label>
                  <input
                    type="text"
                    value={project.identity.badge}
                    onChange={(e) => updateIdentity('badge', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    placeholder="Ex: 10 MODELOS EXCLUSIVOS"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Texto "Sobre Nós" / Apresentação</label>
                  <textarea
                    rows={3}
                    value={project.identity.about}
                    onChange={(e) => updateIdentity('about', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. LOGO & FOTOS DA CAPA (Requisito 16) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('logo_capa')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ImageIcon size={16} className="text-amber-400" />
                LOGO & CAPA DO HERO
              </span>
              {openSections.logo_capa ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.logo_capa && (
              <div className="p-4 pt-0 space-y-4 border-t border-white/5">
                {/* 1. LOGO PRINCIPAL (PNG TRANSPARENTE) */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      Logo da Marca / Empresa
                    </span>
                    <span className="text-[10px] text-slate-400">PNG transparente</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      URL da Logo (PNG, SVG, WEBP)
                    </label>
                    <input
                      type="text"
                      value={project.identity.logoUrl || ''}
                      onChange={(e) => updateIdentity('logoUrl', e.target.value)}
                      placeholder="https://exemplo.com/logo.png"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      A logo não é recortada em círculo: ela preserva o formato original e proporções reais.
                    </p>
                  </div>

                  {/* Logo Controls: Size, Align, Background */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Tamanho da Logo</label>
                      <select
                        value={project.logoConfig?.size || 'lg'}
                        onChange={(e) => updateLogoConfig({ size: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                      >
                        <option value="sm" className="bg-[#0D0F1C]">Pequena (48px)</option>
                        <option value="md" className="bg-[#0D0F1C]">Média (64px)</option>
                        <option value="lg" className="bg-[#0D0F1C]">Grande (96px)</option>
                        <option value="xl" className="bg-[#0D0F1C]">Extra Grande (128px)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Alinhamento</label>
                      <select
                        value={project.logoConfig?.align || 'center'}
                        onChange={(e) => updateLogoConfig({ align: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                      >
                        <option value="center" className="bg-[#0D0F1C]">Centro</option>
                        <option value="left" className="bg-[#0D0F1C]">Esquerda</option>
                        <option value="right" className="bg-[#0D0F1C]">Direita</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Fundo da Logo</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: 'none', label: 'Nenhum' },
                        { id: 'glass', label: 'Vidro' },
                        { id: 'light', label: 'Claro' },
                        { id: 'dark', label: 'Escuro' }
                      ].map((item) => {
                        const isSelected = (project.logoConfig?.background || 'none') === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => updateLogoConfig({ background: item.id as any })}
                            className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. FOTOGRAFIAS (DISTINTAS DA LOGO) */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                    Fotografias de Destaque
                  </span>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Foto Principal / Banner do Hero
                    </label>
                    <input
                      type="text"
                      value={project.identity.bannerUrl || ''}
                      onChange={(e) => updateIdentity('bannerUrl', e.target.value)}
                      placeholder="https://exemplo.com/banner.jpg"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Foto do Profissional / Especialista
                    </label>
                    <input
                      type="text"
                      value={project.identity.avatarUrl || ''}
                      onChange={(e) => updateIdentity('avatarUrl', e.target.value)}
                      placeholder="https://exemplo.com/profissional.jpg"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Usada especialmente nos modelos focados no profissional (ex: Modelo 09 - Profile).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. GERENCIAR SEÇÕES & ORDEM (Requisito 18) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('secoes')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Layers size={16} className="text-amber-400" />
                GERENCIAR & REORDENAR SEÇÕES
              </span>
              {openSections.secoes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.secoes && (
              <div className="p-4 pt-0 space-y-2 border-t border-white/5">
                <p className="text-[11px] text-slate-400 mb-2">
                  Ative ou desative as seções e altere a ordem de exibição no biosite:
                </p>

                {(project.sectionsOrder || []).map((secKey, idx) => {
                  const isVisible = project.sectionsVisibility?.[secKey] !== false;
                  return (
                    <div
                      key={secKey}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5"
                    >
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-200">
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() => toggleSectionVisibility(secKey)}
                          className="accent-amber-500 rounded"
                        />
                        <span className={isVisible ? 'text-white' : 'text-slate-500 line-through'}>
                          {SECTION_LABELS[secKey] || secKey}
                        </span>
                      </label>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveSectionOrder(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                          title="Mover para Cima"
                        >
                          <MoveUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSectionOrder(idx, 'down')}
                          disabled={idx === (project.sectionsOrder || []).length - 1}
                          className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                          title="Mover para Baixo"
                        >
                          <MoveDown size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. TIPOGRAFIA & FONTES (Requisito 19) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('fontes')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Type size={16} className="text-amber-400" />
                TIPOGRAFIA & FONTES
              </span>
              {openSections.fontes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.fontes && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <p className="text-[11px] text-slate-400">
                  Selecione a categoria tipográfica ideal para o tom do seu negócio:
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {FONT_PRESETS.map((fp) => {
                    const isSelected = project.fontCategory === fp.category;
                    return (
                      <div
                        key={fp.category}
                        onClick={() => {
                          setProject((prev) => ({
                            ...prev,
                            fontCategory: fp.category,
                            theme: { ...prev.theme, fontHeading: fp.headingFont }
                          }));
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 shadow-md'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase text-white tracking-wider">
                            {fp.name}
                          </span>
                          {isSelected && <Check size={14} className="text-amber-400" />}
                        </div>
                        <p
                          className="text-xs text-slate-300"
                          style={{
                            fontFamily:
                              fp.category === 'ELEGANTE'
                                ? "'Playfair Display', serif"
                                : fp.category === 'BOLD'
                                ? "'Syne', sans-serif"
                                : fp.category === 'EDITORIAL'
                                ? "'Bodoni Moda', serif"
                                : fp.category === 'ESPORTIVA'
                                ? "'Chakra Petch', sans-serif"
                                : "'Plus Jakarta Sans', sans-serif"
                          }}
                        >
                          {fp.sample}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 5. CORES & PALETAS CINEMATOGRÁFICAS */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('cores')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Palette size={16} className="text-amber-400" />
                CORES & ILUMINAÇÃO
              </span>
              {openSections.cores ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.cores && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-2">Paletas de Cinema Prontas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_PALETTES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProject((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, ...preset.colors }
                          }));
                        }}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 text-left text-[11px] font-bold text-slate-200 transition-all flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate pr-1">{preset.name.split(' (')[0]}</span>
                        <div className="flex gap-1 shrink-0">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.primary }} />
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.colors.accent }} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Cor Primária (Destaques)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={project.theme.primary}
                        onChange={(e) => updateTheme('primary', e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={project.theme.primary}
                        onChange={(e) => updateTheme('primary', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Cor de Fundo (Background)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={project.theme.background}
                        onChange={(e) => updateTheme('background', e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={project.theme.background}
                        onChange={(e) => updateTheme('background', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. STATUS ABERTO / FECHADO (Requisito 24) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('status')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-amber-400" />
                STATUS (ABERTO / FECHADO)
              </span>
              {openSections.status ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.status && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                  <input
                    type="checkbox"
                    checked={project.statusConfig?.enabled ?? true}
                    onChange={(e) => updateStatusConfig({ enabled: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Exibir Indicador de Status no Biosite</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                  <input
                    type="checkbox"
                    checked={project.statusConfig?.autoCalculate ?? true}
                    onChange={(e) => updateStatusConfig({ autoCalculate: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Calcular Automaticamente com Base nos Horários</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Horário de Abertura</label>
                    <input
                      type="time"
                      value={project.statusConfig?.openTime || '08:00'}
                      onChange={(e) => updateStatusConfig({ openTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Horário de Fechamento</label>
                    <input
                      type="time"
                      value={project.statusConfig?.closeTime || '20:00'}
                      onChange={(e) => updateStatusConfig({ closeTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 7. WHATSAPP & BOTÃO FLUTUANTE (Requisito 21) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('whatsapp')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BrandWhatsApp size={16} className="text-emerald-400" />
                WHATSAPP & BOTÃO FLUTUANTE
              </span>
              {openSections.whatsapp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.whatsapp && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Número com DDD (Ex: 11999998888)</label>
                  <input
                    type="text"
                    value={project.whatsappConfig?.number || ''}
                    onChange={(e) => {
                      updateWhatsAppConfig({ number: e.target.value });
                      setProject((prev) => ({
                        ...prev,
                        socials: {
                          ...prev.socials,
                          whatsapp: { ...prev.socials.whatsapp, number: e.target.value }
                        }
                      }));
                    }}
                    placeholder="5511999998888"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Mensagem Pré-configurada</label>
                  <input
                    type="text"
                    value={project.whatsappConfig?.message || ''}
                    onChange={(e) => updateWhatsAppConfig({ message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                    <input
                      type="checkbox"
                      checked={project.whatsappConfig?.showFloating !== false}
                      onChange={(e) => updateWhatsAppConfig({ showFloating: e.target.checked })}
                      className="accent-emerald-500 rounded"
                    />
                    <span>MOSTRAR WHATSAPP FLUTUANTE [ON/OFF]</span>
                  </label>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">Posição na Tela</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => updateWhatsAppConfig({ floatingPosition: 'right' })}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                          project.whatsappConfig?.floatingPosition !== 'left'
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        Direita (Padrão)
                      </button>
                      <button
                        type="button"
                        onClick={() => updateWhatsAppConfig({ floatingPosition: 'left' })}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                          project.whatsappConfig?.floatingPosition === 'left'
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        Esquerda
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 8. GOOGLE REVIEWS (Requisito 22) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('reviews')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Star size={16} className="text-amber-400" />
                GOOGLE REVIEWS (AVALIAÇÃO)
              </span>
              {openSections.reviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.reviews && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                  <input
                    type="checkbox"
                    checked={project.googleReviewConfig?.enabled ?? true}
                    onChange={(e) => updateGoogleReviewConfig({ enabled: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Exibir Bloco de Avaliação Google ★★★★★</span>
                </label>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Título do Card</label>
                  <input
                    type="text"
                    value={project.googleReviewConfig?.title || 'NOS AVALIE NO GOOGLE'}
                    onChange={(e) => updateGoogleReviewConfig({ title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Link Direto da Avaliação Google</label>
                  <input
                    type="text"
                    value={project.googleReviewConfig?.url || ''}
                    onChange={(e) => updateGoogleReviewConfig({ url: e.target.value })}
                    placeholder="https://g.page/r/.../review"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 9. REDES SOCIAIS & ESTILOS DE ÍCONE (Requisito 20) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('redes')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-amber-400" />
                REDES SOCIAIS & ESTILOS DE ÍCONES
              </span>
              {openSections.redes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.redes && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Estilo dos Ícones</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['glass', '3d', 'glow', 'original', 'minimal', 'outline'] as SocialIconStyle[]).map((styleOpt) => (
                      <button
                        key={styleOpt}
                        type="button"
                        onClick={() => setProject((prev) => ({ ...prev, socialIconStyle: styleOpt }))}
                        className={`py-2 px-1 text-center rounded-xl text-[10px] font-black uppercase border cursor-pointer ${
                          project.socialIconStyle === styleOpt
                            ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        {styleOpt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Link do Instagram</label>
                  <input
                    type="text"
                    value={project.socials?.instagram?.url || ''}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        socials: {
                          ...prev.socials,
                          instagram: { ...prev.socials.instagram, url: e.target.value, enabled: !!e.target.value }
                        }
                      }))
                    }
                    placeholder="https://instagram.com/seuperfil"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Link do TikTok</label>
                  <input
                    type="text"
                    value={project.socials?.tiktok?.url || ''}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        socials: {
                          ...prev.socials,
                          tiktok: { ...prev.socials.tiktok, url: e.target.value, enabled: !!e.target.value }
                        }
                      }))
                    }
                    placeholder="https://tiktok.com/@seuperfil"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 10. ESPECIALIDADES & SERVIÇOS */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('servicos')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                ESPECIALIDADES & SERVIÇOS ({(project.services || []).length})
              </span>
              {openSections.servicos ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.servicos && (
              <div className="p-4 pt-0 space-y-4 border-t border-white/5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1.5">
                    Estilo de Apresentação das Especialidades
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'cards', label: 'Cards de Luxo' },
                      { key: 'minimal-list', label: 'Lista Editorial' },
                      { key: 'icons-grid', label: 'Grade de Ícones' },
                      { key: 'accordion', label: 'Accordion' },
                      { key: 'photo-cards', label: 'Fotos em Destaque' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setProject((prev) => ({ ...prev, serviceLayout: opt.key as any }))}
                        className={`py-2 px-2 text-center rounded-xl text-[10px] font-black uppercase border cursor-pointer ${
                          (project.serviceLayout || 'cards') === opt.key
                            ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {(project.services || []).map((s) => (
                    <div key={s.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5 relative">
                      <button
                        type="button"
                        onClick={() => removeService(s.id)}
                        className="absolute top-2.5 right-2.5 text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        title="Excluir Serviço"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                        <input
                          type="text"
                          value={s.name}
                          onChange={(e) => updateService(s.id, { name: e.target.value })}
                          placeholder="Nome da Especialidade / Serviço"
                          className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={s.ctaText || ''}
                          onChange={(e) => updateService(s.id, { ctaText: e.target.value })}
                          placeholder="Texto do Botão (Ex: Quero Saber Mais)"
                          className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-amber-300 text-xs font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={s.price || ''}
                          onChange={(e) => updateService(s.id, { price: e.target.value })}
                          placeholder="Preço (Opcional - deixe vazio p/ não mostrar)"
                          className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 text-xs font-mono"
                        />
                        <input
                          type="text"
                          value={s.imageUrl || ''}
                          onChange={(e) => updateService(s.id, { imageUrl: e.target.value })}
                          placeholder="URL da foto (opcional)"
                          className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-400 text-xs"
                        />
                      </div>

                      <input
                        type="text"
                        value={s.description}
                        onChange={(e) => updateService(s.id, { description: e.target.value })}
                        placeholder="Pequena descrição da especialidade"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 text-xs"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Adicionar Especialidade</span>
                </button>
              </div>
            )}
          </div>

          {/* 11. GALERIA VISUAL (Requisito 16) */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('galeria')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ImageIcon size={16} className="text-amber-400" />
                GALERIA DE FOTOS ({(project.photos || []).length})
              </span>
              {openSections.galeria ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.galeria && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                {(project.photos || []).map((photo) => (
                  <div key={photo.id} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                    <img src={photo.url} alt="Thumbnail" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <input
                      type="text"
                      value={photo.url}
                      onChange={(e) => updatePhoto(photo.id, 'url', e.target.value)}
                      placeholder="URL da imagem (PNG/JPG/WEBP)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPhoto}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Adicionar Foto na Galeria</span>
                </button>
              </div>
            )}
          </div>

          {/* 12. HORÁRIOS & LOCALIZAÇÃO */}
          <div className="rounded-2xl border border-white/10 bg-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('horarios_loc')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-400" />
                LOCALIZAÇÃO & HORÁRIOS
              </span>
              {openSections.horarios_loc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.horarios_loc && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Endereço Completo</label>
                  <input
                    type="text"
                    value={project.location.address}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        location: { ...prev.location, address: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Tabela de Horários</label>
                  <input
                    type="text"
                    value={project.location.hours}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        location: { ...prev.location, hours: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Link do Google Maps</label>
                  <input
                    type="text"
                    value={project.location.mapsUrl}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        location: { ...prev.location, mapsUrl: e.target.value }
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 13. EXPORTAR & DOWNLOADS (Requisitos 27 & 28) */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-[#0D0F1C] to-[#0D0F1C] overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('exportar')}
              className="w-full p-4 flex items-center justify-between text-left font-black text-xs sm:text-sm text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Download size={16} className="text-amber-400" />
                BAIXAR BIOSITE (ESTÁTICO & INDEPENDENTE)
              </span>
              {openSections.exportar ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections.exportar && (
              <div className="p-4 pt-0 space-y-3 border-t border-white/5">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Exporte o seu biosite totalmente pronto para publicação na <strong>Vercel, Netlify, Cloudflare Pages ou GitHub Pages</strong> sem qualquer dependência do backend.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadHtml}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <FileCode size={16} className="text-amber-400" />
                    <span>Baixar index.html</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportZip}
                    disabled={isExporting}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <Archive size={16} />
                    <span>{isExporting ? 'Gerando ZIP...' : 'Baixar ZIP Completo'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Real-Time Live Preview Frame */}
        <main className="flex-1 bg-black/60 overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
          <div
            className={`transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-[32px] overflow-hidden border border-white/15 ${
              viewport === 'mobile'
                ? 'w-[390px] min-h-[780px]'
                : viewport === 'tablet'
                ? 'w-[768px] min-h-[900px]'
                : 'w-full max-w-4xl min-h-[950px]'
            }`}
          >
            <TemplateRenderer project={project} viewport={viewport} />
          </div>
        </main>
      </div>

      {/* Mobile Fixed Floating Button: "VER PREVIEW" (Requisito 25) */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setMobilePreviewModalOpen(true)}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-2xl flex items-center gap-2 cursor-pointer active:scale-95 border border-white/20"
        >
          <Eye size={16} />
          <span>VER PREVIEW</span>
        </button>
      </div>

      {/* Mobile Full-Screen Preview Modal (Requisito 25) */}
      {mobilePreviewModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black flex flex-col animate-fadeIn">
          <div className="h-14 px-4 bg-[#0A0C14] border-b border-white/10 flex items-center justify-between shrink-0">
            <span className="text-xs font-black text-white">Preview do Biosite (390px)</span>
            <button
              onClick={() => setMobilePreviewModalOpen(false)}
              className="p-2 rounded-xl bg-white/10 text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <TemplateRenderer project={project} viewport="mobile" />
          </div>
        </div>
      )}
    </div>
  );
};
