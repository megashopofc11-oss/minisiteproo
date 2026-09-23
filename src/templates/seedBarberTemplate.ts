import { BioFacilTemplate } from '../types/biofacil';

export const SEED_BARBER_TEMPLATE: BioFacilTemplate = {
  templateId: 'BF-BARBER-001',
  name: 'Barbearia Vintage — Dom Cavalcanti',
  slug: 'barbearia-vintage-dom-cavalcanti',
  categoryId: 'barbearia',
  categoryName: 'Barbearia',
  demoUrl: '',
  thumbnailUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
  status: 'published',
  version: 1,
  createdAt: 1711200000000,
  updatedAt: 1711200000000,
  createdBy: 'admin',
  biofacilSchema: {
    version: 1,
    templateId: 'BF-BARBER-001',
    name: 'Barbearia Vintage — Dom Cavalcanti',
    category: 'barbearia',
    tagline: 'Cortes clássicos, toalha quente e barba na navalha.',
    fields: [
      {
        id: 'brand_name',
        label: 'Nome da Barbearia',
        type: 'text',
        defaultValue: 'Dom Cavalcanti Barbershop',
        section: 'identity'
      },
      {
        id: 'tagline',
        label: 'Slogan / Descrição',
        type: 'textarea',
        defaultValue: 'A verdadeira experiência do corte clássico com atendimento de excelência. Agende seu horário e sinta a diferença.',
        section: 'content'
      },
      {
        id: 'hero_image',
        label: 'Foto Principal do Barbeiro / Fachada',
        type: 'image',
        defaultValue: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
        section: 'photos'
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp para Agendamentos',
        type: 'phone',
        defaultValue: '34999998877',
        section: 'contact',
        description: 'Informe apenas os dígitos do WhatsApp com DDD.'
      },
      {
        id: 'instagram',
        label: 'Instagram da Barbearia',
        type: 'text',
        defaultValue: '@domcavalcantibarber',
        section: 'contact'
      },
      {
        id: 'services',
        label: 'Tabela de Serviços & Valores',
        type: 'services',
        defaultValue: [
          {
            id: 's1',
            name: 'Corte Clássico & Fade',
            description: 'Lavagem especial, corte na tesoura e máquina com finalização pomada premium.',
            price: 'R$ 60'
          },
          {
            id: 's2',
            name: 'Barboterapia Tradicional',
            description: 'Toalha quente, óleos essenciais, massagem facial e navalha afiada.',
            price: 'R$ 50'
          },
          {
            id: 's3',
            name: 'Combo Cabelo + Barba',
            description: 'Experiência completa com direito a cerveja gelada ou café expresso.',
            price: 'R$ 95'
          },
          {
            id: 's4',
            name: 'Acabamento & Pezinho',
            description: 'Alinhamento dos fios e limpeza rápida de contornos.',
            price: 'R$ 30'
          }
        ],
        section: 'services'
      },
      {
        id: 'gallery',
        label: 'Galeria de Trabalhos',
        type: 'gallery',
        defaultValue: [
          {
            id: 'g1',
            url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80',
            caption: 'Corte Pompadour Clássico'
          },
          {
            id: 'g2',
            url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80',
            caption: 'Barboterapia com Navalha'
          },
          {
            id: 'g3',
            url: 'https://images.unsplash.com/photo-1517832606589-7629c3395909?w=600&auto=format&fit=crop&q=80',
            caption: 'Ambiente Vintage Climatizado'
          }
        ],
        section: 'photos'
      },
      {
        id: 'address',
        label: 'Endereço Completo',
        type: 'text',
        defaultValue: 'Av. Rondon Pacheco, 1420 - Centro, Uberlândia - MG',
        section: 'location'
      },
      {
        id: 'hours',
        label: 'Horário de Atendimento',
        type: 'text',
        defaultValue: 'Segunda a Sábado das 09:00 às 20:00',
        section: 'location'
      }
    ],
    capabilities: {
      gallery: true,
      supportedGalleryLayouts: ['original', 'carousel', 'grid', 'horizontal'],
      carouselOptions: {
        autoplay: true,
        speed: 3,
        indicators: true,
        arrows: true,
        loop: true,
        effects: ['slide', 'fade']
      },
      imageBehaviors: ['normal', 'fixed'],
      services: true,
      servicesLabel: 'Especialidades & Cortes',
      allowPrice: true,
      location: true,
      googleReviews: true,
      colorCustomization: true,
      supportedColorPresets: [
        {
          id: 'original',
          name: 'Original Dourado Vintage',
          colors: {
            '--gold': '#d4af37',
            '--gold-light': '#f3e5ab',
            '--primary': '#d4af37',
            '--accent': '#f3e5ab',
            '--background': '#0c0d10',
            '--text': '#f8fafc'
          }
        },
        {
          id: 'luxury',
          name: 'Ouro Real & Preto Profundo',
          colors: {
            '--gold': '#f59e0b',
            '--gold-light': '#fbbf24',
            '--primary': '#f59e0b',
            '--accent': '#fbbf24',
            '--background': '#000000',
            '--text': '#ffffff'
          }
        },
        {
          id: 'neon',
          name: 'Neon Cyber Barber',
          colors: {
            '--gold': '#06b6d4',
            '--gold-light': '#22d3ee',
            '--primary': '#06b6d4',
            '--accent': '#22d3ee',
            '--background': '#080d1a',
            '--text': '#f0f9ff'
          }
        },
        {
          id: 'dark',
          name: 'Dark Minimalista',
          colors: {
            '--gold': '#e2e8f0',
            '--gold-light': '#cbd5e1',
            '--primary': '#e2e8f0',
            '--accent': '#94a3b8',
            '--background': '#0f172a',
            '--text': '#ffffff'
          }
        }
      ],
      customColors: [
        { varName: '--gold', label: 'Cor Principal (Dourado/Destaque)', defaultColor: '#d4af37' },
        { varName: '--gold-light', label: 'Brilho Secundário', defaultColor: '#f3e5ab' },
        { varName: '--dark', label: 'Fundo da Página', defaultColor: '#121316' },
        { varName: '--text', label: 'Cor do Texto', defaultColor: '#f8fafc' }
      ],
      supportedIconStyles: ['original', 'minimal', 'glass', 'glow', '3d'],
      supportedEffects: ['original', 'soft', 'glow', 'glass', '3d']
    }
  },
  htmlContent: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dom Cavalcanti Barbershop</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    body {
      background-color: #0b0d13;
      color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5;
      padding-bottom: 60px;
    }
    .container {
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      padding: 0 16px;
    }
    /* Hero Banner */
    .hero-section {
      position: relative;
      width: 100%;
      border-radius: 0 0 28px 28px;
      overflow: hidden;
      background: #141824;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .hero-img-wrapper {
      position: relative;
      width: 100%;
      height: 290px;
      overflow: hidden;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(11,13,19,0.1) 0%, rgba(11,13,19,0.95) 100%);
    }
    .hero-content {
      position: relative;
      margin-top: -60px;
      padding: 0 20px 24px;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid rgba(212, 175, 55, 0.35);
      color: #d4af37;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    h1.brand-title {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
      line-height: 1.2;
      margin-bottom: 8px;
    }
    p.tagline-text {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
      max-width: 90%;
      margin: 0 auto;
    }

    /* Action Buttons (CTAs) */
    .cta-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0 28px;
    }
    .btn-whatsapp {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 15px 20px;
      border-radius: 16px;
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: #ffffff;
      font-size: 15px;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-whatsapp:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(37, 211, 102, 0.4);
    }
    .btn-instagram {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 13px 20px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-instagram:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Section Titles */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 26px 0 14px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 18px;
      border-radius: 4px;
      background: #d4af37;
    }

    /* Services Cards */
    .services-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .service-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: border-color 0.2s ease;
    }
    .service-card:hover {
      border-color: rgba(212, 175, 55, 0.3);
    }
    .service-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .service-name {
      font-size: 14px;
      font-weight: 700;
      color: #f8fafc;
    }
    .service-price {
      font-size: 15px;
      font-weight: 800;
      color: #d4af37;
      font-variant-numeric: tabular-nums;
      flex-shrink: 0;
    }
    .service-desc {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.4;
    }

    /* Gallery Grid */
    .gallery-grid {
      display: grid;
      grid-template-cols: repeat(2, 1fr);
      gap: 10px;
    }
    .gallery-item {
      position: relative;
      height: 140px;
      border-radius: 14px;
      overflow: hidden;
      background: #141824;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .gallery-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 6px 8px;
      background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%);
      font-size: 11px;
      font-weight: 600;
      color: #ffffff;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    /* Location & Info Card */
    .info-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 16px;
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .info-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: #cbd5e1;
    }
    .info-icon {
      flex-shrink: 0;
      color: #d4af37;
      margin-top: 2px;
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 36px;
      font-size: 11px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- 1. Hero -->
    <header class="hero-section">
      <div class="hero-img-wrapper">
        <img
          data-bio-image="hero_image"
          class="hero-img"
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80"
          alt="Barbearia Dom Cavalcanti"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <div class="badge">✦ Experiência Premium</div>
        <h1 class="brand-title" data-bio-text="brand_name">Dom Cavalcanti Barbershop</h1>
        <p class="tagline-text" data-bio-text="tagline">
          A verdadeira experiência do corte clássico com atendimento de excelência. Agende seu horário e sinta a diferença.
        </p>
      </div>
    </header>

    <!-- 2. Primary CTAs -->
    <div class="cta-container">
      <a
        data-bio-link="whatsapp"
        href="https://wa.me/5534999998877"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-whatsapp"
      >
        <!-- WhatsApp Official SVG -->
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.004.577 1.764.79 2.806.79 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.938l-1.664 6.076 6.223-1.632c1.701.928 3.655 1.458 5.733 1.458 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>AGENDAR PELO WHATSAPP</span>
      </a>

      <a
        data-bio-link="instagram"
        href="https://instagram.com/domcavalcantibarber"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-instagram"
      >
        <!-- Instagram Official SVG -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span>Seguir no Instagram</span>
      </a>
    </div>

    <!-- 3. Services -->
    <section>
      <div class="section-header">
        <h2 class="section-title">Nossos Serviços</h2>
      </div>

      <div class="services-list" data-bio-services="services">
        <div class="service-card">
          <div class="service-top">
            <span class="service-name" data-bio-service-name>Corte Clássico & Fade</span>
            <span class="service-price" data-bio-service-price>R$ 60</span>
          </div>
          <p class="service-desc" data-bio-service-description>Lavagem especial, corte na tesoura e máquina com finalização pomada premium.</p>
        </div>

        <div class="service-card">
          <div class="service-top">
            <span class="service-name" data-bio-service-name>Barboterapia Tradicional</span>
            <span class="service-price" data-bio-service-price>R$ 50</span>
          </div>
          <p class="service-desc" data-bio-service-description>Toalha quente, óleos essenciais, massagem facial e navalha afiada.</p>
        </div>

        <div class="service-card">
          <div class="service-top">
            <span class="service-name" data-bio-service-name>Combo Cabelo + Barba</span>
            <span class="service-price" data-bio-service-price>R$ 95</span>
          </div>
          <p class="service-desc" data-bio-service-description>Experiência completa com direito a cerveja gelada ou café expresso.</p>
        </div>
      </div>
    </section>

    <!-- 4. Gallery -->
    <section>
      <div class="section-header">
        <h2 class="section-title">Galeria de Cortes</h2>
      </div>

      <div class="gallery-grid" data-bio-gallery="gallery">
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80" alt="Corte" />
          <span class="gallery-caption" data-bio-gallery-caption>Corte Pompadour Clássico</span>
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80" alt="Barba" />
          <span class="gallery-caption" data-bio-gallery-caption>Barboterapia com Navalha</span>
        </div>
      </div>
    </section>

    <!-- 5. Location & Hours -->
    <section>
      <div class="info-card">
        <div class="info-row">
          <svg class="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span data-bio-text="address">Av. Rondon Pacheco, 1420 - Centro, Uberlândia - MG</span>
        </div>

        <div class="info-row">
          <svg class="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span data-bio-text="hours">Segunda a Sábado das 09:00 às 20:00</span>
        </div>
      </div>
    </section>

    <!-- 6. Footer -->
    <footer class="footer">
      <p>© Dom Cavalcanti Barbershop. Todos os direitos reservados.</p>
    </footer>
  </div>
</body>
</html>`
};
