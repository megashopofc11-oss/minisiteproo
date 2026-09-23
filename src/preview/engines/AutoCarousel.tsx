import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PhotoItem, CarouselConfig } from '../../types';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface AutoCarouselProps {
  photos: PhotoItem[];
  config?: Partial<CarouselConfig>;
  onPhotoClick?: (url: string) => void;
  accentColor?: string;
  aspectRatio?: string; // e.g. 'aspect-[16/10]' or 'aspect-[4/3]'
  roundedClass?: string;
}

export const AutoCarousel: React.FC<AutoCarouselProps> = ({
  photos,
  config = {},
  onPhotoClick,
  accentColor = '#D97706',
  aspectRatio = 'aspect-[16/10]',
  roundedClass = 'rounded-2xl'
}) => {
  const {
    autoplay = true,
    interval = 3,
    loop = true,
    showIndicators = true,
    showArrows = true,
    pauseOnHover = true,
    transition = 'slide'
  } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = photos.length;

  const nextSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => {
      if (prev >= total - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [total, loop]);

  const prevSlide = useCallback(() => {
    if (total <= 1) return;
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return loop ? total - 1 : prev;
      }
      return prev - 1;
    });
  }, [total, loop]);

  useEffect(() => {
    if (!autoplay || isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, Math.max(2, interval) * 1000);
    return () => clearInterval(timer);
  }, [autoplay, interval, isPaused, nextSlide, total]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    if (pauseOnHover) setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (pauseOnHover) setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (total === 0) return null;

  return (
    <div
      className={`relative w-full ${aspectRatio} ${roundedClass} overflow-hidden group select-none shadow-2xl bg-black/40`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {photos.map((photo, idx) => {
          const isActive = idx === currentIndex;
          let slideStyle = '';

          if (transition === 'fade') {
            slideStyle = isActive
              ? 'opacity-100 z-10 scale-100 transition-opacity duration-700'
              : 'opacity-0 z-0 scale-100 pointer-events-none transition-opacity duration-700';
          } else if (transition === 'scale') {
            slideStyle = isActive
              ? 'opacity-100 z-10 scale-100 transition-all duration-700'
              : 'opacity-0 z-0 scale-105 pointer-events-none transition-all duration-700';
          } else {
            // Smooth slide
            const offset = (idx - currentIndex) * 100;
            slideStyle = 'transition-transform duration-500 ease-out';
            return (
              <div
                key={photo.id || idx}
                className={`absolute inset-0 w-full h-full cursor-pointer ${slideStyle}`}
                style={{ transform: `translateX(${offset}%)` }}
                onClick={() => onPhotoClick && onPhotoClick(photo.url)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || photo.caption || `Foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                {photo.caption && (
                  <div className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-white/90 drop-shadow truncate">
                    {photo.caption}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={photo.id || idx}
              className={`absolute inset-0 w-full h-full cursor-pointer ${slideStyle}`}
              onClick={() => onPhotoClick && onPhotoClick(photo.url)}
            >
              <img
                src={photo.url}
                alt={photo.alt || photo.caption || `Foto ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              {photo.caption && (
                <div className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-white/90 drop-shadow truncate">
                  {photo.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expand / Lightbox Action Icon */}
      <button
        type="button"
        onClick={() => onPhotoClick && onPhotoClick(photos[currentIndex]?.url)}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/75 backdrop-blur-md transition-all cursor-pointer opacity-0 group-hover:opacity-100"
        title="Ampliar Foto"
      >
        <Maximize2 size={14} />
      </button>

      {/* Navigation Arrows */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
            aria-label="Foto Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100"
            aria-label="Próxima Foto"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Indicators Dots */}
      {showIndicators && total > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center items-center gap-1.5 pointer-events-none">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                i === currentIndex ? 'w-5' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              style={{
                backgroundColor: i === currentIndex ? accentColor : undefined
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
