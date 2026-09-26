/* =========================================================
   HISTORICAL REPORT EDIT MODE
   ========================================================= */

window.isHistoricalEditMode = false;
window.historicalEditDate = null;

const historicalFieldStates = new Map();
const historicalOriginalValues = new Map();
const historicalApprovalButtons = new Map();

/* =========================================================
   تاريخ اليوم المحلي
   ========================================================= */

function historicalToday() {
  if (typeof getTodayLocalDate === "function") {
    return getTodayLocalDate();
  }

  const now = new Date();

  return (
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0")
  );
}

/* =========================================================
   تطبيع subsection
   ========================================================= */

function historicalNormalizeSubsection(subsection) {
  return String(subsection || "")
    .trim()
    .toLowerCase()
    .replace(/^sales\//, "");
}

/* =========================================================
   تحديد المصانع حسب الحساب
   ========================================================= */

function historicalGetFactories(role) {
  if (role === "feed" || role === "oil") {
    return [role];
  }

  if (role === "admin" || role === "executive") {
    return [
      "powerstation",
      "blackoil",
      "sugar",
      "oil",
      "flour",
      "feed",
      "waterfiltration",
    ];
  }

  if (role === "power") {
    return ["powerstation", "blackoil"];
  }

  if (role === "sugar") {
    return ["sugar"];
  }

  if (role === "flour") {
    return ["flour"];
  }

  if (role === "waterfiltration") {
    return ["waterfiltration"];
  }

  return [];
}

/* =========================================================
   هل العنصر ظاهر فعلًا؟
   ========================================================= */

function historicalIsVisible(element) {
  if (!element) {
    return false;
  }

  if (!element.getClientRects().length) {
    return false;
  }

  let node = element;

  while (node) {
    const style = window.getComputedStyle(node);

    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }

    if (node.tagName === "DETAILS" && !node.open) {
      return false;
    }

    node = node.parentElement;
  }

  return true;
}

/* =========================================================
   تحديد مصنع الحقل
   ========================================================= */

function historicalGetFieldFactory(element) {
  if (!element) {
    return null;
  }

  /* -----------------------------------------------------
       بطاقات المبيعات
    ----------------------------------------------------- */

  const salesMap = {
    sales_sugar: "sugar",
    sales_oil: "oil",
    sales_flour: "flour",
    sales_feed: "feed",
  };

  for (const [id, factory] of Object.entries(salesMap)) {
    if (element.closest("#" + id)) {
      return factory;
    }
  }

  /* -----------------------------------------------------
       الأقسام الرئيسية
    ----------------------------------------------------- */

  const section = element.closest(".section");

  if (section) {
    const id = section.id;

    if (id && !["home", "archive", "salesMarketing"].includes(id)) {
      return id;
    }
  }

  /* -----------------------------------------------------
       fallback
    ----------------------------------------------------- */

  if (window.fieldFactoryById instanceof Map) {
    return window.fieldFactoryById.get(element.id) || null;
  }

  return null;
}

/* =========================================================
   تحديد الاعتمادات التي يجب إلغاؤها
========================================================= */

