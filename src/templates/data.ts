import { NichoInfo, NichoId, TemplateDefinition, ProjectData, TemplateLayout, GalleryStyle, ThemeConfig } from '../types';

export const NICHOS_LIST: NichoInfo[] = [
  {
    id: '01-barbearia',
    number: '01',
    name: 'Barbearia',
    subtitle: 'Cortes clássicos, navalha e barba de alto padrão',
    description: 'Estilos masculinos, urbanos, clássicos, vintage e luxo com agendamento ágil.',
    iconName: 'scissors',
    vibe: 'Masculino, Premium, Urbano, Clássico, Street, Luxo',
    accentColor: '#F59E0B',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '02-manicure',
    number: '02',
    name: 'Manicure / Nail Designer',
    subtitle: 'Unhas em gel, blindagem, nail art e sofisticação',
    description: 'Design feminino, glassmorphism, tons rosé, nude, editorial e neon glamouroso.',
    iconName: 'sparkles',
    vibe: 'Feminino, Glass, Rosa, Nude, Editorial, Neon',
    accentColor: '#EC4899',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '03-salao',
    number: '03',
    name: 'Salão de Beleza',
    subtitle: 'Cabelos, colorimetria, tratamentos e dia da noiva',
    description: 'Ambientes clean, champagne, dourado suave e estética de salão de luxo internacional.',
    iconName: 'crown',
    vibe: 'Luxo, Beleza, Champagne, Editorial, Clean',
    accentColor: '#D97706',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '04-pizzaria',
    number: '04',
    name: 'Pizzaria / Lanchonete',
    subtitle: 'Pizzas artesanais ao forno à lenha e hambúrgueres gourmet',
    description: 'Experiência gastronômica, calor do fogo, estilo napolitano e cardápio interativo.',
    iconName: 'pizza',
    vibe: 'Gastronômico, Fogo, Italiano, Urbano, Artesanal',
    accentColor: '#EF4444',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '05-boutique',
    number: '05',
    name: 'Loja de Roupas / Boutique',
    subtitle: 'Moda feminina, alfaiataria, streetwear e coleções exclusivas',
    description: 'Estética de revista de alta costura, minimalista, editorial e lookbook interativo.',
    iconName: 'shoppingbag',
    vibe: 'Fashion, Editorial, Revista, Luxo, Feminino, Minimal',
    accentColor: '#8B5CF6',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '06-corretor',
    number: '06',
    name: 'Corretor de Imóveis',
    subtitle: 'Imóveis de alto padrão, lançamentos e consultoria imobiliária',
    description: 'Arquitetura moderna, confiança, visual corporativo premium e agendamento de visitas.',
    iconName: 'building',
    vibe: 'Arquitetura, Imóveis Premium, Confiança, Moderno',
    accentColor: '#3B82F6',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '07-personal',
    number: '07',
    name: 'Personal Trainer',
    subtitle: 'Consultoria fitness, emagrecimento, hipertrofia e performance',
    description: 'Energia alta, dark esportivo, contrastes vibrantes, antes e depois e planos personalizados.',
    iconName: 'dumbbell',
    vibe: 'Performance, Energia, Esportivo, Dark, Neon',
    accentColor: '#10B981',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '08-motorista',
    number: '08',
    name: 'Motorista Particular',
    subtitle: 'Transporte executivo, viagens, eventos e traslados VIP',
    description: 'Sofisticação em mobilidade, pontualidade, discrição, atendimento executivo e seguro.',
    iconName: 'car',
    vibe: 'Mobilidade, Executivo, Urbano, Elegante, Confiança',
    accentColor: '#0EA5E9',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '09-mecanica',
    number: '09',
    name: 'Mecânica / Oficina Automotiva',
    subtitle: 'Revisão automotiva, injeção eletrônica e estética de veículos',
    description: 'Estética industrial, aço escovado, precisão mecânica, racing e agendamento de revisão.',
    iconName: 'wrench',
    vibe: 'Industrial, Aço, Racing, Oficina Premium, Automobilístico',
    accentColor: '#F97316',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10-confeitaria',
    number: '10',
    name: 'Confeitaria / Doces e Bolos',
    subtitle: 'Bolos decorados, doces finos, sobremesas e festas',
    description: 'Visual delicado e açucarado, tons pastel, chocolate nobre, afeto e encomendas diretas.',
    iconName: 'cake',
    vibe: 'Delicado, Doce, Artesanal, Luxo, Pastel, Chocolate',
    accentColor: '#F43F5E',
    badge: '10 Modelos Exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
  }
];

// Helper to generate distinct layouts and styling for all 100 templates
const LAYOUT_CYCLE: TemplateLayout[] = [
  'cinematic-split',
  'luxury-editorial',
  'dark-cyber',
  'glass-stacked',
  'bento-showcase',
  'minimal-center',
  'asymmetric-modern',
  'floating-hero',
  'bold-street',
  'diagonal-energy'
];

const GALLERY_CYCLE: GalleryStyle[] = [
  'masonry',
  'editorial',
  'carousel',
  'cards',
  'horizontal-scroll',
  'collage',
  'overlap',
  'full-width',
  'masonry',
  'cards'
];

interface NichoTemplateBlueprint {
  names: string[];
  styles: string[];
  descriptions: string[];
  colorSets: Array<{ primary: string; secondary: string; accent: string; background: string; surface: string; text: string }>;
  sampleServices: Array<{ name: string; desc: string; price: string; icon: string }>;
  samplePhotos: string[];
  slogans: string[];
  titles: string[];
}

