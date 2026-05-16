/* =========================================
   KRISHIMITRA AI — CHATBOT
========================================= */

function initializeChatbot() {

  const chatbotToggle =
    document.getElementById("chatbotToggle");

  const chatbotWindow =
    document.getElementById("chatbotWindow");

  const chatbotClose =
    document.getElementById("chatbotClose");

  const sendBtn =
    document.getElementById("sendBtn");

  const chatInput =
    document.getElementById("chatInput");

  const chatbotBody =
    document.getElementById("chatbotBody");

  const typingIndicator =
    document.getElementById("typingIndicator");

  /* SAFETY CHECK */

  if (
    !chatbotToggle ||
    !chatbotWindow
  ) {
    console.log("Chatbot elements not found");
    return;
  }

  /* OPEN CHAT */

  chatbotToggle.addEventListener("click", () => {

        if (
      chatbotWindow.classList.contains("hidden")
    ) {

      chatbotWindow.classList.remove("hidden");

    } else {

      chatbotWindow.classList.add("hidden");
    }
  });

  /* CLOSE CHAT */

  chatbotClose?.addEventListener("click", () => {

    chatbotWindow.classList.add("hidden");
  });

  /* SEND MESSAGE */

  function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    /* USER MESSAGE */

    const userMessage =
      document.createElement("div");

    userMessage.className =
      "chat-message user-message";

    userMessage.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;

    chatbotBody.appendChild(userMessage);

    chatInput.value = "";

    chatbotBody.scrollTop =
      chatbotBody.scrollHeight;

    /* SHOW TYPING */

    typingIndicator.classList.remove("hidden");

    chatbotBody.scrollTop =
      chatbotBody.scrollHeight;

    /* AI RESPONSE */

    setTimeout(() => {

      typingIndicator.classList.add("hidden");

      const aiMessage =
        document.createElement("div");

      aiMessage.className =
        "chat-message ai-message";

      aiMessage.innerHTML = `
        <div class="message-avatar">
          🤖
        </div>

        <div class="message-content">

          <p>

            I understand your farming query regarding:
            "<strong>${message}</strong>"

            <br><br>

            AI recommendations and advanced
            farming assistance will be connected soon.

          </p>

        </div>
      `;

      chatbotBody.appendChild(aiMessage);

      chatbotBody.scrollTop =
        chatbotBody.scrollHeight;

    }, 1500);
  }

  /* BUTTON */

  sendBtn?.addEventListener(
    "click",
    sendMessage
  );

  /* ENTER KEY */

  chatInput?.addEventListener(
    "keypress",
    (e) => {

      if (e.key === "Enter") {

        sendMessage();
      }
    }
  );

  /* QUICK CHIPS */

  const chips =
    document.querySelectorAll(".quick-chip");

  chips.forEach(chip => {

    chip.addEventListener("click", () => {

      chatInput.value =
        chip.innerText;

      sendMessage();
    });
  });
}