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
  assetsMap?: Record<string, string>; // relative path -> data URL or text
}

/**
 * Format phone numbers to international WhatsApp standard
 */
export function formatWhatsAppUrl(phone: string, text: string = ''): string {
  if (!phone) return '#';
  const clean = phone.replace(/\D/g, '');
  if (!clean) return '#';
  const withCountry = clean.startsWith('55') ? clean : `55${clean}`;
  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${withCountry}${encodedText}`;
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
            // Validate each field
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

    // Cache image/css assets in memory as Data URLs for self-contained iframe previews
    for (const path of entries) {
      const fileEntry = zip.files[path];
      if (fileEntry && !fileEntry.dir) {
        const lower = path.toLowerCase();
        if (lower.endsWith('.css') || lower.endsWith('.js')) {
          const content = await fileEntry.async('string');
          assetsMap[path] = content;
        } else if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.svg')) {
          const base64 = await fileEntry.async('base64');
          const mime = lower.endsWith('.svg') ? 'image/svg+xml' : lower.endsWith('.png') ? 'image/png' : lower.endsWith('.webp') ? 'image/webp' : 'image/jpeg';
          assetsMap[path] = `data:${mime};base64,${base64}`;
        }
      }
    }

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
      assetsMap
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
 * Preserves 100% of styles, JS, responsive structures, and animations.
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
      el.textContent = String(val);
    });

    // 2. Image elements
    const imgEls = doc.querySelectorAll(`[data-bio-image="${field.id}"]`);
    imgEls.forEach((el) => {
      if (el.tagName.toLowerCase() === 'img') {
        (el as HTMLImageElement).src = String(val);
      } else {
        (el as HTMLElement).style.backgroundImage = `url("${String(val)}")`;
      }
    });

    // 3. Link elements
    const linkEls = doc.querySelectorAll(`[data-bio-link="${field.id}"]`);
    linkEls.forEach((el) => {
      if (el.tagName.toLowerCase() === 'a') {
        const anchor = el as HTMLAnchorElement;
        if (field.type === 'phone') {
          anchor.href = formatWhatsAppUrl(String(val));
        } else if (field.type === 'email') {
          anchor.href = `mailto:${String(val)}`;
        } else {
          anchor.href = String(val);
        }
      }
    });

    // 4. Services list
    if (field.type === 'services' && Array.isArray(val)) {
      const servicesContainers = doc.querySelectorAll(`[data-bio-services="${field.id}"]`);
      servicesContainers.forEach((container) => {
        // If template has item template inside or existing children
        const templateChild = container.firstElementChild?.cloneNode(true) as HTMLElement | null;
        if (templateChild && val.length > 0) {
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
    if (field.type === 'gallery' && Array.isArray(val)) {
      const galleryContainers = doc.querySelectorAll(`[data-bio-gallery="${field.id}"]`);
      galleryContainers.forEach((container) => {
        const templateChild = container.firstElementChild?.cloneNode(true) as HTMLElement | null;
        if (templateChild && val.length > 0) {
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
    if (field.type === 'testimonials' && Array.isArray(val)) {
      const testContainers = doc.querySelectorAll(`[data-bio-testimonials="${field.id}"]`);
      testContainers.forEach((container) => {
        const templateChild = container.firstElementChild?.cloneNode(true) as HTMLElement | null;
        if (templateChild && val.length > 0) {
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
        // Skip biofacil.json as required by project spec
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
    // Fallback: If original zip is not readable, generate self-contained zip with personalized HTML
    const personalizedHtml = generatePersonalizedHtml(fallbackHtml || '', manifest, values);
    newZip.file('index.html', personalizedHtml);
    return await newZip.generateAsync({ type: 'blob' });
  }
}

/**
 * Prepares self-contained HTML for live iframe preview with embedded assets
 */
export function preparePreviewHtml(
  rawHtml: string,
  manifest: BioFacilManifest,
  values: Record<string, any>,
  assetsMap?: Record<string, string>
): string {
  let personalized = generatePersonalizedHtml(rawHtml, manifest, values);

  // If assets map is provided (CSS/Images from the zip), replace relative references with data URLs
  if (assetsMap && Object.keys(assetsMap).length > 0) {
    for (const [path, dataUrl] of Object.entries(assetsMap)) {
      const cleanPath = path.replace(/^\.?\//, '');
      const regex = new RegExp(`(["'])(\\./)?${cleanPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(["'])`, 'g');
      personalized = personalized.replace(regex, `$1${dataUrl}$3`);
    }
  }

  // Inject a live listener script inside the iframe so postMessage updates work seamlessly
  const liveSyncScript = `
    <script>
      window.addEventListener('message', function(event) {
        if (!event.data || event.data.type !== 'BIO_FACIL_UPDATE') return;
        var fieldId = event.data.fieldId;
        var value = event.data.value;

        // 1. Text
        var textEls = document.querySelectorAll('[data-bio-text="' + fieldId + '"]');
        textEls.forEach(function(el) { el.textContent = value || ''; });

        // 2. Image
        var imgEls = document.querySelectorAll('[data-bio-image="' + fieldId + '"]');
        imgEls.forEach(function(el) {
          if (el.tagName.toLowerCase() === 'img') {
            el.src = value || '';
          } else {
            el.style.backgroundImage = 'url("' + (value || '') + '")';
          }
        });

        // 3. Link
        var linkEls = document.querySelectorAll('[data-bio-link="' + fieldId + '"]');
        linkEls.forEach(function(el) {
          if (el.tagName.toLowerCase() === 'a') {
            el.href = value || '#';
          }
        });
      });
    </script>
  `;

  if (personalized.includes('</body>')) {
    personalized = personalized.replace('</body>', `${liveSyncScript}</body>`);
  } else {
    personalized += liveSyncScript;
  }

  return personalized;
}
