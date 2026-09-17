// IndexedDB storage utility for large local media files (images & videos)

const DB_NAME = 'deborah_portfolio_media_db';
const STORE_NAME = 'media_files';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
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

export async function saveMediaFile(key: string, file: Blob | File): Promise<string> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putReq = store.put(file, key);
    putReq.onsuccess = () => {
      resolve(`idb://${key}`);
    };
    putReq.onerror = () => reject(putReq.error);
  });
}

export async function getMediaFile(key: string): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(key);
    getReq.onsuccess = () => {
      resolve(getReq.result || null);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

export async function deleteMediaFile(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const delReq = store.delete(key);
    delReq.onsuccess = () => resolve();
    delReq.onerror = () => reject(delReq.error);
  });
}

// Convert an idb:// URL or normal URL into a playable/viewable object URL if needed
export function isIdbUrl(url?: string): boolean {
  return typeof url === 'string' && url.startsWith('idb://');
}

export function extractIdbKey(url: string): string {
  return url.replace('idb://', '');
}
