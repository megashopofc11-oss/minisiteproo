import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Zap, ArrowRight } from 'lucide-react';

export const OrbitalMotionEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], location, statusConfig } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);

  const orbitalBg = theme.background || '#07090E';
  const neonAccent = theme.primary || '#FF6B00';

  return (
    <div
      className="w-full space-y-8 animate-fadeIn p-4 sm:p-6 rounded-3xl text-white relative overflow-hidden"
      style={{ backgroundColor: orbitalBg }}
    >
      {/* Radiant Glowing Aura in the background */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-35 pointer-events-none"
        style={{ backgroundColor: neonAccent }}
      />
      <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-indigo-600/25 blur-[120px] pointer-events-none" />

      {/* 1. MOTION HERO (Pulsing badge + high voltage aura) */}
      <section className="relative z-10 p-6 sm:p-10 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-2xl text-center space-y-5">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Zap size={11} className="text-amber-400 animate-bounce" />
            <span>{identity.badge || 'ALTA PERFORMANCE'}</span>
          </span>
        </div>

        {renderFreeLogo(project, 'pb-2', 'center')}

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            {identity.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
            {identity.slogan}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: neonAccent }}
          >
            <span>{identity.title || 'CONECTAR AGORA'}</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* 2. LIVE STATUS PILL */}
      {statusConfig?.enabled && (
        <section className="relative z-10 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]' : 'bg-amber-400'}`} />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              {isOpen ? 'STATUS: ATIVO E DISPONÍVEL' : 'STATUS: FECHADO NO MOMENTO'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {statusConfig.openTime || '09:00'} - {statusConfig.closeTime || '20:00'}
          </span>
        </section>
      )}

      {/* 3. DYNAMIC SERVICES */}
      {services.length > 0 && (
        <section className="relative z-10 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-black uppercase tracking-tight">Especialidades</h3>
            <span className="text-[10px] font-mono text-slate-400">{services.length} SERVIÇOS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors uppercase">
                    {svc.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{svc.description}</p>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-center text-amber-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Agendar Atendimento</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. GALLERY */}
      {photos.length > 0 && (
        <section className="relative z-10 space-y-3">
          <h3 className="text-base font-black uppercase tracking-tight px-1">Galeria de Imagens</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className="w-56 h-40 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. LOCATION (SEPARATE - NO DUPLICATION) */}
      {location?.address && (
        <section className="relative z-10 p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">LOCALIZAÇÃO</span>
              <p className="text-xs sm:text-sm text-white font-medium">{location.address}</p>
              {location.city && <p className="text-xs text-slate-400">{location.city}</p>}
              {location.mapsUrl && (
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline pt-1">
                  <BrandGoogleMaps size={13} />
                  <span>Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6. HOURS (SEPARATE - NO DUPLICATION) */}
      {location?.hours && (
        <section className="relative z-10 p-4 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
          <Clock size={16} className="text-amber-400 shrink-0" />
          <p className="text-xs text-slate-300">{location.hours}</p>
        </section>
      )}

      {/* 7. FOOTER */}
      <footer className="relative z-10 pt-4 text-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95"
          style={{ backgroundColor: neonAccent }}
        >
          <BrandWhatsApp size={16} />
          <span>{identity.title || 'ENTRAR EM CONTATO'}</span>
        </a>
      </footer>
    </div>
  );
};
