import React, { useState } from 'react';
import { BioProjectData, BioDesignConfig, DesignPalette, DesignTypography } from '../../types/designs';
import { Sparkles, MessageCircle, MapPin, Star, ChevronLeft, ChevronRight, Share2, Phone, Clock } from 'lucide-react';

interface DesignEngineProps {
  data: BioProjectData;
  config: BioDesignConfig;
  palette: DesignPalette;
  typography: DesignTypography;
  onCtaClick?: () => void;
}

export const CinematicDesign: React.FC<DesignEngineProps> = ({
  data,
  config,
  palette,
  typography,
  onCtaClick
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const cleanWaNumber = (data.whatsapp?.number || '').replace(/\D/g, '');
  const waMsg = encodeURIComponent(data.whatsapp?.message || 'Olá! Vim pelo biosite.');
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

  // Gallery navigation
  const nextSlide = () => {
    if (data.gallery.length === 0) return;
    setActiveGalleryIndex((prev) => (prev + 1) % data.gallery.length);
  };
  const prevSlide = () => {
    if (data.gallery.length === 0) return;
    setActiveGalleryIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
  };

  return (
    <div
      className="min-h-screen w-full relative selection:bg-amber-400 selection:text-slate-950 font-sans pb-16 overflow-x-hidden"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: typography.bodyFont
      }}
    >
      {/* Cinematic Ambient Glow & Volumetric Light */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[450px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ backgroundColor: palette.primary }}
      />

      {/* Container - Mobile First with 440px constraint */}
      <main className="max-w-[440px] mx-auto px-4 pt-6 space-y-7 relative z-10">

        {/* 1. HERO VARIATIONS (A, B, C, D) */}
        {config.heroVariant === 'A' && (
          // Hero A: Widescreen Cinematic Backdrop with Soft Fade & Center Wordmark
          <header className="space-y-5">
            {data.heroImageUrl && (
              <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={data.heroImageUrl}
                  alt={data.brandName}
                  className="w-full h-full object-cover brightness-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/40 to-transparent" />
                {data.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10"
                      style={{ backgroundColor: `${palette.primary}25`, color: palette.primary }}
                    >
                      {data.badge}
                    </span>
                  </div>
                )}
              </div>
            )}

            {data.logoUrl && (
              <div className="flex justify-center -mt-10 relative z-10">
                <img
                  src={data.logoUrl}
                  alt={data.brandName}
                  className="max-h-20 max-w-[180px] object-contain drop-shadow-2xl"
                />
              </div>
            )}

            <div className="text-center space-y-2">
              <h1
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight"
                style={{ fontFamily: typography.headingFont }}
              >
                {data.brandName}
              </h1>
              {data.headline && (
                <p className="text-sm font-bold tracking-wide uppercase" style={{ color: palette.primary }}>
                  {data.headline}
                </p>
              )}
              {data.subtitle && (
                <p className="text-xs leading-relaxed max-w-sm mx-auto" style={{ color: palette.textMuted }}>
                  {data.subtitle}
                </p>
              )}
            </div>
          </header>
        )}

        {config.heroVariant === 'B' && (
          // Hero B: Cutout Person Spotlight with Radial Backlight
          <header className="space-y-5 pt-2 text-center">
            {data.professionalPhotoUrl ? (
              <div className="relative flex justify-center items-end h-64">
                <div
                  className="absolute bottom-2 w-48 h-48 rounded-full blur-2xl opacity-40"
                  style={{ backgroundColor: palette.primary }}
                />
                <img
                  src={data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="max-h-64 max-w-full object-contain relative z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            ) : data.logoUrl ? (
              <div className="flex justify-center py-4">
                <img src={data.logoUrl} alt={data.brandName} className="max-h-24 max-w-[200px] object-contain" />
              </div>
            ) : null}

            <div className="space-y-2">
              {data.badge && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10"
                  style={{ backgroundColor: `${palette.primary}20`, color: palette.primary }}
                >
                  {data.badge}
                </span>
              )}
              <h1
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
                style={{ fontFamily: typography.headingFont }}
              >
                {data.brandName}
              </h1>
              {data.headline && (
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: palette.primary }}>
                  {data.headline}
                </p>
              )}
              {data.subtitle && (
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  {data.subtitle}
                </p>
              )}
            </div>
          </header>
        )}

        {config.heroVariant === 'C' && (
          // Hero C: Dramatic Typographic Lead with Background Vignette
          <header className="space-y-4 pt-4">
            <div className="p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl" style={{ backgroundColor: palette.surface }}>
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: palette.primary }}
              />
              {data.logoUrl && (
                <img src={data.logoUrl} alt={data.brandName} className="max-h-12 max-w-[140px] object-contain mb-4" />
              )}
              <span className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: palette.primary }}>
                {data.segment || 'APRESENTAÇÃO OFICIAL'}
              </span>
              <h1
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight text-white"
                style={{ fontFamily: typography.headingFont }}
              >
                {data.headline || data.brandName}
              </h1>
              {data.subtitle && (
                <p className="text-xs leading-relaxed mt-2" style={{ color: palette.textMuted }}>
                  {data.subtitle}
                </p>
              )}
            </div>
          </header>
        )}

        {config.heroVariant === 'D' && (
          // Hero D: Film Poster Card with Bottom Badges & Direct Action
          <header className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] bg-black shadow-2xl">
              {data.heroImageUrl || data.professionalPhotoUrl ? (
                <img
                  src={data.heroImageUrl || data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center" style={{ backgroundColor: palette.surface }}>
                  <h1 className="text-xl font-black uppercase" style={{ fontFamily: typography.headingFont }}>{data.brandName}</h1>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-5">
                {data.badge && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">
                    {data.badge}
                  </span>
                )}
                <h1 className="text-xl font-black uppercase text-white" style={{ fontFamily: typography.headingFont }}>
                  {data.brandName}
                </h1>
                {data.headline && (
                  <p className="text-xs font-semibold text-slate-300 line-clamp-1">{data.headline}</p>
                )}
              </div>
            </div>
          </header>
        )}

        {/* Status / Quick Action Strip */}
        {data.hours && (
          <div
            className="px-4 py-2.5 rounded-2xl flex items-center justify-between text-xs backdrop-blur-md border border-white/5"
            style={{ backgroundColor: palette.cardBg }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Horário de Atendimento</span>
            </div>
            <span className="text-xs font-bold" style={{ color: palette.primary }}>
              {data.hours}
            </span>
          </div>
        )}

        {/* About / Manifesto (Only if text exists) */}
        {data.about && (
          <section
            className="p-5 rounded-3xl border border-white/10 space-y-2 relative overflow-hidden"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Sobre a Proposta
              </span>
              <Sparkles size={13} style={{ color: palette.primary }} />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {data.about}
            </p>
          </section>
        )}

        {/* 2. SERVICES / ITEMS VARIATIONS (A, B, C) */}
        {data.items && data.items.length > 0 && (
          <section className="space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <h2
                className="text-sm sm:text-base font-black uppercase tracking-wider text-white"
                style={{ fontFamily: typography.headingFont }}
              >
                {data.itemsTitle || 'Serviços & Especialidades'}
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {data.items.length} Selecionados
              </span>
            </div>

            {config.contentVariant === 'A' && (
              // Content A: Widescreen Horizontal Cards with High Contrast Glow
              <div className="space-y-3">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="group p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer shadow-lg space-y-2.5 active:scale-[0.98]"
                    style={{ backgroundColor: palette.cardBg }}
                  >
                    <div className="flex gap-3.5 items-start">
                      {item.photoUrl && (
                        <img
                          src={item.photoUrl}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors truncate">
                            {item.title}
                          </h3>
                          {item.priceEnabled && item.price && (
                            <span className="text-xs font-bold shrink-0 font-mono text-emerald-400">
                              {item.price}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-bold text-slate-400">
                      <span className="uppercase tracking-wider">Agendar via WhatsApp</span>
                      <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {config.contentVariant === 'B' && (
              // Content B: Illuminated Editorial Numbered List
              <div className="rounded-3xl border border-white/10 p-2 divide-y divide-white/5" style={{ backgroundColor: palette.surface }}>
                {data.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-black font-mono text-slate-500 group-hover:text-amber-400 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-[10px] text-slate-400 truncate">{item.description}</p>
                        )}
                      </div>
                    </div>
                    {item.priceEnabled && item.price && (
                      <span className="text-xs font-bold text-emerald-400 font-mono shrink-0">
                        {item.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {config.contentVariant === 'C' && (
              // Content C: Mosaic Grid of Highlights
              <div className="grid grid-cols-2 gap-2.5">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
                    style={{ backgroundColor: palette.cardBg }}
                  >
                    <div>
                      {item.tag && (
                        <span className="text-[9px] font-black uppercase text-amber-400 block mb-1">
                          {item.tag}
                        </span>
                      )}
                      <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Ver</span>
                      <span className="text-amber-400">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. GALLERY VARIATIONS (A, B, C, D) */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2
                className="text-sm sm:text-base font-black uppercase tracking-wider text-white"
                style={{ fontFamily: typography.headingFont }}
              >
                Galeria de Momentos
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                {activeGalleryIndex + 1}/{data.gallery.length}
              </span>
            </div>

            {config.galleryVariant === 'A' && (
              // Gallery A: Silky Cinema Carousel with Controls
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] bg-black shadow-2xl group">
                <img
                  src={data.gallery[activeGalleryIndex].url}
                  alt={data.gallery[activeGalleryIndex].caption || 'Galeria'}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4">
                  <span className="text-xs text-white font-medium drop-shadow">
                    {data.gallery[activeGalleryIndex].caption || 'Experiência'}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-black"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-black"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {config.galleryVariant === 'B' && (
              // Gallery B: Poster Grid 3:4
              <div className="grid grid-cols-2 gap-2.5">
                {data.gallery.slice(0, 4).map((photo, pIdx) => (
                  <div key={photo.id || pIdx} className="rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] relative group">
                    <img src={photo.url} alt={photo.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {photo.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-[10px] text-white font-semibold truncate">{photo.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {(config.galleryVariant === 'C' || config.galleryVariant === 'D') && (
              // Gallery C/D: Horizontal Scrollable Reel
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 snap-x">
                {data.gallery.map((photo, idx) => (
                  <div key={photo.id || idx} className="w-56 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative snap-center">
                    <img src={photo.url} alt={photo.caption || ''} className="w-full h-full object-cover" />
                    {photo.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                        <span className="text-[11px] text-white font-medium truncate">{photo.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 4. CTA VARIATIONS (A, B, C) */}
        {config.ctaVariant === 'A' && (
          // CTA A: Glowing Widescreen Action Banner
          <div className="pt-2">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all cursor-pointer text-slate-950"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                boxShadow: `0 8px 30px ${palette.glow || 'rgba(245, 158, 11, 0.4)'}`
              }}
            >
              <MessageCircle size={18} className="stroke-[2.5]" />
              <span>{data.whatsapp?.label || 'Agendar Atendimento via WhatsApp'}</span>
            </button>
          </div>
        )}

        {config.ctaVariant === 'B' && (
          // CTA B: VIP Appointment Invitation Card
          <div
            className="p-5 rounded-3xl border border-white/10 text-center space-y-3 shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: palette.surface }}
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Atendimento com Hora Marcada
            </span>
            <h3 className="text-base font-black text-white uppercase" style={{ fontFamily: typography.headingFont }}>
              Garanta seu Horário com Exclusividade
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Resposta ágil e confirmação imediata pela nossa equipe.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-3.5 px-4 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              style={{ backgroundColor: palette.primary }}
            >
              <MessageCircle size={16} />
              <span>{data.whatsapp?.label || 'Conversar pelo WhatsApp'}</span>
            </button>
          </div>
        )}

        {config.ctaVariant === 'C' && (
          // CTA C: Dual Strategic Channels
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="py-3.5 px-3 rounded-2xl text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95"
              style={{ backgroundColor: palette.primary }}
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </button>
            {data.instagram?.url ? (
              <a
                href={data.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-3 rounded-2xl border border-white/20 bg-white/5 text-white font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 active:scale-95"
              >
                <span>Instagram</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handleShare}
                className="py-3.5 px-3 rounded-2xl border border-white/20 bg-white/5 text-white font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 active:scale-95"
              >
                <Share2 size={15} />
                <span>Compartilhar</span>
              </button>
            )}
          </div>
        )}

        {/* 5. CONTACT & LOCATION VARIATIONS (A, B, C) */}
        {data.location?.address && (
          <footer
            className="p-4 rounded-3xl border border-white/10 space-y-3"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-start gap-3">
              <div
                className="p-2.5 rounded-xl text-slate-950 shrink-0 mt-0.5"
                style={{ backgroundColor: palette.primary }}
              >
                <MapPin size={16} />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-white block">Endereço & Atendimento</span>
                <p className="text-slate-400">{data.location.address}</p>
                {data.location.city && <p className="text-slate-400">{data.location.city}</p>}
              </div>
            </div>

            {data.location.mapsUrl && (
              <a
                href={data.location.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-amber-400 transition-colors border border-white/5"
              >
                Abrir no Google Maps →
              </a>
            )}
          </footer>
        )}

        {/* Google Reviews Badge */}
        {data.googleReview?.enabled && (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-white">{data.googleReview.rating || 5.0}</span>
            <span>• ({data.googleReview.count || 120}+ avaliações)</span>
          </div>
        )}
      </main>
    </div>
  );
};
