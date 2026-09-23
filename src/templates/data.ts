import { NichoInfo, NichoId, TemplateDefinition, ProjectData, TemplateLayout, GalleryStyle, FontCategory, SocialIconStyle, ServiceLayoutStyle } from '../types';

export const NICHOS_LIST: NichoInfo[] = [
  {
    id: '01-barbearia',
    number: '01',
    name: 'Barbearia',
    subtitle: 'Cortes clássicos, navalha e barba de alto padrão',
    description: 'Preto nobre, ouro escovado e aço laminado. Visual cinematográfico para barbearias tradicionais e lounges contemporâneos.',
    iconName: 'scissors',
    vibe: 'Preto + Dourado + Aço • Luz Cinematográfica',
    accentColor: '#D97706',
    secondaryColor: '#92400E',
    accentGlow: 'rgba(217, 119, 6, 0.4)',
    badge: 'ALTA PRECISÃO',
    tagline: 'A arte da barbearia elevada a uma experiência visual de cinema.',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Lâmina e Navalha 3D', 'Agendamento Direto', 'Galeria de Cortes', 'Review Google Integrado']
  },
  {
    id: '02-manicure',
    number: '02',
    name: 'Manicure & Nail Designer',
    subtitle: 'Unhas em gel, blindagem, nail art e sofisticação',
    description: 'Rosa sofisticado, nude translúcido e cristais lapidados. Estética glassmorphism elegante com brilho e delicadeza.',
    iconName: 'sparkles',
    vibe: 'Rosa Sofisticado + Nude + Cristal Glass',
    accentColor: '#EC4899',
    secondaryColor: '#BE185D',
    accentGlow: 'rgba(236, 72, 153, 0.4)',
    badge: 'ESTÉTICA VIP',
    tagline: 'Elegância, brilho e valorização máxima do seu trabalho nas unhas.',
    coverImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Esmalte e Cristal 3D', 'Apresentação de Cuidados', 'Fotos em Alta Resolução', 'Status Aberto/Fechado']
  },
  {
    id: '03-salao',
    number: '03',
    name: 'Salão de Beleza',
    subtitle: 'Cabelos, mechas, estética facial e dia da noiva',
    description: 'Champagne brilhante, preto profundo e dourado sutil. Atmosfera de editorial de revista de luxo e salão internacional.',
    iconName: 'crown',
    vibe: 'Champagne + Preto + Dourado Editorial',
    accentColor: '#F59E0B',
    secondaryColor: '#B45309',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    badge: 'ALTA COSTURA',
    tagline: 'O requinte de um salão de alta costura na palma da mão da sua cliente.',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Tesoura Régia 3D', 'Especialidades & Mechas', 'Experiência Noiva', 'Avaliações Estreladas']
  },
  {
    id: '04-pizzaria',
    number: '04',
    name: 'Pizzaria & Gastronomia',
    subtitle: 'Pizzas ao forno a lenha, massas e lanches artesanais',
    description: 'Preto rústico, vermelho fogo e laranja brasa. Sabor real, fotografia de pratos em destaque e pedidos ágeis via WhatsApp.',
    iconName: 'pizza',
    vibe: 'Preto + Vermelho Queimado + Fogo Artesanal',
    accentColor: '#EF4444',
    secondaryColor: '#DC2626',
    accentGlow: 'rgba(239, 68, 68, 0.4)',
    badge: 'FORNO A LENHA',
    tagline: 'Desperte o apetite imediato com imagens quentes e pedidos diretos.',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Fatia Forno a Lenha 3D', 'Especialidades Artesanais', 'Pedido WhatsApp Direto', 'Horário de Fornada']
  },
  {
    id: '05-boutique',
    number: '05',
    name: 'Boutique & Moda',
    subtitle: 'Roupas femininas, alfaiataria, acessórios e tendências',
    description: 'Preto de passarela, branco puro e reflexos de prata. Vitrine de alta moda com foco em exclusividade e atendimento VIP.',
    iconName: 'bag',
    vibe: 'Preto de Passarela + Branco Puro + Prata',
    accentColor: '#E2E8F0',
    secondaryColor: '#94A3B8',
    accentGlow: 'rgba(226, 232, 240, 0.4)',
    badge: 'FASHION & LUXO',
    tagline: 'A sofisticação da sua boutique em uma vitrine digital inesquecível.',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Sacola de Luxo 3D', 'Apresentação de Looks', 'Conexão Instagram & WhatsApp', 'Provador VIP']
  },
  {
    id: '06-corretor',
    number: '06',
    name: 'Corretor & Imóveis',
    subtitle: 'Casas de condomínio, apartamentos de luxo e investimentos',
    description: 'Azul safira profundo, ouro escovado e mármore. Credibilidade inegável para corretores de alta renda e imobiliárias boutique.',
    iconName: 'building',
    vibe: 'Azul Safira + Ouro + Mármore Escuro',
    accentColor: '#3B82F6',
    secondaryColor: '#1D4ED8',
    accentGlow: 'rgba(59, 130, 246, 0.4)',
    badge: 'ALTO PADRÃO',
    tagline: 'Autoridade e credibilidade máxima para fechar negócios imobiliários.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Mansão & Chave 3D', 'Especialidades do Corretor', 'CRECI & Confiança', 'Atendimento Direto']
  },
  {
    id: '07-personal',
    number: '07',
    name: 'Personal Trainer',
    subtitle: 'Musculação, emagrecimento, hipertrofia e consultoria online',
    description: 'Preto carvão, laranja neon e verde elétrico. Alta performance, energia visual e autoridade técnica para treinadores.',
    iconName: 'dumbbell',
    vibe: 'Preto Carvão + Laranja Neon + Alta Energia',
    accentColor: '#F97316',
    secondaryColor: '#EA580C',
    accentGlow: 'rgba(249, 115, 22, 0.4)',
    badge: 'PERFORMANCE',
    tagline: 'Apresente seus métodos e transforme seguidores em alunos fiéis.',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Haltere Forjado 3D', 'Metodologias de Treino', 'Planos de Consultoria', 'Antes & Depois']
  },
  {
    id: '08-motorista',
    number: '08',
    name: 'Motorista Particular',
    subtitle: 'Transporte executivo, viagens, aeroportos e eventos',
    description: 'Preto fosco, azul noturno e cromado metálico. Segurança, pontualidade e discrição para motoristas de alto nível.',
    iconName: 'car',
    vibe: 'Preto Fosco + Azul Noturno + Cromado Metálico',
    accentColor: '#60A5FA',
    secondaryColor: '#2563EB',
    accentGlow: 'rgba(96, 165, 250, 0.4)',
    badge: 'TRANSPORTE VIP',
    tagline: 'Transmita confiança imediata e garanta reservas diretas no seu WhatsApp.',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Sedan Executivo 3D', 'Rotas & Viagens', 'Chamar Imediato', 'Veículo Conforto']
  },
  {
    id: '09-mecanica',
    number: '09',
    name: 'Mecânica & Auto Center',
    subtitle: 'Revisão automotiva, injeção, freios, suspensão e pneus',
    description: 'Grafite escovado, aço industrial e laranja de segurança. Transparência técnica e solidez para oficinas modernas.',
    iconName: 'wrench',
    vibe: 'Grafite Escovado + Aço + Laranja Mecânico',
    accentColor: '#FB923C',
    secondaryColor: '#C2410C',
    accentGlow: 'rgba(251, 146, 60, 0.4)',
    badge: 'TECNOLOGIA & PRECISÃO',
    tagline: 'Mostre a tecnologia e a seriedade da sua oficina com clareza total.',
    coverImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Chave de Aço 3D', 'Diagnóstico Computadorizado', 'Localização Waze/Maps', 'Orçamento Rápido']
  },
  {
    id: '10-confeitaria',
    number: '10',
    name: 'Confeitaria Artesanal',
    subtitle: 'Bolos decorados, doces finos, tortas e sobremesas',
    description: 'Chocolate belga, creme aveludado e toques de rosé gold. Doçura elegante com fotos de dar água na boca e pedidos rápidos.',
    iconName: 'cake',
    vibe: 'Chocolate Belga + Creme + Rosé Gold Doce',
    accentColor: '#F472B6',
    secondaryColor: '#DB2777',
    accentGlow: 'rgba(244, 114, 182, 0.4)',
    badge: 'CONFEITARIA FINA',
    tagline: 'Apresente suas criações mais irresistíveis e conquiste clientes à primeira vista.',
    coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Bolo Esculpido 3D', 'Galeria de Encomendas', 'Doces Finos', 'Review Google']
  },
  {
    id: '11-advocacia',
    number: '11',
    name: 'Advocacia & Jurídico',
    subtitle: 'Direito de família, empresarial, civil e consultoria preventiva',
    description: 'Azul marinho clássico, ouro polido e mármore sóbrio. Máxima autoridade e credibilidade para advogados e sociedades.',
    iconName: 'scale',
    vibe: 'Azul Marinho + Ouro Nobre + Mármore Sóbrio',
    accentColor: '#D97706',
    secondaryColor: '#1E3A8A',
    accentGlow: 'rgba(217, 119, 6, 0.4)',
    badge: 'OAB ATIVA & SEGURANÇA',
    tagline: 'Defesa incansável e estratégica com a autoridade que seus clientes exigem.',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Balança da Justiça 3D', 'Áreas de Atuação', 'Consulta WhatsApp', 'Autoridade Jurídica']
  },
  {
    id: '12-estetica',
    number: '12',
    name: 'Estética & Sobrancelhas',
    subtitle: 'Nanoblading, micropigmentação, visagismo e estética avançada',
    description: 'Off-white perolado, rosé champagne e detalhes dourados. Estética limpa, feminina e transformadora estilo Atelier.',
    iconName: 'sparkles',
    vibe: 'Off-White Perolado + Rosé Champagne + Ouro Suave',
    accentColor: '#FB7185',
    secondaryColor: '#E11D48',
    accentGlow: 'rgba(251, 113, 133, 0.4)',
    badge: 'ESTÉTICA AVANÇADA',
    tagline: 'Realçando a naturalidade e a harmonia do seu olhar com visagismo exclusivo.',
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Dermógrafo 3D', 'Design com Visagismo', 'Galeria de Resultados', 'Agendamento VIP']
  },
  {
    id: '13-refrigeracao',
    number: '13',
    name: 'Refrigeração & Climatização',
    subtitle: 'Higienização antibacteriana, instalação, manutenção de split e PMOC',
    description: 'Azul polar, gelo cristalino e cinza titânio. Storytelling focado em saúde, ar puro e economia real de energia.',
    iconName: 'wind',
    vibe: 'Azul Polar + Gelo Cristalino + Titânio',
    accentColor: '#0284C7',
    secondaryColor: '#0369A1',
    accentGlow: 'rgba(2, 132, 199, 0.4)',
    badge: 'AR PURO & ECONOMIA',
    tagline: 'Seu ar-condicionado limpo, sem bactérias e economizando até 30% na conta de luz.',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Split Polar 3D', 'Alerta de Saúde & Filtros', 'Sem Sujeira na Instalação', 'Orçamento Direto']
  },
  {
    id: '14-pintor',
    number: '14',
    name: 'Pintura & Acabamentos',
    subtitle: 'Cimento queimado, pintura airless, restauração de fachadas e fino acabamento',
    description: 'Azul profundo de alta cobertura, cinza concreto e toques vibrantes. Foco em limpeza total, prazo e perfeição.',
    iconName: 'brush',
    vibe: 'Azul Cobalto + Concreto Urbano + Alta Precisão',
    accentColor: '#2563EB',
    secondaryColor: '#1D4ED8',
    accentGlow: 'rgba(37, 99, 235, 0.4)',
    badge: 'ACABAMENTO IMPECÁVEL',
    tagline: 'Transformação de ambientes sem sujeira, com prazo rigoroso e fino acabamento.',
    coverImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Rolo de Pintura 3D', 'Efeito Cimento Queimado', 'Pintura Airless Rápida', 'Garantia de Limpeza']
  },
  {
    id: '15-fotografo',
    number: '15',
    name: 'Fotógrafo & Videomaker',
    subtitle: 'Ensaios corporativos, publicidade, casamentos e produções cinema',
    description: 'Preto fotográfico, dourado de ótica e tons neutros elegantes. Visual cinematográfico para portfólios autorais.',
    iconName: 'camera',
    vibe: 'Preto Fotográfico + Âmbar de Estúdio + Cinema',
    accentColor: '#F59E0B',
    secondaryColor: '#D97706',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    badge: 'CINEMATOGRAFIA & ENSAIOS',
    tagline: 'Histórias reais registradas com estética de cinema e iluminação impecável.',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Câmera Mirrorless 3D', 'Portfólio em Alta Resolução', 'Ensaios Corporativos', 'Orçamento Rápido']
  }
];

