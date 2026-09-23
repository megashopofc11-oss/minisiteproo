import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderVertice = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'VÉRTICE');
  const headline = escapeHtml(project.headline || 'Arquitetura de Precisão & Soluções Modernas');
  const about = escapeHtml(project.about || 'Design racional, proporções perfeitas e atendimento descomplicado.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Capacidades');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Iniciar Contato');
  const logo = sanitizeUrl(project.logoUrl || '');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Vértice Bento</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #090A0F;
      --surface: #12141F;
      --border: #222638;
      --accent: #00F0FF;
      --accent-dim: rgba(0, 240, 255, 0.15);
      --text: #F1F5F9;
      --text-muted: #94A3B8;
      --font-mono: 'Space Grotesk', monospace;
      --font-display: 'Space Grotesk', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      line-height: 1.5;
      padding: 20px 16px 80px 16px;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    /* Bento Grid System */
    .bento-header {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }
    .bento-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      background: var(--accent-dim);
      border: 1px solid rgba(0,240,255,0.3);
      padding: 4px 10px;
      border-radius: 99px;
      display: inline-block;
      margin-bottom: 12px;
      letter-spacing: 0.05em;
    }
    .bento-title {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .bento-sub {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .bento-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }
    .bento-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .bento-card.span-2 {
      grid-column: span 2;
    }
    .bento-card.image-card {
      min-height: 200px;
      padding: 0;
    }
    .bento-card.image-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .metric-value {
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 700;
      color: var(--accent);
      line-height: 1;
      margin-bottom: 4px;
    }
    .metric-label {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* CTA Button */
    .btn-bento-action {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--accent);
      color: #090A0F;
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-decoration: none;
      padding: 16px;
      border-radius: 18px;
      transition: transform 0.15s ease, filter 0.15s ease;
    }
    .btn-bento-action:active { transform: scale(0.98); }

    /* Bento Services */
    .service-row {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }
    .service-bento-item {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .service-bento-name {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 600;
      color: #FFFFFF;
    }
    .service-bento-price {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--accent);
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Bento -->
    <header class="bento-header">
      <span class="bento-badge">VÉRTICE • BENTO MODERN</span>
      <h1 class="bento-title">${brandName}</h1>
      <p class="bento-sub">${headline}</p>
    </header>

    <!-- Metrics Bento Row -->
    <div class="bento-row">
      <div class="bento-card">
        <div class="metric-value">100%</div>
        <div class="metric-label">Compromisso</div>
      </div>
      <div class="bento-card">
        <div class="metric-value">★ 5.0</div>
        <div class="metric-label">Avaliação Google</div>
      </div>
    </div>

    <!-- Image Spotlight Bento -->
    <div class="bento-card image-card">
      <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
    </div>

    <!-- About Bento -->
    <div class="bento-card span-2">
      <span class="metric-label" style="color:var(--accent); margin-bottom: 8px;">Manifesto</span>
      <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${about}</p>
    </div>

    <!-- Services Bento -->
    ${(project.items && project.items.length > 0) ? `
    <div class="bento-card span-2">
      <span class="metric-label" style="color:var(--accent); margin-bottom: 4px;">${itemsTitle}</span>
      <div class="service-row">
        ${project.items.map((it) => `
          <div class="service-bento-item">
            <div>
              <div class="service-bento-name">${escapeHtml(it.title)}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div class="service-bento-price">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- CTA Button -->
    <a href="${waUrl}" target="_blank" class="btn-bento-action">${SVG_ICONS.whatsapp} ${waLabel}</a>

    <!-- Footer Info -->
    <div class="bento-card span-2" style="text-align: center; padding: 20px;">
      <div style="font-size: 12px; color: var(--text-muted);">
        ${escapeHtml(project.location?.address || 'Atendimento Digital e Presencial')}
      </div>
      <div style="display: flex; justify-content: center; gap: 12px; margin-top: 12px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color: var(--accent);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color: var(--accent);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </div>
  </div>
</body>
</html>`;
};
