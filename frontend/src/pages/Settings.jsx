// Settings page: shows backend profile data, handles logout, and controls visual theme selection.
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRight, LayoutDashboard, Palette, Settings2, User2 } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo11.png'
import { clearAuthenticated, clearUserEmail, setUserProfile } from '../lib/auth'
import { selectTheme, selectThemeId, setTheme, THEME_OPTIONS } from '../store/themeSlice'
import './Settings.css'

const SIDEBAR_GROUPS = [
  {
    title: 'Navigation',
    items: [
      { icon: <LayoutDashboard size={16} />, label: 'Home', to: '/' },
      { icon: <User2 size={16} />, label: 'Audit', to: '/audit' },
      { icon: <Palette size={16} />, label: 'Docs', to: '/docs' },
      { icon: <Settings2 size={16} />, label: 'Settings', to: '/settings' },
    ],
  },
]

export default function Settings() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const activeThemeId = useSelector(selectThemeId)
  const activeTheme = useSelector(selectTheme)
  const [profile, setProfile] = useState({ username: 'Loading...', email: 'Loading...' })
  const [profileError, setProfileError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/v1/users/me`, {
          method: 'GET',
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Unable to load profile.')
        }

        const data = await response.json()
        setUserProfile(data?.user || null)
        setProfile({
          username: data?.user?.username || 'User',
          email: data?.user?.email || 'N/A',
        })
      } catch (_error) {
        setProfileError('Unable to fetch profile from backend.')
        setProfile({ username: 'User', email: 'N/A' })
      }
    }

    fetchProfile()
  }, [apiBaseUrl])

  const handleLogout = async () => {
    try {
      await fetch(`${apiBaseUrl}/api/v1/users/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (_error) {
      // Local cleanup still runs even if backend request fails.
    } finally {
      clearAuthenticated()
      clearUserEmail()
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="settings-page">
      <div className="settings-shell">
        <aside className="settings-sidebar" aria-label="Settings navigation">
          <div className="settings-brand">
            <img src={logo} alt="CodeLens" className="settings-brand-logo" />
            <span className="settings-brand-text">SETTINGS</span>
          </div>

          {SIDEBAR_GROUPS.map((group) => (
            <section key={group.title} className="settings-sidebar-group">
              <h3 className="settings-group-title">{group.title}</h3>
              <ul className="settings-nav-list">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => `settings-nav-item${isActive ? ' is-active' : ''}`}
                    >
                      <span className="settings-nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.to === '/settings' && <ChevronRight size={16} className="settings-nav-arrow" />}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>

        <main className="settings-content">
          <span className="settings-badge">ACCOUNT & APPEARANCE</span>
          <h1 className="settings-title">Settings</h1>
          <p className="settings-lead">
            Manage your profile and change the visual system that applies across CodeLens.
          </p>

          <section className="settings-section">
            <div className="settings-section-head">
              <h2>Profile</h2>
              <span>Signed-in identity</span>
            </div>
            <div className="settings-profile-card">
              <div className="settings-profile-main">
                <div className="settings-profile-avatar">
                  <User2 size={18} />
                </div>
                <div>
                  <p className="settings-profile-label">Username</p>
                  <strong>{profile.username}</strong>
                </div>
              </div>
              <div>
                <p className="settings-profile-label">User email</p>
                <strong>{profile.email}</strong>
              </div>
              {profileError && <p className="settings-profile-error">{profileError}</p>}
              <p className="settings-profile-copy">
                This email is used for account identification and future profile-linked exports.
              </p>
              <button type="button" className="settings-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </section>

          <section className="settings-section">
            <div className="settings-section-head">
              <h2>Appearance</h2>
              <span>Changes update the entire site</span>
            </div>

            <div className="settings-current-theme">
              <div>
                <p>Active theme</p>
                <strong>{activeTheme.label}</strong>
              </div>
              <span className="settings-theme-note">{activeTheme.description}</span>
            </div>

            <div className="settings-theme-grid">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`settings-theme-card${activeThemeId === theme.id ? ' is-active' : ''}`}
                  onClick={() => dispatch(setTheme(theme.id))}
                  aria-pressed={activeThemeId === theme.id}
                >
                  <div className="settings-theme-card-head">
                    <div>
                      <span>{theme.label}</span>
                      <p>{theme.description}</p>
                    </div>
                    {activeThemeId === theme.id && <strong>Active</strong>}
                  </div>

                  <div className="settings-theme-swatches" aria-hidden="true">
                    <span style={{ background: theme.accent }} />
                    <span style={{ background: theme.borderStrong }} />
                    <span style={{ background: theme.surfaceAlt }} />
                    <span style={{ background: theme.text }} />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
