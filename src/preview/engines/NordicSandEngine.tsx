import React, { useState } from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, ChevronRight, ChevronDown, Check, ArrowUpRight } from 'lucide-react';

export const NordicSandEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);

  const bg = '#F4F1EA'; // Pure Nordic Sand / Linen
  const surface = '#FFFFFF';
  const text = '#22252A';
  const textMuted = '#6B7280';
  const border = 'rgba(34, 37, 42, 0.1)';
  const accent = theme.primary || '#556B2F'; // Earthy olive / bronze

  const [openAccordion, setOpenAccordion] = useState<string | null>(services[0]?.id || null);

  const heroPhoto = project.usePhotos !== false && (identity.bannerUrl || photos[0]?.url);

  return (
    <div
      className="w-full space-y-10 animate-fadeIn p-4 sm:p-8 rounded-3xl"
      style={{ backgroundColor: bg, color: text, fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. SCANDINAVIAN SPLIT HERO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border text-xs font-mono font-medium" style={{ borderColor: border, color: accent }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span>{identity.badge || 'NORDIC CONCEPT • EST. 2020'}</span>
          </div>

          {renderFreeLogo(project, 'py-1', 'left')}

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight" style={{ color: text }}>
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm font-normal leading-relaxed max-w-md" style={{ color: textMuted }}>
              {identity.slogan}
            </p>
          </div>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-white text-xs font-medium tracking-wide shadow-md transition-all active:scale-95"
              style={{ backgroundColor: text }}
            >
              <span>{identity.title || 'Agendar Experiência'}</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Organic Curved Photo Frame */}
        {heroPhoto && (
          <div
            className="rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-xl border cursor-pointer group"
            style={{ borderColor: border }}
            onClick={() => onPhotoClick && onPhotoClick(heroPhoto)}
          >
            <img
              src={heroPhoto}
              alt={identity.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
      </div>

      {/* 2. LOOKBOOK SLIDER */}
      {photos.length > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: border }}>
            <span className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: textMuted }}>
              LOOKBOOK & PORTFÓLIO
            </span>
            <span className="text-[10px] font-mono" style={{ color: textMuted }}>
              {photos.length} REGISTROS
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className="w-48 h-64 rounded-2xl overflow-hidden shrink-0 snap-start shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                style={{ borderColor: border }}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ACCORDION SERVICE MENU */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider font-bold block" style={{ color: textMuted }}>
          PROCEDIMENTOS & VALORES
        </span>

        <div className="space-y-2">
          {services.map((s) => {
            const isSelected = openAccordion === s.id;
            return (
              <div
                key={s.id}
                className="rounded-2xl border transition-all overflow-hidden"
                style={{
                  backgroundColor: surface,
                  borderColor: isSelected ? accent : border
                }}
              >
                <div
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer"
                  onClick={() => setOpenAccordion(isSelected ? null : s.id)}
                >
                  <h3 className="font-medium text-sm sm:text-base">{s.name}</h3>
                  <div className="flex items-center gap-3">
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}
                      style={{ color: textMuted }}
                    />
                  </div>
                </div>

                {isSelected && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t space-y-3" style={{ borderColor: border }}>
                    <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: textMuted }}>
                      {s.description}
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-medium"
                      style={{ backgroundColor: accent }}
                    >
                      <span>Reservar Este Serviço</span>
                      <ChevronRight size={13} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. LOCATION & HOURS */}
      {location?.address && (
        <div className="p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ backgroundColor: surface, borderColor: border }}>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: textMuted }}>
              ONDE ESTAMOS
            </span>
            <p className="text-xs sm:text-sm font-medium">{location.address}</p>
            {location.hours && <p className="text-xs font-mono" style={{ color: textMuted }}>{location.hours}</p>}
          </div>

          {location.mapsUrl && (
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-colors hover:bg-stone-50 self-start sm:self-center"
              style={{ borderColor: border, color: text }}
            >
              <BrandGoogleMaps size={14} />
              <span>Ver no Maps</span>
            </a>
          )}
        </div>
      )}

      {/* 5. FLOATING WHATSAPP BUTTON */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Falar no WhatsApp"
      >
        <BrandWhatsApp size={28} className="text-white" />
      </a>
    </div>
  );
};
