import {
  DesignId,
  DesignMeta,
  BioProjectData,
  BioDesignConfig,
  HeroVariant,
  ContentVariant,
  GalleryVariant,
  CtaVariant,
  ContactVariant
} from '../types/designs';
import { ProjectData } from '../types';

export const DESIGNS_LIST: DesignMeta[] = [
  {
    id: '01-cinematic',
    number: '01',
    name: 'CINEMATIC',
    subtitle: 'Impactante, fotografia widescreen, profundidade e atmosfera',
    description: 'Composição de tela ampla inspirada em cinema, com iluminação de estúdio, tipografia marcante, foco em imagem protagonista e conversão magnética.',
    badge: 'CINEMATOGRÁFICO',
    previewImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    palettes: [
      {
        id: 'cine-noir',
        name: 'Onyx & Âmbar Cinema',
        primary: '#F59E0B',
        secondary: '#B45309',
        accent: '#D97706',
        background: '#07080D',
        surface: '#0E111A',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
        cardBg: 'rgba(17, 20, 32, 0.75)',
        border: 'rgba(255, 255, 255, 0.12)',
        glow: 'rgba(245, 158, 11, 0.35)'
      },
      {
        id: 'cine-cobalt',
        name: 'Azul Meia-Noite & Platina',
        primary: '#38BDF8',
        secondary: '#0284C7',
        accent: '#0EA5E9',
        background: '#050814',
        surface: '#0A1024',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        cardBg: 'rgba(10, 16, 36, 0.8)',
        border: 'rgba(56, 189, 248, 0.2)',
        glow: 'rgba(14, 165, 233, 0.35)'
      },
      {
        id: 'cine-emerald',
        name: 'Esmeralda Nobre & Cromo',
        primary: '#10B981',
        secondary: '#047857',
        accent: '#059669',
        background: '#040C08',
        surface: '#081710',
        text: '#F0FDF4',
        textMuted: '#86EFAC',
        cardBg: 'rgba(8, 23, 16, 0.8)',
        border: 'rgba(16, 185, 129, 0.2)',
        glow: 'rgba(16, 185, 129, 0.35)'
      },
      {
        id: 'cine-crimson',
        name: 'Rubi Intenso & Grafite',
        primary: '#EF4444',
        secondary: '#991B1B',
        accent: '#DC2626',
        background: '#0B0506',
        surface: '#180B0D',
        text: '#FFF1F2',
        textMuted: '#FDA4AF',
        cardBg: 'rgba(24, 11, 13, 0.8)',
        border: 'rgba(239, 68, 68, 0.2)',
        glow: 'rgba(239, 68, 68, 0.35)'
      }
    ],
    typographies: [
      {
        id: 'cine-typo-syne',
        name: 'Syne (Display) + Plus Jakarta Sans',
        headingFont: "'Syne', sans-serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        fontCategory: 'BOLD'
      },
      {
        id: 'cine-typo-clash',
        name: 'Clash Display + Inter',
        headingFont: "'Clash Display', sans-serif",
        bodyFont: "'Inter', sans-serif",
        fontCategory: 'MODERNA'
      },
      {
        id: 'cine-typo-cinzel',
        name: 'Cinzel + Satoshi',
        headingFont: "'Cinzel', serif",
        bodyFont: "'Satoshi', sans-serif",
        fontCategory: 'ELEGANTE'
      }
    ],
    heroVariants: [
      { id: 'A', name: 'Widescreen com Degradê Escuro', description: 'Foto de fundo cinematográfica com fade suave para o conteúdo e logo proeminente' },
      { id: 'B', name: 'Foto Recortada em Alto Relevo', description: 'Foto profissional destacada à frente de iluminação circular de estúdio' },
      { id: 'C', name: 'Tipografia Dramática em Destaque', description: 'Headline imponente em primeiro plano com imagem com efeito vignette' },
      { id: 'D', name: 'Banner Estilo Pôster de Filme', description: 'Composição de capa de cinema com badges e credenciais na base' }
    ],
    contentVariants: [
      { id: 'A', name: 'Cards Cinematográficos Largos', description: 'Cards horizontais com textura dark, borda iluminada e botão direto' },
      { id: 'B', name: 'Lista Editorial Iluminada', description: 'Lista minimalista com numeração discreta e linhas divisórias iluminadas' },
      { id: 'C', name: 'Mosaico de Destaques Visuais', description: 'Cards com proporções dinâmicas alternadas para impacto visual' }
    ],
    galleryVariants: [
      { id: 'A', name: 'Carrossel Automático Silky', description: 'Deslize contínuo de fotos widescreen com indicadores de cinema' },
      { id: 'B', name: 'Grade de Cartazes Verticais', description: 'Fotos 3:4 estilo pôster com legendas sutis e zoom ao tocar' },
      { id: 'C', name: 'Carrossel Horizontal Livre', description: 'Fila de fotos com scroll horizontal suave e prévia do próximo item' },
      { id: 'D', name: 'Foto Protagonista + Mosaico', description: 'Uma imagem principal ampla seguida por miniaturas selecionadas' }
    ],
    ctaVariants: [
      { id: 'A', name: 'Barra Dourada Widescreen', description: 'Botão largo de alta conversão com brilho pulsante e ícone WhatsApp' },
      { id: 'B', name: 'Card de Agendamento Exclusivo', description: 'Bloco de convite com texto de acolhimento e ação imediata' },
      { id: 'C', name: 'Duplo Botão Estratégico', description: 'WhatsApp prioritário ao lado de link para Catálogo/Serviços' }
    ],
    contactVariants: [
      { id: 'A', name: 'Painel Integrado com Horários', description: 'Endereço, status de atendimento e botão de rota em harmonia' },
      { id: 'B', name: 'Módulo Direto WhatsApp + Redes', description: 'Foco exclusivo em conversa rápida e perfil do Instagram' },
      { id: 'C', name: 'Rodapé Completo com Avaliações Google', description: 'Selo de 5 estrelas do Google com link direto para avaliação' }
    ],
    demoData: {
      brandName: 'Titan Barber & Lounge',
      segment: 'Barbearia & Estética Masculina',
      logoUrl: '',
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      heroImageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
      headline: 'A EXPERIÊNCIA DEFINITIVA DO CORTE AO NAVALHADO',
      subtitle: 'Técnicas clássicas combinadas à precisão contemporânea para quem não abre mão da excelência.',
      about: 'Fundado para homens que valorizam seu tempo e imagem. Ambiente privativo com barbearia clássica, toalha quente, navalha afiada e bebidas selecionadas.',
      itemsTitle: 'Serviços de Assinatura',
      items: [
        {
          id: 'item-1',
          title: 'Corte Tradicional com Visagismo',
          description: 'Diagnóstico do formato facial, corte personalizado à tesoura e máquina, finalização com pomada importada.',
          photoUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
          price: 'R$ 85',
          priceEnabled: false,
          featured: true,
          tag: 'MAIS PEDIDO'
        },
        {
          id: 'item-2',
          title: 'Barboterapia com Toalha Quente',
          description: 'Amolecimento com óleos essenciais, massagem facial, lâmina descartável e hidratação calmante pós-barba.',
          photoUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
          price: 'R$ 65',
          priceEnabled: false
        },
        {
          id: 'item-3',
          title: 'Combo Titan Completo (Cabelo + Barba)',
          description: 'Experiência completa com lavagem especial, corte com visagismo, barboterapia e bebida cortesia.',
          photoUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
          price: 'R$ 130',
          priceEnabled: false,
          featured: true,
          tag: 'EXPERIÊNCIA VIP'
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80', caption: 'Lounge e atendimento', alt: 'Lounge', position: 0 },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80', caption: 'Corte clássico e acabamento', alt: 'Corte', position: 1 },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80', caption: 'Barba com toalha aquecida', alt: 'Barboterapia', position: 2 }
      ],
      whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar um horário na Titan Barber.', label: 'Agendar pelo WhatsApp' },
      instagram: { enabled: true, username: 'titanbarber.oficial', url: 'https://instagram.com' },
      tiktok: { enabled: false, username: '', url: '' },
      facebook: { enabled: false, url: '' },
      google: { enabled: true, url: 'https://google.com' },
      googleReview: { enabled: true, url: 'https://google.com', rating: 5.0, count: 184, title: 'Avaliações de Clientes' },
      googleMaps: { enabled: true, url: 'https://maps.google.com' },
      location: {
        address: 'Rua Oscar Freire, 1420',
        city: 'Jardins, São Paulo - SP',
        phone: '(11) 3456-7890',
        hours: 'Seg a Sáb: 09:00 às 20:00',
        mapsUrl: 'https://maps.google.com'
      },
      hours: 'Segunda a Sábado das 09:00 às 20:00',
      badge: 'EXPERIÊNCIA EXCLUSIVA',
      quote: 'Excelência não é um ato, mas um hábito de precisão.'
    }
  },

  {
    id: '02-personal-brand',
    number: '02',
    name: 'PERSONAL BRAND',
    subtitle: 'Pessoa protagonista, autoridade imediata, logo autoral e credibilidade',
    description: 'Projetado para médicos, advogados, consultores, mentores e profissionais liberais. A sua imagem e autoridade no centro absoluto da página com conexão humana instantânea.',
    badge: 'AUTORIDADE PESSOAL',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    palettes: [
      {
        id: 'pb-navy-gold',
        name: 'Azul Soberano & Ouro Nobre',
        primary: '#D97706',
        secondary: '#1E3A8A',
        accent: '#F59E0B',
        background: '#0B0F19',
        surface: '#111827',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
        cardBg: 'rgba(17, 24, 39, 0.85)',
        border: 'rgba(217, 119, 6, 0.25)',
        glow: 'rgba(217, 119, 6, 0.3)'
      },
      {
        id: 'pb-charcoal-cream',
        name: 'Grafite Nobre & Champanhe',
        primary: '#E2E8F0',
        secondary: '#475569',
        accent: '#CBD5E1',
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        cardBg: 'rgba(30, 41, 59, 0.8)',
        border: 'rgba(255, 255, 255, 0.1)',
        glow: 'rgba(226, 232, 240, 0.2)'
      },
      {
        id: 'pb-forest-linen',
        name: 'Verde Floresta & Nude',
        primary: '#10B981',
        secondary: '#064E3B',
        accent: '#34D399',
        background: '#03140C',
        surface: '#0A2518',
        text: '#F0FDF4',
        textMuted: '#A7F3D0',
        cardBg: 'rgba(10, 37, 24, 0.85)',
        border: 'rgba(16, 185, 129, 0.25)',
        glow: 'rgba(16, 185, 129, 0.3)'
      },
      {
        id: 'pb-wine-silk',
        name: 'Vinho Borgonha & Pérola',
        primary: '#FB7185',
        secondary: '#881337',
        accent: '#F43F5E',
        background: '#14050A',
        surface: '#240A14',
        text: '#FFF1F2',
        textMuted: '#FECDD3',
        cardBg: 'rgba(36, 10, 20, 0.85)',
        border: 'rgba(251, 113, 133, 0.25)',
        glow: 'rgba(251, 113, 133, 0.3)'
      }
    ],
    typographies: [
      {
        id: 'pb-typo-cormorant',
        name: 'Cormorant Garamond (Elegante) + Satoshi',
        headingFont: "'Cormorant Garamond', serif",
        bodyFont: "'Satoshi', sans-serif",
        fontCategory: 'ELEGANTE'
      },
      {
        id: 'pb-typo-playfair',
        name: 'Playfair Display + Plus Jakarta Sans',
        headingFont: "'Playfair Display', serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        fontCategory: 'EDITORIAL'
      },
      {
        id: 'pb-typo-syne',
        name: 'Syne + Inter',
        headingFont: "'Syne', sans-serif",
        bodyFont: "'Inter', sans-serif",
        fontCategory: 'BOLD'
      }
    ],
    heroVariants: [
      { id: 'A', name: 'Foto Profissional Sobreposta', description: 'Foto PNG da pessoa em meio corpo à frente com aura suave e tipografia nobre' },
      { id: 'B', name: 'Composição Dividida (Split Foto + Bio)', description: 'Retrato do profissional de um lado e credenciais de autoridade do outro' },
      { id: 'C', name: 'Manifesto de Autoridade & Citação', description: 'Assinatura pessoal com frase de impacto e foto em formato retrato elegante' },
      { id: 'D', name: 'Card Executivo com Badges de Confiança', description: 'Foto em destaque com registro profissional (CRM, OAB, etc.) e anos de atuação' }
    ],
    contentVariants: [
      { id: 'A', name: 'Áreas de Atuação com Ícones Nobres', description: 'Blocos refinados com descrição clara de como o profissional resolve o problema' },
      { id: 'B', name: 'Trajetória & Soluções Exclusivas', description: 'Sequência cronológica de autoridade com serviços consultivos' },
      { id: 'C', name: 'Cards com Badges e Chamada Direta', description: 'Cards estruturados com foco na transformação do cliente' }
    ],
    galleryVariants: [
      { id: 'A', name: 'Retratos de Atuação & Consultório', description: 'Galeria em formato portrait com foco no ambiente e momentos profissionais' },
      { id: 'B', name: 'Carrossel Editorial Silky', description: 'Fotos com enquadramento refinado deslizando com suavidade' },
      { id: 'C', name: 'Fotos Antes/Depois ou Casos de Sucesso', description: 'Imagens lado a lado destacando resultados e transformações' },
      { id: 'D', name: 'Mosaico de Momentos e Palestras', description: 'Grid assimétrico demonstrando autoridade de palco e consultoria' }
    ],
    ctaVariants: [
      { id: 'A', name: 'Agendamento com a Equipe Direta', description: 'Botão elegante de consulta via WhatsApp com mensagem personalizada' },
      { id: 'B', name: 'Convite para Avaliação Confidencial', description: 'Card discreto com garantia de sigilo e agilidade no retorno' },
      { id: 'C', name: 'Link Duplo (WhatsApp + Instagram)', description: 'Dois canais prioritários para contato direto ou seguir no Instagram' }
    ],
    contactVariants: [
      { id: 'A', name: 'Consultório & Atendimento Online', description: 'Detalhes de localização física e disponibilidade de consultas por telemedicina/remotas' },
      { id: 'B', name: 'Endereço Nobre com Mapa', description: 'Localização com link interativo do Google Maps e horários' },
      { id: 'C', name: 'Contato Direto Sem Fricção', description: 'Apenas WhatsApp e canais essenciais para máxima resposta' }
    ],
    demoData: {
      brandName: 'Dra. Camila Menezes',
      segment: 'Medicina & Dermatologia Integrativa',
      logoUrl: '',
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      heroImageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      headline: 'CUIDADO MÉDICO QUE ELEVA SUA NATURALIDADE',
      subtitle: 'Tratamentos dermatológicos avançados e rejuvenescimento com olhar artístico e respeito à sua essência.',
      about: 'Médica especialista pela Sociedade Brasileira de Dermatologia. Mais de 12 anos dedicados ao aperfeiçoamento de protocolos não invasivos e harmonização natural.',
      itemsTitle: 'Procedimentos & Cuidados',
      items: [
        {
          id: 'item-1',
          title: 'Bioestimuladores de Colágeno',
          description: 'Recuperação da firmeza e sustentação tecidual com efeito gradual e duradouro sem alterar os contornos naturais.',
          photoUrl: 'https://images.unsplash.com/photo-1512290900672-1f0236a00dfb?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Consulta',
          priceEnabled: false,
          featured: true,
          tag: 'PROTOCOLO OURO'
        },
        {
          id: 'item-2',
          title: 'Rejuvenescimento a Laser & Peelings',
          description: 'Renovação celular profunda para manchas, textura e luminosidade imediata com tempo mínimo de recuperação.',
          photoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Consulta',
          priceEnabled: false
        },
        {
          id: 'item-3',
          title: 'Consulta Médica Integrada',
          description: 'Mapeamento facial completo em alta resolução e plano de tratamento personalizado para o seu estilo de vida.',
          photoUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Consulta',
          priceEnabled: false,
          featured: true,
          tag: 'PRIMEIRA VEZ'
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', caption: 'Consultório nos Jardins', alt: 'Ambiente', position: 0 },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', caption: 'Tecnologia dermatológica', alt: 'Tecnologia', position: 1 },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', caption: 'Atendimento humanizado', alt: 'Atendimento', position: 2 }
      ],
      whatsapp: { enabled: true, number: '11988888888', message: 'Olá! Gostaria de agendar uma consulta com a Dra. Camila.', label: 'Agendar Consulta Médica' },
      instagram: { enabled: true, username: 'dracamilamenezes', url: 'https://instagram.com' },
      tiktok: { enabled: false, username: '', url: '' },
      facebook: { enabled: false, url: '' },
      google: { enabled: true, url: 'https://google.com' },
      googleReview: { enabled: true, url: 'https://google.com', rating: 5.0, count: 210, title: 'Opinião de Pacientes' },
      googleMaps: { enabled: true, url: 'https://maps.google.com' },
      location: {
        address: 'Av. Brigadeiro Faria Lima, 3477 - Cj. 112',
        city: 'Itaim Bibi, São Paulo - SP',
        phone: '(11) 3088-9000',
        hours: 'Seg a Sex: 08:30 às 19:00',
        mapsUrl: 'https://maps.google.com'
      },
      hours: 'Segunda a Sexta: 08:30 às 19:00',
      badge: 'CRM/SP 148.920 • RQE 62.140',
      quote: 'A verdadeira beleza reside na harmonia que não chama a atenção para o procedimento, mas para você.'
    }
  },

  {
    id: '03-editorial',
    number: '03',
    name: 'EDITORIAL',
    subtitle: 'Visual de revista, tipografia sofisticada, linhas puras e espaço negativo',
    description: 'Inspirado em editoriais internacionais de moda, arquitetura e alta joalheria. Tipografia serif requintada, diagramação arejada e estética de revista de luxo.',
    badge: 'ALTA COSTURA',
    previewImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    palettes: [
      {
        id: 'ed-black-white',
        name: 'Monocromo Editorial & Travertino',
        primary: '#FFFFFF',
        secondary: '#A1A1AA',
        accent: '#E4E4E7',
        background: '#09090B',
        surface: '#121215',
        text: '#FAFAFA',
        textMuted: '#A1A1AA',
        cardBg: 'rgba(18, 18, 21, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)',
        glow: 'rgba(255, 255, 255, 0.15)'
      },
      {
        id: 'ed-cream-wine',
        name: 'Creme Travertino & Vinho Sóbrio',
        primary: '#E2E8F0',
        secondary: '#9F1239',
        accent: '#BE123C',
        background: '#0D0609',
        surface: '#1A0D13',
        text: '#FDF2F8',
        textMuted: '#F472B6',
        cardBg: 'rgba(26, 13, 19, 0.8)',
        border: 'rgba(190, 18, 60, 0.25)',
        glow: 'rgba(190, 18, 60, 0.25)'
      },
      {
        id: 'ed-linen-sand',
        name: 'Linho Italiano & Âmbar Velado',
        primary: '#FBBF24',
        secondary: '#78350F',
        accent: '#D97706',
        background: '#0B0907',
        surface: '#17130F',
        text: '#FEF3C7',
        textMuted: '#D97706',
        cardBg: 'rgba(23, 19, 15, 0.8)',
        border: 'rgba(217, 119, 6, 0.2)',
        glow: 'rgba(245, 158, 11, 0.25)'
      },
      {
        id: 'ed-slate-sage',
        name: 'Sálvia Nórdico & Grafite',
        primary: '#A7F3D0',
        secondary: '#065F46',
        accent: '#34D399',
        background: '#060B08',
        surface: '#0C1711',
        text: '#F0FDF4',
        textMuted: '#6EE7B7',
        cardBg: 'rgba(12, 23, 17, 0.8)',
        border: 'rgba(52, 211, 153, 0.2)',
        glow: 'rgba(52, 211, 153, 0.25)'
      }
    ],
    typographies: [
      {
        id: 'ed-typo-bodoni',
        name: 'Bodoni Moda (Editorial) + Outfit',
        headingFont: "'Bodoni Moda', serif",
        bodyFont: "'Outfit', sans-serif",
        fontCategory: 'EDITORIAL'
      },
      {
        id: 'ed-typo-cormorant',
        name: 'Cormorant Garamond + Plus Jakarta Sans',
        headingFont: "'Cormorant Garamond', serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        fontCategory: 'ELEGANTE'
      },
      {
        id: 'ed-typo-fraunces',
        name: 'Fraunces + DM Sans',
        headingFont: "'Fraunces', serif",
        bodyFont: "'DM Sans', sans-serif",
        fontCategory: 'EDITORIAL'
      }
    ],
    heroVariants: [
      { id: 'A', name: 'Layout Revista com Numeração de Edição', description: 'Título com serif generoso, data ou edição e foto de estúdio com corte clean' },
      { id: 'B', name: 'Espaço Negativo Amplo com Tipografia Pura', description: 'Foco total nas palavras de autoridade com imagem sutil em segundo plano' },
      { id: 'C', name: 'Foto de Capa de Revista Full Bleed', description: 'Imagem ocupando o topo com título em estilo de publicação de alta costura' },
      { id: 'D', name: 'Composição de Galeria com Dois Retratos', description: 'Duas fotos verticais em diálogo com manifesto da marca' }
    ],
    contentVariants: [
      { id: 'A', name: 'Lista Numerada Estilo Capítulo (01, 02, 03)', description: 'Índice de soluções com numeração tipográfica elegante e linhas tênues' },
      { id: 'B', name: 'Colunas de Revista com Linhas Divisórias', description: 'Diagramação em duas colunas com ritmo editorial impecável' },
      { id: 'C', name: 'Blocos com Aspas e Manifestos', description: 'Apresentação com frases de impacto que posicionam a marca no topo' }
    ],
    galleryVariants: [
      { id: 'A', name: 'Lookbook Vertical de Alta Definição', description: 'Fotos com proporção 3:4 e legendas discretas de direção de arte' },
      { id: 'B', name: 'Carrossel Minimalista Silky', description: 'Deslize de fotos sem molduras pesadas com transição de revista' },
      { id: 'C', name: 'Díptico Editorial (Fotos em Par)', description: 'Imagens em pares conceituais lado a lado com zoom ao clicar' },
      { id: 'D', name: 'Mosaico de Detalhes e Texturas', description: 'Foco em detalhes, matérias-primas e acabamento autoral' }
    ],
    ctaVariants: [
      { id: 'A', name: 'Linha Tipográfica com Seta Direta', description: 'Ação discreta e extremamente sofisticada: "Solicitar Atendimento Exclusivo →"' },
      { id: 'B', name: 'Card Travertino com Borda Fina', description: 'Bloco sóbrio com texto de acolhimento e botão minimalista' },
      { id: 'C', name: 'Botão Monocromático de Alto Contraste', description: 'Botão preto e branco sem gradientes chamativos, estilo alta moda' }
    ],
    contactVariants: [
      { id: 'A', name: 'Atelier & Horários com Tipografia Fina', description: 'Endereço e agendamentos com alinhamento refinado e espaçamento' },
      { id: 'B', name: 'Acesso Privativo com WhatsApp Direto', description: 'Conversa direta com o concierge ou equipe de atendimento' },
      { id: 'C', name: 'Rodapé Minimalista de Marca', description: 'Créditos autorais, copyright discreto e redes selecionadas' }
    ],
    demoData: {
      brandName: 'Maison Blanche Atelier',
      segment: 'Alta Moda & Alfaiataria Feminina',
      logoUrl: '',
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      headline: 'A POESIA DA FORMA E O RIGOR DA MATÉRIA-PRIMA',
      subtitle: 'Peças sob medida criadas à mão com sedas italianas, linho puro e cortes que transcendem temporadas.',
      about: 'Fundado em 2018 com o manifesto de desacelerar o consumo e exaltar o fazer manual. Cada criação nasce de um diálogo particular com a cliente em nosso atelier.',
      itemsTitle: 'Criações & Coleção Autoral',
      items: [
        {
          id: 'item-1',
          title: '01. Tailleur em Lã Fria & Seda',
          description: 'Corte anatômico estruturado com entretelas de crina animal e botões de chifre natural feitos à mão.',
          photoUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Medida',
          priceEnabled: false,
          featured: true,
          tag: 'COLEÇÃO ATUAL'
        },
        {
          id: 'item-2',
          title: '02. Vestido Fluido de Crepe de Seda',
          description: 'Drapeado manual esculpido diretamente no manequim com acabamento em bainha de lenço francesa.',
          photoUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Medida',
          priceEnabled: false
        },
        {
          id: 'item-3',
          title: '03. Consulta Privativa no Atelier',
          description: 'Prova de modelagem exclusiva com a estilista, seleção de tecidos e champagne cortesia.',
          photoUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Agendamento',
          priceEnabled: false,
          featured: true,
          tag: 'EXPERIÊNCIA'
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', caption: 'Alfaiataria impecável', alt: 'Tailleur', position: 0 },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80', caption: 'Seda e movimento', alt: 'Vestido', position: 1 },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80', caption: 'Processo manual no atelier', alt: 'Processo', position: 2 }
      ],
      whatsapp: { enabled: true, number: '11977777777', message: 'Olá! Gostaria de consultar horários para atendimento na Maison Blanche.', label: 'Solicitar Atendimento no Atelier' },
      instagram: { enabled: true, username: 'maisonblanche.atelier', url: 'https://instagram.com' },
      tiktok: { enabled: false, username: '', url: '' },
      facebook: { enabled: false, url: '' },
      google: { enabled: false, url: '' },
      googleReview: { enabled: false, url: '', rating: 5.0, count: 48, title: '' },
      googleMaps: { enabled: true, url: 'https://maps.google.com' },
      location: {
        address: 'Alameda Gabriel Monteiro da Silva, 1890',
        city: 'Jardins, São Paulo - SP',
        phone: '(11) 3081-1200',
        hours: 'Terça a Sábado com Hora Marcada',
        mapsUrl: 'https://maps.google.com'
      },
      hours: 'Terça a Sábado com hora marcada',
      badge: 'EDIÇÃO LIMITADA • ANO V',
      quote: 'A elegância não consiste em se fazer notar, mas em se fazer lembrar.'
    }
  },

  {
    id: '04-graphic-bio',
    number: '04',
    name: 'GRAPHIC BIO',
    subtitle: 'Blocos gráficos publicitários, stickers, geometria marcante e alta energia',
    description: 'Composição vibrante de agência de publicidade com blocos modulares, selos visuais em alto contraste, cards arquitetônicos e ação rápida para negócios dinâmicos.',
    badge: 'DIREÇÃO DE ARTE',
    previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    palettes: [
      {
        id: 'gb-amber-electric',
        name: 'Âmbar Eletrizante & Preto Asfalto',
        primary: '#F59E0B',
        secondary: '#D97706',
        accent: '#FBBF24',
        background: '#0B0C10',
        surface: '#151720',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
        cardBg: '#181B26',
        border: 'rgba(245, 158, 11, 0.3)',
        glow: 'rgba(245, 158, 11, 0.4)'
      },
      {
        id: 'gb-flame-carbon',
        name: 'Chama Escarlate & Grafite Urbano',
        primary: '#EF4444',
        secondary: '#B91C1C',
        accent: '#F87171',
        background: '#0A0708',
        surface: '#180F12',
        text: '#FFF1F2',
        textMuted: '#FDA4AF',
        cardBg: '#201217',
        border: 'rgba(239, 68, 68, 0.3)',
        glow: 'rgba(239, 68, 68, 0.4)'
      },
      {
        id: 'gb-lime-industrial',
        name: 'Limão Tóquio & Cinza Chumbo',
        primary: '#84CC16',
        secondary: '#4D7C0F',
        accent: '#A3E635',
        background: '#080C05',
        surface: '#121A0C',
        text: '#F7FEE7',
        textMuted: '#BEF264',
        cardBg: '#182410',
        border: 'rgba(132, 204, 22, 0.3)',
        glow: 'rgba(132, 204, 22, 0.4)'
      },
      {
        id: 'gb-cyan-hyper',
        name: 'Azul Elétrico & Preto Absoluto',
        primary: '#06B6D4',
        secondary: '#0891B2',
        accent: '#22D3EE',
        background: '#04090F',
        surface: '#0A1522',
        text: '#ECFEFF',
        textMuted: '#67E8F9',
        cardBg: '#0F2033',
        border: 'rgba(6, 182, 212, 0.3)',
        glow: 'rgba(6, 182, 212, 0.4)'
      }
    ],
    typographies: [
      {
        id: 'gb-typo-syne',
        name: 'Syne 800 + Plus Jakarta Sans',
        headingFont: "'Syne', sans-serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        fontCategory: 'BOLD'
      },
      {
        id: 'gb-typo-clash',
        name: 'Clash Display + Inter Bold',
        headingFont: "'Clash Display', sans-serif",
        bodyFont: "'Inter', sans-serif",
        fontCategory: 'MODERNA'
      },
      {
        id: 'gb-typo-grotesk',
        name: 'Cabinet Grotesk + Space Grotesk',
        headingFont: "'Cabinet Grotesk', sans-serif",
        bodyFont: "'Space Grotesk', sans-serif",
        fontCategory: 'MODERNA'
      }
    ],
    heroVariants: [
      { id: 'A', name: 'Bloco Gráfico com Stickers e Badges', description: 'Headline impactante em caixa alta com selos de verificação e visual publicitário' },
      { id: 'B', name: 'Foto Recortada com Fundo Geométrico', description: 'Foto em destaque com fundo diagonal e tipografia marcante' },
      { id: 'C', name: 'Aviso de Status "Aberto Agora" no Topo', description: 'Faixa colorida de alto impacto com status em tempo real e CTA' },
      { id: 'D', name: 'Grid Modular com Métricas de Sucesso', description: 'Números expressivos e badges coloridos antes das especialidades' }
    ],
    contentVariants: [
      { id: 'A', name: 'Blocos Gráficos com Acentos de Cor', description: 'Cards geométricos com cantos definidos, borda expressiva e botão de ação direta' },
      { id: 'B', name: 'Grade Compacta de Especialidades', description: 'Duas colunas com ícones destacados e descrições diretas ao ponto' },
      { id: 'C', name: 'Cards com Tag de Destaque "Mais Pedido"', description: 'Destaques com etiquetas coloridas e gatilhos de decisão rápida' }
    ],
    galleryVariants: [
      { id: 'A', name: 'Carrossel Automático com Badges', description: 'Fotos em alta rotação com etiquetas de identificação sobrepostas' },
      { id: 'B', name: 'Grade de Fotos com Molduras Pretas', description: 'Mosaico denso e visual com zoom tátil e alta resolução' },
      { id: 'C', name: 'Scroll Horizontal Dinâmico', description: 'Linha contínua de fotos deslizando lateralmente com facilidade' },
      { id: 'D', name: 'Painel Duplo de Destaques', description: 'Dois grandes blocos visuais alternados com ação' }
    ],
    ctaVariants: [
      { id: 'A', name: 'Mega Botão Publicitário', description: 'Botão largo e imponente com gradiente de alta energia e texto em caixa alta' },
      { id: 'B', name: 'Banner de Promoção ou Cardápio', description: 'Bloco destacado para pedidos imediatos pelo WhatsApp' },
      { id: 'C', name: 'Barra Fixa com Contato Imediato', description: 'Barra limpa com acesso instantâneo ao WhatsApp e Redes' }
    ],
    contactVariants: [
      { id: 'A', name: 'Bloco de Localização com Rota Waze/Maps', description: 'Endereço claro com botão "Como Chegar" e status de funcionamento' },
      { id: 'B', name: 'Cardápio / Delivery via WhatsApp', description: 'Mensagem pronta para fazer pedido sem complicação' },
      { id: 'C', name: 'Painel com Avaliação Google 5 Estrelas', description: 'Prova social forte com selo do Google e avaliações reais' }
    ],
    demoData: {
      brandName: 'Forneria & Pasta Rustica',
      segment: 'Gastronomia & Pizzaria Artesanal',
      logoUrl: '',
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      heroImageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      headline: 'FERMENTAÇÃO NATURAL, FORNO A LENHA E SABOR REAL',
      subtitle: 'Massas abertas à mão, molho de tomates italianos San Marzano e ingredientes de produtores locais.',
      about: 'Uma paixão que começou na Itália e virou referência na cidade. Forno aquecido a 450°C, massa leve que fermenta por 48 horas e atendimento acolhedor.',
      itemsTitle: 'Favoritos da Forneria',
      items: [
        {
          id: 'item-1',
          title: 'Pizza Margherita Verace D.O.P.',
          description: 'Molho de tomate San Marzano, mozzarella de búfala fresca, azeite extravirgem e manjericão fresco da nossa horta.',
          photoUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
          price: 'R$ 72',
          priceEnabled: false,
          featured: true,
          tag: 'CAMPEÃ DE PEDIDOS'
        },
        {
          id: 'item-2',
          title: 'Burrata Cremosa com Focaccia',
          description: 'Burrata artesanal com tomatinhos confitados, pesto de pistache e focaccia crocante assada na hora.',
          photoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d69102a5c?auto=format&fit=crop&w=600&q=80',
          price: 'R$ 58',
          priceEnabled: false
        },
        {
          id: 'item-3',
          title: 'Tiramisù Tradicional da Casa',
          description: 'Biscoitos savoiardi embebidos em café espresso, creme de mascarpone e cacau em pó 70% belga.',
          photoUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
          price: 'R$ 34',
          priceEnabled: false,
          featured: true,
          tag: 'SOBREMESA'
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', caption: 'Forno a lenha napolitano', alt: 'Forno', position: 0 },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80', caption: 'Margherita fresca', alt: 'Pizza', position: 1 },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1592417817098-8f3d69102a5c?auto=format&fit=crop&w=800&q=80', caption: 'Burrata e pesto', alt: 'Burrata', position: 2 }
      ],
      whatsapp: { enabled: true, number: '11966666666', message: 'Olá! Gostaria de fazer um pedido na Forneria Rustica.', label: 'Pedir pelo WhatsApp Agora' },
      instagram: { enabled: true, username: 'forneriarustica.sp', url: 'https://instagram.com' },
      tiktok: { enabled: false, username: '', url: '' },
      facebook: { enabled: false, url: '' },
      google: { enabled: true, url: 'https://google.com' },
      googleReview: { enabled: true, url: 'https://google.com', rating: 4.9, count: 420, title: 'Avaliações no Google' },
      googleMaps: { enabled: true, url: 'https://maps.google.com' },
      location: {
        address: 'Rua dos Pinheiros, 890',
        city: 'Pinheiros, São Paulo - SP',
        phone: '(11) 3210-4455',
        hours: 'Ter a Dom: 18:30 às 23:30',
        mapsUrl: 'https://maps.google.com'
      },
      hours: 'Terça a Domingo das 18:30 às 23:30',
      badge: 'FORNO A LENHA • 48H FERMENTAÇÃO',
      quote: 'Comida de verdade feita com tempo, fogo e respeito.'
    }
  },

  {
    id: '05-luxury',
    number: '05',
    name: 'LUXURY',
    subtitle: 'Elegância aristocrática, serif nobre, detalhes dourados e estética concierge',
    description: 'Criado para clínicas de alto padrão, joalherias, escritórios boutique e marcas de prestígio. Transmite nobreza imediata, valor percebido elevado e exclusividade.',
    badge: 'EXPERIÊNCIA VIP',
    previewImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    palettes: [
      {
        id: 'lux-black-gold',
        name: 'Onyx Nobre & Champanhe Dourado',
        primary: '#E5C07B',
        secondary: '#987333',
        accent: '#F3E0B5',
        background: '#08080A',
        surface: '#111114',
        text: '#FDFBF7',
        textMuted: '#C5BAA5',
        cardBg: 'rgba(17, 17, 20, 0.85)',
        border: 'rgba(229, 192, 123, 0.25)',
        glow: 'rgba(229, 192, 123, 0.3)'
      },
      {
        id: 'lux-wine-rose',
        name: 'Vinho Borgonha & Rosé Champagne',
        primary: '#FDA4AF',
        secondary: '#9F1239',
        accent: '#FECDD3',
        background: '#0F060A',
        surface: '#1C0D14',
        text: '#FFF1F2',
        textMuted: '#FB7185',
        cardBg: 'rgba(28, 13, 20, 0.85)',
        border: 'rgba(253, 164, 175, 0.25)',
        glow: 'rgba(253, 164, 175, 0.3)'
      },
      {
        id: 'lux-navy-silver',
        name: 'Azul Imperial & Platina Espelhada',
        primary: '#E2E8F0',
        secondary: '#1E3A8A',
        accent: '#93C5FD',
        background: '#060A14',
        surface: '#0C1428',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        cardBg: 'rgba(12, 20, 40, 0.85)',
        border: 'rgba(226, 232, 240, 0.2)',
        glow: 'rgba(147, 197, 253, 0.25)'
      },
      {
        id: 'lux-emerald-gold',
        name: 'Esmeralda Nobre & Ouro Imperial',
        primary: '#FCD34D',
        secondary: '#064E3B',
        accent: '#FBBF24',
        background: '#040F0A',
        surface: '#091F15',
        text: '#F0FDF4',
        textMuted: '#6EE7B7',
        cardBg: 'rgba(9, 31, 21, 0.85)',
        border: 'rgba(252, 211, 77, 0.25)',
        glow: 'rgba(252, 211, 77, 0.3)'
      }
    ],
    typographies: [
      {
        id: 'lux-typo-cinzel',
        name: 'Cinzel (Imperial) + Plus Jakarta Sans',
        headingFont: "'Cinzel', serif",
        bodyFont: "'Plus Jakarta Sans', sans-serif",
        fontCategory: 'ELEGANTE'
      },
      {
        id: 'lux-typo-playfair',
        name: 'Playfair Display + Inter',
        headingFont: "'Playfair Display', serif",
        bodyFont: "'Inter', sans-serif",
        fontCategory: 'ELEGANTE'
      },
      {
        id: 'lux-typo-cormorant',
        name: 'Cormorant Garamond + Satoshi',
        headingFont: "'Cormorant Garamond', serif",
        bodyFont: "'Satoshi', sans-serif",
        fontCategory: 'ELEGANTE'
      }
    ],
    heroVariants: [
      { id: 'A', name: 'Brasão Régio com Detalhes em Ouro', description: 'Logo central em alto relevo com tipografia serif imperial e bordas douradas' },
      { id: 'B', name: 'Foto de Estúdio com Moldura Fina', description: 'Retrato ou joia em destaque com iluminação suave e sombras aveludadas' },
      { id: 'C', name: 'Composição Concierge & Atendimento VIP', description: 'Apresentação nobre focada em discrição, atendimento privativo e confiança' },
      { id: 'D', name: 'Manifesto com Ornamento Dourado', description: 'Citação nobre com divisores metálicos sutis e assinatura da casa' }
    ],
    contentVariants: [
      { id: 'A', name: 'Cards Aveludados com Filete de Ouro', description: 'Cards sóbrios com bordas metálicas suaves e tipografia aristocrática' },
      { id: 'B', name: 'Lista Concierge com Numeração Romana (I, II, III)', description: 'Experiências exclusivas com numerais romanos e divisores requintados' },
      { id: 'C', name: 'Mosaico de Alta Joalheria / Procedimentos', description: 'Destaque visual para detalhes com foco em perfeição artesanal' }
    ],
    galleryVariants: [
      { id: 'A', name: 'Carrossel de Ouro & Travertino', description: 'Fotos com enquadramento nobre deslizando com ritmo sutil' },
      { id: 'B', name: 'Mosaico de Detalhes Finos', description: 'Foco na textura, no espaço físico e na excelência do acabamento' },
      { id: 'C', name: 'Díptico Nobre com Zoom Tátil', description: 'Duas imagens de alta resolução lado a lado com transição macia' },
      { id: 'D', name: 'Coleção Privada em Foco', description: 'Galeria seleta com legendas delicadas e foco no valor do serviço' }
    ],
    ctaVariants: [
      { id: 'A', name: 'Convite Concierge VIP', description: 'Botão sofisticado com borda dourada: "Solicitar Reserva Exclusiva"' },
      { id: 'B', name: 'Card Privativo de Agendamento', description: 'Aviso de atendimento estritamente com hora marcada e sigilo' },
      { id: 'C', name: 'Duplo Canal WhatsApp & Telefone', description: 'Opção de mensagem instantânea ou ligação direta para a recepção' }
    ],
    contactVariants: [
      { id: 'A', name: 'Endereço Nobre com Recepção Privativa', description: 'Localização de prestígio com manobrista e orientação de acesso' },
      { id: 'B', name: 'Canal Exclusivo do Concierge', description: 'Atendimento direto para clientes que prezam por discrição' },
      { id: 'C', name: 'Selo de Confiança & Excelência', description: 'Reconhecimentos, certificações e pontuação máxima no Google' }
    ],
    demoData: {
      brandName: 'Aura Glow Clinique & Spa',
      segment: 'Estética Avançada & Bem-Estar VIP',
      logoUrl: '',
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      heroImageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      headline: 'A SUPREMACIA DO CUIDADO EM UM SANTUÁRIO PRIVATIVO',
      subtitle: 'Tratamentos de rejuvenescimento facial e corporal com tecnologia suíça e acolhimento singular.',
      about: 'Instalada em um casarão histórico nos Jardins, a Aura Glow combina medicina integrativa, cosmecêuticos raros e rituais sensoriais sob medida para cada paciente.',
      itemsTitle: 'Rituais & Terapias de Assinatura',
      items: [
        {
          id: 'item-1',
          title: 'I. Ritual Diamante Dourado Facial',
          description: 'Infusão de partículas de ouro coloidal, massagem linfática com cristais de quartzo e hidratação celular profunda.',
          photoUrl: 'https://images.unsplash.com/photo-1512290900672-1f0236a00dfb?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Consulta',
          priceEnabled: false,
          featured: true,
          tag: 'RITUAL OURO'
        },
        {
          id: 'item-2',
          title: 'II. Terapia de Regeneração Celular',
          description: 'Protocolo não invasivo com ultrassom microfocado para estímulo de neocolagênese e firmeza muscular.',
          photoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Consulta',
          priceEnabled: false
        },
        {
          id: 'item-3',
          title: 'III. Day Spa Privativo Signature',
          description: 'Jornada de 4 horas com banho de imersão aromático, massagem sensorial a quatro mãos e degustação especial.',
          photoUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
          price: 'Sob Consulta',
          priceEnabled: false,
          featured: true,
          tag: 'EXCLUSIVO'
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', caption: 'Sala de relaxamento privativa', alt: 'Sala Spa', position: 0 },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1512290900672-1f0236a00dfb?auto=format&fit=crop&w=800&q=80', caption: 'Cosmecêuticos raros', alt: 'Cosméticos', position: 1 },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', caption: 'Atendimento sensorial', alt: 'Atendimento', position: 2 }
      ],
      whatsapp: { enabled: true, number: '11955555555', message: 'Olá! Gostaria de consultar disponibilidade para um atendimento privativo na Aura Glow.', label: 'Solicitar Atendimento Concierge' },
      instagram: { enabled: true, username: 'auraglow.clinique', url: 'https://instagram.com' },
      tiktok: { enabled: false, username: '', url: '' },
      facebook: { enabled: false, url: '' },
      google: { enabled: true, url: 'https://google.com' },
      googleReview: { enabled: true, url: 'https://google.com', rating: 5.0, count: 165, title: 'Reconhecimento dos Clientes' },
      googleMaps: { enabled: true, url: 'https://maps.google.com' },
      location: {
        address: 'Rua Bela Cintra, 2140',
        city: 'Jardins, São Paulo - SP',
        phone: '(11) 3060-7000',
        hours: 'Segunda a Sábado com Hora Marcada',
        mapsUrl: 'https://maps.google.com'
      },
      hours: 'Segunda a Sábado com hora marcada e manobrista',
      badge: 'CONCIERGE DEDICADO • VAGA PRIVATIVA',
      quote: 'O verdadeiro luxo é o tempo dedicado a si mesmo em um refúgio de serenidade.'
    }
  },

  // 06 to 20 definitions for the complete 20 visual systems catalog
  {
    id: '06-minimal',
    number: '06',
    name: 'MINIMAL',
    subtitle: 'Poucos elementos, muito espaço, tipografia protagonista e clareza',
    description: 'Design nórdico ultra limpo onde cada elemento tem propósito estrito. Zero ruído, máxima legibilidade e conversão sem distrações.',
    badge: 'MINIMALISMO',
    previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '07-bento',
    number: '07',
    name: 'BENTO',
    subtitle: 'Composição assimétrica em mosaico, cards inteligentes e modernidade',
    description: 'Inspirado nas interfaces da Apple e Linear com blocos modulares dinâmicos que contam a história do negócio em uma única tela fluida.',
    badge: 'BENTO GRID',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '08-story',
    number: '08',
    name: 'STORY',
    subtitle: 'Storytelling vertical durante o scroll, narrativa envolvente e conexão',
    description: 'Uma jornada visual que conduz o visitante do primeiro impacto até o fechamento via WhatsApp como se lesse uma história marcante.',
    badge: 'STORYTELLING',
    previewImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '09-showcase',
    number: '09',
    name: 'SHOWCASE',
    subtitle: 'Fotos e trabalhos como protagonistas absolutos com zoom imersivo',
    description: 'Ideal para tatuadores, arquitetos, fotógrafos e confeiteiras que vendem pelo impacto visual imediato do que produzem.',
    badge: 'SHOWCASE',
    previewImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '10-bold',
    number: '10',
    name: 'BOLD',
    subtitle: 'Tipografia em caixa alta imponente, cores fortes e composição ousada',
    description: 'Comunicação direta, enérgica e sem rodeios para marcas com personalidade forte e presença que não passa despercebida.',
    badge: 'TIPOGRAFIA BOLD',
    previewImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '11-glass',
    number: '11',
    name: 'GLASS',
    subtitle: 'Glassmorphism sofisticado, profundidade, reflexos e translucidez',
    description: 'Painéis translúcidos foscos sobre fundos com aura luminescente que criam uma sensação tridimensional de modernidade.',
    badge: 'GLASSMORPHISM',
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '12-social-profile',
    number: '12',
    name: 'SOCIAL PROFILE',
    subtitle: 'Perfil digital premium expansivo, autoral e longe do padrão genérico',
    description: 'A resposta definitiva aos links de bio simplistas: uma central de relacionamento completa com autoridade, fotos e contato.',
    badge: 'SOCIAL HUB',
    previewImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '13-full-photo',
    number: '13',
    name: 'FULL PHOTO',
    subtitle: 'Fotografia full bleed imersiva e conteúdo organicamente integrado',
    description: 'A tela inteira se transforma em uma imagem de alta definição com sobreposições suaves para negócios altamente visuais.',
    badge: 'FULL BLEED',
    previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '14-split',
    number: '14',
    name: 'SPLIT',
    subtitle: 'Composição dividida com harmonia perfeita entre imagem e conteúdo',
    description: 'Equilíbrio visual geométrico que guia o olho do visitante entre a presença visual da marca e suas soluções imediatas.',
    badge: 'SPLIT SCREEN',
    previewImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '15-poster',
    number: '15',
    name: 'POSTER',
    subtitle: 'Cara de campanha e cartaz publicitário com energia urbana',
    description: 'Estilo inspirado em cartazes de festivais e campanhas de moda streetwear com tipografia de impacto e atitude.',
    badge: 'POSTER',
    previewImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '16-magazine',
    number: '16',
    name: 'MAGAZINE',
    subtitle: 'Composição de publicação impressa, colunas e ritmo cultural',
    description: 'Visual requintado de crônica e ensaio para quem deseja transmitir conhecimento, curadoria e respeito pelo ofício.',
    badge: 'PUBLICAÇÃO',
    previewImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '17-corporate',
    number: '17',
    name: 'CORPORATE',
    subtitle: 'Autoridade executiva, pilares de atuação, segurança e alta credibilidade',
    description: 'Construído para sociedades de advogados, holdings, contabilidades e consultorias com métricas e certificações claras.',
    badge: 'CORPORATIVO',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '18-local-business',
    number: '18',
    name: 'LOCAL BUSINESS',
    subtitle: 'Horários em tempo real, localização, avaliações Google e rota rápida',
    description: 'Projetado para negócios de bairro e comércio local onde o cliente precisa saber se está aberto e como chegar agora.',
    badge: 'NEGÓCIO LOCAL',
    previewImage: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '19-portfolio',
    number: '19',
    name: 'PORTFOLIO',
    subtitle: 'Estudos de caso, projetos detalhados e galeria técnica organizada',
    description: 'Apresentação profissional orientada a demonstrar processos, resultados comprovados e portfólio de excelência.',
    badge: 'PORTFÓLIO',
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  },
  {
    id: '20-signature',
    number: '20',
    name: 'SIGNATURE',
    subtitle: 'Experimental, assimétrico, transições fluídas e direção autoral',
    description: 'Design de vanguarda que foge de todas as convenções pré-estabelecidas com estética única criada para impressionar.',
    badge: 'ASSINATURA',
    previewImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    palettes: [], typographies: [], heroVariants: [], contentVariants: [], galleryVariants: [], ctaVariants: [], contactVariants: [], demoData: {} as any
  }
];

