import React from 'react';
import { MapPin, Star, ExternalLink, Sparkles } from 'lucide-react';
import { formatGoogleMapsUrl } from '../../services/zipTemplateEngine';

interface LocationSectionProps {
  values: Record<string, any>;
  hasGoogleReviews?: boolean;
  onChangeValue: (fieldId: string, val: any) => void;
  onFocusField: (fieldId: string) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  values,
  hasGoogleReviews = true,
  onChangeValue,
  onFocusField
}) => {
  const address = values.address || '';
  const mapsLink = values.maps_url || values.location_url || (address ? formatGoogleMapsUrl(address) : '');
  const hours = values.hours || '';

  const googleReview = values.googleReviews || { enabled: true, link: '' };

  const handleTestLocation = () => {
    if (!mapsLink) return;
    window.open(mapsLink, '_blank', 'noopener,noreferrer');
  };

  const handleTestReview = () => {
    if (!googleReview.link) return;
    window.open(googleReview.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      {/* 1. Endereço e Localização */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200 block">Endereço & Mapa</span>
            <span className="text-[10px] text-slate-400">Guie seus clientes até a sua porta</span>
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-300">Endereço Completo</label>
          <input
            type="text"
            value={address}
            onChange={(e) => onChangeValue('address', e.target.value)}
            onFocus={() => onFocusField('address')}
            placeholder="Ex: Av. Rondon Pacheco, 1420 - Centro, Uberlândia - MG"
            className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Horários */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-300">Horário de Funcionamento</label>
          <input
            type="text"
            value={hours}
            onChange={(e) => onChangeValue('hours', e.target.value)}
            onFocus={() => onFocusField('hours')}
            placeholder="Ex: Seg a Sex das 08h às 19h | Sáb das 08h às 14h"
            className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Link do Google Maps */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-slate-300">Link Personalizado do Google Maps (Opcional)</label>
            {mapsLink && (
              <button
                type="button"
                onClick={handleTestLocation}
                className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
              >
                <ExternalLink size={10} />
                <span>Testar Localização</span>
              </button>
            )}
          </div>
          <input
            type="url"
            value={values.maps_url || ''}
            onChange={(e) => onChangeValue('maps_url', e.target.value)}
            onFocus={() => onFocusField('maps_url')}
            placeholder="Cole o link do Google Maps ou deixe em branco para gerar pelo endereço"
            className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
          />
        </div>
      </div>

      {/* 2. Avaliação Google (se suportado pelo template) */}
      {hasGoogleReviews && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Star size={16} className="text-amber-400 fill-amber-400/30" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 block">Avaliação no Google</span>
                <span className="text-[10px] text-slate-400">Receba mais estrelas e depoimentos</span>
              </div>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={googleReview.enabled !== false}
                onChange={(e) =>
                  onChangeValue('googleReviews', { ...googleReview, enabled: e.target.checked })
                }
                className="rounded accent-amber-400"
              />
              <span className="text-[11px] font-medium text-slate-400">
                {googleReview.enabled !== false ? 'Ativo' : 'Oculto'}
              </span>
            </label>
          </div>

          {googleReview.enabled !== false && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-300">Link Direto para Avaliar no Google</label>
                {googleReview.link && (
                  <button
                    type="button"
                    onClick={handleTestReview}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <ExternalLink size={10} />
                    <span>Testar Link</span>
                  </button>
                )}
              </div>
              <input
                type="url"
                value={googleReview.link || ''}
                onChange={(e) =>
                  onChangeValue('googleReviews', { ...googleReview, link: e.target.value })
                }
                placeholder="Ex: https://g.page/r/CbXxYz/review"
                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
              />
              <p className="text-[10px] text-slate-500">
                Crie seu link em: Google Meu Negócio &gt; Perfil &gt; Solicitar Avaliações.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
