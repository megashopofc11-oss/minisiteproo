import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 03 - BARBEARIA PREMIUM PROFILE (Master Visagista & Autoridade Pessoal)
 * Direção de Arte: Foco absoluto no Barbeiro Mestre / Visagista das Celebridades.
 * Silhueta: Foto PNG recortada do barbeiro transpassando tipografia gigante em outline no fundo,
 * crachá flutuante de autoridade ("14 ANOS DE BANCADA • +18.000 CLIENTES"),
 * tema escuro acetinado com acento em azul titânio e cinza platina,
 * consultoria individual de visagismo 3D e agendamento direto na cadeira VIP.
 * 9 Blocos Visuais:
 * 1. Hero com Foto Recortada PNG em primeiro plano, tipografia monumental em outline ("MARCOS VINICIUS"), badges flutuantes de autoridade e CTA direto.
 * 2. Linha do Tempo / Métricas de Impacto (14 anos, 18 mil cortes, 420 alunos em masterclasses, 4.9 no Google).
 * 3. A Metodologia do Visagismo 3D (Exclusivo método de análise biométrica da face masculina).
 * 4. Galeria de Transformações de Impacto (Fotos focadas na evolução do semblante dos clientes).
 * 5. Menu de Serviços de Cadeira Única (Atendimento individualizado com hora fechada de 60 min).
 * 6. O Estúdio VIP Privativo (Privacidade total, sem barulho de salão grande, café especial e atendimento reservado).
 * 7. Depoimentos de Clientes Assíduos (Empresários, líderes e criadores).
 * 8. Como Chegar ao Studio & Vagas Reservadas (Endereço e mapa).
 * 9. CTA Direto de Agenda VIP com WhatsApp pré-configurado.
 */
export const renderBarbeariaProfile = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'MARCOS VINICIUS • MASTER VISAGISTA');
  const headline = escapeHtml(project.headline || 'TRANSFORME SUA IMAGEM COM QUEM É REFERÊNCIA NACIONAL.');
  const subheadline = escapeHtml(project.subheadline || 'MESTRE VISAGISTA • ELEITO BARBEIRO DO ANO');
  const about = escapeHtml(
    project.about ||
      'Mais de 14 anos dedicados à lapidação da imagem masculina de alto padrão. Atendimento individual em estúdio exclusivo, onde cada corte é desenhado milimetricamente para expressar força, elegância e liderança.'
  );
  const waUrl = getWhatsAppUrl(project);

  const personImg =
    project.professionalPhotoUrl ||
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1000&auto=format&fit=crop&q=80';

  const items = project.items?.length
    ? project.items
    : [
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80', caption: 'Visagismo de Queixo e Fade' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Alinhamento em Barba Densa' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Tesoura de Alta Precisão' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Camuflagem Discreta' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Master Visagista</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #0A0D14; color: #F1F5F9; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    
    .font-syne { font-family: 'Syne', sans-serif; }
    .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
    
    /* Outline Giant Typography */
    .text-outline {
      color: transparent;
      -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
    }
    
    .btn-profile {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      background: linear-gradient(135deg, #38BDF8, #0284C7);
      color: #0F172A;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 18px 36px;
      border-radius: 16px;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.35);
      transition: all 0.3s ease;
    }
    .btn-profile:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(56, 189, 248, 0.5);
    }

    .container { max-width: 1040px; margin: 0 auto; padding: 0 24px; }
  </style>
