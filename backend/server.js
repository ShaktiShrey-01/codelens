// Backend bootstrap: loads env, configures middleware/routes, connects DB, and starts API server.
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { generateAiInsight } from './gemini.js'
import userRouter from './routes/user.routes.js'

dotenv.config()

const app = express()

const allowedOrigins = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error(`Origin ${origin} not allowed by CORS`))
  },
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

await connectDB()

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  console.error('FATAL ERROR: ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET are required in .env.')
  process.exit(1)
}

app.use('/api/v1/users', userRouter)

app.post('/api/ai-insight', async (req, res) => {
  const { tag, background, fontFamily, color, fontSize } = req.body

  try {
    const text = await generateAiInsight({ tag, background, fontFamily, color, fontSize })
    res.json({ text })
  } catch (error) {
    console.error('Gemini API Error:', error)
    if (error.status === 429) {
      res.status(429).json({ error: 'Rate limit exceeded. Please wait a moment.' })
    } else {
      res.status(500).json({ error: 'AI failed to generate code.' })
    }
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 CodeLens AI Backend running on http://localhost:${PORT}`)
  console.log('🤖 Using Gemini Model: gemini-2.5-flash-lite')
})

app.get('/', (_req, res) => {
  res.send('CodeLens API is running...')
})