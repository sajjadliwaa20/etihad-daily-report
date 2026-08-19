async function loadArchiveReport() {
  const date = document.getElementById("archiveDate").value;

  if (!date) {
    showNotification("اختر تاريخ التقرير", "warning");

    return;
  }

  const role = window.currentUserRole;

  if (!role) {
    showNotification("تعذر تحديد صلاحيات المستخدم", "error");

    return;
  }

  // تحديد الأقسام المسموح بتحميلها
  let factories = [];

  if (role === "admin") {
    factories = ["powerstation", "blackoil", "sugar", "oil", "flour", "feed"];
  } else if (role === "executive") {
    factories = ["powerstation", "blackoil", "sugar", "oil", "flour", "feed"];
  } else if (role === "power") {
    factories = ["powerstation", "blackoil"];
  } else if (
    role === "sugar" ||
    role === "oil" ||
    role === "flour" ||
    role === "feed"
  ) {
    factories = [role];
  } else {
    showNotification("لا توجد صلاحية للأرشيف", "error");

    return;
  }

  // اجعل التاريخ المختار هو تاريخ التقرير
  document.getElementById("reportDateKey").value = date;

  console.log("Archive Date =", date);

  console.log("Archive Role =", role);

  console.log("Archive Factories =", factories);

  // تحميل الأقسام المسموح بها فقط
  for (const factory of factories) {
    await loadFactorySection(factory);
  }

  showNotification("📚 تم تحميل التقرير المؤرشف بنجاح", "success");
}
