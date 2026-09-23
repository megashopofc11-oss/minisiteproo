import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderFrame = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'FRAME');
  const headline = escapeHtml(project.headline || 'Curadoria Visual & Portfólio de Obras');
  const about = escapeHtml(project.about || 'Cada imagem conta uma história de técnica, luz e sensibilidade criativa.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Produções Selecionadas');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Solicitar Orçamento');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Frame Portfolio</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #0D0E12;
      --surface: #151720;
      --border: #282C3D;
      --text: #F3F4F6;
      --text-muted: #9CA3AF;
      --accent: #E5E7EB;
      --font-display: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-display);
      min-height: 100vh;
      line-height: 1.6;
      padding: 24px 16px 80px 16px;
    }
    .frame-container {
      max-width: 480px;
      margin: 0 auto;
    }
    /* Minimal Gallery Header */
    .frame-head {
      margin-bottom: 24px;
    }
    .frame-kicker {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-muted);
      display: block;
      margin-bottom: 8px;
    }
    .frame-title {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      line-height: 1.1;
      margin-bottom: 8px;
    }
    .frame-sub {
      font-size: 14px;
      color: var(--text-muted);
    }

    /* Main Showcase Photo */
    .frame-spotlight {
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 28px;
      background: #1A1D27;
      border: 1px solid var(--border);
    }
    .frame-spotlight img {
      width: 100%;
      height: 360px;
      object-fit: cover;
      display: block;
    }

    /* Gallery Grid 2-col */
    .frame-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 32px;
    }
    .frame-grid-item {
      border-radius: 12px;
      overflow: hidden;
      background: #1A1D27;
      border: 1px solid var(--border);
      position: relative;
    }
    .frame-grid-item img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }
    .frame-item-cap {
      padding: 8px 10px;
      font-size: 11px;
      color: var(--text-muted);
      background: var(--surface);
    }

    /* Services as Projects */
    .frame-services {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 28px;
    }
    .frame-sec-name {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #FFFFFF;
      margin-bottom: 16px;
    }
    .frame-service-row {
      padding: 12px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .frame-service-title {
      font-size: 14px;
      font-weight: 600;
      color: #FFFFFF;
    }
    .frame-service-desc {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* CTA */
    .btn-frame {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #FFFFFF;
      color: #0D0E12;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 16px;
      border-radius: 14px;
      text-decoration: none;
      transition: background 0.2s;
    }
    .btn-frame:hover { background: #E5E7EB; }

    /* Footer */
    .frame-foot {
      margin-top: 36px;
      text-align: center;
      font-size: 12px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="frame-container">
    <!-- Header -->
    <header class="frame-head">
      <span class="frame-kicker">Portfolio & Lookbook</span>
      <h1 class="frame-title">${brandName}</h1>
      <p class="frame-sub">${headline}</p>
    </header>

    <!-- Hero Spotlight -->
    <div class="frame-spotlight">
      <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
    </div>

    <!-- Gallery Works -->
    ${(project.gallery && project.gallery.length > 0) ? `
    <div class="frame-grid">
      ${project.gallery.slice(0, 4).map((g) => `
        <div class="frame-grid-item">
          <img src="${sanitizeUrl(g.url)}" alt="${escapeHtml(g.caption || brandName)}" onerror="this.style.display='none'" />
          ${g.caption ? `<div class="frame-item-cap">${escapeHtml(g.caption)}</div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Services -->
    ${(project.items && project.items.length > 0) ? `
    <section class="frame-services">
      <div class="frame-sec-name">${itemsTitle}</div>
      <div>
        ${project.items.map((it) => `
          <div class="frame-service-row">
            <div>
              <div class="frame-service-title">${escapeHtml(it.title)}</div>
              <div class="frame-service-desc">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div style="font-size: 13px; font-weight: 700; color: #FFFFFF;">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- CTA -->
    <a href="${waUrl}" target="_blank" class="btn-frame">${SVG_ICONS.whatsapp} ${waLabel}</a>

    <!-- Footer -->
    <footer class="frame-foot">
      <p>${escapeHtml(project.location?.address || 'Estúdio Visual • Ensaios & Produções')}</p>
      <div style="display: flex; justify-content: center; gap: 14px; margin-top: 14px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:#FFFFFF;">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:#FFFFFF;">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>
</body>
</html>`;
};
