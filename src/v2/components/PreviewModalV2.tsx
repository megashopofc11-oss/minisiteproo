import React, { useState } from 'react';
import { V2DesignMeta, V2ProjectData } from '../types';
import { renderTemplateV2 } from '../engine/renderTemplateV2';
import { ArrowLeft, Smartphone, Tablet, Monitor, Sparkles, Check } from 'lucide-react';

interface PreviewModalV2Props {
  design: V2DesignMeta;
  customProjectData?: V2ProjectData;
  onClose: () => void;
  onUseDesign: (design: V2DesignMeta) => void;
}

export const PreviewModalV2: React.FC<PreviewModalV2Props> = ({
  design,
  customProjectData,
  onClose,
  onUseDesign
}) => {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // Generate complete standalone HTML document using the unified V2 Engine
  const dataToRender = customProjectData || design.demoData;
  const htmlContent = renderTemplateV2(dataToRender);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return 'max-w-[400px]';
      case 'tablet': return 'max-w-[768px]';
      case 'desktop': return 'max-w-[1100px]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05060A]/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between flex-shrink-0 bg-[#0A0C14]">
        {/* Back Button */}
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs sm:text-sm font-bold"
        >
          <ArrowLeft size={18} />
          <span>Voltar à Biblioteca</span>
        </button>

        {/* Center: Design Meta & Device Selector */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400">{design.code}</span>
            <span className="text-xs font-black text-white uppercase tracking-wider">{design.name}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">• {design.family}</span>
          </div>

          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              title="Visualização Celular"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewport === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              title="Visualização Tablet"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewport === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              title="Visualização Desktop"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewport === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor size={16} />
            </button>
          </div>
        </div>

        {/* Right: Primary Action to Use Design */}
        <button
          type="button"
          onClick={() => onUseDesign(design)}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm tracking-tight shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-95 cursor-pointer"
        >
          <Sparkles size={16} />
          <span>USAR ESTE DESIGN</span>
        </button>
      </header>

      {/* Main Preview Container with Sandbox Iframe */}
      <main className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#07080C]">
        <div
          className={`w-full ${getViewportWidth()} h-full max-h-[880px] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 relative`}
        >
          <iframe
            srcDoc={htmlContent}
            title={`${design.name} Preview`}
            className="w-full h-full border-none block"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </main>
    </div>
  );
};
