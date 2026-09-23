import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderOrbit = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'ORBIT');
  const headline = escapeHtml(project.headline || 'A Jornada Completa do Seu Projeto');
  const subheadline = escapeHtml(project.subheadline || 'METODOLOGIA PROGRESSIVA');
  const about = escapeHtml(project.about || 'Acompanhamos sua transformação do diagnóstico inicial até o resultado final, passo a passo.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Fases de Atendimento');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Iniciar Minha Jornada');
  const heroImage = sanitizeUrl(project.heroImageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Orbit Story</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #080A12;
      --surface: #101322;
      --accent: #6366F1;
      --accent-glow: rgba(99, 102, 241, 0.35);
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
      line-height: 1.6;
      padding: 24px 16px 120px 16px;
    }
    .orbit-container {
      max-width: 480px;
      margin: 0 auto;
    }
    /* Story Header */
    .orbit-head {
      background: var(--surface);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      padding: 24px;
      margin-bottom: 28px;
    }
    .orbit-kicker {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 8px;
    }
    .orbit-title {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #FFFFFF;
      line-height: 1.15;
      margin-bottom: 10px;
    }
    .orbit-lead {
      font-size: 14px;
      color: var(--text-muted);
    }

    /* Hero Visual */
    .orbit-hero-box {
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 32px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .orbit-hero-box img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      display: block;
    }

    /* Vertical Storyline Timeline */
    .timeline-sec {
      position: relative;
      padding-left: 28px;
      margin-bottom: 36px;
    }
    .timeline-sec::before {
      content: '';
      position: absolute;
      left: 10px;
      top: 10px;
      bottom: 10px;
      width: 2px;
      background: linear-gradient(180deg, var(--accent) 0%, rgba(99,102,241,0.1) 100%);
    }
    .timeline-node {
      position: relative;
      margin-bottom: 24px;
    }
    .timeline-dot {
      position: absolute;
      left: -28px;
      top: 4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--accent);
      box-shadow: 0 0 10px var(--accent-glow);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .timeline-dot-inner {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
    }
    .timeline-card {
      background: var(--surface);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 18px;
      padding: 16px 18px;
    }
    .timeline-step {
      font-size: 10px;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .timeline-name {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .timeline-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Sticky Bottom CTA Bar */
    .sticky-cta-bar {
      position: fixed;
      bottom: 16px;
      left: 16px;
      right: 16px;
      max-width: 480px;
      margin: 0 auto;
      background: rgba(16, 19, 34, 0.9);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 20px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.7);
      z-index: 50;
    }
    .sticky-cta-text {
      font-size: 12px;
      font-weight: 600;
      color: #FFFFFF;
    }
    .sticky-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--accent);
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 700;
      padding: 10px 18px;
      border-radius: 12px;
      text-decoration: none;
      white-space: nowrap;
      box-shadow: 0 4px 15px var(--accent-glow);
    }
  </style>
</head>
<body>
  <div class="orbit-container">
    <!-- Header -->
    <header class="orbit-head">
      <span class="orbit-kicker">${subheadline}</span>
      <h1 class="orbit-title">${brandName}</h1>
      <p class="orbit-lead">${headline}</p>
    </header>

    <!-- Visual -->
    <div class="orbit-hero-box">
      <img src="${heroImage}" alt="${brandName}" onerror="this.style.display='none'" />
    </div>

    <!-- About -->
    <div style="background:var(--surface); border-radius:20px; padding:20px; border:1px solid rgba(255,255,255,0.06); margin-bottom:32px;">
      <p style="font-size: 14px; color: var(--text-muted);">${about}</p>
    </div>

    <!-- Storyline Timeline -->
    ${(project.items && project.items.length > 0) ? `
    <div style="font-size: 16px; font-weight: 700; color: #FFFFFF; margin-bottom: 20px;">${itemsTitle}</div>
    <div class="timeline-sec">
      ${project.items.map((it, idx) => `
        <div class="timeline-node">
          <div class="timeline-dot"><div class="timeline-dot-inner"></div></div>
          <div class="timeline-card">
            <div class="timeline-step">Etapa 0${idx + 1}</div>
            <div class="timeline-name">${escapeHtml(it.title)}</div>
            <div class="timeline-desc">${escapeHtml(it.description)}</div>
            ${(it.priceEnabled && it.price) ? `<div style="font-size:12px; font-weight:700; color:var(--accent); margin-top:6px;">${escapeHtml(it.price)}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Footer Info -->
    <footer style="text-align: center; font-size: 12px; color: var(--text-muted); margin-top: 40px;">
      <p>${escapeHtml(project.location?.address || 'Atendimento com Acompanhamento Dedicado')}</p>
      <div style="display: flex; justify-content: center; gap: 14px; margin-top: 12px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:var(--accent);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:var(--accent);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>

  <!-- Sticky Persistent CTA Bar -->
  <div class="sticky-cta-bar">
    <div class="sticky-cta-text">${brandName} • Vagas Abertas</div>
    <a href="${waUrl}" target="_blank" class="sticky-btn">${SVG_ICONS.whatsapp} ${waLabel}</a>
  </div>
</body>
</html>`;
};
