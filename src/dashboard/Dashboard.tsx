import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProjectData } from '../types';
import { V2DesignMeta } from '../v2/types';
import { V2Home } from '../v2/home/V2Home';
import { V2Editor } from '../v2/editor/V2Editor';
import { MyProjects } from '../projects/MyProjects';
import { AdminPanel } from '../admin/AdminPanel';
import { saveProject, fetchPlatformStats, fetchUserProjects } from '../firebase/firestoreService';
import { getV2DesignById } from '../v2/registry/templateRegistryV2';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, userProfile, logout, isAdmin } = useAuth();

  // Navigation states: 'home' (V2 Streaming Discovery) | 'projects' (User's Saved Projects) | 'admin' (Admin Panel)
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'admin'>(
    isAdmin ? 'admin' : 'home'
  );
  const [activeEditingProject, setActiveEditingProject] = useState<ProjectData | null>(null);
  const [userHasProjects, setUserHasProjects] = useState<boolean>(false);

  // Safeguard: if a non-admin is on 'admin', revert immediately to 'home'
  useEffect(() => {
    if (!isAdmin && currentView === 'admin') {
      setCurrentView('home');
    }
  }, [isAdmin, currentView]);

  // Check if user has projects
  useEffect(() => {
    if (user) {
      fetchUserProjects(user.uid)
        .then((projects) => setUserHasProjects(projects.length > 0))
        .catch(() => {});
    }
  }, [user, activeEditingProject]);

  // If in Editor view
  if (activeEditingProject) {
    return (
      <V2Editor
        initialProject={activeEditingProject}
        onBack={() => setActiveEditingProject(null)}
      />
    );
  }

  // Handle design selection from V2 Home (Creates new project and immediately opens V2Editor)
  const handleSelectDesign = async (design: V2DesignMeta) => {
    if (!user) return;

    const newProjectId = `proj_${Date.now()}`;
    const newProject: ProjectData = {
      projectId: newProjectId,
      userId: user.uid,
      nome: design.demoData.brandName,
      templateId: design.id,
      engineVersion: 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      identity: {
        name: design.demoData.brandName,
        slogan: design.demoData.headline || '',
        badge: '',
        title: design.demoData.brandName,
        subtitle: design.demoData.subheadline || '',
        description: design.demoData.about || '',
        about: design.demoData.about || '',
        logoUrl: design.demoData.logoUrl || '',
        avatarUrl: design.demoData.professionalPhotoUrl || '',
        bannerUrl: design.demoData.heroImageUrl || ''
      },
      theme: {
        primary: design.cover.primary,
        secondary: design.cover.accent,
        accent: design.cover.accent,
        background: design.cover.background,
        surface: design.cover.surfaceColor,
        text: design.cover.textColor,
        textMuted: '#94A3B8',
        cardBg: design.cover.surfaceColor,
        border: 'rgba(255,255,255,0.1)',
        fontHeading: design.cover.fontHeading,
        fontBody: 'Plus Jakarta Sans'
      },
      photos: [],
      galleryStyle: 'grid',
      services: [],
      buttons: [],
      socials: {
        whatsapp: { enabled: true, number: design.demoData.socials.whatsapp?.number || '', message: '', label: 'WhatsApp' },
        instagram: { enabled: !!design.demoData.socials.instagram?.url, username: '', url: design.demoData.socials.instagram?.url || '' },
        tiktok: { enabled: false, username: '', url: '' },
        facebook: { enabled: false, url: '' },
        google: { enabled: false, url: '' },
        googleReview: { enabled: false, url: '' }
      },
      location: {
        address: design.demoData.location?.address || '',
        city: design.demoData.location?.city || '',
        phone: design.demoData.location?.phone || '',
        hours: design.demoData.location?.hours || '',
        mapsUrl: design.demoData.location?.mapsUrl || ''
      },
      seo: {
        title: design.demoData.brandName,
        description: design.demoData.headline || '',
        ogImage: design.demoData.heroImageUrl || '',
        favicon: ''
      },
      projectData: design.demoData as any
    };

    try {
      await saveProject(newProject);
      setActiveEditingProject(newProject);
    } catch (err) {
      console.error('Error creating project from V2 design:', err);
      setActiveEditingProject(newProject);
    }
  };

  // Admin View
  if (currentView === 'admin' && isAdmin) {
    return (
      <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col">
        <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-[#0A0C14] flex items-center justify-between sticky top-0 z-40">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar para a Plataforma</span>
          </button>

          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-indigo-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Painel Administrativo</span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="text-xs font-bold text-red-400 hover:underline cursor-pointer"
          >
            Sair
          </button>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
          <AdminPanel />
        </main>
      </div>
    );
  }

  // Projects View
  if (currentView === 'projects') {
    return (
      <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col">
        <header className="h-16 px-4 sm:px-8 border-b border-white/5 bg-[#090A10]/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Explorar Biblioteca</span>
          </button>

          <span className="text-xs font-black text-white uppercase tracking-widest">
            Meus Biosites
          </span>

          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
          >
            + Criar Biosite
          </button>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
          <MyProjects
            userId={user?.uid || ''}
            onEditProject={(proj) => setActiveEditingProject(proj)}
            onNewProject={() => setCurrentView('home')}
          />
        </main>
      </div>
    );
  }

  // Default: V2 Streaming Discovery Home
  return (
    <V2Home
      onSelectDesign={handleSelectDesign}
      onGoToProjects={() => setCurrentView('projects')}
      onGoToAdmin={isAdmin ? () => setCurrentView('admin') : undefined}
      isAdmin={isAdmin}
      userName={userProfile?.name || userProfile?.nome || user?.displayName || user?.email || 'Criador'}
      onLogout={logout}
      hasProjects={userHasProjects}
    />
  );
};
