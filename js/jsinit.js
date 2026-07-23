window.addEventListener("load", () => {
  const now = new Date();

  document.getElementById("today").innerText = daysArabic[now.getDay()];

  document.getElementById("todayDate").innerText =
    now.toLocaleDateString("ar-IQ");
  const dateKey =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  document.getElementById("reportDateKey").value = dateKey;
});

window.addEventListener("offline", () => {
  showNotification(
    "تم فقدان الاتصال بالإنترنت، لن يتم مزامنة البيانات حتى يعود الاتصال.",
    "warning",
  );
});

window.addEventListener("online", () => {
  showNotification(
    "تمت إعادة الاتصال، ستتم مزامنة البيانات تلقائيًا.",
    "success",
  );
});
