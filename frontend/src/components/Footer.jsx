import './Footer.css'
import { MapPin, Phone, Mail } from 'lucide-react'

const FOOTER_COLS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'],
  Company: ['About Us', 'Careers', 'Press Kit', 'Blog', 'Partners'],
  Support: ['Help Centre', 'Community', 'Status Page', 'Contact Us', 'Privacy Policy'],
}

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="content-shell footer-shell">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              <svg className="footer-brand-icon" viewBox="0 0 24 24" fill="none">
                <path d="M1.04356 6.35771L13.6437 0.666504L20.5 7.5L14.5 13.5L20.5 19.5L13.6437 26.3335L1.04356 20.6423V13.5V6.35771Z" fill="#7b39fc" />
                <path d="M14.5 13.5H8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="footer-brand-text">Future</span>
            </div>

            <p className="footer-description">
              The intelligent travel platform helping millions discover and book the perfect stay - anywhere in the
              world.
            </p>

            <div className="footer-contact-list">
              {[
                { icon: <MapPin size={13} />, text: '123 Future Lane, San Francisco, CA' },
                { icon: <Phone size={13} />, text: '+1 (800) 555-0199' },
                { icon: <Mail size={13} />, text: 'hello@future.travel' },
              ].map((item) => (
                <div key={item.text} className="footer-contact-item">
                  <span className="footer-contact-icon">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="footer-socials">
              {['X', 'IG', 'in', 'GH'].map((label) => (
                <button key={label} className="social-btn" aria-label={label} type="button">
                  <span className="social-btn-label">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_COLS).map(([heading, links]) => (
            <div key={heading}>
              <p className="footer-heading">{heading}</p>
              <ul className="footer-links-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Future Travel, Inc. All rights reserved.</span>
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