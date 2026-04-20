import './OnboardingSteps.css'
import { Search, CreditCard, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    icon: <Search size={26} color="#7b39fc" />,
    title: 'Search & Discover',
    body: 'Enter your destination, dates, and preferences. Our smart search surfaces thousands of verified properties in seconds, sorted by what matters most to you.',
    cta: 'Start Searching',
  },
  {
    icon: <CreditCard size={26} color="#7b39fc" />,
    title: 'Choose & Book',
    body: 'Compare prices, amenities, and real guest reviews side-by-side. Book your preferred stay with one click using our secure, encrypted payment gateway.',
    cta: 'View Options',
  },
  {
    icon: <CheckCircle size={26} color="#7b39fc" />,
    title: 'Confirm & Travel',
    body: 'Receive instant confirmation to your inbox. Your digital travel pass is ready - check in smoothly and enjoy a stress-free experience from door to destination.',
    cta: 'Get Started',
  },
]

export default function OnboardingSteps() {
  return (
    <section className="onboarding-section">
      <div className="content-shell">
        <div className="section-header section-header-center">
          <span className="section-label">How it works</span>
          <h2 className="section-title">
            Three steps to your <em>perfect stay</em>
          </h2>
          <p className="section-body onboarding-lead">
            Getting started is effortless. Follow our guided process and you'll be packed and ready before you know
            it.
          </p>
        </div>

        <div className="steps-row">
          {STEPS.map((step, index) => (
            <div key={step.title} className="step-group">
              <div className="step-card">
                <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
                <a href="#" className="step-link">
                  {step.cta} →
                </a>
              </div>

              {index < STEPS.length - 1 && (
                <div className="connector">
                  <div className="connector-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}