export interface DesignStyleConfig {
  index: number;
  layout: TemplateLayout;
  serviceLayout: ServiceLayoutStyle;
  galleryStyle: GalleryStyle;
  fontCategory: FontCategory;
  socialIconStyle: SocialIconStyle;
  styleName: string;
  tagline: string;
  description: string;
}

export const DESIGN_STYLES: DesignStyleConfig[] = [
  {
    index: 1,
    layout: 'graphic-bio',
    serviceLayout: 'cards',
    galleryStyle: 'masonry',
    fontCategory: 'MODERNA',
    socialIconStyle: 'glass',
    styleName: 'Graphic Bio / Premiere',
    tagline: 'Composição publicitária com banners de ação, recortes 3D e alta conversão.',
    description: 'Visual cinematográfico com iluminação de estúdio, banners publicitários com tags de ação, mockups 3D de WhatsApp e Google Maps, e selo verificado.'
  },
  {
    index: 2,
    layout: 'editorial',
    serviceLayout: 'editorial',
    galleryStyle: 'editorial',
    fontCategory: 'EDITORIAL',
    socialIconStyle: 'minimal',
    styleName: 'Editorial Atelier / Ivory Light',
    tagline: '100% Claro: Fundo off-white/creme, tipografia serif de revista e fotografia vertical.',
    description: 'Estilo editorial autoral com títulos display imponentes, respiro refinado, apresentação em texto e zero cards repetitivos.'
  },
  {
    index: 3,
    layout: 'brutalist',
    serviceLayout: 'minimal-list',
    galleryStyle: 'horizontal-scroll',
    fontCategory: 'BOLD',
    socialIconStyle: 'solid',
    styleName: 'Urban / Neo-Brutalist',
    tagline: 'Grafite industrial, alto contraste, numeração técnica [01] e bordas retas.',
    description: 'Estética contemporânea com tipografia condensada e pesada, caixas estruturadas [01], energia urbana e impacto imediato.'
  },
  {
    index: 4,
    layout: 'minimal',
    serviceLayout: 'minimal-list',
    galleryStyle: 'cards',
    fontCategory: 'MINIMAL',
    socialIconStyle: 'outline',
    styleName: 'Minimal Clean / Pure White',
    tagline: '100% Claro: Fundo 100% branco puro, respiro amplo e funciona perfeitamente sem fotos.',
    description: 'Minimalismo requintado com logo PNG em destaque, foco absoluto na tipografia, serviços essenciais e contato ágil.'
  },
  {
    index: 5,
    layout: 'classic-club',
    serviceLayout: 'cards',
    galleryStyle: 'carousel',
    fontCategory: 'ELEGANTE',
    socialIconStyle: 'glass',
    styleName: 'Vintage Heritage / Classic Club',
    tagline: 'Couro escuro, mogno e cobre envelhecido, brasão clássico e clima cavalheiro.',
    description: 'Tradição artesanal com textura de madeira nobre, cartão de visitas vintage, brasão heráldico e avaliações de prestígio.'
  },
  {
    index: 6,
    layout: 'profile-poster',
    serviceLayout: 'minimal-list',
    galleryStyle: 'horizontal-scroll',
    fontCategory: 'BOLD',
    socialIconStyle: 'glass',
    styleName: 'Sport & Performance / Poster',
    tagline: 'Azul marinho e laranja flamejante, foto recortada protagonista e manifesto atlético.',
    description: 'Pôster de alto impacto inspirado em referências de atletas e treinadores, com contadores de performance, manifesto marcante e logo em itálico 3D.'
  },
  {
    index: 7,
    layout: 'magazine',
    serviceLayout: 'editorial',
    galleryStyle: 'horizontal-scroll',
    fontCategory: 'MODERNA',
    socialIconStyle: 'minimal',
    styleName: 'Nordic Sand / Scandinavian Light',
    tagline: '100% Claro: Areia suave e linho #F4F1EA, split screen e lookbook horizontal.',
    description: 'Design escandinavo calmo e acolhedor, com molduras orgânicas curvas, tipografia humanista e cardápio em acordeão elegante.'
  },
  {
    index: 8,
    layout: 'bento',
    serviceLayout: 'cards',
    galleryStyle: 'masonry',
    fontCategory: 'MODERNA',
    socialIconStyle: 'solid',
    styleName: 'Bento Grid / Modern Mosaic',
    tagline: 'Mosaico assimétrico, midnight teal e neon cyan, status ao vivo e GPS.',
    description: 'Organização modular ultra-moderna em blocos bento interligados, com badge pulsante de status em tempo real e atalhos táteis.'
  },
  {
    index: 9,
    layout: 'split-screen',
    serviceLayout: 'cards',
    galleryStyle: 'carousel',
    fontCategory: 'MODERNA',
    socialIconStyle: 'outline',
    styleName: 'Ice White / Luxury Barbershop',
    tagline: '100% Claro: Gelo e titânio #F8FAFC, seletor de serviços interativo sincronizado.',
    description: 'Atendimento executivo de alta patente com seletor interativo que atualiza em tempo real a mensagem enviada ao WhatsApp.'
  },
  {
    index: 10,
    layout: 'signature',
    serviceLayout: 'cards',
    galleryStyle: 'carousel',
    fontCategory: 'ELEGANTE',
    socialIconStyle: 'glass',
    styleName: 'Signature Prestige / Black & Platinum',
    tagline: 'Preto nobre, platina, assinatura cursiva, luz de cinema e lounge VIP.',
    description: 'Composição de alto luxo com iluminação cenográfica de holofote, selo de cera com acabamento em platina e comodidades VIP exclusivas.'
  }
];

// Niche Specific Realistic Content (WITHOUT forced prices, with tailored CTAs)
interface NicheDomainConfig {
  names: string[];
  slogans: string[];
  badges: string[];
  abouts: string[];
  primaryCtaLabel: string;
  primaryCtaMessage: string;
  serviceCtaLabel: string;
  specialties: Array<{ name: string; description: string; iconName: string; imageUrl?: string }>;
  differentials: Array<{ title: string; description: string; iconName: string }>;
  photos: string[];
  hours: string;
  address: string;
}

