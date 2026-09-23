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
    layout: 'cinematic',
    serviceLayout: 'cards',
    galleryStyle: 'masonry',
    fontCategory: 'MODERNA',
    socialIconStyle: 'glass',
    styleName: 'Cinematic Hero',
    tagline: 'Logo protagonista, fotografia com atmosfera de cinema e alta presença.',
    description: 'Visual cinematográfico com logo central solto, contrastes nobres e seções reveladas com elegância.'
  },
  {
    index: 2,
    layout: 'minimal',
    serviceLayout: 'minimal-list',
    galleryStyle: 'horizontal-scroll',
    fontCategory: 'MINIMAL',
    socialIconStyle: 'outline',
    styleName: 'Clean Branco Minimalista',
    tagline: 'Fundo 100% branco luminoso, tipografia discreta e espaço negativo generoso.',
    description: 'Visual diurno e silencioso com logo em respiro amplo, ausência de ruídos e detalhes discretos.'
  },
  {
    index: 3,
    layout: 'editorial',
    serviceLayout: 'editorial',
    galleryStyle: 'editorial',
    fontCategory: 'EDITORIAL',
    socialIconStyle: 'minimal',
    styleName: 'Revista Editorial Masculina',
    tagline: 'Estilo revista de alta costura com tipografia serif display e espaço visual.',
    description: 'Diagramação assimétrica, títulos imponentes e serviços apresentados como palavras grandes sem cards.'
  },
  {
    index: 4,
    layout: 'classic-club',
    serviceLayout: 'accordion',
    galleryStyle: 'cards',
    fontCategory: 'ELEGANTE',
    socialIconStyle: 'outline',
    styleName: 'Vintage Barbershop Clássico',
    tagline: 'Marrom couro escuro, detalhes em ouro e mogno, rituais clássicos e carimbo tradicional.',
    description: 'Atmosfera vintage de clube clássico com carimbo de tradição, rituais de toalha quente e acabamento nobre.'
  },
  {
    index: 5,
    layout: 'brutalist',
    serviceLayout: 'minimal-list',
    galleryStyle: 'collage',
    fontCategory: 'BOLD',
    socialIconStyle: '3d',
    styleName: 'Urbano Brutalista',
    tagline: 'Tipografia de impacto, cantos retos 0px, numeração técnica [01] e visual industrial.',
    description: 'Estética industrial de alta presença com blocos marcantes, bordas fortes e alto contraste.'
  },
  {
    index: 6,
    layout: 'authority',
    serviceLayout: 'cards',
    galleryStyle: 'single',
    fontCategory: 'BOLD',
    socialIconStyle: 'glow',
    styleName: 'Mestre Barbeiro Autoridade',
    tagline: 'Foco no profissional com foto de estúdio recortada, fade degradê e credenciais VIP.',
    description: 'Composição de autoridade inspirada em profissionais de elite com selos de credibilidade e agendamento de cadeira VIP.'
  },
  {
    index: 7,
    layout: 'compact-profile',
    serviceLayout: 'cards',
    galleryStyle: 'grid',
    fontCategory: 'MODERNA',
    socialIconStyle: '3d',
    styleName: 'Perfil Premium Compacto',
    tagline: 'Biosite compacto de alta conversão com botões de ação empilhados e status ao vivo.',
    description: 'Link-in-bio ultra refinado com microinterações rápidas, avaliação Google 5.0 e rotas diretas.'
  },
  {
    index: 8,
    layout: 'bento',
    serviceLayout: 'cards',
    galleryStyle: 'bento',
    fontCategory: 'MODERNA',
    socialIconStyle: 'glass',
    styleName: 'Modern Bento Grid',
    tagline: 'Composição modular em blocos assimétricos dinâmicos (2x2, 1x2, 1x1, 2x1).',
    description: 'Grid inteligente de alta precisão que reúne status ao vivo, avaliações 5.0, serviços e localização.'
  },
  {
    index: 9,
    layout: 'storytelling',
    serviceLayout: 'timeline',
    galleryStyle: 'cards',
    fontCategory: 'ELEGANTE',
    socialIconStyle: 'glass',
    styleName: 'Storytelling Narrativo',
    tagline: 'Jornada cronológica com apresentação, capítulos narrativos e timeline da lâmina.',
    description: 'Composição narrativa inspirada na arte da barbearia com linha do tempo sequencial e capítulos.'
  },
  {
    index: 10,
    layout: 'immersive',
    serviceLayout: 'editorial',
    galleryStyle: 'carousel',
    fontCategory: 'ELEGANTE',
    socialIconStyle: '3d',
    styleName: 'Experiência Imersiva Carrossel',
    tagline: 'Hero com carrossel de fotos automático, autoplay 3s e card flutuante VIP.',
    description: 'Apresentação imersiva cinematográfica com troca automática de fotografias e transições fluidas.'
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
  }
};

