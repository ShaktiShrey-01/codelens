import './Introduction.css'

const STATS = [
  { number: '2M+', label: 'Happy travellers' },
  { number: '150+', label: 'Countries covered' },
  { number: '98%', label: 'Satisfaction rate' },
  { number: '24/7', label: 'Support team' },
]

export default function Introduction() {
  return (
    <section className="introduction-section">
      <div className="content-shell">
        <div className="intro-grid">
          <div className="intro-copy-block">
            <span className="section-label">Who we are</span>
            <h2 className="section-title">
              Travel smarter with <em>Future</em> by your side
            </h2>
            <p className="section-body">
              Future is the all-in-one platform that transforms how you discover, compare, and book travel
              accommodations. From cozy boutique hotels to sprawling beach resorts, we surface the best options - so
              you can focus on the journey, not the logistics.
            </p>
            <p className="section-body">
              Our AI-powered recommendations learn your preferences over time, delivering personalised stays that feel
              handpicked just for you. Instant confirmations, transparent pricing, no surprises - only extraordinary
              experiences.
            </p>
            <button className="btn-primary intro-cta">Explore Our Story</button>
          </div>

          <div className="intro-visual-block">
            <div className="intro-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="Luxury resort"
                className="intro-image"
              />
            </div>

            <div className="stats-row">
              {STATS.map((stat) => (
                <div key={stat.number} className="stat-card">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}