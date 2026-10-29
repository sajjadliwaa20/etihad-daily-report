const CACHE_NAME = "etihad-daily-v9.7.4";

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

self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      title: "التقرير اليومي للمصانع",
      body: event.data ? event.data.text() : "يوجد تحديث جديد",
    };
  }

  const title = data.title || "التقرير اليومي للمصانع";

  const options = {
    body: data.body || "تمت الموافقة على أحد الأقسام أو الحسابات الفرعية.",
    icon: "/etihad-daily-report/icons/icon-192.png",
    badge: "/etihad-daily-report/icons/icon-192.png",
    data: {
      url: data.url || "/etihad-daily-report/",
    },
    tag: data.tag || "factory-approval",
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const appUrl = new URL("/etihad-daily-report/", self.location.origin).href;

  const targetUrl = new URL(event.notification.data?.url || appUrl, appUrl)
    .href;

  event.waitUntil(
    (async () => {
      const clientList = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      // البحث عن نافذة تطبيق التقرير نفسه
      for (const client of clientList) {
        if (client.url.startsWith(appUrl) && "focus" in client) {
          const navigatedClient = await client.navigate(targetUrl);

          if (navigatedClient) {
            await navigatedClient.focus();
            return;
          }
        }
      }

      // إذا لم تكن نافذة التطبيق مفتوحة، افتحها
      await clients.openWindow(targetUrl);
    })(),
  );
});
