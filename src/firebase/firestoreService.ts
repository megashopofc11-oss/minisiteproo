import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { UserProfile, UserStatus, ProjectData } from '../types';

// Admin: Fetch all users
export const fetchAllUsers = async (): Promise<UserProfile[]> => {
  const path = 'users';
  try {
    const usersRef = collection(db, path);
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const users: UserProfile[] = [];
    snapshot.forEach((d) => {
      users.push(d.data() as UserProfile);
    });
    return users;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

// Admin: Update user status
export const updateUserStatus = async (
  targetUid: string,
  newStatus: UserStatus,
  adminUid: string = ''
): Promise<void> => {
  const path = `users/${targetUid}`;
  try {
    const userRef = doc(db, 'users', targetUid);
    const canonicalStatus: UserStatus =
      newStatus === 'aprovado' || newStatus === 'approved'
        ? 'approved'
        : newStatus === 'rejeitado' || newStatus === 'rejected'
        ? 'rejected'
        : newStatus === 'bloqueado' || newStatus === 'blocked'
        ? 'blocked'
        : 'pending';

    const updates: Record<string, unknown> = {
      status: canonicalStatus,
      updatedAt: Date.now(),
      serverUpdatedAt: serverTimestamp()
    };

    if (canonicalStatus === 'approved') {
      updates.approvedAt = Date.now();
      updates.serverApprovedAt = serverTimestamp();
      updates.approvedBy = adminUid || 'admin';
    } else if (canonicalStatus === 'rejected') {
      updates.rejectedAt = Date.now();
      updates.serverRejectedAt = serverTimestamp();
    } else if (canonicalStatus === 'blocked') {
      updates.blockedAt = Date.now();
      updates.serverBlockedAt = serverTimestamp();
    }

    await updateDoc(userRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

// Projects: Save project
export const saveProject = async (project: ProjectData): Promise<void> => {
  const path = `users/${project.userId}/projects/${project.projectId}`;
  try {
    const projectRef = doc(db, 'users', project.userId, 'projects', project.projectId);
    const dataToSave = {
      ...project,
      updatedAt: Date.now()
    };
    await setDoc(projectRef, dataToSave, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

// Projects: Fetch user projects
export const fetchUserProjects = async (userId: string): Promise<ProjectData[]> => {
  const path = `users/${userId}/projects`;
  try {
    const projectsRef = collection(db, 'users', userId, 'projects');
    const q = query(projectsRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    const projects: ProjectData[] = [];
    snapshot.forEach((d) => {
      projects.push(d.data() as ProjectData);
    });
    return projects;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

// Projects: Fetch single project
export const fetchProjectById = async (userId: string, projectId: string): Promise<ProjectData | null> => {
  const path = `users/${userId}/projects/${projectId}`;
  try {
    const projectRef = doc(db, 'users', userId, 'projects', projectId);
    const snapshot = await getDoc(projectRef);
    if (!snapshot.exists()) return null;
    return snapshot.data() as ProjectData;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

// Projects: Delete project
export const deleteProject = async (userId: string, projectId: string): Promise<void> => {
  const path = `users/${userId}/projects/${projectId}`;
  try {
    const projectRef = doc(db, 'users', userId, 'projects', projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// Projects: Duplicate project
export const duplicateProject = async (userId: string, sourceProject: ProjectData): Promise<ProjectData> => {
  const newProjectId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const duplicated: ProjectData = {
    ...sourceProject,
    projectId: newProjectId,
    nome: `${sourceProject.nome} (Cópia)`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await saveProject(duplicated);
  return duplicated;
};

// Fetch stats for admin panel
export const fetchPlatformStats = async () => {
  const users = await fetchAllUsers();
  return {
    totalUsers: users.length,
    pendingUsers: users.filter((u) => u.status === 'pendente' || u.status === 'pending').length,
    approvedUsers: users.filter((u) => u.status === 'aprovado' || u.status === 'approved').length,
    rejectedUsers: users.filter((u) => u.status === 'rejeitado' || u.status === 'rejected').length,
    blockedUsers: users.filter((u) => u.status === 'bloqueado' || u.status === 'blocked').length
  };
};

import { BioFacilTemplate, TemplateStatus, BioFacilUserProject } from '../types/biofacil';
import { where } from 'firebase/firestore';

// Admin: Fetch all templates or filter by status
export const fetchAllTemplates = async (statusFilter?: TemplateStatus): Promise<BioFacilTemplate[]> => {
  const path = 'templates';
  try {
    const templatesRef = collection(db, path);
    const q = statusFilter
      ? query(templatesRef, where('status', '==', statusFilter), orderBy('updatedAt', 'desc'))
      : query(templatesRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    const templates: BioFacilTemplate[] = [];
    snapshot.forEach((d) => {
      templates.push(d.data() as BioFacilTemplate);
    });
    return templates;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

// Users: Fetch only published templates
export const fetchPublishedTemplates = async (): Promise<BioFacilTemplate[]> => {
  const path = 'templates';
  try {
    const templatesRef = collection(db, path);
    const q = query(templatesRef, where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    const templates: BioFacilTemplate[] = [];
    snapshot.forEach((d) => {
      templates.push(d.data() as BioFacilTemplate);
    });
    // Sort in memory by updatedAt descending
    return templates.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};

// Fetch single template by ID
export const fetchTemplateById = async (templateId: string): Promise<BioFacilTemplate | null> => {
  const path = `templates/${templateId}`;
  try {
    const templateRef = doc(db, 'templates', templateId);
    const snapshot = await getDoc(templateRef);
    if (!snapshot.exists()) return null;
    return snapshot.data() as BioFacilTemplate;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
};

// Admin: Save or update template
export const saveTemplate = async (template: BioFacilTemplate): Promise<void> => {
  const path = `templates/${template.templateId}`;
  try {
    const templateRef = doc(db, 'templates', template.templateId);
    const dataToSave: BioFacilTemplate = {
      ...template,
      updatedAt: Date.now()
    };
    await setDoc(templateRef, dataToSave, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

// Admin: Update template status
export const updateTemplateStatus = async (
  templateId: string,
  newStatus: TemplateStatus
): Promise<void> => {
  const path = `templates/${templateId}`;
  try {
    const templateRef = doc(db, 'templates', templateId);
    await updateDoc(templateRef, {
      status: newStatus,
      updatedAt: Date.now()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

// Check if any user project uses this templateId (prevents broken references)
export const checkTemplateUsageCount = async (templateId: string): Promise<number> => {
  try {
    // Check all users
    const users = await fetchAllUsers();
    let count = 0;
    for (const u of users) {
      const projects = await fetchUserProjects(u.uid);
      count += projects.filter((p) => p.templateId === templateId).length;
    }
    return count;
  } catch (err) {
    console.warn('Error checking template usage count:', err);
    return 0;
  }
};

// Admin: Delete template
export const deleteTemplate = async (templateId: string): Promise<void> => {
  const path = `templates/${templateId}`;
  try {
    const templateRef = doc(db, 'templates', templateId);
    await deleteDoc(templateRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// Save a BioFacil user project
export const saveBioFacilUserProject = async (userProject: BioFacilUserProject): Promise<void> => {
  const path = `users/${userProject.userId}/projects/${userProject.projectId}`;
  try {
    const projectRef = doc(db, 'users', userProject.userId, 'projects', userProject.projectId);
    const dataToSave = {
      ...userProject,
      nome: userProject.projectName,
      updatedAt: Date.now()
    };
    await setDoc(projectRef, dataToSave, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};
