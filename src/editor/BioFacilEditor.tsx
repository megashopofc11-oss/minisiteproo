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
  preparePreviewHtml
} from '../services/zipTemplateEngine';
import { retrieveTemplateZip } from '../services/modelStorageService';
import { saveBioFacilUserProject } from '../firebase/firestoreService';
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
  FileArchive
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
  // Desktop preview device frame: 'desktop' or 'mobile'
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Autosave status: 'saved' | 'saving' | 'unsaved'
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active section accordion in sidebar
  const [activeSection, setActiveSection] = useState<string>('identity');

  // Iframe ref
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cachedZipBlob, setCachedZipBlob] = useState<Blob | null>(null);

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
      photos: { label: 'Fotos & Galeria', icon: '📸', fields: [] },
      services: { label: 'Serviços & Preços', icon: '✂️', fields: [] },
      contact: { label: 'WhatsApp & Contato', icon: '📞', fields: [] },
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

    // Remove empty groups
    return Object.fromEntries(Object.entries(groups).filter(([_, g]) => g.fields.length > 0));
  }, [manifest]);

  // Helper to categorize fields if not specified in manifest
  function inferSection(field: BioFacilFieldDefinition): string {
    const id = field.id.toLowerCase();
    if (id.includes('logo') || id.includes('name') || id.includes('brand') || id.includes('avatar') || id.includes('photo')) return 'identity';
    if (id.includes('headline') || id.includes('slogan') || id.includes('about') || id.includes('desc') || id.includes('title')) return 'content';
    if (field.type === 'gallery' || id.includes('gallery')) return 'photos';
    if (field.type === 'services' || id.includes('service') || id.includes('price')) return 'services';
    if (field.type === 'phone' || id.includes('whatsapp') || id.includes('instagram') || id.includes('contact') || id.includes('email')) return 'contact';
    if (id.includes('address') || id.includes('location') || id.includes('hours') || field.type === 'hours') return 'location';
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

    // Real-time postMessage to iframe DOM without reload
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
      setSaveStatus('saved'); // Don't alarm the user
    }
  };

  // Handle local image upload (converts to base64 Data URL so customer doesn't need to host files)
  const handleImageUpload = (fieldId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        handleFieldValueChange(fieldId, reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Build the preview HTML document
  const previewHtml = useMemo(() => {
    const rawHtml = template.htmlContent || '<!DOCTYPE html><html><body><h1>Modelo em preparação</h1></body></html>';
    return preparePreviewHtml(rawHtml, manifest, values, template.assets);
  }, [template, manifest, values]);

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

      const rawHtml = template.htmlContent || '';
      const finalZipBlob = await generatePersonalizedZip(
        zipToUse || new Blob([]),
        manifest,
        values,
        rawHtml
      );

      const url = URL.createObjectURL(finalZipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert(`Falha ao exportar ZIP: ${err.message || 'Erro inesperado'}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Open Fullscreen Preview
  const handleOpenFullscreen = () => {
    const rawHtml = template.htmlContent || '';
    const finalHtml = generatePersonalizedHtml(rawHtml, manifest, values);
    const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#07080D] text-slate-100 overflow-hidden font-sans">
      {/* 1. Header Bar */}
      <header className="h-16 px-4 sm:px-6 bg-[#0B0D14] border-b border-white/10 flex items-center justify-between shrink-0 z-30">
        {/* Left: Back & Project Name */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Voltar"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex flex-col">
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setSaveStatus('unsaved');
                if (!isTestMode) {
                  if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
                  autosaveTimeoutRef.current = setTimeout(executeAutosave, 1200);
                }
              }}
              className="text-sm font-bold text-white bg-transparent border-b border-transparent hover:border-white/20 focus:border-amber-400 focus:outline-none transition-colors px-1 py-0.5 rounded"
              placeholder="Nome do seu BioSite"
            />
            <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
              <span className="font-medium text-amber-400">{template.name}</span>
              <span>•</span>
              {saveStatus === 'saving' && (
                <span className="flex items-center gap-1 text-amber-300">
                  <RefreshCw size={11} className="animate-spin" /> SALVANDO...
                </span>
              )}
              {saveStatus === 'saved' && (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle size={11} /> ✓ SALVO
                </span>
              )}
              {saveStatus === 'unsaved' && (
                <span className="text-slate-400">Alterações pendentes</span>
              )}
              {isTestMode && <span className="text-purple-400 font-bold">[MODO TESTE ADMIN]</span>}
            </div>
          </div>
        </div>

        {/* Center: Device Switcher (Desktop only) */}
        <div className="hidden md:flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
          <button
            type="button"
            onClick={() => setPreviewDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              previewDevice === 'desktop' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor size={14} />
            <span>Computador</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              previewDevice === 'mobile' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>Celular</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile view toggle */}
          <div className="flex md:hidden bg-white/5 rounded-xl p-1 border border-white/10 mr-1">
            <button
              type="button"
              onClick={() => setMobileTab('edit')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                mobileTab === 'edit' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              ✏️ EDITAR
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                mobileTab === 'preview' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              👁 PREVIEW
            </button>
          </div>

          <button
            type="button"
            onClick={handleOpenFullscreen}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 border border-white/10 cursor-pointer"
            title="Visualizar em tela cheia"
          >
            <Eye size={14} />
            <span>Visualizar</span>
          </button>

          <button
            type="button"
            onClick={executeAutosave}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 border border-white/10 cursor-pointer"
            title="Salvar alterações"
          >
            <Save size={14} />
            <span>Salvar</span>
          </button>

          {/* Export Dropdown / Buttons */}
          <button
            type="button"
            disabled={isExporting}
            onClick={handleDownloadHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/10 transition-colors cursor-pointer"
            title="Baixar arquivo HTML único pronto para hospedar"
          >
            <FileCode size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Baixar HTML</span>
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={handleDownloadZip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
            title="Baixar pacote completo com arquivos e imagens em ZIP"
          >
            <FileArchive size={14} />
            <span>Baixar ZIP</span>
          </button>
        </div>
      </header>

      {/* 2. Main Workspace: Sidebar Form + Live Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Visual Form Generator (Hidden on mobile if tab is 'preview') */}
        <aside
          className={`${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          } w-full md:w-[420px] lg:w-[440px] flex-col bg-[#0A0C14] border-r border-white/10 shrink-0 overflow-y-auto`}
        >
          <div className="p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Personalizar Conteúdo</h2>
              <p className="text-xs text-slate-400">
                Altere os campos abaixo. O preview ao lado atualiza em tempo real.
              </p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-3">
              {Object.entries(groupedFields).map(([secKey, group]) => {
                const isOpen = activeSection === secKey;
                return (
                  <div
                    key={secKey}
                    className="rounded-2xl border border-white/10 bg-[#0E111C] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveSection(isOpen ? '' : secKey)}
                      className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{group.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          {group.label}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-[10px] text-slate-400 font-mono">
                          {group.fields.length}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 space-y-4 border-t border-white/5">
                        {group.fields.map((field) => (
                          <FieldInput
                            key={field.id}
                            field={field}
                            value={values[field.id]}
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

        {/* Right: Live Preview in Isolated Iframe (Hidden on mobile if tab is 'edit') */}
        <main
          className={`${
            mobileTab === 'edit' ? 'hidden md:flex' : 'flex'
          } flex-1 bg-[#05060A] items-center justify-center p-2 sm:p-6 overflow-hidden relative`}
        >
          <div
            className={`w-full h-full transition-all duration-300 flex items-center justify-center ${
              previewDevice === 'mobile'
                ? 'max-w-[400px] max-h-[820px] rounded-[40px] border-[10px] border-slate-800 shadow-2xl overflow-hidden'
                : 'w-full h-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden'
            }`}
          >
            <iframe
              ref={iframeRef}
              srcDoc={previewHtml}
              title="Visualização ao Vivo"
              className="w-full h-full border-0 bg-white"
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
  onChange: (val: any) => void;
  onImageUpload: (file: File) => void;
}

const FieldInput: React.FC<FieldInputProps> = ({ field, value, onChange, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Text input
  if (field.type === 'text') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 block">{field.label}</label>
        {field.description && <p className="text-[11px] text-slate-500">{field.description}</p>}
        <input
          type="text"
          value={value || ''}
          placeholder={field.placeholder || 'Digite aqui...'}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
        />
      </div>
    );
  }

  // 2. Textarea
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

  // 3. Phone / WhatsApp
  if (field.type === 'phone') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>{field.label}</span>
          <span className="text-[10px] text-emerald-400 font-mono">WhatsApp</span>
        </label>
        <input
          type="tel"
          value={value || ''}
          placeholder="(11) 99999-9999"
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
        />
      </div>
    );
  }

  // 4. Image with upload & preview
  if (field.type === 'image') {
    return (
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">{field.label}</label>
        <div className="flex items-center gap-3">
          {value ? (
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 relative group">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center shrink-0 text-slate-500">
              <ImageIcon size={20} />
            </div>
          )}

          <div className="flex-1 space-y-1.5">
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
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {value ? 'Trocar Imagem' : 'Enviar Imagem'}
              </button>
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors cursor-pointer"
                  title="Remover imagem"
                >
                  <Trash2 size={14} />
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

  // 5. Services List
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
                  className="text-xs text-amber-400 font-bold bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none w-20 text-right shrink-0"
                />
                <button
                  type="button"
                  onClick={() => removeService(idx)}
                  className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <input
                type="text"
                value={srv.description || ''}
                onChange={(e) => updateService(idx, { description: e.target.value })}
                placeholder="Descrição breve do serviço"
                className="text-[11px] text-slate-400 bg-transparent border-b border-transparent focus:border-white/20 focus:outline-none w-full"
              />
            </div>
          ))}

          {services.length === 0 && (
            <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs text-slate-500">
              Nenhum serviço adicionado ainda.
            </div>
          )}
        </div>
      </div>
    );
  }

  // 6. Gallery List
  if (field.type === 'gallery') {
    const photos: BioFacilGalleryItem[] = Array.isArray(value) ? value : [];

    const addPhoto = () => {
      onChange([
        ...photos,
        {
          id: `gal_${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800',
          caption: 'Foto do Portfólio'
        }
      ]);
    };

    const updatePhoto = (index: number, updated: Partial<BioFacilGalleryItem>) => {
      const copy = [...photos];
      copy[index] = { ...copy[index], ...updated };
      onChange(copy);
    };

    const removePhoto = (index: number) => {
      onChange(photos.filter((_, i) => i !== index));
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">{field.label}</label>
          <button
            type="button"
            onClick={addPhoto}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
          >
            <Plus size={13} />
            <span>Adicionar Foto</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {photos.map((item, idx) => (
            <div key={item.id || idx} className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1.5 relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border border-white/5">
                <img src={item.url} alt={item.caption || 'Foto'} className="w-full h-full object-cover" />
              </div>
              <input
                type="text"
                value={item.caption || ''}
                onChange={(e) => updatePhoto(idx, { caption: e.target.value })}
                placeholder="Legenda..."
                className="text-[10px] text-slate-300 bg-transparent border-b border-transparent focus:border-amber-400 focus:outline-none w-full px-1"
              />
              <button
                type="button"
                onClick={() => removePhoto(idx)}
                className="absolute top-3 right-3 p-1 rounded-md bg-black/60 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. General fallback (email, url, color, select, etc.)
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-300 block">{field.label}</label>
      <input
        type={field.type === 'email' ? 'email' : field.type === 'color' ? 'color' : 'text'}
        value={value || ''}
        placeholder={field.placeholder || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
      />
    </div>
  );
};
