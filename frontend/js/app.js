/* =========================================
   KRISHIMITRA AI — GLOBAL APP
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ======================================
     SCROLL REVEAL
  ====================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  function revealOnScroll() {

    const triggerBottom =
      window.innerHeight * 0.9;

    revealElements.forEach(element => {

      const rect =
        element.getBoundingClientRect();

      if (rect.top < triggerBottom) {

        element.classList.add("active");
      }
    });
  }

  window.addEventListener(
    "scroll",
    revealOnScroll
  );

  revealOnScroll();

  /* ======================================
     COUNTER ANIMATION
  ====================================== */

  const counters =
    document.querySelectorAll(".ai-number");

  counters.forEach(counter => {

    const target =
      +counter.innerText.replace("%", "");

    let current = 0;

    const increment = target / 60;

    function updateCounter() {

      current += increment;

      if (current < target) {

        counter.innerText =
          `${Math.floor(current)}%`;

        requestAnimationFrame(updateCounter);

      } else {

        counter.innerText =
          `${target}%`;
      }
    }

    updateCounter();
  });

  /* ======================================
     ACTIVE SIDEBAR LINK
  ====================================== */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop();

  const sidebarLinks =
    document.querySelectorAll(".sidebar-link");

  sidebarLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {

      link.classList.add("active-link");
    }
  });

  /* ======================================
     LOADING SIMULATION
  ====================================== */

  const skeletons =
    document.querySelectorAll(".skeleton");

  setTimeout(() => {

    skeletons.forEach(item => {

      item.classList.remove("skeleton");
    });

  }, 1500);

});
/* =========================================
   CHATBOT TOGGLE SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const chatbotToggle =
    document.getElementById("chatbotToggle");

  const chatbotWindow =
    document.getElementById("chatbotWindow");

  const chatbotClose =
    document.getElementById("chatbotClose");

  // SAFETY CHECK

  if (
    chatbotToggle &&
    chatbotWindow &&
    chatbotClose
  ) {

    /* OPEN CHATBOT */

    chatbotToggle.addEventListener(
      "click",
      () => {

        chatbotWindow.classList.remove("hidden");

      }
    );

    /* =========================================
   CHATBOT TOGGLE
========================================= */

window.addEventListener("load", () => {

  const chatbotToggle =
    document.getElementById("chatbotToggle");

  const chatbotWindow =
    document.getElementById("chatbotWindow");

  const chatbotClose =
    document.getElementById("chatbotClose");

  if (
    chatbotToggle &&
    chatbotWindow &&
    chatbotClose
  ) {

    /* OPEN CHATBOT */

    chatbotToggle.addEventListener(
      "click",
      () => {

        chatbotWindow.classList.remove("hidden");

      }
    );

    /* CLOSE CHATBOT */

    chatbotClose.addEventListener(
      "click",
      () => {

        chatbotWindow.classList.add("hidden");

      }
    );

  }

});