function historicalGetApprovalNames(element, role, subsection, factory) {
  const approvals = new Set();

  const sub = historicalNormalizeSubsection(subsection);

  /* =====================================================
       الإدارة
    ===================================================== */

  if (role === "admin") {
    if (factory) {
      approvals.add(factory);
    }

    if (element.closest("#sugarPackingDetails")) {
      approvals.add("sugar_packing");
    }

    if (element.closest("#flourPackagingDetails")) {
      approvals.add("flour_packing");
    }

    if (
      element.closest("#oilPackingDetails") ||
      element.closest("#oilPlasticDetails") ||
      element.closest("#oilAssemblyDetails")
    ) {
      approvals.add("oil_sales");
    }

    return approvals;
  }

  /* =====================================================
       الحساب الرئيسي
    ===================================================== */

  if (!subsection) {
    if (role === "power") {
      if (factory === "powerstation" || factory === "blackoil") {
        approvals.add("powerstation");
      }
    } else if (factory === role) {
      approvals.add(factory);
    }

    /* تعبئة السكر */
    if (role === "sugar" && element.closest("#sugarPackingDetails")) {
      approvals.add("sugar_packing");
    }

    /* تعبئة الطحين */
    if (role === "flour" && element.closest("#flourPackagingDetails")) {
      approvals.add("flour_packing");
    }

    /* مبيعات/ملحقات الزيت */
    if (
      role === "oil" &&
      (element.closest("#oilPackingDetails") ||
        element.closest("#oilPlasticDetails") ||
        element.closest("#oilAssemblyDetails"))
    ) {
      approvals.add("oil_sales");
    }

    return approvals;
  }

  /* =====================================================
       الحسابات الفرعية
    ===================================================== */

  if (role === "feed" && sub === "production") {
    approvals.add("feed_production");
  }

  if (role === "feed" && sub === "feed_production") {
    approvals.add("feed_production");
  }

  if (role === "feed" && (sub === "raw_stock" || sub === "feed_raw_stock")) {
    approvals.add("feed_raw_stock");
  }

  if (role === "feed" && (sub === "premix" || sub === "feed_premix")) {
    approvals.add("feed_premix");
  }

  if (role === "oil" && (sub === "production" || sub === "oil_production")) {
    approvals.add("oil_production");
  }

  /* إنتاج الطحين → إعادة اعتماد تقرير الطحين */

  if (
    role === "flour" &&
    (sub === "production" || sub === "flour_production")
  ) {
    approvals.add("flour");
  }

  /* إنتاج السكر → إعادة اعتماد تقرير السكر */

  if (role === "sugar" && (sub === "process" || sub === "sugar_process")) {
    approvals.add("sugar");
  }

  /* مبيعات الزيت تعتمد التعبئة + اللدائن + التجميع */

  if (role === "oil" && (sub === "sales" || sub === "oil_sales")) {
    if (
      element.closest("#oilPackingDetails") ||
      element.closest("#oilPlasticDetails") ||
      element.closest("#oilAssemblyDetails")
    ) {
      approvals.add("oil_sales");
    }
  }

  /* مبيعات السكر تعتمد التعبئة */

  if (
    role === "sugar" &&
    sub === "sugar_sales" &&
    element.closest("#sugarPackingDetails")
  ) {
    approvals.add("sugar_packing");
  }

  /* مبيعات الطحين تعتمد التعبئة */

  if (
    role === "flour" &&
    sub === "flour_sales" &&
    element.closest("#flourPackagingDetails")
  ) {
    approvals.add("flour_packing");
  }

  return approvals;
}

/* =========================================================
   التقاط الحالة الأصلية للحقول
========================================================= */

function historicalCaptureStates() {
  historicalFieldStates.clear();
  historicalOriginalValues.clear();
  historicalApprovalButtons.clear();

  document.querySelectorAll("input, textarea, select").forEach((element) => {
    if (
      element.id === "archiveDate" ||
      element.id === "reportDateKey" ||
      element.id === "searchBox"
    ) {
      return;
    }

    historicalFieldStates.set(element, {
      readOnly: "readOnly" in element ? element.readOnly : false,

      disabled: element.disabled,
    });
  });

  /* =====================================================
       حفظ قيم التقرير بعد تحميله
    ===================================================== */

  document.querySelectorAll("[data-save][id]").forEach((element) => {
    historicalOriginalValues.set(element, String(element.value ?? ""));
  });

  /* =====================================================
       حفظ حالة أزرار الاعتماد
    ===================================================== */

  document.querySelectorAll("button").forEach((button) => {
    const text = button.innerText || "";

    if (
      text.includes("اعتماد") ||
      button.hasAttribute("data-subsection-approval")
    ) {
      historicalApprovalButtons.set(button, button.style.display);
    }
  });
}

/* =========================================================
   قفل التقرير للعرض فقط
========================================================= */

function historicalLockView() {
  historicalFieldStates.forEach((state, element) => {
    if ("readOnly" in element) {
      element.readOnly = true;
    }

    if (
      element.tagName === "SELECT" ||
      element.type === "file" ||
      element.type === "checkbox" ||
      element.type === "radio"
    ) {
      element.disabled = true;
    } else if ("disabled" in element && state.disabled) {
      element.disabled = true;
    }
  });

  /* إخفاء أزرار الاعتماد أثناء المشاهدة */

  historicalApprovalButtons.forEach((display, button) => {
    button.style.display = "none";
  });
}

/* =========================================================
   إعادة الحقول إلى حالتها القابلة للتحرير
========================================================= */

