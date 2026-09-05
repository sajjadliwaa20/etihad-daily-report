window.testDashboard = true;
document.addEventListener("DOMContentLoaded", updateSugarTankCards);

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

  const feedSection = document.getElementById("feed");

  const oilSection = document.getElementById("oil");

  const salesMarketing = document.getElementById("salesMarketing");

  const salesSection = document.getElementById("salesSection");

  const feedSales = document.getElementById("sales_feed");

  const oilSales = document.getElementById("sales_oil");

  /* =====================================================
       الحسابات الفرعية للأعلاف
    ===================================================== */

  if (role === "feed") {
    /* -------------------------------------------------
           إنتاج الأعلاف
        ------------------------------------------------- */

    if (subsection === "production") {
      if (!feedSection) return;

      feedSection.style.display = "block";

      feedSection.querySelectorAll("details").forEach((detail) => {
        detail.style.display = "none";
      });

      const allowedSections = [
        "أرصدة المواد الخام",

        "إنتاج خطوط الأعلاف",

        "العلف المرتجع",

        "استهلاك المواد الخام",

        "الملاحظات العامة",
      ];

      feedSection.querySelectorAll("details").forEach((detail) => {
        const summary = detail.querySelector("summary");

        if (!summary) return;

        if (allowedSections.includes(summary.textContent.trim())) {
          detail.style.display = "block";
        }
      });

      return;
    }

    /* -------------------------------------------------
           البريمكس
        ------------------------------------------------- */

    if (subsection === "premix") {
      if (!feedSection) return;

      feedSection.style.display = "block";

      feedSection.querySelectorAll("details").forEach((detail) => {
        detail.style.display = "none";
      });

      feedSection.querySelectorAll("details").forEach((detail) => {
        const summary = detail.querySelector("summary");

        if (!summary) return;

        if (summary.textContent.trim() === "إنتاج مصنع البريمكس") {
          detail.style.display = "block";
        }
      });

      return;
    }

    /* -------------------------------------------------
           مبيعات الأعلاف
        ------------------------------------------------- */

    if (subsection === "sales") {
      /*
       * إخفاء مصنع الأعلاف بالكامل
       */

      if (feedSection) {
        feedSection.style.display = "none";

        feedSection.querySelectorAll("details").forEach((detail) => {
          detail.style.display = "none";
        });
      }

      /*
       * إخفاء قسم المبيعات بالكامل أولاً
       */

      if (salesMarketing) {
        salesMarketing.style.display = "none";
      }

      if (salesSection) {
        salesSection.style.display = "none";
      }

      /*
       * إخفاء جميع أقسام المبيعات
       */

      document
        .querySelectorAll("#salesMarketing > details details")
        .forEach((detail) => {
          detail.style.display = "none";
        });

      /*
       * إظهار قسم المبيعات الرئيسي
       */

      if (salesMarketing) {
        salesMarketing.style.display = "block";
      }

      if (salesSection) {
        salesSection.style.display = "block";
      }

      /*
       * إظهار مبيعات الأعلاف فقط
       */

      if (feedSales) {
        feedSales.style.display = "block";
      }

      /*
       * إخفاء بقية أقسام المبيعات
       */

      const salesSugar = document.getElementById("sales_sugar");

      const salesOil = document.getElementById("sales_oil");

      const salesFlour = document.getElementById("sales_flour");

      if (salesSugar) salesSugar.style.display = "none";

      if (salesOil) salesOil.style.display = "none";

      if (salesFlour) salesFlour.style.display = "none";

      return;
    }
  }

  /* =====================================================
       الحسابات الفرعية للزيت
    ===================================================== */

  if (role === "oil") {
    /* -------------------------------------------------
           إنتاج الزيت
        ------------------------------------------------- */

    if (subsection === "production") {
      if (!oilSection) return;

      oilSection.style.display = "block";

      oilSection.querySelectorAll("details").forEach((detail) => {
        detail.style.display = "none";
      });

      const allowedSections = [
        "أرصدة الزيوت الخام",

        "إنتاج خطوط التكرير",

        "موقف وأرصدة المنتج النهائي",

        "موقف محطة الفصل",
      ];

      oilSection.querySelectorAll("details").forEach((detail) => {
        const summary = detail.querySelector("summary");

        if (!summary) return;

        if (allowedSections.includes(summary.textContent.trim())) {
          detail.style.display = "block";
        }
      });

      return;
    }

    /* -------------------------------------------------
       مبيعات الزيت
------------------------------------------------- */

    if (subsection === "sales") {
      /*
       * 1️⃣ إخفاء مصنع الزيت بالكامل أولاً
       */
      if (oilSection) {
        oilSection.style.display = "none";

        oilSection.querySelectorAll("details").forEach((detail) => {
          detail.style.display = "none";
        });
      }

      /*
       * 2️⃣ إظهار قسم المبيعات والتسويق
       */
      if (salesMarketing) {
        salesMarketing.style.display = "block";
      }

      if (salesSection) {
        salesSection.style.display = "block";
      }

      /*
       * 3️⃣ إخفاء جميع أقسام المبيعات
       */
      const salesSugar = document.getElementById("sales_sugar");
      const salesFlour = document.getElementById("sales_flour");
      const salesFeed = document.getElementById("sales_feed");

      if (salesSugar) salesSugar.style.display = "none";

      if (salesFlour) salesFlour.style.display = "none";

      if (salesFeed) salesFeed.style.display = "none";

      /*
       * 4️⃣ إظهار مبيعات الزيت فقط
       */
      if (oilSales) {
        oilSales.style.display = "block";
      }

      /*
       * =================================================
       * 5️⃣ إظهار أجزاء معينة من مصنع الزيت
       * =================================================
       */

      if (oilSection) {
        oilSection.style.display = "block";

        oilSection.querySelectorAll("details").forEach((detail) => {
          const summary = detail.querySelector(":scope > summary");

          if (!summary) return;

          const title = summary.textContent.trim();

          /*
           * موقف خطوط التعبئة
           */
          if (title === "موقف خطوط التعبئة") {
            detail.style.display = "block";
          }

          /*
           * تقرير مصنع اللدائن
           */
          if (title === "تقرير مصنع اللدائن") {
            detail.style.display = "block";
          }
        });
      }

      return;
    }
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
   🍬 صلاحيات Dashboard مصنع السكر
   ========================================================= */

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

  /* =========================================================
   🍬 تطبيق صلاحيات Dashboard السكر
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
    btn.style.display = "inline-block";
  });

  /* =========================================
   الحسابات الفرعية
   لا تؤثر على الحسابات الرئيسية
========================================= */

  if (subsection && (role === "feed" || role === "oil")) {
    // الحساب الفرعي يرى الأرشيف
    document.getElementById("menu_archive").style.display = "block";
    document.getElementById("archive").style.display = "block";

    // الصفحة الرئيسية
    document.getElementById("home").style.display = "block";

    // إظهار مصنعه فقط
    document.getElementById(role).style.display = "block";
    document.getElementById("menu_sales_marketing").style.display = "none";

    // تطبيق الصلاحيات التفصيلية
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

function showOnlySection(sectionId) {
  console.log("SHOW SECTION:", sectionId);

  // إخفاء جميع الأقسام الرئيسية
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  // إظهار القسم المطلوب
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    console.error("SECTION NOT FOUND:", sectionId);

    return;
  }

  targetSection.style.display = "block";

  // فتح الـ details الداخلي إن كان موجودًا
  const innerDetails = targetSection.querySelector("details");

  if (innerDetails) {
    innerDetails.open = true;
  }

  // الانتقال إلى أعلى القسم
  targetSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // تحديث الرابط
  history.replaceState(null, "", "#" + sectionId);
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
async function loadLateFieldsDashboard() {
  const box = document.getElementById("lateFieldsDashboard");

  if (!box) return;

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
    box.innerHTML = "";

    return;
  }

  const { data, error } = await supabaseClient
    .from("field_history")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.log(error);

    return;
  }

  let latestFields = {};

  data.forEach((row) => {
    const key = `${row.factory}::${row.field_name}`;

    if (!latestFields[key]) {
      latestFields[key] = row;
    }
  });

  let html = `
<div style="
background:white;
padding:15px;
border-radius:8px;
margin-top:15px;
border:1px solid #ddd;
">

<h3>
🔴 الحقول المتأخرة
</h3>
`;

  let count = 0;
  let groupedFields = {};

  Object.values(latestFields).forEach((field) => {
    const lastUpdate = new Date(field.updated_at);

    const hours = (new Date() - lastUpdate) / (1000 * 60 * 60);

    if (hours <= 24) return;

    count++;

    if (!groupedFields[field.factory]) {
      groupedFields[field.factory] = [];
    }

    groupedFields[field.factory].push({
      name: field.field_name,

      hours: Math.floor(hours),
    });
  });

  const factoryNames = {
    sugar: "🍬 مصنع السكر",

    oil: "🛢 مصنع الزيت",

    flour: "🌾 مصنع الطحين",

    feed: "🌽 مصنع الأعلاف",

    power: "⚡ محطة الطاقة",
  };

  Object.keys(groupedFields).forEach((factory) => {
    html += `

<details style="margin-bottom:10px;">

<summary style="
font-weight:bold;
cursor:pointer;
font-size:16px;
">

${factoryNames[factory] || factory}

(${groupedFields[factory].length})

</summary>

`;

    groupedFields[factory].forEach((field) => {
      html += `

<div style="
background:#ffe5e5;
padding:8px;
margin:6px;
border-radius:6px;
border-left:5px solid red;
">

${fieldLabels[field.name] || field.name}

<br>

آخر تحديث منذ

${field.hours}

ساعة

</div>

`;
    });

    html += "</details>";
  });

  if (count === 0) {
    html += `
<div style="
color:green;
font-weight:bold;
">

✅ لا توجد حقول متأخرة

</div>
`;
  }

  html += "</div>";

  box.innerHTML = html;
}
async function refreshAdminTools() {
  await loadApprovalsDashboard();

  await loadLateFieldsDashboard();

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

function updateStopCard(element) {
  const card = element.closest(".stop-card");

  if (!card) return;

  const durationInput = card.querySelector("input[data-save]");

  const dot = card.querySelector(".stop-status-dot");

  const statusText = card.querySelector(".stop-status-text");

  const minutes = parseFloat(durationInput?.value) || 0;

  /* إزالة الحالات القديمة */

  card.classList.remove("stop-normal", "stop-warning", "stop-danger");

  /* لا يوجد توقف */

  if (minutes <= 0) {
    if (dot) {
      dot.style.background = "#6c757d";
    }

    if (statusText) {
      statusText.textContent = "لا يوجد توقف";
    }

    return;
  }

  /* توقف طبيعي */

  if (minutes < 30) {
    card.classList.add("stop-normal");

    if (dot) {
      dot.style.background = "#49b86b";
    }

    if (statusText) {
      statusText.textContent = "توقف قصير";
    }
  } else if (minutes < 120) {
    /* توقف يحتاج انتباه */
    card.classList.add("stop-warning");

    if (dot) {
      dot.style.background = "#e7b84b";
    }

    if (statusText) {
      statusText.textContent = "يحتاج متابعة";
    }
  } else {
    /* توقف طويل */
    card.classList.add("stop-danger");

    if (dot) {
      dot.style.background = "#e45757";
    }

    if (statusText) {
      statusText.textContent = "توقف طويل";
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
       قراءة القيم من بطاقات / حقول التقرير
       ===================================================== */

  const brix = parseFloat(document.getElementById("cooker_brix")?.value) || 0;

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

  if (dashBrix) dashBrix.textContent = brix.toFixed(1);

  if (dashQty) dashQty.textContent = molassesQty.toFixed(1);

  if (dashMolassesBrix) dashMolassesBrix.textContent = molassesBrix.toFixed(1);

  if (dashPurity) dashPurity.textContent = molassesPurity.toFixed(1);

  /* =====================================================
       تحديث الـ Donut
       ===================================================== */

  updateCookerDonut(0, brix);

  updateCookerDonut(1, molassesBrix);

  updateCookerDonut(2, molassesPurity);

  /* =====================================================
       تحديث خزان المولاس
       MIN = 15
       MAX = 60
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

/* يبدأ فحص الحقول كل دقيقة */
setInterval(refreshAllFieldStaleStyles, 60 * 1000);
