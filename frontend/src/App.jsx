import Hero from './components/Hero'
import Introduction from './components/Introduction'
import OnboardingSteps from './components/OnboardingSteps'
import Features from './components/Features'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="page-root">
      <main id="page-main">
        <Hero>
          <Introduction />
          <OnboardingSteps />
          <Features />
          <Footer />
        </Hero>
      </main>
    </div>
  )
}