</head>
<body class="bg-[#0A0D14] text-slate-100">

  <!-- 1. HERO COM FOTO RECORTADA & TIPOGRAFIA MONUMENTAL EM OUTLINE -->
  <section class="relative pt-12 pb-24 sm:pb-32 overflow-hidden border-b border-white/10">
    <!-- Tipografia Gigante de Fundo (Backdrop Title) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
      <div class="font-syne text-6xl sm:text-9xl md:text-[14rem] font-black uppercase text-outline leading-none opacity-40">
        VISAGISTA
      </div>
    </div>

    <div class="container relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Coluna de Texto de Autoridade -->
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-syne font-bold uppercase tracking-widest">
            <span>★</span>
            <span>${subheadline}</span>
          </div>

          <h1 class="font-syne text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]">
            ${headline}
          </h1>

          <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
            ${about}
          </p>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-profile w-full sm:w-auto">
              <span>${SVG_ICONS.whatsapp}</span>
              <span>AGENDAR COM MARCOS</span>
            </a>
            <div class="text-xs text-slate-400 font-syne">
              ★ 4.9/5.0 no Google (+850 avaliações)
            </div>
          </div>
        </div>

        <!-- Coluna da Foto do Profissional em Destaque com Badges Flutuantes -->
        <div class="lg:col-span-5 relative flex justify-center">
          <div class="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-sky-500/30 shadow-2xl bg-gradient-to-t from-sky-950/40 to-transparent">
            <img src="${personImg}" alt="${brandName}" class="w-full h-full object-cover filter contrast-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent"></div>
            
            <!-- Badge Flutuante no Card -->
            <div class="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <div class="font-syne text-xs font-bold text-white uppercase">${brandName}</div>
                <div class="text-[10px] text-sky-400 font-jakarta">Especialista em Harmonia Facial</div>
              </div>
              <div class="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-[10px] font-syne font-bold uppercase">
                14 ANOS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. MÉTRICAS DE IMPACTO & AUTORIDADE -->
  <section class="py-12 bg-[#0E131F] border-b border-white/5">
    <div class="container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div class="space-y-1">
          <div class="font-syne text-3xl sm:text-4xl font-black text-sky-400">+14 ANOS</div>
          <div class="text-xs text-slate-400 font-jakarta uppercase tracking-wider">De Bancada e Estudo</div>
        </div>
        <div class="space-y-1">
          <div class="font-syne text-3xl sm:text-4xl font-black text-sky-400">+18.000</div>
          <div class="text-xs text-slate-400 font-jakarta uppercase tracking-wider">Cortes Realizados</div>
        </div>
        <div class="space-y-1">
          <div class="font-syne text-3xl sm:text-4xl font-black text-sky-400">420+</div>
          <div class="text-xs text-slate-400 font-jakarta uppercase tracking-wider">Alunos Formados</div>
        </div>
        <div class="space-y-1">
          <div class="font-syne text-3xl sm:text-4xl font-black text-sky-400">4.9 ★</div>
          <div class="text-xs text-slate-400 font-jakarta uppercase tracking-wider">Avaliação Máxima</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. A METODOLOGIA DO VISAGISMO 3D -->
  <section class="py-20 sm:py-28 border-b border-white/5">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-sky-400">MÉTODO EXCLUSIVO</span>
        <h2 class="font-syne text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">O Que é o Visagismo 3D?</h2>
        <p class="text-xs sm:text-sm text-slate-400">Por que o corte feito sob medida muda completamente a percepção sobre você.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-3xl bg-[#0E131F] border border-white/10 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-syne font-black text-lg">
            1
          </div>
          <h3 class="font-syne text-lg font-bold text-white">Análise da Linha da Mandíbula</h3>
          <p class="text-xs text-slate-400 font-sans leading-relaxed">
            Identificamos a estrutura óssea do queixo para alongar ou equilibrar o formato do rosto por meio do alinhamento da barba.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-[#0E131F] border border-white/10 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-syne font-black text-lg">
            2
          </div>
          <h3 class="font-syne text-lg font-bold text-white">Direcionamento do Caimento</h3>
          <p class="text-xs text-slate-400 font-sans leading-relaxed">
            Respeitamos os redemoinhos e a textura natural do seu cabelo. Você sai com um penteado que não desmancha ao acordar.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-[#0E131F] border border-white/10 space-y-3">
          <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-syne font-black text-lg">
            3
          </div>
          <h3 class="font-syne text-lg font-bold text-white">Posicionamento de Imagem</h3>
          <p class="text-xs text-slate-400 font-sans leading-relaxed">
            Seja para passar mais autoridade em reuniões de negócios ou um ar moderno e dinâmico, ajustamos as linhas à sua profissão.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. MENU DE PROCEDIMENTOS NA CADEIRA VIP -->
  <section class="py-20 sm:py-28 border-b border-white/5 bg-[#080B12]">
    <div class="container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
        <div>
          <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-sky-400 block mb-2">EXPERIÊNCIA EXCLUSIVA</span>
          <h3 class="font-syne text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Atendimentos na Cadeira VIP</h3>
        </div>
        <p class="text-xs sm:text-sm text-slate-400 max-w-sm">
          Sem salas cheias. Apenas você e o mestre em ambiente 100% privativo.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${items
          .map(
            (item: any) => `
          <div class="p-6 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-2">
                <div>
                  ${item.tag ? `<span class="inline-block px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-syne font-bold uppercase tracking-wider mb-2">${escapeHtml(item.tag)}</span>` : ''}
                  <h4 class="font-syne text-lg font-bold text-white">${escapeHtml(item.title)}</h4>
                </div>
                ${item.priceEnabled && item.price ? `<div class="font-syne font-black text-xl text-sky-400 shrink-0">${escapeHtml(item.price)}</div>` : ''}
              </div>
              <p class="text-xs text-slate-400 font-sans leading-relaxed mb-6">${escapeHtml(item.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-sky-400 hover:text-sky-300 pt-4 border-t border-white/5">
              <span>AGENDAR NESTA MODALIDADE</span>
              <span>→</span>
            </a>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 5. GALERIA DE TRANSFORMAÇÕES -->
  <section class="py-20 sm:py-28 border-b border-white/5">
    <div class="container">
      <div class="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-sky-400">TRANSFORMAÇÕES REAIS</span>
        <h3 class="font-syne text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">Galeria de Resultados</h3>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        ${gallery
          .map(
            (g: any) => `
          <div class="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group relative">
            <img src="${g.url}" alt="${g.caption || 'Corte'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            ${g.caption ? `<div class="absolute bottom-3 left-3 right-3 text-[11px] font-syne font-bold text-white uppercase">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 6. AGENDAMENTO VIP & CONTATO -->
  <section class="py-20 sm:py-24 bg-[#080B12]">
    <div class="container max-w-2xl text-center space-y-8">
      <span class="text-xs font-syne font-bold uppercase tracking-[0.25em] text-sky-400 block">
        RESERVA DE AGENDA
      </span>
      <h3 class="font-syne text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
        Garanta Seu Horário na Cadeira
      </h3>
      <p class="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed font-sans">
        Devido ao formato individual de atendimento, a agenda semanal costuma fechar com antecedência. Entre em contato para consultar datas disponíveis.
      </p>

      <div class="pt-2">
        <a href="${waUrl}" target="_blank" rel="noopener" class="btn-profile">
          <span>${SVG_ICONS.whatsapp}</span>
          <span>FALAR DIRETAMENTE NO WHATSAPP</span>
        </a>
      </div>

      <div class="pt-8 border-t border-white/10 text-xs text-slate-400 font-sans space-y-1">
        <div>${escapeHtml(project.location?.address || 'Edifício Helbor Corporate - Sala 1402')}</div>
        <div>${escapeHtml(project.location?.city || 'São Paulo - SP')} • Estacionamento no subsolo com manobrista</div>
      </div>
    </div>
  </section>

  <!-- 7. RODAPÉ -->
  <footer class="py-12 text-center text-xs font-syne text-slate-500 border-t border-white/5">
    <div class="container space-y-2">
      <div class="font-black text-white tracking-widest uppercase text-sm">${brandName}</div>
      <p class="text-[11px] text-slate-500">Harmonização facial masculina e visagismo de alta precisão.</p>
    </div>
  </footer>

</body>
</html>`;
};
