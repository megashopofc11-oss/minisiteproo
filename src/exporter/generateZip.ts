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
  const { identity, theme, photos, services, buttons, socials, location, seo } = project;

  const pageTitle = escapeHtml(seo?.title || identity.name || 'BioSite Oficial');
  const pageDesc = escapeHtml(seo?.description || identity.slogan || identity.description || '');
  const ogImg = sanitizeUrl(seo?.ogImage || identity.bannerUrl || identity.avatarUrl || '');
  const favicon = sanitizeUrl(seo?.favicon || identity.logoUrl || '');

  const cleanWaNumber = (socials?.whatsapp?.number || '').replace(/\D/g, '');
  const waMsg = encodeURIComponent(socials?.whatsapp?.message || 'Olá! Vim pelo biosite.');
  const waUrl = cleanWaNumber ? `https://wa.me/${cleanWaNumber}?text=${waMsg}` : '#';

  // SVG Brand Icons
  const svgWa = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.93.55 3.73 1.5 5.26L2 22l4.89-1.46A9.957 9.957 0 0 0 12.004 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.83 14.18c-.25.7-1.43 1.34-1.97 1.4-.52.06-1.19.09-3.47-.85-2.91-1.21-4.78-4.2-4.93-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.86 2.1.94 2.25.08.16.13.34.03.55-.1.21-.15.34-.3.51-.15.18-.32.39-.46.53-.15.15-.31.32-.13.63.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.16.29.1 1.83.86 2.14 1.02.31.15.52.23.6.36.08.13.08.76-.17 1.46z"/></svg>`;
  const svgIg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
  const svgTt = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.18 2.07 2.31 2.34.86.23 1.81.11 2.58-.33.72-.39 1.25-1.08 1.44-1.87.1-.4.15-.82.15-1.24V.02z"/></svg>`;
  const svgGg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>`;
  const svgMap = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  const svgStar = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  const photosHtml = (photos || [])
    .map(
      (p) => `
    <div class="photo-item" onclick="openModal('${sanitizeUrl(p.url)}')">
      <img src="${sanitizeUrl(p.url)}" alt="${escapeHtml(p.alt || p.caption)}" loading="lazy" />
      ${p.caption ? `<div class="caption">${escapeHtml(p.caption)}</div>` : ''}
    </div>`
    )
    .join('');

  const servicesHtml = (services || [])
    .map(
      (s) => `
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
    </div>`
    )
    .join('');

  const buttonsHtml = (buttons || [])
    .map((b) => {
      const isWa = b.iconName === 'whatsapp';
      const targetUrl = isWa ? waUrl : sanitizeUrl(b.url);
      return `
    <a href="${targetUrl}" target="_blank" class="action-btn style-${b.style}">
      <span>${escapeHtml(b.text)}</span>
      <span class="chevron">→</span>
    </a>`;
    })
    .join('');

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
  <meta property="og:type" content="website">
  <link rel="icon" href="${favicon}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${theme.primary};
      --secondary: ${theme.secondary};
      --accent: ${theme.accent};
      --bg: ${theme.background};
      --surface: ${theme.surface};
      --text: ${theme.text};
      --text-muted: ${theme.textMuted};
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    body {
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 16px;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      width: 100%;
      max-width: 580px;
      margin: 0 auto;
    }
    /* Hero */
    .hero-banner {
      width: 100%;
      height: 190px;
      border-radius: 24px;
      overflow: hidden;
      position: relative;
      background-size: cover;
      background-position: center;
      border: 1px solid rgba(255,255,255,0.08);
      margin-bottom: -50px;
    }
    .hero-banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 30%, var(--bg) 95%);
    }
    .hero-identity {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 28px;
    }
    .avatar-wrapper {
      position: relative;
      margin-bottom: 12px;
    }
    .avatar-img {
      width: 96px;
      height: 96px;
      border-radius: 20px;
      object-fit: cover;
      border: 3px solid var(--bg);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .status-dot {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #10B981;
      border: 2px solid var(--bg);
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: rgba(255,255,255,0.08);
      color: var(--primary);
      border: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 8px;
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      color: #FFFFFF;
    }
    .slogan {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
      max-width: 440px;
    }
    /* Buttons */
    .buttons-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }
    .action-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-radius: 16px;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    .action-btn.style-solid {
      background: var(--primary);
      color: #000;
    }
    .action-btn.style-gradient {
      background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
      color: #FFF;
      box-shadow: 0 8px 20px -4px rgba(139, 92, 246, 0.4);
    }
    .action-btn.style-glass {
      background: rgba(255,255,255,0.08);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.15);
      color: #FFF;
    }
    .action-btn.style-outline {
      border: 2px solid var(--primary);
      color: #FFF;
    }
    .action-btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
    }
    /* Services */
    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #FFFFFF;
    }
    .section-title::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 16px;
      border-radius: 3px;
      background: var(--primary);
    }
    .services-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
    }
    .service-card {
      background: var(--surface);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 18px;
      padding: 14px;
      transition: border 0.2s;
    }
    .service-card.featured {
      border-color: var(--primary);
    }
    .service-body {
      display: flex;
      gap: 14px;
    }
    .service-thumb {
      width: 70px;
      height: 70px;
      border-radius: 12px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .service-info {
      flex: 1;
      min-width: 0;
    }
    .service-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }
    .service-header h4 {
      font-size: 14px;
      font-weight: 700;
      color: #FFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .service-price {
      font-size: 12px;
      font-weight: 800;
      color: var(--primary);
      padding: 2px 8px;
      border-radius: 6px;
      background: rgba(255,255,255,0.05);
      flex-shrink: 0;
    }
    .service-info p {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.4;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .service-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-featured {
      font-size: 11px;
      font-weight: 700;
      color: #FBBF24;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .btn-service {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 10px;
      background: var(--primary);
      color: #FFF;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .btn-service:hover {
      opacity: 0.9;
    }
    /* Photos */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 32px;
    }
    .photo-item {
      height: 150px;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .photo-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    .photo-item:hover img {
      transform: scale(1.05);
    }
    .photo-item .caption {
      position: absolute;
      bottom: 0;
      inset-x: 0;
      padding: 8px;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      font-size: 11px;
      font-weight: 600;
      color: #FFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* Location Card */
    .info-card {
      background: var(--surface);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 18px;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12px;
      color: var(--text-muted);
    }
    .info-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .info-btn {
      flex: 1;
      padding: 9px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      color: #FFF;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    /* Socials */
    .social-bar {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 32px;
    }
    .social-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      text-decoration: none;
      transition: all 0.2s;
    }
    .social-icon:hover {
      transform: scale(1.1);
      border-color: var(--primary);
    }
    footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-size: 11px;
      color: var(--text-muted);
    }
    /* Lightbox Modal */
    #lightbox {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 16px;
      cursor: pointer;
    }
    #lightbox img {
      max-width: 90vw;
      max-height: 85vh;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.8);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Hero Banner -->
    <div class="hero-banner" style="background-image: url('${sanitizeUrl(identity.bannerUrl || identity.avatarUrl || identity.logoUrl)}')">
      <div class="hero-banner-overlay"></div>
    </div>

    <!-- Identity -->
    <div class="hero-identity">
      <div class="avatar-wrapper">
        <img src="${sanitizeUrl(identity.avatarUrl || identity.logoUrl)}" class="avatar-img" alt="${escapeHtml(identity.name)}">
        <span class="status-dot"></span>
      </div>
      ${identity.badge ? `<span class="badge">${escapeHtml(identity.badge)}</span>` : ''}
      <h1>${escapeHtml(identity.name)}</h1>
      <p class="slogan">${escapeHtml(identity.slogan)}</p>
    </div>

    <!-- Action Buttons -->
    ${buttons && buttons.length > 0 ? `<div class="buttons-group">${buttonsHtml}</div>` : ''}

    <!-- Services -->
    ${services && services.length > 0 ? `
    <div class="section-title">Serviços & Atendimentos</div>
    <div class="services-group">${servicesHtml}</div>` : ''}

    <!-- Gallery -->
    ${photos && photos.length > 0 ? `
    <div class="section-title">Galeria de Fotos</div>
    <div class="gallery-grid">${photosHtml}</div>` : ''}

    <!-- Location Card -->
    ${location?.address ? `
    <div class="info-card">
      <div class="info-item">
        <span>📍</span>
        <span>${escapeHtml(location.address)}, ${escapeHtml(location.city)}</span>
      </div>
      ${location.hours ? `
      <div class="info-item">
        <span>🕒</span>
        <span>${escapeHtml(location.hours)}</span>
      </div>` : ''}
      ${location.phone ? `
      <div class="info-item">
        <span>📞</span>
        <span>${escapeHtml(location.phone)}</span>
      </div>` : ''}
      <div class="info-actions">
        ${location.mapsUrl ? `<a href="${sanitizeUrl(location.mapsUrl)}" target="_blank" class="info-btn">${svgMap} Como Chegar</a>` : ''}
        ${socials?.googleReview?.enabled && socials.googleReview.url ? `<a href="${sanitizeUrl(socials.googleReview.url)}" target="_blank" class="info-btn">${svgStar} Avalie no Google</a>` : ''}
      </div>
    </div>` : ''}

    <!-- Social Bar -->
    <div class="social-bar">
      ${cleanWaNumber ? `<a href="${waUrl}" target="_blank" class="social-icon" title="WhatsApp">${svgWa}</a>` : ''}
      ${socials?.instagram?.enabled && socials.instagram.url ? `<a href="${sanitizeUrl(socials.instagram.url)}" target="_blank" class="social-icon" title="Instagram">${svgIg}</a>` : ''}
      ${socials?.tiktok?.enabled && socials.tiktok.url ? `<a href="${sanitizeUrl(socials.tiktok.url)}" target="_blank" class="social-icon" title="TikTok">${svgTt}</a>` : ''}
      ${socials?.google?.enabled && socials.google.url ? `<a href="${sanitizeUrl(socials.google.url)}" target="_blank" class="social-icon" title="Google">${svgGg}</a>` : ''}
    </div>

    <!-- Footer -->
    <footer>
      <p><strong>${escapeHtml(identity.name)}</strong></p>
      <p>© ${new Date().getFullYear()} — Todos os direitos reservados</p>
    </footer>
  </div>

  <!-- Lightbox Modal -->
  <div id="lightbox" onclick="closeModal()">
    <img id="lightbox-img" src="" alt="Visualização">
  </div>

  <script>
    function openModal(url) {
      document.getElementById('lightbox-img').src = url;
      document.getElementById('lightbox').style.display = 'flex';
    }
    function closeModal() {
      document.getElementById('lightbox').style.display = 'none';
      document.getElementById('lightbox-img').src = '';
    }
  </script>
</body>
</html>`;
};

