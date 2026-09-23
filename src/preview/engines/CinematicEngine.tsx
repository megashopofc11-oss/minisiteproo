import React from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { AppIcon, BrandWhatsApp, BrandInstagram, BrandTikTok, BrandGoogle, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, ExternalLink, ChevronRight, Award, ShieldCheck, Sparkles, Check, Share2 } from 'lucide-react';

export const CinematicEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, statusConfig, shareConfig, differentials = [] } = project;
  const waUrl = getWhatsAppUrl(project);
  const isOpen = isStoreOpen(project);
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn" style={{ color: theme.text || '#F8FAFC' }}>
      {/* 1. CINEMATIC HERO (Full-bleed Photo + Dark Vignette + Protagonist Logo) */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-white/15 shadow-2xl min-h-[420px] flex flex-col justify-end text-center items-center">
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
          {renderFreeLogo(project, 'pb-1')}

          {identity.badge && (
            <span
              className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border backdrop-blur-md"
              style={{ backgroundColor: `${theme.primary}25`, borderColor: `${theme.primary}60`, color: '#FFF' }}
            >
              {identity.badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-lg">
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

      {/* 2. STATUS CARD */}
      {statusConfig?.enabled && (
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]' : 'bg-amber-400'}`} />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              {isOpen ? 'ABERTO AGORA' : 'FECHADO NO MOMENTO'}
            </span>
          </div>
          {shareConfig?.enabled && (
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold border border-white/10 transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
              <span>{copied ? 'Copiado' : 'Compartilhar'}</span>
            </button>
          )}
        </div>
      )}

      {/* 3. ABOUT SECTION */}
      {identity.about && (
        <div className="p-6 rounded-3xl bg-[#0E111C] border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Award size={14} />
            <span>Nossa Proposta de Excelência</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {identity.about}
          </p>
        </div>
      )}

      {/* 4. DIFFERENTIALS */}
      {differentials.length > 0 && (
        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 block px-1">
            NOSSOS DIFERENCIAIS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {differentials.map((diff) => (
              <div key={diff.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 backdrop-blur-sm">
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
      )}

      {/* 5. SERVICES CARDS */}
      {services.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
              Serviços em Destaque
            </h3>
            <span className="text-xs text-amber-400 font-mono font-bold">{services.length} ITENS</span>
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
                <div className="pt-2 border-t border-white/5">
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
      )}

      {/* 6. GALLERY (Horizontal Scroll) */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight uppercase">
              Galeria de Trabalhos
            </h3>
            <span className="text-[10px] font-mono text-slate-400">{photos.length} FOTOS</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin">
            {photos.map((p) => (
              <div
                key={p.id}
                onClick={() => onPhotoClick && onPhotoClick(p.url)}
                className="w-64 h-48 rounded-2xl overflow-hidden shrink-0 snap-start border border-white/10 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <img src={p.url} alt={p.alt || ''} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. REVIEWS */}
      {googleReviewConfig?.enabled && (
        <div className="p-6 rounded-3xl bg-[#0E111C] border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400" />
              ))}
              <span className="font-black text-sm ml-1.5">5.0</span>
            </div>
            <h4 className="font-bold text-sm text-white">AVALIAÇÕES NO GOOGLE</h4>
            <p className="text-xs text-slate-400">{googleReviewConfig.reviewCount || 150}+ clientes atendidos com nota máxima</p>
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
      )}

      {/* 8. DEDICATED LOCATION SECTION (SEPARATE FROM HOURS - NO DUPLICATION) */}
      {location?.address && (
        <div className="p-6 rounded-3xl bg-[#0E111C] border border-white/10 shadow-xl space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <MapPin size={18} />
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-400">
                LOCALIZAÇÃO & ENDEREÇO
              </span>
              <p className="text-xs sm:text-sm font-medium text-white">{location.address}</p>
              {location.city && <p className="text-xs text-slate-400">{location.city}</p>}
              {location.mapsUrl && (
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 pt-2 hover:underline"
                >
                  <BrandGoogleMaps size={13} />
                  <span>Abrir no Google Maps</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. DEDICATED HOURS SECTION (SEPARATE FROM LOCATION - NO DUPLICATION) */}
      {location?.hours && (
        <div className="p-6 rounded-3xl bg-[#0E111C] border border-white/10 shadow-xl space-y-2">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Clock size={18} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider block text-slate-400">
                HORÁRIOS DE ATENDIMENTO
              </span>
              <p className="text-xs sm:text-sm font-medium text-white">{location.hours}</p>
            </div>
          </div>
        </div>
      )}

      {/* 10. SOCIALS */}
      {socials && (
        <div className="flex flex-wrap gap-2 justify-center">
          {socials.whatsapp?.enabled && (
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all">
              <BrandWhatsApp size={16} />
              <span>WhatsApp</span>
            </a>
          )}
          {socials.instagram?.enabled && socials.instagram.url && (
            <a href={socials.instagram.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold flex items-center gap-2 transition-all">
              <BrandInstagram size={16} />
              <span>Instagram</span>
            </a>
          )}
        </div>
      )}

      {/* 11. FOOTER CTA */}
      <footer className="pt-4 pb-8 text-center space-y-4">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-6 rounded-2xl font-black text-sm text-slate-950 flex items-center justify-center gap-2.5 shadow-xl transition-all"
          style={{ backgroundColor: theme.primary }}
        >
          <BrandWhatsApp size={18} />
          <span>{identity.title || 'Agendar Horário'}</span>
        </a>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
      >
        <BrandWhatsApp size={28} />
      </a>
    </div>
  );
};
