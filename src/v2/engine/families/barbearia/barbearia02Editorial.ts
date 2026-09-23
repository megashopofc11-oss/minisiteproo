import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 02 - BARBEARIA EDITORIAL (Menswear Magazine & Atelier Barbier)
 * Direção de Arte: Revista de alta costura masculina (estilo GQ/Vogue Hommes), fundo marfim claro (#F7F5F0),
 * tipografia serifada monumental (Bodoni Moda / Playfair Display), linhas finas arquitetônicas,
 * números romanos, colunas duplas com capitular (drop cap), fotografia com bordas brancas e créditos editoriais.
 * 9 Blocos Visuais:
 * 1. Capa de Revista com cabeçalho "VOL. VII • EDIÇÃO DE COLECIONADOR", título editorial gigante em itálico e foto vertical descolada.
 * 2. Carta do Diretor Criativo (Coluna dupla com capitular clássica sobre visagismo facial).
 * 3. Lookbook de Tendências Masculinas (Galeria vertical com proporção de passarela e legendas tipográficas).
 * 4. Tabela de Procedimentos em Numeração Romana (I, II, III, IV) com curadoria e tempo de cadeira.
 * 5. O Conceito de Visagismo Estrutural (Como a barbearia molda mandíbula, queixo e proporções cranianas).
 * 6. Linha de Produtos de Cuidados Pessoais (Pomadas de cera natural, óleos com essência de cedro e sândalo).
 * 7. Depoimentos Editoriais de Cavalheiros (Citações serifadas em aspas gigantes).
 * 8. O Atelier & Agendamento (Localização em casarão preservado, manobrista e horários de atendimento).
 * 9. Rodapé de Revista com expediente e créditos de publicação.
 */
export const renderBarbeariaEditorial = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'ATELIER BARBIER');
  const headline = escapeHtml(project.headline || 'A NOVA ELEGÂNCIA MASCULINA EM CADA TRAÇO.');
  const subheadline = escapeHtml(project.subheadline || 'EDIÇÃO DE VISAGISMO & ALTA BARBEARIA • N° 07');
  const about = escapeHtml(
    project.about ||
      'Um espaço pensado para o homem contemporâneo que busca refinamento sem afetação. Nossa abordagem combina técnicas ancestrais de corte europeu com um estudo aprofundado das linhas anatômicas de cada cliente.'
  );
  const waUrl = getWhatsAppUrl(project);

  const heroImg =
    project.heroImageUrl ||
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80';
  const personImg =
    project.professionalPhotoUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80';

  const items = project.items?.length
    ? project.items
    : [
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 01 — Textura Natural' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 02 — Geometria & Linhas' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 03 — Cuidado da Pele' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Fig. 04 — Acabamento Clássico' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Edição Editorial</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #F7F5F0; color: #1E2024; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.7; }
    
    .font-bodoni { font-family: 'Bodoni Moda', serif; }
    .font-playfair { font-family: 'Playfair Display', serif; }
    .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
    
    .editorial-border { border: 1px solid rgba(30, 32, 36, 0.15); }
    .editorial-border-b { border-bottom: 1px solid rgba(30, 32, 36, 0.15); }
    .editorial-border-t { border-top: 1px solid rgba(30, 32, 36, 0.15); }
    
    /* Drop Cap (Capitular) */
    .drop-cap::first-letter {
      float: left;
      font-family: 'Bodoni Moda', serif;
      font-size: 4.8rem;
      line-height: 0.8;
      padding-top: 4px;
      padding-right: 12px;
      padding-bottom: 4px;
      color: #1E2024;
      font-weight: 700;
    }

    .btn-editorial {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background-color: #1E2024;
      color: #F7F5F0;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 18px 36px;
      border: 1px solid #1E2024;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    .btn-editorial:hover {
      background-color: #F7F5F0;
      color: #1E2024;
    }

    .container { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
  </style>
</head>
<body class="bg-[#F7F5F0] text-[#1E2024]">

  <!-- 1. CABEÇALHO EDITORIAL ESTILO REVISTA -->
  <header class="py-6 editorial-border-b">
    <div class="container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div class="text-[11px] font-jakarta tracking-[0.25em] uppercase text-neutral-500 font-bold">
        ${subheadline}
      </div>
      <div class="font-bodoni text-xl font-bold tracking-[0.3em] uppercase text-[#1E2024]">
        ${brandName}
      </div>
      <div class="text-[11px] font-jakarta tracking-[0.2em] uppercase text-neutral-500">
        ATENDIMENTO COM HORA MARCADA
      </div>
    </div>
  </header>

  <!-- 2. CAPA / HERO EDITORIAL ASSIMÉTRICO -->
  <section class="py-16 sm:py-24 editorial-border-b">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Coluna de Texto com Headline Monumental -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-block border-b-2 border-[#1E2024] pb-1 text-xs font-jakarta tracking-[0.3em] uppercase font-bold text-neutral-800">
            VISAGISMO & DESIGN MASCULINO
          </div>

          <h1 class="font-bodoni text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1E2024] leading-[1.05]">
            A Nova <span class="italic font-normal">Elegância</span> em Cada Traço.
          </h1>

          <p class="font-jakarta text-neutral-600 text-sm sm:text-base max-w-lg leading-relaxed pt-2">
            ${about}
          </p>

          <div class="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-editorial w-full sm:w-auto">
              <span>SOLICITAR AGENDAMENTO</span>
              <span>→</span>
            </a>
            <span class="text-xs font-jakarta tracking-wider text-neutral-500">
              Cadeiras limitadas por período
            </span>
          </div>
        </div>

        <!-- Coluna de Imagem com Moldura Editorial e Crédito -->
        <div class="lg:col-span-5 relative">
          <div class="relative p-3 bg-white shadow-xl editorial-border">
            <div class="aspect-[3/4] overflow-hidden">
              <img src="${heroImg}" alt="${brandName}" class="w-full h-full object-cover filter contrast-105" />
            </div>
            <div class="pt-3 flex items-center justify-between text-[10px] font-jakarta tracking-widest text-neutral-400 uppercase">
              <span>FIG. 01 — RETRATO AUTORAL</span>
              <span>ESTÚDIO PRIVADO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. CARTA DO DIRETOR CRIATIVO (COLUNA DUPLA COM CAPITULAR) -->
  <section class="py-20 sm:py-28 editorial-border-b bg-[#F2EFE9]">
    <div class="container">
      <div class="max-w-3xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-xs font-jakarta tracking-[0.3em] uppercase font-bold text-neutral-500">
            EDITORIAL DE ABERTURA
          </span>
          <h2 class="font-bodoni text-3xl sm:text-4xl text-[#1E2024] font-bold">
            O Rosto como Arquitetura Viva
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-700 text-sm leading-relaxed font-jakarta">
          <p class="drop-cap">
            Construir uma imagem que transmita confiança e autoridade exige muito mais do que apenas passar uma máquina nas laterais da cabeça. Requer observação atenta do formato da mandíbula, da simetria dos malares e do padrão natural de crescimento dos fios.
          </p>
          <p>
            No <strong class="text-neutral-900">${brandName}</strong>, cada corte é uma peça de alfaiataria. Nós não repetimos moldes pré-fabricados. Nós adaptamos a proporção ao seu estilo de vida profissional, assegurando que você mantenha o alinhamento impecável mesmo semanas após a sua visita.
          </p>
        </div>

        <div class="pt-4 text-center font-playfair italic text-neutral-600 text-sm">
          — Direção de Arte e Visagismo do Atelier
        </div>
      </div>
    </div>
  </section>

  <!-- 4. TABELA DE PROCEDIMENTOS EM NÚMEROS ROMANOS -->
  <section class="py-20 sm:py-28 editorial-border-b">
    <div class="container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
        <div>
          <span class="text-xs font-jakarta tracking-[0.3em] uppercase font-bold text-neutral-500 block mb-2">CURADORIA DE PROCEDIMENTOS</span>
          <h3 class="font-bodoni text-3xl sm:text-5xl font-bold text-[#1E2024]">O Menu do Atelier</h3>
        </div>
        <div class="text-xs font-jakarta tracking-wider text-neutral-500 uppercase">
          TEMPO MÉDIO DE CADEIRA: 50 MINUTOS
        </div>
      </div>

      <div class="divide-y divide-neutral-300">
        ${items
          .map(
            (item: any) => `
          <div class="py-8 flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:bg-neutral-100/60 px-4 transition-colors">
            <div class="max-w-xl space-y-2">
              <div class="flex items-center gap-3">
                <h4 class="font-bodoni text-xl sm:text-2xl font-bold text-[#1E2024]">${escapeHtml(item.title)}</h4>
                ${item.tag ? `<span class="px-2.5 py-0.5 border border-neutral-900 text-[10px] font-jakarta font-bold uppercase tracking-wider text-neutral-900">${escapeHtml(item.tag)}</span>` : ''}
              </div>
              <p class="font-jakarta text-xs sm:text-sm text-neutral-600 leading-relaxed">${escapeHtml(item.description)}</p>
            </div>
            
            <div class="flex items-center gap-6 shrink-0 md:text-right">
              ${item.priceEnabled && item.price ? `<div class="font-bodoni text-2xl font-bold text-neutral-900">${escapeHtml(item.price)}</div>` : ''}
              <a href="${waUrl}" target="_blank" rel="noopener" class="text-xs font-jakarta font-bold tracking-widest uppercase text-neutral-900 hover:underline">
                RESERVAR &rarr;
              </a>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 5. LOOKBOOK / GALERIA DE PASSARELA -->
  <section class="py-20 sm:py-28 editorial-border-b bg-white">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span class="text-xs font-jakarta tracking-[0.3em] uppercase font-bold text-neutral-500">LOOKBOOK MASCULINO</span>
        <h3 class="font-bodoni text-3xl sm:text-4xl font-bold text-[#1E2024]">Registros de Estilo</h3>
        <p class="text-xs text-neutral-500 font-jakarta">Fotografia autoral realizada no atelier com clientes reais.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        ${gallery
          .map(
            (g: any) => `
          <div class="space-y-3 group">
            <div class="aspect-[3/4] overflow-hidden bg-neutral-100 editorial-border">
              <img src="${g.url}" alt="${g.caption || 'Look'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-115 hover:grayscale-0" />
            </div>
            ${g.caption ? `<div class="text-[11px] font-bodoni italic text-neutral-600">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 6. O CONCEITO DE VISAGISMO ESTRUTURAL -->
  <section class="py-20 sm:py-28 editorial-border-b">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 bg-white editorial-border space-y-3">
          <div class="font-bodoni text-3xl font-bold text-neutral-900">01.</div>
          <h4 class="font-bodoni text-lg font-bold text-neutral-900">Proporção Facial</h4>
          <p class="text-xs text-neutral-600 font-jakarta leading-relaxed">
            Ajustamos o comprimento do topo e o desvanecimento lateral para harmonizar as linhas da testa e mandíbula.
          </p>
        </div>
        <div class="p-8 bg-white editorial-border space-y-3">
          <div class="font-bodoni text-3xl font-bold text-neutral-900">02.</div>
          <h4 class="font-bodoni text-lg font-bold text-neutral-900">A Linha da Navalha</h4>
          <p class="text-xs text-neutral-600 font-jakarta leading-relaxed">
            O desenho do contorno da barba respeita a direção do crescimento, evitando vermelhidão e proporcionando durabilidade.
          </p>
        </div>
        <div class="p-8 bg-white editorial-border space-y-3">
          <div class="font-bodoni text-3xl font-bold text-neutral-900">03.</div>
          <h4 class="font-bodoni text-lg font-bold text-neutral-900">Manutenção Descomplicada</h4>
          <p class="text-xs text-neutral-600 font-jakarta leading-relaxed">
            Ensinamos a finalizar o cabelo em menos de dois minutos em casa usando o produto adequado para seu tipo de fio.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. AGENDAMENTO & ATELIER PRIVADO -->
  <section class="py-20 sm:py-28 editorial-border-b bg-[#F2EFE9]">
    <div class="container max-w-2xl text-center space-y-8">
      <span class="text-xs font-jakarta tracking-[0.3em] uppercase font-bold text-neutral-500">
        RESERVA DE HORÁRIO
      </span>
      <h3 class="font-bodoni text-3xl sm:text-5xl font-bold text-[#1E2024] leading-tight">
        Agende sua Sessão com o Diretor Criativo
      </h3>
      <p class="font-jakarta text-neutral-600 text-sm leading-relaxed max-w-lg mx-auto">
        Atendimento exclusivamente com agendamento prévio para garantir a máxima pontualidade e dedicação exclusiva durante seu momento de cuidado.
      </p>

      <div class="py-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-editorial">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>SOLICITAR HORÁRIO VIA WHATSAPP</span>
        </a>
      </div>

      <div class="pt-6 border-t border-neutral-300 text-xs font-jakarta text-neutral-600 space-y-1">
        <div>${escapeHtml(project.location?.address || 'Rua Oscar Freire, 840 - Cerqueira César')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • ${escapeHtml(project.location?.hours || 'Segunda a Sábado: 10h às 20h')}</div>
      </div>
    </div>
  </section>

  <!-- 8. RODAPÉ DE REVISTA -->
  <footer class="py-12 text-center text-xs font-jakarta text-neutral-500">
    <div class="container space-y-2">
      <div class="font-bodoni text-base font-bold tracking-[0.3em] uppercase text-neutral-800">${brandName}</div>
      <p class="text-[11px]">Uma publicação dedicada à estética, postura e estilo do homem contemporâneo.</p>
      <div class="text-[10px] text-neutral-400 pt-4">
        &copy; ${new Date().getFullYear()} ${brandName}. Todos os direitos reservados.
      </div>
    </div>
  </footer>

</body>
</html>`;
};
