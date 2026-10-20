if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

let deferredPrompt;

const installCard = document.getElementById("installCard");

const installBtn = document.getElementById("installBtn");

const laterBtn = document.getElementById("laterBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  deferredPrompt = e;

  installCard.classList.add("show");
});

installBtn.onclick = async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  installCard.classList.remove("show");

  deferredPrompt = null;
};

laterBtn.onclick = () => {
  installCard.classList.remove("show");
};

/* ===== إشعارات موافقات المدير ===== */

// ضع المفتاح العام الجديد بين علامتي الاقتباس أدناه
const PUSH_VAPID_PUBLIC_KEY =
  "BC-2ETblhz2vxfphfsiTf85pt3ILcb7tJ6hbicKDjVKVMzjgqPVWALhYJlkONBqN_sPPAJ41dxlO7voecBymqTM";

function pushBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }

  return output;
}

async function initializeAdminPushNotifications() {
  const button = document.getElementById("pushNotificationBtn");
  if (!button || typeof supabaseClient === "undefined") return;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) return;

    const { data: userInfo, error: roleError } = await supabaseClient
      .from("users")
      .select("role")
      .eq("email", user.email)
      .single();

    if (roleError || userInfo?.role !== "admin") return;

    button.style.display = "";
    button.addEventListener("click", async () => {
      button.disabled = true;

      try {
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
          throw new Error("هذا المتصفح لا يدعم إشعارات Push.");
        }

        if (!("Notification" in window)) {
          throw new Error("الإشعارات غير مدعومة في هذا المتصفح.");
        }

        if (
          !PUSH_VAPID_PUBLIC_KEY ||
          PUSH_VAPID_PUBLIC_KEY ===
            "BC-2ETblhz2vxfphfsiTf85pt3ILcb7tJ6hbicKDjVKVMzjgqPVWALhYJlkONBqN_sPPAJ41dxlO7voecBymqTM"
        ) {
          throw new Error("أضف المفتاح العام VAPID أولًا.");
        }

        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          throw new Error("لم يتم السماح بالإشعارات.");
        }

        const registration =
          await navigator.serviceWorker.register("service-worker.js");

        await navigator.serviceWorker.ready;

        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: pushBase64ToUint8Array(PUSH_VAPID_PUBLIC_KEY),
          });
        }

        const { error: saveError } = await supabaseClient
          .from("push_subscriptions")
          .insert({
            user_email: user.email,
            endpoint: subscription.endpoint,
            subscription: subscription.toJSON(),
          });

        if (saveError && saveError.code !== "23505") {
          throw saveError;
        }

        alert("تم تسجيل هذا الجهاز لاستقبال الإشعارات.");
        button.querySelector("span").textContent = "الإشعارات مفعّلة";
      } catch (error) {
        console.error("Push setup failed:", error);
        alert("تعذر تفعيل الإشعارات: " + error.message);
      } finally {
        button.disabled = false;
      }
    });
  } catch (error) {
    console.error("Admin push initialization failed:", error);
  }
}

initializeAdminPushNotifications();
