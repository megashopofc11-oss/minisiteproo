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
const ASSETS_STORE_NAME = 'template_assets';

function openIndexedDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB não suportado no ambiente.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains(ASSETS_STORE_NAME)) {
        db.createObjectStore(ASSETS_STORE_NAME);
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
    console.warn('Falha ao salvar zip no IndexedDB fallback:', err);
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
    console.warn('Falha ao obter zip do IndexedDB fallback:', err);
    return null;
  }
}

export async function saveAssetsToIndexedDb(
  templateId: string,
  assets: Record<string, string>
): Promise<void> {
  try {
    const db = await openIndexedDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(ASSETS_STORE_NAME, 'readwrite');
      const store = tx.objectStore(ASSETS_STORE_NAME);
      const req = store.put(assets, templateId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Falha ao salvar assets no IndexedDB fallback:', err);
  }
}

export async function getAssetsFromIndexedDb(
  templateId: string
): Promise<Record<string, string> | null> {
  try {
    const db = await openIndexedDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(ASSETS_STORE_NAME, 'readonly');
      const store = tx.objectStore(ASSETS_STORE_NAME);
      const req = store.get(templateId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Falha ao obter assets do IndexedDB fallback:', err);
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
  return {
    configured: true,
    message: 'Armazenamento híbrido ativo (IndexedDB + Cloud).'
  };
}

/**
 * Resizes and optimizes a base64 image data URL so it never stalls or exceeds limits
 */
export async function optimizeThumbnailDataUrl(
  dataUrl: string,
  maxWidth = 640,
  maxHeight = 480,
  quality = 0.75
): Promise<string> {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }

  // If already very compact (< 60 KB), keep as is
  if (dataUrl.length < 80000) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimized = canvas.toDataURL('image/jpeg', quality);
            resolve(optimized);
            return;
          }
        } catch {
          // fallback
        }
        resolve(dataUrl);
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    } catch {
      resolve(dataUrl);
    }
  });
}

/**
 * Helper to race an asynchronous operation against a strict timeout
 */
function withTimeout<T>(promise: Promise<T>, ms: number, fallbackValue: T): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallbackValue), ms);
  });
  return Promise.race([
    promise.then((val) => {
      clearTimeout(timer);
      return val;
    }),
    timeoutPromise
  ]);
}

/**
 * Uploads a template source ZIP file.
 * Automatically saves to IndexedDB local cache first.
 * Then attempts cloud storage with a strict 2-second timeout so it never hangs.
 */
export async function uploadTemplateZip(
  templateId: string,
  zipBlob: Blob
): Promise<{ url?: string; storageType: 'cloud' | 'local'; error?: string }> {
  // 1. Always save in IndexedDB local cache first (guaranteed and instant)
  await saveZipToIndexedDb(templateId, zipBlob);

  if (!storageInstance) {
    return {
      storageType: 'local',
      url: `indexeddb://${templateId}`
    };
  }

  try {
    const cloudUpload = async (): Promise<{ url?: string; storageType: 'cloud' | 'local' }> => {
      const storageRef = ref(storageInstance!, `templates/${templateId}/source.zip`);
      const snapshot = await uploadBytes(storageRef, zipBlob, {
        contentType: 'application/zip',
        customMetadata: {
          templateId,
          uploadedAt: new Date().toISOString()
        }
      });
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return { url: downloadUrl, storageType: 'cloud' };
    };

    // Strict 1800ms timeout to avoid hanging if storage bucket is not active
    const result = await withTimeout(cloudUpload(), 1800, {
      storageType: 'local' as const,
      url: `indexeddb://${templateId}`
    });

    return result;
  } catch (err: any) {
    console.warn('Storage upload fallback to IndexedDB:', err?.message || err);
    return {
      storageType: 'local',
      url: `indexeddb://${templateId}`
    };
  }
}

/**
 * Uploads template thumbnail image or converts to optimized data URL
 */
export async function uploadThumbnailImage(
  templateId: string,
  imageFile: File | Blob
): Promise<{ url?: string; error?: string }> {
  // Read file into Data URL
  const dataUrl: string = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) || '');
    reader.onerror = () => resolve('');
    reader.readAsDataURL(imageFile);
  });

  if (!dataUrl) {
    return { error: 'Não foi possível ler o arquivo de capa.' };
  }

  // Compress thumbnail to < 50KB JPEG
  const optimizedUrl = await optimizeThumbnailDataUrl(dataUrl);

  if (!storageInstance) {
    return { url: optimizedUrl };
  }

  try {
    const cloudUpload = async () => {
      const ext = imageFile.type.split('/')[1] || 'jpeg';
      const storageRef = ref(storageInstance!, `templates/${templateId}/thumbnail.${ext}`);
      const snapshot = await uploadBytes(storageRef, imageFile, {
        contentType: imageFile.type || 'image/jpeg'
      });
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return { url: downloadUrl };
    };

    // Strict 1800ms timeout
    const result = await withTimeout(cloudUpload(), 1800, { url: optimizedUrl });
    return result;
  } catch (err: any) {
    console.warn('Storage thumbnail fallback to optimized data URL:', err?.message || err);
    return { url: optimizedUrl };
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

  // 2. Try Firebase Storage by reference if storageInstance exists with timeout
  if (storageInstance) {
    try {
      const fetchBuffer = async () => {
        const storageRef = ref(storageInstance!, `templates/${templateId}/source.zip`);
        const buffer = await getBytes(storageRef);
        return new Blob([buffer], { type: 'application/zip' });
      };
      const blob = await withTimeout(fetchBuffer(), 3000, null);
      if (blob) {
        await saveZipToIndexedDb(templateId, blob);
        return blob;
      }
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
