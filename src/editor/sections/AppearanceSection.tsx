import React from 'react';
import { BioFacilColorPreset, BioFacilCustomColorVar, VisualEffectVariant } from '../../types/biofacil';
import { Palette, Sparkles, Check, Droplet, Wand2 } from 'lucide-react';

interface AppearanceSectionProps {
  colorPresets?: BioFacilColorPreset[];
  customColorVars?: BioFacilCustomColorVar[];
  supportedEffects?: VisualEffectVariant[];
  currentColorPreset?: string;
  customColors?: Record<string, string>;
  currentEffect?: string;
  onSelectPreset: (preset: BioFacilColorPreset) => void;
  onChangeColor: (varName: string, color: string) => void;
  onSelectEffect: (effect: string) => void;
}

const DEFAULT_PRESETS: BioFacilColorPreset[] = [
  {
    id: 'original',
    name: 'Original do Modelo',
    colors: {}
  },
  {
    id: 'luxury',
    name: 'Ouro Real & Luxo',
    colors: {
      '--primary': '#f59e0b',
      '--accent': '#fbbf24',
      '--gold': '#f59e0b',
      '--gold-light': '#fbbf24',
      '--background': '#090a0f',
      '--text': '#ffffff'
    }
  },
  {
    id: 'neon',
    name: 'Neon Cyberpunk',
    colors: {
      '--primary': '#06b6d4',
      '--accent': '#22d3ee',
      '--gold': '#06b6d4',
      '--gold-light': '#22d3ee',
      '--background': '#070b14',
      '--text': '#f0f9ff'
    }
  },
  {
    id: 'dark',
    name: 'Dark Minimalista',
    colors: {
      '--primary': '#e2e8f0',
      '--accent': '#cbd5e1',
      '--gold': '#e2e8f0',
      '--gold-light': '#cbd5e1',
      '--background': '#0f172a',
      '--text': '#ffffff'
    }
  },
  {
    id: 'vibrant',
    name: 'Rubi & Fogo',
    colors: {
      '--primary': '#ef4444',
      '--accent': '#f87171',
      '--gold': '#ef4444',
      '--gold-light': '#f87171',
      '--background': '#100808',
      '--text': '#ffffff'
    }
  },
  {
    id: 'emerald',
    name: 'Esmeralda Premium',
    colors: {
      '--primary': '#10b981',
      '--accent': '#34d399',
      '--gold': '#10b981',
      '--gold-light': '#34d399',
      '--background': '#06130d',
      '--text': '#ffffff'
    }
  }
];

const DEFAULT_COLOR_VARS: BioFacilCustomColorVar[] = [
  { varName: '--primary', label: 'Cor Principal (Destaque)', defaultColor: '#d4af37' },
  { varName: '--accent', label: 'Cor Secundária (Brilho)', defaultColor: '#f3e5ab' },
  { varName: '--background', label: 'Fundo da Página', defaultColor: '#0c0d10' },
  { varName: '--text', label: 'Cor dos Textos', defaultColor: '#f8fafc' }
];

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  colorPresets = DEFAULT_PRESETS,
  customColorVars = DEFAULT_COLOR_VARS,
  supportedEffects = ['original', 'soft', 'glow', 'glass', '3d'],
  currentColorPreset = 'original',
  customColors = {},
  currentEffect = 'original',
  onSelectPreset,
  onChangeColor,
  onSelectEffect
}) => {
  return (
    <div className="space-y-5">
      {/* 1. Paletas Prontas */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Palette size={14} className="text-amber-400" />
            <span>Paletas Prontas Harmonizadas</span>
          </label>
          <span className="text-[10px] text-amber-400 font-mono">1-Clique</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {colorPresets.map((preset) => {
            const isSelected = currentColorPreset === preset.id;
            const primaryColor = preset.colors['--primary'] || preset.colors['--gold'] || '#d4af37';
            const accentColor = preset.colors['--accent'] || preset.colors['--gold-light'] || '#f3e5ab';
            const bgColor = preset.colors['--background'] || preset.colors['--dark'] || '#0c0d10';

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400 shadow-sm shadow-amber-400/20'
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 truncate">{preset.name}</span>
                  {isSelected && <Check size={13} className="text-amber-400 shrink-0" />}
                </div>

                {/* Swatches preview */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: primaryColor }}
                    title="Cor Primária"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: accentColor }}
                    title="Cor Secundária"
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shadow-inner"
                    style={{ backgroundColor: bgColor }}
                    title="Fundo"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Cores Individuais (Variáveis CSS) */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Droplet size={14} className="text-amber-400" />
            <span>Ajuste Fino de Cores</span>
          </label>
          <span className="text-[10px] text-slate-400 font-mono">Tempo Real</span>
        </div>

        <div className="space-y-2.5">
          {customColorVars.map((cVar) => {
            const activeColor = customColors[cVar.varName] || cVar.defaultColor;

            return (
              <div
                key={cVar.varName}
                className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-xs font-medium text-slate-300 block truncate">
                    {cVar.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{cVar.varName}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="color"
                    value={activeColor}
                    onChange={(e) => onChangeColor(cVar.varName, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    title={`Escolher ${cVar.label}`}
                  />
                  <input
                    type="text"
                    value={activeColor}
                    onChange={(e) => onChangeColor(cVar.varName, e.target.value)}
                    className="w-20 px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-white font-mono uppercase text-center focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Efeitos Visuais (se suportados) */}
      {supportedEffects.length > 1 && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Wand2 size={14} className="text-amber-400" />
            <span>Efeito Visual Global</span>
          </label>

          <div className="grid grid-cols-3 gap-1.5">
            {supportedEffects.map((eff) => (
              <button
                key={eff}
                type="button"
                onClick={() => onSelectEffect(eff)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold capitalize transition-all border cursor-pointer ${
                  currentEffect === eff
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {eff === 'original' ? 'Padrão' : eff}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
