import React from 'react';
import { Sparkles, FolderKanban, ArrowDown } from 'lucide-react';
import { V2DesignMeta } from '../types';

interface V2HeroProps {
  onExploreClick: () => void;
  onProjectsClick: () => void;
  featuredDesigns: V2DesignMeta[];
  onSelectDesign: (design: V2DesignMeta) => void;
}

export const V2Hero: React.FC<V2HeroProps> = ({
  onExploreClick,
  onProjectsClick,
  featuredDesigns,
  onSelectDesign
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-8 border-b border-white/5">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Headlines & Actions */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>Biblioteca Premium 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6">
            SEU NEGÓCIO.<br />
            SUA IDENTIDADE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              SEU BIOSITE.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
            Escolha uma experiência, personalize com sua marca e publique uma presença digital feita para impressionar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>EXPLORAR DESIGNS</span>
              <ArrowDown size={16} />
            </button>

            <button
              type="button"
              onClick={onProjectsClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm tracking-wide transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <FolderKanban size={16} className="text-amber-400" />
              <span>MEUS PROJETOS</span>
            </button>
          </div>
        </div>

        {/* Right Column: Floating Device Mockup Stack */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-[300px] sm:w-[340px] h-[460px] sm:h-[500px]">
            {/* Card 1 (Back left tilt) */}
            {featuredDesigns[1] && (
              <div
                onClick={() => onSelectDesign(featuredDesigns[1])}
                className="absolute top-6 -left-6 sm:-left-10 w-[200px] sm:w-[220px] h-[320px] sm:h-[350px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl opacity-60 transform -rotate-6 hover:rotate-0 hover:opacity-100 transition-all duration-500 cursor-pointer select-none"
                style={{ backgroundColor: featuredDesigns[1].cover.background }}
              >
                <img
                  src={featuredDesigns[1].cover.sampleImage}
                  alt={featuredDesigns[1].name}
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">{featuredDesigns[1].name}</span>
                  <div className="text-xs font-black text-white">{featuredDesigns[1].demoData.brandName}</div>
                </div>
              </div>
            )}

            {/* Card 2 (Back right tilt) */}
            {featuredDesigns[2] && (
              <div
                onClick={() => onSelectDesign(featuredDesigns[2])}
                className="absolute top-12 -right-6 sm:-right-8 w-[200px] sm:w-[220px] h-[320px] sm:h-[350px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl opacity-70 transform rotate-6 hover:rotate-0 hover:opacity-100 transition-all duration-500 cursor-pointer select-none"
                style={{ backgroundColor: featuredDesigns[2].cover.background }}
              >
                <img
                  src={featuredDesigns[2].cover.sampleImage}
                  alt={featuredDesigns[2].name}
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">{featuredDesigns[2].name}</span>
                  <div className="text-xs font-black text-white">{featuredDesigns[2].demoData.brandName}</div>
                </div>
              </div>
            )}

            {/* Card 3 (Center Hero Foreground Phone Frame) */}
            {featuredDesigns[0] && (
              <div
                onClick={() => onSelectDesign(featuredDesigns[0])}
                className="absolute inset-x-0 bottom-0 mx-auto w-[240px] sm:w-[260px] h-[400px] sm:h-[440px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-20 transform hover:scale-105 transition-all duration-500 cursor-pointer select-none"
                style={{
                  backgroundColor: featuredDesigns[0].cover.background,
                  boxShadow: '0 25px 60px -15px rgba(245, 158, 11, 0.25)'
                }}
              >
                <img
                  src={featuredDesigns[0].cover.sampleImage}
                  alt={featuredDesigns[0].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded">
                      {featuredDesigns[0].code}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                      {featuredDesigns[0].cover.badgeText}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white leading-tight mb-1">
                      {featuredDesigns[0].name}
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mb-3">
                      {featuredDesigns[0].demoData.brandName}
                    </p>
                    <div className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs text-center uppercase tracking-wider">
                      Ver Experiência
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
