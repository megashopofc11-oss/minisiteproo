import React from 'react';
import { BioFacilFieldDefinition } from '../../types/biofacil';
import { Type, Sparkles } from 'lucide-react';

interface TextsSectionProps {
  fields: BioFacilFieldDefinition[];
  values: Record<string, any>;
  originalTexts: Record<string, string>;
  onChange: (fieldId: string, val: any) => void;
  onFocusField: (fieldId: string) => void;
}

export const TextsSection: React.FC<TextsSectionProps> = ({
  fields,
  values,
  originalTexts,
  onChange,
  onFocusField
}) => {
  if (fields.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-slate-400">
        Não há campos de texto adicionais para personalizar neste modelo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
        <Sparkles size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <span>
          Os textos originais do modelo já estão preenchidos abaixo. Ao clicar em qualquer campo, o local correspondente no site se destaca no preview.
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field) => {
          // Pre-fill with user custom value, or original template HTML text, or defaultValue (Requirement 10)
          const currentValue =
            values[field.id] !== undefined
              ? values[field.id]
              : originalTexts[field.id] !== undefined && originalTexts[field.id] !== ''
              ? originalTexts[field.id]
              : field.defaultValue || '';

          const isTextarea = field.type === 'textarea';

          // Friendly contextual description (Requirement 11)
          const contextDescription =
            field.contextHint ||
            field.description ||
            inferContextHint(field.id, field.label);

          return (
            <div
              key={field.id}
              className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Type size={13} className="text-amber-400 group-hover:text-amber-300 transition-colors" />
                  <span>{field.label}</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {isTextarea ? 'Parágrafo' : 'Linha'}
                </span>
              </div>

              {isTextarea ? (
                <textarea
                  rows={3}
                  value={currentValue}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  onFocus={() => onFocusField(field.id)}
                  placeholder={field.placeholder || 'Digite o texto...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  onFocus={() => onFocusField(field.id)}
                  placeholder={field.placeholder || 'Digite o texto...'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              )}

              {contextDescription && (
                <p className="text-[11px] text-slate-400 italic">
                  "{contextDescription}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function inferContextHint(fieldId: string, label: string): string {
  const idLower = fieldId.toLowerCase();
  const labelLower = label.toLowerCase();

  if (idLower.includes('headline') || idLower.includes('title') || labelLower.includes('título')) {
    return 'Texto de destaque exibido no topo da página';
  }
  if (idLower.includes('tagline') || idLower.includes('slogan') || labelLower.includes('slogan')) {
    return 'Frase de impacto e subtítulo logo abaixo do nome';
  }
  if (idLower.includes('about') || labelLower.includes('sobre') || labelLower.includes('história')) {
    return 'Texto da seção Sobre / Apresentação do negócio';
  }
  if (idLower.includes('cta') || idLower.includes('call') || labelLower.includes('chamada')) {
    return 'Texto de chamada para ação convidando o cliente ao contato';
  }
  if (idLower.includes('whatsapp') || labelLower.includes('whatsapp')) {
    return 'Texto exibido acima ou no botão do WhatsApp';
  }
  if (idLower.includes('hours') || labelLower.includes('horário')) {
    return 'Horários de funcionamento da empresa';
  }
  if (idLower.includes('address') || labelLower.includes('endereço')) {
    return 'Endereço e ponto de referência';
  }
  return 'Texto visível no modelo do biosite';
}
