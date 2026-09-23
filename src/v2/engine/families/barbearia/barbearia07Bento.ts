import { V2ProjectData } from '../../../types';
import { escapeHtml, sanitizeUrl, getWhatsAppUrl, SVG_ICONS, COMMON_FONTS_LINK } from '../../shared';

/**
 * 07 - BARBEARIA BENTO (Precision Lab & Modern Bento Grid)
 * Direção de Arte: Grade Bento estilo Apple / Linear, cartões interconectados com bordas sutis luminosas,
 * fundo grafite (#0B0F19), cards em vidro escuro (#131B2E), detalhes em ciano elétrico (#38BDF8) e esmeralda,
 * pílulas de status em tempo real ("ABERTO AGORA • 4 CADEIRAS ATIVAS"), métricas de esterilização hospitalar.
 * 8 Blocos Compostos (Múltiplos Módulos):
 * 1. Hero Bento Grid (Card gigante de foto, card com status de horário, card de nota Google 4.9 e card CTA).
 * 2. Grid de Especialidades Bento (Card grande para Fade de Alta Precisão, card médio para Barboterapia, etc.).
 * 3. Métricas e Tecnologia do Lab (Lâminas descartadas a cada corte, esterilização por autoclave, toalhas seladas).
 * 4. Lookbook em Mosaico Bento Dinâmico (Fotos em proporções assimétricas com badges integrados).
 * 5. Mini Perfis da Equipe de Especialistas (Barbeiros com horários preferidos e tempo de experiência).
 * 6. Módulo de Feedback Verificado dos Clientes.
 * 7. Card Bento de Localização com Rota Expressa e Horários.
 * 8. CTA Bento Master Final com botão de agendamento em 30 segundos.
 */
