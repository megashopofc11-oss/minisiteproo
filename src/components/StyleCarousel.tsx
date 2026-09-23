import React, { useRef, useEffect, useState, useCallback } from 'react';
import { DESIGNS_LIST } from '../designs/registry';
import { DesignMeta } from '../types/designs';
import { ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';

interface StyleCarouselProps {
  onSelectDesign: (design: DesignMeta) => void;
  onPreviewDesign: (design: DesignMeta) => void;
}

export const StyleCarousel: React.FC<StyleCarouselProps> = ({
  onSelectDesign,
  onPreviewDesign
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // We duplicate items for smooth infinite-like perception
  const items = DESIGNS_LIST;

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const nextIdx = (activeIndex + 1) % items.length;
      setActiveIndex(nextIdx);

      const card = el.children[nextIdx] as HTMLElement;
      if (card) {
        el.scrollTo({
          left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
          behavior: 'smooth'
        });
      }
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex, items.length]);

  const scrollToIndex = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const boundedIdx = (idx + items.length) % items.length;
    setActiveIndex(boundedIdx);

    const card = el.children[boundedIdx] as HTMLElement;
    if (card) {
      el.scrollTo({
        left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
        behavior: 'smooth'
      });
    }
  }, [items.length]);

  return (
    <div
      className="relative group/carousel py-2 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Left/Right Floating Navigation Buttons */}
      <button
        type="button"
        aria-label="Estilo anterior"
        onClick={() => scrollToIndex(activeIndex - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        aria-label="Próximo estilo"
        onClick={() => scrollToIndex(activeIndex + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* Horizontal Carousel Track with Snap & Peek */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-6 sm:px-12 py-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollPaddingLeft: '1rem',
          scrollPaddingRight: '1rem'
        }}
      >
        {items.map((design, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={design.id}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 w-[290px] sm:w-[320px] rounded-3xl overflow-hidden border transition-all duration-500 snap-center cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'border-amber-400/80 scale-[1.03] shadow-[0_15px_40px_rgba(245,158,11,0.25)] bg-[#111422]'
                  : 'border-white/10 scale-95 opacity-80 hover:opacity-100 hover:border-white/20 bg-[#0B0D17]'
              }`}
            >
              {/* Cover Image with Vignette & Badge */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-black">
                <img
                  src={design.previewImage}
                  alt={design.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-transparent to-transparent" />

                {/* Number & Badge Tag */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-black text-amber-400">
                    {design.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-[9px] font-black uppercase tracking-wider text-amber-300">
                    {design.badge}
                  </span>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    {design.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-snug mt-1">
                    {design.subtitle}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewDesign(design);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                  >
                    <Eye size={13} className="text-amber-400" />
                    <span>Visualizar</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDesign(design);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
                  >
                    <span>Usar Estilo</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-1.5 pt-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Ir para o estilo ${idx + 1}`}
            onClick={() => scrollToIndex(idx)}
            className={`transition-all rounded-full ${
              idx === activeIndex
                ? 'w-6 h-1.5 bg-amber-400'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
