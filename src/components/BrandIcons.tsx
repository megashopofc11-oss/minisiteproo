import React from 'react';
import * as LucideIcons from 'lucide-react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  styleVariant?: '3d' | 'glass' | 'chrome' | 'outline' | 'minimal' | 'gradient' | 'duotone' | 'original' | 'glow' | 'filled' | 'premium';
}

// Brand SVG Icons (Licensed & official standard SVG paths)
export const BrandWhatsApp: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.93.55 3.73 1.5 5.26L2 22l4.89-1.46A9.957 9.957 0 0 0 12.004 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.83 14.18c-.25.7-1.43 1.34-1.97 1.4-.52.06-1.19.09-3.47-.85-2.91-1.21-4.78-4.2-4.93-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.86 2.1.94 2.25.08.16.13.34.03.55-.1.21-.15.34-.3.51-.15.18-.32.39-.46.53-.15.15-.31.32-.13.63.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.76-.17 1.46z" />
  </svg>
);

export const BrandInstagram: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const BrandTikTok: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.18 2.07 2.31 2.34.86.23 1.81.11 2.58-.33.72-.39 1.25-1.08 1.44-1.87.1-.4.15-.82.15-1.24V.02z" />
  </svg>
);

export const BrandGoogle: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

export const BrandFacebook: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const BrandGoogleMaps: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const BrandYouTube: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Unified Icon Renderer
export const AppIcon: React.FC<{
  name: string;
  size?: number | string;
  className?: string;
  styleVariant?: IconProps['styleVariant'];
}> = ({ name, size = 20, className = '', styleVariant = 'outline' }) => {
  const norm = name?.toLowerCase()?.trim() || '';

  // Brand icons
  if (norm === 'whatsapp') return <BrandWhatsApp size={size} className={className} />;
  if (norm === 'instagram') return <BrandInstagram size={size} className={className} />;
  if (norm === 'tiktok') return <BrandTikTok size={size} className={className} />;
  if (norm === 'google' || norm === 'googlereview') return <BrandGoogle size={size} className={className} />;
  if (norm === 'googlemaps' || norm === 'maps') return <BrandGoogleMaps size={size} className={className} />;
  if (norm === 'facebook') return <BrandFacebook size={size} className={className} />;
  if (norm === 'youtube' || norm === 'yt') return <BrandYouTube size={size} className={className} />;

  // Common aliases mapped to Lucide icons
  const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
    phone: LucideIcons.Phone,
    telefone: LucideIcons.Phone,
    location: LucideIcons.MapPin,
    map: LucideIcons.MapPin,
    pin: LucideIcons.MapPin,
    calendar: LucideIcons.Calendar,
    agenda: LucideIcons.Calendar,
    agendamento: LucideIcons.CalendarCheck,
    clock: LucideIcons.Clock,
    horario: LucideIcons.Clock,
    mail: LucideIcons.Mail,
    email: LucideIcons.Mail,
    share: LucideIcons.Share2,
    compartilhar: LucideIcons.Share2,
    link: LucideIcons.ExternalLink,
    scissors: LucideIcons.Scissors,
    sparkles: LucideIcons.Sparkles,
    star: LucideIcons.Star,
    heart: LucideIcons.Heart,
    check: LucideIcons.CheckCircle2,
    coffee: LucideIcons.Coffee,
    pizza: LucideIcons.Pizza,
    utensils: LucideIcons.Utensils,
    shoppingbag: LucideIcons.ShoppingBag,
    shirt: LucideIcons.Shirt,
    home: LucideIcons.Home,
    building: LucideIcons.Building2,
    dumbbell: LucideIcons.Dumbbell,
    activity: LucideIcons.Activity,
    car: LucideIcons.Car,
    navigation: LucideIcons.Navigation,
    wrench: LucideIcons.Wrench,
    settings: LucideIcons.Settings,
    cake: LucideIcons.Cake,
    gift: LucideIcons.Gift,
    award: LucideIcons.Award,
    shield: LucideIcons.ShieldCheck,
    zap: LucideIcons.Zap,
    gem: LucideIcons.Gem,
    camera: LucideIcons.Camera,
    message: LucideIcons.MessageCircle,
    compass: LucideIcons.Compass,
    crown: LucideIcons.Crown
  };

  const Component = iconMap[norm] || (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number | string; className?: string }>>)[name] || LucideIcons.Link;

  // Visual styling wrappers based on styleVariant (Professional Icon Library)
  if (styleVariant === '3d') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 text-white shadow-[0_4px_0_0_#0F172A] border-t border-white/25 transform active:translate-y-1 transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'glass') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm hover:bg-white/15 transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'chrome') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-tr from-slate-400 via-slate-100 to-slate-300 text-slate-900 border border-white/60 shadow-lg shadow-black/20 font-bold transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'gradient') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20 transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'duotone') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'outline') {
    return (
      <span className={`inline-flex items-center justify-center p-2 rounded-xl border border-current/40 text-current hover:border-current transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'glow') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.25)] border border-white/30 transition-all ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'filled') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-slate-800 text-slate-100 shadow-sm ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'premium') {
    return (
      <span className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20 ${className}`}>
        <Component size={size} />
      </span>
    );
  }
  if (styleVariant === 'minimal') {
    return <Component size={size} className={`opacity-80 hover:opacity-100 transition-opacity ${className}`} />;
  }

  return <Component size={size} className={className} />;
};
