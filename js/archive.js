async function loadArchiveReport() {
  const date = document.getElementById("archiveDate").value;

  if (!date) {
    showNotification("اختر تاريخ التقرير");

    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("daily_reports")
      .select("*")
      .eq("report_date", date);

    if (error) {
      console.log(error);

      showNotification("ERROR: " + error.message);

      return;
    }

    if (!data || data.length === 0) {
      showNotification("لا يوجد تقرير لهذا التاريخ");

      return;
    }

    data.forEach((row) => {
      const element = document.getElementById(row.field_name);

      if (element) {
        element.value = row.field_value;
      }
    });

    showNotification("تم تحميل التقرير بنجاح", "success");
  } catch (err) {
    console.error(err);

    showNotification("فشل تحميل التقرير", "error");
  }
}
