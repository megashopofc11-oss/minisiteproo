import React, { useState } from 'react';
import { NichoId, NichoInfo, TemplateDefinition } from '../types';
import { NICHOS_LIST, getTemplatesByNicho } from './data';
import { NicheIcon3D } from '../components/NicheIcon3D';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import {
  Sparkles,
  ArrowLeft,
  Eye,
  Check,
  X,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';

interface TemplatesLibraryProps {
  onSelectTemplate: (template: TemplateDefinition) => void;
  userId: string;
  initialNichoId?: NichoId | null;
  onClearInitialNicho?: () => void;
}

/**
 * Authentic miniature mockup representing the real visual composition of each layout
 */
const ModelLayoutWireframe: React.FC<{
  template: TemplateDefinition;
  nicho: NichoInfo;
}> = ({ template, nicho }) => {
  const layout = template.layout;
  const modelIndex = template.index;
  const primaryColor = template.defaultTheme.primary || nicho.accentColor;
  const photoUrl = template.defaultData.photos[0]?.url || nicho.coverImage;
  const secondPhotoUrl = template.defaultData.photos[1]?.url || photoUrl;

  // MODELO 01 — CINEMATIC / IMPACT
  if (modelIndex === 1 || layout === 'cinematic') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#07080D] border border-white/15 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] saturate-[1.2]"
          style={{ backgroundImage: `url(${photoUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/60 to-transparent" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        <div className="relative z-10 text-center pt-2">
          <div className="w-8 h-8 mx-auto flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <span className="text-[7px] font-mono tracking-widest uppercase block mt-1" style={{ color: primaryColor }}>
            {template.defaultData.identity.badge || 'CINEMATIC'}
          </span>
          <div className="text-[10px] font-black text-white tracking-tight uppercase line-clamp-1">
            {template.name}
          </div>
        </div>

        <div className="relative z-10 space-y-1.5 pb-1">
          <div className="h-1.5 w-16 bg-white/40 rounded-full mx-auto" />
          <div className="h-1 w-24 bg-white/20 rounded-full mx-auto" />

          <div
            className="w-full py-1.5 rounded-lg text-[9px] font-black text-slate-950 text-center shadow-lg uppercase tracking-wider flex items-center justify-center gap-1"
            style={{ backgroundColor: primaryColor }}
          >
            <span>WhatsApp Direto</span>
          </div>

          <div className="grid grid-cols-2 gap-1 pt-1">
            <div className="p-1 rounded bg-white/5 border border-white/10 text-[6px] text-slate-300 truncate">
              {template.defaultData.services[0]?.name || 'Especialidade'}
            </div>
            <div className="p-1 rounded bg-white/5 border border-white/10 text-[6px] text-slate-300 truncate">
              {template.defaultData.services[1]?.name || 'Atendimento VIP'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MODELO 02 — EDITORIAL / LIGHT (Off-white / Cream, Magazine Serif, Vertical Frame)
  if (modelIndex === 2 || layout === 'editorial') {
    const editBg = template.defaultTheme.background || '#FAF8F5';
    const editText = template.defaultTheme.text || '#111111';

    return (
      <div
        className="w-full aspect-[9/13] rounded-2xl overflow-hidden border border-stone-300 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-stone-500 transition-all duration-300"
        style={{ backgroundColor: editBg, color: editText }}
      >
        <div className="flex items-center justify-between border-b border-stone-300/80 pb-1">
          <div className="text-[7px] font-mono tracking-widest text-stone-500 uppercase">REVISTA ED. 2026</div>
          <div className="text-[7px] font-black uppercase" style={{ color: primaryColor }}>
            AUTORAL
          </div>
        </div>

        <div className="space-y-1 my-auto">
          <div className="text-[11px] sm:text-xs font-light tracking-tighter uppercase leading-none font-serif text-stone-900">
            {template.name.split(' ')[0]} <br />
            <span className="font-bold italic" style={{ color: primaryColor }}>
              {template.name.split(' ')[1] || 'ATELIER'}
            </span>
          </div>
          <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
        </div>

        <div className="relative rounded-lg overflow-hidden h-16 border border-stone-200 my-1">
          <img
            src={secondPhotoUrl}
            alt=""
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-stone-900/80 text-[6px] font-mono text-white">
            PROPOSTA OFICIAL
          </div>
        </div>

        <div className="space-y-0.5 border-t border-stone-200 pt-1.5">
          <div className="text-[7px] font-bold tracking-wider uppercase truncate text-stone-900">
            {template.defaultData.services[0]?.name || 'SERVIÇO PRINCIPAL'}
          </div>
          <div className="text-[6px] text-stone-500 truncate">
            {template.defaultData.services[1]?.name || 'TRATAMENTO EXCLUSIVO'}
          </div>
          <div className="pt-1 flex items-center justify-between text-[7px] font-bold" style={{ color: primaryColor }}>
            <span>CONHECER PROPOSTA</span>
            <span>→</span>
          </div>
        </div>
      </div>
    );
  }

  // MODELO 03 — URBAN / BRUTALIST (Industrial graphite, technical [01] boxes, sharp borders)
  if (modelIndex === 3 || layout === 'brutalist' || layout === 'urban') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#121214] border border-white/20 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-red-500/60 transition-all duration-300 font-mono">
        <div className="flex justify-between items-center border-b border-white/10 pb-1">
          <span className="text-[6px] tracking-widest font-black" style={{ color: primaryColor }}>
            [03] BRUTALIST
          </span>
          <span className="text-[6px] text-slate-400">URBAN RAW</span>
        </div>

        <div className="space-y-1 my-1">
          <div className="text-[11px] font-black text-white uppercase tracking-tighter leading-none">
            {template.name}
          </div>
          <div className="h-0.5 w-10" style={{ backgroundColor: primaryColor }} />
        </div>

        <div className="grid grid-cols-2 gap-1 my-1">
          <div className="h-12 rounded-none bg-white/5 border border-white/20 overflow-hidden">
            <img src={photoUrl} alt="" className="w-full h-full object-cover filter contrast-150" />
          </div>
          <div className="h-12 rounded-none bg-[#1A1A1E] border border-white/10 p-1 flex flex-col justify-between text-[6px] text-slate-300">
            <span>[01] TÉCNICA</span>
            <span>[02] PRECISÃO</span>
            <span className="font-bold" style={{ color: primaryColor }}>100% INDUSTRIAL</span>
          </div>
        </div>

        <div className="space-y-1">
          <div
            className="w-full py-1.5 rounded-none text-white text-[7px] font-black text-center uppercase tracking-wider"
            style={{ backgroundColor: primaryColor }}
          >
            CHAMAR AGORA // WA
          </div>
        </div>
      </div>
    );
  }

  // MODELO 04 — MINIMAL / CLEAN (100% PURE WHITE, ZERO FOTOS OBRIGATÓRIAS)
  if (modelIndex === 4 || layout === 'minimal') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-white border border-slate-200 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-slate-400 transition-all duration-300">
        <div className="text-center pt-2 space-y-1">
          <div className="w-7 h-7 mx-auto flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <div className="text-[6px] tracking-[0.25em] text-slate-400 uppercase font-mono">
            ESTABELECIMENTO AUTORAL
          </div>
          <div className="text-[11px] font-semibold text-slate-900 tracking-tight">
            {template.name}
          </div>
          <div className="text-[6px] text-slate-500 font-light px-2 line-clamp-2">
            {template.defaultData.identity.slogan}
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 my-1 space-y-1">
          <div className="flex justify-between items-center text-[7px] text-slate-800">
            <span className="font-medium truncate">{template.defaultData.services[0]?.name || 'Especialidade 01'}</span>
            <span className="text-slate-400">●</span>
          </div>
          <div className="flex justify-between items-center text-[7px] text-slate-800">
            <span className="font-medium truncate">{template.defaultData.services[1]?.name || 'Especialidade 02'}</span>
            <span className="text-slate-400">●</span>
          </div>
          <div className="flex justify-between items-center text-[7px] text-slate-800">
            <span className="font-medium truncate">{template.defaultData.services[2]?.name || 'Especialidade 03'}</span>
            <span className="text-slate-400">●</span>
          </div>
        </div>

        <div className="space-y-1 border-t border-slate-100 pt-1.5">
          <div className="w-full py-1.5 rounded-lg bg-slate-900 text-white text-[7px] font-bold text-center tracking-wider uppercase">
            Contato Direto
          </div>
        </div>
      </div>
    );
  }

  // MODELO 05 — SIGNATURE / EXPERIMENTAL (Azul Petróleo / Tons Jóia, Selo VIP, Google 5.0)
  return (
    <div
      className="w-full aspect-[9/13] rounded-2xl overflow-hidden border border-white/20 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300"
      style={{ backgroundColor: template.defaultTheme.background || '#081426' }}
    >
      <div className="flex justify-between items-center">
        <span className="text-[6px] font-serif tracking-[0.2em] uppercase" style={{ color: primaryColor }}>
          SIGNATURE SERIES
        </span>
        <div className="flex items-center text-amber-400 text-[8px]">★★★★★</div>
      </div>

      <div className="space-y-1 my-1">
        <div className="text-[11px] font-black text-white tracking-tight uppercase">
          {template.name}
        </div>
        <div className="text-[6px] text-slate-300 italic">Edição Exclusiva de Alto Padrão</div>
      </div>

      <div className="relative rounded-xl overflow-hidden h-16 border border-white/20 shadow-xl">
        <img src={photoUrl} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-slate-950 text-[6px] font-black uppercase shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          SELO VIP
        </div>
      </div>

      <div className="space-y-1 border-t border-white/10 pt-1.5">
        <div className="flex items-center justify-between text-[6px] text-slate-300">
          <span>Avaliação Google (5.0)</span>
          <span className="font-bold" style={{ color: primaryColor }}>100% Recomendado</span>
        </div>

        <div
          className="w-full py-1.5 rounded-xl text-slate-950 text-[7px] font-black text-center uppercase tracking-wider shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          Concierge WhatsApp VIP
        </div>
      </div>
    </div>
  );
};

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  onSelectTemplate,
  userId: _userId,
  initialNichoId = null,
  onClearInitialNicho
}) => {
  const [selectedNicho, setSelectedNicho] = useState<NichoInfo | null>(() => {
    if (initialNichoId) {
      return NICHOS_LIST.find((n) => n.id === initialNichoId) || null;
    }
    return null;
  });

  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // ==========================================
  // VIEW: 5 MODELS FOR SELECTED NICHE
  // ==========================================
  if (selectedNicho) {
    const templates = getTemplatesByNicho(selectedNicho.id);

    return (
      <div className="space-y-8 animate-fadeIn pb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <button
            onClick={() => {
              setSelectedNicho(null);
              if (onClearInitialNicho) onClearInitialNicho();
            }}
            className="group flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft size={16} className="text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar aos Nichos</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedNicho.accentColor }}
            />
            <span>{selectedNicho.name}</span>
          </div>
        </div>

        {/* Niche Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#090B14] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md shadow-xl">
              <NicheIcon3D nichoId={selectedNicho.id} size="lg" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {selectedNicho.name}
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                Escolha o estilo ideal para sua marca.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
            5 Modelos Profissionais
          </div>
        </div>

        {/* Responsive Grid: 2 columns on mobile, 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {templates.map((tmpl, idx) => {
            const modelNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={tmpl.id}
                className="group rounded-3xl border border-white/10 hover:border-amber-400/50 bg-[#0B0D18] p-3 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
              >
                {/* Real Miniature Preview Wireframe */}
                <div className="w-full mb-3 cursor-pointer" onClick={() => setPreviewTemplate(tmpl)}>
                  <ModelLayoutWireframe template={tmpl} nicho={selectedNicho} />
                </div>

                {/* Model Title & Style */}
                <div className="space-y-1 mb-3 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      MODELO {modelNumber}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      {tmpl.styleName.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-white truncate">
                    {tmpl.styleName}
                  </h4>
                </div>

                {/* Action Buttons: [ VISUALIZAR ] [ USAR MODELO ] */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    title="Visualizar Demo"
                  >
                    <Eye size={13} className="text-slate-400" />
                    <span>Visualizar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTemplate(tmpl)}
                    className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md shadow-amber-600/20 active:scale-95"
                    title="Usar Este Modelo no Editor"
                  >
                    <Check size={13} />
                    <span>Usar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
            <div className="w-full max-w-5xl h-[92vh] bg-[#07080D] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
              {/* Modal Header */}
              <div className="h-14 px-6 border-b border-white/10 bg-[#0A0C14] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-extrabold text-sm text-white">
                    Preview: {previewTemplate.name}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    • {previewTemplate.styleName}
                  </span>
                </div>

                {/* Viewport Selector */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('mobile')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      previewViewport === 'mobile'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Mobile (390px)"
                  >
                    <Smartphone size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('tablet')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      previewViewport === 'tablet'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Tablet"
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('desktop')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      previewViewport === 'desktop'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Desktop"
                  >
                    <Monitor size={16} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body: The Live Template Renderer */}
              <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-8 flex justify-center">
                <div
                  className={`w-full transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border border-white/10 ${
                    previewViewport === 'mobile'
                      ? 'max-w-[400px]'
                      : previewViewport === 'tablet'
                      ? 'max-w-[640px]'
                      : 'max-w-4xl'
                  }`}
                >
                  <TemplateRenderer
                    project={{
                      ...previewTemplate.defaultData,
                      projectId: previewTemplate.id,
                      userId: 'preview',
                      createdAt: 0,
                      updatedAt: 0
                    }}
                    viewport={previewViewport}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="h-16 px-6 border-t border-white/10 bg-[#0A0C14] flex items-center justify-between shrink-0">
                <div className="text-xs text-slate-400">
                  Experimente rolar e interagir com o biosite
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTemplate(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer"
                  >
                    <Check size={16} />
                    <span>Usar Este Modelo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN NICHE CATALOG (Clean, 3D Icons, No Bloated Covers)
  // ==========================================
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Cinematic Showcase Header */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 p-6 sm:p-10 shadow-2xl bg-gradient-to-br from-[#0E111C] via-[#090B14] to-[#05060A]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles size={14} className="text-amber-400" />
            BIO FÁCIL • 50 MODELOS
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Escolha seu Nicho <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              50 Biosites Únicos
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Selecione o seu segmento para acessar os 5 modelos profissionais desenvolvidos com propostas visuais autênticas.
          </p>
        </div>
      </div>

      {/* Grid of the 10 Niches (High Relief 3D Icons, Responsive) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {NICHOS_LIST.map((nicho) => (
          <div
            key={nicho.id}
            onClick={() => setSelectedNicho(nicho)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 bg-[#0B0D18] hover:bg-[#101322] p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_16px_35px_rgba(0,0,0,0.8)] hover:-translate-y-1 flex flex-col items-center text-center justify-between min-h-[190px] sm:min-h-[210px]"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-12 inset-x-0 mx-auto w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
              style={{ backgroundColor: nicho.accentColor }}
            />

            {/* 3D-Like High Relief Protagonist Icon */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 my-auto flex items-center justify-center p-2 rounded-2xl bg-black/40 border border-white/10 group-hover:border-white/25 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <NicheIcon3D nichoId={nicho.id} size="xl" />
            </div>

            {/* Title & 5 Modelos */}
            <div className="relative z-10 space-y-1 pt-3 border-t border-white/5 w-full">
              <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase leading-snug">
                {nicho.name}
              </h3>
              <span className="text-[11px] font-bold text-slate-400 block font-mono">
                5 modelos
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
