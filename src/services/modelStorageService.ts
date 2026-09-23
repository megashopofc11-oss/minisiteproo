import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage';
import { app } from '../firebase/config';

// Initialize Firebase Storage safely
let storageInstance: ReturnType<typeof getStorage> | null = null;
try {
  storageInstance = getStorage(app);
} catch (err) {
  console.warn('Firebase Storage initialization notice:', err);
}

// Simple IndexedDB store for zero-breakage offline/local fallback
const DB_NAME = 'biofacil_model_store';
const STORE_NAME = 'template_zips';

function openIndexedDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB não suportado no ambiente.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveZipToIndexedDb(templateId: string, zipBlob: Blob): Promise<void> {
  try {
    const db = await openIndexedDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(zipBlob, templateId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Falha ao salvar no IndexedDB fallback:', err);
  }
}

export async function getZipFromIndexedDb(templateId: string): Promise<Blob | null> {
  try {
    const db = await openIndexedDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(templateId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Falha ao obter do IndexedDB fallback:', err);
    return null;
  }
}

export interface StorageStatus {
  configured: boolean;
  message: string;
}

/**
 * Checks if Firebase Storage is active and accessible
 */
export async function checkStorageStatus(): Promise<StorageStatus> {
  if (!storageInstance) {
    return {
      configured: false,
      message: 'Armazenamento de modelos ainda não configurado no Firebase Storage.'
    };
  }
  return {
    configured: true,
    message: 'Firebase Storage ativo.'
  };
}

/**
 * Uploads a template source ZIP file.
 * Tries Firebase Storage first; automatically saves to IndexedDB as fallback/local cache.
 */
export async function uploadTemplateZip(
  templateId: string,
  zipBlob: Blob
): Promise<{ url?: string; storageType: 'cloud' | 'local'; error?: string }> {
  // Always save in IndexedDB local cache first
  await saveZipToIndexedDb(templateId, zipBlob);

  if (!storageInstance) {
    return {
      storageType: 'local',
      error: 'Armazenamento de modelos ainda não configurado no Firebase Storage. O arquivo foi preservado localmente.'
    };
  }

  try {
    const storageRef = ref(storageInstance, `templates/${templateId}/source.zip`);
    const snapshot = await uploadBytes(storageRef, zipBlob, {
      contentType: 'application/zip',
      customMetadata: {
        templateId,
        uploadedAt: new Date().toISOString()
      }
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);
    return {
      url: downloadUrl,
      storageType: 'cloud'
    };
  } catch (err: any) {
    console.warn('Firebase Storage upload failed, using local store:', err);
    return {
      storageType: 'local',
      error: `Armazenamento de modelos ainda não configurado (${err.message || 'Storage inacessível'}). Arquivo preservado no cache local.`
    };
  }
}

/**
 * Uploads template thumbnail image
 */
export async function uploadThumbnailImage(
  templateId: string,
  imageFile: File | Blob
): Promise<{ url?: string; error?: string }> {
  if (!storageInstance) {
    // Generate inline data URL if storage is not available
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: reader.result as string });
      reader.onerror = () => resolve({ error: 'Erro ao converter imagem de capa.' });
      reader.readAsDataURL(imageFile);
    });
  }

  try {
    const ext = imageFile.type.split('/')[1] || 'png';
    const storageRef = ref(storageInstance, `templates/${templateId}/thumbnail.${ext}`);
    const snapshot = await uploadBytes(storageRef, imageFile, {
      contentType: imageFile.type || 'image/png'
    });
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return { url: downloadUrl };
  } catch (err: any) {
    console.warn('Storage thumbnail upload failed, falling back to data URL:', err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ url: reader.result as string });
      reader.onerror = () => resolve({ error: 'Armazenamento ainda não configurado.' });
      reader.readAsDataURL(imageFile);
    });
  }
}

/**
 * Retrieves the template ZIP binary (tries local cache first, then cloud storage URL)
 */
export async function retrieveTemplateZip(
  templateId: string,
  cloudUrl?: string
): Promise<Blob | null> {
  // 1. Try local IndexedDB
  const localBlob = await getZipFromIndexedDb(templateId);
  if (localBlob) {
    return localBlob;
  }

  // 2. Try Firebase Storage by reference if storageInstance exists
  if (storageInstance) {
    try {
      const storageRef = ref(storageInstance, `templates/${templateId}/source.zip`);
      const buffer = await getBytes(storageRef);
      const blob = new Blob([buffer], { type: 'application/zip' });
      await saveZipToIndexedDb(templateId, blob);
      return blob;
    } catch {
      // Ignore and try fetch
    }
  }

  // 3. Try fetch from cloudUrl
  if (cloudUrl && cloudUrl.startsWith('http')) {
    try {
      const res = await fetch(cloudUrl);
      if (res.ok) {
        const blob = await res.blob();
        await saveZipToIndexedDb(templateId, blob);
        return blob;
      }
    } catch (err) {
      console.warn('Failed to fetch zip from cloudUrl:', err);
    }
  }

  return null;
}
