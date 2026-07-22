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
  document.getElementById("menu_archive").style.display = "none";
  document.getElementById("approvalsDashboard").style.display = "none";

  document.getElementById("lateFieldsDashboard").style.display = "none";

  document.getElementById("remindersBox").style.display = "none";

  const buttons = document.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.style.display = "inline-block";
  });

  if (role === "power") {
    document.getElementById("salesSection").style.display = "none";

    document.getElementById("home").style.display = "block";

    document.getElementById("powerstation").style.display = "block";

    document.getElementById("blackoil").style.display = "block";

    document.getElementById("menu_power").style.display = "block";

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

    document.getElementById("menu_power").style.display = "block";
    document.getElementById("menu_sugar").style.display = "block";
    document.getElementById("menu_oil").style.display = "block";
    document.getElementById("menu_flour").style.display = "block";
    document.getElementById("menu_feed").style.display = "block";
    document.getElementById("menu_archive").style.display = "block";

    document.querySelectorAll(".section").forEach((section) => {
      section.style.display = "block";
    });

    window.location.hash = "home";

    return;
  }

  /* مدير السكر */

  if (role === "sugar") {
    document.getElementById("menu_sugar").style.display = "block";

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

4

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
    if (!latestFields[row.field_name]) {
      latestFields[row.field_name] = row;
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
});
