import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { setAuthenticated, setUserEmail } from '../../lib/auth'
import './sign-in-card-2.css'

function Input({ className = '', type = 'text', ...props }) {
  return <input type={type} className={`auth-input ${className}`.trim()} {...props} />
}

export function Component({ mode = 'login' }) {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [errors, setErrors] = useState({})
  const isSignup = mode === 'signup'

  const validateForm = () => {
    const nextErrors = {}

    if (isSignup && !name.trim()) {
      nextErrors.name = 'Full name is required.'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsLoading(true)
    window.setTimeout(() => {
      setAuthenticated(true)
      setUserEmail(email.trim())
      setIsLoading(false)
      navigate('/audit')
    }, 1200)
  }

  return (
    <div className="auth-page">
      <div className="auth-page-glow auth-page-glow-top" />
      <div className="auth-page-glow auth-page-glow-bottom" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-card"
      >
        <div className="auth-card-shell">
          <p className="auth-kicker">CodeLens</p>
          <h1 className="auth-title">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="auth-copy">
            {isSignup
              ? 'Create an account to save analyses, manage projects, and export design tokens faster.'
              : 'Sign in to continue analyzing websites and extracting reusable design structure.'}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <label className={`auth-field ${focusedInput === 'name' ? 'is-focused' : ''}`}>
                  <span className="auth-field-icon">
                    <Mail size={16} />
                  </span>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value)
                      if (errors.name) setErrors((current) => ({ ...current, name: undefined }))
                    }}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                    aria-invalid={Boolean(errors.name)}
                  />
                </label>
                {errors.name && <p className="auth-error">{errors.name}</p>}
              </>
            )}

            <label className={`auth-field ${focusedInput === 'email' ? 'is-focused' : ''}`}>
              <span className="auth-field-icon">
                <Mail size={16} />
              </span>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (errors.email) setErrors((current) => ({ ...current, email: undefined }))
                }}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                aria-invalid={Boolean(errors.email)}
              />
            </label>
            {errors.email && <p className="auth-error">{errors.email}</p>}

            <label className={`auth-field ${focusedInput === 'password' ? 'is-focused' : ''}`}>
              <span className="auth-field-icon">
                <Lock size={16} />
              </span>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  if (errors.password) setErrors((current) => ({ ...current, password: undefined }))
                }}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </label>
              {errors.password && <p className="auth-error">{errors.password}</p>}

            {!isSignup && (
              <div className="auth-row">
                <label className="auth-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/signup" className="auth-link">
                  Create account
                </Link>
              </div>
            )}

            {isSignup && (
              <div className="auth-row auth-row-single">
                <span className="auth-helper">Already have an account?</span>
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="auth-submit"
              disabled={isLoading}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="auth-submit-loading"
                  >
                    Loading...
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="auth-submit-text"
                  >
                    {isSignup ? 'Create account' : 'Sign in'}
                    <ArrowRight size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