function historicalRestoreEditable() {
  document.querySelectorAll("[data-save]").forEach((el) => {
    // نتعامل فقط مع الحقول الظاهرة والمسموح بها لهذا الحساب
    if (!historicalIsVisible(el)) {
      return;
    }

    // فك القفل نهائيًا
    el.readOnly = false;
    el.disabled = false;

    el.removeAttribute("readonly");
    el.removeAttribute("disabled");

    el.dataset.historicalEditable = "true";
  });

  console.log("✅ HISTORICAL EDIT MODE: editable fields unlocked");
}

/* =========================================================
   تحميل التقرير السابق
========================================================= */

async function loadArchiveReport() {
  const date = document.getElementById("archiveDate")?.value;

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

  /* =====================================================
       وضع المشاهدة فقط
    ===================================================== */

  window.isHistoricalEditMode = false;
  window.historicalEditDate = date;

  historicalFieldStates.clear();
  historicalOriginalValues.clear();
  historicalApprovalButtons.clear();

  /* =====================================================
       تحديد الحد الأقصى للتاريخ
    ===================================================== */

  const archiveInput = document.getElementById("archiveDate");

  if (archiveInput) {
    archiveInput.max = historicalToday();
  }

  /* =====================================================
       التنفيذـي: مشاهدة فقط
    ===================================================== */

  if (role === "executive") {
    historicalEditDate = date;
  }

  /* =====================================================
       تحديد المصانع
    ===================================================== */

  const factories = historicalGetFactories(role);

  if (!factories.length) {
    showNotification("لا توجد صلاحية للأرشيف", "error");

    return;
  }

  /* =====================================================
       التاريخ الفعلي للتقرير
    ===================================================== */

  const reportDateKey = document.getElementById("reportDateKey");

  if (!reportDateKey) {
    showNotification("حقل تاريخ التقرير غير موجود", "error");

    return;
  }

  reportDateKey.value = date;

  console.log("=================================");

  console.log("📚 HISTORICAL REPORT LOAD");

  console.log("DATE =", date);

  console.log("ROLE =", role);

  console.log("SUBSECTION =", subsection);

  console.log("FACTORIES =", factories);

  console.log("=================================");

  /* =====================================================
       تنظيف القيم القديمة من الشاشة
    ===================================================== */

  document.querySelectorAll("[data-save][id]").forEach((element) => {
    element.value = "";
  });

  /* =====================================================
       تنظيف الصور السابقة
    ===================================================== */

  document.querySelectorAll(".files-grid").forEach((grid) => {
    grid.remove();
  });

  document.querySelectorAll("[id$='_link']").forEach((link) => {
    link.style.display = "";
  });

  /* =====================================================
       تحميل التقارير
    ===================================================== */

  for (const factory of factories) {
    await loadFactorySection(factory);
  }

  /* =====================================================
       إعادة تطبيق صلاحيات الحساب الفرعي
    ===================================================== */

  if (subsection) {
    if (role === "feed" || role === "oil") {
      applySubsectionPermissions(role, subsection);
    } else if (role === "sugar" || role === "flour") {
      applySugarFlourSubsectionPermissions(role, subsection);

      applySugarFlourSubsectionApprovalPermissions(role, subsection);
    }
  }

  /* =====================================================
       التقاط الحالة وقفل التقرير
    ===================================================== */

  historicalCaptureStates();

  historicalLockView();

  /* =====================================================
       تحديث زر التعديل
    ===================================================== */

  const editButton = document.getElementById("archiveEditBtn");

  const status = document.getElementById("archiveEditStatus");

  if (editButton) {
    if (role !== "executive" && date < historicalToday()) {
      editButton.style.display = "inline-flex";
    } else {
      editButton.style.display = "none";
    }
  }

  if (status) {
    status.style.display = "block";

    if (role === "executive") {
      status.textContent =
        "👁️ التقرير محمّل للعرض فقط — الحساب التنفيذي لا يملك صلاحية التعديل.";
    } else if (date < historicalToday()) {
      status.textContent =
        "📖 تم تحميل التقرير. اضغط «تفعيل تعديل هذا التقرير» للبدء.";
    } else {
      status.textContent =
        "📅 هذا هو تقرير اليوم. استخدم التقرير الحالي للتعديل.";
    }
  }

  showNotification("📚 تم تحميل التقرير المؤرشف", "success");
}

/* =========================================================
   تفعيل تعديل التقرير السابق
========================================================= */