const NICHE_DOMAIN_DATA: Record<NichoId, NicheDomainConfig> = {
  '01-barbearia': {
    names: [
      'The Royal Razor Club',
      'Black Vintage Barbershop',
      'Iron & Comb Studio',
      'Gentleman Society Lounge',
      'Monarch Grooming',
      'Fade Master Atelier',
      'Bourbon & Blade',
      'Urban Viking Shave',
      'Executive Grooming Club',
      'The Heritage Cut & Shave'
    ],
    slogans: [
      'Onde a tradição secular da navalha encontra o estilo contemporâneo.',
      'Cortes de alta precisão e barboterapia para quem valoriza sua imagem.',
      'Sua imagem é seu cartão de visitas mais valioso.'
    ],
    badges: ['BARBEARIA PREMIUM', 'MESTRES DA NAVALHA', 'TRADIÇÃO & ESTILO'],
    abouts: [
      'Criamos uma atmosfera única que une o conforto dos clubes clássicos de cavalheiros à técnica milimétrica dos cortes modernos. Aqui, cada atendimento é uma pausa relaxante com toalha quente, navalha e bebida selecionada.'
    ],
    primaryCtaLabel: 'Chamar no WhatsApp',
    primaryCtaMessage: 'Olá! Gostaria de saber mais sobre os horários e atendimentos da barbearia.',
    serviceCtaLabel: 'Quero Saber Mais',
    specialties: [
      { name: 'Corte Degradê & Fade de Precisão', description: 'Acabamento milimétrico com tesoura e máquina, lavagem refrescante e finalização impecável.', iconName: 'scissors' },
      { name: 'Barboterapia com Toalha Quente', description: 'Vapor de ozônio, óleos nobres para hidratação e escanhoação clássica com navalha afiada.', iconName: 'award' },
      { name: 'Alinhamento & Pigmentação', description: 'Definição nítida dos contornos da barba e cabelo para um visual alinhado por dias.', iconName: 'sparkles' },
      { name: 'Experiência Completa do Cavalheiro', description: 'Cabelo, barba completa, alinhamento de sobrancelhas e momento de descontração.', iconName: 'crown' }
    ],
    differentials: [
      { title: 'Toalha Quente & Ozônio', description: 'Relaxamento profundo em todas as barboterapias.', iconName: 'sparkles' },
      { title: 'Pontualidade Britânica', description: 'Seu horário é sagrado e respeitado.', iconName: 'clock' },
      { title: 'Ambiente Clássico', description: 'Bebidas selecionadas e clima reservado.', iconName: 'crown' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 09:00 às 20:00 • Domingo: Fechado',
    address: 'Av. Paulista, 1500 — Jardins, São Paulo - SP'
  },

  '02-manicure': {
    names: [
      'Lumière Nail Studio',
      'Velvet Pink Gel Bar',
      'Nude Elegance Designer',
      'Diamond Gloss Atelier',
      'Chic & Shine Nail Bar',
      'Rose Gold Nail Lounge',
      'Modern Frenchie Studio',
      'Opulence Nail Design',
      'Glow & Glam Nail Boutique',
      'Haute Manicure Atelier'
    ],
    slogans: [
      'Unhas perfeitas com técnica impecável e durabilidade prolongada.',
      'O luxo e o cuidado que as suas mãos merecem todos os dias.',
      'Sua auto-estima elevada através de detalhes encantadores.'
    ],
    badges: ['NAIL DESIGNER VIP', 'ALONGAMENTOS DE LUXO', 'ESPECIALISTA EM GEL'],
    abouts: [
      'Dedicada à saúde e estética das unhas naturais e alongamentos. Trabalhamos exclusivamente com produtos hipoalergênicos e técnicas internacionais que preservam a integridade e garantem acabamento ultrafino.'
    ],
    primaryCtaLabel: 'Falar com a Especialista',
    primaryCtaMessage: 'Olá! Gostaria de consultar disponibilidades e tirar dúvidas sobre as unhas.',
    serviceCtaLabel: 'Consultar Detalhes',
    specialties: [
      { name: 'Alongamento em Fibra de Vidro Slim', description: 'Curvatura natural e estrutura ultrafina com acabamento resistente e imperceptível.', iconName: 'sparkles' },
      { name: 'Blindagem Diamante com Gel', description: 'Proteção para unhas naturais com brilho espelhado que não descasca por semanas.', iconName: 'award' },
      { name: 'Nail Art Autoral & Francesa Reversa', description: 'Designs exclusivos, encapsuladas e traços delicados desenhados à mão.', iconName: 'heart' },
      { name: 'Spa das Mãos & Pés com Cutilagem Russa', description: 'Esfoliação profunda, hidratação nutritiva e corte contínuo sem ferir as cutículas.', iconName: 'star' }
    ],
    differentials: [
      { title: 'Biossegurança Total', description: 'Materiais 100% esterilizados em autoclave hospitalar.', iconName: 'shield' },
      { title: 'Durabilidade Superior', description: 'Produtos importados de alta aderência.', iconName: 'sparkles' },
      { title: 'Ambiente Acolhedor', description: 'Espaço pensado para seu relaxamento e conforto.', iconName: 'heart' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Sábado: 09:00 às 19:00 • Segunda e Domingo: Fechado',
    address: 'Rua Oscar Freire, 920 — Cerqueira César, São Paulo - SP'
  },

  '03-salao': {
    names: [
      'Maison de Beauté Royale',
      'Aura & Blonde Concept',
      'L’Éclat Hair & Spa',
      'St. Germain Visagismo',
      'Illumina Beauty Lounge',
      'Vogue Hair Experience',
      'Bella Donna Hair Atelier',
      'Sovereign Salon & Spa',
      'Prism Color & Cut',
      'Atelier Haute Coiffure'
    ],
    slogans: [
      'Transformações que realçam sua identidade e celebram sua beleza única.',
      'Colorações refinadas, loiros saudáveis e visagismo de alto nível.',
      'O luxo de cuidar de si em um ambiente exclusivo.'
    ],
    badges: ['SALÃO CONCEITO', 'VISAGISMO & LOIROS', 'HAIR & SPA EXCLUSIVO'],
    abouts: [
      'Combinamos análise visagista, ciência capilar e as melhores marcas do mundo (Kérastase, Wella, L’Oréal) para criar cortes, mechas e tratamentos que valorizam a harmonia do seu rosto e preservam a saúde do cabelo.'
    ],
    primaryCtaLabel: 'Consultar Disponibilidade',
    primaryCtaMessage: 'Olá! Gostaria de falar sobre transformação capilar e horários disponíveis.',
    serviceCtaLabel: 'Conhecer Mais',
    specialties: [
      { name: 'Mechas Personalizadas & Iluminação', description: 'Morena iluminada, blonde contour e técnicas exclusivas de transição suave.', iconName: 'sparkles' },
      { name: 'Corte Visagista & Alinhamento', description: 'Estudo do formato facial para valorizar ângulos e trazer leveza ao comprimento.', iconName: 'scissors' },
      { name: 'Cronograma Capilar & Reconstrução', description: 'Tratamentos intensivos para reposição de lipídios, queratina e brilho espelhado.', iconName: 'crown' },
      { name: 'Produção Completa & Dia da Noiva', description: 'Penteados contemporâneos, maquiagem de alta fixação e suíte privativa.', iconName: 'heart' }
    ],
    differentials: [
      { title: 'Diagnóstico Capilar Prévio', description: 'Teste de mecha e análise de integridade em todos os procedimentos.', iconName: 'award' },
      { title: 'Produtos Globais de Luxo', description: 'Somente linhas profissionais de primeira linha mundial.', iconName: 'crown' },
      { title: 'Atendimento Individualizado', description: 'Atenção total do especialista durante seu processo.', iconName: 'star' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Sábado: 09:00 às 20:00 • Domingo e Segunda: Fechado',
    address: 'Av. Brigadeiro Faria Lima, 2200 — Itaim Bibi, São Paulo - SP'
  },

  '04-pizzaria': {
    names: [
      'Don Forno Napolitano',
      'Bella Fornalha Artesanal',
      'Vesúvio Pizza Bar',
      'La Famiglia Trattoria',
      'Farina & Fuoco Pizzaria',
      'Spacca Napoli Crust',
      'Mamma Mia Forneria',
      'Rustica Wood Fired Pizza',
      'Piazza d’Oro Gastronomia',
      'San Pietro Forno a Lenha'
    ],
    slogans: [
      'Fermentação natural de 48 horas, forno a lenha e molho de tomates italianos.',
      'A verdadeira tradição italiana em cada fatia estaladiça e suculenta.',
      'Sabor que reúne pessoas e celebra os melhores momentos.'
    ],
    badges: ['FORNO A LENHA ARTESANAL', 'FERMENTAÇÃO 48H', 'MASSAS ESPECIAIS'],
    abouts: [
      'Respeitamos a cartilha clássica da pizza napolitana: farinha 00 importada, fermentação lenta e queijos selecionados. O resultado é uma borda aerada, leve e extremamente fácil de digerir.'
    ],
    primaryCtaLabel: 'Pedir pelo WhatsApp',
    primaryCtaMessage: 'Olá! Gostaria de ver o cardápio de hoje e fazer meu pedido!',
    serviceCtaLabel: 'Ver Detalhes do Sabor',
    specialties: [
      { name: 'Pizzas Clássicas & Especiais da Casa', description: 'Burrata trufada, Margherita D.O.P., Parma com rúcula fresca e combinações autorais.', iconName: 'pizza' },
      { name: 'Massas Frescas & Focaccias', description: 'Focaccia ao alecrim e azeite extravirgem, lasanhas gratinadas no forno de pedra.', iconName: 'award' },
      { name: 'Sobremesas Italianas Tradicionais', description: 'Calzone de Nutella com morangos frescos e Tiramisù com mascarpone autêntico.', iconName: 'heart' },
      { name: 'Carta de Vinhos & Cervejas Artesanais', description: 'Rótulos cuidadosamente selecionados para harmonizar perfeitamente com cada fornada.', iconName: 'star' }
    ],
    differentials: [
      { title: 'Forno a Lenha a 450°C', description: 'Cozimento rápido que preserva a suculência e o aroma defumado.', iconName: 'flame' },
      { title: 'Ingredientes D.O.P.', description: 'Tomates San Marzano e azeite extravirgem italiano.', iconName: 'award' },
      { title: 'Entrega Rápida e Quente', description: 'Embalagens térmicas projetadas para manter o crocante.', iconName: 'clock' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Domingo: 18:30 às 23:30 • Segunda: Fechado',
    address: 'Rua Bela Cintra, 1100 — Consolação, São Paulo - SP'
  },

  '05-boutique': {
    names: [
      'Maison Chérie Boutique',
      'Noir & Blanc Concept',
      'Aura Fashion House',
      'Velluto Moda Feminina',
      'L’Élégance Closet',
      'Sartorial Chic Boutique',
      'Palais Moda & Estilo',
      'Urban Glamour Concept',
      'Monochrome Atelier',
      'Sovereign Closet Deluxe'
    ],
    slogans: [
      'Curadoria de alta moda, peças atemporais e alfaiataria impecável.',
      'Vista a sua melhor versão com peças selecionadas para mulheres autênticas.',
      'Estilo, elegância e exclusividade em cada costura.'
    ],
    badges: ['NOVA COLEÇÃO', 'CURADORIA DE LUXO', 'ATENDIMENTO PERSONALIZADO'],
    abouts: [
      'Somos uma boutique com olhar refinado sobre a moda contemporânea. Cada peça de nossa coleção é selecionada para mulheres que buscam tecidos nobres, caimento sob medida e peças versáteis para transitar do trabalho aos eventos mais exclusivos.'
    ],
    primaryCtaLabel: 'Falar com a Loja',
    primaryCtaMessage: 'Olá! Gostaria de consultar peças da nova coleção e atendimento no WhatsApp!',
    serviceCtaLabel: 'Consultar Look',
    specialties: [
      { name: 'Alfaiataria Feminina & Linho Puro', description: 'Blazers estruturados, calças pantalona e coletes com acabamento de alta costura.', iconName: 'bag' },
      { name: 'Vestidos de Festa & Cocktail', description: 'Tecidos fluidos, sedas acetinadas e modelagens pensadas para ocasiões inesquecíveis.', iconName: 'sparkles' },
      { name: 'Acessórios & Bolsas em Couro Legítimo', description: 'Cintos de acabamento nobre, bolsas estruturadas e joias contemporâneas.', iconName: 'crown' },
      { name: 'Consultoria de Estilo & Provador VIP', description: 'Atendimento com horário reservado e assessoria para montagem de malas e cápsulas.', iconName: 'heart' }
    ],
    differentials: [
      { title: 'Peças Exclusivas e Limitadas', description: 'Poucas unidades por modelo para garantir que seu look seja único.', iconName: 'award' },
      { title: 'Envio Expresso para Todo o Brasil', description: 'Embalagem perfumada e entrega com seguro até a sua porta.', iconName: 'bag' },
      { title: 'Atendimento VIP por Vídeo ou Presencial', description: 'Veja caimento e detalhes ao vivo antes de escolher.', iconName: 'star' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 10:00 às 20:00 • Domingo: Fechado',
    address: 'Alameda Lorena, 1450 — Jardins, São Paulo - SP'
  },

  '06-corretor': {
    names: [
      'Prime Real Estate Advisor',
      'Golden Key Imóveis de Alto Padrão',
      'Apex Investimentos Imobiliários',
      'Soberano Casas & Condomínios',
      'Vanguard Real Estate Group',
      'Mansões & Coberturas Exclusivas',
      'Horizonte Imóveis Urbanos & Rurais',
      'Alliance Consultoria Imobiliária',
      'Prestige Private Properties',
      'Patrimônio & Futuro Imóveis'
    ],
    slogans: [
      'Assessoria imobiliária de alto padrão para quem busca patrimônio seguro.',
      'Mansões em condomínios fechados, coberturas e oportunidades de investimento.',
      'Confidencialidade, agilidade e excelência na realização do seu melhor negócio.'
    ],
    badges: ['CRECI 184.920-F', 'IMÓVEIS DE ALTO PADRÃO', 'ASSESSORIA PRIVADA'],
    abouts: [
      'Atuação especializada no mercado imobiliário premium. Ofereço acompanhamento jurídico integral, avaliação de mercado precisa e acesso antecipado aos lançamentos e residências mais cobiçadas da região.'
    ],
    primaryCtaLabel: 'Falar com o Corretor',
    primaryCtaMessage: 'Olá! Gostaria de agendar uma conversa sobre imóveis de alto padrão.',
    serviceCtaLabel: 'Solicitar Apresentação',
    specialties: [
      { name: 'Compra e Venda de Mansões & Coberturas', description: 'Seleção restrita de residências de alto luxo em condomínios fechados e bairros nobres.', iconName: 'building' },
      { name: 'Consultoria de Investimentos Imobiliários', description: 'Análise de rentabilidade, valorização futura e fundos para preservação de capital.', iconName: 'award' },
      { name: 'Imóveis Rurais & Haras Selecionados', description: 'Fazendas produtivas, chácaras de lazer e propriedades rurais com documentação 100%.', iconName: 'star' },
      { name: 'Avaliação Mercadológica & Jurídica', description: 'Laudo técnico de valor e checagem de certidões para negociações 100% seguras.', iconName: 'shield' }
    ],
    differentials: [
      { title: 'Sigilo e Confidencialidade', description: 'Transações discretas para clientes que exigem privacidade.', iconName: 'shield' },
      { title: 'Visitas VIP Agendadas', description: 'Atendimento exclusivo nos horários mais convenientes para você.', iconName: 'clock' },
      { title: 'Segurança Jurídica Completa', description: 'Equipe jurídica especializada cuidando de cada contrato.', iconName: 'award' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 08:00 às 20:00 • Domingo com agendamento',
    address: 'Av. das Nações Unidas, 14401 — Vila Gertrudes, São Paulo - SP'
  },

  '07-personal': {
    names: [
      'Titan Performance Coach',
      'Iron Will Personal Trainer',
      'Apex Human Performance',
      'Vigor & Forma Consultoria',
      'Kratos Elite Training',
      'Focus & Strength Studio',
      'Prime Body Coaching',
      'Velocity Fitness Lab',
      'Metabolic Elite Trainer',
      'Master Personal Training'
    ],
    slogans: [
      'Metodologia científica para emagrecimento, hipertrofia e performance duradoura.',
      'Treinos personalizados para quem tem pouco tempo e busca resultados reais.',
      'A disciplina de hoje constrói a sua melhor versão amanhã.'
    ],
    badges: ['CREF 094821-G/SP', 'ALTA PERFORMANCE', 'CONSULTORIA ONLINE & PRESENCIAL'],
    abouts: [
      'Com mais de 10 anos de experiência e centenas de transformações corporais consolidadas, combino biomecânica aplicada, periodização inteligente e suporte nutricional para que você atinja seus objetivos sem lesões e com consistência.'
    ],
    primaryCtaLabel: 'Iniciar Minha Consultoria',
    primaryCtaMessage: 'Olá! Quero saber como funciona a sua consultoria de treinos e acompanhamento!',
    serviceCtaLabel: 'Conhecer o Método',
    specialties: [
      { name: 'Personal Trainer Presencial Exclusivo', description: 'Supervisão direta em academia de alto padrão, estúdio privativo ou condomínio.', iconName: 'dumbbell' },
      { name: 'Consultoria Online com App Próprio', description: 'Periodização mensal, vídeos explicativos de execução e correção diária de postura.', iconName: 'sparkles' },
      { name: 'Protocolo de Emagrecimento Rápido & Seguro', description: 'Estratégias de treino metabólico com foco em perda de gordura preservando massa magra.', iconName: 'flame' },
      { name: 'Hipertrofia & Força com Periodização', description: 'Progressão de carga calculada e ajustes constantes para quebrar platôs de evolução.', iconName: 'award' }
    ],
    differentials: [
      { title: 'Treinos Baseados em Ciência', description: 'Sem modismos: técnicas validadas pela fisiologia do exercício.', iconName: 'award' },
      { title: 'Suporte Direto no WhatsApp', description: 'Tire dúvidas sobre execução e rotina sempre que precisar.', iconName: 'message' },
      { title: 'Avaliação Física Regular', description: 'Medições e fotos comparativas para acompanhar a evolução real.', iconName: 'star' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sexta: 06:00 às 22:00 • Sábado: 07:00 às 13:00',
    address: 'Atendimento nos Melhores Bairros & Online em Todo o País'
  },

  '08-motorista': {
    names: [
      'Black Chauffeur Brasil',
      'Executive Driver VIP',
      'Prestige Transporte Privado',
      'Prime Route Motorista Particular',
      'Elite Concierge & Viagens',
      'Sovereign Black Car',
      'Apex Viagens & Traslados',
      'Vanguard Executivo 24h',
      'Royal Comfort Transfer',
      'Signature Black Mobility'
    ],
    slogans: [
      'Transporte executivo com pontualidade britânica, discrição e segurança absoluta.',
      'Viagens para cidades vizinhas, traslados de aeroporto e diárias corporativas.',
      'Seu tempo e conforto tratados com a seriedade que você merece.'
    ],
    badges: ['MOTORISTA EXECUTIVO', 'FROTA BLACK COM AR & WI-FI', 'ATENDIMENTO 24H'],
    abouts: [
      'Serviço profissional de motorista particular com veículo executivo higienizado, ar-condicionado, água mineral gelada e direção defensiva certificada. Ideal para executivos, famílias e eventos especiais.'
    ],
    primaryCtaLabel: 'Solicitar Viagem / Corrida',
    primaryCtaMessage: 'Olá! Gostaria de consultar valores e agendar uma viagem/traslado com você!',
    serviceCtaLabel: 'Ver Detalhes do Trajeto',
    specialties: [
      { name: 'Traslados para Aeroportos (Guarulhos / Congonhas)', description: 'Monitoramento do seu voo em tempo real com recepção pontual no desembarque.', iconName: 'car' },
      { name: 'Viagens Intermunicipais & Litoral / Interior', description: 'Deslocamentos confortáveis sem pressa com paradas sob demanda e pedágios inclusos.', iconName: 'award' },
      { name: 'Diárias Corporativas & Eventos Sociais', description: 'Carro e motorista à sua disposição exclusiva pelo período contratado.', iconName: 'crown' },
      { name: 'Atendimento para Famílias & Terceira Idade', description: 'Atenção redobrada, auxílio com bagagens e condução suave e cuidadosa.', iconName: 'heart' }
    ],
    differentials: [
      { title: 'Pontualidade 100% Garantida', description: 'Chegada com 15 minutos de antecedência no local combinado.', iconName: 'clock' },
      { title: 'Conforto e Conectividade', description: 'Veículo com ar-condicionado, carregadores de celular e Wi-Fi a bordo.', iconName: 'star' },
      { title: 'Direção Defensiva Certificada', description: 'Mais de 15 anos de estrada sem histórico de incidentes.', iconName: 'shield' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Atendimento 24 Horas com Agendamento Prévio',
    address: 'São Paulo, Grande SP, Litoral e Cidades Vizinhas'
  },

  '09-mecanica': {
    names: [
      'Iron Engine Centro Automotivo',
      'Precision Car Mecânica de Alta Linha',
      'Apex Auto Tech & Diagnóstico',
      'Titan Motors Oficina Especializada',
      'Vanguard Performance Mecânica',
      'Mestre das Peças Auto Center',
      'Soberano Injeção & Freios',
      'Turbo & Asfalto Reparos',
      'Oficina Alemã Car Service',
      'Prime Drive Centro Automotivo'
    ],
    slogans: [
      'Diagnóstico computadorizado de ponta e transparência mecânica completa.',
      'Revisões preventivas, freios, injeção eletrônica e ar-condicionado automotivo.',
      'A saúde do seu carro tratada com seriedade técnica e garantia comprovada.'
    ],
    badges: ['CENTRO AUTOMOTIVO', 'DIAGNÓSTICO COMPUTADORIZADO', 'PEÇAS ORIGINAIS'],
    abouts: [
      'Oficina moderna equipada com scanners atualizados para todas as marcas nacionais e importadas. Você recebe fotos e vídeos de cada etapa do conserto com orçamento prévio aprovado antes de qualquer intervenção.'
    ],
    primaryCtaLabel: 'Pedir Orçamento no WhatsApp',
    primaryCtaMessage: 'Olá! Meu carro está precisando de revisão/reparo e gostaria de tirar uma dúvida.',
    serviceCtaLabel: 'Ver Como Funciona',
    specialties: [
      { name: 'Diagnóstico Eletrônico Computadorizado', description: 'Leitura de falhas na injeção, sensores, módulo central e painel com scanner de última geração.', iconName: 'wrench' },
      { name: 'Revisão Preventiva & Troca de Fluidos', description: 'Troca de óleo sintético, filtros de ar/combustível e checagem completa de mais de 40 itens.', iconName: 'award' },
      { name: 'Sistema de Freios, ABS & Suspensão', description: 'Troca de pastilhas, discos, amortecedores e alinhamento a laser com tecnologia 3D.', iconName: 'shield' },
      { name: 'Manutenção de Câmbio & Ar-Condicionado', description: 'Troca de óleo de câmbio automático e higienização com oxi-sanitização da cabine.', iconName: 'sparkles' }
    ],
    differentials: [
      { title: 'Orçamento 100% Transparente', description: 'Nenhuma peça é trocada sem sua autorização expressa em vídeo.', iconName: 'award' },
      { title: 'Garantia por Escrito', description: 'Todas as peças e serviços com garantia documentada.', iconName: 'shield' },
      { title: 'Sala de Espera Climatizada', description: 'Espaço com café expresso e Wi-Fi enquanto seu carro é analisado.', iconName: 'star' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sexta: 08:00 às 18:00 • Sábado: 08:00 às 12:30',
    address: 'Av. Santo Amaro, 3200 — Brooklin, São Paulo - SP'
  },

  '10-confeitaria': {
    names: [
      'Le Sucre Confeitaria Artesanal',
      'Chocolat & Vanille Doceria',
      'Doce Arte Atelier de Bolos',
      'Dolce Vita Sobremesas Finas',
      'Maison Gateau Bolos de Festa',
      'Belga & Caramelo Patisserie',
      'Velvet Cake Confeitaria Afetiva',
      'Doçuras da Rainha Atelier',
      'Atelier Fleur de Sucre',
      'Prestige Patisserie Royale'
    ],
    slogans: [
      'Bolos esculpidos, doces finos e sobremesas que transformam momentos em festa.',
      'Chocolate belga genuíno, frutas frescas e receitas criadas com alma.',
      'O sabor da confeitaria afetiva em sua mais pura sofisticação.'
    ],
    badges: ['CONFEITARIA ARTESANAL', 'CHOCOLATE BELGA', 'ENCOMENDAS EXCLUSIVAS'],
    abouts: [
      'Unimos a elegância da patisserie francesa ao calor dos doces artesanais brasileiros. Produzimos bolos decorados para aniversários e casamentos, além de brigadeiros gourmet e caixas especiais de presente sob encomenda.'
    ],
    primaryCtaLabel: 'Fazer Encomenda no WhatsApp',
    primaryCtaMessage: 'Olá! Gostaria de fazer uma encomenda de bolo/doces para uma data especial!',
    serviceCtaLabel: 'Conhecer Sabores',
    specialties: [
      { name: 'Bolos Decorados & Personalizados', description: 'Camadas de massa úmida, recheios trufados artesanais e finalização em buttercream aveludado.', iconName: 'cake' },
      { name: 'Doces Finos para Eventos & Casamentos', description: 'Bombons lapidados, camafeus de nozes, brigadeiros gourmet com confeitos belgas.', iconName: 'sparkles' },
      { name: 'Sobremesas de Domingo na Travessa', description: 'Bolo de cenoura com calda vulcânica, tortas de pistache e banoffee artesanal.', iconName: 'heart' },
      { name: 'Caixas de Presente & Lembranças VIP', description: 'Embalagens especiais com laço de cetim para presentear em datas comemorativas.', iconName: 'award' }
    ],
    differentials: [
      { title: 'Chocolate Callebaut Genuíno', description: 'Sem conservantes artificiais ou gordura hidrogenada.', iconName: 'award' },
      { title: 'Produção Feita Sob Encomenda', description: 'Seu bolo sai fresquinho do forno poucas horas antes da entrega.', iconName: 'clock' },
      { title: 'Design Autoral e Delicado', description: 'Cada criação é uma obra de arte pensada para seu evento.', iconName: 'heart' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 09:00 às 19:00 • Domingo: Retirada de encomendas',
    address: 'Rua Mourato Coelho, 750 — Pinheiros, São Paulo - SP'
  },

  '11-advocacia': {
    names: [
      'Camila Menezes Advocacia',
      'Siqueira & Associados Direito de Família',
      'Vanguard Advocacia Empresarial',
      'Dra. Valéria Castro Direito Civil',
      'Soberano & Prado Sociedade de Advogados',
      'Apex Jurídico Soluções Estratégicas',
      'Bastos & Miranda Advocacia',
      'Prestige Assessoria Jurídica',
      'Titan Defesa & Consultoria',
      'Alliance Advocacia de Precisão'
    ],
    slogans: [
      'Defesa incansável e estratégica com a autoridade que seus direitos exigem.',
      'Soluções jurídicas preventivas e contenciosas com sigilo e dedicação.',
      'Sua segurança jurídica conduzida por especialistas com comprovada atuação.'
    ],
    badges: ['OAB/SP 412.890', 'DIREITO DE FAMÍLIA & EMPRESARIAL', 'ATENDIMENTO SIGILOSO'],
    abouts: [
      'Atuação pautada pela ética, celeridade e transparência. Prestamos assessoria completa para proteger seu patrimônio e garantir a tranquilidade de sua família ou empresa em momentos decisivos.'
    ],
    primaryCtaLabel: 'Falar com a Equipe Jurídica',
    primaryCtaMessage: 'Olá! Preciso de orientação jurídica especializada para o meu caso.',
    serviceCtaLabel: 'Agendar Consulta',
    specialties: [
      { name: 'Direito de Família, Divórcio & Sucessões', description: 'Inventários, guarda de menores, partilha de bens e planejamento sucessório com discrição.', iconName: 'scale' },
      { name: 'Direito Empresarial & Contratos Comerciais', description: 'Elaboração e blindagem contratual, dissolução societária e assessoria contínua para empresas.', iconName: 'award' },
      { name: 'Direito Civil & Recuperação de Crédito', description: 'Ações indenizatórias, cobranças judiciais e extrajudiciais, e disputas patrimoniais.', iconName: 'shield' },
      { name: 'Consultoria Jurídica Preventiva Online', description: 'Análise antecipada de riscos e pareceres para tomada de decisões seguras.', iconName: 'star' }
    ],
    differentials: [
      { title: 'Sigilo Absoluto & Ética', description: 'Garantia total de sigilo profissional e respeito ao cliente.', iconName: 'shield' },
      { title: 'Atendimento Ágil no WhatsApp', description: 'Atualização frequente sobre o andamento dos seus processos.', iconName: 'clock' },
      { title: 'Atuação Nacional Online', description: 'Consultas por videoconferência com validade jurídica em todo o país.', iconName: 'star' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sexta: 08:30 às 18:30 • Sábado sob agendamento prévio',
    address: 'Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi, São Paulo - SP'
  },

  '12-estetica': {
    names: [
      'Atelier Jéssica Rodrigues Sobrancelhas',
      'Aura Glow Estética & Visagismo',
      'Lumière Harmonização Facial & Olhar',
      'Prestige Dermocosmética Avançada',
      'Bella Pele Estética Integrativa',
      'Diamond Brow Design & Lamination',
      'Maison de Beauté Estética Facial',
      'Velvet Glow Clinique',
      'Opulence Estética & Harmonização',
      'Sovereign Beauty Concept'
    ],
    slogans: [
      'Realçando sua beleza natural com técnicas sutis de visagismo e micropigmentação.',
      'Sobrancelhas desenhadas com precisão milimétrica e estética facial limpa.',
      'O cuidado que ilumina sua identidade sem perder a autenticidade dos seus traços.'
    ],
    badges: ['ESTÉTICA AVANÇADA', 'MICROPIGMENTAÇÃO NANONATURAL', 'ATELIER VIP'],
    abouts: [
      'Especialista em valorizar a singularidade de cada rosto. Utilizamos técnicas ultrafinas de Nanoblading e tratamentos de rejuvenescimento não-invasivos que proporcionam um efeito natural, sofisticado e duradouro.'
    ],
    primaryCtaLabel: 'Agendar Avaliação VIP',
    primaryCtaMessage: 'Olá Jéssica! Gostaria de consultar horários para procedimento de sobrancelhas/estética!',
    serviceCtaLabel: 'Ver Procedimento',
    specialties: [
      { name: 'Micropigmentação Fio a Fio Nanoblading', description: 'Fios imperceptíveis que imitam o caimento natural dos pelos, preenchendo falhas com leveza.', iconName: 'sparkles' },
      { name: 'Design Personalizado com Visagismo', description: 'Mapeamento facial respeitando a estrutura óssea e o formato dos olhos, sem moldes prontos.', iconName: 'award' },
      { name: 'Brow Lamination & Lash Lifting de Luxo', description: 'Alinhamento dos fios naturais para um efeito encorpado e olhar aberto sem necessidade de maquiagem.', iconName: 'heart' },
      { name: 'Limpeza de Pele Profunda com HidraGlow', description: 'Remoção suave de impurezas, infusão de ácido hialurônico e luminosidade imediata.', iconName: 'star' }
    ],
    differentials: [
      { title: 'Biossegurança Rigorosa', description: 'Materiais descartáveis e esterilização certificada em cada sessão.', iconName: 'shield' },
      { title: 'Pigmentos Anvisa de Alta Fixação', description: 'Cores que não desbotam para tons indesejados ao longo do tempo.', iconName: 'award' },
      { title: 'Ambiente Calmante & Exclusivo', description: 'Atendimento com horário privativo e atenção total a você.', iconName: 'heart' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512290900672-1f0236a00dfb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Sábado: 09:00 às 19:00 • Domingo e Segunda: Fechado',
    address: 'Alameda Lorena, 1600 — Jardins, São Paulo - SP'
  },

  '13-refrigeracao': {
    names: [
      'Diego Refrigeração & Climatização',
      'Polar Clean Engenharia Térmica',
      'Master Frio Manutenção de Split',
      'Vanguard Climatização Residencial & Comercial',
      'Apex Ar-Condicionado & PMOC',
      'Clima Puro Higienização Especializada',
      'Titan Frio Manutenção Térmica',
      'Zero Grau Serviços de Ar',
      'Soberano Ar-Condicionado',
      'Ecológico Clima & Refrigeração'
    ],
    slogans: [
      'Seu ar-condicionado pode estar escondendo um problema: respire ar puro e economize até 30% de luz.',
      'Higienização antibacteriana sem sujeira no seu ambiente e instalação técnica com garantia.',
      'Elimine fungos, ácaros e maus odores do seu aparelho com atendimento pontual e transparente.'
    ],
    badges: ['TÉCNICO CERTIFICADO', 'SEM SUJEIRA NA SUA CASA', 'ECONOMIA COMPROVADA'],
    abouts: [
      'A sujeira acumulada dentro do seu ar-condicionado é a principal causa de rinites, alergias e alto consumo de energia elétrica. Trabalhamos com bolsa coletora impermeável para lavar o aparelho no próprio local, sem respingos na sua parede ou piso.'
    ],
    primaryCtaLabel: 'Pedir Higienização no WhatsApp',
    primaryCtaMessage: 'Olá Diego! Gostaria de agendar uma higienização/manutenção no meu ar-condicionado.',
    serviceCtaLabel: 'Ver Como Funciona',
    specialties: [
      { name: 'Higienização Antibacteriana Completa', description: 'Lavagem com bactericida hospitalar, limpeza de turbina e serpentina sem retirar o aparelho da parede.', iconName: 'wind' },
      { name: 'Instalação e Desinstalação Padrão Técnico', description: 'Tubulação de cobre pura, teste de estanqueidade e vácuo com bomba digital para preservar o compressor.', iconName: 'award' },
      { name: 'Carga de Gás Ecológico & Teste de Vazamento', description: 'Identificação exata de microvazamentos e recarga com balança de precisão na medida do fabricante.', iconName: 'shield' },
      { name: 'Contrato de Manutenção Comercial PMOC', description: 'Emissão de laudo técnico obrigatório pela Anvisa para empresas, clínicas e escritórios.', iconName: 'star' }
    ],
    differentials: [
      { title: 'Zero Sujeira no Seu Ambiente', description: 'Bolsa coletora profissional: nada cai no chão ou na parede.', iconName: 'shield' },
      { title: 'Redução na Conta de Luz', description: 'Aparelho limpo refrigera até 2x mais rápido com menor esforço do motor.', iconName: 'sparkles' },
      { title: 'Garantia de 90 Dias', description: 'Garantia técnica documentada em todos os serviços executados.', iconName: 'award' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 07:30 às 19:30 • Atendimento emergencial sob consulta',
    address: 'Atendimento Domiciliar em São Paulo e Cidades Vizinhas'
  },

  '14-pintor': {
    names: [
      'Mestre Mário Pinturas Residenciais',
      'Vanguard Acabamentos & Cimento Queimado',
      'Art & Cor Pintura Airless',
      'Titan Pinturas Prediais & Fachadas',
      'Apex Fino Acabamento & Decoração',
      'Renove Já Pinturas Imobiliárias',
      'Soberano Pinturas & Texturas',
      'Mestre da Espátula Acabamentos',
      'Urban Wall Pintura Moderna',
      'Elegance Tintas & Design de Parede'
    ],
    slogans: [
      'Transformação de ambientes sem sujeira, com prazo rigoroso e acabamento milimétrico.',
      'Aplicação profissional de cimento queimado, pintura airless rápida e restauração de trincas.',
      'Sua casa valorizada e renovada com proteção total dos seus móveis e rodapés.'
    ],
    badges: ['PINTOR PROFISSIONAL', 'PROTEÇÃO TOTAL DO PISO', 'PRAZO RIGOROSO'],
    abouts: [
      'Mais de 15 anos transformando residências, escritórios e condomínios. Nosso compromisso número um é o respeito ao seu patrimônio: isolamos pisos, rodapés e móveis antes de abrir a primeira lata de tinta, e entregamos a casa limpa.'
    ],
    primaryCtaLabel: 'Solicitar Orçamento no WhatsApp',
    primaryCtaMessage: 'Olá! Gostaria de um orçamento detalhado para pintura do meu imóvel.',
    serviceCtaLabel: 'Ver Acabamentos',
    specialties: [
      { name: 'Aplicação de Efeito Cimento Queimado', description: 'Acabamento rústico sofisticado para salas, lavabos e fachadas com proteção hidrorrepelente.', iconName: 'brush' },
      { name: 'Pintura Residencial Fina & Airless', description: 'Paredes e tetos com cobertura uniforme sem marcas de rolo e rapidez incomparável.', iconName: 'award' },
      { name: 'Tratamento de Trincas, Fissuras e Mofo', description: 'Vedação definitiva com telas estruturantes e seladores antimofo para evitar retorno.', iconName: 'shield' },
      { name: 'Pintura de Portas, Janelas & Verniz em Madeira', description: 'Esmalte sintético acetinado ou fosco com fino acabamento e durabilidade superior.', iconName: 'star' }
    ],
    differentials: [
      { title: 'Isolamento com Lona e Fita', description: 'Seus móveis e pisos completamente protegidos contra respingos.', iconName: 'shield' },
      { title: 'Lixamento com Coleta de Pó', description: 'Minimização de até 90% da poeira suspensa durante o preparo.', iconName: 'sparkles' },
      { title: 'Contrato com Data de Entrega', description: 'Início e término com prazos cumpridos à risca.', iconName: 'clock' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505798577917-a65157d3320a?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sexta: 07:30 às 18:00 • Sábado: 08:00 às 14:00',
    address: 'Atendimento em Toda a Região Metropolitana e Condomínios Fechados'
  },

  '15-fotografo': {
    names: [
      'Lucas Prado Visual Studio',
      'Apex Cinema & Fotografia de Autoridade',
      'Lumière Ensaios & Marcas',
      'Prestige Foto & Produção Audiovisual',
      'Focus Prime Retratos Corporativos',
      'Titan Films & Fotografia Publicitária',
      'Aura Click Estúdio Fotográfico',
      'Vanguard Visuals & Direção de Arte',
      'Sovereign Cinema & Photography',
      'Horizonte Fotografia Profissional'
    ],
    slogans: [
      'Imagens que constroem autoridade e contam sua história com estética de cinema.',
      'Retratos corporativos de alto impacto, gastronomia publicitária e filmes comerciais.',
      'A luz certa para elevar a percepção de valor da sua marca pessoal ou empresarial.'
    ],
    badges: ['ESTÚDIO VISUAL', 'DIREÇÃO DE CENA DEDICADA', 'ENTREGA EM ALTA RESOLUÇÃO'],
    abouts: [
      'Trabalho unindo sensibilidade fotográfica a técnicas de iluminação de cinema. Meu método inclui direção descontraída de poses para que você se sinta confiante, autêntico e transmita a autoridade que o seu negócio representa.'
    ],
    primaryCtaLabel: 'Consultar Datas & Orçamentos',
    primaryCtaMessage: 'Olá Lucas! Gostaria de consultar disponibilidade para um ensaio/produção!',
    serviceCtaLabel: 'Ver Portfólio',
    specialties: [
      { name: 'Retratos Corporativos & Posicionamento de Marca', description: 'Fotos profissionais para LinkedIn, bio do Instagram, site e assessoria de imprensa.', iconName: 'camera' },
      { name: 'Produção Audiovisual & Reels Cinematográficos', description: 'Captação 4K com áudio de estúdio e edição com color grading de cinema para suas redes.', iconName: 'award' },
      { name: 'Fotografia Gastronômica & Publicitária', description: 'Imagens irresistíveis de pratos e produtos com composição comercial e luz de estúdio.', iconName: 'star' },
      { name: 'Cobertura Exclusiva de Eventos & Lançamentos', description: 'Registro dinâmico e sofisticado com entrega de fotos prévias no mesmo dia.', iconName: 'sparkles' }
    ],
    differentials: [
      { title: 'Direção Paciente e Humanizada', description: 'Você não precisa saber posar: conduzo cada detalhe com leveza.', iconName: 'heart' },
      { title: 'Color Grading Profissional', description: 'Edição de cores refinada para um visual limpo e sofisticado.', iconName: 'award' },
      { title: 'Galeria Online Privativa', description: 'Acesso rápido para download em alta definição no celular e computador.', iconName: 'shield' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 08:00 às 20:00 • Ensaios externos e estúdio com agendamento',
    address: 'Estúdio Próprio nos Jardins & Atendimento em Todo o Brasil'
  }
};

// Distinct color palettes per model & niche (Dark Cinematic, Off-White Light, Urban Brutalist, Pure White Minimal, Jewel Signature)
function getNicheModelTheme(nichoId: string, modelIndex: number, primaryAccent: string, secondaryAccent: string) {
  switch (modelIndex) {
    case 1: // MODELO 01 — CINEMATIC / IMPACT (Rich dark, glowing accent, deep contrast)
      return {
        background: '#07080D',
        surface: '#0E111C',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.1)',
        primary: primaryAccent || '#D97706',
        secondary: secondaryAccent || '#B45309',
        accent: '#F59E0B'
      };

    case 2: // MODELO 02 — EDITORIAL / LIGHT (Warm Off-White / Cream / Pastel, high contrast dark serif text)
      if (nichoId === '01-barbearia') {
        return {
          background: '#FAF8F5',
          surface: '#FFFFFF',
          text: '#111111',
          textMuted: '#57534E',
          border: 'rgba(0, 0, 0, 0.12)',
          primary: '#A87132',
          secondary: '#78350F',
          accent: '#C59B27'
        };
      } else if (nichoId === '02-manicure') {
        return {
          background: '#FDF8F9',
          surface: '#FFFFFF',
          text: '#2A171F',
          textMuted: '#785A65',
          border: 'rgba(42, 23, 31, 0.12)',
          primary: '#831843',
          secondary: '#BE185D',
          accent: '#DB2777'
        };
      } else if (nichoId === '03-salao') {
        return {
          background: '#FAF7F2',
          surface: '#FFFFFF',
          text: '#292524',
          textMuted: '#78716C',
          border: 'rgba(41, 37, 36, 0.12)',
          primary: '#B45309',
          secondary: '#78350F',
          accent: '#D97706'
        };
      } else if (nichoId === '04-pizzaria') {
        return {
          background: '#FAF6EE',
          surface: '#FFFFFF',
          text: '#1C1917',
          textMuted: '#78716C',
          border: 'rgba(28, 25, 23, 0.12)',
          primary: '#15803D',
          secondary: '#B45309',
          accent: '#DC2626'
        };
      } else if (nichoId === '05-boutique') {
        return {
          background: '#F9F6F0',
          surface: '#FFFFFF',
          text: '#1C1917',
          textMuted: '#57534E',
          border: 'rgba(0, 0, 0, 0.12)',
          primary: '#44403C',
          secondary: '#78350F',
          accent: '#A8A29E'
        };
      } else if (nichoId === '06-corretor') {
        return {
          background: '#F8F9FA',
          surface: '#FFFFFF',
          text: '#1E293B',
          textMuted: '#64748B',
          border: 'rgba(30, 41, 59, 0.12)',
          primary: '#2563EB',
          secondary: '#1D4ED8',
          accent: '#3B82F6'
        };
      } else if (nichoId === '07-personal') {
        return {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          textMuted: '#64748B',
          border: 'rgba(15, 23, 42, 0.12)',
          primary: '#0284C7',
          secondary: '#0369A1',
          accent: '#0EA5E9'
        };
      } else if (nichoId === '08-motorista') {
        return {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          textMuted: '#64748B',
          border: 'rgba(15, 23, 42, 0.12)',
          primary: '#2563EB',
          secondary: '#1D4ED8',
          accent: '#3B82F6'
        };
      } else if (nichoId === '09-mecanica') {
        return {
          background: '#F4F6F8',
          surface: '#FFFFFF',
          text: '#1E293B',
          textMuted: '#64748B',
          border: 'rgba(30, 41, 59, 0.12)',
          primary: '#EA580C',
          secondary: '#C2410C',
          accent: '#F97316'
        };
      } else {
        // 10-confeitaria
        return {
          background: '#FDF6F7',
          surface: '#FFFFFF',
          text: '#701A35',
          textMuted: '#831843',
          border: 'rgba(112, 26, 53, 0.12)',
          primary: '#EC4899',
          secondary: '#DB2777',
          accent: '#F472B6'
        };
      }

    case 3: // MODELO 03 — URBAN / BRUTALIST (Industrial graphite / concrete, high-voltage punch accents)
      let urbanAccent = '#EF4444';
      if (nichoId === '02-manicure') urbanAccent = '#F43F5E';
      if (nichoId === '03-salao') urbanAccent = '#FB7185';
      if (nichoId === '04-pizzaria') urbanAccent = '#DC2626';
      if (nichoId === '05-boutique') urbanAccent = '#22C55E';
      if (nichoId === '06-corretor') urbanAccent = '#06B6D4';
      if (nichoId === '07-personal') urbanAccent = '#22C55E';
      if (nichoId === '08-motorista') urbanAccent = '#FACC15';
      if (nichoId === '09-mecanica') urbanAccent = '#EF4444';
      if (nichoId === '10-confeitaria') urbanAccent = '#FBBF24';

      return {
        background: '#121214',
        surface: '#1B1B1F',
        text: '#FFFFFF',
        textMuted: '#A1A1AA',
        border: 'rgba(255, 255, 255, 0.25)',
        primary: urbanAccent,
        secondary: '#FFFFFF',
        accent: urbanAccent
      };

    case 4: // MODELO 04 — MINIMAL / CLEAN (100% PURE WHITE, zero photos required, hairline dividers)
      return {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        text: '#0F172A',
        textMuted: '#64748B',
        border: 'rgba(15, 23, 42, 0.08)',
        primary: primaryAccent || '#0F172A',
        secondary: '#334155',
        accent: primaryAccent || '#0F172A'
      };

    case 5: // MODELO 05 — VINTAGE HERITAGE / CLASSIC CLUB (Dark tobacco, aged mahogany, copper & brass)
      return {
        background: '#160E0A',
        surface: '#221610',
        text: '#FDFBF7',
        textMuted: '#C9B5A3',
        border: 'rgba(194, 120, 56, 0.25)',
        primary: '#D4AF37',
        secondary: '#A16207',
        accent: '#C27838'
      };

    case 6: // MODELO 06 — SPORT & PERFORMANCE / POSTER (Athletic deep navy & flame orange, Marcos Willian inspired)
      return {
        background: '#0A1329',
        surface: '#102046',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
        border: 'rgba(255, 94, 0, 0.25)',
        primary: '#FF5E00',
        secondary: '#EA580C',
        accent: '#F97316'
      };

    case 7: // MODELO 07 — NORDIC SAND / SCANDINAVIAN LIGHT (100% CLARO - Warm sand, linen, muted charcoal)
      return {
        background: '#F4F1EA',
        surface: '#FFFFFF',
        text: '#22252A',
        textMuted: '#6B7280',
        border: 'rgba(34, 37, 42, 0.1)',
        primary: '#556B2F',
        secondary: '#3F4E22',
        accent: '#606C38'
      };

    case 8: // MODELO 08 — BENTO GRID / MODERN MOSAIC (Midnight teal, neon cyan, glowing glass)
      return {
        background: '#091E24',
        surface: '#0E2930',
        text: '#F0FDFA',
        textMuted: '#99F6E4',
        border: 'rgba(0, 240, 255, 0.2)',
        primary: '#00F0FF',
        secondary: '#0891B2',
        accent: '#2DD4BF'
      };

    case 9: // MODELO 09 — ICE WHITE / LUXURY BARBERSHOP (100% CLARO - Pure ice white #F8FAFC, titanium slate)
      return {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#0F172A',
        textMuted: '#64748B',
        border: 'rgba(15, 23, 42, 0.08)',
        primary: '#0284C7',
        secondary: '#0369A1',
        accent: '#38BDF8'
      };

    case 10: // MODELO 10 — SIGNATURE PRESTIGE / BLACK & PLATINUM (Theatrical spotlight, obsidian, platinum)
      return {
        background: '#050507',
        surface: '#0D0E15',
        text: '#FFFDF5',
        textMuted: '#94A3B8',
        border: 'rgba(226, 232, 240, 0.2)',
        primary: '#E2E8F0',
        secondary: '#94A3B8',
        accent: '#F8FAFC'
      };

    default:
      return getNicheModelTheme(nichoId, ((modelIndex - 1) % 10) + 1, primaryAccent, secondaryAccent);
  }
}

// Generates 50 complete, distinct, authentic templates (10 niches × 5 models)
export const ALL_TEMPLATES: TemplateDefinition[] = [];

NICHOS_LIST.forEach((nicho) => {
  const domain = NICHE_DOMAIN_DATA[nicho.id];

  DESIGN_STYLES.forEach((style, idx) => {
    const templateIndex = idx + 1;
    const templateKey = templateIndex < 10 ? `0${templateIndex}` : `${templateIndex}`;
    const templateId = `${nicho.id}-${templateKey}`;

    // Unique brand name & identity per template
    const brandName = domain.names[idx] || `${nicho.name} ${style.styleName}`;
    const slogan = domain.slogans[idx % domain.slogans.length];
    const badge = domain.badges[idx % domain.badges.length];
    const about = domain.abouts[0];

    // Rich thematic palette dynamically tailored to niche + model engine (Diverse light, dark, pastel, brutalist, and jewel tones)
    const customTheme = getNicheModelTheme(nicho.id, idx + 1, nicho.accentColor, nicho.secondaryColor || '#D97706');

    const defaultTheme = {
      primary: customTheme.primary,
      secondary: customTheme.secondary,
      accent: customTheme.accent,
      background: customTheme.background,
      surface: customTheme.surface,
      text: customTheme.text,
      textMuted: customTheme.textMuted,
      cardBg: customTheme.surface,
      border: customTheme.border,
      fontHeading: style.fontCategory === 'EDITORIAL' ? 'Bodoni Moda' : style.fontCategory === 'ELEGANTE' ? 'Playfair Display' : style.fontCategory === 'BOLD' ? 'Chakra Petch' : 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    };

    // Services for this template (NO PRICES, realistic descriptions & tailored CTA)
    const services = domain.specialties.map((s, sIdx) => ({
      id: `svc_${templateId}_${sIdx}`,
      name: s.name,
      description: s.description,
      iconName: s.iconName,
      priceEnabled: false,
      imageUrl: domain.photos[sIdx % domain.photos.length],
      ctaText: domain.serviceCtaLabel,
      featured: sIdx === 0
    }));

    const photos = domain.photos.map((url, pIdx) => ({
      id: `photo_${templateId}_${pIdx}`,
      url,
      caption: '',
      alt: `${brandName} Foto ${pIdx + 1}`,
      position: pIdx
    }));

    // MODELO 04: PURE MINIMAL (ZERO PHOTOS REQUIRED)
    const isNoPhotoModel = templateIndex === 4;
    const isEditorialModel = templateIndex === 2;

    const defaultData: TemplateDefinition['defaultData'] = {
      nicho: nicho.id,
      templateId,
      layout: style.layout,
      nome: brandName,
      priceEnabled: false,
      professionalPhotoUrl: domain.photos[0],
      heroImageUrl: domain.photos[0],
      usePhotos: !isNoPhotoModel,
      showLogo: true,
      carouselConfig: {
        autoplay: true,
        interval: 3,
        loop: true,
        showIndicators: true,
        showArrows: true,
        pauseOnHover: true,
        transition: 'slide'
      },
      heroLayout: isEditorialModel ? 'minimal' : isNoPhotoModel ? 'minimal' : 'full-photo',
      identity: {
        name: brandName,
        slogan,
        badge,
        title: domain.primaryCtaLabel,
        headline: slogan,
        subtitle: 'Atendimento com Hora Marcada e WhatsApp Direto',
        description: about,
        about,
        logoUrl: domain.photos[0],
        professionalPhotoUrl: domain.photos[0],
        avatarUrl: isNoPhotoModel ? '' : domain.photos[1],
        bannerUrl: isNoPhotoModel ? '' : domain.photos[0],
        heroImageUrl: domain.photos[0]
      },
      theme: defaultTheme,
      photos: isNoPhotoModel ? [] : photos,
      galleryStyle: isNoPhotoModel ? 'none' : style.galleryStyle,
      services,
      buttons: [
        {
          id: `btn_${templateId}_1`,
          text: domain.primaryCtaLabel,
          url: '#',
          iconName: 'whatsapp',
          style: 'solid',
          color: nicho.accentColor,
          size: 'lg',
          align: 'center'
        },
        {
          id: `btn_${templateId}_2`,
          text: 'Localização no Google Maps',
          url: '#',
          iconName: 'map',
          style: 'glass',
          color: '#FFFFFF',
          size: 'md',
          align: 'center'
        }
      ],
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: domain.primaryCtaMessage, label: 'WhatsApp' },
        instagram: { enabled: true, username: brandName.toLowerCase().replace(/[^a-z0-9]/g, ''), url: 'https://instagram.com' },
        tiktok: { enabled: true, username: brandName.toLowerCase().replace(/[^a-z0-9]/g, ''), url: 'https://tiktok.com' },
        google: { enabled: true, url: 'https://google.com' },
        googleReview: { enabled: true, url: 'https://google.com' },
        facebook: { enabled: false, url: '' }
      },
      location: {
        address: domain.address,
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: domain.hours,
        mapsUrl: 'https://maps.google.com'
      },
      seo: {
        title: `${brandName} — Apresentação Oficial`,
        description: slogan,
        ogImage: domain.photos[0],
        favicon: domain.photos[0]
      },

      // Premium Experience Fields
      logoConfig: {
        size: 'lg',
        align: 'center',
        position: 'hero',
        background: 'none'
      },
      fontCategory: style.fontCategory,
      socialIconStyle: style.socialIconStyle,
      serviceLayout: style.serviceLayout,
      differentials: domain.differentials.map((d, dIdx) => ({
        id: `diff_${templateId}_${dIdx}`,
        title: d.title,
        description: d.description,
        iconName: d.iconName
      })),
      sectionsOrder: ['hero', 'status', 'about', 'differentials', 'services', 'gallery', 'reviews', 'hours', 'location', 'socials', 'cta'],
      sectionsVisibility: {
        hero: true,
        status: true,
        about: true,
        differentials: true,
        services: true,
        gallery: !isNoPhotoModel,
        reviews: true,
        hours: true,
        location: true,
        socials: true,
        cta: true
      },
      statusConfig: {
        enabled: true,
        autoCalculate: true,
        openTime: '09:00',
        closeTime: '20:00',
        customText: 'ABERTO AGORA',
        customMessage: 'Atendimento com horário agendado ou sob consulta imediata'
      },
      whatsappConfig: {
        enabled: true,
        number: '11999999999',
        message: domain.primaryCtaMessage,
        label: domain.primaryCtaLabel,
        style: 'floating',
        floatingPosition: 'right',
        showFloating: true
      },
      googleReviewConfig: {
        enabled: true,
        url: 'https://google.com',
        rating: 5.0,
        reviewCount: 147 + (idx * 12),
        title: 'AVALIAÇÕES NO GOOGLE',
        subtitle: 'Excelência reconhecida por nossos clientes.',
        style: 'gold'
      },
      shareConfig: {
        enabled: true,
        label: 'Compartilhar'
      }
    };

    ALL_TEMPLATES.push({
      id: templateId,
      nichoId: nicho.id,
      index: templateIndex,
      name: `${brandName}`,
      styleName: `${style.styleName}`,
      tagline: `${style.tagline}`,
      description: `${style.tagline}`,
      layout: style.layout,
      galleryStyle: style.galleryStyle,
      defaultTheme,
      defaultData
    });
  });
});

export const getTemplatesByNicho = (nichoId: NichoId): TemplateDefinition[] => {
  return ALL_TEMPLATES.filter((t) => t.nichoId === nichoId);
};

export const getTemplateById = (id: string): TemplateDefinition | undefined => {
  const direct = ALL_TEMPLATES.find((t) => t.id === id);
  if (direct) return direct;

  // Backward compatibility: If an old project had an ID like "01-barbearia-08" or "01-barbearia-06":
  const match = id.match(/^(.*)-(\d+)$/);
  if (match) {
    const nichoPart = match[1] as NichoId;
    const oldNum = parseInt(match[2], 10);
    const mappedIndex = ((oldNum - 1) % 5) + 1;
    const mappedKey = `0${mappedIndex}`;
    const fallbackTemplate = ALL_TEMPLATES.find((t) => t.id === `${nichoPart}-${mappedKey}`);
    if (fallbackTemplate) return fallbackTemplate;
  }

  return ALL_TEMPLATES[0];
};
