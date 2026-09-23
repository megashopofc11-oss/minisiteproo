import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandTikTok, BrandGoogle, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, ExternalLink, ChevronRight, CheckCircle2, ShieldCheck, Sparkles, Flame, MessageCircle, Navigation, Award } from 'lucide-react';

export const GraphicBioEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);

  const bg = theme.background || '#08080C';
  const primary = theme.primary || '#EAB308';
  const accent = theme.accent || '#F59E0B';

  // Photo cutout or portrait
  const heroPerson = project.usePhotos !== false && (identity.bannerUrl || photos[0]?.url);
  const secondPhoto = photos[1]?.url || photos[0]?.url;

  return (
    <div
      className="w-full space-y-6 sm:space-y-8 animate-fadeIn text-white p-3 sm:p-6"
      style={{ backgroundColor: bg }}
    >
      {/* 1. HERO WITH PERSON CUTOUT & GOLDEN LIGHTING */}
      <div className="relative rounded-3xl overflow-hidden pt-8 pb-6 px-4 sm:px-8 border border-white/10 shadow-2xl flex flex-col items-center text-center bg-gradient-to-b from-white/[0.05] via-[#0E1017] to-transparent">
        {/* Ambient Backlight Halo */}
        <div
          className="absolute -top-10 inset-x-0 mx-auto w-64 h-64 rounded-full blur-[90px] opacity-35 pointer-events-none"
          style={{ backgroundColor: primary }}
        />
        {/* Subtle Golden Bokeh / Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Person / Barber Cutout Image with Golden Aura */}
        {heroPerson && (
          <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-4 group cursor-pointer" onClick={() => onPhotoClick && onPhotoClick(heroPerson)}>
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-50 transform scale-95"
              style={{ backgroundColor: primary }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 shadow-2xl" style={{ borderColor: `${primary}80` }}>
              <img
                src={heroPerson}
                alt={identity.name}
                className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Free Floating PNG Logo (No forced circle/box) */}
        <div className="relative z-10 pb-2">
          {renderFreeLogo(project, 'mx-auto max-h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]')}
        </div>

        {/* Name with Verified Badge */}
        <div className="relative z-10 space-y-1.5 max-w-md">
          <div className="inline-flex items-center justify-center gap-1.5">
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-md">
              {identity.name}
            </h1>
            <CheckCircle2 size={18} className="text-amber-400 fill-amber-400/20 shrink-0" />
          </div>

          {identity.badge && (
            <p className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase font-bold text-amber-300">
              {identity.badge}
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm mx-auto pt-1">
            "{identity.slogan}"
          </p>
        </div>

        {/* Social Icons Bar (Chrome / Glass Pills) */}
        <div className="relative z-10 flex items-center justify-center gap-3 pt-5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-400 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-emerald-500/20"
            title="WhatsApp"
          >
            <BrandWhatsApp size={18} />
          </a>

          {socials?.instagram?.enabled && (
            <a
              href={socials.instagram.url || (socials.instagram.username ? `https://instagram.com/${socials.instagram.username.replace('@', '')}` : 'https://instagram.com')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-pink-500/15 hover:bg-pink-500/25 border border-pink-400/40 text-pink-400 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-pink-500/20"
              title="Instagram"
            >
              <BrandInstagram size={18} />
            </a>
          )}

          {location?.mapsUrl && (
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-400 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg shadow-sky-500/20"
              title="Localização"
            >
              <BrandGoogleMaps size={18} />
            </a>
          )}
        </div>
      </div>

      {/* 2. REAL AD-STYLE GRAPHIC ACTION BANNERS (Inspired by Reference Images) */}
      <div className="space-y-4">
        {/* Banner 1: Primary Signature Service with Action Tag */}
        {services[0] && (
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-[#17130B] via-[#1F170D] to-[#2D1F0E] p-5 sm:p-6 shadow-xl hover:border-amber-400/60 transition-all group">
            {/* Top Micro-Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-3 shadow-md">
              <Flame size={12} className="fill-slate-950" />
              <span>MAIS PROCURADO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="sm:col-span-2 space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors uppercase leading-tight">
                  {services[0].name}
                </h3>
                <p className="text-xs text-amber-100/70 leading-relaxed font-light">
                  {services[0].description}
                </p>
                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95"
                  >
                    <span>AGENDAR ESTE HORÁRIO</span>
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>

              {/* 3D Visual Graphic Cutout */}
              <div className="hidden sm:flex justify-end items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl relative">
                  <img
                    src={secondPhoto}
                    alt=""
                    className="w-full h-full object-cover filter contrast-110 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner 2: 3D WhatsApp Smartphone Mockup Card */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-[#071611] via-[#0B211A] to-[#081B14] p-5 sm:p-6 shadow-xl hover:border-emerald-400/60 transition-all group">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-3 shadow-md">
            <MessageCircle size={12} className="fill-slate-950" />
            <span>ATENDIMENTO DIRETO</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors uppercase leading-tight">
                FALE CONOSCO NO WHATSAPP
              </h3>
              <p className="text-xs text-emerald-100/70 max-w-sm leading-relaxed font-light">
                Tire suas dúvidas em tempo real ou consulte a disponibilidade de horários para hoje.
              </p>
              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                >
                  <BrandWhatsApp size={15} />
                  <span>ABRIR WHATSAPP AGORA</span>
                </a>
              </div>
            </div>

            {/* Smartphone Graphic Mockup */}
            <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-2xl bg-black border-2 border-emerald-400/50 shadow-2xl p-1.5 flex flex-col justify-between shrink-0 transform rotate-2 group-hover:rotate-0 transition-transform">
              <div className="w-8 h-1 rounded-full bg-white/30 mx-auto" />
              <div className="flex-1 my-1.5 rounded-lg bg-emerald-950/70 p-1.5 flex flex-col justify-center items-center text-center">
                <BrandWhatsApp size={20} className="text-emerald-400 animate-pulse mb-1" />
                <span className="text-[7px] font-mono text-emerald-200">ONLINE</span>
              </div>
              <div className="text-[6px] font-mono text-center text-emerald-400/80">BIO FÁCIL</div>
            </div>
          </div>
        </div>

        {/* Banner 3: Location & 3D Pin Banner */}
        {location?.address && (
          <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 bg-gradient-to-r from-[#07131F] via-[#0A1B2D] to-[#081525] p-5 sm:p-6 shadow-xl hover:border-sky-400/60 transition-all group">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-3 shadow-md">
              <Navigation size={12} className="fill-slate-950" />
              <span>COMO CHEGAR</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-sky-300 transition-colors uppercase leading-tight">
                  NOSSA LOCALIZAÇÃO
                </h3>
                <p className="text-xs text-sky-100/70 max-w-sm leading-relaxed font-light">
                  {location.address}
                </p>
                {location.mapsUrl && (
                  <div className="pt-2">
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
                    >
                      <MapPin size={15} />
                      <span>ABRIR NO GOOGLE MAPS</span>
                    </a>
                  </div>
                )}
              </div>

              {/* 3D Location Map Graphic Base */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-sky-950 to-slate-950 border border-sky-400/40 flex flex-col items-center justify-center shadow-2xl shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-full bg-sky-400/20 text-sky-400 flex items-center justify-center border border-sky-400/50 shadow-inner">
                  <MapPin size={22} className="text-amber-400 drop-shadow" />
                </div>
                <span className="text-[8px] font-mono text-sky-300 uppercase mt-1">MAPS 3D</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. ADDITIONAL SPECIALTIES TILES */}
      {services.length > 1 && (
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block px-1">
            OUTROS PROCEDIMENTOS DE EXCELÊNCIA
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.slice(1).map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-2.5 group"
              >
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">
                    {s.description}
                  </p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors pt-1"
                >
                  <span>{s.ctaText || 'Consultar Horários'}</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. GOOGLE REVIEW POWER SECTION (Matching Reference Image) */}
      {googleReviewConfig?.enabled && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#14101A] via-[#1A1422] to-[#120E18] border border-amber-500/25 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 drop-shadow" />
              ))}
              <span className="font-black text-sm text-white ml-2">5.0 DE 5.0</span>
            </div>
            <h4 className="text-base font-black text-white uppercase tracking-tight">
              NOS AVALIE NO GOOGLE
            </h4>
            <p className="text-xs text-slate-300 font-light max-w-sm">
              Gostou do nosso atendimento? Sua avaliação ajuda outros clientes a conhecerem nosso padrão.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={googleReviewConfig.url || waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-xl active:scale-95"
            >
              <BrandGoogle size={16} />
              <span>AVALIAR AGORA</span>
            </a>
          </div>
        </div>
      )}

      {/* 5. OPENING HOURS BOARD */}
      {location?.hours && (
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Clock size={16} className="text-amber-400 shrink-0" />
            <span className="font-mono">{location.hours}</span>
          </div>
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isOpen ? 'bg-emerald-400 shadow-[0_0_8px_#34D399]' : 'bg-amber-400'}`} />
        </div>
      )}

      {/* 6. FLOATING WHATSAPP BUTTON WITH AMBIENT AURA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Falar no WhatsApp"
      >
        <BrandWhatsApp size={28} className="text-slate-950" />
      </a>
    </div>
  );
};
