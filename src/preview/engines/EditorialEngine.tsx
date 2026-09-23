import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';

export const EditorialEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);

  // High fashion magazine palette (off-white, cream, ivory, soft stone)
  const editorialBg = theme.background || '#FAF8F5';
  const editorialText = theme.text || '#111111';
  const editorialMuted = theme.textMuted || '#57534E';
  const editorialBorder = theme.border || 'rgba(0, 0, 0, 0.12)';
  const accent = theme.primary || '#A87132';

  return (
    <div
      className="w-full space-y-12 animate-fadeIn p-4 sm:p-8 rounded-3xl"
      style={{
        backgroundColor: editorialBg,
        color: editorialText,
        fontFamily: "'Playfair Display', 'Bodoni Moda', serif"
      }}
    >
      {/* 1. EDITORIAL HEADER BAR (Top-left Logo, Edition & Category right) */}
      <header className="border-b pb-4 flex items-center justify-between gap-4" style={{ borderColor: editorialBorder }}>
        <div className="flex items-center gap-3">
          {renderFreeLogo(project, '', 'left')}
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold" style={{ color: editorialMuted }}>
            {identity.badge || 'EDITION • VOL. I'}
          </span>
        </div>
        <div className="text-right text-[10px] font-mono tracking-widest uppercase" style={{ color: editorialMuted }}>
          EST. 2024 • AUTORIDADE
        </div>
      </header>

      {/* 2. SPLIT-SCREEN EDITORIAL HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-2">
        <div className="space-y-6">
          <span
            className="text-[11px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accent }}
          >
            {identity.badge || 'ATELIER & CONCEPT'}
          </span>
          <h1
            className="text-4xl sm:text-6xl font-normal leading-[1.05] tracking-tight uppercase"
            style={{ color: editorialText }}
          >
            {identity.name}
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed font-sans font-light max-w-md"
            style={{ color: editorialMuted }}
          >
            {identity.slogan}
          </p>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-none text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md active:translate-y-0.5"
              style={{
                backgroundColor: editorialText,
                color: editorialBg
              }}
            >
              <span>{identity.title || 'SOLICITAR ATENDIMENTO'}</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Tall vertical asymmetric portrait photo */}
        <div className="relative">
          <div
            className="w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-xl relative cursor-pointer"
            onClick={() => onPhotoClick && onPhotoClick(photos[0]?.url || identity.avatarUrl || identity.bannerUrl)}
          >
            <img
              src={photos[0]?.url || identity.avatarUrl || identity.bannerUrl}
              alt={identity.name}
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 border border-black/10 pointer-events-none rounded-2xl" />
          </div>
          <div className="pt-2 flex justify-between text-[10px] font-mono tracking-wider" style={{ color: editorialMuted }}>
            <span>FIG. 01 — IDENTIDADE</span>
            <span>AUTORAL</span>
          </div>
        </div>
      </section>

      {/* 3. MANIFESTO / ABOUT */}
      {identity.about && (
        <section className="py-6 border-y" style={{ borderColor: editorialBorder }}>
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase block" style={{ color: accent }}>
              O MANIFESTO
            </span>
            <blockquote className="text-base sm:text-xl italic font-serif leading-relaxed" style={{ color: editorialText }}>
              "{identity.about}"
            </blockquote>
          </div>
        </section>
      )}

      {/* 4. DIFFERENTIALS (Editorial Horizontal List) */}
      {differentials.length > 0 && (
        <section className="space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase block" style={{ color: editorialMuted }}>
            COLUNA DE ATRIBUTOS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {differentials.map((diff, idx) => (
              <div key={diff.id} className="space-y-2 border-t pt-3" style={{ borderColor: editorialBorder }}>
                <span className="text-xs font-mono font-bold" style={{ color: accent }}>
                  0{idx + 1}.
                </span>
                <h4 className="font-serif font-bold text-sm tracking-wide" style={{ color: editorialText }}>
                  {diff.title}
                </h4>
                <p className="font-sans text-xs font-light leading-relaxed" style={{ color: editorialMuted }}>
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. SERVICES: GIANT EDITORIAL TYPOGRAPHY WORDS (NO DARK CARDS) */}
      {services.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: editorialBorder }}>
            <h3 className="text-xl sm:text-2xl font-serif uppercase tracking-wider" style={{ color: editorialText }}>
              CATÁLOGO DE ESPECIALIDADES
            </h3>
            <span className="text-xs font-mono" style={{ color: editorialMuted }}>
              [ {services.length} SERVIÇOS ]
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: editorialBorder }}>
            {services.map((svc, idx) => (
              <div key={svc.id} className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div className="space-y-1.5 max-w-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold" style={{ color: accent }}>
                      Nº {idx + 1}
                    </span>
                    <h4 className="text-xl sm:text-3xl font-serif uppercase tracking-tight group-hover:translate-x-1 transition-transform" style={{ color: editorialText }}>
                      {svc.name}
                    </h4>
                  </div>
                  <p className="font-sans text-xs font-light leading-relaxed" style={{ color: editorialMuted }}>
                    {svc.description}
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase hover:underline shrink-0"
                  style={{ color: accent }}
                >
                  <span>[ CONSULTAR ]</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. EDITORIAL MASONRY / ASYMMETRIC GALLERY */}
      {photos.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b pb-3" style={{ borderColor: editorialBorder }}>
            <h3 className="text-xl sm:text-2xl font-serif uppercase tracking-wider" style={{ color: editorialText }}>
              PORTFÓLIO VISUAL
            </h3>
            <span className="text-xs font-mono" style={{ color: editorialMuted }}>
              COLEÇÃO ATUAL
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {photos.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className={`overflow-hidden rounded-xl shadow-md cursor-pointer group relative ${idx % 3 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
              >
                <img
                  src={p.url}
                  alt={p.alt || ''}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono tracking-widest uppercase rounded">
                  ARQUIVO 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. REVIEWS (Editorial Quote Box) */}
      {googleReviewConfig?.enabled && (
        <section className="p-6 border rounded-2xl text-center space-y-2" style={{ borderColor: editorialBorder, backgroundColor: `${editorialText}05` }}>
          <div className="flex justify-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-500" />
            ))}
          </div>
          <p className="font-serif text-sm italic" style={{ color: editorialText }}>
            "{googleReviewConfig.subtitle || 'Excelência e sofisticação reconhecidas por nossos clientes mais exigentes.'}"
          </p>
          <span className="text-[10px] font-mono tracking-widest uppercase block" style={{ color: editorialMuted }}>
            5.0 ESTRELAS NO GOOGLE ({googleReviewConfig.reviewCount || 147} AVALIAÇÕES)
          </span>
        </section>
      )}

      {/* 8. MINIMALIST LOCATION LINE (NO DUPLICATION) */}
      {location?.address && (
        <section className="py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" style={{ borderColor: editorialBorder }}>
          <div className="flex items-center gap-2">
            <MapPin size={16} style={{ color: accent }} />
            <span className="font-sans text-xs tracking-wide" style={{ color: editorialText }}>
              {location.address} {location.city ? `• ${location.city}` : ''}
            </span>
          </div>
          {location.mapsUrl && (
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold tracking-widest uppercase hover:underline"
              style={{ color: accent }}
            >
              [ ABRIR MAPA ]
            </a>
          )}
        </section>
      )}

      {/* 9. MINIMALIST HOURS LINE (NO DUPLICATION) */}
      {location?.hours && (
        <section className="py-2 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: editorialBorder, color: editorialMuted }}>
          <span className="flex items-center gap-1.5">
            <Clock size={13} style={{ color: accent }} />
            <span>EXPEDIENTE:</span>
          </span>
          <span className="font-sans text-xs" style={{ color: editorialText }}>
            {location.hours}
          </span>
        </section>
      )}

      {/* 10. SOCIAL MEDIA */}
      {socials && (
        <section className="pt-4 border-t flex justify-center gap-6 text-xs font-mono uppercase tracking-widest" style={{ borderColor: editorialBorder }}>
          {socials.instagram?.enabled && socials.instagram.url && (
            <a href={socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <BrandInstagram size={14} />
              <span>Instagram</span>
            </a>
          )}
          {socials.whatsapp?.enabled && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <BrandWhatsApp size={14} />
              <span>WhatsApp</span>
            </a>
          )}
        </section>
      )}

      {/* 11. IN-FLOW EDITORIAL CTA (NO FLOATING WHATSAPP BUTTON!) */}
      <footer className="pt-8 text-center space-y-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block py-5 text-center text-xs font-mono font-bold tracking-[0.25em] uppercase shadow-lg transition-transform active:translate-y-0.5"
          style={{
            backgroundColor: editorialText,
            color: editorialBg
          }}
        >
          {identity.title || 'ENTRAR EM CONTATO VIA WHATSAPP'}
        </a>
        <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: editorialMuted }}>
          BIO FÁCIL • DESIGN EDITORIAL EXCLUSIVO
        </p>
      </footer>
    </div>
  );
};
