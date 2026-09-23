import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { CheckCircle2, Star, MapPin, Clock, ArrowUpRight, Share2, Sparkles } from 'lucide-react';

export const SocialProfileEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, buttons = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const openNow = isStoreOpen(project);

  const usePhotos = project.usePhotos !== false;
  const validPhotos = usePhotos ? photos.filter((p) => p && p.url) : [];

  // Modern Social Profile Slate / Graphite palette
  const profileBg = theme.background || '#0D1117';
  const profileSurface = theme.surface || '#161B22';
  const profileText = theme.text || '#F0F6FC';
  const profileMuted = theme.textMuted || '#8B949E';
  const profileBorder = theme.border || '#30363D';
  const accent = theme.primary || '#58A6FF';

  const avatarUrl = identity.avatarUrl || (validPhotos[0]?.url) || '';

  return (
    <div
      className="w-full space-y-6 animate-fadeIn p-4 sm:p-6 rounded-3xl"
      style={{
        backgroundColor: profileBg,
        color: profileText,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
    >
      {/* 1. PROFILE HEADER CARD (Avatar / Master Barber, Badge, Verified, Bio) */}
      <header className="p-6 rounded-3xl border text-center space-y-4 shadow-xl relative overflow-hidden" style={{ backgroundColor: profileSurface, borderColor: profileBorder }}>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {project.statusConfig?.enabled !== false && (
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono inline-flex items-center gap-1.5 ${openNow ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${openNow ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              {openNow ? 'Online' : 'Fechado'}
            </span>
          )}
        </div>

        {/* Free Floating Logo on Top if exists */}
        {renderFreeLogo(project, 'mb-2')}

        {/* Big Specialist Avatar Photo (If photos enabled) */}
        {usePhotos && avatarUrl && (
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 border-2 shadow-2xl" style={{ borderColor: accent }}>
              <img
                src={avatarUrl}
                alt={identity.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute bottom-0 right-1 p-1 rounded-full bg-blue-500 text-white shadow-md">
              <CheckCircle2 size={16} />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: profileText }}>
              {identity.name}
            </h1>
          </div>
          <p className="text-xs sm:text-sm font-semibold" style={{ color: accent }}>
            {identity.slogan || '@especialista'}
          </p>
        </div>

        {/* Short Punchy Authority Bio */}
        {identity.about && (
          <p className="text-xs leading-relaxed max-w-sm mx-auto" style={{ color: profileMuted }}>
            {identity.about}
          </p>
        )}

        {/* Social Metrics / Trust Pill */}
        {googleReviewConfig?.enabled !== false && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10">
            <div className="flex items-center text-amber-400">
              <Star size={13} fill="currentColor" />
            </div>
            <span className="font-bold text-white">5.0</span>
            <span className="text-slate-400 font-normal">({googleReviewConfig?.reviewCount || 150}+ avaliações no Google)</span>
          </div>
        )}
      </header>

      {/* 2. GIANT SOCIAL ACTION BUTTONS */}
      <section className="space-y-3">
        {/* Main WhatsApp Direct */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-4 rounded-2xl font-bold text-sm flex items-center justify-between shadow-lg transition-transform active:scale-[0.98]"
          style={{ backgroundColor: '#25D366', color: '#052E16' }}
        >
          <div className="flex items-center gap-3">
            <BrandWhatsApp size={22} />
            <div className="text-left">
              <div className="leading-tight font-black">{identity.title || 'Agendar Horário no WhatsApp'}</div>
              <div className="text-[11px] opacity-80 font-normal">Atendimento imediato direto com a barbearia</div>
            </div>
          </div>
          <ArrowUpRight size={20} />
        </a>

        {/* Instagram Profile Link */}
        {socials?.instagram?.enabled && socials.instagram.url && (
          <a
            href={socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 rounded-2xl font-bold text-sm flex items-center justify-between border transition-transform active:scale-[0.98]"
            style={{ backgroundColor: profileSurface, borderColor: profileBorder, color: profileText }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white">
                <BrandInstagram size={18} />
              </div>
              <div className="text-left">
                <div className="leading-tight font-black">Acompanhar no Instagram</div>
                <div className="text-[11px]" style={{ color: profileMuted }}>Vídeos de cortes, bastidores e novidades</div>
              </div>
            </div>
            <ArrowUpRight size={18} style={{ color: profileMuted }} />
          </a>
        )}

        {/* Custom Project Buttons */}
        {buttons.map((b) => (
          <a
            key={b.id}
            href={b.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-3.5 rounded-2xl font-bold text-xs flex items-center justify-between border transition-all active:scale-[0.98]"
            style={{ backgroundColor: profileSurface, borderColor: profileBorder, color: profileText }}
          >
            <span>{b.text}</span>
            <ArrowUpRight size={16} style={{ color: profileMuted }} />
          </a>
        ))}
      </section>

      {/* 3. ESPECIALIDADES / CARDÁPIO RÁPIDO */}
      {services.length > 0 && (
        <section className="p-5 rounded-3xl border space-y-3" style={{ backgroundColor: profileSurface, borderColor: profileBorder }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
              Serviços mais procurados
            </span>
            <Sparkles size={14} style={{ color: accent }} />
          </div>

          <div className="space-y-2">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl flex items-center justify-between border"
                style={{ backgroundColor: profileBg, borderColor: profileBorder }}
              >
                <div>
                  <h4 className="text-xs font-bold" style={{ color: profileText }}>{s.name}</h4>
                  <p className="text-[11px] line-clamp-1" style={{ color: profileMuted }}>{s.description}</p>
                </div>
                {s.price && (
                  <span className="text-xs font-mono font-bold shrink-0 ml-2" style={{ color: accent }}>
                    {s.price}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. INSTAGRAM PHOTO FEED (IF PHOTOS ENABLED) */}
      {usePhotos && validPhotos.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold" style={{ color: profileText }}>
              Transformações Recentes
            </span>
            <span className="text-[11px]" style={{ color: accent }}>@portfolio</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {validPhotos.slice(0, 6).map((photo, i) => (
              <div
                key={photo.id || i}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer relative group border"
                style={{ borderColor: profileBorder }}
                onClick={() => onPhotoClick && onPhotoClick(photo.url)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || 'Trabalho do Barbeiro'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LOCALIZAÇÃO E HORÁRIO */}
      {(location?.address || location?.hours) && (
        <section className="p-5 rounded-3xl border space-y-3" style={{ backgroundColor: profileSurface, borderColor: profileBorder }}>
          {location.hours && (
            <div className="flex items-start gap-2.5 text-xs">
              <Clock size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
              <div>
                <span className="font-bold block" style={{ color: profileText }}>Horários de Atendimento</span>
                <span style={{ color: profileMuted }}>{location.hours}</span>
              </div>
            </div>
          )}

          {location.address && (
            <div className="flex items-start gap-2.5 text-xs pt-2 border-t" style={{ borderColor: profileBorder }}>
              <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
              <div className="flex-1">
                <span className="font-bold block" style={{ color: profileText }}>Endereço da Barbearia</span>
                <span style={{ color: profileMuted }}>{location.address}</span>
                {location.mapsUrl && (
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-xs mt-1.5 hover:underline"
                    style={{ color: accent }}
                  >
                    <BrandGoogleMaps size={13} />
                    <span>Ver no Google Maps</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. PROFILE FOOTER */}
      <footer className="text-center pt-2 space-y-2">
        <p className="text-[11px]" style={{ color: profileMuted }}>
          BioSite Oficial de {identity.name}
        </p>
      </footer>
    </div>
  );
};
