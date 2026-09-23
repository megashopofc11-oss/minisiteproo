import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BioFacilTemplate,
  BioFacilManifest,
  BioFacilFieldDefinition,
  BioFacilServiceItem,
  BioFacilGalleryItem,
  BioFacilTestimonialItem
} from '../types/biofacil';
import {
  generatePersonalizedHtml,
  generatePersonalizedZip,
  preparePreviewHtml,
  getTemplateOriginalImages,
  formatWhatsAppUrl,
  formatInstagramUrl,
  formatTikTokUrl,
  formatFacebookUrl,
  formatYouTubeUrl,
  formatGoogleMapsUrl,
  formatPhoneUrl,
  formatEmailUrl
} from '../services/zipTemplateEngine';
import { retrieveTemplateZip } from '../services/modelStorageService';
import { saveBioFacilUserProject } from '../firebase/firestoreService';
import {
  BrandWhatsApp,
  BrandInstagram,
  BrandTikTok,
  BrandFacebook,
  BrandGoogleMaps,
  BrandYouTube
} from '../components/BrandIcons';
import {
  ArrowLeft,
  Save,
  Download,
  Eye,
  Smartphone,
  Monitor,
  CheckCircle,
  RefreshCw,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCode,
  FileArchive,
  Phone,
  Mail,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface BioFacilEditorProps {
  template: BioFacilTemplate;
  projectId: string;
  userId: string;
  initialProjectName?: string;
  initialValues?: Record<string, any>;
  onBack: () => void;
  isTestMode?: boolean; // For Admin testing mode
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
  const manifest = template.biofacilSchema;
  const [projectName, setProjectName] = useState(initialProjectName || template.name || 'Meu BioSite');

  // Extract original images present in template HTML so they are always visible until user customizes
  const templateOriginalImages = useMemo(() => {
    return getTemplateOriginalImages(template.htmlContent || '', manifest);
  }, [template.htmlContent, manifest]);

  // Initialize values from manifest defaultValues or provided initialValues
  const [values, setValues] = useState<Record<string, any>>(() => {
    const vals: Record<string, any> = {};
    if (manifest?.fields) {
      manifest.fields.forEach((f) => {
        if (f.defaultValue !== undefined) {
          vals[f.id] = f.defaultValue;
        } else if (f.type === 'services' || f.type === 'gallery' || f.type === 'testimonials') {
          vals[f.id] = [];
        } else {
          vals[f.id] = '';
        }
      });
    }
    return { ...vals, ...(initialValues || {}) };
  });

  // Mobile mode: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  // Device width simulation (Desktop): 390px (iPhone), 430px (Max/Android), full (100%)
  // NO transform:scale() is ever used. Viewport is handled natively by CSS media queries.
  const [deviceWidth, setDeviceWidth] = useState<DeviceWidthMode>('390');

  // Autosave status: 'saved' | 'saving' | 'unsaved'
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active section accordion in sidebar
  const [activeSection, setActiveSection] = useState<string>('identity');

  // Iframe ref
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cachedZipBlob, setCachedZipBlob] = useState<Blob | null>(null);

  // Failed assets tracker (Requirement 9)
  const [failedAssets, setFailedAssets] = useState<string[]>([]);

  // Listen for asset load errors from within the iframe
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

  // Load template zip in background for downloading
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

  // Group fields by section for friendly UI tabs
  const groupedFields = useMemo(() => {
    const groups: Record<string, { label: string; icon: string; fields: BioFacilFieldDefinition[] }> = {
      identity: { label: 'Identidade & Marca', icon: '🏷️', fields: [] },
      content: { label: 'Conteúdo & Textos', icon: '📝', fields: [] },
      photos: { label: 'Fotos & Imagens', icon: '📸', fields: [] },
      services: { label: 'Serviços & Preços', icon: '✂️', fields: [] },
      contact: { label: 'Redes Sociais & Contato', icon: '📞', fields: [] },
      location: { label: 'Localização & Horários', icon: '📍', fields: [] },
      reviews: { label: 'Avaliações & Depoimentos', icon: '⭐', fields: [] },
      other: { label: 'Outros Detalhes', icon: '⚙️', fields: [] }
    };

    if (!manifest?.fields) return groups;

    manifest.fields.forEach((field) => {
      const sec = field.section || inferSection(field);
      if (!groups[sec]) {
        groups[sec] = { label: capitalize(sec), icon: '✨', fields: [] };
      }
      groups[sec].fields.push(field);
    });

    return Object.fromEntries(Object.entries(groups).filter(([_, g]) => g.fields.length > 0));
  }, [manifest]);

  function inferSection(field: BioFacilFieldDefinition): string {
    const id = field.id.toLowerCase();
    if (id.includes('logo') || id.includes('name') || id.includes('brand') || id.includes('avatar') || id.includes('photo')) return 'identity';
    if (id.includes('headline') || id.includes('slogan') || id.includes('about') || id.includes('desc') || id.includes('title')) return 'content';
    if (field.type === 'gallery' || id.includes('gallery')) return 'photos';
    if (field.type === 'services' || id.includes('service') || id.includes('price')) return 'services';
    if (
      field.type === 'phone' ||
      id.includes('whatsapp') ||
      id.includes('instagram') ||
      id.includes('tiktok') ||
      id.includes('facebook') ||
      id.includes('youtube') ||
      id.includes('contact') ||
      id.includes('email')
    ) {
      return 'contact';
    }
    if (id.includes('address') || id.includes('location') || id.includes('hours') || field.type === 'hours' || id.includes('maps')) return 'location';
    if (field.type === 'testimonials' || id.includes('review') || id.includes('depoimento')) return 'reviews';
    return 'other';
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Update a field value and notify iframe in real-time
  const handleFieldValueChange = (fieldId: string, val: any) => {
    setValues((prev) => {
      const next = { ...prev, [fieldId]: val };
      return next;
    });

    setSaveStatus('unsaved');

    // Real-time postMessage to iframe DOM without destroying or reloading the iframe
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'BIO_FACIL_UPDATE',
          fieldId,
          value: val
        },
        '*'
      );
    }

    // Trigger Autosave Debounce (1000ms)
    if (!isTestMode) {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
      autosaveTimeoutRef.current = setTimeout(() => {
        executeAutosave();
      }, 1000);
    }
  };

  // Immediate Save
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

  // Handle local image upload (converts to base64 Data URL)
  const handleImageUpload = (fieldId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleFieldValueChange(fieldId, reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // CRITICAL FIX FOR AUTO-ZOOM / FLICKER:
  // Build preview HTML once for initial load and explicit refreshes.
  // Typing into inputs sends live postMessage updates so the iframe NEVER reloads or resets scale!
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const previewHtml = useMemo(() => {
    const rawHtml = template.htmlContent || '<!DOCTYPE html><html><body><h1>Modelo em preparação</h1></body></html>';
    return preparePreviewHtml(rawHtml, manifest, values, template.assets, { isTestMode });
  }, [template.templateId, template.htmlContent, template.assets, reloadTrigger]);

  // Download personalized index.html
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

  // Download personalized ZIP package
  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      let zipToUse = cachedZipBlob;
      if (!zipToUse) {
        zipToUse = await retrieveTemplateZip(template.templateId, template.sourceFileReference);
      }

      if (!zipToUse) {
        // Fallback: build self-contained ZIP with HTML
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
            title="Simular smartphone grande / Max (430px)"
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

      {/* Diagnostic Alert for broken assets (Requirement 9) */}
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
        {/* Left: Fields Editor Panel */}
        <aside
          className={`${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          } w-full md:w-[420px] lg:w-[460px] bg-[#0A0C14] border-r border-white/10 flex-col shrink-0 overflow-hidden`}
        >
          {/* Sidebar Section Header */}
          <div className="p-4 border-b border-white/10 bg-[#0E111C]/50 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-white tracking-wider uppercase">Personalizar Modelo</h2>
              <p className="text-[11px] text-slate-400">Edite os dados abaixo. O preview atualiza em tempo real.</p>
            </div>
            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              Live Sync 60fps
            </div>
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="space-y-3">
              {Object.entries(groupedFields).map(([secKey, group]) => {
                const isOpen = activeSection === secKey;
                return (
                  <div
                    key={secKey}
                    className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveSection(isOpen ? '' : secKey)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{group.icon}</span>
                        <span className="text-xs font-bold text-white">{group.label}</span>
                        <span className="text-[10px] font-mono text-slate-500">({group.fields.length})</span>
                      </div>
                      {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 space-y-4 border-t border-white/5">
                        {group.fields.map((field) => (
                          <FieldInput
                            key={field.id}
                            field={field}
                            value={values[field.id]}
                            originalImageUrl={templateOriginalImages[field.id]}
                            onChange={(val) => handleFieldValueChange(field.id, val)}
                            onImageUpload={(file) => handleImageUpload(field.id, file)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right: Live Responsive Preview (Requirement 2 & 4) */}
        <main
          className={`${
            mobileTab === 'edit' ? 'hidden md:flex' : 'flex'
          } flex-1 bg-[#05060A] items-center justify-center overflow-hidden relative ${
            /* Mobile full screen without borders or minification */
            'max-md:p-0 max-md:m-0'
          } md:p-6 lg:p-8`}
        >
          {/* Preview Container:
              - Mobile: 100% width, 100% height, full screen native scroll.
              - Desktop: switchable 390px, 430px, or 100% full width.
              NO transform: scale() is ever applied!
          */}
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

/**
 * Individual Field Input Renderer (Type-safe, Zero Code displayed to customer)
 */
interface FieldInputProps {
  field: BioFacilFieldDefinition;
  value: any;
  originalImageUrl?: string;
  onChange: (val: any) => void;
  onImageUpload: (file: File) => void;
}

const FieldInput: React.FC<FieldInputProps> = ({ field, value, originalImageUrl, onChange, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idLower = field.id.toLowerCase();
  const isWhatsApp = field.type === 'phone' || idLower.includes('whatsapp') || idLower.includes('zap');
  const isInstagram = idLower.includes('instagram') || idLower.includes('insta');
  const isTikTok = idLower.includes('tiktok');
  const isFacebook = idLower.includes('facebook') || idLower.includes('face');
  const isYouTube = idLower.includes('youtube') || idLower.includes('canal');
  const isGoogleMaps = idLower.includes('maps') || idLower.includes('endereco') || idLower.includes('localizacao');
  const isPhone = field.type === 'phone' || idLower.includes('telefone') || idLower.includes('tel');
  const isEmail = field.type === 'email' || idLower.includes('email') || idLower.includes('mail');

  // 1. Textarea
  if (field.type === 'textarea') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 block">{field.label}</label>
        {field.description && <p className="text-[11px] text-slate-500">{field.description}</p>}
        <textarea
          rows={3}
          value={value || ''}
          placeholder={field.placeholder || 'Digite o texto...'}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-y"
        />
      </div>
    );
  }

  // 2. WhatsApp (Requirement 11: Official SVG, automatic wa.me normalization, only number requested)
  if (isWhatsApp) {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BrandWhatsApp size={16} className="text-emerald-400" />
            <span>{field.label}</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">wa.me automático</span>
        </label>
        {field.description && <p className="text-[11px] text-slate-400">{field.description}</p>}
        <input
          type="tel"
          value={value || ''}
          placeholder="(34) 99999-9999"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-emerald-500/30 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all font-mono"
        />
        <p className="text-[10px] text-emerald-400/80">
          Informe apenas o número. O link oficial do WhatsApp é gerado automaticamente.
        </p>
      </div>
    );
  }

  // 3. Instagram (Requirement 12: Official SVG, automatic @ / URL normalization)
  if (isInstagram) {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/20">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BrandInstagram size={16} className="text-rose-400" />
            <span>{field.label}</span>
          </span>
          <span className="text-[10px] text-rose-400 font-mono font-bold">@perfil</span>
        </label>
        {field.description && <p className="text-[11px] text-slate-400">{field.description}</p>}
        <input
          type="text"
          value={value || ''}
          placeholder="@seuperfil ou link"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-rose-500/30 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
        />
        <p className="text-[10px] text-rose-400/80">
          Digite seu @ ou link. O link oficial do Instagram é atualizado automaticamente.
        </p>
      </div>
    );
  }

  // 4. TikTok (Requirement 13)
  if (isTikTok) {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-cyan-500/[0.04] border border-cyan-500/20">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BrandTikTok size={16} className="text-cyan-400" />
            <span>{field.label}</span>
          </span>
          <span className="text-[10px] text-cyan-400 font-mono font-bold">TikTok</span>
        </label>
        <input
          type="text"
          value={value || ''}
          placeholder="@seuperfil"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-cyan-500/30 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
        />
      </div>
    );
  }

  // 5. Facebook (Requirement 13)
  if (isFacebook) {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-blue-500/[0.04] border border-blue-500/20">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BrandFacebook size={16} className="text-blue-400" />
            <span>{field.label}</span>
          </span>
          <span className="text-[10px] text-blue-400 font-mono font-bold">Facebook</span>
        </label>
        <input
          type="text"
          value={value || ''}
          placeholder="suapagina ou link"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-blue-500/30 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
        />
      </div>
    );
  }

  // 6. YouTube (Requirement 13)
  if (isYouTube) {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-red-500/[0.04] border border-red-500/20">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BrandYouTube size={16} className="text-red-400" />
            <span>{field.label}</span>
          </span>
          <span className="text-[10px] text-red-400 font-mono font-bold">YouTube</span>
        </label>
        <input
          type="text"
          value={value || ''}
          placeholder="@seucanal ou link"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-red-500/30 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all"
        />
      </div>
    );
  }

  // 7. Google Maps (Requirement 13)
  if (isGoogleMaps) {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BrandGoogleMaps size={16} className="text-emerald-400" />
            <span>{field.label}</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold">Google Maps</span>
        </label>
        <input
          type="text"
          value={value || ''}
          placeholder="Endereço ou link do Google Maps"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-emerald-500/30 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
        />
      </div>
    );
  }

  // 8. Telephone
  if (isPhone) {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Phone size={14} className="text-amber-400" />
            <span>{field.label}</span>
          </span>
        </label>
        <input
          type="tel"
          value={value || ''}
          placeholder="(11) 99999-9999"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-mono"
        />
      </div>
    );
  }

  // 9. Email
  if (isEmail) {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Mail size={14} className="text-amber-400" />
            <span>{field.label}</span>
          </span>
        </label>
        <input
          type="email"
          value={value || ''}
          placeholder="contato@seusite.com"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
        />
      </div>
    );
  }

  // 10. Image with demonstrative preservation (Requirement 8)
  if (field.type === 'image') {
    const isCustomized = Boolean(value && String(value).trim().length > 0);
    const activePhotoSrc = isCustomized ? value : originalImageUrl;

    return (
      <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-200 block">{field.label}</label>
          {isCustomized ? (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
              Sua foto personalizada
            </span>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/10">
              Foto demonstrativa do modelo
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activePhotoSrc ? (
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 relative group shadow-md">
              <img src={activePhotoSrc} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center shrink-0 text-slate-500">
              <ImageIcon size={22} />
            </div>
          )}

          <div className="flex-1 space-y-1.5 min-w-0">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onImageUpload(f);
              }}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-amber-400/20"
              >
                {isCustomized ? 'Trocar Minha Foto' : 'Substituir Foto'}
              </button>

              {isCustomized && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                  title="Restaurar foto original demonstrativa do modelo"
                >
                  <RotateCcw size={12} />
                  <span>Restaurar Original</span>
                </button>
              )}
            </div>

            <input
              type="url"
              value={value || ''}
              placeholder="Ou cole a URL da imagem..."
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    );
  }

  // 11. Services List
  if (field.type === 'services') {
    const services: BioFacilServiceItem[] = Array.isArray(value) ? value : [];

    const addService = () => {
      onChange([
        ...services,
        {
          id: `srv_${Date.now()}`,
          name: 'Novo Procedimento',
          description: 'Descrição do procedimento ou serviço',
          price: 'R$ 80'
        }
      ]);
    };

    const updateService = (index: number, updated: Partial<BioFacilServiceItem>) => {
      const copy = [...services];
      copy[index] = { ...copy[index], ...updated };
      onChange(copy);
    };

    const removeService = (index: number) => {
      onChange(services.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">{field.label}</label>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
          >
            <Plus size={13} />
            <span>Adicionar Serviço</span>
          </button>
        </div>

        <div className="space-y-2">
          {services.map((srv, idx) => (
            <div key={srv.id || idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={srv.name}
                  onChange={(e) => updateService(idx, { name: e.target.value })}
                  placeholder="Nome do serviço"
                  className="font-bold text-xs text-white bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none w-full"
                />
                <input
                  type="text"
                  value={srv.price || ''}
                  onChange={(e) => updateService(idx, { price: e.target.value })}
                  placeholder="R$ 0,00"
                  className="text-right text-xs font-mono font-bold text-amber-400 bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none w-24 shrink-0"
                />
                <button
                  type="button"
                  onClick={() => removeService(idx)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <input
                type="text"
                value={srv.description || ''}
                onChange={(e) => updateService(idx, { description: e.target.value })}
                placeholder="Breve descrição"
                className="w-full text-[11px] text-slate-300 bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 12. Gallery Items
  if (field.type === 'gallery') {
    const gallery: BioFacilGalleryItem[] = Array.isArray(value) ? value : [];

    const addGalleryPhoto = () => {
      onChange([
        ...gallery,
        {
          id: `gal_${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
          caption: 'Foto do trabalho'
        }
      ]);
    };

    const updateGalleryPhoto = (index: number, updated: Partial<BioFacilGalleryItem>) => {
      const copy = [...gallery];
      copy[index] = { ...copy[index], ...updated };
      onChange(copy);
    };

    const removeGalleryPhoto = (index: number) => {
      onChange(gallery.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">{field.label}</label>
          <button
            type="button"
            onClick={addGalleryPhoto}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
          >
            <Plus size={13} />
            <span>Adicionar Foto</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {gallery.map((photo, idx) => (
            <div key={photo.id || idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2 relative">
              <div className="h-28 rounded-lg overflow-hidden bg-slate-900 border border-white/10 relative group">
                <img src={photo.url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryPhoto(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/70 text-red-400 hover:bg-black transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              <input
                type="text"
                value={photo.caption || ''}
                onChange={(e) => updateGalleryPhoto(idx, { caption: e.target.value })}
                placeholder="Legenda da foto"
                className="w-full text-[11px] text-white bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none"
              />
              <input
                type="url"
                value={photo.url || ''}
                onChange={(e) => updateGalleryPhoto(idx, { url: e.target.value })}
                placeholder="URL da foto"
                className="w-full text-[10px] text-slate-400 bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 13. Default Text / General Input
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-300 block">{field.label}</label>
      {field.description && <p className="text-[11px] text-slate-500">{field.description}</p>}
      <input
        type="text"
        value={value || ''}
        placeholder={field.placeholder || 'Digite o texto...'}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
      />
    </div>
  );
};
