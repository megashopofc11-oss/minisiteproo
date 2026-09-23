import { V2DesignMeta, V2ProjectData, V2Family, V2Tone } from '../types';
import { renderAura } from '../engine/families/aura';
import { renderVertice } from '../engine/families/vertice';
import { renderMonarch } from '../engine/families/monarch';
import { renderPulse } from '../engine/families/pulse';
import { renderAtelier } from '../engine/families/atelier';
import { renderPrisma } from '../engine/families/prisma';
import { renderFrame } from '../engine/families/frame';
import { renderNova } from '../engine/families/nova';
import { renderElite } from '../engine/families/elite';
import { renderOrbit } from '../engine/families/orbit';
import { getRendererForFamily } from '../engine/families/familyEngines';

// 50 Official Design Definitions
export const V2_DESIGNS: V2DesignMeta[] = [
  // 01 AURA (Cinematic)
  {
    id: '01-aura',
    code: '01',
    name: 'AURA',
    family: 'cinematic',
    tone: 'escuro',
    tagline: 'Presença cinematográfica com profundidade e atmosfera noturna.',
    description: 'Fotografia full bleed, ambient glow âmbar e elegância absoluta.',
    rails: ['destaques', 'impacto', 'fotografia'],
    tags: ['luxo', 'escuro', 'cinematografico', 'fotografia', 'barbearia', 'gastronomia'],
    cover: {
      background: '#07080C',
      primary: '#F59E0B',
      accent: '#D97706',
      textColor: '#FFFFFF',
      surfaceColor: '#12141E',
      badgeText: 'CINEMATIC',
      sampleImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Experiência Noturna & Exclusiva',
      fontHeading: 'Syne'
    },
    demoData: {
      engineVersion: 2,
      templateId: '01-aura',
      brandName: 'AURA COCKTAIL & LOUNGE',
      segment: 'Gastronomia & Coquetelaria',
      headline: 'A alta coquetelaria em um refúgio secreto e cinematográfico.',
      subheadline: 'CARTA AUTORAL • AMBIENTE IMERSIVO',
      about: 'Criado para quem aprecia noites sofisticadas, drinks premiados e gastronomia contemporânea de alto padrão.',
      itemsTitle: 'Experiências do Cardápio',
      items: [
        { id: '1', title: 'Smoked Negroni Reserva', description: 'Gim artesanal defumado com canela e casca de laranja bahia.', price: 'R$ 48', priceEnabled: true, featured: true },
        { id: '2', title: 'Tábua de Charcutaria Nobre', description: 'Jamón ibérico, queijo canastra premiado e geleia de pimenta.', price: 'R$ 89', priceEnabled: true },
        { id: '3', title: 'Mesa VIP & Lounge Reservado', description: 'Atendimento exclusivo para grupos e celebrações privadas.', price: 'Sob Consulta', priceEnabled: true }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80', caption: 'Coquetelaria Autoral' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80', caption: 'Ambiente Sofisticado' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de reservar uma mesa no Aura.', label: 'Reservar Mesa' },
        instagram: { enabled: true, username: 'auralounge', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Oscar Freire, 1420',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Terça a Sábado das 18h às 02h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderAura
  },

  // 02 VÉRTICE (Bento)
  {
    id: '02-vertice',
    code: '02',
    name: 'VÉRTICE',
    family: 'bento',
    tone: 'escuro',
    tagline: 'Composição bento assimétrica e precisão modernista.',
    description: 'Cards modulares, blocos de proporções dinâmicas e contraste high-tech.',
    rails: ['destaques', 'ousados', 'impacto'],
    tags: ['bento', 'moderno', 'tecnologia', 'arquitetura', 'criativo'],
    cover: {
      background: '#090A0F',
      primary: '#00F0FF',
      accent: '#3B82F6',
      textColor: '#FFFFFF',
      surfaceColor: '#12141F',
      badgeText: 'BENTO MODERN',
      sampleImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Arquitetura Racional & Visual',
      fontHeading: 'Space Grotesk'
    },
    demoData: {
      engineVersion: 2,
      templateId: '02-vertice',
      brandName: 'VÉRTICE STUDIO',
      segment: 'Arquitetura & Design de Interiores',
      headline: 'Projetos autorais pensados para transformar a forma como você habita o espaço.',
      subheadline: 'DESIGN RACIONAL • ALTO PADRÃO',
      about: 'Acreditamos na harmonia entre volumetria pura, materiais nobres e sustentabilidade estrutural.',
      itemsTitle: 'Linhas de Atuação',
      items: [
        { id: '1', title: 'Consultoria Residencial', description: 'Estudo de layout, paleta de acabamentos e marcenaria inteligente.', price: 'Orçamento Sob Medida', priceEnabled: true },
        { id: '2', title: 'Projeto Arquitetônico Completo', description: 'Do conceito volumétrico à aprovação técnica de execução.', price: 'Sob Consulta', priceEnabled: true }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80', caption: 'Residência Origami' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11988887777', message: 'Olá! Gostaria de agendar uma reunião sobre meu projeto.', label: 'Iniciar Projeto' },
        instagram: { enabled: true, username: 'vertice.arq', url: 'https://instagram.com' }
      },
      location: {
        address: 'Av. Brigadeiro Faria Lima, 3477',
        city: 'São Paulo - SP',
        phone: '(11) 98888-7777',
        hours: 'Segunda a Sexta das 09h às 19h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderVertice
  },

  // 03 MONARCH (Editorial Luxury)
  {
    id: '03-monarch',
    code: '03',
    name: 'MONARCH',
    family: 'editorial',
    tone: 'claro',
    tagline: 'Sofisticação de revista com tipografia serif de alto contraste.',
    description: 'Fundo marfim claro, numerais romanos, respiro editorial e distinção.',
    rails: ['destaques', 'elegantes'],
    tags: ['claro', 'luxo', 'editorial', 'boutique', 'estetica', 'consultoria'],
    cover: {
      background: '#FAF8F5',
      primary: '#B45309',
      accent: '#1C1917',
      textColor: '#1C1917',
      surfaceColor: '#FFFFFF',
      badgeText: 'EDITORIAL PRESTIGE',
      sampleImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Edição Exclusiva de Alta Costura',
      fontHeading: 'Playfair Display'
    },
    demoData: {
      engineVersion: 2,
      templateId: '03-monarch',
      brandName: 'MAISON MONARCH',
      segment: 'Alta Costura & Alfaiataria Feminina',
      headline: 'Peças sob medida lapidadas com precisão e tecidos nobres italianos.',
      subheadline: 'COLEÇÃO PRIVADA • EDIÇÃO LIMITADA',
      about: 'Uma tradição preservada em cada corte, para mulheres que exigem elegância autêntica.',
      itemsTitle: 'Ateliê & Encomendas',
      items: [
        { id: '1', title: 'Smoking & Alfaiataria Fina', description: 'Corte artesanal sob medida em lã fria e seda pura.', price: 'Sob Medida', priceEnabled: true },
        { id: '2', title: 'Vestidos de Noite & Gala', description: 'Modelagem exclusiva e acabamento manual.', price: 'Consulte Ateliê', priceEnabled: true }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80', caption: 'Coleção Outono/Inverno' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '21977776666', message: 'Olá! Gostaria de agendar uma prova no ateliê Monarch.', label: 'Agendar Horário' },
        instagram: { enabled: true, username: 'maisonmonarch', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Garcia d’Ávila, 108',
        city: 'Rio de Janeiro - RJ',
        phone: '(21) 97777-6666',
        hours: 'Atendimento exclusivo com hora marcada',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderMonarch
  },

  // 04 PULSE (Graphic Bold)
  {
    id: '04-pulse',
    code: '04',
    name: 'PULSE',
    family: 'graphic',
    tone: 'escuro',
    tagline: 'Energia máxima, ticker animado e atitude urbana.',
    description: 'Amarelo neon, crimson eletrizante, stickers gráficos e ritmo acelerado.',
    rails: ['impacto', 'ousados'],
    tags: ['esporte', 'personal', 'treino', 'energia', 'streetwear'],
    cover: {
      background: '#0A0A0C',
      primary: '#CCFF00',
      accent: '#E11D48',
      textColor: '#FFFFFF',
      surfaceColor: '#141419',
      badgeText: 'HIGH ENERGY',
      sampleImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Alta Performance & Foco Total',
      fontHeading: 'Chakra Petch'
    },
    demoData: {
      engineVersion: 2,
      templateId: '04-pulse',
      brandName: 'PULSE PERFORMANCE',
      segment: 'Consultoria Fitness & Personal Trainer',
      headline: 'Metodologia de alta intensidade para transformar sua forma física.',
      subheadline: 'TREINO • NUTRIÇÃO • DISCIPLINA',
      about: 'Sem desculpas. Acompanhamento rigoroso que quebra platôs e garante evolução real.',
      itemsTitle: 'Protocolos de Treino',
      items: [
        { id: '1', title: 'Consultoria Online VIP', description: 'Periodização completa no app com análise semanal de cargas.', price: 'R$ 290/mês', priceEnabled: true },
        { id: '2', title: 'Personal Presencial', description: 'Aulas individuais exclusivas no estúdio com foco em biomecânica.', price: 'R$ 800/mês', priceEnabled: true }
      ],
      gallery: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11966665555', message: 'Quero iniciar meu protocolo com o Pulse!', label: 'Bora Começar' },
        instagram: { enabled: true, username: 'pulse.fit', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Bela Cintra, 890',
        city: 'São Paulo - SP',
        phone: '(11) 96666-5555',
        hours: 'Segunda a Sábado das 06h às 21h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderPulse
  },

  // 05 ATELIER (Minimal Artisanal)
  {
    id: '05-atelier',
    code: '05',
    name: 'ATELIER',
    family: 'minimal',
    tone: 'claro',
    tagline: 'Quiet luxury artesanal, tons de areia e harmonia calma.',
    description: 'Linhas finas, respiro acolhedor, estética cerâmica e serenidade.',
    rails: ['elegantes', 'destaques'],
    tags: ['claro', 'minimalista', 'ceramica', 'artesanal', 'spa', 'calmo'],
    cover: {
      background: '#F5F2EB',
      primary: '#8C4A32',
      accent: '#262320',
      textColor: '#262320',
      surfaceColor: '#EFECE4',
      badgeText: 'MINIMAL STUDIO',
      sampleImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'O Toque Sagrado do Feito à Mão',
      fontHeading: 'Playfair Display'
    },
    demoData: {
      engineVersion: 2,
      templateId: '05-atelier',
      brandName: 'ATELIER TERRA',
      segment: 'Cerâmica & Objetos de Design',
      headline: 'Peças únicas modeladas em torno lento com queima em alta temperatura.',
      subheadline: 'CERÂMICA AUTORAL • SLOW LIVING',
      about: 'A beleza imperfeita da terra e do fogo para criar rituais diários com mais presença.',
      itemsTitle: 'Coleções & Workshops',
      items: [
        { id: '1', title: 'Conjunto Ritual do Chá', description: 'Bule e duas xícaras esmaltadas em cinza mineral.', price: 'R$ 240', priceEnabled: true },
        { id: '2', title: 'Imersão de Final de Semana', description: 'Aprenda os fundamentos do torno cerâmico com tudo incluso.', price: 'R$ 680', priceEnabled: true }
      ],
      gallery: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11955554444', message: 'Olá! Gostaria de encomendar uma peça no Atelier Terra.', label: 'Falar com Ateliê' },
        instagram: { enabled: true, username: 'atelierterra', url: 'https://instagram.com' }
      },
      location: {
        address: 'Vila Madalena, Rua Harmonia 412',
        city: 'São Paulo - SP',
        phone: '(11) 95555-4444',
        hours: 'Quarta a Domingo das 11h às 18h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderAtelier
  },

  // 06 PRISMA (Immersive Glass)
  {
    id: '06-prisma',
    code: '06',
    name: 'PRISMA',
    family: 'immersive',
    tone: 'escuro',
    tagline: 'Vidro fosco óptico com refração de luz e esferas luminosas.',
    description: 'Backdrop-filter blur profundo, bordas iridescentes e clima cyber-luxe.',
    rails: ['impacto', 'ousados'],
    tags: ['glass', 'imersivo', 'tecnologia', 'software', 'luxo'],
    cover: {
      background: '#060814',
      primary: '#38BDF8',
      accent: '#A855F7',
      textColor: '#FFFFFF',
      surfaceColor: 'rgba(255,255,255,0.05)',
      badgeText: 'PRISMA GLASS',
      sampleImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Refração de Luz & Interatividade',
      fontHeading: 'Plus Jakarta Sans'
    },
    demoData: {
      engineVersion: 2,
      templateId: '06-prisma',
      brandName: 'PRISMA DIGITAL LAB',
      segment: 'Desenvolvimento Web & Soluções Digitais',
      headline: 'Criamos interfaces digitais memoráveis que aceleram negócios e encantam clientes.',
      subheadline: 'ENGINEERING • EXPERIÊNCIA',
      about: 'Do conceito visual refinado até a infraestrutura em nuvem segura e ultrarrápida.',
      itemsTitle: 'Nossos Serviços',
      items: [
        { id: '1', title: 'Biosite & Plataformas Web', description: 'Design exclusivo sob medida com tempo de carregamento instantâneo.', price: 'Sob Medida', priceEnabled: true },
        { id: '2', title: 'Consultoria de Conversão', description: 'Otimização de páginas de vendas e fluxos de agendamento.', price: 'Sob Consulta', priceEnabled: true }
      ],
      gallery: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11944443333', message: 'Olá! Quero um projeto desenvolvido pelo Prisma.', label: 'Solicitar Proposta' },
        instagram: { enabled: true, username: 'prismalab', url: 'https://instagram.com' }
      },
      location: {
        address: 'Polo Tecnológico Digital',
        city: 'São Paulo - SP',
        phone: '(11) 94444-3333',
        hours: 'Atendimento Global Online',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderPrisma
  },

  // 07 FRAME (Portfolio Lookbook)
  {
    id: '07-frame',
    code: '07',
    name: 'FRAME',
    family: 'portfolio',
    tone: 'escuro',
    tagline: 'O trabalho em primeiro lugar. Curadoria visual e grid de fotos.',
    description: 'Layout lookbook, molduras limpas, fotos protagonistas e apelo artístico.',
    rails: ['fotografia', 'destaques'],
    tags: ['fotografia', 'portfolio', 'cinema', 'ensaio', 'arte'],
    cover: {
      background: '#0D0E12',
      primary: '#FFFFFF',
      accent: '#9CA3AF',
      textColor: '#FFFFFF',
      surfaceColor: '#151720',
      badgeText: 'LOOKBOOK PRO',
      sampleImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Imagens Que Permanecem no Tempo',
      fontHeading: 'Plus Jakarta Sans'
    },
    demoData: {
      engineVersion: 2,
      templateId: '07-frame',
      brandName: 'FRAME FOTOGRAFIA',
      segment: 'Fotografia Autoral & Ensaios Corporativos',
      headline: 'A sensibilidade de capturar a essência da sua marca e da sua história.',
      subheadline: 'DIREÇÃO DE ARTE • LUZ NATURAL',
      about: 'Especialista em retratos de posicionamento, editoriais de moda e campanhas institucionais.',
      itemsTitle: 'Ensaios Disponíveis',
      items: [
        { id: '1', title: 'Ensaio de Posicionamento Profissional', description: 'Direção de estilo, locação exclusiva e 25 fotos em alta resolução.', price: 'R$ 1.200', priceEnabled: true },
        { id: '2', title: 'Cobertura de Evento Exclusivo', description: 'Registro discreto e sofisticado com entrega expressa.', price: 'Orçamento Sob Consulta', priceEnabled: true }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&auto=format&fit=crop&q=80', caption: 'Campanha de Marca' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', caption: 'Retrato Editorial' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11933332222', message: 'Olá! Gostaria de agendar um ensaio fotográfico.', label: 'Reservar Data' },
        instagram: { enabled: true, username: 'framephoto', url: 'https://instagram.com' }
      },
      location: {
        address: 'Estúdio Frame • Itaim Bibi',
        city: 'São Paulo - SP',
        phone: '(11) 93333-2222',
        hours: 'Ensaios mediante agendamento prévio',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderFrame
  },

  // 08 NOVA (Poster Campaign)
  {
    id: '08-nova',
    code: '08',
    name: 'NOVA',
    family: 'poster',
    tone: 'escuro',
    tagline: 'Tipografia display monumental e estética de manifesto de campanha.',
    description: 'Títulos em 52px, carimbos gráficos, contraste de alto impacto e pegada cultural.',
    rails: ['ousados', 'impacto'],
    tags: ['poster', 'manifesto', 'campanha', 'evento', 'criativo'],
    cover: {
      background: '#0B0B0E',
      primary: '#FF3B30',
      accent: '#FFFFFF',
      textColor: '#FFFFFF',
      surfaceColor: '#000000',
      badgeText: 'CAMPAIGN POSTER',
      sampleImage: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Comunicação Que Marca Época',
      fontHeading: 'Syne'
    },
    demoData: {
      engineVersion: 2,
      templateId: '08-nova',
      brandName: 'NOVA FESTIVAL',
      segment: 'Eventos Culturais & Experiências Gastronômicas',
      headline: 'Onde arte urbana, música independente e gastronomia autoral convergem.',
      subheadline: 'EDIÇÃO ANUAL • SÃO PAULO',
      about: 'Três dias de celebração da cultura contemporânea no coração da metrópole.',
      itemsTitle: 'Acessos & Experiências',
      items: [
        { id: '1', title: 'Passaporte Geral 3 Dias', description: 'Acesso completo a todas as atrações, palestras e praça gastronômica.', price: 'R$ 220', priceEnabled: true },
        { id: '2', title: 'Experiência Lounge VIP', description: 'Open bar premium, vista privilegiada dos palcos e kit exclusivo.', price: 'R$ 490', priceEnabled: true }
      ],
      gallery: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11922221111', message: 'Olá! Informações sobre ingressos do Nova Festival.', label: 'Garantir Ingresso' },
        instagram: { enabled: true, username: 'novafest', url: 'https://instagram.com' }
      },
      location: {
        address: 'Pavilhão das Culturas Brasileiras',
        city: 'São Paulo - SP',
        phone: '(11) 92222-1111',
        hours: 'Portões abrem às 14h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderNova
  },

  // 09 ÉLITE (Personal Brand)
  {
    id: '09-elite',
    code: '09',
    name: 'ÉLITE',
    family: 'personal',
    tone: 'escuro',
    tagline: 'Pessoa protagonista com recorte fotográfico e aura dourada de prestígio.',
    description: 'Destaque para sua autoridade, métricas comprovadas e posicionamento VIP.',
    rails: ['destaques', 'elegantes', 'locais'],
    tags: ['autoridade', 'personal', 'advogado', 'medico', 'consultor', 'mentor'],
    cover: {
      background: '#0A0B10',
      primary: '#D4AF37',
      accent: '#FFFFFF',
      textColor: '#FFFFFF',
      surfaceColor: '#12141F',
      badgeText: 'AUTHORITY VIP',
      sampleImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Advocacia Estratégica & Confiança',
      fontHeading: 'Cinzel'
    },
    demoData: {
      engineVersion: 2,
      templateId: '09-elite',
      brandName: 'DRA. HELENA MOREIRA',
      segment: 'Direito Societário & Planejamento Sucessório',
      headline: 'Soluções jurídicas preventivas para famílias empresárias e líderes de mercado.',
      subheadline: 'ADVOGADA SÊNIOR • OAB/SP 289.412',
      about: 'Especialista com mais de 15 anos de prática em proteção patrimonial e reestruturação corporativa.',
      itemsTitle: 'Especialidades Jurídicas',
      items: [
        { id: '1', title: 'Blindagem & Holding Familiar', description: 'Estruturação jurídica completa para perpetuação do patrimônio.', price: 'Consulta Prévia', priceEnabled: true },
        { id: '2', title: 'Consultoria Societária Estratégica', description: 'Acordo de sócios, governança e resolução pacífica de disputas.', price: 'Sob Consulta', priceEnabled: true }
      ],
      gallery: [],
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      heroImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11911112222', message: 'Dra. Helena, gostaria de agendar uma consulta sigilosa.', label: 'Agendar Consulta' },
        instagram: { enabled: true, username: 'dra.helenamoreira', url: 'https://instagram.com' }
      },
      location: {
        address: 'Edifício Infinity Tower, 18º Andar',
        city: 'São Paulo - SP',
        phone: '(11) 91111-2222',
        hours: 'Segunda a Sexta das 09h às 18h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderElite
  },

  // 10 ORBIT (Story / Narrative)
  {
    id: '10-orbit',
    code: '10',
    name: 'ORBIT',
    family: 'story',
    tone: 'escuro',
    tagline: 'Jornada progressiva em etapas com barra de ação persistente.',
    description: 'Timeline interativa, narrativa guiada passo a passo e alta taxa de conversão.',
    rails: ['destaques', 'locais', 'ousados'],
    tags: ['story', 'processo', 'metodo', 'consultoria', 'servico'],
    cover: {
      background: '#080A12',
      primary: '#6366F1',
      accent: '#818CF8',
      textColor: '#FFFFFF',
      surfaceColor: '#101322',
      badgeText: 'PROGRESSIVE STORY',
      sampleImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Jornada Completa Rumo ao Sucesso',
      fontHeading: 'Plus Jakarta Sans'
    },
    demoData: {
      engineVersion: 2,
      templateId: '10-orbit',
      brandName: 'ORBIT CONSULTORIA',
      segment: 'Aceleração de Vendas & Gestão Comercial',
      headline: 'Organizamos seus processos de captação para multiplicar seu faturamento previsível.',
      subheadline: 'MÉTODO DE 4 ETAPAS • ESCALA SEGURA',
      about: 'Do diagnóstico da sua operação até a capacitação do time, implementamos um sistema de crescimento sustentável.',
      itemsTitle: 'As 4 Etapas da Implantação',
      items: [
        { id: '1', title: 'Diagnóstico & Mapeamento de Furos', description: 'Identificação imediata de gargalos comerciais e oportunidades perdidas.' },
        { id: '2', title: 'Construção da Máquina de Vendas', description: 'Playbook comercial, roteiros persuasivos e automações de CRM.' },
        { id: '3', title: 'Treinamento Intensivo da Equipe', description: 'Capacitação prática em negociação consultiva e fechamento.' },
        { id: '4', title: 'Acompanhamento de Resultados', description: 'Rituais semanais de gestão e métricas em tempo real.' }
      ],
      gallery: [],
      heroImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11900001111', message: 'Olá! Gostaria de um diagnóstico gratuito da minha operação.', label: 'Agendar Diagnóstico' },
        instagram: { enabled: true, username: 'orbitvendas', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua do Rócio, 423',
        city: 'São Paulo - SP',
        phone: '(11) 90000-1111',
        hours: 'Atendimento Corporativo Nacional',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: renderOrbit
  }
];

// Helper to register designs 11 to 50 dynamically with appropriate families & themes
const EXTRA_DESIGN_NAMES: Array<{
  code: string;
  name: string;
  family: V2Family;
  tone: V2Tone;
  tagline: string;
  business: string;
  sampleImg: string;
  primary: string;
}> = [
  { code: '11', name: 'IMPACT', family: 'graphic', tone: 'escuro', tagline: 'Cores elétricas e composições publicitárias contundentes.', business: 'Agência de Lançamentos & Tráfego', sampleImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80', primary: '#3B82F6' },
  { code: '12', name: 'VISION', family: 'cinematic', tone: 'escuro', tagline: 'Perspectivas amplas e presença audiovisual marcante.', business: 'Produtora de Vídeo & Cinema', sampleImg: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=80', primary: '#F59E0B' },
  { code: '13', name: 'SIGNATURE', family: 'personal', tone: 'escuro', tagline: 'Assinatura autoral para figuras públicas e palestrantes.', business: 'Palestrante & Escritor Best-Seller', sampleImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80', primary: '#D4AF37' },
  { code: '14', name: 'ELEMENT', family: 'minimal', tone: 'claro', tagline: 'Elementos fundamentais dispostos com pureza geométrica.', business: 'Clínica de Fisioterapia & Movimento', sampleImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', primary: '#0D9488' },
  { code: '15', name: 'STUDIO', family: 'portfolio', tone: 'escuro', tagline: 'O centro criativo onde ideias ganham forma visual.', business: 'Design de Marcas & Identidade Visual', sampleImg: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80', primary: '#E5E7EB' },
  { code: '16', name: 'PRIME', family: 'editorial', tone: 'claro', tagline: 'Excelência tradicional para serviços nobres de alta categoria.', business: 'Contabilidade Estratégica & Gestão Fiscal', sampleImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80', primary: '#1E293B' },
  { code: '17', name: 'MOTION', family: 'graphic', tone: 'escuro', tagline: 'Dinamismo visual que acompanha a velocidade do mercado.', business: 'Assessoria de Corrida & Triatlo', sampleImg: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80', primary: '#EF4444' },
  { code: '18', name: 'ESSENCE', family: 'minimal', tone: 'claro', tagline: 'A busca pelo essencial sem ruídos ou artifícios supérfluos.', business: 'Dermatologia & Cuidados Integrativos', sampleImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80', primary: '#A16207' },
  { code: '19', name: 'VOGUE', family: 'editorial', tone: 'claro', tagline: 'Cultura fashionista com refinamento digno de passarela.', business: 'Salão Conceito & Visagismo', sampleImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80', primary: '#831843' },
  { code: '20', name: 'LEGACY', family: 'personal', tone: 'escuro', tagline: 'Histórias construídas para atravessar gerações de sucesso.', business: 'Gestão de Patrimônio & Family Office', sampleImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80', primary: '#CA8A04' },
  { code: '21', name: 'NOIR', family: 'cinematic', tone: 'escuro', tagline: 'Preto profundo, sombras misteriosas e elegância noturna.', business: 'Barbearia Clássica & Tabacaria', sampleImg: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', primary: '#F97316' },
  { code: '22', name: 'IVORY', family: 'editorial', tone: 'claro', tagline: 'Tons de marfim suave e sofisticação límpida sem exageros.', business: 'Design de Joias & Alta Ourivesaria', sampleImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80', primary: '#9A3412' },
  { code: '23', name: 'CHROME', family: 'immersive', tone: 'escuro', tagline: 'Reflexos metálicos cromados e estética industrial contemporânea.', business: 'Oficina Premium & Restauração Automotiva', sampleImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80', primary: '#06B6D4' },
  { code: '24', name: 'TERRACOTTA', family: 'minimal', tone: 'claro', tagline: 'Aconchego terroso inspirado nas paisagens do Mediterrâneo.', business: 'Restaurante Mediterrâneo & Empório', sampleImg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', primary: '#C2410C' },
  { code: '25', name: 'BLOOM', family: 'minimal', tone: 'claro', tagline: 'Frescor botânico, cores suaves e delicadeza em cada ângulo.', business: 'Floricultura & Decoração Botânica', sampleImg: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&auto=format&fit=crop&q=80', primary: '#EC4899' },
  { code: '26', name: 'URBAN', family: 'poster', tone: 'escuro', tagline: 'Cultura de rua autêntica, grafismos fortes e ritmo paulistano.', business: 'Pizzaria Napolitana Urbana', sampleImg: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80', primary: '#E11D48' },
  { code: '27', name: 'HERITAGE', family: 'editorial', tone: 'claro', tagline: 'Tradição secular honrada com requinte no tempo presente.', business: 'Confeitaria Artesanal Francesa', sampleImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80', primary: '#78350F' },
  { code: '28', name: 'CANVAS', family: 'portfolio', tone: 'claro', tagline: 'O espaço em branco perfeito para valorizar obras de arte.', business: 'Galeria de Arte & Molduraria Fina', sampleImg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80', primary: '#27272A' },
  { code: '29', name: 'FUSION', family: 'bento', tone: 'escuro', tagline: 'A fusão harmoniosa de contrastes e dados em harmonia.', business: 'Restaurante Asiático Fusion & Omakase', sampleImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80', primary: '#F43F5E' },
  { code: '30', name: 'INFINITY', family: 'immersive', tone: 'escuro', tagline: 'Horizontes infinitos com efeitos de profundidade contínua.', business: 'Corretora de Imóveis Alto Padrão', sampleImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80', primary: '#38BDF8' },
  { code: '31', name: 'PERSONA', family: 'personal', tone: 'claro', tagline: 'A voz singular de quem lidera sua área com carisma e verdade.', business: 'Mentoria de Carreira & Liderança Feminina', sampleImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', primary: '#BE185D' },
  { code: '32', name: 'STORY', family: 'story', tone: 'escuro', tagline: 'Narrativas envolventes que prendem a atenção do primeiro ao último segundo.', business: 'Marketing de Conteúdo & Copywriting', sampleImg: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80', primary: '#6366F1' },
  { code: '33', name: 'FOCUS', family: 'minimal', tone: 'escuro', tagline: 'Foco total no produto sem distrações ou ruído periférico.', business: 'Óptica Conceito & Armações Especiais', sampleImg: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&auto=format&fit=crop&q=80', primary: '#10B981' },
  { code: '34', name: 'MOMENT', family: 'portfolio', tone: 'claro', tagline: 'Captura impecável de instantes que se tornam inesquecíveis.', business: 'Fotografia de Casamento & Família', sampleImg: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80', primary: '#F59E0B' },
  { code: '35', name: 'ICON', family: 'poster', tone: 'escuro', tagline: 'Imagens e símbolos que se consolidam como ícones de referência.', business: 'Estúdio de Tatuagem Autoral & Piercing', sampleImg: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80', primary: '#E11D48' },
  { code: '36', name: 'AVANT', family: 'bento', tone: 'escuro', tagline: 'Vanguarda criativa que antecipa tendências visuais globais.', business: 'Estúdio Criativo de Brand Strategy', sampleImg: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80', primary: '#8B5CF6' },
  { code: '37', name: 'FLOW', family: 'minimal', tone: 'claro', tagline: 'Fluidez e bem-estar em perfeita sintonia corporal e mental.', business: 'Estúdio de Yoga, Pilates & Respiração', sampleImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80', primary: '#059669' },
  { code: '38', name: 'SCENE', family: 'cinematic', tone: 'escuro', tagline: 'Composição de cena de alta densidade visual e iluminação cênica.', business: 'Iluminação Cênica & Sonorização de Eventos', sampleImg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80', primary: '#F59E0B' },
  { code: '39', name: 'MAGAZINE', family: 'editorial', tone: 'claro', tagline: 'Estrutura clássica de grandes publicações de design mundiais.', business: 'Jornalismo Cultural & Curadoria', sampleImg: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80', primary: '#18181B' },
  { code: '40', name: 'GALLERY', family: 'portfolio', tone: 'escuro', tagline: 'O santuário visual onde cada projeto ganha destaque solene.', business: 'Acervo de Design de Mobiliário Brasileiro', sampleImg: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80', primary: '#D97706' },
  { code: '41', name: 'BOLD', family: 'graphic', tone: 'escuro', tagline: 'Coragem tipográfica e contraste destemido para marcas audaciosas.', business: 'Agência de Branding Desafiador', sampleImg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80', primary: '#EA580C' },
  { code: '42', name: 'PURE', family: 'minimal', tone: 'claro', tagline: 'Pureza alva, luz difusa e simplicidade que acalma os olhos.', business: 'Cosméticos Naturais & Biológicos', sampleImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', primary: '#14B8A6' },
  { code: '43', name: 'GLASS', family: 'immersive', tone: 'escuro', tagline: 'Camadas translúcidas com refração prismática suave.', business: 'Tecnologia em Nuvem & Cibersegurança', sampleImg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80', primary: '#60A5FA' },
  { code: '44', name: 'EDITOR', family: 'editorial', tone: 'claro', tagline: 'A visão aguçada de quem edita a realidade com critério impecável.', business: 'Editora Independente & Tipografia', sampleImg: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80', primary: '#44403C' },
  { code: '45', name: 'CINEMA', family: 'cinematic', tone: 'escuro', tagline: 'A magia da sétima arte traduzida em um biosite memorável.', business: 'Color Grading & Pós-Produção de Cinema', sampleImg: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80', primary: '#FBBF24' },
  { code: '46', name: 'SOCIAL', family: 'graphic', tone: 'escuro', tagline: 'Conexões rápidas e presença dinâmica em todas as redes.', business: 'Gestão de Comunidade & Criadores de Conteúdo', sampleImg: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80', primary: '#8B5CF6' },
  { code: '47', name: 'LOCAL', family: 'bento', tone: 'claro', tagline: 'O negócio querido do bairro com horários, mapa e acolhimento.', business: 'Cafeteria Especial & Pães de Fermentação Natural', sampleImg: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80', primary: '#B45309' },
  { code: '48', name: 'PORTFOLIO', family: 'portfolio', tone: 'escuro', tagline: 'Demonstração irrefutável de habilidade técnica e criativa.', business: 'Ilustração Digital & Concept Art', sampleImg: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&auto=format&fit=crop&q=80', primary: '#F43F5E' },
  { code: '49', name: 'IMMERSIVE', family: 'immersive', tone: 'escuro', tagline: 'Imersão espacial que transporta o cliente para o universo da marca.', business: 'Realidade Virtual & Experiências 3D', sampleImg: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&auto=format&fit=crop&q=80', primary: '#06B6D4' },
  { code: '50', name: 'ONE', family: 'personal', tone: 'escuro', tagline: 'A experiência definitiva que condensa o ápice da identidade visual.', business: 'Consultoria de Posicionamento Estratégico', sampleImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80', primary: '#F59E0B' }
];

// Add designs 11 to 50 to V2_DESIGNS
EXTRA_DESIGN_NAMES.forEach((cfg) => {
  const familyRenderer = getRendererForFamily(cfg.family);
  V2_DESIGNS.push({
    id: `${cfg.code}-${cfg.name.toLowerCase()}`,
    code: cfg.code,
    name: cfg.name,
    family: cfg.family,
    tone: cfg.tone,
    tagline: cfg.tagline,
    description: `Experiência autoral da família ${cfg.family.toUpperCase()} criada para alta performance.`,
    rails: cfg.tone === 'claro'
      ? ['elegantes', 'destaques']
      : cfg.family === 'graphic' || cfg.family === 'poster'
      ? ['impacto', 'ousados']
      : cfg.family === 'portfolio'
      ? ['fotografia', 'destaques']
      : ['destaques', 'locais'],
    tags: [cfg.tone, cfg.family, cfg.name.toLowerCase(), 'premium', 'autoral'],
    cover: {
      background: cfg.tone === 'claro' ? '#FAF8F5' : '#090A0F',
      primary: cfg.primary,
      accent: cfg.tone === 'claro' ? '#1C1917' : '#FFFFFF',
      textColor: cfg.tone === 'claro' ? '#1C1917' : '#FFFFFF',
      surfaceColor: cfg.tone === 'claro' ? '#FFFFFF' : '#12141F',
      badgeText: cfg.family.toUpperCase(),
      sampleImage: cfg.sampleImg,
      heroHeadline: cfg.business,
      fontHeading: cfg.tone === 'claro' ? 'Playfair Display' : 'Syne'
    },
    demoData: {
      engineVersion: 2,
      templateId: `${cfg.code}-${cfg.name.toLowerCase()}`,
      brandName: `${cfg.name} • ${cfg.business.toUpperCase()}`,
      segment: cfg.business,
      headline: cfg.tagline,
      subheadline: `${cfg.name} OFFICIAL EXPERIENCE`,
      about: `Dedicados à excelência em ${cfg.business}, combinando estética apurada e atendimento de confiança.`,
      itemsTitle: 'Serviços & Especialidades',
      items: [
        { id: '1', title: `Atendimento ${cfg.name} Standard`, description: 'Solução completa desenhada para resultados rápidos e consistentes.', price: 'R$ 350', priceEnabled: true },
        { id: '2', title: `Consultoria ${cfg.name} Signature`, description: 'Acompanhamento estratégico dedicado com suporte prioritário.', price: 'Sob Consulta', priceEnabled: true }
      ],
      gallery: [
        { id: 'g1', url: cfg.sampleImg, caption: `${cfg.name} Experiência` }
      ],
      heroImageUrl: cfg.sampleImg,
      professionalPhotoUrl: cfg.family === 'personal' ? cfg.sampleImg : undefined,
      socials: {
        whatsapp: { enabled: true, number: '11987654321', message: `Olá! Vim pelo site da ${cfg.name}.`, label: 'Iniciar Atendimento' },
        instagram: { enabled: true, username: `${cfg.name.toLowerCase()}.oficial`, url: 'https://instagram.com' }
      },
      location: {
        address: 'Av. Paulista, 1000',
        city: 'São Paulo - SP',
        phone: '(11) 98765-4321',
        hours: 'Segunda a Sábado das 09h às 19h',
        mapsUrl: 'https://maps.google.com'
      }
    },
    renderer: familyRenderer
  });
});

// Map for ultra-fast lookup by ID
const DESIGN_MAP = new Map<string, V2DesignMeta>();
V2_DESIGNS.forEach((d) => {
  DESIGN_MAP.set(d.id, d);
  DESIGN_MAP.set(d.code, d);
  DESIGN_MAP.set(d.name.toLowerCase(), d);
});

export const getV2DesignById = (id?: string): V2DesignMeta => {
  if (!id) return V2_DESIGNS[0];
  const found = DESIGN_MAP.get(id) || DESIGN_MAP.get(id.toLowerCase());
  return found || V2_DESIGNS[0];
};

/**
 * Mandatory Development Registry Validator
 * Checks all 50 designs, validates id, name, defaultData, runs renderer, and verifies valid non-empty HTML document.
 */
export const validateTemplateRegistry = (): { total: number; valid: number; invalid: number } => {
  let validCount = 0;
  let invalidCount = 0;
  const errors: string[] = [];

  V2_DESIGNS.forEach((d) => {
    try {
      if (!d.id || !d.name || !d.renderer || !d.demoData) {
        throw new Error(`Definição incompleta em ${d.name}`);
      }
      const html = d.renderer(d.demoData);
      if (!html || typeof html !== 'string' || html.trim().length === 0) {
        throw new Error(`Render retornou vazio em ${d.name}`);
      }
      if (!html.includes('<!DOCTYPE html>')) {
        throw new Error(`HTML sem doctype válido em ${d.name}`);
      }
      validCount++;
    } catch (err: any) {
      invalidCount++;
      errors.push(`[${d.name}] ${err?.message || err}`);
    }
  });

  console.log('==========================================');
  console.log('BIO FÁCIL TEMPLATE TEST');
  console.log(`${V2_DESIGNS.length} registrados`);
  console.log(`${validCount} válidos`);
  console.log(`${invalidCount} inválidos`);
  if (invalidCount > 0) {
    console.error('Erros no registro:', errors);
  }
  console.log('==========================================');

  return { total: V2_DESIGNS.length, valid: validCount, invalid: invalidCount };
};

// Run automatically on module load
try {
  validateTemplateRegistry();
} catch (e) {
  console.error('Falha ao validar TemplateRegistryV2:', e);
}
