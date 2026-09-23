import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, Sparkles, ArrowUpRight } from 'lucide-react';

export const BentoEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, statusConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);

  const bentoBg = theme.background || '#090A0F';
  const tileBg = 'bg-white/[0.04] hover:bg-white/[0.06] transition-colors border border-white/10 rounded-3xl p-5 shadow-lg';

  return (
    <div
      className="w-full space-y-4 animate-fadeIn text-white p-2"
      style={{ backgroundColor: bentoBg }}
    >
      {/* BENTO GRID CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {/* TILE 1: MAIN BRAND & HERO (Col-span 2) */}
        <div className={`sm:col-span-2 ${tileBg} flex flex-col justify-between space-y-4`}>
          <div className="flex items-start justify-between gap-4">
            {renderFreeLogo(project, '', 'left')}
            {identity.badge && (
              <span className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/10 border border-white/15 text-amber-300">
                {identity.badge}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {identity.name}
            </h1>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {identity.slogan}
            </p>
          </div>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95"
            >
              <span>{identity.title || 'Agendar Agora'}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* TILE 2: REAL-TIME STATUS (1 Col) */}
        {statusConfig?.enabled && (
          <div className={`${tileBg} flex flex-col justify-between space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">STATUS</span>
              <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#34D399]' : 'bg-amber-400'}`} />
            </div>
            <div>
              <span className="text-sm font-black uppercase text-white block">
                {isOpen ? 'ABERTO AGORA' : 'FECHADO'}
              </span>
              <span className="text-xs text-slate-400">
                {statusConfig.openTime || '09:00'} às {statusConfig.closeTime || '20:00'}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              VERIFICADO HOJE
            </div>
          </div>
        )}

        {/* TILE 3: GOOGLE RATING (1 Col) */}
        {googleReviewConfig?.enabled && (
          <div className={`${tileBg} flex flex-col justify-between space-y-2`}>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400">GOOGLE REVIEWS</span>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-1">5.0</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                {googleReviewConfig.reviewCount || 147}+ avaliações 5 estrelas
              </p>
            </div>
            {googleReviewConfig.url && (
              <a
                href={googleReviewConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Ver avaliações</span>
                <ArrowUpRight size={11} />
              </a>
            )}
          </div>
        )}

        {/* TILE 4: FEATURED PHOTO (1 Col) */}
        {photos[0]?.url && (
          <div
            className={`overflow-hidden rounded-3xl border border-white/10 aspect-square sm:aspect-auto sm:h-auto min-h-[140px] relative cursor-pointer group shadow-lg`}
            onClick={() => onPhotoClick && onPhotoClick(photos[0].url)}
          >
            <img src={photos[0].url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono text-white">
              DESTAQUE
            </div>
          </div>
        )}

        {/* TILE 5: SOCIAL ACTIONS (1 Col) */}
        <div className={`${tileBg} flex flex-col justify-between space-y-2`}>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">CONEXÃO DIRETA</span>
          <div className="space-y-2">
            {socials?.whatsapp?.enabled && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5"><BrandWhatsApp size={14} /> WhatsApp</span>
                <ArrowUpRight size={12} />
              </a>
            )}
            {socials?.instagram?.enabled && socials.instagram.url && (
              <a
                href={socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5"><BrandInstagram size={14} /> Instagram</span>
                <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </div>

        {/* TILE 6: SERVICES BENTO (Col-span 2 ou 3) */}
        {services.length > 0 && (
          <div className={`sm:col-span-2 md:col-span-3 ${tileBg} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">ESPECIALIDADES</span>
              <span className="text-[10px] font-mono text-slate-400">{services.length} SERVIÇOS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((svc) => (
                <div key={svc.id} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white">{svc.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{svc.description}</p>
                  </div>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-amber-400 p-1 hover:text-white shrink-0">
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TILE 7: LOCATION BENTO (Col-span 2) - NO DUPLICATION */}
        {location?.address && (
          <div className={`sm:col-span-2 ${tileBg} flex items-start gap-3`}>
            <MapPin size={20} className="text-amber-400 shrink-0 mt-1" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">ENDEREÇO</span>
              <p className="text-xs sm:text-sm text-white font-medium">{location.address}</p>
              {location.city && <p className="text-xs text-slate-400">{location.city}</p>}
              {location.mapsUrl && (
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline pt-1">
                  <BrandGoogleMaps size={12} />
                  <span>Como Chegar</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* TILE 8: HOURS BENTO (1 Col) - NO DUPLICATION */}
        {location?.hours && (
          <div className={`${tileBg} flex flex-col justify-between space-y-2`}>
            <div className="flex items-center gap-2 text-amber-400">
              <Clock size={16} />
              <span className="text-[10px] font-mono uppercase tracking-widest">HORÁRIO</span>
            </div>
            <p className="text-xs text-white leading-relaxed">{location.hours}</p>
          </div>
        )}
      </div>

      {/* FULL-WIDTH FOOTER CTA */}
      <footer className="pt-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95"
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'Solicitar Agendamento VIP'}</span>
        </a>
      </footer>
    </div>
  );
};
