import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 08 - BARBEARIA STORYTELLING (Herança da Navalha & Jornada Narrativa)
 * Direção de Arte: Narrativa vertical em capítulos como um livro ilustrado clássico.
 * Cores: Âmbar envelhecido, preto carvão (#121110), cobre e marrom conhaque (#7C2D12).
 * Silhueta: Capítulos cronológicos (Prólogo, Capítulo I, Capítulo II, Capítulo III...),
 * história de três gerações de barbeiros, o ritual da navalha em 5 passos, fotos em sépia/P&B,
 * conversa de cadeira sem pressa e café de coador passado na hora.
 * 9 Blocos Narrativos:
 * 1. Prólogo / Hero Narrativo com foto clássica, headline "A TRADIÇÃO QUE ATRAVESSOU TRÊS GERAÇÕES DE NAVALHA" e citação.
 * 2. Capítulo I: A Origem (A cadeira de ferro fundido de 1968 e o legado familiar).
 * 3. Capítulo II: O Ritual em 5 Etapas (Diagnóstico do fio, espuma batida à mão, toalha fumegante, fio da navalha, alfazema).
 * 4. Capítulo III: A Arte da Cadeira (Cortes tradicionais, barba esculpida e acabamento sem atalhos modernos).
 * 5. Capítulo IV: Galeria dos Fregueses (Retratos de pais e filhos que cortam há anos no mesmo endereço).
 * 6. Capítulo V: A Navalha Não Mente (Diferenciais que shopping nenhum tem: café de coador, conversa franca e calma).
 * 7. Capítulo VI: Vozes de Quem Confia (Depoimentos de fregueses antigos e novos).
 * 8. Capítulo VII: Onde a História Vive (Endereço no casarão tradicional e horários).
 * 9. Epílogo & Agendamento com WhatsApp acolhedor.
 */
export const renderBarbeariaStorytelling = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'HERANÇA & NAVALHA');
  const headline = escapeHtml(project.headline || 'A TRADIÇÃO QUE ATRAVESSOU TRÊS GERAÇÕES DE NAVALHA AFIADA.');
  const subheadline = escapeHtml(project.subheadline || 'DESDE 1968 • A VERDADEIRA BARBEARIA CLÁSSICA');
  const about = escapeHtml(
    project.about ||
      'Aprendemos com nosso avô que um homem não vai à barbearia apenas para cortar o cabelo. Ele vai para encontrar um tempo de escuta, o cheiro inconfundível da loção pós-barba e o corte preciso que honra sua história.'
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Tradição Artesanal' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'A Cadeira de 1968' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'O Toque da Navalha' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Café Fresco no Balcão' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — A História da Navalha</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #12100E; color: #E7E2DF; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.7; }
    
    .font-playfair { font-family: 'Playfair Display', serif; }
    .font-syne { font-family: 'Syne', sans-serif; }
    
    .story-border { border: 1px solid rgba(217, 119, 6, 0.2); }
    
    .btn-story {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: linear-gradient(135deg, #D97706, #78350F);
      color: #FFFBEB;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 18px 36px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(217, 119, 6, 0.3);
      transition: all 0.3s ease;
    }
    .btn-story:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(217, 119, 6, 0.5);
    }

    .container { max-width: 980px; margin: 0 auto; padding: 0 24px; }
  </style>
</head>
<body class="bg-[#12100E] text-amber-50">

  <!-- 1. PRÓLOGO / HERO NARRATIVO -->
  <section class="py-20 sm:py-32 border-b border-amber-900/30 relative">
    <div class="container text-center max-w-3xl space-y-6">
      <div class="inline-block text-xs font-syne font-bold uppercase tracking-[0.3em] text-amber-500">
        // ${subheadline}
      </div>

      <h1 class="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-amber-100 leading-tight">
        ${headline}
      </h1>

      <p class="text-sm sm:text-base text-amber-200/80 max-w-xl mx-auto leading-relaxed font-sans">
        ${about}
      </p>

      <div class="pt-6">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-story">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>RESERVAR HORÁRIO NA CADEIRA</span>
        </a>
      </div>
    </div>
  </section>

  <!-- 2. CAPÍTULO I: A ORIGEM -->
  <section class="py-20 sm:py-28 border-b border-amber-900/20 bg-[#161310]">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div class="md:col-span-6 space-y-4">
          <span class="text-xs font-syne font-bold text-amber-500 uppercase tracking-widest">CAPÍTULO I</span>
          <h2 class="font-playfair text-2xl sm:text-4xl font-bold text-amber-100">
            A Cadeira de Ferro de 1968
          </h2>
          <p class="text-xs sm:text-sm text-amber-200/70 leading-relaxed font-sans">
            Tudo começou quando o velho Antônio abriu as portas com apenas uma cadeira de ferro fundido, um espelho oval e três navalhas alemãs. O bairro cresceu, os prédios subiram, mas o compromisso de atender cada cliente como se fosse da família continua intacto.
          </p>
        </div>

        <div class="md:col-span-6">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden story-border">
            <img src="${heroImg}" alt="História" class="w-full h-full object-cover filter sepia-[0.3] contrast-110" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. CAPÍTULO II: O RITUAL DA NAVALHA EM 5 ETAPAS -->
  <section class="py-20 sm:py-28 border-b border-amber-900/20">
    <div class="container space-y-12">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <span class="text-xs font-syne font-bold text-amber-500 uppercase tracking-widest">CAPÍTULO II</span>
        <h2 class="font-playfair text-3xl sm:text-4xl font-bold text-amber-100">O Ritual Passo a Passo</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div class="p-4 rounded-xl bg-[#1A1613] story-border space-y-2">
          <div class="text-amber-500 font-playfair font-bold text-xl">1. Diagnóstico</div>
          <p class="text-[11px] text-amber-200/70 leading-relaxed">Leitura atenta dos redemoinhos e da direção natural do fio.</p>
        </div>
        <div class="p-4 rounded-xl bg-[#1A1613] story-border space-y-2">
          <div class="text-amber-500 font-playfair font-bold text-xl">2. Espuma Morna</div>
          <p class="text-[11px] text-amber-200/70 leading-relaxed">Batida com pincel de cerdas na cuia de cerâmica artesanal.</p>
        </div>
        <div class="p-4 rounded-xl bg-[#1A1613] story-border space-y-2">
          <div class="text-amber-500 font-playfair font-bold text-xl">3. Toalha Quente</div>
          <p class="text-[11px] text-amber-200/70 leading-relaxed">A vaporização suave que relaxa os músculos e abre os poros.</p>
        </div>
        <div class="p-4 rounded-xl bg-[#1A1613] story-border space-y-2">
          <div class="text-amber-500 font-playfair font-bold text-xl">4. A Navalha</div>
          <p class="text-[11px] text-amber-200/70 leading-relaxed">O toque seguro e sem pressa com lâmina descartável estéril.</p>
        </div>
        <div class="p-4 rounded-xl bg-[#1A1613] story-border space-y-2">
          <div class="text-amber-500 font-playfair font-bold text-xl">5. A Alfazema</div>
          <p class="text-[11px] text-amber-200/70 leading-relaxed">Fechamento com loção refrescante e massagem nos ombros.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. CAPÍTULO III: A ARTE DA CADEIRA (SERVIÇOS) -->
  <section class="py-20 sm:py-28 border-b border-amber-900/20 bg-[#161310]">
    <div class="container space-y-12">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span class="text-xs font-syne font-bold text-amber-500 uppercase tracking-widest block mb-1">CAPÍTULO III</span>
          <h2 class="font-playfair text-3xl sm:text-4xl font-bold text-amber-100">Os Serviços da Casa</h2>
        </div>
        <div class="text-xs text-amber-400/80 font-syne">★ Café de coador passado na hora cortesia</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${items.map((it: any) => `
          <div class="p-6 rounded-2xl bg-[#1C1814] story-border flex flex-col justify-between">
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-4">
                <h3 class="font-playfair text-xl font-bold text-amber-100">${escapeHtml(it.title)}</h3>
                ${it.priceEnabled && it.price ? `<span class="font-syne font-bold text-amber-400">${escapeHtml(it.price)}</span>` : ''}
              </div>
              <p class="text-xs text-amber-200/70 leading-relaxed">${escapeHtml(it.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="pt-4 mt-4 border-t border-amber-900/30 text-xs font-syne font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300">
              Agendar este serviço &rarr;
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 5. EPÍLOGO & AGENDAMENTO -->
  <section class="py-20 sm:py-28 text-center">
    <div class="container max-w-2xl space-y-6">
      <span class="text-xs font-syne font-bold text-amber-500 uppercase tracking-widest block">EPÍLOGO</span>
      <h2 class="font-playfair text-3xl sm:text-5xl font-bold text-amber-100">
        Venha Tomar um Café e Cuidar do Visual
      </h2>
      <p class="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-sans max-w-md mx-auto">
        A tradição espera por você. Agende seu horário diretamente no WhatsApp.
      </p>

      <div class="pt-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-story">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>FALAR NO WHATSAPP DA BARBEARIA</span>
        </a>
      </div>

      <div class="pt-8 border-t border-amber-900/20 text-xs text-amber-200/60 space-y-1">
        <div>${escapeHtml(project.location?.address || 'Rua da Mooca, 1920 - Mooca')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • ${escapeHtml(project.location?.hours || 'Segunda a Sábado: 08h30 às 19h30')}</div>
      </div>
    </div>
  </section>

  <!-- 6. RODAPÉ -->
  <footer class="py-8 border-t border-amber-900/20 text-center text-xs font-syne text-amber-500/60">
    <div class="container">
      &copy; ${new Date().getFullYear()} ${brandName}. A tradição viva da navalha.
    </div>
  </footer>

</body>
</html>`;
};
