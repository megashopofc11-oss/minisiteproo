import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

export const MinimalLightEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);

  const lightBg = theme.background || '#FFFFFF';
  const lightText = theme.text || '#0F172A';
  const lightMuted = theme.textMuted || '#64748B';
  const lightBorder = theme.border || 'rgba(15, 23, 42, 0.08)';
  const accent = theme.primary || '#0F172A';

  return (
    <div
      className="w-full space-y-12 animate-fadeIn p-6 sm:p-10 rounded-3xl"
      style={{
        backgroundColor: lightBg,
        color: lightText,
        fontFamily: "'DM Sans', 'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* 1. MINIMAL HERO (Ample negative space, centered logo, refined text) */}
      <section className="text-center space-y-6 pt-4 pb-2 max-w-md mx-auto">
        {renderFreeLogo(project, 'pb-2', 'center')}

        <div className="space-y-2">
          {identity.badge && (
            <span className="text-[10px] tracking-[0.2em] font-mono uppercase font-bold text-slate-400 block">
              {identity.badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-slate-900 leading-tight">
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm font-light text-slate-500 leading-relaxed">
            {identity.slogan}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-medium text-white transition-all shadow-sm hover:shadow active:scale-95"
            style={{ backgroundColor: accent }}
          >
            <span>{identity.title || 'Agendar Horário'}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* 2. MINIMAL HERO IMAGE (Single pristine landscape/portrait frame) */}
      {(photos[0]?.url || identity.bannerUrl) && (
        <section
          className="rounded-2xl overflow-hidden aspect-[16/10] shadow-sm border cursor-pointer group"
          style={{ borderColor: lightBorder }}
          onClick={() => onPhotoClick && onPhotoClick(photos[0]?.url || identity.bannerUrl)}
        >
          <img
            src={photos[0]?.url || identity.bannerUrl}
            alt={identity.name}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </section>
      )}

      {/* 3. ABOUT TEXT (Quiet & refined) */}
      {identity.about && (
        <section className="py-4 border-y space-y-2 max-w-lg mx-auto text-center" style={{ borderColor: lightBorder }}>
          <p className="text-xs sm:text-sm font-light leading-relaxed text-slate-600">
            {identity.about}
          </p>
        </section>
      )}

      {/* 4. DIFFERENTIALS (Delicate horizontal pill list) */}
      {differentials.length > 0 && (
        <section className="space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block text-center">
            DIFERENCIAIS
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {differentials.map((diff) => (
              <div
                key={diff.id}
                className="px-4 py-2 rounded-full border text-xs font-light text-slate-700 bg-slate-50/50"
                style={{ borderColor: lightBorder }}
              >
                <span className="font-medium text-slate-900">{diff.title}</span> • {diff.description}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. TYPOGRAPHIC SERVICE LIST (Delicate hairlines, dots, clean aesthetic) */}
      {services.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: lightBorder }}>
            <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500">
              SERVIÇOS
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {services.length} ESPECIALIDADES
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: lightBorder }}>
            {services.map((svc) => (
              <div key={svc.id} className="py-3.5 flex items-center justify-between gap-4 group">
                <div className="space-y-0.5 max-w-sm">
                  <h4 className="text-xs sm:text-sm font-normal text-slate-900 group-hover:text-slate-600 transition-colors">
                    {svc.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-light leading-snug">
                    {svc.description}
                  </p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-900 flex items-center gap-1 font-mono shrink-0 transition-colors"
                >
                  <span>{svc.ctaText || 'Consultar'}</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. MINIMAL HORIZONTAL GALLERY */}
      {photos.length > 1 && (
        <section className="space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block">
            PORTFÓLIO
          </span>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {photos.slice(1).map((p) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className="w-44 h-32 rounded-xl overflow-hidden shrink-0 border cursor-pointer hover:opacity-90 transition-opacity"
                style={{ borderColor: lightBorder }}
              >
                <img src={p.url} alt={p.alt || ''} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. REVIEWS (Quiet rating) */}
      {googleReviewConfig?.enabled && (
        <section className="p-4 rounded-xl border text-center space-y-1 bg-slate-50/50" style={{ borderColor: lightBorder }}>
          <p className="text-xs font-normal text-slate-700">
            ★ 5.0 no Google ({googleReviewConfig.reviewCount || 147} avaliações)
          </p>
          <p className="text-[11px] text-slate-400 font-light">
            {googleReviewConfig.subtitle || 'Reconhecimento comprovado de qualidade'}
          </p>
        </section>
      )}

      {/* 8. MINIMAL LOCATION BAR (NO DUPLICATION) */}
      {location?.address && (
        <section className="py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-light text-slate-600" style={{ borderColor: lightBorder }}>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span>{location.address} {location.city ? `• ${location.city}` : ''}</span>
          </div>
          {location.mapsUrl && (
            <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-slate-400 hover:text-slate-900 underline">
              Ver no Mapa
            </a>
          )}
        </section>
      )}

      {/* 9. MINIMAL HOURS BAR (NO DUPLICATION) */}
      {location?.hours && (
        <section className="py-2 border-t flex items-center justify-between text-[11px] font-mono text-slate-400" style={{ borderColor: lightBorder }}>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>HORÁRIO:</span>
          </span>
          <span className="text-slate-600 font-sans">{location.hours}</span>
        </section>
      )}

      {/* 10. SOCIALS */}
      {socials && (
        <section className="pt-2 flex justify-center gap-5 text-xs text-slate-500 font-light">
          {socials.instagram?.enabled && socials.instagram.url && (
            <a href={socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 flex items-center gap-1">
              <BrandInstagram size={13} />
              <span>Instagram</span>
            </a>
          )}
          {socials.whatsapp?.enabled && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 flex items-center gap-1">
              <BrandWhatsApp size={13} />
              <span>WhatsApp</span>
            </a>
          )}
        </section>
      )}

      {/* 11. FOOTER */}
      <footer className="pt-6 text-center border-t space-y-3" style={{ borderColor: lightBorder }}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full py-3.5 rounded-full text-xs font-medium text-white shadow-sm transition-all"
          style={{ backgroundColor: accent }}
        >
          {identity.title || 'Entrar em Contato'}
        </a>
      </footer>
    </div>
  );
};
