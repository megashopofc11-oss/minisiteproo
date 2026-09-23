/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AuthScreens } from './auth/AuthScreens';
import { Dashboard } from './dashboard/Dashboard';
import { RefreshCw } from 'lucide-react';

const MainRouter: React.FC = () => {
  const { user, userProfile, isLoading, isAdmin, isApproved } = useAuth();
  const [, setViewOverride] = useState<'auth' | 'app'>('app');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07080D] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-4">
          <RefreshCw size={24} className="animate-spin text-purple-400" />
        </div>
        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
          Carregando BioSite Pro 2.0…
        </p>
      </div>
    );
  }

  // If not logged in, or not approved / not admin
  if (!user || !userProfile || (!isApproved && !isAdmin)) {
    return <AuthScreens onSuccess={() => setViewOverride('app')} />;
  }

  // Authenticated and approved (or admin)
  return <Dashboard />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}
