import React, { useState } from 'react';
import { NichoId, NichoInfo, TemplateDefinition, ProjectData } from '../types';
import { NICHOS_LIST, getTemplatesByNicho } from './data';
import { AppIcon } from '../components/BrandIcons';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Check,
  X,
  Palette,
  Layers,
  Crown
} from 'lucide-react';

interface TemplatesLibraryProps {
  onSelectTemplate: (template: TemplateDefinition) => void;
  userId: string;
}

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  onSelectTemplate,
  userId
}) => {
  const [selectedNicho, setSelectedNicho] = useState<NichoInfo | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);

  // If a nicho is selected, show its 10 unique models
  if (selectedNicho) {
    const templates = getTemplatesByNicho(selectedNicho.id);

    return (
      <div className="space-y-6">
        {/* Navigation Bar back to niches */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <button
            onClick={() => setSelectedNicho(null)}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar aos 10 Nichos</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: selectedNicho.accentColor }}
            />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              {selectedNicho.number} — {selectedNicho.name}
            </span>
          </div>
        </div>

        {/* Nicho Header */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 border border-white/10 shadow-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/20">
          <div className="relative z-10 max-w-xl">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-white/10 text-white"
              style={{ backgroundColor: `${selectedNicho.accentColor}30` }}
            >
              10 Modelos Exclusivos
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {selectedNicho.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedNicho.description} Cada modelo possui estrutura, composição e hierarquia visual própria.
            </p>
          </div>
        </div>

        {/* 10 Unique Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tmpl) => {
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
                className="group bg-[#0F121E] border border-white/10 hover:border-purple-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Visual Thumbnail */}
                <div className="h-48 relative overflow-hidden bg-slate-900">
                  <img
                    src={tmpl.defaultData.identity.bannerUrl || tmpl.defaultData.identity.avatarUrl}
                    alt={tmpl.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F121E] via-transparent to-black/40" />

                  {/* Template Style Tag */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-white border border-white/10">
                    {tmpl.styleName}
                  </span>

                  <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-600/80 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                    {tmpl.index}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {tmpl.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setPreviewTemplate(tmpl)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye size={14} />
                      Visualizar
                    </button>

                    <button
                      onClick={() => onSelectTemplate(tmpl)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/20 transition-all active:scale-95"
                    >
                      <Check size={14} />
                      Usar Modelo
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Preview Modal */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
            <div className="h-16 px-6 bg-[#0E111C] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-white">
                  {previewTemplate.name}
                </span>
                <span className="text-xs text-purple-400 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                  {previewTemplate.styleName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const tmpl = previewTemplate;
                    setPreviewTemplate(null);
                    onSelectTemplate(tmpl);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
                >
                  <Check size={15} /> Usar Este Modelo
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TemplateRenderer
                project={{
                  ...previewTemplate.defaultData,
                  projectId: `preview_${previewTemplate.id}`,
                  userId: userId,
                  nome: previewTemplate.name,
                  createdAt: Date.now(),
                  updatedAt: Date.now()
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Niches Overview Showcase (10 Niches in large distinct cards)
  return (
    <div className="space-y-8">
      {/* Cinematic Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wider uppercase mb-1">
          <Sparkles size={13} className="text-purple-400" />
          10 Nichos Profissionais • 100 Biosites Exclusivos
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          CRIE ALGO <span className="text-gradient-purple">EXTRAORDINÁRIO</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Escolha um nicho e transforme um modelo cinematográfico de alto padrão em um biosite exclusivo pronto para exportar.
        </p>
      </div>

      {/* 10 Large Separate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {NICHOS_LIST.map((nicho) => (
          <div
            key={nicho.id}
            className="group relative bg-[#0E111C] border border-white/10 hover:border-purple-500/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Header Image */}
            <div className="h-48 sm:h-52 relative overflow-hidden">
              <img
                src={nicho.coverImage}
                alt={nicho.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E111C] via-[#0E111C]/60 to-black/30" />

              {/* Number and Icon Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-center font-extrabold text-xs">
                  {nicho.number}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 text-white"
                  style={{ backgroundColor: `${nicho.accentColor}40` }}
                >
                  {nicho.badge}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 pt-0 relative z-10 -mt-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0 border border-white/10"
                    style={{ backgroundColor: nicho.accentColor }}
                  >
                    <AppIcon name={nicho.iconName} size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      {nicho.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {nicho.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {nicho.description}
                </p>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-400 mb-5">
                  <span className="text-white font-bold">Personalidade:</span> {nicho.vibe}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedNicho(nicho)}
                className="w-full py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>EXPLORAR MODELOS</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
