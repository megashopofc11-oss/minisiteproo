import React, { useState } from 'react';
import { DESIGNS_LIST } from './registry';
import { DesignMeta } from '../types/designs';
import { StyleCarousel } from '../components/StyleCarousel';
import { DesignRenderer } from './engines/DesignRenderer';
import { X, Sparkles, Eye, ArrowRight, Smartphone, Monitor } from 'lucide-react';

interface StyleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDesign: (design: DesignMeta) => void;
}

export const StyleSelectorModal: React.FC<StyleSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectDesign
}) => {
  const [previewingDesign, setPreviewingDesign] = useState<DesignMeta | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#07080E] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#090B14]">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider">
              <Sparkles size={13} />
              <span>BIBLIOTECA DE ESTILOS PREMIUM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              ESCOLHA SEU ESTILO VISUAL
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 no-scrollbar">

          {/* 1. CARROSSEL DE ESTILOS NO TOPO */}
          <div className="space-y-2">
            <div className="px-2">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                DESTAQUES EM MOVIMENTO
              </span>
              <p className="text-xs text-slate-400">
                Deslize para explorar a identidade de cada direção de arte
              </p>
            </div>

            <StyleCarousel
              onSelectDesign={(design) => {
                onSelectDesign(design);
                onClose();
              }}
              onPreviewDesign={(design) => setPreviewingDesign(design)}
            />
          </div>

          {/* 2. GRID DOS 20 ESTILOS */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="px-2">
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                TODOS OS ESTILOS DISPONÍVEIS
              </h3>
              <p className="text-xs text-slate-400">
                Você poderá trocar cores, tipografia, seções e misturar variantes a qualquer momento
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {DESIGNS_LIST.map((design) => (
                <div
                  key={design.id}
                  className="rounded-2xl border border-white/10 hover:border-amber-400/60 bg-[#0E111C] overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative h-40 w-full overflow-hidden bg-black">
                    <img
                      src={design.previewImage}
                      alt={design.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E111C] via-transparent to-transparent" />

                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono font-bold text-amber-400 border border-white/10">
                        {design.number}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md text-[8px] font-black uppercase tracking-wider text-amber-300 border border-amber-400/30">
                        {design.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                        {design.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-snug line-clamp-2 mt-1">
                        {design.subtitle}
                      </p>
                    </div>

                    {/* Actions: Visualizar & Usar Este Estilo */}
                    <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setPreviewingDesign(design)}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1 border border-white/10 transition-colors cursor-pointer"
                      >
                        <Eye size={12} className="text-amber-400" />
                        <span>Visualizar</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectDesign(design);
                          onClose();
                        }}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <span>Usar Estilo</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULL PREVIEW MODAL COM DADOS DEMONSTRATIVOS */}
      {previewingDesign && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-4xl h-[95vh] bg-[#07080E] border border-white/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl">

            {/* Top Bar of Preview */}
            <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-[#0A0C16] shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/20">
                  {previewingDesign.number}
                </span>
                <div>
                  <h3 className="text-sm font-black text-white uppercase">{previewingDesign.name}</h3>
                  <span className="text-[10px] text-slate-400">{previewingDesign.badge}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                      previewDevice === 'mobile' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone size={13} />
                    <span>Mobile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                      previewDevice === 'desktop' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor size={13} />
                    <span>Desktop</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectDesign(previewingDesign);
                    setPreviewingDesign(null);
                    onClose();
                  }}
                  className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Usar Este Estilo</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewingDesign(null)}
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 overflow-y-auto bg-black/50 p-4 flex justify-center items-start">
              <div
                className={`w-full transition-all duration-300 ${
                  previewDevice === 'mobile'
                    ? 'max-w-[430px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl my-4'
                    : 'max-w-3xl rounded-2xl overflow-hidden border border-white/15'
                }`}
              >
                <DesignRenderer
                  data={previewingDesign.demoData}
                  config={{
                    designId: previewingDesign.id,
                    heroVariant: 'A',
                    contentVariant: 'A',
                    galleryVariant: 'A',
                    ctaVariant: 'A',
                    contactVariant: 'A',
                    paletteId: previewingDesign.palettes[0]?.id || 'cine-noir',
                    typographyId: previewingDesign.typographies[0]?.id || 'cine-typo-syne',
                    motionLevel: 'cinematic'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
