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

function updateApplication() {
  location.reload(true);
}
checkForUpdates();

setInterval(checkForUpdates, 600000);
