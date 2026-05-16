const {
  getFarmResponse,
} = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Generate AI response

    const aiResponse = await getFarmResponse(message);

    // Send response

    return res.status(200).json({
      success: true,
      reply: aiResponse,
    });

  } catch (error) {
    console.error(
      "Chatbot Controller Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate AI response",
    });
  }
};

module.exports = {
  chatWithAI,
};