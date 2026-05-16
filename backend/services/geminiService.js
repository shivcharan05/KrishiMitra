const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Farming AI brain instruction
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
You are KrishiMitra AI, a farming expert assistant for Indian farmers.

Your job:
- Suggest crops based on soil, weather, and location
- Give irrigation and fertilizer advice
- Help with pest and disease problems
- Keep answers simple, practical, and short
- Prefer Indian agriculture conditions

If data is missing, ask a short follow-up question.
`
});

async function getFarmResponse(userMessage) {
  const result = await model.generateContent(userMessage);
  return result.response.text();
}

module.exports = { getFarmResponse };