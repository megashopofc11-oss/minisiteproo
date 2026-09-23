import React, { useState } from 'react';
import { BioProjectData, BioDesignConfig, DesignPalette, DesignTypography } from '../../types/designs';
import { ShieldCheck, MessageCircle, MapPin, Award, CheckCircle2, ChevronLeft, ChevronRight, Share2, Star } from 'lucide-react';

interface DesignEngineProps {
  data: BioProjectData;
  config: BioDesignConfig;
  palette: DesignPalette;
  typography: DesignTypography;
  onCtaClick?: () => void;
}

export const PersonalBrandDesign: React.FC<DesignEngineProps> = ({
  data,
  config,
  palette,
  typography,
  onCtaClick
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const cleanWaNumber = (data.whatsapp?.number || '').replace(/\D/g, '');
  const waMsg = encodeURIComponent(data.whatsapp?.message || 'Olá! Gostaria de agendar uma consulta.');
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

  return (
    <div
      className="min-h-screen w-full relative selection:bg-amber-400 selection:text-slate-950 font-sans pb-16 overflow-x-hidden"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: typography.bodyFont
      }}
    >
      {/* Subtle Aura */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[400px] rounded-full blur-[130px] pointer-events-none opacity-25"
        style={{ backgroundColor: palette.primary }}
      />

      <main className="max-w-[440px] mx-auto px-4 pt-6 space-y-7 relative z-10">

        {/* 1. HERO VARIATIONS (A, B, C, D) */}
        {config.heroVariant === 'A' && (
          // Hero A: Cutout Person PNG Overlapping Studio Pedestal
          <header className="space-y-4 text-center">
            {data.logoUrl && (
              <div className="flex justify-center mb-1">
                <img src={data.logoUrl} alt={data.brandName} className="max-h-12 max-w-[160px] object-contain" />
              </div>
            )}

            {data.professionalPhotoUrl ? (
              <div className="relative flex justify-center items-end h-72">
                <div
                  className="absolute bottom-4 w-52 h-52 rounded-full blur-2xl opacity-30"
                  style={{ backgroundColor: palette.primary }}
                />
                <img
                  src={data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="max-h-72 max-w-full object-contain relative z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)]"
                />
              </div>
            ) : data.heroImageUrl ? (
              <div className="w-full h-56 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={data.heroImageUrl} alt={data.brandName} className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-center gap-1.5">
                <h1
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ fontFamily: typography.headingFont }}
                >
                  {data.brandName}
                </h1>
                <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
              </div>

              {data.badge && (
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/10"
                  style={{ backgroundColor: `${palette.primary}20`, color: palette.primary }}
                >
                  {data.badge}
                </span>
              )}

              {data.headline && (
                <p className="text-xs sm:text-sm font-semibold text-slate-300 max-w-xs mx-auto leading-snug">
                  {data.headline}
                </p>
              )}
            </div>
          </header>
        )}

        {config.heroVariant === 'B' && (
          // Hero B: Split Composition (Portrait Card on Side + Credentials)
          <header className="p-5 rounded-3xl border border-white/10 space-y-4 shadow-2xl" style={{ backgroundColor: palette.surface }}>
            <div className="flex items-center gap-4">
              {data.professionalPhotoUrl ? (
                <img
                  src={data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="w-24 h-28 rounded-2xl object-cover border border-white/15 shadow-xl shrink-0"
                />
              ) : data.logoUrl ? (
                <img src={data.logoUrl} alt={data.brandName} className="w-20 h-20 object-contain shrink-0" />
              ) : null}

              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block truncate">
                  {data.segment || 'ESPECIALISTA'}
                </span>
                <h1 className="text-lg sm:text-xl font-black text-white truncate" style={{ fontFamily: typography.headingFont }}>
                  {data.brandName}
                </h1>
                {data.badge && (
                  <p className="text-[10px] font-medium text-slate-400 line-clamp-1">{data.badge}</p>
                )}
              </div>
            </div>

            {data.headline && (
              <p className="text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                {data.headline}
              </p>
            )}
          </header>
        )}

        {config.heroVariant === 'C' && (
          // Hero C: Manifesto of Authority with Personal Quote
          <header className="space-y-4 text-center pt-2">
            {data.logoUrl && (
              <img src={data.logoUrl} alt={data.brandName} className="max-h-14 max-w-[180px] object-contain mx-auto" />
            )}
            <div className="p-6 rounded-3xl border border-white/10 space-y-3 relative overflow-hidden" style={{ backgroundColor: palette.surface }}>
              <Award size={24} className="mx-auto" style={{ color: palette.primary }} />
              <h1 className="text-xl sm:text-2xl font-black" style={{ fontFamily: typography.headingFont }}>
                {data.brandName}
              </h1>
              {data.quote ? (
                <p className="text-xs italic text-slate-300 leading-relaxed max-w-xs mx-auto">
                  "{data.quote}"
                </p>
              ) : data.headline ? (
                <p className="text-xs text-slate-300 leading-relaxed">{data.headline}</p>
              ) : null}
            </div>
          </header>
        )}

        {config.heroVariant === 'D' && (
          // Hero D: Executive Trust Profile with Trust Pillars
          <header className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 h-60 bg-black shadow-2xl">
              {data.heroImageUrl || data.professionalPhotoUrl ? (
                <img
                  src={data.heroImageUrl || data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="w-full h-full object-cover brightness-95"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  {data.badge || 'AUTORIDADE PROFISSIONAL'}
                </span>
                <h1 className="text-xl font-black text-white" style={{ fontFamily: typography.headingFont }}>
                  {data.brandName}
                </h1>
              </div>
            </div>
          </header>
        )}

        {/* About the Professional */}
        {data.about && (
          <section className="p-5 rounded-3xl border border-white/10 space-y-2.5" style={{ backgroundColor: palette.surface }}>
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-wider">
                Trajetória & Filosofia
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {data.about}
            </p>
          </section>
        )}

        {/* 2. SERVICES / SOLUTIONS (A, B, C) */}
        {data.items && data.items.length > 0 && (
          <section className="space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-white" style={{ fontFamily: typography.headingFont }}>
                {data.itemsTitle || 'Áreas de Atuação & Soluções'}
              </h2>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {data.items.length} Áreas
              </span>
            </div>

            {config.contentVariant === 'A' && (
              // Content A: Elegant Authority Cards with Subtle Gold Trim
              <div className="space-y-3">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer shadow-lg space-y-2 group"
                    style={{ backgroundColor: palette.cardBg }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        {item.tag && (
                          <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                            {item.tag}
                          </span>
                        )}
                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      {item.priceEnabled && item.price && (
                        <span className="text-xs font-bold text-emerald-400 font-mono shrink-0">
                          {item.price}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-bold text-slate-400">
                      <span>Agendar Avaliação</span>
                      <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {config.contentVariant === 'B' && (
              // Content B: Structured Solutions List
              <div className="rounded-3xl border border-white/10 divide-y divide-white/5 overflow-hidden" style={{ backgroundColor: palette.surface }}>
                {data.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-4 hover:bg-white/[0.03] transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-amber-400">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-[10px] text-slate-400 line-clamp-1">{item.description}</p>
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
              // Content C: Grid of Pillars
              <div className="grid grid-cols-2 gap-2.5">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
                    style={{ backgroundColor: palette.cardBg }}
                  >
                    <div>
                      <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 mt-2 block">
                      Consultar →
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. GALLERY (A, B, C, D) */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm sm:text-base font-black uppercase tracking-wider text-white" style={{ fontFamily: typography.headingFont }}>
                Ambiente & Casos
              </h2>
              <span className="text-[10px] font-mono text-slate-400">{data.gallery.length} Fotos</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {data.gallery.slice(0, 4).map((photo, pIdx) => (
                <div key={photo.id || pIdx} className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] relative group">
                  <img src={photo.url} alt={photo.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {photo.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[9px] text-white font-medium truncate">{photo.caption}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. CTA VARIATIONS (A, B, C) */}
        {config.ctaVariant === 'A' && (
          // CTA A: Direct WhatsApp with Professional Accent
          <div className="pt-2">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all cursor-pointer text-slate-950"
              style={{
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`,
                boxShadow: `0 8px 30px ${palette.glow || 'rgba(217, 119, 6, 0.4)'}`
              }}
            >
              <MessageCircle size={18} className="stroke-[2.5]" />
              <span>{data.whatsapp?.label || 'Agendar Consulta Particular'}</span>
            </button>
          </div>
        )}

        {config.ctaVariant === 'B' && (
          // CTA B: Confidential Evaluation Card
          <div className="p-5 rounded-3xl border border-white/10 text-center space-y-3 shadow-2xl" style={{ backgroundColor: palette.surface }}>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Atendimento com Sigilo & Atenção
            </span>
            <h3 className="text-sm sm:text-base font-black text-white" style={{ fontFamily: typography.headingFont }}>
              Agende sua Sessão Individual
            </h3>
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-3 px-4 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              style={{ backgroundColor: palette.primary }}
            >
              <MessageCircle size={16} />
              <span>{data.whatsapp?.label || 'Falar com a Recepção'}</span>
            </button>
          </div>
        )}

        {config.ctaVariant === 'C' && (
          // CTA C: Dual Channels
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

        {/* 5. LOCATION & GOOGLE */}
        {data.location?.address && (
          <footer className="p-4 rounded-3xl border border-white/10 space-y-3" style={{ backgroundColor: palette.surface }}>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl text-slate-950 shrink-0 mt-0.5" style={{ backgroundColor: palette.primary }}>
                <MapPin size={16} />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-white block">Consultório / Escritório</span>
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
                Como Chegar pelo Maps →
              </a>
            )}
          </footer>
        )}

        {data.googleReview?.enabled && (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-white">{data.googleReview.rating || 5.0}</span>
            <span>• ({data.googleReview.count || 150}+ avaliações)</span>
          </div>
        )}
      </main>
    </div>
  );
};