export const exportProjectZip = async (project: ProjectData): Promise<Blob> => {
  const zip = new JSZip();

  // 1. Generate standalone index.html
  const standaloneHtml = generateStandaloneHtml(project);
  zip.file('index.html', standaloneHtml);

  // 2. Generate vercel.json for static hosting
  const vercelJson = JSON.stringify(
    {
      version: 2,
      cleanUrls: true,
      headers: [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'DENY' },
            { key: 'X-XSS-Protection', value: '1; mode=block' }
          ]
        }
      ]
    },
    null,
    2
  );
  zip.file('vercel.json', vercelJson);

  // 3. Generate comprehensive README.txt
  const readmeContent = `=====================================================
BIOSITE PRO 2.0 — SEU SITE ESTÁ PRONTO PARA PUBLICAR
=====================================================

Projeto: ${project.nome}
Gerado em: ${new Date().toLocaleString('pt-BR')}

Este pacote contém um site 100% estático, independente e ultra-rápido.
NÃO necessita de banco de dados, PHP ou Node.js para funcionar.

-----------------------------------------------------
COMO PUBLICAR NA VERCEL (Recomendado):
-----------------------------------------------------
1. Acesse https://vercel.com
2. Crie uma conta gratuita ou faça login
3. Clique em "Add New..." -> "Project"
4. Arraste e solte esta pasta descompactada diretamente na Vercel
   OU suba para um repositório GitHub e importe na Vercel.
5. Clique em "Deploy". Seu biosite estará online em menos de 30 segundos!

-----------------------------------------------------
COMO PUBLICAR NA NETLIFY:
-----------------------------------------------------
1. Acesse https://app.netlify.com/drop
2. Arraste e solte a pasta descompactada no quadrado de upload.
3. Pronto! O site receberá uma URL pública instantânea.

-----------------------------------------------------
OUTRAS HOSPEDAGENS (Hostinger, cPanel, Cloudflare Pages):
-----------------------------------------------------
Basta enviar o arquivo "index.html" para a pasta "public_html" ou "www"
da sua hospedagem.

-----------------------------------------------------
CONTEÚDO DO PACOTE:
-----------------------------------------------------
- index.html   -> Página principal completa, responsiva e otimizada.
- vercel.json  -> Configuração de cabeçalhos de segurança para Vercel.
- README.txt   -> Este manual de publicação.

BioSite Pro 2.0 — Tecnologia para conversão e alto padrão visual.
`;
  zip.file('README.txt', readmeContent);

  // Generate ZIP blob
  return await zip.generateAsync({ type: 'blob' });
};
