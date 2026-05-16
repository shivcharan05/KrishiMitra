const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function generateChatResponse(
  userMessage
) {
  try {

    // Use stable supported model

    const model =
      genAI.getGenerativeModel({
        model: "models/gemini-2.0-flash",
      });

    const prompt = `
You are KrishiMitra AI,
a friendly Indian farming assistant.

Rules:
- Reply in the SAME language as the farmer.
- Support Marathi, Hindi, and English.
- Keep responses simple and practical.
- Help farmers with agriculture guidance.
- Avoid robotic or overly technical responses.
- Keep answers concise but useful.

Farmer Question:
${userMessage}
`;

    const result =
      await model.generateContent(prompt);

    const response =
      await result.response;

    return response.text();

  } catch (error) {

    console.error(
      "Gemini Error:",
      error
    );

    throw new Error(
      "AI response generation failed"
    );
  }
}

module.exports = {
  generateChatResponse,
};