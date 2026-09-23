import { PhotoItem, SectionKey } from './index';

export type DesignId =
  | '01-cinematic'
  | '02-personal-brand'
  | '03-editorial'
  | '04-graphic-bio'
  | '05-luxury'
  | '06-minimal'
  | '07-bento'
  | '08-story'
  | '09-showcase'
  | '10-bold'
  | '11-glass'
  | '12-social-profile'
  | '13-full-photo'
  | '14-split'
  | '15-poster'
  | '16-magazine'
  | '17-corporate'
  | '18-local-business'
  | '19-portfolio'
  | '20-signature';

export type HeroVariant = 'A' | 'B' | 'C' | 'D';
export type ContentVariant = 'A' | 'B' | 'C';
export type GalleryVariant = 'A' | 'B' | 'C' | 'D';
export type CtaVariant = 'A' | 'B' | 'C';
export type ContactVariant = 'A' | 'B' | 'C';
export type MotionLevel = 'none' | 'subtle' | 'cinematic';

export interface BioItem {
  id: string;
  title: string;
  description: string;
  photoUrl?: string;
  linkUrl?: string;
  price?: string;
  priceEnabled?: boolean; // OFF por padrão
  featured?: boolean;
  tag?: string;
}

export interface BioSocialLinks {
  whatsapp?: { enabled: boolean; number: string; message: string; label: string };
  instagram?: { enabled: boolean; username: string; url: string };
  tiktok?: { enabled: boolean; username: string; url: string };
  facebook?: { enabled: boolean; url: string };
  google?: { enabled: boolean; url: string };
  googleReview?: { enabled: boolean; url: string; rating: number; count: number; title?: string };
  googleMaps?: { enabled: boolean; url: string };
}

export interface BioLocation {
  address: string;
  city: string;
  phone: string;
  hours: string;
  mapsUrl: string;
}

export interface BioProjectData {
  brandName: string;
  segment: string;
  logoUrl: string;
  professionalPhotoUrl: string; // PNG pessoa/profissional
  heroImageUrl: string; // Foto de fundo ou hero
  headline: string;
  subtitle: string;
  about: string;
  itemsTitle: string; // "Serviços", "Especialidades", "Soluções", etc.
  items: BioItem[];
  gallery: PhotoItem[];
  whatsapp: { enabled: boolean; number: string; message: string; label: string };
  instagram: { enabled: boolean; username: string; url: string };
  tiktok: { enabled: boolean; username: string; url: string };
  facebook: { enabled: boolean; url: string };
  google: { enabled: boolean; url: string };
  googleReview: { enabled: boolean; url: string; rating: number; count: number; title: string };
  googleMaps: { enabled: boolean; url: string };
  location: BioLocation;
  hours: string;
  badge?: string;
  quote?: string;
}

export interface DesignPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  cardBg: string;
  border: string;
  glow?: string;
}

export interface DesignTypography {
  id: string;
  name: string;
  headingFont: string; // CSS font-family
  bodyFont: string;
  fontCategory: string;
}

export interface BioDesignConfig {
  designId: DesignId;
  heroVariant: HeroVariant;
  contentVariant: ContentVariant;
  galleryVariant: GalleryVariant;
  ctaVariant: CtaVariant;
  contactVariant: ContactVariant;
  paletteId: string;
  typographyId: string;
  motionLevel: MotionLevel;
}

export interface DesignMeta {
  id: DesignId;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  previewImage: string;
  badge: string;
  palettes: DesignPalette[];
  typographies: DesignTypography[];
  heroVariants: { id: HeroVariant; name: string; description: string }[];
  contentVariants: { id: ContentVariant; name: string; description: string }[];
  galleryVariants: { id: GalleryVariant; name: string; description: string }[];
  ctaVariants: { id: CtaVariant; name: string; description: string }[];
  contactVariants: { id: ContactVariant; name: string; description: string }[];
  demoData: BioProjectData;
}