const NICHO_BLUEPRINTS: Record<NichoId, NichoTemplateBlueprint> = {
  '01-barbearia': {
    names: [
      'The Royal Razor',
      'Black Vintage Barber',
      'Iron & Comb Street',
      'Gentleman Society',
      'Monarch Grooming Studio',
      'Fade Master Pro',
      'Bourbon & Blade Lounge',
      'Urban Viking Barbershop',
      'Executive Shave Club',
      'The Heritage Cut'
    ],
    styles: [
      'Vintage Dourado & Madeira Escura',
      'Dark Noir & Couro Envelhecido',
      'Street Industrial & Grafite',
      'Luxo Clássico Britânico',
      'Minimalista Urbano Preto Fosco',
      'Cyber Fade & Neon Âmbar',
      'Lounge Exclusivo & Whisky Bar',
      'Rústico Nórdico & Aço Corten',
      'Corporativo Executivo & Prata',
      'Old School Tradicional Navalhado'
    ],
    descriptions: [
      'Visual aristocrático com tons amadeirados e tipografia serifada de alto impacto.',
      'Contraste dramático preto e branco com fotografia protagonista de barbearia clássica.',
      'Estética brutalista urbana contemporânea inspirada nos melhores estúdios de NY.',
      'Clube de cavalheiros com atmosfera exclusiva, selo de garantia e agendamento VIP.',
      'Linhas limpas, cartões em glassmorphism fosco e foco cirúrgico nos serviços.',
      'Tipografia bold, contornos dinâmicos e microinterações de alta energia.',
      'Ambiente intimista que combina degustação de bourbon e barboterapia de luxo.',
      'Elementos rústicos nobres, texturas de madeira crua e forte presença visual.',
      'Voltado para executivos e profissionais que exigem precisão e horário rigoroso.',
      'Homenagem às tradicionais barbearias dos anos 50 com tecnologia contemporânea.'
    ],
    colorSets: [
      { primary: '#D97706', secondary: '#92400E', accent: '#F59E0B', background: '#090A0F', surface: '#12141D', text: '#F8FAFC' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#94A3B8', background: '#050507', surface: '#0F1015', text: '#FFFFFF' },
      { primary: '#F97316', secondary: '#C2410C', accent: '#FB923C', background: '#0A0B0E', surface: '#151722', text: '#F1F5F9' },
      { primary: '#C5A059', secondary: '#855E24', accent: '#E8C787', background: '#0B0D13', surface: '#161922', text: '#FAFAFA' },
      { primary: '#A855F7', secondary: '#7E22CE', accent: '#C084FC', background: '#08080C', surface: '#13141E', text: '#FFFFFF' },
      { primary: '#EAB308', secondary: '#CA8A04', accent: '#FDE047', background: '#0D0E15', surface: '#181A25', text: '#F8FAFC' },
      { primary: '#B45309', secondary: '#78350F', accent: '#D97706', background: '#090807', surface: '#171412', text: '#FDFBF7' },
      { primary: '#10B981', secondary: '#047857', accent: '#34D399', background: '#070C09', surface: '#111A15', text: '#F0FDF4' },
      { primary: '#60A5FA', secondary: '#2563EB', accent: '#93C5FD', background: '#070A10', surface: '#101524', text: '#F8FAFC' },
      { primary: '#EF4444', secondary: '#B91C1C', accent: '#F87171', background: '#0C0808', surface: '#181212', text: '#FAFAFA' }
    ],
    sampleServices: [
      { name: 'Corte Degradê na Tesoura & Máquina', desc: 'Acabamento milimétrico, lavagem com shampoo premium e finalização com pomada matte.', price: 'R$ 65,00', icon: 'scissors' },
      { name: 'Barboterapia com Toalha Quente', desc: 'Vapor de ozônio, hidratação profunda, óleos essenciais e alinhamento com navalha.', price: 'R$ 55,00', icon: 'crown' },
      { name: 'Combo Real (Cabelo + Barba + Sobrancelha)', desc: 'Experiência completa com bebida de cortesia e massagem capilar.', price: 'R$ 110,00', icon: 'award' },
      { name: 'Selagem Capilar & Pigmentação', desc: 'Alinhamento dos fios com aspecto natural e definição impecável da barba.', price: 'R$ 80,00', icon: 'sparkles' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Onde a tradição encontra a excelência moderna.', 'Cortes de respeito para homens de atitude.', 'Sua melhor versão começa na cadeira.'],
    titles: ['Barbearia Premium & Club', 'Cortes & Barba Tradicional', 'Mestres da Navalha']
  },
  '02-manicure': {
    names: [
      'Lumière Nail Studio',
      'Velvet Pink Gel Bar',
      'Nude Elegance Designer',
      'Diamond Gloss Nails',
      'Chic & Shine Nail Bar',
      'Rose Gold Atelier',
      'Modern Frenchie Studio',
      'Opulence Nail Art',
      'Glow Nails Boutique',
      'Haute Manicure Club'
    ],
    styles: [
      'Rosé Gold & Glass Transparente',
      'Pink Barbie & Neon Glow',
      'Nude Minimalista & Bege Areia',
      'Brilho Diamante & Dourado Suave',
      'Editorial Revista de Moda',
      'Lavanda Suave & Lilás Chic',
      'Clean Girl Aesthetic & Branco Pérola',
      'Alta Joalheria & Strass Reluzente',
      'Dark Glamour & Vinho Marsala',
      'Aquarela Pastel & Orgânico'
    ],
    descriptions: [
      'Transparências refinadas com efeitos de vidro líquido e reflexos em ouro rosé.',
      'Paleta vibrante e ousada para estúdios com público jovem e moderno.',
      'Tons neutros sofisticados, ressaltando saúde, formato e precisão da cuticulagem.',
      'Cards que imitam o reflexo de pedrarias e esmaltes com acabamento espelhado.',
      'Layout de editorial de revista focado em fotos detalhadas em macro de nail design.',
      'Harmonia relaxante com lilás e lavanda para momentos de autocuidado e bem-estar.',
      'Visual ultra clean e arejado, exaltando a beleza natural e o esmalte impecável.',
      'Sensação de luxo com detalhes dourados e fotos protagonistas em tamanho expandido.',
      'Contraste elegante entre tons escuros aveludados e botões luminosos.',
      'Design suave com curvaturas delicadas e tipografia fluida e contemporânea.'
    ],
    colorSets: [
      { primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6', background: '#0C070A', surface: '#191016', text: '#FDF2F8' },
      { primary: '#F43F5E', secondary: '#BE123C', accent: '#FB7185', background: '#0F0609', surface: '#1F0F14', text: '#FFFFFF' },
      { primary: '#D97706', secondary: '#B45309', accent: '#FBBF24', background: '#0B0A08', surface: '#171512', text: '#FEF3C7' },
      { primary: '#A855F7', secondary: '#7E22CE', accent: '#C084FC', background: '#0B0712', surface: '#181124', text: '#FAF5FF' },
      { primary: '#FB7185', secondary: '#E11D48', accent: '#FDA4AF', background: '#0A0608', surface: '#160E12', text: '#FFF1F2' },
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#A78BFA', background: '#080611', surface: '#131021', text: '#F5F3FF' },
      { primary: '#E2E8F0', secondary: '#94A3B8', accent: '#CBD5E1', background: '#08080A', surface: '#141418', text: '#FFFFFF' },
      { primary: '#F59E0B', secondary: '#D97706', accent: '#FCD34D', background: '#0D0B07', surface: '#1A1610', text: '#FFFBEB' },
      { primary: '#E11D48', secondary: '#881337', accent: '#FB7185', background: '#0B0407', surface: '#1A0C11', text: '#FFF1F2' },
      { primary: '#10B981', secondary: '#059669', accent: '#6EE7B7', background: '#060B08', surface: '#0E1712', text: '#ECFDF5' }
    ],
    sampleServices: [
      { name: 'Alongamento em Fibra de Vidro', desc: 'Resistência extrema com curvatura perfeita e aspecto 100% natural.', price: 'R$ 160,00', icon: 'sparkles' },
      { name: 'Blindagem de Diamante com Esmaltação em Gel', desc: 'Unhas protegidas sem quebras, com brilho espelhado que dura 20+ dias.', price: 'R$ 95,00', icon: 'gem' },
      { name: 'Manicure Russa & Cutilagem Combinada', desc: 'Remoção profunda com micromotor, acabamento impecável e sem agredir a pele.', price: 'R$ 70,00', icon: 'star' },
      { name: 'Nail Art Personalizada & Encapsulada', desc: 'Folhas de ouro, babyboomer, francesinha reversa e pedrarias finas.', price: 'R$ 45,00', icon: 'crown' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Unhas que são verdadeiras joias em suas mãos.', 'Elegância, precisão e cuidado que você merece.', 'O acabamento perfeito que dura semanas.'],
    titles: ['Nail Designer de Alto Padrão', 'Studio de Unhas em Gel', 'Especialista em Alongamento']
  },
  '03-salao': {
    names: [
      'Maison de Beauté',
      'L’Éclat Hair Lounge',
      'Aura Blonde Studio',
      'Champagne & Glow Salon',
      'Atelier da Beleza',
      'Pure Elegance Coiffure',
      'Silk & Strand Concept',
      'Lumina Hair & Spa',
      'Royal Bride Hair Club',
      'Velvet Touch Salão'
    ],
    styles: [
      'Champagne Francês & Dourado Fosco',
      'Clean Escandinavo & Minimalista',
      'Loiros Iluminados & Âmbar Quente',
      'Luxo Moderno com Mármore Escuro',
      'Boutique Intimista & Veludo',
      'Parisiense Romântico & Creme',
      'Alta Performance Capilar & Prata',
      'Spa Orgânico & Tons Botânicos',
      'Noivas & Celebrações Especiais',
      'Editorial New York Hair Week'
    ],
    descriptions: [
      'Atmosfera requintada inspirada nos grandes salões da Avenue Montaigne em Paris.',
      'Linhas puras, sem excessos, destacando tratamentos capilares e fotos de transformações.',
      'Especializado em mechas, morenas iluminadas e loiros platinados perfeitos.',
      'Cards elegantes com fundo em ardósia profunda e tipografia cinematográfica.',
      'Sensação de aconchego e exclusividade para clientes que valorizam atendimento personalizado.',
      'Delicadeza com toques de marfim, ouro velho e apresentação harmoniosa de pacotes.',
      'Visual moderno de salão tecnológico focado em cronograma capilar e reposição de massa.',
      'Conexão com a natureza através de tons esmeralda suaves e cuidados com óleos essenciais.',
      'Dedicado a momentos inesquecíveis com cronograma para dia da noiva e madrinhas.',
      'Arrojado, dinâmico e fashionista, perfeito para estúdios antenados nas últimas tendências.'
    ],
    colorSets: [
      { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#090806', surface: '#16130D', text: '#FFFBEB' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#07080A', surface: '#12141A', text: '#FFFFFF' },
      { primary: '#F59E0B', secondary: '#B45309', accent: '#FDE047', background: '#0B0A06', surface: '#18150D', text: '#FEF9C3' },
      { primary: '#A855F7', secondary: '#7E22CE', accent: '#E9D5FF', background: '#0A0710', surface: '#161022', text: '#FAF5FF' },
      { primary: '#EC4899', secondary: '#BE185D', accent: '#FBCFE8', background: '#0B0609', surface: '#180E14', text: '#FDF2F8' },
      { primary: '#D4AF37', secondary: '#997F24', accent: '#F7E7A9', background: '#090805', surface: '#14120A', text: '#FFFDF5' },
      { primary: '#06B6D4', secondary: '#0891B2', accent: '#67E8F9', background: '#050A0C', surface: '#0D171A', text: '#ECFEFF' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#060B08', surface: '#0E1712', text: '#ECFDF5' },
      { primary: '#FB7185', secondary: '#E11D48', accent: '#FECDD3', background: '#0C0608', surface: '#1A0E12', text: '#FFF1F2' },
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#C4B5FD', background: '#080611', surface: '#131021', text: '#F5F3FF' }
    ],
    sampleServices: [
      { name: 'Mechas Criativas & Loiro Iluminado', desc: 'Técnica exclusiva sem marcas, preservando 100% da integridade da fibra capilar.', price: 'R$ 480,00', icon: 'crown' },
      { name: 'Tratamento de Reconstrução com Ozonioterapia', desc: 'Devolução de queratina pura e reposição lipídica profunda com selagem dos fios.', price: 'R$ 220,00', icon: 'sparkles' },
      { name: 'Corte Personalizado com Visagismo', desc: 'Análise de formato do rosto, textura capilar e estilo pessoal para realçar sua essência.', price: 'R$ 130,00', icon: 'scissors' },
      { name: 'Escova Modelada com Babyliss Gloss', desc: 'Volume glamouroso, movimento natural e fixação acetinada com proteção térmica.', price: 'R$ 90,00', icon: 'gem' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['A arte de revelar a sua beleza mais autêntica.', 'Transformações que inspiram confiança e glamour.', 'Cuidado extraordinário da raiz às pontas.'],
    titles: ['Salão de Beleza & Hair Concept', 'Espaço Exclusivo de Beleza', 'Atelier dos Cabelos']
  },
  '04-pizzaria': {
    names: [
      'Forno Antico Napoletano',
      'La Vera Pizza Gourmet',
      'Venezia Trattoria & Pizza',
      'Fogo & Farinha Artesanal',
      'Smash & Slice Burger Bar',
      'Urban Crust Pizza Co.',
      'Bella Italia Cantina',
      'Osteria del Fuoco',
      'Pizza Prime Experience',
      'Rustic Slice Forneria'
    ],
    styles: [
      'Fogo Vivo & Madeira Carbonizada',
      'Cucina Italiana Tradicional & Terracota',
      'Gourmet Noturno & Luz de Velas',
      'Farinha Rústica & Kraft Artesanal',
      'Street Food & Hamburgueria Dinâmica',
      'Industrial Urbano & Tijolinho à Vista',
      'Cantina Festiva com Vinhos & Massas',
      'Minimalista Contemporâneo & Pedra Basalto',
      'Fast Casual Premium & Pedidos Ágeis',
      'Artesanal Orgânico com Ingredientes D.O.C.'
    ],
    descriptions: [
      'Luz quente remetendo às chamas do forno à lenha a 450 graus e massa de fermentação lenta.',
      'Herança gastronômica italiana com molho de tomate San Marzano e azeite extravirgem.',
      'Design intimista de jantar com cardápio harmonizado com rótulos de vinhos selecionados.',
      'Foco na procedência dos grãos, farinhas italianas 00 e 48 horas de fermentação natural.',
      'Visual despojado que combina as melhores fatias artesanais com burgers suculentos.',
      'Estilo pub nova-iorquino com azulejos de metrô, neon suave e combos imperdíveis.',
      'Ambiente caloroso perfeito para famílias e grandes encontros com botão direto para WhatsApp.',
      'Sofisticação discreta onde o protagonista é o corte perfeito e o queijo derretido.',
      'Layout ultra veloz para pedir em segundos no delivery ou reservar mesas sem fila.',
      'Destaque para produtos locais, queijos artesanais brasileiros e receitas autorais.'
    ],
    colorSets: [
      { primary: '#EF4444', secondary: '#B91C1C', accent: '#FCA5A5', background: '#0B0606', surface: '#191010', text: '#FEF2F2' },
      { primary: '#EA580C', secondary: '#9A3412', accent: '#FDBA74', background: '#0B0704', surface: '#18120B', text: '#FFF7ED' },
      { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#0A0805', surface: '#16120C', text: '#FFFBEB' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#060B08', surface: '#0E1712', text: '#ECFDF5' },
      { primary: '#F59E0B', secondary: '#D97706', accent: '#FCD34D', background: '#0A0804', surface: '#18140B', text: '#FEF3C7' },
      { primary: '#E11D48', secondary: '#9F1239', accent: '#FDA4AF', background: '#0C0608', surface: '#1A0E13', text: '#FFF1F2' },
      { primary: '#84CC16', secondary: '#4D7C0F', accent: '#BEF264', background: '#080B04', surface: '#11170A', text: '#F7FEE7' },
      { primary: '#64748B', secondary: '#334155', accent: '#CBD5E1', background: '#07080A', surface: '#111318', text: '#F8FAFC' },
      { primary: '#DC2626', secondary: '#991B1B', accent: '#F87171', background: '#0C0606', surface: '#1A0F0F', text: '#FFFFFF' },
      { primary: '#B45309', secondary: '#78350F', accent: '#FBBF24', background: '#0A0704', surface: '#17120C', text: '#FFFBEB' }
    ],
    sampleServices: [
      { name: 'Pizza Margherita Verace D.O.C.', desc: 'Massa com 48h de fermentação, molho pelati italiano, mozzarella de búfala e manjericão fresco.', price: 'R$ 68,00', icon: 'pizza' },
      { name: 'Pizza Diavola com Salame Artesanal', desc: 'Salame picante curado, fior di latte, geleia de pimenta e lâminas de alho negro.', price: 'R$ 74,00', icon: 'pizza' },
      { name: 'Burrata ao Forno com Focaccia Quentinha', desc: 'Burrata cremosa gratinada, tomates confitados no azeite e alecrim.', price: 'R$ 56,00', icon: 'utensils' },
      { name: 'Calzone de Nutella & Pistache Italiano', desc: 'Sobremesa clássica recheada com Nutella pura e crocante de pistache tostado.', price: 'R$ 38,00', icon: 'cake' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['A verdadeira tradição napolitana assada no fogo vivo.', 'Ingredientes nobres, fermentação lenta e sabor inesquecível.', 'Peça agora pelo WhatsApp e receba quentinha.'],
    titles: ['Pizzaria Artesanal & Forneria', 'Pizza Napoletana Verace', 'Cardápio Gourmet & Delivery']
  },
  '05-boutique': {
    names: [
      'Maison Noir Boutique',
      'Aura Fashion Studio',
      'Vogue Streetwear Collective',
      'L’Étoile Alfaiataria',
      'Minimalista Moda & Conceito',
      'Opus Chic Closet',
      'La Femme Elegance',
      'Urban Silk Apparel',
      'Boho & Chic Boutique',
      'Velvet Runway'
    ],
    styles: [
      'Editorial Revista Vogue & Alto Contraste',
      'Minimalista Bege Cashmere & Clean',
      'Streetwear Tokyo & Tipografia Bold',
      'Alfaiataria Moderna & Navy Blue',
      'Monocromático Preto & Branco Puro',
      'Couture Dourado & Mármore Calacatta',
      'Romântico Contemporâneo & Pêssego',
      'Seda & Linho Orgânico Natural',
      'Boho Chic & Tons Terrosos Quentes',
      'Passarela de Luxo & Iluminação Focal'
    ],
    descriptions: [
      'Layout de revista de alta moda, fotografia em tela cheia e tipografia com personalidade.',
      'Espaços em branco generosos, paleta suave e valorização de tecidos nobres e caimento.',
      'Energia urbana vibrante inspirada em Shibuya e Brooklyn com drops exclusivos.',
      'Linhas retas, elegância corporativa e peças que transitam do trabalho ao jantar.',
      'Design atemporal sem poluição visual, destacando a textura e o design das roupas.',
      'Sofisticação com botões em ouro polido e detalhes em vidro espelhado.',
      'Leveza, frescor e peças versáteis para mulheres confiantes e cosmopolitas.',
      'Sustentabilidade e fibras naturais com estética pura e conexão com a simplicidade.',
      'Estilo livre com referências vintage, estampas autorais e acessórios marcantes.',
      'Experiência VIP de provador virtual com links diretos para compras com consultora.'
    ],
    colorSets: [
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#DDD6FE', background: '#08070D', surface: '#14121F', text: '#F5F3FF' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#080809', surface: '#131317', text: '#FFFFFF' },
      { primary: '#F43F5E', secondary: '#BE123C', accent: '#FDA4AF', background: '#0D0608', surface: '#1B0F13', text: '#FFF1F2' },
      { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#93C5FD', background: '#06080F', surface: '#0E1322', text: '#EFF6FF' },
      { primary: '#D4AF37', secondary: '#855E24', accent: '#FDE68A', background: '#080705', surface: '#15130D', text: '#FFFDF5' },
      { primary: '#EC4899', secondary: '#BE185D', accent: '#FBCFE8', background: '#0B0609', surface: '#170E14', text: '#FDF2F8' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#060B08', surface: '#0E1712', text: '#ECFDF5' },
      { primary: '#D97706', secondary: '#92400E', accent: '#FBBF24', background: '#0A0805', surface: '#16120C', text: '#FFFBEB' },
      { primary: '#6366F1', secondary: '#4338CA', accent: '#A5B4FC', background: '#070710', surface: '#111122', text: '#EEF2FF' },
      { primary: '#FB7185', secondary: '#E11D48', accent: '#FECDD3', background: '#0C0608', surface: '#1A0E12', text: '#FFF1F2' }
    ],
    sampleServices: [
      { name: 'Lookbook Coleção Outono/Inverno', desc: 'Peças em linho puro, alfaiataria italiana e tecidos sustentáveis de caimento impecável.', price: 'Ver Coleção', icon: 'shirt' },
      { name: 'Consultoria de Estilo com Personal Shopper', desc: 'Atendimento exclusivo com nossa stylist pelo WhatsApp com envio de mala delivery.', price: 'Agendar', icon: 'sparkles' },
      { name: 'Conjunto Alfaiataria Blazer & Pantalona', desc: 'Corte estruturado, botões forrados e acabamento interno em cetim de seda.', price: 'R$ 389,00', icon: 'crown' },
      { name: 'Vestido Midi Plissado Fluid', desc: 'Movimento fluido, decote elegante e modelagem que valoriza todas as silhuetas.', price: 'R$ 299,00', icon: 'gem' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Moda autoral para quem expressa personalidade no vestir.', 'Peças exclusivas com caimento e tecidos nobres.', 'Compre online ou consulte nossa stylist.'],
    titles: ['Boutique & Conceito Fashion', 'Lookbook & Coleções Exclusivas', 'Atelier de Moda Feminina']
  },
  '06-corretor': {
    names: [
      'Prime Urban Imóveis',
      'Horizonte Real Estate',
      'Apex Alto Padrão',
      'Mansões & Coberturas VIP',
      'Arquiteto & Corretor Consultoria',
      'Vanguard Empreendimentos',
      'Riviera Imóveis de Praia',
      'Terra Nova Negócios Imobiliários',
      'Prestige Condomínios Fechados',
      'Urban Loft Consultoria'
    ],
    styles: [
      'Arquitetura Moderna & Vidro Azul',
      'Minimalista Corporativo & Grafite',
      'Dourado Prestige & Mármore Travertino',
      'Penthouses & Fotografia Panorâmica',
      'Blueprint Técnico & Linhas Retas',
      'Lançamentos & Render 3D Imersivo',
      'Litoral Náutico & Azul Turquesa',
      'Campo & Haras com Tons Verdes',
      'Condomínios Seguros & Prata Cromado',
      'Lofts Industriais & Concreto Aparente'
    ],
    descriptions: [
      'Design inspirado nas fachadas envidraçadas dos edifícios mais icônicos do país.',
      'Transmite credibilidade, seriedade e foco na valorização patrimonial do investidor.',
      'Atendimento privativo para famílias que buscam casas em condomínios e coberturas exclusivas.',
      'Imagens panorâmicas hero que destacam a vista privilegiada de cada empreendimento.',
      'Abordagem técnica com foco em metragem, insolação, acabamento e plantas humanizadas.',
      'Apresentação de pré-lançamentos imobiliários com agendamento de visita aos decorados.',
      'Especializado em casas de veraneio, pé na areia e marinas de alto padrão.',
      'Propriedades rurais de alto padrão, sítios de lazer e haras com segurança.',
      'Foco em privacidade, segurança armada e lazer de clube completo para a família.',
      'Imóveis modernos em bairros nobres para investidores e solteiros bem-sucedidos.'
    ],
    colorSets: [
      { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#93C5FD', background: '#070A10', surface: '#101524', text: '#F8FAFC' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#08080A', surface: '#12141A', text: '#FFFFFF' },
      { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#090806', surface: '#16130D', text: '#FFFBEB' },
      { primary: '#0EA5E9', secondary: '#0284C7', accent: '#7DD3FC', background: '#060A0F', surface: '#0E1724', text: '#F0F9FF' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#060B08', surface: '#0E1712', text: '#ECFDF5' },
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#C4B5FD', background: '#080611', surface: '#131021', text: '#F5F3FF' },
      { primary: '#06B6D4', secondary: '#0891B2', accent: '#67E8F9', background: '#050A0C', surface: '#0D171A', text: '#ECFEFF' },
      { primary: '#F59E0B', secondary: '#B45309', accent: '#FCD34D', background: '#0B0A06', surface: '#18150D', text: '#FEF3C7' },
      { primary: '#64748B', secondary: '#334155', accent: '#94A3B8', background: '#07080A', surface: '#111318', text: '#F8FAFC' },
      { primary: '#6366F1', secondary: '#4338CA', accent: '#A5B4FC', background: '#070710', surface: '#111122', text: '#EEF2FF' }
    ],
    sampleServices: [
      { name: 'Cobertura Duplex 4 Suítes no Bairro Nobre', desc: '480m² privativos, piscina aquecida no deck, vista panorâmica 360° e 5 vagas de garagem.', price: 'R$ 4.850.000', icon: 'building' },
      { name: 'Mansão Contemporânea em Condomínio Fechado', desc: 'Living integrado com pé direito duplo, automação residencial e spa completo.', price: 'R$ 6.200.000', icon: 'home' },
      { name: 'Consultoria de Investimento & Avaliação', desc: 'Estudo de rentabilidade com locação premium e valorização patrimonial garantida.', price: 'Consulte', icon: 'shield' },
      { name: 'Agendamento de Visita VIP com Traslado', desc: 'Atendimento personalizado com horário reservado e análise jurídica completa.', price: 'Agendar', icon: 'calendar' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Encontrando o imóvel extraordinário que reflete sua história.', 'Segurança, discrição e consultoria no mais alto padrão.', 'Agende sua visita aos imóveis mais cobiçados.'],
    titles: ['Consultoria Imobiliária de Alto Padrão', 'Imóveis Selecionados & Coberturas', 'Corretor Exclusivo VIP']
  },
  '07-personal': {
    names: [
      'Iron Beast Performance',
      'Elite Body Protocol',
      'Hyperion Strength Coach',
      'Vortex Metabolic Lab',
      'Apex Movement Studio',
      'Neon Pulse Trainer',
      'Titanium Fitness Club',
      'Pro Shape Consultoria',
      'Functional Athlete Coach',
      'Pure Energy Personal'
    ],
    styles: [
      'Dark Neon Verde Elétrico & Preto Carbono',
      'Dark Amarelo Fluorescente & Alta Energia',
      'Minimalista Esportivo & Tipografia Extragrande',
      'Ciência do Treino & Gráficos de Evolução',
      'Cross & Movimento com Fundo Texturizado',
      'Cyber Neon Magenta & Visual Futurista',
      'Aço Escovado & Vermelho Corrida',
      'Lifestyle Saudável & Tons Água',
      'Treinamento Funcional & Laranja Aceso',
      'Brutalista Moderno com Contraste Absoluto'
    ],
    descriptions: [
      'Focado em resultados de alta intensidade, força bruta e perda acelerada de gordura.',
      'Visual energizante que motiva o aluno desde o primeiro segundo no biosite.',
      'Elegância sem distrações, priorizando depoimentos reais e planos de consultoria.',
      'Metodologia baseada em fisiologia, biomecânica e periodização de atletas de elite.',
      'Enfatiza mobilidade, agilidade e condicionamento físico para a vida real.',
      'Estética moderna perfeita para quem atrai público jovem nas redes sociais.',
      'Sensação de academia pesada com barras de ferro, halteres cromados e disciplina.',
      'Abordagem equilibrada entre nutrição, sono, bem-estar e hipertrofia consistente.',
      'Metodologias dinâmicas com kettlebells, cordas navais e treinos outdoor.',
      'Impacto máximo com números grandes de quilos eliminados e alunos transformados.'
    ],
    colorSets: [
      { primary: '#10B981', secondary: '#047857', accent: '#34D399', background: '#050B07', surface: '#0D1A12', text: '#ECFDF5' },
      { primary: '#EAB308', secondary: '#CA8A04', accent: '#FDE047', background: '#090804', surface: '#16140A', text: '#FEF9C3' },
      { primary: '#EF4444', secondary: '#B91C1C', accent: '#F87171', background: '#0B0506', surface: '#180C0E', text: '#FEF2F2' },
      { primary: '#06B6D4', secondary: '#0891B2', accent: '#67E8F9', background: '#04090B', surface: '#0B1519', text: '#ECFEFF' },
      { primary: '#F97316', secondary: '#C2410C', accent: '#FB923C', background: '#0A0704', surface: '#17100B', text: '#FFF7ED' },
      { primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6', background: '#0C060A', surface: '#190E16', text: '#FDF2F8' },
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#A78BFA', background: '#07060F', surface: '#120F1F', text: '#F5F3FF' },
      { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#60A5FA', background: '#05070D', surface: '#0C111E', text: '#EFF6FF' },
      { primary: '#84CC16', secondary: '#4D7C0F', accent: '#A3E635', background: '#070A04', surface: '#101609', text: '#F7FEE7' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#060608', surface: '#101014', text: '#FFFFFF' }
    ],
    sampleServices: [
      { name: 'Consultoria Online de Treino & Periodização', desc: 'Treinos pelo aplicativo com vídeos em alta definição, ajuste semanal e suporte no WhatsApp.', price: 'R$ 180,00/mês', icon: 'activity' },
      { name: 'Personal Presencial VIP (2x ou 3x na Semana)', desc: 'Correção postural imediata, estímulo máximo e acompanhamento do primeiro ao último segundo.', price: 'A partir de R$ 600', icon: 'dumbbell' },
      { name: 'Protocolo de Emagrecimento Rápido 60 Dias', desc: 'Método comprovado com redução de medidas, plano de treinos metabólicos e metas claras.', price: 'R$ 350,00', icon: 'zap' },
      { name: 'Avaliação Física com Bioimpedância & Dobras', desc: 'Relatório completo de percentual de gordura, massa magra e assimetrias musculares.', price: 'R$ 120,00', icon: 'award' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Seu corpo é o seu maior projeto. Transforme-o hoje.', 'Método validado com foco em queima de gordura e hipertrofia.', 'Vagas limitadas para acompanhamento individual.'],
    titles: ['Personal Trainer & Preparador Físico', 'Consultoria Fitness de Alta Performance', 'Coach de Emagrecimento & Hipertrofia']
  },
  '08-motorista': {
    names: [
      'Black Car Executive',
      'Prestige Chauffeur VIP',
      'AeroPorto Traslados 24h',
      'Lady Driver Segura',
      'Elite Fleet Transporte',
      'Urban Prime Mobility',
      'Monarch Driver Corporativo',
      'Van & Família Tours',
      'Vip Way Mobilidade',
      'Chauffeur Privé'
    ],
    styles: [
      'Executivo Sedan Preto & Couro Nobre',
      'Prata Espelhado & Iluminação Noturna',
      'Azul Aviação & Painel Digital Rápido',
      'Feminino Confortável & Rosé Seguro',
      'Frota Blindada & Segurança Máxima',
      'Urbano Ágil & Cartões Flutuantes',
      'Eventos & Casamentos Luxuosos',
      'Turismo Executivo & Van Premium',
      'Minimalista Noturno & Mapa de Trajeto',
      'Elegância Européia & Atendimento Bilíngue'
    ],
    descriptions: [
      'Veículos executivos impecavelmente limpos, com ar-condicionado, água e carregadores rápidos.',
      'Discrição absoluta para empresários, celebridades e traslados aeroportuários.',
      'Pontualidade britânica para viagens de negócios sem risco de perder voos.',
      'Voltado exclusivamente para o público feminino, com motorista mulher e segurança total.',
      'Veículos com blindagem certificada Nível III-A e condutores com direção defensiva.',
      'Atendimento 24 horas por agendamento prévio com confirmação instantânea no WhatsApp.',
      'Carros de luxo para transporte de noivos, debutantes e transporte de executivos para feiras.',
      'Conforto para grupos grandes com bagageiro espaçoso e internet Wi-Fi a bordo.',
      'Design clean e direto ao ponto para orçamentos imediatos de rotas e viagens.',
      'Padrão de serviço com terno, auxílio com malas e discrição contratual garantida.'
    ],
    colorSets: [
      { primary: '#0EA5E9', secondary: '#0284C7', accent: '#7DD3FC', background: '#05080E', surface: '#0C1320', text: '#F0F9FF' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#070709', surface: '#121217', text: '#FFFFFF' },
      { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#93C5FD', background: '#05070E', surface: '#0C111F', text: '#EFF6FF' },
      { primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6', background: '#0C060A', surface: '#180E15', text: '#FDF2F8' },
      { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#090805', surface: '#16130C', text: '#FFFBEB' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#050B08', surface: '#0D1711', text: '#ECFDF5' },
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#C4B5FD', background: '#080611', surface: '#131021', text: '#F5F3FF' },
      { primary: '#F59E0B', secondary: '#B45309', accent: '#FCD34D', background: '#0A0805', surface: '#18140B', text: '#FEF3C7' },
      { primary: '#64748B', secondary: '#334155', accent: '#94A3B8', background: '#07080A', surface: '#111318', text: '#F8FAFC' },
      { primary: '#D4AF37', secondary: '#855E24', accent: '#FDE68A', background: '#090805', surface: '#15130D', text: '#FFFDF5' }
    ],
    sampleServices: [
      { name: 'Traslado Executivo Aeroporto (Ida ou Volta)', desc: 'Recepção com identificação no desembarque, auxílio com malas e água mineral a bordo.', price: 'A partir de R$ 140', icon: 'navigation' },
      { name: 'Diária Executiva com Carro à Disposição', desc: 'Atendimento contínuo para reuniões e compromissos com discrição e flexibilidade.', price: 'Consulte Diária', icon: 'clock' },
      { name: 'Viagens Intermunicipais com Conforto VIP', desc: 'Trajetos com parada planejada, ar-condicionado digital e condução segura e tranquila.', price: 'Sob Consulta', icon: 'car' },
      { name: 'Transporte de Noiva & Eventos Sociais', desc: 'Chegada triunfal ao casamento com carro clássico ou sedan de luxo impecável.', price: 'R$ 450,00', icon: 'crown' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Pontualidade britânica, conforto supremo e segurança absoluta.', 'Seu transporte privativo para qualquer destino.', 'Agende sua viagem pelo WhatsApp com antecedência.'],
    titles: ['Motorista Executivo & Privativo', 'Traslados VIP & Aeroportos', 'Transporte Seguro 24 Horas']
  },
  '09-mecanica': {
    names: [
      'SpeedTech Oficina Premium',
      'Aço & Fogo Auto Center',
      'Piston Garage Especializada',
      'V8 Motorsport Performance',
      'ProAuto Mecânica Geral',
      'TurboPoint Injeção Eletrônica',
      'Apex Detailing & Mecânica',
      'Master Car Revisão Express',
      'Overdrive Centro Automotivo',
      'Heritage Garagem de Clássicos'
    ],
    styles: [
      'Industrial Aço Escovado & Laranja Neon',
      'Racing Motorsport & Vermelho Ferrary',
      'Dark Metal & Fibra de Carbono',
      'Oficina Limpa de Alto Padrão & Amarelo',
      'Corporativo de Frotas & Azul Marinho',
      'High-Tech Eletrônica & Verde Fluorescente',
      'Estética Automotiva & Preto Black Piano',
      'Revisão Rápida com Boxes Dinâmicos',
      'Oficina 4x4 e Picape com Tons Terrosos',
      'Restauração de Antigos com Madeira e Bronze'
    ],
    descriptions: [
      'Centro automotivo equipado com scanners de diagnóstico de última geração e garantia documentada.',
      'Especializado em motores de alta cilindrada, escapamento esportivo e reprogramação de ECU.',
      'Ambiente com chão epóxi brilhante, peças originais e transparência total com fotos no WhatsApp.',
      'Foco em suspensão esportiva, alinhamento 3D a laser e balanceamento computadorizado.',
      'Atendimento preventivo e corretivo para veículos nacionais e importados com nota fiscal.',
      'Diagnóstico apurado de falhas em injeção eletrônica, velas de irídio e bicos injetores.',
      'Combinação de serviços mecânicos de precisão com polimento técnico e vitrificação de pintura.',
      'Box de troca de óleo e filtros com atendimento ágil enquanto você toma um café especial.',
      'Preparação para off-road, guinchos, snorkel e revisões pesadas de tração integral.',
      'Cuidado artesanal com restauração de motores clássicos, carburadores e veículos de colecionador.'
    ],
    colorSets: [
      { primary: '#F97316', secondary: '#C2410C', accent: '#FDBA74', background: '#090705', surface: '#17110C', text: '#FFF7ED' },
      { primary: '#EF4444', secondary: '#B91C1C', accent: '#FCA5A5', background: '#0A0606', surface: '#181010', text: '#FEF2F2' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#080809', surface: '#131317', text: '#FFFFFF' },
      { primary: '#EAB308', secondary: '#CA8A04', accent: '#FDE047', background: '#0A0905', surface: '#17150C', text: '#FEF9C3' },
      { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#93C5FD', background: '#06080F', surface: '#0E1322', text: '#EFF6FF' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#050B08', surface: '#0D1711', text: '#ECFDF5' },
      { primary: '#8B5CF6', secondary: '#6D28D9', accent: '#C4B5FD', background: '#070610', surface: '#120F1F', text: '#F5F3FF' },
      { primary: '#06B6D4', secondary: '#0891B2', accent: '#67E8F9', background: '#050A0C', surface: '#0C1619', text: '#ECFEFF' },
      { primary: '#B45309', secondary: '#78350F', accent: '#FBBF24', background: '#0A0805', surface: '#17120C', text: '#FFFBEB' },
      { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#090805', surface: '#15130C', text: '#FFFBEB' }
    ],
    sampleServices: [
      { name: 'Revisão Geral Preventiva 50 Itens', desc: 'Checagem computadorizada de freios, suspensão, correias, arrefecimento e bateria.', price: 'R$ 250,00', icon: 'wrench' },
      { name: 'Diagnóstico com Scanner Automotivo Avançado', desc: 'Leitura de parâmetros da injeção eletrônica e sensores para extinção da luz da injeção.', price: 'R$ 150,00', icon: 'activity' },
      { name: 'Troca de Óleo 100% Sintético & Filtros', desc: 'Óleo homologado pela montadora, filtro de combustível, de óleo e de ar do motor.', price: 'A partir de R$ 180', icon: 'settings' },
      { name: 'Alinhamento 3D Computadorizado & Balanceamento', desc: 'Geometria milimétrica das rodas para evitar desgaste irregular e garantir estabilidade.', price: 'R$ 120,00', icon: 'shield' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Precisão mecânica e transparência que seu carro exige.', 'Diagnóstico exato com tecnologia de ponta e garantia.', 'Agende sua revisão pelo WhatsApp sem dor de cabeça.'],
    titles: ['Centro Automotivo & Oficina Premium', 'Especialistas em Revisão e Injeção', 'Mecânica de Precisão & Performance']
  },
  '10-confeitaria': {
    names: [
      'La Dulce Vie Confeitaria',
      'Chocolatier D’Or Atelier',
      'Açúcar & Canela Doceria',
      'Le Petit Gateau Studio',
      'Sweet Garden Confeitaria',
      'Nuvem de Baunilha',
      'Torta & Glamour Gourmet',
      'Brigadeiria Real & Mimos',
      'Delícias da Vovó Artesanal',
      'Haute Pâtisserie Francesa'
    ],
    styles: [
      'Pastel Rosa & Baunilha Suave',
      'Chocolate Meio Amargo & Folha de Ouro',
      'Rústico Aconchegante com Canela',
      'Pâtisserie Parisiense Romântica',
      'Jardim Secreto & Floral Suave',
      'Nuvem Doce & Lilás Acetinado',
      'Glamour Noturno com Frutas Vermelhas',
      'Brigadeiros Gourmet & Cobre Brilhante',
      'Artesanal Afetivo & Papel Kraft',
      'Alta Confeitaria & Minimalismo Fino'
    ],
    descriptions: [
      'Cores delicadas que despertam o apetite, com destaque para bolos recheados com brigadeiro belga.',
      'Tons profundos de cacau nobre e reflexos dourados que transmitem sabor premium e sofisticação.',
      'Aroma visual de especiarias quentes, fatias generosas de bolo caseiro e café coado na hora.',
      'Macarons coloridos, éclairs crocantes e massas folhadas leves que parecem saídas de Paris.',
      'Flores naturais comestíveis, chantininho aveludado e visual fresco e acolhedor.',
      'Texturas macias, degradês em tons pastel e apresentações encantadoras para festas de aniversário.',
      'Contraste elegante entre calda de framboesa escorrendo e fatias de torta com decoração impecável.',
      'Centenas de brigadeiros artesanais boleados no granulado belga Callebaut para casamentos e eventos.',
      'Sabor de infância com receitas de família, ingredientes frescos e muito carinho no preparo.',
      'Arquitetura gastronômica com sobremesas empratadas que combinam texturas e temperaturas perfeitas.'
    ],
    colorSets: [
      { primary: '#F43F5E', secondary: '#BE123C', accent: '#FDA4AF', background: '#0D0609', surface: '#1C0F14', text: '#FFF1F2' },
      { primary: '#D97706', secondary: '#92400E', accent: '#FDE68A', background: '#0A0704', surface: '#18120B', text: '#FFFBEB' },
      { primary: '#B45309', secondary: '#78350F', accent: '#FBBF24', background: '#0A0704', surface: '#17120C', text: '#FEF3C7' },
      { primary: '#EC4899', secondary: '#BE185D', accent: '#FBCFE8', background: '#0C060A', surface: '#180E15', text: '#FDF2F8' },
      { primary: '#10B981', secondary: '#047857', accent: '#6EE7B7', background: '#060B08', surface: '#0E1712', text: '#ECFDF5' },
      { primary: '#A855F7', secondary: '#7E22CE', accent: '#E9D5FF', background: '#0A0611', surface: '#161022', text: '#FAF5FF' },
      { primary: '#EF4444', secondary: '#B91C1C', accent: '#FCA5A5', background: '#0C0607', surface: '#1A0E10', text: '#FEF2F2' },
      { primary: '#F59E0B', secondary: '#B45309', accent: '#FCD34D', background: '#0A0805', surface: '#18140B', text: '#FEF3C7' },
      { primary: '#EA580C', secondary: '#9A3412', accent: '#FDBA74', background: '#0C0704', surface: '#19110B', text: '#FFF7ED' },
      { primary: '#E2E8F0', secondary: '#64748B', accent: '#CBD5E1', background: '#070709', surface: '#121217', text: '#FFFFFF' }
    ],
    sampleServices: [
      { name: 'Bolo Festivo Decorado Personalizado', desc: 'Massa amanteigada de baunilha, recheio de brigadeiro de pistache e cobertura em ganache blindada.', price: 'R$ 140,00/kg', icon: 'cake' },
      { name: 'Cento de Brigadeiros Gourmet Belgas', desc: 'Sortidos: Tradicional ao leite, Ninho com Nutella, Crème Brûlée e Frutas Vermelhas.', price: 'R$ 160,00', icon: 'gift' },
      { name: 'Torta Gelada de Frutas Vermelhas & Mascarpone', desc: 'Base crocante de amêndoas, creme suave de queijo mascarpone e coulis de frutas frescas.', price: 'R$ 115,00', icon: 'heart' },
      { name: 'Caixa Degustação para Noivas & Eventos', desc: 'Mini porções de 6 recheios autorais para escolha do cardápio do seu grande dia.', price: 'R$ 65,00', icon: 'crown' }
    ],
    samplePhotos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80'
    ],
    slogans: ['Doçura e arte feitas à mão para celebrar seus momentos especiais.', 'O sabor inconfundível de ingredientes nobres e amor.', 'Faça sua encomenda antecipada pelo WhatsApp.'],
    titles: ['Atelier de Doces Finos & Bolos', 'Confeitaria Artesanal & Pâtisserie', 'Doceria Gourmet para Festas']
  }
};

// Generate 10 distinct templates for each of the 10 niches = 100 templates
export const ALL_TEMPLATES: TemplateDefinition[] = [];

Object.entries(NICHO_BLUEPRINTS).forEach(([nichoKey, blueprint]) => {
  const nichoId = nichoKey as NichoId;
  const nichoShort = nichoId.split('-')[1];

  for (let i = 0; i < 10; i++) {
    const layout = LAYOUT_CYCLE[i];
    const galleryStyle = GALLERY_CYCLE[i];
    const templateName = blueprint.names[i] || `${nichoShort.toUpperCase()} Model ${i + 1}`;
    const styleName = blueprint.styles[i] || `Estilo Especial ${i + 1}`;
    const description = blueprint.descriptions[i] || `Template profissional para ${nichoId}`;
    const colors = blueprint.colorSets[i] || blueprint.colorSets[0];
    const photoPool = blueprint.samplePhotos;

    const templateId = `${nichoShort}-${String(i + 1).padStart(2, '0')}`;

    const defaultTheme: ThemeConfig = {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.background,
      surface: colors.surface,
      text: colors.text,
      textMuted: '#94A3B8',
      cardBg: colors.surface,
      border: 'rgba(255, 255, 255, 0.08)',
      fontHeading: i % 2 === 0 ? 'Syne' : 'Space Grotesk',
      fontBody: 'Plus Jakarta Sans'
    };

    const defaultData: Omit<ProjectData, 'projectId' | 'userId' | 'createdAt' | 'updatedAt'> = {
      nome: templateName,
      nicho: nichoId,
      templateId,
      identity: {
        name: templateName,
        slogan: blueprint.slogans[i % blueprint.slogans.length] || 'Qualidade e excelência sempre.',
        badge: styleName,
        title: blueprint.titles[i % blueprint.titles.length] || templateName,
        subtitle: blueprint.slogans[(i + 1) % blueprint.slogans.length] || 'Atendimento exclusivo e agendamento rápido.',
        description: description,
        about: `${templateName} oferece excelência e paixão em cada detalhe. Nossa equipe altamente qualificada está pronta para proporcionar uma experiência marcante e transformadora.`,
        logoUrl: photoPool[0],
        avatarUrl: photoPool[1],
        bannerUrl: photoPool[0]
      },
      theme: defaultTheme,
      photos: photoPool.map((url, pIdx) => ({
        id: `p-${pIdx + 1}`,
        url,
        caption: `Registro de Destaque 0${pIdx + 1}`,
        alt: `${templateName} foto 0${pIdx + 1}`,
        position: pIdx + 1
      })),
      galleryStyle,
      services: blueprint.sampleServices.map((srv, sIdx) => ({
        id: `srv-${sIdx + 1}`,
        name: srv.name,
        description: srv.desc,
        price: srv.price,
        imageUrl: photoPool[(sIdx + 2) % photoPool.length],
        iconName: srv.icon,
        ctaText: 'Agendar / Pedir',
        ctaUrl: 'https://wa.me/5511999999999',
        featured: sIdx === 0
      })),
      buttons: [
        {
          id: 'btn-1',
          text: 'Falar no WhatsApp',
          url: 'https://wa.me/5511999999999',
          iconName: 'whatsapp',
          style: 'gradient',
          color: colors.primary,
          size: 'lg',
          align: 'center'
        },
        {
          id: 'btn-2',
          text: 'Ver no Instagram',
          url: 'https://instagram.com',
          iconName: 'instagram',
          style: 'glass',
          color: colors.accent,
          size: 'md',
          align: 'center'
        },
        {
          id: 'btn-3',
          text: 'Como Chegar (Maps)',
          url: 'https://maps.google.com',
          iconName: 'googlemaps',
          style: 'outline',
          color: colors.primary,
          size: 'md',
          align: 'center'
        }
      ],
      socials: {
        whatsapp: {
          enabled: true,
          number: '5511999999999',
          message: `Olá! Vim através do biosite da ${templateName} e gostaria de agendar um atendimento.`,
          label: 'Chamar no WhatsApp'
        },
        instagram: {
          enabled: true,
          username: `@${templateName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          url: 'https://instagram.com'
        },
        tiktok: {
          enabled: false,
          username: '',
          url: ''
        },
        google: {
          enabled: true,
          url: 'https://google.com'
        },
        googleReview: {
          enabled: true,
          url: 'https://search.google.com/local/writereview'
        },
        facebook: {
          enabled: false,
          url: ''
        }
      },
      location: {
        address: 'Avenida Paulista, 1000 - Jardins',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Seg a Sáb: 09h às 20h | Domingo sob agendamento',
        mapsUrl: 'https://maps.google.com'
      },
      seo: {
        title: `${templateName} — BioSite Oficial`,
        description: description,
        ogImage: photoPool[0],
        favicon: photoPool[0]
      }
    };

    ALL_TEMPLATES.push({
      id: templateId,
      nichoId,
      index: i + 1,
      name: templateName,
      styleName,
      description,
      layout,
      galleryStyle,
      defaultTheme,
      defaultData
    });
  }
});

export const getTemplatesByNicho = (nichoId: NichoId): TemplateDefinition[] => {
  return ALL_TEMPLATES.filter((t) => t.nichoId === nichoId);
};

export const getTemplateById = (templateId: string): TemplateDefinition | undefined => {
  return ALL_TEMPLATES.find((t) => t.id === templateId);
};
