import React from 'react';
import { EngineProps, getWhatsAppUrl, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, ArrowRight, CornerDownRight } from 'lucide-react';

export const BrutalistEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], location } = project;
  const waUrl = getWhatsAppUrl(project);

  const brutBg = theme.background || '#EFEFEF';
  const brutText = theme.text || '#111111';
  const brutBorder = 'border-2 border-black';
  const brutShadow = 'shadow-[4px_4px_0px_#000000]';

  return (
    <div
      className="w-full space-y-8 animate-fadeIn p-4 sm:p-8 rounded-none font-mono"
      style={{ backgroundColor: brutBg, color: brutText }}
    >
      {/* 1. BRUTALIST HERO BOX */}
      <section className={`p-6 sm:p-10 bg-white ${brutBorder} ${brutShadow} space-y-6`}>
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <span className="text-xs font-black uppercase tracking-wider">
            [SYS_VER: 2024.1]
          </span>
          <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5">
            {identity.badge || 'RAW EDITION'}
          </span>
        </div>

        {renderFreeLogo(project, 'pb-2', 'left')}

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter leading-none">
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm font-bold uppercase leading-relaxed max-w-lg">
            {identity.slogan}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-4 bg-black text-white font-black text-xs uppercase tracking-wider ${brutShadow} hover:bg-neutral-800 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            <span>{identity.title || 'ENTRAR EM CONTATO'}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* 2. BRUTALIST MANIFESTO */}
      {identity.about && (
        <section className={`p-6 bg-yellow-300 text-black ${brutBorder} ${brutShadow} space-y-2`}>
          <span className="text-xs font-black uppercase tracking-widest block">
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
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <h3 className="text-base sm:text-lg font-black uppercase">
              // ESPECIALIDADES [{services.length}]
            </h3>
          </div>

          <div className="space-y-3">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className={`p-4 bg-white ${brutBorder} ${brutShadow} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-black text-white px-2 py-0.5">
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm sm:text-base font-black uppercase">{svc.name}</h4>
                  </div>
                  <p className="text-xs text-neutral-600 font-bold uppercase">{svc.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-black uppercase self-start sm:self-auto hover:bg-neutral-800"
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
          <div className="border-b-2 border-black pb-2">
            <h3 className="text-base sm:text-lg font-black uppercase">// ARQUIVO VISUAL</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, idx) => (
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

      {/* 5. LOCATION (SEPARATE - NO DUPLICATION) */}
      {location?.address && (
        <section className={`p-5 bg-white ${brutBorder} ${brutShadow} space-y-2`}>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="shrink-0 mt-0.5 text-black" />
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider block text-neutral-500">
                // LOCALIZAÇÃO
              </span>
              <p className="text-xs sm:text-sm font-black uppercase">{location.address}</p>
              {location.city && <p className="text-xs text-neutral-600 font-bold">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-black underline pt-1"
                >
                  <BrandGoogleMaps size={13} />
                  <span>[ ABRIR MAPA ]</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. HOURS (SEPARATE - NO DUPLICATION) */}
      {location?.hours && (
        <section className={`p-4 bg-white ${brutBorder} ${brutShadow} flex items-center gap-3`}>
          <Clock size={18} className="shrink-0 text-black" />
          <div>
            <span className="text-[10px] font-black uppercase text-neutral-500 block">// EXPEDIENTE</span>
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
          className={`w-full py-5 bg-black text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${brutShadow} hover:bg-neutral-900`}
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'SOLICITAR VIA WHATSAPP'}</span>
        </a>
      </footer>
    </div>
  );
};
