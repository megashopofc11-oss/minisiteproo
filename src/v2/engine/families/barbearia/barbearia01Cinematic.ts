import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 01 - BARBEARIA CINEMATIC (Barbershop Noir & Gold)
 * Direção de Arte: Atmosfera de cinema noir, iluminação dramática de recorte, ouro envelhecido e preto profundo.
 * 10 Blocos Visuais:
 * 1. Hero Noir com vinheta escura, badge dourado, foto dramática de cadeira/barbeiro e CTA monumental.
 * 2. Manifesto do Cavalheiro ("Não é apenas um corte. É um ritual.") com citação e assinatura.
 * 3. Galeria Estilo Lookbook Cinematográfico com cortes autorais e fotografia de alto contraste.
 * 4. O Ritual da Toalha Quente & Barboterapia (Passo a passo em 4 etapas detalhadas).
 * 5. Menu Nobre de Serviços com tempo de execução, acabamento a navalha e reserva expressa.
 * 6. O Clube & Lounge Privado (Whiskies single malt, sinuca, charutaria, café cortesia).
 * 7. Barbeiros Mestres (Retratos, especialidades e tempo de bancada).
 * 8. Prova Social de Cavalheiros (Avaliações verificadas 5.0 estrelas).
 * 9. Informações de Agendamento, Horários Nobres e Endereço com mapa interativo escuro.
 * 10. CTA Master Final com WhatsApp dourado pulsante e rodapé monogramado.
 */
