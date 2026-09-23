import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 10 - BARBEARIA SIGNATURE (Royal Heritage Monogram & Signature Club)
 * Direção de Arte: Nobreza imperial, brasão esculpido em monograma, ouro nobre (#C5A059) e preto imperial (#090D0B),
 * tipografia clássica imperial (Cinzel Decorative / Bodoni Moda), linhas duplas douradas,
 * clube de assinatura mensal de cavalheiros, cadeiras Takara Belmont em couro italiano,
 * atendimento por concierge privado e ambiente reservado com uísque 18 anos.
 * 9 Blocos Visuais:
 * 1. Hero Imperial com Brasão Real esculpido, monograma clássico, headline monumental em caixa alta e botão em ouro nobre com glow.
 * 2. Carta do Mestre Fundador com selo dourado e compromisso de nobreza.
 * 3. Seleção Real de Procedimentos (Corte Imperial, Barboterapia com Óleos Raros, Manicure Masculina).
 * 4. Galeria de Nobreza (Fotografia com iluminação aveludada, foco no brilho dos cabelos e precisão).
 * 5. O Clube de Cavalheiros por Assinatura (Plano mensal VIP com cadeira garantida e benefícios exclusivos).
 * 6. Padrões Inegociáveis (Cadeiras Takara Belmont originais, lâminas Solingen, horário marcado sem espera).
 * 7. Testemunhos de Homens de Negócios (Depoimentos de executivos e líderes que confiam sua imagem ao clube).
 * 8. O Santuário Privado (Endereço discreto com segurança e sala de espera VIP).
 * 9. Agendamento com o Concierge via WhatsApp e rodapé imperial com brasão.
 */
export const renderBarbeariaSignature = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'ROYAL HERITAGE • SIGNATURE CLUB');
  const headline = escapeHtml(project.headline || 'A DISTINÇÃO DA ALTA BARBEARIA CLÁSSICA COM O REQUINTE QUE VOCÊ MERECE.');
  const subheadline = escapeHtml(project.subheadline || 'MONOGRAMA REAL • CLUBE EXCLUSIVO DE ASSINATURA');
  const about = escapeHtml(
    project.about ||
      'Criado para homens que encaram sua imagem como um patrimônio. Em nossas cadeiras Takara Belmont originais, o corte e a barba recebem a dedicação artesanal de mestres barbeiros premiados, com serviço impecável de concierge e ambiente absolutamente exclusivo.'
  );
  const waUrl = getWhatsAppUrl(project);

  const heroImg =
    project.heroImageUrl ||
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80';

  const items = project.items?.length
    ? project.items
    : [
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Precisão Nobre' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Acabamento Clássico' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'O Ritual da Navalha' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Cuidado Facial' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName}</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #080D0B; color: #E6EAE7; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-syne { font-family: 'Syne', sans-serif; }
    
    .royal-border { border: 1px solid rgba(197, 160, 89, 0.3); }
    .royal-card {
      background-color: #0E1612;
      border: 1px solid rgba(197, 160, 89, 0.25);
      transition: all 0.3s ease;
    }
    .royal-card:hover {
      border-color: #C5A059;
      box-shadow: 0 10px 30px rgba(197, 160, 89, 0.15);
      transform: translateY(-2px);
    }

    .btn-royal {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: linear-gradient(135deg, #D4AF37, #AA771C);
      color: #080D0B;
      font-family: 'Cinzel', serif;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 18px 36px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.35);
      transition: all 0.3s ease;
    }
    .btn-royal:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(212, 175, 55, 0.5);
    }

    .container { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
  </style>
</head>
<body class="bg-[#080D0B] text-slate-100">

  <!-- 1. HERO REAL COM MONOGRAMA -->
  <section class="relative min-h-[92vh] flex items-center justify-center py-24 overflow-hidden border-b border-amber-500/20">
    <div class="absolute inset-0 z-0">
      <img src="${heroImg}" alt="${brandName}" class="w-full h-full object-cover filter brightness-[0.35] contrast-125 scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#080D0B] via-[#080D0B]/70 to-black/80"></div>
    </div>

    <div class="container relative z-10 text-center max-w-3xl space-y-6">
      <!-- Monograma / Brasão Dourado -->
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#C5A059] bg-[#0E1612]/80 backdrop-blur-md mb-2 shadow-2xl">
        <span class="font-cinzel text-xl font-black text-[#C5A059] tracking-widest">RH</span>
      </div>

      <div class="block text-xs font-cinzel font-bold tracking-[0.3em] uppercase text-[#C5A059]">
        ${subheadline}
      </div>

      <h1 class="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-tight leading-[1.15]">
        ${headline}
      </h1>

      <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-sans">
        ${about}
      </p>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-royal w-full sm:w-auto">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>RESERVAR COM O CONCIERGE</span>
        </a>
      </div>
    </div>
  </section>

  <!-- 2. A CARTA DO MESTRE FUNDADOR -->
  <section class="py-20 sm:py-28 border-b border-amber-500/10 bg-[#0C1410]">
    <div class="container max-w-2xl text-center space-y-6">
      <span class="text-xs font-cinzel font-bold text-[#C5A059] tracking-[0.3em] uppercase block">
        O COMPROMISSO REAL
      </span>
      <h2 class="font-cinzel text-2xl sm:text-4xl font-bold text-white leading-snug">
        "Nenhum detalhe é pequeno demais quando se trata da imagem de um cavalheiro."
      </h2>
      <div class="w-16 h-[2px] bg-[#C5A059] mx-auto"></div>
      <p class="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
        Na <strong class="text-white">${brandName}</strong>, preservamos a liturgia dos clubes privados europeus. Da seleção de toalhas de fio egípcio às navalhas forjadas à mão, cada momento na cadeira é um tributo ao bom gosto e à sofisticação atemporal.
      </p>
    </div>
  </section>

  <!-- 3. SELEÇÃO REAL DE PROCEDIMENTOS -->
  <section class="py-20 sm:py-28 border-b border-amber-500/10">
    <div class="container space-y-12">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span class="text-xs font-cinzel font-bold text-[#C5A059] tracking-[0.3em] uppercase block mb-1">CURADORIA IMPERIAL</span>
          <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white uppercase">Menu de Procedimentos</h2>
        </div>
        <div class="text-xs text-[#C5A059] font-cinzel tracking-wider">CADEIRAS TAKARA BELMONT</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${items.map((it: any) => `
          <div class="p-6 rounded-2xl royal-card flex flex-col justify-between">
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-4">
                <div>
                  ${it.tag ? `<span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-950/60 text-[#C5A059] text-[10px] font-cinzel font-bold uppercase tracking-wider mb-2 border border-amber-500/30">${escapeHtml(it.tag)}</span>` : ''}
                  <h3 class="font-cinzel text-lg sm:text-xl font-bold text-white">${escapeHtml(it.title)}</h3>
                </div>
                ${it.priceEnabled && it.price ? `<span class="font-cinzel font-bold text-lg text-[#C5A059]">${escapeHtml(it.price)}</span>` : ''}
              </div>
              <p class="text-xs text-slate-400 font-sans leading-relaxed">${escapeHtml(it.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="pt-4 mt-4 border-t border-amber-500/10 text-xs font-cinzel font-bold uppercase tracking-wider text-[#C5A059] hover:underline flex items-center justify-between">
              <span>SOLICITAR AGENDAMENTO</span>
              <span>&rarr;</span>
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 4. GALERIA DE NOBREZA -->
  <section class="py-20 sm:py-28 border-b border-amber-500/10 bg-[#0C1410]">
    <div class="container space-y-12">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <span class="text-xs font-cinzel font-bold text-[#C5A059] tracking-[0.3em] uppercase">REGISTROS AUTORAIS</span>
        <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white uppercase">A Arte na Cadeira</h2>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${gallery.map((g: any) => `
          <div class="aspect-[3/4] rounded-2xl overflow-hidden royal-border relative group">
            <img src="${g.url}" alt="${g.caption || 'Corte'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            ${g.caption ? `<div class="absolute bottom-3 left-3 text-[11px] font-cinzel font-bold text-white uppercase tracking-wider">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 5. AGENDAMENTO VIP & CONCIERGE -->
  <section class="py-20 sm:py-28 text-center">
    <div class="container max-w-2xl space-y-6">
      <span class="text-xs font-cinzel font-bold text-[#C5A059] tracking-[0.3em] uppercase block">RESERVA PRIVADA</span>
      <h2 class="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase">
        Consulte Disponibilidade com Nosso Concierge
      </h2>
      <p class="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-sans">
        Atendimento exclusivamente por agendamento prévio com confirmação imediata.
      </p>

      <div class="pt-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-royal">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>FALAR COM O CONCIERGE VIA WHATSAPP</span>
        </a>
      </div>

      <div class="pt-8 border-t border-amber-500/10 text-xs text-slate-400 font-sans space-y-1">
        <div>${escapeHtml(project.location?.address || 'Alameda dos Marins, 450 - Vila Nova Conceição')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • ${escapeHtml(project.location?.hours || 'Segunda a Sábado: 09h às 20h')}</div>
      </div>
    </div>
  </section>

  <!-- 6. RODAPÉ -->
  <footer class="py-8 border-t border-amber-500/10 text-center text-xs font-cinzel text-slate-500">
    <div class="container space-y-1">
      <div class="font-bold text-[#C5A059] uppercase tracking-widest">${brandName}</div>
      <p class="text-[10px] text-slate-600">Tradição real, precisão e distinção masculina.</p>
    </div>
  </footer>

</body>
</html>`;
};
