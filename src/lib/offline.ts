"use client";

import { openDB, DBSchema, IDBPDatabase } from "idb";

export interface CachedLesson {
  id: string;
  courseCode: string;
  title: string;
  summary: string;
  content: string;
  language: string;
  cachedAt: number;
  sizeBytes: number;
}

export interface OfflineSubmission {
  id: string;
  lessonId: string;
  studentId: string;
  answerText: string;
  timestamp: number;
  synced: boolean;
}

interface UmbonoDBSchema extends DBSchema {
  lessons: {
    key: string;
    value: CachedLesson;
    indexes: { "by-course": string };
  };
  syncQueue: {
    key: string;
    value: OfflineSubmission;
    indexes: { "by-synced": number };
  };
  metadata: {
    key: string;
    value: { key: string; val: any };
  };
}

const DB_NAME = "umbono_offline_store";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<UmbonoDBSchema>> | null = null;

function getDb(): Promise<IDBPDatabase<UmbonoDBSchema>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("IndexedDB is only accessible in the browser."));
  }

  if (!dbPromise) {
    dbPromise = openDB<UmbonoDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("lessons")) {
          const lessonStore = db.createObjectStore("lessons", { keyPath: "id" });
          lessonStore.createIndex("by-course", "courseCode");
        }
        if (!db.objectStoreNames.contains("syncQueue")) {
          const syncStore = db.createObjectStore("syncQueue", { keyPath: "id" });
          syncStore.createIndex("by-synced", "synced");
        }
        if (!db.objectStoreNames.contains("metadata")) {
          db.createObjectStore("metadata", { keyPath: "key" });
        }
      },
    });
  }
  return dbPromise;
}

/**
 * Cache a lesson bundle locally for full offline access without cellular data
 */
export async function cacheLessonLocally(lesson: CachedLesson): Promise<void> {
  const db = await getDb();
  await db.put("lessons", lesson);
}

/**
 * Retrieve cached lesson from IndexedDB
 */
export async function getCachedLesson(id: string): Promise<CachedLesson | undefined> {
  const db = await getDb();
  return db.get("lessons", id);
}

/**
 * List all lessons available completely offline on this device
 */
export async function getAllCachedLessons(): Promise<CachedLesson[]> {
  const db = await getDb();
  return db.getAll("lessons");
}

/**
 * Queue a student assessment response while offline
 */
export async function queueOfflineAssessment(
  submission: Omit<OfflineSubmission, "id" | "timestamp" | "synced">
): Promise<string> {
  const db = await getDb();
  const id = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const fullRecord: OfflineSubmission = {
    ...submission,
    id,
    timestamp: Date.now(),
    synced: false,
  };
  await db.put("syncQueue", fullRecord);
  return id;
}

/**
 * Synchronize all pending offline submissions once connectivity returns
 */
export async function flushSyncQueue(): Promise<{ syncedCount: number; errors: number }> {
  if (typeof window === "undefined" || !navigator.onLine) {
    return { syncedCount: 0, errors: 0 };
  }

  const db = await getDb();
  const pending = await db.getAll("syncQueue");
  const unsynced = pending.filter((item) => !item.synced);

  let syncedCount = 0;
  let errors = 0;

  for (const item of unsynced) {
    try {
      // In production, POST to /api/sync/assessment
      // Simulated upload latency
      await new Promise((r) => setTimeout(r, 120));
      item.synced = true;
      await db.put("syncQueue", item);
      syncedCount++;
    } catch {
      errors++;
    }
  }

  return { syncedCount, errors };
}

/**
 * Register Service Worker for offline education caching
 */
export function registerServiceWorker(): void {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[Umbono SW] Registered successfully with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("[Umbono SW] Registration failed:", err);
        });
    });
  }
}
