// Footer block with contact/status metadata and quick navigation links.
import './Footer.css'
import { Mail, BookOpenText, LifeBuoy } from 'lucide-react'
import logo from '../assets/logo11.png'

// Single source for footer links so both quick list and social pills stay in sync.
const QUICK_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ShaktiShrey-01', external: true },
  { label: 'Docs', href: '/docs', external: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shakti33/', external: true }
]

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="content-shell footer-shell">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              <img src={logo} alt="CodeLens" className="footer-brand-logo" />
              <span className="footer-brand-text">CodeLens</span>
            </div>

            <p className="footer-description">
              Analyze any public website to extract fonts, color tokens, layout insights, and reusable UI snippets.
            </p>

            {/* Contact/status rows are rendered from data to keep markup compact. */}
            <div className="footer-contact-list">
              {[
                { icon: <Mail size={14} />, text: 'support@codelens.dev' },
                { icon: <BookOpenText size={14} />, text: 'docs.codelens.dev' },
                { icon: <LifeBuoy size={14} />, text: 'Status: All systems operational' },
              ].map((item) => (
                <div key={item.text} className="footer-contact-item">
                  <span className="footer-contact-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Compact quick links styled as social pills. */}
            <div className="footer-socials">
              {QUICK_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="social-btn" 
                  aria-label={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  <span className="social-btn-label">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-col">
            <p className="footer-heading">Quick Links</p>
            <ul className="footer-links-list">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="footer-link"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CodeLens. All rights reserved.</span>
          <div className="footer-bottom-links">
            {['Terms', 'Privacy', 'Cookies'].map((label) => (
              <a key={label} href="#" className="footer-link footer-bottom-link">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}