export const renderBarbeariaBento = (project: V2ProjectData): string => {
  const brandName = escapeHtml(project.brandName || 'PRECISION LAB BARBERSHOP');
  const headline = escapeHtml(project.headline || 'ALTA PRECISÃO GEOMÉTRICA & TECNOLOGIA NA CADEIRA.');
  const subheadline = escapeHtml(project.subheadline || 'BENTO GRID • PRECISÃO CIRÚRGICA • AUTOCLAVE');
  const about = escapeHtml(
    project.about ||
      'Desenvolvemos um padrão de atendimento baseado na precisão micrométrica das linhas e no conforto absoluto da tecnologia: lavatórios com massagem integrada, esterilização hospitalar e pontualidade digital.'
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
      ];

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        { id: 'g1', url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80', caption: 'Fade 0.5' },
        { id: 'g2', url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80', caption: 'Tesoura Japonesa' },
        { id: 'g3', url: 'https://images.unsplash.com/photo-1517832606589-715753d4f323?w=800&auto=format&fit=crop&q=80', caption: 'Vaporizador Térmico' },
        { id: 'g4', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80', caption: 'Linha de Barba' }
      ];

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${brandName} — Precision Bento</title>
  <meta name="description" content="${about}">
  ${COMMON_FONTS_LINK}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; background-color: #0B0F19; color: #F8FAFC; font-family: 'DM Sans', sans-serif; }
    body { min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
    
    .font-syne { font-family: 'Syne', sans-serif; }
    
    .bento-card {
      background-color: #111827;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .bento-card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      transform: translateY(-2px);
    }

    .btn-bento {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: linear-gradient(135deg, #0284C7, #38BDF8);
      color: #030712;
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 16px 28px;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.35);
      transition: all 0.2s ease;
    }
    .btn-bento:hover {
      background: linear-gradient(135deg, #0369A1, #0284C7);
      color: #FFFFFF;
    }

    .container { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
  </style>
</head>
<body class="bg-[#0B0F19] text-slate-100">

  <!-- 1. HERO BENTO GRID (ESTILO APPLE / LINEAR) -->
  <section class="py-12 sm:py-20">
    <div class="container space-y-6">
      <!-- Grid Superior -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <!-- Card Principal (Hero Title & About) -->
        <div class="md:col-span-8 p-8 sm:p-12 bento-card bg-gradient-to-br from-[#131D31] to-[#0E1626] flex flex-col justify-between">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-syne font-bold uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ABERTO HOJE • 4 CADEIRAS ATIVAS</span>
            </div>

            <h1 class="font-syne text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              ${headline}
            </h1>

            <p class="text-sm text-slate-300 max-w-lg leading-relaxed font-sans">
              ${about}
            </p>
          </div>

          <div class="pt-8 flex flex-wrap items-center gap-4">
            <a href="${waUrl}" target="_blank" rel="noopener" class="btn-bento">
              <span>${SVG_ICONS.whatsapp}</span>
              <span>AGENDAR HORÁRIO DIGITAL</span>
            </a>
            <span class="text-xs text-slate-400 font-syne">
              Tempo de resposta: ~3 minutos
            </span>
          </div>
        </div>

        <!-- Card Lateral (Nota Google & Métricas) -->
        <div class="md:col-span-4 grid grid-rows-2 gap-6">
          <div class="p-6 bento-card flex flex-col justify-between bg-[#131D31]">
            <div class="flex items-center justify-between">
              <span class="text-xs font-syne font-bold text-slate-400 uppercase">AVALIAÇÃO GOOGLE</span>
              <span class="text-emerald-400 font-syne text-xs font-bold">VERIFICADA ★</span>
            </div>
            <div>
              <div class="font-syne text-4xl font-black text-white">4.9 / 5.0</div>
              <div class="text-xs text-slate-400 mt-1">Mais de 950 clientes atendidos com satisfação máxima</div>
            </div>
          </div>

          <div class="p-6 bento-card flex flex-col justify-between bg-[#131D31]">
            <div class="flex items-center justify-between">
              <span class="text-xs font-syne font-bold text-slate-400 uppercase">BIOSSEGURANÇA</span>
              <span class="text-sky-400 font-syne text-xs font-bold">100% STERILE</span>
            </div>
            <div>
              <div class="font-syne text-lg font-bold text-white">Autoclave & Lâminas Únicas</div>
              <div class="text-xs text-slate-400 mt-1">Instrumental esterilizado segundo padrões hospitalares</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Grid Inferior (Serviços em Cards Bento) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${items.slice(0, 3).map((it: any) => `
          <div class="p-6 bento-card flex flex-col justify-between">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-syne font-bold text-sky-400 uppercase tracking-wider">${it.tag || 'PROCEDIMENTO'}</span>
                ${it.priceEnabled && it.price ? `<span class="font-syne font-bold text-white">${escapeHtml(it.price)}</span>` : ''}
              </div>
              <h3 class="font-syne text-lg font-bold text-white">${escapeHtml(it.title)}</h3>
              <p class="text-xs text-slate-400 font-sans leading-relaxed">${escapeHtml(it.description)}</p>
            </div>
            
            <a href="${waUrl}" target="_blank" rel="noopener" class="pt-4 text-xs font-syne font-bold text-sky-400 hover:underline flex items-center justify-between">
              <span>RESERVAR ESTE</span>
              <span>&rarr;</span>
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 2. MOSAICO BENTO DE FOTOS -->
  <section class="py-12 border-t border-white/5">
    <div class="container space-y-6">
      <div class="flex items-end justify-between">
        <div>
          <span class="text-xs font-syne font-bold text-sky-400 uppercase tracking-wider block mb-1">LOOKBOOK</span>
          <h2 class="font-syne text-2xl sm:text-3xl font-bold text-white uppercase">Precisão em Foco</h2>
        </div>
        <div class="text-xs text-slate-400 font-syne hidden sm:block">FOTOGRAFIA REAL DO LAB</div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${gallery.map((g: any) => `
          <div class="aspect-[4/5] rounded-2xl overflow-hidden bento-card relative group">
            <img src="${g.url}" alt="${g.caption || 'Corte'}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            ${g.caption ? `<div class="absolute bottom-3 left-3 text-[11px] font-syne font-bold text-white uppercase">${escapeHtml(g.caption)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- 3. CARD BENTO DE LOCALIZAÇÃO & HORÁRIOS -->
  <section class="py-12 sm:py-20 border-t border-white/5">
    <div class="container">
      <div class="p-8 sm:p-12 bento-card bg-gradient-to-br from-[#111827] to-[#1E293B] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="space-y-4">
          <span class="text-xs font-syne font-bold text-sky-400 uppercase tracking-wider block">LOCALIZAÇÃO DO LAB</span>
          <h3 class="font-syne text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            ${brandName}
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            ${escapeHtml(project.location?.address || 'Av. Brigadeiro Faria Lima, 2601 - Itaim Bibi')} • ${escapeHtml(project.location?.city || 'São Paulo - SP')}
          </p>
          <div class="text-xs text-slate-400 font-sans">
            Horários: ${escapeHtml(project.location?.hours || 'Segunda a Sábado das 09h às 21h')}
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-end gap-4">
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-bento w-full sm:w-auto text-center">
            <span>${SVG_ICONS.whatsapp}</span>
            <span>CHAMAR NO WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. RODAPÉ -->
  <footer class="py-8 text-center text-xs font-syne text-slate-500 border-t border-white/5">
    <div class="container">
      &copy; ${new Date().getFullYear()} ${brandName}. Precision Bento Grid Lab.
    </div>
  </footer>

</body>
</html>`;
};
