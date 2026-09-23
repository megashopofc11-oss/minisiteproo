import { NichoInfo, NichoId, TemplateDefinition, ProjectData, TemplateLayout, GalleryStyle, FontCategory, SocialIconStyle } from '../types';

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
    badge: '10 MODELOS EXCLUSIVOS',
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
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'Elegância, brilho e valorização máxima do seu trabalho nas unhas.',
    coverImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Esmalte e Cristal 3D', 'Tabela de Procedimentos', 'Fotos em Alta Resolução', 'Status Aberto/Fechado']
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
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'O requinte de um salão de alta costura na palma da mão da sua cliente.',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Tesoura Régia 3D', 'Cardápio de Mechas', 'Experiência Noiva', 'Avaliações Estreladas']
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
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'Desperte o apetite imediato com imagens quentes e cardápio interativo.',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Fatia Forno a Lenha 3D', 'Cardápio com Preços', 'Pedido WhatsApp Direto', 'Horário de Fornada']
  },
  {
    id: '05-boutique',
    number: '05',
    name: 'Boutique & Moda',
    subtitle: 'Moda feminina, alfaiataria, streetwear e coleções exclusivas',
    description: 'Preto de passarela, branco puro e reflexos de prata. Visual de lookbook de alta costura com visual clean e contemporâneo.',
    iconName: 'shoppingbag',
    vibe: 'Preto + Branco + Prata Editorial',
    accentColor: '#A855F7',
    secondaryColor: '#7E22CE',
    accentGlow: 'rgba(168, 85, 247, 0.4)',
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'Sua marca com a imponência visual das maiores grifes do mundo.',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Sacola de Luxo 3D', 'Vitrine de Looks', 'Links de Catálogo', 'Botão de Compra Rápida']
  },
  {
    id: '06-corretor',
    number: '06',
    name: 'Corretor de Imóveis',
    subtitle: 'Imóveis de alto padrão, coberturas e lançamentos',
    description: 'Azul safira profundo, ouro e detalhes de prata. Arquitetura moderna, solidez corporativa e agendamento de visitas VIP.',
    iconName: 'building',
    vibe: 'Azul Profundo + Dourado + Arquitetura',
    accentColor: '#3B82F6',
    secondaryColor: '#1D4ED8',
    accentGlow: 'rgba(59, 130, 246, 0.4)',
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'A autoridade e a exclusividade que imóveis milionários exigem.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Cobertura & Chave 3D', 'Galeria de Plantas e Fotos', 'Agendamento de Visita', 'Localização Privilegiada']
  },
  {
    id: '07-personal',
    number: '07',
    name: 'Personal Trainer',
    subtitle: 'Consultoria fitness, emagrecimento e alta performance',
    description: 'Preto carvão, laranja neon e verde elétrico. Energia de campeonato, foco em resultados, planos de treino e evolução.',
    iconName: 'dumbbell',
    vibe: 'Preto + Laranja / Neon Esportivo',
    accentColor: '#10B981',
    secondaryColor: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'Transmita força, profissionalismo e conquiste novos alunos em minutos.',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Halter Pro 3D', 'Planos de Treino', 'Antes & Depois', 'Inscrição WhatsApp']
  },
  {
    id: '08-motorista',
    number: '08',
    name: 'Motorista Particular & VIP',
    subtitle: 'Transporte executivo, viagens, eventos e traslados',
    description: 'Preto fosco, azul noturno e cromado reluzente. Segurança máxima, pontualidade, atendimento bilíngue e conforto executivo.',
    iconName: 'car',
    vibe: 'Preto + Azul Metálico + Cromado Executivo',
    accentColor: '#0EA5E9',
    secondaryColor: '#0369A1',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'A presença premium de um serviço de transporte de primeira classe.',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Sedã Executivo 3D', 'Calculadora de Trajeto', 'Agendamento de Viagem', 'Frota Blindada e Conforto']
  },
  {
    id: '09-mecanica',
    number: '09',
    name: 'Mecânica & Centro Automotivo',
    subtitle: 'Revisão automotiva, injeção, freios e estética veicular',
    description: 'Grafite escovado, aço industrial e vermelho chama. Visual de oficina de ponta e equipe especializada em alta tecnologia veicular.',
    iconName: 'wrench',
    vibe: 'Grafite + Aço + Laranja Industrial',
    accentColor: '#F97316',
    secondaryColor: '#C2410C',
    accentGlow: 'rgba(249, 115, 22, 0.4)',
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'Confiança mecânica traduzida em um design moderno e de alta precisão.',
    coverImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Engrenagem de Aço 3D', 'Checkup & Revisão', 'Orçamento Automático', 'Localização com Rota']
  },
  {
    id: '10-confeitaria',
    number: '10',
    name: 'Confeitaria & Bolos Nobres',
    subtitle: 'Bolos decorados, brigadeiros gourmet e doces finos',
    description: 'Chocolate nobre, creme aveludado e tons de ouro e rosé. Luxo artesanal açucarado que transforma visitantes em encomendas.',
    iconName: 'cake',
    vibe: 'Chocolate + Creme + Rosa / Dourado',
    accentColor: '#F43F5E',
    secondaryColor: '#BE123C',
    accentGlow: 'rgba(244, 63, 94, 0.4)',
    badge: '10 MODELOS EXCLUSIVOS',
    tagline: 'A doçura artesanal com requinte de alta gastronomia e encomendas fáceis.',
    coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    highlights: ['Bolo Régio 3D', 'Cardápio de Encomendas', 'Galeria de Doces', 'Depoimentos de Clientes']
  }
];

