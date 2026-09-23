import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  loginUser,
  registerUser,
  resetUserPassword,
  logoutUser,
  subscribeToAuth,
  fetchUserProfile,
  parseAuthError,
  AuthErrorDetails
} from '../firebase/authService';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  errorDetails: AuthErrorDetails | null;
  clearError: () => void;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ user: User; profile: UserProfile }>;
  register: (name: string, email: string, pass: string) => Promise<UserProfile>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  checkStatusAgain: () => Promise<void>;
  isAdmin: boolean;
  isApproved: boolean;
  isPending: boolean;
  isRejected: boolean;
  isBlocked: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<AuthErrorDetails | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser, currentProfile) => {
      setUser(currentUser);
      setProfile(currentProfile);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => {
    setError(null);
    setErrorDetails(null);
  };

  const login = async (email: string, pass: string, rememberMe = true) => {
    clearError();
    try {
      const res = await loginUser(email, pass, rememberMe);
      setUser(res.user);
      setProfile(res.profile);
      return res;
    } catch (err: unknown) {
      const details = parseAuthError(err);
      setError(details.userFriendlyMessage);
      setErrorDetails(details);
      throw err;
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    clearError();
    try {
      const newProfile = await registerUser(name, email, pass);
      setProfile(newProfile);
      return newProfile;
    } catch (err: unknown) {
      const details = parseAuthError(err);
      setError(details.userFriendlyMessage);
      setErrorDetails(details);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    clearError();
    try {
      await resetUserPassword(email);
    } catch (err: unknown) {
      const details = parseAuthError(err);
      setError(details.userFriendlyMessage);
      setErrorDetails(details);
      throw err;
    }
  };

  const logout = async () => {
    clearError();
    await logoutUser();
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      const updated = await fetchUserProfile(user.uid);
      setProfile(updated);
    }
  };

  // Safe RBAC authorization derived from verified Firestore profile
  const isAdmin = profile?.role === 'admin';
  const isApproved =
    profile?.status === 'approved' || profile?.status === 'aprovado' || isAdmin;
  const isPending =
    (profile?.status === 'pending' || profile?.status === 'pendente') && !isAdmin;
  const isRejected =
    (profile?.status === 'rejected' || profile?.status === 'rejeitado') && !isAdmin;
  const isBlocked =
    (profile?.status === 'blocked' || profile?.status === 'bloqueado') && !isAdmin;

  const normalizedProfile = profile
    ? {
        ...profile,
        nome: profile.nome || profile.name,
        name: profile.name || profile.nome || ''
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: normalizedProfile,
        userProfile: normalizedProfile,
        loading,
        isLoading: loading,
        error,
        errorDetails,
        clearError,
        login,
        register,
        resetPassword,
        logout,
        refreshProfile,
        checkStatusAgain: refreshProfile,
        isAdmin,
        isApproved,
        isPending,
        isRejected,
        isBlocked
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
