import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { ChevronDown, Star, Award, Zap, Shield, ArrowRight, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const SportProfileEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);

  const bg = theme.background || '#0A1329';
  const primary = theme.primary || '#FF5E00';
  const secondary = theme.secondary || '#EA580C';

  const heroPhoto = project.usePhotos !== false && (identity.bannerUrl || photos[0]?.url);

  return (
    <div
      className="w-full space-y-8 animate-fadeIn text-white p-4 sm:p-6"
      style={{
        background: `radial-gradient(circle at 50% 20%, #102046 0%, ${bg} 60%, #03060E 100%)`
      }}
    >
      {/* 1. TOP ATHLETIC RAIL / STATUS HEADER (Matching Reference IMG_6712) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="font-bold tracking-wider uppercase text-[10px] text-orange-400">
            {identity.badge || 'PRO PERFORMANCE'}
          </span>
        </div>

        {/* Athletic Pagination Dots */}
        <div className="flex items-center gap-1.5 opacity-60">
          <span className="w-4 h-1.5 rounded-full bg-orange-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>

      {/* 2. ATHLETIC HERO: CUTOUT PERSON + 3D ITALIC LOGO */}
      <div className="relative text-center space-y-5 pt-4">
        {/* Radial Blue Glow behind Cutout */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-600/30 blur-[90px] pointer-events-none" />

        {/* Protagonist Cutout Image */}
        {heroPhoto && (
          <div
            className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 mx-auto group cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(heroPhoto)}
          >
            <div className="w-full h-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
              <img
                src={heroPhoto}
                alt={identity.name}
                className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1329] via-transparent to-transparent opacity-80" />
            </div>
          </div>
        )}

        {/* Free Floating Stylized 3D Italic Logo / Title */}
        <div className="relative z-10 space-y-2">
          {renderFreeLogo(project, 'mx-auto max-h-16 object-contain')}

          <h1 className="text-3xl sm:text-5xl font-black italic tracking-tighter uppercase text-white drop-shadow-md">
            {identity.name}
          </h1>

          <p className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-orange-400">
            MESTRE DA NAVALHA • BARBA TERAPIA • ESTILO
          </p>
        </div>

        {/* Bold Athletic Manifesto (Matching Reference IMG_6712) */}
        <div className="relative z-10 space-y-2 pt-2 max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none">
            NÃO É SÓ UM CORTE. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              É IDENTIDADE.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed italic max-w-sm mx-auto">
            "{identity.slogan}"
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="relative z-10 pt-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(249,115,22,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>GARANTIR MEU HORÁRIO</span>
            <ChevronDown size={16} />
          </a>
        </div>
      </div>

      {/* 3. PERFORMANCE STATS COUNTER GRID */}
      <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-center">
        <div className="space-y-0.5">
          <div className="text-lg sm:text-2xl font-black text-orange-400 tabular-nums">+4.500</div>
          <div className="text-[9px] font-mono uppercase text-slate-400">CORTES REALIZADOS</div>
        </div>
        <div className="space-y-0.5 border-x border-white/10">
          <div className="text-lg sm:text-2xl font-black text-white tabular-nums">100%</div>
          <div className="text-[9px] font-mono uppercase text-slate-400">PONTUALIDADE</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-lg sm:text-2xl font-black text-amber-400 tabular-nums">5.0 ★</div>
          <div className="text-[9px] font-mono uppercase text-slate-400">NOTA GOOGLE</div>
        </div>
      </div>

      {/* 4. ATHLETIC SERVICES LIST */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-orange-400 block px-1">
          SERVIÇOS DE ALTA PERFORMANCE
        </span>

        <div className="space-y-3">
          {services.map((s, idx) => (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-orange-500">0{idx + 1}.</span>
                  <h3 className="font-bold text-sm text-white group-hover:text-orange-400 transition-colors uppercase">
                    {s.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed max-w-md">
                  {s.description}
                </p>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 self-start sm:self-center"
              >
                <span>{s.ctaText || 'Agendar'}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 5. LOCATION & GOOGLE */}
      {location?.address && (
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
          <MapPin size={20} className="text-orange-400 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">ENDEREÇO</span>
            <p className="text-xs font-medium text-white">{location.address}</p>
            {location.mapsUrl && (
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:underline pt-1"
              >
                <BrandGoogleMaps size={13} />
                <span>Abrir Rota no GPS</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* 6. FLOATING WHATSAPP BUTTON */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Falar no WhatsApp"
      >
        <BrandWhatsApp size={28} className="text-slate-950" />
      </a>
    </div>
  );
};