// As 10 Direções de Design Solicitadas (10 Experiências Únicas)
export const MODEL_EXPERIENCES: Array<{
  index: number;
  key: string;
  name: string;
  layout: TemplateLayout;
  galleryStyle: GalleryStyle;
  fontCategory: FontCategory;
  socialIconStyle: SocialIconStyle;
  description: string;
}> = [
  {
    index: 1,
    key: '01',
    name: 'Cinematic Luxury',
    layout: 'cinematic-luxury',
    galleryStyle: 'editorial',
    fontCategory: 'ELEGANTE',
    socialIconStyle: 'glow',
    description: 'Hero cinematográfico com iluminação dramática, tipografia nobre e profundidade visual máxima.'
  },
  {
    index: 2,
    key: '02',
    name: 'Glass Premium',
    layout: 'glass-premium',
    galleryStyle: 'cards',
    fontCategory: 'MODERNA',
    socialIconStyle: 'glass',
    description: 'Transparências refinadas, desfoque de fundo em camadas e contornos luminosos sutis.'
  },
  {
    index: 3,
    key: '03',
    name: 'Editorial Magazine',
    layout: 'editorial',
    galleryStyle: 'masonry',
    fontCategory: 'EDITORIAL',
    socialIconStyle: 'minimal',
    description: 'Estética de revista de alta costura com diagramação assimétrica e tipografia elegante.'
  },
  {
    index: 4,
    key: '04',
    name: '3D Glow Experience',
    layout: '3d-glow',
    galleryStyle: 'collage',
    fontCategory: 'BOLD',
    socialIconStyle: '3d',
    description: 'Elementos em alto relevo tridimensional com reflexos luminosos e badges flutuantes.'
  },
  {
    index: 5,
    key: '05',
    name: 'Minimal Luxury',
    layout: 'minimal-luxury',
    galleryStyle: 'horizontal-scroll',
    fontCategory: 'MINIMAL',
    socialIconStyle: 'outline',
    description: 'Espaço negativo sofisticado, contraste monocromático refinado e foco absoluto no produto.'
  },
  {
    index: 6,
    key: '06',
    name: 'Dark Experience',
    layout: 'dark-experience',
    galleryStyle: 'overlap',
    fontCategory: 'BOLD',
    socialIconStyle: 'glow',
    description: 'Fundo preto absoluto com pontos de luz direcionados e cartões de forte presença visual.'
  },
  {
    index: 7,
    key: '07',
    name: 'Immersive Photo',
    layout: 'immersive-photo',
    galleryStyle: 'full-width',
    fontCategory: 'MODERNA',
    socialIconStyle: 'glass',
    description: 'Fotografia protagonista de ponta a ponta com overlays graduais e atmosfera envolvente.'
  },
  {
    index: 8,
    key: '08',
    name: 'Modern Cards',
    layout: 'modern-cards',
    galleryStyle: 'cards',
    fontCategory: 'MODERNA',
    socialIconStyle: 'original',
    description: 'Diagramação no estilo bento box contemporâneo com cartões modulares e microinterações.'
  },
  {
    index: 9,
    key: '09',
    name: 'Neon Motion',
    layout: 'neon-motion',
    galleryStyle: 'carousel',
    fontCategory: 'ESPORTIVA',
    socialIconStyle: 'glow',
    description: 'Cores vibrantes sobre fundo escuro com alta energia, movimento e dinamismo esportivo.'
  },
  {
    index: 10,
    key: '10',
    name: 'Signature Exclusive',
    layout: 'signature',
    galleryStyle: 'editorial',
    fontCategory: 'ELEGANTE',
    socialIconStyle: '3d',
    description: 'Visual exclusivo de assinatura com selo de garantia, elementos dourados e acabamento de alfaiataria.'
  }
];

