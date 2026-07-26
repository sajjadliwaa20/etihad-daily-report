const APP_VERSION = "5.3.0";

let latestAppUpdate = null;

async function checkForAppUpdate() {
  try {
    const { data, error } = await supabaseClient
      .from("app_updates")
      .select("*")
      .eq("active", true)
      .single();

    if (error) throw error;

    latestAppUpdate = data;

    if (!data) return false;

    console.log("APP_VERSION =", APP_VERSION);
    console.log("DATABASE_VERSION =", data.version);

    const hasUpdate = data.version !== APP_VERSION;

    console.log("HAS UPDATE =", hasUpdate);

    return hasUpdate;
  } catch (err) {
    console.error("Update Check Error:", err);

    return false;
  }
}

function showUpdateDialog() {
  console.log("🚀 showUpdateDialog CALLED");
  console.log(document.getElementById("appUpdateModal"));

  if (!latestAppUpdate) return;

  document.getElementById("currentVersion").textContent = APP_VERSION;

  document.getElementById("newVersion").textContent = latestAppUpdate.version;

  document.getElementById("appUpdateTitle").textContent =
    latestAppUpdate.title || "يوجد تحديث جديد";

  document.getElementById("changeLogContent").textContent =
    latestAppUpdate.changelog || "";

  const modal = document.getElementById("appUpdateModal");

  const laterBtn = document.getElementById("updateLaterBtn");

  modal.classList.add("show");

  if (latestAppUpdate.force_update) {
    laterBtn.style.display = "none";
  } else {
    laterBtn.style.display = "block";
  }
}

function hideUpdateDialog() {
  document.getElementById("appUpdateModal").classList.remove("show");
}

async function updateApplication() {
  showNotification("جاري تحديث التطبيق...", "info");

  // تحديث جميع Service Workers
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const reg of registrations) {
      await reg.update();
    }
  }

  // حذف Cache القديم
  if ("caches" in window) {
    const keys = await caches.keys();

    await Promise.all(keys.map((key) => caches.delete(key)));
  }

  // إخفاء النافذة
  hideUpdateDialog();

  // إعادة التحميل بعد نصف ثانية
  setTimeout(() => {
    location.reload();
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("updateNowBtn").onclick = updateApplication;

  document.getElementById("updateLaterBtn").onclick = hideUpdateDialog;
});
