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
  Monitor
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
  const modelIndex = template.index;
  const primaryColor = template.defaultTheme.primary || nicho.accentColor;
  const photoUrl = template.defaultData.photos[0]?.url || nicho.coverImage;
  const secondPhotoUrl = template.defaultData.photos[1]?.url || photoUrl;

  // MODELO 01 — GRAPHIC BIO / PREMIERE (Ad blocks, 3D mockups, verified badge, golden aura)
  if (modelIndex === 1 || layout === 'graphic-bio' || layout === 'cinematic') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#08080C] border border-amber-500/25 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400/70 transition-all duration-300">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none bg-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        <div className="relative z-10 text-center pt-1">
          <div className="w-12 h-12 mx-auto rounded-full overflow-hidden border border-amber-400/50 shadow-lg relative mb-1">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-black text-white tracking-tight uppercase">
            <span>{template.name.split(' ')[0]}</span>
            <span className="text-amber-400 text-[8px]">✓</span>
          </div>
          <div className="text-[6px] font-mono tracking-widest text-amber-300 uppercase">MAIS PROCURADO</div>
        </div>

        <div className="relative z-10 space-y-1.5 pb-1">
          {/* Action Graphic Card */}
          <div className="p-1.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-black border border-amber-500/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[6px] font-bold text-amber-400 uppercase">🔥 MAIS PEDIDO</span>
              <div className="text-[7px] font-black text-white truncate max-w-[90px]">
                {template.defaultData.services[0]?.name || 'Corte & Barba'}
              </div>
            </div>
            <div className="w-5 h-5 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center text-[8px] font-black">
              ★
            </div>
          </div>

          <div
            className="w-full py-1.5 rounded-xl text-[8px] font-black text-slate-950 text-center shadow-lg uppercase tracking-wider bg-gradient-to-r from-amber-400 to-amber-500"
          >
            Agendar Horário
          </div>
        </div>
      </div>
    );
  }

  // MODELO 02 — EDITORIAL ATELIER / IVORY LIGHT (100% CLARO - Off-white, Magazine Serif, Vertical Frame)
  if (modelIndex === 2 || layout === 'editorial') {
    const editBg = '#FAF7F2';
    const editText = '#111111';

    return (
      <div
        className="w-full aspect-[9/13] rounded-2xl overflow-hidden border border-stone-300 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-stone-500 transition-all duration-300"
        style={{ backgroundColor: editBg, color: editText }}
      >
        <div className="flex items-center justify-between border-b border-stone-300 pb-1">
          <div className="text-[7px] font-mono tracking-widest text-stone-500 uppercase">EDITION • VOL. I</div>
          <div className="text-[7px] font-black uppercase text-amber-800">
            AUTORAL
          </div>
        </div>

        <div className="space-y-1 my-auto">
          <div className="text-[11px] font-serif tracking-tighter uppercase leading-none text-stone-900">
            {template.name.split(' ')[0]} <br />
            <span className="font-bold italic text-amber-800">
              {template.name.split(' ')[1] || 'ATELIER'}
            </span>
          </div>
          <div className="w-6 h-0.5 bg-amber-800" />
        </div>

        <div className="relative rounded-lg overflow-hidden h-16 border border-stone-200 my-1">
          <img src={secondPhotoUrl} alt="" className="w-full h-full object-cover filter contrast-105" />
          <div className="absolute bottom-1 left-1.5 px-1 py-0.5 rounded bg-stone-900/80 text-[6px] font-mono text-white">
            PROPOSTA OFICIAL
          </div>
        </div>

        <div className="space-y-0.5 border-t border-stone-200 pt-1.5">
          <div className="text-[7px] font-bold tracking-wider uppercase truncate text-stone-900">
            {template.defaultData.services[0]?.name || 'SERVIÇO PRINCIPAL'}
          </div>
          <div className="flex items-center justify-between text-[7px] font-bold text-amber-800 pt-1">
            <span>SOLICITAR AGENDAMENTO</span>
            <span>→</span>
          </div>
        </div>
      </div>
    );
  }

  // MODELO 03 — URBAN / NEO-BRUTALIST (Industrial graphite, technical [01] codes, 0px border-radius)
  if (modelIndex === 3 || layout === 'brutalist' || layout === 'urban') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#141517] border-2 border-white/25 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-400 transition-all duration-300 font-mono">
        <div className="flex justify-between items-center border-b border-white/20 pb-1">
          <span className="text-[6px] tracking-widest font-black text-amber-400">
            [SYS.03]
          </span>
          <span className="text-[6px] text-slate-400 uppercase">RAW URBAN</span>
        </div>

        <div className="space-y-1 my-1">
          <div className="text-[11px] font-black text-white uppercase tracking-tighter leading-none">
            {template.name}
          </div>
          <div className="h-0.5 w-8 bg-amber-400" />
        </div>

        <div className="grid grid-cols-2 gap-1 my-1">
          <div className="h-12 bg-white/5 border border-white/20 overflow-hidden">
            <img src={photoUrl} alt="" className="w-full h-full object-cover filter contrast-125" />
          </div>
          <div className="h-12 bg-[#1C1C22] border border-white/10 p-1 flex flex-col justify-between text-[6px] text-slate-300">
            <span>[01] THE FADE</span>
            <span>[02] SCULPT</span>
            <span className="font-bold text-amber-400">PRECISÃO //</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-full py-1.5 bg-amber-400 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider shadow-[2px_2px_0px_#FFFFFF]">
            AGENDAR SESSÃO ➔
          </div>
        </div>
      </div>
    );
  }

  // MODELO 04 — MINIMAL CLEAN / PURE WHITE (100% CLARO - Pure White #FFFFFF, Zero Fotos Obrigatórias)
  if (modelIndex === 4 || layout === 'minimal') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-white border border-slate-200 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-slate-400 transition-all duration-300">
        <div className="text-center pt-2 space-y-1">
          <div className="w-7 h-7 mx-auto flex items-center justify-center">
            <NicheIcon3D nichoId={nicho.id} size="sm" />
          </div>
          <div className="text-[6px] tracking-[0.25em] text-slate-400 uppercase font-mono">
            ESTABELECIMENTO AUTORAL
          </div>
          <div className="text-[11px] font-semibold text-slate-900 tracking-tight">
            {template.name}
          </div>
          <div className="text-[6px] text-slate-500 font-light px-2 line-clamp-2">
            {template.defaultData.identity.slogan}
          </div>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 my-1 space-y-1">
          <div className="flex justify-between items-center text-[7px] text-slate-800">
            <span className="font-medium truncate">{template.defaultData.services[0]?.name || 'Especialidade 01'}</span>
            <span className="text-slate-400">●</span>
          </div>
          <div className="flex justify-between items-center text-[7px] text-slate-800">
            <span className="font-medium truncate">{template.defaultData.services[1]?.name || 'Especialidade 02'}</span>
            <span className="text-slate-400">●</span>
          </div>
          <div className="flex justify-between items-center text-[7px] text-slate-800">
            <span className="font-medium truncate">{template.defaultData.services[2]?.name || 'Especialidade 03'}</span>
            <span className="text-slate-400">●</span>
          </div>
        </div>

        <div className="space-y-1 border-t border-slate-100 pt-1.5">
          <div className="w-full py-1.5 rounded-lg bg-slate-900 text-white text-[7px] font-bold text-center tracking-wider uppercase">
            Contato Direto
          </div>
        </div>
      </div>
    );
  }

  // MODELO 05 — VINTAGE HERITAGE / CLASSIC CLUB (Dark Tobacco, Bourbon Copper, Wood & Brass)
  if (modelIndex === 5 || layout === 'classic-club') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#160E0A] border border-[#3F281B] relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-amber-600/70 transition-all duration-300 font-serif">
        <div className="text-center border-b border-[#3F281B] pb-1 space-y-0.5">
          <span className="text-[6px] font-mono tracking-widest uppercase text-amber-500 block">EST. 2016 • TRADIÇÃO</span>
          <div className="text-[10px] font-black text-[#FDFBF7] uppercase tracking-tight truncate">
            {template.name}
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden h-14 border border-[#3F281B] my-1">
          <img src={photoUrl} alt="" className="w-full h-full object-cover filter sepia-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160E0A] via-transparent to-transparent" />
        </div>

        <div className="space-y-1 border-t border-[#3F281B] pt-1">
          <div className="p-1 rounded bg-[#221610] border border-[#3F281B] text-[6px] text-amber-200/80 space-y-0.5">
            <div>Terça a Sábado: 09h às 20h</div>
            <div className="text-amber-400 font-sans">★★★★★ 4.9 no Google</div>
          </div>

          <div className="w-full py-1.5 rounded-xl bg-amber-600 text-white text-[7px] font-black text-center uppercase tracking-wider font-sans">
            Agendar Atendimento
          </div>
        </div>
      </div>
    );
  }

  // MODELO 06 — SPORT & PERFORMANCE / POSTER (Navy & Orange, Marcos Willian inspired)
  if (modelIndex === 6 || layout === 'profile-poster' || layout === 'sport') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#0A1329] border border-orange-500/30 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-orange-400 transition-all duration-300">
        <div className="flex justify-between items-center border-b border-white/10 pb-1">
          <span className="text-[6px] font-mono font-bold text-orange-400 uppercase">PRO PERFORMANCE</span>
          <div className="flex gap-0.5">
            <span className="w-2.5 h-1 rounded-full bg-orange-500" />
            <span className="w-1 h-1 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="relative my-auto text-center space-y-1">
          <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden border border-orange-500/40 shadow-xl relative">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="text-[10px] font-black italic uppercase text-white tracking-tight leading-none">
            {template.name.split(' ')[0]}
          </div>
          <div className="text-[6px] font-black text-orange-400 uppercase">
            NÃO É SÓ UM CORTE. É IDENTIDADE.
          </div>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-white/5 text-[6px] text-center">
            <div><span className="font-bold text-orange-400">+4.500</span> Cortes</div>
            <div><span className="font-bold text-white">5.0 ★</span> Google</div>
          </div>
          <div className="w-full py-1.5 rounded-full bg-orange-500 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider">
            Garantir Horário ▾
          </div>
        </div>
      </div>
    );
  }

  // MODELO 07 — NORDIC SAND / SCANDINAVIAN LIGHT (100% CLARO - Warm Sand #F4F1EA, Lookbook)
  if (modelIndex === 7 || layout === 'magazine' || layout === 'nordic') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#F4F1EA] border border-stone-300 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-stone-500 transition-all duration-300 font-sans text-[#22252A]">
        <div className="flex justify-between items-center border-b border-stone-300/80 pb-1">
          <span className="text-[6px] font-mono font-bold uppercase text-stone-500">NORDIC CONCEPT</span>
          <span className="text-[6px] font-bold text-emerald-800">● ABERTO</span>
        </div>

        <div className="space-y-1 my-1">
          <div className="text-[10px] font-light tracking-tight uppercase">
            {template.name}
          </div>
          <div className="h-10 rounded-xl overflow-hidden border border-stone-300 shadow-sm">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="p-1 rounded-lg bg-white border border-stone-200 text-[6px] space-y-0.5">
            <div className="font-medium truncate">{template.defaultData.services[0]?.name || 'Corte Nórdico'}</div>
            <div className="text-stone-500 truncate">{template.defaultData.services[1]?.name || 'Barba & Toalha'}</div>
          </div>
          <div className="w-full py-1.5 rounded-full bg-[#22252A] text-white text-[7px] font-medium text-center uppercase tracking-wider">
            Reservar Experiência
          </div>
        </div>
      </div>
    );
  }

  // MODELO 08 — BENTO GRID / MODERN MOSAIC (Midnight Teal & Neon Cyan)
  if (modelIndex === 8 || layout === 'bento') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#091E24] border border-cyan-400/30 relative p-2.5 flex flex-col justify-between shadow-2xl group-hover:border-cyan-400 transition-all duration-300">
        <div className="grid grid-cols-2 gap-1.5 h-full">
          <div className="col-span-2 p-1.5 rounded-xl bg-white/5 border border-cyan-400/20 flex items-center justify-between">
            <div>
              <div className="text-[6px] font-mono text-cyan-400">BENTO MOSAIC</div>
              <div className="text-[9px] font-black text-white uppercase truncate max-w-[90px]">{template.name}</div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]" />
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 relative">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="p-1.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between text-[6px]">
            <span className="text-cyan-300 font-bold">5.0 ★ NOTA</span>
            <span className="text-slate-300">Vagas Hoje</span>
            <span className="text-amber-400 font-bold">1-CLIQUE</span>
          </div>

          <div className="col-span-2">
            <div className="w-full py-1.5 rounded-xl bg-cyan-400 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider">
              Agendar no Bento
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MODELO 09 — ICE WHITE / LUXURY BARBERSHOP (100% CLARO - Pure Ice White #F8FAFC, Titanium Slate)
  if (modelIndex === 9 || layout === 'split-screen' || layout === 'ice-white') {
    return (
      <div className="w-full aspect-[9/13] rounded-2xl overflow-hidden bg-[#F8FAFC] border border-slate-200 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-sky-400 transition-all duration-300 font-sans text-slate-900">
        <div className="flex justify-between items-center border-b border-slate-200 pb-1">
          <span className="text-[6px] font-mono font-bold text-sky-600 uppercase">EXECUTIVE CONCIERGE</span>
          <span className="text-[6px] font-bold text-slate-500">ONLINE</span>
        </div>

        <div className="space-y-1 my-1 text-center">
          <div className="text-[10px] font-extrabold uppercase tracking-tight">
            {template.name}
          </div>
          <div className="h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="p-1.5 rounded-xl bg-slate-900 text-white text-[6px] flex items-center justify-between">
            <span className="font-bold">SELECIONADO:</span>
            <span className="text-sky-300 truncate max-w-[80px]">Corte Executivo</span>
          </div>
          <div className="w-full py-1.5 rounded-xl bg-sky-500 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider shadow-md">
            Confirmar Horário
          </div>
        </div>
      </div>
    );
  }

  // MODELO 10 — SIGNATURE PRESTIGE / BLACK & PLATINUM (Theatrical spot, cursive script, VIP Lounge)
  return (
    <div
      className="w-full aspect-[9/13] rounded-2xl overflow-hidden border border-slate-700/50 relative p-3 flex flex-col justify-between shadow-2xl group-hover:border-slate-400 transition-all duration-300 bg-[#050507]"
    >
      <div className="flex justify-between items-center">
        <span className="text-[6px] font-mono tracking-[0.2em] uppercase text-slate-300">
          SIGNATURE PRESTIGE
        </span>
        <div className="px-1.5 py-0.5 rounded-full bg-slate-800 border border-slate-600 text-slate-200 text-[6px] font-bold">
          VIP SEAL
        </div>
      </div>

      <div className="space-y-1 my-1">
        <div className="text-[10px] font-black text-white tracking-tight uppercase font-serif">
          {template.name}
        </div>
        <div className="text-[6px] text-slate-400 italic">Lounge Privativo & Experiência VIP</div>
      </div>

      <div className="relative rounded-xl overflow-hidden h-14 border border-slate-700/60 shadow-xl">
        <img src={photoUrl} alt="" className="w-full h-full object-cover filter contrast-110" />
      </div>

      <div className="space-y-1 border-t border-slate-800 pt-1.5">
        <div className="flex items-center justify-between text-[6px] text-slate-400">
          <span>Single Malt & Charutaria</span>
          <span className="font-bold text-slate-200">5.0 ★</span>
        </div>

        <div className="w-full py-1.5 rounded-xl bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 text-[7px] font-black text-center uppercase tracking-wider shadow-lg">
          Concierge Privativo
        </div>
      </div>
    </div>
  );
};

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  onSelectTemplate,
  userId: _userId,
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

  // ==========================================
  // VIEW: 10 MODELS FOR SELECTED NICHE
  // ==========================================
  if (selectedNicho) {
    const templates = getTemplatesByNicho(selectedNicho.id);

    return (
      <div className="space-y-8 animate-fadeIn pb-16">
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

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: selectedNicho.accentColor }}
            />
            <span className="uppercase tracking-wider">{selectedNicho.name}</span>
          </div>
        </div>

        {/* Niche Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0C0E1A] via-[#090B14] to-[#08080E] border border-white/10 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: selectedNicho.accentColor }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md shadow-xl shrink-0">
              <NicheIcon3D nichoId={selectedNicho.id} size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                  DIREÇÃO DE ARTE PROFISSIONAL
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {selectedNicho.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300/90 font-medium max-w-xl">
                10 direções visuais 100% autênticas com tipografia expressiva, recortes e alta conversão.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black font-mono tracking-wider shadow-lg">
              {templates.length} Designs Disponíveis
            </div>
          </div>
        </div>

        {/* Responsive Grid: Large Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {templates.map((tmpl, idx) => {
            const modelNumber = String(idx + 1).padStart(2, '0');
            const isLightModel = [2, 4, 7, 9].includes(idx + 1);

            return (
              <div
                key={tmpl.id}
                className="group rounded-3xl border border-white/10 hover:border-amber-400/50 bg-[#0B0D18] p-4 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)] relative hover:-translate-y-1"
              >
                {/* Real Miniature Preview Wireframe */}
                <div
                  className="w-full mb-3.5 cursor-pointer relative"
                  onClick={() => setPreviewTemplate(tmpl)}
                >
                  <ModelLayoutWireframe template={tmpl} nicho={selectedNicho} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-950 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5">
                      <Eye size={14} />
                      Preview
                    </span>
                  </div>
                </div>

                {/* Model Title & Style */}
                <div className="space-y-1.5 mb-4 px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-black text-amber-400">
                      MODELO {modelNumber}
                    </span>
                    {isLightModel ? (
                      <span className="text-[9px] font-black uppercase tracking-wider text-amber-950 bg-amber-200/90 px-2 py-0.5 rounded-full border border-amber-300">
                        100% Claro
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                        Dark
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-black text-white truncate" title={tmpl.styleName}>
                    {tmpl.styleName}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {tmpl.tagline}
                  </p>
                </div>

                {/* Action Buttons: [ PREVIEW ] [ USAR ] */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-xs font-bold text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Eye size={14} className="text-slate-400" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectTemplate(tmpl)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-600/25 active:scale-95"
                  >
                    <Check size={14} />
                    <span>Usar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Preview Modal (Mobile Frame on Desktop, Edge-to-Edge on Mobile) */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
            <div className="w-full sm:max-w-xl h-full sm:h-[95vh] bg-[#07080D] border-0 sm:border border-white/20 rounded-none sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden relative">
              {/* Discrete Top Bar: Preview • 390px [X] */}
              <div className="h-14 px-4 sm:px-6 border-b border-white/10 bg-[#0A0C14] flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Preview • 390px
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-[160px] sm:max-w-xs">
                    {previewTemplate.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTemplate(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                  >
                    <Check size={14} />
                    <span>Usar Modelo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(null)}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Fechar preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body: Realistic Mobile Device Shell */}
              <div className="flex-1 overflow-y-auto bg-slate-950 sm:p-6 flex justify-center items-start">
                <div className="w-full sm:w-[390px] min-h-full sm:min-h-0 sm:rounded-[44px] overflow-hidden shadow-2xl border-0 sm:border-[8px] sm:border-[#1E2028] bg-black relative flex flex-col">
                  {/* Subtle Dynamic Island Notch on Desktop */}
                  <div className="hidden sm:flex justify-center pt-2 pb-1 bg-black shrink-0 z-20">
                    <div className="w-24 h-4 bg-black rounded-full border border-white/10" />
                  </div>

                  {/* Rendered Live Template */}
                  <div className="flex-1 overflow-y-auto">
                    <TemplateRenderer
                      project={{
                        ...previewTemplate.defaultData,
                        projectId: previewTemplate.id,
                        userId: 'preview',
                        createdAt: 0,
                        updatedAt: 0
                      }}
                      viewport="mobile"
                    />
                  </div>
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
            BIO FÁCIL • GALERIA DE BIOSITES
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Escolha uma <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Experiência Visual
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Selecione o seu segmento para acessar direções visuais profissionais com fotografia protagonista, iluminação de estúdio e conversão direta.
          </p>
        </div>
      </div>

      {/* Grid of the 15 Niches (High Relief 3D Icons, Responsive, No Model Counts) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {NICHOS_LIST.map((nicho) => (
          <div
            key={nicho.id}
            onClick={() => setSelectedNicho(nicho)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 bg-[#0B0D18] hover:bg-[#101322] p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-[0_16px_35px_rgba(0,0,0,0.8)] hover:-translate-y-1 flex flex-col items-center text-center justify-between min-h-[190px] sm:min-h-[210px]"
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-12 inset-x-0 mx-auto w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"
              style={{ backgroundColor: nicho.accentColor }}
            />

            {/* 3D-Like High Relief Protagonist Icon */}
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 my-auto flex items-center justify-center p-2 rounded-2xl bg-black/40 border border-white/10 group-hover:border-white/25 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <NicheIcon3D nichoId={nicho.id} size="xl" />
            </div>

            {/* Title & Niche Vibe Subtitle — NO Model Counts */}
            <div className="relative z-10 space-y-1 pt-3 border-t border-white/5 w-full">
              <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors uppercase leading-snug truncate">
                {nicho.name}
              </h3>
              <span className="text-[11px] font-medium text-slate-400 block line-clamp-1">
                {nicho.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
