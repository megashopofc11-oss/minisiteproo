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
  | '10-confeitaria';

export type TemplateLayout =
  | 'cinematic-split'
  | 'luxury-editorial'
  | 'dark-cyber'
  | 'glass-stacked'
  | 'bento-showcase'
  | 'minimal-center'
  | 'asymmetric-modern'
  | 'floating-hero'
  | 'bold-street'
  | 'diagonal-energy';

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
  | 'masonry'
  | 'editorial'
  | 'carousel'
  | 'cards'
  | 'horizontal-scroll'
  | 'collage'
  | 'overlap'
  | 'full-width';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  iconName: string;
  ctaText?: string;
  ctaUrl?: string;
  featured?: boolean;
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
  subtitle: string;
  description: string;
  about: string;
  logoUrl: string;
  avatarUrl: string;
  bannerUrl: string;
}

export interface ProjectData {
  projectId: string;
  userId: string;
  nome: string;
  nicho: NichoId;
  templateId: string;
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
}

export interface TemplateDefinition {
  id: string;
  nichoId: NichoId;
  index: number;
  name: string;
  styleName: string;
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
  badge: string;
  coverImage: string;
}
