/* =========================================
   KRISHIMITRA AI — RECOMMENDATIONS
========================================= */

/* Shared state across modules (weather.js reads this too) */
window.recommendationData = {
  location: {},
  weather:  {},
  soilData: {},
};

/* ---- Detail insight buttons ---- */
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".full-width-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Detailed AI Crop Insights Coming Soon…");
    });
  });
});

/* ---- Allow Location button ---- */
const allowLocationBtn = document.getElementById("allowLocationBtn");

allowLocationBtn.addEventListener("click", async () => {

  allowLocationBtn.disabled = true;
  allowLocationBtn.textContent = "📡 Detecting location…";

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      window.recommendationData.location = { latitude, longitude };

      /* Hide the modal */
      const modal = document.getElementById("locationModal");
      if (modal) {
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.95)";
        modal.style.transition = "all 0.35s ease";
        setTimeout(() => { modal.style.display = "none"; }, 380);
      }

      /* Show "Weather loading" label so user knows something is happening */
      const wrapper = document.getElementById("weatherSectionWrapper");
      if (wrapper) wrapper.style.display = "block";

      /* Fetch & render the weather card (defined in weather.js) */
      await fetchWeatherData(latitude, longitude);

      /* After weather loads, update the location label if city name is available */
      const cityEl = document.querySelector(".weather-city");
      if (cityEl) {
        console.log("Location city:", cityEl.textContent);
      }
    },

    (error) => {
      allowLocationBtn.disabled = false;
      allowLocationBtn.textContent = "Allow Location";

      const messages = {
        1: "Location permission denied. Please allow location access in your browser settings.",
        2: "Location unavailable. Check your device's GPS or network connection.",
        3: "Location request timed out. Please try again.",
      };
      alert(messages[error.code] || "Location access failed. Please try again.");
      console.error("Geolocation error:", error);
    },

    { timeout: 10000, enableHighAccuracy: true }
  );
});