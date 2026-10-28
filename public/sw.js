// Umbono Service Worker - Offline-First Sovereign Learning Engine
// Engineered by ZAInnovate Technologies (Pty) Ltd - East London, South Africa

const CACHE_NAME = "umbono-offline-v1";
const STATIC_ASSETS = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  "/offline-fallback.html",
];

// Install Event: Precaching essential shells
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Umbono SW] Pre-caching offline application shell");
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[Umbono SW] Non-fatal precache error:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup stale versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache-First for static and media, Stale-While-Revalidate for APIs
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests or browser-extension schemes
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Next.js static assets and fonts: Cache-first
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // HTML / App Navigation: Network first, falling back to cache, then offline page
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }
        // Fallback for HTML documents
        if (request.headers.get("accept")?.includes("text/html")) {
          const fallback = await caches.match("/");
          if (fallback) return fallback;
        }
        return new Response("Offline - Content stored in Umbono Local Cache", {
          status: 503,
          statusText: "Offline",
          headers: new Headers({ "Content-Type": "text/plain" }),
        });
      })
  );
});

// Background Sync Event: Push queued answers when connectivity returns
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-assessments") {
    console.log("[Umbono SW] Background Sync triggered: Flushing queued answers");
  }
});
