async function loadArchiveReport() {
  const date = document.getElementById("archiveDate").value;

  if (!date) {
    alert("اختر تاريخ التقرير");

    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("daily_reports")
      .select("*")
      .eq("report_date", date);

    if (error) {
      console.log(error);

      alert("ERROR: " + error.message);

      return;
    }

    if (!data || data.length === 0) {
      alert("لا يوجد تقرير لهذا التاريخ");

      return;
    }

    data.forEach((row) => {
      const element = document.getElementById(row.field_name);

      if (element) {
        element.value = row.field_value;
      }
    });

    alert("تم تحميل التقرير بنجاح");
  } catch (err) {
    console.error(err);

    alert("فشل تحميل التقرير");
  }
}
