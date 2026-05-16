/* =========================================
   KRISHIMITRA AI — APP INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const currentLang = getCurrentLanguage();

  applyTranslations(currentLang);

  const languageSwitcher = document.getElementById("languageSwitcher");

  if (languageSwitcher) {

    languageSwitcher.value = currentLang;

    languageSwitcher.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }
});

/* =========================================
   HERO COUNTER ANIMATION
========================================= */

function animateValue(element, start, end, duration) {

  let startTimestamp = null;

  const step = (timestamp) => {

    if (!startTimestamp) {
      startTimestamp = timestamp;
    }

    const progress = Math.min(
      (timestamp - startTimestamp) / duration,
      1
    );

    element.innerHTML = Math.floor(
      progress * (end - start) + start
    ) + "%";

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

window.addEventListener("load", () => {

  const statNumber = document.querySelector(".stat-card h2");

  if (statNumber) {
    animateValue(statNumber, 0, 92, 1500);
  }
});