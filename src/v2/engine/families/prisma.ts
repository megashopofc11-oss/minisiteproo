import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderPrisma = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'PRISMA');
  const headline = escapeHtml(project.headline || 'Futurismo & Profundidade Visual');
  const about = escapeHtml(project.about || 'Uma experiência imersiva através de luz, transparência e design de vanguarda.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Dimensões de Atendimento');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Conectar no Prisma');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Prisma Immersive Glass</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #060814;
      --card-bg: rgba(255, 255, 255, 0.04);
      --card-border: rgba(255, 255, 255, 0.12);
      --neon-cyan: #38BDF8;
      --neon-violet: #A855F7;
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --font-display: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-display);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.5;
      padding: 24px 16px 80px 16px;
      position: relative;
    }
    /* Ambient Glowing Orbs */
    .orb-1 {
      position: fixed;
      top: -100px;
      left: -100px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    .orb-2 {
      position: fixed;
      bottom: -100px;
      right: -100px;
      width: 340px;
      height: 340px;
      background: radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }
    .container {
      max-width: 460px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    /* Glass Card */
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .hero-glass {
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero-glass::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20%;
      right: 20%;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
    }
    .prisma-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      color: var(--neon-cyan);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .prisma-title {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .prisma-sub {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .hero-img-wrap {
      border-radius: 20px;
      overflow: hidden;
      margin-top: 18px;
      height: 220px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .hero-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* CTA Button */
    .btn-prisma {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(168,85,247,0.3) 100%);
      border: 1px solid rgba(255,255,255,0.3);
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 16px;
      border-radius: 18px;
      text-decoration: none;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 30px rgba(56,189,248,0.2);
      transition: all 0.2s;
    }
    .btn-prisma:active { transform: scale(0.98); }

    /* Services Glass */
    .service-glass-item {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 18px;
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .service-glass-title {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 2px;
    }
    .service-glass-desc {
      font-size: 12px;
      color: var(--text-muted);
    }
    .service-glass-price {
      font-size: 13px;
      color: var(--neon-cyan);
      font-weight: 700;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="orb-1"></div>
  <div class="orb-2"></div>

  <div class="container">
    <!-- Hero Glass -->
    <header class="glass-card hero-glass">
      <span class="prisma-badge">${SVG_ICONS.sparkles} PRISMA IMMERSIVE</span>
      <h1 class="prisma-title">${brandName}</h1>
      <p class="prisma-sub">${headline}</p>
      <div class="hero-img-wrap">
        <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
      </div>
    </header>

    <!-- About -->
    <section class="glass-card">
      <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">${about}</p>
    </section>

    <!-- Services -->
    ${(project.items && project.items.length > 0) ? `
    <section class="glass-card">
      <div style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin-bottom: 14px;">${itemsTitle}</div>
      <div>
        ${project.items.map((it) => `
          <div class="service-glass-item">
            <div>
              <div class="service-glass-title">${escapeHtml(it.title)}</div>
              <div class="service-glass-desc">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div class="service-glass-price">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- CTA -->
    <a href="${waUrl}" target="_blank" class="btn-prisma">${SVG_ICONS.whatsapp} ${waLabel}</a>

    <!-- Footer -->
    <footer class="glass-card" style="text-align: center; padding: 18px;">
      <div style="font-size: 12px; color: var(--text-muted);">${escapeHtml(project.location?.address || 'Prisma Experience Lab')}</div>
      <div style="display: flex; justify-content: center; gap: 14px; margin-top: 12px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:var(--neon-cyan);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:var(--neon-cyan);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>
</body>
</html>`;
};
