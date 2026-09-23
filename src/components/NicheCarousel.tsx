import React, { useRef, useEffect, useState, useCallback } from 'react';
import { NichoInfo, NichoId } from '../types';
import { NicheIcon3D } from './NicheIcon3D';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface NicheCarouselProps {
  nichos: NichoInfo[];
  onSelectNicho: (nichoId: NichoId) => void;
}

export const NicheCarousel: React.FC<NicheCarouselProps> = ({ nichos, onSelectNicho }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isInteracting, setIsInteracting] = useState(false);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // We triple the items to achieve seamless infinite looping
  const items = [...nichos, ...nichos, ...nichos];

  // Auto-scroll loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start in the middle set of items
    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft === 0) {
      container.scrollLeft = singleSetWidth;
    }

    const speed = 0.6; // pixels per frame

    const step = () => {
      if (!isInteractingRef.current && container) {
        container.scrollLeft += speed;

        // Infinite loop wrap check
        const maxScroll = singleSetWidth * 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += singleSetWidth;
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(step);
    };

    animationFrameIdRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [nichos]);

  const pauseAutoplay = useCallback(() => {
    isInteractingRef.current = true;
    setIsInteracting(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  }, []);

  const resumeAutoplay = useCallback((delay = 1800) => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsInteracting(false);
    }, delay);
  }, []);

  // Pointer / Touch handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    pauseAutoplay();
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    dragDistanceRef.current = Math.abs(x - startXRef.current);
    container.scrollLeft = scrollLeftRef.current - walk;

    // Boundary wrapping during drag
    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
      scrollLeftRef.current -= singleSetWidth;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += singleSetWidth;
      scrollLeftRef.current += singleSetWidth;
    }
  };

  const handlePointerUpOrCancel = () => {
    isDraggingRef.current = false;
    resumeAutoplay();
  };

  const handleCardClick = (nichoId: NichoId) => {
    // If the user was dragging (distance > 5px), ignore click to prevent accidental triggers
    if (dragDistanceRef.current > 6) {
      return;
    }
    onSelectNicho(nichoId);
  };

  const handleScrollManual = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    pauseAutoplay();
    const offset = direction === 'left' ? -280 : 280;
    container.scrollBy({ left: offset, behavior: 'smooth' });
    resumeAutoplay(2500);
  };

  return (
    <div
      className="relative w-full group py-4 select-none"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => resumeAutoplay(1000)}
    >
      {/* Floating navigation chevrons for smooth desktop control */}
      <button
        type="button"
        onClick={() => handleScrollManual('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-black/80 hover:bg-black/95 text-white/80 hover:text-white border border-white/20 items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Anterior"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={() => handleScrollManual('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-black/80 hover:bg-black/95 text-white/80 hover:text-white border border-white/20 items-center justify-center backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Próximo"
      >
        <ChevronRight size={22} />
      </button>

      {/* Edge gradient masks for depth and smooth edge blending */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#07080D] via-[#07080D]/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#07080D] via-[#07080D]/70 to-transparent z-10 pointer-events-none" />

      {/* Carousel Track Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        className="overflow-x-scroll no-scrollbar scroll-smooth flex gap-4 px-4 sm:px-8 py-2 cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div ref={trackRef} className="flex gap-4 sm:gap-5 shrink-0 items-stretch">
          {items.map((nicho, idx) => (
            <div
              key={`${nicho.id}-${idx}`}
              onClick={() => handleCardClick(nicho.id)}
              className="group/card relative w-[190px] sm:w-[230px] rounded-3xl p-4 sm:p-5 flex flex-col justify-between shrink-0 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.7)] cursor-pointer overflow-hidden border border-white/10 hover:border-amber-400/50 bg-gradient-to-b from-[#111422] via-[#0B0D17] to-[#07080E]"
              style={{
                boxShadow: `0 8px 24px -8px ${nicho.accentColor}25`
              }}
            >
              {/* Ambient backlight glow matching the niche's exact brand color */}
              <div
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover/card:opacity-40 transition-opacity pointer-events-none"
                style={{ backgroundColor: nicho.accentColor }}
              />

              {/* Top Bar of the Card */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-mono font-black tracking-wider uppercase px-2 py-0.5 rounded-full border border-white/10 bg-white/5"
                  style={{ color: nicho.accentColor }}
                >
                  {nicho.badge || 'PREMIUM'}
                </span>
                <Sparkles size={12} className="text-white/30 group-hover/card:text-amber-400 transition-colors" />
              </div>

              {/* Central 3D Graphic Hero Carrier */}
              <div className="my-2 py-3 flex items-center justify-center relative">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover/card:scale-110"
                  style={{
                    background: `radial-gradient(circle, ${nicho.accentColor}22 0%, rgba(255,255,255,0.02) 70%)`
                  }}
                >
                  <NicheIcon3D nichoId={nicho.id} size="lg" glow={true} />
                </div>
              </div>

              {/* Title & Tagline — NO Technical Model Numbers */}
              <div className="mt-2 text-center">
                <h3 className="text-sm sm:text-base font-black text-white group-hover/card:text-amber-300 transition-colors tracking-tight line-clamp-1">
                  {nicho.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {nicho.subtitle}
                </p>
              </div>

              {/* Bottom Interactive Trigger */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 group-hover/card:text-white uppercase tracking-wider flex items-center gap-1 transition-colors">
                  <span>Explorar Biosites</span>
                  <span className="text-amber-400 group-hover/card:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
