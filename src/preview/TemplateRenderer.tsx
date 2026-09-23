import React, { useState, useEffect, useMemo } from 'react';
import { ProjectData, SectionKey } from '../types';
import { AppIcon, BrandWhatsApp, BrandInstagram, BrandTikTok, BrandGoogle, BrandGoogleMaps } from '../components/BrandIcons';
import {
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  Star,
  ExternalLink,
  Share2,
  Check,
  X,
  Sparkles,
  Award,
  MessageCircle,
  ShieldCheck,
  Flame,
  ArrowRight,
  Info
} from 'lucide-react';

interface TemplateRendererProps {
  project: ProjectData;
  viewport?: 'mobile' | 'tablet' | 'desktop';
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  project,
  viewport = 'mobile'
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    identity,
    theme,
    photos = [],
    galleryStyle = 'editorial',
    services = [],
    buttons = [],
    socials,
    location,
    sectionsOrder = ['hero', 'status', 'about', 'services', 'gallery', 'reviews', 'hours', 'location', 'socials', 'cta'],
    sectionsVisibility = {},
    statusConfig,
    whatsappConfig,
    googleReviewConfig,
    shareConfig,
    fontCategory = 'MODERNA',
    socialIconStyle = 'glass'
  } = project;

  // Formatting WhatsApp URL
  const waNumber = whatsappConfig?.number || socials?.whatsapp?.number || '';
  const waMsg = whatsappConfig?.message || socials?.whatsapp?.message || 'Olá! Vim pelo biosite.';
  const cleanWaNumber = waNumber.replace(/\D/g, '');
  const waUrl = cleanWaNumber
    ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMsg)}`
    : '#';

  // Status calculation (Aberto / Fechado)
  const isCurrentlyOpen = useMemo(() => {
    if (!statusConfig?.enabled) return true;
    if (!statusConfig.autoCalculate) return statusConfig.customText?.includes('ABERTO') ?? true;

    try {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [openH, openM] = (statusConfig.openTime || '09:00').split(':').map(Number);
      const [closeH, closeM] = (statusConfig.closeTime || '19:00').split(':').map(Number);

      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;

      return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    } catch {
      return true;
    }
  }, [statusConfig]);

  // Web Share API handler
  const handleShare = async () => {
    const shareData = {
      title: identity.name || 'BioSite Oficial',
      text: identity.slogan || identity.description || 'Conheça nosso biosite oficial.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } catch (err) {
        console.error('Clipboard copy failed', err);
      }
    }
  };

  // Font Family selector based on Category
  const getHeadingFontFamily = () => {
    switch (fontCategory) {
      case 'ELEGANTE':
        return "'Playfair Display', serif";
      case 'BOLD':
        return "'Syne', sans-serif";
      case 'EDITORIAL':
        return "'Bodoni Moda', serif";
      case 'MINIMAL':
        return "'DM Sans', sans-serif";
      case 'ESPORTIVA':
        return "'Chakra Petch', sans-serif";
      case 'MODERNA':
      default:
        return "'Plus Jakarta Sans', sans-serif";
    }
  };

  // Social Icon Style Generator
  const getSocialIconStyleClasses = (style: string) => {
    switch (style) {
      case 'original':
        return 'bg-white/10 hover:bg-white/20 text-white shadow-md hover:scale-105 transition-all';
      case 'minimal':
        return 'bg-transparent border border-white/20 text-slate-300 hover:text-white hover:border-white/50 transition-all';
      case 'outline':
        return 'border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 transition-all';
      case 'glow':
        return 'bg-black/60 border border-white/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:shadow-[0_0_22px_rgba(245,158,11,0.6)] transition-all';
      case '3d':
        return 'bg-gradient-to-b from-white/15 to-white/5 border border-white/20 text-white shadow-[0_4px_0_0_rgba(0,0,0,0.6)] active:translate-y-1 active:shadow-none transition-all';
      case 'glass':
      default:
        return 'bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 hover:scale-105 transition-all';
    }
  };

  // Button Style Generator
  const getButtonStyle = (style: string) => {
    switch (style) {
      case 'solid':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all';
      case 'outline':
        return 'bg-transparent border-2 border-white/25 text-white font-bold hover:bg-white/10 active:scale-[0.98] transition-all';
      case 'glass':
        return 'bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold shadow-xl hover:bg-white/20 active:scale-[0.98] transition-all';
      case 'gradient':
        return 'bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white font-black shadow-xl hover:opacity-95 active:scale-[0.98] transition-all';
      case 'glow':
        return 'bg-amber-500 text-slate-950 font-black shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] active:scale-[0.98] transition-all';
      case '3d':
        return 'bg-amber-500 text-slate-950 font-black shadow-[0_5px_0_0_#b45309] active:translate-y-1 active:shadow-none transition-all';
      case 'minimal':
        return 'bg-transparent border border-white/15 text-slate-200 hover:border-white/40 active:scale-[0.98] transition-all';
      default:
        return 'bg-amber-500 text-slate-950 font-bold transition-all';
    }
  };

  // RENDER HERO VARIATIONS (10 Distinct Experiences)
  const renderHero = () => {
    const layout = project.templateId || '';

    // 01 — CINEMATIC LUXURY
    if (layout.includes('-01') || layout.includes('cinematic')) {
      return (
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 mb-8 border border-white/15 shadow-2xl min-h-[360px] flex flex-col justify-end text-center items-center">
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] saturate-[1.2] transform scale-105"
            style={{ backgroundImage: `url(${identity.bannerUrl || identity.avatarUrl || identity.logoUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/75 to-transparent" />
          <div
            className="absolute -top-20 inset-x-0 mx-auto w-72 h-72 rounded-full blur-[90px] opacity-50 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="relative z-10 space-y-4 max-w-lg">
            {identity.logoUrl && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 mx-auto bg-gradient-to-tr from-amber-400 via-white to-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.5)]">
                <img
                  src={identity.logoUrl}
                  alt={identity.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}

            {identity.badge && (
              <span
                className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border backdrop-blur-md"
                style={{ backgroundColor: `${theme.primary}25`, borderColor: `${theme.primary}60`, color: '#FFF' }}
              >
                {identity.badge}
              </span>
            )}

            <h1
              className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-lg"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-md mx-auto drop-shadow">
              {identity.slogan}
            </p>
          </div>
        </div>
      );
    }

    // 02 — GLASS PREMIUM
    if (layout.includes('-02') || layout.includes('glass')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-40 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
            {identity.avatarUrl && (
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/30 shadow-2xl p-0.5 bg-gradient-to-br from-white/30 to-white/5">
                  <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#07080D] shadow-[0_0_10px_#10B981]" />
              </div>
            )}
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                {identity.badge || 'ATENDIMENTO EXCLUSIVO'}
              </span>
              <h1
                className="text-2xl sm:text-4xl font-black text-white tracking-tight"
                style={{ fontFamily: getHeadingFontFamily() }}
              >
                {identity.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                {identity.slogan}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 03 — EDITORIAL
    if (layout.includes('-03') || layout.includes('editorial')) {
      return (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              EDIÇÃO OFICIAL • {new Date().getFullYear()}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
              {identity.badge || 'VERIFICADO'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-7 space-y-3">
              <h1
                className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none"
                style={{ fontFamily: getHeadingFontFamily() }}
              >
                {identity.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-serif italic leading-relaxed">
                "{identity.slogan}"
              </p>
            </div>
            {identity.bannerUrl && (
              <div className="sm:col-span-5 h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
                <img src={identity.bannerUrl} alt={identity.name} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default / Immersive / 3D / Modern Hero
    return (
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 mb-8 border border-white/10 shadow-2xl text-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35]"
          style={{ backgroundImage: `url(${identity.bannerUrl || identity.avatarUrl || identity.logoUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/80 to-black/40" />

        <div className="relative z-10 space-y-4 max-w-lg mx-auto">
          {identity.avatarUrl && (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 mx-auto bg-gradient-to-r from-amber-400 to-purple-600 shadow-xl">
              <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover rounded-full" />
            </div>
          )}

          {identity.badge && (
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/10 border border-white/20 text-white">
              {identity.badge}
            </span>
          )}

          <h1
            className="text-3xl sm:text-4xl font-black text-white tracking-tight"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {identity.slogan}
          </p>
        </div>
      </div>
    );
  };

  // Section: Status Aberto/Fechado (Requisito 24)
  const renderStatusSection = () => {
    if (sectionsVisibility.status === false || !statusConfig?.enabled) return null;

    return (
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            {isCurrentlyOpen && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                isCurrentlyOpen ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]' : 'bg-amber-500'
              }`}
            />
          </span>

          <span className="text-xs font-black tracking-wider uppercase text-white">
            {isCurrentlyOpen ? '● ABERTO AGORA' : '● FECHADO NO MOMENTO'}
          </span>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            • {statusConfig.openTime || '08:00'} às {statusConfig.closeTime || '20:00'}
          </span>
        </div>

        {/* Share Button Trigger (Requisito 23) */}
        {shareConfig?.enabled !== false && (
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer active:scale-95 border border-white/10"
          >
            {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>
        )}
      </div>
    );
  };

  // Section: Sobre Nós
  const renderAboutSection = () => {
    if (sectionsVisibility.about === false || !identity.about) return null;

    return (
      <div className="mb-8 p-6 rounded-3xl bg-[#0F121C]/80 border border-white/10 backdrop-blur-md space-y-2">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
          <Info size={14} />
          <span>Sobre Nossa Proposta</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {identity.about}
        </p>
      </div>
    );
  };

  // Section: Custom Buttons CTA
  const renderCtaButtons = () => {
    if (buttons.length === 0) return null;

    return (
      <div className="space-y-3 mb-8">
        {buttons.map((btn) => {
          const isWa = btn.iconName === 'whatsapp';
          const targetUrl = isWa ? waUrl : btn.url;

          return (
            <a
              key={btn.id}
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 px-6 rounded-2xl flex items-center justify-between group shadow-xl ${getButtonStyle(
                btn.style
              )}`}
            >
              <div className="flex items-center gap-3">
                <AppIcon name={btn.iconName} size={22} />
                <span className="text-sm font-black tracking-tight">{btn.text}</span>
              </div>
              <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          );
        })}
      </div>
    );
  };

  // Section: Google Reviews Card (Requisito 22)
  const renderGoogleReviews = () => {
    if (sectionsVisibility.reviews === false || !googleReviewConfig?.enabled) return null;

    return (
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-[#0E111B] to-[#07080D] border border-amber-500/30 shadow-xl space-y-3 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400 drop-shadow" />
              ))}
              <span className="ml-2 text-xs font-black text-white">
                5.0 ({googleReviewConfig.reviewCount || 128} avaliações)
              </span>
            </div>

            <h4 className="text-base font-black text-white tracking-tight uppercase">
              {googleReviewConfig.title || 'NOS AVALIE NO GOOGLE'}
            </h4>
            <p className="text-xs text-slate-300">
              {googleReviewConfig.subtitle || 'Sua opinião é fundamental para nossa excelência.'}
            </p>
          </div>

          <a
            href={googleReviewConfig.url || location.mapsUrl || 'https://google.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-2"
          >
            <BrandGoogle size={16} />
            <span>Avaliar Agora</span>
          </a>
        </div>
      </div>
    );
  };

  // Section: Serviços / Produtos
  const renderServicesSection = () => {
    if (sectionsVisibility.services === false || services.length === 0) return null;

    return (
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Serviços & Procedimentos
          </h3>
          <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
            {services.length} DISPONÍVEIS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {services.map((s) => (
            <div
              key={s.id}
              className={`p-4 sm:p-5 rounded-2xl bg-[#0F121C] border transition-all duration-300 hover:border-amber-400/40 shadow-lg ${
                s.featured ? 'border-amber-500/40 bg-gradient-to-r from-[#0F121C] to-amber-950/20' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  {s.imageUrl ? (
                    <img
                      src={s.imageUrl}
                      alt={s.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/15 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-amber-400">
                      <AppIcon name={s.iconName || 'sparkles'} size={20} />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-white">
                        {s.name}
                      </h4>
                      {s.featured && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[9px] font-black uppercase">
                          Destaque
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <span className="text-sm sm:text-base font-black text-amber-400 shrink-0 font-mono">
                    {s.price}
                  </span>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-600 hover:text-white text-xs font-bold text-slate-200 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <BrandWhatsApp size={14} className="text-emerald-400" />
                    <span>Agendar</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Section: Galeria de Fotos
  const renderGallerySection = () => {
    if (sectionsVisibility.gallery === false || photos.length === 0) return null;

    return (
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Galeria Visual
          </h3>
          <span className="text-[10px] font-bold text-slate-400">
            {photos.length} FOTOS REAIS
          </span>
        </div>

        {/* Gallery Style: Editorial / Masonry / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div
              key={photo.id || i}
              onClick={() => setActivePhotoModal(photo.url)}
              className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/10 cursor-pointer shadow-lg hover:border-amber-400/50 transition-all"
            >
              <img
                src={photo.url}
                alt={photo.alt || photo.caption || 'Foto'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                <span className="text-[11px] font-bold text-white line-clamp-1">
                  {photo.caption || 'Ampliar Foto'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Section: Horários & Localização
  const renderLocationHoursSection = () => {
    if (sectionsVisibility.location === false && sectionsVisibility.hours === false) return null;

    return (
      <div className="mb-8 space-y-4">
        <div className="p-6 rounded-3xl bg-[#0F121C] border border-white/10 space-y-4">
          {sectionsVisibility.hours !== false && location.hours && (
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black uppercase text-white tracking-wider">
                  Horário de Funcionamento
                </h5>
                <p className="text-xs text-slate-300 mt-0.5">
                  {location.hours}
                </p>
              </div>
            </div>
          )}

          {sectionsVisibility.location !== false && location.address && (
            <div className="flex items-start gap-3 pt-3 border-t border-white/5">
              <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="text-xs font-black uppercase text-white tracking-wider">
                  Localização Privilegiada
                </h5>
                <p className="text-xs text-slate-300 mt-0.5">
                  {location.address}
                </p>
                {location.mapsUrl && (
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>Abrir rota no Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Section: Redes Sociais com Estilos de Ícone (Requisito 20)
  const renderSocialsSection = () => {
    if (sectionsVisibility.socials === false) return null;

    const socialItems = [
      { name: 'whatsapp', url: waUrl, enabled: socials?.whatsapp?.enabled, label: 'WhatsApp', icon: BrandWhatsApp },
      { name: 'instagram', url: socials?.instagram?.url, enabled: socials?.instagram?.enabled, label: 'Instagram', icon: BrandInstagram },
      { name: 'tiktok', url: socials?.tiktok?.url, enabled: socials?.tiktok?.enabled, label: 'TikTok', icon: BrandTikTok },
      { name: 'google', url: socials?.google?.url, enabled: socials?.google?.enabled, label: 'Google', icon: BrandGoogle },
      { name: 'maps', url: location?.mapsUrl, enabled: true, label: 'Maps', icon: BrandGoogleMaps }
    ].filter((s) => s.enabled && s.url);

    if (socialItems.length === 0) return null;

    return (
      <div className="mb-8 text-center space-y-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          CONECTE-SE EM NOSSOS CANAIS
        </span>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {socialItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer ${getSocialIconStyleClasses(
                  socialIconStyle
                )}`}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  // Section: Rodapé & CTA Final
  const renderFooterCta = () => {
    if (sectionsVisibility.cta === false) return null;

    return (
      <div className="pt-6 pb-12 text-center space-y-4 border-t border-white/10">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <BrandWhatsApp size={18} />
          <span>{identity.title || 'Agendar Experiência Agora'}</span>
        </a>

        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {identity.name} • Todos os direitos reservados
          </p>
          <p className="text-[10px] text-slate-500">
            Biosite oficial criado na plataforma BIO FÁCIL
          </p>
        </div>
      </div>
    );
  };

  // Dynamic Section Ordering
  const renderSectionByKey = (key: SectionKey) => {
    switch (key) {
      case 'hero':
        return <React.Fragment key="hero">{renderHero()}</React.Fragment>;
      case 'status':
        return <React.Fragment key="status">{renderStatusSection()}</React.Fragment>;
      case 'about':
        return <React.Fragment key="about">{renderAboutSection()}</React.Fragment>;
      case 'services':
        return <React.Fragment key="services">{renderServicesSection()}</React.Fragment>;
      case 'gallery':
        return <React.Fragment key="gallery">{renderGallerySection()}</React.Fragment>;
      case 'reviews':
        return <React.Fragment key="reviews">{renderGoogleReviews()}</React.Fragment>;
      case 'hours':
      case 'location':
        return <React.Fragment key="hours_loc">{renderLocationHoursSection()}</React.Fragment>;
      case 'socials':
        return <React.Fragment key="socials">{renderSocialsSection()}</React.Fragment>;
      case 'cta':
        return <React.Fragment key="cta">{renderFooterCta()}</React.Fragment>;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-full w-full bg-[#07080D] text-slate-100 font-sans p-4 sm:p-8 relative selection:bg-amber-400 selection:text-slate-950"
      style={{
        backgroundColor: theme.background || '#07080D',
        color: theme.text || '#F8FAFC'
      }}
    >
      <div className="max-w-md mx-auto relative">
        {/* Render Sections in Configured Order */}
        {sectionsOrder.map((sectionKey) => renderSectionByKey(sectionKey))}

        {/* CTA Buttons in flow */}
        {renderCtaButtons()}
      </div>

      {/* Floating WhatsApp Button (Requisito 21) */}
      {whatsappConfig?.showFloating !== false && cleanWaNumber && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed z-40 bottom-6 ${
            whatsappConfig?.floatingPosition === 'left' ? 'left-6' : 'right-6'
          } w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.5)] active:scale-95 transition-all group`}
          title="Falar no WhatsApp"
        >
          <BrandWhatsApp size={28} className="transform group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#07080D] flex items-center justify-center text-[9px] font-black text-white">
            1
          </span>
        </a>
      )}

      {/* Full-screen Photo Lightbox Modal */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl">
            <img src={activePhotoModal} alt="Foto Ampliada" className="w-full h-full object-contain" />
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
