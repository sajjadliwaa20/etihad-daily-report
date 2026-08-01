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

  /* إلغاء تفعيل جميع التحديثات السابقة */

  const { error: disableError } = await supabaseClient
    .from("app_updates")
    .update({
      active: false,
    })
    .eq("active", true);

  if (disableError) {
    console.error(disableError);

    showNotification(disableError.message, "error");

    return;
  }

  /* إضافة التحديث الجديد */

  const { error } = await supabaseClient.from("app_updates").insert({
    version,

    title,

    changelog,

    force_update: force,

    active: true,

    published_by: user?.email || "system",
  });

  if (error) {
    console.error(error);

    showNotification(error.message, "error");

    return;
  }

  showNotification(`✅ تم نشر الإصدار ${version}`, "success");

  document.getElementById("updateVersion").value = "";

  document.getElementById("updateTitle").value = "";

  document.getElementById("updateChangelog").value = "";

  document.getElementById("forceUpdate").checked = false;
}

let latestAppUpdate = null;

async function checkForAppUpdate() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return false;

  /* آخر تحديث منشور */

  const { data: latest, error: latestError } = await supabaseClient
    .from("app_updates")
    .select("*")
    .eq("active", true)
    .single();

  if (latestError || !latest) {
    console.error(latestError);
    return false;
  }

  latestAppUpdate = latest;

  console.log("LATEST UPDATE:", latest);

  /* آخر إصدار شاهده المستخدم */

  const { data: userVersion, error } = await supabaseClient
    .from("user_versions")
    .select("last_seen_version")
    .eq("email", user.email)
    .maybeSingle();
  console.log("TYPE =", typeof userVersion);
  console.log("VALUE =", userVersion);
  console.log("BOOLEAN =", !userVersion);
  if (!userVersion) {
    console.log("ENTERED IF");
  }

  // ← أضف هذين السطرين
  console.log("USER VERSION:", userVersion);
  console.log("USER VERSION ERROR:", error);

  if (error) {
    console.error("USER VERSION ERROR:", error);
  }

  if (!userVersion) {
    // ← أضف هذا السطر
    console.log("NO USER VERSION -> INSERTING");

    const { data, error } = await supabaseClient
      .from("user_versions")
      .insert({
        email: user.email,
        last_seen_version: "",
        updated_at: new Date().toISOString(),
        last_seen_at: new Date().toISOString(),
      })
      .select();

    console.log("INSERT RESULT:", data);
    console.log("INSERT ERROR:", error);

    return true;
  }

  return userVersion.last_seen_version !== latest.version;
}

function showUpdateDialog() {
  if (!latestAppUpdate) return;

  document.getElementById("updatePopup").style.display = "flex";

  document.getElementById("popupVersion").textContent = latestAppUpdate.version;

  document.getElementById("popupTitle").textContent = latestAppUpdate.title;

  document.getElementById("popupChangelog").textContent =
    latestAppUpdate.changelog;

  const laterBtn = document.getElementById("updateLaterBtn");

  if (latestAppUpdate.force_update) {
    laterBtn.style.display = "none";
  } else {
    laterBtn.style.display = "inline-block";
  }
}

async function completeUpdate() {
  /* حذف جميع الكاش */

  if ("caches" in window) {
    const names = await caches.keys();

    await Promise.all(names.map((name) => caches.delete(name)));
  }

  /* حذف Service Worker */

  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const reg of registrations) {
      await reg.unregister();
    }
  }

  /* ضع علامة بأن التحديث قيد الإكمال */

  localStorage.setItem("pendingUpdate", "true");

  /* إعادة تحميل الصفحة */

  window.location.reload();
}

async function saveCurrentVersion() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user || !latestAppUpdate) return;

  const { error } = await supabaseClient.from("user_versions").upsert({
    email: user.email,
    last_seen_version: latestAppUpdate.version,
    updated_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  });

  if (error) {
    console.error("SAVE VERSION ERROR:", error);
  }
}

document.getElementById("updateNowBtn")?.addEventListener("click", async () => {
  try {
    await saveCurrentVersion();

    await completeUpdate();
  } catch (err) {
    console.error(err);

    showNotification("فشل التحديث", "error");
  }
});
