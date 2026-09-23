import React from 'react';
import { ProjectData, LogoConfig } from '../../types';

export interface EngineProps {
  project: ProjectData;
  viewport?: 'mobile' | 'tablet' | 'desktop';
  onPhotoClick?: (url: string) => void;
}

export const getWhatsAppUrl = (project: ProjectData): string => {
  const waNumber = project.whatsappConfig?.number || project.socials?.whatsapp?.number || '';
  const cleanWaNumber = waNumber.replace(/\D/g, '');
  const waMsg = project.whatsappConfig?.message || project.socials?.whatsapp?.message || 'Olá! Vim pelo biosite.';
  return cleanWaNumber ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMsg)}` : '#';
};

export const isStoreOpen = (project: ProjectData): boolean => {
  const cfg = project.statusConfig;
  if (!cfg?.enabled) return true;
  if (!cfg.autoCalculate) return cfg.customText?.toLowerCase().includes('aberto') ?? true;

  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = (cfg.openTime || '09:00').split(':').map(Number);
    const [closeH, closeM] = (cfg.closeTime || '20:00').split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;
    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  } catch {
    return true;
  }
};

/**
 * Universal Free Floating Logo (NO forced circular avatar, object-fit: contain, transparency preserved)
 */
export const renderFreeLogo = (
  project: ProjectData,
  customClasses = '',
  forceAlign?: 'left' | 'center' | 'right'
) => {
  if (project.showLogo === false) return null;
  const { identity, logoConfig } = project;
  if (!identity.logoUrl) return null;

  const cfg: LogoConfig = logoConfig || {
    size: 'lg',
    align: 'center',
    position: 'hero',
    background: 'none'
  };

  const align = forceAlign || cfg.align || 'center';

  const sizeClass = {
    sm: 'max-h-12 max-w-[130px]',
    md: 'max-h-16 max-w-[190px]',
    lg: 'max-h-24 max-w-[260px]',
    xl: 'max-h-32 max-w-[320px]'
  }[cfg.size || 'lg'];

  const alignClass = {
    left: 'justify-start text-left',
    center: 'justify-center text-center mx-auto',
    right: 'justify-end text-right ml-auto'
  }[align];

  const bgClass = {
    none: '',
    glass: 'p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
    light: 'p-3 rounded-2xl bg-white/95 shadow-xl',
    dark: 'p-3 rounded-2xl bg-black/80 border border-white/20 shadow-xl'
  }[cfg.background || 'none'];

  return (
    <div className={`flex items-center ${alignClass} ${customClasses}`}>
      <div className={`${bgClass} inline-flex items-center justify-center transition-all`}>
        <img
          src={identity.logoUrl}
          alt={identity.name}
          className={`${sizeClass} w-auto object-contain select-none`}
        />
      </div>
    </div>
  );
};

import { AutoCarousel } from './AutoCarousel';
import { Maximize2, Sparkles } from 'lucide-react';

export const RenderSmartGallery: React.FC<{
  project: ProjectData;
  onPhotoClick?: (url: string) => void;
  customStyle?: string;
}> = ({ project, onPhotoClick, customStyle }) => {
  if (project.usePhotos === false) return null;
  const photos = (project.photos || []).filter(p => p && p.url);
  if (photos.length === 0) return null;

  const galleryStyle = (customStyle || project.galleryStyle || 'grid') as string;
  if (galleryStyle === 'none') return null;

  // 1. CARROSSEL AUTOMÁTICO
  if (galleryStyle === 'carousel') {
    return (
      <div className="w-full space-y-2">
        <AutoCarousel
          photos={photos}
          config={project.carouselConfig}
          onPhotoClick={onPhotoClick}
          accentColor={project.theme?.primary}
        />
      </div>
    );
  }

  // 2. FOTO ÚNICA (Destaque Solo)
  if (galleryStyle === 'single') {
    const photo = photos[0];
    return (
      <div
        className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group border border-white/10"
        onClick={() => onPhotoClick && onPhotoClick(photo.url)}
      >
        <img
          src={photo.url}
          alt={photo.alt || project.identity.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-xs text-white font-medium flex items-center gap-1.5">
            <Maximize2 size={14} /> {photo.caption || 'Ver em alta resolução'}
          </span>
        </div>
      </div>
    );
  }

  // 3. MASONRY
  if (galleryStyle === 'masonry') {
    return (
      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {photos.map((p, idx) => (
          <div
            key={p.id || idx}
            className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg border border-white/10 relative group cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(p.url)}
          >
            <img
              src={p.url}
              alt={p.alt || ''}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {p.caption && (
              <div className="absolute bottom-0 inset-x-0 p-2 bg-black/70 backdrop-blur-xs text-[11px] text-white">
                {p.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 4. LOOKBOOK / EDITORIAL
  if (galleryStyle === 'lookbook' || galleryStyle === 'editorial') {
    return (
      <div className="space-y-6">
        {photos.map((p, idx) => (
          <div
            key={p.id || idx}
            className="space-y-2 cursor-pointer group"
            onClick={() => onPhotoClick && onPhotoClick(p.url)}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 shadow-xl">
              <img
                src={p.url}
                alt={p.alt || ''}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={14} />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs px-2 text-slate-400 font-mono">
              <span>{p.caption || `LOOK 0${idx + 1}`}</span>
              <span className="uppercase">{project.identity.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 5. SLIDER HORIZONTAL
  if (galleryStyle === 'horizontal-scroll') {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {photos.map((p, idx) => (
          <div
            key={p.id || idx}
            className="shrink-0 w-64 sm:w-72 aspect-[4/5] rounded-3xl overflow-hidden snap-center relative shadow-xl border border-white/10 group cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(p.url)}
          >
            <img
              src={p.url}
              alt={p.alt || ''}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {p.caption && (
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-xs text-white">
                {p.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // 6. COLLAGE
  if (galleryStyle === 'collage') {
    return (
      <div className="grid grid-cols-3 gap-2">
        {photos.map((p, idx) => {
          const isLarge = idx === 0 || idx === 3;
          return (
            <div
              key={p.id || idx}
              className={`${isLarge ? 'col-span-2 row-span-2 aspect-square' : 'col-span-1 aspect-square'} rounded-2xl overflow-hidden shadow-lg border border-white/10 relative group cursor-pointer`}
              onClick={() => onPhotoClick && onPhotoClick(p.url)}
            >
              <img
                src={p.url}
                alt={p.alt || ''}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          );
        })}
      </div>
    );
  }

  // 7. FULL SCREEN (Full Width Banner Cards)
  if (galleryStyle === 'fullscreen') {
    return (
      <div className="space-y-4">
        {photos.map((p, idx) => (
          <div
            key={p.id || idx}
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(p.url)}
          >
            <img
              src={p.url}
              alt={p.alt || ''}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
              <span className="text-white text-sm font-bold drop-shadow">
                {p.caption || `Galeria Exclusiva ${idx + 1}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 8. GALERIA GRID (Default 2 Columns)
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((p, idx) => (
        <div
          key={p.id || idx}
          className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer"
          onClick={() => onPhotoClick && onPhotoClick(p.url)}
        >
          <img
            src={p.url}
            alt={p.alt || ''}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {p.caption && (
            <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-[11px] text-white">
              {p.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
