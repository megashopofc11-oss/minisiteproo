import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProjectData, TemplateDefinition, NichoId } from '../types';
import { DesignMeta } from '../types/designs';
import { getDesignById } from '../designs/registry';
import { MyProjects } from '../projects/MyProjects';
import { TemplatesLibrary } from '../templates/TemplatesLibrary';
import { AdminPanel } from '../admin/AdminPanel';
import { ProjectEditor } from '../editor/ProjectEditor';
import { saveProject, fetchPlatformStats } from '../firebase/firestoreService';
import {
  Sparkles,
  LayoutGrid,
  FolderKanban,
  ShieldCheck,
  LogOut,
  Clock,
  MoreHorizontal,
  X,
  Plus,
  Layers,
  User,
  ChevronRight,
  Flame
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, userProfile, logout, isAdmin } = useAuth();

  // Admin opens directly in the Admin Panel. Regular users open in 'projects' (Home).
  const [currentView, setCurrentView] = useState<'projects' | 'library' | 'admin'>(
    isAdmin ? 'admin' : 'projects'
  );
  const [initialLibraryNicho, setInitialLibraryNicho] = useState<NichoId | null>(null);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [activeEditingProject, setActiveEditingProject] = useState<ProjectData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Safeguard: if a non-admin is on 'admin', revert immediately to 'projects'
  useEffect(() => {
    if (!isAdmin && currentView === 'admin') {
      setCurrentView('projects');
    }
  }, [isAdmin, currentView]);

  // Load pending counts for admin notification badges
  useEffect(() => {
    if (isAdmin) {
      fetchPlatformStats()
        .then((stats) => {
          setPendingCount(stats.pendingUsers);
        })
        .catch((err) => {
          console.error('Error loading pending stats:', err);
        });
    }
  }, [isAdmin, currentView]);

  // If currently in Editor view (only accessible for non-admin creators)
  if (activeEditingProject && !isAdmin) {
    return (
      <ProjectEditor
        initialProject={activeEditingProject}
        onBack={() => setActiveEditingProject(null)}
      />
    );
  }

  // Handle template selection from Library
  const handleSelectTemplate = async (template: TemplateDefinition) => {
    if (!user || isAdmin) return;

    const newProjectId = `proj_${Date.now()}`;
    const newProject: ProjectData = {
      ...template.defaultData,
      projectId: newProjectId,
      userId: user.uid,
      nome: `Meu ${template.name}`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    try {
      await saveProject(newProject);
      setActiveEditingProject(newProject);
    } catch (err) {
      console.error('Error creating project from template:', err);
      setActiveEditingProject(newProject);
    }
  };

  // Handle modern design selection
  const handleSelectDesign = async (design: DesignMeta) => {
    if (!user || isAdmin) return;

    const newProjectId = `proj_${Date.now()}`;
    const newProject: ProjectData = {
      projectId: newProjectId,
      userId: user.uid,
      nome: `Meu ${design.name}`,
      nicho: '01-barbearia',
      templateId: design.id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      identity: {
        name: design.demoData.brandName,
        slogan: design.demoData.headline || '',
        badge: design.demoData.badge || '',
        title: design.demoData.brandName,
        headline: design.demoData.headline,
        subtitle: design.demoData.subtitle || '',
        description: design.demoData.about || '',
        about: design.demoData.about || '',
        logoUrl: design.demoData.logoUrl || '',
        avatarUrl: design.demoData.professionalPhotoUrl || '',
        bannerUrl: design.demoData.heroImageUrl || '',
        professionalPhotoUrl: design.demoData.professionalPhotoUrl || '',
        heroImageUrl: design.demoData.heroImageUrl || '',
        quote: design.demoData.quote || ''
      },
      theme: {
        primary: design.palettes[0]?.primary || '#F59E0B',
        secondary: design.palettes[0]?.secondary || '#B45309',
        accent: design.palettes[0]?.accent || '#FCD34D',
        background: design.palettes[0]?.background || '#07080D',
        surface: design.palettes[0]?.surface || '#0E111A',
        text: design.palettes[0]?.text || '#FFFFFF',
        textMuted: design.palettes[0]?.textMuted || '#94A3B8',
        cardBg: design.palettes[0]?.cardBg || '#0E111A',
        border: design.palettes[0]?.border || 'rgba(255,255,255,0.1)',
        fontHeading: design.typographies[0]?.headingFont || 'Syne',
        fontBody: design.typographies[0]?.bodyFont || 'Plus Jakarta Sans'
      },
      photos: design.demoData.gallery || [],
      galleryStyle: 'carousel',
      services: design.demoData.items.map((it) => ({
        id: it.id,
        name: it.title,
        description: it.description,
        price: it.price || '',
        priceEnabled: it.priceEnabled || false,
        featured: it.featured,
        tag: it.tag,
        imageUrl: it.photoUrl
      })),
      buttons: [],
      socials: {
        whatsapp: design.demoData.whatsapp || { enabled: true, number: '', message: '', label: 'WhatsApp' },
        instagram: design.demoData.instagram || { enabled: false, username: '', url: '' },
        tiktok: design.demoData.tiktok || { enabled: false, username: '', url: '' },
        facebook: design.demoData.facebook || { enabled: false, url: '' },
        google: { enabled: false, url: '' },
        googleReview: { enabled: false, url: '' }
      },
      location: {
        address: design.demoData.location.address,
        city: design.demoData.location.city,
        phone: design.demoData.location.phone,
        hours: design.demoData.hours,
        mapsUrl: design.demoData.location.mapsUrl
      },
      seo: {
        title: `${design.demoData.brandName} | Biosite Oficial`,
        description: design.demoData.headline || design.demoData.subtitle || '',
        ogImage: design.demoData.heroImageUrl || '',
        favicon: design.demoData.logoUrl || ''
      },
      projectData: design.demoData,
      designConfig: {
        designId: design.id,
        heroVariant: 'A',
        contentVariant: 'A',
        galleryVariant: 'A',
        ctaVariant: 'A',
        contactVariant: 'A',
        paletteId: design.palettes[0]?.id || 'cine-noir',
        typographyId: design.typographies[0]?.id || 'cine-typo-syne',
        motionLevel: 'cinematic'
      }
    };

    try {
      await saveProject(newProject);
      setActiveEditingProject(newProject);
    } catch (err) {
      console.error('Error creating project from design:', err);
      setActiveEditingProject(newProject);
    }
  };

  const navigateToHome = () => {
    setActiveEditingProject(null);
    if (isAdmin) {
      setCurrentView('admin');
    } else {
      setCurrentView('projects');
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar / Cabeçalho Padrão Premium (Requisitos 1 & 2) */}
      <header className="h-16 sm:h-20 px-4 sm:px-8 border-b border-white/10 bg-[#0A0C14]/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        {/* Brand: BIO FÁCIL (Clicável para voltar à Home / Dashboard) */}
        <div
          onClick={navigateToHome}
          className="flex items-center gap-3 cursor-pointer group select-none active:scale-95 transition-transform"
          role="button"
          tabIndex={0}
          title="Ir para o Início / Dashboard Principal"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
            <Sparkles size={20} className="text-slate-950 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                BIO <span className="text-amber-400">FÁCIL</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider block -mt-0.5">
              Crie biosites que impressionam
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs (Requisito 2) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/5 text-xs font-bold">
          {/* Regular Users: Meus Biosites + 10 Nichos / 100 Modelos */}
          {!isAdmin && (
            <>
              <button
                type="button"
                onClick={() => {
                  setInitialLibraryNicho(null);
                  setCurrentView('projects');
                }}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'projects'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderKanban size={15} />
                <span>Meus Biosites</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setInitialLibraryNicho(null);
                  setCurrentView('library');
                }}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  currentView === 'library'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutGrid size={15} />
                <span>Biblioteca de Estilos</span>
              </button>
            </>
          )}

          {/* Admin Exclusive: Painel Admin */}
          {isAdmin && (
            <button
              type="button"
              onClick={() => setCurrentView('admin')}
              className="px-4 py-2 rounded-xl flex items-center gap-2 bg-indigo-600 text-white shadow-md font-bold transition-all cursor-pointer"
            >
              <ShieldCheck size={16} />
              <span>PAINEL ADMINISTRATIVO</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1">
                  <Clock size={10} /> SOLICITAÇÕES ({pendingCount})
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right Desktop Actions & Profile */}
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-white block">
              {isAdmin ? 'ADMINISTRADOR' : (userProfile?.nome || userProfile?.name || 'Cliente')}
            </span>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              {isAdmin ? 'PAINEL ADMINISTRATIVO' : 'Acesso Liberado'}
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/5 transition-colors cursor-pointer"
            title="Sair da Conta"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Mobile Navigation Trigger Button (•••) (Requisito 2) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer active:scale-95 flex items-center justify-center shadow-md"
            title="Abrir Menu de Navegação"
          >
            <MoreHorizontal size={22} className="text-amber-400" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Menu (Requisito 2) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-[85%] max-w-sm h-full bg-[#0B0D17] border-l border-white/15 p-6 flex flex-col justify-between overflow-y-auto">
            {/* Top Header of Drawer */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div
                  onClick={navigateToHome}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
                    <Sparkles size={16} className="text-slate-950 stroke-[3]" />
                  </div>
                  <span className="font-black text-sm text-white">BIO FÁCIL</span>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User Profile Card */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-xs">
                  <User size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {isAdmin ? 'Administrador' : (userProfile?.nome || userProfile?.name || 'Cliente')}
                  </h4>
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                    {isAdmin ? 'Gestão Admin' : 'Acesso Liberado'}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5">
                {!isAdmin && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setInitialLibraryNicho(null);
                        setCurrentView('library');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-between shadow-lg shadow-amber-500/20 cursor-pointer mb-3"
                    >
                      <span className="flex items-center gap-2">
                        <Plus size={16} />
                        Criar Novo Biosite
                      </span>
                      <ChevronRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInitialLibraryNicho(null);
                        setCurrentView('projects');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold flex items-center gap-3 cursor-pointer ${
                        currentView === 'projects'
                          ? 'bg-white/10 text-amber-300'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <FolderKanban size={16} />
                      <span>Meus Biosites</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInitialLibraryNicho(null);
                        setCurrentView('library');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-left text-xs font-bold flex items-center gap-3 cursor-pointer ${
                        currentView === 'library'
                          ? 'bg-white/10 text-amber-300'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <Layers size={16} />
                      <span>Explorar 10 Nichos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInitialLibraryNicho(null);
                        setCurrentView('library');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-3 px-4 rounded-xl text-left text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-3 cursor-pointer"
                    >
                      <LayoutGrid size={16} />
                      <span>100 Modelos de Biosite</span>
                    </button>
                  </>
                )}

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-left text-xs font-bold bg-indigo-600 text-white flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      Painel Administrativo
                    </span>
                    {pendingCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                        {pendingCount}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-300 hover:text-rose-400 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span>Sair da Conta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {currentView === 'projects' && !isAdmin && (
          <MyProjects
            userId={user?.uid || ''}
            onEditProject={(proj) => setActiveEditingProject(proj)}
            onNewProject={(design) => {
              if (design) {
                handleSelectDesign(design);
              } else {
                handleSelectDesign(getDesignById('01-cinematic'));
              }
            }}
          />
        )}

        {currentView === 'library' && !isAdmin && (
          <TemplatesLibrary
            userId={user?.uid || ''}
            initialNichoId={initialLibraryNicho}
            onClearInitialNicho={() => setInitialLibraryNicho(null)}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {currentView === 'admin' && isAdmin && <AdminPanel />}
      </main>
    </div>
  );
};
