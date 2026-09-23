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
  Info,
  CheckCircle2,
  Layers,
  ChevronDown
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
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const {
    identity,
    theme,
    photos = [],
    galleryStyle = 'editorial',
    services = [],
    buttons = [],
    socials,
    location,
    sectionsOrder = ['hero', 'status', 'about', 'differentials', 'services', 'gallery', 'reviews', 'hours', 'location', 'socials', 'cta'],
    sectionsVisibility = {},
    statusConfig,
    whatsappConfig,
    googleReviewConfig,
    shareConfig,
    fontCategory = 'MODERNA',
    socialIconStyle = 'glass',
    serviceLayout = 'cards',
    differentials = []
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
      const [closeH, closeM] = (statusConfig.closeTime || '20:00').split(':').map(Number);

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
        // User cancelled share
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

  // Extract layout key
  const layout = project.templateId || '';
  const isLayout = (key: string) => layout.includes(key);

  // 1. RENDER HERO ACCORDING TO THE 10 EXPERIENCES
  const renderHero = () => {
    // 01 — CINEMATIC HERO
    if (isLayout('-01') || isLayout('cinematic')) {
      return (
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 mb-8 border border-white/15 shadow-2xl min-h-[380px] flex flex-col justify-end text-center items-center">
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.32] saturate-[1.2] transform scale-105"
            style={{ backgroundImage: `url(${identity.bannerUrl || identity.avatarUrl || identity.logoUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/70 to-transparent" />
          <div
            className="absolute -top-16 inset-x-0 mx-auto w-72 h-72 rounded-full blur-[100px] opacity-45 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="relative z-10 space-y-4 max-w-lg">
            {identity.logoUrl && (
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 mx-auto bg-gradient-to-tr from-amber-400 via-white to-amber-600 shadow-[0_0_35px_rgba(217,119,6,0.55)]"
              >
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

    // 02 — EDITORIAL
    if (isLayout('-02') || isLayout('editorial')) {
      return (
        <div className="space-y-6 mb-8 pt-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {identity.badge || 'APRESENTAÇÃO OFICIAL'}
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: theme.primary }}>
              ED. 2026
            </span>
          </div>

          <div className="space-y-3">
            <h1
              className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md">
              {identity.slogan}
            </p>
          </div>

          {identity.bannerUrl && (
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl">
              <img
                src={identity.bannerUrl}
                alt={identity.name}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent" />
            </div>
          )}
        </div>
      );
    }

    // 03 — GLASS EXPERIENCE
    if (isLayout('-03') || isLayout('glass')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] opacity-40 pointer-events-none"
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

    // 04 — IMMERSIVE PHOTO
    if (isLayout('-04') || isLayout('immersive')) {
      return (
        <div className="relative rounded-3xl overflow-hidden mb-8 min-h-[460px] flex flex-col justify-between p-6 sm:p-8 border border-white/10 shadow-2xl">
          <img
            src={identity.bannerUrl || photos[0]?.url || identity.avatarUrl}
            alt={identity.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#07080D]" />

          <div className="relative z-10 flex justify-between items-center">
            {identity.logoUrl && (
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 backdrop-blur-md p-1 bg-black/40">
                <img src={identity.logoUrl} alt={identity.name} className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
            {identity.badge && (
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase text-white">
                {identity.badge}
              </span>
            )}
          </div>

          <div className="relative z-10 space-y-3 pt-12">
            <h1
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-md">
              {identity.slogan}
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs text-slate-950 shadow-xl transition-transform active:scale-95"
                style={{ backgroundColor: theme.primary }}
              >
                <BrandWhatsApp size={16} />
                <span>{whatsappConfig?.label || 'Chamar no WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    // 05 — MINIMAL LUXURY
    if (isLayout('-05') || isLayout('minimal')) {
      return (
        <div className="mb-8 py-6 text-center space-y-4 border-b border-white/10 pb-8">
          {identity.logoUrl && (
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border border-white/15 p-0.5">
              <img src={identity.logoUrl} alt={identity.name} className="w-full h-full object-cover rounded-full" />
            </div>
          )}
          <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono block">
            {identity.badge || 'ESTABELECIMENTO EXCLUSIVO'}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-normal tracking-tight text-white"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            {identity.name}
          </h1>
          <p className="text-xs text-slate-400 font-light max-w-sm mx-auto leading-relaxed">
            {identity.slogan}
          </p>
        </div>
      );
    }

    // 06 — ORBITAL DYNAMIC
    if (isLayout('-06') || isLayout('orbital')) {
      return (
        <div className="relative rounded-3xl p-8 mb-8 text-center bg-gradient-to-b from-[#101424] to-[#07080D] border border-white/10 shadow-2xl overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-30 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="relative z-10 space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <div
                className="absolute inset-0 rounded-full border border-dashed border-amber-400/40 animate-spin"
                style={{ animationDuration: '25s' }}
              />
              <div className="w-24 h-24 rounded-full p-1 m-2 bg-[#07080D] border border-white/20 shadow-2xl overflow-hidden">
                <img src={identity.logoUrl || identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>

            <div className="space-y-1">
              <h1
                className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase"
                style={{ fontFamily: getHeadingFontFamily() }}
              >
                {identity.name}
              </h1>
              <p className="text-xs text-slate-300 font-medium max-w-xs mx-auto">
                {identity.slogan}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 07 — STORY EXPERIENCE
    if (isLayout('-07') || isLayout('story')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-[#0D101C] border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
              01 • APRESENTAÇÃO
            </span>
          </div>

          <div className="space-y-2">
            <h1
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {identity.slogan}
            </p>
          </div>

          {identity.bannerUrl && (
            <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-lg">
              <img src={identity.bannerUrl} alt={identity.name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      );
    }

    // 08 — PREMIUM BENTO CARDS
    if (isLayout('-08') || isLayout('cards')) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="sm:col-span-2 p-6 rounded-3xl bg-[#0F1322] border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span
                className="inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider"
                style={{ backgroundColor: `${theme.primary}25`, color: theme.primary }}
              >
                {identity.badge || 'DESTAQUE'}
              </span>
              <h1
                className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                style={{ fontFamily: getHeadingFontFamily() }}
              >
                {identity.name}
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                {identity.slogan}
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black text-white hover:text-amber-400 transition-colors"
            >
              <span>{whatsappConfig?.label || 'Chamar no WhatsApp'}</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="p-4 rounded-3xl bg-[#0F1322] border border-white/10 shadow-xl flex items-center justify-center overflow-hidden aspect-square sm:aspect-auto">
            <img
              src={identity.logoUrl || identity.avatarUrl}
              alt={identity.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      );
    }

    // 09 — NEON ENERGY
    if (isLayout('-09') || isLayout('neon')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-[#030407] border shadow-2xl overflow-hidden" style={{ borderColor: `${theme.primary}60` }}>
          <div
            className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[100px] opacity-50 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="relative z-10 space-y-4 text-center">
            {identity.badge && (
              <span
                className="inline-block px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border"
                style={{ borderColor: theme.primary, color: theme.primary, backgroundColor: `${theme.primary}15` }}
              >
                {identity.badge}
              </span>
            )}

            <h1
              className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-medium">
              {identity.slogan}
            </p>
          </div>
        </div>
      );
    }

    // 10 — SIGNATURE EXCLUSIVE (DEFAULT HIGH-END)
    return (
      <div className="relative rounded-3xl p-6 sm:p-10 mb-8 bg-gradient-to-b from-[#131625] via-[#0B0D17] to-[#07080D] border border-amber-500/30 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">
              SELO DE AUTENTICIDADE
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono uppercase">VIP CONCIERGE</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {identity.logoUrl && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-amber-400 via-white to-amber-600 shadow-[0_0_25px_rgba(217,119,6,0.4)] shrink-0">
              <img src={identity.logoUrl} alt={identity.name} className="w-full h-full object-cover rounded-xl" />
            </div>
          )}
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
              {identity.badge || 'PADRÃO SIGNATURE'}
            </span>
            <h1
              className="text-3xl sm:text-5xl font-black text-white tracking-tight"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {identity.slogan}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 2. STATUS CARD (Aberto / Fechado)
  const renderStatusSection = () => {
    if (sectionsVisibility.status === false || !statusConfig?.enabled) return null;

    return (
      <div className="mb-6 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              isCurrentlyOpen
                ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]'
                : 'bg-amber-400 shadow-[0_0_10px_#F59E0B]'
            }`}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-white">
              {isCurrentlyOpen ? 'ABERTO AGORA' : 'FECHADO NO MOMENTO'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              • {statusConfig.openTime || '09:00'} às {statusConfig.closeTime || '20:00'}
            </span>
          </div>
        </div>

        {shareConfig?.enabled && (
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold border border-white/10 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400">Copiado</span>
              </>
            ) : (
              <>
                <Share2 size={13} />
                <span>{shareConfig.label || 'Compartilhar'}</span>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  // 3. ABOUT SECTION
  const renderAboutSection = () => {
    if (sectionsVisibility.about === false || !identity.about) return null;

    return (
      <div className="mb-8 p-6 rounded-3xl bg-[#0E111C] border border-white/10 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
          <Info size={14} />
          <span>Sobre Nossa Proposta</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
          {identity.about}
        </p>
      </div>
    );
  };

  // 4. DIFFERENTIALS SECTION
  const renderDifferentialsSection = () => {
    if (sectionsVisibility.differentials === false || differentials.length === 0) return null;

    return (
      <div className="mb-8 space-y-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block px-1">
          NOSSOS DIFERENCIAIS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {differentials.map((diff) => (
            <div
              key={diff.id}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 backdrop-blur-sm"
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <AppIcon name={diff.iconName || 'sparkles'} size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">{diff.title}</h4>
                <p className="text-[11px] text-slate-400 leading-snug">{diff.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 5. SERVICES & SPECIALTIES (DIVERSIFIED FORMATS, NO FORCED PRICES)
  const renderServicesSection = () => {
    if (sectionsVisibility.services === false || services.length === 0) return null;

    // A. MINIMAL-LIST (Editorial & Minimal style)
    if (serviceLayout === 'minimal-list') {
      return (
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <h3
              className="text-base sm:text-lg font-normal tracking-tight text-white uppercase"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              Especialidades & Atendimento
            </h3>
            <span className="text-[10px] font-mono text-slate-400">{services.length} ITENS</span>
          </div>

          <div className="divide-y divide-white/10">
            {services.map((s) => (
              <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">{s.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 self-start sm:self-center"
                >
                  <span>{s.ctaText || 'Quero Saber Mais'}</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // B. ICONS-GRID (Orbital & Tech style)
    if (serviceLayout === 'icons-grid') {
      return (
        <div className="mb-8 space-y-4">
          <h3
            className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Serviços & Atuação
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-[#0D101C] border border-white/10 hover:border-amber-400/40 transition-all flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 shrink-0">
                  <AppIcon name={s.iconName || 'sparkles'} size={20} />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{s.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.description}</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-bold text-amber-400 hover:underline pt-1"
                  >
                    {s.ctaText || 'Consultar'} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // C. ACCORDION (Story & Procedure style)
    if (serviceLayout === 'accordion') {
      return (
        <div className="mb-8 space-y-4">
          <h3
            className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Nossas Especialidades
          </h3>
          <div className="space-y-2">
            {services.map((s) => {
              const isOpen = openAccordionId === s.id;
              return (
                <div
                  key={s.id}
                  className="rounded-2xl bg-[#0E111C] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordionId(isOpen ? null : s.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-white">{s.name}</span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 space-y-3 border-t border-white/5">
                      <p className="text-xs text-slate-300 leading-relaxed">{s.description}</p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/20"
                      >
                        <BrandWhatsApp size={14} />
                        <span>{s.ctaText || 'Quero Saber Mais'}</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // D. PHOTO-CARDS (Immersive style)
    if (serviceLayout === 'photo-cards') {
      return (
        <div className="mb-8 space-y-4">
          <h3
            className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Destaques da Coleção
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 group shadow-xl flex flex-col justify-end p-5"
              >
                {s.imageUrl && (
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="relative z-10 space-y-1">
                  <h4 className="font-black text-sm text-white">{s.name}</h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{s.description}</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-black text-amber-400 hover:text-amber-300 pt-1"
                  >
                    <span>{s.ctaText || 'Quero Saber Mais'}</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // E. DEFAULT: CARDS MODULARES DE LUXO
    return (
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Serviços & Especialidades
          </h3>
          <span className="text-[10px] font-mono text-slate-400">{services.length} DISPONÍVEIS</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {services.map((s) => (
            <div
              key={s.id}
              className={`p-4 sm:p-5 rounded-2xl bg-[#0E111C] border transition-all duration-300 hover:border-amber-400/40 shadow-lg ${
                s.featured ? 'border-amber-500/40 bg-gradient-to-r from-[#0E111C] to-amber-950/20' : 'border-white/10'
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

                <div className="flex items-center justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition-colors border border-white/10"
                  >
                    <BrandWhatsApp size={14} className="text-emerald-400" />
                    <span>{s.ctaText || 'Quero Saber Mais'}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 6. GALLERY
  const renderGallerySection = () => {
    if (sectionsVisibility.gallery === false || photos.length === 0) return null;

    return (
      <div className="mb-8 space-y-4">
        <h3
          className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
          style={{ fontFamily: getHeadingFontFamily() }}
        >
          Galeria Visual
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {photos.map((photo, pIdx) => (
            <div
              key={photo.id || pIdx}
              onClick={() => setActivePhotoModal(photo.url)}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-md"
            >
              <img
                src={photo.url}
                alt={photo.alt || `Galeria ${pIdx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 7. GOOGLE REVIEWS
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
                5.0 ({googleReviewConfig.reviewCount || 147} avaliações)
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-white tracking-tight uppercase">
              {googleReviewConfig.title || 'AVALIAÇÕES NO GOOGLE'}
            </h4>
            <p className="text-xs text-slate-300">
              {googleReviewConfig.subtitle || 'Excelência reconhecida por nossos clientes.'}
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

  // 8. HOURS & LOCATION
  const renderHoursAndLocation = () => {
    const showHours = sectionsVisibility.hours !== false && location.hours;
    const showLoc = sectionsVisibility.location !== false && location.address;
    if (!showHours && !showLoc) return null;

    return (
      <div className="mb-8 p-6 rounded-3xl bg-[#0E111C] border border-white/10 shadow-xl space-y-4">
        {showHours && (
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400 shrink-0">
              <Clock size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
                HORÁRIO DE FUNCIONAMENTO
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {location.hours}
              </p>
            </div>
          </div>
        )}

        {showLoc && (
          <div className="flex items-start gap-3 pt-3 border-t border-white/5">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-amber-400 shrink-0">
              <MapPin size={16} />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">
                LOCALIZAÇÃO
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {location.address}
              </p>
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline mt-1.5"
                >
                  <BrandGoogleMaps size={14} />
                  <span>Abrir no Google Maps</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 9. SOCIALS
  const renderSocialsSection = () => {
    if (sectionsVisibility.socials === false) return null;

    return (
      <div className="mb-8 text-center space-y-3">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
          CONECTE-SE EM NOSSOS CANAIS
        </span>
        <div className="flex items-center justify-center gap-3">
          {socials?.whatsapp?.enabled && waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer ${getSocialIconStyleClasses(
                socialIconStyle
              )}`}
              title="WhatsApp"
            >
              <BrandWhatsApp size={22} className="text-emerald-400" />
            </a>
          )}

          {socials?.instagram?.enabled && socials.instagram.url && (
            <a
              href={socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer ${getSocialIconStyleClasses(
                socialIconStyle
              )}`}
              title="Instagram"
            >
              <BrandInstagram size={22} className="text-pink-400" />
            </a>
          )}

          {socials?.tiktok?.enabled && socials.tiktok.url && (
            <a
              href={socials.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer ${getSocialIconStyleClasses(
                socialIconStyle
              )}`}
              title="TikTok"
            >
              <BrandTikTok size={20} className="text-cyan-400" />
            </a>
          )}

          {socials?.google?.enabled && socials.google.url && (
            <a
              href={socials.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer ${getSocialIconStyleClasses(
                socialIconStyle
              )}`}
              title="Google"
            >
              <BrandGoogle size={20} className="text-blue-400" />
            </a>
          )}

          {location?.mapsUrl && (
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer ${getSocialIconStyleClasses(
                socialIconStyle
              )}`}
              title="Google Maps"
            >
              <BrandGoogleMaps size={20} className="text-rose-400" />
            </a>
          )}
        </div>
      </div>
    );
  };

  // 10. CTA FOOTER
  const renderCtaFooter = () => {
    if (sectionsVisibility.cta === false) return null;

    return (
      <footer className="pt-4 pb-12 text-center space-y-4">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 rounded-2xl font-black text-sm text-slate-950 flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-[0.98]"
          style={{ backgroundColor: theme.primary }}
        >
          <BrandWhatsApp size={18} />
          <span>{identity.title || whatsappConfig?.label || 'Chamar no WhatsApp'}</span>
        </a>

        <div className="space-y-1 pt-2">
          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
            {identity.name} • Todos os direitos reservados
          </p>
        </div>
      </footer>
    );
  };

  // Section dispatcher based on order
  const renderSectionByKey = (key: SectionKey) => {
    switch (key) {
      case 'hero':
        return <React.Fragment key="hero">{renderHero()}</React.Fragment>;
      case 'status':
        return <React.Fragment key="status">{renderStatusSection()}</React.Fragment>;
      case 'about':
        return <React.Fragment key="about">{renderAboutSection()}</React.Fragment>;
      case 'differentials':
        return <React.Fragment key="diff">{renderDifferentialsSection()}</React.Fragment>;
      case 'services':
        return <React.Fragment key="services">{renderServicesSection()}</React.Fragment>;
      case 'gallery':
        return <React.Fragment key="gallery">{renderGallerySection()}</React.Fragment>;
      case 'reviews':
        return <React.Fragment key="reviews">{renderGoogleReviews()}</React.Fragment>;
      case 'hours':
      case 'location':
        return <React.Fragment key="loc">{renderHoursAndLocation()}</React.Fragment>;
      case 'socials':
        return <React.Fragment key="socials">{renderSocialsSection()}</React.Fragment>;
      case 'cta':
        return <React.Fragment key="cta">{renderCtaFooter()}</React.Fragment>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-full transition-all duration-300 mx-auto ${
        viewport === 'mobile'
          ? 'max-w-[420px] px-3 sm:px-4'
          : viewport === 'tablet'
          ? 'max-w-2xl px-6'
          : 'max-w-4xl px-8'
      }`}
      style={{
        backgroundColor: theme.background || '#07080D',
        color: theme.text || '#F8FAFC'
      }}
    >
      <div className="py-6 sm:py-10">
        {/* Render Sections in Configured Order */}
        {sectionsOrder.map((key) => renderSectionByKey(key))}
      </div>

      {/* Floating WhatsApp Button */}
      {whatsappConfig?.showFloating !== false && cleanWaNumber && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(16,185,129,0.5)] transition-transform hover:scale-110 active:scale-95 ${
            whatsappConfig?.floatingPosition === 'left' ? 'left-6' : 'right-6'
          }`}
          title="Falar no WhatsApp"
        >
          <BrandWhatsApp size={28} />
        </a>
      )}

      {/* Lightbox Photo Modal */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhotoModal(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={activePhotoModal}
              alt="Ampliada"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
