import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo11.png'
import './Navbar.css'

const NAV_LINKS = ['Home', 'Features', 'Docs']

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null)

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return
        const { width } = ref.current.getBoundingClientRect()
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft })
      }}
      className="site-nav-item"
    >
      <a href="#" className="site-nav-link">
        {children}
      </a>
    </li>
  )
}

const NavCursor = ({ position }) => <motion.li animate={position} className="site-nav-cursor" />

const Logo = () => (
  <div className="site-brand">
    <img src={logo} alt="CodeLens logo" className="site-brand-image" />
    <span className="site-brand-text">CodeLens</span>
  </div>
)

export default function Navbar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })
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
            {NAV_LINKS.map((label) => (
              <Tab key={label} setPosition={setPosition}>
                {label}
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.22 }}
              className="site-mobile-menu"
            >
              <ul className="site-mobile-menu-list">
                {NAV_LINKS.map((label) => (
                  <li
                    key={label}
                    onClick={() => setMobileOpen(false)}
                    className="site-mobile-menu-item"
                  >
                    {label}
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