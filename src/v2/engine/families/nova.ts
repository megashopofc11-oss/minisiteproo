import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderNova = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'NOVA');
  const headline = escapeHtml(project.headline || 'O FUTURO NÃO ESPERA.');
  const subheadline = escapeHtml(project.subheadline || 'MANIFESTO VISUAL');
  const about = escapeHtml(project.about || 'Uma proposta gráfica de impacto que une ousadia, presença de marca e autoridade estética.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'ATUAÇÃO & PROJETOS');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'CONTRATAR AGORA');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Poster Campaign</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #0B0B0E;
      --poster-border: #FFFFFF;
      --accent: #FF3B30;
      --text: #FFFFFF;
      --text-muted: #8E8E93;
      --font-poster: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      line-height: 1.4;
      padding: 16px 14px 80px 14px;
    }
    .poster-frame {
      max-width: 480px;
      margin: 0 auto;
      border: 3px solid var(--poster-border);
      padding: 20px 16px;
      position: relative;
      background: #000000;
    }
    .poster-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--poster-border);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .poster-issue {
      font-family: var(--font-poster);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: var(--accent);
      color: #FFFFFF;
      padding: 4px 8px;
    }
    .poster-serial {
      font-family: monospace;
      font-size: 11px;
      color: var(--text-muted);
    }
    .giant-title {
      font-family: var(--font-poster);
      font-size: 52px;
      font-weight: 800;
      line-height: 0.92;
      letter-spacing: -0.04em;
      text-transform: uppercase;
      color: #FFFFFF;
      margin-bottom: 16px;
      word-break: break-word;
    }
    .poster-img-box {
      border: 2px solid var(--poster-border);
      margin-bottom: 20px;
      overflow: hidden;
      position: relative;
    }
    .poster-img-box img {
      width: 100%;
      height: 320px;
      object-fit: cover;
      display: block;
      filter: grayscale(100%) contrast(1.3);
    }
    .poster-stamp {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #000000;
      color: #FFFFFF;
      border: 1px solid #FFFFFF;
      font-family: var(--font-poster);
      font-size: 10px;
      font-weight: 800;
      padding: 4px 8px;
      text-transform: uppercase;
      transform: rotate(4deg);
    }
    .poster-lead {
      font-family: var(--font-poster);
      font-size: 18px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .poster-text {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .btn-poster {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: var(--poster-border);
      color: #000000;
      font-family: var(--font-poster);
      font-size: 15px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 18px;
      text-decoration: none;
      border: 2px solid #000000;
      box-shadow: 4px 4px 0px var(--accent);
      transition: transform 0.1s ease, box-shadow 0.1s ease;
    }
    .btn-poster:active {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px var(--accent);
    }

    /* Poster Services List */
    .poster-sec {
      border-top: 2px solid var(--poster-border);
      margin-top: 28px;
      padding-top: 20px;
    }
    .poster-sec-head {
      font-family: var(--font-poster);
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .poster-item {
      border-bottom: 1px solid #222;
      padding: 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .poster-item-title {
      font-family: var(--font-poster);
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="poster-frame">
    <div class="poster-top-bar">
      <span class="poster-issue">${subheadline}</span>
      <span class="poster-serial">POSTER // 08-NOVA</span>
    </div>

    <h1 class="giant-title">${brandName}</h1>

    <div class="poster-img-box">
      <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
      <span class="poster-stamp">★ AUTORIDADE</span>
    </div>

    <div class="poster-lead">${headline}</div>
    <p class="poster-text">${about}</p>

    <a href="${waUrl}" target="_blank" class="btn-poster">${SVG_ICONS.whatsapp} ${waLabel}</a>

    ${(project.items && project.items.length > 0) ? `
    <div class="poster-sec">
      <div class="poster-sec-head">01 // ${itemsTitle}</div>
      <div>
        ${project.items.map((it) => `
          <div class="poster-item">
            <div>
              <div class="poster-item-title">${escapeHtml(it.title)}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div style="font-family:var(--font-poster); font-weight:800; color:var(--accent);">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <div style="border-top: 2px solid var(--poster-border); margin-top: 24px; padding-top: 14px; text-align: center; font-size: 11px; color: var(--text-muted); text-transform: uppercase;">
      ${escapeHtml(project.location?.address || 'Campanha Visual • Todos os Direitos Reservados')}
    </div>
  </div>
</body>
</html>`;
};
