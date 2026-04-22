// Home page shell that composes all landing sections and hash-based smooth scrolling.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import OnboardingSteps from '../components/OnboardingSteps'
import Features from '../components/Features'
import Feature2 from '../components/Feature2'
import Footer from '../components/Footer'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = location.hash.replace('#', '')
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <div id="page-root">
      <main id="page-main">
        <Hero>
          <OnboardingSteps />
          <Features />
          <Feature2 />
          <Footer />
        </Hero>
      </main>
    </div>
  )
}