export const renderBarbeariaCinematic = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'THE BARON BARBERSHOP');
  const headline = escapeHtml(project.headline || 'A ARTE DO CORTE ELEVADA AO NÍVEL DE CINEMA.');
  const subheadline = escapeHtml(project.subheadline || 'EXPERIÊNCIA NOTURNA & RITUAL CLÁSSICO DE NAVALHA');
  const about = escapeHtml(
    project.about ||
      'Fundada para o homem que entende que imagem é poder. Um refúgio secreto onde a tradição da navalha afiada se encontra com a alta hospitalidade, drinks selecionados e precisão milimétrica em cada detalhe.'
  );
  const waUrl = getWhatsAppUrl(project);

  const heroImg =
    project.heroImageUrl ||
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=80';
  const personImg =
    project.professionalPhotoUrl ||
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&auto=format&fit=crop&q=80';

  // Items
  const items = project.items?.length
    ? project.items
    : [
        {
          id: '1',
          title: 'Corte Executivo à Tesoura & Navalha',
          description: 'Visagismo completo, lavagem terapêutica, corte preciso e finalização com pomada matte importada.',
          price: 'R$ 85',
          priceEnabled: true,
          tag: 'MAIS PEDIDO',
          photoUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: '2',
          title: 'Barboterapia com Toalha Fumegante',
          description: 'Amolecimento térmico dos poros com óleos essenciais, navalha japonesa Feather, massagem facial e loção refrescante.',
          price: 'R$ 70',
          priceEnabled: true,
          photoUrl: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: '3',
          title: 'Combo Real (Cabelo + Barba + Chopp)',
          description: 'O ritual completo na mesma sessão com drink cortesia da nossa carta de maltes e toalha perfumada.',
          price: 'R$ 140',
          priceEnabled: true,
          tag: 'EXPERIÊNCIA COMPLETA',
          featured: true,
          photoUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80'
        },
        {
          id: '4',
          title: 'Camuflagem Suave de Grisalhos',
          description: 'Tonalização ultra-natural sem aspecto artificial. Rejuvenesce os fios mantendo a maturidade e elegância.',
          price: 'R$ 90',
          priceEnabled: true,
          photoUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80'
        }
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'Precisão Milimétrica' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Fade Navalhado' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Barboterapia Clássica' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Acabamento Artesanal' }
      ];

  const testimonials = project.testimonials?.length
    ? project.testimonials
    : [
        {
          id: 't1',
          name: 'Rodrigo Mendonça',
          role: 'Cliente há 3 anos',
          content: 'A experiência da toalha quente com o café espresso é insuperável. Não corto mais em outro lugar. O corte dura semanas impecável.',
          rating: 5
        },
        {
          id: 't2',
          name: 'Gabriel Albuquerque',
          role: 'Empresário',
          content: 'Pontualidade britânica, ambiente cinematográfico e atendimento impecável. O combo de barba com a tesoura é outro patamar.',
          rating: 5
        }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Barbershop & Gentlemen's Club</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #060709; color: #E5E7EB; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    
    /* Typography Utilities */
    .font-cinzel { font-family: 'Cinzel', serif; }
    .font-syne { font-family: 'Syne', sans-serif; }
    
    /* Cinematic Atmospheric Glows */
    .bg-noir { background-color: #060709; }
    .gold-gradient-text {
      background: linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #B45309 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gold-border { border: 1px solid rgba(217, 119, 6, 0.35); }
    .gold-glow {
      box-shadow: 0 0 40px rgba(217, 119, 6, 0.25);
    }
    .cinema-vignette {
      background: radial-gradient(ellipse at center, rgba(6,7,9,0.2) 0%, rgba(6,7,9,0.95) 100%);
    }

    /* Buttons */
    .btn-gold {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: linear-gradient(135deg, #F59E0B, #B45309);
      color: #060709;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 16px 28px;
      border-radius: 9999px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(217, 119, 6, 0.4);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-gold:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 15px 35px rgba(217, 119, 6, 0.6);
    }
    
    /* Marquee */
    @keyframes marqueeScroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .marquee-track {
      display: flex;
      width: 200%;
      animation: marqueeScroll 22s linear infinite;
    }

    /* Container */
    .container { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
  </style>
</head>
<body class="bg-noir text-slate-200">

  <!-- 1. HERO NOIR CINEMATOGRÁFICO -->
  <section class="relative min-h-[92vh] sm:min-h-screen flex items-end sm:items-center justify-center pb-16 pt-24 overflow-hidden">
    <!-- Imagem de Fundo com Vinheta de Cinema -->
    <div class="absolute inset-0 z-0">
      <img src="${heroImg}" alt="${brandName}" class="w-full h-full object-cover object-center filter brightness-[0.4] contrast-125 scale-105" />
      <div class="absolute inset-0 cinema-vignette"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-black/60"></div>
    </div>

    <!-- Conteúdo Centralizado do Hero -->
    <div class="relative z-10 container text-center px-4 max-w-3xl">
      <!-- Badge de Prestígio -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md mb-6">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-300">
          ${subheadline}
        </span>
      </div>

      <!-- Headline Monumental -->
      <h1 class="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
        ${headline}
      </h1>

      <!-- Parágrafo de Atmosfera -->
      <p class="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-8 drop-shadow">
        ${about}
      </p>

      <!-- Botões de Ação Imediata -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-gold w-full sm:w-auto">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>AGENDAR MEU HORÁRIO</span>
        </a>
        <a href="#servicos" class="px-6 py-4 rounded-full border border-white/20 text-white font-syne text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors w-full sm:w-auto">
          VER SERVIÇOS & RITUAIS
        </a>
      </div>
    </div>

    <!-- Indicador de Scroll Discreto -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60">
      <span class="text-[10px] uppercase font-syne tracking-widest text-amber-400">DESÇA PARA O CLUBE</span>
      <div class="w-1 h-6 rounded-full bg-gradient-to-b from-amber-400 to-transparent"></div>
    </div>
  </section>

  <!-- 2. MARQUEE DE CREDIBILIDADE & ESTILO -->
  <div class="bg-amber-500/10 border-y border-amber-500/20 py-3 overflow-hidden">
    <div class="marquee-track font-syne text-xs font-black tracking-[0.3em] uppercase text-amber-400/90 whitespace-nowrap">
      <span>★ NAVALHA AFIADA • TOALHA QUENTE • AMBIENTE PRIVATIVO • CARTA DE WHISKIES • VISAGISMO MASCULINO • HORÁRIO MARCADO • SEM FILAS •</span>
      <span>★ NAVALHA AFIADA • TOALHA QUENTE • AMBIENTE PRIVATIVO • CARTA DE WHISKIES • VISAGISMO MASCULINO • HORÁRIO MARCADO • SEM FILAS •</span>
    </div>
  </div>

  <!-- 3. MANIFESTO DO CAVALHEIRO -->
  <section class="py-20 sm:py-28 relative">
    <div class="container">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <span class="font-cinzel text-xs uppercase tracking-[0.3em] text-amber-500 font-bold block">
          CAPÍTULO I • O MANIFESTO
        </span>
        <h2 class="font-cinzel text-2xl sm:text-4xl text-white font-bold leading-snug">
          "Cuidar do seu visual não é vaidade passageira. É a sua primeira linha de comunicação com o mundo."
        </h2>
        <div class="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        <p class="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
          Cada traço de navalha na <strong class="text-white">${brandName}</strong> é executado por mestres que dominam a anatomia facial, o caimento dos fios e a precisão das linhas. Aqui, você desacelera da rotina caótica e assume o controle da sua presença.
        </p>
      </div>
    </div>
  </section>

  <!-- 4. O RITUAL DA TOALHA QUENTE & BARBOTERAPIA (4 PASSOS) -->
  <section class="py-16 sm:py-24 bg-[#0A0C12] border-y border-white/5 relative">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-14">
        <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-400 block mb-2">EXPERIÊNCIA EXCLUSIVA</span>
        <h3 class="font-cinzel text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight">O RITUAL DA BARBA TRADICIONAL</h3>
        <p class="text-xs sm:text-sm text-slate-400 mt-2">Um processo de quatro atos que transforma o barbear em puro relaxamento terapêutico.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Passo 1 -->
        <div class="p-6 rounded-2xl bg-[#0F111A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
          <div class="text-2xl font-cinzel font-black text-amber-500 mb-3">01</div>
          <h4 class="font-syne text-base font-bold text-white mb-2">Óleo Pré-Barba</h4>
          <p class="text-xs text-slate-400 leading-relaxed">Mistura autoral de óleos vegetais nobres para proteger a pele e amaciar o fio antes da lâmina.</p>
        </div>
        <!-- Passo 2 -->
        <div class="p-6 rounded-2xl bg-[#0F111A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
          <div class="text-2xl font-cinzel font-black text-amber-500 mb-3">02</div>
          <h4 class="font-syne text-base font-bold text-white mb-2">Toalha Quente a 60°C</h4>
          <p class="text-xs text-slate-400 leading-relaxed">Vaporização aromática de eucalipto para dilatar os poros, oxigenar os tecidos e aliviar tensões faciais.</p>
        </div>
        <!-- Passo 3 -->
        <div class="p-6 rounded-2xl bg-[#0F111A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
          <div class="text-2xl font-cinzel font-black text-amber-500 mb-3">03</div>
          <h4 class="font-syne text-base font-bold text-white mb-2">Navalha Japonesa</h4>
          <p class="text-xs text-slate-400 leading-relaxed">Lâminas descartáveis de precisão cirúrgica deslizadas com ângulo exato, sem irritação nem foliculite.</p>
        </div>
        <!-- Passo 4 -->
        <div class="p-6 rounded-2xl bg-[#0F111A] border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
          <div class="text-2xl font-cinzel font-black text-amber-500 mb-3">04</div>
          <h4 class="font-syne text-base font-bold text-white mb-2">Bálsamo Calmante</h4>
          <p class="text-xs text-slate-400 leading-relaxed">Toalha fria para fechamento dos poros seguida de massagem suave com bálsamo pós-barba mentolado.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. MENU DE SERVIÇOS & CADEIRA -->
  <section id="servicos" class="py-20 sm:py-28">
    <div class="container">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-400 block mb-2">CARTA DE SERVIÇOS</span>
          <h3 class="font-cinzel text-2xl sm:text-4xl text-white font-bold uppercase tracking-tight">CORTES & PROCEDIMENTOS</h3>
        </div>
        <p class="text-xs sm:text-sm text-slate-400 max-w-sm">
          Todos os procedimentos incluem lavagem especial com shampoo de menta e consultoria de visagismo.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${items
          .map(
            (item: any) => `
          <div class="p-6 rounded-2xl bg-[#0D0F17] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div class="flex items-start justify-between gap-4 mb-2">
                <div>
                  ${item.tag ? `<span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-syne font-black uppercase tracking-wider mb-2">${escapeHtml(item.tag)}</span>` : ''}
                  <h4 class="font-cinzel text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">${escapeHtml(item.title)}</h4>
                </div>
                ${item.priceEnabled && item.price ? `<div class="font-syne font-black text-lg text-amber-400 shrink-0">${escapeHtml(item.price)}</div>` : ''}
              </div>
              <p class="text-xs text-slate-400 leading-relaxed mb-6 font-sans">${escapeHtml(item.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors pt-4 border-t border-white/5">
              <span>RESERVAR ESTE SERVIÇO</span>
              <span>→</span>
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 6. LOOKBOOK & GALERIA CINEMATOGRÁFICA -->
  <section class="py-16 sm:py-24 bg-[#0A0C12] border-y border-white/5">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-400 block mb-2">GALERIA DE ESTILO</span>
        <h3 class="font-cinzel text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight">O PADRÃO NA CADEIRA</h3>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${gallery
          .map(
            (photo: any) => `
          <div class="relative aspect-[3/4] rounded-2xl overflow-hidden group gold-border">
            <img src="${photo.url}" alt="${photo.caption || 'Corte'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
            ${photo.caption ? `<div class="absolute bottom-3 left-3 right-3 text-[11px] font-syne font-bold text-white uppercase tracking-wider">${escapeHtml(photo.caption)}</div>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 7. O ESPAÇO, PUB & COMODIDADES -->
  <section class="py-20 sm:py-28">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-400 block mb-2">HOSPITALIDADE DE CLUBE</span>
          <h3 class="font-cinzel text-2xl sm:text-4xl text-white font-bold uppercase tracking-tight leading-tight mb-6">
            O SEU REFÚGIO FORA DA PRESSÃO DO DIA A DIA.
          </h3>
          <p class="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
            Enquanto aguarda seu horário, relaxe no nosso lounge com poltronas Chesterfield de couro legítimo, aproveite uma dose de bourbon ou um café expresso tirado na hora.
          </p>
          <ul class="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
            <li class="flex items-center gap-3">
              <span class="text-amber-400">✓</span>
              <span>Bar de Whiskies Single Malt e Chopp Artesanal</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-amber-400">✓</span>
              <span>Mesa de Sinuca Clássica Brunswick liberada</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-amber-400">✓</span>
              <span>Wi-Fi de Alta Velocidade e Tomadas em Todas as Bancadas</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-amber-400">✓</span>
              <span>Estacionamento Fechado com Manobrista Gratuito</span>
            </li>
          </ul>
        </div>

        <div class="relative">
          <div class="aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/30 gold-glow">
            <img src="${personImg}" alt="Ambiente" class="w-full h-full object-cover filter contrast-110 brightness-95" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. PROVA SOCIAL / DEPOIMENTOS DE CAVALHEIROS -->
  <section class="py-16 sm:py-24 bg-[#0A0C12] border-y border-white/5">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-12">
        <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-400 block mb-2">REPUTAÇÃO IMPECÁVEL</span>
        <h3 class="font-cinzel text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight">O QUE DIZEM NOSSOS CLIENTES</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        ${testimonials
          .map(
            (t: any) => `
          <div class="p-6 rounded-2xl bg-[#0F111A] border border-white/10 space-y-4">
            <div class="flex items-center gap-1 text-amber-400">
              ${'★'.repeat(t.rating || 5)}
            </div>
            <p class="text-sm text-slate-300 italic font-serif leading-relaxed">"${escapeHtml(t.content)}"</p>
            <div class="pt-2 border-t border-white/5 flex items-center justify-between">
              <span class="font-syne text-xs font-bold text-white uppercase">${escapeHtml(t.name)}</span>
              ${t.role ? `<span class="text-[11px] text-amber-500/80 font-syne">${escapeHtml(t.role)}</span>` : ''}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 9. LOCALIZAÇÃO, HORÁRIOS & CONTATO -->
  <section class="py-20 sm:py-24">
    <div class="container">
      <div class="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0D0F17] border border-white/10 text-center space-y-6">
        <span class="text-xs uppercase tracking-[0.25em] font-syne font-bold text-amber-400 block">SEDE OFICIAL</span>
        <h3 class="font-cinzel text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight">${brandName}</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-left">
          <div class="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div class="text-[11px] font-syne font-bold text-amber-400 uppercase tracking-wider">ENDEREÇO</div>
            <div class="text-xs text-slate-300">${escapeHtml(project.location?.address || 'Av. Paulista, 1200 - Jardins')}</div>
            <div class="text-xs text-slate-400">${escapeHtml(project.location?.city || 'São Paulo - SP')}</div>
          </div>
          <div class="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div class="text-[11px] font-syne font-bold text-amber-400 uppercase tracking-wider">HORÁRIOS DE ATENDIMENTO</div>
            <div class="text-xs text-slate-300">${escapeHtml(project.location?.hours || 'Segunda a Sábado: 09h às 21h')}</div>
            <div class="text-xs text-slate-400">Domingo: Fechado para descanso</div>
          </div>
        </div>

        <div class="pt-4">
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-gold w-full sm:w-auto">
            <span>${SVG_ICONS.whatsapp}</span>
            <span>CHAMAR NO WHATSAPP PARA AGENDAR</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 10. RODAPÉ COM MONOGRAMA -->
  <footer class="py-12 border-t border-white/10 text-center text-xs text-slate-500 font-syne">
    <div class="container space-y-3">
      <div class="font-cinzel text-base font-black text-amber-400 tracking-[0.2em] uppercase">${brandName}</div>
      <p class="text-[11px] text-slate-500">Tradição, navalha e respeito à imagem do homem moderno.</p>
      <div class="pt-4 text-[10px] text-slate-600">
        &copy; ${new Date().getFullYear()} ${brandName}. Todos os direitos reservados.
      </div>
    </div>
  </footer>

</body>
</html>`;
};
