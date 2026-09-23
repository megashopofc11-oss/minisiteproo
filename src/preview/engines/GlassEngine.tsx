import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, Sparkles, ChevronRight, Share2, Check } from 'lucide-react';

export const GlassEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, statusConfig, shareConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const glassBg = theme.background || '#0C1E2E';
  const glassBorder = 'border border-white/15';
  const glassSurface = 'bg-white/10 backdrop-blur-xl';

  return (
    <div
      className="w-full space-y-8 animate-fadeIn p-4 sm:p-6 rounded-3xl relative overflow-hidden text-white"
      style={{ backgroundColor: glassBg }}
    >
      {/* Ambient background light orbs */}
      <div className="absolute top-10 -left-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-80 -right-20 w-80 h-80 rounded-full bg-amber-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />

      {/* 1. GLASS HERO CARD */}
      <div className={`relative z-10 p-6 sm:p-10 rounded-3xl ${glassSurface} ${glassBorder} shadow-2xl space-y-5 text-center`}>
        {renderFreeLogo(project, 'pb-2', 'center')}

        <div className="space-y-2">
          {identity.badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-cyan-300">
              <Sparkles size={11} />
              {identity.badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm text-cyan-100/80 max-w-md mx-auto leading-relaxed">
            {identity.slogan}
          </p>
        </div>

        {/* Quick Glass Action Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-emerald-500/80 hover:bg-emerald-500 border border-emerald-400/40 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <BrandWhatsApp size={16} />
            <span>{identity.title || 'WhatsApp Direto'}</span>
          </a>

          {socials?.instagram?.url && (
            <a
              href={socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 rounded-full ${glassSurface} ${glassBorder} text-white text-xs font-medium flex items-center gap-1.5 hover:bg-white/20 transition-all`}
            >
              <BrandInstagram size={15} />
              <span>Instagram</span>
            </a>
          )}
        </div>
      </div>

      {/* 2. GLASS STATUS CARD */}
      {statusConfig?.enabled && (
        <div className={`relative z-10 p-4 rounded-2xl ${glassSurface} ${glassBorder} flex items-center justify-between`}>
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#34D399]' : 'bg-amber-400'}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {isOpen ? 'ABERTO AGORA' : 'FECHADO NO MOMENTO'}
            </span>
          </div>
          {shareConfig?.enabled && (
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold border border-white/20 text-white"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
              <span>{copied ? 'Copiado' : 'Compartilhar'}</span>
            </button>
          )}
        </div>
      )}

      {/* 3. ABOUT GLASS CARD */}
      {identity.about && (
        <div className={`relative z-10 p-6 rounded-3xl ${glassSurface} ${glassBorder} space-y-2`}>
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 block">
            CONCEITO & VALOR
          </span>
          <p className="text-xs sm:text-sm text-cyan-50/90 leading-relaxed font-light">
            {identity.about}
          </p>
        </div>
      )}

      {/* 4. DIFFERENTIALS GLASS PILLS */}
      {differentials.length > 0 && (
        <div className="relative z-10 space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-300 block px-1">
            DIFERENCIAIS EXCLUSIVOS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {differentials.map((diff) => (
              <div key={diff.id} className={`p-4 rounded-2xl ${glassSurface} ${glassBorder} space-y-1`}>
                <h4 className="text-xs font-bold text-white">{diff.title}</h4>
                <p className="text-[11px] text-cyan-100/70">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SERVICES GLASS CARDS */}
      {services.length > 0 && (
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base sm:text-lg font-black tracking-tight uppercase text-white">
              Especialidades
            </h3>
            <span className="text-xs font-mono text-cyan-300">{services.length} SERVIÇOS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                className={`p-5 rounded-3xl ${glassSurface} ${glassBorder} hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-3 group`}
              >
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {svc.name}
                  </h4>
                  <p className="text-xs text-cyan-100/70 font-light leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-cyan-200 text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>{svc.ctaText || 'Agendar no WhatsApp'}</span>
                    <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. GLASS GALLERY */}
      {photos.length > 0 && (
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base sm:text-lg font-black tracking-tight uppercase text-white">
              Galeria Visual
            </h3>
            <span className="text-[10px] font-mono text-cyan-300">{photos.length} FOTOS</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className={`w-60 h-44 rounded-2xl overflow-hidden shrink-0 ${glassBorder} shadow-lg cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <img src={p.url} alt={p.alt || ''} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. REVIEWS */}
      {googleReviewConfig?.enabled && (
        <div className={`relative z-10 p-5 rounded-3xl ${glassSurface} ${glassBorder} flex items-center justify-between gap-4`}>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400" />
              ))}
              <span className="text-xs font-bold text-white ml-1">5.0</span>
            </div>
            <p className="text-xs text-cyan-100/80 font-light">
              Reconhecido no Google ({googleReviewConfig.reviewCount || 147} avaliações)
            </p>
          </div>
          {googleReviewConfig.url && (
            <a
              href={googleReviewConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white shrink-0"
            >
              Ver Reviews
            </a>
          )}
        </div>
      )}

      {/* 8. DEDICATED LOCATION (NO DUPLICATION) */}
      {location?.address && (
        <div className={`relative z-10 p-5 rounded-3xl ${glassSurface} ${glassBorder} space-y-2`}>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 block">
                ENDEREÇO
              </span>
              <p className="text-xs sm:text-sm text-white font-medium">{location.address}</p>
              {location.city && <p className="text-xs text-cyan-100/70">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:underline pt-1"
                >
                  <BrandGoogleMaps size={13} />
                  <span>Traçar Rota no Mapa</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. DEDICATED HOURS (NO DUPLICATION) */}
      {location?.hours && (
        <div className={`relative z-10 p-5 rounded-3xl ${glassSurface} ${glassBorder} space-y-1`}>
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 block">
                HORÁRIOS DE ATENDIMENTO
              </span>
              <p className="text-xs text-white">{location.hours}</p>
            </div>
          </div>
        </div>
      )}

      {/* 10. FOOTER CTA */}
      <footer className="relative z-10 pt-4 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'Conversar no WhatsApp'}</span>
        </a>
      </footer>
    </div>
  );
};
