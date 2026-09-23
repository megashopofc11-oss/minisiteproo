import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  User
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from './config';
import { UserProfile, UserRole, UserStatus } from '../types';

export interface AuthErrorDetails {
  code: string;
  message: string;
  userFriendlyMessage: string;
  technicalDetails?: string;
}

/**
 * Format Firebase Auth and Firestore errors into friendly and actionable Portuguese messages
 * Never exposes admin credentials or tokens
 */
export const parseAuthError = (err: unknown): AuthErrorDetails => {
  const errObj = (err || {}) as { code?: string; message?: string; name?: string };
  const code = errObj.code || 'unknown-error';
  const rawMessage = errObj.message || String(err);

  // Development logging: Never log passwords or tokens
  console.error('[BioSite Auth Error]:', code, rawMessage, err);

  let userFriendlyMessage = 'Ocorreu um erro ao processar sua solicitação.';
  let technicalDetails: string | undefined = undefined;

  switch (code) {
    case 'auth/operation-not-allowed':
      userFriendlyMessage =
        'O provedor de E-mail e Senha está desativado no Firebase Authentication deste projeto.';
      technicalDetails =
        'Acesse o Firebase Console -> Authentication -> Sign-in method -> Habilite o provedor "E-mail/senha".';
      break;

    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      userFriendlyMessage =
        'E-mail ou senha incorretos. Verifique suas credenciais ou crie uma conta.';
      technicalDetails =
        'Verifique se o e-mail e a senha digitados estão corretos.';
      break;

    case 'auth/email-already-in-use':
      userFriendlyMessage =
        'Este endereço de e-mail já está cadastrado na plataforma.';
      technicalDetails = 'Tente fazer login ou utilize a opção "Esqueci minha senha".';
      break;

    case 'auth/invalid-email':
      userFriendlyMessage = 'O endereço de e-mail informado possui formato inválido.';
      break;

    case 'auth/weak-password':
      userFriendlyMessage = 'A senha informada é fraca. A senha deve possuir no mínimo 6 caracteres.';
      break;

    case 'auth/user-disabled':
      userFriendlyMessage =
        'Esta conta foi desativada pelo administrador do sistema.';
      break;

    case 'auth/too-many-requests':
      userFriendlyMessage =
        'Muitas tentativas malsucedidas consecutivas. O acesso foi bloqueado temporariamente por segurança. Tente novamente mais tarde ou redefina sua senha.';
      break;

    case 'auth/network-request-failed':
      userFriendlyMessage =
        'Falha de comunicação com os servidores do Firebase. Verifique sua conexão com a internet.';
      break;

    case 'permission-denied':
      userFriendlyMessage =
        'Acesso negado pelas regras de segurança do banco de dados (Firestore).';
      technicalDetails =
        'A autenticação teve sucesso, mas as regras de segurança rejeitaram a operação.';
      break;

    default:
      if (rawMessage.toLowerCase().includes('firestore')) {
        userFriendlyMessage = 'Erro na sincronização de dados com o Firestore.';
        technicalDetails = rawMessage;
      } else {
        userFriendlyMessage = rawMessage || 'Erro desconhecido na autenticação.';
      }
      break;
  }

  return {
    code,
    message: rawMessage,
    userFriendlyMessage,
    technicalDetails
  };
};

/**
 * Register a new user with real Firebase Auth and create Firestore profile in users/{uid}
 * Enforces strictly: role = "user" and status = "pending"
 * Admin registration through the website is strictly forbidden.
 */
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserProfile> => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  // 1. Create Firebase Auth user
  let userCredential;
  try {
    userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
  } catch (err) {
    const parsed = parseAuthError(err);
    throw new Error(parsed.userFriendlyMessage);
  }

  const user = userCredential.user;

  // 2. Set Auth display name
  try {
    await updateProfile(user, { displayName: cleanName });
  } catch (updateErr) {
    console.warn('Non-fatal: could not update Auth profile displayName:', updateErr);
  }

  // 3. New user registration receives strictly role: 'user' and status: 'pending'
  const role: UserRole = 'user';
  const status: UserStatus = 'pending';

  const userDocRef = doc(db, 'users', user.uid);
  const now = Date.now();

  const profileData: Record<string, unknown> = {
    uid: user.uid,
    email: cleanEmail,
    name: cleanName,
    nome: cleanName,
    role,
    status,
    createdAt: now,
    updatedAt: now,
    serverCreatedAt: serverTimestamp()
  };

  // 4. Save profile to Firestore
  try {
    await setDoc(userDocRef, profileData);
  } catch (firestoreErr) {
    console.error(
      'CRITICAL: User created in Firebase Auth but Firestore profile creation failed:',
      firestoreErr
    );
    const parsed = parseAuthError(firestoreErr);
    throw new Error(
      `Sua conta foi criada no Firebase Auth, porém ocorreu uma falha ao registrar o perfil no Firestore (${parsed.code}). Tente fazer login para reconciliar o acesso.`
    );
  }

  return {
    uid: user.uid,
    email: cleanEmail,
    name: cleanName,
    nome: cleanName,
    role,
    status,
    createdAt: now
  };
};

