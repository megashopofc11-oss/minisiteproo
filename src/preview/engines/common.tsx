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
