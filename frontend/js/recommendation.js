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

/* =========================================
   FARM & SOIL PROFILE LOGIC
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  
  /* ---- Soil Data Toggle Logic ---- */
  const radioBtns = document.querySelectorAll('input[name="hasSoilData"]');
  const manualInputs = document.getElementById("soilManualInputs");
  const autoBadge = document.getElementById("soilAutoBadge");

  radioBtns.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "yes") {
        /* Show manual inputs, hide auto badge */
        manualInputs.classList.remove("hidden-smooth");
        manualInputs.classList.add("visible-smooth");
        autoBadge.style.display = "none";
      } else {
        /* Hide manual inputs, show auto badge */
        manualInputs.classList.add("hidden-smooth");
        manualInputs.classList.remove("visible-smooth");
        autoBadge.style.display = "flex";
      }
    });
  });

  /* ---- Generate AI Recommendation Button ---- */
  const generateBtn = document.getElementById("generateBtn");
  
  if (generateBtn) {
    generateBtn.addEventListener("click", async () => {
      
      /* Validate Location is fetched */
      if (!window.recommendationData.location.latitude) {
        alert("Please 'Allow Location' before generating a recommendation.");
        return;
      }

      /* Collect Base Form Values */
      const landSize = document.getElementById("landSize").value;
      const soilType = document.getElementById("soilType").value;
      const waterAvail = document.getElementById("waterAvail").value;
      const budgetLevel = document.getElementById("budgetLevel").value;

      /* Validate Base Form */
      if (!landSize || !soilType || !waterAvail || !budgetLevel) {
        alert("Please fill out all the basic Farm Details (Land Size, Soil Type, Water, and Budget).");
        return;
      }

      /* Collect Soil Data Preference */
      const hasSoilData = document.querySelector('input[name="hasSoilData"]:checked').value === "yes";
      
      let finalSoilData = null;
      
      if (hasSoilData) {
        const ph = document.getElementById("soilPh").value;
        const n = document.getElementById("soilN").value;
        const p = document.getElementById("soilP").value;
        const k = document.getElementById("soilK").value;
        
        if (!ph || !n || !p || !k) {
          alert("Please fill out all soil values (pH, N, P, K) or switch to AI auto-fetch.");
          return;
        }

        finalSoilData = {
          pH: parseFloat(ph),
          Nitrogen: parseFloat(n),
          Phosphorous: parseFloat(p),
          Potassium: parseFloat(k),
          source: "manual"
        };
      } else {
        // Fetch from Backend API
        generateBtn.innerHTML = "📡 Fetching Soil Intelligence...";
        generateBtn.disabled = true;
        
        try {
          const lat = window.recommendationData.location.latitude;
          const lon = window.recommendationData.location.longitude;
          const district = window.recommendationData.location.city || "default";

          const response = await fetch(`http://localhost:5000/api/soil?lat=${lat}&lon=${lon}&district=${district}`);
          if (!response.ok) throw new Error("Failed to fetch soil data");
          
          finalSoilData = await response.json();
          console.log("Fetched Soil Data:", finalSoilData);
        } catch (error) {
          console.error("Soil API Error:", error);
          alert("Could not fetch soil data automatically. Please enter it manually or try again.");
          generateBtn.innerHTML = "Generate AI Recommendation";
          generateBtn.disabled = false;
          return;
        }
      }

      /* Store exactly what we captured */
      window.recommendationData.farmProfile = {
        landSizeAcres: parseFloat(landSize),
        soilType: soilType,
        waterAvailability: waterAvail,
        budgetLevel: budgetLevel,
        hasExactSoilData: hasSoilData,
        soilProperties: finalSoilData 
      };

      /* Log the final, beautiful payload for our AI */
      console.log("🚀 Farm AI Payload Ready:");
      console.log(JSON.stringify(window.recommendationData, null, 2));

      /* Update UI to show processing state */
      generateBtn.innerHTML = "🤖 Analyzing Farm Profile...";
      generateBtn.disabled = true;
      generateBtn.style.opacity = "0.8";

      /* MOCK: Simulate API processing wait, then alert user */
      setTimeout(() => {
        alert("AI Processing Complete! (Check console for the full JSON payload). Integration with AI backend coming next!");
        generateBtn.innerHTML = "Generate AI Recommendation";
        generateBtn.disabled = false;
        generateBtn.style.opacity = "1";
      }, 1500);

    });
  }
});