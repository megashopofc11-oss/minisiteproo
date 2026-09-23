import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 05 - BARBEARIA IMMERSIVE (The Gentleman's Pub & Barbershop)
 * Direção de Arte: Experiência 360° de Pub Britânico clássico com barbearia de época.
 * Cores: Mogno escuro (#160D08), British Racing Green (#0A1A14), detalhes em bronze envelhecido (#C59B4B).
 * Silhueta: Foco na experiência física do espaço — bar de chopp artesanal, mesa de sinuca clássica,
 * poltronas Chesterfield em capitonê, carta de drinks e pacotes de "Dia do Noivo" e "Confraria de Amigos".
 * 9 Blocos Visuais:
 * 1. Hero Imersivo de Atmosfera com vídeo/imagem de fundo, badge "BARBEARIA & PUB", headline monumental e botão de reserva.
 * 2. Os Quatro Pilares do Espaço (A Cadeira Clássica, O Pub com 6 Torneiras, O Salão de Sinuca, A Charutaria).
 * 3. Cardápio Integrado: Cadeira + Balcão (Combos de corte com chopp artesanal ou dose de bourbon).
 * 4. Galeria de Confraternização (Fotos do pub, clientes brindando, cortes precisos e ambiente intimista).
 * 5. O Dia do Noivo & Confraria (Pacote exclusivo para celebrações entre amigos e padrinhos com espaço reservado).
 * 6. Carta de Cervejas e Whiskies da Casa (Destaques da torneira e rótulos de importação).
 * 7. O que Dizem os Membros do Clube (Depoimentos de clientes fiéis).
 * 8. Horários Estendidos do Pub e Endereço com Estacionamento Privado.
 * 9. CTA "GARANTA SUA CADEIRA E SEU PINT" com WhatsApp direto para reservas.
 */
export const renderBarbeariaImmersive = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || "THE GENTLEMAN'S PUB & BARBERSHOP");
  const headline = escapeHtml(project.headline || 'O SEU NOVO PONTO DE ENCONTRO. CORTE, CHOPP & TRADIÇÃO.');
  const subheadline = escapeHtml(project.subheadline || 'PUB BRITÂNICO • SINUCA BRUNSWICK • ALTA BARBEARIA');
  const about = escapeHtml(
    project.about ||
      'Um refúgio criado para que o homem moderno resgate o prazer de desacelerar. Muito além de cortar o cabelo ou alinhar a barba: você saboreia um chopp artesanal tirado na hora, desafia os amigos na sinuca e desfruta de um ambiente pensado exclusivamente para o seu conforto.'
  );
  const waUrl = getWhatsAppUrl(project);

  const heroImg =
    project.heroImageUrl ||
    'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=1600&auto=format&fit=crop&q=80';

  const items = project.items?.length
    ? project.items
    : [
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'O Salão de Corte' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80', caption: 'Chopp Artesanal' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Cuidado nos Detalhes' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80', caption: 'Lounge & Sinuca' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Pub & Barbershop</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #0E1612; color: #E8ECE9; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-syne { font-family: 'Syne', sans-serif; }
    
    .wood-border { border: 1px solid rgba(197, 155, 75, 0.25); }
    .wood-card {
      background-color: #141F1A;
      border: 1px solid rgba(197, 155, 75, 0.2);
      transition: all 0.3s ease;
    }
    .wood-card:hover {
      border-color: #C59B4B;
      transform: translateY(-2px);
    }

    .btn-pub {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: linear-gradient(135deg, #C59B4B, #8F6927);
      color: #0A120E;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 18px 36px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(197, 155, 75, 0.3);
      transition: all 0.3s ease;
    }
    .btn-pub:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(197, 155, 75, 0.5);
    }

    .container { max-width: 1060px; margin: 0 auto; padding: 0 24px; }
  </style>
</head>
<body class="bg-[#0E1612] text-slate-200">

  <!-- 1. HERO COM ATMOSFERA DE PUB & BARBEARIA -->
  <section class="relative min-h-[90vh] flex items-center justify-center py-24 overflow-hidden border-b border-white/10">
    <div class="absolute inset-0 z-0">
      <img src="${heroImg}" alt="${brandName}" class="w-full h-full object-cover filter brightness-[0.35] contrast-125 scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0E1612] via-[#0E1612]/60 to-black/80"></div>
    </div>

    <div class="container relative z-10 text-center max-w-3xl space-y-6">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-xs font-syne font-bold uppercase tracking-widest">
        <span>🍻</span>
        <span>${subheadline}</span>
      </div>

      <h1 class="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.15]">
        ${headline}
      </h1>

      <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-sans">
        ${about}
      </p>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-pub w-full sm:w-auto">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>RESERVAR CADEIRA & MESA</span>
        </a>
        <a href="#pilares" class="px-6 py-4 rounded-full border border-emerald-500/30 text-emerald-200 font-syne text-xs font-bold tracking-widest uppercase hover:bg-emerald-950/40 transition-colors w-full sm:w-auto">
          CONHECER A EXPERIÊNCIA
        </a>
      </div>
    </div>
  </section>

  <!-- 2. OS QUATRO PILARES DA EXPERIÊNCIA -->
  <section id="pilares" class="py-20 sm:py-28 border-b border-white/5 bg-[#0A100D]">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#C59B4B]">NOSSA ESTRUTURA</span>
        <h2 class="font-cinzel text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">O Que Espera por Você</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-6 rounded-2xl wood-card space-y-3">
          <div class="text-2xl font-cinzel font-black text-[#C59B4B]">01</div>
          <h3 class="font-syne text-base font-bold text-white">A Cadeira de Época</h3>
          <p class="text-xs text-slate-400 leading-relaxed font-sans">Cadeiras de ferro fundido estofadas em couro legítimo, com regulagem precisa e conforto absoluto.</p>
        </div>

        <div class="p-6 rounded-2xl wood-card space-y-3">
          <div class="text-2xl font-cinzel font-black text-[#C59B4B]">02</div>
          <h3 class="font-syne text-base font-bold text-white">6 Torneiras de Chopp</h3>
          <p class="text-xs text-slate-400 leading-relaxed font-sans">Da IPA aromática à Stout encorpada, trabalhamos com cervejarias artesanais locais selecionadas.</p>
        </div>

        <div class="p-6 rounded-2xl wood-card space-y-3">
          <div class="text-2xl font-cinzel font-black text-[#C59B4B]">03</div>
          <h3 class="font-syne text-base font-bold text-white">Mesa de Sinuca Clássica</h3>
          <p class="text-xs text-slate-400 leading-relaxed font-sans">Mesa oficial Brunswick com pano verde inglês para uma partida com os amigos antes ou depois do corte.</p>
        </div>

        <div class="p-6 rounded-2xl wood-card space-y-3">
          <div class="text-2xl font-cinzel font-black text-[#C59B4B]">04</div>
          <h3 class="font-syne text-base font-bold text-white">Lounge com Poltronas</h3>
          <p class="text-xs text-slate-400 leading-relaxed font-sans">Ambiente intimista com iluminação quente, jornais do dia, música ambiente selecionada e privacidade.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. COMBOS: CADEIRA + BALCÃO -->
  <section class="py-20 sm:py-28 border-b border-white/5">
    <div class="container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div>
          <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#C59B4B] block mb-2">EXPERIÊNCIA COMPLETA</span>
          <h3 class="font-cinzel text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">Combos Cadeira & Pub</h3>
        </div>
        <div class="text-xs text-slate-400 font-syne">★ Atendimento com reserva antecipada</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${items
          .map(
            (item: any) => `
          <div class="p-6 rounded-2xl wood-card flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-3">
                <div>
                  ${item.tag ? `<span class="inline-block px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-syne font-black uppercase tracking-wider mb-2 border border-emerald-500/30">${escapeHtml(item.tag)}</span>` : ''}
                  <h4 class="font-cinzel text-lg sm:text-xl font-bold text-white">${escapeHtml(item.title)}</h4>
                </div>
                ${item.priceEnabled && item.price ? `<div class="font-syne font-black text-xl text-[#C59B4B] shrink-0">${escapeHtml(item.price)}</div>` : ''}
              </div>
              <p class="text-xs text-slate-400 font-sans leading-relaxed mb-6">${escapeHtml(item.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#C59B4B] hover:text-amber-300 pt-4 border-t border-white/5">
              <span>RESERVAR ESTE COMBO</span>
              <span>→</span>
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 4. GALERIA DE MOMENTOS DO PUB -->
  <section class="py-20 sm:py-28 border-b border-white/5 bg-[#0A100D]">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#C59B4B]">MOMENTOS NO CLUBE</span>
        <h3 class="font-cinzel text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">Galeria de Confraternização</h3>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${gallery
          .map(
            (g: any) => `
          <div class="aspect-[3/4] rounded-2xl overflow-hidden wood-border relative group">
            <img src="${g.url}" alt="${g.caption || 'Ambiente'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            ${g.caption ? `<div class="absolute bottom-3 left-3 right-3 text-[11px] font-syne font-bold text-white uppercase tracking-wider">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 5. RESERVAS & LOCALIZAÇÃO -->
  <section class="py-20 sm:py-24">
    <div class="container max-w-2xl text-center space-y-8">
      <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-[#C59B4B] block">
        GARANTA SEU LUGAR
      </span>
      <h3 class="font-cinzel text-3xl sm:text-5xl font-bold text-white uppercase tracking-tight">
        A Cadeira Está Pronta. O Chopp Também.
      </h3>
      <p class="text-slate-300 text-sm max-w-md mx-auto leading-relaxed font-sans">
        Entre em contato pelo WhatsApp para agendar seu horário de corte ou reservar o espaço para eventos com amigos.
      </p>

      <div class="pt-2">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-pub">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>RESERVAR HORÁRIO NO PUB</span>
        </a>
      </div>

      <div class="pt-8 border-t border-white/10 text-xs text-slate-400 font-sans space-y-1">
        <div>${escapeHtml(project.location?.address || 'Rua Bela Cintra, 1850 - Consolação')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • ${escapeHtml(project.location?.hours || 'Terça a Sábado: 11h às 23h')}</div>
      </div>
    </div>
  </section>

  <!-- 6. RODAPÉ -->
  <footer class="py-12 text-center text-xs font-syne text-slate-500 border-t border-white/5">
    <div class="container space-y-2">
      <div class="font-black text-white uppercase tracking-widest text-sm">${brandName}</div>
      <p class="text-[11px] text-slate-500">Corte clássico, boa conversa e chopp gelado.</p>
    </div>
  </footer>

</body>
</html>`;
};
