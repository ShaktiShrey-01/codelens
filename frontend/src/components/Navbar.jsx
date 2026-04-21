import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo11.png'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/#features' },
  { label: 'Docs', to: '/docs' },
]

const Tab = ({ link, setPosition }) => {
  const ref = useRef(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        // Measure hovered tab and move the animated cursor pill under it.
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className="site-nav-item"
    >
      <NavLink to={link.to} className="site-nav-link">
        {link.label}
      </NavLink>
    </li>
  )
}

// Framer Motion animates this element between tab positions through the `animate` prop.
const NavCursor = ({ position }) => <motion.li animate={position} className="site-nav-cursor" />

const Logo = () => (
  <Link to="/" className="site-brand">
    <img src={logo} alt="CodeLens logo" className="site-brand-image" />
    <span className="site-brand-text">CodeLens</span>
  </Link>
)

export default function Navbar() {
  // Cursor state drives hover indicator position/size for desktop nav links.
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
  // Mobile menu visibility state.
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <div className="site-navbar-wrap">
        <nav className="site-navbar">
          <Logo />

          <ul
            className="site-nav-links"
            onMouseLeave={() => setPosition((current) => ({ ...current, opacity: 0 }))}
          >
            {NAV_LINKS.map((link) => (
              <Tab key={link.label} link={link} setPosition={setPosition}>
                {link.label}
              </Tab>
            ))}
            <NavCursor position={position} />
          </ul>

          <div className="site-nav-actions">
            <button className="nav-btn-getstarted">Get Started</button>
          </div>

          <button
            className="site-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              // Enter/exit animation for mobile drawer.
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.22 }}
              className="site-mobile-menu"
            >
              <ul className="site-mobile-menu-list">
                {NAV_LINKS.map((link) => (
                  <li key={link.label} className="site-mobile-menu-item">
                    <Link to={link.to} onClick={() => setMobileOpen(false)} className="site-nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="site-mobile-menu-actions">
                <button className="nav-btn-getstarted site-mobile-action">Get Started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}