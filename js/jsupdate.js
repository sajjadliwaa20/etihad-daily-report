const APP_VERSION = "5.2.0";

let latestAppUpdate = null;

async function checkForAppUpdate() {
  try {
    const { data, error } = await supabaseClient
      .from("app_updates")
      .select("*")
      .eq("active", true)
      .single();

    if (error) throw error;

    latestAppUpdate = data;

    if (!data) return false;

    return data.version !== APP_VERSION;
  } catch (err) {
    console.error("Update Check Error:", err);

    return false;
  }
}
