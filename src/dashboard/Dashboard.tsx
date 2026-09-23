import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProjectData, TemplateDefinition } from '../types';
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
  Clock
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, userProfile, logout, isAdmin } = useAuth();

  // Admin opens directly in the Admin Panel. Regular users open in 'projects'.
  const [currentView, setCurrentView] = useState<'projects' | 'library' | 'admin'>(
    isAdmin ? 'admin' : 'projects'
  );
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [activeEditingProject, setActiveEditingProject] = useState<ProjectData | null>(null);

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

  return (
    <div className="min-h-screen bg-[#07080D] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-8 border-b border-white/10 bg-[#0A0C14]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <span className="font-black text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
              BIOSITE <span className="text-gradient-purple">PRO 2.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block -mt-1 hidden sm:block">
              {isAdmin ? 'Gestão Administrativa' : 'SaaS Construtor Profissional'}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/5 text-xs font-bold">
          {/* Regular Users: Meus Biosites + 100 Modelos */}
          {!isAdmin && (
            <>
              <button
                onClick={() => setCurrentView('projects')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentView === 'projects'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderKanban size={14} />
                <span className="hidden sm:inline">Meus Biosites</span>
              </button>

              <button
                onClick={() => setCurrentView('library')}
                className={`px-3 sm:px-4 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentView === 'library'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid size={14} />
                <span className="hidden sm:inline">100 Modelos</span>
              </button>
            </>
          )}

          {/* Admin Exclusive: Painel Admin */}
          {isAdmin && (
            <button
              onClick={() => setCurrentView('admin')}
              className="px-4 py-1.5 rounded-xl flex items-center gap-2 bg-indigo-600 text-white shadow-md font-bold transition-all cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>PAINEL ADMINISTRATIVO</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1">
                  <Clock size={10} /> SOLICITAÇÕES ({pendingCount})
                </span>
              )}
            </button>
          )}
        </nav>

        {/* User Account / Logout - Strictly NO admin email displayed */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-xs font-bold text-white block">
              {isAdmin ? 'ADMINISTRADOR' : (userProfile?.nome || userProfile?.name || 'Cliente')}
            </span>
            <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">
              {isAdmin ? 'PAINEL ADMINISTRATIVO' : 'Acesso Liberado'}
            </span>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/5 transition-colors cursor-pointer"
            title="Sair da Conta"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {currentView === 'projects' && !isAdmin && (
          <MyProjects
            userId={user?.uid || ''}
            onEditProject={(proj) => setActiveEditingProject(proj)}
            onNewProject={() => setCurrentView('library')}
          />
        )}

        {currentView === 'library' && !isAdmin && (
          <TemplatesLibrary
            userId={user?.uid || ''}
            onSelectTemplate={handleSelectTemplate}
          />
        )}

        {currentView === 'admin' && isAdmin && <AdminPanel />}
      </main>
    </div>
  );
};
