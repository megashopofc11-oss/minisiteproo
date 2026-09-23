export type UserRole = 'admin' | 'user';
export type UserStatus = 'pending' | 'approved' | 'rejected' | 'blocked' | 'pendente' | 'aprovado' | 'rejeitado' | 'bloqueado';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  nome?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: number;
  approvedAt?: number;
  approvedBy?: string;
  rejectedAt?: number;
  blockedAt?: number;
  updatedAt?: number;
}

export type NichoId =
  | '01-barbearia'
  | '02-manicure'
  | '03-salao'
  | '04-pizzaria'
  | '05-boutique'
  | '06-corretor'
  | '07-personal'
  | '08-motorista'
  | '09-mecanica'
  | '10-confeitaria'
  | '11-advocacia'
  | '12-estetica'
  | '13-refrigeracao'
  | '14-pintor'
  | '15-fotografo';

export type TemplateLayout =
  | 'cinematic'
  | 'graphic-bio'
  | 'editorial'
  | 'glass'
  | 'immersive'
  | 'minimal'
  | 'bento'
  | 'storytelling'
  | 'brutalist'
  | 'orbital'
  | 'signature'
  | 'urban'
  | 'classic-club'
  | 'profile-poster'
  | 'sport'
  | 'magazine'
  | 'nordic'
  | 'split-screen'
  | 'ice-white'
  | 'refrigeracao-story'
  | 'estetica-glow'
  | 'advocacia-authority'
  | 'food-park-blocks'
  | 'social-profile'
  | 'authority'
  | 'compact-profile'
  | 'motion'
  | 'profile'
  // Backward compatibility aliases
  | 'story'
  | 'cards'
  | 'neon'
  | 'cinematic-luxury'
  | 'glass-premium'
  | '3d-glow'
  | 'minimal-luxury'
  | 'dark-experience'
  | 'immersive-photo'
  | 'modern-cards'
  | 'neon-motion';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
export type LogoAlign = 'left' | 'center' | 'right';
export type LogoPosition = 'hero' | 'top' | 'floating';
export type LogoBackground = 'none' | 'glass' | 'light' | 'dark';

export interface LogoConfig {
  size: LogoSize;
  align: LogoAlign;
  position: LogoPosition;
  background: LogoBackground;
}

export type ServiceLayoutStyle =
  | 'cards'
  | 'minimal-list'
  | 'icons-grid'
  | 'editorial'
  | 'horizontal-scroll'
  | 'accordion'
  | 'tags'
  | 'photo-cards'
  | 'timeline';

export type FontCategory =
  | 'MODERNA'
  | 'ELEGANTE'
  | 'BOLD'
  | 'EDITORIAL'
  | 'MINIMAL'
  | 'ESPORTIVA';

export type SocialIconStyle =
  | '3d'
  | 'glass'
  | 'chrome'
  | 'outline'
  | 'minimal'
  | 'gradient'
  | 'duotone'
  | 'original'
  | 'solid'
  | 'glow';

export type WhatsAppStyle =
  | 'floating'
  | 'button'
  | 'card'
  | 'circular';

export type SectionKey =
  | 'hero'
  | 'status'
  | 'about'
  | 'differentials'
  | 'services'
  | 'gallery'
  | 'reviews'
  | 'hours'
  | 'location'
  | 'socials'
  | 'cta'
  | 'faq';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  cardBg: string;
  border: string;
  fontHeading: string;
  fontBody: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  alt: string;
  position: number;
}

export type GalleryStyle =
  | 'single'
  | 'carousel'
  | 'grid'
  | 'masonry'
  | 'lookbook'
  | 'collage'
  | 'horizontal-scroll'
  | 'fullscreen'
  | 'editorial'
  | 'cards'
  | 'bento'
  | 'polaroid'
  | 'overlap'
  | 'full-width'
  | 'none';

export interface CarouselConfig {
  autoplay?: boolean;
  interval?: number; // 2, 3, 4, 5, 6 seconds
  loop?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  transition?: 'slide' | 'fade' | 'scale';
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price?: string; // Optional! No forced price
  priceEnabled?: boolean; // Default false. If false, price is hidden
  imageUrl?: string;
  thumbnailUrl?: string;
  iconName?: string;
  ctaText?: string;
  ctaUrl?: string;
  featured?: boolean;
  tag?: string; // e.g. "🔥 Clique para saber mais", "📞 Pedir de agora", "📍 Abrir google maps"
  visualType?: 'pizza' | 'whatsapp' | 'maps' | 'phone' | 'laptop' | 'image' | 'custom';
  actionText?: string; // e.g. "CLIQUE AQUI", "SAIBA MAIS"
}

export interface DifferentialItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

