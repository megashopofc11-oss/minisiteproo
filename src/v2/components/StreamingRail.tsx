import React, { useRef, useState, useEffect } from 'react';
import { V2DesignMeta } from '../types';
import { StreamingCoverCard } from './StreamingCoverCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StreamingRailProps {
  title: string;
  subtitle?: string;
  designs: V2DesignMeta[];
  onPreview: (design: V2DesignMeta) => void;
  onSelect: (design: V2DesignMeta) => void;
}

export const StreamingRail: React.FC<StreamingRailProps> = ({
  title,
  subtitle,
  designs,
  onPreview,
  onSelect
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll bounds
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      return () => el.removeEventListener('scroll', updateScrollState);
    }
  }, [designs]);

  // Gentle subtle auto-scroll that pauses on interaction
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 180, behavior: 'smooth' });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (!designs || designs.length === 0) return null;

  return (
    <section
      className="relative mb-12 sm:mb-16 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Rail Header */}
      <div className="flex items-end justify-between px-4 sm:px-8 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase flex items-center gap-2">
            <span>{title}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Desktop Navigation Chevrons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Rolar para esquerda"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Rolar para direita"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 sm:gap-5 overflow-x-auto scroll-smooth px-4 sm:px-8 py-2 no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {designs.map((design) => (
          <div key={design.id} style={{ scrollSnapAlign: 'start' }}>
            <StreamingCoverCard
              design={design}
              onPreview={onPreview}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
