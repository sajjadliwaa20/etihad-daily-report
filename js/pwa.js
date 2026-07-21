if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

let deferredPrompt;

const installCard = document.getElementById("installCard");

const installBtn = document.getElementById("installBtn");

const laterBtn = document.getElementById("laterBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();

  deferredPrompt = e;

  installCard.classList.add("show");
});

installBtn.onclick = async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();

  await deferredPrompt.userChoice;

  installCard.classList.remove("show");

  deferredPrompt = null;
};

laterBtn.onclick = () => {
  installCard.classList.remove("show");
};
