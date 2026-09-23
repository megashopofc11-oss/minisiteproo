import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, Award, ShieldCheck, ChevronRight } from 'lucide-react';

export const SignatureLuxuryEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);

  const sigBg = theme.background || '#06070B';
  const sigGold = theme.primary || '#EAB308';
  const sigBorder = 'border border-amber-500/25';
  const sigSurface = 'bg-[#0E1018] shadow-2xl';

  return (
    <div
      className="w-full space-y-10 animate-fadeIn p-4 sm:p-8 rounded-3xl text-[#FFFDF5] relative"
      style={{ backgroundColor: sigBg }}
    >
      {/* 1. SIGNATURE LUXURY HERO WITH WAX SEAL */}
      <section className={`p-6 sm:p-10 rounded-3xl ${sigSurface} ${sigBorder} relative overflow-hidden text-center space-y-5`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Authentic Signature Wax Seal Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[10px] font-mono tracking-[0.2em] uppercase font-bold shadow-lg">
            <Award size={13} className="text-amber-400" />
            <span>SELO SIGNATURE • EXCLUSIVIDADE</span>
          </div>
        </div>

        {/* Free Floating PNG Logo */}
        {renderFreeLogo(project, 'pb-2', 'center')}

        <div className="space-y-2 max-w-lg mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight font-serif">
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/70 font-light leading-relaxed font-sans">
            {identity.slogan}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(234,179,8,0.3)] transition-transform hover:scale-105 active:scale-95"
          >
            <span>{identity.title || 'CONCIERGE VIP • AGENDAR'}</span>
            <ChevronRight size={14} />
          </a>
        </div>
      </section>

      {/* 2. ABOUT THE SIGNATURE ATELIER */}
      {identity.about && (
        <section className={`p-6 rounded-3xl ${sigSurface} ${sigBorder} space-y-3`}>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <ShieldCheck size={14} />
            <span>COMPROMISSO DE AUTORIDADE & SIGILO</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {identity.about}
          </p>
        </section>
      )}

      {/* 3. DIFFERENTIALS (High-end Columns) */}
      {differentials.length > 0 && (
        <section className="space-y-3">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400 block px-1">
            PILAR DE ATRIBUTOS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {differentials.map((diff) => (
              <div key={diff.id} className={`p-4 rounded-2xl ${sigSurface} ${sigBorder} space-y-1`}>
                <h4 className="text-xs font-bold text-white">{diff.title}</h4>
                <p className="text-[11px] text-slate-400 font-light">{diff.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. SIGNATURE SERVICES */}
      {services.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-serif">
              Procedimentos Autorais
            </h3>
            <span className="text-[10px] font-mono text-amber-400">{services.length} ESPECIALIDADES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div
                key={svc.id}
                className={`p-6 rounded-3xl ${sigSurface} ${sigBorder} hover:border-amber-400/60 transition-all flex flex-col justify-between space-y-4 group`}
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-amber-400 tracking-widest uppercase block">
                    ATENDIMENTO AUTORAL
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors uppercase font-serif">
                    {svc.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-300 text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{svc.ctaText || 'Consultar Concierge'}</span>
                    <ChevronRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PORTFOLIO */}
      {photos.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-base font-black uppercase tracking-tight text-white font-serif px-1">
            Acervo Visual de Resultados
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className={`overflow-hidden rounded-2xl ${sigBorder} shadow-xl cursor-pointer group relative ${idx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded text-[9px] font-mono text-amber-300 uppercase tracking-widest">
                  DOCUMENTO 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. GOOGLE 5.0 REVIEWS */}
      {googleReviewConfig?.enabled && (
        <section className={`p-6 rounded-3xl ${sigSurface} ${sigBorder} flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left`}>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400" />
              ))}
              <span className="font-bold text-white text-sm ml-1.5">5.0</span>
            </div>
            <h4 className="font-bold text-white text-sm uppercase">REPUTAÇÃO MÁXIMA GOOGLE</h4>
            <p className="text-xs text-slate-400">{googleReviewConfig.reviewCount || 150}+ avaliações de clientes verificados</p>
          </div>
          {googleReviewConfig.url && (
            <a
              href={googleReviewConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-amber-300"
            >
              Conferir no Google
            </a>
          )}
        </section>
      )}

      {/* 7. DEDICATED LOCATION (NO DUPLICATION) */}
      {location?.address && (
        <section className={`p-6 rounded-3xl ${sigSurface} ${sigBorder} space-y-2`}>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                ENDEREÇO EXCLUSIVO
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
                  <span>Navegar via Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 8. DEDICATED HOURS (NO DUPLICATION) */}
      {location?.hours && (
        <section className={`p-5 rounded-3xl ${sigSurface} ${sigBorder} flex items-center gap-3`}>
          <Clock size={16} className="text-amber-400 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
              HORÁRIO DE ATENDIMENTO
            </span>
            <p className="text-xs text-slate-200">{location.hours}</p>
          </div>
        </section>
      )}

      {/* 9. CONCIERGE VIP FOOTER */}
      <footer className="pt-4 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'SOLICITAR AGENDAMENTO COM CONCIERGE'}</span>
        </a>
      </footer>
    </div>
  );
};
