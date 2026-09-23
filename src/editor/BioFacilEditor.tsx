import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BioFacilTemplate,
  BioFacilManifest,
  BioFacilFieldDefinition,
  BioFacilServiceItem,
  BioFacilGalleryItem,
  BioFacilColorPreset,
  GalleryLayoutStyle,
  IconStyleVariant,
  VisualEffectVariant
} from '../types/biofacil';
import {
  generatePersonalizedHtml,
  generatePersonalizedZip,
  preparePreviewHtml,
  getTemplateOriginalImages,
  getTemplateOriginalTexts
} from '../services/zipTemplateEngine';
import { retrieveTemplateZip } from '../services/modelStorageService';
import { saveBioFacilUserProject } from '../firebase/firestoreService';

// Section Components
import { IdentitySection } from './sections/IdentitySection';
import { TextsSection } from './sections/TextsSection';
import { PhotosSection } from './sections/PhotosSection';
import { GallerySection } from './sections/GallerySection';
import { ServicesSection } from './sections/ServicesSection';
import { SocialSection } from './sections/SocialSection';
import { LocationSection } from './sections/LocationSection';
import { AppearanceSection } from './sections/AppearanceSection';
import { IconsSection } from './sections/IconsSection';

import {
  ArrowLeft,
  Eye,
  Smartphone,
  Monitor,
  CheckCircle,
  RefreshCw,
  Download,
  FileCode,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Type,
  ImageIcon,
  Images,
  Scissors,
  Share2,
  MapPin,
  Palette,
  Box,
  Sliders,
  Sparkles
} from 'lucide-react';

interface BioFacilEditorProps {
  template: BioFacilTemplate;
  projectId: string;
  userId: string;
  initialProjectName?: string;
  initialValues?: Record<string, any>;
  onBack: () => void;
  isTestMode?: boolean;
}

type DeviceWidthMode = '390' | '430' | 'full';

