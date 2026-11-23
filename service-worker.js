/* ==========================================
   ETIHAD — SERVICE WORKER
   Cloudflare Access Compatible
========================================== */

// تثبيت التحديث الجديد مباشرة
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

// حذف النسخ القديمة المخزنة من المشروع
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith("etihad-daily-"))
          .map((name) => caches.delete(name)),
      );

      await self.clients.claim();
    })(),
  );
});

/*
  لا نستخدم fetch handler هنا.

  جميع الصفحات والملفات تمر عبر الشبكة
  وCloudflare Access بصورة طبيعية.

  تبقى إشعارات Push تعمل في الأسفل.
*/

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
    icon: new URL("icons/icon-192.png", self.registration.scope).href,
    badge: new URL("icons/icon-192.png", self.registration.scope).href,
    data: {
      url: data.url || self.registration.scope,
    },
    tag: data.tag || "factory-approval",
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const appUrl = self.registration.scope;

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