interface NichoTemplateBlueprint {
  names: string[];
  slogans: string[];
  titles: string[];
  sampleServices: Array<{ name: string; desc: string; price: string; icon: string }>;
  samplePhotos: string[];
  hours: string;
  address: string;
}

const NICHO_BLUEPRINTS: Record<NichoId, NichoTemplateBlueprint> = {
  '01-barbearia': {
    names: [
      'The Royal Razor Club',
      'Black Vintage Barber',
      'Iron & Comb Streetwear',
      'Gentleman Society Lounge',
      'Monarch Grooming Studio',
      'Fade Master Pro Studio',
      'Bourbon & Blade Barbershop',
      'Urban Viking Shave Club',
      'Executive Grooming Experience',
      'The Heritage Cut & Shave'
    ],
    slogans: [
      'Onde a tradição secular encontra a excelência contemporânea.',
      'Cortes de alta precisão para homens que não negociam padrão.',
      'Sua imagem é o seu cartão de visitas mais valioso.'
    ],
    titles: ['Barbearia Tradicional & Lounge', 'Mestres do Fade & Navalha', 'Clube de Cavalheiros'],
    sampleServices: [
      { name: 'Corte Degradê na Tesoura & Máquina', desc: 'Acabamento milimétrico, lavagem com shampoo mentolado e finalização com pomada matte.', price: 'R$ 75,00', icon: 'scissors' },
      { name: 'Barboterapia com Toalha Quente', desc: 'Vapor de ozônio, hidratação com óleos nobres, massagem facial e navalha afiada.', price: 'R$ 60,00', icon: 'crown' },
      { name: 'Experiência Completa (Cabelo + Barba + Bebida)', desc: 'Corte completo, barboterapia, alinhamento de sobrancelha e drink de cortesia.', price: 'R$ 125,00', icon: 'award' },
      { name: 'Selagem Térmica & Pigmentação Barba', desc: 'Alinhamento dos fios rebeldes e definição nítida do contorno facial.', price: 'R$ 85,00', icon: 'sparkles' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 09:00 às 20:00 • Domingo: Fechado',
    address: 'Av. Paulista, 1500 — Jardins, São Paulo - SP'
  },

  '02-manicure': {
    names: [
      'Lumière Nail Studio',
      'Velvet Pink Gel Bar',
      'Nude Elegance Designer',
      'Diamond Gloss Nail Art',
      'Chic & Shine Atelier',
      'Rose Gold Nail Lounge',
      'Modern Frenchie Studio',
      'Opulence Nail Designer',
      'Glow & Glam Nail Boutique',
      'Haute Manicure Haute Couture'
    ],
    slogans: [
      'Unhas perfeitas com técnica impecável e durabilidade prolongada.',
      'O luxo e o cuidado que as suas mãos merecem todos os dias.',
      'Sua auto-estima elevada através de detalhes encantadores.'
    ],
    titles: ['Atelier de Nail Design', 'Alongamento em Gel & Esmaltação', 'Unhas de Alto Padrão'],
    sampleServices: [
      { name: 'Alongamento em Fibra de Vidro Slim', desc: 'Curvatura natural e estrutura ultrafina com acabamento imperceptível.', price: 'R$ 180,00', icon: 'sparkles' },
      { name: 'Blindagem Diamante com Esmaltação em Gel', desc: 'Brilho espelhado que não descasca e dura mais de 20 dias.', price: 'R$ 95,00', icon: 'award' },
      { name: 'Nail Art Minimalista / Francesa Reversa', desc: 'Arte exclusiva desenhada à mão por profissionais renomadas.', price: 'R$ 60,00', icon: 'heart' },
      { name: 'Manicure & Pedicure Spa dos Pés', desc: 'Esfoliação revigorante, hidratação profunda e cutilagem russa.', price: 'R$ 110,00', icon: 'star' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Sábado: 09:00 às 19:00 • Domingo e Segunda: Fechado',
    address: 'Rua Oscar Freire, 820 — Cerqueira César, São Paulo - SP'
  },

  '03-salao': {
    names: [
      'Maison de Beauté',
      'Aura Golden Hair Studio',
      'L’Éclat Salão & Spa',
      'Blonde & Brunette Concept',
      'Royal Velvet Beauty',
      'Couture Hair & Makeup',
      'Lumiar Salão Internacional',
      'Studio Diamond Coiffure',
      'Splendore Noivas & Cabelos',
      'Essência Pura Hair Lounge'
    ],
    slogans: [
      'Transformações que revelam a sua beleza mais autêntica e radiante.',
      'Especialistas em mechas iluminadas, saúde capilar e dia da noiva.',
      'Mais que um salão: um refúgio de sofisticação e bem-estar.'
    ],
    titles: ['Salão Conceito & Spa', 'Hair Stylist & Colorimetria', 'Beleza de Alto Padrão'],
    sampleServices: [
      { name: 'Morena Iluminada / Mechas Sombré', desc: 'Tons quentes de avelã e caramelo com transição suave e brilho espelhado.', price: 'R$ 380,00', icon: 'crown' },
      { name: 'Loiro Champagne com Tratamento Kérastase', desc: 'Descoloração segura com proteção capilar e matização personalizada.', price: 'R$ 520,00', icon: 'sparkles' },
      { name: 'Corte Visagista & Escova Modelada', desc: 'Design de corte que valoriza os traços do seu rosto com movimento natural.', price: 'R$ 160,00', icon: 'scissors' },
      { name: 'Pacote Dia da Noiva Real', desc: 'Produção completa de maquiagem, penteado, massagem relaxante e champanhe.', price: 'R$ 1.450,00', icon: 'award' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Sábado: 09:00 às 20:00 • Domingo: Fechado',
    address: 'Av. Brigadeiro Faria Lima, 2232 — Itaim Bibi, São Paulo - SP'
  },

  '04-pizzaria': {
    names: [
      'Don Corleone Forno a Lenha',
      'Bella Napoli Pizza Napolitana',
      'Fire & Crust Artisan Pizzas',
      'Il Padrino Forneria Rústica',
      'La Famiglia Trattoria & Pizza',
      'Veneza Forneria Gourmet',
      'San Gennaro Pizza Bar',
      'Osteria del Forno 1889',
      'Bravíssimo Pizzaria Express',
      'Rosso Pomodoro Trattoria'
    ],
    slogans: [
      'Fermentação natural de 48 horas, farinha italiana e o calor da lenha.',
      'A verdadeira pizza napolitana no coração da sua noite.',
      'Sabor que une tradição, crocância e ingredientes selecionados.'
    ],
    titles: ['Pizzaria & Forneria Artesanal', 'Pizza Napolitana ao Forno a Lenha', 'Gastronomia Italiana'],
    sampleServices: [
      { name: 'Pizza Margherita DOC Napolitana', desc: 'Molho pomodoro San Marzano, mozzarella de búfala, manjericão fresco e azeite extravirgem.', price: 'R$ 68,00', icon: 'pizza' },
      { name: 'Pizza Parma Real com Rúcula & Burrata', desc: 'Presunto de Parma maturado 24 meses, burrata cremosa e redução de balsâmico.', price: 'R$ 88,00', icon: 'award' },
      { name: 'Pizza Diavola Especial (Calabresa Picante)', desc: 'Salame picante artesanal, queijo fior di latte e toque de mel silvestre picante.', price: 'R$ 74,00', icon: 'flame' },
      { name: 'Pizza Doce Nutella com Morangos Frescos', desc: 'Massa crocante assada ao forno com Nutella pura, lâminas de morango e castanhas.', price: 'R$ 56,00', icon: 'heart' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Todos os dias: 18:00 às 23:30 • Sexta e Sábado até 00:30',
    address: 'Rua Treze de Maio, 940 — Bela Vista, São Paulo - SP'
  },

  '05-boutique': {
    names: [
      'Atelier Privé Boutique',
      'Maison Blanche Fashion',
      'Velvet Noir Concept Store',
      'Aura Chic Moda & Acessórios',
      'The Urban Lookbook',
      'Silk & Cotton Moda Feminina',
      'Haute Streetwear Studio',
      'L’Élégance Closet',
      'Monochrome Fashion Studio',
      'Signature Glamour Boutique'
    ],
    slogans: [
      'Peças exclusivas de alta alfaiataria e moda contemporânea.',
      'Vista a sua melhor versão com elegância atemporal.',
      'Curadoria refinada de tecidos nobres e caimento impecável.'
    ],
    titles: ['Boutique de Moda & Estilo', 'Alta Costura & Alfaiataria', 'Concept Store Feminina'],
    sampleServices: [
      { name: 'Conjunto Alfaiataria Linho Nobre', desc: 'Blazer estruturado com calça reta de corte impecável em linho 100% puro.', price: 'R$ 490,00', icon: 'shoppingbag' },
      { name: 'Vestido Midi Seda com Decote Degagê', desc: 'Fluidez elegante com acabamento invisível para festas e jantares sofisticados.', price: 'R$ 380,00', icon: 'sparkles' },
      { name: 'Consultoria de Estilo & Colorimetria', desc: 'Sessão individual com stylist para montagem de looks inteligentes.', price: 'R$ 250,00', icon: 'award' },
      { name: 'Bolsa Estruturada em Couro Bovino', desc: 'Design geométrico com fecho banhado a ouro e forro aveludado.', price: 'R$ 320,00', icon: 'heart' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sábado: 10:00 às 20:00 • Domingo: 14:00 às 19:00',
    address: 'Shopping Cidade Jardim, Piso 2 — Morumbi, São Paulo - SP'
  },

  '06-corretor': {
    names: [
      'Prime Skyline Imóveis de Luxo',
      'Horizonte Real Estate VIP',
      'Apex Mansões & Coberturas',
      'Golden Key Consultoria Imobiliária',
      'Metropolitan Investimentos Imobiliários',
      'The Penthouse Collection',
      'Magnata Imóveis Alto Padrão',
      'Veritas Imobiliária & Incorporações',
      'Prestige Private Broker',
      'Terra Magna Fazendas & Mansões'
    ],
    slogans: [
      'Conectamos investidores aos imóveis mais extraordinários do país.',
      'Segurança jurídica, discrição e acesso aos lançamentos mais cobiçados.',
      'O endereço dos seus sonhos com consultoria patrimonial completa.'
    ],
    titles: ['Consultor de Imóveis de Luxo', 'Mansões, Coberturas & Lançamentos', 'Real Estate VIP Broker'],
    sampleServices: [
      { name: 'Cobertura Duplex com Piscina Aquecida', desc: '4 suítes, 600m² privativos, vista panorâmica 360° para o parque.', price: 'R$ 8.900.000', icon: 'building' },
      { name: 'Mansão em Condomínio Fechado Alpha', desc: 'Arquitetura biofílica contemporânea com energia solar e automação completa.', price: 'R$ 5.400.000', icon: 'home' },
      { name: 'Studio Premium para Renda de Locação', desc: 'Pronto para morar com alta taxa de rentabilidade na Faria Lima.', price: 'R$ 890.000', icon: 'award' },
      { name: 'Consultoria de Avaliação e Perícia', desc: 'Laudo técnico oficial de mercado para compra, venda ou inventário.', price: 'Sob Consulta', icon: 'shield' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Atendimento sob agendamento prévio • 08:00 às 21:00',
    address: 'Av. Pres. Juscelino Kubitschek, 1909 — Vila Nova Conceição, SP'
  },

  '07-personal': {
    names: [
      'Titan Performance Coach',
      'Iron Will Consultoria Fitness',
      'Apex Bodybuilding & Health',
      'Vortex Treinamento Funcional',
      'Velocity High Performance',
      'Alpha Shape Consultoria Online',
      'Elite Fitness & Emagrecimento',
      'Spartan Strength Lab',
      'BioForce Personal Trainer',
      'Black Diamond Coach'
    ],
    slogans: [
      'Resultados sólidos através de ciência do exercício e disciplina diária.',
      'Treinos personalizados para emagrecimento, hipertrofia e longevidade.',
      'Sua melhor versão física e mental começa no próximo treino.'
    ],
    titles: ['Personal Trainer & Preparador Físico', 'Consultoria Fitness Online & Presencial', 'Alta Performance & Saúde'],
    sampleServices: [
      { name: 'Consultoria Online Completa (Treino + Dieta)', desc: 'Planilha personalizada no app, vídeos explicativos e suporte 24h via WhatsApp.', price: 'R$ 290,00/mês', icon: 'dumbbell' },
      { name: 'Acompanhamento Presencial VIP (3x por semana)', desc: 'Correção biomecânica em tempo real, periodização e motivação contínua.', price: 'R$ 950,00/mês', icon: 'award' },
      { name: 'Protocolo de Emagrecimento Rápido 60 Dias', desc: 'Metodologia exclusiva de queima calórica com preservação de massa magra.', price: 'R$ 480,00', icon: 'flame' },
      { name: 'Avaliação Física por Bioimpedância', desc: 'Análise detalhada de composição corporal, gordura visceral e metabolismo basal.', price: 'R$ 150,00', icon: 'sparkles' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sexta: 06:00 às 21:00 • Sábado: 08:00 às 13:00',
    address: 'Atendimento nas principais academias de SP ou Studio Privado'
  },

  '08-motorista': {
    names: [
      'Black Chauffeur Transporte Executivo',
      'Royal Ride Traslados VIP',
      'Apex Private Driver',
      'Diplomat Executive Mobility',
      'Prime Car Viagens & Eventos',
      'Monarch Driver Corporativo',
      'Vip Shuttle Transfer Aeroporto',
      'Signature Limousine Experience',
      'Safe Way Motorista Particular',
      'Elite Executive Mobility'
    ],
    slogans: [
      'Pontualidade britânica, discrição absoluta e veículos blindados de luxo.',
      'Viagens corporativas e traslados para quem valoriza seu tempo e segurança.',
      'A mais alta classe em transporte privativo com motorista bilíngue.'
    ],
    titles: ['Motorista Particular & Traslado VIP', 'Transporte Executivo de Luxo', 'Mobilidade Corporativa Privativa'],
    sampleServices: [
      { name: 'Traslado Executivo Aeroporto (Guarulhos / Congonhas)', desc: 'Recepção com placa nominal no desembarque, água e Wi-Fi a bordo.', price: 'R$ 250,00', icon: 'car' },
      { name: 'Diária Corporativa Completa (Até 10 Horas)', desc: 'Sedã de luxo blindado à disposição com motorista executivo trajado.', price: 'R$ 980,00', icon: 'award' },
      { name: 'Transporte para Eventos & Casamentos', desc: 'Chegada triunfal com motorista uniformizado e atendimento VIP.', price: 'R$ 650,00', icon: 'crown' },
      { name: 'Viagens Interestaduais Privativas', desc: 'Conforto total para viagens em rodovia com máxima segurança e tranquilidade.', price: 'Sob Consulta', icon: 'map' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Disponibilidade 24 horas por dia com agendamento prévio',
    address: 'Atendimento em toda a Grande São Paulo e Regiões Metropolitanas'
  },

  '09-mecanica': {
    names: [
      'Precision Car Mecânica & Performance',
      'Iron Engine Centro Automotivo',
      'Apex Motors Revisão de Precisão',
      'Vortice Automecânica & Injeção',
      'Master Tech Oficina Especializada',
      'Titanium Oficina Premium',
      'Speedway Mecânica Geral',
      'Autocenter Formula 1',
      'Torque & Pistão Mecânica',
      'Garage 99 Racing & Estética'
    ],
    slogans: [
      'Diagnóstico computadorizado de ponta com garantia total de serviços.',
      'Sua segurança e a integridade do seu veículo em mãos especializadas.',
      'Mais de 15 anos de excelência em mecânica nacional e importada.'
    ],
    titles: ['Centro Automotivo de Alta Precisão', 'Mecânica Geral, Freios & Injeção', 'Especialistas em Importados'],
    sampleServices: [
      { name: 'Revisão Preventiva Completa (40 Itens)', desc: 'Checagem de suspensão, freios, fluidos, correias e scanner de injeção eletrônica.', price: 'R$ 280,00', icon: 'wrench' },
      { name: 'Troca de Óleo Sintético com Filtros Originais', desc: 'Óleo de especificação do fabricante para máxima vida útil do motor.', price: 'R$ 220,00', icon: 'award' },
      { name: 'Alinhamento 3D Computadorizado & Balanceamento', desc: 'Elimina trepidações e garante desgaste uniforme dos pneus.', price: 'R$ 130,00', icon: 'shield' },
      { name: 'Higienização de Ar Condicionado com Ozônio', desc: 'Eliminação total de bactérias, ácaros e odores desagradáveis no habitáculo.', price: 'R$ 120,00', icon: 'sparkles' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Segunda a Sexta: 08:00 às 18:00 • Sábado: 08:00 às 13:00',
    address: 'Av. Engenheiro Caetano Álvares, 4500 — Santana, São Paulo - SP'
  },

  '10-confeitaria': {
    names: [
      'Maison du Chocolat & Bolos',
      'Fleur de Sucre Confeitaria Nobre',
      'Velvet Cake Doces & Festas',
      'L’Amour Atelier de Doces Finos',
      'Dulce Amore Confeitaria Gourmet',
      'Bolo Real Confeitaria Artesanal',
      'Sweet Symphony Pâtisserie',
      'Brigaderia & Café Parisiense',
      'Chantilly & Caramelo Studio',
      'Sublime Bolo & Sobremesas'
    ],
    slogans: [
      'Bolos e doces artesanais que transformam qualquer momento em celebração.',
      'Ingredientes nobres, chocolate belga e muito amor em cada detalhe.',
      'Sua festa inesquecível com o sabor da verdadeira confeitaria afetiva.'
    ],
    titles: ['Confeitaria Fina & Bolos Decorados', 'Doces Artesanais & Pâtisserie', 'Bolos Festivos & Sobremesas'],
    sampleServices: [
      { name: 'Bolo Festivo Decorado Red Velvet com Frutas Vermelhas', desc: 'Massa aveludada, recheio de cream cheese frosting e morangos frescos.', price: 'R$ 140,00/kg', icon: 'cake' },
      { name: 'Bolo de Chocolate Belga com Brigadeiro Brûlée', desc: 'Massa úmida 70% cacau com brigadeiro crocante maçaricado.', price: 'R$ 130,00/kg', icon: 'award' },
      { name: 'Cento de Brigadeiros Gourmet Sortidos', desc: 'Pistache, Ninho com Nutella, Meio Amargo belga e Caramelo Flor de Sal.', price: 'R$ 160,00', icon: 'heart' },
      { name: 'Caixa Degustação para Noivas & Aniversários', desc: '6 mini fatias de sabores clássicos para escolha do cardápio do seu evento.', price: 'R$ 65,00', icon: 'sparkles' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80'
    ],
    hours: 'Terça a Sábado: 09:30 às 19:00 • Domingo: 10:00 às 16:00',
    address: 'Rua Harmonia, 321 — Vila Madalena, São Paulo - SP'
  }
};

// Gerador Oficial dos 100 Templates Únicos e Completos
export const ALL_TEMPLATES: TemplateDefinition[] = [];

NICHOS_LIST.forEach((nicho) => {
  const bp = NICHO_BLUEPRINTS[nicho.id];

  MODEL_EXPERIENCES.forEach((exp, expIdx) => {
    const templateIndex = exp.index;
    const templateId = `${nicho.id}-${String(templateIndex).padStart(2, '0')}`;
    const templateName = bp.names[expIdx] || `${nicho.name} ${exp.name}`;
    const slogan = bp.slogans[expIdx % bp.slogans.length];
    const title = bp.titles[expIdx % bp.titles.length];

    // Primary & Theme Colors based on Niche and Experience
    const primary = nicho.accentColor;
    const secondary = nicho.secondaryColor || '#6B21A8';
    const accent = nicho.accentColor;

    const defaultData: Omit<ProjectData, 'projectId' | 'userId' | 'createdAt' | 'updatedAt'> = {
      nome: templateName,
      nicho: nicho.id,
      templateId,
      identity: {
        name: templateName,
        slogan,
        badge: `${nicho.badge} • ${exp.name.toUpperCase()}`,
        title,
        subtitle: slogan,
        description: `${slogan} Atendimento com hora marcada e facilidade de agendamento via WhatsApp.`,
        about: `Somos referência em ${nicho.name.toLowerCase()} com atendimento de alto padrão. Nosso compromisso é entregar uma experiência singular, aliando técnicas de ponta, produtos nobres e um atendimento exclusivo pensado em cada detalhe.`,
        logoUrl: bp.samplePhotos[0] || nicho.coverImage,
        avatarUrl: bp.samplePhotos[1] || nicho.coverImage,
        bannerUrl: nicho.coverImage
      },
      theme: {
        primary,
        secondary,
        accent,
        background: '#07080D',
        surface: '#0F121C',
        text: '#F8FAFC',
        textMuted: '#94A3B8',
        cardBg: '#131724',
        border: 'rgba(255, 255, 255, 0.1)',
        fontHeading: exp.fontCategory === 'ELEGANTE' ? 'Playfair Display' : exp.fontCategory === 'BOLD' ? 'Syne' : exp.fontCategory === 'EDITORIAL' ? 'Bodoni Moda' : 'Plus Jakarta Sans',
        fontBody: 'Plus Jakarta Sans'
      },
      photos: bp.samplePhotos.map((url, i) => ({
        id: `photo_${i + 1}`,
        url,
        caption: `Destaque do Atendimento 0${i + 1}`,
        alt: `${nicho.name} Foto 0${i + 1}`,
        position: i
      })),
      galleryStyle: exp.galleryStyle,
      services: bp.sampleServices.map((s, idx) => ({
        id: `serv_${idx + 1}`,
        name: s.name,
        description: s.desc,
        price: s.price,
        imageUrl: bp.samplePhotos[idx % bp.samplePhotos.length],
        iconName: s.icon,
        ctaText: 'Agendar pelo WhatsApp',
        featured: idx === 0 || idx === 1
      })),
      buttons: [
        {
          id: 'btn_1',
          text: 'Falar Diretamente no WhatsApp',
          url: 'https://wa.me/5511999998888',
          iconName: 'whatsapp',
          style: exp.layout.includes('3d') ? '3d' : exp.layout.includes('glow') ? 'glow' : 'solid',
          color: primary,
          size: 'lg',
          align: 'center'
        },
        {
          id: 'btn_2',
          text: 'Acompanhar no Instagram',
          url: 'https://instagram.com',
          iconName: 'instagram',
          style: 'glass',
          color: '#E1306C',
          size: 'md',
          align: 'center'
        },
        {
          id: 'btn_3',
          text: 'Como Chegar (Google Maps)',
          url: 'https://maps.google.com',
          iconName: 'map',
          style: 'outline',
          color: '#3B82F6',
          size: 'md',
          align: 'center'
        }
      ],
      socials: {
        whatsapp: {
          enabled: true,
          number: '5511999998888',
          message: `Olá! Vim pelo biosite e gostaria de saber mais informações sobre os serviços de ${nicho.name}.`,
          label: 'WhatsApp Oficial'
        },
        instagram: {
          enabled: true,
          username: `@${nicho.id.replace(/^\d+-/, '')}.oficial`,
          url: 'https://instagram.com'
        },
        tiktok: {
          enabled: true,
          username: `@${nicho.id.replace(/^\d+-/, '')}`,
          url: 'https://tiktok.com'
        },
        google: {
          enabled: true,
          url: 'https://google.com'
        },
        googleReview: {
          enabled: true,
          url: 'https://maps.google.com'
        },
        facebook: {
          enabled: false,
          url: ''
        }
      },
      location: {
        address: bp.address,
        city: 'São Paulo - SP',
        phone: '(11) 99999-8888',
        hours: bp.hours,
        mapsUrl: 'https://maps.google.com'
      },
      seo: {
        title: `${templateName} — ${nicho.name} Oficial`,
        description: `${slogan} Agende seu horário com praticidade.`,
        ogImage: nicho.coverImage,
        favicon: bp.samplePhotos[0] || nicho.coverImage
      },

      // Configurações dos Componentes Especiais
      fontCategory: exp.fontCategory,
      socialIconStyle: exp.socialIconStyle,
      sectionsOrder: ['hero', 'status', 'about', 'services', 'gallery', 'reviews', 'hours', 'location', 'socials', 'cta'],
      sectionsVisibility: {
        hero: true,
        status: true,
        about: true,
        services: true,
        gallery: true,
        reviews: true,
        hours: true,
        location: true,
        socials: true,
        cta: true
      },
      statusConfig: {
        enabled: true,
        autoCalculate: true,
        openTime: '08:00',
        closeTime: '20:00',
        customText: 'ABERTO AGORA',
        customMessage: 'Atendimento por ordem de chegada ou agendamento'
      },
      whatsappConfig: {
        enabled: true,
        number: '5511999998888',
        message: `Olá! Vim pelo biosite e gostaria de atendimento.`,
        label: 'Conversar no WhatsApp',
        style: 'floating',
        floatingPosition: 'right',
        showFloating: true
      },
      googleReviewConfig: {
        enabled: true,
        url: 'https://maps.google.com',
        rating: 5.0,
        reviewCount: 120 + (expIdx * 14),
        title: 'NOS AVALIE NO GOOGLE',
        subtitle: 'Sua opinião é fundamental para nossa contínua excelência.',
        style: 'gold'
      },
      shareConfig: {
        enabled: true,
        label: 'COMPARTILHAR BIOSITE'
      }
    };

    ALL_TEMPLATES.push({
      id: templateId,
      nichoId: nicho.id,
      index: templateIndex,
      name: templateName,
      styleName: `${exp.name} • ${nicho.name}`,
      description: `${exp.description} ${slogan}`,
      layout: exp.layout,
      galleryStyle: exp.galleryStyle,
      defaultTheme: defaultData.theme,
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

