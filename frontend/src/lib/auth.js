const AUTH_STORAGE_KEY = 'codelens-authenticated'
const USER_EMAIL_STORAGE_KEY = 'codelens-user-email'

export function isAuthenticated() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function setAuthenticated(value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(AUTH_STORAGE_KEY, value ? 'true' : 'false')
}

export function clearAuthenticated() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function setUserEmail(email) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USER_EMAIL_STORAGE_KEY, email)
}

export function getUserEmail() {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(USER_EMAIL_STORAGE_KEY) || ''
}