function enterHistoricalEditMode() {
  const role = window.currentUserRole;

  if (role === "executive") {
    showNotification("الحساب التنفيذي للعرض فقط", "warning");

    return;
  }

  const date = document.getElementById("archiveDate")?.value;

  if (!date) {
    showNotification("اختر تاريخ التقرير أولًا", "warning");

    return;
  }

  if (date >= historicalToday()) {
    showNotification("تعديل التقرير متاح للأيام السابقة فقط", "warning");

    return;
  }

  if (window.historicalEditDate !== date) {
    showNotification("حمّل التقرير المحدد أولًا", "warning");

    return;
  }

  window.isHistoricalEditMode = true;

  historicalRestoreEditable();
  document.querySelectorAll("[data-save]").forEach((el) => {
    if (!historicalIsVisible(el)) return;

    el.readOnly = false;
    el.disabled = false;

    el.removeAttribute("readonly");
    el.removeAttribute("disabled");
  });

  /* تأكيد أن المقارنة تبدأ من القيم الأصلية */

  document.querySelectorAll("[data-save][id]").forEach((element) => {
    historicalOriginalValues.set(element, String(element.value ?? ""));
  });

  /* إظهار الشريط */

  const bar = document.getElementById("historicalEditBar");

  const dateLabel = document.getElementById("historicalEditDateLabel");

  const editButton = document.getElementById("archiveEditBtn");

  const status = document.getElementById("archiveEditStatus");

  if (dateLabel) {
    dateLabel.textContent = date;
  }

  if (bar) {
    bar.style.display = "flex";
  }

  if (editButton) {
    editButton.style.display = "none";
  }

  if (status) {
    status.textContent =
      "✏️ يمكنك الآن تعديل البيانات المسموحة لهذا الحساب. لن تُحفظ التغييرات حتى تضغط «حفظ التعديلات».";

    status.style.display = "block";
  }

  showNotification(`✏️ تم تفعيل تعديل تقرير ${date}`, "success");
}

/* =========================================================
   حفظ التقرير السابق
========================================================= */

