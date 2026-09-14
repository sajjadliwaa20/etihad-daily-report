window.testDashboard = true;

async function showCurrentUser() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!data) return;

  document.getElementById("currentUserBox").innerHTML =
    "👤 " + data.name + " | " + data.role;
}

function applySubsectionPermissions(role, subsection) {
  console.log("SUBSECTION PERMISSIONS:", role, subsection);

  const normalizedSubsection = String(subsection || "")
    .trim()
    .toLowerCase()
    .replace(/^sales\//, "");

  console.log("NORMALIZED SUBSECTION:", normalizedSubsection);

  const feedSection = document.getElementById("feed");

  const oilSection = document.getElementById("oil");

  const salesMarketing = document.getElementById("salesMarketing");

  /* =====================================================
       أدوات مساعدة
       ===================================================== */

  function hideAllDetails(section) {
    if (!section) return;

    section.querySelectorAll(":scope > details").forEach((detail) => {
      detail.style.display = "none";
      detail.open = false;
    });
  }

  function showDetails(section, ids) {
    if (!section) return;

    ids.forEach((id) => {
      const detail = document.getElementById(id);

      if (detail && section.contains(detail)) {
        detail.style.display = "block";
      }
    });
  }

  function hideSalesProducts() {
    if (!salesMarketing) return;

    salesMarketing.querySelectorAll(".sales-product-card").forEach((detail) => {
      detail.style.display = "none";

      if (detail.tagName === "DETAILS") {
        detail.open = false;
      }
    });
  }

  /* =====================================================
       FEED
       ===================================================== */

  if (role === "feed") {
    if (!feedSection) return;

    /* -----------------------------------------------
           إنتاج الأعلاف
           ----------------------------------------------- */

    if (subsection === "production" || subsection === "feed_production") {
      feedSection.style.display = "block";

      hideAllDetails(feedSection);

      showDetails(feedSection, [
        "feedProductionDetails",
        "feedReturnedDetails",
        "feedConsumptionDetails",
        "feedGeneralNotesDetails",
      ]);

      hideSalesProducts();

      const dashboard = document.getElementById("salesDashboardContent");

      if (dashboard) {
        dashboard.style.display = "none";
      }

      window.location.hash = "feed";

      return;
    }

    /* -----------------------------------------------
           البريمكس
           ----------------------------------------------- */

    if (subsection === "premix" || subsection === "feed_premix") {
      feedSection.style.display = "block";

      hideAllDetails(feedSection);

      showDetails(feedSection, ["feedPremixDetails"]);

      hideSalesProducts();

      const dashboard = document.getElementById("salesDashboardContent");

      if (dashboard) {
        dashboard.style.display = "none";
      }

      window.location.hash = "feed";

      return;
    }

    /* -----------------------------------------------
           مبيعات الأعلاف
    ----------------------------------------------- */

    if (
      normalizedSubsection === "sales" ||
      normalizedSubsection === "feed_sales"
    ) {
      /* إخفاء مصنع الأعلاف */
      if (feedSection) {
        feedSection.style.display = "none";
      }

      hideAllDetails(feedSection);

      /* =========================================
     إظهار قسم المبيعات بالقوة
  ========================================= */

      if (salesMarketing) {
        salesMarketing.style.setProperty("display", "block", "important");
      }

      const salesDashboardContent = document.getElementById(
        "salesDashboardContent",
      );

      if (salesDashboardContent) {
        salesDashboardContent.classList.remove("collapsed");

        salesDashboardContent.style.setProperty(
          "display",
          "block",
          "important",
        );

        salesDashboardContent.style.setProperty(
          "max-height",
          "none",
          "important",
        );

        salesDashboardContent.style.setProperty("height", "auto", "important");

        salesDashboardContent.style.setProperty("opacity", "1", "important");

        salesDashboardContent.style.setProperty(
          "visibility",
          "visible",
          "important",
        );

        salesDashboardContent.style.setProperty(
          "overflow",
          "visible",
          "important",
        );

        salesDashboardContent.style.setProperty(
          "pointer-events",
          "auto",
          "important",
        );
      }

      /* =========================================
     إخفاء كل منتجات المبيعات
  ========================================= */

      hideSalesProducts();

      /* =========================================
     إظهار مبيعات الأعلاف فقط
  ========================================= */

      const feedSales = document.getElementById("sales_feed");

      if (feedSales) {
        feedSales.style.setProperty("display", "block", "important");

        feedSales.style.setProperty("visibility", "visible", "important");

        feedSales.style.setProperty("height", "auto", "important");

        feedSales.style.setProperty("opacity", "1", "important");

        feedSales.open = true;
      }

      window.location.hash = "salesMarketing";

      return;
    }
  }

  /* =====================================================
       OIL
       ===================================================== */

  if (role === "oil") {
    if (!oilSection) return;

    /* -----------------------------------------------
           إنتاج الزيت
           ----------------------------------------------- */

    if (subsection === "production" || subsection === "oil_production") {
      oilSection.style.display = "block";

      hideAllDetails(oilSection);

      showDetails(oilSection, [
        "oilRawStockDetails",
        "oilRefineryDetails",
        "oilSeparationDetails",
        "oilGeneralNotesDetails",
      ]);

      hideSalesProducts();

      const dashboard = document.getElementById("salesDashboardContent");

      if (dashboard) {
        dashboard.style.display = "none";
      }

      window.location.hash = "oil";

      return;
    }

    /* --------------------------------------------
           مبيعات الزيت
    -------------------------------------------- */

    if (
      normalizedSubsection === "sales" ||
      normalizedSubsection === "oil_sales"
    ) {
      /* إخفاء مصنع الزيت */
      if (oilSection) {
        oilSection.style.display = "none";
      }

      hideAllDetails(oilSection);

      /* =========================================
     إظهار قسم المبيعات بالقوة
  ========================================= */

      if (salesMarketing) {
        salesMarketing.style.setProperty("display", "block", "important");
      }

      const salesDashboardContent = document.getElementById(
        "salesDashboardContent",
      );

      if (salesDashboardContent) {
        salesDashboardContent.classList.remove("collapsed");

        salesDashboardContent.style.setProperty(
          "display",
          "block",
          "important",
        );

        salesDashboardContent.style.setProperty(
          "max-height",
          "none",
          "important",
        );

        salesDashboardContent.style.setProperty("height", "auto", "important");

        salesDashboardContent.style.setProperty("opacity", "1", "important");

        salesDashboardContent.style.setProperty(
          "visibility",
          "visible",
          "important",
        );

        salesDashboardContent.style.setProperty(
          "overflow",
          "visible",
          "important",
        );

        salesDashboardContent.style.setProperty(
          "pointer-events",
          "auto",
          "important",
        );
      }

      /* =========================================
     إخفاء كل منتجات المبيعات
  ========================================= */

      hideSalesProducts();

      /* =========================================
     إظهار مبيعات الزيت فقط
  ========================================= */

      const oilSales = document.getElementById("sales_oil");

      if (oilSales) {
        oilSales.style.setProperty("display", "block", "important");

        oilSales.style.setProperty("visibility", "visible", "important");

        oilSales.style.setProperty("height", "auto", "important");

        oilSales.style.setProperty("opacity", "1", "important");

        oilSales.open = true;
      }

      window.location.hash = "salesMarketing";

      return;
    }
  }
}

/*
 * =========================================================
 * 🔒 حماية مخطط المبيعات التفاعلي
 * =========================================================
 *
 * المخطط وبطاقات Dashboard المبيعات:
 *
 * salesDashboardContent
 *
 * تظهر فقط:
 * - admin
 * - executive
 *
 * جميع حسابات المبيعات مخفية عنها بالكامل.
 * =========================================================
 */

function hideSalesInteractiveDashboard() {
  const dashboard = document.querySelector(".sales-executive-dashboard");

  if (dashboard) {
    dashboard.style.display = "none";
  }
}

/*
 * =========================================================
 * إظهار Dashboard المبيعات للإدارة فقط
 * =========================================================
 */

function applySalesDashboardPermissions(role, subsection = null) {
  const salesDashboard = document.querySelector(".sales-executive-dashboard");

  if (!salesDashboard) return;

  const isManagement = role === "admin" || role === "executive";

  if (isManagement) {
    /* الإدارة ترى Dashboard المبيعات */
    salesDashboard.style.display = "";
  } else {
    /*
     * جميع الحسابات غير الإدارية:
     * إخفاء Dashboard التفاعلي فقط
     *
     * ولا نخفي salesDashboardContent
     * لأن بداخله بطاقات وجداول المبيعات.
     */
    salesDashboard.style.display = "none";
  }
}

async function goToHomeByRole() {
  console.log("🏠 GO HOME BY ROLE");

  const role = window.currentUserRole;
  const subsection = window.currentUserSubsection;

  console.log("ROLE =", role);
  console.log("SUBSECTION =", subsection);

  if (!role) {
    console.error("❌ currentUserRole غير موجود");
    return;
  }

  /*
   * ==========================================
   * إخفاء جميع الأقسام أولاً
   * ==========================================
   */

  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  /*
   * ==========================================
   * الرئيسية تظهر للجميع
   * ==========================================
   */

  const home = document.getElementById("home");

  if (home) {
    home.style.display = "block";
  }

  /*
   * ==========================================
   * ADMIN
   * ==========================================
   */

  if (role === "admin") {
    showAllSections();

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * EXECUTIVE
   * ==========================================
   */

  if (role === "executive") {
    showAllSections();

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * POWER
   * ==========================================
   */

  if (role === "power") {
    const power = document.getElementById("powerstation");
    const blackoil = document.getElementById("blackoil");

    if (power) {
      power.style.display = "block";
    }

    if (blackoil) {
      blackoil.style.display = "block";
    }

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * SUGAR
   * ==========================================
   */

  if (role === "sugar") {
    const sugar = document.getElementById("sugar");

    if (sugar) {
      sugar.style.display = "block";
    }

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * FLOUR
   * ==========================================
   */

  if (role === "flour") {
    const flour = document.getElementById("flour");

    if (flour) {
      flour.style.display = "block";
    }

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * WATER FILTRATION
   * ==========================================
   */

  if (role === "waterfiltration") {
    const water = document.getElementById("waterfiltration");

    if (water) {
      water.style.display = "block";
    }

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * OIL
   * ==========================================
   */

  if (role === "oil") {
    const oil = document.getElementById("oil");

    if (oil) {
      oil.style.display = "block";
    }

    /*
     * إذا كان الحساب فرعياً
     * نعيد تطبيق صلاحيات الفرع
     */

    if (subsection) {
      applySubsectionPermissions("oil", subsection);
    }

    window.location.hash = "home";

    return;
  }

  /*
   * ==========================================
   * FEED
   * ==========================================
   */

  if (role === "feed") {
    const feed = document.getElementById("feed");

    if (feed) {
      feed.style.display = "block";
    }

    /*
     * إذا كان الحساب فرعياً
     * نعيد تطبيق صلاحيات الفرع
     */

    if (subsection) {
      applySubsectionPermissions("feed", subsection);
    }

    window.location.hash = "home";

    return;
  }

  console.warn("⚠️ لم يتم تعريف صلاحيات العودة للرئيسية لهذا الدور:", role);

  window.location.hash = "home";
}

/* =========================================================
   🛢️ صلاحيات اعتماد مصنع الزيت
   يظهر لحساب الزيت فقط
   ========================================================= */

function applyOilDashboardPermissions(role) {
  console.log("🛢️ OIL APPROVAL PERMISSIONS:", role);

  /* -----------------------------------------------------
     زر اعتماد تقرير الزيت
     يظهر لحساب الزيت فقط
     ----------------------------------------------------- */

  const oilApproveArea = document.querySelector(".oil-approval-area");

  if (oilApproveArea) {
    oilApproveArea.style.display = role === "oil" ? "flex" : "none";
  }

  /* -----------------------------------------------------
     حماية إضافية لزر الاعتماد نفسه
     ----------------------------------------------------- */

  const oilApproveBtn = document.getElementById("OilBtn");

  if (oilApproveBtn) {
    oilApproveBtn.style.display = role === "oil" ? "inline-flex" : "none";
  }
}

function applySugarDashboardPermissions(role) {
  console.log("🍬 SUGAR DASHBOARD PERMISSIONS:", role);

  /* -----------------------------------------------------
       البيانات التفصيلية
       تظهر لحساب السكر فقط
       ----------------------------------------------------- */

  document.querySelectorAll('[data-sugar-only="true"]').forEach((el) => {
    if (role === "sugar") {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });

  /* -----------------------------------------------------
       زر اعتماد تقرير السكر
       يظهر لحساب السكر فقط
       ----------------------------------------------------- */

  const sugarApproveArea = document.querySelector(".sugar-approval-area");

  if (sugarApproveArea) {
    if (role === "sugar") {
      sugarApproveArea.style.display = "flex";
    } else {
      sugarApproveArea.style.display = "none";
    }
  }

  /* -----------------------------------------------------
       حماية إضافية لزر الاعتماد نفسه
       ----------------------------------------------------- */

  const sugarApproveBtn = document.getElementById("SugarBtn");

  if (sugarApproveBtn) {
    sugarApproveBtn.style.display = role === "sugar" ? "inline-flex" : "none";
  }
}
function applyApprovalPermissions(role) {
  /* =====================================================
       إخفاء جميع مناطق الاعتماد أولاً
       ===================================================== */

  const approvalAreas = [
    ".power-approval-area",
    ".flour-approval-area",
    ".sugar-approval-area",
    ".oil-approval-area",
    ".feed-approval-area",
    ".water-approval-area",
  ];

  approvalAreas.forEach((selector) => {
    const area = document.querySelector(selector);

    if (area) {
      area.style.display = "none";
    }
  });

  /* =====================================================
       إخفاء جميع أزرار الاعتماد أولاً
       ===================================================== */

  const approvalButtons = [
    "approvePowerBtn",
    "approveFlourBtn",
    "SugarBtn",
    "OilBtn",
    "approveFeedBtn",
    "approvewaterBtn",
  ];

  approvalButtons.forEach((id) => {
    const button = document.getElementById(id);

    if (button) {
      button.style.display = "none";
    }
  });

  /* =====================================================
       الطاقة
       ===================================================== */

  if (role === "power") {
    const area = document.querySelector(".power-approval-area");
    const button = document.getElementById("approvePowerBtn");

    if (area) area.style.display = "flex";
    if (button) button.style.display = "inline-flex";
  }

  /* =====================================================
       المطحنة
       ===================================================== */

  if (role === "flour") {
    const area = document.querySelector(".flour-approval-area");
    const button = document.getElementById("approveFlourBtn");

    if (area) area.style.display = "flex";
    if (button) button.style.display = "inline-flex";
  }

  /* =====================================================
       السكر
       ===================================================== */

  if (role === "sugar") {
    const area = document.querySelector(".sugar-approval-area");
    const button = document.getElementById("SugarBtn");

    if (area) area.style.display = "flex";
    if (button) button.style.display = "inline-flex";
  }

  /* =====================================================
       الزيت
       ===================================================== */

  if (role === "oil") {
    const area = document.querySelector(".oil-approval-area");
    const button = document.getElementById("OilBtn");

    if (area) area.style.display = "flex";
    if (button) button.style.display = "inline-flex";
  }

  /* =====================================================
       الأعلاف
       ===================================================== */

  if (role === "feed") {
    const area = document.querySelector(".feed-approval-area");
    const button = document.getElementById("approveFeedBtn");

    if (area) area.style.display = "flex";
    if (button) button.style.display = "inline-flex";
  }

  /* =====================================================
       التصفية
       يظهر لحساب التصفية فقط
       ===================================================== */

  if (role === "waterfiltration") {
    const area = document.querySelector(".water-approval-area");
    const button = document.getElementById("approvewaterBtn");

    if (area) area.style.display = "flex";
    if (button) button.style.display = "inline-flex";
  }
}
async function applyPermissions() {
  console.log("applyPermissions started");

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) {
    window.location = "login.html";
    return;
  }

  const userEmail = user.email;
  if (!userEmail) {
    window.location = "login.html";
    return;
  }

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .single();

  if (error || !data) {
    window.location = "login.html";
    return;
  }

  const role = data.role;
  const subsection = data.subsection || null;

  window.currentUserRole = role;
  window.currentUserSubsection = subsection;

  applySalesDashboardPermissions(role, subsection);

  /* =========================================================
     🍬 صلاحيات Dashboard السكر
     ========================================================= */

  applySugarDashboardPermissions(role);

  console.log("ROLE =", role);
  console.log("SUBSECTION =", subsection);

  console.log("ROLE FROM DATABASE =", JSON.stringify(role));
  const adminTools = document.getElementById("adminTools");

  const editBtn = document.getElementById("editModeBtn");

  adminTools.style.display = "none";
  editBtn.style.display = "none";
  document.getElementById("editModeBtn").style.display = "none";
  console.log("EMAIL =", userEmail);
  console.log("ROLE =", role);
  console.log(data);

  /* اخفاء جميع الأقسام أولاً */

  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  document.getElementById("menu_power").style.display = "none";
  document.getElementById("menu_sugar").style.display = "none";
  document.getElementById("menu_oil").style.display = "none";
  document.getElementById("menu_flour").style.display = "none";
  document.getElementById("menu_feed").style.display = "none";
  document.getElementById("menu_waterfiltration").style.display = "none";
  document.getElementById("menu_archive").style.display = "none";
  document.getElementById("menu_sales_marketing").style.display = "none";
  document.getElementById("approvalsDashboard").style.display = "none";

  document.getElementById("lateFieldsDashboard").style.display = "none";

  document.getElementById("remindersBox").style.display = "none";

  const buttons = document.querySelectorAll("button");

  buttons.forEach((btn) => {
    if (
      btn.id === "approvewaterBtn" ||
      btn.id === "approvePowerBtn" ||
      btn.id === "approveFlourBtn" ||
      btn.id === "SugarBtn" ||
      btn.id === "OilBtn" ||
      btn.id === "approveFeedBtn"
    ) {
      return;
    }

    btn.style.display = "inline-block";
  });

  /* =========================================================
     صلاحيات الاعتماد الأساسية
     ========================================================= */

  applyApprovalPermissions(role);

  /* =========================================================
     صلاحيات الاعتماد الفرعية
     يجب أن تكون آخر شيء حتى لا يتم تجاوزها
     ========================================================= */

  applyFeedApprovalPermissions(role, subsection);

  applyOilSubsectionApprovalPermissions(role, subsection);

  /* =========================================
   الحسابات الفرعية
   لا تؤثر على الحسابات الرئيسية
========================================= */

  /* =========================================================
   الحسابات الفرعية للزيت والأعلاف
   ========================================================= */

  /* =========================================================
   الحسابات الفرعية للزيت والأعلاف
   ========================================================= */

  if (subsection && (role === "feed" || role === "oil")) {
    const normalizedSubsection = String(subsection).trim().toLowerCase();

    const isFeedSales =
      role === "feed" &&
      (normalizedSubsection === "sales" ||
        normalizedSubsection === "feed_sales" ||
        normalizedSubsection === "sales/feed_sales");

    const isOilSales =
      role === "oil" &&
      (normalizedSubsection === "sales" ||
        normalizedSubsection === "oil_sales" ||
        normalizedSubsection === "sales/oil_sales");

    console.log("FINAL SUBSECTION MODE:", {
      role,
      subsection,
      normalizedSubsection,
      isFeedSales,
      isOilSales,
    });

    /* =====================================================
     حساب المبيعات
     ===================================================== */

    if (isFeedSales || isOilSales) {
      /* الصفحة الرئيسية */
      const home = document.getElementById("home");

      if (home) {
        home.style.display = "block";
      }

      /* الأرشيف */
      const archive = document.getElementById("archive");

      if (archive) {
        archive.style.display = "block";
      }

      const archiveMenu = document.getElementById("menu_archive");

      if (archiveMenu) {
        archiveMenu.style.display = "block";
      }

      /* =====================================================
   صلاحيات خاصة بحساب مبيعات الزيت
   يرى بعض أقسام مصنع الزيت + المبيعات
===================================================== */

      if (isOilSales) {
        const oilSection = document.getElementById("oil");

        if (oilSection) {
          /* إظهار مصنع الزيت */
          oilSection.style.setProperty("display", "block", "important");

          /*
       إخفاء كل أقسام مصنع الزيت أولاً
       ثم نظهر فقط الأقسام المسموح بها
    */
          oilSection.querySelectorAll(":scope > details").forEach((detail) => {
            detail.style.display = "none";
            detail.open = false;
          });

          /* ---------------------------------------------
       1. موقف خطوط التعبئة
    --------------------------------------------- */

          const packing = document.getElementById("oilPackingDetails");

          if (packing) {
            packing.style.setProperty("display", "block", "important");

            packing.open = true;
          }

          /* ---------------------------------------------
       2. خطوط مصنع اللدائن
    --------------------------------------------- */

          const plastic = document.getElementById("oilPlasticDetails");

          if (plastic) {
            plastic.style.setProperty("display", "block", "important");

            plastic.open = true;
          }

          /* ---------------------------------------------
       3. ماكينات التجميع والسداد المعدني
    --------------------------------------------- */

          const assembly = document.getElementById("oilAssemblyDetails");

          if (assembly) {
            assembly.style.setProperty("display", "block", "important");

            assembly.open = true;
          }
        }
      } else {
        /* الحسابات الأخرى لا ترى مصنع الإنتاج */
        const factorySection = document.getElementById(role);

        if (factorySection) {
          factorySection.style.display = "none";
        }
      }

      /* قسم المبيعات */
      const salesMarketing = document.getElementById("salesMarketing");

      if (!salesMarketing) {
        console.error("SALES MARKETING NOT FOUND");
        return;
      }

      salesMarketing.style.setProperty("display", "block", "important");

      /* البطاقة المطلوبة */
      const targetId = isFeedSales ? "sales_feed" : "sales_oil";

      const target = document.getElementById(targetId);

      console.log("TARGET SALES CARD:", targetId, target);

      if (!target) {
        console.error("SALES CARD NOT FOUND:", targetId);
        return;
      }

      /* أخفِ كل بطاقات المبيعات */
      salesMarketing.querySelectorAll(".sales-product-card").forEach((card) => {
        card.style.setProperty("display", "none", "important");

        if (card.tagName === "DETAILS") {
          card.open = false;
        }
      });

      /* الحاوية القابلة للطي */
      const collapseContainer = document.getElementById(
        "salesDashboardContent",
      );

      /*
       الحاوية التنفيذية القديمة لن تظهر
       للحساب الفرعي
    */
      if (collapseContainer) {
        collapseContainer.style.setProperty("display", "none", "important");
      }

      /* أنشئ حاوية مستقلة للجدول */
      let standalone = document.getElementById("salesSubsectionStandalone");

      if (!standalone) {
        standalone = document.createElement("div");

        standalone.id = "salesSubsectionStandalone";

        standalone.className = "sales-dashboard-content";

        standalone.style.setProperty("display", "grid", "important");

        standalone.style.setProperty("width", "100%", "important");

        standalone.style.setProperty("height", "auto", "important");

        standalone.style.setProperty("max-height", "none", "important");

        standalone.style.setProperty("overflow", "visible", "important");

        standalone.style.setProperty("opacity", "1", "important");

        const header = salesMarketing.querySelector(".sales-command-header");

        if (header) {
          header.insertAdjacentElement("afterend", standalone);
        } else {
          salesMarketing.appendChild(standalone);
        }
      }

      /* انقل الجدول خارج الحاوية القابلة للطي */
      standalone.appendChild(target);

      /* أظهر الجدول */
      target.style.setProperty("display", "block", "important");

      target.style.setProperty("visibility", "visible", "important");

      target.style.setProperty("opacity", "1", "important");

      target.style.setProperty("height", "auto", "important");

      target.style.setProperty("max-height", "none", "important");

      target.style.setProperty("overflow", "visible", "important");

      target.open = true;

      window.location.hash = "salesMarketing";

      console.log("✅ SALES TABLE MOVED OUTSIDE COLLAPSE:", targetId);

      return;
    }

    /* =====================================================
     بقية الحسابات الفرعية
     ===================================================== */

    document.getElementById("menu_archive").style.display = "block";

    document.getElementById("archive").style.display = "block";

    document.getElementById("home").style.display = "block";

    document.getElementById(role).style.display = "block";

    document.getElementById("menu_sales_marketing").style.display = "none";

    applySubsectionPermissions(role, subsection);

    console.log("SUBSECTION MODE ACTIVE:", role, subsection);

    return;
  }

  if (role === "power") {
    document.getElementById("salesMarketing").style.display = "none";
    document.getElementById("home").style.display = "block";
    document.getElementById("powerstation").style.display = "block";
    document.getElementById("blackoil").style.display = "block";
    document.getElementById("menu_power").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";
    document.getElementById("darkModeBtn").style.display = "inline-block";
    document.querySelector("button[onclick='window.print()']").style.display =
      "inline-block";

    document.querySelector("button[onclick='goToLogin()']").style.display =
      "inline-block";

    window.location.hash = "powerstation";

    return;
  }

  if (role === "executive") {
    applyExecutiveMode();
    document.getElementById("menu_archive").style.display = "block";
    window.location.hash = "home";

    return;
  }

  /* صلاحيات الإدارة */

  if (role === "admin") {
    applyReadOnlyMode();

    showAllMenus();

    showAdminTools();
    document.getElementById("adminTools").style.display = "block";

    document.getElementById("editModeBtn").style.display = "inline-block";

    document.getElementById("approvalsDashboard").style.display = "block";

    document.getElementById("lateFieldsDashboard").style.display = "block";

    document.getElementById("remindersBox").style.display = "block";
    document.getElementById("menu_waterfiltration").style.display = "block";
    document.getElementById("menu_power").style.display = "block";
    document.getElementById("menu_sugar").style.display = "block";
    document.getElementById("menu_oil").style.display = "block";
    document.getElementById("menu_flour").style.display = "block";
    document.getElementById("menu_feed").style.display = "block";
    document.getElementById("menu_waterfiltration").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("menu_sales_marketing").style.display = "block";

    document.querySelectorAll(".section").forEach((section) => {
      section.style.display = "block";
    });

    applySugarDashboardPermissions(role);

    window.location.hash = "home";

    return;
  }

  /* مدير السكر */

  if (role === "sugar") {
    document.getElementById("menu_sugar").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";
    document.getElementById("home").style.display = "block";
    document.getElementById("sugar").style.display = "block";

    let salesSugar = document.getElementById("sales_sugar");
    if (salesSugar) {
      salesSugar.style.display = "block";
    }

    let salesOil = document.getElementById("sales_oil");
    if (salesOil) {
      salesOil.style.display = "none";
    }

    let salesFlour = document.getElementById("sales_flour");
    if (salesFlour) {
      salesFlour.style.display = "none";
    }

    let salesFeed = document.getElementById("sales_feed");
    if (salesFeed) {
      salesFeed.style.display = "none";
    }
  }

  /* مدير الزيت */

  if (role === "oil") {
    document.getElementById("menu_oil").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";
    document.getElementById("home").style.display = "block";
    document.getElementById("oil").style.display = "block";

    let salesOil = document.getElementById("sales_oil");
    if (salesOil) {
      salesOil.style.display = "block";
    }

    let salesSugar = document.getElementById("sales_sugar");
    if (salesSugar) {
      salesSugar.style.display = "none";
    }

    let salesFlour = document.getElementById("sales_flour");
    if (salesFlour) {
      salesFlour.style.display = "none";
    }

    let salesFeed = document.getElementById("sales_feed");
    if (salesFeed) {
      salesFeed.style.display = "none";
    }
  }

  /* مدير الطحين */

  if (role === "flour") {
    document.getElementById("menu_flour").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";
    document.getElementById("home").style.display = "block";
    document.getElementById("flour").style.display = "block";

    let salesFlour = document.getElementById("sales_flour");
    if (salesFlour) {
      salesFlour.style.display = "block";
    }

    let salesSugar = document.getElementById("sales_sugar");
    if (salesSugar) {
      salesSugar.style.display = "none";
    }

    let salesOil = document.getElementById("sales_oil");
    if (salesOil) {
      salesOil.style.display = "none";
    }

    let salesFeed = document.getElementById("sales_feed");
    if (salesFeed) {
      salesFeed.style.display = "none";
    }
  }

  /* مدير الأعلاف */

  if (role === "feed") {
    document.getElementById("menu_feed").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";
    document.getElementById("home").style.display = "block";
    document.getElementById("feed").style.display = "block";

    let salesFeed = document.getElementById("sales_feed");
    if (salesFeed) {
      salesFeed.style.display = "block";
    }

    let salesSugar = document.getElementById("sales_sugar");
    if (salesSugar) {
      salesSugar.style.display = "none";
    }

    let salesOil = document.getElementById("sales_oil");
    if (salesOil) {
      salesOil.style.display = "none";
    }

    let salesFlour = document.getElementById("sales_flour");
    if (salesFlour) {
      salesFlour.style.display = "none";
    }
  }

  /* مسؤول محطات التصفية */

  if (role === "waterfiltration") {
    console.log("ROLE WATERFILTRATION");

    console.log(document.getElementById("waterfiltration"));
    document.getElementById("home").style.display = "block";
    document.getElementById("waterfiltration").style.display = "block";
    document.getElementById("salesMarketing").style.display = "none";
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";
    document.getElementById("menu_waterfiltration").style.display = "block";
    document.getElementById("darkModeBtn").style.display = "inline-block";
    document.querySelector("button[onclick='window.print()']").style.display =
      "inline-block";

    document.querySelector("button[onclick='goToLogin()']").style.display =
      "inline-block";

    window.location.hash = "waterfiltration";

    return;
  }
}

function applyFeedApprovalPermissions(role, subsection = null) {
  const factoryArea = document.querySelector(".feed-only-area");

  const factoryButton = document.getElementById("approveFeedBtn");

  const feedProductionArea = document.getElementById(
    "feedProductionApprovalArea",
  );

  const feedPremixArea = document.getElementById("feedPremixApprovalArea");

  /* -----------------------------------------
       إخفاء أزرار الاعتماد الفرعية أولاً
       ----------------------------------------- */

  if (feedProductionArea) {
    feedProductionArea.style.display = "none";
  }

  if (feedPremixArea) {
    feedPremixArea.style.display = "none";
  }

  /* -----------------------------------------
       زر اعتماد المصنع الكامل
       يظهر فقط للحساب الرئيسي
       ----------------------------------------- */

  const isMainFeedAccount = role === "feed" && !subsection;

  if (factoryArea) {
    factoryArea.style.display = isMainFeedAccount ? "flex" : "none";
  }

  if (factoryButton) {
    factoryButton.style.display = isMainFeedAccount ? "inline-flex" : "none";
  }

  /* -----------------------------------------
       حساب إنتاج الأعلاف
       ----------------------------------------- */

  if (
    role === "feed" &&
    (subsection === "production" || subsection === "feed_production")
  ) {
    if (feedProductionArea) {
      feedProductionArea.style.display = "flex";
    }

    return;
  }

  /* -----------------------------------------
       حساب البريمكس
       ----------------------------------------- */

  if (
    role === "feed" &&
    (subsection === "premix" || subsection === "feed_premix")
  ) {
    if (feedPremixArea) {
      feedPremixArea.style.display = "flex";
    }

    return;
  }
}

function applyOilSubsectionApprovalPermissions(role, subsection = null) {
  const factoryArea = document.querySelector(".oil-approval-area");

  const factoryButton = document.getElementById("OilBtn");

  const oilProductionArea = document.getElementById(
    "oilProductionApprovalArea",
  );

  const oilSalesApprovalArea = document.getElementById("oilSalesApprovalArea");

  /* -----------------------------------------
       إخفاء زر الاعتماد الفرعي أولاً
       ----------------------------------------- */

  if (oilProductionArea) {
    oilProductionArea.style.display = "none";
  }

  if (oilSalesApprovalArea) {
    oilSalesApprovalArea.style.display = "none";
  }

  /* -----------------------------------------
       زر المصنع الكامل
       للحساب الرئيسي فقط
       ----------------------------------------- */

  const isMainOilAccount = role === "oil" && !subsection;

  if (factoryArea) {
    factoryArea.style.display = isMainOilAccount ? "flex" : "none";
  }

  if (factoryButton) {
    factoryButton.style.display = isMainOilAccount ? "inline-flex" : "none";
  }

  /* -----------------------------------------
   حساب مبيعات الزيت
   ----------------------------------------- */

  if (
    role === "oil" &&
    (subsection === "sales" ||
      subsection === "oil_sales" ||
      subsection === "sales/oil_sales")
  ) {
    if (oilSalesApprovalArea) {
      oilSalesApprovalArea.style.display = "flex";
    }

    return;
  }

  /* -----------------------------------------
       حساب إنتاج الزيت
       ----------------------------------------- */

  if (
    role === "oil" &&
    (subsection === "production" || subsection === "oil_production")
  ) {
    if (oilProductionArea) {
      oilProductionArea.style.display = "flex";
    }

    return;
  }
}

function showOnlySection(sectionId) {
  const role = String(window.currentUserRole || "")
    .trim()
    .toLowerCase();

  const subsection = String(window.currentUserSubsection || "")
    .trim()
    .toLowerCase();

  console.log("SIDEBAR NAVIGATION:", {
    role,
    subsection,
    requestedSection: sectionId,
  });

  /* =====================================================
     الإدارة والتنفيذي
     يسمح لهما بكل شيء
  ===================================================== */

  if (role === "admin" || role === "executive") {
    allowSectionNavigation(sectionId);
    return false;
  }

  /* =====================================================
     تحديد الأقسام المسموح بها
  ===================================================== */

  let allowedSections = ["home", "archive"];

  /* =====================================================
     مدير السكر
  ===================================================== */

  if (role === "sugar") {
    allowedSections.push("sugar");
  } else if (role === "oil" && !subsection) {

  /* =====================================================
     مدير الزيت الرئيسي
  ===================================================== */
    allowedSections.push("oil");
  } else if (role === "flour") {

  /* =====================================================
     مدير الطحين
  ===================================================== */
    allowedSections.push("flour");
  } else if (role === "feed") {

  /* =====================================================
     مدير الأعلاف
  ===================================================== */
    allowedSections.push("feed");
  } else if (role === "power") {

  /* =====================================================
     محطة الطاقة
  ===================================================== */
    allowedSections.push("powerstation", "blackoil");
  } else if (role === "waterfiltration") {

  /* =====================================================
     محطات التصفية
  ===================================================== */
    allowedSections.push("waterfiltration");
  }

  /* =====================================================
     مبيعات الأعلاف
  ===================================================== */

  if (
    role === "feed" &&
    (subsection === "sales" ||
      subsection === "feed_sales" ||
      subsection === "sales/feed_sales")
  ) {
    allowedSections = ["home", "archive", "salesMarketing"];
  }

  /* =====================================================
     مبيعات الزيت

     يستطيع الوصول إلى:
     - مصنع الزيت
     - قسم المبيعات
  ===================================================== */

  if (
    role === "oil" &&
    (subsection === "sales" ||
      subsection === "oil_sales" ||
      subsection === "sales/oil_sales")
  ) {
    allowedSections = ["home", "archive", "oil", "salesMarketing"];
  }

  /* =====================================================
     التحقق النهائي
  ===================================================== */

  if (!allowedSections.includes(sectionId)) {
    console.warn("🚫 NAVIGATION BLOCKED:", {
      role,
      subsection,
      requestedSection: sectionId,
      allowedSections,
    });

    /*
       إعادة الحساب إلى الصفحة المسموحة
    */

    goToHomeByRole();

    return false;
  }

  /* =====================================================
     التنقل المسموح
  ===================================================== */

  allowSectionNavigation(sectionId);

  return false;
}

/* =========================================================
   تنفيذ التنقل بعد التأكد من الصلاحية
========================================================= */

function allowSectionNavigation(sectionId) {
  /* إخفاء جميع الأقسام */
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  /* إظهار القسم المطلوب */
  const target = document.getElementById(sectionId);

  if (target) {
    target.style.display = "block";
  }

  /* =====================================================
     تحديث الزر النشط
  ===================================================== */

  document.querySelectorAll(".sidebar-menu-item").forEach((item) => {
    item.classList.remove("active");
  });

  let activeMenu = document.getElementById("menu_" + sectionId);

  if (sectionId === "salesMarketing") {
    activeMenu = document.getElementById("menu_sales_marketing");
  }

  if (activeMenu) {
    activeMenu.classList.add("active");
  }

  /* =====================================================
     الرابط
  ===================================================== */

  window.location.hash = sectionId;

  /* =====================================================
     أعلى الصفحة
  ===================================================== */

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function showAllSections() {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "block";
  });

  window.location.hash = "home";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function loadReminders() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data: userInfo } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (!userInfo) return;

  if (userInfo.role !== "admin") {
    return;
  }

  const box = document.getElementById("remindersBox");

  if (!box) return;

  box.innerHTML = "";

  const factories = [
    {
      role: "sugar",
      name: "السكر",
    },

    {
      role: "oil",
      name: "الزيت",
    },

    {
      role: "flour",
      name: "الطحين",
    },

    {
      role: "feed",
      name: "الأعلاف",
    },
  ];

  for (const factory of factories) {
    const { data: userData } = await supabaseClient
      .from("users")
      .select("*")
      .eq("role", factory.role)
      .single();

    if (!userData) continue;

    document.getElementById("remindersContent").innerHTML += `
<div style="
display:flex;
justify-content:space-between;
align-items:center;
background:#f8f9ff;
border:1px solid #d9e3ff;
padding:8px 12px;
margin:6px 0;
border-radius:8px;
">

<span style="
font-weight:bold;
font-size:14px;
">
${factory.name}
</span>

<button
style="
padding:5px 12px;
font-size:13px;
border:none;
border-radius:6px;
background:#1f3c88;
color:white;
cursor:pointer;
"
onclick="
window.open(
'https://wa.me/${userData.phone}?text=' +
encodeURIComponent(
'تذكير بتحديث تقرير ${factory.name}'
)
)
">

📲 تذكير

</button>

</div>
`;
  }
}
async function loadApprovalsDashboard() {
  const reportDate = document.getElementById("reportDateKey")?.value;

  if (!reportDate) return;

  const box = document.getElementById("approvalsDashboard");

  if (!box) return;

  box.innerHTML = `
<details>

<summary style="
font-size:18px;
font-weight:bold;
cursor:pointer;
">

📱 تذكيرات الواتساب

</summary>

<div
id="remindersContent"
style="margin-top:15px;">

</div>

</details>
`;
  const factories = [
    {
      role: "sugar",
      name: "السكر",
    },

    {
      role: "oil",
      name: "الزيت",
    },

    {
      role: "flour",
      name: "الطحين",
    },

    {
      role: "feed",
      name: "الأعلاف",
    },

    {
      role: "waterfiltration",
      name: "محطات التصفية والمعالجة",
    },
  ];

  let html = "";

  let approvedCount = 0;

  for (const factory of factories) {
    const { data } = await supabaseClient
      .from("section_approvals")
      .select("*")
      .eq("report_date", reportDate)
      .eq("section_name", factory.role);

    if (data && data.length > 0) {
      approvedCount++;

      html += `
<div style="
color:green;
font-weight:bold;
margin:5px;
">

🟢 ${factory.name}
معتمد

</div>
`;
    } else {
      html += `
<div style="
color:red;
font-weight:bold;
margin:5px;
">

🔴 ${factory.name}
غير معتمد

</div>
`;
    }
  }

  html += `
<hr>

<b>

المعتمد:

${approvedCount}

من

5

</b>
`;

  document.getElementById("approvalStatusList").innerHTML = html;
}
async function refreshAdminTools() {
  await loadApprovalsDashboard();

  await loadReminders();
}

async function goToLogin() {
  await supabaseClient.auth.signOut();

  window.location = "login.html";
}

console.log("showNotification loaded");

function showNotification(message, type = "success") {
  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  const container = document.getElementById("notification-container");

  const notification = document.createElement("div");

  notification.className = `notification ${type}`;

  notification.innerHTML = `
    <div class="icon">${icons[type] || "ℹ️"}</div>

    <div class="message">${message}</div>

    <button class="close-btn">&times;</button>

    <div class="progress"></div>
`;

  container.appendChild(notification);

  const closeBtn = notification.querySelector(".close-btn");

  closeBtn.onclick = () => {
    notification.classList.add("hide");

    setTimeout(() => {
      notification.remove();
    }, 350);
  };

  setTimeout(() => {
    notification.classList.add("hide");

    setTimeout(() => {
      notification.remove();
    }, 350);
  }, 3000);
}

document.querySelectorAll("table.wide-table").forEach((table) => {
  const wrapper = document.createElement("div");

  wrapper.className = "table-scroll";

  table.parentNode.insertBefore(wrapper, table);

  wrapper.appendChild(table);
  table - scroll;
});

window.applyPermissions = applyPermissions;
window.showCurrentUser = showCurrentUser;
window.applyExecutiveMode = applyExecutiveMode;

/* =========================================================
   نظام متابعة تحديث الحقول
   - يحتفظ بآخر قيمة معروفة
   - يحتفظ بوقت آخر تغيير حقيقي
   - يلوّن الحقل بعد 24 ساعة
========================================================= */

window.fieldLastSavedValues = window.fieldLastSavedValues || new Map();

window.fieldLastUpdatedAt = window.fieldLastUpdatedAt || new Map();

window.fieldFactoryById = window.fieldFactoryById || new Map();

window.fieldHistoryTimers = window.fieldHistoryTimers || new Map();

function fieldStateKey(factory, fieldId) {
  return `${factory}::${fieldId}`;
}

/* القيمة التي سنستخدمها للمقارنة */
function normalizeFieldValue(el) {
  if (!el) return "";

  const raw = String(el.value ?? "").trim();

  /* الأرقام:
       5 و 5.0 يعتبران نفس القيمة */
  if (el.type === "number" && raw !== "") {
    const numberValue = Number(raw);

    if (Number.isFinite(numberValue)) {
      return String(numberValue);
    }
  }

  return raw;
}

/* تاريخ اليوم حسب الجهاز */
function getTodayLocalDate() {
  const now = new Date();

  return (
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0")
  );
}

/* هل الصفحة تعرض تقرير اليوم؟ */
function isCurrentReportDate() {
  const dateElement = document.getElementById("reportDateKey");

  if (!dateElement) return false;

  return dateElement.value === getTodayLocalDate();
}

/* تطبيق لون التأخير على حقل واحد */
function updateFieldStaleStyle(el, factory) {
  if (!el) return;

  const key = fieldStateKey(factory, el.id);

  /* لا نلوّن الأرشيف */
  if (!isCurrentReportDate()) {
    el.classList.remove("field-stale");

    return;
  }

  const currentValue = normalizeFieldValue(el);

  /* الحقل الفارغ ليس "قيمة قديمة" */
  if (!currentValue) {
    el.classList.remove("field-stale");

    return;
  }

  const lastUpdated = window.fieldLastUpdatedAt.get(key);

  /* لا يوجد تاريخ معروف */
  if (!lastUpdated) {
    el.classList.remove("field-stale");

    return;
  }

  const lastUpdateTime = new Date(lastUpdated).getTime();

  if (!Number.isFinite(lastUpdateTime)) {
    el.classList.remove("field-stale");

    return;
  }

  const age = Date.now() - lastUpdateTime;

  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (age >= twentyFourHours) {
    el.classList.add("field-stale");
  } else {
    el.classList.remove("field-stale");
  }
}

/* تحديث كل الحقول الموجودة حاليًا */
function refreshAllFieldStaleStyles() {
  document.querySelectorAll("[data-save]").forEach((el) => {
    const factory = window.fieldFactoryById.get(el.id);

    if (!factory) return;

    updateFieldStaleStyle(el, factory);
  });
}

/* تحميل آخر تاريخ تحديث للحقول */
async function loadFieldHistoryForFactory(factory, fieldIds) {
  const ids = [...new Set(fieldIds.filter(Boolean))];

  if (!ids.length) return;

  let from = 0;

  const pageSize = 1000;

  const found = new Set();

  while (true) {
    const { data, error } = await supabaseClient
      .from("field_history")
      .select("field_name,field_value,updated_at")
      .eq("factory", factory)
      .in("field_name", ids)
      .order("updated_at", { ascending: false })
      .range(from, from + pageSize - 1);

    if (error) {
      console.error("FIELD HISTORY LOAD ERROR:", error);

      return;
    }

    if (!data || !data.length) {
      break;
    }

    data.forEach((row) => {
      const key = fieldStateKey(factory, row.field_name);

      /* بما أن النتائج مرتبة من الأحدث
               إلى الأقدم، أول سجل هو الأحدث */
      if (!window.fieldLastUpdatedAt.has(key)) {
        window.fieldLastUpdatedAt.set(key, row.updated_at);

        window.fieldLastSavedValues.set(
          key,
          String(row.field_value ?? "").trim(),
        );

        found.add(row.field_name);
      }
    });

    /* إذا وجدنا آخر سجل لكل الحقول المطلوبة */
    if (found.size >= ids.length) {
      break;
    }

    if (data.length < pageSize) {
      break;
    }

    from += pageSize;
  }
}

/* تسجيل تغيير حقيقي */
async function saveFieldHistoryIfChanged(fieldId, factory, value, email) {
  const el = document.getElementById(fieldId);

  if (!el) return;

  const key = fieldStateKey(factory, fieldId);

  const newValue = normalizeFieldValue(el);

  const hasPrevious = window.fieldLastSavedValues.has(key);

  const previousValue = window.fieldLastSavedValues.get(key);

  /* لم تتغير القيمة */
  if (hasPrevious && newValue === previousValue) {
    updateFieldStaleStyle(el, factory);

    return;
  }

  /* أول قيمة وهي فارغة:
       لا نسجلها كتحديث */
  if (!hasPrevious && !newValue) {
    return;
  }

  const now = new Date().toISOString();

  const { error } = await supabaseClient.from("field_history").insert([
    {
      field_name: fieldId,

      field_value: el.value || "",

      updated_by: email,

      factory: factory,

      updated_at: now,
    },
  ]);

  if (error) {
    console.error("FIELD HISTORY SAVE ERROR:", error);

    return;
  }

  window.fieldLastSavedValues.set(key, newValue);

  window.fieldLastUpdatedAt.set(key, now);

  updateFieldStaleStyle(el, factory);
}

/* الحقول التي تحفظ مباشرة أثناء الكتابة */
function scheduleFieldHistoryUpdate(fieldId, factory, value, email) {
  const key = fieldStateKey(factory, fieldId);

  if (window.fieldHistoryTimers.has(key)) {
    clearTimeout(window.fieldHistoryTimers.get(key));
  }

  const timer = setTimeout(async () => {
    await saveFieldHistoryIfChanged(fieldId, factory, value, email);

    window.fieldHistoryTimers.delete(key);
  }, 800);

  window.fieldHistoryTimers.set(key, timer);
}

function updateRefineryTotals() {
  /* =====================================
       منتجات خط التكرير 1
    ===================================== */

  const products = [
    {
      id: "refinery1_sunflower",
      color: "#f5c542",
      percentId: "refinery1PercentSunflower",
    },

    {
      id: "refinery1_olein",
      color: "#f28c28",
      percentId: "refinery1PercentOlein",
    },

    {
      id: "refinery1_ghee",
      color: "#ffe08a",
      percentId: "refinery1PercentGhee",
    },

    {
      id: "refinery1_stearin",
      color: "#aeb8c4",
      percentId: "refinery1PercentStearin",
    },

    {
      id: "refinery1_shortening",
      color: "#d9b36c",
      percentId: "refinery1PercentShortening",
    },
  ];

  /* =====================================
       قراءة الكميات
    ===================================== */

  const values = products.map((product) => {
    const element = document.getElementById(product.id);

    return {
      ...product,

      value: parseFloat(element?.value) || 0,
    };
  });

  /* =====================================
       مجموع خط 1
    ===================================== */

  const refinery1Total = values.reduce((sum, item) => sum + item.value, 0);

  /* =====================================
       تحديث مجموع خط 1
    ===================================== */

  const refinery1 = document.getElementById("refinery1");

  if (refinery1) {
    refinery1.value = refinery1Total.toFixed(2);
  }

  /* =====================================
       حساب النسب
    ===================================== */

  let currentAngle = 0;

  const gradientParts = [];

  values.forEach((item) => {
    let percentage = 0;

    if (refinery1Total > 0) {
      percentage = (item.value / refinery1Total) * 100;
    }

    /* تحديث النسبة بجانب الاسم */

    const percentElement = document.getElementById(item.percentId);

    if (percentElement) {
      percentElement.textContent = percentage.toFixed(1) + "%";
    }

    /* =================================
           بناء قطاع الحلقة
        ================================= */

    if (percentage > 0) {
      const start = currentAngle;

      const end = currentAngle + percentage * 3.6;

      gradientParts.push(`${item.color} ${start}deg ${end}deg`);

      currentAngle = end;
    }
  });

  /* =====================================
       تحديث الحلقة
    ===================================== */

  const ring = document.getElementById("refinery1Ring");

  if (ring) {
    if (refinery1Total > 0) {
      ring.style.background = `conic-gradient(
                    ${gradientParts.join(",")}
                )`;
    } else {
      ring.style.background = "conic-gradient(#303640 0deg 360deg)";
    }
  }

  /* =====================================
       إجمالي خط 2
    ===================================== */

  const refinery2 =
    parseFloat(document.getElementById("refinery2")?.value) || 0;

  /* =====================================
   تحديث لوحة خط التكرير 2
===================================== */

  const refinery2Display = document.getElementById("refinery2Display");

  const refinery2Progress = document.getElementById("refinery2Progress");

  const refinery2Percent = document.getElementById("refinery2Percent");

  const refinery2Percentage = Math.min((refinery2 / 1500) * 100, 100);

  if (refinery2Display) {
    refinery2Display.textContent = refinery2.toFixed(2);
  }

  if (refinery2Progress) {
    refinery2Progress.style.width = refinery2Percentage + "%";
  }

  if (refinery2Percent) {
    refinery2Percent.textContent = refinery2Percentage.toFixed(1) + "%";
  }

  /* =====================================
       إجمالي الخطين
    ===================================== */

  const grandTotal = refinery1Total + refinery2;

  /* الحقل الأصلي */

  const refineryTotal = document.getElementById("refinery_total");

  if (refineryTotal) {
    refineryTotal.value = grandTotal.toFixed(2);
  }

  /* الرقم الظاهر */

  const grandTotalDisplay = document.getElementById(
    "refineryGrandTotalDisplay",
  );

  if (grandTotalDisplay) {
    grandTotalDisplay.textContent = grandTotal.toFixed(2);
  }

  /* =====================================
       الرقم داخل الحلقة
    ===================================== */

  const ringTotal = document.getElementById("refinery1RingTotal");

  if (ringTotal) {
    ringTotal.textContent = refinery1Total.toFixed(2);
  }

  updateRefineryProductionVisuals();

  /* =====================================
       تحديث Dashboard الحالي
    ===================================== */

  if (typeof updateDashboard === "function") {
    updateDashboard();
  }
}

function updateOilStockDashboard() {
  const oils = [
    {
      input: "raw_sunflower_stock",
      display: "sunflowerStockDisplay",
      liquid: "sunflowerLiquid",
    },

    {
      input: "raw_olein_stock",
      display: "oleinStockDisplay",
      liquid: "oleinLiquid",
    },

    {
      input: "raw_palm_stock",
      display: "palmStockDisplay",
      liquid: "palmLiquid",
    },

    {
      input: "raw_stearin_stock",
      display: "stearinStockDisplay",
      liquid: "stearinLiquid",
    },
  ];

  oils.forEach((oil) => {
    const input = document.getElementById(oil.input);

    const display = document.getElementById(oil.display);

    const liquid = document.getElementById(oil.liquid);

    if (!input || !display || !liquid) {
      return;
    }

    const value = parseFloat(input.value) || 0;

    display.textContent = value.toLocaleString("en-US", {
      maximumFractionDigits: 3,
    });

    /*
     * المستوى البصري للخزان
     *
     * حاليًا:
     * 0 طن = 0%
     * 10000 طن أو أكثر = 100%
     *
     * يمكن تغيير 10000 لاحقًا
     * حسب السعة الحقيقية للخزانات.
     */

    const MAX_STOCK = 10000;

    let percentage = (value / MAX_STOCK) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    liquid.style.height = percentage + "%";
  });
}

function updateExtractionGauge(value) {
  const gauge = document.querySelector(".extraction-gauge");

  if (!gauge) return;

  let percentage = parseFloat(value) || 0;

  percentage = Math.max(0, Math.min(100, percentage));

  const degree = percentage * 3.6;

  gauge.style.background = `conic-gradient(
            #37b878 0deg,
            #37b878 ${degree}deg,
            rgba(255,255,255,0.08) ${degree}deg,
            rgba(255,255,255,0.08) 360deg
        )`;
}

/* =========================================
   Production Stop Dashboard
========================================= */

/* تحديث حالة بطاقة التوقف */

/* =========================================================
   FLOUR — PRODUCTION STOP STATUS
   ========================================================= */

function updateStopCard(element) {
  if (!element) return;

  /* يدعم بطاقات الطحين الجديدة */
  const card =
    element.closest(".flour-stop-card") || element.closest(".stop-card");

  if (!card) return;

  const durationInput =
    card.querySelector('input[id$="stoptime"]') ||
    card.querySelector(".flour-stop-duration input") ||
    card.querySelector(".stop-duration-box input");

  const dot =
    card.querySelector(".flour-stop-status-dot") ||
    card.querySelector(".stop-status-dot");

  const statusText =
    card.querySelector(".flour-stop-status-text") ||
    card.querySelector(".stop-status-text");

  const minutes = parseFloat(durationInput?.value);

  /* إزالة الحالات السابقة */
  card.classList.remove("stop-normal", "stop-warning", "stop-danger");

  /* =====================================================
       لا يوجد توقف
       فقط عندما تكون القيمة 0 أو فارغة
       ===================================================== */

  if (!Number.isFinite(minutes) || minutes === 0) {
    if (dot) {
      dot.style.background = "#6c757d";
    }

    if (statusText) {
      statusText.textContent = "لا يوجد توقف";
    }

    return;
  }

  /* =====================================================
       توقف مسجل
       ===================================================== */

  if (minutes > 0 && minutes < 30) {
    card.classList.add("stop-normal");

    if (dot) {
      dot.style.background = "#49b86b";
    }

    if (statusText) {
      statusText.textContent = `توقف قصير • ${minutes} دقيقة`;
    }
  } else if (minutes >= 30 && minutes < 120) {
    card.classList.add("stop-warning");

    if (dot) {
      dot.style.background = "#e7b84b";
    }

    if (statusText) {
      statusText.textContent = `يحتاج متابعة • ${minutes} دقيقة`;
    }
  } else if (minutes >= 120) {
    card.classList.add("stop-danger");

    if (dot) {
      dot.style.background = "#e45757";
    }

    if (statusText) {
      statusText.textContent = `توقف طويل • ${minutes} دقيقة`;
    }
  }
}

/* =========================================
   أزرار أسباب التوقف
========================================= */

function setStopCause(textareaId, prefix) {
  const textarea = document.getElementById(textareaId);

  if (!textarea) return;

  const current = textarea.value.trim();

  /*
       إذا كان الحقل فارغًا
       نضع التصنيف مباشرة.
    */

  if (!current) {
    textarea.value = prefix;
  } else {
    /*
       إذا كان يحتوي نصًا،
       لا نمسحه.
    */
    /*
           إذا لم يكن التصنيف موجودًا
           نضيفه في البداية.
        */

    if (!current.startsWith(prefix)) {
      textarea.value = prefix + current;
    }
  }

  textarea.focus();

  /*
       مهم جدًا:
       حتى يتعرف نظام الحفظ الحالي
       على أن قيمة الحقل تغيرت.
    */

  textarea.dispatchEvent(
    new Event("input", {
      bubbles: true,
    }),
  );
}

/* =========================================
   تحديث مؤشر موقف التعبئة
========================================= */

function updatePackagingStockVisual(type) {
  let input;
  let bar;

  if (type === "flour") {
    input = document.getElementById("flour_packaging_stock");

    bar = document.getElementById("flour_packaging_stock_bar");
  } else if (type === "bran") {
    input = document.getElementById("bran_packaging_stock");

    bar = document.getElementById("bran_packaging_stock_bar");
  }

  if (!input || !bar) {
    return;
  }

  const value = parseFloat(input.value) || 0;

  /*
       الحد المرجعي للمؤشر البصري.
       يمكن تغييره لاحقًا حسب سعة المخزن الحقيقية.
    */

  const referenceStock = 1000;

  let percentage = (value / referenceStock) * 100;

  percentage = Math.max(0, Math.min(percentage, 100));

  bar.style.width = percentage + "%";
}

/* =====================================================
   تحديث Dashboard المواد الخام - المطحنة
===================================================== */

function updateFlourRawDashboard() {
  /* =========================
       استهلاك الحنطة
    ========================= */

  const australian =
    parseFloat(document.getElementById("aus_wheat_use")?.value) || 0;

  const iraqi =
    parseFloat(document.getElementById("iraq_wheat_use")?.value) || 0;

  const russian =
    parseFloat(document.getElementById("rus_wheat_use")?.value) || 0;

  const total = australian + iraqi + russian;

  const totalElement = document.getElementById("flour_wheat_consumption_total");

  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }

  /* =========================
       أرصدة المواد الخام
    ========================= */

  updateFlourStockCard("auseti", "aus_stock_fill", "aus_stock_status");

  updateFlourStockCard("ruseti", "rus_stock_fill", "rus_stock_status");
}

/* =====================================================
   تحديث بطاقة المخزون
===================================================== */

function updateFlourStockCard(inputId, fillId, statusId) {
  const input = document.getElementById(inputId);

  const fill = document.getElementById(fillId);

  const status = document.getElementById(statusId);

  if (!input || !fill || !status) {
    return;
  }

  const value = parseFloat(input.value) || 0;

  /*
       هنا نعتبر 10000 طن مستوى مرجعي
       للمؤشر البصري فقط.

       لا يغيّر القيمة الحقيقية
       ولا يدخل في الحسابات.
    */

  const reference = 10000;

  let percentage = (value / reference) * 100;

  percentage = Math.max(0, Math.min(100, percentage));

  fill.style.width = percentage + "%";

  /* حالة المخزون */

  if (value <= 0) {
    status.textContent = "نفاد المخزون";

    status.className = "stock-status stock-empty";
  } else if (value < 1000) {
    status.textContent = "مخزون منخفض";

    status.className = "stock-status stock-low";
  } else {
    status.textContent = "متوفر";

    status.className = "stock-status stock-good";
  }
}

function toggleSeparationStation() {
  const status = document.getElementById("separation_status")?.value;

  const card = document.getElementById("separationStatusCard");
  const statusText = document.getElementById("separationStatusText");
  const statusIcon = document.getElementById("separationStatusIcon");
  const modeDisplay = document.getElementById("stationModeDisplay");

  const acidOil = document.getElementById("separation_acid_oil");
  const notes = document.getElementById("separation_notes");

  /* =====================================
     تعطيل / تفعيل حقول محطة الفصل
  ===================================== */

  const disabled = status !== "running";

  if (acidOil) {
    acidOil.disabled = disabled;
  }

  if (notes) {
    notes.disabled = disabled;
  }

  /* =====================================
     تحديث المظهر والحالة
  ===================================== */

  if (!card || !statusText || !statusIcon || !modeDisplay) {
    return;
  }

  /* إزالة الحالات السابقة */

  card.classList.remove("running", "stopped");

  /* =====================================
     المحطة بالـخدمة
  ===================================== */

  if (status === "running") {
    card.classList.add("running");

    statusIcon.textContent = "⚙️";

    statusText.textContent = "المحطة بالـخدمة";

    modeDisplay.textContent = "بالـخدمة";

    modeDisplay.style.color = "#62d989";

    modeDisplay.style.borderColor = "rgba(72,190,105,0.45)";

    modeDisplay.style.background = "rgba(40,130,70,0.15)";
  } else if (status === "stopped") {
    /* =====================================
     المحطة خارج الخدمة
  ===================================== */
    card.classList.add("stopped");

    statusIcon.textContent = "⛔";

    statusText.textContent = "المحطة خارج الخدمة";

    modeDisplay.textContent = "خارج الخدمة";

    modeDisplay.style.color = "#ff7777";

    modeDisplay.style.borderColor = "rgba(220,80,80,0.45)";

    modeDisplay.style.background = "rgba(150,45,45,0.15)";

    /* تصفير إنتاج المحطة عند إيقافها */

    if (acidOil) {
      acidOil.value = "";
    }
  } else {
    /* =====================================
     لم يتم تحديد الحالة
  ===================================== */
    statusIcon.textContent = "⚙️";

    statusText.textContent = "لم يتم تحديد الحالة";

    modeDisplay.textContent = "غير محدد";

    modeDisplay.style.color = "#b7bec2";

    modeDisplay.style.borderColor = "#586572";

    modeDisplay.style.background = "#343d47";
  }

  /* =====================================
     تحديث Dashboard
  ===================================== */

  updateSeparationDashboard();
}

function updateSeparationDashboard() {
  const acidOil = document.getElementById("separation_acid_oil")?.value;

  /*
   * هذه الدالة حالياً مخصصة لتحديث
   * واجهة محطة الفصل.
   *
   * ويمكننا لاحقاً إضافة:
   * - نسبة التشغيل
   * - مقارنة الإنتاج
   * - مؤشرات الأداء
   * - تنبيهات
   */
}

document.addEventListener("input", function (e) {
  if (e.target.matches("[data-save], input, textarea")) {
    updateSugarTankCards();
  }
});

function updateNovasepColor(input) {
  const sourceField = document.getElementById("novasep_color");

  if (!sourceField || input.disabled) {
    return;
  }

  sourceField.value = input.value;

  /* حفظ القيمة */

  if (typeof saveSalesField === "function") {
    saveSalesField("novasep_color", "sugar");
  }

  /* حفظ عام إذا كان مستخدمًا في النظام */

  sourceField.dispatchEvent(
    new Event("change", {
      bubbles: true,
    }),
  );
}

function updateNovasepDashboard() {
  const colorInput = document.getElementById("novasep_color");

  const statusInput = document.getElementById("novasep_status");

  const qualityCircle = document.getElementById("novasepQualityCircle");

  const statusCircle = document.getElementById("novasepStatusCircle");

  const statusText = document.getElementById("novasepStatusText");

  if (!colorInput || !statusInput) return;

  const color = colorInput.value.trim();

  const status = statusInput.value;

  // =================================================
  // 🔴 خارج الخدمة
  // =================================================

  if (status === "out_of_service") {
    // منع إدخال اللون
    colorInput.readOnly = true;

    // تغيير مظهر حقل اللون
    colorInput.classList.add("novasep-disabled");

    // البطاقة - ICUMSA
    if (qualityCircle) {
      qualityCircle.innerHTML = `
                <span style="font-size:16px;">
                    OFF
                </span>
            `;

      qualityCircle.classList.add("station-off");
    }

    // البطاقة - الحالة
    if (statusCircle) {
      statusCircle.innerHTML = "🔴";

      statusCircle.classList.add("station-off");
    }

    if (statusText) {
      statusText.textContent = "خارج الخدمة";
    }
  }

  // =================================================
  // 🟡 صيانة
  // =================================================
  else if (status === "maintenance") {
    // أثناء الصيانة لا نسمح بإدخال اللون
    colorInput.readOnly = true;

    colorInput.classList.add("novasep-disabled");

    // البطاقة - ICUMSA
    if (qualityCircle) {
      qualityCircle.innerHTML = `
                <span style="font-size:16px;">
                    N/A
                </span>
            `;

      qualityCircle.classList.add("station-off");
    }

    // البطاقة - الحالة
    if (statusCircle) {
      statusCircle.innerHTML = "🟡";

      statusCircle.classList.remove("station-off");
    }

    if (statusText) {
      statusText.textContent = "صيانة";
    }
  }

  // =================================================
  // 🟢 تعمل
  // =================================================
  else if (status === "running") {
    // السماح بإدخال اللون
    colorInput.readOnly = false;

    colorInput.classList.remove("novasep-disabled");

    // عرض اللون
    if (qualityCircle) {
      qualityCircle.innerHTML = color || "0";

      qualityCircle.classList.remove("station-off");
    }

    // الحالة
    if (statusCircle) {
      statusCircle.innerHTML = "🟢";

      statusCircle.classList.remove("station-off");
    }

    if (statusText) {
      statusText.textContent = "تعمل";
    }
  }

  // =================================================
  // ⚪ لم يتم اختيار الحالة
  // =================================================
  else {
    colorInput.readOnly = true;

    colorInput.classList.add("novasep-disabled");

    if (qualityCircle) {
      qualityCircle.innerHTML = "—";

      qualityCircle.classList.remove("station-off");
    }

    if (statusCircle) {
      statusCircle.innerHTML = "⚪";

      statusCircle.classList.remove("station-off");
    }

    if (statusText) {
      statusText.textContent = "غير محددة";
    }
  }
}

/* =========================================================
   🍲 COOKER DASHBOARD
   ========================================================= */

function updateCookerDashboard() {
  /* =====================================================
     قراءة القيم من الحقول الأصلية
     ===================================================== */

  const brix =
    parseFloat(document.getElementById("cooker_in_brix")?.value) || 0;

  const molassesQty =
    parseFloat(document.getElementById("molasses_qty")?.value) || 0;

  const molassesBrix =
    parseFloat(document.getElementById("molasses_brix")?.value) || 0;

  const molassesPurity =
    parseFloat(document.getElementById("molasses_purity")?.value) || 0;

  /* =====================================================
     تحديث الأرقام
     ===================================================== */

  const dashBrix = document.getElementById("dashCookerBrix");

  const dashQty = document.getElementById("dashMolassesQty");

  const dashMolassesBrix = document.getElementById("dashMolassesBrix");

  const dashPurity = document.getElementById("dashMolassesPurity");

  if (dashBrix) {
    dashBrix.textContent = brix.toFixed(1);
  }

  if (dashQty) {
    dashQty.textContent = molassesQty.toFixed(1);
  }

  if (dashMolassesBrix) {
    dashMolassesBrix.textContent = molassesBrix.toFixed(1);
  }

  if (dashPurity) {
    dashPurity.textContent = molassesPurity.toFixed(1);
  }

  /* =====================================================
     تحديث الحلقات
     ===================================================== */

  updateCookerDonut(0, brix);

  updateCookerDonut(1, molassesBrix);

  updateCookerDonut(2, molassesPurity);

  /* =====================================================
     تحديث خزان المولاس
     ===================================================== */

  updateMolassesLevel(molassesQty);
}

/* =========================================================
   DONUT UPDATE
   ========================================================= */

function updateCookerDonut(index, value) {
  const donuts = document.querySelectorAll(".cooker-donut");

  const donut = donuts[index];

  if (!donut) return;

  const progress = donut.querySelector(".donut-progress");

  if (!progress) return;

  /* منع القيم من تجاوز 0 - 100 */

  let percentage = Math.max(0, Math.min(100, Number(value) || 0));

  /*
       محيط الدائرة:
       2 × π × 48 = 301.59
    */

  const circumference = 301.59;

  const offset = circumference - (percentage / 100) * circumference;

  progress.style.strokeDashoffset = offset;

  /* اللون */

  const color = donut.dataset.color || "#38d9a9";

  progress.style.stroke = color;

  progress.style.filter = `drop-shadow(0 0 6px ${color}55)`;
}

/* =========================================================
   🍯 MOLASSES TANK
   MIN = 15 TON
   MAX = 60 TON
   ========================================================= */

function updateMolassesLevel(value) {
  const fill = document.getElementById("molassesTankFill");

  if (!fill) return;

  const MIN = 15;

  const MAX = 60;

  const qty = Number(value) || 0;

  let percentage = ((qty - MIN) / (MAX - MIN)) * 100;

  percentage = Math.max(0, Math.min(100, percentage));

  fill.style.height = percentage + "%";
}

/* =================================================
   🌡️ تحديث بطاقة محطة التجفيف
   ================================================= */

function updateDryerDashboard() {
  /* =========================================
       قراءة الحقول الأصلية
       ========================================= */

  const temp = parseFloat(document.getElementById("dryer_temp")?.value) || 0;

  const ph = parseFloat(document.getElementById("dryer_ph")?.value) || 0;

  const color = parseFloat(document.getElementById("dryer_color")?.value) || 0;

  const dust = parseFloat(document.getElementById("dryer_dust")?.value) || 0;

  const qty = parseFloat(document.getElementById("dryer_qty")?.value) || 0;

  /* =========================================
       عرض القيم
       ========================================= */

  const tempDisplay = document.getElementById("dashDryerTemp2");

  const phDisplay = document.getElementById("dashDryerPH2");

  const colorDisplay = document.getElementById("dashDryerColor");

  const dustDisplay = document.getElementById("dashDryerDust");

  const qtyDisplay = document.getElementById("dashDryerQty");

  if (tempDisplay) tempDisplay.textContent = temp;

  if (phDisplay) phDisplay.textContent = ph;

  if (colorDisplay) colorDisplay.textContent = color;

  if (dustDisplay) dustDisplay.textContent = dust;

  if (qtyDisplay) qtyDisplay.textContent = qty.toFixed(2) + " طن";

  updateSugarProductTemperature();

  /* =========================================
       تحديث الـ Donut Charts
       ========================================= */

  const donuts = document.querySelectorAll(".dryer-donut");

  donuts.forEach((donut) => {
    const source = donut.dataset.source;

    const min = parseFloat(donut.dataset.min) || 0;

    const max = parseFloat(donut.dataset.max) || 100;

    const value = parseFloat(document.getElementById(source)?.value) || 0;

    const progress = donut.querySelector(".dryer-donut-progress");

    if (!progress) return;

    /* ===============================
           حساب النسبة
           =============================== */

    let percentage = ((value - min) / (max - min)) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    /* ===============================
           محيط الدائرة
           =============================== */

    const circumference = 2 * Math.PI * 48;

    const offset = circumference - (percentage / 100) * circumference;

    progress.style.strokeDasharray = circumference;

    progress.style.strokeDashoffset = offset;

    /* ===============================
           لون الحلقة
           =============================== */

    progress.style.stroke = donut.dataset.color || "#38d9a9";

    /* ===============================
           حفظ القيمة
           =============================== */

    donut.dataset.value = value;
  });

  /* =========================================
       كمية السكر المجفف
       Range = 0 → 6000 طن
       ========================================= */

  const maxProduction = 6000;

  let productionPercentage = (qty / maxProduction) * 100;

  productionPercentage = Math.max(0, Math.min(100, productionPercentage));

  const productionFill = document.getElementById("dryerProductionFill");

  if (productionFill) {
    productionFill.style.width = productionPercentage + "%";
  }

  /* =========================================
       تحديث 0 / 6000 TON
       ========================================= */

  const productionHeader = document.querySelector(
    ".dryer-production-header > span",
  );

  if (productionHeader) {
    productionHeader.textContent = qty.toFixed(2) + " / 6000 TON";
  }
}

function updateLimeDashboard() {
  const limeField = document.getElementById("carb_lime");

  const limeValue = parseFloat(limeField?.value) || 0;

  /* =========================================
       قيمة البطاقة
       ========================================= */

  const dashboardValue = document.getElementById("dashLimeStock");

  if (dashboardValue) {
    dashboardValue.textContent = limeValue.toFixed(2);
  }

  /* =========================================
       مستوى الخزان
       ========================================= */

  const fill = document.getElementById("limeTankFill");

  if (fill) {
    /*
           عدّل MAX حسب السعة الفعلية للخزان
        */

    const maxLime = 100;

    let percentage = (limeValue / maxLime) * 100;

    percentage = Math.max(0, Math.min(100, percentage));

    fill.style.width = percentage + "%";
  }
}

function updateCarbLimeDashboard() {
  const source = document.getElementById("carb_lime");

  const dashboard = document.getElementById("dashCarbLime");

  if (!source || !dashboard) return;

  const value = parseFloat(source.value) || 0;

  dashboard.textContent = value.toFixed(2);
}

/* =========================================================
   🔄 REFRESH ALL DASHBOARDS
   تشغيل جميع مؤشرات الداشبورد بعد تحميل البيانات
   ========================================================= */

function refreshAllDashboards() {
  try {
    if (typeof updateSugarCommandCenter === "function") {
      updateSugarCommandCenter();
    }
  } catch (e) {
    console.error("Sugar Command Center:", e);
  }

  try {
    if (typeof updateSugarTankCards === "function") {
      updateSugarTankCards();
    }
  } catch (e) {
    console.error("Sugar Tank Cards:", e);
  }

  try {
    if (typeof updateSugarTank === "function") {
      updateSugarTank();
    }
  } catch (e) {
    console.error("White Sugar Tank:", e);
  }

  try {
    if (typeof updateNovasepDashboard === "function") {
      updateNovasepDashboard();
    }
  } catch (e) {
    console.error("Novasep Dashboard:", e);
  }

  try {
    if (typeof updateCookerDashboard === "function") {
      updateCookerDashboard();
    }
  } catch (e) {
    console.error("Cooker Dashboard:", e);
  }

  try {
    if (typeof updateDryerDashboard === "function") {
      updateDryerDashboard();
    }

    try {
      if (typeof updateSugarProductTemperature === "function") {
        updateSugarProductTemperature();
      }
    } catch (e) {
      console.error("Sugar Product Temperature:", e);
    }
  } catch (e) {
    console.error("Dryer Dashboard:", e);
  }

  try {
    if (typeof updateLimeDashboard === "function") {
      updateLimeDashboard();
    }
  } catch (e) {
    console.error("Lime Dashboard:", e);
  }

  try {
    if (typeof updateCarbLimeDashboard === "function") {
      updateCarbLimeDashboard();
    }
  } catch (e) {
    console.error("Carb Lime Dashboard:", e);
  }

  /* تحديث إجمالي البريكوت أولاً */
  try {
    if (typeof updatePKFBriquetteTotal === "function") {
      updatePKFBriquetteTotal();
    }
  } catch (e) {
    console.error("PKF Briquette:", e);
  }

  /* إعادة تحديث بطاقات السكر بعد الحسابات */
  try {
    if (typeof updateSugarTankCards === "function") {
      updateSugarTankCards();
    }
  } catch (e) {
    console.error("Sugar Tank Cards Final:", e);
  }
}

function toggleSugarDashboard() {
  const header = document.getElementById("sugarDashboardHeader");

  const content = document.getElementById("sugarDashboardContent");

  if (!header || !content) return;

  const isCollapsed = content.classList.toggle("collapsed");

  header.classList.toggle("collapsed", isCollapsed);

  header.setAttribute("aria-expanded", String(!isCollapsed));
}

function initializeSugarDashboard() {
  const header = document.getElementById("sugarDashboardHeader");

  const content = document.getElementById("sugarDashboardContent");

  if (!header || !content) return;

  /* البداية مفتوحة */

  content.classList.remove("collapsed");

  header.classList.remove("collapsed");

  header.setAttribute("aria-expanded", "true");
}

function updateRefineryProductionVisuals() {
  /* =====================================
     خط التكرير 2
     الطاقة القصوى = 1500 طن
  ===================================== */

  const refinery2 =
    parseFloat(document.getElementById("refinery2")?.value) || 0;

  const maxCapacity = 1500;

  const progress = Math.min(Math.max(refinery2 / maxCapacity, 0), 1) * 100;

  const progressBar = document.getElementById("refinery2ProgressBar");

  const progressPercent = document.getElementById("refinery2ProgressPercent");

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }

  if (progressPercent) {
    progressPercent.textContent = progress.toFixed(0) + "%";
  }

  /* حالة الإنتاج */

  const status = document.getElementById("refinery2ProductionStatus");

  const statusText = document.getElementById("refinery2ProductionStatusText");

  if (statusText) {
    if (refinery2 <= 0) {
      statusText.textContent = "لا يوجد إنتاج";
    } else if (refinery2 < 500) {
      statusText.textContent = "إنتاج منخفض";
    } else if (refinery2 < 1000) {
      statusText.textContent = "إنتاج متوسط";
    } else if (refinery2 < 1350) {
      statusText.textContent = "إنتاج جيد";
    } else if (refinery2 <= 1500) {
      statusText.textContent = "إنتاج مرتفع";
    } else {
      statusText.textContent = "تجاوز الطاقة التصميمية";
    }
  }

  /* =====================================
     إجمالي الخطين
  ===================================== */

  const refinery1 =
    parseFloat(document.getElementById("refinery1")?.value) || 0;

  const grandTotal = refinery1 + refinery2;

  const grandCapacity = 3000;

  const grandProgress =
    Math.min(Math.max(grandTotal / grandCapacity, 0), 1) * 100;

  const grandBar = document.getElementById("refineryGrandTotalBar");

  const grandStatus = document.getElementById("refineryGrandTotalStatus");

  if (grandBar) {
    grandBar.style.width = grandProgress + "%";
  }

  if (grandStatus) {
    grandStatus.textContent =
      grandProgress.toFixed(1) + "% من الطاقة الإجمالية";
  }
}

async function loadRefineryProductionComparison() {
  const dateElement = document.getElementById("reportDateKey");

  if (!dateElement?.value) return;

  const currentDate = dateElement.value;

  const factory = "oil";

  /* =====================================
     الحقول التي تدخل في الإنتاج
  ===================================== */

  const productionFields = [
    "refinery1_sunflower",
    "refinery1_olein",
    "refinery1_ghee",
    "refinery1_stearin",
    "refinery1_shortening",
    "refinery2",
  ];

  /* =====================================
     حساب التواريخ
  ===================================== */

  const dates = [];

  const baseDate = new Date(currentDate + "T00:00:00");

  for (let i = 3; i >= 0; i--) {
    const date = new Date(baseDate);

    date.setDate(baseDate.getDate() - i);

    const dateString =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");

    dates.push(dateString);
  }

  /* =====================================
     جلب البيانات
  ===================================== */

  const { data, error } = await supabaseClient
    .from("daily_reports")
    .select("report_date,field_name,field_value")
    .eq("factory", factory)
    .in("report_date", dates)
    .in("field_name", productionFields);

  if (error) {
    console.error("REFINERY COMPARISON ERROR:", error);

    return;
  }

  /* =====================================
     إنشاء مجموع لكل يوم
  ===================================== */

  const dailyTotals = {};

  dates.forEach((date) => {
    dailyTotals[date] = 0;
  });

  (data || []).forEach((row) => {
    if (!dailyTotals.hasOwnProperty(row.report_date)) {
      return;
    }

    const value = parseFloat(row.field_value) || 0;

    dailyTotals[row.report_date] += value;
  });

  /* =====================================
     بيانات اليوم
  ===================================== */

  const todayTotal = dailyTotals[currentDate] || 0;

  /* =====================================
     الأيام الثلاثة السابقة
  ===================================== */

  const previousDates = dates.filter((date) => date !== currentDate);

  const previousValues = previousDates.map((date) => dailyTotals[date] || 0);

  const average = previousValues.length
    ? previousValues.reduce((sum, value) => sum + value, 0) /
      previousValues.length
    : 0;

  /* =====================================
     نسبة الفرق
  ===================================== */

  let differencePercent = 0;

  if (average > 0) {
    differencePercent = ((todayTotal - average) / average) * 100;
  }

  /* =====================================
     تحديث الملخص
  ===================================== */

  const todayElement = document.getElementById("refineryComparisonToday");

  const averageElement = document.getElementById("refineryComparisonAverage");

  if (todayElement) {
    todayElement.textContent = todayTotal.toFixed(2);
  }

  if (averageElement) {
    averageElement.textContent = average.toFixed(2);
  }

  /* =====================================
     مؤشر المقارنة
  ===================================== */

  const indicator = document.getElementById("refineryComparisonIndicator");

  const arrow = document.getElementById("refineryComparisonArrow");

  const percent = document.getElementById("refineryComparisonPercent");

  const text = document.getElementById("refineryComparisonText");

  if (indicator) {
    indicator.classList.remove("positive", "negative", "neutral");

    if (average <= 0) {
      indicator.classList.add("neutral");

      if (arrow) arrow.textContent = "●";

      if (percent) percent.textContent = "—";

      if (text) {
        text.textContent = "لا توجد بيانات كافية";
      }
    } else if (todayTotal > average) {
      indicator.classList.add("positive");

      if (arrow) arrow.textContent = "↑";

      if (percent) {
        percent.textContent = "+" + differencePercent.toFixed(1) + "%";
      }

      if (text) {
        text.textContent = "أعلى من متوسط آخر 3 أيام";
      }
    } else if (todayTotal < average) {
      indicator.classList.add("negative");

      if (arrow) arrow.textContent = "↓";

      if (percent) {
        percent.textContent = differencePercent.toFixed(1) + "%";
      }

      if (text) {
        text.textContent = "أقل من متوسط آخر 3 أيام";
      }
    } else {
      indicator.classList.add("neutral");

      if (arrow) arrow.textContent = "→";

      if (percent) percent.textContent = "0%";

      if (text) {
        text.textContent = "مطابق لمتوسط آخر 3 أيام";
      }
    }
  }

  /* =====================================
     رسم الأعمدة
  ===================================== */

  renderRefineryComparisonChart(dates, dailyTotals, currentDate);
}

function renderRefineryComparisonChart(dates, dailyTotals, currentDate) {
  const container = document.getElementById("refineryComparisonBars");

  if (!container) return;

  container.innerHTML = "";

  /* =====================================
     أعلى قيمة للمخطط
  ===================================== */

  const values = dates.map((date) => dailyTotals[date] || 0);

  const maxValue = Math.max(1500, ...values);

  const maxLabel = document.getElementById("chartMaxLabel");

  if (maxLabel) {
    maxLabel.textContent = Math.ceil(maxValue / 500) * 500;
  }

  const chartMax = Math.max(1500, Math.ceil(maxValue / 500) * 500);

  /* =====================================
     إنشاء الأعمدة
  ===================================== */

  dates.forEach((date) => {
    const value = dailyTotals[date] || 0;

    const column = document.createElement("div");

    column.className = "comparison-bar-column";

    if (date === currentDate) {
      column.classList.add("today");
    }

    const valueLabel = document.createElement("div");

    valueLabel.className = "comparison-bar-value";

    valueLabel.textContent = value.toFixed(0);

    const bar = document.createElement("div");

    bar.className = "comparison-bar";

    if (date === currentDate) {
      bar.classList.add("today");
    }

    const height = value > 0 ? Math.max((value / chartMax) * 100, 2) : 2;

    bar.style.height = height + "%";

    const dateLabel = document.createElement("div");

    dateLabel.className = "comparison-bar-date";

    const d = new Date(date + "T00:00:00");

    if (date === currentDate) {
      dateLabel.textContent = "اليوم";
    } else {
      dateLabel.textContent =
        String(d.getDate()).padStart(2, "0") +
        "/" +
        String(d.getMonth() + 1).padStart(2, "0");
    }

    column.appendChild(valueLabel);

    column.appendChild(bar);

    column.appendChild(dateLabel);

    container.appendChild(column);
  });
}

function updateRefinery2Visual(value) {
  const MAX = 1500;

  value = parseFloat(value) || 0;

  /* =====================================
       حساب النسبة
    ===================================== */

  const percentage = (value / MAX) * 100;

  const visualPercentage = Math.min(Math.max(percentage, 0), 100);

  /* =====================================
       الرقم الحالي
    ===================================== */

  const display = document.getElementById("refinery2Display");

  if (display) {
    display.textContent = value.toFixed(2);
  }

  /* =====================================
       النسبة
    ===================================== */

  const percent = document.getElementById("refinery2ProgressPercent");

  if (percent) {
    percent.textContent = percentage.toFixed(0) + "%";
  }

  /* =====================================
       شريط الإنتاج
    ===================================== */

  const progress = document.getElementById("refinery2ProgressBar");

  if (progress) {
    progress.style.setProperty("width", visualPercentage + "%", "important");

    progress.style.setProperty("display", "block", "important");
  }
}

function updatePlasticProductionDashboard() {
  const lines = [
    {
      name: "الأمبولة 1",
      qty: "plastic_bottle1_qty",
      eff: "plastic_bottle1_eff",
      missing: "plastic_bottle1_missing",
      stop: "plastic_bottle1_stop",

      cardQty: "plasticBottle1CardQty",
      ring: "plasticBottle1Ring",
      ringValue: "plasticBottle1RingValue",
      bar: "plasticBottle1Bar",
      stopCard: "plasticBottle1StopCard",
      missingCard: "plasticBottle1MissingCard",
    },

    {
      name: "الأمبولة 2",
      qty: "plastic_bottle2_qty",
      eff: "plastic_bottle2_eff",
      missing: "plastic_bottle2_missing",
      stop: "plastic_bottle2_stop",

      cardQty: "plasticBottle2CardQty",
      ring: "plasticBottle2Ring",
      ringValue: "plasticBottle2RingValue",
      bar: "plasticBottle2Bar",
      stopCard: "plasticBottle2StopCard",
      missingCard: "plasticBottle2MissingCard",
    },

    {
      name: "Spout 1",
      qty: "plastic_spout1_qty",
      eff: "plastic_spout1_eff",
      missing: "plastic_spout1_missing",
      stop: "plastic_spout1_stop",

      cardQty: "plasticSpout1CardQty",
      ring: "plasticSpout1Ring",
      ringValue: "plasticSpout1RingValue",
      bar: "plasticSpout1Bar",
      stopCard: "plasticSpout1StopCard",
      missingCard: "plasticSpout1MissingCard",
    },

    {
      name: "Spout 2",
      qty: "plastic_spout2_qty",
      eff: "plastic_spout2_eff",
      missing: "plastic_spout2_missing",
      stop: "plastic_spout2_stop",

      cardQty: "plasticSpout2CardQty",
      ring: "plasticSpout2Ring",
      ringValue: "plasticSpout2RingValue",
      bar: "plasticSpout2Bar",
      stopCard: "plasticSpout2StopCard",
      missingCard: "plasticSpout2MissingCard",
    },

    {
      name: "CAP",
      qty: "plastic_cap_qty",
      eff: "plastic_cap_eff",
      missing: "plastic_cap_missing",
      stop: "plastic_cap_stop",

      cardQty: "plasticCapCardQty",
      ring: "plasticCapRing",
      ringValue: "plasticCapRingValue",
      bar: "plasticCapBar",
      stopCard: "plasticCapStopCard",
      missingCard: "plasticCapMissingCard",
    },
  ];

  let totalProduction = 0;

  let totalEfficiency = 0;

  let efficiencyCount = 0;

  let totalDowntime = 0;

  let bestLine = null;

  lines.forEach((line) => {
    const qty = parseFloat(document.getElementById(line.qty)?.value) || 0;

    const eff = parseFloat(document.getElementById(line.eff)?.value) || 0;

    const missing =
      parseFloat(document.getElementById(line.missing)?.value) || 0;

    const stop = parseFloat(document.getElementById(line.stop)?.value) || 0;

    totalProduction += qty;

    totalDowntime += stop;

    if (eff > 0) {
      totalEfficiency += eff;

      efficiencyCount++;
    }

    if (!bestLine || eff > bestLine.eff) {
      if (eff > 0) {
        bestLine = {
          name: line.name,
          eff: eff,
        };
      }
    }

    /* =========================
       بطاقة الخط
    ========================= */

    const cardQty = document.getElementById(line.cardQty);

    if (cardQty) {
      cardQty.textContent = formatPlasticNumber(qty);
    }

    const ring = document.getElementById(line.ring);

    const ringValue = document.getElementById(line.ringValue);

    const safeEff = Math.max(0, Math.min(eff, 100));

    if (ring) {
      ring.style.setProperty("--eff", safeEff + "%");
    }

    if (ringValue) {
      ringValue.textContent = safeEff.toFixed(0) + "%";
    }

    const bar = document.getElementById(line.bar);

    if (bar) {
      bar.style.width = safeEff + "%";
    }

    const stopCard = document.getElementById(line.stopCard);

    if (stopCard) {
      stopCard.textContent = formatPlasticNumber(stop);
    }

    const missingCard = document.getElementById(line.missingCard);

    if (missingCard) {
      missingCard.textContent = formatPlasticNumber(missing);
    }
  });

  /* =================================================
     إجمالي الإنتاج
  ================================================= */

  const totalElement = document.getElementById("plasticTotalProduction");

  if (totalElement) {
    totalElement.textContent = formatPlasticNumber(totalProduction);
  }

  /* =================================================
     متوسط الكفاءة
  ================================================= */

  const averageEfficiency =
    efficiencyCount > 0 ? totalEfficiency / efficiencyCount : 0;

  const averageElement = document.getElementById("plasticAverageEfficiency");

  if (averageElement) {
    averageElement.textContent = averageEfficiency.toFixed(1) + "%";
  }

  /* =================================================
     إجمالي التوقف
  ================================================= */

  const downtimeElement = document.getElementById("plasticTotalDowntime");

  if (downtimeElement) {
    downtimeElement.textContent = formatPlasticNumber(totalDowntime);
  }

  /* =================================================
     أفضل خط
  ================================================= */

  const bestLineElement = document.getElementById("plasticBestLine");

  const bestLineEfficiency = document.getElementById(
    "plasticBestLineEfficiency",
  );

  if (bestLine) {
    if (bestLineElement) {
      bestLineElement.textContent = bestLine.name;
    }

    if (bestLineEfficiency) {
      bestLineEfficiency.textContent = "كفاءة " + bestLine.eff.toFixed(1) + "%";
    }
  } else {
    if (bestLineElement) {
      bestLineElement.textContent = "—";
    }

    if (bestLineEfficiency) {
      bestLineEfficiency.textContent = "لا توجد بيانات";
    }
  }
}

/* =========================================================
   تنسيق الأرقام
   ========================================================= */

function formatPlasticNumber(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function setPlasticProductionDetailsByRole(role) {
  const details = document.getElementById("plasticProductionDetails");

  if (!details) return;

  if (role === "admin" || role === "executive") {
    details.open = false;
    return;
  }

  if (role === "plastic") {
    details.open = true;
    return;
  }

  details.open = false;
}

/* =========================================================
   أهداف خطوط التعبئة
   عدّل هذه الأرقام لاحقًا حسب أهدافك الفعلية
========================================================= */

const packingTargets = {
  krones1: 40000,

  krones2: 40000,

  krones3: 40000,

  gea: 20000,

  runo: 30000,
};

/* =========================================================
   قراءة رقم بأمان
========================================================= */

function packingNumber(id) {
  return parseFloat(document.getElementById(id)?.value) || 0;
}

/* =========================================================
   تحديث لوحة التعبئة
========================================================= */

function updatePackingDashboard() {
  /* =======================================================
     كرونس
  ======================================================= */

  const krones1 =
    packingNumber("krones1a") +
    packingNumber("krones1b") +
    packingNumber("krones1c");

  const krones2 =
    packingNumber("krones2a") +
    packingNumber("krones2b") +
    packingNumber("krones2c");

  const krones3 =
    packingNumber("krones3a") +
    packingNumber("krones3b") +
    packingNumber("krones3c");

  /* =======================================================
     السمنة
  ======================================================= */

  const gea =
    packingNumber("geaa") + packingNumber("geab") + packingNumber("geac");

  /* =======================================================
     الرونو
  ======================================================= */

  const runo =
    packingNumber("shorta") + packingNumber("shortb") + packingNumber("shortc");

  /* =======================================================
     إجمالي الخطوط
  ======================================================= */

  const grandTotal = krones1 + krones2 + krones3 + gea + runo;

  /* =======================================================
     تحديث إجماليات الخطوط
  ======================================================= */

  setPackingText("krones1Total", krones1);
  setPackingText("krones2Total", krones2);
  setPackingText("krones3Total", krones3);

  setPackingText("geaTotal", gea);
  setPackingText("runoTotal", runo);

  /* =======================================================
     الأهداف
  ======================================================= */

  updatePackingTarget("krones1", krones1);

  updatePackingTarget("krones2", krones2);

  updatePackingTarget("krones3", krones3);

  updatePackingTarget("gea", gea);

  updatePackingTarget("runo", runo);

  /* =======================================================
     إجمالي التعبئة
  ======================================================= */

  setPackingText("packingGrandTotal", grandTotal);

  setPackingText("packingGrandTotalLarge", grandTotal);

  updateKronesProductionSummary();

  /* =======================================================
     الخطوط ذات الإنتاج
  ======================================================= */

  const lines = [
    {
      name: "كرونس 1",
      value: krones1,
      status: "krones1Status",
    },

    {
      name: "كرونس 2",
      value: krones2,
      status: "krones2Status",
    },

    {
      name: "كرونس 3",
      value: krones3,
      status: "krones3Status",
    },

    {
      name: "خط السمنة",
      value: gea,
      status: "geaStatus",
    },

    {
      name: "خط الرونو",
      value: runo,
      status: "runoStatus",
    },
  ];

  const activeLines = lines.filter((line) => line.value > 0).length;

  setPackingText("packingActiveLines", activeLines);

  /* =======================================================
     أعلى خط
  ======================================================= */

  const topLine = [...lines].sort((a, b) => b.value - a.value)[0];

  if (topLine && topLine.value > 0) {
    setPackingText("packingTopLine", topLine.name);

    setPackingText(
      "packingTopLineValue",
      formatPackingNumber(topLine.value) + " وحدة",
    );
  } else {
    setPackingText("packingTopLine", "—");

    setPackingText("packingTopLineValue", "0 وحدة");
  }

  /* =======================================================
     إجمالي شفتات كرونس فقط
  ======================================================= */

  const morning =
    packingNumber("krones1a") +
    packingNumber("krones2a") +
    packingNumber("krones3a");

  const evening =
    packingNumber("krones1b") +
    packingNumber("krones2b") +
    packingNumber("krones3b");

  const night =
    packingNumber("krones1c") +
    packingNumber("krones2c") +
    packingNumber("krones3c");

  setPackingText("kronesMorningTotal", morning);

  setPackingText("kronesEveningTotal", evening);

  setPackingText("kronesNightTotal", night);

  /* =======================================================
     حفظ الإجمالي في الحقل الأصلي إن وجد
  ======================================================= */

  const packingTotalField = document.getElementById("packing_total");

  if (packingTotalField) {
    packingTotalField.value = grandTotal.toFixed(2);
  }

  /* =======================================================
     تشغيل نظامك الحالي
  ======================================================= */

  if (typeof updateDashboard === "function") {
    updateDashboard();
  }
}

/* =========================================================
   تحديث الهدف
========================================================= */

function updatePackingTarget(line, value) {
  const target = packingTargets[line] || 0;

  if (!target) return;

  const percent = (value / target) * 100;

  const displayPercent = Math.min(percent, 100);

  setPackingText(line + "TargetPercent", percent.toFixed(1) + "%");

  setPackingText(line + "TargetValue", formatPackingNumber(target));

  const bar = document.getElementById(line + "Progress");

  if (bar) {
    bar.style.width = displayPercent + "%";
  }

  /* =======================================================
     حالة الخط
  ======================================================= */

  const status = document.getElementById(
    line === "gea"
      ? "geaStatus"
      : line === "runo"
        ? "runoStatus"
        : line + "Status",
  );

  if (!status) return;

  if (value <= 0) {
    status.style.background = "#666";

    status.style.boxShadow = "0 0 0 4px rgba(255,255,255,.025)";
  } else if (percent < 70) {
    status.style.background = "#e5a93d";

    status.style.boxShadow = "0 0 0 4px rgba(229,169,61,.10)";
  } else {
    status.style.background = "#62d989";

    status.style.boxShadow = "0 0 0 4px rgba(98,217,137,.10)";
  }
}

/* =========================================================
   أدوات
========================================================= */

function setPackingText(id, value) {
  const element = document.getElementById(id);

  if (!element) return;

  element.textContent = formatPackingNumber(value);
}

function formatPackingNumber(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

function updateKronesProductionSummary() {
  const morning =
    (parseFloat(document.getElementById("krones1a")?.value) || 0) +
    (parseFloat(document.getElementById("krones2a")?.value) || 0) +
    (parseFloat(document.getElementById("krones3a")?.value) || 0);

  const evening =
    (parseFloat(document.getElementById("krones1b")?.value) || 0) +
    (parseFloat(document.getElementById("krones2b")?.value) || 0) +
    (parseFloat(document.getElementById("krones3b")?.value) || 0);

  const night =
    (parseFloat(document.getElementById("krones1c")?.value) || 0) +
    (parseFloat(document.getElementById("krones2c")?.value) || 0) +
    (parseFloat(document.getElementById("krones3c")?.value) || 0);

  const dailyTotal = morning + evening + night;

  const morningElement = document.getElementById("kronesMorningTotal");

  const eveningElement = document.getElementById("kronesEveningTotal");

  const nightElement = document.getElementById("kronesNightTotal");

  const dailyElement = document.getElementById("kronesDailyTotal");

  if (morningElement) {
    morningElement.textContent = morning.toLocaleString("en-US");
  }

  if (eveningElement) {
    eveningElement.textContent = evening.toLocaleString("en-US");
  }

  if (nightElement) {
    nightElement.textContent = night.toLocaleString("en-US");
  }

  if (dailyElement) {
    dailyElement.textContent = dailyTotal.toLocaleString("en-US");
  }
}

function toggleSalesDashboard() {
  const content = document.getElementById("salesDashboardContent");

  const header = document.querySelector(".sales-command-header");

  const chevron = document.getElementById("salesDashboardChevron");

  if (!content || !header) return;

  const isCollapsed = content.classList.contains("collapsed");

  if (isCollapsed) {
    content.classList.remove("collapsed");

    header.classList.remove("collapsed");

    header.setAttribute("aria-expanded", "true");

    if (chevron) {
      chevron.textContent = "▼";
    }
  } else {
    content.classList.add("collapsed");

    header.classList.add("collapsed");

    header.setAttribute("aria-expanded", "false");

    if (chevron) {
      chevron.textContent = "◀";
    }
  }
}

/* =========================================================
   POWER DASHBOARD COLLAPSE
   ========================================================= */

function togglePowerDashboard() {
  const content = document.getElementById("powerDashboardContent");

  const header = document.querySelector(".power-command-header");

  const chevron = document.getElementById("powerDashboardChevron");

  if (!content || !header) return;

  const collapsed = content.classList.contains("collapsed");

  if (collapsed) {
    content.classList.remove("collapsed");
    header.classList.remove("collapsed");

    header.setAttribute("aria-expanded", "true");

    if (chevron) {
      chevron.textContent = "▼";
    }
  } else {
    content.classList.add("collapsed");
    header.classList.add("collapsed");

    header.setAttribute("aria-expanded", "false");

    if (chevron) {
      chevron.textContent = "◀";
    }
  }
}

/* =========================================================
   BLACK OIL TOTAL VISUAL
   ========================================================= */

/* =========================================================
   ELECTRICAL LOAD VISUAL
   ========================================================= */

function updateElectricalLoadVisual() {
  const minField = document.getElementById("min_electrical_load");

  const maxField = document.getElementById("max_electrical_load");

  const range = document.getElementById("electricalLoadRange");

  if (!minField || !maxField || !range) {
    return;
  }

  const min = Number(minField.value) || 0;

  const max = Number(maxField.value) || 0;

  if (max <= 0) {
    range.style.width = "0%";
    return;
  }

  const ratio = Math.max(0, Math.min(min / max, 1));

  range.style.width = `${ratio * 100}%`;
}

/* =========================================================
   POWER DASHBOARD VISUAL REFRESH
   ========================================================= */

function refreshPowerDashboardVisuals() {
  try {
    updateBlackOilTotalVisual();
  } catch (e) {
    console.warn("Black oil visual update failed:", e);
  }

  try {
    updateElectricalLoadVisual();
  } catch (e) {
    console.warn("Electrical load visual update failed:", e);
  }
}

/* =========================================================
   FLOUR MILL — COMMAND CENTER
========================================================= */

function toggleFlourDashboard() {
  const content = document.getElementById("flourDashboardContent");
  const header = document.querySelector(".flour-command-header");
  const button = document.querySelector(".flour-command-toggle");

  if (!content || !header) return;

  const collapsed = content.classList.toggle("collapsed");

  header.classList.toggle("collapsed", collapsed);

  if (button) {
    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
  }
}

function updateFlourDashboardKPIs() {
  /* =========================================
     استهلاك الحنطة اليومي
     المصدر الحقيقي = الحقول الأصلية
     ========================================= */

  const australian =
    Number(document.getElementById("aus_wheat_use")?.value) || 0;

  const iraqi = Number(document.getElementById("iraq_wheat_use")?.value) || 0;

  const russian = Number(document.getElementById("rus_wheat_use")?.value) || 0;

  const wheatTotal = australian + iraqi + russian;

  /* =========================================
     تحديث الإجمالي الأصلي
     ========================================= */

  const originalTotal = document.getElementById(
    "flour_wheat_consumption_total",
  );

  if (originalTotal) {
    originalTotal.textContent = wheatTotal.toFixed(2);
  }

  /* =========================================
     الإنتاج الكلي
     ========================================= */

  const production =
    Number(document.getElementById("flour_grand_total")?.value) || 0;

  /* =========================================
     كفاءة الاستخراج
     ========================================= */

  const efficiency =
    Number(document.getElementById("extraction_eff")?.value) || 0;

  /* =========================================
     إجمالي إنتاج التعبئة
     = الطحين + النخالة
     ========================================= */

  const flourPackaging =
    Number(document.getElementById("flour_packaging_stock")?.value) || 0;

  const branPackaging =
    Number(document.getElementById("bran_packaging_stock")?.value) || 0;

  const totalPackaging = flourPackaging + branPackaging;

  /* =========================================
     تحديث بطاقات الـDashboard
     ========================================= */

  const wheatEl = document.getElementById("flourDashConsumption");

  const productionEl = document.getElementById("flourDashProduction");

  const efficiencyEl = document.getElementById("flourDashEfficiency");

  const packagingEl = document.getElementById("flourDashStock");

  if (wheatEl) {
    wheatEl.textContent = wheatTotal.toFixed(2);
  }

  if (productionEl) {
    productionEl.textContent = production.toFixed(2);
  }

  if (efficiencyEl) {
    efficiencyEl.textContent = efficiency.toFixed(2);
  }

  if (packagingEl) {
    packagingEl.textContent = totalPackaging.toFixed(2);
  }
}

/* =========================
   تحديث مزيج الإنتاج
========================= */

function updateFlourDashboardOutput() {
  const f1 = Number(document.getElementById("flour_total_f1")?.value) || 0;

  const f3 = Number(document.getElementById("flour_total_f3")?.value) || 0;

  const bran = Number(document.getElementById("flour_total_wbran")?.value) || 0;

  const total = f1 + f3 + bran;

  const f1El = document.getElementById("flourDashF1");
  const f3El = document.getElementById("flourDashF3");
  const branEl = document.getElementById("flourDashBran");

  if (f1El) f1El.textContent = `${f1.toFixed(2)} طن`;
  if (f3El) f3El.textContent = `${f3.toFixed(2)} طن`;
  if (branEl) branEl.textContent = `${bran.toFixed(2)} طن`;

  const f1Bar = document.getElementById("flourDashF1Bar");
  const f3Bar = document.getElementById("flourDashF3Bar");
  const branBar = document.getElementById("flourDashBranBar");

  if (f1Bar) {
    f1Bar.style.width =
      total > 0 ? `${Math.min((f1 / total) * 100, 100)}%` : "0%";
  }

  if (f3Bar) {
    f3Bar.style.width =
      total > 0 ? `${Math.min((f3 / total) * 100, 100)}%` : "0%";
  }

  if (branBar) {
    branBar.style.width =
      total > 0 ? `${Math.min((bran / total) * 100, 100)}%` : "0%";
  }
}

/* =========================
   تحديث أرصدة الحنطة
========================= */

function updateFlourDashboardStock() {
  const aus = Number(document.getElementById("auseti")?.value) || 0;

  const rus = Number(document.getElementById("ruseti")?.value) || 0;

  const total = aus + rus;

  const ausEl = document.getElementById("flourDashAusStock");

  const rusEl = document.getElementById("flourDashRusStock");

  if (ausEl) {
    ausEl.textContent = `${aus.toFixed(2)} طن`;
  }

  if (rusEl) {
    rusEl.textContent = `${rus.toFixed(2)} طن`;
  }

  const ausBar = document.getElementById("flourDashAusStockBar");

  const rusBar = document.getElementById("flourDashRusStockBar");

  if (ausBar) {
    ausBar.style.width =
      total > 0 ? `${Math.min((aus / total) * 100, 100)}%` : "0%";
  }

  if (rusBar) {
    rusBar.style.width =
      total > 0 ? `${Math.min((rus / total) * 100, 100)}%` : "0%";
  }
}

/* =========================
   تحديث لوحة المطحنة كاملة
========================= */

function refreshFlourDashboard() {
  updateFlourDashboardKPIs();
  updateFlourDashboardOutput();
  updateFlourDashboardStock();
}

/* =========================
   التهيئة
========================= */

function initializeFlourDashboard() {
  const content = document.getElementById("flourDashboardContent");

  const header = document.querySelector(".flour-command-header");

  if (!content || !header) return;

  /* Dashboard مفتوح افتراضيًا */
  content.classList.remove("collapsed");
  header.classList.remove("collapsed");

  refreshFlourDashboard();
}

/* =========================================================
   FLOUR — RAW MATERIAL CONSUMPTION DASHBOARD
========================================================= */

function updateFlourRawDashboard() {
  const aus = Number(document.getElementById("aus_wheat_use")?.value) || 0;

  const iraq = Number(document.getElementById("iraq_wheat_use")?.value) || 0;

  const rus = Number(document.getElementById("rus_wheat_use")?.value) || 0;

  const total = aus + iraq + rus;

  /* =========================
     الإجمالي الأصلي للنظام
  ========================== */

  const originalTotal = document.getElementById(
    "flour_wheat_consumption_total",
  );

  if (originalTotal) {
    /*
      الحقل قد يكون input أو span
    */

    if ("value" in originalTotal) {
      originalTotal.value = total.toFixed(2);
    } else {
      originalTotal.textContent = total.toFixed(2);
    }
  }

  /* =========================
     Dashboard total
  ========================== */

  const dashboardTotal = document.getElementById("flourRawDashboardTotal");

  if (dashboardTotal) {
    dashboardTotal.textContent = total.toFixed(2);
  }

  /* =========================
     نسب الأنواع
  ========================== */

  const ausBar = document.getElementById("flourRawAusBar");

  const iraqBar = document.getElementById("flourRawIraqBar");

  const rusBar = document.getElementById("flourRawRusBar");

  if (ausBar) {
    ausBar.style.width =
      total > 0 ? `${Math.min((aus / total) * 100, 100)}%` : "0%";
  }

  if (iraqBar) {
    iraqBar.style.width =
      total > 0 ? `${Math.min((iraq / total) * 100, 100)}%` : "0%";
  }

  if (rusBar) {
    rusBar.style.width =
      total > 0 ? `${Math.min((rus / total) * 100, 100)}%` : "0%";
  }

  /*
    تحديث لوحة الـ Command Center
  */

  if (typeof refreshFlourDashboard === "function") {
    refreshFlourDashboard();
  }
}

/* =========================================================
   FLOUR — RAW MATERIAL STOCK DASHBOARD
========================================================= */

function updateFlourStockDashboard() {
  const aus = Number(document.getElementById("auseti")?.value) || 0;

  const iraq = Number(document.getElementById("iraqeti")?.value) || 0;

  const rus = Number(document.getElementById("ruseti")?.value) || 0;

  const total = aus + iraq + rus;

  /* =========================
     إجمالي المخزون
  ========================== */

  const totalEl = document.getElementById("flourStockDashboardTotal");

  if (totalEl) {
    totalEl.textContent = total.toFixed(2);
  }

  /* =========================
     نسب المخزون
     مقارنة بين الأنواع الثلاثة
  ========================== */

  const ausPercent = total > 0 ? (aus / total) * 100 : 0;

  const iraqPercent = total > 0 ? (iraq / total) * 100 : 0;

  const rusPercent = total > 0 ? (rus / total) * 100 : 0;

  /* =========================
     الأشرطة
  ========================== */

  const ausBar = document.getElementById("aus_stock_fill");

  const iraqBar = document.getElementById("iraq_stock_fill");

  const rusBar = document.getElementById("rus_stock_fill");

  if (ausBar) {
    ausBar.style.width = `${Math.min(ausPercent, 100)}%`;
  }

  if (iraqBar) {
    iraqBar.style.width = `${Math.min(iraqPercent, 100)}%`;
  }

  if (rusBar) {
    rusBar.style.width = `${Math.min(rusPercent, 100)}%`;
  }

  /* =========================
     النسب الرقمية
  ========================== */

  const ausPercentEl = document.getElementById("flourAusStockPercent");

  const iraqPercentEl = document.getElementById("flourIraqStockPercent");

  const rusPercentEl = document.getElementById("flourRusStockPercent");

  if (ausPercentEl) {
    ausPercentEl.textContent = `${ausPercent.toFixed(0)}%`;
  }

  if (iraqPercentEl) {
    iraqPercentEl.textContent = `${iraqPercent.toFixed(0)}%`;
  }

  if (rusPercentEl) {
    rusPercentEl.textContent = `${rusPercent.toFixed(0)}%`;
  }

  /* =========================
     حالات المخزون
  ========================== */

  updateFlourStockStatus("aus_stock_status", aus);

  updateFlourStockStatus("iraq_stock_status", iraq);

  updateFlourStockStatus("rus_stock_status", rus);

  /* =========================
     تحديث Dashboard الرئيسي
  ========================== */

  if (typeof refreshFlourDashboard === "function") {
    refreshFlourDashboard();
  }
}

/* =========================================================
   حالة المخزون
========================================================= */

function updateFlourStockStatus(elementId, value) {
  const el = document.getElementById(elementId);

  if (!el) return;

  if (value <= 0) {
    el.textContent = "نفاد المخزون";

    el.style.background = "rgba(220,53,69,.13)";

    el.style.borderColor = "rgba(220,53,69,.20)";

    el.style.color = "#ff8f9a";
  } else {
    el.textContent = "متوفر";

    el.style.background = "rgba(75,190,125,.12)";

    el.style.borderColor = "rgba(75,190,125,.15)";

    el.style.color = "#8ee0b2";
  }
}

/* =========================================================
   FLOUR — AUTOMATIC EXTRACTION EFFICIENCY
   ========================================================= */

function updateFlourExtractionEfficiency() {
  /* =========================
       إجمالي F1
       ========================= */

  const f1 = Number(document.getElementById("flour_total_f1")?.value) || 0;

  /* =========================
       الحنطة المطحونة
       ========================= */

  const groundWheat =
    Number(document.getElementById("flour_total_ground_wheat")?.value) || 0;

  /* =========================
       الحساب
       F1 ÷ الحنطة المطحونة × 100
       ========================= */

  let efficiency = 0;

  if (groundWheat > 0) {
    efficiency = (f1 / groundWheat) * 100;
  }

  /* =========================
       حماية
       ========================= */

  efficiency = Math.max(0, Math.min(efficiency, 100));

  /* =========================
       حفظ القيمة في الحقل الأصلي
       ========================= */

  const originalField = document.getElementById("extraction_eff");

  if (originalField) {
    originalField.value = efficiency.toFixed(2);
  }

  /* =========================
       الرقم داخل الحلقة
       ========================= */

  const display = document.getElementById("extractionEfficiencyDisplay");

  if (display) {
    display.textContent = efficiency.toFixed(2);
  }

  /* =========================
       تحريك الحلقة
       ========================= */

  const ring = document.getElementById("extractionRingProgress");

  if (ring) {
    const radius = 48;

    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (efficiency / 100) * circumference;

    ring.style.strokeDasharray = circumference;

    ring.style.strokeDashoffset = offset;
  }

  /* =========================
       تحديث Dashboard العلوي
       ========================= */

  const dashboardDisplay = document.getElementById(
    "flourDashboardExtractionEfficiencyDisplay",
  );

  if (dashboardDisplay) {
    dashboardDisplay.textContent = efficiency.toFixed(2);
  }

  const dashboardRing = document.getElementById(
    "flourDashboardExtractionRingProgress",
  );

  if (dashboardRing) {
    const radius = 48;

    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (efficiency / 100) * circumference;

    dashboardRing.style.strokeDasharray = circumference;

    dashboardRing.style.strokeDashoffset = offset;
  }
}

/* =========================================================
   FLOUR — PRODUCTION STOP VISUAL STATUS
   تحديث الحالة تلقائيًا عند التحميل أو التعديل
========================================================= */

function updateFlourStopVisualStatus() {
  const stops = [
    {
      line: "A",
      time: "astoptime",
      cause: "astopcause",
      status: "flourStopStatusA",
    },
    {
      line: "B",
      time: "bstoptime",
      cause: "bstopcause",
      status: "flourStopStatusB",
    },
    {
      line: "C",
      time: "cstoptime",
      cause: "cstopcause",
      status: "flourStopStatusC",
    },
    {
      line: "D",
      time: "dstoptime",
      cause: "dstopcause",
      status: "flourStopStatusD",
    },
    {
      line: "E",
      time: "estoptime",
      cause: "estopcause",
      status: "flourStopStatusE",
    },
    {
      line: "F",
      time: "fstoptime",
      cause: "fstopcause",
      status: "flourStopStatusF",
    },
  ];

  stops.forEach((stop) => {
    const timeEl = document.getElementById(stop.time);

    const causeEl = document.getElementById(stop.cause);

    const statusEl = document.getElementById(stop.status);

    const card = document.querySelector(
      `.flour-stop-card[data-line="${stop.line}"]`,
    );

    if (!card) return;

    /*
     * قراءة مدة التوقف الحالية
     */

    const minutes = parseFloat(timeEl?.value);

    /*
     * إزالة الحالات السابقة
     */

    card.classList.remove(
      "stop-normal",
      "stop-warning",
      "stop-danger",
      "has-stop",
    );

    /*
     * ==========================================
     * لا يوجد توقف
     * فقط عندما تكون القيمة:
     * فارغة أو 0
     * ==========================================
     */

    if (!Number.isFinite(minutes) || minutes <= 0) {
      if (statusEl) {
        statusEl.textContent = "لا يوجد توقف";
      }

      return;
    }

    /*
     * ==========================================
     * توقف قصير
     * أكثر من 0 وأقل من 30 دقيقة
     * ==========================================
     */

    if (minutes > 0 && minutes < 30) {
      card.classList.add("stop-normal", "has-stop");

      if (statusEl) {
        statusEl.textContent = `توقف قصير • ${minutes} دقيقة`;
      }

      return;
    }

    /*
     * ==========================================
     * توقف يحتاج متابعة
     * 30 إلى أقل من 120 دقيقة
     * ==========================================
     */

    if (minutes >= 30 && minutes < 120) {
      card.classList.add("stop-warning", "has-stop");

      if (statusEl) {
        statusEl.textContent = `يحتاج متابعة • ${minutes} دقيقة`;
      }

      return;
    }

    /*
     * ==========================================
     * توقف طويل
     * 120 دقيقة فأكثر
     * ==========================================
     */

    if (minutes >= 120) {
      card.classList.add("stop-danger", "has-stop");

      if (statusEl) {
        statusEl.textContent = `توقف طويل • ${minutes} دقيقة`;
      }
    }
  });
}

function initializeFlourStopVisuals() {
  const fields = [
    "astoptime",
    "astopcause",
    "bstoptime",
    "bstopcause",
    "cstoptime",
    "cstopcause",
    "dstoptime",
    "dstopcause",
    "estoptime",
    "estopcause",
    "fstoptime",
    "fstopcause",
  ];

  fields.forEach((id) => {
    const field = document.getElementById(id);

    if (!field) return;

    field.addEventListener("input", updateFlourStopVisualStatus);

    field.addEventListener("change", updateFlourStopVisualStatus);
  });

  updateFlourStopVisualStatus();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFlourStopVisuals);
} else {
  initializeFlourStopVisuals();
}

/* =========================================================
   FLOUR — PACKAGING STATUS
========================================================= */

function updateFlourPackagingStatus() {
  const flour =
    Number(document.getElementById("flour_packaging_stock")?.value) || 0;

  const bran =
    Number(document.getElementById("bran_packaging_stock")?.value) || 0;

  const flourStatus = document.getElementById("flourPackagingStatus");

  const branStatus = document.getElementById("branPackagingStatus");

  updatePackagingStatusElement(flourStatus, flour);

  updatePackagingStatusElement(branStatus, bran);
}

function updatePackagingStatusElement(element, value) {
  if (!element) return;

  if (value <= 0) {
    element.textContent = "نفاد المخزون";

    element.style.color = "#ff9188";
  } else {
    element.textContent = "متوفر";

    element.style.color = "#8ee0b2";
  }
}
const originalUpdatePackagingStockVisual = window.updatePackagingStockVisual;

window.updatePackagingStockVisual = function (type) {
  if (typeof originalUpdatePackagingStockVisual === "function") {
    originalUpdatePackagingStockVisual(type);
  }

  updateFlourPackagingStatus();
};

/* =========================================================
   FLOUR — PRODUCTION HISTORY
   اليوم + آخر 3 أيام
========================================================= */

/* ---------------------------------------------------------
   حساب التاريخ السابق
--------------------------------------------------------- */

function getFlourPreviousDate(dateString, daysAgo) {
  const date = new Date(`${dateString}T00:00:00`);

  date.setDate(date.getDate() - daysAgo);

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

/* ---------------------------------------------------------
   تنسيق التاريخ للعرض
--------------------------------------------------------- */

function formatFlourHistoryDate(dateString, index) {
  if (index === 3) {
    return "اليوم";
  }

  const date = new Date(`${dateString}T00:00:00`);

  return (
    String(date.getDate()).padStart(2, "0") +
    "/" +
    String(date.getMonth() + 1).padStart(2, "0")
  );
}

/* =========================================================
   FLOUR — PRODUCTION HISTORY
   اليوم + آخر 3 أيام
========================================================= */

window.flourProductionHistoryChartInstance = null;

/* ---------------------------------------------------------
   الحصول على تاريخ سابق
--------------------------------------------------------- */

function getFlourPreviousDate(dateString, daysAgo) {
  const date = new Date(dateString + "T00:00:00");

  date.setDate(date.getDate() - daysAgo);

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

/* ---------------------------------------------------------
   قراءة إنتاج اليوم مباشرة من الشاشة
   المصدر الحقيقي = flour_grand_total
--------------------------------------------------------- */

function getFlourProductionFromScreen() {
  const totalEl = document.getElementById("flour_grand_total");

  if (!totalEl) {
    return 0;
  }

  const value = parseFloat(totalEl.value);

  return Number.isFinite(value) ? value : 0;
}

/* ---------------------------------------------------------
   حساب إنتاج يوم قديم من daily_reports
--------------------------------------------------------- */

function calculateFlourProductionFromRows(rows) {
  let total = null;

  let f1 = null;
  let f3 = null;
  let bran = null;

  rows.forEach((row) => {
    const value = parseFloat(row.field_value);

    if (!Number.isFinite(value)) {
      return;
    }

    if (row.field_name === "flour_grand_total") {
      total = value;
    }

    if (row.field_name === "flour_total_f1") {
      f1 = value;
    }

    if (row.field_name === "flour_total_f3") {
      f3 = value;
    }

    if (row.field_name === "flour_total_wbran") {
      bran = value;
    }
  });

  /*
       إذا كان grand total محفوظًا
       نستخدمه مباشرة.
    */

  if (total !== null) {
    return total;
  }

  /*
       احتياطياً نحسبه من المنتجات.
    */

  return (f1 || 0) + (f3 || 0) + (bran || 0);
}

async function getFlourRowsForDate(date) {
  const { data, error } = await supabaseClient
    .from("daily_reports")
    .select("report_date,field_name,field_value")
    .eq("factory", "flour")
    .eq("report_date", date)
    .in("field_name", [
      "flour_grand_total",
      "flour_total_f1",
      "flour_total_f3",
      "flour_total_wbran",
    ]);

  if (error) {
    console.error("FLOUR DATE LOAD ERROR:", error);

    return [];
  }

  return data || [];
}

/* ---------------------------------------------------------
   تحميل مقارنة إنتاج الطحين
--------------------------------------------------------- */

async function loadFlourProductionHistory() {
  const dateElement = document.getElementById("reportDateKey");

  if (!dateElement || !dateElement.value) {
    return;
  }

  const selectedDate = dateElement.value;

  const yesterday = getFlourPreviousDate(selectedDate, 1);

  const beforeYesterday = getFlourPreviousDate(selectedDate, 2);

  const threeDaysAgo = getFlourPreviousDate(selectedDate, 3);

  /*
   * ==========================================
   * إنتاج اليوم
   * المصدر الحقيقي = الحقل الأصلي في الشاشة
   * ==========================================
   */

  let todayProduction = getFlourProductionFromScreen();

  /*
   * إذا كنا نستعرض تاريخًا قديمًا،
   * نحتاج قيمة ذلك التاريخ من قاعدة البيانات.
   */

  const isToday = selectedDate === getTodayLocalDate();

  /*
   * ==========================================
   * نعرض إنتاج اليوم مباشرة
   * حتى لا ننتظر Supabase
   * ==========================================
   */

  if (isToday) {
    renderFlourProductionHistory(todayProduction, 0, 0, 0);
  }

  /*
   * ==========================================
   * تحميل الأيام الثلاثة السابقة فقط
   * ==========================================
   */

  const previousDates = [yesterday, beforeYesterday, threeDaysAgo];

  const { data, error } = await supabaseClient
    .from("daily_reports")
    .select("report_date,field_name,field_value")
    .eq("factory", "flour")
    .in("report_date", previousDates)
    .in("field_name", [
      "flour_grand_total",
      "flour_total_f1",
      "flour_total_f3",
      "flour_total_wbran",
    ]);

  if (error) {
    console.error("FLOUR PRODUCTION HISTORY ERROR:", error);

    /*
     * إنتاج اليوم يبقى ظاهرًا
     * حتى لو فشل تحميل التاريخ
     */

    if (isToday) {
      renderFlourProductionHistory(todayProduction, 0, 0, 0);
    }

    return;
  }

  const rows = data || [];

  /*
   * ==========================================
   * فصل الأيام
   * ==========================================
   */

  const yesterdayRows = rows.filter((row) => row.report_date === yesterday);

  const beforeYesterdayRows = rows.filter(
    (row) => row.report_date === beforeYesterday,
  );

  const threeDaysAgoRows = rows.filter(
    (row) => row.report_date === threeDaysAgo,
  );

  /*
   * ==========================================
   * حساب الإنتاج التاريخي
   * ==========================================
   */

  const yesterdayProduction = calculateFlourProductionFromRows(yesterdayRows);

  const beforeYesterdayProduction =
    calculateFlourProductionFromRows(beforeYesterdayRows);

  const threeDaysAgoProduction =
    calculateFlourProductionFromRows(threeDaysAgoRows);

  /*
   * ==========================================
   * إذا كان التقرير الحالي هو اليوم
   * نستخدم قيمة الشاشة لليوم.
   * ==========================================
   */

  if (isToday) {
    renderFlourProductionHistory(
      todayProduction,
      yesterdayProduction,
      beforeYesterdayProduction,
      threeDaysAgoProduction,
    );

    return;
  }

  /*
   * ==========================================
   * إذا كان التاريخ المختار قديمًا
   * نقرأ إنتاج ذلك التاريخ من قاعدة البيانات.
   * ==========================================
   */

  const todayRows = await getFlourRowsForDate(selectedDate);

  const historicalTodayProduction = calculateFlourProductionFromRows(todayRows);

  renderFlourProductionHistory(
    historicalTodayProduction,
    yesterdayProduction,
    beforeYesterdayProduction,
    threeDaysAgoProduction,
  );
}

function renderFlourProductionHistory(
  today,
  yesterday,
  beforeYesterday,
  threeDaysAgo,
) {
  const canvas = document.getElementById("flourProductionHistoryChart");

  if (!canvas) {
    console.warn("flourProductionHistoryChart not found");
    return;
  }

  /*
       حماية من القيم غير الرقمية
    */

  today = Number.isFinite(Number(today)) ? Number(today) : 0;

  yesterday = Number.isFinite(Number(yesterday)) ? Number(yesterday) : 0;

  beforeYesterday = Number.isFinite(Number(beforeYesterday))
    ? Number(beforeYesterday)
    : 0;

  threeDaysAgo = Number.isFinite(Number(threeDaysAgo))
    ? Number(threeDaysAgo)
    : 0;

  /* =====================================================
       تحديث بطاقات الملخص
    ===================================================== */

  const currentEl = document.getElementById("flourHistoryCurrentValue");

  const averageEl = document.getElementById("flourHistoryAverage");

  const changeEl = document.getElementById("flourHistoryChange");

  const changePercentEl = document.getElementById("flourHistoryChangePercent");

  if (currentEl) {
    currentEl.textContent = today.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  /*
       المتوسط = الأيام الثلاثة السابقة
    */

  const previousDays = [threeDaysAgo, beforeYesterday, yesterday].filter(
    (value) => Number.isFinite(value) && value > 0,
  );

  const average = previousDays.length
    ? previousDays.reduce((sum, value) => sum + value, 0) / previousDays.length
    : 0;

  if (averageEl) {
    averageEl.textContent = average
      ? average.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "—";
  }

  /*
       الفرق عن أمس
    */

  const difference = today - yesterday;

  const percentage = yesterday > 0 ? (difference / yesterday) * 100 : null;

  if (changeEl) {
    if (yesterday > 0) {
      changeEl.textContent =
        (difference >= 0 ? "▲ " : "▼ ") +
        Math.abs(difference).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    } else {
      changeEl.textContent = "—";
    }
  }

  if (changePercentEl) {
    if (percentage !== null) {
      changePercentEl.textContent =
        (percentage >= 0 ? "▲ " : "▼ ") +
        Math.abs(percentage).toFixed(1) +
        "% عن أمس";
    } else {
      changePercentEl.textContent = "لا توجد مقارنة";
    }
  }

  /* =====================================================
       الرسم
    ===================================================== */

  if (typeof Chart === "undefined") {
    console.error("Chart.js غير محمل");

    return;
  }

  if (
    window.flourProductionHistoryChartInstance &&
    typeof window.flourProductionHistoryChartInstance.destroy === "function"
  ) {
    window.flourProductionHistoryChartInstance.destroy();
  }

  window.flourProductionHistoryChartInstance = null;

  const ctx = canvas.getContext("2d");

  window.flourProductionHistoryChartInstance = new Chart(ctx, {
    type: "bar",

    data: {
      labels: ["قبل 3 أيام", "قبل أمس", "أمس", "اليوم"],

      datasets: [
        {
          label: "الإنتاج الكلي",

          data: [threeDaysAgo, beforeYesterday, yesterday, today],

          backgroundColor: [
            "rgba(160,170,178,.30)",
            "rgba(160,170,178,.40)",
            "rgba(160,170,178,.52)",
            "rgba(55,184,120,.88)",
          ],

          borderColor: [
            "rgba(160,170,178,.50)",
            "rgba(160,170,178,.60)",
            "rgba(160,170,178,.75)",
            "rgba(55,184,120,1)",
          ],

          borderWidth: 1,

          borderRadius: 10,

          borderSkipped: false,

          maxBarThickness: 75,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      animation: {
        duration: 500,
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          rtl: true,

          textDirection: "rtl",

          displayColors: false,

          callbacks: {
            label: function (context) {
              return (
                "الإنتاج: " +
                Number(context.raw).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) +
                " طن"
              );
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },

          ticks: {
            color: "rgba(255,255,255,.65)",

            font: {
              size: 11,
              weight: "600",
            },
          },
        },

        y: {
          beginAtZero: true,

          grid: {
            color: "rgba(255,255,255,.07)",
          },

          ticks: {
            color: "rgba(255,255,255,.45)",

            callback: function (value) {
              return Number(value).toLocaleString("en-US") + " طن";
            },
          },
        },
      },
    },
  });

  /*
       إجبار Chart.js على إعادة الحساب
       بعد ظهور القسم.
    */

  setTimeout(() => {
    if (
      window.flourProductionHistoryChartInstance &&
      typeof window.flourProductionHistoryChartInstance.resize === "function"
    ) {
      window.flourProductionHistoryChartInstance.resize();
      window.flourProductionHistoryChartInstance.update();
    }
  }, 100);
}

function refreshFlourProductionHistory() {
  clearTimeout(window.flourProductionHistoryTimer);

  window.flourProductionHistoryTimer = setTimeout(() => {
    loadFlourProductionHistory();
  }, 500);
}

/* =========================================================
   FEED — FULL DASHBOARD REFRESH
   ========================================================= */

function refreshFeedDashboard() {
  updateNetFeedProduction();

  refreshFeedConsumption();

  updatePremixRate();

  updateFeedDashboardKPIs();
}

/* =========================================================
   FEED — PRODUCTION HISTORY
   ========================================================= */

function getFeedPreviousDate(dateString, daysAgo) {
  const date = new Date(`${dateString}T00:00:00`);

  date.setDate(date.getDate() - daysAgo);

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

function getFeedCurrentGrossProduction() {
  let gross = 0;

  for (let i = 1; i <= 6; i++) {
    gross += Number(document.getElementById(`feed_l${i}_total`)?.value) || 0;
  }

  return gross;
}

window.feedProductionComparisonChartInstance = null;

async function loadFeedProductionHistory() {
  const dateEl = document.getElementById("reportDateKey");

  if (!dateEl?.value) return;

  const selectedDate = dateEl.value;

  const dates = [
    getFeedPreviousDate(selectedDate, 2),

    getFeedPreviousDate(selectedDate, 1),

    selectedDate,
  ];

  /*
   * اليوم يأخذ القيمة الحالية من الحقول
   */

  const todayValue = getFeedCurrentGrossProduction();

  /*
   * الأيام السابقة من قاعدة البيانات
   */

  const previousDates = dates.slice(0, 2);

  let previousData = [];

  if (typeof supabaseClient !== "undefined" && previousDates.length) {
    const result = await supabaseClient
      .from("daily_reports")
      .select("report_date,field_name,field_value")
      .eq("factory", "feed")
      .in("report_date", previousDates)
      .in("field_name", ["feed_gross_total"]);

    if (!result.error) {
      previousData = result.data || [];
    }
  }

  const values = {
    [dates[0]]: 0,
    [dates[1]]: 0,
    [selectedDate]: todayValue,
  };

  previousData.forEach((row) => {
    const value = Number(row.field_value);

    if (Number.isFinite(value) && values.hasOwnProperty(row.report_date)) {
      values[row.report_date] = value;
    }
  });

  renderFeedProductionHistory(dates, values, selectedDate);
}

function renderFeedProductionHistory(dates, values, selectedDate) {
  const today = Number(values[selectedDate]) || 0;

  const yesterday = Number(values[dates[1]]) || 0;

  const beforeYesterday = Number(values[dates[0]]) || 0;

  const todayEl = document.getElementById("feedChartToday");

  const yesterdayEl = document.getElementById("feedChartYesterday");

  const beforeEl = document.getElementById("feedChartBeforeYesterday");

  const changeEl = document.getElementById("feedChartChange");

  if (todayEl) {
    todayEl.textContent = today.toFixed(2);
  }

  if (yesterdayEl) {
    yesterdayEl.textContent = yesterday.toFixed(2);
  }

  if (beforeEl) {
    beforeEl.textContent = beforeYesterday.toFixed(2);
  }

  const change = today - yesterday;

  if (changeEl) {
    changeEl.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)} طن`;
  }

  const canvas = document.getElementById("feedProductionComparisonChart");

  if (!canvas || typeof Chart === "undefined") {
    return;
  }

  /*
   * لا نستخدم let/const عام حتى لا يحدث
   * already been declared عند إعادة تحميل dashboard
   */

  if (
    window.feedProductionComparisonChartInstance &&
    typeof window.feedProductionComparisonChartInstance.destroy === "function"
  ) {
    window.feedProductionComparisonChartInstance.destroy();
  }

  window.feedProductionComparisonChartInstance = new Chart(
    canvas.getContext("2d"),
    {
      type: "bar",

      data: {
        labels: ["قبل أمس", "أمس", "اليوم"],

        datasets: [
          {
            label: "الإنتاج طن",

            data: [beforeYesterday, yesterday, today],

            borderRadius: 9,

            borderSkipped: false,

            backgroundColor: [
              "rgba(75,155,131,.45)",
              "rgba(55,184,120,.55)",
              "rgba(55,184,120,.90)",
            ],

            borderColor: ["#4b9b83", "#37b878", "#75d47b"],

            borderWidth: 1,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.55)",
            },

            grid: {
              display: false,
            },
          },

          y: {
            beginAtZero: true,

            ticks: {
              color: "rgba(255,255,255,.45)",
            },

            grid: {
              color: "rgba(255,255,255,.06)",
            },
          },
        },
      },
    },
  );
}

function refreshFeedProductionHistory() {
  clearTimeout(window.feedProductionHistoryTimer);

  window.feedProductionHistoryTimer = setTimeout(() => {
    loadFeedProductionHistory();
  }, 350);
}

/* =========================================================
   FEED — INITIALIZATION
   ========================================================= */

function initializeFeedDashboard() {
  const section = document.getElementById("feed");

  if (!section) return;

  /*
   * حساب الإنتاج
   */

  calculateFeed();

  /*
   * حساب المرتجع والصافي
   */

  updateNetFeedProduction();

  /*
   * حساب الاستهلاك
   */

  refreshFeedConsumption();

  /*
   * تحديث Dashboard
   */

  updateFeedDashboardKPIs();

  /*
   * تحميل الرسم التاريخي
   */

  loadFeedProductionHistory();

  updatePremixRate();
}

/* =========================================================
   PREMIX — PRODUCTION RATE
   ========================================================= */
function updatePremixRate() {
  const productionEl = document.getElementById("premix1_prod");

  const hoursEl = document.getElementById("premix1_hours");

  const rateEl = document.getElementById("premix1_rate");

  if (!productionEl || !hoursEl || !rateEl) {
    console.warn("PREMIX: elements not found");
    return;
  }

  const production = parseFloat(productionEl.value) || 0;

  const hours = parseFloat(hoursEl.value) || 0;

  const rate = hours > 0 ? production / hours : 0;

  console.log(
    "PREMIX RATE CALC:",
    "production =",
    production,
    "hours =",
    hours,
    "rate =",
    rate,
  );

  rateEl.value = rate.toFixed(1);
}

function applyFeedDashboardPermissions(role) {
  const feedApproveArea = document.querySelector(".feed-approval-area");

  const feedApproveBtn = document.getElementById("approveFeedBtn");

  const canApprove = role === "feed";

  if (feedApproveArea) {
    feedApproveArea.style.display = canApprove ? "flex" : "none";
  }

  if (feedApproveBtn) {
    feedApproveBtn.style.display = canApprove ? "inline-flex" : "none";
  }
}

function applyWaterApprovalPermissions(role) {
  const area = document.querySelector(".water-approval-area");
  const button = document.getElementById("approvewaterBtn");

  const isWaterFiltration =
    String(role).trim().toLowerCase() === "waterfiltration";

  if (area) {
    area.style.display = isWaterFiltration ? "flex" : "none";
  }

  if (button) {
    button.style.display = isWaterFiltration ? "inline-flex" : "none";
  }
}

function updateSugarProductTemperature() {
  const sourceEl = document.getElementById("dryer_temp");
  const dashboardEl = document.getElementById("sugartempratureDash");

  if (!sourceEl || !dashboardEl) return;

  const value = parseFloat(sourceEl.value);

  dashboardEl.textContent = Number.isFinite(value) ? value.toFixed(1) : "0.0";
}

function updateFlourExtractionEfficiency() {
  const input = document.getElementById("extraction_eff");

  if (!input) return;

  let value = parseFloat(input.value);

  if (!Number.isFinite(value)) {
    value = 0;
  }

  // منع القيم خارج النطاق
  value = Math.max(0, Math.min(100, value));

  /* =====================================================
       عرض القيمة في الحلقة الرئيسية
       ===================================================== */

  const dashboardDisplay = document.getElementById(
    "flourDashboardExtractionEfficiencyDisplay",
  );

  if (dashboardDisplay) {
    dashboardDisplay.textContent = value.toFixed(1);
  }

  /* =====================================================
       عرض القيمة في حلقة قسم كفاءة الاستخراج
       ===================================================== */

  const detailDisplay = document.getElementById("extractionEfficiencyDisplay");

  if (detailDisplay) {
    detailDisplay.textContent = value.toFixed(1);
  }

  /* =====================================================
       تحديث الحلقة الرئيسية
       ===================================================== */

  const dashboardRing = document.getElementById(
    "flourDashboardExtractionRingProgress",
  );

  if (dashboardRing) {
    const circumference = 2 * Math.PI * 48;

    dashboardRing.style.strokeDasharray = circumference;

    dashboardRing.style.strokeDashoffset =
      circumference - (value / 100) * circumference;
  }

  /* =====================================================
       تحديث الحلقة التفصيلية
       ===================================================== */

  const detailRing = document.getElementById("extractionRingProgress");

  if (detailRing) {
    const circumference = 2 * Math.PI * 48;

    detailRing.style.strokeDasharray = circumference;

    detailRing.style.strokeDashoffset =
      circumference - (value / 100) * circumference;
  }
}

/* يبدأ فحص الحقول كل دقيقة */
setInterval(refreshAllFieldStaleStyles, 60 * 1000);
