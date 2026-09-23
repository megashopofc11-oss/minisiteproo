import React, { useRef, useState } from 'react';
import { BioFacilFieldDefinition } from '../../types/biofacil';
import { ImageIcon, RotateCcw, Upload, Link, Check, Trash2 } from 'lucide-react';

interface IdentitySectionProps {
  nameField?: BioFacilFieldDefinition;
  taglineField?: BioFacilFieldDefinition;
  logoField?: BioFacilFieldDefinition;
  avatarField?: BioFacilFieldDefinition;
  values: Record<string, any>;
  originalImages: Record<string, string>;
  originalTexts: Record<string, string>;
  onChange: (fieldId: string, val: any) => void;
  onImageUpload: (fieldId: string, file: File) => void;
  onFocusField: (fieldId: string) => void;
}

export const IdentitySection: React.FC<IdentitySectionProps> = ({
  nameField,
  taglineField,
  logoField,
  avatarField,
  values,
  originalImages,
  originalTexts,
  onChange,
  onImageUpload,
  onFocusField
}) => {
  const [logoInputMode, setLogoInputMode] = useState<'upload' | 'link'>('upload');
  const [avatarInputMode, setAvatarInputMode] = useState<'upload' | 'link'>('upload');

  const logoFileRef = useRef<HTMLInputElement>(null);
  const avatarFileRef = useRef<HTMLInputElement>(null);

  // Logo sources
  const logoId = logoField?.id || 'logo';
  const customLogo = values[logoId];
  const origLogo = originalImages[logoId] || '';
  const currentLogoSrc = customLogo || origLogo;
  const isLogoCustomized = Boolean(customLogo && String(customLogo).trim().length > 0);

  // Avatar / Profile photo sources
  const avatarId = avatarField?.id || 'hero_image';
  const customAvatar = values[avatarId];
  const origAvatar = originalImages[avatarId] || '';
  const currentAvatarSrc = customAvatar || origAvatar;
  const isAvatarCustomized = Boolean(customAvatar && String(customAvatar).trim().length > 0);

  return (
    <div className="space-y-5">
      {/* 1. Nome da Empresa / Profissional */}
      {nameField && (
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
            <span>{nameField.label || 'Nome da Empresa / Profissional'}</span>
            <span className="text-[10px] text-amber-400 font-medium">Topo do site</span>
          </label>
          <input
            type="text"
            value={values[nameField.id] !== undefined ? values[nameField.id] : originalTexts[nameField.id] || nameField.defaultValue || ''}
            onChange={(e) => onChange(nameField.id, e.target.value)}
            onFocus={() => onFocusField(nameField.id)}
            placeholder="Ex: Dom Cavalcanti Barbershop"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
          />
          <p className="text-[11px] text-slate-400">
            {nameField.contextHint || 'Nome principal exibido com destaque na abertura do site.'}
          </p>
        </div>
      )}

      {/* 2. Slogan / Descrição Principal */}
      {taglineField && (
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
            <span>{taglineField.label || 'Slogan ou Frase de Impacto'}</span>
            <span className="text-[10px] text-slate-400">Subtítulo</span>
          </label>
          <textarea
            rows={2}
            value={values[taglineField.id] !== undefined ? values[taglineField.id] : originalTexts[taglineField.id] || taglineField.defaultValue || ''}
            onChange={(e) => onChange(taglineField.id, e.target.value)}
            onFocus={() => onFocusField(taglineField.id)}
            placeholder="Ex: A verdadeira experiência do corte clássico."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-y"
          />
          <p className="text-[11px] text-slate-400">
            {taglineField.contextHint || 'Texto de apresentação resumido logo abaixo do nome.'}
          </p>
        </div>
      )}

      {/* 3. Logo da Marca (se suportado ou declarado) */}
      {logoField && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">Logo da Empresa</span>
            {isLogoCustomized ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Sua Logo Ativa
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/10">
                Logo Original do Modelo
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-white/15 flex items-center justify-center shrink-0 p-1.5 shadow-md">
              {currentLogoSrc ? (
                <img src={currentLogoSrc} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <ImageIcon size={22} className="text-slate-500" />
              )}
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              {/* Controls */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={logoFileRef}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      onImageUpload(logoId, f);
                      onFocusField(logoId);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => logoFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-amber-400/20"
                >
                  <Upload size={13} />
                  <span>{isLogoCustomized ? 'Trocar Logo' : 'Enviar Logo'}</span>
                </button>

                {isLogoCustomized && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange(logoId, '');
                      onFocusField(logoId);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                    title="Restaurar logo original do modelo"
                  >
                    <RotateCcw size={12} />
                    <span>Restaurar</span>
                  </button>
                )}
              </div>

              {/* URL fallback */}
              <input
                type="url"
                value={customLogo || ''}
                placeholder="Ou cole a URL da logo (PNG, SVG, WEBP)..."
                onChange={(e) => onChange(logoId, e.target.value)}
                onFocus={() => onFocusField(logoId)}
                className="w-full px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Foto Profissional / Foto de Destaque */}
      {avatarField && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">{avatarField.label || 'Foto Profissional / Destaque'}</span>
            {isAvatarCustomized ? (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Sua Foto Ativa
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/10">
                Foto Demonstrativa
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 shadow-md">
              {currentAvatarSrc ? (
                <img src={currentAvatarSrc} alt="Destaque" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <ImageIcon size={22} />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={avatarFileRef}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      onImageUpload(avatarId, f);
                      onFocusField(avatarId);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => avatarFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-amber-400/20"
                >
                  <Upload size={13} />
                  <span>{isAvatarCustomized ? 'Trocar Foto' : 'Enviar Foto'}</span>
                </button>

                {isAvatarCustomized && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange(avatarId, '');
                      onFocusField(avatarId);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                    title="Restaurar foto demonstrativa original do modelo"
                  >
                    <RotateCcw size={12} />
                    <span>Restaurar</span>
                  </button>
                )}
              </div>

              <input
                type="url"
                value={customAvatar || ''}
                placeholder="Ou cole a URL da foto (JPG, WEBP, PNG)..."
                onChange={(e) => onChange(avatarId, e.target.value)}
                onFocus={() => onFocusField(avatarId)}
                className="w-full px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            {avatarField.contextHint || 'Foto principal de apresentação da empresa, fachada ou profissional.'}
          </p>
        </div>
      )}
    </div>
  );
};
