import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { isAuthenticated } from '../lib/auth'
import './Hero.css'

export default function Hero({ children }) {
  return (
    <section className="hero-section">
      {/* Fixed full-screen video backdrop shared by all sections rendered below. */}
      <video autoPlay loop muted playsInline className="hero-video">
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay keeps text readable against brighter video frames. */}
      <div className="hero-overlay" />

      <div className="page-content hero-content">
        <Navbar />

        <div className="hero-intro">
          <h1 className="hero-headline fu2">
            Understand the <em>Design</em> Behind Any <em>Website</em>
          </h1>

          <p className="hero-copy fu3">
            Paste a website URL to instantly explore its fonts, colors, and UI components.
          </p>

          <div className="hero-search fu4">
            <input
              type="url"
              className="hero-search-input"
              placeholder="Paste any website URL"
              aria-label="Website URL"
            />
            <Link to={isAuthenticated() ? '/audit' : '/login'} className="hero-search-button">
              Analyze
            </Link>
          </div>
        </div>

        {children}
      </div>
    </section>
  )
}