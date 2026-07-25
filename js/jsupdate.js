const APP_VERSION = "5.2.0";

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

function showUpdateDialog() {
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
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const reg of registrations) {
      await reg.update();
    }
  }

  window.location.reload(true);
}
document.getElementById("updateNowBtn").onclick = updateApplication;

document.getElementById("updateLaterBtn").onclick = hideUpdateDialog;
