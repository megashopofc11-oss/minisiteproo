import JSZip from 'jszip';
import { ProjectData } from '../types';

// Helper to escape HTML to prevent XSS
const escapeHtml = (str: string): string => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Helper to sanitize URLs
const sanitizeUrl = (url: string, defaultProtocol = 'https://'): string => {
  if (!url) return '#';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('sms:')
  ) {
    return escapeHtml(trimmed);
  }
  if (trimmed.startsWith('#')) return trimmed;
  return `${defaultProtocol}${escapeHtml(trimmed)}`;
};

export const generateStandaloneHtml = (project: ProjectData): string => {
  const {
    identity,
    theme,
    photos = [],
    services = [],
    buttons = [],
    socials,
    location,
    seo,
    sectionsOrder = ['hero', 'status', 'about', 'services', 'gallery', 'reviews', 'hours', 'location', 'socials', 'cta'],
    sectionsVisibility = {},
    statusConfig,
    whatsappConfig,
    googleReviewConfig,
    shareConfig,
    fontCategory = 'MODERNA',
    socialIconStyle = 'glass'
  } = project;

  const pageTitle = escapeHtml(seo?.title || identity.name || 'Bio Fácil Oficial');
  const pageDesc = escapeHtml(seo?.description || identity.slogan || identity.description || '');
  const ogImg = sanitizeUrl(seo?.ogImage || identity.bannerUrl || identity.avatarUrl || '');
  const favicon = sanitizeUrl(seo?.favicon || identity.logoUrl || '');

  const waNumber = whatsappConfig?.number || socials?.whatsapp?.number || '';
  const cleanWaNumber = waNumber.replace(/\D/g, '');
  const waMsg = encodeURIComponent(whatsappConfig?.message || socials?.whatsapp?.message || 'Olá! Vim pelo biosite.');
  const waUrl = cleanWaNumber ? `https://wa.me/${cleanWaNumber}?text=${waMsg}` : '#';

  // SVG Brand Icons
  const svgWa = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.93.55 3.73 1.5 5.26L2 22l4.89-1.46A9.957 9.957 0 0 0 12.004 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.83 14.18c-.25.7-1.43 1.34-1.97 1.4-.52.06-1.19.09-3.47-.85-2.91-1.21-4.78-4.2-4.93-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.86 2.1.94 2.25.08.16.13.34.03.55-.1.21-.15.34-.3.51-.15.18-.32.39-.46.53-.15.15-.31.32-.13.63.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.76-.17 1.46z"/></svg>`;
  const svgIg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
  const svgTt = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.18 2.07 2.31 2.34.86.23 1.81.11 2.58-.33.72-.39 1.25-1.08 1.44-1.87.1-.4.15-.82.15-1.24V.02z"/></svg>`;
  const svgGg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>`;
  const svgMap = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  const svgStar = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  const svgShare = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

  // Font family determination
  let headingFontFamily = "'Plus Jakarta Sans', sans-serif";
  if (fontCategory === 'ELEGANTE') headingFontFamily = "'Playfair Display', serif";
  if (fontCategory === 'BOLD') headingFontFamily = "'Syne', sans-serif";
  if (fontCategory === 'EDITORIAL') headingFontFamily = "'Bodoni Moda', serif";
  if (fontCategory === 'MINIMAL') headingFontFamily = "'DM Sans', sans-serif";
  if (fontCategory === 'ESPORTIVA') headingFontFamily = "'Chakra Petch', sans-serif";

  // Section Generators
  const heroHtml = `
    <header class="hero-section">
      ${identity.logoUrl ? `<div class="hero-logo-box"><img src="${sanitizeUrl(identity.logoUrl)}" alt="${escapeHtml(identity.name)}" class="hero-logo" /></div>` : ''}
      ${identity.badge ? `<span class="badge-hero">${escapeHtml(identity.badge)}</span>` : ''}
      <h1 class="hero-title">${escapeHtml(identity.name)}</h1>
      <p class="hero-slogan">${escapeHtml(identity.slogan)}</p>
    </header>
  `;

  const statusHtml = (sectionsVisibility.status !== false && statusConfig?.enabled) ? `
    <section class="status-card" id="statusCard">
      <div class="status-left">
        <span class="status-dot ${statusConfig?.autoCalculate ? 'auto-calc' : ''}"></span>
        <span class="status-text" id="statusText">ABERTO AGORA</span>
        <span class="status-hours">• ${escapeHtml(statusConfig.openTime || '08:00')} às ${escapeHtml(statusConfig.closeTime || '20:00')}</span>
      </div>
      <button class="btn-share" onclick="handleShare()">${svgShare} Compartilhar</button>
    </section>
  ` : '';

  const aboutHtml = (sectionsVisibility.about !== false && identity.about) ? `
    <section class="about-card">
      <span class="section-label">Sobre Nossa Proposta</span>
      <p>${escapeHtml(identity.about)}</p>
    </section>
  ` : '';

  const reviewsHtml = (sectionsVisibility.reviews !== false && googleReviewConfig?.enabled) ? `
    <section class="reviews-card">
      <div class="reviews-content">
        <div class="stars-row">
          ${svgStar}${svgStar}${svgStar}${svgStar}${svgStar}
          <span class="stars-rating">5.0 (${escapeHtml(String(googleReviewConfig.reviewCount || 147))} avaliações)</span>
        </div>
        <h4 class="reviews-title">${escapeHtml(googleReviewConfig.title || 'NOS AVALIE NO GOOGLE')}</h4>
        <p class="reviews-desc">${escapeHtml(googleReviewConfig.subtitle || 'Sua opinião é fundamental para nossa excelência.')}</p>
      </div>
      <a href="${sanitizeUrl(googleReviewConfig.url || location.mapsUrl || 'https://google.com')}" target="_blank" class="btn-review">${svgGg} Avaliar Agora</a>
    </section>
  ` : '';

  const servicesHtml = (sectionsVisibility.services !== false && services.length > 0) ? `
    <section class="services-section">
      <div class="section-head">
        <h3 class="section-title">Serviços & Procedimentos</h3>
      </div>
      <div class="services-list">
        ${services.map((s) => `
          <div class="service-card ${s.featured ? 'featured' : ''}">
            <div class="service-body">
              ${s.imageUrl ? `<img src="${sanitizeUrl(s.imageUrl)}" class="service-thumb" alt="${escapeHtml(s.name)}" loading="lazy" />` : ''}
              <div class="service-info">
                <div class="service-header">
                  <h4>${escapeHtml(s.name)}</h4>
                  <span class="service-price">${escapeHtml(s.price)}</span>
                </div>
                <p>${escapeHtml(s.description)}</p>
                <div class="service-action">
                  ${s.featured ? `<span class="badge-featured">${svgStar} Mais Solicitado</span>` : '<span></span>'}
                  <a href="${waUrl}" target="_blank" class="btn-service">${svgWa} ${escapeHtml(s.ctaText || 'Agendar')}</a>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  const galleryHtml = (sectionsVisibility.gallery !== false && photos.length > 0) ? `
    <section class="gallery-section">
      <div class="section-head">
        <h3 class="section-title">Galeria Visual</h3>
      </div>
      <div class="gallery-grid">
        ${photos.map((p) => `
          <div class="photo-item" onclick="openModal('${sanitizeUrl(p.url)}')">
            <img src="${sanitizeUrl(p.url)}" alt="${escapeHtml(p.alt || p.caption)}" loading="lazy" />
            ${p.caption ? `<div class="caption">${escapeHtml(p.caption)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  const hoursLocationHtml = ((sectionsVisibility.hours !== false && location.hours) || (sectionsVisibility.location !== false && location.address)) ? `
    <section class="location-card">
      ${(sectionsVisibility.hours !== false && location.hours) ? `
        <div class="loc-item">
          <strong>Horário de Funcionamento</strong>
          <p>${escapeHtml(location.hours)}</p>
        </div>
      ` : ''}
      ${(sectionsVisibility.location !== false && location.address) ? `
        <div class="loc-item">
          <strong>Localização Privilegiada</strong>
          <p>${escapeHtml(location.address)}</p>
          ${location.mapsUrl ? `<a href="${sanitizeUrl(location.mapsUrl)}" target="_blank" class="map-link">Ver rota no Google Maps →</a>` : ''}
        </div>
      ` : ''}
    </section>
  ` : '';

  const buttonsHtml = (buttons.length > 0) ? `
    <section class="buttons-section">
      ${buttons.map((b) => {
        const isWa = b.iconName === 'whatsapp';
        const targetUrl = isWa ? waUrl : sanitizeUrl(b.url);
        return `
          <a href="${targetUrl}" target="_blank" class="action-btn style-${b.style}">
            <span>${escapeHtml(b.text)}</span>
            <span class="chevron">→</span>
          </a>
        `;
      }).join('')}
    </section>
  ` : '';

  const socialsHtml = (sectionsVisibility.socials !== false) ? `
    <section class="socials-section">
      <span class="socials-label">CONECTE-SE EM NOSSOS CANAIS</span>
      <div class="socials-list style-${socialIconStyle}">
        ${socials?.whatsapp?.enabled && waUrl ? `<a href="${waUrl}" target="_blank" class="social-icon wa">${svgWa}</a>` : ''}
        ${socials?.instagram?.enabled && socials.instagram.url ? `<a href="${sanitizeUrl(socials.instagram.url)}" target="_blank" class="social-icon ig">${svgIg}</a>` : ''}
        ${socials?.tiktok?.enabled && socials.tiktok.url ? `<a href="${sanitizeUrl(socials.tiktok.url)}" target="_blank" class="social-icon tt">${svgTt}</a>` : ''}
        ${socials?.google?.enabled && socials.google.url ? `<a href="${sanitizeUrl(socials.google.url)}" target="_blank" class="social-icon gg">${svgGg}</a>` : ''}
        ${location?.mapsUrl ? `<a href="${sanitizeUrl(location.mapsUrl)}" target="_blank" class="social-icon map">${svgMap}</a>` : ''}
      </div>
    </section>
  ` : '';

  const ctaHtml = (sectionsVisibility.cta !== false) ? `
    <footer class="footer-cta">
      <a href="${waUrl}" target="_blank" class="main-cta-btn">${svgWa} <span>${escapeHtml(identity.title || 'Agendar Atendimento')}</span></a>
      <p class="copyright">${escapeHtml(identity.name)} • Todos os direitos reservados</p>
      <p class="brand-credit">Biosite oficial criado na plataforma BIO FÁCIL</p>
    </footer>
  ` : '';

  // Sections Render Order Mapper
  const renderSection = (key: string) => {
    switch (key) {
      case 'hero': return heroHtml;
      case 'status': return statusHtml;
      case 'about': return aboutHtml;
      case 'services': return servicesHtml;
      case 'gallery': return galleryHtml;
      case 'reviews': return reviewsHtml;
      case 'hours':
      case 'location': return hoursLocationHtml;
      case 'socials': return socialsHtml;
      case 'cta': return ctaHtml;
      default: return '';
    }
  };

  const renderedSectionsHtml = sectionsOrder.map((k) => renderSection(k)).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:image" content="${ogImg}">
  <link rel="icon" href="${favicon}">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Chakra+Petch:wght@400;600;700&family=Cinzel:wght@600;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@600;700;800;900&display=swap" rel="stylesheet">

  <style>
    :root {
      --primary: ${theme.primary || '#D97706'};
      --secondary: ${theme.secondary || '#92400E'};
      --accent: ${theme.accent || '#FDE68A'};
      --bg: ${theme.background || '#07080D'};
      --surface: ${theme.surface || '#0F121C'};
      --text: ${theme.text || '#F8FAFC'};
      --font-heading: ${headingFontFamily};
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 16px 12px 80px;
    }

    .container {
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Hero */
    .hero-section {
      text-align: center;
      padding: 32px 16px 20px;
      position: relative;
    }
    .hero-logo-box {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      margin: 0 auto 16px;
      padding: 3px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      box-shadow: 0 0 25px rgba(217, 119, 6, 0.4);
    }
    .hero-logo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    .badge-hero {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .hero-title {
      font-family: var(--font-heading);
      font-size: 32px;
      font-weight: 900;
      line-height: 1.15;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    .hero-slogan {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.5;
    }

    /* Status Card */
    .status-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }
    .status-left {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 8px #10B981;
    }
    .status-dot.closed {
      background: #F59E0B;
      box-shadow: 0 0 8px #F59E0B;
    }
    .status-hours {
      color: rgba(255, 255, 255, 0.5);
      font-size: 11px;
    }
    .btn-share {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFF;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* About Card */
    .about-card {
      padding: 20px;
      background: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      font-size: 13px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
    }
    .section-label {
      font-size: 11px;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 1px;
      display: block;
      margin-bottom: 6px;
    }

    /* Reviews Card */
    .reviews-card {
      padding: 20px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.15), var(--surface));
      border: 1px solid rgba(217, 119, 6, 0.3);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .stars-row {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #FBBF24;
    }
    .stars-rating {
      font-size: 12px;
      font-weight: 800;
      color: #FFF;
      margin-left: 6px;
    }
    .reviews-title {
      font-size: 14px;
      font-weight: 900;
      text-transform: uppercase;
      color: #FFF;
    }
    .reviews-desc {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
    }
    .btn-review {
      align-self: flex-start;
      padding: 8px 16px;
      border-radius: 12px;
      background: linear-gradient(135deg, #F59E0B, #D97706);
      color: #07080D;
      font-size: 11px;
      font-weight: 900;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Services */
    .services-section { display: flex; flex-direction: column; gap: 12px; }
    .section-head { display: flex; justify-content: space-between; align-items: center; }
    .section-title {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .services-list { display: flex; flex-direction: column; gap: 10px; }
    .service-card {
      padding: 16px;
      background: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
    }
    .service-card.featured {
      border-color: rgba(217, 119, 6, 0.4);
      background: linear-gradient(135deg, var(--surface), rgba(217, 119, 6, 0.1));
    }
    .service-body { display: flex; gap: 12px; }
    .service-thumb { width: 56px; height: 56px; border-radius: 12px; object-fit: cover; }
    .service-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .service-header { display: flex; justify-content: space-between; align-items: baseline; }
    .service-header h4 { font-size: 14px; font-weight: 800; }
    .service-price { font-size: 13px; font-weight: 800; color: var(--primary); }
    .service-info p { font-size: 12px; color: rgba(255, 255, 255, 0.6); line-height: 1.4; }
    .service-action { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
    .badge-featured { font-size: 10px; font-weight: 800; color: #FBBF24; display: flex; align-items: center; gap: 4px; }
    .btn-service {
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      color: #FFF;
      font-size: 11px;
      font-weight: 700;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* Gallery */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .photo-item {
      position: relative;
      height: 140px;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
    }
    .photo-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .photo-item:hover img { transform: scale(1.05); }

    /* Action Buttons */
    .buttons-section { display: flex; flex-direction: column; gap: 10px; }
    .action-btn {
      width: 100%;
      padding: 16px 20px;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-decoration: none;
      font-weight: 800;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    .action-btn.style-solid {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #07080D;
      box-shadow: 0 4px 20px rgba(217, 119, 6, 0.3);
    }
    .action-btn.style-glass {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFF;
      backdrop-filter: blur(10px);
    }
    .action-btn.style-outline {
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #FFF;
    }

    /* Socials */
    .socials-section { text-align: center; margin-top: 10px; }
    .socials-label { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: rgba(255, 255, 255, 0.5); display: block; margin-bottom: 12px; }
    .socials-list { display: flex; justify-content: center; gap: 12px; }
    .social-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFF;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .social-icon:hover { transform: scale(1.08); }

    /* Location */
    .location-card {
      padding: 20px;
      background: var(--surface);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 13px;
    }
    .loc-item strong { display: block; font-size: 11px; text-transform: uppercase; color: var(--primary); margin-bottom: 2px; }
    .map-link { color: var(--accent); text-decoration: none; font-size: 12px; font-weight: 700; margin-top: 4px; display: inline-block; }

    /* Footer */
    .footer-cta { text-align: center; padding-top: 20px; display: flex; flex-direction: column; gap: 12px; align-items: center; }
    .main-cta-btn {
      padding: 16px 28px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: #07080D;
      font-weight: 900;
      font-size: 14px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 8px 25px rgba(217, 119, 6, 0.35);
    }
    .copyright { font-size: 11px; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 1px; }
    .brand-credit { font-size: 10px; color: rgba(255, 255, 255, 0.25); }

    /* Floating WhatsApp */
    .floating-wa {
      position: fixed;
      bottom: 24px;
      ${whatsappConfig?.floatingPosition === 'left' ? 'left: 24px;' : 'right: 24px;'}
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #10B981;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
      z-index: 100;
      text-decoration: none;
      transition: transform 0.2s ease;
    }
    .floating-wa:hover { transform: scale(1.1); }

    /* Modal */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.95);
      z-index: 200;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-overlay.active { display: flex; }
    .modal-overlay img { max-width: 90%; max-height: 85vh; border-radius: 16px; }
  </style>
</head>
<body>
  <div class="container">
    ${renderedSectionsHtml}
    ${buttonsHtml}
  </div>

  ${(whatsappConfig?.showFloating !== false && cleanWaNumber) ? `
    <a href="${waUrl}" target="_blank" class="floating-wa" title="Conversar no WhatsApp">
      ${svgWa}
    </a>
  ` : ''}

  <!-- Photo Lightbox Modal -->
  <div id="photoModal" class="modal-overlay" onclick="closeModal()">
    <img id="modalImg" src="" alt="Ampliada" />
  </div>

  <script>
    // Automatic Status Calculation
    function calculateStatus() {
      const card = document.getElementById('statusCard');
      if (!card) return;
      const textElem = document.getElementById('statusText');
      const dot = card.querySelector('.status-dot');
      if (!dot || !dot.classList.contains('auto-calc')) return;

      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();

      const [openH, openM] = '${statusConfig?.openTime || '08:00'}'.split(':').map(Number);
      const [closeH, closeM] = '${statusConfig?.closeTime || '20:00'}'.split(':').map(Number);

      const openMin = openH * 60 + openM;
      const closeMin = closeH * 60 + closeM;

      if (currentMin >= openMin && currentMin <= closeMin) {
        textElem.textContent = 'ABERTO AGORA';
        dot.classList.remove('closed');
      } else {
        textElem.textContent = 'FECHADO NO MOMENTO';
        dot.classList.add('closed');
      }
    }
    calculateStatus();

    // Web Share API
    function handleShare() {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href
        }).catch(function() {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(function() {
          alert('Link do biosite copiado para a área de transferência!');
        });
      }
    }

    // Lightbox modal
    function openModal(url) {
      document.getElementById('modalImg').src = url;
      document.getElementById('photoModal').classList.add('active');
    }
    function closeModal() {
      document.getElementById('photoModal').classList.remove('active');
    }
  </script>
</body>
</html>`;
};

export const exportProjectZip = async (project: ProjectData): Promise<void> => {
  const zip = new JSZip();
  const htmlContent = generateStandaloneHtml(project);

  zip.file('index.html', htmlContent);
  zip.file(
    'README.md',
    `# Biosite Oficial: ${project.identity.name}
Gerado pela plataforma BIO FÁCIL.

## Como Publicar Este Biosite Gratuitamente:

1. **Vercel**:
   - Acesse vercel.com e faça login.
   - Arraste esta pasta descompactada para a Vercel.
   - Seu biosite estará online em menos de 30 segundos!

2. **Netlify**:
   - Acesse netlify.com
   - Vá em "Deploy manually" e arraste a pasta com o arquivo index.html.

3. **Cloudflare Pages / GitHub Pages**:
   - Faça upload do arquivo index.html no seu repositório ou projeto Pages.`
  );

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = (project.identity.name || 'biofacil-projeto')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
  link.download = `${fileName}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadStandaloneHtml = (project: ProjectData): void => {
  const htmlContent = generateStandaloneHtml(project);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = (project.identity.name || 'index')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
  link.download = `${fileName}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
