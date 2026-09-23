import React, { useState } from 'react';
import { BioProjectData, BioDesignConfig, DesignPalette, DesignTypography } from '../../types/designs';
import { ArrowUpRight, MessageCircle, MapPin, Star, Share2 } from 'lucide-react';

interface DesignEngineProps {
  data: BioProjectData;
  config: BioDesignConfig;
  palette: DesignPalette;
  typography: DesignTypography;
  onCtaClick?: () => void;
}

export const EditorialDesign: React.FC<DesignEngineProps> = ({
  data,
  config,
  palette,
  typography,
  onCtaClick
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const cleanWaNumber = (data.whatsapp?.number || '').replace(/\D/g, '');
  const waMsg = encodeURIComponent(data.whatsapp?.message || 'Olá! Gostaria de atendimento exclusivo.');
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
      className="min-h-screen w-full relative selection:bg-white selection:text-black pb-20 overflow-x-hidden"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: typography.bodyFont
      }}
    >
      <main className="max-w-[440px] mx-auto px-5 pt-8 space-y-10 relative z-10">

        {/* Top Masthead / Issue Header */}
        <div className="flex items-center justify-between border-b pb-3 text-[11px] tracking-widest uppercase" style={{ borderColor: palette.border }}>
          <span className="font-mono text-slate-400">
            {data.badge || 'COLEÇÃO OFICIAL'}
          </span>
          <button type="button" onClick={handleShare} className="text-slate-400 hover:text-white cursor-pointer transition-colors">
            Compartilhar ↗
          </button>
        </div>

        {/* 1. HERO VARIATIONS (A, B, C, D) */}
        {config.heroVariant === 'A' && (
          // Hero A: Magazine Cover Layout with Bold Serif Headline & Portrait
          <header className="space-y-6 text-center">
            {data.logoUrl && (
              <div className="flex justify-center">
                <img src={data.logoUrl} alt={data.brandName} className="max-h-12 max-w-[170px] object-contain" />
              </div>
            )}

            <div className="space-y-2">
              <h1
                className="text-3xl sm:text-4xl font-normal tracking-tight leading-none"
                style={{ fontFamily: typography.headingFont }}
              >
                {data.brandName}
              </h1>
              {data.headline && (
                <p className="text-xs tracking-widest uppercase text-slate-400 mt-2 font-medium">
                  {data.headline}
                </p>
              )}
            </div>

            {data.professionalPhotoUrl || data.heroImageUrl ? (
              <div className="relative rounded-none overflow-hidden aspect-[3/4] border shadow-2xl" style={{ borderColor: palette.border }}>
                <img
                  src={data.professionalPhotoUrl || data.heroImageUrl}
                  alt={data.brandName}
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ) : null}

            {data.subtitle && (
              <p className="text-xs leading-relaxed text-slate-300 max-w-sm mx-auto font-light">
                {data.subtitle}
              </p>
            )}
          </header>
        )}

        {config.heroVariant === 'B' && (
          // Hero B: Negative Space Editorial Lead with Large Typography
          <header className="space-y-6 pt-4">
            <div className="space-y-4">
              <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400 block">
                {data.segment || 'EDITORIAL'}
              </span>
              <h1
                className="text-3xl sm:text-4xl font-normal leading-[1.15]"
                style={{ fontFamily: typography.headingFont }}
              >
                {data.headline || data.brandName}
              </h1>
              <div className="w-12 h-[1px]" style={{ backgroundColor: palette.text }} />
              {data.subtitle && (
                <p className="text-xs leading-relaxed text-slate-300 font-light max-w-xs">
                  {data.subtitle}
                </p>
              )}
            </div>
          </header>
        )}

        {config.heroVariant === 'C' && (
          // Hero C: Full Bleed Cover with Vignette
          <header className="space-y-5">
            <div className="relative aspect-[4/5] overflow-hidden border shadow-2xl" style={{ borderColor: palette.border }}>
              {data.heroImageUrl || data.professionalPhotoUrl ? (
                <img
                  src={data.heroImageUrl || data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-1">
                  {data.badge || 'EDIÇÃO LIMITADA'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-normal text-white" style={{ fontFamily: typography.headingFont }}>
                  {data.brandName}
                </h1>
              </div>
            </div>
          </header>
        )}

        {config.heroVariant === 'D' && (
          // Hero D: Diptych (Two Balanced Photos)
          <header className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden border" style={{ borderColor: palette.border }}>
                <img src={data.professionalPhotoUrl || data.heroImageUrl || ''} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[3/4] overflow-hidden border" style={{ borderColor: palette.border }}>
                <img src={data.gallery[0]?.url || data.heroImageUrl || ''} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <h1 className="text-2xl font-normal text-center" style={{ fontFamily: typography.headingFont }}>
              {data.brandName}
            </h1>
          </header>
        )}

        {/* Manifesto / About */}
        {data.about && (
          <section className="border-y py-6 space-y-2" style={{ borderColor: palette.border }}>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
              Manifesto
            </span>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-light">
              {data.about}
            </p>
          </section>
        )}

        {/* 2. SERVICES / CHAPTERS (A, B, C) */}
        {data.items && data.items.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: palette.border }}>
              <h2 className="text-sm font-normal uppercase tracking-widest" style={{ fontFamily: typography.headingFont }}>
                {data.itemsTitle || 'Criações & Serviços'}
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                Index ({data.items.length})
              </span>
            </div>

            {config.contentVariant === 'A' && (
              // Content A: Chapter List (01, 02, 03) with Hairline Dividers
              <div className="divide-y" style={{ borderColor: palette.border }}>
                {data.items.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="py-4 hover:bg-white/[0.02] transition-colors cursor-pointer group flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <span className="text-[11px] font-mono text-slate-400 block">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3
                        className="text-sm sm:text-base font-normal text-white group-hover:underline underline-offset-4 transition-all"
                        style={{ fontFamily: typography.headingFont }}
                      >
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-white transition-colors shrink-0 mt-2" />
                  </div>
                ))}
              </div>
            )}

            {(config.contentVariant === 'B' || config.contentVariant === 'C') && (
              // Content B/C: Editorial Cards with Generous Spacing
              <div className="space-y-4">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-5 border transition-all cursor-pointer space-y-2 group"
                    style={{ borderColor: palette.border, backgroundColor: palette.surface }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-normal text-white group-hover:text-slate-200" style={{ fontFamily: typography.headingFont }}>
                        {item.title}
                      </h3>
                      <ArrowUpRight size={15} className="text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. GALLERY (A, B, C, D) */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: palette.border }}>
              <h2 className="text-sm font-normal uppercase tracking-widest" style={{ fontFamily: typography.headingFont }}>
                Lookbook
              </h2>
              <span className="text-[10px] font-mono text-slate-400">
                {activePhotoIndex + 1}/{data.gallery.length}
              </span>
            </div>

            <div className="aspect-[3/4] overflow-hidden border relative" style={{ borderColor: palette.border }}>
              <img
                src={data.gallery[activePhotoIndex].url}
                alt={data.gallery[activePhotoIndex].caption || 'Foto'}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                <span className="text-xs text-white font-light">
                  {data.gallery[activePhotoIndex].caption || 'Série Fotográfica'}
                </span>
                <div className="flex gap-2 text-xs font-mono text-white">
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length)}
                    className="p-1 hover:underline cursor-pointer"
                  >
                    Ant
                  </button>
                  <span>/</span>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex((prev) => (prev + 1) % data.gallery.length)}
                    className="p-1 hover:underline cursor-pointer"
                  >
                    Próx
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
              className="w-full py-4 px-6 border text-white font-medium text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all cursor-pointer flex items-center justify-center gap-3"
              style={{ borderColor: palette.text }}
            >
              <span>{data.whatsapp?.label || 'Solicitar Atendimento Exclusivo'}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}

        {config.ctaVariant === 'B' && (
          <div className="p-6 border text-center space-y-3" style={{ borderColor: palette.border, backgroundColor: palette.surface }}>
            <h3 className="text-base font-normal" style={{ fontFamily: typography.headingFont }}>
              Atendimento com Hora Marcada
            </h3>
            <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">
              Recebemos clientes no atelier mediante agendamento prévio com a equipe.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-3 border text-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer mt-2"
              style={{ borderColor: palette.text }}
            >
              {data.whatsapp?.label || 'Conversar pelo WhatsApp'}
            </button>
          </div>
        )}

        {config.ctaVariant === 'C' && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="py-3.5 border text-xs tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              style={{ borderColor: palette.text }}
            >
              WhatsApp
            </button>
            <a
              href={data.instagram?.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="py-3.5 border border-white/20 text-xs tracking-wider uppercase text-slate-300 hover:text-white transition-all text-center flex items-center justify-center"
            >
              Instagram
            </a>
          </div>
        )}

        {/* 5. LOCATION & ATELIER INFO */}
        {data.location?.address && (
          <footer className="border-t pt-6 space-y-2 text-xs font-light text-slate-400" style={{ borderColor: palette.border }}>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 block">
              Atelier & Localização
            </span>
            <p>{data.location.address}</p>
            {data.location.city && <p>{data.location.city}</p>}
            {data.location.mapsUrl && (
              <a href={data.location.mapsUrl} target="_blank" rel="noreferrer" className="text-white underline underline-offset-4 inline-block mt-2 font-normal">
                Ver no Mapa ↗
              </a>
            )}
          </footer>
        )}
      </main>
    </div>
  );
};