/**
 * Login with real Firebase Auth and load user profile from users/{uid}.
 * Authorization is derived from verified Firestore profile or token claims.
 */
export const loginUser = async (
  email: string,
  password: string,
  rememberMe = true
): Promise<{ user: User; profile: UserProfile }> => {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Configure persistence
  try {
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );
  } catch (persistErr) {
    console.warn('Could not set Auth persistence:', persistErr);
  }

  // 2. Sign in with Firebase Auth
  let userCredential;
  try {
    userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
  } catch (err) {
    const parsed = parseAuthError(err);
    throw new Error(parsed.userFriendlyMessage);
  }

  const user = userCredential.user;

  // 3. Fetch profile from Firestore users/{uid}
  let profile = await fetchUserProfile(user.uid);

  // 4. Handle missing profile reconciliation if user exists in Auth but not Firestore
  if (!profile) {
    console.warn(
      `Profile not found in Firestore for UID ${user.uid}. Starting automatic reconciliation...`
    );

    // Check token custom claims for admin privileges
    let isClaimAdmin = false;
    try {
      const idTokenResult = await user.getIdTokenResult();
      isClaimAdmin = Boolean(idTokenResult.claims.admin || idTokenResult.claims.role === 'admin');
    } catch {
      // ignore
    }

    const role: UserRole = isClaimAdmin ? 'admin' : 'user';
    const status: UserStatus = isClaimAdmin ? 'approved' : 'pending';
    const displayName = user.displayName || cleanEmail.split('@')[0] || 'Usuário';

    const now = Date.now();
    const newProfile: UserProfile = {
      uid: user.uid,
      email: user.email || cleanEmail,
      name: displayName,
      nome: displayName,
      role,
      status,
      createdAt: now,
      updatedAt: now,
      approvedAt: isClaimAdmin ? now : undefined,
      approvedBy: isClaimAdmin ? 'system_claim' : undefined
    };

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...newProfile,
        serverCreatedAt: serverTimestamp()
      });
      profile = newProfile;
    } catch (createProfileErr) {
      console.error('Error creating reconciled profile in Firestore:', createProfileErr);
      const parsed = parseAuthError(createProfileErr);

      if (parsed.code === 'permission-denied') {
        throw new Error(
          'Autenticação realizada, mas as regras de segurança do Firestore rejeitaram a criação do seu perfil.'
        );
      }
      throw new Error(`Erro ao vincular perfil no Firestore: ${parsed.userFriendlyMessage}`);
    }
  }

  return { user, profile };
};

/**
 * Fetch profile directly from Firestore users/{uid}
 */
export const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data();
    return {
      uid,
      email: data.email || '',
      name: data.name || data.nome || 'Usuário',
      nome: data.nome || data.name || 'Usuário',
      role: data.role || 'user',
      status: data.status || 'pending',
      createdAt: data.createdAt || Date.now(),
      updatedAt: data.updatedAt,
      approvedAt: data.approvedAt,
      approvedBy: data.approvedBy,
      rejectedAt: data.rejectedAt,
      blockedAt: data.blockedAt
    } as UserProfile;
  } catch (err) {
    console.error('Error fetching user profile from Firestore:', err);
    return null;
  }
};

/**
 * Send password reset email via official Firebase Auth
 */
export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
  } catch (err) {
    const parsed = parseAuthError(err);
    throw new Error(parsed.userFriendlyMessage);
  }
};

/**
 * Logout
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Error during logout:', err);
  }
};

/**
 * Listen to Firebase Auth state changes and automatically fetch/sync profile
 */
export const subscribeToAuth = (
  callback: (user: User | null, profile: UserProfile | null) => void
) => {
  return onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const profile = await fetchUserProfile(currentUser.uid);
        callback(currentUser, profile);
      } catch (err) {
        console.error('Error syncing profile on auth change:', err);
        callback(currentUser, null);
      }
    } else {
      callback(null, null);
    }
  });
};
