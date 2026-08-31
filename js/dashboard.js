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

function toggleSeparationStation() {
  const status = document.getElementById("separation_status")?.value;

  const acidOil = document.getElementById("separation_acid_oil");

  const notes = document.getElementById("separation_notes");

  const disabled = status !== "running";

  if (acidOil) {
    acidOil.disabled = disabled;
  }

  if (notes) {
    notes.disabled = disabled;
  }
}

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

  if (!card || !statusText || !statusIcon || !modeDisplay) {
    return;
  }

  /* إزالة الحالات السابقة */

  card.classList.remove("running", "stopped");

  /* =========================
       بالـخدمة
       ========================= */

  if (status === "running") {
    card.classList.add("running");

    statusIcon.textContent = "⚙️";

    statusText.textContent = "المحطة بالـخدمة";

    modeDisplay.textContent = "بالـخدمة";

    modeDisplay.style.color = "#62d989";

    modeDisplay.style.borderColor = "rgba(72,190,105,0.45)";

    modeDisplay.style.background = "rgba(40,130,70,0.15)";
  } else if (status === "stopped") {

  /* =========================
       خارج الخدمة
       ========================= */
    card.classList.add("stopped");

    statusIcon.textContent = "⛔";

    statusText.textContent = "المحطة خارج الخدمة";

    modeDisplay.textContent = "خارج الخدمة";

    modeDisplay.style.color = "#ff7777";

    modeDisplay.style.borderColor = "rgba(220,80,80,0.45)";

    modeDisplay.style.background = "rgba(150,45,45,0.15)";
  } else {

  /* =========================
       لم يتم الاختيار
       ========================= */
    statusIcon.textContent = "⚙️";

    statusText.textContent = "لم يتم تحديد الحالة";

    modeDisplay.textContent = "غير محدد";

    modeDisplay.style.color = "#b7bec2";

    modeDisplay.style.borderColor = "#586572";

    modeDisplay.style.background = "#343d47";
  }

  /*
   * مهم:
   * نترك أي منطق قديم مرتبط بهذه الدالة
   * يعمل أيضاً.
   */

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

/* يبدأ فحص الحقول كل دقيقة */
setInterval(refreshAllFieldStaleStyles, 60 * 1000);
