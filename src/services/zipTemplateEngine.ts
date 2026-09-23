import JSZip from 'jszip';
import {
  BioFacilManifest,
  BioFacilFieldDefinition,
  BioFacilServiceItem,
  BioFacilGalleryItem,
  BioFacilTestimonialItem
} from '../types/biofacil';

export interface ZipValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  manifest?: BioFacilManifest;
  rawHtml?: string;
  assetsCount: number;
  fieldsMatched: string[];
  fieldsMissingInHtml: string[];
  zipBlob?: Blob;
  assetsMap?: Record<string, string>; // relative path -> data URL, blob URL or text
  originalImages?: Record<string, string>; // fieldId -> original src
  originalTexts?: Record<string, string>; // fieldId -> original text from template HTML
}

/**
 * Normalizes WhatsApp phone number into international standard wa.me link.
 * Accepts: "(34) 99999-9999", "34999999999", "+55 34 99999-9999", or already a wa.me URL.
 */
export function formatWhatsAppUrl(phone: string, text: string = ''): string {
  if (!phone || typeof phone !== 'string') return '#';
  const trimmed = phone.trim();
  if (!trimmed) return '#';

  if (trimmed.startsWith('https://wa.me/') || trimmed.startsWith('http://wa.me/')) {
    return trimmed;
  }

  const clean = trimmed.replace(/\D/g, '');
  if (!clean) return '#';

  // If Brazilian phone without country code (10 or 11 digits)
  const withCountry = (clean.length === 10 || clean.length === 11) && !clean.startsWith('55')
    ? `55${clean}`
    : clean;

  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${withCountry}${encodedText}`;
}

/**
 * Normalizes Instagram username or link into https://instagram.com/usuario
 */
export function formatInstagramUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  let clean = input.trim();
  if (!clean) return '#';

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  if (clean.startsWith('@')) {
    clean = clean.substring(1);
  }
  return `https://instagram.com/${clean}`;
}

/**
 * Normalizes TikTok username or link into https://tiktok.com/@usuario
 */
export function formatTikTokUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  let clean = input.trim();
  if (!clean) return '#';

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  if (clean.startsWith('@')) {
    clean = clean.substring(1);
  }
  return `https://tiktok.com/@${clean}`;
}

/**
 * Normalizes Facebook into https://facebook.com/...
 */
export function formatFacebookUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  const clean = input.trim();
  if (!clean) return '#';

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  return `https://facebook.com/${clean}`;
}

/**
 * Normalizes YouTube channel or link into https://youtube.com/...
 */
export function formatYouTubeUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  let clean = input.trim();
  if (!clean) return '#';

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  if (!clean.startsWith('@')) {
    clean = `@${clean}`;
  }
  return `https://youtube.com/${clean}`;
}

/**
 * Normalizes Google Maps address or URL into valid maps link
 */
export function formatGoogleMapsUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  const clean = input.trim();
  if (!clean) return '#';

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  return `https://maps.google.com/?q=${encodeURIComponent(clean)}`;
}

/**
 * Normalizes telephone number into tel:
 */
export function formatPhoneUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  const clean = input.replace(/\D/g, '');
  if (!clean) return '#';
  return `tel:${clean}`;
}

/**
 * Normalizes email address into mailto:
 */
export function formatEmailUrl(input: string): string {
  if (!input || typeof input !== 'string') return '#';
  const clean = input.trim();
  if (!clean) return '#';
  if (clean.startsWith('mailto:')) return clean;
  return `mailto:${clean}`;
}

/**
 * Normalizes any link field automatically according to field definition and id
 */
