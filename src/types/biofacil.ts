export type BioFacilFieldType =
  | 'text'
  | 'textarea'
  | 'phone'
  | 'email'
  | 'url'
  | 'image'
  | 'gallery'
  | 'color'
  | 'select'
  | 'services'
  | 'testimonials'
  | 'hours'
  | 'address'
  | 'social';

export interface BioFacilFieldOption {
  label: string;
  value: string;
}

export interface BioFacilServiceItem {
  id?: string;
  name: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  link?: string;
  tag?: string;
}

export interface BioFacilGalleryItem {
  id?: string;
  url: string;
  caption?: string;
}

export interface BioFacilTestimonialItem {
  id?: string;
  name: string;
  content: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
}

export interface BioFacilFieldDefinition {
  id: string;
  label: string;
  type: BioFacilFieldType;
  section?: 'identity' | 'content' | 'photos' | 'services' | 'reviews' | 'contact' | 'location' | string;
  description?: string;
  contextHint?: string; // Visual cue of where the field appears in the site (e.g., "Texto grande no início")
  placeholder?: string;
  defaultValue?: any;
  options?: BioFacilFieldOption[];
  required?: boolean;
}

export type GalleryLayoutStyle = 'original' | 'carousel' | 'grid' | 'horizontal' | 'vertical' | 'masonry' | 'collage';
export type IconVisualVariant = 'original' | 'minimal' | 'glass' | 'glow' | 'neon' | '3d';
export type IconStyleVariant = IconVisualVariant;
export type VisualEffectPreset = 'original' | 'soft' | 'glow' | 'glass' | '3d';
export type VisualEffectVariant = VisualEffectPreset;
export type ColorPalettePresetId = 'original' | 'light' | 'dark' | 'neon' | 'luxury' | 'vibrant';

export interface BioFacilCustomColorVar {
  varName: string;
  label: string;
  defaultColor: string;
}

export interface BioFacilColorPreset {
  id: ColorPalettePresetId | string;
  name: string;
  colors: Record<string, string>; // CSS variable name (e.g. '--primary') -> color hex
}

export interface BioFacilCapabilities {
  gallery?: boolean;
  supportedGalleryLayouts?: GalleryLayoutStyle[];
  carouselOptions?: {
    autoplay?: boolean;
    speed?: number;
    indicators?: boolean;
    arrows?: boolean;
    loop?: boolean;
    effects?: ('slide' | 'fade' | 'scale')[];
  };
  imageBehaviors?: ('normal' | 'fixed' | 'parallax')[];
  services?: boolean;
  servicesLabel?: string;
  allowPrice?: boolean;
  testimonials?: boolean;
  testimonialsLabel?: string;
  location?: boolean;
  googleReviews?: boolean;
  colorCustomization?: boolean;
  supportedColorPresets?: BioFacilColorPreset[];
  customColors?: { varName: string; label: string; defaultColor: string }[];
  supportedIconStyles?: IconVisualVariant[];
  supportedEffects?: VisualEffectPreset[];
}

export interface BioFacilManifest {
  version: number;
  templateId: string;
  name: string;
  category: string;
  tagline?: string;
  fields: BioFacilFieldDefinition[];
  capabilities?: BioFacilCapabilities;
}

export type TemplateStatus = 'draft' | 'published' | 'disabled';

export interface BioFacilTemplate {
  templateId: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  demoUrl: string;
  thumbnailUrl: string;
  sourceFileReference?: string;
  status: TemplateStatus;
  version: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  biofacilSchema: BioFacilManifest;
  htmlContent?: string;
  hasSourceZip?: boolean;
  zipStorageKey?: string;
  assets?: Record<string, string>; // path -> data URI or text for standalone preview
}

export interface BioFacilUserProject {
  projectId: string;
  userId: string;
  templateId: string;
  templateVersion: number;
  projectName: string;
  values: Record<string, any>;
  createdAt: number;
  updatedAt: number;
  engineVersion?: number;
}

export interface NichoCategory {
  id: string;
  name: string;
  description: string;
}

export const INITIAL_NICHES: NichoCategory[] = [
  { id: 'barbearia', name: 'Barbearia', description: 'Cortes masculinos, barboterapia e visual retrô ou urbano' },
  { id: 'manicure', name: 'Manicure / Nail Designer', description: 'Alongamento em gel, nail art e cuidados de unhas' },
  { id: 'salao', name: 'Salão de Beleza', description: 'Cabelo, colorimetria, penteados e estética' },
  { id: 'pizzaria', name: 'Pizzaria / Gastronomia', description: 'Pizzarias, restaurantes, lanchonetes e bares' },
  { id: 'boutique', name: 'Boutique / Moda', description: 'Roupas, acessórios, sapatos e marcas autorais' },
  { id: 'corretor', name: 'Corretor / Imóveis', description: 'Lançamentos imobiliários, aluguel e venda' },
  { id: 'personal', name: 'Personal Trainer', description: 'Consultoria fitness, treinos online e presenciais' },
  { id: 'motorista', name: 'Motorista Particular', description: 'Transfers executivos, viagens e transporte privado' },
  { id: 'mecanica', name: 'Mecânica / Oficina', description: 'Reparos automotivos, troca de óleo e auto center' },
  { id: 'confeitaria', name: 'Confeitaria / Doces', description: 'Bolos decorados, doces finos e sobremesas' }
];
