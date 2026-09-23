import React from 'react';
import {
  BrandWhatsApp,
  BrandInstagram,
  BrandTikTok,
  BrandFacebook,
  BrandYouTube
} from '../../components/BrandIcons';
import { Phone, Mail, Check, Sparkles } from 'lucide-react';

interface SocialSectionProps {
  values: Record<string, any>;
  socialVisibility?: Record<string, boolean>;
  onChangeValue: (fieldId: string, val: any) => void;
  onChangeVisibility: (networkId: string, visible: boolean) => void;
  onFocusField: (fieldId: string) => void;
}

interface SocialNetworkDef {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
  icon: React.ReactNode;
}

const NETWORKS: SocialNetworkDef[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    placeholder: 'Ex: (34) 99999-8877 ou 34999998877',
    hint: 'Gera automaticamente o link wa.me direto para o seu chat.',
    icon: <BrandWhatsApp size={18} />
  },
  {
    id: 'instagram',
    label: 'Instagram',
    placeholder: 'Ex: @minhamarca ou instagram.com/minhamarca',
    hint: 'Basta digitar o @ ou o link completo.',
    icon: <BrandInstagram size={18} />
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    placeholder: 'Ex: @meuperfil ou tiktok.com/@meuperfil',
    hint: 'Basta digitar o @ ou o link do seu perfil.',
    icon: <BrandTikTok size={18} />
  },
  {
    id: 'facebook',
    label: 'Facebook',
    placeholder: 'Ex: facebook.com/suapagina',
    hint: 'Link direto da sua página ou perfil comercial.',
    icon: <BrandFacebook size={18} />
  },
  {
    id: 'youtube',
    label: 'YouTube',
    placeholder: 'Ex: @seucanal ou youtube.com/@seucanal',
    hint: 'Link para o canal ou vídeos da sua empresa.',
    icon: <BrandYouTube size={18} />
  },
  {
    id: 'phone',
    label: 'Telefone Fixo / Comercial',
    placeholder: 'Ex: (34) 3210-0000',
    hint: 'Permite ligação direta em 1 clique ao tocar no botão.',
    icon: <Phone size={18} className="text-emerald-400" />
  },
  {
    id: 'email',
    label: 'E-mail Comercial',
    placeholder: 'Ex: contato@minhaempresa.com.br',
    hint: 'Abre o aplicativo de e-mail pronto para envio.',
    icon: <Mail size={18} className="text-sky-400" />
  }
];

export const SocialSection: React.FC<SocialSectionProps> = ({
  values,
  socialVisibility = {},
  onChangeValue,
  onChangeVisibility,
  onFocusField
}) => {
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
        <Sparkles size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <span>
          O Bio Fácil formata os links de WhatsApp e redes sociais automaticamente. Desmarque a caixa para ocultar redes que você não utiliza.
        </span>
      </div>

      <div className="space-y-3">
        {NETWORKS.map((net) => {
          const isVisible = socialVisibility[net.id] !== false;
          const currentValue = values[net.id] || '';

          return (
            <div
              key={net.id}
              className={`p-3 rounded-2xl border transition-all ${
                isVisible
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white/[0.01] border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                    {net.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-200">{net.label}</span>
                </div>

                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e) => onChangeVisibility(net.id, e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <span className="text-[11px] font-medium text-slate-400">
                    {isVisible ? 'Ativo' : 'Oculto'}
                  </span>
                </label>
              </div>

              {isVisible && (
                <div className="space-y-1 mt-2">
                  <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => onChangeValue(net.id, e.target.value)}
                    onFocus={() => onFocusField(net.id)}
                    placeholder={net.placeholder}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <p className="text-[10px] text-slate-500 pl-1">{net.hint}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
