import React, { useRef, useState } from 'react';
import { BioFacilGalleryItem, GalleryLayoutStyle } from '../../types/biofacil';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Link as LinkIcon,
  Sliders,
  Sparkles,
  LayoutGrid,
  Images
} from 'lucide-react';

interface GallerySectionProps {
  galleryFieldId?: string;
  items: BioFacilGalleryItem[];
  supportedLayouts?: GalleryLayoutStyle[];
  currentLayout?: GalleryLayoutStyle;
  carouselOptions?: {
    autoplay?: boolean;
    speed?: number;
    indicators?: boolean;
    arrows?: boolean;
    loop?: boolean;
    effects?: ('slide' | 'fade' | 'scale')[];
  };
  carouselSettings?: {
    autoplay?: boolean;
    speed?: number;
    indicators?: boolean;
    arrows?: boolean;
    loop?: boolean;
    effect?: string;
  };
  onChangeItems: (items: BioFacilGalleryItem[]) => void;
  onChangeLayout: (layout: GalleryLayoutStyle) => void;
  onChangeCarouselSettings: (settings: any) => void;
  onImageUpload?: (fieldId: string, file: File) => void;
  onFocusField: (fieldId: string) => void;
}

const LAYOUT_LABELS: Record<GalleryLayoutStyle, string> = {
  original: 'Original do Modelo',
  carousel: 'Carrossel (Slider)',
  grid: 'Grade (2 Colunas)',
  horizontal: 'Horizontal (Deslize)',
  vertical: 'Lista Vertical',
  masonry: 'Mosaico / Masonry',
  collage: 'Colagem Elegante'
};

export const GallerySection: React.FC<GallerySectionProps> = ({
  galleryFieldId = 'gallery',
  items,
  supportedLayouts = ['original', 'carousel', 'grid', 'horizontal'],
  currentLayout = 'original',
  carouselOptions,
  carouselSettings = { autoplay: true, speed: 3, indicators: true, arrows: true, loop: true, effect: 'slide' },
  onChangeItems,
  onChangeLayout,
  onChangeCarouselSettings,
  onImageUpload,
  onFocusField
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Add new photo
  const handleAddPhoto = () => {
    const newItem: BioFacilGalleryItem = {
      id: `gal_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      caption: `Foto ${items.length + 1}`
    };
    const next = [...items, newItem];
    onChangeItems(next);
    onFocusField(galleryFieldId);
  };

  // Upload photo to a specific index or add new
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (dataUrl) {
        if (editingIndex !== null && items[editingIndex]) {
          const copy = [...items];
          copy[editingIndex] = { ...copy[editingIndex], url: dataUrl };
          onChangeItems(copy);
        } else {
          const newItem: BioFacilGalleryItem = {
            id: `gal_${Date.now()}`,
            url: dataUrl,
            caption: `Foto ${items.length + 1}`
          };
          onChangeItems([...items, newItem]);
        }
        onFocusField(galleryFieldId);
      }
      setEditingIndex(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  // Reordering
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...items];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    onChangeItems(copy);
    onFocusField(galleryFieldId);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const copy = [...items];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    onChangeItems(copy);
    onFocusField(galleryFieldId);
  };

  const handleRemove = (index: number) => {
    onChangeItems(items.filter((_, i) => i !== index));
    onFocusField(galleryFieldId);
  };

  const handleUpdate = (index: number, updated: Partial<BioFacilGalleryItem>) => {
    const copy = [...items];
    copy[index] = { ...copy[index], ...updated };
    onChangeItems(copy);
  };

  return (
    <div className="space-y-5">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 1. Layout Selector (only shows options supported by this template) */}
      {supportedLayouts.length > 1 && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <LayoutGrid size={13} className="text-amber-400" />
              <span>Estilo da Galeria</span>
            </span>
            <span className="text-[10px] text-amber-400 font-mono">
              {supportedLayouts.length} opções suportadas
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {supportedLayouts.map((layout) => {
              const isSelected = currentLayout === layout;
              return (
                <button
                  key={layout}
                  type="button"
                  onClick={() => onChangeLayout(layout)}
                  className={`p-2 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-sm'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="truncate">{LAYOUT_LABELS[layout] || layout}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Carousel Controls (if carousel is selected/supported) */}
      {currentLayout === 'carousel' && (
        <div className="p-3.5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sliders size={13} />
              <span>Ajustes do Carrossel</span>
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Mobile Swipe</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Autoplay */}
            <label className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer">
              <span className="text-slate-300">Autoplay</span>
              <input
                type="checkbox"
                checked={carouselSettings.autoplay !== false}
                onChange={(e) =>
                  onChangeCarouselSettings({ ...carouselSettings, autoplay: e.target.checked })
                }
                className="rounded accent-amber-400"
              />
            </label>

            {/* Loop */}
            <label className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer">
              <span className="text-slate-300">Repetir (Loop)</span>
              <input
                type="checkbox"
                checked={carouselSettings.loop !== false}
                onChange={(e) =>
                  onChangeCarouselSettings({ ...carouselSettings, loop: e.target.checked })
                }
                className="rounded accent-amber-400"
              />
            </label>

            {/* Velocidade */}
            <div className="col-span-2 flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
              <span className="text-slate-300">Velocidade:</span>
              <div className="flex items-center gap-1">
                {[2, 3, 4, 5, 6].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => onChangeCarouselSettings({ ...carouselSettings, speed: sec })}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      (carouselSettings.speed || 3) === sec
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Photos List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Images size={14} className="text-amber-400" />
            <span>Fotos da Galeria ({items.length})</span>
          </label>

          <button
            type="button"
            onClick={handleAddPhoto}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm shadow-amber-400/20"
          >
            <Plus size={13} />
            <span>Adicionar Foto</span>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-2">
            <p className="text-xs text-slate-400">Nenhuma foto adicionada à galeria ainda.</p>
            <button
              type="button"
              onClick={handleAddPhoto}
              className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              + Adicionar Primeira Foto
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 group hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 relative">
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Actions & Inputs */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-200">
                        Foto {String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* Reorder & Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 disabled:opacity-20 cursor-pointer"
                          title="Subir na ordem"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(idx)}
                          disabled={idx === items.length - 1}
                          className="p-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 disabled:opacity-20 cursor-pointer"
                          title="Descer na ordem"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(idx)}
                          className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer ml-1"
                          title="Remover foto"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Replace buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingIndex(idx);
                          fileInputRef.current?.click();
                        }}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Upload size={10} />
                        <span>Trocar Foto</span>
                      </button>

                      <input
                        type="url"
                        value={item.url}
                        onChange={(e) => handleUpdate(idx, { url: e.target.value })}
                        placeholder="Link da imagem..."
                        className="flex-1 px-2 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-slate-300 focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Caption input */}
                <input
                  type="text"
                  value={item.caption || ''}
                  onChange={(e) => handleUpdate(idx, { caption: e.target.value })}
                  placeholder="Legenda da foto (opcional)"
                  className="w-full px-2.5 py-1 text-[11px] rounded bg-white/5 border border-white/5 text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
