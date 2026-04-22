// Gemini service module: validates API key, initializes model client, and generates AI code output.
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
  console.error('FATAL ERROR: GEMINI_API_KEY is missing or empty in the .env file.')
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim())
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

const buildPrompt = ({ tag, background, color, fontSize, fontFamily }) => `
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
`

export const generateAiInsight = async (payload) => {
  const prompt = buildPrompt(payload)
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}
