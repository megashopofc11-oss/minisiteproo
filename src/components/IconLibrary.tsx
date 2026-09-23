import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { AppIcon } from './BrandIcons';

export interface IconOption {
  id: string;
  name: string;
  category: string;
  label: string;
}

export const ICON_CATALOG: IconOption[] = [
  // Brands
  { id: 'whatsapp', name: 'whatsapp', category: 'Redes Sociais', label: 'WhatsApp' },
  { id: 'instagram', name: 'instagram', category: 'Redes Sociais', label: 'Instagram' },
  { id: 'tiktok', name: 'tiktok', category: 'Redes Sociais', label: 'TikTok' },
  { id: 'google', name: 'google', category: 'Redes Sociais', label: 'Google' },
  { id: 'googlemaps', name: 'googlemaps', category: 'Redes Sociais', label: 'Google Maps' },
  { id: 'facebook', name: 'facebook', category: 'Redes Sociais', label: 'Facebook' },

  // Communication & Contact
  { id: 'phone', name: 'phone', category: 'Contato', label: 'Telefone' },
  { id: 'email', name: 'mail', category: 'Contato', label: 'E-mail' },
  { id: 'message', name: 'message', category: 'Contato', label: 'Mensagem' },
  { id: 'share', name: 'share', category: 'Contato', label: 'Compartilhar' },

  // Location & Navigation
  { id: 'location', name: 'location', category: 'Localização', label: 'Endereço / Pin' },
  { id: 'navigation', name: 'navigation', category: 'Localização', label: 'Como Chegar' },

  // Schedule & Time
  { id: 'calendar', name: 'calendar', category: 'Agendamento', label: 'Calendário' },
  { id: 'agendamento', name: 'agendamento', category: 'Agendamento', label: 'Agendar Horário' },
  { id: 'clock', name: 'clock', category: 'Agendamento', label: 'Horário de Funcionamento' },

  // Business & Niches
  { id: 'scissors', name: 'scissors', category: 'Serviços', label: 'Tesoura / Cabelo' },
  { id: 'sparkles', name: 'sparkles', category: 'Serviços', label: 'Brilho / Estética' },
  { id: 'star', name: 'star', category: 'Serviços', label: 'Avaliação / Estrela' },
  { id: 'crown', name: 'crown', category: 'Serviços', label: 'Premium / Coroa' },
  { id: 'gem', name: 'gem', category: 'Serviços', label: 'Luxo / Diamante' },
  { id: 'pizza', name: 'pizza', category: 'Serviços', label: 'Gastronomia / Pizza' },
  { id: 'utensils', name: 'utensils', category: 'Serviços', label: 'Restaurante / Talheres' },
  { id: 'coffee', name: 'coffee', category: 'Serviços', label: 'Cafeteria / Café' },
  { id: 'shoppingbag', name: 'shoppingbag', category: 'Serviços', label: 'Boutique / Sacola' },
  { id: 'shirt', name: 'shirt', category: 'Serviços', label: 'Moda / Roupas' },
  { id: 'home', name: 'home', category: 'Serviços', label: 'Imóveis / Casa' },
  { id: 'building', name: 'building', category: 'Serviços', label: 'Prédio / Empreendimento' },
  { id: 'dumbbell', name: 'dumbbell', category: 'Serviços', label: 'Personal / Fitness' },
  { id: 'activity', name: 'activity', category: 'Serviços', label: 'Performance / Treino' },
  { id: 'car', name: 'car', category: 'Serviços', label: 'Motorista / Carro' },
  { id: 'wrench', name: 'wrench', category: 'Serviços', label: 'Mecânica / Oficina' },
  { id: 'cake', name: 'cake', category: 'Serviços', label: 'Confeitaria / Bolo' },
  { id: 'gift', name: 'gift', category: 'Serviços', label: 'Presentes / Ofertas' },
  { id: 'link', name: 'link', category: 'Serviços', label: 'Link Externo' },
  { id: 'shield', name: 'shield', category: 'Serviços', label: 'Garantia / Segurança' }
];

interface IconLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIcon: string;
  onSelect: (iconName: string) => void;
}

export const IconLibraryModal: React.FC<IconLibraryModalProps> = ({
  isOpen,
  onClose,
  selectedIcon,
  onSelect
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('Todos');
  const [previewStyle, setPreviewStyle] = useState<'outline' | 'filled' | 'glass' | 'gradient' | 'premium' | '3d'>('outline');

  if (!isOpen) return null;

  const categories = ['Todos', 'Redes Sociais', 'Contato', 'Localização', 'Agendamento', 'Serviços'];

  const filteredIcons = ICON_CATALOG.filter((item) => {
    const matchesSearch =
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'Todos' || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0F111A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141724]">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              Biblioteca de Ícones Oficiais
            </h3>
            <p className="text-xs text-slate-400">
              Ícones de marcas oficiais e símbolos essenciais em alta fidelidade
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Style Selector Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#0B0D14] border-b border-white/5 text-xs">
          <span className="text-slate-400 font-medium">Estilo de Pré-visualização:</span>
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
            {(['outline', 'filled', 'glass', 'gradient', 'premium', '3d'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setPreviewStyle(style)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                  previewStyle === style
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Categories */}
        <div className="p-6 pb-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Buscar ícone (ex: whatsapp, instagram, agenda, corte...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-all ${
                  selectedCat === cat
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Icons Grid */}
        <div className="p-6 pt-2 overflow-y-auto max-h-[50vh] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {filteredIcons.map((item) => {
            const isSelected = selectedIcon?.toLowerCase() === item.name.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.name);
                  onClose();
                }}
                className={`group relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500 ring-2 ring-purple-500/30 text-white'
                    : 'bg-slate-900/60 border-white/5 hover:border-purple-500/30 hover:bg-slate-800/80 text-slate-300'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center">
                    <Check size={10} strokeWidth={3} />
                  </span>
                )}
                <div className="mb-2 transition-transform duration-200 group-hover:scale-110">
                  <AppIcon name={item.name} size={24} styleVariant={previewStyle} />
                </div>
                <span className="text-[11px] font-medium truncate max-w-full text-slate-200">
                  {item.label}
                </span>
                <span className="text-[9px] text-slate-500 truncate max-w-full">
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#0B0D14] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredIcons.length} ícones disponíveis</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
