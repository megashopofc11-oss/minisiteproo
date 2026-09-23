import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 06 - BARBEARIA MINIMAL BRANCO (Nordic Barber Studio & High-End Clean)
 * Direção de Arte: Minimalismo escandinavo, fundo branco puro (#FFFFFF / #FAFAFA),
 * tipografia geométrica sans-serif refinada (Plus Jakarta Sans), linhas finas de 1px cinza claro,
 * fotografia com iluminação natural suave, sensação de limpeza hospitalar e sofisticação silenciosa.
 * 9 Blocos Visuais:
 * 1. Hero Minimalista com espaço negativo generoso, headline de traço fino, fotografia iluminada e botão preto puro.
 * 2. Manifesto do Essencial ("Eliminamos o excesso para focar na geometria do seu corte.").
 * 3. Catálogo de Procedimentos com Duração e Valores Transparentes (Corte Arquitetural, Barba com Navalha Suíça).
 * 4. Galeria de Texturas & Detalhes (Fotos de close-up: tesoura alemã, toalhas orgânicas, madeiras claras).
 * 5. O Diferencial do Silêncio e da Pontualidade (Ambiente calmo sem música alta, atendimento individual sem atrasos).
 * 6. Linha Botânica de Produtos Próprios (Sem parabenos, fórmulas leves desenvolvidas pelo estúdio).
 * 7. Avaliações de Clientes com Foco em Pontualidade e Precisão.
 * 8. Informações Claras de Localização e Horários.
 * 9. Agendamento Digital Direto via WhatsApp e rodapé minimalista.
 */
export const renderBarbeariaMinimal = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'NORDIC BARBER STUDIO');
  const headline = escapeHtml(project.headline || 'PRECISÃO CIRÚRGICA. ESTÉTICA SEM EXCESSOS.');
  const subheadline = escapeHtml(project.subheadline || 'MINIMALISMO ESCANDINAVO • VISAGISMO GEOMÉTRICO');
  const about = escapeHtml(
    project.about ||
      'Acreditamos na beleza do essencial. Em um ambiente silencioso e iluminado pela luz natural, criamos cortes e barbas que respeitam a geometria individual do seu rosto, com pontualidade rigorosa e atendimento calmo.'
  );
  const waUrl = getWhatsAppUrl(project);

  const heroImg =
    project.heroImageUrl ||
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80';

  const items = project.items?.length
    ? project.items
    : [
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Geometria Limpa' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Luz Natural' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Toalhas de Algodão' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Fórmulas Botânicas' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Minimal Barber Studio</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #FFFFFF; color: #111827; font-family: 'Plus Jakarta Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    
    .border-clean { border: 1px solid #E5E7EB; }
    .border-clean-b { border-bottom: 1px solid #E5E7EB; }

    .btn-minimal {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background-color: #111827;
      color: #FFFFFF;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1px;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-minimal:hover {
      background-color: #374151;
    }

    .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
  </style>
</head>
<body class="bg-white text-gray-900">

  <!-- 1. TOPO MINIMALISTA -->
  <header class="py-6 border-clean-b">
    <div class="container flex items-center justify-between">
      <div class="font-bold tracking-widest text-sm uppercase text-black">
        ${brandName}
      </div>
      <div class="text-xs text-gray-500 uppercase tracking-wider hidden sm:block">
        Estética Escandinava • Desde 2020
      </div>
      <a href="${waUrl}" target="_blank" rel="noopener" class="text-xs font-semibold uppercase tracking-wider text-black hover:underline">
        Agendar Horário &rarr;
      </a>
    </div>
  </header>

  <!-- 2. HERO CLARO COM RESPIRO ESPACIAL -->
  <section class="py-20 sm:py-28 border-clean-b">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          <span class="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
            ${subheadline}
          </span>

          <h1 class="text-4xl sm:text-6xl font-light tracking-tight text-gray-950 leading-[1.1]">
            ${headline}
          </h1>

          <p class="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed pt-2">
            ${about}
          </p>

          <div class="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-minimal w-full sm:w-auto">
              <span>AGENDAR UMA SESSÃO</span>
              <span>&rarr;</span>
            </a>
            <span class="text-xs text-gray-400">
              Atendimento com pontualidade garantida
            </span>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 border-clean">
            <img src="${heroImg}" alt="${brandName}" class="w-full h-full object-cover filter contrast-[1.02] brightness-105" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. FILOSOFIA DO ESSENCIAL -->
  <section class="py-20 sm:py-24 border-clean-b bg-gray-50">
    <div class="container max-w-2xl text-center space-y-4">
      <span class="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">A NOSSA ABORDAGEM</span>
      <h2 class="text-2xl sm:text-3xl font-normal text-gray-900 leading-snug">
        "Eliminamos a poluição visual, o barulho excessivo e a pressa. Quando você senta em nossa cadeira, o tempo é inteiramente seu."
      </h2>
      <div class="pt-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
        — Princípio Nórdico de Design
      </div>
    </div>
  </section>

  <!-- 4. CATÁLOGO TRANSPARENTE DE PROCEDIMENTOS -->
  <section class="py-20 sm:py-28 border-clean-b">
    <div class="container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div>
          <span class="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase block mb-1">CURADORIA</span>
          <h3 class="text-3xl font-light text-gray-950">Procedimentos & Valores</h3>
        </div>
        <div class="text-xs text-gray-400 uppercase tracking-wider">
          Valores fixos sem custos adicionais
        </div>
      </div>

      <div class="divide-y divide-gray-200 border-t border-b border-gray-200">
        ${items
          .map(
            (item: any) => `
          <div class="py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 group hover:bg-gray-50/80 px-2 transition-colors">
            <div class="max-w-xl space-y-1">
              <div class="flex items-center gap-3">
                <h4 class="text-lg font-semibold text-gray-900">${escapeHtml(item.title)}</h4>
                ${item.tag ? `<span class="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">${escapeHtml(item.tag)}</span>` : ''}
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">${escapeHtml(item.description)}</p>
            </div>
            
            <div class="flex items-center gap-6 shrink-0 md:text-right">
              ${item.priceEnabled && item.price ? `<div class="text-xl font-medium text-gray-900">${escapeHtml(item.price)}</div>` : ''}
              <a href="${waUrl}" target="_blank" rel="noopener" class="text-xs font-semibold text-gray-900 hover:underline">
                Reservar &rarr;
              </a>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 5. GALERIA DE TEXTURAS & LUZ NATURAL -->
  <section class="py-20 sm:py-28 border-clean-b bg-gray-50">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-1">
        <span class="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">DETALHES</span>
        <h3 class="text-3xl font-light text-gray-950">Estética no Estúdio</h3>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${gallery
          .map(
            (g: any) => `
          <div class="space-y-2">
            <div class="aspect-[3/4] rounded-lg overflow-hidden border-clean bg-white">
              <img src="${g.url}" alt="${g.caption || 'Foto'}" class="w-full h-full object-cover filter contrast-[1.02] hover:scale-105 transition-transform duration-500" />
            </div>
            ${g.caption ? `<div class="text-[11px] text-gray-500 text-center font-medium">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 6. AGENDAMENTO & CONTATO DIRETO -->
  <section class="py-20 sm:py-24">
    <div class="container max-w-2xl text-center space-y-6">
      <span class="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase block">AGENDAMENTO</span>
      <h3 class="text-3xl sm:text-4xl font-light text-gray-950">
        Pronto para Renovar seu Estilo?
      </h3>
      <p class="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
        Agende diretamente pelo WhatsApp com confirmação instantânea da nossa recepção.
      </p>

      <div class="pt-2">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-minimal">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>SOLICITAR HORÁRIO NO ESTÚDIO</span>
        </a>
      </div>

      <div class="pt-8 border-t border-gray-100 text-xs text-gray-400 space-y-1">
        <div>${escapeHtml(project.location?.address || 'Alameda Lorena, 1420 - Jardins')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • ${escapeHtml(project.location?.hours || 'Segunda a Sábado: 09h às 19h')}</div>
      </div>
    </div>
  </section>

  <!-- 7. RODAPÉ -->
  <footer class="py-8 border-t border-gray-100 text-center text-xs text-gray-400">
    <div class="container">
      &copy; ${new Date().getFullYear()} ${brandName}. Design minimalista e cortes arquiteturais.
    </div>
  </footer>

</body>
</html>`;
};
