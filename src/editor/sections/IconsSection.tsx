import React from 'react';
import { IconStyleVariant } from '../../types/biofacil';
import { Sparkles, Layers, Box, Check, CircleDot } from 'lucide-react';
import { BrandWhatsApp, BrandInstagram } from '../../components/BrandIcons';

interface IconsSectionProps {
  supportedStyles?: IconStyleVariant[];
  currentStyle?: IconStyleVariant;
  onSelectStyle: (style: IconStyleVariant) => void;
}

interface IconStyleMeta {
  id: IconStyleVariant;
  name: string;
  badge: string;
  description: string;
  previewClass: string;
}

const STYLES_META: IconStyleMeta[] = [
  {
    id: 'original',
    name: 'Original do Modelo',
    badge: 'Padrão',
    description: 'Estilo autêntico conforme desenhado pelo designer do modelo.',
    previewClass: ''
  },
  {
    id: '3d',
    name: '3D Premium & Profundidade',
    badge: 'Destaque',
    description: 'Efeito tridimensional com relevo, sombras dinâmicas e reflexo.',
    previewClass: 'filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] transform perspective-[400px] translate-z-2'
  },
  {
    id: 'glass',
    name: 'Glassmorphism (Vidro)',
    badge: 'Moderno',
    description: 'Translúcido suave com brilho perolado e borda sutil.',
    previewClass: 'opacity-90 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]'
  },
  {
    id: 'glow',
    name: 'Brilho / Glow',
    badge: 'Iluminado',
    description: 'Aura luminosa suave ao redor dos botões de contato.',
    previewClass: 'filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]'
  },
  {
    id: 'neon',
    name: 'Neon Cyber',
    badge: 'Futurista',
    description: 'Contornos elétricos fluorescentes com alta intensidade.',
    previewClass: 'filter drop-shadow-[0_0_8px_#06b6d4]'
  },
  {
    id: 'minimal',
    name: 'Minimalista & Limpo',
    badge: 'Clean',
    description: 'Design plano sem sombras, ideal para perfis corporativos.',
    previewClass: 'opacity-80'
  }
];

export const IconsSection: React.FC<IconsSectionProps> = ({
  supportedStyles = ['original', 'minimal', 'glass', 'glow', '3d'],
  currentStyle = 'original',
  onSelectStyle
}) => {
  const availableStyles = STYLES_META.filter((m) => supportedStyles.includes(m.id));

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
        <Box size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <span>
          Escolha o estilo de acabamento dos botões e ícones sociais. O estilo 3D adiciona volume realista, sombras e reflexo.
        </span>
      </div>

      <div className="space-y-2.5">
        {availableStyles.map((item) => {
          const isSelected = currentStyle === item.id;

          return (
            <div
              key={item.id}
              onClick={() => onSelectStyle(item.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-amber-400/15 border-amber-400 shadow-sm shadow-amber-400/20'
                  : 'bg-white/[0.03] border-white/5 hover:bg-white/10 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Visual Icon Preview */}
                <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center gap-1.5 shrink-0">
                  <div className={item.previewClass}>
                    <BrandWhatsApp size={16} />
                  </div>
                  <div className={item.previewClass}>
                    <BrandInstagram size={16} />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{item.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-amber-400 border border-white/10">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
                </div>
              </div>

              <div className="shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-white/20'
                  }`}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
