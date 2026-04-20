import Navbar from './Navbar'
import './Hero.css'

export default function Hero({ children }) {
  return (
    <section className="hero-section">
      <video autoPlay loop muted playsInline className="hero-video">
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="page-content hero-content">
        <Navbar />

        <div className="hero-intro">
          <div className="tagline-pill fu1">
            <span className="tagline-badge">New</span>
            <span className="tagline-text">Say Hello to Datacore v3.2</span>
          </div>

          <h1 className="hero-headline fu2">
            Book your perfect stay instantly <em>and</em> hassle-free
          </h1>

          <p className="hero-copy fu3">
            Discover handpicked hotels, resorts, and stays across your favorite destinations. Enjoy exclusive deals,
            fast booking, and 24/7 support.
          </p>

          <div className="hero-actions fu4">
            <button className="btn-primary">Book a Free Demo</button>
            <button className="btn-dark">Get Started Now</button>
          </div>
        </div>

        {children}
      </div>
    </section>
  )
}