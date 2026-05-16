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

    console.log(
      "Chatbot elements missing"
    );

    return;
  }

  /* FORCE HIDDEN INITIALLY */

  chatbotWindow.classList.add(
    "hidden"
  );

  /* OPEN / CLOSE CHAT */

  chatbotToggle.onclick = () => {

    chatbotWindow.classList.toggle(
      "hidden"
    );
  };

  chatbotClose.onclick = () => {

    chatbotWindow.classList.add(
      "hidden"
    );
  };

  /* SEND MESSAGE */

  function sendMessage() {

    const message =
      chatInput.value.trim();

    if (!message) return;

    const userMessage =
      document.createElement("div");

    userMessage.className =
      "chat-message user-message";

    userMessage.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
      </div>
    `;

    chatbotBody.appendChild(
      userMessage
    );

    chatInput.value = "";

    chatbotBody.scrollTop =
      chatbotBody.scrollHeight;

    typingIndicator.classList.remove(
      "hidden"
    );

    setTimeout(() => {

      typingIndicator.classList.add(
        "hidden"
      );

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

          </p>

        </div>
      `;

      chatbotBody.appendChild(
        aiMessage
      );

      chatbotBody.scrollTop =
        chatbotBody.scrollHeight;

    }, 1200);
  }

  /* SEND BUTTON */

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
    document.querySelectorAll(
      ".quick-chip"
    );

  chips.forEach((chip) => {

    chip.addEventListener(
      "click",
      () => {

        chatInput.value =
          chip.innerText;

        sendMessage();
      }
    );
  });
}