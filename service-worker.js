const CACHE_NAME = "etihad-daily-v9.5.6";

const FILES_TO_CACHE = [
  "index.html",
  "login.html",

  "css/style.css",

  "js/dashboard.js",
  "js/jsinit.js",
  "js/jssplash.js",
  "js/jsupdate.js",
  "js/pwa.js",

  "manifest.json",

  "favicon.png",

  "icons/icon-192.png",
  "icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)

      .then((cache) => cache.addAll(FILES_TO_CACHE)),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys

          .filter((key) => key !== CACHE_NAME)

          .map((key) => caches.delete(key)),
      ),
    ),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // لا نخزن version.json حتى يقرأ أحدث إصدار دائماً
  if (event.request.url.includes("version.json")) {
    event.respondWith(
      fetch(event.request, {
        cache: "no-store",
      }),
    );

    return;
  }

  event.respondWith(
    caches
      .match(event.request)

      .then((response) => {
        return response || fetch(event.request);
      }),
  );
});
