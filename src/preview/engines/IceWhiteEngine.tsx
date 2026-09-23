import React, { useState } from 'react';
import { EngineProps, getWhatsAppUrl, isStoreOpen, renderFreeLogo } from './common';
import { BrandWhatsApp, BrandInstagram, BrandGoogleMaps } from '../../components/BrandIcons';
import { MapPin, Clock, Star, CheckCircle, ChevronRight, Sparkles, Shield, ArrowRight } from 'lucide-react';

export const IceWhiteEngine: React.FC<EngineProps> = ({ project, onPhotoClick }) => {
  const { identity, theme, photos = [], services = [], socials, location, googleReviewConfig, differentials = [] } = project;
  const isOpen = isStoreOpen(project);

  const bg = '#F8FAFC'; // Ice White
  const surface = '#FFFFFF';
  const text = '#0F172A';
  const textMuted = '#64748B';
  const border = 'rgba(15, 23, 42, 0.08)';
  const accent = theme.primary || '#0284C7'; // Ice Titanium Blue

  const [selectedService, setSelectedService] = useState<string>(services[0]?.name || '');

  // Pre-fill WhatsApp message with the exact chosen service
  const baseWaNumber = (project.socials?.whatsapp?.number || project.location?.phone || '').replace(/\D/g, '');
  const customWaUrl = baseWaNumber
    ? `https://wa.me/${baseWaNumber}?text=${encodeURIComponent(
        `Olá! Gostaria de agendar o serviço: ${selectedService || 'atendimento'}.`
      )}`
    : getWhatsAppUrl(project);

  const heroPhoto = project.usePhotos !== false && (identity.bannerUrl || photos[0]?.url);

  return (
    <div
      className="w-full space-y-8 animate-fadeIn p-4 sm:p-8 rounded-3xl"
      style={{ backgroundColor: bg, color: text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* 1. CRISP ICE HEADER */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: border }}>
        <div className="flex items-center gap-3">
          {renderFreeLogo(project, '', 'left')}
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-sky-600">
            {identity.badge || 'EXECUTIVE CONCIERGE'}
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono font-bold text-slate-700">
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span>{isOpen ? 'ONLINE HOJE' : 'AGENDAMENTOS'}</span>
        </div>
      </div>

      {/* 2. ICE WHITE HERO SHOWCASE */}
      <div className="space-y-4 text-center max-w-lg mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {identity.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {identity.slogan}
        </p>

        {heroPhoto && (
          <div
            className="rounded-3xl overflow-hidden aspect-[16/9] shadow-md border cursor-pointer mt-4 group"
            style={{ borderColor: border }}
            onClick={() => onPhotoClick && onPhotoClick(heroPhoto)}
          >
            <img
              src={heroPhoto}
              alt={identity.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}
      </div>

      {/* 3. INTERACTIVE CONCIERGE SERVICE SELECTOR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            SELECIONE SEU SERVIÇO
          </span>
          <span className="text-[10px] font-mono text-sky-600 font-bold">1-CLIQUE WHATSAPP</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((s) => {
            const isSelected = selectedService === s.name;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedService(s.name)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xl border-slate-900 scale-[1.01]'
                    : 'bg-white text-slate-800 hover:border-sky-300 shadow-sm'
                }`}
                style={{ borderColor: isSelected ? '#0F172A' : border }}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm">{s.name}</h3>
                    <CheckCircle
                      size={16}
                      className={isSelected ? 'text-sky-400 fill-sky-400/20' : 'text-slate-300'}
                    />
                  </div>
                  <p className={`text-xs leading-relaxed font-light ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: isSelected ? 'rgba(255,255,255,0.1)' : border }}>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-sky-300' : 'text-slate-400'}`}>
                    {isSelected ? 'SELECIONADO' : 'TOQUE PARA ESCOLHER'}
                  </span>
                  <ChevronRight size={14} className={isSelected ? 'text-sky-400' : 'text-slate-400'} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CONCIERGE CALL-TO-ACTION (Synced with selected service) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block">
            CONFIRMAÇÃO DIRETA
          </span>
          <h4 className="text-base font-bold">
            Agendar: <span className="text-sky-300">{selectedService || 'Atendimento'}</span>
          </h4>
          <p className="text-xs text-slate-400">
            Clique abaixo para abrir o WhatsApp com seu serviço pré-selecionado.
          </p>
        </div>

        <a
          href={customWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-500/30 transition-transform active:scale-95 shrink-0"
        >
          <BrandWhatsApp size={16} />
          <span>CONFIRMAR HORÁRIO</span>
        </a>
      </div>

      {/* 5. LOCATION & GOOGLE */}
      {location?.address && (
        <div className="p-5 rounded-2xl bg-white border flex items-start gap-3 shadow-sm" style={{ borderColor: border }}>
          <MapPin size={18} className="text-sky-600 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">ENDEREÇO</span>
            <p className="text-xs font-medium text-slate-800">{location.address}</p>
            {location.mapsUrl && (
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline pt-1"
              >
                <BrandGoogleMaps size={13} />
                <span>Abrir rota no Maps</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* 6. FLOATING WHATSAPP BUTTON */}
      <a
        href={customWaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        title="Falar no WhatsApp"
      >
        <BrandWhatsApp size={28} className="text-slate-950" />
      </a>
    </div>
  );
};
