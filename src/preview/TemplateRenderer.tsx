import React, { useState } from 'react';
import { ProjectData } from '../types';
import { CinematicEngine } from './engines/CinematicEngine';
import { EditorialEngine } from './engines/EditorialEngine';
import { StorytellingEngine } from './engines/StorytellingEngine';
import { BrutalistEngine } from './engines/BrutalistEngine';
import { GlassEngine } from './engines/GlassEngine';
import { MinimalLightEngine } from './engines/MinimalLightEngine';
import { ClassicClubEngine } from './engines/ClassicClubEngine';
import { BentoEngine } from './engines/BentoEngine';
import { SocialProfileEngine } from './engines/SocialProfileEngine';
import { SignatureLuxuryEngine } from './engines/SignatureLuxuryEngine';
import { ImmersiveEngine } from './engines/ImmersiveEngine';
import { OrbitalMotionEngine } from './engines/OrbitalMotionEngine';
import { X } from 'lucide-react';

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

  const getEngine = () => {
    // 1. Direct template index matching (ensures 100% distinct engine per model 01..10)
    if (templateId.endsWith('-01')) return <CinematicEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-02')) return <EditorialEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-03')) return <StorytellingEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-04')) return <BrutalistEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-05')) return <GlassEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-06')) return <MinimalLightEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-07')) return <ClassicClubEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-08')) return <BentoEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-09')) return <SocialProfileEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    if (templateId.endsWith('-10')) return <SignatureLuxuryEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;

    // 2. Fallback based on layout property
    switch (layout) {
      case 'editorial':
        return <EditorialEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'minimal':
        return <MinimalLightEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'glass':
        return <GlassEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'immersive':
        return <ImmersiveEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'bento':
        return <BentoEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'classic-club':
        return <ClassicClubEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'storytelling':
        return <StorytellingEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'brutalist':
      case 'urban':
        return <BrutalistEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'social-profile':
      case 'profile':
        return <SocialProfileEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'orbital':
      case 'motion':
        return <OrbitalMotionEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'signature':
        return <SignatureLuxuryEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
      case 'cinematic':
      default:
        return <CinematicEngine project={project} viewport={viewport} onPhotoClick={setActivePhotoModal} />;
    }
  };

  const containerClasses = {
    mobile: 'max-w-[420px] mx-auto p-4 sm:p-5',
    tablet: 'max-w-2xl mx-auto p-6 sm:p-8',
    desktop: 'max-w-4xl mx-auto p-8 sm:p-12'
  }[viewport];

  return (
    <main
      className={`min-h-screen w-full transition-colors duration-500 overflow-x-hidden`}
      style={{
        backgroundColor: project.theme?.background || '#07080C',
        color: project.theme?.text || '#F8FAFC'
      }}
    >
      <div className={`${containerClasses} pb-24`}>
        {getEngine()}
      </div>

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
