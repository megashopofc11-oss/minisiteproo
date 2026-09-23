import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderAura = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'AURA');
  const headline = escapeHtml(project.headline || 'Experiência Cinematográfica de Alto Padrão');
  const subheadline = escapeHtml(project.subheadline || 'Atendimento exclusivo e posicionamento inconfundível.');
  const about = escapeHtml(project.about || '');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Serviços & Experiências');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Agendar Experiência');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80');
  const logo = sanitizeUrl(project.logoUrl || '');
  const professionalPhoto = sanitizeUrl(project.professionalPhotoUrl || '');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Biosite Oficial</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #07080C;
      --card-bg: rgba(18, 20, 30, 0.7);
      --card-border: rgba(245, 158, 11, 0.2);
      --primary: #F59E0B;
      --primary-glow: rgba(245, 158, 11, 0.4);
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --font-display: 'Syne', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
    }
    .wrapper {
      max-width: 480px;
      margin: 0 auto;
      padding: 0 16px 80px 16px;
      position: relative;
    }
    /* Hero Cinematic Full Bleed */
    .hero {
      position: relative;
      border-radius: 28px;
      overflow: hidden;
      margin-top: 16px;
      min-height: 480px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 28px 24px;
      background: #0D0F18;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.12);
      border: 1px solid rgba(255,255,255,0.08);
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      filter: brightness(0.65) contrast(1.1);
      transform: scale(1.02);
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(7,8,12,0.1) 0%, rgba(7,8,12,0.7) 50%, #07080C 100%);
    }
    .hero-content {
      position: relative;
      z-index: 2;
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--primary);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .hero-logo {
      max-height: 48px;
      max-width: 140px;
      object-fit: contain;
      margin-bottom: 12px;
      display: block;
    }
    .hero-title {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      margin-bottom: 10px;
      text-shadow: 0 2px 20px rgba(0,0,0,0.8);
    }
    .hero-sub {
      font-size: 14px;
      color: #CBD5E1;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .btn-main {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: #07080C;
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-decoration: none;
      padding: 16px 24px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-main:active { transform: scale(0.98); }

    /* About Section */
    .section-about {
      margin-top: 32px;
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 24px;
    }
    .section-kicker {
      font-size: 11px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      display: block;
      margin-bottom: 8px;
    }
    .about-text {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.65;
    }

    /* Services List */
    .section-services {
      margin-top: 36px;
    }
    .section-heading {
      font-family: var(--font-display);
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .services-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .service-card {
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      transition: border-color 0.2s;
    }
    .service-card:hover {
      border-color: rgba(245,158,11,0.3);
    }
    .service-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .service-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }
    .service-name {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .service-desc {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .service-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .service-price {
      font-weight: 700;
      color: var(--primary);
      font-size: 13px;
    }
    .service-link {
      font-size: 11px;
      font-weight: 700;
      color: var(--primary);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* Gallery */
    .section-gallery {
      margin-top: 36px;
    }
    .gallery-scroll {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 8px;
      scrollbar-width: none;
    }
    .gallery-scroll::-webkit-scrollbar { display: none; }
    .gallery-item {
      min-width: 220px;
      height: 280px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      flex-shrink: 0;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .gallery-caption {
      position: absolute;
      bottom: 0;
      inset-x: 0;
      padding: 12px 14px;
      background: linear-gradient(180deg, transparent 0%, rgba(7,8,12,0.9) 100%);
      font-size: 12px;
      color: #FFFFFF;
    }

    /* Social / Contact */
    .section-contact {
      margin-top: 36px;
      background: var(--card-bg);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 24px;
      padding: 24px;
      text-align: center;
    }
    .social-row {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
    }
    .social-btn {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.2s;
    }
    .social-btn:hover {
      background: var(--primary);
      color: #07080C;
    }
    .location-text {
      margin-top: 16px;
      font-size: 13px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Hero -->
    <header class="hero">
      <img src="${heroImage}" alt="${brandName}" class="hero-bg" onerror="this.style.display='none'" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        ${logo ? `<img src="${logo}" alt="${brandName}" class="hero-logo" onerror="this.style.display='none'" />` : ''}
        <span class="hero-tag">Aura Cinematic • Exclusividade</span>
        <h1 class="hero-title">${brandName}</h1>
        <p class="hero-sub">${headline}</p>
        <a href="${waUrl}" target="_blank" class="btn-main">${SVG_ICONS.whatsapp} ${waLabel}</a>
      </div>
    </header>

    ${about ? `
    <!-- About -->
    <section class="section-about">
      <span class="section-kicker">Sobre Nós</span>
      <p class="about-text">${about}</p>
    </section>
    ` : ''}

    ${(project.items && project.items.length > 0) ? `
    <!-- Services -->
    <section class="section-services">
      <div class="section-heading">
        <span>${itemsTitle}</span>
      </div>
      <div class="services-grid">
        ${project.items.map((it) => `
          <div class="service-card">
            ${it.photoUrl ? `<img src="${sanitizeUrl(it.photoUrl)}" alt="${escapeHtml(it.title)}" class="service-img" onerror="this.style.display='none'" />` : ''}
            <div class="service-body">
              <h3 class="service-name">${escapeHtml(it.title)}</h3>
              <p class="service-desc">${escapeHtml(it.description)}</p>
              <div class="service-foot">
                ${(it.priceEnabled && it.price) ? `<span class="service-price">${escapeHtml(it.price)}</span>` : '<span></span>'}
                <a href="${waUrl}" target="_blank" class="service-link">Consultar ${SVG_ICONS.arrowRight}</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    ${(project.gallery && project.gallery.length > 0) ? `
    <!-- Gallery Lookbook -->
    <section class="section-gallery">
      <div class="section-heading">
        <span>Galeria Visual</span>
      </div>
      <div class="gallery-scroll">
        ${project.gallery.map((g) => `
          <div class="gallery-item">
            <img src="${sanitizeUrl(g.url)}" alt="${escapeHtml(g.caption || brandName)}" onerror="this.style.display='none'" />
            ${g.caption ? `<div class="gallery-caption">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Contact & Socials -->
    <footer class="section-contact">
      <span class="section-kicker">Conecte-se</span>
      <div class="social-row">
        ${project.socials?.whatsapp?.enabled !== false ? `<a href="${waUrl}" target="_blank" class="social-btn" title="WhatsApp">${SVG_ICONS.whatsapp}</a>` : ''}
        ${project.socials?.instagram?.enabled !== false && project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" class="social-btn" title="Instagram">${SVG_ICONS.instagram}</a>` : ''}
        ${project.socials?.tiktok?.enabled !== false && project.socials?.tiktok?.url ? `<a href="${sanitizeUrl(project.socials.tiktok.url)}" target="_blank" class="social-btn" title="TikTok">${SVG_ICONS.tiktok}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" class="social-btn" title="Maps">${SVG_ICONS.maps}</a>` : ''}
      </div>
      ${project.location?.address ? `
        <p class="location-text">${escapeHtml(project.location.address)}${project.location.city ? ` • ${escapeHtml(project.location.city)}` : ''}</p>
      ` : ''}
    </footer>
  </div>
</body>
</html>`;
};
