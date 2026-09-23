import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export const ImmersiveEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], location, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);

  return (
    <div className="w-full space-y-12 animate-fadeIn text-white">
      {/* CHAPTER 01: FULL-BLEED IMMERSIVE HERO */}
      <section className="relative min-h-[500px] rounded-3xl overflow-hidden flex flex-col justify-end p-6 sm:p-10 shadow-2xl border border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] saturate-[1.2]"
          style={{ backgroundImage: `url(${identity.bannerUrl || photos[0]?.url || identity.logoUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-lg">
          {renderFreeLogo(project, 'pb-2', 'left')}

          {identity.badge && (
            <span className="inline-block px-3 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-amber-300">
              {identity.badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none drop-shadow-xl">
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed drop-shadow">
            {identity.slogan}
          </p>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl transition-transform active:scale-95"
            >
              <span>{identity.title || 'EXPERIÊNCIA EXCLUSIVA'}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* CHAPTER 02: THE MANIFESTO */}
      {identity.about && (
        <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-white/10 bg-zinc-950 shadow-2xl text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 block">
            CAPÍTULO 02 • O MANIFESTO
          </span>
          <p className="text-sm sm:text-lg text-slate-200 font-light italic leading-relaxed max-w-xl mx-auto">
            "{identity.about}"
          </p>
        </section>
      )}

      {/* CHAPTER 03: PHOTO-CARD SPECIALTIES */}
      {services.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black uppercase tracking-tight">
              Especialidades em Foco
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              {services.length} CAPÍTULOS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className="relative rounded-3xl overflow-hidden min-h-[180px] p-6 flex flex-col justify-end border border-white/10 group cursor-pointer shadow-xl"
                onClick={() => onPhotoClick && onPhotoClick(svc.imageUrl || photos[idx % photos.length]?.url || '')}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${svc.imageUrl || photos[idx % photos.length]?.url || identity.bannerUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-amber-400 tracking-widest uppercase">
                      0{idx + 1} • SERVIÇO
                    </span>
                    <h4 className="text-lg font-bold text-white uppercase">{svc.name}</h4>
                    <p className="text-xs text-slate-300 font-light max-w-md">{svc.description}</p>
                  </div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold text-white shrink-0 self-start sm:self-auto transition-all"
                  >
                    <span>Agendar</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CHAPTER 04: FULL-WIDTH PHOTOGRAPHY CHAPTERS */}
      {photos.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black uppercase tracking-tight">
              Galeria Imersiva
            </h3>
            <span className="text-[10px] font-mono text-slate-400">ENSAIO VISUAL</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {photos.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-lg cursor-pointer group"
              >
                <img
                  src={p.url}
                  alt={p.alt || ''}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono tracking-widest uppercase text-white">
                  FRAME 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CHAPTER 05: SEPARATE LOCATION (NO DUPLICATION) */}
      {location?.address && (
        <section className="p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-xl space-y-2">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                COORDENADAS & ACESSO
              </span>
              <p className="text-xs sm:text-sm text-white font-medium">{location.address}</p>
              {location.city && <p className="text-xs text-slate-400">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
                >
                  <BrandGoogleMaps size={13} />
                  <span>Traçar Rota no Mapa</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 06: SEPARATE HOURS (NO DUPLICATION) */}
      {location?.hours && (
        <section className="p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-xl space-y-1">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                HORÁRIOS DE ATENDIMENTO
              </span>
              <p className="text-xs text-slate-300">{location.hours}</p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 07: DIRECT VIP CONTACT */}
      <footer className="pt-4 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-5 rounded-2xl bg-white text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'CONECTAR VIA WHATSAPP'}</span>
        </a>
      </footer>
    </div>
  );
};
