import './Features.css'
import { Zap, Shield, BarChart2, Globe, Clock, HeartHandshake } from 'lucide-react'

const FEATURES = [
  { icon: <Zap size={22} color="#7b39fc" />, bg: '#f3edff', title: 'Instant Booking', body: 'Skip the back-and-forth. Confirm your reservation in real time with zero waiting periods.' },
  { icon: <Shield size={22} color="#0ea97b" />, bg: '#e8faf3', title: 'Secure Payments', body: 'Bank-grade encryption on every transaction. Your card details are never stored on our servers.' },
  { icon: <BarChart2 size={22} color="#f59e0b" />, bg: '#fff8e8', title: 'Price Insights', body: 'Our AI tracks historical rates and alerts you when prices drop so you always get the best deal.' },
  { icon: <Globe size={22} color="#3b82f6" />, bg: '#ebf4ff', title: 'Global Coverage', body: 'Properties in 150+ countries and every continent, from urban apartments to remote retreats.' },
  { icon: <Clock size={22} color="#ef4444" />, bg: '#fff0f0', title: '24/7 Support', body: 'Real humans available around the clock via chat, phone, or email - in your preferred language.' },
  { icon: <HeartHandshake size={22} color="#ec4899" />, bg: '#fff0f8', title: 'Loyalty Rewards', body: 'Earn points on every booking and redeem them for free nights, upgrades, and exclusive perks.' },
]

export default function Features() {
  return (
    <section className="features-section">
      <div className="content-shell">
        <div className="section-header section-header-center">
          <span className="section-label">Why Future</span>
          <h2 className="section-title">
            Everything you need for <em>seamless travel</em>
          </h2>
          <p className="section-body features-lead">
            We've packed powerful tools into a beautifully simple experience - spend less time planning, more time
            exploring.
          </p>
        </div>

        <div className="feats-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feat-card">
              <div className="feat-icon" style={{ background: feature.bg }}>{feature.icon}</div>
              <h3 className="feat-title">{feature.title}</h3>
              <p className="feat-body">{feature.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-banner">
          <div>
            <h3 className="cta-banner-title">Ready to explore the world?</h3>
            <p className="cta-banner-copy">Join 2 million+ travellers who trust Future for every trip.</p>
          </div>

          <div className="cta-banner-btns">
            <button className="btn-primary cta-primary">Start for Free</button>
            <button className="cta-secondary">Watch Demo</button>
          </div>
        </div>
      </div>
    </section>
  )
}