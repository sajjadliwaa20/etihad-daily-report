const APP_VERSION = "7.0.0";
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

  try {
    // حذف جميع الـ Cache
    if ("caches" in window) {
      const keys = await caches.keys();

      await Promise.all(keys.map((key) => caches.delete(key)));
    }

    // حذف جميع الـ Service Workers
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();

      for (const reg of regs) {
        await reg.unregister();
      }
    }

    hideUpdateDialog();

    setTimeout(() => {
      window.location.href = window.location.pathname + "?update=" + Date.now();
    }, 700);
  } catch (err) {
    console.error(err);

    showNotification("فشل تحديث التطبيق", "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("updateNowBtn").onclick = updateApplication;

  document.getElementById("updateLaterBtn").onclick = hideUpdateDialog;
});

async function publishUpdate() {
  const version = document.getElementById("updateVersion").value.trim();

  const title = document.getElementById("updateTitle").value.trim();

  const changelog = document.getElementById("updateChangelog").value.trim();

  const force = document.getElementById("forceUpdate").checked;

  if (!version) {
    showNotification("أدخل رقم الإصدار", "error");

    return;
  }

  if (!title) {
    showNotification("أدخل عنوان التحديث", "error");

    return;
  }

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { error } = await supabaseClient

    .from("app_updates")

    .upsert(
      {
        id: 1,

        version,

        title,

        changelog,

        force_update: force,

        active: true,

        published_by: user?.email || "system",

        created_at: new Date().toISOString(),
      },
      {
        onConflict: "id",
      },
    );

  if (error) {
    console.error("Supabase Error:", error);

    alert(JSON.stringify(error, null, 2));

    showNotification(error.message, "error");

    return;
  }
  document.getElementById("currentVersion").textContent = version;
  showNotification("✅ تم نشر التحديث بنجاح", "success");
  await checkForAppUpdate();
  latestAppUpdate = {
    version,

    title,

    changelog,

    force_update: force,
  };

  document.getElementById("updateVersion").value = "";

  document.getElementById("updateTitle").value = "";

  document.getElementById("updateChangelog").value = "";

  document.getElementById("forceUpdate").checked = false;
}
