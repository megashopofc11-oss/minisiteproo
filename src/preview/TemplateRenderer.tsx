import React, { useState } from 'react';
import { ProjectData } from '../types';
import { CinematicEngine } from './engines/CinematicEngine';
import { MinimalLightEngine } from './engines/MinimalLightEngine';
import { EditorialEngine } from './engines/EditorialEngine';
import { ClassicClubEngine } from './engines/ClassicClubEngine';
import { BrutalistEngine } from './engines/BrutalistEngine';
import { ProfessionalAuthorityEngine } from './engines/ProfessionalAuthorityEngine';
import { CompactProfileEngine } from './engines/CompactProfileEngine';
import { BentoEngine } from './engines/BentoEngine';
import { StorytellingEngine } from './engines/StorytellingEngine';
import { ImmersiveEngine } from './engines/ImmersiveEngine';
import { GlassEngine } from './engines/GlassEngine';
import { SignatureLuxuryEngine } from './engines/SignatureLuxuryEngine';
import { OrbitalMotionEngine } from './engines/OrbitalMotionEngine';
import { SocialProfileEngine } from './engines/SocialProfileEngine';
import { getWhatsAppUrl } from './engines/common';
import { BrandWhatsApp } from '../components/BrandIcons';
import { X, AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class TemplateErrorBoundary extends React.Component<
  { children: React.ReactNode; templateId?: string; nicho?: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; templateId?: string; nicho?: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[TemplateRenderError]', {
      templateId: this.props.templateId,
      nicho: this.props.nicho,
      error,
      componentStack: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-8 text-center bg-rose-950/40 border border-rose-500/40 rounded-3xl text-rose-200 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Falha ao renderizar biosite</h3>
            <p className="text-xs text-rose-300">
              Modelo: <span className="font-mono">{this.props.templateId || 'desconhecido'}</span>
            </p>
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-relaxed">
            {this.state.error?.message || 'Ocorreu uma instabilidade pontual neste template.'}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/30 transition-colors"
          >
            <RefreshCw size={13} />
            <span>Tentar Novamente</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface TemplateRendererProps {
  project: ProjectData;
  viewport?: 'mobile' | 'tablet' | 'desktop';
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  project,
  viewport = 'mobile'
}) => {
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

  // Determine the engine variant based on templateId or explicit layout
  const templateId = project.templateId || '';
  const layout = project.layout || '';
  const waUrl = getWhatsAppUrl(project);

  const getEngine = () => {
    // 1. Direct template index matching (THE 5 DIVERSE ENGINES PER NICHE)
    // MODELO 01 — CINEMATIC / IMPACT
    if (templateId.endsWith('-01')) return <CinematicEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    // MODELO 02 — EDITORIAL / LIGHT (Off-white, magazine serif, vertical photo)
    if (templateId.endsWith('-02')) return <EditorialEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    // MODELO 03 — URBAN / BRUTALIST (Industrial graphite, punchy accents, sharp boxes)
    if (templateId.endsWith('-03')) return <BrutalistEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    // MODELO 04 — MINIMAL / CLEAN (100% pure white, zero photos required)
    if (templateId.endsWith('-04')) return <MinimalLightEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    // MODELO 05 — SIGNATURE / EXPERIMENTAL (Jewel/petroleum tones, wax seal, chrome)
    if (templateId.endsWith('-05')) return <SignatureLuxuryEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;

    // 2. Backward compatibility mapping for legacy projects (06..10)
    if (templateId.endsWith('-06')) return <ProfessionalAuthorityEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-07')) return <CompactProfileEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-08')) return <BentoEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-09')) return <StorytellingEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-10')) return <ImmersiveEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;

    // 3. Fallback based on layout property
    switch (layout) {
      case 'editorial':
        return <EditorialEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'brutalist':
      case 'urban':
        return <BrutalistEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'minimal':
        return <MinimalLightEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'signature':
        return <SignatureLuxuryEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'classic-club':
        return <ClassicClubEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'authority':
        return <ProfessionalAuthorityEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'compact-profile':
        return <CompactProfileEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'bento':
        return <BentoEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'storytelling':
        return <StorytellingEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'immersive':
        return <ImmersiveEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'glass':
        return <GlassEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'orbital':
      case 'motion':
        return <OrbitalMotionEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'social-profile':
      case 'profile':
        return <SocialProfileEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'cinematic':
      default:
        return <CinematicEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    }
  };

  const containerClasses = {
    mobile: 'max-w-[430px] mx-auto p-4 sm:p-5',
    tablet: 'max-w-2xl mx-auto p-6 sm:p-8',
    desktop: 'max-w-4xl mx-auto p-8 sm:p-12'
  }[viewport];

  // Contrast safe background and text
  const bg = project.theme?.background || '#07080D';
  const isLightBg = bg.toLowerCase().startsWith('#f') || bg.toLowerCase() === '#ffffff';
  const text = project.theme?.text || (isLightBg ? '#0F172A' : '#F8FAFC');

  return (
    <main
      className="min-h-screen w-full transition-colors duration-500 overflow-x-hidden relative"
      style={{
        backgroundColor: bg,
        color: text
      }}
    >
      <div className={`${containerClasses} pb-28`}>
        <TemplateErrorBoundary templateId={templateId} nicho={project.nicho}>
          {getEngine()}
        </TemplateErrorBoundary>
      </div>

      {/* Floating WhatsApp Button with Pulsing Glow */}
      {project.whatsappConfig?.showFloating !== false && waUrl !== '#' && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-6 right-6 z-40 group flex items-center justify-center cursor-pointer select-none"
        >
          {/* Animated pulsing glow effect */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping opacity-75" />
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
          <div className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all">
            <BrandWhatsApp size={30} />
          </div>
        </a>
      )}

      {/* Global Image Lightbox Modal */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhotoModal(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors cursor-pointer"
            >
              <X size={28} />
            </button>
            <img
              src={activePhotoModal}
              alt="Ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
};
