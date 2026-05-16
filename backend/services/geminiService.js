const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Farming AI brain instruction
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
You are KrishiMitra AI, a farming expert assistant for Indian farmers.

Your job:
- Suggest crops based on soil, weather, and location
- Give irrigation and fertilizer advice
- Help with pest and disease problems
- Keep answers simple, practical, and short
- Prefer Indian agriculture conditions
- CRITICAL: You must detect the language of the user's message. 
  - If the user asks in English, your entire response MUST be in English.
  - If the user asks in Hindi (either Devanagari or Romanized/Hinglish), your entire response MUST be in pure Hindi using the Devanagari script (e.g., नमस्ते).
- If the user has provided location or weather data in the context, do NOT ask them for it again.

If data is missing and not provided in the context, ask a short follow-up question.
`
});

async function getFarmResponse(userMessage, context = null) {
  let finalPrompt = userMessage;
  if (context && Object.keys(context).length > 0) {
    finalPrompt = `Context Information (Do NOT ask for these details if provided here):\n${JSON.stringify(context, null, 2)}\n\nUser Message: ${userMessage}`;
  }
  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}

async function generateFarmRecommendation(payload) {
  const langPref = payload.preferredLanguage === 'Hindi' ? 
    "You MUST write the entire recommendation in pure Hindi using the Devanagari script (no Roman Hindi/Hinglish)." : 
    "You MUST write the entire recommendation in English.";

  const prompt = `
You are an expert agricultural AI. Generate a crop recommendation based on the following farm profile:

- Land Size: ${payload.farmArea} Acres
- Soil Type: ${payload.soilType}
- Water Availability: ${payload.waterAvailable}
- Budget: ${payload.budget}
- Soil pH: ${payload.ph || 'Unknown'}
- Nitrogen: ${payload.nitrogen || 'Unknown'}
- Phosphorus: ${payload.phosphorus || 'Unknown'}
- Potassium: ${payload.potassium || 'Unknown'}
- Temperature: ${payload.temperature}°C
- Humidity: ${payload.humidity}%
- Rainfall: ${payload.rainfall}mm

${langPref}

Format the output strictly as an HTML snippet (do not use markdown blocks like \`\`\`html) using <h3>, <ul>, <li>, and <p> tags so it can be directly injected into a webpage. Do NOT include <html> or <body> tags. Structure it nicely with the best recommended crop, profitability, risk level, and a brief explanation.
  `;

  const result = await model.generateContent(prompt);
  let html = result.response.text();
  // Clean up any markdown blocks if the model still outputs them
  html = html.replace(/```html/g, "").replace(/```/g, "").trim();
  return html;
}

module.exports = { getFarmResponse, generateFarmRecommendation };