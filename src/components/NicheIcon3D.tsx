import React from 'react';
import { NichoId } from '../types';

interface NicheIcon3DProps {
  nichoId: NichoId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

export const NicheIcon3D: React.FC<NicheIcon3DProps> = ({
  nichoId,
  size = 'md',
  className = '',
  glow = true
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const renderIconSvg = () => {
    switch (nichoId) {
      case '01-barbearia':
        // Barbearia: Navalha clássica + lâmina de aço + detalhes dourados
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(217,119,6,0.35)]">
            <defs>
              <linearGradient id="gold-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="steel-metal" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#F8FAFC" />
              </linearGradient>
              <filter id="bevel-razor" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.6"/>
              </filter>
            </defs>
            {/* Lâmina aberta de aço escovado */}
            <path d="M14 42L44 12C47 9 52 9 55 12C58 15 58 20 55 23L25 53C22 56 17 56 14 53L11 50C8 47 8 42 11 39L14 42Z" fill="url(#steel-metal)" filter="url(#bevel-razor)" />
            <path d="M46 14L53 21L28 46L21 39L46 14Z" fill="#CBD5E1" opacity="0.6"/>
            {/* Cabo em metal dourado com acabamento nobre */}
            <path d="M8 56L22 42C24 40 27 40 29 42L32 45C34 47 34 50 32 52L18 66C15 69 10 69 7 66L5 64C2 61 2 56 5 53L8 56Z" fill="url(#gold-metal)" />
            {/* Rebite dourado de precisão */}
            <circle cx="21" cy="43" r="3" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.5" />
            <line x1="28" y1="28" x2="48" y2="16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </svg>
        );

      case '02-manicure':
        // Manicure: Frasco de esmalte de cristal lapidado + tampa ouro rosé
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(236,72,153,0.35)]">
            <defs>
              <linearGradient id="rose-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCE7F3" />
                <stop offset="40%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#9D174D" />
              </linearGradient>
              <linearGradient id="crystal-glass" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#EC4899" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#831843" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Tampa alta ouro rosé cilíndrica */}
            <rect x="26" y="6" width="12" height="20" rx="3" fill="url(#rose-gold)" />
            <line x1="30" y1="8" x2="30" y2="24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            {/* Anel de vedação dourado */}
            <rect x="24" y="24" width="16" height="4" rx="2" fill="#FBCFE8" />
            {/* Frasco de cristal lapidado */}
            <path d="M16 28H48L52 54C52 57 49 60 46 60H18C15 60 12 57 12 54L16 28Z" fill="url(#crystal-glass)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            {/* Reflexo facetado do vidro */}
            <path d="M20 32L24 56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            <circle cx="42" cy="38" r="4" fill="#FFFFFF" opacity="0.4"/>
            {/* Brilho estrela no canto */}
            <path d="M48 10L50 14L54 16L50 18L48 22L46 18L42 16L46 14L48 10Z" fill="#FFF" />
          </svg>
        );

