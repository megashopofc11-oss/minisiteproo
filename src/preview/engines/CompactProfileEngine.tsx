import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo, RenderSmartGallery } from './common';
import { BrandWhatsApp, BrandInstagram, BrandTikTok, BrandGoogleMaps, BrandGoogle } from '../../components/BrandIcons';
import { Star, MapPin, Clock, ArrowUpRight, Share2, Check, ShieldCheck, ChevronRight } from 'lucide-react';

export const CompactProfileEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const {
    identity,
    theme,
    photos = [],
    services = [],
    socials,
    location,
    googleReviewConfig,
    statusConfig,
    buttons = []
  } = project;

  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const usePhotos = project.usePhotos !== false;
  const avatarUrl = identity.avatarUrl || photos[0]?.url || identity.bannerUrl;

  const profileBg = theme.background || '#090A0F';
  const profileSurface = theme.surface || '#12141D';
  const profileText = theme.text || '#FFFFFF';
  const profileMuted = theme.textMuted || '#94A3B8';
  const profileBorder = theme.border || 'rgba(255, 255, 255, 0.12)';
  const accent = theme.primary || '#D97706';

  return (
    <div
      className="w-full space-y-5 animate-fadeIn p-2 sm:p-4 max-w-md mx-auto"
      style={{
        color: profileText,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
    >
      {/* 1. COMPACT HEADER (Clean, focused, high authority) */}
      <header className="p-6 rounded-3xl border shadow-xl text-center space-y-4 relative overflow-hidden"
        style={{ backgroundColor: profileSurface, borderColor: profileBorder }}
      >
        <div className="flex items-center justify-between">
          {statusConfig?.enabled !== false && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border"
              style={{
                backgroundColor: isOpen ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                borderColor: isOpen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                color: isOpen ? '#34D399' : '#F87171'
              }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              {isOpen ? 'Aberto Agora' : 'Fechado'}
            </span>
          )}

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            title="Compartilhar"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
          </button>
        </div>

        {/* Free Floating PNG Logo */}
        {renderFreeLogo(project, 'py-1')}

        {/* Small avatar if photo mode is on */}
        {usePhotos && avatarUrl && (
          <div className="relative inline-block mx-auto">
            <div className="w-20 h-20 rounded-full overflow-hidden p-0.5 border-2 shadow-xl" style={{ borderColor: accent }}>
              <img
                src={avatarUrl}
                alt={identity.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight" style={{ color: profileText }}>
            {identity.name}
          </h1>
          <p className="text-xs font-semibold" style={{ color: accent }}>
            {identity.slogan || identity.subtitle}
          </p>
        </div>

        {identity.about && (
          <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: profileMuted }}>
            {identity.about}
          </p>
        )}

        {/* Quick Review Pill */}
        {googleReviewConfig?.enabled !== false && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10">
            <div className="flex items-center text-amber-400">
              <Star size={12} fill="currentColor" />
            </div>
            <span className="font-bold text-white">5.0</span>
            <span className="text-slate-400 font-normal">({googleReviewConfig?.reviewCount || 180}+ avaliações)</span>
          </div>
        )}
      </header>

      {/* 2. STACKED ACTION BUTTONS (The Core of Link-in-Bio) */}
      <section className="space-y-2.5">
        {/* Main WhatsApp Direct */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-xl transition-transform active:scale-[0.98] text-slate-950"
          style={{ backgroundColor: accent }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center">
              <BrandWhatsApp size={18} />
            </div>
            <span className="text-left font-black">{identity.title || 'Agendar no WhatsApp'}</span>
          </div>
          <ArrowUpRight size={16} />
        </a>

        {/* Instagram Profile */}
        {(() => {
          const instaRaw = socials?.instagram as any;
          const instaUrl = typeof instaRaw === 'string'
            ? (instaRaw.startsWith('http') ? instaRaw : `https://instagram.com/${instaRaw.replace('@', '')}`)
            : (instaRaw?.url || (instaRaw?.username ? `https://instagram.com/${instaRaw.username.replace('@', '')}` : null));

          if (!instaUrl) return null;

          return (
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3.5 rounded-2xl border flex items-center justify-between transition-transform active:scale-[0.98] shadow-md"
              style={{ backgroundColor: profileSurface, borderColor: profileBorder }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                  <BrandInstagram size={16} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Siga no Instagram</div>
                  <div className="text-[10px] text-slate-400">Fotos de cortes e bastidores</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400" />
            </a>
          );
        })()}

        {/* Google Maps Route */}
        {location?.address && (
          <a
            href={location.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 rounded-2xl border flex items-center justify-between transition-transform active:scale-[0.98] shadow-md"
            style={{ backgroundColor: profileSurface, borderColor: profileBorder }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <BrandGoogleMaps size={16} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Como Chegar</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{location.address}</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400" />
          </a>
        )}

        {/* Operating Hours Button */}
        {location?.hours && (
          <div
            className="w-full p-3.5 rounded-2xl border flex items-center gap-3 shadow-md"
            style={{ backgroundColor: profileSurface, borderColor: profileBorder }}
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 text-amber-400 flex items-center justify-center">
              <Clock size={16} />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Horário de Funcionamento</div>
              <div className="text-[10px] text-slate-400">{location.hours}</div>
            </div>
          </div>
        )}
      </section>

      {/* 3. QUICK SERVICES (Compact Accordion/Cards) */}
      {services.length > 0 && (
        <section className="space-y-2">
          <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-400 px-1">
            SERVIÇOS EM DESTAQUE
          </div>
          <div className="space-y-2">
            {services.map((svc, idx) => (
              <a
                key={svc.id || idx}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border flex items-center justify-between group transition-all shadow-sm"
                style={{ backgroundColor: profileSurface, borderColor: profileBorder }}
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {svc.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{svc.description}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white/5 text-slate-300">
                  Agendar
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 4. SMART GALLERY (Auto reorganizes if no photos) */}
      <RenderSmartGallery project={project} onPhotoClick={onPhotoClick} />

      {/* 5. FOOTER */}
      <footer className="text-center py-4 text-[10px] text-slate-500 font-mono">
        © {new Date().getFullYear()} {identity.name} • Biosite Bio Fácil
      </footer>
    </div>
  );
};
