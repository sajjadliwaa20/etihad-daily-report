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
