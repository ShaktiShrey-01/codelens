// App entrypoint: applies theme variables and hydrates cookie-based auth before routing.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import './index.css'
import Home from './pages/Home.jsx'
import Docs from './pages/Docs.jsx'
import Audit from './pages/Audit.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { hydrateAuthSession, isAuthenticated } from './lib/auth'
import { selectTheme } from './store/themeSlice'
import { store } from './store/store'
import { useEffect, useState } from 'react'

function ThemeBridge() {
  const theme = useSelector(selectTheme)

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    Object.entries({
      '--site-background': theme.background,
      '--site-background-alt': theme.backgroundAlt,
      '--site-surface': theme.surface,
      '--site-surface-alt': theme.surfaceAlt,
      '--site-panel': theme.panel,
      '--site-border': theme.border,
      '--site-border-strong': theme.borderStrong,
      '--site-text': theme.text,
      '--site-text-muted': theme.textMuted,
      '--site-accent': theme.accent,
      '--site-accent-strong': theme.accentStrong,
      '--site-accent-soft': theme.accentSoft,
      '--site-link': theme.link,
      '--site-cursor': theme.cursor,
    }).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    root.dataset.theme = theme.id
    body.dataset.theme = theme.id
  }, [theme])

  return null
}

function SessionBootstrap({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const boot = async () => {
      await hydrateAuthSession()
      setReady(true)
    }

    boot()
  }, [])

  if (!ready) {
    return null
  }

  return children
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

function AuthRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/audit" replace /> : children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeBridge />
      <SessionBootstrap>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/audit" element={<ProtectedRoute><Audit /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/liveaudit" element={<Audit />} />
            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
            <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SessionBootstrap>
    </Provider>
  </StrictMode>,
)
