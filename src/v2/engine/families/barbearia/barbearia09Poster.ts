import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 09 - BARBEARIA POSTER (The Chop & Brutalist Underground Poster)
 * Direção de Arte: Cartaz de rua underground, tipografia brutalista monumental (Space Grotesk / Chakra Petch),
 * preto absoluto (#000000), branco puro e acento em vermelho alerta (#EF4444),
 * palavras de 80px+ que ocupam a largura da tela, estética de lambe-lambe,
 * carimbo circular "SEM FRESCURA • APENAS NAVALHA", regras diretas da casa e atitude radical.
 * 8 Blocos Visuais:
 * 1. Poster Hero: Palavra gigante ocupando 100% da largura "CORTE.", foto de corte vazando as margens, carimbo vermelho e botão sólido.
 * 2. Manifesto Brutalista Monumental ("Seu cabelo fala antes de você abrir a boca.").
 * 3. Menu de Operações com Números Gigantes (01 CORTE NAVALHADO, 02 BARBA ESCULPIDA, 03 CABELO + BARBA COMPLETO).
 * 4. Galeria Lambe-Lambe em Preto e Branco com Alto Contraste.
 * 5. As 4 Regras da Casa (1. Chegue no horário. 2. A cerveja está gelada. 3. O som é bom. 4. Você sai renovado.).
 * 6. Veredito dos Clientes (Frases curtas e brutais de quem confia na tesoura).
 * 7. Coordenadas & Localização.
 * 8. CTA Final em Bloco Maciço com botão WhatsApp em vermelho.
 */
export const renderBarbeariaPoster = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'THE CHOP • BRUTAL BARBERS');
  const headline = escapeHtml(project.headline || 'SEU CABELO FALA ANTES DE VOCÊ ABRIR A BOCA.');
  const subheadline = escapeHtml(project.subheadline || 'UNDERGROUND BARBER POSTER • NADA DE FRESCURA');
  const about = escapeHtml(
    project.about ||
      'Navalha rápida, fade sem manchas, som alto e zero enrolação. Não vendemos café gourmet nem champanhe. Entregamos o melhor corte da sua vida no menor tempo possível.'
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: '01' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: '02' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: '03' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: '04' }
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
    html { scroll-behavior: smooth; background-color: #000000; color: #FFFFFF; font-family: 'Space Grotesk', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.4; }
    
    .font-space { font-family: 'Space Grotesk', sans-serif; }
    .font-chakra { font-family: 'Chakra Petch', sans-serif; }
    
    .border-brutal { border: 3px solid #FFFFFF; }
    .border-brutal-b { border-bottom: 3px solid #FFFFFF; }

    .btn-poster {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background-color: #EF4444;
      color: #FFFFFF;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 900;
      font-size: 16px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 20px 40px;
      border: 3px solid #FFFFFF;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-poster:hover {
      background-color: #DC2626;
      transform: translate(-3px, -3px);
      box-shadow: 6px 6px 0px #FFFFFF;
    }

    .container { max-width: 1040px; margin: 0 auto; padding: 0 20px; }
  </style>
</head>
<body class="bg-black text-white">

  <!-- 1. POSTER HERO MONUMENTAL -->
  <section class="border-brutal-b pt-12 pb-20">
    <div class="container space-y-8">
      <div class="flex items-center justify-between border-b-2 border-white/20 pb-4">
        <span class="font-chakra text-xs font-black tracking-widest text-[#EF4444] uppercase">// ${brandName}</span>
        <span class="text-xs font-space uppercase tracking-widest text-neutral-400">${subheadline}</span>
      </div>

      <!-- Palavra Gigante que Ocupa a Largura da Tela -->
      <div class="font-space text-7xl sm:text-9xl md:text-[13rem] font-black uppercase tracking-tighter leading-none text-white">
        CORTE.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
        <div class="md:col-span-7 space-y-4">
          <h1 class="font-space text-2xl sm:text-4xl font-black uppercase text-neutral-200">
            ${headline}
          </h1>
          <p class="font-space text-neutral-400 text-sm leading-relaxed max-w-lg">
            ${about}
          </p>

          <div class="pt-4">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-poster w-full sm:w-auto">
              <span>AGENDAR CORTE AGORA</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        <div class="md:col-span-5 relative">
          <div class="border-brutal p-2 bg-neutral-900">
            <div class="aspect-square overflow-hidden">
              <img src="${heroImg}" alt="Poster" class="w-full h-full object-cover filter grayscale contrast-150" />
            </div>
          </div>
          <!-- Carimbo Circular -->
          <div class="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#EF4444] border-2 border-white flex items-center justify-center text-center p-2 text-[10px] font-black uppercase tracking-tight transform rotate-12 shadow-2xl">
            SEM FRESCURA
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. MENU DE OPERAÇÕES EM LINHAS BRUTALISTAS -->
  <section class="py-20 border-brutal-b">
    <div class="container space-y-8">
      <div class="flex items-end justify-between">
        <h2 class="font-space text-3xl sm:text-5xl font-black uppercase">OPERAÇÕES</h2>
        <span class="text-xs font-chakra text-[#EF4444] uppercase tracking-wider">// TABELA FIXA</span>
      </div>

      <div class="divide-y-2 divide-white">
        ${items.map((it: any) => `
          <div class="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-neutral-950 px-4 transition-colors">
            <div class="space-y-1">
              <h3 class="font-space text-2xl sm:text-3xl font-black uppercase text-white">${escapeHtml(it.title)}</h3>
              <p class="font-space text-xs text-neutral-400">${escapeHtml(it.description)}</p>
            </div>
            <div class="flex items-center gap-6 shrink-0">
              ${it.priceEnabled && it.price ? `<span class="font-space text-3xl font-black text-[#EF4444]">${escapeHtml(it.price)}</span>` : ''}
              <a href="${waUrl}" target="_blank" rel="noopener" class="text-xs font-chakra font-black uppercase tracking-widest text-white hover:text-[#EF4444]">
                ESCOLHER &rarr;
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 3. AS 4 REGRAS DA CASA -->
  <section class="py-20 border-brutal-b bg-neutral-950">
    <div class="container space-y-10">
      <h2 class="font-space text-2xl sm:text-4xl font-black uppercase text-center">// REGRAS DA CASA</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div class="p-6 border-2 border-white space-y-2">
          <div class="text-3xl font-black text-[#EF4444]">01.</div>
          <div class="font-bold text-sm uppercase">PONTUALIDADE</div>
          <p class="text-xs text-neutral-400">Chegue no horário marcado para não atrapalhar o próximo da fila.</p>
        </div>
        <div class="p-6 border-2 border-white space-y-2">
          <div class="text-3xl font-black text-[#EF4444]">02.</div>
          <div class="font-bold text-sm uppercase">SOM ALTO</div>
          <p class="text-xs text-neutral-400">A playlist toca rock, rap e hardcore sem interrupção.</p>
        </div>
        <div class="p-6 border-2 border-white space-y-2">
          <div class="text-3xl font-black text-[#EF4444]">03.</div>
          <div class="font-bold text-sm uppercase">CERVEJA NA MÃO</div>
          <p class="text-xs text-neutral-400">Pegue uma gelada na geladeira enquanto aguarda o chamado.</p>
        </div>
        <div class="p-6 border-2 border-white space-y-2">
          <div class="text-3xl font-black text-[#EF4444]">04.</div>
          <div class="font-bold text-sm uppercase">CORTE IMPECÁVEL</div>
          <p class="text-xs text-neutral-400">Você só levanta da cadeira quando o fade estiver perfeito.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. LOCALIZAÇÃO & AGENDAMENTO -->
  <section class="py-20 text-center">
    <div class="container max-w-xl space-y-6">
      <div class="font-space text-4xl sm:text-6xl font-black uppercase">
        VEM CORTAR.
      </div>
      <p class="text-xs sm:text-sm text-neutral-400 font-space">
        ${escapeHtml(project.location?.address || 'Rua Treze de Maio, 820 - Bixiga')} • ${escapeHtml(project.location?.city || 'São Paulo - SP')}
      </p>

      <div class="pt-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-poster">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>CHAMAR NO WHATSAPP</span>
        </a>
      </div>
    </div>
  </section>

  <!-- 5. RODAPÉ -->
  <footer class="py-8 border-t-2 border-white/20 text-center text-xs font-chakra text-neutral-500">
    <div class="container">
      &copy; ${new Date().getFullYear()} ${brandName}. Brutalist Barber Poster.
    </div>
  </footer>

</body>
</html>`;
};
