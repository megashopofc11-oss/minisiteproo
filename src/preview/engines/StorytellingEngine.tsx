import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export const StorytellingEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], location } = project;
  const waUrl = getWhatsAppUrl(project);

  const storyBg = theme.background || '#1C1008';
  const accent = theme.primary || '#D97706';

  return (
    <div
      className="w-full space-y-12 animate-fadeIn p-4 sm:p-8 rounded-3xl text-white relative"
      style={{ backgroundColor: storyBg }}
    >
      {/* TIMELINE GUIDE LINE */}
      <div className="hidden sm:block absolute left-8 top-24 bottom-24 w-0.5 bg-amber-500/20" />

      {/* STEP 01: PRESENTATION & PURPOSE */}
      <section className="relative sm:pl-10 space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            01
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
            APRESENTAÇÃO & PROPÓSITO
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-4 shadow-xl">
          {renderFreeLogo(project, 'pb-1', 'left')}

          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {identity.slogan}
          </p>

          {identity.about && (
            <p className="text-xs text-amber-200/80 italic border-l-2 border-amber-500 pl-3 pt-1">
              "{identity.about}"
            </p>
          )}
        </div>
      </section>

      {/* STEP 02: THE SPECIALIST / AUTHORITY */}
      {(identity.avatarUrl || photos[0]?.url) && (
        <section className="relative sm:pl-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              02
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
              MAESTRIA & AUTORIDADE
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center gap-5 shadow-xl">
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-lg cursor-pointer"
              onClick={() => onPhotoClick && onPhotoClick(identity.avatarUrl || photos[0].url)}
            >
              <img
                src={identity.avatarUrl || photos[0].url}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                ATENDIMENTO AUTORAL
              </span>
              <h3 className="text-lg font-bold text-white uppercase">
                {identity.badge || 'Tradição & Excelência'}
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cada detalhe é cuidadosamente executado para proporcionar uma experiência de acolhimento e valorização única da sua imagem.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* STEP 03: SERVICES TIMELINE */}
      {services.length > 0 && (
        <section className="relative sm:pl-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              03
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
              NOSSA JORNADA DE SERVIÇOS
            </span>
          </div>

          <div className="space-y-3">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className="p-5 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">FASE 0{idx + 1}</span>
                    <h4 className="text-sm font-bold text-white uppercase">{svc.name}</h4>
                  </div>
                  <p className="text-xs text-slate-300 font-light">{svc.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold shrink-0 self-start sm:self-auto transition-colors"
                >
                  <span>Agendar</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STEP 04: PORTFOLIO SHOWCASE */}
      {photos.length > 1 && (
        <section className="relative sm:pl-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              04
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
              GALERIA DE TRANSFORMAÇÕES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {photos.slice(0, 6).map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-md cursor-pointer group"
              >
                <img
                  src={p.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STEP 05: SEPARATE LOCATION (NO DUPLICATION) */}
      {location?.address && (
        <section className="relative sm:pl-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              05
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
              ONDE NOS ENCONTRAR
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 shadow-md">
            <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-white font-medium">{location.address}</p>
              {location.city && <p className="text-xs text-slate-400">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline pt-1"
                >
                  <BrandGoogleMaps size={12} />
                  <span>Traçar Rota no Mapa</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* STEP 06: SEPARATE HOURS (NO DUPLICATION) */}
      {location?.hours && (
        <section className="relative sm:pl-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              06
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300">
              HORÁRIOS DE ATENDIMENTO
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3 shadow-md">
            <Clock size={16} className="text-amber-400 shrink-0" />
            <p className="text-xs text-white">{location.hours}</p>
          </div>
        </section>
      )}

      {/* STEP 07: DIRECT VIP CONTACT */}
      <footer className="relative sm:pl-10 pt-4 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'INICIAR ATENDIMENTO NO WHATSAPP'}</span>
        </a>
      </footer>
    </div>
  );
};
