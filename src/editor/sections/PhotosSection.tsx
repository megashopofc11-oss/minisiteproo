import React, { useRef, useState } from 'react';
import { BioFacilFieldDefinition } from '../../types/biofacil';
import { ImageIcon, Upload, Link as LinkIcon, RotateCcw, Check, Sparkles } from 'lucide-react';

interface PhotosSectionProps {
  fields: BioFacilFieldDefinition[];
  values: Record<string, any>;
  originalImages: Record<string, string>;
  imageBehaviors?: ('normal' | 'fixed' | 'parallax')[];
  onChange: (fieldId: string, val: any) => void;
  onImageUpload: (fieldId: string, file: File) => void;
  onFocusField: (fieldId: string) => void;
}

export const PhotosSection: React.FC<PhotosSectionProps> = ({
  fields,
  values,
  originalImages,
  imageBehaviors = ['normal'],
  onChange,
  onImageUpload,
  onFocusField
}) => {
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (fields.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-slate-400">
        Não há fotos secundárias declaradas para este modelo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const customValue = values[field.id];
        const origImage = originalImages[field.id] || '';
        const isCustomized = Boolean(customValue && String(customValue).trim().length > 0);
        const activeSrc = isCustomized ? customValue : origImage;

        return (
          <div
            key={field.id}
            className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 block">{field.label}</label>
              {isCustomized ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Foto Personalizada
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/10">
                  Foto Original do Modelo
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Thumbnail Preview */}
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 shadow-md">
                {activeSrc ? (
                  <img src={activeSrc} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>

              {/* Upload & Link Controls */}
              <div className="flex-1 space-y-2 min-w-0">
                <input
                  type="file"
                  ref={(el) => {
                    fileRefs.current[field.id] = el;
                  }}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      onImageUpload(field.id, f);
                      onFocusField(field.id);
                    }
                  }}
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileRefs.current[field.id]?.click()}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-amber-400/20"
                  >
                    <Upload size={13} />
                    <span>{isCustomized ? 'Trocar Imagem' : 'Enviar Imagem'}</span>
                  </button>

                  {isCustomized && (
                    <button
                      type="button"
                      onClick={() => {
                        onChange(field.id, '');
                        onFocusField(field.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                      title="Restaurar imagem original do modelo"
                    >
                      <RotateCcw size={12} />
                      <span>Restaurar</span>
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="url"
                    value={customValue || ''}
                    placeholder="Ou cole o link direto da imagem (PNG, JPG, WEBP)..."
                    onChange={(e) => onChange(field.id, e.target.value)}
                    onFocus={() => onFocusField(field.id)}
                    className="w-full px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Comportamento da Imagem (se suportado pelo template) */}
            {imageBehaviors.length > 1 && (
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Comportamento:</span>
                <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg">
                  {imageBehaviors.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => onChange(`${field.id}_behavior`, b)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                        (values[`${field.id}_behavior`] || 'normal') === b
                          ? 'bg-amber-400 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
