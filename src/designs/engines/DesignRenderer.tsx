import React from 'react';
import { ProjectData } from '../../types';
import { BioProjectData, BioDesignConfig, DesignId } from '../../types/designs';
import { getDesignById, normalizeProjectDataAndConfig } from '../registry';
import { CinematicDesign } from './CinematicDesign';
import { PersonalBrandDesign } from './PersonalBrandDesign';
import { EditorialDesign } from './EditorialDesign';
import { GraphicBioDesign } from './GraphicBioDesign';
import { LuxuryDesign } from './LuxuryDesign';

interface DesignRendererProps {
  project?: ProjectData;
  data?: BioProjectData;
  config?: BioDesignConfig;
  onCtaClick?: () => void;
}

export const DesignRenderer: React.FC<DesignRendererProps> = ({
  project,
  data: propData,
  config: propConfig,
  onCtaClick
}) => {
  let finalData: BioProjectData;
  let finalConfig: BioDesignConfig;

  if (propData && propConfig) {
    finalData = propData;
    finalConfig = propConfig;
  } else if (project) {
    const normalized = normalizeProjectDataAndConfig(project);
    finalData = normalized.projectData;
    finalConfig = normalized.designConfig;
  } else {
    return null;
  }

  const meta = getDesignById(finalConfig.designId);
  const palette = meta.palettes.find((p) => p.id === finalConfig.paletteId) || meta.palettes[0] || getDesignById('01-cinematic').palettes[0];
  const typography = meta.typographies.find((t) => t.id === finalConfig.typographyId) || meta.typographies[0] || getDesignById('01-cinematic').typographies[0];

  const engineProps = {
    data: finalData,
    config: finalConfig,
    palette,
    typography,
    onCtaClick
  };

  switch (finalConfig.designId) {
    case '01-cinematic':
    case '09-showcase':
    case '10-bold':
    case '11-glass':
    case '13-full-photo':
      return <CinematicDesign {...engineProps} />;

    case '02-personal-brand':
    case '12-social-profile':
    case '14-split':
    case '17-corporate':
    case '19-portfolio':
      return <PersonalBrandDesign {...engineProps} />;

    case '03-editorial':
    case '06-minimal':
    case '08-story':
    case '16-magazine':
      return <EditorialDesign {...engineProps} />;

    case '04-graphic-bio':
    case '07-bento':
    case '15-poster':
    case '18-local-business':
      return <GraphicBioDesign {...engineProps} />;

    case '05-luxury':
    case '20-signature':
    default:
      return <LuxuryDesign {...engineProps} />;
  }
};
