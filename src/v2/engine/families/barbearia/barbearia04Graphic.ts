import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 04 - BARBEARIA GRAPHIC (Streetwear & Underground Urban Cuts)
 * Direção de Arte: Cultura urbana, skate, hip-hop, tipografia condensada ultra-pesada (Chakra Petch / Space Grotesk),
 * amarelo industrial (#FACC15) e preto asfalto (#0C0C0C), stickers angulados, marquee infinito contínuo,
 * fotos estilo polaroid analógica com datas carimbadas, atitude crua e direta.
 * 9 Blocos Visuais:
 * 1. Hero Streetwear com tipografia gigante ultra-pesada, sticker com rotação "100% STREET APPROVED", marquee infinito correndo no topo, foto de fade em ângulo dinâmico e botão "AGENDAR NA REGUA".
 * 2. Manifesto da Rua ("Sem frescura. Som no talo, navalha afiada e corte na régua.").
 * 3. Cardápio dos Melhores Fades (Low Fade, Mid Fade, Taper Fade, Buzz Cut com Freestyle, Barba Alinhada).
 * 4. Galeria Polaroid / Stickers (Fotos de clientes na cadeira com visual de câmera analógica e bordas brancas).
 * 5. A Cultura da Bancada (Som toca hip-hop 90s, cerveja gelada na faixa, fliperama arcade liberado).
 * 6. O Drop de Produtos Street (Pomada Matte com efeito seco, Balm de crescimento, Camisetas exclusivas).
 * 7. Avaliação da Galera (Reviews curtas e diretas de quem não troca de barbeiro por nada).
 * 8. Localização no Centro Urbano (Perto do metrô, horários até mais tarde para quem trabalha).
 * 9. CTA "COLAR NA GRADE" (WhatsApp com gíria alinhada e botão de agendamento em destaque).
 */
export const renderBarbeariaGraphic = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'UNDERGROUND CUTS');
  const headline = escapeHtml(project.headline || 'CORTE NA RÉGUA. SEM FRESCURA. SOM NO TALO.');
  const subheadline = escapeHtml(project.subheadline || 'STREETWEAR • LOW FADE • URBAN LIFESTYLE');
  const about = escapeHtml(
    project.about ||
      'O ponto de encontro da cultura de rua. Aqui a navalha corre solta ao som do melhor hip-hop dos anos 90, com cerveja trincando na geladeira e a precisão cirúrgica de quem respira o fade todos os dias.'
  );
  const waUrl = getWhatsAppUrl(project);

  const heroImg =
    project.heroImageUrl ||
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&auto=format&fit=crop&q=80';

  const items = project.items?.length
    ? project.items
    : [
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'TAPERING' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'SKIN FADE' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'BEARD LINE' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'FREESTYLE' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Streetwear & Fade</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #0A0A0A; color: #F5F5F5; font-family: 'Space Grotesk', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.5; }
    
    .font-chakra { font-family: 'Chakra Petch', sans-serif; }
    .font-space { font-family: 'Space Grotesk', sans-serif; }
    
    /* Marquee Animation */
    @keyframes streetMarquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .street-track {
      display: flex;
      width: 200%;
      animation: streetMarquee 15s linear infinite;
    }

    .btn-street {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background-color: #FACC15;
      color: #000000;
      font-family: 'Chakra Petch', sans-serif;
      font-weight: 900;
      font-size: 14px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 18px 36px;
      border: 2px solid #000000;
      box-shadow: 6px 6px 0px #FFFFFF;
      text-decoration: none;
      transition: all 0.2s ease;
      transform: skew(-4deg);
    }
    .btn-street:hover {
      transform: skew(-4deg) translate(-2px, -2px);
      box-shadow: 8px 8px 0px #FFFFFF;
      background-color: #FDE047;
    }

    .street-card {
      background-color: #141414;
      border: 2px solid #262626;
      transition: all 0.2s ease;
    }
    .street-card:hover {
      border-color: #FACC15;
      transform: translateY(-3px);
    }

    .container { max-width: 1040px; margin: 0 auto; padding: 0 20px; }
  </style>
</head>
<body class="bg-[#0A0A0A] text-neutral-100">

  <!-- 1. MARQUEE DE TOPO INDUSTRIAL -->
  <div class="bg-[#FACC15] text-black py-2.5 font-chakra text-xs font-black tracking-widest uppercase overflow-hidden border-b-2 border-black">
    <div class="street-track whitespace-nowrap">
      <span>/// FRESH FADES • 100% STREETWEAR • HIP-HOP NO SOM • CERVEJA GELADA • CORTE NA RÉGUA • SEM FRESCURA • AGENDAMENTO VIA WHATSAPP /// </span>
      <span>/// FRESH FADES • 100% STREETWEAR • HIP-HOP NO SOM • CERVEJA GELADA • CORTE NA RÉGUA • SEM FRESCURA • AGENDAMENTO VIA WHATSAPP /// </span>
    </div>
  </div>

  <!-- 2. HERO STREETWEAR BOLD -->
  <section class="py-16 sm:py-24 border-b-2 border-neutral-800 relative overflow-hidden">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Texto com Tipografia Brutalista -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-block px-3 py-1 bg-neutral-800 text-[#FACC15] font-chakra font-black text-xs uppercase tracking-widest border border-neutral-700">
            ${subheadline}
          </div>

          <h1 class="font-chakra text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase tracking-tight leading-[0.95]">
            ${headline}
          </h1>

          <p class="font-space text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed">
            ${about}
          </p>

          <div class="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-street w-full sm:w-auto">
              <span>${SVG_ICONS.whatsapp}</span>
              <span>BROTAR NA BANCADA</span>
            </a>
            <div class="text-xs font-chakra uppercase tracking-wider text-neutral-400">
              ⚡ Horários disponíveis hoje
            </div>
          </div>
        </div>

        <!-- Imagem com Adesivo com Rotação -->
        <div class="lg:col-span-5 relative">
          <div class="relative border-4 border-white p-2 bg-neutral-900 shadow-2xl transform rotate-1">
            <div class="aspect-[4/5] overflow-hidden bg-neutral-800">
              <img src="${heroImg}" alt="${brandName}" class="w-full h-full object-cover filter contrast-125" />
            </div>

            <!-- Sticker Angulado -->
            <div class="absolute -top-4 -right-4 bg-[#FACC15] text-black font-chakra font-black text-xs px-4 py-2 uppercase tracking-widest shadow-lg transform rotate-6 border-2 border-black">
              100% REGULADO ★
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. MANIFESTO DA RUA -->
  <section class="py-16 sm:py-20 border-b-2 border-neutral-800 bg-[#121212]">
    <div class="container text-center max-w-2xl mx-auto space-y-4">
      <div class="font-chakra text-xs font-black tracking-[0.3em] uppercase text-[#FACC15]">
        // A FILOSOFIA DA BANCADA
      </div>
      <h2 class="font-chakra text-2xl sm:text-4xl font-black text-white uppercase">
        "Aqui o cliente não espera sentado em silêncio. Troca ideia, toma uma cerveja e sai com a autoestima no teto."
      </h2>
    </div>
  </section>

  <!-- 4. CARDÁPIO DOS FADES -->
  <section class="py-20 sm:py-28 border-b-2 border-neutral-800">
    <div class="container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span class="font-chakra text-xs font-black tracking-widest text-[#FACC15] uppercase block mb-1">
            // DROP DE SERVIÇOS
          </span>
          <h3 class="font-chakra text-3xl sm:text-5xl font-black text-white uppercase">
            A TABELA DE CORTES
          </h3>
        </div>
        <div class="text-xs font-chakra tracking-wider text-neutral-400 uppercase">
          ★ Cerveja cortesia em todos os combos
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${items
          .map(
            (item: any) => `
          <div class="p-6 street-card flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  ${item.tag ? `<span class="inline-block px-2 py-0.5 bg-[#FACC15] text-black font-chakra text-[10px] font-black uppercase tracking-wider mb-2">${escapeHtml(item.tag)}</span>` : ''}
                  <h4 class="font-chakra text-xl sm:text-2xl font-black text-white uppercase">${escapeHtml(item.title)}</h4>
                </div>
                ${item.priceEnabled && item.price ? `<div class="font-chakra text-2xl font-black text-[#FACC15] shrink-0">${escapeHtml(item.price)}</div>` : ''}
              </div>
              <p class="font-space text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">${escapeHtml(item.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 font-chakra text-xs font-black uppercase tracking-wider text-[#FACC15] hover:underline pt-4 border-t border-neutral-800">
              <span>AGENDAR ESTE CORTE</span>
              <span>→</span>
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 5. GALERIA ESTILO POLAROID STREET -->
  <section class="py-20 sm:py-28 border-b-2 border-neutral-800 bg-[#121212]">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span class="font-chakra text-xs font-black tracking-widest text-[#FACC15] uppercase">// POLAROID WALL</span>
        <h3 class="font-chakra text-3xl sm:text-4xl font-black text-white uppercase">CORTES RECENTES DA BANCADA</h3>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        ${gallery
          .map(
            (g: any, idx: number) => `
          <div class="p-3 bg-white text-black shadow-xl transform ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 transition-transform">
            <div class="aspect-square overflow-hidden bg-neutral-900 mb-2">
              <img src="${g.url}" alt="${g.caption || 'Corte'}" class="w-full h-full object-cover filter contrast-125" />
            </div>
            <div class="font-chakra text-xs font-black uppercase tracking-wider text-center text-neutral-900">
              ${escapeHtml(g.caption || 'FADE')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 6. O ESPAÇO & A VIBE -->
  <section class="py-20 sm:py-28 border-b-2 border-neutral-800">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="p-8 street-card space-y-3">
          <div class="font-chakra text-3xl font-black text-[#FACC15]">01.</div>
          <h4 class="font-chakra text-lg font-black text-white uppercase">SOM PESADO</h4>
          <p class="font-space text-xs text-neutral-400">Playlists selecionadas de hip-hop clássico, boom bap e trap para entrar no clima.</p>
        </div>
        <div class="p-8 street-card space-y-3">
          <div class="font-chakra text-3xl font-black text-[#FACC15]">02.</div>
          <h4 class="font-chakra text-lg font-black text-white uppercase">GELADEIRA LIBERADA</h4>
          <p class="font-space text-xs text-neutral-400">Cerveja artesanal, refrigerante e água sempre trincando para os clientes da casa.</p>
        </div>
        <div class="p-8 street-card space-y-3">
          <div class="font-chakra text-3xl font-black text-[#FACC15]">03.</div>
          <h4 class="font-chakra text-lg font-black text-white uppercase">FLIPERAMA RETRÔ</h4>
          <p class="font-space text-xs text-neutral-400">Máquina arcade de Street Fighter e The King of Fighters livre pra jogar enquanto espera.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. LOCALIZAÇÃO & HORÁRIO DE ATENDIMENTO -->
  <section class="py-20 sm:py-24 bg-[#141414]">
    <div class="container max-w-2xl text-center space-y-6">
      <span class="font-chakra text-xs font-black tracking-widest text-[#FACC15] uppercase block">// ONDE COLAR</span>
      <h3 class="font-chakra text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
        CHEGA MAIS NA BARBEARIA
      </h3>
      <p class="font-space text-neutral-400 text-sm max-w-md mx-auto">
        Próximo ao metrô e com fácil acesso. Atendemos por ordem de chegada ou horário agendado pelo WhatsApp.
      </p>

      <div class="pt-2">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-street">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>CHAMAR NO WHATSAPP & COLAR</span>
        </a>
      </div>

      <div class="pt-8 border-t border-neutral-800 text-xs font-space text-neutral-400 space-y-1">
        <div>${escapeHtml(project.location?.address || 'Rua Augusta, 1420 - Consolação')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • ${escapeHtml(project.location?.hours || 'Terça a Sábado: 10h às 22h')}</div>
      </div>
    </div>
  </section>

  <!-- 8. RODAPÉ -->
  <footer class="py-10 border-t border-neutral-900 text-center text-xs font-chakra text-neutral-500">
    <div class="container space-y-2">
      <div class="font-black text-white uppercase tracking-widest">${brandName}</div>
      <p class="text-[11px] text-neutral-500">Cultura de rua, fade afiado e respeito à bancada.</p>
    </div>
  </footer>

</body>
</html>`;
};
