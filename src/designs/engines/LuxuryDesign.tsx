import React, { useState } from 'react';
import { BioProjectData, BioDesignConfig, DesignPalette, DesignTypography } from '../../types/designs';
import { Sparkles, MessageCircle, MapPin, Crown, Star, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

interface DesignEngineProps {
  data: BioProjectData;
  config: BioDesignConfig;
  palette: DesignPalette;
  typography: DesignTypography;
  onCtaClick?: () => void;
}

export const LuxuryDesign: React.FC<DesignEngineProps> = ({
  data,
  config,
  palette,
  typography,
  onCtaClick
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const cleanWaNumber = (data.whatsapp?.number || '').replace(/\D/g, '');
  const waMsg = encodeURIComponent(data.whatsapp?.message || 'Olá! Gostaria de consultar disponibilidade para atendimento exclusivo.');
  const waUrl = cleanWaNumber ? `https://wa.me/${cleanWaNumber}?text=${waMsg}` : '#';

  const handleWhatsAppAction = () => {
    if (onCtaClick) onCtaClick();
    if (waUrl !== '#') window.open(waUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.brandName,
        text: data.headline || data.subtitle,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  return (
    <div
      className="min-h-screen w-full relative selection:bg-amber-300 selection:text-black pb-20 overflow-x-hidden"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: typography.bodyFont
      }}
    >
      {/* Luxury Golden Veil */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[450px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: palette.primary }}
      />

      <main className="max-w-[440px] mx-auto px-5 pt-8 space-y-8 relative z-10">

        {/* Top Coronet Crest */}
        <div className="flex items-center justify-center gap-2 text-amber-300/60 pb-2">
          <div className="w-10 h-[1px]" style={{ backgroundColor: palette.border }} />
          <Crown size={15} style={{ color: palette.primary }} />
          <div className="w-10 h-[1px]" style={{ backgroundColor: palette.border }} />
        </div>

        {/* 1. HERO VARIATIONS (A, B, C, D) */}
        {config.heroVariant === 'A' && (
          // Hero A: Royal Crest with Gold Borders and Imperial Typography
          <header className="space-y-5 text-center">
            {data.logoUrl && (
              <div className="flex justify-center">
                <img src={data.logoUrl} alt={data.brandName} className="max-h-16 max-w-[200px] object-contain drop-shadow-2xl" />
              </div>
            )}

            <div className="space-y-2">
              {data.badge && (
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border"
                  style={{
                    borderColor: palette.border,
                    color: palette.primary,
                    backgroundColor: `${palette.primary}10`
                  }}
                >
                  {data.badge}
                </span>
              )}

              <h1
                className="text-2xl sm:text-3xl font-normal tracking-wide uppercase leading-tight"
                style={{ fontFamily: typography.headingFont, color: palette.text }}
              >
                {data.brandName}
              </h1>

              {data.headline && (
                <p className="text-xs tracking-widest uppercase font-medium" style={{ color: palette.primary }}>
                  {data.headline}
                </p>
              )}

              {data.subtitle && (
                <p className="text-xs leading-relaxed max-w-xs mx-auto font-light" style={{ color: palette.textMuted }}>
                  {data.subtitle}
                </p>
              )}
            </div>

            {data.professionalPhotoUrl || data.heroImageUrl ? (
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/3] border shadow-2xl p-1"
                style={{ borderColor: palette.border, backgroundColor: palette.surface }}
              >
                <img
                  src={data.professionalPhotoUrl || data.heroImageUrl}
                  alt={data.brandName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ) : null}
          </header>
        )}

        {config.heroVariant === 'B' && (
          // Hero B: Framed Studio Portrait with Soft Shadow
          <header className="space-y-5 text-center">
            {data.professionalPhotoUrl ? (
              <div className="relative flex justify-center items-end h-64">
                <div
                  className="absolute bottom-2 w-48 h-48 rounded-full blur-2xl opacity-25"
                  style={{ backgroundColor: palette.primary }}
                />
                <img
                  src={data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="max-h-64 max-w-full object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
            ) : null}

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-normal uppercase" style={{ fontFamily: typography.headingFont }}>
                {data.brandName}
              </h1>
              {data.headline && (
                <p className="text-xs uppercase tracking-widest" style={{ color: palette.primary }}>
                  {data.headline}
                </p>
              )}
            </div>
          </header>
        )}

        {(config.heroVariant === 'C' || config.heroVariant === 'D') && (
          // Hero C/D: Concierge Welcome Card
          <header
            className="p-6 rounded-3xl border space-y-4 text-center shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: palette.surface, borderColor: palette.border }}
          >
            {data.logoUrl && (
              <img src={data.logoUrl} alt={data.brandName} className="max-h-12 max-w-[170px] object-contain mx-auto" />
            )}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: palette.primary }}>
                {data.segment || 'CONCIERGE & ATENDIMENTO VIP'}
              </span>
              <h1 className="text-xl sm:text-2xl font-normal uppercase" style={{ fontFamily: typography.headingFont }}>
                {data.brandName}
              </h1>
              {data.quote ? (
                <p className="text-xs italic leading-relaxed text-slate-300 font-light pt-2">
                  "{data.quote}"
                </p>
              ) : data.subtitle ? (
                <p className="text-xs leading-relaxed text-slate-300 font-light">{data.subtitle}</p>
              ) : null}
            </div>
          </header>
        )}

        {/* About / Philosophy */}
        {data.about && (
          <section
            className="p-5 rounded-3xl border space-y-2 relative"
            style={{ backgroundColor: palette.surface, borderColor: palette.border }}
          >
            <span className="text-[10px] uppercase tracking-widest font-mono block" style={{ color: palette.primary }}>
              Filosofia & Tradição
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-light">
              {data.about}
            </p>
          </section>
        )}

        {/* 2. SERVICES / RITUALS (A, B, C) */}
        {data.items && data.items.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-normal uppercase tracking-widest" style={{ fontFamily: typography.headingFont }}>
                {data.itemsTitle || 'Rituais & Experiências'}
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                {data.items.length} Seleções
              </span>
            </div>

            {config.contentVariant === 'A' && (
              // Content A: Velvet Cards with Subtle Gold Fillet
              <div className="space-y-3.5">
                {data.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-5 rounded-2xl border hover:scale-[1.01] transition-all cursor-pointer shadow-xl space-y-2.5 group"
                    style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono tracking-widest" style={{ color: palette.primary }}>
                          {romanNumerals[idx % romanNumerals.length]}.
                        </span>
                        <h3 className="text-xs sm:text-sm font-normal text-white uppercase group-hover:text-amber-200 transition-colors" style={{ fontFamily: typography.headingFont }}>
                          {item.title}
                        </h3>
                      </div>
                      {item.priceEnabled && item.price && (
                        <span className="text-xs font-mono shrink-0 font-medium" style={{ color: palette.primary }}>
                          {item.price}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t text-[10px] font-mono tracking-wider" style={{ borderColor: palette.border, color: palette.primary }}>
                      <span>Solicitar Reserva</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(config.contentVariant === 'B' || config.contentVariant === 'C') && (
              // Content B/C: Roman Concierge List
              <div className="rounded-3xl border divide-y overflow-hidden" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
                {data.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-4 hover:bg-white/[0.02] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                    style={{ borderColor: palette.border }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono" style={{ color: palette.primary }}>
                        {romanNumerals[idx % romanNumerals.length]}.
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-normal text-white uppercase truncate" style={{ fontFamily: typography.headingFont }}>
                          {item.title}
                        </h3>
                        {item.description && <p className="text-[10px] text-slate-400 truncate font-light">{item.description}</p>}
                      </div>
                    </div>
                    {item.priceEnabled && item.price && (
                      <span className="text-xs font-mono shrink-0" style={{ color: palette.primary }}>{item.price}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. GALLERY */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-normal uppercase tracking-widest" style={{ fontFamily: typography.headingFont }}>
                Coleção & Detalhes
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                {activeGalleryIndex + 1}/{data.gallery.length}
              </span>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border p-1 shadow-2xl" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
              <img
                src={data.gallery[activeGalleryIndex].url}
                alt={data.gallery[activeGalleryIndex].caption || ''}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-x-2 bottom-2 p-3 bg-black/80 backdrop-blur-md rounded-xl flex items-center justify-between border border-white/10">
                <span className="text-xs text-white font-light truncate">
                  {data.gallery[activeGalleryIndex].caption || 'Espaço Privativo'}
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveGalleryIndex((p) => (p - 1 + data.gallery.length) % data.gallery.length)}
                    className="p-1 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveGalleryIndex((p) => (p + 1) % data.gallery.length)}
                    className="p-1 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. CTA VARIATIONS (A, B, C) */}
        {config.ctaVariant === 'A' && (
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-4 px-6 rounded-2xl font-normal text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all cursor-pointer text-black"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                fontFamily: typography.headingFont,
                boxShadow: `0 8px 30px ${palette.glow || 'rgba(229, 192, 123, 0.3)'}`
              }}
            >
              <MessageCircle size={18} />
              <span>{data.whatsapp?.label || 'Solicitar Atendimento Concierge'}</span>
            </button>
          </div>
        )}

        {config.ctaVariant === 'B' && (
          <div className="p-6 rounded-3xl border text-center space-y-3" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
            <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: palette.primary }}>
              Reserva Exclusiva
            </span>
            <h3 className="text-base font-normal uppercase" style={{ fontFamily: typography.headingFont }}>
              Atendimento Estritamente com Hora Marcada
            </h3>
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-3 rounded-xl text-black text-xs uppercase tracking-wider font-medium cursor-pointer mt-2"
              style={{ backgroundColor: palette.primary }}
            >
              {data.whatsapp?.label || 'Falar com o Concierge'}
            </button>
          </div>
        )}

        {config.ctaVariant === 'C' && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="py-3.5 rounded-2xl text-black font-medium text-xs uppercase tracking-wider cursor-pointer shadow-lg active:scale-95"
              style={{ backgroundColor: palette.primary }}
            >
              WhatsApp
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="py-3.5 rounded-2xl border bg-white/5 text-white font-medium text-xs uppercase tracking-wider cursor-pointer hover:bg-white/10"
              style={{ borderColor: palette.border }}
            >
              Compartilhar
            </button>
          </div>
        )}

        {/* 5. LOCATION & HOURS */}
        {data.location?.address && (
          <footer className="p-5 rounded-3xl border space-y-2 text-xs font-light text-slate-300" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
            <div className="flex items-center gap-2" style={{ color: palette.primary }}>
              <MapPin size={15} />
              <span className="font-mono text-[10px] uppercase tracking-widest">Endereço Privativo</span>
            </div>
            <p>{data.location.address}</p>
            {data.location.city && <p className="text-slate-400">{data.location.city}</p>}
            {data.hours && <p className="text-slate-400 pt-1 font-mono text-[11px]">{data.hours}</p>}
            {data.location.mapsUrl && (
              <a href={data.location.mapsUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 underline font-normal" style={{ color: palette.primary }}>
                Visualizar Localização no Mapa →
              </a>
            )}
          </footer>
        )}

        {data.googleReview?.enabled && (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 font-mono">
            <div className="flex text-amber-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <span>{data.googleReview.rating || 5.0} • Excelência Reconhecida</span>
          </div>
        )}
      </main>
    </div>
  );
};
