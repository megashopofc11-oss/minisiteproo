import React, { useState } from 'react';
import { BioProjectData, BioDesignConfig, DesignPalette, DesignTypography } from '../../types/designs';
import { MessageCircle, MapPin, Star, Flame, ChevronRight, Share2, Compass } from 'lucide-react';

interface DesignEngineProps {
  data: BioProjectData;
  config: BioDesignConfig;
  palette: DesignPalette;
  typography: DesignTypography;
  onCtaClick?: () => void;
}

export const GraphicBioDesign: React.FC<DesignEngineProps> = ({
  data,
  config,
  palette,
  typography,
  onCtaClick
}) => {
  const cleanWaNumber = (data.whatsapp?.number || '').replace(/\D/g, '');
  const waMsg = encodeURIComponent(data.whatsapp?.message || 'Olá! Gostaria de fazer um pedido.');
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
      className="min-h-screen w-full relative selection:bg-amber-400 selection:text-black font-sans pb-16 overflow-x-hidden"
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: typography.bodyFont
      }}
    >
      <main className="max-w-[440px] mx-auto px-4 pt-5 space-y-6 relative z-10">

        {/* 1. HERO VARIATIONS (A, B, C, D) */}
        {config.heroVariant === 'A' && (
          // Hero A: Advertising Graphic Block with Stickers & Badges
          <header className="space-y-4">
            <div
              className="p-6 rounded-3xl border-2 space-y-4 shadow-2xl relative overflow-hidden"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.primary
              }}
            >
              <div className="flex items-center justify-between">
                {data.badge ? (
                  <span
                    className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-slate-950"
                    style={{ backgroundColor: palette.primary }}
                  >
                    {data.badge}
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-amber-400 flex items-center gap-1">
                    <Flame size={12} /> DESTAQUE
                  </span>
                )}

                <button type="button" onClick={handleShare} className="p-1.5 rounded-lg bg-white/10 text-white cursor-pointer hover:bg-white/20">
                  <Share2 size={14} />
                </button>
              </div>

              {data.logoUrl && (
                <img src={data.logoUrl} alt={data.brandName} className="max-h-16 max-w-[190px] object-contain" />
              )}

              <div className="space-y-1">
                <h1
                  className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none"
                  style={{ fontFamily: typography.headingFont }}
                >
                  {data.brandName}
                </h1>
                {data.headline && (
                  <p className="text-xs font-black uppercase tracking-wider" style={{ color: palette.primary }}>
                    {data.headline}
                  </p>
                )}
                {data.subtitle && (
                  <p className="text-xs text-slate-300 leading-snug pt-1">
                    {data.subtitle}
                  </p>
                )}
              </div>
            </div>

            {data.heroImageUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/9] shadow-lg">
                <img src={data.heroImageUrl} alt={data.brandName} className="w-full h-full object-cover" />
              </div>
            )}
          </header>
        )}

        {config.heroVariant === 'B' && (
          // Hero B: Cutout Photo with Diagonal Vibrant Backing
          <header className="space-y-4 text-center">
            {data.professionalPhotoUrl ? (
              <div className="relative flex justify-center items-end h-60">
                <div
                  className="absolute inset-x-8 bottom-0 h-44 rounded-3xl -rotate-2 opacity-80"
                  style={{ backgroundColor: palette.primary }}
                />
                <img
                  src={data.professionalPhotoUrl}
                  alt={data.brandName}
                  className="max-h-60 max-w-full object-contain relative z-10 drop-shadow-2xl"
                />
              </div>
            ) : null}

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black uppercase" style={{ fontFamily: typography.headingFont }}>
                {data.brandName}
              </h1>
              {data.headline && (
                <p className="text-xs font-black uppercase" style={{ color: palette.primary }}>
                  {data.headline}
                </p>
              )}
            </div>
          </header>
        )}

        {config.heroVariant === 'C' && (
          // Hero C: "Aberto Agora" Status Banner at Top
          <header className="space-y-4">
            <div
              className="px-4 py-3 rounded-2xl flex items-center justify-between font-black text-xs uppercase tracking-wider text-slate-950"
              style={{ backgroundColor: palette.primary }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
                <span>Atendimento & Pedidos Abertos</span>
              </div>
              <span>{data.hours || 'Hoje'}</span>
            </div>

            <div className="p-5 rounded-3xl border border-white/10 space-y-2" style={{ backgroundColor: palette.surface }}>
              {data.logoUrl && <img src={data.logoUrl} alt={data.brandName} className="max-h-12 object-contain" />}
              <h1 className="text-2xl font-black uppercase text-white" style={{ fontFamily: typography.headingFont }}>
                {data.brandName}
              </h1>
              {data.subtitle && <p className="text-xs text-slate-300">{data.subtitle}</p>}
            </div>
          </header>
        )}

        {config.heroVariant === 'D' && (
          // Hero D: Modular Bento Top
          <header className="grid grid-cols-2 gap-3">
            <div className="col-span-2 p-5 rounded-3xl border border-white/10" style={{ backgroundColor: palette.surface }}>
              <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">
                {data.segment || 'CARDÁPIO & SERVIÇOS'}
              </span>
              <h1 className="text-xl font-black uppercase text-white" style={{ fontFamily: typography.headingFont }}>
                {data.brandName}
              </h1>
            </div>
            {data.heroImageUrl && (
              <div className="col-span-2 rounded-2xl overflow-hidden aspect-[16/9] border border-white/10">
                <img src={data.heroImageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </header>
        )}

        {/* About Card */}
        {data.about && (
          <section className="p-5 rounded-2xl border border-white/10 space-y-2" style={{ backgroundColor: palette.surface }}>
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: palette.primary }}>
              Nossa História
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {data.about}
            </p>
          </section>
        )}

        {/* 2. SERVICES / ITEMS (A, B, C) */}
        {data.items && data.items.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-black uppercase tracking-wider text-white" style={{ fontFamily: typography.headingFont }}>
                {data.itemsTitle || 'Destaques & Cardápio'}
              </h2>
              <span className="text-[10px] font-black uppercase text-amber-400">
                {data.items.length} Itens
              </span>
            </div>

            {config.contentVariant === 'A' && (
              // Content A: High Energy Graphic Cards with Colored Accents
              <div className="space-y-3">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-4 rounded-2xl border-2 hover:border-amber-400 transition-all cursor-pointer shadow-lg space-y-2 group"
                    style={{
                      backgroundColor: palette.cardBg,
                      borderColor: item.featured ? palette.primary : 'rgba(255,255,255,0.08)'
                    }}
                  >
                    <div className="flex gap-3 items-start">
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
                            <span className="text-xs font-black font-mono text-emerald-400 shrink-0">
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

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-black uppercase tracking-wider text-amber-400">
                      <span>Pedir / Reservar</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(config.contentVariant === 'B' || config.contentVariant === 'C') && (
              // Content B/C: Compact Grid
              <div className="grid grid-cols-2 gap-2.5">
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={handleWhatsAppAction}
                    className="p-3.5 rounded-2xl border border-white/10 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
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
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.priceEnabled && item.price && (
                      <span className="text-xs font-bold text-emerald-400 font-mono mt-2">
                        {item.price}
                      </span>
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
            <h2 className="text-sm font-black uppercase tracking-wider text-white" style={{ fontFamily: typography.headingFont }}>
              Fotos em Alta Resolução
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {data.gallery.slice(0, 4).map((photo, pIdx) => (
                <div key={photo.id || pIdx} className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] relative group">
                  <img src={photo.url} alt={photo.caption || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {photo.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                      <span className="text-[9px] text-white font-bold truncate">{photo.caption}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. CTA VARIATIONS (A, B, C) */}
        {config.ctaVariant === 'A' && (
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
              <span>{data.whatsapp?.label || 'Fazer Pedido pelo WhatsApp'}</span>
            </button>
          </div>
        )}

        {config.ctaVariant === 'B' && (
          <div className="p-5 rounded-3xl border border-white/10 text-center space-y-3" style={{ backgroundColor: palette.surface }}>
            <h3 className="text-sm font-black uppercase text-white" style={{ fontFamily: typography.headingFont }}>
              Peça Direto Sem Complicação
            </h3>
            <button
              type="button"
              onClick={handleWhatsAppAction}
              className="w-full py-3 px-4 rounded-xl text-slate-950 font-black text-xs uppercase cursor-pointer"
              style={{ backgroundColor: palette.primary }}
            >
              {data.whatsapp?.label || 'Chamar no WhatsApp'}
            </button>
          </div>
        )}

        {config.ctaVariant === 'C' && (
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
            <button
              type="button"
              onClick={handleShare}
              className="py-3.5 px-3 rounded-2xl border border-white/20 bg-white/5 text-white font-black text-xs uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10"
            >
              <Share2 size={15} />
              <span>Compartilhar</span>
            </button>
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
                <span className="font-bold text-white block">Localização</span>
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
                Abrir Rota no GPS →
              </a>
            )}
          </footer>
        )}
      </main>
    </div>
  );
};
