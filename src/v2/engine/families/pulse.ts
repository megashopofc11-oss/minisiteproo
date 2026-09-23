import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderPulse = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'PULSE');
  const headline = escapeHtml(project.headline || 'ENERGIA. INTENSIDADE. RESULTADO.');
  const subheadline = escapeHtml(project.subheadline || 'TREINO & ALTA PERFORMANCE');
  const about = escapeHtml(project.about || 'Metodologia dinâmica feita para quebrar limites e acelerar conquistas.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'PROGRAMAS & ATENDIMENTOS');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'COMEÇAR AGORA');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Pulse High Energy</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #0A0A0C;
      --card-bg: #141419;
      --accent: #E11D48;
      --neon-yellow: #CCFF00;
      --text: #FFFFFF;
      --text-muted: #A1A1AA;
      --font-display: 'Chakra Petch', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.5;
      padding-bottom: 80px;
    }
    .container {
      max-width: 480px;
      margin: 0 auto;
      padding: 0 16px;
    }
    /* Dynamic Ticker Marquee */
    .ticker-wrap {
      background: var(--neon-yellow);
      color: #000000;
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 11px;
      letter-spacing: 0.1em;
      padding: 8px 0;
      overflow: hidden;
      white-space: nowrap;
      text-transform: uppercase;
      box-shadow: 0 4px 20px rgba(204,255,0,0.3);
    }
    .ticker-content {
      display: inline-block;
      animation: ticker 14s linear infinite;
    }
    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Hero */
    .pulse-hero {
      position: relative;
      margin-top: 16px;
      border-radius: 24px;
      overflow: hidden;
      min-height: 420px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
      border: 2px solid rgba(225,29,72,0.4);
    }
    .pulse-hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: contrast(1.2) brightness(0.7);
    }
    .pulse-hero-grad {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(10,10,12,0.2) 0%, rgba(10,10,12,0.85) 70%, #0A0A0C 100%);
    }
    .pulse-hero-data {
      position: relative;
      z-index: 2;
    }
    .pulse-sticker {
      background: var(--accent);
      color: #FFFFFF;
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      display: inline-block;
      transform: rotate(-2deg);
      margin-bottom: 12px;
      border-radius: 4px;
    }
    .pulse-title {
      font-family: var(--font-display);
      font-size: 38px;
      font-weight: 700;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      color: #FFFFFF;
    }
    .pulse-lead {
      font-family: var(--font-display);
      font-size: 15px;
      color: var(--neon-yellow);
      font-weight: 600;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
    .btn-pulse {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--neon-yellow);
      color: #000000;
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 16px 24px;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(204,255,0,0.3);
      transition: transform 0.15s ease;
    }
    .btn-pulse:active { transform: scale(0.98); }

    /* Manifesto */
    .pulse-block {
      background: var(--card-bg);
      border-left: 4px solid var(--accent);
      border-radius: 0 16px 16px 0;
      padding: 20px;
      margin-top: 24px;
    }
    .pulse-block p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Services Graphic */
    .services-sec {
      margin-top: 32px;
    }
    .sec-badge {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      text-transform: uppercase;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pulse-service-card {
      background: var(--card-bg);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 18px;
      padding: 18px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .pulse-service-title {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .pulse-service-desc {
      font-size: 12px;
      color: var(--text-muted);
    }
    .pulse-service-price {
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 700;
      color: var(--neon-yellow);
      white-space: nowrap;
    }

    /* Footer */
    .pulse-footer {
      margin-top: 36px;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
  </style>
</head>
<body>
  <!-- Top Ticker -->
  <div class="ticker-wrap">
    <div class="ticker-content">
      ⚡ VAGAS LIMITADAS • ATENDIMENTO DE ALTA INTENSIDADE • RESULTADOS COMPROVADOS • ${brandName} OFICIAL •
      ⚡ VAGAS LIMITADAS • ATENDIMENTO DE ALTA INTENSIDADE • RESULTADOS COMPROVADOS • ${brandName} OFICIAL •
    </div>
  </div>

  <div class="container">
    <!-- Hero -->
    <header class="pulse-hero">
      <img src="${heroImage}" alt="${brandName}" class="pulse-hero-bg" onerror="this.style.display='none'" />
      <div class="pulse-hero-grad"></div>
      <div class="pulse-hero-data">
        <span class="pulse-sticker">★ HIGH INTENSITY</span>
        <h1 class="pulse-title">${brandName}</h1>
        <p class="pulse-lead">${headline}</p>
        <a href="${waUrl}" target="_blank" class="btn-pulse">${SVG_ICONS.whatsapp} ${waLabel}</a>
      </div>
    </header>

    <!-- About Block -->
    <section class="pulse-block">
      <p>${about}</p>
    </section>

    <!-- Services -->
    ${(project.items && project.items.length > 0) ? `
    <section class="services-sec">
      <h2 class="sec-badge">⚡ ${itemsTitle}</h2>
      <div>
        ${project.items.map((it) => `
          <div class="pulse-service-card">
            <div>
              <div class="pulse-service-title">${escapeHtml(it.title)}</div>
              <div class="pulse-service-desc">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div class="pulse-service-price">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="pulse-footer">
      <div style="font-size: 13px; color: var(--text-muted);">${escapeHtml(project.location?.address || 'Studio Pulse • Atendimento Especializado')}</div>
      <div style="display: flex; justify-content: center; gap: 14px; margin-top: 14px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:var(--neon-yellow);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:var(--neon-yellow);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>
</body>
</html>`;
};
