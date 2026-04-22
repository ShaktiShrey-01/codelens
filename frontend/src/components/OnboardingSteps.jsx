// Onboarding steps: shows extension setup flow and triggers extension zip download.
import './OnboardingSteps.css'
import Card from './ui/card'

// Content-driven step list keeps UI easy to update without changing markup.
const STEPS = [
  {
    label: 'Step 01',
    title: 'Download the official CodeLens extension pack',
    body: 'Download the official CodeLens extension pack. Unzip the codelens-extension folder to your Desktop.',
    cta: 'Download Extension Pack',
  },
  {
    label: 'Step 02',
    title: 'Enable Developer Mode in Chrome',
    body: 'Go to chrome://extensions and enable Developer Mode.',
    cta: 'Open Extensions Page',
  },
  {
    label: 'Step 03',
    title: 'Load the unpacked extension folder',
    body: 'Click Load Unpacked and select the CodeLens folder.',
    cta: 'Load Unpacked',
  },
]

export default function OnboardingSteps() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/codelens-extension.zip';
    link.download = 'codelens-extension.zip';
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="onboarding-section">
      <div className="content-shell">
        <div className="section-header section-header-center">
          <span className="section-label">How it works</span>
          <h2 className="section-title">
            Three steps to <em>launch CodeLens</em>
          </h2>
        </div>

        <div className="steps-row">
          {STEPS.map((step, index) => (
            <div key={step.title} className="step-group">
              <div className="step-card step-card-pixel">
                {/* Shared animated pixel canvas background used across cards. */}
                <Card
                  gap={9}
                  speed={22}
                  colors={['#f8fafc', '#c4b5fd', '#7b39fc']}
                  className="step-card-canvas"
                />
                <div className="step-card-content">
                  <span className="step-num">{step.label}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-body">{step.body}</p>
                  <div className="step-cta">
                    {/* Only first step has a primary action button. */}
                    {index === 0 && (
                      <button
                        type="button"
                        className="step-download-button"
                        onClick={handleDownload}
                      >
                        {step.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector is hidden after the last card to avoid trailing line. */}
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