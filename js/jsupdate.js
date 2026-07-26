let APP_VERSION = null;

async function loadCurrentVersion() {
  try {
    const response = await fetch("version.json?v=" + Date.now(), {
      cache: "no-store",
    });

    const json = await response.json();

    APP_VERSION = String(json.version).trim();

    console.log("Current App Version:", APP_VERSION);
  } catch (err) {
    console.error("Cannot read version.json", err);

    APP_VERSION = "0.0.0";
  }
}

let latestAppUpdate = null;

async function checkForAppUpdate() {
  await loadCurrentVersion();

  try {
    const { data, error } = await supabaseClient
      .from("app_updates")
      .select("*")
      .eq("active", true)
      .single();

    if (error) throw error;

    latestAppUpdate = data;

    if (!data) return false;

    console.log("APP_VERSION =", JSON.stringify(APP_VERSION));
    console.log("DATABASE_VERSION =", JSON.stringify(data.version));

    console.log("APP TYPE =", typeof APP_VERSION);
    console.log("DB TYPE =", typeof data.version);

    const appVersion = String(APP_VERSION).trim();
    const dbVersion = String(data.version).trim();

    console.log("APP CLEAN =", appVersion);
    console.log("DB CLEAN =", dbVersion);

    const hasUpdate = compareVersions(appVersion, dbVersion);

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

function compareVersions(current, latest) {
  const c = current.split(".").map(Number);
  const l = latest.split(".").map(Number);

  const len = Math.max(c.length, l.length);

  for (let i = 0; i < len; i++) {
    const currentPart = c[i] || 0;
    const latestPart = l[i] || 0;

    if (latestPart > currentPart) return true;

    if (latestPart < currentPart) return false;
  }

  return false;
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
