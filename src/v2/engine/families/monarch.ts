import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderMonarch = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'MONARCH');
  const headline = escapeHtml(project.headline || 'A Arte da Distinção & Sofisticação Atemporal');
  const subheadline = escapeHtml(project.subheadline || 'Edição Exclusiva • Atendimento Privado');
  const about = escapeHtml(project.about || 'Dedicado aos padrões mais exigentes, onde cada detalhe é tratado com rigor estético.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Coleção de Serviços');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Solicitar Reserva Privada');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Edição Editorial</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #FAF8F5;
      --surface: #FFFFFF;
      --border: #E8E3DA;
      --text: #1C1917;
      --text-muted: #78716C;
      --gold: #B45309;
      --font-serif: 'Bodoni Moda', 'Playfair Display', serif;
      --font-body: 'DM Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      line-height: 1.6;
      padding: 32px 18px 80px 18px;
    }
    .page {
      max-width: 480px;
      margin: 0 auto;
    }
    /* Magazine Top Masthead */
    .masthead {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 2px solid var(--text);
      margin-bottom: 28px;
    }
    .issue-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--gold);
      display: block;
      margin-bottom: 8px;
    }
    .brand-title {
      font-family: var(--font-serif);
      font-size: 38px;
      font-weight: 700;
      letter-spacing: -0.01em;
      text-transform: uppercase;
      color: var(--text);
      line-height: 1;
    }
    .tagline {
      font-size: 12px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-top: 6px;
    }

    /* Editorial Hero Cover */
    .cover-frame {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 28px;
    }
    .cover-frame img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      display: block;
      filter: contrast(1.05);
    }
    .cover-caption {
      padding: 12px 0 0 0;
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 13px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
    }

    /* Headline Column */
    .headline-block {
      margin-bottom: 32px;
    }
    .headline-main {
      font-family: var(--font-serif);
      font-size: 24px;
      line-height: 1.3;
      color: var(--text);
      margin-bottom: 14px;
      font-weight: 600;
    }
    .headline-body {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.7;
    }

    /* Services Editorial List with Roman Numerals */
    .editorial-section {
      margin-bottom: 36px;
    }
    .editorial-heading {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-top: 1px solid var(--text);
      border-bottom: 1px solid var(--text);
      padding: 8px 0;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .editorial-item {
      display: flex;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
    }
    .roman-num {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 700;
      color: var(--gold);
      min-width: 28px;
    }
    .item-info { flex: 1; }
    .item-title {
      font-family: var(--font-serif);
      font-size: 16px;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 4px;
    }
    .item-desc {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .item-price {
      font-family: var(--font-serif);
      font-size: 14px;
      font-weight: 600;
      color: var(--gold);
      margin-top: 6px;
    }

    /* Action CTA */
    .btn-monarch {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--text);
      color: #FAF8F5;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      text-decoration: none;
      padding: 18px 24px;
      border-radius: 0px;
      margin-top: 24px;
      transition: background 0.2s;
    }
    .btn-monarch:hover { background: #000000; }

    /* Footer Colophon */
    .colophon {
      margin-top: 40px;
      border-top: 2px solid var(--text);
      padding-top: 20px;
      text-align: center;
      font-size: 12px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Masthead -->
    <header class="masthead">
      <span class="issue-label">${subheadline}</span>
      <h1 class="brand-title">${brandName}</h1>
      <div class="tagline">Editorial Prestige Edition</div>
    </header>

    <!-- Cover Image -->
    <div class="cover-frame">
      <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
      <div class="cover-caption">Retrato exclusivo da experiência e dedicação ao alto padrão.</div>
    </div>

    <!-- Editorial Intro -->
    <section class="headline-block">
      <h2 class="headline-main">${headline}</h2>
      <p class="headline-body">${about}</p>
    </section>

    <!-- Services Column -->
    ${(project.items && project.items.length > 0) ? `
    <section class="editorial-section">
      <div class="editorial-heading">
        <span>${itemsTitle}</span>
        <span style="font-size: 11px; font-weight: normal; color: var(--gold);">EXCLUSIVITÉ</span>
      </div>
      <div>
        ${project.items.map((it, idx) => {
          const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][idx] || `0${idx+1}`;
          return `
          <div class="editorial-item">
            <span class="roman-num">${roman}</span>
            <div class="item-info">
              <h3 class="item-title">${escapeHtml(it.title)}</h3>
              <p class="item-desc">${escapeHtml(it.description)}</p>
              ${(it.priceEnabled && it.price) ? `<div class="item-price">${escapeHtml(it.price)}</div>` : ''}
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </section>
    ` : ''}

    <!-- CTA -->
    <a href="${waUrl}" target="_blank" class="btn-monarch">${SVG_ICONS.whatsapp} ${waLabel}</a>

    <!-- Footer Colophon -->
    <footer class="colophon">
      <p>${escapeHtml(project.location?.address || 'São Paulo • Atendimento sob Consulta')}</p>
      <div style="display: flex; justify-content: center; gap: 16px; margin-top: 14px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:var(--text);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:var(--text);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>
</body>
</html>`;
};