export const getDesignById = (id: string): DesignMeta => {
  const found = DESIGNS_LIST.find((d) => d.id === id);
  if (found) return found;
  // Fallback to 01-cinematic
  return DESIGNS_LIST[0];
};

/**
 * 🎲 MISTURAR DESIGN (Pure JavaScript, NO AI)
 * Sorteia aleatoriamente variações COMPATÍVEIS de:
 * Hero, Conteúdo, Galeria, CTA, Contato, Paleta e Tipografia
 * DENTRO do design selecionado.
 * NÃO altera dados do cliente!
 */
export const shuffleDesignConfig = (
  designId: DesignId,
  currentConfig?: Partial<BioDesignConfig>
): BioDesignConfig => {
  const meta = getDesignById(designId);

  const heroOptions: HeroVariant[] = meta.heroVariants.length > 0 ? meta.heroVariants.map((h) => h.id) : ['A', 'B', 'C', 'D'];
  const contentOptions: ContentVariant[] = meta.contentVariants.length > 0 ? meta.contentVariants.map((c) => c.id) : ['A', 'B', 'C'];
  const galleryOptions: GalleryVariant[] = meta.galleryVariants.length > 0 ? meta.galleryVariants.map((g) => g.id) : ['A', 'B', 'C', 'D'];
  const ctaOptions: CtaVariant[] = meta.ctaVariants.length > 0 ? meta.ctaVariants.map((cta) => cta.id) : ['A', 'B', 'C'];
  const contactOptions: ContactVariant[] = meta.contactVariants.length > 0 ? meta.contactVariants.map((ct) => ct.id) : ['A', 'B', 'C'];

  const palettes = meta.palettes.length > 0 ? meta.palettes : getDesignById('01-cinematic').palettes;
  const typographies = meta.typographies.length > 0 ? meta.typographies : getDesignById('01-cinematic').typographies;

  // Helper to pick a random item different from current if possible
  const pickRandom = <T>(array: T[], currentVal?: T): T => {
    if (array.length === 0) return '' as unknown as T;
    if (array.length === 1) return array[0];
    const filtered = array.filter((item) => item !== currentVal);
    const pool = filtered.length > 0 ? filtered : array;
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
  };

  const newHero = pickRandom(heroOptions, currentConfig?.heroVariant);
  const newContent = pickRandom(contentOptions, currentConfig?.contentVariant);
  const newGallery = pickRandom(galleryOptions, currentConfig?.galleryVariant);
  const newCta = pickRandom(ctaOptions, currentConfig?.ctaVariant);
  const newContact = pickRandom(contactOptions, currentConfig?.contactVariant);

  const newPalette = pickRandom(palettes.map((p) => p.id), currentConfig?.paletteId);
  const newTypography = pickRandom(typographies.map((t) => t.id), currentConfig?.typographyId);

  return {
    designId,
    heroVariant: newHero,
    contentVariant: newContent,
    galleryVariant: newGallery,
    ctaVariant: newCta,
    contactVariant: newContact,
    paletteId: newPalette,
    typographyId: newTypography,
    motionLevel: currentConfig?.motionLevel || 'cinematic'
  };
};

