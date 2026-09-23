import React, { useState } from 'react';
import { NichoId, NichoInfo, TemplateDefinition, ProjectData } from '../types';
import { NICHOS_LIST, getTemplatesByNicho } from './data';
import { NicheIcon3D } from '../components/NicheIcon3D';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Check,
  X,
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  Flame,
  Star,
  ChevronRight,
  ShieldCheck,
  Clock,
  Compass
} from 'lucide-react';

interface TemplatesLibraryProps {
  onSelectTemplate: (template: TemplateDefinition) => void;
  userId: string;
  initialNichoId?: NichoId | null;
  onClearInitialNicho?: () => void;
}

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  onSelectTemplate,
  userId,
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

  // If a nicho is selected, display its 10 unique experiences / models
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
            className="group flex items-center gap-2.5 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft size={16} className="text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar aos 10 Nichos</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: selectedNicho.accentColor, color: selectedNicho.accentColor }}
            />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
              Coleção • {selectedNicho.name}
            </span>
          </div>
        </div>

        {/* Cinematic Header (Tela do Nicho) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl min-h-[280px] sm:min-h-[320px] flex items-center">
          {/* Background Photography with Lighting */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.38] saturate-[1.2] transform scale-105"
            style={{ backgroundImage: `url(${selectedNicho.coverImage})` }}
          />

          {/* Gradients & Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080D] via-[#07080D]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-transparent to-black/30" />
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40"
            style={{ backgroundColor: selectedNicho.accentColor }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 rounded-2xl bg-black/60 border border-white/20 backdrop-blur-xl shadow-2xl relative group">
                <div
                  className="absolute inset-0 rounded-2xl blur-lg opacity-60 pointer-events-none transition-opacity"
                  style={{ backgroundColor: selectedNicho.accentColor }}
                />
                <div className="relative z-10">
                  <NicheIcon3D nichoId={selectedNicho.id} size="lg" />
                </div>
              </div>

              <div>
                <span
                  className="text-xs font-black tracking-widest uppercase block"
                  style={{ color: selectedNicho.accentColor }}
                >
                  Coleção de Alto Padrão
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  {selectedNicho.name}
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed">
              {selectedNicho.tagline || selectedNicho.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedNicho.highlights?.map((hl, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-200 backdrop-blur-md flex items-center gap-1.5"
                >
                  <Sparkles size={12} className="text-amber-400" />
                  {hl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 10 Unique Models Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span>Modelos Exclusivos para {selectedNicho.name}</span>
              </h3>
              <p className="text-xs text-slate-400">
                10 composições e arquiteturas visuais distintas, sem modelos repetidos
              </p>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold">
              10 Modelos Disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tmpl) => {
              const themeColor = tmpl.defaultTheme.primary || selectedNicho.accentColor;
              const photoUrl = tmpl.defaultData.identity.bannerUrl || tmpl.defaultData.identity.avatarUrl;

              return (
                <div
                  key={tmpl.id}
                  className="group bg-[#0B0D17] border border-white/10 hover:border-amber-400/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col relative"
                >
                  {/* Discreet Style Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-black text-amber-300 tracking-wider uppercase">
                      {tmpl.styleName}
                    </span>
                  </div>

                  {/* Visual Layout Mockup Area (Representação Gráfica do Biosite Real) */}
                  <div className="h-60 relative overflow-hidden bg-slate-950 p-3 flex flex-col justify-between">
                    <img
                      src={photoUrl}
                      alt={tmpl.name}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] saturate-[1.2] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/50 to-transparent" />

                    {/* Mini Wireframe Mockup Preview Overlay */}
                    <div className="relative z-10 pt-8 px-2 flex flex-col items-center text-center space-y-2">
                      <div
                        className="w-12 h-12 rounded-full p-0.5 border shadow-xl mx-auto overflow-hidden"
                        style={{ borderColor: themeColor }}
                      >
                        <img
                          src={tmpl.defaultData.identity.logoUrl || photoUrl}
                          alt="Logo"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <h5 className="text-xs font-black text-white uppercase tracking-tight line-clamp-1">
                        {tmpl.name}
                      </h5>
                      <span className="text-[10px] text-slate-300 line-clamp-1 italic max-w-xs">
                        "{tmpl.defaultData.identity.slogan}"
                      </span>

                      {/* Mockup Service Pills Preview */}
                      <div className="w-full max-w-[220px] space-y-1 pt-1 opacity-80">
                        <div className="h-4 rounded-md bg-white/10 border border-white/10 flex items-center justify-between px-2 text-[8px] text-slate-300 font-bold">
                          <span>{tmpl.defaultData.services[0]?.name || 'Especialidade 1'}</span>
                          <span style={{ color: themeColor }}>→</span>
                        </div>
                        <div className="h-4 rounded-md bg-white/10 border border-white/10 flex items-center justify-between px-2 text-[8px] text-slate-300 font-bold">
                          <span>{tmpl.defaultData.services[1]?.name || 'Especialidade 2'}</span>
                          <span style={{ color: themeColor }}>→</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Eye Button to Open Modal */}
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(tmpl)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/80 border border-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 text-white hover:text-amber-300 hover:border-amber-400 cursor-pointer shadow-2xl z-30"
                      title="Ver demonstração em tela cheia"
                    >
                      <Eye size={20} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h4 className="font-black text-base text-white tracking-tight group-hover:text-amber-300 transition-colors">
                        {tmpl.name}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {tmpl.description}
                      </p>
                    </div>

                    {/* Features tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        {tmpl.defaultData.services.length} Especialidades
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        WhatsApp {tmpl.defaultData.identity.title}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        Google Reviews
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(tmpl)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Eye size={14} className="text-slate-400" />
                        <span>Ver Demo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectTemplate(tmpl)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-amber-600/25 active:scale-95"
                      >
                        <Check size={14} />
                        <span>Usar Modelo</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
                    • {selectedNicho.name} ({previewTemplate.styleName})
                  </span>
                </div>

                {/* Viewport Toggles */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('mobile')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewViewport === 'mobile'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Mobile (390px)"
                  >
                    <Smartphone size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('tablet')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewViewport === 'tablet'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Tablet"
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('desktop')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewViewport === 'desktop'
                        ? 'bg-amber-500 text-slate-950'
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
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Renderer Container */}
              <div className="flex-1 overflow-y-auto bg-[#05060A] flex justify-center py-6">
                <TemplateRenderer
                  project={{
                    ...previewTemplate.defaultData,
                    projectId: `preview_${previewTemplate.id}`,
                    userId: userId,
                    nome: previewTemplate.name,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                  }}
                  viewport={previewViewport}
                />
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="h-16 px-6 bg-[#0A0C14] border-t border-white/10 flex items-center justify-between shrink-0">
                <div className="text-xs text-slate-400 hidden sm:block">
                  Gostou deste modelo? Clique ao lado para carregá-lo no editor.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 cursor-pointer"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const t = previewTemplate;
                      setPreviewTemplate(null);
                      onSelectTemplate(t);
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

  // DEFAULT VIEW: LIST OF THE 10 NICHE COLLECTIONS
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Cinematic Showcase Header */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 p-6 sm:p-12 shadow-2xl bg-gradient-to-br from-[#0E111C] via-[#090B14] to-[#05060A]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles size={14} className="text-amber-400" />
            CATÁLOGO OFICIAL • BIO FÁCIL
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            10 Coleções Exclusivas <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              100 Modelos de Luxo
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Cada nicho conta com 10 experiências visuais distintas, desenvolvidas exclusivamente para valorizar
            a autoridade de negócios locais e profissionais exigentes.
          </p>
        </div>
      </div>

      {/* Grid of the 10 Niches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NICHOS_LIST.map((nicho) => (
          <div
            key={nicho.id}
            onClick={() => setSelectedNicho(nicho)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 bg-[#0B0D17] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between"
          >
            {/* Cover Photograph with Lighting */}
            <div className="h-60 relative overflow-hidden bg-slate-950">
              <img
                src={nicho.coverImage}
                alt={nicho.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.5] saturate-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/40 to-transparent" />

              {/* 3D-Like High Relief Protagonist Icon */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-black/70 border border-white/20 backdrop-blur-md shadow-2xl relative">
                  <NicheIcon3D nichoId={nicho.id} size="md" />
                </div>
                <div>
                  <span
                    className="text-[10px] font-black uppercase tracking-wider block"
                    style={{ color: nicho.accentColor }}
                  >
                    Coleção {nicho.number}
                  </span>
                  <h3 className="text-lg font-black text-white">{nicho.name}</h3>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-black text-amber-300 tracking-wider uppercase">
                  10 MODELOS
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {nicho.subtitle}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {nicho.description}
                </p>
              </div>

              {/* CTA Action */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                  Explorar os 10 Modelos
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-500/10 group-hover:bg-amber-500 text-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-all group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