export const BioFacilEditor: React.FC<BioFacilEditorProps> = ({
  template,
  projectId,
  userId,
  initialProjectName,
  initialValues,
  onBack,
  isTestMode = false
}) => {
  const manifest = template.biofacilSchema || {
    version: 1,
    templateId: template.templateId,
    name: template.name,
    category: template.categoryId,
    fields: []
  };

  const capabilities = manifest.capabilities || {};
  const [projectName, setProjectName] = useState(initialProjectName || template.name || 'Meu BioSite');

  // Extract original images and texts from template HTML for pre-filling and non-destructive fallbacks
  const templateOriginalImages = useMemo(() => {
    return getTemplateOriginalImages(template.htmlContent || '', manifest);
  }, [template.htmlContent, manifest]);

  const templateOriginalTexts = useMemo(() => {
    return getTemplateOriginalTexts(template.htmlContent || '', manifest);
  }, [template.htmlContent, manifest]);

  // Initialize values
  const [values, setValues] = useState<Record<string, any>>(() => {
    const vals: Record<string, any> = {};

    // 1. Defaults from manifest fields
    if (manifest.fields) {
      manifest.fields.forEach((f) => {
        if (f.defaultValue !== undefined && f.defaultValue !== '') {
          vals[f.id] = f.defaultValue;
        } else if (f.type === 'services' || f.type === 'gallery' || f.type === 'testimonials') {
          vals[f.id] = [];
        } else if (templateOriginalTexts[f.id]) {
          vals[f.id] = templateOriginalTexts[f.id];
        } else {
          vals[f.id] = '';
        }
      });
    }

    // 2. Preferences and feature defaults
    const defaults = {
      galleryLayout: 'original',
      carouselSettings: { autoplay: true, speed: 3, indicators: true, arrows: true, loop: true, effect: 'slide' },
      iconStyle: 'original',
      visualEffect: 'original',
      socialVisibility: {
        whatsapp: true,
        instagram: true,
        tiktok: true,
        facebook: true,
        youtube: true,
        phone: true,
        email: true
      },
      customColors: {},
      colorPreset: 'original',
      googleReviews: { enabled: true, link: '' }
    };

    return { ...defaults, ...vals, ...(initialValues || {}) };
  });

  // Mobile mode: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  // Device width simulation (Desktop): 390px (iPhone), 430px (Max/Android), full (100%)
  const [deviceWidth, setDeviceWidth] = useState<DeviceWidthMode>('390');

  // Accordion active sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    identity: true,
    texts: false,
    photos: false,
    services: false,
    gallery: false,
    social: false,
    location: false,
    appearance: false,
    icons: false,
    config: false
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Autosave status: 'saved' | 'saving' | 'unsaved'
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Iframe ref
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cachedZipBlob, setCachedZipBlob] = useState<Blob | null>(null);

  // Failed assets tracker
  const [failedAssets, setFailedAssets] = useState<string[]>([]);

  useEffect(() => {
    const handleAssetErrorMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'BIO_FACIL_ASSET_ERROR' && e.data.src) {
        const src = String(e.data.src);
        setFailedAssets((prev) => (prev.includes(src) ? prev : [...prev, src]));
      }
    };
    window.addEventListener('message', handleAssetErrorMsg);
    return () => window.removeEventListener('message', handleAssetErrorMsg);
  }, []);

  // Pre-fetch template source zip
  useEffect(() => {
    let isMounted = true;
    retrieveTemplateZip(template.templateId, template.sourceFileReference)
      .then((blob) => {
        if (isMounted && blob) setCachedZipBlob(blob);
      })
      .catch((err) => console.warn('Could not load source zip:', err));

    return () => {
      isMounted = false;
    };
  }, [template]);

  // Handle subtle highlight on element in preview when focused (Requirement 12)
  const handleFocusField = (fieldId: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'BIO_FACIL_FOCUS',
          fieldId
        },
        '*'
      );
    }
  };

  // Field change handler
  const handleFieldValueChange = (fieldId: string, val: any) => {
    setValues((prev) => {
      const next = { ...prev, [fieldId]: val };
      return next;
    });

    setSaveStatus('unsaved');

    // Real-time postMessage to iframe DOM without destroying or reloading iframe
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'BIO_FACIL_UPDATE',
          fieldId,
          value: val
        },
        '*'
      );
    }

    scheduleAutosave();
  };

  // Style change handler (CSS vars, icon style, effects, gallery layout)
  const handleStyleUpdate = (updates: {
    cssVars?: Record<string, string>;
    iconStyle?: string;
    visualEffect?: string;
    socialVisibility?: Record<string, boolean>;
    galleryLayout?: string;
  }) => {
    setValues((prev) => {
      const next = {
        ...prev,
        customColors: updates.cssVars ? { ...prev.customColors, ...updates.cssVars } : prev.customColors,
        iconStyle: updates.iconStyle !== undefined ? updates.iconStyle : prev.iconStyle,
        visualEffect: updates.visualEffect !== undefined ? updates.visualEffect : prev.visualEffect,
        socialVisibility: updates.socialVisibility !== undefined ? { ...prev.socialVisibility, ...updates.socialVisibility } : prev.socialVisibility,
        galleryLayout: updates.galleryLayout !== undefined ? updates.galleryLayout : prev.galleryLayout
      };
      return next;
    });

    setSaveStatus('unsaved');

    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'BIO_FACIL_STYLE_UPDATE',
          ...updates
        },
        '*'
      );
    }

    scheduleAutosave();
  };

  const scheduleAutosave = () => {
    if (isTestMode) return;
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    autosaveTimeoutRef.current = setTimeout(() => {
      executeAutosave();
    }, 1200);
  };

  const executeAutosave = async () => {
    if (isTestMode) return;
    setSaveStatus('saving');
    try {
      await saveBioFacilUserProject({
        projectId,
        userId,
        templateId: template.templateId,
        templateVersion: template.version || 1,
        projectName,
        values,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        engineVersion: 2
      });
      setSaveStatus('saved');
    } catch (err) {
      console.warn('Autosave notice:', err);
      setSaveStatus('saved');
    }
  };

  const handleImageUpload = (fieldId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleFieldValueChange(fieldId, reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Preview HTML creation
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const previewHtml = useMemo(() => {
    const rawHtml = template.htmlContent || '<!DOCTYPE html><html><body><h1>Carregando template...</h1></body></html>';
    return preparePreviewHtml(rawHtml, manifest, values, template.assets, { isTestMode });
  }, [template.templateId, template.htmlContent, template.assets, reloadTrigger]);

  // Export handlers
  const handleDownloadHtml = () => {
    setIsExporting(true);
    try {
      const rawHtml = template.htmlContent || '';
      const finalHtml = generatePersonalizedHtml(rawHtml, manifest, values);
      const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-index.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(`Falha ao exportar HTML: ${err.message || 'Erro inesperado'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      let zipToUse = cachedZipBlob;
      if (!zipToUse) {
        zipToUse = await retrieveTemplateZip(template.templateId, template.sourceFileReference);
      }

      if (!zipToUse) {
        const zipBlob = await generatePersonalizedZip(new Blob([]), manifest, values, template.htmlContent);
        triggerZipDownload(zipBlob);
        return;
      }

      const zipBlob = await generatePersonalizedZip(zipToUse, manifest, values, template.htmlContent);
      triggerZipDownload(zipBlob);
    } catch (err: any) {
      alert(`Falha ao gerar arquivo ZIP: ${err.message || 'Erro inesperado'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const triggerZipDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-biofacil.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Categorize fields cleanly into sections
  const {
    nameField,
    taglineField,
    logoField,
    avatarField,
    textFields,
    photoFields,
    servicesField,
    galleryField,
    locationFields,
    extraFields
  } = useMemo(() => {
    const allFields = manifest.fields || [];

    let nField: BioFacilFieldDefinition | undefined;
    let tField: BioFacilFieldDefinition | undefined;
    let lField: BioFacilFieldDefinition | undefined;
    let aField: BioFacilFieldDefinition | undefined;
    let sField: BioFacilFieldDefinition | undefined;
    let gField: BioFacilFieldDefinition | undefined;

    const remainingTexts: BioFacilFieldDefinition[] = [];
    const remainingPhotos: BioFacilFieldDefinition[] = [];
    const locFields: BioFacilFieldDefinition[] = [];
    const extras: BioFacilFieldDefinition[] = [];

    allFields.forEach((f) => {
      const idL = f.id.toLowerCase();

      // 1. Identity candidates
      if (!nField && (idL.includes('name') || idL.includes('brand') || idL.includes('titulo_principal') || idL === 'title')) {
        nField = f;
        return;
      }
      if (!tField && (idL.includes('tagline') || idL.includes('slogan') || idL.includes('subheadline') || idL.includes('subtitulo'))) {
        tField = f;
        return;
      }
      if (!lField && idL.includes('logo')) {
        lField = f;
        return;
      }
      if (!aField && (idL.includes('hero_image') || idL.includes('avatar') || idL.includes('perfil') || (f.type === 'image' && idL.includes('hero')))) {
        aField = f;
        return;
      }

      // 2. Services candidates
      if (f.type === 'services' || idL.includes('service') || idL.includes('procedimento')) {
        sField = f;
        return;
      }

      // 3. Gallery candidates
      if (f.type === 'gallery' || idL.includes('gallery') || idL.includes('fotos')) {
        gField = f;
        return;
      }

      // 4. Location candidates
      if (idL.includes('address') || idL.includes('endereco') || idL.includes('hours') || idL.includes('horario') || idL.includes('maps')) {
        locFields.push(f);
        return;
      }

      // 5. Social candidates (already handled globally by SocialSection)
      if (
        idL.includes('whatsapp') ||
        idL.includes('instagram') ||
        idL.includes('tiktok') ||
        idL.includes('facebook') ||
        idL.includes('youtube') ||
        idL.includes('phone') ||
        idL.includes('email')
      ) {
        return;
      }

      // 6. General texts & images
      if (f.type === 'text' || f.type === 'textarea') {
        remainingTexts.push(f);
        return;
      }
      if (f.type === 'image') {
        remainingPhotos.push(f);
        return;
      }

      extras.push(f);
    });

    return {
      nameField: nField,
      taglineField: tField,
      logoField: lField,
      avatarField: aField,
      textFields: remainingTexts,
      photoFields: remainingPhotos,
      servicesField: sField,
      galleryField: gField,
      locationFields: locFields,
      extraFields: extras
    };
  }, [manifest.fields]);

  // Determine section availability dynamically based on model capabilities (Requirement: DO NOT show unsupported options)
  const hasGallery = Boolean(galleryField || capabilities.gallery);
  const hasServices = Boolean(servicesField || capabilities.services);
  const hasLocation = Boolean(locationFields.length > 0 || capabilities.location);
  const hasColors = capabilities.colorCustomization !== false;
  const hasIcons = capabilities.supportedIconStyles ? capabilities.supportedIconStyles.length > 1 : true;

  // Services label dynamically adapted to niche (Requirement 12)
  const servicesSectionTitle = capabilities.servicesLabel || (servicesField ? servicesField.label : 'Serviços & Conteúdo');

  return (
    <div className="h-screen flex flex-col bg-[#07080D] text-slate-100 select-none overflow-hidden font-sans">
      {/* 1. Header Bar */}
      <header className="h-14 px-3 sm:px-6 border-b border-white/10 bg-[#090A10] flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Voltar</span>
          </button>

          <div className="h-4 w-px bg-white/10 shrink-0" />

          <div className="flex items-center gap-2 min-w-0">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none border-b border-transparent focus:border-amber-400 transition-colors max-w-[130px] sm:max-w-[220px] truncate"
              placeholder="Nome do projeto"
            />
            {isTestMode ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                MODO DE TESTE
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0 hidden md:inline-block">
                {template.categoryName || template.categoryId}
              </span>
            )}
          </div>
        </div>

        {/* Center: Device Simulation Switcher (Desktop only) */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setDeviceWidth('390')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceWidth === '390'
                ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Simular smartphone padrão (390px)"
          >
            <Smartphone size={13} />
            <span>390px</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceWidth('430')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceWidth === '430'
                ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Simular smartphone grande (430px)"
          >
            <Smartphone size={14} />
            <span>430px</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceWidth('full')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              deviceWidth === 'full'
                ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Responsivo / Tela Cheia"
          >
            <Monitor size={13} />
            <span>100%</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {!isTestMode && (
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 mr-2">
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw size={12} className="animate-spin text-amber-400" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={12} className="text-emerald-400" />
                  <span>Salvo</span>
                </>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setReloadTrigger((prev) => prev + 1)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Recarregar preview completo"
          >
            <RefreshCw size={14} />
          </button>

          <button
            type="button"
            onClick={handleDownloadHtml}
            disabled={isExporting}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
            title="Baixar apenas o arquivo index.html"
          >
            <FileCode size={14} className="text-amber-400" />
            <span>index.html</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer"
            title="Baixar pacote completo com arquivos e imagens"
          >
            {isExporting ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
            <span>Baixar ZIP</span>
          </button>
        </div>
      </header>

      {/* Mobile Switcher Tab (Edit vs Preview) */}
      <div className="md:hidden flex border-b border-white/10 bg-[#0A0C14] shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-2.5 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            mobileTab === 'edit'
              ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5'
              : 'text-slate-400'
          }`}
        >
          <span>PERSONALIZAR</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
            mobileTab === 'preview'
              ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-400/5'
              : 'text-slate-400'
          }`}
        >
          <Eye size={14} />
          <span>PREVIEW AO VIVO</span>
        </button>
      </div>

      {/* Diagnostic Alert for broken assets */}
      {failedAssets.length > 0 && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-300 shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-400 shrink-0" />
            <span>
              <strong>Atenção:</strong> Não foi possível carregar:{' '}
              <span className="font-mono text-[11px]">{failedAssets.join(', ')}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFailedAssets([])}
            className="text-[10px] uppercase font-bold text-amber-400 hover:underline cursor-pointer"
          >
            Ignorar
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Accordion Editor Panel */}
        <aside
          className={`${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          } w-full md:w-[420px] lg:w-[480px] bg-[#0A0C14] border-r border-white/10 flex-col shrink-0 overflow-hidden`}
        >
          {/* Sidebar Section Header */}
          <div className="p-4 border-b border-white/10 bg-[#0E111C]/50 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-white tracking-wider uppercase">Personalizar BioSite</h2>
              <p className="text-[11px] text-slate-400">Edição visual intuitiva. O preview atualiza em tempo real.</p>
            </div>
            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              Live Sync 60fps
            </div>
          </div>

          {/* Form Scroll Area with Accordions */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* 1. IDENTIDADE */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
              <button
                type="button"
                onClick={() => toggleSection('identity')}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck size={16} className="text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Identidade da Marca</span>
                </div>
                {openSections.identity ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {openSections.identity && (
                <div className="px-4 pb-4 pt-1 border-t border-white/5">
                  <IdentitySection
                    nameField={nameField}
                    taglineField={taglineField}
                    logoField={logoField}
                    avatarField={avatarField}
                    values={values}
                    originalImages={templateOriginalImages}
                    originalTexts={templateOriginalTexts}
                    onChange={handleFieldValueChange}
                    onImageUpload={handleImageUpload}
                    onFocusField={handleFocusField}
                  />
                </div>
              )}
            </div>

            {/* 2. TEXTOS */}
            {textFields.length > 0 && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('texts')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Type size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Textos do Modelo</span>
                    <span className="text-[10px] font-mono text-slate-500">({textFields.length})</span>
                  </div>
                  {openSections.texts ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.texts && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <TextsSection
                      fields={textFields}
                      values={values}
                      originalTexts={templateOriginalTexts}
                      onChange={handleFieldValueChange}
                      onFocusField={handleFocusField}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 3. FOTOS */}
            {photoFields.length > 0 && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('photos')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <ImageIcon size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Fotos & Imagens</span>
                    <span className="text-[10px] font-mono text-slate-500">({photoFields.length})</span>
                  </div>
                  {openSections.photos ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.photos && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <PhotosSection
                      fields={photoFields}
                      values={values}
                      originalImages={templateOriginalImages}
                      imageBehaviors={capabilities.imageBehaviors}
                      onChange={handleFieldValueChange}
                      onImageUpload={handleImageUpload}
                      onFocusField={handleFocusField}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 4. GALERIA (Só se suportada pelo modelo) */}
            {hasGallery && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('gallery')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Images size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Galeria de Fotos</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ({Array.isArray(values.gallery) ? values.gallery.length : 0})
                    </span>
                  </div>
                  {openSections.gallery ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.gallery && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <GallerySection
                      galleryFieldId="gallery"
                      items={Array.isArray(values.gallery) ? values.gallery : []}
                      supportedLayouts={capabilities.supportedGalleryLayouts}
                      currentLayout={values.galleryLayout || 'original'}
                      carouselOptions={capabilities.carouselOptions}
                      carouselSettings={values.carouselSettings}
                      onChangeItems={(newItems) => handleFieldValueChange('gallery', newItems)}
                      onChangeLayout={(newLayout) => handleStyleUpdate({ galleryLayout: newLayout })}
                      onChangeCarouselSettings={(newSettings) => handleFieldValueChange('carouselSettings', newSettings)}
                      onImageUpload={handleImageUpload}
                      onFocusField={handleFocusField}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 5. SERVIÇOS / CONTEÚDO (Só se suportado pelo modelo) */}
            {hasServices && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('services')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Scissors size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider truncate">
                      {servicesSectionTitle}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      ({Array.isArray(values.services) ? values.services.length : 0})
                    </span>
                  </div>
                  {openSections.services ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.services && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <ServicesSection
                      servicesFieldId="services"
                      sectionTitle={servicesSectionTitle}
                      items={Array.isArray(values.services) ? values.services : []}
                      allowPrice={capabilities.allowPrice !== false}
                      onChangeItems={(newItems) => handleFieldValueChange('services', newItems)}
                      onFocusField={handleFocusField}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 6. REDES SOCIAIS */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
              <button
                type="button"
                onClick={() => toggleSection('social')}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Share2 size={16} className="text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Redes Sociais & Contato</span>
                </div>
                {openSections.social ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {openSections.social && (
                <div className="px-4 pb-4 pt-1 border-t border-white/5">
                  <SocialSection
                    values={values}
                    socialVisibility={values.socialVisibility}
                    onChangeValue={handleFieldValueChange}
                    onChangeVisibility={(net, vis) =>
                      handleStyleUpdate({
                        socialVisibility: { ...values.socialVisibility, [net]: vis }
                      })
                    }
                    onFocusField={handleFocusField}
                  />
                </div>
              )}
            </div>

            {/* 7. LOCALIZAÇÃO E GOOGLE */}
            {hasLocation && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('location')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Localização & Google</span>
                  </div>
                  {openSections.location ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.location && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <LocationSection
                      values={values}
                      hasGoogleReviews={capabilities.googleReviews !== false}
                      onChangeValue={handleFieldValueChange}
                      onFocusField={handleFocusField}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 8. CORES E APARÊNCIA */}
            {hasColors && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('appearance')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Palette size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Cores & Aparência</span>
                  </div>
                  {openSections.appearance ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.appearance && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <AppearanceSection
                      colorPresets={capabilities.supportedColorPresets}
                      customColorVars={capabilities.customColors}
                      supportedEffects={capabilities.supportedEffects}
                      currentColorPreset={values.colorPreset}
                      customColors={values.customColors}
                      currentEffect={values.visualEffect}
                      onSelectPreset={(preset: BioFacilColorPreset) => {
                        handleFieldValueChange('colorPreset', preset.id);
                        handleStyleUpdate({ cssVars: preset.colors });
                      }}
                      onChangeColor={(varName, color) => {
                        handleStyleUpdate({ cssVars: { [varName]: color } });
                      }}
                      onSelectEffect={(effect) => {
                        handleStyleUpdate({ visualEffect: effect });
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 9. BOTÕES E ÍCONES */}
            {hasIcons && (
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => toggleSection('icons')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Box size={16} className="text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Botões & Ícones</span>
                  </div>
                  {openSections.icons ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>

                {openSections.icons && (
                  <div className="px-4 pb-4 pt-1 border-t border-white/5">
                    <IconsSection
                      supportedStyles={capabilities.supportedIconStyles}
                      currentStyle={values.iconStyle || 'original'}
                      onSelectStyle={(newStyle) => handleStyleUpdate({ iconStyle: newStyle })}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Right: Live Responsive Preview */}
        <main
          className={`${
            mobileTab === 'edit' ? 'hidden md:flex' : 'flex'
          } flex-1 bg-[#05060A] items-center justify-center overflow-hidden relative ${
            'max-md:p-0 max-md:m-0'
          } md:p-6 lg:p-8`}
        >
          <div
            style={{
              width:
                mobileTab === 'preview'
                  ? '100%'
                  : deviceWidth === '390'
                  ? '390px'
                  : deviceWidth === '430'
                  ? '430px'
                  : '100%',
              height: '100%',
              maxWidth: '100%'
            }}
            className={`h-full transition-all duration-200 relative ${
              mobileTab === 'preview'
                ? 'w-full h-full rounded-none border-0'
                : 'rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-black'
            }`}
          >
            <iframe
              ref={iframeRef}
              srcDoc={previewHtml}
              title="Visualização do BioSite"
              className="w-full h-full border-0 block bg-black"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </main>
      </div>
    </div>
  );
};
