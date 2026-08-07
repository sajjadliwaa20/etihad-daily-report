async function loadArchiveReport() {
  const date = document.getElementById("archiveDate").value;

  if (!date) {
    showNotification("اختر تاريخ التقرير");
    return;
  }

  // اجعل تاريخ التقرير الحالي هو تاريخ الأرشيف
  document.getElementById("reportDateKey").value = date;
  console.log(
    "reportDateKey =",
    document.getElementById("reportDateKey").value,
  );

  // استخدم نظام التحميل الأصلي
  await loadDailyReport();

  showNotification("تم تحميل التقرير بنجاح", "success");
}
