import React from 'react';
import { V2DesignMeta } from '../types';
import { Eye, ArrowRight, Sparkles } from 'lucide-react';

interface StreamingCoverCardProps {
  design: V2DesignMeta;
  onPreview: (design: V2DesignMeta) => void;
  onSelect: (design: V2DesignMeta) => void;
}

export const StreamingCoverCard: React.FC<StreamingCoverCardProps> = ({
  design,
  onPreview,
  onSelect
}) => {
  const isLight = design.tone === 'claro';

  return (
    <div
      className="group relative flex-shrink-0 w-[240px] sm:w-[280px] select-none cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl"
      onClick={() => onPreview(design)}
      style={{
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.6)'
      }}
    >
      {/* Aspect Ratio Frame (9:14 streaming poster proportion) */}
      <div
        className="relative w-full h-[360px] sm:h-[400px] flex flex-col justify-between p-5 overflow-hidden transition-colors"
        style={{
          backgroundColor: design.cover.background,
          border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Background Sample Image with Gradient Fade */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={design.cover.sampleImage}
            alt={design.name}
            className="w-full h-full object-cover object-center filter transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              opacity: isLight ? 0.35 : 0.45,
              filter: isLight ? 'contrast(1.05)' : 'brightness(0.85) contrast(1.1)'
            }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: isLight
                ? `linear-gradient(180deg, ${design.cover.background} 0%, rgba(250,248,245,0.6) 40%, ${design.cover.background} 95%)`
                : `linear-gradient(180deg, ${design.cover.background} 0%, rgba(9,10,15,0.4) 40%, ${design.cover.background} 95%)`
            }}
          />
        </div>

        {/* Top Header: Code + Name + Tone Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold tracking-widest px-2 py-0.5 rounded"
              style={{
                backgroundColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
                color: isLight ? '#1C1917' : '#F8FAFC'
              }}
            >
              {design.code}
            </span>
            <span
              className="text-sm font-black tracking-wider uppercase"
              style={{ color: design.cover.textColor }}
            >
              {design.name}
            </span>
          </div>

          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              color: design.cover.primary,
              backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)'}`
            }}
          >
            {design.cover.badgeText}
          </span>
        </div>

        {/* Center: Hero Miniature Typography */}
        <div className="relative z-10 my-auto text-center px-2">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-1.5 opacity-80"
            style={{ color: design.cover.primary }}
          >
            {design.demoData.segment}
          </div>
          <h3
            className="text-xl sm:text-2xl font-black leading-tight tracking-tight mb-2"
            style={{ color: design.cover.textColor }}
          >
            {design.cover.heroHeadline}
          </h3>
          <p
            className="text-xs line-clamp-2 leading-relaxed opacity-75 font-normal"
            style={{ color: design.cover.textColor }}
          >
            {design.tagline}
          </p>
        </div>

        {/* Bottom Actions: Quick Preview & Use */}
        <div className="relative z-10 flex items-center gap-2 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(design);
            }}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            style={{
              backgroundColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
              color: design.cover.textColor
            }}
          >
            <Eye size={13} />
            <span>Visualizar</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(design);
            }}
            className="py-2 px-3.5 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-transform active:scale-95 cursor-pointer shadow-md"
            style={{
              backgroundColor: design.cover.primary,
              color: isLight && design.cover.primary === '#FFFFFF' ? '#000000' : '#07080C'
            }}
          >
            <span>Usar</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
