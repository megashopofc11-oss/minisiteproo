export type V2Family =
  | 'cinematic'
  | 'editorial'
  | 'graphic'
  | 'personal'
  | 'immersive'
  | 'minimal'
  | 'portfolio'
  | 'bento'
  | 'poster'
  | 'story';

export type V2Tone = 'claro' | 'escuro' | 'colorido' | 'editorial' | 'minimalista' | 'fotografico' | 'criativo';

export type V2RailKey =
  | 'destaques'
  | 'impacto'
  | 'elegantes'
  | 'fotografia'
  | 'ousados'
  | 'locais';

export interface V2ServiceItem {
  id: string;
  title: string;
  description: string;
  photoUrl?: string;
  price?: string;
  priceEnabled?: boolean; // Padrão: false (desligado)
  featured?: boolean;
  tag?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export interface V2GalleryItem {
  id: string;
  url: string;
  caption?: string;
  alt?: string;
}

export interface V2TestimonialItem {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

export interface V2SocialLinks {
  whatsapp?: { enabled: boolean; number: string; message: string; label: string };
  instagram?: { enabled: boolean; username: string; url: string };
  tiktok?: { enabled: boolean; username: string; url: string };
  facebook?: { enabled: boolean; url: string };
  google?: { enabled: boolean; url: string };
  googleReview?: { enabled: boolean; url: string; rating: number; count: number; title?: string };
  maps?: { enabled: boolean; url: string };
  phone?: { enabled: boolean; number: string };
  email?: { enabled: boolean; address: string };
}

export interface V2Location {
  address: string;
  city: string;
  phone: string;
  hours: string;
  mapsUrl: string;
}

export interface V2ProjectData {
  engineVersion: 2;
  templateId: string;
  brandName: string;
  segment: string;
  headline: string;
  subheadline: string;
  about: string;
  itemsTitle: string; // "Especialidades", "Serviços", "Cardápio", etc.
  items: V2ServiceItem[];
  gallery: V2GalleryItem[];
  testimonials?: V2TestimonialItem[];
  differentials?: Array<{ id: string; title: string; description: string; iconName?: string }>;
  logoUrl?: string;
  professionalPhotoUrl?: string; // Foto PNG recortada da pessoa
  heroImageUrl?: string; // Foto principal de fundo ou banner
  quote?: string;
  badge?: string;
  signatureWord?: string;
  socials: V2SocialLinks;
  location: V2Location;
  sectionsVisibility?: {
    hero?: boolean;
    about?: boolean;
    services?: boolean;
    gallery?: boolean;
    testimonials?: boolean;
    location?: boolean;
    contact?: boolean;
    cta?: boolean;
  };
  designOverrides?: {
    paletteId?: string;
    typographyId?: string;
    motionLevel?: 'none' | 'subtle' | 'cinematic';
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  };
}

export interface V2DesignMeta {
  id: string; // Ex: '01-aura'
  code: string; // '01'
  name: string; // 'AURA'
  family: V2Family;
  tone: V2Tone;
  tagline: string;
  description: string;
  rails: V2RailKey[];
  tags: string[];
  cover: {
    background: string;
    primary: string;
    accent: string;
    textColor: string;
    surfaceColor: string;
    badgeText: string;
    sampleImage: string;
    heroHeadline: string;
    fontHeading: string;
  };
  demoData: V2ProjectData;
  renderer: (project: V2ProjectData) => string;
}
