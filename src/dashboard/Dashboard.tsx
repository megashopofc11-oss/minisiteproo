import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProjectData } from '../types';
import { BioFacilTemplate } from '../types/biofacil';
import { V2Home } from '../v2/home/V2Home';
import { BioFacilEditor } from '../editor/BioFacilEditor';
import { V2Editor } from '../v2/editor/V2Editor';
import { MyProjects } from '../projects/MyProjects';
import { AdminPanel } from '../admin/AdminPanel';
import {
  fetchUserProjects,
  fetchTemplateById,
  saveBioFacilUserProject
} from '../firebase/firestoreService';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface BioFacilSession {
  template: BioFacilTemplate;
  projectId: string;
  projectName?: string;
  values?: Record<string, any>;
}

export const Dashboard: React.FC = () => {
  const { user, userProfile, logout, isAdmin } = useAuth();

  // Navigation states: 'home' (Published Templates Catalog) | 'projects' (User Saved Projects) | 'admin' (Admin Panel)
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'admin'>(
    isAdmin ? 'admin' : 'home'
  );

  // New BioFacil editor session
  const [bioFacilSession, setBioFacilSession] = useState<BioFacilSession | null>(null);

  // Legacy editor session (for existing projects)
  const [legacyEditingProject, setLegacyEditingProject] = useState<ProjectData | null>(null);

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
  }, [user, bioFacilSession, legacyEditingProject]);

  // If in BioFacil Editor
  if (bioFacilSession && user) {
    return (
      <BioFacilEditor
        template={bioFacilSession.template}
        projectId={bioFacilSession.projectId}
        userId={user.uid}
        initialProjectName={bioFacilSession.projectName}
        initialValues={bioFacilSession.values}
        onBack={() => setBioFacilSession(null)}
      />
    );
  }

  // If in Legacy Editor view
  if (legacyEditingProject) {
    return (
      <V2Editor
        initialProject={legacyEditingProject}
        onBack={() => setLegacyEditingProject(null)}
      />
    );
  }

  // Handle template selection from Catalog (creates user project and opens BioFacilEditor)
  const handleSelectTemplate = async (template: BioFacilTemplate) => {
    if (!user) return;

    const newProjectId = `proj_${Date.now()}`;
    const defaultValues: Record<string, any> = {};

    if (template.biofacilSchema?.fields) {
      template.biofacilSchema.fields.forEach((f) => {
        if (f.defaultValue !== undefined) {
          defaultValues[f.id] = f.defaultValue;
        } else if (f.type === 'services' || f.type === 'gallery' || f.type === 'testimonials') {
          defaultValues[f.id] = [];
        } else {
          defaultValues[f.id] = '';
        }
      });
    }

    try {
      await saveBioFacilUserProject({
        projectId: newProjectId,
        userId: user.uid,
        templateId: template.templateId,
        templateVersion: template.version || 1,
        projectName: template.name || 'Meu BioSite',
        values: defaultValues,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        engineVersion: 2
      });
    } catch (err) {
      console.warn('Initial project save notice:', err);
    }

    setBioFacilSession({
      template,
      projectId: newProjectId,
      projectName: template.name || 'Meu BioSite',
      values: defaultValues
    });
  };

  // Handle edit from MyProjects
  const handleEditProject = async (project: ProjectData) => {
    if (project.templateId) {
      try {
        const foundTemplate = await fetchTemplateById(project.templateId);
        if (foundTemplate) {
          setBioFacilSession({
            template: foundTemplate,
            projectId: project.projectId,
            projectName: project.nome,
            values: (project as any).values || {}
          });
          return;
        }
      } catch (e) {
        console.warn('Could not load template for project:', e);
      }
    }

    // Fallback for legacy projects
    setLegacyEditingProject(project);
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
            <ShieldCheck size={16} className="text-purple-400" />
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
            onEditProject={handleEditProject}
            onNewProject={() => setCurrentView('home')}
          />
        </main>
      </div>
    );
  }

  // Default: Dynamic Model Catalog
  return (
    <V2Home
      onSelectTemplate={handleSelectTemplate}
      onGoToProjects={() => setCurrentView('projects')}
      onGoToAdmin={isAdmin ? () => setCurrentView('admin') : undefined}
      isAdmin={isAdmin}
      userName={userProfile?.name || userProfile?.nome || user?.displayName || user?.email || 'Criador'}
      onLogout={logout}
      hasProjects={userHasProjects}
    />
  );
};
