import React, { useState } from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { Shield, Clock, MapPin, Star, ChevronDown, ChevronUp, Award, Scissors, Check } from 'lucide-react';

export const ClassicClubEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const openNow = isStoreOpen(project);

  const usePhotos = project.usePhotos !== false;
  const validPhotos = usePhotos ? photos.filter((p) => p && p.url) : [];

  // Mahogany, vintage leather, aged brass & warm cream palette
  const clubBg = theme.background || '#160E0A';
  const clubSurface = theme.surface || '#221610';
  const clubText = theme.text || '#FDFBF7';
  const clubMuted = theme.textMuted || '#C9B5A3';
  const clubBorder = theme.border || '#3F281B';
  const goldAccent = theme.primary || '#D4AF37';

  const [expandedService, setExpandedService] = useState<string | null>(services[0]?.id || null);

  return (
    <div
      className="w-full space-y-12 animate-fadeIn p-4 sm:p-8 rounded-3xl"
      style={{
        backgroundColor: clubBg,
        color: clubText,
        fontFamily: "'Playfair Display', Georgia, serif"
      }}
    >
      {/* 1. GENTLEMEN'S CLUB TOP CREST / HEADER */}
      <header className="text-center space-y-4 pt-4 border-b pb-8" style={{ borderColor: clubBorder }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.3em] uppercase border" style={{ borderColor: goldAccent, color: goldAccent }}>
          <Shield size={12} />
          <span>{identity.badge || 'EST. 1988 • TRADIÇÃO & HONRA'}</span>
        </div>

        {renderFreeLogo(project, 'my-2')}

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase" style={{ color: clubText }}>
          {identity.name}
        </h1>

        <p className="text-xs sm:text-sm font-sans tracking-wide max-w-md mx-auto italic" style={{ color: clubMuted }}>
          "{identity.slogan || 'Onde o ritual do corte encontra o refinamento clássico.'}"
        </p>

        {/* Status Pill */}
        {project.statusConfig?.enabled !== false && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold" style={{ backgroundColor: clubSurface, border: `1px solid ${clubBorder}` }}>
            <span className={`w-2 h-2 rounded-full ${openNow ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span style={{ color: clubText }}>{openNow ? 'CLUBE ABERTO HOJE' : 'ATENDIMENTO EM BREVE'}</span>
          </div>
        )}
      </header>

      {/* 2. CLUB MANIFESTO & STORY */}
      {identity.about && (
        <section className="p-6 rounded-2xl border text-center space-y-4 relative overflow-hidden" style={{ backgroundColor: clubSurface, borderColor: clubBorder }}>
          <div className="w-8 h-8 mx-auto flex items-center justify-center rounded-full text-amber-900" style={{ backgroundColor: goldAccent }}>
            <Award size={18} />
          </div>
          <h3 className="text-base sm:text-lg font-bold tracking-wider uppercase text-amber-200">
            A Filosofia da Barbearia Tradicional
          </h3>
          <p className="text-xs sm:text-sm font-sans leading-relaxed max-w-xl mx-auto" style={{ color: clubMuted }}>
            {identity.about}
          </p>
        </section>
      )}

      {/* 3. HERO VINTAGE PHOTO (OPCIONAL) */}
      {usePhotos && validPhotos.length > 0 && (
        <section className="relative rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: clubBorder }}>
          <div className="w-full aspect-[16/9] relative cursor-pointer" onClick={() => onPhotoClick && onPhotoClick(validPhotos[0].url)}>
            <img
              src={validPhotos[0].url}
              alt={identity.name}
              className="w-full h-full object-cover sepia-[30%] hover:sepia-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono" style={{ color: goldAccent }}>
              <span>O AMBIENTE CLÁSSICO</span>
              <span>RITUAL COMPLETO</span>
            </div>
          </div>
        </section>
      )}

      {/* 4. RITUAIS & ACORDEOM DE SERVIÇOS */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: goldAccent }}>
            CARDÁPIO DE ATENDIMENTO
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Nossos Rituais
          </h2>
        </div>

        <div className="space-y-3">
          {services.map((svc) => {
            const isExpanded = expandedService === svc.id;

            return (
              <div
                key={svc.id}
                className="rounded-xl border transition-all overflow-hidden"
                style={{
                  backgroundColor: clubSurface,
                  borderColor: isExpanded ? goldAccent : clubBorder
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedService(isExpanded ? null : svc.id)}
                  className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0" style={{ borderColor: goldAccent, color: goldAccent }}>
                      <Scissors size={14} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-wide uppercase">{svc.name}</h4>
                      {svc.price && <span className="text-xs font-mono font-bold" style={{ color: goldAccent }}>{svc.price}</span>}
                    </div>
                  </div>
                  <div style={{ color: goldAccent }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t space-y-3 font-sans text-xs" style={{ borderColor: clubBorder, color: clubMuted }}>
                    <p className="leading-relaxed">{svc.description}</p>
                    <a
                      href={svc.ctaUrl || waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all"
                      style={{ backgroundColor: goldAccent, color: '#160E0A' }}
                    >
                      <Check size={14} />
                      <span>{svc.ctaText || 'Reservar Este Horário'}</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. VINTAGE GALLERY (OPCIONAL) */}
      {usePhotos && validPhotos.length > 1 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: clubBorder }}>
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: goldAccent }}>
              GALERIA DO ATELIÊ
            </span>
            <span className="text-xs font-mono text-stone-400">REGISTROS OFICIAIS</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {validPhotos.slice(1, 5).map((p, idx) => (
              <div
                key={p.id || idx}
                className="aspect-square rounded-xl overflow-hidden border cursor-pointer group relative"
                style={{ borderColor: clubBorder }}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
              >
                <img
                  src={p.url}
                  alt={p.alt || 'Foto do Ateliê'}
                  className="w-full h-full object-cover sepia-[20%] group-hover:sepia-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. GOOGLE REVIEWS VIP */}
      {googleReviewConfig?.enabled !== false && (
        <section className="p-5 rounded-2xl border text-center space-y-2" style={{ backgroundColor: clubSurface, borderColor: clubBorder }}>
          <div className="flex items-center justify-center gap-1" style={{ color: goldAccent }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <div className="text-xs font-mono font-bold tracking-wider" style={{ color: clubText }}>
            AVALIAÇÃO 5.0 NO GOOGLE ({googleReviewConfig?.reviewCount || 128} AVALIAÇÕES)
          </div>
          <p className="text-[11px] font-sans italic" style={{ color: clubMuted }}>
            "{googleReviewConfig?.subtitle || 'Reconhecido pela tradição, respeito aos horários e navalha impecável.'}"
          </p>
        </section>
      )}

      {/* 7. HORÁRIOS & ENDEREÇO (Uma única vez) */}
      <section className="p-6 rounded-2xl border space-y-4" style={{ backgroundColor: clubSurface, borderColor: clubBorder }}>
        {location?.hours && (
          <div className="flex items-start gap-3">
            <Clock size={16} className="shrink-0 mt-0.5" style={{ color: goldAccent }} />
            <div>
              <span className="text-xs font-mono font-bold uppercase block" style={{ color: clubText }}>
                Expediente do Clube
              </span>
              <p className="text-xs font-sans mt-0.5" style={{ color: clubMuted }}>
                {location.hours}
              </p>
            </div>
          </div>
        )}

        {location?.address && (
          <div className="flex items-start gap-3 pt-3 border-t" style={{ borderColor: clubBorder }}>
            <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: goldAccent }} />
            <div className="flex-1">
              <span className="text-xs font-mono font-bold uppercase block" style={{ color: clubText }}>
                Endereço Nobre
              </span>
              <p className="text-xs font-sans mt-0.5" style={{ color: clubMuted }}>
                {location.address}
              </p>
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold mt-2 hover:underline"
                  style={{ color: goldAccent }}
                >
                  <BrandGoogleMaps size={14} />
                  <span>Traçar Rota no Mapa</span>
                </a>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 8. NOBLE GENTLEMAN CTA */}
      <footer className="space-y-4 pt-4 border-t text-center" style={{ borderColor: clubBorder }}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-[0.99]"
          style={{ backgroundColor: goldAccent, color: '#160E0A' }}
        >
          <BrandWhatsApp size={18} />
          <span>{identity.title || 'Agendar Atendimento Privativo'}</span>
        </a>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {socials?.whatsapp?.enabled && waUrl && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border hover:border-amber-400 transition-colors" style={{ borderColor: clubBorder, color: clubText }}>
              <BrandWhatsApp size={16} />
            </a>
          )}
          {socials?.instagram?.enabled && socials.instagram.url && (
            <a href={socials.instagram.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border hover:border-amber-400 transition-colors" style={{ borderColor: clubBorder, color: clubText }}>
              <BrandInstagram size={16} />
            </a>
          )}
        </div>

        <p className="text-[10px] font-mono tracking-wider" style={{ color: clubMuted }}>
          {identity.name} • Tradição & Artesania Masculina
        </p>
      </footer>
    </div>
  );
};
