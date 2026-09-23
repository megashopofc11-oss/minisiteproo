import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, ArrowRight, CornerDownRight } from 'lucide-react';

export const BrutalistEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], location } = project;
  const waUrl = getWhatsAppUrl(project);

  const brutBg = theme.background || '#121214';
  const isDark = !brutBg.toLowerCase().startsWith('#f') && brutBg.toLowerCase() !== '#ffffff';

  const brutText = isDark ? '#FFFFFF' : '#111111';
  const brutSurface = isDark ? '#1C1C22' : '#FFFFFF';
  const brutBorder = isDark ? 'border-2 border-white/25' : 'border-2 border-black';
  const brutShadow = isDark
    ? 'shadow-[4px_4px_0px_rgba(255,255,255,0.2)]'
    : 'shadow-[4px_4px_0px_#000000]';
  const accent = theme.primary || '#EF4444';
  const dividerBorder = isDark ? 'border-white/20' : 'border-black';

  return (
    <div
      className="w-full space-y-8 animate-fadeIn p-4 sm:p-8 rounded-none font-mono"
      style={{ backgroundColor: brutBg, color: brutText }}
    >
      {/* 1. BRUTALIST HERO BOX */}
      <section
        className={`p-6 sm:p-10 ${brutBorder} ${brutShadow} space-y-6`}
        style={{ backgroundColor: brutSurface, color: brutText }}
      >
        <div className={`flex items-center justify-between border-b-2 ${dividerBorder} pb-3`}>
          <span className="text-xs font-black uppercase tracking-wider opacity-70">
            [SYS_VER: 2024.1]
          </span>
          <span
            className="text-xs font-black uppercase px-2.5 py-0.5 text-white"
            style={{ backgroundColor: accent }}
          >
            {identity.badge || 'RAW URBAN'}
          </span>
        </div>

        {renderFreeLogo(project, 'pb-2', 'left')}

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter leading-none">
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm font-bold uppercase leading-relaxed max-w-lg opacity-85">
            {identity.slogan}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-4 text-white font-black text-xs uppercase tracking-wider ${brutShadow} transition-all active:translate-x-1 active:translate-y-1 active:shadow-none`}
            style={{ backgroundColor: accent }}
          >
            <span>{identity.title || 'ENTRAR EM CONTATO'}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* 2. BRUTALIST MANIFESTO */}
      {identity.about && (
        <section
          className={`p-6 ${brutBorder} ${brutShadow} space-y-2`}
          style={{ backgroundColor: isDark ? '#26262E' : '#FEF08A', color: isDark ? '#FFF' : '#000' }}
        >
          <span className="text-xs font-black uppercase tracking-widest block opacity-75">
            // MANIFESTO & DIRETRIZ
          </span>
          <p className="text-xs sm:text-sm font-bold uppercase leading-snug">
            {identity.about}
          </p>
        </section>
      )}

      {/* 3. RAW SERVICES (WORDS WITHOUT SOFT CARDS) */}
      {services.length > 0 && (
        <section className="space-y-4">
          <div className={`flex items-center justify-between border-b-2 ${dividerBorder} pb-2`}>
            <h3 className="text-base sm:text-lg font-black uppercase">
              // ESPECIALIDADES [{services.length}]
            </h3>
          </div>

          <div className="space-y-3">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className={`p-4 ${brutBorder} ${brutShadow} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                style={{ backgroundColor: brutSurface, color: brutText }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-black px-2 py-0.5 text-white"
                      style={{ backgroundColor: accent }}
                    >
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-black uppercase">{svc.name}</h4>
                  </div>
                  <p className="text-xs opacity-75 font-bold uppercase">{svc.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-black uppercase self-start sm:self-auto transition-transform active:scale-95"
                  style={{ backgroundColor: accent }}
                >
                  <span>AGENDAR</span>
                  <CornerDownRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. PHOTOGRAPHY GRID */}
      {photos.length > 0 && (
        <section className="space-y-4">
          <div className={`border-b-2 ${dividerBorder} pb-2`}>
            <h3 className="text-base sm:text-lg font-black uppercase">// ARQUIVO VISUAL</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className={`aspect-video overflow-hidden ${brutBorder} ${brutShadow} cursor-pointer group bg-black`}
              >
                <img
                  src={p.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LOCATION */}
      {location?.address && (
        <section
          className={`p-5 ${brutBorder} ${brutShadow} space-y-2`}
          style={{ backgroundColor: brutSurface, color: brutText }}
        >
          <div className="flex items-start gap-3">
            <MapPin size={20} className="shrink-0 mt-0.5" style={{ color: accent }} />
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-60">
                // LOCALIZAÇÃO
              </span>
              <p className="text-xs sm:text-sm font-black uppercase">{location.address}</p>
              {location.city && <p className="text-xs opacity-75 font-bold">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-black underline pt-1"
                  style={{ color: accent }}
                >
                  <BrandGoogleMaps size={13} />
                  <span>[ ABRIR MAPA ]</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. HOURS */}
      {location?.hours && (
        <section
          className={`p-4 ${brutBorder} ${brutShadow} flex items-center gap-3`}
          style={{ backgroundColor: brutSurface, color: brutText }}
        >
          <Clock size={18} className="shrink-0" style={{ color: accent }} />
          <div>
            <span className="text-[10px] font-black uppercase opacity-60 block">// EXPEDIENTE</span>
            <p className="text-xs font-black uppercase">{location.hours}</p>
          </div>
        </section>
      )}

      {/* 7. FOOTER */}
      <footer className="pt-4 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-5 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${brutShadow} transition-transform active:scale-95`}
          style={{ backgroundColor: accent }}
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'SOLICITAR VIA WHATSAPP'}</span>
        </a>
      </footer>
    </div>
  );
};