export interface CustomButton {
  id: string;
  text: string;
  url: string;
  iconName: string;
  style: 'solid' | 'outline' | 'glass' | 'gradient' | 'glow' | '3d' | 'minimal';
  color: string;
  size: 'sm' | 'md' | 'lg';
  align: 'left' | 'center' | 'right';
}

export interface SocialLinks {
  whatsapp: { enabled: boolean; number: string; message: string; label: string };
  instagram: { enabled: boolean; username: string; url: string };
  tiktok: { enabled: boolean; username: string; url: string };
  google: { enabled: boolean; url: string };
  googleReview: { enabled: boolean; url: string };
  facebook: { enabled: boolean; url: string };
}

export interface LocationInfo {
  address: string;
  city: string;
  phone: string;
  hours: string;
  mapsUrl: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  ogImage: string;
  favicon: string;
}

export interface ProjectIdentity {
  name: string;
  slogan: string;
  badge: string;
  title: string;
  headline?: string;
  subtitle: string;
  description: string;
  about: string;
  logoUrl: string;
  professionalPhotoUrl?: string; // Foto PNG recortada da pessoa/profissional
  avatarUrl: string;
  bannerUrl: string;
  heroImageUrl?: string;
  quote?: string;
  highlightWord?: string;
  verifiedBadge?: boolean;
  signatureWord?: string;
  signatureFont?: boolean;
  categoryTags?: string[];
}

export interface StatusConfig {
  enabled: boolean;
  autoCalculate: boolean;
  openTime: string; // e.g. "09:00"
  closeTime: string; // e.g. "19:00"
  customText?: string; // e.g. "ABERTO AGORA" or "FECHADO NO MOMENTO"
  customMessage?: string; // e.g. "Atendimento por ordem de chegada ou agendamento"
}

export interface WhatsAppConfig {
  enabled: boolean;
  number: string;
  message: string;
  label: string;
  style: WhatsAppStyle;
  floatingPosition: 'right' | 'left';
  showFloating: boolean;
}

export interface GoogleReviewConfig {
  enabled: boolean;
  url: string;
  rating: number; // e.g. 5.0
  reviewCount: number; // e.g. 128
  title: string; // e.g. "NOS AVALIE NO GOOGLE"
  subtitle: string; // e.g. "Sua opinião faz a diferença."
  style: 'gold' | 'glass' | 'minimal';
}

export interface ShareConfig {
  enabled: boolean;
  label: string;
}

import { BioProjectData, BioDesignConfig, BioItem, DesignId } from './designs';
export * from './designs';

export interface ProjectData {
  projectId: string;
  userId: string;
  nome: string;
  nicho: NichoId;
  templateId: string;
  layout?: TemplateLayout;
  createdAt: number;
  updatedAt: number;
  identity: ProjectIdentity;
  theme: ThemeConfig;
  photos: PhotoItem[];
  galleryStyle: GalleryStyle;
  services: ServiceItem[];
  buttons: CustomButton[];
  socials: SocialLinks;
  location: LocationInfo;
  seo: SeoConfig;

  // New Architecture (Separation of Data and Design)
  legacyTemplate?: boolean;
  projectData?: BioProjectData;
  designConfig?: BioDesignConfig;
  itemsTitle?: string;

  // Premium Features & Upgrades
  professionalPhotoUrl?: string; // Foto recortada PNG de pessoa
  heroImageUrl?: string;
  priceEnabled?: boolean; // Default false - services hide price
  testimonials?: TestimonialItem[];
  usePhotos?: boolean;
  showLogo?: boolean;
  carouselConfig?: CarouselConfig;
  logoConfig?: LogoConfig;
  fontCategory?: FontCategory;
  socialIconStyle?: SocialIconStyle;
  serviceLayout?: ServiceLayoutStyle;
  heroLayout?: 'full-photo' | 'center-logo' | 'split' | 'orbital' | 'editorial' | 'minimal';
  differentials?: DifferentialItem[];
  sectionsOrder?: SectionKey[];
  sectionsVisibility?: Partial<Record<SectionKey, boolean>>;
  statusConfig?: StatusConfig;
  whatsappConfig?: WhatsAppConfig;
  googleReviewConfig?: GoogleReviewConfig;
  shareConfig?: ShareConfig;
}

export interface TemplateDefinition {
  id: string;
  nichoId: NichoId;
  index: number;
  name: string;
  styleName: string;
  tagline?: string;
  description: string;
  layout: TemplateLayout;
  galleryStyle: GalleryStyle;
  defaultTheme: ThemeConfig;
  defaultData: Omit<ProjectData, 'projectId' | 'userId' | 'createdAt' | 'updatedAt'>;
}

export interface NichoInfo {
  id: NichoId;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  iconName: string;
  vibe: string;
  accentColor: string;
  secondaryColor?: string;
  accentGlow?: string;
  badge: string;
  coverImage: string;
  tagline?: string;
  highlights?: string[];
}
