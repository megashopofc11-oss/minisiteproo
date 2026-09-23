import { V2ProjectData, V2Family } from '../../types';
import { renderAura } from './aura';
import { renderVertice } from './vertice';
import { renderMonarch } from './monarch';
import { renderPulse } from './pulse';
import { renderAtelier } from './atelier';
import { renderPrisma } from './prisma';
import { renderFrame } from './frame';
import { renderNova } from './nova';
import { renderElite } from './elite';
import { renderOrbit } from './orbit';

export const getRendererForFamily = (family: V2Family): ((project: V2ProjectData) => string) => {
  switch (family) {
    case 'cinematic': return renderAura;
    case 'bento': return renderVertice;
    case 'editorial': return renderMonarch;
    case 'graphic': return renderPulse;
    case 'minimal': return renderAtelier;
    case 'immersive': return renderPrisma;
    case 'portfolio': return renderFrame;
    case 'poster': return renderNova;
    case 'personal': return renderElite;
    case 'story': return renderOrbit;
    default: return renderAura;
  }
};