export function normalizeFieldLink(field: BioFacilFieldDefinition, val: string): string {
  if (!val || typeof val !== 'string') return '#';
  const idLower = field.id.toLowerCase();
  const typeLower = field.type.toLowerCase();

  if (typeLower === 'phone' || idLower.includes('whatsapp') || idLower.includes('zap')) {
    return formatWhatsAppUrl(val);
  }
  if (idLower.includes('instagram') || idLower.includes('insta')) {
    return formatInstagramUrl(val);
  }
  if (idLower.includes('tiktok')) {
    return formatTikTokUrl(val);
  }
  if (idLower.includes('facebook') || idLower.includes('face')) {
    return formatFacebookUrl(val);
  }
  if (idLower.includes('youtube') || idLower.includes('canal')) {
    return formatYouTubeUrl(val);
  }
  if (idLower.includes('maps') || idLower.includes('mapa') || idLower.includes('localizacao') || idLower.includes('endereco')) {
    return formatGoogleMapsUrl(val);
  }
  if (typeLower === 'email' || idLower.includes('email') || idLower.includes('mail')) {
    return formatEmailUrl(val);
  }
  if (idLower.includes('telefone') || idLower.includes('tel')) {
    return formatPhoneUrl(val);
  }

  // Generic URL: ensure http/https protocol
  const trimmed = val.trim();
  if (!trimmed) return '#';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('#')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Extracts original images declared in template HTML for each data-bio-image field
 */
export function getTemplateOriginalImages(
  rawHtml: string,
  manifest?: BioFacilManifest
): Record<string, string> {
  const images: Record<string, string> = {};
  if (!rawHtml) return images;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');

    const fields = manifest?.fields || [];
    fields.forEach((f) => {
      if (f.type === 'image') {
        const el = doc.querySelector(`[data-bio-image="${f.id}"]`);
        if (el) {
          if (el.tagName.toLowerCase() === 'img') {
            const src = el.getAttribute('src');
            if (src) images[f.id] = src;
          } else {
            // CSS background
            const style = el.getAttribute('style') || '';
            const match = style.match(/background(?:-image)?\s*:\s*url\((['"]?)(.*?)\1\)/i);
            if (match && match[2]) images[f.id] = match[2];
          }
        }
      }
    });

    // Also scan all data-bio-image elements even if not in manifest
    const allBioImages = doc.querySelectorAll('[data-bio-image]');
    allBioImages.forEach((el) => {
      const id = el.getAttribute('data-bio-image');
      if (id && !images[id]) {
        if (el.tagName.toLowerCase() === 'img') {
          const src = el.getAttribute('src');
          if (src) images[id] = src;
        } else {
          const style = el.getAttribute('style') || '';
          const match = style.match(/background(?:-image)?\s*:\s*url\((['"]?)(.*?)\1\)/i);
          if (match && match[2]) images[id] = match[2];
        }
      }
    });
  } catch (err) {
    console.warn('Error reading original images from HTML:', err);
  }

  return images;
}

/**
 * Extracts original texts declared in template HTML for each data-bio-text or data-bio-field element.
 * Guarantees requirement 10: customers never see empty text fields when the template contains content.
 */
export function getTemplateOriginalTexts(
  rawHtml: string,
  manifest?: BioFacilManifest
): Record<string, string> {
  const texts: Record<string, string> = {};
  if (!rawHtml) return texts;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');

    // 1. Scan all data-bio-text and data-bio-field elements
    const elements = doc.querySelectorAll('[data-bio-text], [data-bio-field]');
    elements.forEach((el) => {
      const fieldId = el.getAttribute('data-bio-text') || el.getAttribute('data-bio-field');
      if (fieldId && !texts[fieldId]) {
        const textContent = el.textContent?.trim() || '';
        if (textContent) {
          texts[fieldId] = textContent;
        }
      }
    });

    // 2. Scan manifest fields to provide fallback from defaultValue if any
    if (manifest?.fields) {
      manifest.fields.forEach((f) => {
        if (!texts[f.id] && f.defaultValue && typeof f.defaultValue === 'string') {
          texts[f.id] = f.defaultValue;
        }
      });
    }
  } catch (err) {
    console.warn('Error reading original texts from HTML:', err);
  }

  return texts;
}

/**
 * Validates and extracts contents from a template .zip file
 */
export async function validateAndParseZip(file: File | Blob): Promise<ZipValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  let manifest: BioFacilManifest | undefined;
  let rawHtml: string | undefined;
  let assetsCount = 0;
  const fieldsMatched: string[] = [];
  const fieldsMissingInHtml: string[] = [];
  const assetsMap: Record<string, string> = {};

  try {
    const zip = await JSZip.loadAsync(file);

    // 1. Locate index.html
    let htmlFile = zip.file('index.html');
    if (!htmlFile) {
      // Check if wrapped in a single root folder (e.g., template/index.html)
      const matchingFiles = zip.file(/index\.html$/i);
      if (matchingFiles.length > 0) {
        htmlFile = matchingFiles[0];
      }
    }

    if (!htmlFile) {
      errors.push('Arquivo obrigatório "index.html" não encontrado na raiz ou subpasta do arquivo ZIP.');
    } else {
      rawHtml = await htmlFile.async('string');
      if (!rawHtml || rawHtml.trim().length === 0) {
        errors.push('O arquivo "index.html" está vazio.');
      }
    }

    // 2. Locate biofacil.json
    let jsonFile = zip.file('biofacil.json');
    if (!jsonFile) {
      const matchingJson = zip.file(/biofacil\.json$/i);
      if (matchingJson.length > 0) {
        jsonFile = matchingJson[0];
      }
    }

    if (!jsonFile) {
      errors.push('Arquivo obrigatório "biofacil.json" não encontrado no arquivo ZIP.');
    } else {
      try {
        const jsonStr = await jsonFile.async('string');
        const parsed = JSON.parse(jsonStr);

        if (!parsed || typeof parsed !== 'object') {
          errors.push('O arquivo "biofacil.json" não contém um objeto JSON válido.');
        } else {
          // Validate required manifest properties
          if (!parsed.templateId || typeof parsed.templateId !== 'string' || !parsed.templateId.trim()) {
            errors.push('Propriedade "templateId" é obrigatória e deve ser um texto no biofacil.json.');
          }
          if (!parsed.name || typeof parsed.name !== 'string' || !parsed.name.trim()) {
            errors.push('Propriedade "name" é obrigatória e deve ser um texto no biofacil.json.');
          }
          if (!parsed.fields || !Array.isArray(parsed.fields)) {
            errors.push('Propriedade "fields" é obrigatória e deve ser uma lista (array) no biofacil.json.');
          } else if (parsed.fields.length === 0) {
            warnings.push('O manifesto "biofacil.json" não possui nenhum campo editável declarado.');
          } else {
            parsed.fields.forEach((f: any, idx: number) => {
              if (!f.id || typeof f.id !== 'string') {
                errors.push(`Campo [${idx}] no biofacil.json não possui um "id" válido.`);
              }
              if (!f.label || typeof f.label !== 'string') {
                errors.push(`Campo "${f.id || idx}" no biofacil.json não possui um "label" válido.`);
              }
              if (!f.type || typeof f.type !== 'string') {
                errors.push(`Campo "${f.id || idx}" no biofacil.json não possui um "type" válido.`);
              }
            });
          }

          manifest = {
            version: typeof parsed.version === 'number' ? parsed.version : 1,
            templateId: parsed.templateId || 'BF-TEMPLATE-001',
            name: parsed.name || 'Modelo Importado',
            category: parsed.category || 'geral',
            tagline: parsed.tagline || '',
            fields: Array.isArray(parsed.fields) ? parsed.fields : []
          };
        }
      } catch (e: any) {
        errors.push(`Erro de sintaxe no arquivo "biofacil.json": ${e.message}`);
      }
    }

    // 3. Scan HTML for data-bio-* markers if HTML and manifest exist
    if (rawHtml && manifest) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHtml, 'text/html');

      manifest.fields.forEach((field: BioFacilFieldDefinition) => {
        const id = field.id;
        const hasText = doc.querySelector(`[data-bio-text="${id}"]`);
        const hasImage = doc.querySelector(`[data-bio-image="${id}"]`);
        const hasLink = doc.querySelector(`[data-bio-link="${id}"]`);
        const hasGallery = doc.querySelector(`[data-bio-gallery="${id}"]`);
        const hasServices = doc.querySelector(`[data-bio-services="${id}"]`);
        const hasTestimonials = doc.querySelector(`[data-bio-testimonials="${id}"]`);
        const hasGeneral = doc.querySelector(`[data-bio-field="${id}"]`);

        if (hasText || hasImage || hasLink || hasGallery || hasServices || hasTestimonials || hasGeneral) {
          fieldsMatched.push(id);
        } else {
          fieldsMissingInHtml.push(id);
          warnings.push(`Campo "${field.label}" (id: ${id}) declarado no manifesto não foi encontrado no HTML (data-bio-*="${id}").`);
        }
      });
    }

    // 4. Count assets and extract images/css for standalone preview
    const entries = Object.keys(zip.files);
    assetsCount = entries.filter((name) => !name.endsWith('/') && !name.endsWith('index.html') && !name.endsWith('biofacil.json')).length;

    // Detect common root folder if all files reside inside it (e.g., "BF-BARBER-001/assets/...")
    let commonPrefix = '';
    const nonDirEntries = entries.filter((n) => !zip.files[n].dir);
    if (nonDirEntries.length > 0) {
      const firstParts = nonDirEntries[0].split('/');
      if (firstParts.length > 1) {
        const candidate = firstParts[0] + '/';
        if (nonDirEntries.every((n) => n.startsWith(candidate))) {
          commonPrefix = candidate;
        }
      }
    }

    // Cache image/css/js/font assets in memory as Data URLs or text
    for (const path of entries) {
      const fileEntry = zip.files[path];
      if (fileEntry && !fileEntry.dir) {
        const lower = path.toLowerCase();
        const strippedPath = commonPrefix && path.startsWith(commonPrefix) ? path.substring(commonPrefix.length) : path;

        if (lower.endsWith('.css') || lower.endsWith('.js')) {
          const content = await fileEntry.async('string');
          assetsMap[path] = content;
          if (strippedPath !== path) assetsMap[strippedPath] = content;
        } else if (
          lower.endsWith('.png') ||
          lower.endsWith('.jpg') ||
          lower.endsWith('.jpeg') ||
          lower.endsWith('.webp') ||
          lower.endsWith('.svg') ||
          lower.endsWith('.gif') ||
          lower.endsWith('.avif') ||
          lower.endsWith('.ico')
        ) {
          const base64 = await fileEntry.async('base64');
          const mime = lower.endsWith('.svg')
            ? 'image/svg+xml'
            : lower.endsWith('.png')
            ? 'image/png'
            : lower.endsWith('.webp')
            ? 'image/webp'
            : lower.endsWith('.gif')
            ? 'image/gif'
            : lower.endsWith('.avif')
            ? 'image/avif'
            : lower.endsWith('.ico')
            ? 'image/x-icon'
            : 'image/jpeg';
          const dataUrl = `data:${mime};base64,${base64}`;
          assetsMap[path] = dataUrl;
          if (strippedPath !== path) assetsMap[strippedPath] = dataUrl;
        } else if (lower.endsWith('.woff') || lower.endsWith('.woff2') || lower.endsWith('.ttf') || lower.endsWith('.otf')) {
          const base64 = await fileEntry.async('base64');
          const mime = lower.endsWith('.woff2') ? 'font/woff2' : lower.endsWith('.woff') ? 'font/woff' : 'font/ttf';
          const dataUrl = `data:${mime};base64,${base64}`;
          assetsMap[path] = dataUrl;
          if (strippedPath !== path) assetsMap[strippedPath] = dataUrl;
        }
      }
    }

    const originalImages = rawHtml && manifest ? getTemplateOriginalImages(rawHtml, manifest) : {};
    const isValid = errors.length === 0;

    return {
      valid: isValid,
      errors,
      warnings,
      manifest,
      rawHtml,
      assetsCount,
      fieldsMatched,
      fieldsMissingInHtml,
      zipBlob: file instanceof Blob ? file : new Blob([file]),
      assetsMap,
      originalImages
    };
  } catch (err: any) {
    return {
      valid: false,
      errors: [`Falha ao ler o arquivo ZIP: ${err.message || 'Arquivo corrompido ou formato não suportado'}`],
      warnings: [],
      assetsCount: 0,
      fieldsMatched: [],
      fieldsMissingInHtml: []
    };
  }
}

/**
 * Injects user customized values into the original index.html
 * STRICT RULE (Requirement 8):
 * If val is empty string or undefined for an image, DO NOT OVERWRITE!
 * Keep the original template image intact so demonstrative photos always display until customized.
 */
export function generatePersonalizedHtml(
  originalHtml: string,
  manifest: BioFacilManifest,
  values: Record<string, any>
): string {
  if (!originalHtml) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(originalHtml, 'text/html');

  manifest.fields.forEach((field) => {
    const val = values[field.id] !== undefined ? values[field.id] : field.defaultValue;
    if (val === undefined || val === null) return;

    // 1. Text elements
    const textEls = doc.querySelectorAll(`[data-bio-text="${field.id}"]`);
    textEls.forEach((el) => {
      if (val !== undefined && val !== null) {
        el.textContent = String(val);
      }
    });

    // 2. Image elements (NON-DESTRUCTIVE: only replace if user explicitly provided a non-empty string)
    const imgEls = doc.querySelectorAll(`[data-bio-image="${field.id}"]`);
    imgEls.forEach((el) => {
      // Store original image in attribute for reference and restore
      if (!el.hasAttribute('data-bio-original-src')) {
        const orig = el.getAttribute('src') || '';
        if (orig) el.setAttribute('data-bio-original-src', orig);
      }

      const strVal = String(val).trim();
      if (strVal.length > 0) {
        if (el.tagName.toLowerCase() === 'img') {
          (el as HTMLImageElement).src = strVal;
        } else {
          (el as HTMLElement).style.backgroundImage = `url("${strVal}")`;
        }
      }
      // If strVal is empty, DO NOT OVERWRITE! The template's original image stays active.
    });

    // 3. Link elements (Normalized to valid wa.me, instagram, tel, mailto, etc.)
    const linkEls = doc.querySelectorAll(`[data-bio-link="${field.id}"]`);
    linkEls.forEach((el) => {
      if (el.tagName.toLowerCase() === 'a') {
        const anchor = el as HTMLAnchorElement;
        const normalizedHref = normalizeFieldLink(field, String(val));
        anchor.href = normalizedHref;
      }
    });

    // 4. Services list
    if (field.type === 'services' && Array.isArray(val) && val.length > 0) {
      const servicesContainers = doc.querySelectorAll(`[data-bio-services="${field.id}"]`);
      servicesContainers.forEach((container) => {
        const templateChild = container.firstElementChild?.cloneNode(true) as HTMLElement | null;
        if (templateChild) {
          container.innerHTML = '';
          (val as BioFacilServiceItem[]).forEach((service) => {
            const card = templateChild.cloneNode(true) as HTMLElement;
            const nameEl = card.querySelector('[data-bio-service-name]');
            if (nameEl) nameEl.textContent = service.name || '';
            const descEl = card.querySelector('[data-bio-service-description]');
            if (descEl) descEl.textContent = service.description || '';
            const priceEl = card.querySelector('[data-bio-service-price]');
            if (priceEl) priceEl.textContent = service.price || '';
            const imgEl = card.querySelector('[data-bio-service-image]') as HTMLImageElement | null;
            if (imgEl && service.imageUrl) imgEl.src = service.imageUrl;
            const linkEl = card.querySelector('[data-bio-service-link]') as HTMLAnchorElement | null;
            if (linkEl && service.link) linkEl.href = service.link;
            container.appendChild(card);
          });
        }
      });
    }

    // 5. Gallery items
    if (field.type === 'gallery' && Array.isArray(val) && val.length > 0) {
      const galleryContainers = doc.querySelectorAll(`[data-bio-gallery="${field.id}"]`);
      galleryContainers.forEach((container) => {
        const templateChild = container.firstElementChild?.cloneNode(true) as HTMLElement | null;
        if (templateChild) {
          container.innerHTML = '';
          (val as BioFacilGalleryItem[]).forEach((photo) => {
            const item = templateChild.cloneNode(true) as HTMLElement;
            const img = item.querySelector('img') || (item.tagName.toLowerCase() === 'img' ? (item as HTMLImageElement) : null);
            if (img && photo.url) img.src = photo.url;
            const cap = item.querySelector('[data-bio-gallery-caption]');
            if (cap) cap.textContent = photo.caption || '';
            container.appendChild(item);
          });
        }
      });
    }

    // 6. Testimonials list
    if (field.type === 'testimonials' && Array.isArray(val) && val.length > 0) {
      const testContainers = doc.querySelectorAll(`[data-bio-testimonials="${field.id}"]`);
      testContainers.forEach((container) => {
        const templateChild = container.firstElementChild?.cloneNode(true) as HTMLElement | null;
        if (templateChild) {
          container.innerHTML = '';
          (val as BioFacilTestimonialItem[]).forEach((test) => {
            const card = templateChild.cloneNode(true) as HTMLElement;
            const nameEl = card.querySelector('[data-bio-testimonial-name]');
            if (nameEl) nameEl.textContent = test.name || '';
            const contentEl = card.querySelector('[data-bio-testimonial-content]');
            if (contentEl) contentEl.textContent = test.content || '';
            const roleEl = card.querySelector('[data-bio-testimonial-role]');
            if (roleEl) roleEl.textContent = test.role || '';
            const avatarEl = card.querySelector('[data-bio-testimonial-avatar]') as HTMLImageElement | null;
            if (avatarEl && test.avatarUrl) avatarEl.src = test.avatarUrl;
            container.appendChild(card);
          });
        }
      });
    }
  });

  // 7. Custom Colors / Theme CSS variables (Requirement 19, 20)
  if (values.customColors && typeof values.customColors === 'object') {
    const vars = Object.entries(values.customColors)
      .map(([k, v]) => `${k.startsWith('--') ? k : `--${k}`}: ${v};`)
      .join(' ');
    if (vars) {
      let styleTag = doc.querySelector('#biofacil-custom-theme');
      if (!styleTag) {
        styleTag = doc.createElement('style');
        styleTag.id = 'biofacil-custom-theme';
        doc.head.appendChild(styleTag);
      }
      styleTag.textContent = `:root { ${vars} }`;
    }
  }

  // 8. Icon Visual Variant (Requirement 22, 23)
  if (values.iconStyle && typeof values.iconStyle === 'string') {
    doc.body.setAttribute('data-bio-icon-style', values.iconStyle);
  }

  // 9. Visual Effect (Requirement 21)
  if (values.visualEffect && typeof values.visualEffect === 'string') {
    doc.body.setAttribute('data-bio-effect', values.visualEffect);
  }

  // 10. Social Visibility (Requirement 15)
  if (values.socialVisibility && typeof values.socialVisibility === 'object') {
    Object.entries(values.socialVisibility).forEach(([net, visible]) => {
      if (visible === false) {
        const els = doc.querySelectorAll(`[data-bio-link="${net}"], [data-bio-social="${net}"]`);
        els.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
      }
    });
  }

  // 11. Gallery Layout (Requirement 6, 7)
  if (values.galleryLayout && typeof values.galleryLayout === 'string' && values.galleryLayout !== 'original') {
    const galContainers = doc.querySelectorAll('[data-bio-gallery]');
    galContainers.forEach((el) => {
      el.setAttribute('data-bio-gallery-layout', values.galleryLayout);
    });
  }

  // Inject helper styling for runtime features (icon styles & gallery layouts)
  const runtimeFeatureStyles = doc.createElement('style');
  runtimeFeatureStyles.id = 'biofacil-runtime-features';
  runtimeFeatureStyles.textContent = `
    [data-bio-icon-style="3d"] svg, [data-bio-icon-style="3d"] .bio-social-icon {
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)) drop-shadow(0 1px 2px rgba(255,255,255,0.25));
      transform: perspective(400px) translateZ(4px);
      transition: transform 0.2s ease, filter 0.2s ease;
    }
    [data-bio-icon-style="glass"] svg, [data-bio-icon-style="glass"] .bio-social-icon {
      opacity: 0.85;
      filter: drop-shadow(0 2px 8px rgba(255,255,255,0.3));
    }
    [data-bio-icon-style="neon"] svg, [data-bio-icon-style="neon"] .bio-social-icon {
      filter: drop-shadow(0 0 8px currentColor);
    }
    [data-bio-icon-style="minimal"] svg, [data-bio-icon-style="minimal"] .bio-social-icon {
      opacity: 0.75;
    }
    [data-bio-gallery-layout="grid"] {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }
    [data-bio-gallery-layout="horizontal"] {
      display: flex !important;
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      gap: 12px !important;
      padding-bottom: 8px !important;
    }
    [data-bio-gallery-layout="horizontal"] > * {
      flex: 0 0 80% !important;
      scroll-snap-align: center !important;
    }
    [data-bio-gallery-layout="carousel"] {
      display: flex !important;
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      gap: 0 !important;
    }
    [data-bio-gallery-layout="carousel"] > * {
      flex: 0 0 100% !important;
      scroll-snap-align: center !important;
    }
  `;
  doc.head.appendChild(runtimeFeatureStyles);

  return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
}

/**
 * Builds the standalone downloadable personalized ZIP package.
 * Excludes biofacil.json, platform auth, and admin code.
 */
export async function generatePersonalizedZip(
  originalZipBlob: Blob,
  manifest: BioFacilManifest,
  values: Record<string, any>,
  fallbackHtml?: string
): Promise<Blob> {
  const newZip = new JSZip();

  try {
    const originalZip = await JSZip.loadAsync(originalZipBlob);

    // Locate original index.html
    let htmlPath = 'index.html';
    let htmlFile = originalZip.file('index.html');
    if (!htmlFile) {
      const match = originalZip.file(/index\.html$/i);
      if (match.length > 0) {
        htmlFile = match[0];
        htmlPath = htmlFile.name;
      }
    }

    const rawHtml = htmlFile ? await htmlFile.async('string') : fallbackHtml || '';
    const personalizedHtml = generatePersonalizedHtml(rawHtml, manifest, values);

    // Copy all files EXCEPT biofacil.json and replace index.html
    const entries = Object.keys(originalZip.files);
    for (const path of entries) {
      const fileEntry = originalZip.files[path];
      if (fileEntry.dir) {
        newZip.folder(path);
      } else {
        const lower = path.toLowerCase();
        if (lower.endsWith('biofacil.json')) {
          continue;
        }

        if (path === htmlPath || lower.endsWith('index.html')) {
          newZip.file(path, personalizedHtml);
        } else {
          const content = await fileEntry.async('uint8array');
          newZip.file(path, content);
        }
      }
    }

    return await newZip.generateAsync({ type: 'blob' });
  } catch (err) {
    const personalizedHtml = generatePersonalizedHtml(fallbackHtml || '', manifest, values);
    newZip.file('index.html', personalizedHtml);
    return await newZip.generateAsync({ type: 'blob' });
  }
}

/**
 * Prepares self-contained HTML for live iframe preview with embedded assets.
 * 
 * Strict architectural guarantees:
 * 1. Zero auto-zoom / scale transforms (preserves native viewport: <meta name="viewport" content="width=device-width, initial-scale=1">)
 * 2. Resolves relative assets (./assets/..., /assets/..., images/..., img/...) into inline styles, scripts, and base64/blob URLs.
 * 3. Inlines CSS stylesheets directly into <style> tags so they execute immediately without 404s in srcdoc.
 * 4. Injects error listener reporting failed assets to console and parent window.
 * 5. Injects 60fps live postMessage listener for real-time form updates without destroying the iframe.
 */
export function preparePreviewHtml(
  rawHtml: string,
  manifest: BioFacilManifest,
  values: Record<string, any>,
  assetsMap?: Record<string, string>,
  options?: { isTestMode?: boolean }
): string {
  // 1. Personalize HTML with initial user values
  const personalized = generatePersonalizedHtml(rawHtml, manifest, values);

  const parser = new DOMParser();
  const doc = parser.parseFromString(personalized, 'text/html');

  // 2. Viewport compliance (Requirement 3):
  // Check if standard viewport meta tag exists; if not, add it once. Never insert conflicting viewports!
  const existingViewport = doc.querySelector('meta[name="viewport"]');
  if (!existingViewport) {
    const vp = doc.createElement('meta');
    vp.setAttribute('name', 'viewport');
    vp.setAttribute('content', 'width=device-width, initial-scale=1');
    doc.head.appendChild(vp);
  }

  // 3. Build a comprehensive asset lookup map (case-insensitive & multiple prefix variants)
  const lookup: Record<string, string> = {};
  if (assetsMap && Object.keys(assetsMap).length > 0) {
    for (const [key, val] of Object.entries(assetsMap)) {
      const k = key.trim();
      lookup[k] = val;
      lookup[k.toLowerCase()] = val;

      const noDotSlash = k.replace(/^\.?\//, '');
      lookup[noDotSlash] = val;
      lookup[noDotSlash.toLowerCase()] = val;

      lookup[`./${noDotSlash}`] = val;
      lookup[`/${noDotSlash}`] = val;

      // Basename
      const parts = k.split('/');
      const basename = parts[parts.length - 1];
      if (basename) {
        lookup[basename] = val;
        lookup[basename.toLowerCase()] = val;
      }
    }
  }

  const findAsset = (ref: string): string | null => {
    if (!ref || ref.startsWith('data:') || ref.startsWith('blob:') || ref.startsWith('http://') || ref.startsWith('https://')) {
      return null;
    }
    const clean = ref.trim().replace(/^['"]|['"]$/g, '');
    if (lookup[clean]) return lookup[clean];
    if (lookup[clean.toLowerCase()]) return lookup[clean.toLowerCase()];

    const stripped = clean.replace(/^\.?\//, '');
    if (lookup[stripped]) return lookup[stripped];
    if (lookup[stripped.toLowerCase()]) return lookup[stripped.toLowerCase()];

    const parts = clean.split('/');
    const basename = parts[parts.length - 1];
    if (basename && lookup[basename]) return lookup[basename];
    if (basename && lookup[basename.toLowerCase()]) return lookup[basename.toLowerCase()];

    return null;
  };

  // Helper to resolve url(...) references inside CSS text
  const resolveCssUrls = (cssText: string): string => {
    return cssText.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (match, quote, urlRef) => {
      const resolved = findAsset(urlRef);
      if (resolved) {
        return `url("${resolved}")`;
      }
      return match;
    });
  };

  // 4. Resolve <link rel="stylesheet"> -> inline into <style>
  const linkStyles = doc.querySelectorAll('link[rel="stylesheet"]');
  linkStyles.forEach((link) => {
    const href = link.getAttribute('href');
    if (href) {
      const asset = findAsset(href);
      if (asset) {
        // If asset is CSS content, inline it
        const style = doc.createElement('style');
        style.setAttribute('data-bio-inlined', href);
        style.textContent = resolveCssUrls(asset);
        link.parentNode?.replaceChild(style, link);
      }
    }
  });

  // 5. Resolve <script src="..."> -> inline into <script>
  const scripts = doc.querySelectorAll('script[src]');
  scripts.forEach((scr) => {
    const src = scr.getAttribute('src');
    if (src) {
      const asset = findAsset(src);
      if (asset && !asset.startsWith('data:image')) {
        const inlineScript = doc.createElement('script');
        inlineScript.setAttribute('data-bio-inlined', src);
        inlineScript.textContent = asset;
        scr.parentNode?.replaceChild(inlineScript, scr);
      }
    }
  });

  // 6. Resolve all <img> elements
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    const src = img.getAttribute('src');
    if (src) {
      const resolved = findAsset(src);
      if (resolved) {
        img.src = resolved;
      }
    }
  });

  // 7. Resolve all inline style attributes with url(...)
  const elementsWithStyle = doc.querySelectorAll('[style*="url("]');
  elementsWithStyle.forEach((el) => {
    const currentStyle = el.getAttribute('style') || '';
    el.setAttribute('style', resolveCssUrls(currentStyle));
  });

  // 8. Resolve all <style> tags content
  const styleTags = doc.querySelectorAll('style');
  styleTags.forEach((st) => {
    if (st.textContent) {
      st.textContent = resolveCssUrls(st.textContent);
    }
  });

  // 9. Inject asset error logger & reporter (Requirement 9)
  const errorLoggerScript = doc.createElement('script');
  errorLoggerScript.textContent = `
    (function() {
      window.addEventListener('error', function(e) {
        var target = e.target;
        if (target && (target.tagName === 'IMG' || target.tagName === 'LINK' || target.tagName === 'SCRIPT')) {
          var failedSrc = target.src || target.href || '';
          console.warn('[BioFacil Asset Error] Não foi possível carregar:', failedSrc);
          if (window.parent) {
            window.parent.postMessage({
              type: 'BIO_FACIL_ASSET_ERROR',
              src: failedSrc,
              tagName: target.tagName
            }, '*');
          }
        }
      }, true);
    })();
  `;
  doc.head.insertBefore(errorLoggerScript, doc.head.firstChild);

  // 10. Inject live synchronization script (Smooth 60fps real-time updates without reload)
  const liveSyncScript = doc.createElement('script');
  liveSyncScript.textContent = `
    (function() {
      function normalizeLink(val) {
        if (!val) return '#';
        val = String(val).trim();
        if (!val) return '#';
        if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('mailto:') || val.startsWith('tel:') || val.startsWith('#')) return val;
        var digits = val.replace(/\\D/g, '');
        if (digits.length >= 10 && digits.length <= 13) {
          var with55 = digits.length <= 11 && !digits.startsWith('55') ? '55' + digits : digits;
          return 'https://wa.me/' + with55;
        }
        if (val.indexOf('@') === 0) return 'https://instagram.com/' + val.substring(1);
        if (val.indexOf('@') > 0 && val.indexOf('.') > 0) return 'mailto:' + val;
        return 'https://' + val;
      }

      function applyFieldUpdate(fieldId, value) {
        // 1. Text
        var textEls = document.querySelectorAll('[data-bio-text="' + fieldId + '"]');
        textEls.forEach(function(el) {
          el.textContent = value !== undefined && value !== null ? String(value) : '';
        });

        // 2. Images (preserve original if empty)
        var imgEls = document.querySelectorAll('[data-bio-image="' + fieldId + '"]');
        imgEls.forEach(function(el) {
          if (!el.hasAttribute('data-bio-original-src')) {
            var orig = el.getAttribute('src') || '';
            if (orig) el.setAttribute('data-bio-original-src', orig);
          }
          var str = String(value || '').trim();
          if (str.length > 0) {
            if (el.tagName.toLowerCase() === 'img') {
              el.src = str;
            } else {
              el.style.backgroundImage = 'url("' + str + '")';
            }
          } else {
            var restored = el.getAttribute('data-bio-original-src');
            if (restored) {
              if (el.tagName.toLowerCase() === 'img') {
                el.src = restored;
              } else {
                el.style.backgroundImage = 'url("' + restored + '")';
              }
            }
          }
        });

        // 3. Links
        var linkEls = document.querySelectorAll('[data-bio-link="' + fieldId + '"]');
        linkEls.forEach(function(el) {
          if (el.tagName.toLowerCase() === 'a') {
            el.href = normalizeLink(value);
          }
        });
      }

      window.addEventListener('message', function(event) {
        if (!event.data) return;

        // 1. Text, Image, Link Live Updates
        if (event.data.type === 'BIO_FACIL_UPDATE') {
          // Supports single field update { fieldId, value }
          if (event.data.fieldId) {
            applyFieldUpdate(event.data.fieldId, event.data.value);
          }
          // Supports bulk dictionary update { values: { ... } }
          else if (event.data.values && typeof event.data.values === 'object') {
            for (var fid in event.data.values) {
              applyFieldUpdate(fid, event.data.values[fid]);
            }
          }
        }

        // 2. Focus Highlighting (Requirement 12: subtle highlight on the previewed element)
        else if (event.data.type === 'BIO_FACIL_FOCUS') {
          var fid = event.data.fieldId;
          if (!fid) return;
          var targets = document.querySelectorAll(
            '[data-bio-text="' + fid + '"], [data-bio-image="' + fid + '"], [data-bio-link="' + fid + '"], [data-bio-field="' + fid + '"], [data-bio-services="' + fid + '"], [data-bio-gallery="' + fid + '"]'
          );
          targets.forEach(function(target) {
            target.classList.add('biofacil-focus-highlight');
            try {
              target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            } catch (e) {}
            setTimeout(function() {
              target.classList.remove('biofacil-focus-highlight');
            }, 1300);
          });
        }

        // 3. Theme, Colors, Icons, and Layout Live Updates (Requirements 6, 7, 15, 19, 22)
        else if (event.data.type === 'BIO_FACIL_STYLE_UPDATE') {
          if (event.data.cssVars) {
            for (var varName in event.data.cssVars) {
              var v = event.data.cssVars[varName];
              var key = varName.startsWith('--') ? varName : '--' + varName;
              document.documentElement.style.setProperty(key, v);
            }
          }
          if (event.data.iconStyle) {
            document.body.setAttribute('data-bio-icon-style', event.data.iconStyle);
          }
          if (event.data.visualEffect) {
            document.body.setAttribute('data-bio-effect', event.data.visualEffect);
          }
          if (event.data.socialVisibility) {
            for (var net in event.data.socialVisibility) {
              var show = event.data.socialVisibility[net];
              var netEls = document.querySelectorAll('[data-bio-link="' + net + '"], [data-bio-social="' + net + '"]');
              netEls.forEach(function(nel) {
                nel.style.display = show === false ? 'none' : '';
              });
            }
          }
          if (event.data.galleryLayout) {
            var galEls = document.querySelectorAll('[data-bio-gallery]');
            galEls.forEach(function(gel) {
              gel.setAttribute('data-bio-gallery-layout', event.data.galleryLayout);
            });
          }
        }
      });
    })();
  `;
  doc.body.appendChild(liveSyncScript);

  // Injected CSS for preview interactions (Focus pulse & highlight)
  const previewInteractionsStyle = doc.createElement('style');
  previewInteractionsStyle.id = 'biofacil-preview-interactions';
  previewInteractionsStyle.textContent = `
    .biofacil-focus-highlight {
      outline: 2px solid #F59E0B !important;
      outline-offset: 4px !important;
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.7) !important;
      transition: outline 0.2s ease, box-shadow 0.2s ease !important;
      animation: biofacil-pulse 1.3s ease-in-out !important;
    }
    @keyframes biofacil-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  `;
  doc.head.appendChild(previewInteractionsStyle);

  return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
}
