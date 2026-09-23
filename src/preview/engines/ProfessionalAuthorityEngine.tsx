import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo, RenderSmartGallery } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogle, BrandGoogleMaps } from '../../components/BrandIcons';
import { CheckCircle2, Star, MapPin, Clock, Award, ShieldCheck, ChevronRight, Share2, Check } from 'lucide-react';

export const ProfessionalAuthorityEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const {
    identity,
    theme,
    photos = [],
    services = [],
    socials,
    location,
    googleReviewConfig,
    statusConfig,
    differentials = []
  } = project;

  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usePhotos = project.usePhotos !== false;
  const portraitUrl = identity.avatarUrl || photos[0]?.url || identity.bannerUrl;

  const authorityBg = theme.background || '#080C14';
  const authoritySurface = theme.surface || '#101624';
  const authorityText = theme.text || '#F8FAFC';
  const authorityMuted = theme.textMuted || '#94A3B8';
  const authorityBorder = theme.border || 'rgba(255, 255, 255, 0.12)';
  const accent = theme.primary || '#38BDF8';
  const secondary = theme.secondary || '#0284C7';

  return (
    <div
      className="w-full space-y-8 animate-fadeIn"
      style={{
        color: authorityText,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
    >
      {/* 1. TOP STATUS BAR (Inspired by Marcos Willian & Central Food Park) */}
      <div className="flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          {statusConfig?.enabled !== false && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md"
              style={{
                backgroundColor: isOpen ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                borderColor: isOpen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                color: isOpen ? '#34D399' : '#F87171'
              }}
            >
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              {isOpen ? 'ATENDENDO HOJE' : 'AGENDA FECHADA'}
            </span>
          )}
          <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-400 hidden sm:inline">
            {identity.badge || 'ESPECIALISTA VIP'}
          </span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold border border-white/10 transition-colors"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
          <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
        </button>
      </div>

      {/* 2. HERO CUTOUT PORTRAIT & AUTHORITY LOCKUP (Inspired by Jéssica Rodrigues & Marcos Willian) */}
      <section className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border shadow-2xl flex flex-col items-center text-center space-y-5"
        style={{
          backgroundColor: authoritySurface,
          borderColor: authorityBorder,
          background: `radial-gradient(circle at 50% 20%, ${accent}22 0%, ${authorityBg} 75%)`
        }}
      >
        {/* Professional Portrait Cutout with Bottom Fade (Optional Photos) */}
        {usePhotos && portraitUrl && (
          <div className="relative w-48 sm:w-60 aspect-[3/4] -mt-2 -mb-4 select-none">
            <img
              src={portraitUrl}
              alt={identity.name}
              className="w-full h-full object-cover object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
              }}
            />
          </div>
        )}

        {/* Free Floating PNG Logo (No forced circle, no crop) */}
        {renderFreeLogo(project, 'py-1')}

        {/* Name and Subtitle Category Tags */}
        <div className="space-y-2 max-w-md">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight" style={{ color: authorityText }}>
              {identity.name}
            </h1>
            <span className="p-1 rounded-full text-white bg-blue-500 shadow-md">
              <CheckCircle2 size={15} />
            </span>
          </div>

          <p className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-slate-400">
            {identity.subtitle || 'MESTRE BARBEIRO • VISAGISMO • BARBOTERAPIA'}
          </p>
        </div>

        {/* Punchy Authority Headline */}
        <div className="space-y-2 max-w-sm">
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-snug">
            NÃO É SÓ UM CORTE.{' '}
            <span style={{ color: accent }}>É A SUA IMAGEM.</span>
          </h2>

          <p className="text-xs sm:text-sm italic leading-relaxed text-slate-300">
            "{identity.slogan || 'Técnica milimétrica para homens que valorizam presença e autoridade.'}"
          </p>
        </div>

        {/* Bio description */}
        {identity.about && (
          <p className="text-xs leading-relaxed max-w-md text-slate-400">
            {identity.about}
          </p>
        )}

        {/* Primary High-Conversion CTA */}
        <div className="pt-2 w-full max-w-xs">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-2xl transition-transform active:scale-95 text-slate-950"
            style={{
              backgroundColor: accent,
              boxShadow: `0 10px 25px -5px ${accent}60`
            }}
          >
            <BrandWhatsApp size={18} />
            <span>{identity.title || 'AGENDAR COM O MESTRE'}</span>
          </a>
        </div>
      </section>

      {/* 3. AUTHORITY CREDENTIALS / STATS */}
      {differentials.length > 0 && (
        <section className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          {differentials.slice(0, 3).map((diff, idx) => (
            <div
              key={diff.id || idx}
              className="p-3 sm:p-4 rounded-2xl border shadow-lg space-y-1"
              style={{ backgroundColor: authoritySurface, borderColor: authorityBorder }}
            >
              <div className="text-base sm:text-xl font-black" style={{ color: accent }}>
                {diff.title}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 leading-tight">
                {diff.description}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 4. GOOGLE REVIEWS BANNER (Inspired by Central Food Park) */}
      {googleReviewConfig?.enabled !== false && (
        <section
          className="p-4 sm:p-5 rounded-3xl border shadow-xl flex items-center justify-between gap-4"
          style={{ backgroundColor: authoritySurface, borderColor: authorityBorder }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <BrandGoogle size={24} />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
                <span className="font-black text-white ml-1">5.0</span>
              </div>
              <h4 className="text-xs font-bold uppercase text-white mt-0.5">
                NOS AVALIE NO GOOGLE
              </h4>
              <p className="text-[10px] text-slate-400">
                {googleReviewConfig?.reviewCount || '240'}+ avaliações de clientes satisfeitos
              </p>
            </div>
          </div>

          <a
            href={googleReviewConfig?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase border border-white/15 bg-white/5 hover:bg-white/10 text-white shrink-0 transition-all"
          >
            Avaliar
          </a>
        </section>
      )}

      {/* 5. SERVICES / SIGNATURE RITUALS */}
      {services.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400">
              RITUAIS DE ATENDIMENTO
            </h3>
            <span className="text-[10px] font-mono" style={{ color: accent }}>
              CADEIRA VIP
            </span>
          </div>

          <div className="space-y-2.5">
            {services.map((svc, idx) => (
              <a
                key={svc.id || idx}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border flex items-center justify-between gap-4 group transition-all hover:border-white/30 shadow-md active:scale-[0.99]"
                style={{ backgroundColor: authoritySurface, borderColor: authorityBorder }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold" style={{ color: accent }}>
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {svc.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                    {svc.description}
                  </p>
                  {svc.price && (
                    <span className="inline-block text-xs font-black text-white pt-1">
                      {svc.price}
                    </span>
                  )}
                </div>

                <div className="shrink-0 p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 6. SMART GALLERY (Resilient, auto hides if no photos) */}
      <RenderSmartGallery project={project} onPhotoClick={onPhotoClick} />

      {/* 7. LOCATION & HOURS */}
      {(location?.address || location?.hours) && (
        <section
          className="p-5 rounded-3xl border shadow-xl space-y-4"
          style={{ backgroundColor: authoritySurface, borderColor: authorityBorder }}
        >
          {location.address && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: accent }} />
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 block">
                  LOCALIZAÇÃO
                </span>
                <p className="text-xs text-white mt-0.5">{location.address}</p>
                {(location.mapsUrl || location.address) && (
                  <a
                    href={location.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold mt-2"
                    style={{ color: accent }}
                  >
                    <BrandGoogleMaps size={12} />
                    <span>Ver no Google Maps</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {location.hours && (
            <div className="flex items-start gap-3 pt-3 border-t" style={{ borderColor: authorityBorder }}>
              <Clock size={18} className="shrink-0 mt-0.5 text-slate-400" />
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 block">
                  HORÁRIOS DE ATENDIMENTO
                </span>
                <p className="text-xs text-slate-300 mt-0.5">{location.hours}</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 8. FOOTER */}
      <footer className="text-center py-4 space-y-2 text-xs text-slate-500 font-mono">
        <p>© {new Date().getFullYear()} {identity.name} • Todos os direitos reservados</p>
      </footer>
    </div>
  );
};
