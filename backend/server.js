const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === "") {
  console.error("FATAL ERROR: GEMINI_API_KEY is missing or empty in the .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

app.post('/api/ai-insight', async (req, res) => {
  const { tag, background, fontFamily, color, fontSize } = req.body;

  // 🔥 UPGRADED PROMPT: Forces Senior-Level React Components
  const prompt = `
    You are an expert Frontend Architect. Convert the following extracted CSS properties into a highly reusable, production-ready React component using Tailwind CSS.

    Element Tag: ${tag}
    Background: ${background}
    Text Color: ${color}
    Font Size: ${fontSize}
    Font Family: ${fontFamily}

    STRICT RULES:
    1. ONLY return the raw React JSX code. No markdown formatting (No \`\`\`jsx or \`\`\`), no explanations.
    2. The component MUST accept 'children', 'className', and rest props (...props).
    3. Merge the generated Tailwind classes with the incoming 'className' prop dynamically.
    4. Name the component contextually based on the tag (e.g., ExtractedDiv, ExtractedButton).
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.status === 429) {
      res.status(429).json({ error: "Rate limit exceeded. Please wait a moment." });
    } else {
      res.status(500).json({ error: "AI failed to generate code." });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 CodeLens AI Backend running on http://localhost:${PORT}`);
  console.log(`🤖 Using Gemini Model: gemini-2.5-flash-lite`);
});