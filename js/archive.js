async function loadArchiveReport() {
  const date = document.getElementById("archiveDate").value;

  if (!date) {
    showNotification("اختر تاريخ التقرير", "warning");

    return;
  }

  const role = window.currentUserRole;

  const subsection = window.currentUserSubsection || null;

  if (!role) {
    showNotification("تعذر تحديد صلاحيات المستخدم", "error");

    return;
  }

  /* =========================================
       تحديد المصنع الذي سيتم تحميله
       ========================================= */

  let factories = [];

  if (role === "feed" || role === "oil") {
    /*
     * الحساب الرئيسي أو الفرعي
     * كلاهما يحمل مصنعه فقط
     */

    factories = [role];
  } else if (role === "admin") {
    factories = [
      "powerstation",
      "blackoil",
      "sugar",
      "oil",
      "flour",
      "feed",
      "waterfiltration",
    ];
  } else if (role === "executive") {
    factories = [
      "powerstation",
      "blackoil",
      "sugar",
      "oil",
      "flour",
      "feed",
      "waterfiltration",
    ];
  } else if (role === "power") {
    factories = ["powerstation", "blackoil"];
  } else if (role === "sugar") {
    factories = ["sugar"];
  } else if (role === "flour") {
    factories = ["flour"];
  } else if (role === "waterfiltration") {
    factories = ["waterfiltration"];
  } else {
    showNotification("لا توجد صلاحية للأرشيف", "error");

    return;
  }

  /* =========================================
       تغيير تاريخ التقرير
       ========================================= */

  const reportDateKey = document.getElementById("reportDateKey");

  if (!reportDateKey) {
    showNotification("حقل تاريخ التقرير غير موجود", "error");

    return;
  }

  reportDateKey.value = date;

  console.log("=================================");

  console.log("📚 ARCHIVE LOAD");

  console.log("DATE =", date);

  console.log("ROLE =", role);

  console.log("SUBSECTION =", subsection);

  console.log("FACTORIES =", factories);

  console.log("=================================");

  /* =========================================
       تنظيف الصور القديمة من العرض
       ========================================= */

  document.querySelectorAll(".files-grid").forEach((grid) => {
    grid.remove();
  });

  /*
   * إعادة إظهار روابط الملفات الأساسية
   * حتى يتمكن loadFactorySection
   * من بناء صور التاريخ الجديد
   */

  document.querySelectorAll("[id$='_link']").forEach((link) => {
    link.style.display = "";
  });

  /* =========================================
       تحميل بيانات المصنع
       ========================================= */

  for (const factory of factories) {
    await loadFactorySection(factory);
  }

  /* =========================================
       إعادة تطبيق صلاحيات الحساب الفرعي
       ========================================= */

  if (subsection && (role === "feed" || role === "oil")) {
    console.log("🔐 APPLY ARCHIVE SUBSECTION PERMISSIONS:", role, subsection);

    applySubsectionPermissions(role, subsection);
  }

  /* =========================================
       الأرشيف أصبح للقراءة فقط
       ========================================= */

  /*
   * لا نغير صلاحيات الحساب الأساسية.
   * فقط نمنع تعديل التقرير أثناء مشاهدة
   * التاريخ القديم.
   */

  document.querySelectorAll("[data-save]").forEach((el) => {
    el.dataset.archiveReadonly = "true";
  });

  showNotification("📚 تم تحميل التقرير المؤرشف بنجاح", "success");
}
