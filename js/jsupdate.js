const APP_VERSION = "6.1.0";
async function checkForUpdates() {
  try {
    const response = await fetch("version.json?t=" + Date.now(), {
      cache: "no-store",
    });

    if (!response.ok) return;

    const data = await response.json();

    if (data.version !== APP_VERSION) {
      showUpdateDialog(data.version);
    }
  } catch (err) {
    console.log("Version check skipped.", err);
  }
}
function showUpdateDialog(newVersion) {
  document.getElementById("updateText").innerHTML =
    "الإصدار الجديد <b>" + newVersion + "</b> جاهز للتثبيت.";

  document.getElementById("updateDialog").style.display = "block";
}
function updateApplication() {
  location.reload(true);
}
checkForUpdates();

setInterval(checkForUpdates, 600000);
