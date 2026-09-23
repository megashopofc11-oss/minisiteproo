import { V2ProjectData } from '../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../shared';

export const renderElite = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'ÉLITE');
  const headline = escapeHtml(project.headline || 'Advocacia Estratégica & Governança Privada');
  const subheadline = escapeHtml(project.subheadline || 'CONSULTORIA DE ALTA COMPLEXIDADE');
  const about = escapeHtml(project.about || 'Mais de uma década defendendo interesses de alto valor com discrição, técnica impecável e dedicação integral.');
  const itemsTitle = escapeHtml(project.itemsTitle || 'Áreas de Atuação');
  const waUrl = getWhatsAppUrl(project);
  const waLabel = escapeHtml(project.socials?.whatsapp?.label || 'Agendar Consulta Reservada');
  const professionalPhoto = sanitizeUrl(project.professionalPhotoUrl || project.heroImageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${brandName} — Personal Brand Élite</title>
  ${COMMON_FONTS_LINK}
  <style>
    :root {
      --bg: #0A0B10;
      --card-bg: #12141F;
      --border: rgba(212, 175, 55, 0.25);
      --gold: #D4AF37;
      --gold-dim: rgba(212, 175, 55, 0.15);
      --text: #F8FAFC;
      --text-muted: #94A3B8;
      --font-display: 'Cinzel', serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      min-height: 100vh;
      line-height: 1.6;
      padding: 24px 16px 80px 16px;
    }
    .elite-wrapper {
      max-width: 480px;
      margin: 0 auto;
    }
    /* Personal Brand Hero with Cutout Person */
    .elite-hero {
      background: radial-gradient(circle at 50% 30%, rgba(212,175,55,0.18) 0%, #0A0B10 80%);
      border: 1px solid var(--border);
      border-radius: 28px;
      overflow: hidden;
      text-align: center;
      padding: 32px 20px 20px 20px;
      position: relative;
      margin-bottom: 24px;
    }
    .elite-verified {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      color: var(--gold);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: var(--gold-dim);
      border: 1px solid rgba(212,175,55,0.3);
      padding: 4px 12px;
      border-radius: 99px;
      margin-bottom: 14px;
    }
    .elite-name {
      font-family: var(--font-display);
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #FFFFFF;
      margin-bottom: 6px;
    }
    .elite-title-sub {
      font-size: 13px;
      color: var(--gold);
      font-weight: 600;
      letter-spacing: 0.05em;
      margin-bottom: 20px;
    }
    .elite-portrait-frame {
      position: relative;
      max-width: 260px;
      margin: 0 auto;
      height: 300px;
    }
    .elite-portrait-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      border-radius: 20px;
      border: 1px solid var(--border);
      box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.2);
    }

    /* Authority Metrics Row */
    .elite-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }
    .stat-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 16px;
      text-align: center;
    }
    .stat-num {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 700;
      color: var(--gold);
    }
    .stat-lbl {
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    /* Biography Card */
    .elite-bio {
      background: var(--card-bg);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 22px;
      padding: 22px;
      margin-bottom: 24px;
    }
    .bio-head {
      font-family: var(--font-display);
      font-size: 15px;
      font-weight: 700;
      color: var(--gold);
      margin-bottom: 8px;
    }
    .bio-text {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.7;
    }

    /* CTA Button */
    .btn-elite {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
      color: #0A0B10;
      font-family: var(--font-display);
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 18px 24px;
      border-radius: 16px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(212,175,55,0.3);
      transition: transform 0.15s ease;
    }
    .btn-elite:active { transform: scale(0.98); }

    /* Services / Practice Areas */
    .elite-practice {
      margin-top: 28px;
    }
    .practice-head {
      font-family: var(--font-display);
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 14px;
      text-align: center;
    }
    .practice-card {
      background: var(--card-bg);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .practice-name {
      font-size: 14px;
      font-weight: 600;
      color: #FFFFFF;
    }
    .practice-desc {
      font-size: 12px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="elite-wrapper">
    <!-- Hero Personal Brand -->
    <header class="elite-hero">
      <div class="elite-verified">${SVG_ICONS.check} Autoridade Certificada</div>
      <h1 class="elite-name">${brandName}</h1>
      <div class="elite-title-sub">${headline}</div>
      <div class="elite-portrait-frame">
        <img src="${professionalPhoto}" alt="${brandName}" class="elite-portrait-img" onerror="this.style.display='none'" />
      </div>
    </header>

    <!-- Authority Stats -->
    <div class="elite-stats">
      <div class="stat-box">
        <div class="stat-num">+10 ANOS</div>
        <div class="stat-lbl">De Trajetória</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">★ 5.0</div>
        <div class="stat-lbl">Excelência Comprovada</div>
      </div>
    </div>

    <!-- Bio Card -->
    <section class="elite-bio">
      <div class="bio-head">PERFIL & CONDUTA</div>
      <p class="bio-text">${about}</p>
    </section>

    <!-- CTA -->
    <a href="${waUrl}" target="_blank" class="btn-elite">${SVG_ICONS.whatsapp} ${waLabel}</a>

    <!-- Practice Areas -->
    ${(project.items && project.items.length > 0) ? `
    <section class="elite-practice">
      <div class="practice-head">${itemsTitle}</div>
      <div>
        ${project.items.map((it) => `
          <div class="practice-card">
            <div>
              <div class="practice-name">${escapeHtml(it.title)}</div>
              <div class="practice-desc">${escapeHtml(it.description)}</div>
            </div>
            ${(it.priceEnabled && it.price) ? `<div style="font-size:13px; font-weight:700; color:var(--gold);">${escapeHtml(it.price)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer style="margin-top: 36px; text-align: center; font-size: 12px; color: var(--text-muted);">
      <p>${escapeHtml(project.location?.address || 'Escritório Central • Atendimento Exclusivo')}</p>
      <div style="display: flex; justify-content: center; gap: 14px; margin-top: 12px;">
        ${project.socials?.instagram?.url ? `<a href="${sanitizeUrl(project.socials.instagram.url)}" target="_blank" style="color:var(--gold);">${SVG_ICONS.instagram}</a>` : ''}
        ${project.location?.mapsUrl ? `<a href="${sanitizeUrl(project.location.mapsUrl)}" target="_blank" style="color:var(--gold);">${SVG_ICONS.maps}</a>` : ''}
      </div>
    </footer>
  </div>
</body>
</html>`;
};