/**
 * Normaliza um ProjectData para garantir a coexistência perfeita de:
 * projectData (dados do cliente) e designConfig (aparência)
 * Mantendo 100% de compatibilidade com projetos legados salvos!
 */
export const normalizeProjectDataAndConfig = (
  project: ProjectData
): { projectData: BioProjectData; designConfig: BioDesignConfig } => {
  // Determine if designConfig already exists
  let designId: DesignId = (project.designConfig?.designId || project.templateId || '01-cinematic') as DesignId;
  const validIds: DesignId[] = [
    '01-cinematic', '02-personal-brand', '03-editorial', '04-graphic-bio', '05-luxury',
    '06-minimal', '07-bento', '08-story', '09-showcase', '10-bold',
    '11-glass', '12-social-profile', '13-full-photo', '14-split', '15-poster',
    '16-magazine', '17-corporate', '18-local-business', '19-portfolio', '20-signature'
  ];

  if (!validIds.includes(designId)) {
    // Map legacy layouts if possible
    if (project.layout === 'editorial' || project.layout === 'magazine') designId = '03-editorial';
    else if (project.layout === 'graphic-bio' || project.layout === 'food-park-blocks') designId = '04-graphic-bio';
    else if (project.layout === 'cinematic' || project.layout === 'cinematic-luxury') designId = '01-cinematic';
    else if (project.layout === 'authority' || project.layout === 'profile') designId = '02-personal-brand';
    else if (project.layout === 'signature' || project.layout === 'glass-premium') designId = '05-luxury';
    else designId = '01-cinematic';
  }

  const meta = getDesignById(designId);

  const designConfig: BioDesignConfig = {
    designId,
    heroVariant: project.designConfig?.heroVariant || 'A',
    contentVariant: project.designConfig?.contentVariant || 'A',
    galleryVariant: project.designConfig?.galleryVariant || 'A',
    ctaVariant: project.designConfig?.ctaVariant || 'A',
    contactVariant: project.designConfig?.contactVariant || 'A',
    paletteId: project.designConfig?.paletteId || (meta.palettes[0]?.id || 'cine-noir'),
    typographyId: project.designConfig?.typographyId || (meta.typographies[0]?.id || 'cine-typo-syne'),
    motionLevel: project.designConfig?.motionLevel || 'cinematic'
  };

  // Convert project data
  const projectData: BioProjectData = {
    brandName: project.projectData?.brandName || project.identity?.name || project.nome || 'Meu Biosite',
    segment: project.projectData?.segment || 'Profissional & Negócio Local',
    logoUrl: project.projectData?.logoUrl || project.identity?.logoUrl || '',
    professionalPhotoUrl: project.projectData?.professionalPhotoUrl || project.identity?.professionalPhotoUrl || project.professionalPhotoUrl || project.identity?.avatarUrl || '',
    heroImageUrl: project.projectData?.heroImageUrl || project.identity?.heroImageUrl || project.heroImageUrl || project.identity?.bannerUrl || '',
    headline: project.projectData?.headline || project.identity?.headline || project.identity?.slogan || '',
    subtitle: project.projectData?.subtitle || project.identity?.subtitle || '',
    about: project.projectData?.about || project.identity?.about || project.identity?.description || '',
    itemsTitle: project.projectData?.itemsTitle || project.itemsTitle || 'Serviços & Especialidades',
    items: project.projectData?.items || (project.services || []).map((s) => ({
      id: s.id,
      title: s.name,
      description: s.description,
      photoUrl: s.imageUrl,
      price: s.price || '',
      priceEnabled: s.priceEnabled || false,
      featured: s.featured,
      tag: s.tag
    })),
    gallery: project.projectData?.gallery || project.photos || [],
    whatsapp: {
      enabled: project.projectData?.whatsapp?.enabled ?? project.whatsappConfig?.enabled ?? project.socials?.whatsapp?.enabled ?? true,
      number: project.projectData?.whatsapp?.number || project.whatsappConfig?.number || project.socials?.whatsapp?.number || '',
      message: project.projectData?.whatsapp?.message || project.whatsappConfig?.message || project.socials?.whatsapp?.message || 'Olá! Gostaria de mais informações.',
      label: project.projectData?.whatsapp?.label || project.whatsappConfig?.label || project.socials?.whatsapp?.label || 'Falar no WhatsApp'
    },
    instagram: {
      enabled: project.projectData?.instagram?.enabled ?? project.socials?.instagram?.enabled ?? true,
      username: project.projectData?.instagram?.username || project.socials?.instagram?.username || '',
      url: project.projectData?.instagram?.url || project.socials?.instagram?.url || ''
    },
    tiktok: {
      enabled: project.projectData?.tiktok?.enabled ?? project.socials?.tiktok?.enabled ?? false,
      username: project.projectData?.tiktok?.username || project.socials?.tiktok?.username || '',
      url: project.projectData?.tiktok?.url || project.socials?.tiktok?.url || ''
    },
    facebook: {
      enabled: project.projectData?.facebook?.enabled ?? project.socials?.facebook?.enabled ?? false,
      url: project.projectData?.facebook?.url || project.socials?.facebook?.url || ''
    },
    google: {
      enabled: project.projectData?.google?.enabled ?? project.socials?.google?.enabled ?? false,
      url: project.projectData?.google?.url || project.socials?.google?.url || ''
    },
    googleReview: {
      enabled: project.projectData?.googleReview?.enabled ?? project.googleReviewConfig?.enabled ?? false,
      url: project.projectData?.googleReview?.url || project.googleReviewConfig?.url || '',
      rating: project.projectData?.googleReview?.rating || project.googleReviewConfig?.rating || 5.0,
      count: project.projectData?.googleReview?.count || project.googleReviewConfig?.reviewCount || 120,
      title: project.projectData?.googleReview?.title || project.googleReviewConfig?.title || 'Avaliações de Clientes'
    },
    googleMaps: {
      enabled: Boolean(project.location?.mapsUrl),
      url: project.location?.mapsUrl || ''
    },
    location: {
      address: project.projectData?.location?.address || project.location?.address || '',
      city: project.projectData?.location?.city || project.location?.city || '',
      phone: project.projectData?.location?.phone || project.location?.phone || '',
      hours: project.projectData?.location?.hours || project.location?.hours || '',
      mapsUrl: project.projectData?.location?.mapsUrl || project.location?.mapsUrl || ''
    },
    hours: project.projectData?.hours || project.location?.hours || '',
    badge: project.projectData?.badge || project.identity?.badge || '',
    quote: project.projectData?.quote || project.identity?.quote || ''
  };

  return { projectData, designConfig };
};
