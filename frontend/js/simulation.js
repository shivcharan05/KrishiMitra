/* =========================================
   KRISHIMITRA AI — SIMULATION ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const simulationBtn =
    document.querySelector(".full-width-btn");

  if (!simulationBtn) return;

  simulationBtn.addEventListener("click", () => {

    /* BUTTON LOADING */

    simulationBtn.innerText =
      "Running AI Simulation...";

    simulationBtn.disabled = true;

    /* FAKE AI PROCESSING */

    setTimeout(() => {

      simulationBtn.innerText =
        "Simulation Completed ✅";

      simulationBtn.style.background =
        "#2E7D32";

    }, 2000);
  });
});