// Distinct color palettes per model & niche (Dark, Light, Cream, Pastel, Brutalist, Jewel tones)
function getNicheModelTheme(nichoId: string, modelIndex: number, primaryAccent: string, secondaryAccent: string) {
  switch (modelIndex) {
    case 1: // Cinematic Hero (Deep Cinematic Contrast)
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

    case 2: // Clean Branco Minimalista (100% Pure White, Hairline dividers)
      return {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        text: '#0F172A',
        textMuted: '#64748B',
        border: 'rgba(15, 23, 42, 0.08)',
        primary: primaryAccent || '#0F172A',
        secondary: '#334155',
        accent: '#D97706'
      };

    case 3: // Revista Editorial Masculina (Ivory / Off-White / Cream)
      if (nichoId === 'manicure') {
        return {
          background: '#FDF6F0',
          surface: '#FFFFFF',
          text: '#2A171F',
          textMuted: '#785A65',
          border: 'rgba(42, 23, 31, 0.12)',
          primary: '#831843',
          secondary: '#BE185D',
          accent: '#DB2777'
        };
      } else if (nichoId === 'confeitaria') {
        return {
          background: '#FCF8F2',
          surface: '#FFFFFF',
          text: '#29180E',
          textMuted: '#7C6757',
          border: 'rgba(41, 24, 14, 0.12)',
          primary: '#78350F',
          secondary: '#B45309',
          accent: '#D97706'
        };
      } else {
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
      }

    case 4: // Vintage Barbershop Clássico (Dark Leather, Mahogany, Aged Gold)
      return {
        background: '#160E0A',
        surface: '#221610',
        text: '#FDFBF7',
        textMuted: '#C9B5A3',
        border: '#3F281B',
        primary: '#D4AF37',
        secondary: '#B48A14',
        accent: '#F3E5AB'
      };

    case 5: // Urbano Brutalista (Industrial Concrete, Sharp Contrast)
      return {
        background: '#121214',
        surface: '#1B1B1F',
        text: '#FFFFFF',
        textMuted: '#A1A1AA',
        border: 'rgba(255, 255, 255, 0.2)',
        primary: '#EF4444',
        secondary: '#FFFFFF',
        accent: '#FDE047'
      };

    case 6: // Mestre Barbeiro Autoridade (Deep Studio Navy / Graphite, Cyan/Amber)
      return {
        background: '#080C14',
        surface: '#101624',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.12)',
        primary: '#38BDF8',
        secondary: '#0284C7',
        accent: '#F59E0B'
      };

    case 7: // Perfil Premium Compacto (Graphite Slate, Pure Gold)
      return {
        background: '#090A0F',
        surface: '#12141D',
        text: '#FFFFFF',
        textMuted: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.12)',
        primary: primaryAccent || '#D97706',
        secondary: secondaryAccent || '#B45309',
        accent: '#F59E0B'
      };

    case 8: // Modern Bento Grid (Asymmetric Modular, Graphite)
      return {
        background: '#0E1015',
        surface: '#181A22',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        border: 'rgba(255, 255, 255, 0.12)',
        primary: primaryAccent || '#38BDF8',
        secondary: secondaryAccent || '#0284C7',
        accent: '#F59E0B'
      };

    case 9: // Storytelling Narrativo (Dark Espresso, Warm Amber)
      return {
        background: '#140D08',
        surface: '#1F150E',
        text: '#FDFBF7',
        textMuted: '#D7C2B2',
        border: '#3D2214',
        primary: '#D97706',
        secondary: '#F59E0B',
        accent: '#FDE68A'
      };

    case 10: // Experiência Imersiva Carrossel (Onyx & 24K Gold)
    default:
      return {
        background: '#050608',
        surface: '#0E1018',
        text: '#FFFDF5',
        textMuted: '#CBD5E1',
        border: 'rgba(234, 179, 8, 0.3)',
        primary: '#EAB308',
        secondary: '#CA8A04',
        accent: '#FDE047'
      };
  }
}

// Generates 100 complete, distinct, authentic templates (10 niches × 10 experiences)
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
      fontHeading: style.fontCategory === 'EDITORIAL' ? 'Bodoni Moda' : style.fontCategory === 'ELEGANTE' ? 'Playfair Display' : 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    };

    // Services for this template (NO PRICES, realistic descriptions & tailored CTA)
    const services = domain.specialties.map((s, sIdx) => ({
      id: `svc_${templateId}_${sIdx}`,
      name: s.name,
      description: s.description,
      iconName: s.iconName,
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

    const isNoPhotoModel = templateIndex === 6;
    const isEditorialModel = templateIndex === 2;

    const defaultData: TemplateDefinition['defaultData'] = {
      nicho: nicho.id,
      templateId,
      layout: style.layout,
      nome: brandName,
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
        subtitle: 'Atendimento com Hora Marcada e WhatsApp Direto',
        description: about,
        about,
        logoUrl: domain.photos[0],
        avatarUrl: isNoPhotoModel ? '' : domain.photos[1],
        bannerUrl: isNoPhotoModel ? '' : domain.photos[0]
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
  return ALL_TEMPLATES.find((t) => t.id === id);
};