async function saveHistoricalReport() {
  if (!window.isHistoricalEditMode) {
    showNotification("وضع التعديل غير مفعل", "warning");

    return;
  }

  const role = window.currentUserRole;

  if (role === "executive") {
    showNotification("الحساب التنفيذي للعرض فقط", "warning");

    return;
  }

  const subsection = window.currentUserSubsection || null;

  const reportDate = window.historicalEditDate;

  if (!reportDate) {
    showNotification("لم يتم تحديد تاريخ التقرير", "error");

    return;
  }

  const {
    data: { user },
    error: authError,
  } = await supabaseClient.auth.getUser();

  if (authError || !user) {
    showNotification("يجب تسجيل الدخول أولًا", "error");

    return;
  }

  const rows = [];
  const historyRows = [];
  const approvalNames = new Set();
  console.log("🔎 approvalNames START:", [...approvalNames]);

  /* =====================================================
       جمع الحقول الظاهرة والمسموحة
    ===================================================== */

  document.querySelectorAll("[data-save][id]").forEach((element) => {
    if (!historicalIsVisible(element)) {
      return;
    }

    const factory = historicalGetFieldFactory(element);

    if (!factory) {
      return;
    }

    const value = String(element.value ?? "");

    rows.push({
      report_date: reportDate,

      factory: factory,

      field_name: element.id,

      field_value: value,

      updated_by: user.email,

      updated_at: new Date().toISOString(),
    });

    const oldValue = historicalOriginalValues.get(element);

    if (oldValue !== undefined && String(oldValue) !== value) {
      historyRows.push({
        field_name: element.id,

        field_value: value,

        updated_by: user.email,

        factory: factory,

        updated_at: new Date().toISOString(),
      });

      const names = historicalGetApprovalNames(
        element,
        role,
        subsection,
        factory,
      );

      names.forEach((name) => approvalNames.add(name));
      console.log("🔎 approvalNames AFTER FIELD:", [...approvalNames]);
    }
  });

  if (!rows.length) {
    showNotification("لا توجد بيانات قابلة للحفظ في هذا القسم", "warning");

    return;
  }

  /* =====================================================
       إزالة التكرار
    ===================================================== */

  const uniqueRows = [
    ...new Map(
      rows.map((row) => [
        `${row.report_date}|${row.factory}|${row.field_name}`,
        row,
      ]),
    ).values(),
  ];

  /* =====================================================
       حفظ التقرير
    ===================================================== */

  const { error: reportError } = await supabaseClient
    .from("daily_reports")
    .upsert(uniqueRows, {
      onConflict: "report_date,factory,field_name",
    });

  if (reportError) {
    console.error("HISTORICAL REPORT SAVE ERROR:", reportError);

    showNotification(reportError.message, "error");

    return;
  }

  /* =====================================================
       حفظ التاريخ
    ===================================================== */

  if (historyRows.length) {
    const { error: historyError } = await supabaseClient
      .from("field_history")
      .insert(historyRows);

    if (historyError) {
      console.error("HISTORICAL HISTORY ERROR:", historyError);

      showNotification(
        historyError.message || "تم حفظ التقرير لكن فشل تسجيل التاريخ",
        "warning",
      );
    }
  }

  /* =====================================================
       إلغاء الاعتماد القديم
    ===================================================== */

  for (const approvalName of approvalNames) {
    const { error: approvalDeleteError } = await supabaseClient
      .from("section_approvals")
      .delete()
      .eq("report_date", reportDate)
      .eq("section_name", approvalName);

    if (approvalDeleteError) {
      console.error(
        "HISTORICAL APPROVAL INVALIDATION ERROR:",
        approvalDeleteError,
      );
    }
  }

  /* =====================================================
       تحديث الذاكرة المحلية
    ===================================================== */

  uniqueRows.forEach((row) => {
    const element = document.getElementById(row.field_name);

    if (!element) {
      return;
    }

    const factory = row.factory;

    if (typeof fieldStateKey === "function") {
      const key = fieldStateKey(factory, row.field_name);

      if (window.fieldLastSavedValues instanceof Map) {
        window.fieldLastSavedValues.set(
          key,
          String(row.field_value ?? "").trim(),
        );
      }

      if (window.fieldLastUpdatedAt instanceof Map) {
        window.fieldLastUpdatedAt.set(key, row.updated_at);
      }
    }
  });

  /* =====================================================
       إعادة الحسابات
    ===================================================== */

  if (typeof recalculateAll === "function") {
    recalculateAll();
  }

  if (typeof refreshAllDashboards === "function") {
    refreshAllDashboards();
  }

  /* =====================================================
     بعد الحفظ:
     نقفل الحقول مرة أخرى
     ونعيد إظهار اعتماد القسم المتأثر
  ===================================================== */

  historicalLockView();
  console.log("🔎 approvalNames BEFORE REFRESH:", [...approvalNames]);

  if (approvalNames.size && typeof refreshHistoricalApprovalUI === "function") {
    refreshHistoricalApprovalUI([...approvalNames]);
  }

  const saveButton = document.getElementById("historicalSaveBtn");

  if (saveButton) {
    saveButton.innerHTML = "✅ تم حفظ التعديلات";
  }

  showNotification(
    approvalNames.size
      ? "✅ تم حفظ التعديلات وإلغاء الاعتماد السابق. يجب إعادة الاعتماد."
      : "✅ تم حفظ التعديلات بنجاح.",
    "success",
  );
}

/* =========================================================
   الخروج والعودة إلى تقرير اليوم
========================================================= */

async function exitHistoricalEditMode() {
  window.isHistoricalEditMode = false;

  window.historicalEditDate = null;

  historicalFieldStates.clear();
  historicalOriginalValues.clear();
  historicalApprovalButtons.clear();

  /* =====================================================
   إعادة تقرير اليوم إلى وضع التحرير
===================================================== */

  if (window.currentUserRole !== "executive") {
    document.querySelectorAll("[data-save]").forEach((el) => {
      if (!historicalIsVisible(el)) return;

      el.readOnly = false;
      el.disabled = false;

      el.removeAttribute("readonly");
      el.removeAttribute("disabled");

      delete el.dataset.historicalEditable;
    });
  }

  const bar = document.getElementById("historicalEditBar");

  const editButton = document.getElementById("archiveEditBtn");

  const status = document.getElementById("archiveEditStatus");

  const archiveDate = document.getElementById("archiveDate");

  const reportDateKey = document.getElementById("reportDateKey");

  if (bar) {
    bar.style.display = "none";
  }

  if (editButton) {
    editButton.style.display = "none";
  }

  if (status) {
    status.style.display = "none";
  }

  if (archiveDate) {
    archiveDate.value = "";
  }

  /* العودة إلى اليوم */

  if (reportDateKey) {
    reportDateKey.value = historicalToday();
  }

  await loadDailyReport();

  if (typeof goToHomeByRole === "function") {
    await goToHomeByRole();
  }

  showNotification("↩ تم الرجوع إلى تقرير اليوم", "success");
}
