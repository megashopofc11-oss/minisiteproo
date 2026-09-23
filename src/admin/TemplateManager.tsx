import React, { useState, useEffect, useRef } from 'react';
import {
  BioFacilTemplate,
  TemplateStatus,
  INITIAL_NICHES,
  BioFacilManifest
} from '../types/biofacil';
import {
  fetchAllTemplates,
  fetchTemplateById,
  saveTemplate,
  updateTemplateStatus,
  deleteTemplate,
  checkTemplateUsageCount
} from '../firebase/firestoreService';
import {
  validateAndParseZip,
  ZipValidationResult,
  preparePreviewHtml
} from '../services/zipTemplateEngine';
import {
  uploadTemplateZip,
  uploadThumbnailImage,
  checkStorageStatus,
  saveAssetsToIndexedDb,
  optimizeThumbnailDataUrl
} from '../services/modelStorageService';
import { BioFacilEditor } from '../editor/BioFacilEditor';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileArchive,
  UploadCloud,
  ExternalLink,
  RefreshCw,
  FolderKanban,
  Check,
  X,
  Play,
  Save,
  Smartphone,
  Monitor
} from 'lucide-react';

export const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<BioFacilTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | TemplateStatus>('all');
  const [search, setSearch] = useState('');
  const [previewModalWidth, setPreviewModalWidth] = useState<'390' | '430' | 'full'>('390');

  // Storage notification
  const [storageStatusMsg, setStorageStatusMsg] = useState<string>('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<BioFacilTemplate | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formNicho, setFormNicho] = useState('barbearia');
  const [formCustomNicho, setFormCustomNicho] = useState('');
  const [formDemoUrl, setFormDemoUrl] = useState('');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('');
  const [formStatus, setFormStatus] = useState<TemplateStatus>('draft');

  // ZIP File & Validation State
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [isValidatingZip, setIsValidatingZip] = useState(false);
  const [zipValidation, setZipValidation] = useState<ZipValidationResult | null>(null);
  const [parsedManifest, setParsedManifest] = useState<BioFacilManifest | null>(null);
  const [parsedHtml, setParsedHtml] = useState<string>('');
  const [extractedAssets, setExtractedAssets] = useState<Record<string, string>>({});

  // Testing mode in editor
  const [testingTemplate, setTestingTemplate] = useState<BioFacilTemplate | null>(null);

  // Preview Modal
  const [previewingTemplate, setPreviewingTemplate] = useState<BioFacilTemplate | null>(null);

  // Deletion confirmation
  const [deleteCandidate, setDeleteCandidate] = useState<BioFacilTemplate | null>(null);
  const [deleteUsageCount, setDeleteUsageCount] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Saving state
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [successNotification, setSuccessNotification] = useState('');

  const zipInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const data = await fetchAllTemplates();
      setTemplates(data);
    } catch (err) {
      console.error('Error fetching templates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
    checkStorageStatus().then((res) => {
      setStorageStatusMsg(res.message);
    });
  }, []);

  // Filter templates by status and search
  const filteredTemplates = templates.filter((t) => {
    if (activeTab !== 'all' && t.status !== activeTab) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchCategory = t.categoryId.toLowerCase().includes(q) || (t.categoryName || '').toLowerCase().includes(q);
      if (!matchName && !matchCategory) return false;
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingTemplate(null);
    setFormName('');
    setFormNicho('barbearia');
    setFormCustomNicho('');
    setFormDemoUrl('');
    setFormThumbnailUrl('');
    setFormStatus('published');
    setZipFile(null);
    setZipValidation(null);
    setParsedManifest(null);
    setParsedHtml('');
    setExtractedAssets({});
    setSaveError('');
    setIsModalOpen(true);
  };

  const openEditModal = (t: BioFacilTemplate) => {
    setEditingTemplate(t);
    setFormName(t.name);
    setFormNicho(INITIAL_NICHES.some((n) => n.id === t.categoryId) ? t.categoryId : 'custom');
    if (!INITIAL_NICHES.some((n) => n.id === t.categoryId)) {
      setFormCustomNicho(t.categoryName || t.categoryId);
    }
    setFormDemoUrl(t.demoUrl);
    setFormThumbnailUrl(t.thumbnailUrl);
    setFormStatus(t.status);
    setZipFile(null);
    setZipValidation(null);
    setParsedManifest(t.biofacilSchema);
    setParsedHtml(t.htmlContent || '');
    setExtractedAssets(t.assets || {});
    setSaveError('');
    setIsModalOpen(true);
  };

  // Handle ZIP selection & validation
  const handleZipSelected = async (file: File) => {
    setZipFile(file);
    setIsValidatingZip(true);
    setSaveError('');

    try {
      const result = await validateAndParseZip(file);
      setZipValidation(result);

      if (result.manifest) {
        setParsedManifest(result.manifest);
        // Automatically prefill name and niche if not filled
        if (!formName && result.manifest.name) {
          setFormName(result.manifest.name);
        }
        if (result.manifest.category) {
          const cat = result.manifest.category.toLowerCase();
          const matched = INITIAL_NICHES.find((n) => n.id === cat || n.name.toLowerCase().includes(cat));
          if (matched) {
            setFormNicho(matched.id);
          }
        }
      }

      if (result.rawHtml) {
        setParsedHtml(result.rawHtml);
      }
      if (result.assetsMap) {
        setExtractedAssets(result.assetsMap);
      }
    } catch (err: any) {
      setZipValidation({
        valid: false,
        errors: [`Erro ao processar arquivo: ${err.message}`],
        warnings: [],
        assetsCount: 0,
        fieldsMatched: [],
        fieldsMissingInHtml: []
      });
    } finally {
      setIsValidatingZip(false);
    }
  };

  // Handle Thumbnail image selection
  const handleThumbnailSelected = async (file: File) => {
    try {
      const targetId = parsedManifest?.templateId || editingTemplate?.templateId || 'thumb_temp';
      const uploadRes = await uploadThumbnailImage(targetId, file);
      if (uploadRes.url) {
        setFormThumbnailUrl(uploadRes.url);
        return;
      }
    } catch {
      // fallback
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        const optimized = await optimizeThumbnailDataUrl(reader.result as string);
        setFormThumbnailUrl(optimized);
      }
    };
    reader.readAsDataURL(file);
  };

  // Test Model before publishing (opens editor in test mode)
  const handleTestModel = () => {
    if (!parsedManifest || !parsedHtml) {
      alert('Carregue e valide o arquivo ZIP do modelo antes de testar.');
      return;
    }

    const testTemplateObj: BioFacilTemplate = {
      templateId: parsedManifest.templateId || editingTemplate?.templateId || `test_${Date.now()}`,
      name: formName || parsedManifest.name || 'Modelo de Teste',
      slug: (formName || parsedManifest.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
      categoryId: formNicho === 'custom' ? formCustomNicho : formNicho,
      categoryName: formNicho === 'custom' ? formCustomNicho : INITIAL_NICHES.find((n) => n.id === formNicho)?.name || formNicho,
      demoUrl: formDemoUrl,
      thumbnailUrl: formThumbnailUrl,
      status: 'draft',
      version: parsedManifest.version || 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: 'admin',
      biofacilSchema: parsedManifest,
      htmlContent: parsedHtml,
      assets: extractedAssets
    };

    setTestingTemplate(testTemplateObj);
  };

  // Submit Save with strict robust try-catch-finally and exact 8-step logs
  const handleSaveTemplate = async () => {
    if (isSaving) return; // Prevent duplicate clicks

    console.log('[1] Iniciando cadastro');

    // 1. Validate Form Fields
    if (!formName.trim()) {
      setSaveError('Informe o nome do modelo.');
      return;
    }

    const selectedCategoryId = formNicho === 'custom' ? formCustomNicho.trim() : formNicho;
    if (!selectedCategoryId) {
      setSaveError('Selecione ou informe um nicho válido.');
      return;
    }

    if (!editingTemplate && !zipFile && !parsedHtml) {
      setSaveError('Selecione o arquivo ZIP obrigatório contendo index.html e biofacil.json.');
      return;
    }

    if (zipValidation && !zipValidation.valid) {
      setSaveError(
        zipValidation.errors?.length
          ? zipValidation.errors.join(' | ')
          : 'O arquivo ZIP possui erros críticos. Corrija o arquivo antes de cadastrar.'
      );
      return;
    }

    const templateId =
      parsedManifest?.templateId ||
      editingTemplate?.templateId ||
      `BF-${selectedCategoryId.toUpperCase().slice(0, 6)}-${Date.now().toString(36).toUpperCase()}`;

    console.log('[2] Dados validados');

    setIsSaving(true);
    setSaveError('');

    try {
      console.log('[3] Iniciando armazenamento do arquivo');

      let sourceRef = editingTemplate?.sourceFileReference || `indexeddb://${templateId}`;

      // Upload or cache ZIP in IndexedDB and storage with timeout (never stalls)
      if (zipFile) {
        const uploadRes = await uploadTemplateZip(templateId, zipFile);
        if (uploadRes.url) {
          sourceRef = uploadRes.url;
        }
      }

      // Store extracted assets in IndexedDB so all images/fonts are safely cached
      if (extractedAssets && Object.keys(extractedAssets).length > 0) {
        await saveAssetsToIndexedDb(templateId, extractedAssets);
      }

      // Process and optimize thumbnail data URL
      let processedThumbnail = formThumbnailUrl;
      if (processedThumbnail && processedThumbnail.startsWith('data:image/')) {
        processedThumbnail = await optimizeThumbnailDataUrl(processedThumbnail);
      }
      if (!processedThumbnail) {
        processedThumbnail = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800';
      }

      console.log('[4] Arquivo armazenado');

      console.log('[5] Salvando documento do template');

      const categoryObj = INITIAL_NICHES.find((n) => n.id === selectedCategoryId);
      const categoryDisplayName = categoryObj ? categoryObj.name : selectedCategoryId;

      // Filter assets to keep Firestore document comfortably under 1MB limit:
      // Lightweight text assets (CSS, SVG, small fonts) stay in Firestore.
      // Large binary assets are in IndexedDB and parsed from the cached ZIP on-demand.
      let firestoreAssets: Record<string, string> | undefined = undefined;
      const assetsSource = Object.keys(extractedAssets).length > 0 ? extractedAssets : editingTemplate?.assets;
      if (assetsSource && Object.keys(assetsSource).length > 0) {
        const assetsJson = JSON.stringify(assetsSource);
        if (assetsJson.length < 500000) {
          firestoreAssets = assetsSource;
        } else {
          const lightAssets: Record<string, string> = {};
          for (const [k, v] of Object.entries(assetsSource)) {
            if (k.endsWith('.css') || k.endsWith('.svg') || v.length < 35000) {
              lightAssets[k] = v;
            }
          }
          firestoreAssets = Object.keys(lightAssets).length > 0 ? lightAssets : undefined;
        }
      }

      const templateToSave: BioFacilTemplate = {
        templateId,
        name: formName.trim(),
        slug: formName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-'),
        categoryId: selectedCategoryId,
        categoryName: categoryDisplayName,
        demoUrl: formDemoUrl.trim(),
        thumbnailUrl: processedThumbnail,
        sourceFileReference: sourceRef,
        status: formStatus, // "published" | "draft" | "disabled"
        version: parsedManifest?.version || editingTemplate?.version || 1,
        createdAt: editingTemplate?.createdAt || Date.now(),
        updatedAt: Date.now(),
        createdBy: editingTemplate?.createdBy || 'admin',
        biofacilSchema: parsedManifest || editingTemplate!.biofacilSchema,
        htmlContent: parsedHtml || editingTemplate?.htmlContent || '',
        hasSourceZip: !!zipFile || !!editingTemplate?.hasSourceZip,
        ...(firestoreAssets ? { assets: firestoreAssets } : {})
      };

      // Save to Firestore
      await saveTemplate(templateToSave);

      // Verify and confirm that document exists
      const savedDoc = await fetchTemplateById(templateId);
      if (!savedDoc) {
        throw new Error('Não foi possível confirmar a gravação do modelo no banco de dados.');
      }

      console.log('[6] Documento salvo');

      if (formStatus === 'published') {
        console.log('[7] Status published confirmado');
      } else {
        console.log(`[7] Status ${formStatus} confirmado`);
      }

      console.log('[8] Cadastro concluído');

      // Success notification feedback
      const successMsg =
        formStatus === 'published'
          ? '✓ MODELO PUBLICADO COM SUCESSO'
          : formStatus === 'draft'
          ? '✓ MODELO SALVO COM SUCESSO (RASCUNHO)'
          : '✓ MODELO SALVO COM SUCESSO';

      setSuccessNotification(successMsg);
      setIsModalOpen(false);

      // Refresh admin list immediately
      await loadTemplates();
    } catch (error: any) {
      console.error('ERRO AO CADASTRAR MODELO:', error);
      let errorMsg = 'Erro ao cadastrar modelo.';
      if (error?.message) {
        try {
          const parsed = JSON.parse(error.message);
          if (
            parsed.error?.includes('permission-denied') ||
            parsed.error?.includes('Missing or insufficient permissions')
          ) {
            errorMsg = 'Permissão negada pelo Firebase. Verifique privilégios de administrador.';
          } else {
            errorMsg = parsed.error || error.message;
          }
        } catch {
          errorMsg = error.message;
        }
      }
      setSaveError(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  // Change status directly (Publish / Disable)
  const handleToggleStatus = async (templateId: string, currentStatus: TemplateStatus) => {
    const nextStatus: TemplateStatus = currentStatus === 'published' ? 'disabled' : 'published';
    try {
      await updateTemplateStatus(templateId, nextStatus);
      await loadTemplates();
    } catch (err) {
      alert('Não foi possível alterar o status do modelo.');
    }
  };

  // Initiate Deletion Check
  const handlePromptDelete = async (template: BioFacilTemplate) => {
    const count = await checkTemplateUsageCount(template.templateId);
    setDeleteUsageCount(count);
    setDeleteCandidate(template);
  };

  // Execute Deletion
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);
    try {
      await deleteTemplate(deleteCandidate.templateId);
      setDeleteCandidate(null);
      await loadTemplates();
    } catch (err) {
      alert('Falha ao excluir o modelo.');
    } finally {
      setIsDeleting(false);
    }
  };

  // If in Testing Mode in Editor
  if (testingTemplate) {
    return (
      <BioFacilEditor
        template={testingTemplate}
        projectId={`test_proj_${Date.now()}`}
        userId="admin_test"
        onBack={() => setTestingTemplate(null)}
        isTestMode={true}
      />
    );
  }

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span>Modelos de BioSite</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-mono font-bold">
              {templates.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cadastre, publique e gerencie os modelos profissionais que aparecerão para os clientes.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>+ Adicionar Modelo</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successNotification && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 flex items-center justify-between shadow-lg shadow-emerald-500/10">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span className="font-bold text-xs sm:text-sm tracking-wide">{successNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessNotification('')}
            className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Storage info notice */}
      {storageStatusMsg && (
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-center gap-2">
          <UploadCloud size={15} className="text-amber-400 shrink-0" />
          <span>{storageStatusMsg} Modelos salvos são preservados para visualização, personalização e exportação.</span>
        </div>
      )}

      {/* 2. Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0B0D14] p-3 rounded-2xl border border-white/10">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'all' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({templates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('published')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'published' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Publicados ({templates.filter((t) => t.status === 'published').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('draft')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'draft' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rascunhos ({templates.filter((t) => t.status === 'draft').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('disabled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'disabled' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Desativados ({templates.filter((t) => t.status === 'disabled').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar modelo ou nicho..."
            className="w-full sm:w-64 pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* 3. Models Table / Cards */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw size={24} className="animate-spin text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Carregando modelos...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-white/10 bg-[#0A0C14] space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-400">
            <FileArchive size={28} />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-white">Nenhum modelo cadastrado</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A biblioteca está pronta e vazia. Clique em <strong>"+ Adicionar Modelo"</strong> para importar seu primeiro pacote .ZIP e disponibilizá-lo para os clientes.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
          >
            + Cadastrar Primeiro Modelo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((t) => (
            <div
              key={t.templateId}
              className="rounded-2xl border border-white/10 bg-[#0E111C] overflow-hidden flex flex-col justify-between group hover:border-amber-400/30 transition-all"
            >
              {/* Cover Image & Badges */}
              <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                <img
                  src={t.thumbnailUrl}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E111C] via-transparent to-black/40"></div>

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {t.status === 'published' && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow">
                      ● Publicado
                    </span>
                  )}
                  {t.status === 'draft' && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow">
                      ● Rascunho
                    </span>
                  )}
                  {t.status === 'disabled' && (
                    <span className="px-2.5 py-1 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold uppercase tracking-wider shadow">
                      ● Desativado
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-black/60 text-slate-300 text-[10px] font-mono">
                    v{t.version || 1}
                  </span>
                </div>

                {/* Nicho Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    {t.categoryName || t.categoryId}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base leading-tight mb-1">{t.name}</h3>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3">
                    <span>{t.biofacilSchema?.fields?.length || 0} campos editáveis</span>
                    <span>•</span>
                    <span>Atualizado {new Date(t.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreviewingTemplate(t)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Visualizar modelo"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditModal(t)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Editar cadastro"
                    >
                      <Edit size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(t.templateId, t.status)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        t.status === 'published'
                          ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                      title={t.status === 'published' ? 'Desativar modelo' : 'Publicar modelo'}
                    >
                      {t.status === 'published' ? 'Desativar' : 'Publicar'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePromptDelete(t)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    title="Excluir modelo"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Modal: Cadastrar / Editar Modelo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0B0D14] border border-white/10 rounded-3xl max-w-2xl w-full p-5 sm:p-8 space-y-6 shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {editingTemplate ? 'Editar Modelo de BioSite' : 'Cadastrar Novo Modelo de BioSite'}
                </h3>
                <p className="text-xs text-slate-400">
                  Preencha os dados e envie o pacote ZIP contendo index.html e biofacil.json
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Banner */}
            {saveError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2">
                <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                <span>{saveError}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              {/* Nome do Modelo */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">NOME DO MODELO *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ex: Barbearia Cinematic Noir"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Nicho Selection */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">NICHO *</label>
                <select
                  value={formNicho}
                  onChange={(e) => setFormNicho(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E111C] border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {INITIAL_NICHES.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))}
                  <option value="custom">+ Outro Nicho Personalizado</option>
                </select>

                {formNicho === 'custom' && (
                  <input
                    type="text"
                    value={formCustomNicho}
                    onChange={(e) => setFormCustomNicho(e.target.value)}
                    placeholder="Digite o nome do novo nicho..."
                    className="w-full mt-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                )}
              </div>

              {/* URL da Demonstração (Ex: Vercel) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300">URL DA DEMONSTRAÇÃO (HOSPEDADA)</label>
                  <span className="text-[10px] text-amber-400/80 font-mono">Uso interno (oculto para clientes)</span>
                </div>
                <input
                  type="url"
                  value={formDemoUrl}
                  onChange={(e) => setFormDemoUrl(e.target.value)}
                  placeholder="https://meu-modelo-exemplo.vercel.app"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Capa / Thumbnail */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">CAPA / THUMBNAIL</label>
                <div className="flex items-center gap-3">
                  {formThumbnailUrl ? (
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                      <img src={formThumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  ) : null}

                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleThumbnailSelected(f);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
                  >
                    Enviar Foto de Capa
                  </button>

                  <input
                    type="url"
                    value={formThumbnailUrl}
                    onChange={(e) => setFormThumbnailUrl(e.target.value)}
                    placeholder="Ou cole a URL direta da imagem..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Arquivo-Fonte (.ZIP) */}
              <div className="space-y-2 pt-2">
                <label className="font-semibold text-slate-300 flex items-center justify-between">
                  <span>ARQUIVO-FONTE (.ZIP) *</span>
                  <span className="text-[10px] text-slate-400 font-mono">Deve conter index.html + biofacil.json</span>
                </label>

                <input
                  type="file"
                  ref={zipInputRef}
                  accept=".zip"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleZipSelected(f);
                  }}
                />

                <div
                  onClick={() => zipInputRef.current?.click()}
                  className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-2 ${
                    zipValidation?.valid
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : zipValidation?.errors?.length
                      ? 'border-red-500/50 bg-red-950/20'
                      : 'border-white/20 bg-white/5 hover:border-amber-400/50'
                  }`}
                >
                  <FileArchive size={28} className="mx-auto text-amber-400" />
                  <div className="text-xs">
                    {zipFile ? (
                      <span className="font-bold text-white">{zipFile.name} ({(zipFile.size / 1024).toFixed(1)} KB)</span>
                    ) : editingTemplate?.hasSourceZip ? (
                      <span className="text-emerald-400 font-semibold">Pacote ZIP já carregado. Clique para substituir.</span>
                    ) : (
                      <span className="text-slate-300 font-semibold">Clique para selecionar o arquivo .ZIP do modelo</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Suporta modelos autocontidos ou com pastas /assets, /css, /js, /images
                  </div>
                </div>

                {/* Validation Status Report */}
                {isValidatingZip && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-300 flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Validando estrutura do arquivo ZIP...</span>
                  </div>
                )}

                {zipValidation && (
                  <div
                    className={`p-4 rounded-xl border space-y-2.5 ${
                      zipValidation.valid
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-red-950/40 border-red-500/40 text-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        {zipValidation.valid ? <CheckCircle2 size={16} className="text-emerald-400" /> : <XCircle size={16} className="text-red-400" />}
                        {zipValidation.valid ? 'MODELO VÁLIDO' : 'MODELO COM ERROS'}
                      </span>
                      {zipValidation.manifest && (
                        <span className="text-[10px] font-mono text-slate-400">
                          ID: {zipValidation.manifest.templateId}
                        </span>
                      )}
                    </div>

                    {zipValidation.errors.length > 0 && (
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-red-300">
                        {zipValidation.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    )}

                    {zipValidation.valid && (
                      <div className="text-[11px] space-y-1 text-slate-300">
                        <div className="flex items-center gap-2">
                          <Check size={13} className="text-emerald-400" />
                          <span>index.html e biofacil.json identificados</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={13} className="text-emerald-400" />
                          <span>{zipValidation.manifest?.fields.length || 0} campos editáveis configurados</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={13} className="text-emerald-400" />
                          <span>{zipValidation.assetsCount} arquivos complementares (CSS/Imagens)</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">STATUS INICIAL *</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as TemplateStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E111C] border border-white/10 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="draft">Rascunho (Visível apenas para o Admin)</option>
                  <option value="published">Publicado (Disponível imediatamente para usuários)</option>
                  <option value="disabled">Desativado (Oculto para novos usuários)</option>
                </select>
              </div>
            </div>

            {/* Modal Footer with "Test Model" and "Save" */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleTestModel}
                disabled={!parsedHtml}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-purple-600/20"
                title="Abrir no editor visual de teste com dados temporários"
              >
                <Play size={14} />
                <span>Testar Modelo</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isSaving || (zipValidation ? !zipValidation.valid : false)}
                  onClick={handleSaveTemplate}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>{editingTemplate ? 'Salvar Alterações' : 'Cadastrar Modelo'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: Visualização Rápida (Preview Modal) */}
      {previewingTemplate && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-2 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div>
              <h3 className="font-bold text-white text-base">{previewingTemplate.name}</h3>
              <p className="text-xs text-amber-400 font-mono">{previewingTemplate.categoryName || previewingTemplate.categoryId}</p>
            </div>

            {/* Desktop Device Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewModalWidth('390')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  previewModalWidth === '390' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="390px"
              >
                <Smartphone size={12} />
                <span>390px</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewModalWidth('430')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  previewModalWidth === '430' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="430px"
              >
                <Smartphone size={13} />
                <span>430px</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewModalWidth('full')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  previewModalWidth === 'full' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="100%"
              >
                <Monitor size={12} />
                <span>100%</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPreviewingTemplate(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden mt-3">
            <div
              style={{
                width: previewModalWidth === '390' ? '390px' : previewModalWidth === '430' ? '430px' : '100%',
                height: '100%',
                maxWidth: '100%'
              }}
              className="h-full bg-black rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl transition-all duration-150"
            >
              <iframe
                srcDoc={preparePreviewHtml(
                  previewingTemplate.htmlContent || '',
                  previewingTemplate.biofacilSchema || {
                    version: 1,
                    templateId: previewingTemplate.templateId,
                    name: previewingTemplate.name,
                    category: previewingTemplate.categoryId,
                    tagline: '',
                    fields: []
                  },
                  {},
                  previewingTemplate.assets
                )}
                title="Preview"
                className="w-full h-full border-0 block bg-black"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal: Confirmação de Exclusão Segura */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0D14] border border-white/10 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-bold text-white text-base">Excluir modelo "{deleteCandidate.name}"?</h3>
              {deleteUsageCount > 0 ? (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left leading-relaxed">
                  ⚠️ <strong>Atenção:</strong> Existem <strong>{deleteUsageCount}</strong> projeto(s) de usuários criados com este modelo.
                  <br /><br />
                  Para garantir que os sites salvos desses clientes continuem funcionando, sugerimos <strong>DESATIVAR</strong> o modelo em vez de excluí-lo.
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Esta ação removerá o modelo permanentemente do banco de dados.
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Cancelar
              </button>

              {deleteUsageCount > 0 ? (
                <button
                  type="button"
                  onClick={async () => {
                    await updateTemplateStatus(deleteCandidate.templateId, 'disabled');
                    setDeleteCandidate(null);
                    await loadTemplates();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold cursor-pointer"
                >
                  Desativar Modelo
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
                >
                  {isDeleting ? 'Excluindo...' : 'Excluir Definitivamente'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
