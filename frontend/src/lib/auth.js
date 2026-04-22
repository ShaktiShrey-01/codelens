// Frontend auth helper: tracks in-memory auth/profile state hydrated from backend cookie sessions.
// Central in-memory auth state. Session truth comes from backend cookies via /me.
let authenticated = false
let currentUser = null
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export async function hydrateAuthSession() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      authenticated = false
      currentUser = null
      return false
    }

    const data = await response.json()
    authenticated = true
    currentUser = data?.user || null
    return true
  } catch (_error) {
    authenticated = false
    currentUser = null
    return false
  }
}

export function isAuthenticated() {
  return authenticated
}

export function setAuthenticated(value) {
  authenticated = Boolean(value)
}

export function clearAuthenticated() {
  authenticated = false
  currentUser = null
}

export function clearUserEmail() {
  if (!currentUser) return
  currentUser = { ...currentUser, email: '' }
}

export function setUserEmail(email) {
  currentUser = { ...(currentUser || {}), email }
}

export function getUserEmail() {
  return currentUser?.email || ''
}

export function setUserProfile(user) {
  currentUser = user || null
}

export function getUserProfile() {
  return currentUser
}
