import { ProjectData } from '../../types';
import { V2ProjectData } from '../types';
import { getV2DesignById } from '../registry/templateRegistryV2';

/**
 * Normalizes any project (V1 legacy, intermediate, or V2) into a standard V2ProjectData structure.
 */
export const normalizeToV2ProjectData = (project: Partial<ProjectData> | Partial<V2ProjectData>): V2ProjectData => {
  const p = project as any;
  const legacyBio = p.projectData || {};
  const templateId = p.templateId || p.designConfig?.designId || '01-aura';
  const designMeta = getV2DesignById(templateId);

  // Extract brand name
  const brandName =
    p.brandName ||
    p.identity?.name ||
    legacyBio.brandName ||
    p.nome ||
    designMeta.demoData.brandName;

  // Extract headline & subtitle
  const headline =
    p.headline ||
    p.identity?.tagline ||
    legacyBio.headline ||
    designMeta.demoData.headline;

  const subheadline =
    p.subheadline ||
    p.identity?.badge ||
    legacyBio.subtitle ||
    designMeta.demoData.subheadline;

  const about =
    p.about ||
    p.identity?.bio ||
    legacyBio.about ||
    designMeta.demoData.about;

  const itemsTitle =
    p.itemsTitle ||
    legacyBio.itemsTitle ||
    designMeta.demoData.itemsTitle ||
    'Serviços & Especialidades';

  // Services / Items
  let items = p.items || legacyBio.items;
  if (!items && p.services && Array.isArray(p.services)) {
    items = p.services.map((s: any) => ({
      id: s.id,
      title: s.title,
      description: s.description || '',
      price: s.price || '',
      priceEnabled: s.priceEnabled || false,
      photoUrl: s.photoUrl,
      featured: s.featured
    }));
  }
  if (!items || items.length === 0) {
    items = designMeta.demoData.items;
  }

  // Gallery
  let gallery = p.gallery || legacyBio.gallery;
  if (!gallery && p.photos && Array.isArray(p.photos)) {
    gallery = p.photos.map((ph: any) => ({
      id: ph.id,
      url: ph.url,
      caption: ph.caption
    }));
  }
  if (!gallery) {
    gallery = designMeta.demoData.gallery || [];
  }

  // Socials
  const wa = p.socials?.whatsapp || legacyBio.whatsapp;
  const ig = p.socials?.instagram || legacyBio.instagram;
  const maps = p.socials?.maps || legacyBio.googleMaps;

  const socials = {
    whatsapp: {
      enabled: wa?.enabled ?? true,
      number: wa?.number || p.socials?.whatsappNumber || '11999999999',
      message: wa?.message || `Olá! Gostaria de falar com ${brandName}.`,
      label: wa?.label || 'Falar no WhatsApp'
    },
    instagram: {
      enabled: ig?.enabled ?? true,
      username: ig?.username || p.socials?.instagramUsername || '',
      url: ig?.url || (ig?.username ? `https://instagram.com/${ig.username.replace('@','')}` : '')
    },
    maps: {
      enabled: maps?.enabled ?? true,
      url: maps?.url || p.location?.mapsUrl || ''
    }
  };

  // Location
  const loc = p.location || legacyBio.location || {};
  const location = {
    address: loc.address || 'Atendimento Digital & Presencial',
    city: loc.city || 'São Paulo - SP',
    phone: loc.phone || '',
    hours: loc.hours || 'Segunda a Sexta',
    mapsUrl: loc.mapsUrl || ''
  };

  // Visual Assets
  const logoUrl = p.logoUrl || p.identity?.logoUrl || legacyBio.logoUrl || '';
  const heroImageUrl = p.heroImageUrl || p.identity?.bannerUrl || legacyBio.heroImageUrl || designMeta.demoData.heroImageUrl;
  const professionalPhotoUrl = p.professionalPhotoUrl || legacyBio.professionalPhotoUrl || designMeta.demoData.professionalPhotoUrl;

  return {
    engineVersion: 2,
    templateId,
    brandName,
    segment: p.segment || legacyBio.segment || designMeta.demoData.segment,
    headline,
    subheadline,
    about,
    itemsTitle,
    items,
    gallery,
    logoUrl,
    professionalPhotoUrl,
    heroImageUrl,
    socials,
    location,
    sectionsVisibility: p.sectionsVisibility || legacyBio.sectionsVisibility,
    designOverrides: p.designOverrides || legacyBio.designOverrides
  };
};

/**
 * Universal Template Engine V2
 * Renders the EXACT same standalone HTML for:
 * 1. Live Preview iframe (srcdoc)
 * 2. Editor iframe (srcdoc)
 * 3. HTML Direct Download
 * 4. ZIP Package Export
 */
export const renderTemplateV2 = (project: Partial<ProjectData> | Partial<V2ProjectData>): string => {
  const normalized = normalizeToV2ProjectData(project);
  const design = getV2DesignById(normalized.templateId);
  return design.renderer(normalized);
};
