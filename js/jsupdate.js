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
  console.log("complete Update START");

  if ("caches" in window) {
    console.log("Deleting cache...");

    const names = await caches.keys();

    console.log(names);

    await Promise.all(names.map((name) => caches.delete(name)));

    console.log("Cache deleted");
  }

  if ("serviceWorker" in navigator) {
    console.log("Removing service workers...");

    const registrations = await navigator.serviceWorker.getRegistrations();

    console.log(registrations);

    for (const reg of registrations) {
      await reg.unregister();
    }

    console.log("Service workers removed");
  }

  console.log("Reloading page...");

  localStorage.setItem("pendingUpdate", "true");

  window.location.reload();
}

async function saveCurrentVersion() {
  console.log("saveCurrentVersion START");

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  console.log("USER =", user);

  if (!user || !latestAppUpdate) {
    console.log("STOP: user or latestAppUpdate missing");
    return;
  }

  const { data, error } = await supabaseClient
    .from("user_versions")
    .upsert({
      email: user.email,
      last_seen_version: latestAppUpdate.version,
      updated_at: new Date().toISOString(),
      last_seen_at: new Date().toISOString(),
    })
    .select();

  console.log("UPSERT RESULT:", data);
  console.log("UPSERT ERROR:", error);

  if (error) {
    console.error(error);
  }

  console.log("saveCurrentVersion END");
}

document.getElementById("updateNowBtn")?.addEventListener("click", async () => {
  console.log("1- Button Clicked");

  try {
    console.log("2- Before saveCurrentVersion");

    await saveCurrentVersion();

    console.log("3- saveCurrentVersion Finished");

    console.log("4- Before completeUpdate");

    await completeUpdate();

    console.log("5- completeUpdate Finished");
  } catch (err) {
    console.error("UPDATE ERROR:", err);
  }
});

function initializeUpdateButtons() {
  const nowBtn = document.getElementById("updateNowBtn");

  if (nowBtn) {
    nowBtn.onclick = async () => {
      console.log("UPDATE BUTTON CLICKED");

      await saveCurrentVersion();

      await completeUpdate();
    };
  }

  const laterBtn = document.getElementById("updateLaterBtn");

  if (laterBtn) {
    laterBtn.onclick = async () => {
      await saveCurrentVersion();

      document.getElementById("updatePopup").style.display = "none";
    };
  }
}
