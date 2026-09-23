import React, { useState } from 'react';
import { BioFacilServiceItem } from '../../types/biofacil';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Scissors,
  Check
} from 'lucide-react';

interface ServicesSectionProps {
  servicesFieldId?: string;
  sectionTitle?: string;
  items: BioFacilServiceItem[];
  allowPrice?: boolean;
  onChangeItems: (items: BioFacilServiceItem[]) => void;
  onFocusField: (fieldId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  servicesFieldId = 'services',
  sectionTitle = 'Serviços & Especialidades',
  items,
  allowPrice = true,
  onChangeItems,
  onFocusField
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(items.length > 0 ? 0 : null);

  const handleAddItem = () => {
    const newItem: BioFacilServiceItem = {
      id: `srv_${Date.now()}`,
      name: 'Novo Serviço',
      description: 'Descrição detalhada do atendimento e o que está incluso.',
      price: allowPrice ? 'R$ 50,00' : ''
    };
    const next = [...items, newItem];
    onChangeItems(next);
    setExpandedIndex(next.length - 1);
    onFocusField(servicesFieldId);
  };

  const handleUpdateItem = (index: number, updated: Partial<BioFacilServiceItem>) => {
    const copy = [...items];
    copy[index] = { ...copy[index], ...updated };
    onChangeItems(copy);
  };

  const handleRemoveItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChangeItems(next);
    setExpandedIndex(null);
    onFocusField(servicesFieldId);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...items];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    onChangeItems(copy);
    setExpandedIndex(index - 1);
    onFocusField(servicesFieldId);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const copy = [...items];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    onChangeItems(copy);
    setExpandedIndex(index + 1);
    onFocusField(servicesFieldId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Scissors size={14} className="text-amber-400" />
          <span>{sectionTitle} ({items.length})</span>
        </label>

        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm shadow-amber-400/20"
        >
          <Plus size={13} />
          <span>Adicionar</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
          <p className="text-xs text-slate-400">Nenhum item cadastrado nesta seção ainda.</p>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
          >
            + Adicionar Primeiro Item
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={item.id || idx}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden group hover:border-white/20 transition-all"
              >
                {/* Header Row */}
                <div
                  className="p-3 flex items-center justify-between cursor-pointer select-none"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-xs font-bold text-slate-200 truncate">
                      {item.name || 'Sem título'}
                    </span>
                    {item.price && (
                      <span className="text-[11px] font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {item.price}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveUp(idx);
                      }}
                      disabled={idx === 0}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 disabled:opacity-20 cursor-pointer"
                      title="Subir"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveDown(idx);
                      }}
                      disabled={idx === items.length - 1}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 disabled:opacity-20 cursor-pointer"
                      title="Descer"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(idx);
                      }}
                      className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer ml-1"
                      title="Excluir item"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className="p-1 text-slate-400">
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Edit Form */}
                {isExpanded && (
                  <div className="p-3.5 pt-1 border-t border-white/5 space-y-3 bg-black/20">
                    {/* Nome do item */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Nome do Item / Serviço</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(idx, { name: e.target.value })}
                        placeholder="Ex: Corte Degradê + Barba Terapia"
                        className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Preço (se aplicável) */}
                    {allowPrice && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-300">Valor / Preço</label>
                        <input
                          type="text"
                          value={item.price || ''}
                          onChange={(e) => handleUpdateItem(idx, { price: e.target.value })}
                          placeholder="Ex: R$ 65,00 ou A partir de R$ 50"
                          className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    )}

                    {/* Descrição */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Descrição / O que inclui</label>
                      <textarea
                        rows={2}
                        value={item.description || ''}
                        onChange={(e) => handleUpdateItem(idx, { description: e.target.value })}
                        placeholder="Ex: Lavagem especial, toalha aromatizada e finalização com pomada modeladora."
                        className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 resize-y"
                      />
                    </div>

                    {/* Link ou Ação (opcional) */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300">Link de Agendamento ou Foto (Opcional)</label>
                      <input
                        type="text"
                        value={item.link || item.imageUrl || ''}
                        onChange={(e) => handleUpdateItem(idx, { link: e.target.value })}
                        placeholder="Link do WhatsApp, agendador ou imagem..."
                        className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