      case '03-salao':
        // Salão de Beleza: Tesoura profissional dourada cruzada + fio de brilho
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(217,119,6,0.35)]">
            <defs>
              <linearGradient id="champagne-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#FFFBEB" />
              </linearGradient>
            </defs>
            {/* Lâmina 1 */}
            <path d="M16 48C14 44 14 38 18 34L48 10C51 7 54 10 52 13L26 44C23 48 19 50 16 48Z" fill="url(#champagne-gold)" />
            {/* Lâmina 2 */}
            <path d="M48 48C50 44 50 38 46 34L16 10C13 7 10 10 12 13L38 44C41 48 45 50 48 48Z" fill="url(#champagne-gold)" />
            {/* Anéis da tesoura */}
            <circle cx="16" cy="50" r="7" stroke="url(#champagne-gold)" strokeWidth="3" fill="none" />
            <circle cx="48" cy="50" r="7" stroke="url(#champagne-gold)" strokeWidth="3" fill="none" />
            {/* Pivô com diamante */}
            <circle cx="32" cy="30" r="3.5" fill="#FFFBEB" stroke="#78350F" strokeWidth="1" />
            <path d="M32 6L33.5 9L36.5 10.5L33.5 12L32 15L30.5 12L27.5 10.5L30.5 9L32 6Z" fill="#FFF" />
          </svg>
        );

      case '04-pizzaria':
        // Pizzaria: Pizza artesanal ao forno a lenha com crosta dourada e queijo
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(239,68,68,0.35)]">
            <defs>
              <linearGradient id="crust-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="sauce-fire" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="cheese-melt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {/* Fatia gigante protagonista com crosta rústica */}
            <path d="M32 10L54 48C56 52 50 58 44 57L32 54L20 57C14 58 8 52 10 48L32 10Z" fill="url(#sauce-fire)" />
            {/* Crosta rústica curva de forno a lenha */}
            <path d="M10 48C18 53 46 53 54 48C56 52 50 58 44 57L32 54L20 57C14 58 8 52 10 48Z" fill="url(#crust-gold)" />
            {/* Queijo derretido fluindo */}
            <path d="M28 20C30 18 34 18 36 20L48 42C46 45 42 44 40 42C38 40 36 43 32 41C28 43 26 40 24 42L28 20Z" fill="url(#cheese-melt)" />
            {/* Rodelas de Pepperoni & Manjericão */}
            <circle cx="32" cy="28" r="4.5" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
            <circle cx="25" cy="38" r="3.5" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
            <circle cx="39" cy="37" r="4" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
            {/* Folhas de manjericão fresco */}
            <path d="M34 36C34 33 37 32 39 33C39 36 36 37 34 36Z" fill="#15803D" />
            <path d="M26 27C26 25 29 24 30 25C30 28 28 29 26 27Z" fill="#16A34A" />
          </svg>
        );

      case '05-boutique':
        // Boutique: Sacola de compras de alta costura com alça de cetim & cabide
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(139,92,246,0.35)]">
            <defs>
              <linearGradient id="silver-bag" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="purple-satin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
            </defs>
            {/* Alça de cetim curvada */}
            <path d="M24 24V14C24 9.5 27.5 6 32 6C36.5 6 40 9.5 40 14V24" stroke="url(#purple-satin)" strokeWidth="4" strokeLinecap="round" />
            {/* Corpo da sacola estruturada com vinco */}
            <path d="M14 22H50L46 58H18L14 22Z" fill="url(#silver-bag)" />
            {/* Vinco lateral de profundidade */}
            <path d="M18 22L20 58" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M46 22L44 58" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Emblema dourado de alta costura central */}
            <circle cx="32" cy="40" r="7" fill="url(#purple-satin)" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M29 38L32 43L35 38" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case '06-corretor':
        // Corretor: Residência contemporânea / cobertura luxuosa + chave de ouro
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(59,130,246,0.35)]">
            <defs>
              <linearGradient id="sapphire-glass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <linearGradient id="key-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
            </defs>
            {/* Silhueta arquitetônica geométrica */}
            <path d="M8 32L32 10L56 32V54C56 56 54 58 52 58H12C10 58 8 56 8 54V32Z" fill="url(#sapphire-glass)" />
            {/* Telhado inclinado contemporâneo */}
            <path d="M32 10L56 32H8L32 10Z" fill="#1D4ED8" opacity="0.6" />
            {/* Janelas panorâmicas com reflexo de vidro */}
            <rect x="18" y="34" width="10" height="12" rx="2" fill="#DBEAFE" opacity="0.9" />
            <rect x="36" y="34" width="10" height="12" rx="2" fill="#DBEAFE" opacity="0.9" />
            <rect x="27" y="44" width="10" height="14" rx="2" fill="#172554" />
            {/* Chave de ouro suspensa com brilho */}
            <path d="M38 22C38 18.7 40.7 16 44 16C47.3 16 50 18.7 50 22C50 24.5 48.5 26.6 46.4 27.5L52 33V37H48V35L46 33L44.5 34.5L42.5 27.5C40 26.5 38 24.5 38 22ZM44 24C45.1 24 46 23.1 46 22C46 20.9 45.1 20 44 20C42.9 20 42 20.9 42 22C42 23.1 42.9 24 44 24Z" fill="url(#key-gold)" />
          </svg>
        );

      case '07-personal':
        // Personal Trainer: Halter profissional hexagonal pesado com iluminação neon
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(16,185,129,0.35)]">
            <defs>
              <linearGradient id="neon-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
              <linearGradient id="iron-black" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>
            {/* Barra estriada com empunhadura cromada */}
            <rect x="18" y="29" width="28" height="6" rx="2" fill="#E2E8F0" />
            <line x1="24" y1="29" x2="24" y2="35" stroke="#94A3B8" strokeWidth="1" />
            <line x1="32" y1="29" x2="32" y2="35" stroke="#94A3B8" strokeWidth="1" />
            <line x1="40" y1="29" x2="40" y2="35" stroke="#94A3B8" strokeWidth="1" />
            {/* Anilha Esquerda Hexagonal de Ferro */}
            <path d="M12 18L18 24V40L12 46L6 40V24L12 18Z" fill="url(#iron-black)" stroke="url(#neon-metal)" strokeWidth="2.5" />
            <rect x="16" y="22" width="4" height="20" rx="1.5" fill="#334155" />
            {/* Anilha Direita Hexagonal de Ferro */}
            <path d="M52 18L58 24V40L52 46L46 40V24L52 18Z" fill="url(#iron-black)" stroke="url(#neon-metal)" strokeWidth="2.5" />
            <rect x="44" y="22" width="4" height="20" rx="1.5" fill="#334155" />
            {/* Raio neon central de performance */}
            <path d="M34 16L27 30H33L30 42L40 28H33L36 16H34Z" fill="#34D399" />
          </svg>
        );

      case '08-motorista':
        // Motorista Particular: Sedã executivo de luxo + volante/roda cromada
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(14,165,233,0.35)]">
            <defs>
              <linearGradient id="chrome-car" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0F9FF" />
                <stop offset="30%" stopColor="#38BDF8" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0C4A6E" />
              </linearGradient>
            </defs>
            {/* Silhueta aerodinâmica do automóvel executivo */}
            <path d="M8 40L16 28C18 25 22 23 27 23H40C44 23 48 25 50 28L58 40C60 41 60 44 58 45L56 46C55 46 54 45 54 44C52 41 48 39 44 39C40 39 36 41 34 44H26C24 41 20 39 16 39C12 39 8 41 6 44C6 45 5 46 4 46L2 45C0 44 0 41 2 40H8Z" fill="url(#chrome-car)" />
            {/* Para-brisa e janelas escuras VIP */}
            <path d="M18 28L28 25H38L46 28L48 36H16L18 28Z" fill="#030712" opacity="0.85" />
            <line x1="33" y1="25" x2="33" y2="36" stroke="#38BDF8" strokeWidth="1.5" opacity="0.5" />
            {/* Farol LED tecnológico */}
            <path d="M54 38L58 40L54 42Z" fill="#E0F2FE" />
            {/* Rodas cromadas esportivas */}
            <circle cx="16" cy="45" r="7" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="16" cy="45" r="3" fill="#E2E8F0" />
            <circle cx="44" cy="45" r="7" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="44" cy="45" r="3" fill="#E2E8F0" />
          </svg>
        );

      case '09-mecanica':
        // Mecânica / Oficina: Engrenagem industrial de aço + chave estrela de precisão
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(249,115,22,0.35)]">
            <defs>
              <linearGradient id="carbon-steel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
              <linearGradient id="torch-fire" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#9A3412" />
              </linearGradient>
            </defs>
            {/* Engrenagem de alta precisão */}
            <path d="M32 14L35 18H41L42 24L48 27L46 33L50 38L47 43L49 49L43 51L41 57L35 56L32 60L29 56L23 57L21 51L15 49L17 43L14 38L18 33L16 27L22 24L23 18H29L32 14Z" fill="url(#carbon-steel)" />
            <circle cx="32" cy="37" r="9" fill="#090D16" />
            {/* Chave de boca inclinada em aço forjado */}
            <path d="M12 12C16 8 22 9 25 13L46 34C48 36 48 39 46 41L41 46C39 48 36 48 34 46L13 25C9 22 8 16 12 12Z" fill="url(#torch-fire)" />
            <path d="M15 11L21 17L17 21L11 15C10 13 12 11 15 11Z" fill="#090D16" />
            {/* Faísca de usinagem */}
            <circle cx="48" cy="18" r="2.5" fill="#FED7AA" />
            <circle cx="52" cy="24" r="1.5" fill="#FFEDD5" />
          </svg>
        );

      case '10-confeitaria':
        // Confeitaria / Doces: Bolo com andares régios, calda brilhante e morango nobre
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,63,94,0.35)]">
            <defs>
              <linearGradient id="pastry-cream" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="50%" stopColor="#FBCFE8" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
              <linearGradient id="noble-chocolate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#92400E" />
                <stop offset="50%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>
            {/* Base do bolo com calda ondulada */}
            <path d="M12 40H52V54C52 56 50 58 48 58H16C14 58 12 56 12 54V40Z" fill="url(#noble-chocolate)" />
            {/* Camada superior do bolo */}
            <path d="M18 24H46V40H18V24Z" fill="url(#pastry-cream)" />
            {/* Calda derramando suavemente */}
            <path d="M18 24C20 28 24 28 26 24C28 30 32 30 34 24C36 29 40 29 42 24C44 28 46 26 46 24V28C46 32 18 32 18 28V24Z" fill="url(#noble-chocolate)" opacity="0.6"/>
            {/* Morango com folha de ouro no topo */}
            <path d="M32 10C35 10 38 14 36 19C34 24 32 26 32 26C32 26 30 24 28 19C26 14 29 10 32 10Z" fill="#E11D48" />
            <path d="M30 11C28 9 26 10 25 12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 11C36 9 38 10 39 12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
            {/* Faíscas açucaradas */}
            <circle cx="24" cy="48" r="1.5" fill="#FDE047" />
            <circle cx="32" cy="46" r="1.5" fill="#FDE047" />
            <circle cx="40" cy="50" r="1.5" fill="#FDE047" />
          </svg>
        );

      case '11-advocacia':
        // Advocacia: Balança da justiça clássica com pratos suspensos em ouro polido e pedestal régio
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(217,119,6,0.35)]">
            <defs>
              <linearGradient id="law-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="marble-pedestal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>
            {/* Coluna central da balança */}
            <rect x="30" y="10" width="4" height="42" rx="2" fill="url(#law-gold)" />
            {/* Base sólida em mármore escuro */}
            <path d="M20 54H44L48 58H16L20 54Z" fill="url(#marble-pedestal)" />
            <rect x="24" y="50" width="16" height="4" rx="1" fill="url(#law-gold)" />
            {/* Travessão superior de equilíbrio */}
            <path d="M12 18H52L48 21H16L12 18Z" fill="url(#law-gold)" />
            <circle cx="32" cy="14" r="4.5" fill="url(#law-gold)" />
            {/* Prato esquerdo com correntes */}
            <line x1="16" y1="21" x2="10" y2="34" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="16" y1="21" x2="22" y2="34" stroke="#FDE68A" strokeWidth="1.5" />
            <path d="M8 34C8 38 12 40 16 40C20 40 24 38 24 34H8Z" fill="url(#law-gold)" />
            {/* Prato direito com correntes */}
            <line x1="48" y1="21" x2="42" y2="34" stroke="#FDE68A" strokeWidth="1.5" />
            <line x1="48" y1="21" x2="54" y2="34" stroke="#FDE68A" strokeWidth="1.5" />
            <path d="M40 34C40 38 44 40 48 40C52 40 56 38 56 34H40Z" fill="url(#law-gold)" />
            {/* Brilho da autoridade */}
            <circle cx="32" cy="14" r="1.5" fill="#FFF" />
          </svg>
        );

      case '12-estetica':
        // Estética / Sobrancelhas: Dermógrafo de precisão, gota de sérum e pétala suave em ouro rosé
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,114,182,0.35)]">
            <defs>
              <linearGradient id="aesthetic-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="40%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#BE123C" />
              </linearGradient>
              <linearGradient id="gold-pen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#854D0E" />
              </linearGradient>
            </defs>
            {/* Dermógrafo / Caneta de micropigmentação de precisão */}
            <path d="M48 8L56 16L24 48L16 48L16 40L48 8Z" fill="url(#gold-pen)" />
            <path d="M16 48L10 54L12 44L16 48Z" fill="#E2E8F0" />
            <line x1="38" y1="18" x2="46" y2="26" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
            {/* Arco escultural de sobrancelha perfeita */}
            <path d="M12 24C18 16 32 14 44 20" stroke="url(#aesthetic-rose)" strokeWidth="3" strokeLinecap="round" />
            {/* Gota luminosa de sérum regenerador */}
            <path d="M42 34C42 34 50 42 50 47C50 51.5 46.5 55 42 55C37.5 55 34 51.5 34 47C34 42 42 34 42 34Z" fill="url(#aesthetic-rose)" />
            <circle cx="44" cy="45" r="2" fill="#FFFFFF" opacity="0.7" />
          </svg>
        );

      case '13-refrigeracao':
        // Refrigeração / Ar-Condicionado: Aparelho split moderno com rajadas de ar polar e gelo
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(56,189,248,0.35)]">
            <defs>
              <linearGradient id="split-body" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="polar-wind" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            {/* Unidade split de ar-condicionado */}
            <rect x="8" y="14" width="48" height="22" rx="4" fill="url(#split-body)" />
            <line x1="8" y1="30" x2="56" y2="30" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Display digital LED azul */}
            <rect x="44" y="20" width="8" height="4" rx="1" fill="#0284C7" />
            <line x1="46" y1="22" x2="50" y2="22" stroke="#FFFFFF" strokeWidth="1" />
            {/* Aleta inferior aberta */}
            <path d="M12 36H52L50 40H14L12 36Z" fill="#64748B" />
            {/* Rajadas de vento frio polar fluindo para baixo */}
            <path d="M16 44C20 48 24 50 22 56" stroke="url(#polar-wind)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32 44C34 50 36 52 34 58" stroke="url(#polar-wind)" strokeWidth="3" strokeLinecap="round" />
            <path d="M48 44C44 48 40 50 42 56" stroke="url(#polar-wind)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cristal de gelo / floco puro */}
            <path d="M28 48L36 48M32 44L32 52M29 45L35 51M29 51L35 45" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );

      case '14-pintor':
        // Pintor / Serviços Residenciais: Rolo de pintura com tinta esmaltada fresca azul e espátula
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(37,99,235,0.35)]">
            <defs>
              <linearGradient id="paint-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="metal-frame" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Rolo de pintura cilíndrico com tinta azul fresca */}
            <rect x="14" y="10" width="34" height="16" rx="4" fill="url(#paint-blue)" />
            <line x1="14" y1="18" x2="48" y2="18" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" strokeDasharray="3 3" />
            {/* Haste metálica do rolo */}
            <path d="M48 18H52V34H34V46" stroke="url(#metal-frame)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Cabo emborrachado ergonômico */}
            <rect x="30" y="44" width="8" height="16" rx="2" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
            {/* Gotas de tinta fresca escorrendo */}
            <circle cx="20" cy="32" r="3" fill="#3B82F6" />
            <circle cx="28" cy="36" r="2" fill="#60A5FA" />
          </svg>
        );

      case '15-fotografo':
        // Fotógrafo / Videomaker: Câmera mirrorless profissional com objetiva grande e anel dourado
        return (
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-[0_8px_16px_rgba(245,158,11,0.35)]">
            <defs>
              <linearGradient id="camera-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="lens-reflex" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="40%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#090D16" />
              </linearGradient>
              <linearGradient id="gold-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
            {/* Corpo de magnésio da câmera */}
            <path d="M10 22H20L23 16H41L44 22H54C56 22 58 24 58 26V52C58 54 56 56 54 56H10C8 56 6 54 6 52V26C6 24 8 22 10 22Z" fill="url(#camera-body)" />
            {/* Botão de disparo e dial */}
            <rect x="46" y="14" width="6" height="3" rx="1" fill="#E2E8F0" />
            <circle cx="16" cy="27" r="2" fill="#EF4444" />
            {/* Lente objetiva circular externa */}
            <circle cx="32" cy="38" r="15" fill="#0F172A" stroke="url(#gold-ring)" strokeWidth="2.5" />
            {/* Elemento de vidro com reflexo óptico */}
            <circle cx="32" cy="38" r="10" fill="url(#lens-reflex)" />
            {/* Brilho da lente reflexiva */}
            <path d="M26 34C28 31 34 31 37 34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <circle cx="36" cy="42" r="1.5" fill="#38BDF8" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}
    >
      {glow && (
        <div className="absolute inset-0 rounded-full blur-xl opacity-40 scale-125 bg-amber-400/30 pointer-events-none" />
      )}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {renderIconSvg()}
      </div>
    </div>
  );
};
