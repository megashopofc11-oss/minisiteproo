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
  ChevronDown,
  UserCheck
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
    differentials = [],
    logoConfig
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
    if (!statusConfig.autoCalculate) return statusConfig.customText?.toLowerCase().includes('aberto');

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

  // Copy share link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  // Determine fonts
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
      default:
        return "'Plus Jakarta Sans', sans-serif";
    }
  };

  // Extract layout key
  const layout = project.templateId || '';
  const isLayout = (key: string) => layout.includes(key);

  // Is this Minimal Luxury (Model 05)?
  const isMinimalLayout = isLayout('-05') || isLayout('minimal');
  // Is this Classic Club (Model 07)?
  const isClassicClub = isLayout('-07') || isLayout('classic-club');
  // Is this Urban (Model 06)?
  const isUrban = isLayout('-06') || isLayout('urban');

  // ========================================================
  // FREE LOGO RENDERER (RESPECTS FORMAT, NO FORCED CIRCLE)
  // ========================================================
  const renderFreeLogo = (customClasses = '', overrideAlign?: 'left' | 'center' | 'right') => {
    if (!identity.logoUrl) return null;

    const cfg = logoConfig || {
      size: 'lg',
      align: 'center',
      position: 'hero',
      background: 'none'
    };

    const align = overrideAlign || cfg.align || 'center';

    const sizeClass = {
      sm: 'max-h-12 max-w-[130px]',
      md: 'max-h-16 max-w-[190px]',
      lg: 'max-h-24 max-w-[260px]',
      xl: 'max-h-32 max-w-[320px]'
    }[cfg.size || 'lg'];

    const alignClass = {
      left: 'justify-start text-left',
      center: 'justify-center text-center mx-auto',
      right: 'justify-end text-right ml-auto'
    }[align];

    const bgClass = {
      none: '',
      glass: 'p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
      light: 'p-3 rounded-2xl bg-white/95 shadow-xl',
      dark: 'p-3 rounded-2xl bg-black/80 border border-white/20 shadow-xl'
    }[cfg.background || 'none'];

    return (
      <div className={`flex items-center ${alignClass} ${customClasses}`}>
        <div className={`${bgClass} inline-flex items-center justify-center transition-all`}>
          <img
            src={identity.logoUrl}
            alt={identity.name}
            className={`${sizeClass} w-auto object-contain select-none`}
          />
        </div>
      </div>
    );
  };

  // ========================================================
  // 1. HERO ACCORDING TO THE 10 DISTINCT ARCHITECTURES
  // ========================================================
  const renderHero = () => {
    // 01 — CINEMATIC HERO (Preto + Ouro + Luz Cinematográfica + Logo Central Solta)
    if (isLayout('-01') || isLayout('cinematic')) {
      return (
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 mb-8 border border-white/15 shadow-2xl min-h-[390px] flex flex-col justify-end text-center items-center">
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.32] saturate-[1.2] transform scale-105"
            style={{ backgroundImage: `url(${identity.bannerUrl || photos[0]?.url || identity.logoUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/75 to-transparent" />
          <div
            className="absolute -top-16 inset-x-0 mx-auto w-72 h-72 rounded-full blur-[100px] opacity-40 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="relative z-10 space-y-4 max-w-lg w-full">
            {/* Free PNG Logo (Sem círculo forçado) */}
            {renderFreeLogo('pb-1')}

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

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs text-slate-950 shadow-2xl transition-transform active:scale-95"
                style={{ backgroundColor: theme.primary }}
              >
                <BrandWhatsApp size={16} />
                <span>{identity.title || 'Agendar Atendimento VIP'}</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    // 02 — EDITORIAL MAGAZINE (Tipografia Display Imponente + Foto Assimétrica + Sem Cards)
    if (isLayout('-02') || isLayout('editorial')) {
      return (
        <div className="space-y-6 mb-8 pt-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              {identity.badge || 'APRESENTAÇÃO OFICIAL'}
            </span>
            {renderFreeLogo('max-h-8', 'right')}
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: theme.primary }}>
              ED. 2026
            </span>
          </div>

          <div className="space-y-3">
            <h1
              className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.05]"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-md">
              {identity.slogan}
            </p>
          </div>

          {(identity.bannerUrl || photos[0]?.url) && (
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 shadow-2xl">
              <img
                src={identity.bannerUrl || photos[0]?.url}
                alt={identity.name}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-300 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm">
                ENSAIO AUTORAL // COLEÇÃO 2026
              </div>
            </div>
          )}
        </div>
      );
    }

    // 03 — GLASS EXPERIENCE (Full-screen background + Card translúcido flutuante com blur)
    if (isLayout('-03') || isLayout('glass')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] opacity-40 pointer-events-none"
            style={{ backgroundColor: theme.primary }}
          />

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
            {/* Free Logo */}
            {renderFreeLogo('shrink-0')}

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

              {/* Glass Action Pills */}
              <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <BrandWhatsApp size={14} />
                  <span>WhatsApp</span>
                </a>
                {socials?.instagram?.url && (
                  <a
                    href={socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                  >
                    <BrandInstagram size={14} />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 04 — IMMERSIVE PHOTO (Capítulo Visual Dominante + Tipografia em Camadas)
    if (isLayout('-04') || isLayout('immersive')) {
      return (
        <div className="relative rounded-3xl overflow-hidden mb-8 min-h-[460px] flex flex-col justify-between p-6 sm:p-8 border border-white/10 shadow-2xl">
          <img
            src={identity.bannerUrl || photos[0]?.url || identity.avatarUrl}
            alt={identity.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.38] saturate-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#07080D]" />

          <div className="relative z-10 flex justify-between items-center">
            {renderFreeLogo('max-h-12', 'left')}
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

    // 05 — MINIMAL LUXURY (Fundo Off-White #FAF9F6, Preto, Respiro Amplo)
    if (isMinimalLayout) {
      return (
        <div className="mb-8 py-8 text-center space-y-4 border-b border-stone-200/80 pb-8">
          {renderFreeLogo('pb-2')}
          <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-mono block">
            {identity.badge || 'ESTABELECIMENTO AUTORAL'}
          </span>
          <h1
            className="text-3xl sm:text-5xl font-normal tracking-tight text-stone-900"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-sm mx-auto leading-relaxed">
            {identity.slogan}
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider text-stone-50 bg-stone-900 hover:bg-stone-800 transition-all uppercase"
            >
              <span>{identity.title || 'Atendimento com Hora Marcada'}</span>
            </a>
          </div>
        </div>
      );
    }

    // 06 — URBAN BRUTALIST (Preto e Cinzas Industriais, Monospace, Tags [01])
    if (isUrban) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-[#090A0F] border border-cyan-400/30 shadow-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest">[URBAN_SERIES]</span>
            <span className="text-[10px] font-mono text-slate-400">#06_SYSTEM</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {renderFreeLogo('shrink-0')}
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter font-mono">
                {identity.name}
              </h1>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                {identity.slogan}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 07 — CLASSIC CLUB (Marrom Escuro, Couro, Dourado Envelhecido, Serifas Nobres)
    if (isClassicClub) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-10 mb-8 bg-[#130C08] border border-[#3E2718] shadow-2xl text-center space-y-4">
          <div className="text-[10px] font-serif tracking-[0.25em] text-[#C59B27] uppercase">
            TRADIÇÃO & CLUBE EXCLUSIVO
          </div>

          {renderFreeLogo('pb-1')}

          <h1
            className="text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight font-serif"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#D7C2B2] font-serif max-w-md mx-auto leading-relaxed italic">
            "{identity.slogan}"
          </p>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-serif text-xs font-bold text-[#130C08] bg-[#C59B27] hover:bg-[#D4A936] shadow-xl uppercase tracking-wider"
            >
              <span>{identity.title || 'Reservar Horário'}</span>
            </a>
          </div>
        </div>
      );
    }

    // 08 — MOTION DYNAMIC (Iluminação Viva, Cards com Microinterações)
    if (isLayout('-08') || isLayout('motion')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-[#0A0714] border border-fuchsia-500/30 shadow-2xl overflow-hidden space-y-4 text-center">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-fuchsia-600/30 rounded-full blur-[100px] pointer-events-none" />

          {renderFreeLogo('pb-1')}

          <span className="inline-block px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wider animate-pulse">
            {identity.badge || 'MOTION EXPERIENCE'}
          </span>

          <h1
            className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            {identity.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-medium">
            {identity.slogan}
          </p>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs text-slate-950 bg-gradient-to-r from-fuchsia-500 to-amber-400 shadow-xl shadow-fuchsia-500/25 active:scale-95 transition-transform uppercase tracking-wider"
            >
              <BrandWhatsApp size={16} />
              <span>{whatsappConfig?.label || 'Chamar no WhatsApp'}</span>
            </a>
          </div>
        </div>
      );
    }

    // 09 — PROFILE (Focado no Profissional / Foto de Destaque / Especialista)
    if (isLayout('-09') || isLayout('profile')) {
      return (
        <div className="relative rounded-3xl p-6 sm:p-8 mb-8 bg-[#080A12] border border-white/15 shadow-2xl text-center space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <UserCheck size={14} />
              <span>ESPECIALISTA OFICIAL</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Agenda Disponível
            </span>
          </div>

          {/* Large Cutout Portrait of the Specialist */}
          {identity.avatarUrl && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 mx-auto bg-gradient-to-tr from-amber-400 to-amber-600 shadow-2xl overflow-hidden">
              <img src={identity.avatarUrl} alt={identity.name} className="w-full h-full object-cover rounded-full" />
            </div>
          )}

          <div className="space-y-1">
            <h1
              className="text-2xl sm:text-4xl font-black text-white tracking-tight"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              {identity.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {identity.slogan}
            </p>
          </div>

          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl transition-all"
            >
              <BrandWhatsApp size={16} />
              <span>Falar Diretamente Comigo</span>
            </a>
          </div>
        </div>
      );
    }

    // 10 — SIGNATURE EXCLUSIVE (Modelo Mais Sofisticado, Selo de Assinatura, VIP)
    return (
      <div className="relative rounded-3xl p-6 sm:p-10 mb-8 bg-[#06070B] border border-amber-500/30 shadow-2xl space-y-5">
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
          {renderFreeLogo('shrink-0')}
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

  // ========================================================
  // 2. STATUS CARD (Aberto / Fechado)
  // ========================================================
  const renderStatusSection = () => {
    if (sectionsVisibility.status === false || !statusConfig?.enabled) return null;

    return (
      <div
        className={`mb-6 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md shadow-md ${
          isMinimalLayout
            ? 'bg-stone-100/90 border-stone-200 text-stone-900'
            : isClassicClub
            ? 'bg-[#1E140E] border-[#3E2718] text-[#FDFBF7]'
            : 'bg-white/[0.04] border-white/10 text-white'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full animate-pulse ${
              isCurrentlyOpen
                ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]'
                : 'bg-amber-400 shadow-[0_0_10px_#F59E0B]'
            }`}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs font-black uppercase tracking-wider">
              {isCurrentlyOpen ? 'ABERTO AGORA' : 'FECHADO NO MOMENTO'}
            </span>
            <span className={`text-[10px] font-medium ${isMinimalLayout ? 'text-stone-500' : 'text-slate-400'}`}>
              • {statusConfig.openTime || '09:00'} às {statusConfig.closeTime || '20:00'}
            </span>
          </div>
        </div>

        {shareConfig?.enabled && (
          <button
            type="button"
            onClick={handleShare}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
              isMinimalLayout
                ? 'bg-stone-200/80 hover:bg-stone-300/80 border-stone-300 text-stone-800'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
            }`}
          >
            {copiedLink ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="text-emerald-500">Copiado</span>
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

  // ========================================================
  // 3. ABOUT SECTION
  // ========================================================
  const renderAboutSection = () => {
    if (sectionsVisibility.about === false || !identity.about) return null;

    return (
      <div
        className={`mb-8 p-6 rounded-3xl border shadow-xl space-y-3 ${
          isMinimalLayout
            ? 'bg-white border-stone-200 text-stone-900'
            : isClassicClub
            ? 'bg-[#1E140E] border-[#3E2718] text-[#FDFBF7]'
            : 'bg-[#0E111C] border-white/10 text-white'
        }`}
      >
        <div className="flex items-center gap-2 text-amber-500 text-xs font-black uppercase tracking-wider">
          <Info size={14} />
          <span>Sobre Nossa Proposta</span>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed font-normal ${isMinimalLayout ? 'text-stone-600' : 'text-slate-300'}`}>
          {identity.about}
        </p>
      </div>
    );
  };

  // ========================================================
  // 4. DIFFERENTIALS SECTION
  // ========================================================
  const renderDifferentialsSection = () => {
    if (sectionsVisibility.differentials === false || differentials.length === 0) return null;

    return (
      <div className="mb-8 space-y-3">
        <span className={`text-[10px] font-mono tracking-widest uppercase block px-1 ${isMinimalLayout ? 'text-stone-500' : 'text-slate-400'}`}>
          NOSSOS DIFERENCIAIS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {differentials.map((diff) => (
            <div
              key={diff.id}
              className={`p-4 rounded-2xl border flex items-start gap-3 backdrop-blur-sm ${
                isMinimalLayout
                  ? 'bg-white border-stone-200'
                  : isClassicClub
                  ? 'bg-[#1E140E] border-[#3E2718]'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <AppIcon name={diff.iconName || 'sparkles'} size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className={`text-xs font-bold ${isMinimalLayout ? 'text-stone-900' : 'text-white'}`}>{diff.title}</h4>
                <p className={`text-[11px] leading-snug ${isMinimalLayout ? 'text-stone-600' : 'text-slate-400'}`}>{diff.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ========================================================
  // 5. SERVICES & SPECIALTIES (DIVERSIFIED FORMATS, NO FORCED PRICES)
  // ========================================================
  const renderServicesSection = () => {
    if (sectionsVisibility.services === false || services.length === 0) return null;

    // A. EDITORIAL (Sem cards, palavras grandes tipográficas)
    if (serviceLayout === 'editorial' || isLayout('-02') || isLayout('editorial')) {
      return (
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/15 pb-2">
            <h3
              className="text-base sm:text-lg font-light tracking-widest text-white uppercase font-serif"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              MENU DE ATENDIMENTO
            </h3>
            <span className="text-[10px] font-mono text-slate-400">{services.length} ITENS</span>
          </div>

          <div className="divide-y divide-white/10">
            {services.map((s) => (
              <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
                <div>
                  <h4 className="font-light tracking-wide text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors uppercase font-serif">
                    {s.name}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md pt-0.5">{s.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 self-start sm:self-center font-mono"
                >
                  [ CONSULTAR ] →
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // B. MINIMAL-LIST (Minimal luxury & Off-white)
    if (serviceLayout === 'minimal-list' || isMinimalLayout) {
      return (
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h3
              className="text-base sm:text-lg font-medium tracking-tight text-stone-900 uppercase font-serif"
              style={{ fontFamily: getHeadingFontFamily() }}
            >
              Especialidades
            </h3>
            <span className="text-[10px] font-mono text-stone-500">{services.length} OPÇÕES</span>
          </div>

          <div className="divide-y divide-stone-200">
            {services.map((s) => (
              <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-stone-900 group-hover:text-stone-700 transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-xs text-stone-600 max-w-md">{s.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 hover:text-stone-950 self-start sm:self-center"
                >
                  <span>{s.ctaText || 'Agendar'}</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // C. ICONS-GRID (Urban & Tech style)
    if (serviceLayout === 'icons-grid' || isUrban) {
      return (
        <div className="mb-8 space-y-4">
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase font-mono">
            // SERVIÇOS & ATUAÇÃO
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s, idx) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-[#0D101C] border border-white/10 hover:border-cyan-400/40 transition-all flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-cyan-400 shrink-0 font-mono text-xs font-bold">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{s.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{s.description}</p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-bold text-cyan-400 hover:underline pt-1"
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

    // D. ACCORDION (Classic Club & Procedures)
    if (serviceLayout === 'accordion' || isClassicClub) {
      return (
        <div className="mb-8 space-y-4">
          <h3
            className="text-base sm:text-lg font-bold text-[#FDFBF7] tracking-tight uppercase font-serif"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Serviços do Clube
          </h3>
          <div className="space-y-2">
            {services.map((s) => {
              const isOpen = openAccordionId === s.id;
              return (
                <div
                  key={s.id}
                  className="rounded-2xl bg-[#1E140E] border border-[#3E2718] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenAccordionId(isOpen ? null : s.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#FDFBF7]">{s.name}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#D7C2B2] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 space-y-3 border-t border-[#3E2718]">
                      <p className="text-xs text-[#D7C2B2] leading-relaxed font-serif">{s.description}</p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-[#C59B27] hover:underline"
                      >
                        <span>{s.ctaText || 'Agendar Este Serviço'}</span>
                        <ChevronRight size={14} />
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

    // E. PHOTO-CARDS (Immersive style)
    if (serviceLayout === 'photo-cards' || isLayout('-04') || isLayout('immersive')) {
      return (
        <div className="mb-8 space-y-4">
          <h3
            className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Capítulos de Especialidades
          </h3>
          <div className="space-y-4">
            {services.map((s, idx) => {
              const photo = photos[idx % photos.length]?.url || s.imageUrl;
              return (
                <div
                  key={s.id}
                  className="relative rounded-3xl overflow-hidden min-h-[180px] p-5 flex flex-col justify-end border border-white/15 shadow-xl"
                >
                  {photo && (
                    <img
                      src={photo}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <h4 className="text-sm sm:text-base font-black text-white">{s.name}</h4>
                    <p className="text-xs text-slate-200 line-clamp-2">{s.description}</p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 pt-1"
                    >
                      <span>{s.ctaText || 'Consultar'}</span>
                      <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // F. DEFAULT NOBLE CARDS
    return (
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-base sm:text-lg font-black text-white tracking-tight uppercase"
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Serviços em Destaque
          </h3>
          <span className="text-xs text-amber-400 font-mono font-bold">{services.length} SERVIÇOS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-3xl bg-[#0E111C] border border-white/10 hover:border-amber-400/40 transition-all shadow-xl flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <AppIcon name={s.iconName || 'sparkles'} size={20} />
                </div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                  {s.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{s.ctaText || 'Consultar WhatsApp'}</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ========================================================
  // 6. GALLERY (DIVERSIFIED FORMATS)
  // ========================================================
  const renderGallerySection = () => {
    if (sectionsVisibility.gallery === false || photos.length === 0) return null;

    return (
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3
            className={`text-base sm:text-lg font-black tracking-tight uppercase ${isMinimalLayout ? 'text-stone-900' : 'text-white'}`}
            style={{ fontFamily: getHeadingFontFamily() }}
          >
            Galeria de Trabalhos
          </h3>
          <span className="text-[10px] font-mono text-slate-400">{photos.length} FOTOS</span>
        </div>

        {galleryStyle === 'horizontal-scroll' ? (
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => setActivePhotoModal(p.url)}
                className="w-60 h-44 rounded-2xl overflow-hidden shrink-0 snap-start border border-white/10 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <img src={p.url} alt={p.alt || ''} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => setActivePhotoModal(p.url)}
                className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img src={p.url} alt={p.alt || ''} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ========================================================
  // 7. GOOGLE REVIEWS
  // ========================================================
  const renderGoogleReviews = () => {
    if (sectionsVisibility.reviews === false || !googleReviewConfig?.enabled) return null;

    return (
      <div
        className={`mb-8 p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isMinimalLayout
            ? 'bg-white border-stone-200'
            : isClassicClub
            ? 'bg-[#1E140E] border-[#3E2718]'
            : 'bg-[#0E111C] border-white/10'
        }`}
      >
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400" />
            ))}
            <span className="font-black text-sm ml-1.5">{googleReviewConfig.rating || 5.0}</span>
          </div>
          <h4 className={`font-bold text-sm ${isMinimalLayout ? 'text-stone-900' : 'text-white'}`}>
            {googleReviewConfig.title || 'AVALIAÇÕES NO GOOGLE'}
          </h4>
          <p className={`text-xs ${isMinimalLayout ? 'text-stone-500' : 'text-slate-400'}`}>
            {googleReviewConfig.subtitle || `${googleReviewConfig.reviewCount || 150}+ clientes atendidos com nota máxima`}
          </p>
        </div>

        {googleReviewConfig.url && (
          <a
            href={googleReviewConfig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <BrandGoogle size={14} />
            <span>Ver no Google</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    );
  };

  // ========================================================
  // 8. HOURS & LOCATION
  // ========================================================
  const renderHoursAndLocation = () => {
    if (sectionsVisibility.hours === false && sectionsVisibility.location === false) return null;

    return (
      <div
        className={`mb-8 p-6 rounded-3xl border shadow-xl space-y-4 ${
          isMinimalLayout
            ? 'bg-white border-stone-200'
            : isClassicClub
            ? 'bg-[#1E140E] border-[#3E2718]'
            : 'bg-[#0E111C] border-white/10'
        }`}
      >
        {sectionsVisibility.location !== false && location?.address && (
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <MapPin size={18} />
            </div>
            <div className="space-y-1 flex-1">
              <span className={`text-[10px] font-mono uppercase tracking-wider block ${isMinimalLayout ? 'text-stone-500' : 'text-slate-400'}`}>
                ENDEREÇO
              </span>
              <p className={`text-xs sm:text-sm font-medium ${isMinimalLayout ? 'text-stone-900' : 'text-white'}`}>{location.address}</p>
              {location.city && <p className="text-xs text-slate-400">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 pt-1 hover:underline"
                >
                  <BrandGoogleMaps size={13} />
                  <span>Abrir no Google Maps</span>
                </a>
              )}
            </div>
          </div>
        )}

        {sectionsVisibility.hours !== false && location?.hours && (
          <div className="flex items-start gap-3 pt-3 border-t border-white/5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Clock size={18} />
            </div>
            <div className="space-y-0.5">
              <span className={`text-[10px] font-mono uppercase tracking-wider block ${isMinimalLayout ? 'text-stone-500' : 'text-slate-400'}`}>
                HORÁRIOS DE ATENDIMENTO
              </span>
              <p className={`text-xs sm:text-sm font-medium ${isMinimalLayout ? 'text-stone-900' : 'text-white'}`}>{location.hours}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ========================================================
  // 9. SOCIALS SECTION
  // ========================================================
  const renderSocialsSection = () => {
    if (sectionsVisibility.socials === false || !socials) return null;

    return (
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {socials.whatsapp?.enabled && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <BrandWhatsApp size={16} />
            <span>WhatsApp</span>
          </a>
        )}
        {socials.instagram?.enabled && socials.instagram.url && (
          <a
            href={socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <BrandInstagram size={16} />
            <span>Instagram</span>
          </a>
        )}
        {socials.tiktok?.enabled && socials.tiktok.url && (
          <a
            href={socials.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <BrandTikTok size={16} />
            <span>TikTok</span>
          </a>
        )}
      </div>
    );
  };

  // ========================================================
  // 10. CTA FOOTER
  // ========================================================
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
        backgroundColor: theme.background || (isMinimalLayout ? '#FAF9F6' : '#07080D'),
        color: theme.text || (isMinimalLayout ? '#0F172A' : '#F8FAFC')
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
