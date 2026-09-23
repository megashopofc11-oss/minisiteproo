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
  ChevronRight
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
      <div className="space-y-8 animate-fadeIn">
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

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: selectedNicho.accentColor, color: selectedNicho.accentColor }}
            />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
              Coleção {selectedNicho.number} • {selectedNicho.name}
            </span>
          </div>
        </div>

        {/* Cinematic Header (Tela do Nicho Solicitada no Ponto 10) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl min-h-[280px] sm:min-h-[320px] flex items-center">
          {/* Background Photography with Lighting */}
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] saturate-[1.2] transform scale-105"
            style={{ backgroundImage: `url(${selectedNicho.coverImage})` }}
          />

          {/* Gradients & Cinematic Overlays */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#07080D] via-[#07080D]/85 to-transparent"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-transparent to-black/30"
          />
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40"
            style={{ backgroundColor: selectedNicho.accentColor }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-4">
            {/* 3D-Like High Relief Protagonist Icon */}
            <div className="flex items-center gap-4">
              <div className="p-3 sm:p-4 rounded-2xl bg-black/60 border border-white/20 backdrop-blur-xl shadow-2xl relative group">
                <div
                  className="absolute inset-0 rounded-2xl blur-lg opacity-60"
                  style={{ backgroundColor: selectedNicho.accentColor }}
                />
                <NicheIcon3D nichoId={selectedNicho.id} size="lg" />
              </div>

              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border backdrop-blur-md mb-1 shadow-md"
                  style={{
                    backgroundColor: `${selectedNicho.accentColor}25`,
                    borderColor: `${selectedNicho.accentColor}60`,
                    color: '#FFF'
                  }}
                >
                  <Sparkles size={11} className="text-amber-300" />
                  10 MODELOS EXCLUSIVOS
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-md">
                  {selectedNicho.name}
                </h1>
              </div>
            </div>

            {/* Subtitle / Tagline */}
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl italic drop-shadow">
              "{selectedNicho.tagline || 'Escolha uma identidade e transforme-a em algo totalmente seu.'}"
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {selectedNicho.highlights?.map((h, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold text-slate-300 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-1.5"
                >
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 10 Unique Models Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">
                Modelos de Alta Performance
              </h3>
              <p className="text-xs text-slate-400">
                10 composições e linguagens visuais distintas para seu biosite
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              10 de 10 disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tmpl, idx) => {
              const previewData: ProjectData = {
                ...tmpl.defaultData,
                projectId: `preview_${tmpl.id}`,
                userId: userId,
                nome: tmpl.name,
                createdAt: Date.now(),
                updatedAt: Date.now()
              };

              return (
                <div
                  key={tmpl.id}
                  className="group bg-[#0B0D17] border border-white/10 hover:border-amber-400/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col relative"
                >
                  {/* Direction Badge Number */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-black text-amber-300 tracking-wider">
                      0{idx + 1} • {tmpl.layout.toUpperCase()}
                    </span>
                  </div>

                  {/* Thumbnail / Visual Mockup */}
                  <div className="h-52 relative overflow-hidden bg-slate-950">
                    <img
                      src={tmpl.defaultData.identity.bannerUrl || tmpl.defaultData.identity.avatarUrl}
                      alt={tmpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/40 to-transparent" />

                    {/* Quick Live Preview Overlay Button */}
                    <button
                      type="button"
                      onClick={() => setPreviewTemplate(tmpl)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/70 border border-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 text-white hover:text-amber-300 hover:border-amber-400 cursor-pointer shadow-2xl"
                      title="Ver demonstração em tela cheia"
                    >
                      <Eye size={20} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-base text-white tracking-tight group-hover:text-amber-300 transition-colors">
                          {tmpl.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {tmpl.description}
                      </p>
                    </div>

                    {/* Features tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        {tmpl.defaultData.services.length} Serviços
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        WhatsApp Flutuante
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        Google Reviews
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-white/5">
                        Aberto/Fechado
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

        {/* Live Preview Modal (if triggered) */}
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
                    • {selectedNicho.name}
                  </span>
                </div>

                {/* Viewport Toggles */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('mobile')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
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
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
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
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                      previewViewport === 'desktop'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Desktop"
                  >
                    <Monitor size={16} />
                  </button>
                </div>

                {/* Use & Close */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectTemplate(previewTemplate)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-lg hover:brightness-110 active:scale-95 cursor-pointer"
                  >
                    Usar Este Modelo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-black/50">
                <div
                  className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-white/10 ${
                    previewViewport === 'mobile'
                      ? 'w-[390px] min-h-full'
                      : previewViewport === 'tablet'
                      ? 'w-[768px] min-h-full'
                      : 'w-full max-w-4xl min-h-full'
                  }`}
                >
                  <TemplateRenderer
                    project={{
                      ...previewTemplate.defaultData,
                      projectId: `demo_${previewTemplate.id}`,
                      userId: userId,
                      nome: previewTemplate.name,
                      createdAt: Date.now(),
                      updatedAt: Date.now()
                    }}
                    viewport={previewViewport}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // MAIN NICHES GALLERY — 10 PREMIUM COVER CARDS (Requisito 4 & 5)
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Cinematic Showcase Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 p-6 sm:p-12 shadow-2xl bg-gradient-to-br from-[#0D0F1A] via-[#090A12] to-[#05060A]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles size={14} className="text-amber-400" />
            BIBLIOTECA OFICIAL • 10 NICHOS E 100 MODELOS
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Coleções de Biosites <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Cinematográficos
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 font-medium leading-relaxed">
            Cada nicho foi arquitetado como uma coleção de alto padrão, combinando fotografia protagonista,
            iluminação cênica, integração WhatsApp, Google Reviews e exportação estática independente.
          </p>
        </div>
      </div>

      {/* Grid of the 10 Premium Cover Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {NICHOS_LIST.map((nicho) => (
          <div
            key={nicho.id}
            onClick={() => setSelectedNicho(nicho)}
            className="group relative rounded-3xl overflow-hidden border border-white/15 hover:border-amber-400/60 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-end min-h-[380px] sm:min-h-[440px] select-none transform hover:-translate-y-1.5"
          >
            {/* Thematic Photography Background with Deep Depth */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-[0.45] saturate-[1.2] group-hover:brightness-[0.55]"
              style={{ backgroundImage: `url(${nicho.coverImage})` }}
            />

            {/* Cinematic Gradient Overlays & Textures */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/75 to-transparent transition-opacity duration-300"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 100%, ${nicho.accentColor} 0%, transparent 70%)`
              }}
            />

            {/* Glowing Accent Ring (Border Specular) */}
            <div
              className="absolute inset-x-0 bottom-0 h-1 transition-all duration-500 group-hover:h-2"
              style={{ backgroundColor: nicho.accentColor }}
            />

            {/* Top Badges */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between z-20">
              <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-black text-amber-300 tracking-wider">
                COLEÇÃO {nicho.number}
              </span>

              <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={12} className="text-amber-400 fill-amber-400" />
                10 MODELOS
              </span>
            </div>

            {/* Card Content & Protagonist 3D-Like Presentation */}
            <div className="relative z-10 p-6 sm:p-8 space-y-4">
              {/* 3D-Like High Relief Metallic Icon */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-black/70 border border-white/20 backdrop-blur-xl shadow-2xl relative group-hover:scale-105 transition-transform duration-300">
                  <NicheIcon3D nichoId={nicho.id} size="lg" />
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase group-hover:text-amber-300 transition-colors drop-shadow-md">
                    {nicho.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-semibold tracking-wide">
                    {nicho.vibe}
                  </p>
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                {nicho.description}
              </p>

              {/* Highlights pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {nicho.highlights?.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-slate-300 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10"
                  >
                    • {item}
                  </span>
                ))}
              </div>

              {/* Botão Explorar Modelos Redesenhado (Requisito 7) */}
              <div className="pt-2">
                <div className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 group-hover:from-amber-400 group-hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-between shadow-[0_4px_20px_rgba(245,158,11,0.35)] group-hover:shadow-[0_8px_28px_rgba(245,158,11,0.6)] transition-all duration-300 active:scale-[0.98]">
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="text-slate-950" />
                    EXPLORAR 10 MODELOS
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-950/15 flex items-center justify-center transform group-hover:translate-x-1.5 transition-transform duration-300">
                    <ChevronRight size={18} className="text-slate-950 stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
