import React, { useState } from 'react';
import { NichoId, NichoInfo, TemplateDefinition } from '../types';
import { NICHOS_LIST, getTemplatesByNicho } from './data';
import { NicheIcon3D } from '../components/NicheIcon3D';
import { TemplateRenderer } from '../preview/TemplateRenderer';
import {
  Sparkles,
  ArrowLeft,
  Eye,
  Check,
  X,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  Award
} from 'lucide-react';

interface TemplatesLibraryProps {
  onSelectTemplate: (template: TemplateDefinition) => void;
  userId: string;
  initialNichoId?: NichoId | null;
  onClearInitialNicho?: () => void;
}

/**
 * Authentic miniature mockup representing the real visual composition of each layout
 */
const ModelLayoutWireframe: React.FC<{
  template: TemplateDefinition;
  nicho: NichoInfo;
}> = ({ template, nicho }) => {
  const layout = template.layout;
  const primaryColor = template.defaultTheme.primary || nicho.accentColor;
  const photoUrl = template.defaultData.photos[0]?.url || nicho.coverImage;
  const secondPhotoUrl = template.defaultData.photos[1]?.url || photoUrl;

  // 01 — CINEMATIC: Logo solta, hero escuro com iluminação, fotografia grande, preto + dourado
  if (layout === 'cinematic') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#07080D] border border-white/15 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] saturate-[1.2]"
          style={{ backgroundImage: `url(${photoUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080D] via-[#07080D]/60 to-transparent" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        {/* Top Floating Logo (Livre, contain, sem círculo forçado) */}
        <div className="relative z-10 text-center pt-2">
          <div className="w-8 h-8 mx-auto flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <span className="text-[7px] font-mono tracking-widest uppercase block mt-1" style={{ color: primaryColor }}>
            {template.defaultData.identity.badge || 'PREMIUM'}
          </span>
          <div className="text-[11px] font-black text-white tracking-tight uppercase line-clamp-1">
            {template.name}
          </div>
        </div>

        {/* Hero Photo & Content */}
        <div className="relative z-10 space-y-1.5 pb-1">
          <div className="h-1.5 w-16 bg-white/40 rounded-full mx-auto" />
          <div className="h-1 w-24 bg-white/20 rounded-full mx-auto" />

          {/* Noble CTA Button */}
          <div
            className="w-full py-1.5 rounded-lg text-[9px] font-black text-slate-950 text-center shadow-lg uppercase tracking-wider flex items-center justify-center gap-1"
            style={{ backgroundColor: primaryColor }}
          >
            <span>WhatsApp Direto</span>
          </div>

          {/* Mini Cards preview */}
          <div className="grid grid-cols-2 gap-1 pt-1">
            <div className="p-1 rounded bg-white/5 border border-white/10 text-[6px] text-slate-300 truncate">
              {template.defaultData.services[0]?.name || 'Especialidade'}
            </div>
            <div className="p-1 rounded bg-white/5 border border-white/10 text-[6px] text-slate-300 truncate">
              {template.defaultData.services[1]?.name || 'Atendimento VIP'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 02 — EDITORIAL: Tipografia gigante, foto vertical assimétrica, estilo revista de luxo, sem cards
  if (layout === 'editorial') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#0A0B10] border border-white/15 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        {/* Editorial Header bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-1">
          <div className="text-[7px] font-mono tracking-widest text-slate-400 uppercase">ED. 2026</div>
          <div className="text-[7px] font-black uppercase" style={{ color: primaryColor }}>
            ATELIER
          </div>
        </div>

        {/* Huge Display Typography */}
        <div className="space-y-1 my-auto">
          <div className="text-sm font-light text-white tracking-tighter uppercase leading-none font-serif">
            {template.name.split(' ')[0]} <br />
            <span className="font-bold italic" style={{ color: primaryColor }}>
              {template.name.split(' ')[1] || 'EXPERIENCE'}
            </span>
          </div>
          <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
        </div>

        {/* Asymmetrical Vertical Photo */}
        <div className="relative rounded-lg overflow-hidden h-20 border border-white/15 my-1">
          <img
            src={secondPhotoUrl}
            alt=""
            className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all"
          />
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-black/70 text-[6px] font-mono text-white">
            PROPOSTA OFICIAL
          </div>
        </div>

        {/* Services as large text words (NO cards) */}
        <div className="space-y-0.5 border-t border-white/10 pt-1.5">
          <div className="text-[7px] font-bold text-white tracking-wider uppercase truncate">
            {template.defaultData.services[0]?.name || 'SERVIÇO PRINCIPAL'}
          </div>
          <div className="text-[6px] text-slate-400 truncate">
            {template.defaultData.services[1]?.name || 'TRATAMENTO VIP'}
          </div>
          <div className="pt-1 flex items-center justify-between text-[7px] font-bold" style={{ color: primaryColor }}>
            <span>CONHECER PROPOSTA</span>
            <span>→</span>
          </div>
        </div>
      </div>
    );
  }

  // 03 — GLASS: Hero full-screen fotográfico, card translúcido flutuante com blur, botões de vidro
  if (layout === 'glass') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-slate-950 border border-white/15 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] blur-[1px]"
          style={{ backgroundImage: `url(${photoUrl})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Top Free PNG Logo */}
        <div className="relative z-10 flex justify-between items-center">
          <div className="w-6 h-6 flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[6px] text-white font-bold uppercase">
            Glass Look
          </span>
        </div>

        {/* Floating Translucent Glass Card */}
        <div className="relative z-10 p-2.5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl text-center space-y-1">
          <div className="text-[10px] font-extrabold text-white truncate">{template.name}</div>
          <div className="text-[6px] text-slate-200 line-clamp-1">{template.defaultData.location.city}</div>
          <div className="flex gap-1 justify-center pt-1">
            <div className="px-1.5 py-0.5 rounded-md bg-white/15 border border-white/20 text-[6px] text-white">
              WhatsApp
            </div>
            <div className="px-1.5 py-0.5 rounded-md bg-white/15 border border-white/20 text-[6px] text-white">
              Instagram
            </div>
          </div>
        </div>

        {/* Frosted Services preview */}
        <div className="relative z-10 space-y-1">
          <div className="p-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-[6px] text-white flex justify-between">
            <span className="truncate">{template.defaultData.services[0]?.name || 'Especialidade'}</span>
            <span className="text-amber-300">★</span>
          </div>
          <div className="p-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-[6px] text-white flex justify-between">
            <span className="truncate">{template.defaultData.services[1]?.name || 'Especialidade'}</span>
            <span className="text-amber-300">★</span>
          </div>
        </div>
      </div>
    );
  }

  // 04 — IMMERSIVE: Capítulos visuais com fotografia dominante em tela cheia
  if (layout === 'immersive') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-black border border-white/15 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.45] saturate-[1.2]"
          style={{ backgroundImage: `url(${photoUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Chapter 1: Logo & Title directly on photo */}
        <div className="relative z-10 space-y-1">
          <div className="w-7 h-7">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <div className="text-[12px] font-black text-white uppercase leading-none drop-shadow-md">
            {template.name}
          </div>
        </div>

        {/* Chapter 2: The Manifesto */}
        <div className="relative z-10 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 space-y-1">
          <div className="text-[6px] font-mono tracking-widest text-amber-300 uppercase">MANIFESTO</div>
          <div className="text-[8px] font-light text-slate-100 italic leading-tight">
            "Mais que um serviço, uma assinatura de excelência."
          </div>
        </div>

        {/* Chapter 3: Photo cards */}
        <div className="relative z-10 flex gap-1">
          <div className="flex-1 h-10 rounded-lg overflow-hidden border border-white/20 relative">
            <img src={secondPhotoUrl} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-0.5 text-[6px] text-white font-bold text-center">
              Especialidades
            </div>
          </div>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[7px] font-bold text-slate-950 text-center"
            style={{ backgroundColor: primaryColor }}
          >
            VIP
          </div>
        </div>
      </div>
    );
  }

  // 05 — MINIMAL LUXURY: Fundo CLARO / OFF-WHITE, preto, detalhes discretos, muito respiro
  if (layout === 'minimal') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#FAF9F6] border border-stone-300/80 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-stone-500 transition-all duration-300">
        {/* Generous negative space & Minimal Header */}
        <div className="text-center pt-2 space-y-1">
          <div className="w-7 h-7 mx-auto flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <div className="text-[6px] tracking-[0.25em] text-stone-500 uppercase font-mono">
            ESTABELECIMENTO AUTORAL
          </div>
          <div className="text-xs font-medium text-stone-900 tracking-tight font-serif">
            {template.name}
          </div>
        </div>

        {/* Clean Photography Frame */}
        <div className="rounded-xl overflow-hidden aspect-[16/10] border border-stone-200 shadow-sm my-1">
          <img src={photoUrl} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Minimal Typographic Services with Hairlines */}
        <div className="space-y-1.5 border-t border-stone-200 pt-2">
          <div className="flex justify-between items-center text-[7px] text-stone-800">
            <span className="font-medium truncate">{template.defaultData.services[0]?.name || 'Especialidade 01'}</span>
            <span className="text-stone-400 font-serif">●</span>
          </div>
          <div className="flex justify-between items-center text-[7px] text-stone-800">
            <span className="font-medium truncate">{template.defaultData.services[1]?.name || 'Especialidade 02'}</span>
            <span className="text-stone-400 font-serif">●</span>
          </div>

          <div className="pt-1">
            <div className="w-full py-1.5 rounded-lg bg-stone-900 text-stone-50 text-[7px] font-bold text-center tracking-wider uppercase">
              Contato Direto
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 06 — URBAN BRUTALIST: Preto, cinzas industriais, tipografia marcante em blocos, numeração [01]
  if (layout === 'urban') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#090A0F] border border-white/20 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-cyan-400/60 transition-all duration-300">
        <div className="flex justify-between items-center border-b border-white/10 pb-1">
          <span className="text-[6px] font-mono text-cyan-400 tracking-widest">[URBAN_TECH]</span>
          <span className="text-[6px] font-mono text-slate-400">#06</span>
        </div>

        <div className="space-y-1 my-1">
          <div className="text-sm font-black text-white uppercase tracking-tighter leading-none font-mono">
            {template.name}
          </div>
          <div className="h-0.5 w-10 bg-cyan-400" />
        </div>

        {/* Industrial Grids */}
        <div className="grid grid-cols-2 gap-1 my-1">
          <div className="h-14 rounded bg-white/5 border border-white/15 overflow-hidden">
            <img src={photoUrl} alt="" className="w-full h-full object-cover filter contrast-150" />
          </div>
          <div className="h-14 rounded bg-[#131520] border border-cyan-400/30 p-1 flex flex-col justify-between text-[6px] font-mono text-slate-300">
            <span>[01] DIAGNÓSTICO</span>
            <span>[02] PRECISÃO</span>
            <span className="text-cyan-400 font-bold">100% EXECUTIVO</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-full py-1.5 rounded bg-cyan-500 text-slate-950 text-[8px] font-mono font-black text-center uppercase tracking-wider">
            CHAMAR AGORA // WA
          </div>
        </div>
      </div>
    );
  }

  // 07 — CLASSIC CLUB: Marrom escuro, couro (#130C08), dourado envelhecido, serifas nobres
  if (layout === 'classic-club') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#130C08] border border-[#3E2718] relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-[#C59B27] transition-all duration-300">
        <div className="text-center pt-1 border-b border-[#3E2718] pb-1.5">
          <div className="w-7 h-7 mx-auto flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <div className="text-[6px] font-serif tracking-[0.2em] text-[#C59B27] uppercase">
            TRADIÇÃO & CLUBE PRIVADO
          </div>
          <div className="text-xs font-serif font-bold text-[#FDFBF7] tracking-tight">
            {template.name}
          </div>
        </div>

        {/* Leather textured frame */}
        <div className="rounded-lg overflow-hidden h-18 border border-[#4A301E] relative my-1">
          <img src={secondPhotoUrl} alt="" className="w-full h-full object-cover filter sepia-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130C08] via-transparent to-transparent" />
        </div>

        {/* Classic Specialties */}
        <div className="space-y-1 border-t border-[#3E2718] pt-1.5">
          <div className="text-[6px] font-serif text-[#D7C2B2] truncate">
            ✦ {template.defaultData.services[0]?.name || 'Atendimento Nobre'}
          </div>
          <div className="text-[6px] font-serif text-[#D7C2B2] truncate">
            ✦ {template.defaultData.services[1]?.name || 'Experiência Tradicional'}
          </div>

          <div className="w-full py-1.5 rounded bg-[#C59B27] text-[#130C08] text-[7px] font-serif font-bold text-center tracking-wider uppercase shadow-md">
            Agendar Atendimento
          </div>
        </div>
      </div>
    );
  }

  // 08 — MOTION: Efeitos luminosos dinâmicos, cards com alto contraste e botões vibrantes
  if (layout === 'motion') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#0A0714] border border-fuchsia-500/30 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-fuchsia-400 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-fuchsia-600/30 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="w-7 h-7 flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <span className="px-1.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-[6px] font-bold uppercase animate-pulse">
            LIVE MOTION
          </span>
        </div>

        <div className="relative z-10 space-y-1 my-1">
          <div className="text-xs font-black text-white uppercase tracking-tight">
            {template.name}
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-fuchsia-500 to-amber-400 rounded-full" />
        </div>

        {/* Dynamic Photo Showcase */}
        <div className="relative z-10 rounded-xl overflow-hidden h-18 border border-white/20 shadow-lg">
          <img src={photoUrl} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 space-y-1">
          <div className="p-1 rounded-lg bg-white/10 backdrop-blur-md border border-fuchsia-400/40 text-[6px] text-white flex justify-between items-center">
            <span className="truncate">{template.defaultData.services[0]?.name || 'Especialidade'}</span>
            <span className="text-fuchsia-400 font-bold">⚡</span>
          </div>

          <div className="w-full py-1.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-amber-400 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider shadow-lg shadow-fuchsia-500/25">
            CONECTAR AGORA
          </div>
        </div>
      </div>
    );
  }

  // 09 — PROFILE: Foco no profissional individual, foto de perfil grande, história pessoal e agenda
  if (layout === 'profile') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#080A12] border border-white/15 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/60 transition-all duration-300">
        {/* Top Tag */}
        <div className="flex justify-between items-center">
          <span className="text-[6px] font-mono uppercase tracking-widest text-amber-400">
            ESPECIALISTA OFICIAL
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Large Portrait Cutout of the Specialist */}
        <div className="text-center space-y-1 my-1">
          <div className="w-14 h-14 rounded-full p-0.5 mx-auto bg-gradient-to-tr from-amber-400 to-amber-600 shadow-xl overflow-hidden">
            <img src={secondPhotoUrl} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="text-xs font-black text-white leading-none">
            {template.defaultData.identity.name}
          </div>
          <div className="text-[6px] text-slate-400 line-clamp-1">
            {template.defaultData.identity.badge || 'Consultor / Especialista Autorizado'}
          </div>
        </div>

        {/* Bio Manifesto */}
        <div className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-[6px] text-slate-300 leading-relaxed text-center line-clamp-2">
          "Mais de 10 anos de experiência transformando expectativas em resultados excepcionais."
        </div>

        {/* Direct Specialist WhatsApp */}
        <div className="space-y-1">
          <div className="w-full py-1.5 rounded-xl bg-emerald-500 text-white text-[7px] font-black text-center uppercase tracking-wider shadow-lg flex items-center justify-center gap-1">
            <span>Falar com o Profissional</span>
          </div>
        </div>
      </div>
    );
  }

  // 10 — SIGNATURE: Modelo mais sofisticado, assimétrico, selo de assinatura, reviews VIP, concierge
  return (
    <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#06070B] border border-amber-500/30 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400 transition-all duration-300">
      <div className="flex justify-between items-center">
        <span className="text-[6px] font-serif tracking-[0.2em] text-amber-300 uppercase">
          SIGNATURE SERIES
        </span>
        <div className="flex items-center text-amber-400 text-[8px]">★★★★★</div>
      </div>

      <div className="space-y-1 my-1">
        <div className="text-xs font-black text-white tracking-tight uppercase">
          {template.name}
        </div>
        <div className="text-[6px] text-slate-400 italic">Edição Exclusiva de Alto Padrão</div>
      </div>

      {/* Asymmetric Photo Frame with Signature Seal */}
      <div className="relative rounded-xl overflow-hidden h-18 border border-amber-500/40 shadow-xl">
        <img src={photoUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[6px] font-black uppercase shadow-lg">
          SELO VIP
        </div>
      </div>

      <div className="space-y-1 border-t border-white/10 pt-1.5">
        <div className="flex items-center justify-between text-[6px] text-slate-300">
          <span>Avaliação Google (5.0)</span>
          <span className="text-amber-400 font-bold">100% Recomendado</span>
        </div>

        <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider shadow-lg shadow-amber-500/20">
          Concierge WhatsApp VIP
        </div>
      </div>
    </div>
  );
};

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  onSelectTemplate,
  userId,
  initialNichoId = null,
  onClearInitialNicho
}) => {
  const [selectedNicho, setSelectedNicho] = useState<NichoInfo | null>(() => {
    if (initialNichoId) {
      return NICHOS_LIST.find((n) => n.id === initialNichoId) || null;
    }
    return null;
  });

  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinition | null>(null);
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // ==========================================
  // VIEW: 10 MODELS FOR SELECTED NICHE
  // ==========================================
  if (selectedNicho) {
    const templates = getTemplatesByNicho(selectedNicho.id);

    return (
      <div className="space-y-8 animate-fadeIn pb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <button
            onClick={() => {
              setSelectedNicho(null);
              if (onClearInitialNicho) onClearInitialNicho();
            }}
            className="group flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ArrowLeft size={16} className="text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar aos Nichos</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedNicho.accentColor }}
            />
            <span>{selectedNicho.name}</span>
          </div>
        </div>

        {/* Niche Header (Clean, Premium, Direct) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#090B14] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md shadow-xl">
              <NicheIcon3D nichoId={selectedNicho.id} size="lg" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {selectedNicho.name}
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
                Escolha o estilo ideal para sua marca.
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold font-mono">
            10 Modelos Disponíveis
          </div>
        </div>

        {/* Grid of 10 Distinct Models */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {templates.map((tmpl, idx) => {
            const modelNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={tmpl.id}
                className="group rounded-3xl border border-white/10 hover:border-amber-400/50 bg-[#0B0D18] p-3 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
              >
                {/* Real Miniature Preview Wireframe */}
                <div className="w-full mb-3 cursor-pointer" onClick={() => setPreviewTemplate(tmpl)}>
                  <ModelLayoutWireframe template={tmpl} nicho={selectedNicho} />
                </div>

                {/* Model Title & Style */}
                <div className="space-y-1 mb-3 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase text-amber-400 font-mono">
                      MODELO {modelNumber}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      {tmpl.styleName.split(' ')[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-white truncate">
                    {tmpl.styleName}
                  </h4>
                </div>

                {/* Action Buttons: [ VISUALIZAR ] [ USAR MODELO ] */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-[11px] font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    title="Visualizar Demo"
                  >
                    <Eye size={13} className="text-slate-400" />
                    <span>Visualizar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTemplate(tmpl)}
                    className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md shadow-amber-600/20 active:scale-95"
                    title="Usar Este Modelo no Editor"
                  >
                    <Check size={13} />
                    <span>Usar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Preview Modal (Mobile 390px, Tablet, Desktop) */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
            <div className="w-full max-w-5xl h-[92vh] bg-[#07080D] border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
              {/* Modal Header */}
              <div className="h-14 px-6 border-b border-white/10 bg-[#0A0C14] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-extrabold text-sm text-white">
                    Preview: {previewTemplate.name}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    • {selectedNicho.name} ({previewTemplate.styleName})
                  </span>
                </div>

                {/* Viewport Toggles (Default: Mobile 390px) */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('mobile')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewViewport === 'mobile'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Mobile (390px)"
                  >
                    <Smartphone size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('tablet')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewViewport === 'tablet'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Tablet"
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewViewport('desktop')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      previewViewport === 'desktop'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização Desktop"
                  >
                    <Monitor size={16} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(null)}
                  className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Renderer Container */}
              <div className="flex-1 overflow-y-auto bg-[#05060A] flex justify-center py-6">
                <TemplateRenderer
                  project={{
                    ...previewTemplate.defaultData,
                    projectId: `preview_${previewTemplate.id}`,
                    userId: userId,
                    nome: previewTemplate.name,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                  }}
                  viewport={previewViewport}
                />
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="h-16 px-6 bg-[#0A0C14] border-t border-white/10 flex items-center justify-between shrink-0">
                <div className="text-xs text-slate-400 hidden sm:block">
                  Gostou deste modelo? Clique ao lado para carregá-lo no editor.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 cursor-pointer"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const t = previewTemplate;
                      setPreviewTemplate(null);
                      onSelectTemplate(t);
                    }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer"
                  >
                    <Check size={16} />
                    <span>Usar Este Modelo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN NICHE CATALOG (Clean, 3D Icons, No Bloated Covers)
  // ==========================================
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Cinematic Showcase Header */}
      <div className="relative rounded-3xl overflow-hidden border border-white/15 p-6 sm:p-10 shadow-2xl bg-gradient-to-br from-[#0E111C] via-[#090B14] to-[#05060A]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Sparkles size={14} className="text-amber-400" />
            BIO FÁCIL • 100 MODELOS
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Escolha seu Nicho <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              100 Biosites Únicos
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Selecione o seu segmento para acessar os 10 modelos desenvolvidos com propostas visuais autênticas.
          </p>
        </div>
      </div>

      {/* Grid of the 10 Niches (High Relief 3D Icons, No Bloated Covers) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {NICHOS_LIST.map((nicho) => (
          <div
            key={nicho.id}
            onClick={() => setSelectedNicho(nicho)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 bg-[#0B0D18] hover:bg-[#101322] p-5 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_16px_35px_rgba(0,0,0,0.8)] hover:-translate-y-1 flex flex-col items-center text-center justify-between min-h-[210px]"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-12 inset-x-0 mx-auto w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
              style={{ backgroundColor: nicho.accentColor }}
            />

            {/* 3D-Like High Relief Protagonist Icon */}
            <div className="relative z-10 w-20 h-20 my-auto flex items-center justify-center p-2 rounded-2xl bg-black/40 border border-white/10 group-hover:border-white/25 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <NicheIcon3D nichoId={nicho.id} size="xl" />
            </div>

            {/* Title & 10 Modelos */}
            <div className="relative z-10 space-y-1 pt-3 border-t border-white/5 w-full">
              <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase leading-snug">
                {nicho.name}
              </h3>
              <span className="text-[11px] font-bold text-slate-400 block font-mono">
                10 modelos
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
