import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderAtelier = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'ATELIER');
  const headline = escapeHtml(project.headline || 'Artesania Contemporânea & Estética Essencial');
  const about = escapeHtml(project.about || 'O tempo dedicado à perfeição do gesto simples. Um refúgio de bom gosto e detalhes discretos.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Criações & Atendimento');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Conversar com o Atelier');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Atelier</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #F5F2EB;
      --surface: #EFECE4;
      --border: #DDD7CA;
      --text: #262320;
      --text-muted: #7A756D;
      --terracotta: #8C4A32;
      --font-serif: 'Playfair Display', serif;
      --font-sans: 'DM Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      min-height: 100vh;
      line-height: 1.7;
      padding: 40px 20px 80px 20px;
    }
    .atelier-page {
      max-width: 440px;
      margin: 0 auto;
    }
    /* Minimal Top Header */
    .atelier-head {
      text-align: center;
      margin-bottom: 32px;
    }
    .atelier-kicker {
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--terracotta);
      display: block;
      margin-bottom: 12px;
    }
    .atelier-title {
      font-family: var(--font-serif);
      font-size: 34px;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 10px;
    }
    .atelier-sub {
      font-size: 13px;
      color: var(--text-muted);
      max-width: 320px;
      margin: 0 auto;
      line-height: 1.6;
    }

    /* Minimalist Photo */
    .atelier-hero-photo {
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 36px;
      border: 1px solid var(--border);
    }
    .atelier-hero-photo img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      display: block;
    }

    /* About Narrative */
    .atelier-story {
      margin-bottom: 40px;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 24px 0;
    }
    .atelier-story p {
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 16px;
      color: var(--text);
      line-height: 1.8;
      text-align: center;
    }

    /* Minimal Services List */
    .atelier-services {
      margin-bottom: 44px;
    }
    .atelier-sec-title {
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 20px;
      display: block;
    }
    .atelier-service-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 14px 0;
      border-bottom: 1px solid var(--border);
    }
    .atelier-service-name {
      font-size: 15px;
      font-weight: 500;
      color: var(--text);
    }
    .atelier-service-desc {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .atelier-service-price {
      font-size: 13px;
      color: var(--terracotta);
      font-weight: 600;
      white-space: nowrap;
      margin-left: 12px;
    }

    /* Action CTA */
    .btn-atelier {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--text);
      color: #FAF9F5;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 600;
      text-decoration: none;
      padding: 16px 24px;
      border-radius: 99px;
      transition: background 0.2s;
    }
    .btn-atelier:hover { background: #000000; }

    /* Footer */
    .atelier-foot {
      margin-top: 48px;
      text-align: center;
      font-size: 12px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="atelier-page">
    <!-- Header -->
    <header class="atelier-head">
      <span class="atelier-kicker">Atelier • Estética Pura</span>
      <h1 class="atelier-title">${brandName}</h1>
      <p class="atelier-sub">${headline}</p>
    </header>

    <!-- Photo -->
    <div class="atelier-hero-photo">
      <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
    </div>

    <!-- Story -->
    <section class="atelier-story">
      <p>${about}</p>
    </section>

    <!-- Services -->
    ${(project.items && project.items.length > 0) ? `
    <section class="atelier-services">
      <span class="atelier-sec-title">${itemsTitle}</span>
      <div>
        ${project.items.map((it) => `
          <div class="atelier-service-row">
            <div>
              <div class="atelier-service-name">${escapeHtml(it.title)}</div>
              <div class="atelier-service-desc">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div class="atelier-service-price">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- CTA -->
    <a href="${waUrl}" target="_blank" class="btn-atelier">${SVG_ICONS.whatsapp} ${waLabel}</a>

    <!-- Footer -->
    <footer class="atelier-foot">
      <p>${escapeHtml(project.location?.address || 'Atendimento com Hora Marcada')}</p>
      <div style="display: flex; justify-content: center; gap: 14px; margin-top: 14px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:var(--text);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:var(--text);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>
</body>
</html>`;
};
