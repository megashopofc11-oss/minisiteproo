import React, { useState } from 'react';
import { ProjectData } from '../types';
import { AppIcon, BrandWhatsApp, BrandInstagram, BrandTikTok, BrandGoogle, BrandGoogleMaps, BrandFacebook } from '../components/BrandIcons';
import { MapPin, Clock, Phone, ChevronRight, Star, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface TemplateRendererProps {
  project: ProjectData;
  viewport?: 'mobile' | 'tablet' | 'desktop';
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  project
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  const {
    identity,
    theme,
    photos = [],
    galleryStyle = 'masonry',
    services = [],
    buttons = [],
    socials,
    location
  } = project;

  // Formatting WhatsApp URL
  const getWhatsAppUrl = () => {
    if (!socials?.whatsapp?.number) return '#';
    const cleanNumber = socials.whatsapp.number.replace(/\D/g, '');
    const message = encodeURIComponent(socials.whatsapp.message || 'Olá! Gostaria de mais informações.');
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  // Button style class generator
  const getButtonStyle = (style: string, color: string) => {
    switch (style) {
      case 'solid':
        return 'text-slate-950 font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all';
      case 'outline':
        return 'bg-transparent border-2 font-bold hover:bg-white/10 active:scale-[0.98] transition-all';
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold shadow-md hover:bg-white/15 active:scale-[0.98] transition-all';
      case 'gradient':
        return 'text-white font-bold shadow-xl shadow-purple-500/20 hover:opacity-95 active:scale-[0.98] transition-all';
      case 'glow':
        return 'font-bold shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] text-white active:scale-[0.98] transition-all';
      case '3d':
        return 'text-white font-bold shadow-[0_5px_0_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none transition-all';
      case 'minimal':
        return 'bg-transparent border border-white/15 text-white hover:border-white/40 active:scale-[0.98] transition-all';
      default:
        return 'text-white font-semibold transition-all';
    }
  };

  // Render hero variations based on template layout
  const renderHero = () => {
    const isSplit = project.templateId?.includes('-01');
    const isEditorial = project.templateId?.includes('-02');
    const isCyber = project.templateId?.includes('-03');
    const isGlass = project.templateId?.includes('-04');
    const isBento = project.templateId?.includes('-05');

    // Bento Showcase Hero
    if (isBento) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div
            className="md:col-span-2 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[260px] border border-white/10"
            style={{
              backgroundImage: `linear-gradient(to top, ${theme.background} 15%, transparent 90%), url(${identity.bannerUrl || identity.avatarUrl || identity.logoUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10">
              {identity.badge && (
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2"
                  style={{ backgroundColor: `${theme.primary}25`, color: theme.primary, border: `1px solid ${theme.primary}50` }}
                >
                  {identity.badge}
                </span>
              )}
              <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1">
                {identity.name}
              </h1>
              <p className="text-sm opacity-90 line-clamp-2" style={{ color: theme.textMuted }}>
                {identity.slogan}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="p-4 rounded-3xl border border-white/10 flex items-center gap-3"
              style={{ backgroundColor: theme.surface }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
              >
                <Clock size={20} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider block opacity-70">Horário</span>
                <p className="text-xs font-semibold truncate text-white">{location.hours || 'Atendimento Aberto'}</p>
              </div>
            </div>

            <div
              className="p-4 rounded-3xl border border-white/10 flex-1 flex flex-col justify-between"
              style={{ backgroundColor: `${theme.primary}15`, borderColor: `${theme.primary}30` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: theme.primary }}>Atendimento VIP</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-3 py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white flex items-center justify-center gap-2 shadow-lg"
                style={{ backgroundColor: theme.primary }}
              >
                <BrandWhatsApp size={16} />
                Agendar via WhatsApp
              </a>
            </div>
          </div>
        </div>
      );
    }

    // Cinematic Split Hero
    if (isSplit) {
      return (
        <div className="relative mb-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="h-44 sm:h-52 w-full relative">
            <img
              src={identity.bannerUrl || identity.avatarUrl || identity.logoUrl}
              alt={identity.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 30%, ${theme.background} 95%)`
              }}
            />
            {identity.badge && (
              <span
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-md border"
                style={{
                  backgroundColor: `${theme.background}90`,
                  color: theme.primary,
                  borderColor: `${theme.primary}40`
                }}
              >
                {identity.badge}
              </span>
            )}
          </div>

          <div className="px-6 pb-6 pt-0 relative z-10 -mt-12 flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={identity.avatarUrl || identity.logoUrl}
                alt={identity.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 shadow-xl"
                style={{ borderColor: theme.background }}
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#090A0F] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
                {identity.name}
              </h1>
              <p className="text-sm font-medium opacity-90" style={{ color: theme.textMuted }}>
                {identity.slogan}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Luxury Editorial Hero
    if (isEditorial) {
      return (
        <div className="text-center py-6 px-4 mb-6 border-b border-white/10 relative">
          {identity.badge && (
            <span
              className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase mb-3 opacity-80"
              style={{ color: theme.primary }}
            >
              — {identity.badge} —
            </span>
          )}

          <div className="w-24 h-24 mx-auto mb-4 relative rounded-full p-1 border-2" style={{ borderColor: `${theme.primary}60` }}>
            <img
              src={identity.avatarUrl || identity.logoUrl}
              alt={identity.name}
              className="w-full h-full object-cover rounded-full shadow-2xl"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-serif">
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm max-w-md mx-auto italic font-light" style={{ color: theme.textMuted }}>
            "{identity.slogan}"
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-[10px] tracking-widest uppercase opacity-60">Exclusividade & Tradição</span>
            <span className="w-8 h-[1px] bg-white/20" />
          </div>
        </div>
      );
    }

    // Dark Cyber Hero
    if (isCyber) {
      return (
        <div
          className="p-6 rounded-3xl mb-6 relative overflow-hidden border border-white/10"
          style={{
            backgroundColor: `${theme.surface}`,
            boxShadow: `0 0 35px -10px ${theme.primary}40`
          }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: theme.primary }} />

          <div className="flex items-center gap-4 mb-4">
            <img
              src={identity.logoUrl || identity.avatarUrl}
              alt={identity.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 shadow-lg"
              style={{ borderColor: theme.primary }}
            />
            <div>
              {identity.badge && (
                <span
                  className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1"
                  style={{ backgroundColor: theme.primary, color: '#000' }}
                >
                  {identity.badge}
                </span>
              )}
              <h1 className="text-2xl font-black tracking-tight text-white">
                {identity.name}
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium mb-4" style={{ color: theme.textMuted }}>
            {identity.slogan}
          </p>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="block font-bold text-white">★ 4.9 de Avaliação</span>
              <span className="text-[10px] opacity-60">Google Reviews</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
              <span className="block font-bold text-white">Atendimento Ágil</span>
              <span className="text-[10px] opacity-60">Resposta Rápida</span>
            </div>
          </div>
        </div>
      );
    }

    // Default Clean Minimal / Glass Stacked Hero
    return (
      <div className="text-center py-6 px-4 mb-6">
        <div className="relative inline-block mb-3">
          <img
            src={identity.avatarUrl || identity.logoUrl}
            alt={identity.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto shadow-2xl border-2"
            style={{ borderColor: `${theme.primary}50` }}
          />
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap"
            style={{ backgroundColor: theme.primary }}
          >
            {identity.badge || 'Verificado'}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2 mb-1">
          {identity.name}
        </h1>

        <p className="text-xs sm:text-sm max-w-sm mx-auto font-medium" style={{ color: theme.textMuted }}>
          {identity.slogan}
        </p>
      </div>
    );
  };

  // Render photo gallery dynamically
  const renderGallery = () => {
    if (!photos || photos.length === 0) return null;

    if (galleryStyle === 'horizontal-scroll' || galleryStyle === 'carousel') {
      return (
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
          {photos.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setActivePhotoModal(item.url)}
              className="shrink-0 w-48 sm:w-60 h-64 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 snap-center"
            >
              <img
                src={item.url}
                alt={item.alt || item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-semibold text-white drop-shadow truncate">
                  {item.caption || `Foto ${idx + 1}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (galleryStyle === 'editorial') {
      const firstPhoto = photos[0];
      const otherPhotos = photos.slice(1, 5);
      return (
        <div className="space-y-3">
          {firstPhoto && (
            <div
              onClick={() => setActivePhotoModal(firstPhoto.url)}
              className="w-full h-64 sm:h-72 rounded-3xl overflow-hidden relative group cursor-pointer border border-white/10"
            >
              <img
                src={firstPhoto.url}
                alt={firstPhoto.alt || firstPhoto.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-sm font-bold text-white">
                  {firstPhoto.caption || 'Destaque Editorial'}
                </span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {otherPhotos.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => setActivePhotoModal(item.url)}
                className="h-36 sm:h-44 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10"
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-medium text-white truncate">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default Masonry / Grid Cards
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => setActivePhotoModal(item.url)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 h-40 sm:h-48"
          >
            <img
              src={item.url}
              alt={item.alt || item.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-xs text-white font-medium truncate">
                {item.caption || `Registro 0${idx + 1}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="w-full min-h-full transition-colors duration-200"
      style={{
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      <div className="max-w-xl mx-auto px-4 py-8 sm:px-6">
        {/* Hero Section */}
        {renderHero()}

        {/* Custom Primary Action Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="space-y-3 mb-8">
            {buttons.map((btn) => {
              const isWa = btn.iconName === 'whatsapp';
              const targetUrl = isWa ? getWhatsAppUrl() : btn.url || '#';
              const btnClass = getButtonStyle(btn.style, btn.color);

              return (
                <a
                  key={btn.id}
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm ${btnClass}`}
                  style={{
                    backgroundColor:
                      btn.style === 'solid'
                        ? btn.color || theme.primary
                        : btn.style === 'gradient'
                        ? undefined
                        : undefined,
                    backgroundImage:
                      btn.style === 'gradient'
                        ? `linear-gradient(135deg, ${btn.color || theme.primary} 0%, ${theme.secondary} 100%)`
                        : undefined,
                    borderColor:
                      btn.style === 'outline'
                        ? btn.color || theme.primary
                        : undefined,
                    color: btn.style === 'solid' ? '#000000' : '#FFFFFF'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <AppIcon name={btn.iconName || 'link'} size={20} />
                    <span className="font-bold tracking-wide">{btn.text}</span>
                  </div>
                  <ChevronRight size={18} className="opacity-70" />
                </a>
              );
            })}
          </div>
        )}

        {/* Services / Products Section */}
        {services && services.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                  Serviços & Experiências
                </h2>
                <p className="text-xs opacity-60">Escolha seu atendimento exclusivo</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white">
                {services.length} opções
              </span>
            </div>

            <div className="space-y-3">
              {services.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border transition-all duration-200 hover:border-white/20"
                  style={{
                    backgroundColor: theme.surface,
                    borderColor: item.featured ? `${theme.primary}60` : 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div className="flex gap-4">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                      />
                    ) : (
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary }}
                      >
                        <AppIcon name={item.iconName || 'sparkles'} size={24} />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white truncate">
                          {item.name}
                        </h3>
                        <span
                          className="text-xs font-extrabold px-2 py-0.5 rounded-lg shrink-0"
                          style={{ backgroundColor: `${theme.primary}25`, color: theme.primary }}
                        >
                          {item.price}
                        </span>
                      </div>

                      <p className="text-xs line-clamp-2 mb-3" style={{ color: theme.textMuted }}>
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {item.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                            <Star size={12} fill="currentColor" /> Mais Solicitado
                          </span>
                        )}
                        <a
                          href={getWhatsAppUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: theme.primary }}
                        >
                          <BrandWhatsApp size={14} />
                          {item.ctaText || 'Agendar'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Gallery Section */}
        {photos && photos.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ImageIcon size={16} style={{ color: theme.primary }} />
                  Galeria de Trabalhos
                </h2>
                <p className="text-xs opacity-60">Resultados e transformações reais</p>
              </div>
              <span className="text-xs opacity-70 capitalize font-medium">
                {photos.length} fotos
              </span>
            </div>

            {renderGallery()}
          </div>
        )}

        {/* Location & Schedule Card */}
        {location && (
          <div
            className="p-5 rounded-3xl border border-white/10 mb-8"
            style={{ backgroundColor: theme.surface }}
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <MapPin size={16} style={{ color: theme.primary }} />
              Localização & Atendimento
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5" style={{ color: theme.textMuted }}>
                <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: theme.primary }} />
                <span>{location.address}, {location.city}</span>
              </div>

              {location.hours && (
                <div className="flex items-start gap-2.5" style={{ color: theme.textMuted }}>
                  <Clock size={15} className="shrink-0 mt-0.5" style={{ color: theme.primary }} />
                  <span>{location.hours}</span>
                </div>
              )}

              {location.phone && (
                <div className="flex items-start gap-2.5" style={{ color: theme.textMuted }}>
                  <Phone size={15} className="shrink-0 mt-0.5" style={{ color: theme.primary }} />
                  <span>{location.phone}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-bold text-center text-white flex items-center justify-center gap-2 border border-white/15 hover:bg-white/5 transition-colors"
                >
                  <BrandGoogleMaps size={16} />
                  Como Chegar
                </a>
              )}

              {socials?.googleReview?.enabled && socials.googleReview.url && (
                <a
                  href={socials.googleReview.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] py-2 px-3 rounded-xl text-xs font-bold text-center text-amber-300 flex items-center justify-center gap-2 border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 transition-colors"
                >
                  <Star size={14} fill="currentColor" />
                  Avalie no Google
                </a>
              )}
            </div>
          </div>
        )}

        {/* Social Media Links Bar */}
        {socials && (
          <div className="mb-8 text-center">
            <span className="text-[11px] uppercase tracking-wider font-bold block mb-3 opacity-60">
              Conecte-se conosco
            </span>

            <div className="flex items-center justify-center gap-3">
              {socials.whatsapp?.enabled && (
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-emerald-400 flex items-center justify-center transition-all hover:scale-110"
                  title="WhatsApp"
                >
                  <BrandWhatsApp size={20} />
                </a>
              )}

              {socials.instagram?.enabled && socials.instagram.url && (
                <a
                  href={socials.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/40 text-pink-400 flex items-center justify-center transition-all hover:scale-110"
                  title="Instagram"
                >
                  <BrandInstagram size={20} />
                </a>
              )}

              {socials.tiktok?.enabled && socials.tiktok.url && (
                <a
                  href={socials.tiktok.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-cyan-400 flex items-center justify-center transition-all hover:scale-110"
                  title="TikTok"
                >
                  <BrandTikTok size={20} />
                </a>
              )}

              {socials.google?.enabled && socials.google.url && (
                <a
                  href={socials.google.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-blue-400 flex items-center justify-center transition-all hover:scale-110"
                  title="Google"
                >
                  <BrandGoogle size={20} />
                </a>
              )}

              {socials.facebook?.enabled && socials.facebook.url && (
                <a
                  href={socials.facebook.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-indigo-400 flex items-center justify-center transition-all hover:scale-110"
                  title="Facebook"
                >
                  <BrandFacebook size={20} />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs font-semibold text-white mb-1">
            {identity.name}
          </p>
          <p className="text-[11px] opacity-60">
            Todos os direitos reservados © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={activePhotoModal}
              alt="Ampliada"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
