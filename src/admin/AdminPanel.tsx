import React, { useState, useEffect } from 'react';
import { UserProfile, UserStatus } from '../types';
import { useAuth } from '../hooks/useAuth';
import {
  fetchAllUsers,
  updateUserStatus,
  fetchPlatformStats
} from '../firebase/firestoreService';
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Ban,
  Search,
  Filter,
  ShieldAlert,
  ArrowUpDown,
  RefreshCw,
  AlertTriangle,
  Calendar,
  Mail,
  User as UserIcon,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ConfirmActionState {
  type: 'approve' | 'reject' | 'block' | 'unblock';
  user: UserProfile;
}

export const AdminPanel: React.FC = () => {
  const { user: currentAuthUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
    blockedUsers: 0
  });

  // Modal State for approval / rejection confirmations
  const [confirmAction, setConfirmAction] = useState<ConfirmActionState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        fetchAllUsers(),
        fetchPlatformStats()
      ]);
      setUsers(usersData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading admin users/stats from Firestore:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConfirmAction = async () => {
    if (!confirmAction) return;
    setIsProcessing(true);
    try {
      const targetUid = confirmAction.user.uid;
      let newStatus: UserStatus = 'pending';

      if (confirmAction.type === 'approve' || confirmAction.type === 'unblock') {
        newStatus = 'approved';
      } else if (confirmAction.type === 'reject') {
        newStatus = 'rejected';
      } else if (confirmAction.type === 'block') {
        newStatus = 'blocked';
      }

      await updateUserStatus(
        targetUid,
        newStatus,
        currentAuthUser?.uid || 'admin'
      );
      setConfirmAction(null);
      await loadData();
    } catch (err) {
      console.error('Error executing admin status change:', err);
      alert('Não foi possível atualizar o status do usuário. Verifique as permissões.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Pending users specifically highlighted for fast review
  const pendingUsersList = users.filter(
    (u) => u.status === 'pending' || u.status === 'pendente'
  );

  const filteredUsers = users.filter((u) => {
    const userName = u.nome || u.name || '';
    const matchesSearch =
      userName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const isApp = u.status === 'aprovado' || u.status === 'approved';
    const isPen = u.status === 'pendente' || u.status === 'pending';
    const isRej = u.status === 'rejeitado' || u.status === 'rejected';
    const isBlo = u.status === 'bloqueado' || u.status === 'blocked';

    let matchesStatus = true;
    if (statusFilter === 'approved') matchesStatus = isApp;
    if (statusFilter === 'pending') matchesStatus = isPen;
    if (statusFilter === 'rejected') matchesStatus = isRej;
    if (statusFilter === 'blocked') matchesStatus = isBlo;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'aprovado':
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} /> Aprovado
          </span>
        );
      case 'pendente':
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={12} /> Pendente
          </span>
        );
      case 'rejeitado':
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <XCircle size={12} /> Rejeitado
          </span>
        );
      case 'bloqueado':
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">
            <Ban size={12} /> Bloqueado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header — Shows ONLY ADMINISTRADOR / PAINEL ADMINISTRATIVO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={13} /> PAINEL ADMINISTRATIVO
            </span>
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">
              ADMINISTRADOR
            </span>
            {stats.pendingUsers > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1">
                <Clock size={11} /> SOLICITAÇÕES ({stats.pendingUsers})
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Gestão & Moderação de Acessos
          </h2>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors w-fit cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Atualizar Dados</span>
        </button>
      </div>

      {/* Stats Counters with Highlighted PENDENTES Card */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-[#0E111C] border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Total Geral</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <span className="text-2xl font-black text-white">{stats.totalUsers}</span>
        </div>

        {/* Card: PENDENTES (Highlighted visually if > 0) */}
        <div
          className={`p-4 rounded-2xl transition-all ${
            stats.pendingUsers > 0
              ? 'bg-amber-500/15 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10'
              : 'bg-[#0E111C] border border-white/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              {stats.pendingUsers > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              )}
              PENDENTES
            </span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-400">{stats.pendingUsers}</span>
            {stats.pendingUsers > 0 && (
              <span className="text-[10px] font-bold text-amber-300 uppercase">
                Aguardando Ação
              </span>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E111C] border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-400 font-medium">Aprovados</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400">{stats.approvedUsers}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E111C] border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-rose-400 font-medium">Rejeitados</span>
            <XCircle size={16} className="text-rose-400" />
          </div>
          <span className="text-2xl font-black text-rose-400">{stats.rejectedUsers}</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E111C] border border-white/10 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Bloqueados</span>
            <Ban size={16} className="text-slate-400" />
          </div>
          <span className="text-2xl font-black text-slate-300">{stats.blockedUsers}</span>
        </div>
      </div>

      {/* ÁREA DESTACADA: SOLICITAÇÕES PENDENTES */}
      {pendingUsersList.length > 0 && (
        <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Clock size={20} className="animate-pulse" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                    SOLICITAÇÕES PENDENTES
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-[10px] font-black uppercase">
                    SOLICITAÇÕES ({pendingUsersList.length})
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/80">
                  Usuários aguardando aprovação para liberação do construtor BioSite Pro
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingUsersList.map((pUser) => (
              <div
                key={pUser.uid}
                className="p-4 rounded-2xl bg-[#0E111C]/95 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <UserIcon size={14} className="text-amber-400 shrink-0" />
                    <span className="font-bold text-white text-xs truncate">
                      {pUser.nome || pUser.name || 'Sem nome informado'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Mail size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{pUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <Calendar size={12} className="shrink-0 text-slate-500" />
                    <span>
                      Data do Cadastro:{' '}
                      <strong className="text-slate-300">
                        {pUser.createdAt
                          ? new Date(pUser.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Recentemente'}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <button
                    disabled={isProcessing}
                    onClick={() => setConfirmAction({ type: 'approve', user: pUser })}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    [ APROVAR ]
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={() => setConfirmAction({ type: 'reject', user: pUser })}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 font-bold text-xs border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    [ RECUSAR ]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail do cliente…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0E111C] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Todos ({users.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'pending'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Pendentes ({stats.pendingUsers})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'approved'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Aprovados ({stats.approvedUsers})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'rejected'
                ? 'bg-rose-600 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Rejeitados ({stats.rejectedUsers})
          </button>
          <button
            onClick={() => setStatusFilter('blocked')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              statusFilter === 'blocked'
                ? 'bg-slate-700 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Bloqueados ({stats.blockedUsers})
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0E111C] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-purple-400" />
            <span>Consultando base de usuários no Firestore…</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            Nenhum usuário localizado com os filtros aplicados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-white/[0.02] border-b border-white/5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">E-mail Cadastrado</th>
                  <th className="py-3 px-4">Papel</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Cadastro</th>
                  <th className="py-3 px-4">Aprovação</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((u) => {
                  const displayName = u.nome || u.name || 'Sem nome';
                  const isUserApproved = u.status === 'aprovado' || u.status === 'approved';
                  const isUserPending = u.status === 'pendente' || u.status === 'pending';
                  const isUserRejected = u.status === 'rejeitado' || u.status === 'rejected';
                  const isUserBlocked = u.status === 'bloqueado' || u.status === 'blocked';
                  const isUserAdmin = u.role === 'admin';

                  return (
                    <tr key={u.uid} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                          <span>{displayName}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                        {u.email}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        {isUserAdmin ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[10px] border border-purple-500/30 uppercase">
                            Admin
                          </span>
                        ) : (
                          <span className="text-slate-400 capitalize">Cliente</span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(u.status)}
                      </td>

                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('pt-BR') : '—'}
                      </td>

                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {u.approvedAt ? new Date(u.approvedAt).toLocaleDateString('pt-BR') : '—'}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        {isUserAdmin ? (
                          <span className="text-[11px] text-slate-500 font-medium">Conta Master</span>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            {!isUserApproved && (
                              <button
                                onClick={() => setConfirmAction({ type: 'approve', user: u })}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20 transition-colors cursor-pointer"
                              >
                                Aprovar
                              </button>
                            )}

                            {!isUserRejected && !isUserApproved && (
                              <button
                                onClick={() => setConfirmAction({ type: 'reject', user: u })}
                                className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 transition-colors cursor-pointer"
                              >
                                Recusar
                              </button>
                            )}

                            {!isUserBlocked ? (
                              <button
                                onClick={() => setConfirmAction({ type: 'block', user: u })}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                              >
                                Bloquear
                              </button>
                            ) : (
                              <button
                                onClick={() => setConfirmAction({ type: 'unblock', user: u })}
                                className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/20 transition-colors cursor-pointer"
                              >
                                Desbloquear
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMAÇÃO OBRIGATÓRIO (APROVAR / RECUSAR / BLOQUEAR) */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E111C] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            {confirmAction.type === 'approve' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">APROVAR ACESSO?</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Este usuário passará a ter acesso ao BioSite Pro 2.0.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1 font-mono">
                  <p className="text-slate-400">
                    Nome: <span className="text-white font-bold">{confirmAction.user.nome || confirmAction.user.name}</span>
                  </p>
                  <p className="text-slate-400">
                    E-mail: <span className="text-emerald-300 font-bold">{confirmAction.user.email}</span>
                  </p>
                  <p className="text-slate-400">
                    Papel: <span className="text-purple-300">Cliente (user)</span>
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setConfirmAction(null)}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    {isProcessing ? 'Gravando…' : 'APROVAR'}
                  </button>
                </div>
              </>
            )}

            {confirmAction.type === 'reject' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <XCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">RECUSAR ACESSO?</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    O acesso deste usuário será recusado e ele verá a tela de cadastro não aprovado. O registro será mantido no sistema para o administrador.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1 font-mono">
                  <p className="text-slate-400">
                    Nome: <span className="text-white font-bold">{confirmAction.user.nome || confirmAction.user.name}</span>
                  </p>
                  <p className="text-slate-400">
                    E-mail: <span className="text-rose-300 font-bold">{confirmAction.user.email}</span>
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setConfirmAction(null)}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                  >
                    {isProcessing ? 'Gravando…' : 'RECUSAR'}
                  </button>
                </div>
              </>
            )}

            {confirmAction.type === 'block' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-300 border border-white/10 flex items-center justify-center">
                  <Ban size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">BLOQUEAR CONTA?</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    O acesso aos projetos e ao construtor será temporariamente suspenso para este usuário.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1 font-mono">
                  <p className="text-slate-400">
                    Nome: <span className="text-white font-bold">{confirmAction.user.nome || confirmAction.user.name}</span>
                  </p>
                  <p className="text-slate-400">
                    E-mail: <span className="text-slate-200 font-bold">{confirmAction.user.email}</span>
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setConfirmAction(null)}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    {isProcessing ? 'Gravando…' : 'BLOQUEAR'}
                  </button>
                </div>
              </>
            )}

            {confirmAction.type === 'unblock' && (
              <>
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">DESBLOQUEAR ACESSO?</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    O status do usuário retornará para Aprovado e ele poderá utilizar a plataforma normalmente.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs space-y-1 font-mono">
                  <p className="text-slate-400">
                    Nome: <span className="text-white font-bold">{confirmAction.user.nome || confirmAction.user.name}</span>
                  </p>
                  <p className="text-slate-400">
                    E-mail: <span className="text-purple-300 font-bold">{confirmAction.user.email}</span>
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setConfirmAction(null)}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    CANCELAR
                  </button>
                  <button
                    onClick={handleConfirmAction}
                    disabled={isProcessing}
                    className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    {isProcessing ? 'Gravando…' : 'DESBLOQUEAR'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
