const {
  getFarmResponse,
} = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    // Validate message

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Generate AI response

    const aiResponse = await getFarmResponse(message, context);

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

    let clientMessage = "Failed to generate AI response";
    
    // Check for Gemini Rate Limit / Quota Errors
    if (error.message.includes("429") || error.message.includes("Quota exceeded")) {
      clientMessage = "AI Rate Limit Exceeded. The system is currently receiving too many requests. Please wait a minute and try again.";
    }

    return res.status(500).json({
      success: false,
      message: clientMessage
    });
  }
};

const getRecommendation = async (req, res) => {
  try {
    const payload = req.body;
    const { generateFarmRecommendation } = require("../services/geminiService");

    const recommendation = await generateFarmRecommendation(payload);

    return res.status(200).json({
      success: true,
      recommendation
    });
  } catch (error) {
    console.error("Recommendation Controller Error:", error.message);

    let clientMessage = "Failed to generate recommendation";
    if (error.message.includes("429") || error.message.includes("Quota exceeded")) {
      clientMessage = "AI Rate Limit Exceeded. The system is currently receiving too many requests. Please wait a few seconds and try again.";
    }

    return res.status(500).json({
      success: false,
      message: clientMessage
    });
  }
};

module.exports = {
  chatWithAI,
  getRecommendation
};