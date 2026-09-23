import { V2DesignMeta, V2ProjectData } from '../types';
import {
  renderBarbeariaCinematic,
  renderBarbeariaEditorial,
  renderBarbeariaProfile,
  renderBarbeariaGraphic,
  renderBarbeariaImmersive,
  renderBarbeariaMinimal,
  renderBarbeariaBento,
  renderBarbeariaStorytelling,
  renderBarbeariaPoster,
  renderBarbeariaSignature
} from '../engine/families/barbearia';

export const BARBEARIA_DESIGNS: V2DesignMeta[] = [
  // 01 CINEMATIC
  {
    id: 'barbearia-01-cinematic',
    code: '01',
    name: 'BARBEARIA CINEMATIC NOIR',
    family: 'cinematic',
    tone: 'escuro',
    tagline: 'Atmosfera de cinema, iluminação dramática âmbar e lounge exclusivo.',
    description: '10 blocos visuais completos com ritual de toalha quente, galeria de cortes e drinks selecionados.',
    rails: ['destaques', 'impacto', 'fotografia', 'locais'],
    tags: ['barbearia', 'luxo', 'cinematografico', 'escuro', 'ouro', 'pub'],
    cover: {
      background: '#060709',
      primary: '#F59E0B',
      accent: '#B45309',
      textColor: '#FFFFFF',
      surfaceColor: '#0E111A',
      badgeText: 'CINEMATIC NOIR',
      sampleImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'A Arte do Corte Elevada ao Nível de Cinema',
      fontHeading: 'Cinzel'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-01-cinematic',
      brandName: 'THE BARON BARBERSHOP',
      segment: 'Barbearia & Clube Masculino',
      headline: 'A ARTE DO CORTE ELEVADA AO NÍVEL DE CINEMA.',
      subheadline: 'EXPERIÊNCIA NOTURNA & RITUAL CLÁSSICO DE NAVALHA',
      about: 'Fundada para o homem que entende que imagem é poder. Um refúgio secreto onde a tradição da navalha afiada se encontra com a alta hospitalidade, drinks selecionados e precisão milimétrica em cada detalhe.',
      itemsTitle: 'Cortes & Rituais',
      items: [
        {
          id: '1',
          title: 'Corte Executivo à Tesoura & Navalha',
          description: 'Visagismo completo, lavagem terapêutica, corte preciso e finalização com pomada matte importada.',
          price: 'R$ 85',
          priceEnabled: true,
          tag: 'MAIS PEDIDO'
        },
        {
          id: '2',
          title: 'Barboterapia com Toalha Fumegante',
          description: 'Amolecimento térmico dos poros com óleos essenciais, navalha japonesa Feather, massagem facial e loção refrescante.',
          price: 'R$ 70',
          priceEnabled: true
        },
        {
          id: '3',
          title: 'Combo Real (Cabelo + Barba + Chopp)',
          description: 'O ritual completo na mesma sessão com drink cortesia da nossa carta de maltes e toalha perfumada.',
          price: 'R$ 140',
          priceEnabled: true,
          tag: 'EXPERIÊNCIA COMPLETA',
          featured: true
        },
        {
          id: '4',
          title: 'Camuflagem Suave de Grisalhos',
          description: 'Tonalização ultra-natural sem aspecto artificial. Rejuvenesce os fios mantendo a maturidade e elegância.',
          price: 'R$ 90',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'Precisão Milimétrica' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Fade Navalhado' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Barboterapia Clássica' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Acabamento Artesanal' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80',
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar um horário no The Baron Barbershop.', label: 'Agendar Horário' },
        instagram: { enabled: true, username: 'thebaronbarbershop', url: 'https://instagram.com' }
      },
      location: {
        address: 'Av. Paulista, 1200 - Jardins',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 09h às 21h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaCinematic
  },

  // 02 EDITORIAL
  {
    id: 'barbearia-02-editorial',
    code: '02',
    name: 'ATELIER BARBIER EDITORIAL',
    family: 'editorial',
    tone: 'editorial',
    tagline: 'Revista de moda masculina com tipografia Bodoni e estética marfim.',
    description: 'Visual GQ / Kinfolk, colunas duplas com capitular, números romanos e lookbook de passarela.',
    rails: ['elegantes', 'destaques', 'fotografia'],
    tags: ['barbearia', 'editorial', 'moda', 'claro', 'marfim', 'visagismo'],
    cover: {
      background: '#F7F5F0',
      primary: '#1E2024',
      accent: '#78350F',
      textColor: '#1E2024',
      surfaceColor: '#FFFFFF',
      badgeText: 'LOOKBOOK EDITORIAL',
      sampleImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'A Nova Elegância Masculina em Cada Traço',
      fontHeading: 'Bodoni Moda'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-02-editorial',
      brandName: 'ATELIER BARBIER',
      segment: 'Alta Barbearia & Visagismo',
      headline: 'A NOVA ELEGÂNCIA MASCULINA EM CADA TRAÇO.',
      subheadline: 'EDIÇÃO DE VISAGISMO & ALTA BARBEARIA • N° 07',
      about: 'Um espaço pensado para o homem contemporâneo que busca refinamento sem afetação. Nossa abordagem combina técnicas ancestrais de corte europeu com um estudo aprofundado das linhas anatômicas de cada cliente.',
      itemsTitle: 'Menu do Atelier',
      items: [
        {
          id: '1',
          title: 'I. Corte Arquitetural sob Medida',
          description: 'Análise minuciosa de formato craniano, lavagem com extratos botânicos e modelagem estruturada com tesoura artesanal.',
          price: 'R$ 95',
          priceEnabled: true,
          tag: 'ESSENCIAL'
        },
        {
          id: '2',
          title: 'II. Escultura de Barba & Contorno Facial',
          description: 'Desenho de linhas para ressaltar a mandíbula, toalha aromática aquecida com óleo de cedro e acabamento milimétrico.',
          price: 'R$ 80',
          priceEnabled: true,
          tag: 'ASSINATURA'
        },
        {
          id: '3',
          title: 'III. Tratamento Completo do Atelier',
          description: 'Corte completo, barboterapia relaxante, massagem craniana revigorante e esfoliação leve de pele.',
          price: 'R$ 160',
          priceEnabled: true,
          featured: true,
          tag: 'EXPERIÊNCIA COMPLETA'
        },
        {
          id: '4',
          title: 'IV. Harmonização de Barba Grisalha',
          description: 'Tonalização sutil de micropigmentos para unificar o tom dos fios sem cobrir 100% o prateado natural.',
          price: 'R$ 110',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 01 — Textura Natural' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 02 — Geometria & Linhas' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 03 — Cuidado da Pele' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 04 — Acabamento Clássico' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar uma sessão no Atelier Barbier.', label: 'Agendar Horário' },
        instagram: { enabled: true, username: 'atelierbarbier', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Oscar Freire, 840 - Cerqueira César',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 10h às 20h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaEditorial
  },

  // 03 PREMIUM PROFILE
  {
    id: 'barbearia-03-premium-profile',
    code: '03',
    name: 'MARCOS VINICIUS VISAGISTA',
    family: 'personal',
    tone: 'escuro',
    tagline: 'Foco na autoridade pessoal do mestre visagista com foto recortada em destaque.',
    description: 'Tipografia outline gigante, crachá de 14 anos de bancada, métricas e consultoria 3D exclusiva.',
    rails: ['destaques', 'impacto', 'ousados'],
    tags: ['barbearia', 'visagista', 'autoridade', 'pessoal', 'mestre', 'vip'],
    cover: {
      background: '#0A0D14',
      primary: '#38BDF8',
      accent: '#0284C7',
      textColor: '#FFFFFF',
      surfaceColor: '#0E131F',
      badgeText: 'MASTER VISAGISTA',
      sampleImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Transforme sua Imagem com Referência Nacional',
      fontHeading: 'Syne'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-03-premium-profile',
      brandName: 'MARCOS VINICIUS • MASTER VISAGISTA',
      segment: 'Visagismo Masculino de Alto Padrão',
      headline: 'TRANSFORME SUA IMAGEM COM QUEM É REFERÊNCIA NACIONAL.',
      subheadline: 'MESTRE VISAGISTA • ELEITO BARBEIRO DO ANO',
      about: 'Mais de 14 anos dedicados à lapidação da imagem masculina de alto padrão. Atendimento individual em estúdio exclusivo, onde cada corte é desenhado milimetricamente para expressar força, elegância e liderança.',
      itemsTitle: 'Procedimentos na Cadeira VIP',
      items: [
        {
          id: '1',
          title: 'Consultoria de Visagismo 3D + Corte Personalizado',
          description: 'Mapeamento das linhas faciais, análise de ângulos para fotos e reuniões, corte milimétrico e orientações de finalização diária.',
          price: 'R$ 150',
          priceEnabled: true,
          tag: 'MAIS PROCURADO',
          featured: true
        },
        {
          id: '2',
          title: 'Design Escultural de Barba & Contorno Terapêutico',
          description: 'Alinhamento com navalha japonesa, barboterapia com vapor de ozônio, hidratação profunda dos fios e massagem facial relaxante.',
          price: 'R$ 110',
          priceEnabled: true
        },
        {
          id: '3',
          title: 'Sessão VIP Completa (Cabelo, Barba & Harmonização)',
          description: '90 minutos de dedicação exclusiva em estúdio fechado com higienização capilar profunda e produtos importados de alta linha.',
          price: 'R$ 240',
          priceEnabled: true,
          tag: 'EXPERIÊNCIA EXCLUSIVA'
        },
        {
          id: '4',
          title: 'Manutenção Periódica Quinzenal',
          description: 'Ajuste de fade lateral e alinhamento do contorno da barba para clientes que necessitam de presença impecável constante.',
          price: 'R$ 130',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'Visagismo de Queixo e Fade' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Alinhamento em Barba Densa' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Tesoura de Alta Precisão' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Camuflagem Discreta' }
      ],
      professionalPhotoUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1000&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá Marcos! Gostaria de agendar uma consultoria VIP de visagismo.', label: 'Agendar com Marcos' },
        instagram: { enabled: true, username: 'marcosvinicius.barber', url: 'https://instagram.com' }
      },
      location: {
        address: 'Edifício Helbor Corporate - Sala 1402',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 09h às 20h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaProfile
  },

  // 04 GRAPHIC STREETWEAR
  {
    id: 'barbearia-04-graphic',
    code: '04',
    name: 'UNDERGROUND CUTS STREETWEAR',
    family: 'graphic',
    tone: 'criativo',
    tagline: 'Cultura urbana, skate, hip-hop, amarelo industrial e corte na régua.',
    description: 'Tipografia ultra-pesada Chakra Petch, marquee contínuo, stickers angulados e fotos estilo polaroid.',
    rails: ['ousados', 'impacto', 'locais'],
    tags: ['barbearia', 'streetwear', 'fade', 'hip-hop', 'amarelo', 'underground'],
    cover: {
      background: '#0A0A0A',
      primary: '#FACC15',
      accent: '#CA8A04',
      textColor: '#FFFFFF',
      surfaceColor: '#141414',
      badgeText: '100% STREETWEAR',
      sampleImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Corte na Régua. Sem Frescura. Som no Talo.',
      fontHeading: 'Chakra Petch'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-04-graphic',
      brandName: 'UNDERGROUND CUTS',
      segment: 'Streetwear & Urban Fades',
      headline: 'CORTE NA RÉGUA. SEM FRESCURA. SOM NO TALO.',
      subheadline: 'STREETWEAR • LOW FADE • URBAN LIFESTYLE',
      about: 'O ponto de encontro da cultura de rua. Aqui a navalha corre solta ao som do melhor hip-hop dos anos 90, com cerveja trincando na geladeira e a precisão cirúrgica de quem respira o fade todos os dias.',
      itemsTitle: 'Tabela de Cortes',
      items: [
        {
          id: '1',
          title: 'Skin Fade na Régua Máxima',
          description: 'Degradê zero milimétrico, transição suave sem marcas e acabamento na navalha com toalha refrescante.',
          price: 'R$ 65',
          priceEnabled: true,
          tag: 'O CLÁSSICO'
        },
        {
          id: '2',
          title: 'Barba Alinhada & Pigmentação',
          description: 'Desenho de linhas retas na navalha afiada com correção discreta de falhas na pigmentação temporária.',
          price: 'R$ 55',
          priceEnabled: true,
          tag: 'RÉGUA PURA'
        },
        {
          id: '3',
          title: 'Combo Cabelo + Barba + Sobrancelha',
          description: 'O pacote completo para sair pronto para o final de semana. Inclui cerveja gelada cortesia da bancada.',
          price: 'R$ 110',
          priceEnabled: true,
          featured: true,
          tag: 'DROP COMPLETO'
        },
        {
          id: '4',
          title: 'Freestyle & Desenho no Fade',
          description: 'Riscos geométricos, raios ou desenhos autorais criados na navalha livre pelo barbeiro.',
          price: 'R$ 40',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'TAPERING' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'SKIN FADE' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'BEARD LINE' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'FREESTYLE' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'E aí! Quero agendar um corte na régua no Underground.', label: 'Colar na Bancada' },
        instagram: { enabled: true, username: 'undergroundcuts', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Augusta, 1420 - Consolação',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Terça a Sábado: 10h às 22h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaGraphic
  },

  // 05 IMMERSIVE PUB & CLUB
  {
    id: 'barbearia-05-immersive',
    code: '05',
    name: "THE GENTLEMAN'S PUB & BARBERSHOP",
    family: 'immersive',
    tone: 'escuro',
    tagline: 'Pub britânico clássico com barbearia, 6 torneiras de chopp e sinuca.',
    description: 'Verde inglês, madeira mogno escura, combos de corte com pint de chopp e dia do noivo.',
    rails: ['destaques', 'locais', 'impacto'],
    tags: ['barbearia', 'pub', 'chopp', 'sinuca', 'confraria', 'british'],
    cover: {
      background: '#0E1612',
      primary: '#C59B4B',
      accent: '#0A1A14',
      textColor: '#FFFFFF',
      surfaceColor: '#141F1A',
      badgeText: 'PUB & BARBERSHOP',
      sampleImage: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'O Seu Ponto de Encontro. Corte, Chopp & Tradição.',
      fontHeading: 'Cinzel'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-05-immersive',
      brandName: "THE GENTLEMAN'S PUB & BARBERSHOP",
      segment: 'Pub & Barbearia Britânica',
      headline: 'O SEU NOVO PONTO DE ENCONTRO. CORTE, CHOPP & TRADIÇÃO.',
      subheadline: 'PUB BRITÂNICO • SINUCA BRUNSWICK • ALTA BARBEARIA',
      about: 'Um refúgio criado para que o homem moderno resgate o prazer de desacelerar. Muito além de cortar o cabelo ou alinhar a barba: você saboreia um chopp artesanal tirado na hora, desafia os amigos na sinuca e desfruta de um ambiente pensado exclusivamente para o seu conforto.',
      itemsTitle: 'Combos Cadeira & Pub',
      items: [
        {
          id: '1',
          title: 'Combo Pint & Cut (Corte + Chopp Artesanal)',
          description: 'Corte à tesoura ou máquina com lavagem mentolada refrescante acompanhado de 1 pint de chopp IPA ou Stout da torneira.',
          price: 'R$ 90',
          priceEnabled: true,
          tag: 'O FAVORITO DA CASA'
        },
        {
          id: '2',
          title: 'Barboterapia Bourbon (Barba Completa + Dose)',
          description: 'Tratamento com toalhas quentes aromáticas, navalha clássica e finalização com uma dose do melhor Bourbon americano.',
          price: 'R$ 80',
          priceEnabled: true,
          tag: 'EXPERIÊNCIA CLÁSSICA'
        },
        {
          id: '3',
          title: 'O Ritual do Confrade (Cabelo + Barba + 2 Chopps)',
          description: 'Sessão completa de cuidados com tempo livre no lounge para jogar sinuca e desfrutar do ambiente.',
          price: 'R$ 150',
          priceEnabled: true,
          featured: true,
          tag: 'EXPERIÊNCIA TOTAL'
        },
        {
          id: '4',
          title: 'Dia do Noivo & Padrinhos (Espaço Exclusivo)',
          description: 'Reserva privada de 3 horas com chopp liberado, petiscos da casa, sinuca e atendimento de toda a equipe para o grupo.',
          price: 'Sob Consulta',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'O Salão de Corte' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80', caption: 'Chopp Artesanal' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Cuidado nos Detalhes' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80', caption: 'Lounge & Sinuca' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=1600&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: "Olá! Gostaria de reservar uma cadeira e mesa no Gentleman's Pub.", label: 'Reservar Cadeira' },
        instagram: { enabled: true, username: 'gentlemanspub', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Bela Cintra, 1850 - Consolação',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Terça a Sábado: 11h às 23h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaImmersive
  },

  // 06 MINIMAL BRANCO
  {
    id: 'barbearia-06-minimal',
    code: '06',
    name: 'NORDIC BARBER STUDIO',
    family: 'minimal',
    tone: 'claro',
    tagline: 'Minimalismo escandinavo, fundo branco resplandecente e precisão cirúrgica.',
    description: 'Estética clean nórdica, linhas finas de 1px, luz natural abundante e ambiente sem barulho.',
    rails: ['elegantes', 'fotografia'],
    tags: ['barbearia', 'minimalista', 'clean', 'branco', 'nordico', 'silencioso'],
    cover: {
      background: '#FFFFFF',
      primary: '#111827',
      accent: '#4B5563',
      textColor: '#111827',
      surfaceColor: '#F9FAFB',
      badgeText: 'MINIMAL STUDIO',
      sampleImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Precisão Cirúrgica. Estética sem Excessos.',
      fontHeading: 'Plus Jakarta Sans'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-06-minimal',
      brandName: 'NORDIC BARBER STUDIO',
      segment: 'Minimalismo Nórdico & Visagismo',
      headline: 'PRECISÃO CIRÚRGICA. ESTÉTICA SEM EXCESSOS.',
      subheadline: 'MINIMALISMO ESCANDINAVO • VISAGISMO GEOMÉTRICO',
      about: 'Acreditamos na beleza do essencial. Em um ambiente silencioso e iluminado pela luz natural, criamos cortes e barbas que respeitam a geometria individual do seu rosto, com pontualidade rigorosa e atendimento calmo.',
      itemsTitle: 'Procedimentos & Valores',
      items: [
        {
          id: '1',
          title: 'Corte Arquitetural Nordic',
          description: 'Estudo das proporções da cabeça, corte milimétrico à tesoura e navalha, lavagem com extratos de chá verde e secagem natural.',
          price: 'R$ 90',
          priceEnabled: true,
          tag: '45 MINUTOS'
        },
        {
          id: '2',
          title: 'Design de Barba & Cuidados Faciais',
          description: 'Alinhamento com navalha de lâmina suíça descartável, toalha morna e hidratação com óleo de jojoba orgânico.',
          price: 'R$ 75',
          priceEnabled: true,
          tag: '35 MINUTOS'
        },
        {
          id: '3',
          title: 'Sessão Completa do Estúdio',
          description: 'Corte + Barba + Massagem capilar relaxante com óleos essenciais e higienização profunda dos poros.',
          price: 'R$ 150',
          priceEnabled: true,
          featured: true,
          tag: '75 MINUTOS'
        },
        {
          id: '4',
          title: 'Tonalização Mineral Suave',
          description: 'Matização de fios brancos com pigmentos minerais de alta durabilidade e acabamento 100% natural.',
          price: 'R$ 85',
          priceEnabled: true,
          tag: '30 MINUTOS'
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Geometria Limpa' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Luz Natural' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Toalhas de Algodão' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Fórmulas Botânicas' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar um horário no Nordic Barber Studio.', label: 'Agendar Sessão' },
        instagram: { enabled: true, username: 'nordicbarber', url: 'https://instagram.com' }
      },
      location: {
        address: 'Alameda Lorena, 1420 - Jardins',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 09h às 19h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaMinimal
  },

  // 07 BENTO PRECISION
  {
    id: 'barbearia-07-bento',
    code: '07',
    name: 'PRECISION LAB BENTO',
    family: 'bento',
    tone: 'escuro',
    tagline: 'Grade Bento moderna com status em tempo real, autoclave e métricas.',
    description: 'Design contemporâneo estilo Apple/Linear com cards dinâmicos, nota Google e agendamento instantâneo.',
    rails: ['destaques', 'ousados', 'impacto'],
    tags: ['barbearia', 'bento', 'moderno', 'tech', 'grafite', 'precisao'],
    cover: {
      background: '#0B0F19',
      primary: '#38BDF8',
      accent: '#0284C7',
      textColor: '#FFFFFF',
      surfaceColor: '#111827',
      badgeText: 'BENTO LAB',
      sampleImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Alta Precisão Geométrica & Tecnologia na Cadeira',
      fontHeading: 'Syne'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-07-bento',
      brandName: 'PRECISION LAB BARBERSHOP',
      segment: 'Tecnologia & Visagismo de Precisão',
      headline: 'ALTA PRECISÃO GEOMÉTRICA & TECNOLOGIA NA CADEIRA.',
      subheadline: 'BENTO GRID • PRECISÃO CIRÚRGICA • AUTOCLAVE',
      about: 'Desenvolvemos um padrão de atendimento baseado na precisão micrométrica das linhas e no conforto absoluto da tecnologia: lavatórios com massagem integrada, esterilização hospitalar e pontualidade digital.',
      itemsTitle: 'Serviços do Lab',
      items: [
        {
          id: '1',
          title: 'Degradê Geométrico de Alta Precisão',
          description: 'Aferição com paquímetro visual para transição uniforme em qualquer tipo de iluminação.',
          price: 'R$ 80',
          priceEnabled: true,
          tag: 'MAIS PROCURADO'
        },
        {
          id: '2',
          title: 'Barboterapia com Vapor de Ozônio',
          description: 'Esterilização e hidratação profunda da epiderme antes da passagem da lâmina descartável.',
          price: 'R$ 70',
          priceEnabled: true
        },
        {
          id: '3',
          title: 'Tratamento Anti-Queda & Fortalecimento',
          description: 'Laserterapia capilar de baixa intensidade e esfoliação desintoxicante do couro cabeludo.',
          price: 'R$ 130',
          priceEnabled: true,
          featured: true
        },
        {
          id: '4',
          title: 'Alinhamento & Pigmentação HD',
          description: 'Definição das linhas do queixo com durabilidade de até 7 dias sem manchas artificiais.',
          price: 'R$ 60',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Fade 0.5' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Tesoura Japonesa' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Vaporizador Térmico' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Linha de Barba' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar um horário no Precision Lab.', label: 'Agendar Digital' },
        instagram: { enabled: true, username: 'precisionlab', url: 'https://instagram.com' }
      },
      location: {
        address: 'Av. Brigadeiro Faria Lima, 2601 - Itaim Bibi',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 09h às 21h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaBento
  },

  // 08 STORYTELLING
  {
    id: 'barbearia-08-storytelling',
    code: '08',
    name: 'HERANÇA & NAVALHA STORYTELLING',
    family: 'story',
    tone: 'escuro',
    tagline: 'Jornada narrativa emocionante de três gerações da tradição da navalha.',
    description: 'Capítulos ilustrados, tradição desde 1968, café de coador fresco e ritual completo da navalha em 5 atos.',
    rails: ['destaques', 'elegantes', 'locais'],
    tags: ['barbearia', 'storytelling', 'tradicao', 'historia', 'ambar', 'familia'],
    cover: {
      background: '#12100E',
      primary: '#D97706',
      accent: '#78350F',
      textColor: '#FFFFFF',
      surfaceColor: '#1A1613',
      badgeText: 'HERANÇA DESDE 1968',
      sampleImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'A Tradição que Atravessou Três Gerações',
      fontHeading: 'Playfair Display'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-08-storytelling',
      brandName: 'HERANÇA & NAVALHA',
      segment: 'Tradição & Barbearia Clássica',
      headline: 'A TRADIÇÃO QUE ATRAVESSOU TRÊS GERAÇÕES DE NAVALHA AFIADA.',
      subheadline: 'DESDE 1968 • A VERDADEIRA BARBEARIA CLÁSSICA',
      about: 'Aprendemos com nosso avô que um homem não vai à barbearia apenas para cortar o cabelo. Ele vai para encontrar um tempo de escuta, o cheiro inconfundível da loção pós-barba e o corte preciso que honra sua história.',
      itemsTitle: 'Serviços Tradicionais',
      items: [
        {
          id: '1',
          title: 'O Corte Tradicional à Tesoura',
          description: 'Corte esculpido mecha a mecha, sem atalhos de máquina rápida. Acabamento na navalha com loção de alfazema.',
          price: 'R$ 80',
          priceEnabled: true,
          tag: 'DESDE 1968'
        },
        {
          id: '2',
          title: 'A Barba Clássica com Toalha Quente',
          description: 'Espuma batida na cuia de cerâmica com pincel de cerdas naturais, duas toalhas quentes e navalha solingen.',
          price: 'R$ 70',
          priceEnabled: true
        },
        {
          id: '3',
          title: 'O Ritual Completo do Vovô',
          description: 'Corte de cabelo, barba completa, toalha quente, lavagem terapêutica e café passado no coador de pano.',
          price: 'R$ 135',
          priceEnabled: true,
          featured: true,
          tag: 'A EXPERIÊNCIA DA CASA'
        },
        {
          id: '4',
          title: 'Corte Pai & Filho',
          description: 'Sessão simultânea para manter viva a tradição familiar de cuidar do visual juntos.',
          price: 'R$ 140',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Tradição Artesanal' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'A Cadeira de 1968' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'O Toque da Navalha' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Café Fresco no Balcão' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar um horário com café fresco na Herança & Navalha.', label: 'Agendar na Cadeira' },
        instagram: { enabled: true, username: 'herancaenavalha', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua da Mooca, 1920 - Mooca',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 08h30 às 19h30',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaStorytelling
  },

  // 09 POSTER BRUTALIST
  {
    id: 'barbearia-09-poster',
    code: '09',
    name: 'THE CHOP BRUTALIST POSTER',
    family: 'poster',
    tone: 'criativo',
    tagline: 'Tipografia monumental full-width 80px+, alto contraste e atitude underground.',
    description: 'Cartaz lambe-lambe urbano, preto e branco com vermelho de alerta, regras da casa e zero enrolação.',
    rails: ['ousados', 'impacto'],
    tags: ['barbearia', 'brutalista', 'poster', 'preto e branco', 'vermelho', 'rapido'],
    cover: {
      background: '#000000',
      primary: '#EF4444',
      accent: '#FFFFFF',
      textColor: '#FFFFFF',
      surfaceColor: '#121212',
      badgeText: 'BRUTAL POSTER',
      sampleImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'Seu Cabelo Fala Antes de Você Abrir a Boca',
      fontHeading: 'Space Grotesk'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-09-poster',
      brandName: 'THE CHOP • BRUTAL BARBERS',
      segment: 'Brutalist Barber Underground',
      headline: 'SEU CABELO FALA ANTES DE VOCÊ ABRIR A BOCA.',
      subheadline: 'UNDERGROUND BARBER POSTER • NADA DE FRESCURA',
      about: 'Navalha rápida, fade sem manchas, som alto e zero enrolação. Não vendemos café gourmet nem champanhe. Entregamos o melhor corte da sua vida no menor tempo possível.',
      itemsTitle: 'Operações de Bancada',
      items: [
        {
          id: '1',
          title: '01. CORTE NAVALHADO TOTAL',
          description: 'Fade na zero alta ou tesoura precisa. Acabamento rápido e limpo.',
          price: 'R$ 60',
          priceEnabled: true
        },
        {
          id: '2',
          title: '02. BARBA NA LÂMINA',
          description: 'Toalha quente, espuma sem perfume adocicado e lâmina cirúrgica.',
          price: 'R$ 50',
          priceEnabled: true
        },
        {
          id: '3',
          title: '03. CABELO + BARBA COMPLETO',
          description: 'A operação total. Cabelo, barba e lavagem na mesma batida.',
          price: 'R$ 100',
          priceEnabled: true,
          featured: true
        },
        {
          id: '4',
          title: '04. RISCO & PIGMENTAÇÃO',
          description: 'Correção de falha ou risco geométrico autoral.',
          price: 'R$ 35',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: '01' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: '02' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: '03' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: '04' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Quero agendar um corte agora no The Chop.', label: 'Agendar Corte' },
        instagram: { enabled: true, username: 'thechopbarbers', url: 'https://instagram.com' }
      },
      location: {
        address: 'Rua Treze de Maio, 820 - Bixiga',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 10h às 21h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaPoster
  },

  // 10 SIGNATURE MONOGRAM
  {
    id: 'barbearia-10-signature',
    code: '10',
    name: 'ROYAL HERITAGE SIGNATURE',
    family: 'cinematic',
    tone: 'escuro',
    tagline: 'Brasão real esculpido, monograma dourado e atendimento com concierge.',
    description: 'Cadeiras Takara Belmont em couro italiano, clube de assinatura VIP e toalhas de algodão egípcio.',
    rails: ['destaques', 'elegantes', 'fotografia'],
    tags: ['barbearia', 'luxo', 'real', 'monograma', 'ouro', 'concierge'],
    cover: {
      background: '#080D0B',
      primary: '#C5A059',
      accent: '#AA771C',
      textColor: '#FFFFFF',
      surfaceColor: '#0E1612',
      badgeText: 'MONOGRAMA REAL',
      sampleImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      heroHeadline: 'A Distinção da Alta Barbearia Clássica',
      fontHeading: 'Cinzel'
    },
    demoData: {
      engineVersion: 2,
      templateId: 'barbearia-10-signature',
      brandName: 'ROYAL HERITAGE • SIGNATURE CLUB',
      segment: 'Clube Real & Assinatura de Cavalheiros',
      headline: 'A DISTINÇÃO DA ALTA BARBEARIA CLÁSSICA COM O REQUINTE QUE VOCÊ MERECE.',
      subheadline: 'MONOGRAMA REAL • CLUBE EXCLUSIVO DE ASSINATURA',
      about: 'Criado para homens que encaram sua imagem como um patrimônio. Em nossas cadeiras Takara Belmont originais, o corte e a barba recebem a dedicação artesanal de mestres barbeiros premiados, com serviço impecável de concierge e ambiente absolutamente exclusivo.',
      itemsTitle: 'Curadoria Imperial',
      items: [
        {
          id: '1',
          title: 'O Corte Imperial à Tesoura',
          description: 'Diagnóstico craniano por mestre visagista, lavagem terapêutica com shampoo de caviar e finalização com pomada de cera de abelha.',
          price: 'R$ 110',
          priceEnabled: true,
          tag: 'DISTINÇÃO MÁXIMA'
        },
        {
          id: '2',
          title: 'Barboterapia Real com Toalhas Egípcias',
          description: 'A vaporização com óleos essenciais de sândalo e mirra, navalha alemã descartável e massagem facial anti-stress.',
          price: 'R$ 95',
          priceEnabled: true
        },
        {
          id: '3',
          title: 'O Ritual Signature Completo',
          description: 'Corte Imperial, Barboterapia Real, tratamento capilar revitalizante e degustação de Single Malt 18 anos.',
          price: 'R$ 190',
          priceEnabled: true,
          featured: true,
          tag: 'EXPERIÊNCIA SUPREMA'
        },
        {
          id: '4',
          title: 'Harmonização de Fios Brancos',
          description: 'Tonalização personalizada que suaviza os grisalhos mantendo a naturalidade e sobriedade dos fios.',
          price: 'R$ 120',
          priceEnabled: true
        }
      ],
      gallery: [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Precisão Nobre' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Acabamento Clássico' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'O Ritual da Navalha' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Cuidado Facial' }
      ],
      heroImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80',
      socials: {
        whatsapp: { enabled: true, number: '11999999999', message: 'Olá! Gostaria de agendar um horário com o concierge do Royal Heritage.', label: 'Falar com Concierge' },
        instagram: { enabled: true, username: 'royalheritagesignature', url: 'https://instagram.com' }
      },
      location: {
        address: 'Alameda dos Marins, 450 - Vila Nova Conceição',
        city: 'São Paulo - SP',
        phone: '(11) 99999-9999',
        hours: 'Segunda a Sábado: 09h às 20h',
        mapsUrl: ''
      }
    },
    renderer: renderBarbeariaSignature
  }
];
