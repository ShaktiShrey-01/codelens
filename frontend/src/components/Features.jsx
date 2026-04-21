import './Features.css'
import { ClipboardPaste } from 'lucide-react'
import Card from './ui/card'

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="content-shell">
        <div className="section-header section-header-center">
          <span className="section-label">Feature Workflow</span>
          <h2 className="section-title">
            How CodeLens turns a URL into <em>usable code</em>
          </h2>
        </div>

        <div className="feature-cards-grid">
          {/* Step 1: URL input stage mock. */}
          <div className="feature-card feature-card-pixel">
            <Card
              gap={9}
              speed={22}
              colors={['#f8fafc', '#c4b5fd', '#7b39fc']}
              className="feature-card-canvas"
            />
            <div className="feature-card-content">
              <div className="feature-card-head">
                <div className="feature-card-icon">
                  <ClipboardPaste size={18} color="#7b39fc" />
                </div>
                <h3 className="feature-card-title">Paste Website URL</h3>
              </div>

              <p className="feature-card-copy">
                Enter any public website URL you want to analyze with CodeLens.
              </p>

              <div className="feature-search feature-search-disabled" aria-disabled="true">
                <input type="text" value="https://example.com" disabled readOnly className="feature-search-input" />
                <button type="button" disabled className="feature-search-button">
                  Analyze
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Analysis result preview. */}
          <div className="feature-card feature-card-pixel">
            <Card
              gap={9}
              speed={22}
              colors={['#f8fafc', '#c4b5fd', '#7b39fc']}
              className="feature-card-canvas"
            />
            <div className="feature-card-content">
              <h3 className="feature-card-title">Analyze Design Structure</h3>
              <p className="feature-card-copy">
                CodeLens extracts fonts, colors, layout structure and UI components.
              </p>

              <div className="feature-code-block">
                <p>
                  <span className="feature-code-key">Fonts:</span>
                </p>
                <p>
                  <span className="feature-code-key">Font:</span> Inter
                </p>
                <p>
                  <span className="feature-code-key">Size:</span> 13px
                </p>
                <p>
                  <span className="feature-code-key">Weight:</span> 400
                </p>
                <p>
                  <span className="feature-code-key">Font:</span> Inter
                </p>
                <p>
                  <span className="feature-code-key">Size:</span> 12px
                </p>
                <p>
                  <span className="feature-code-key">Weight:</span> 500
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Export output preview. */}
          <div className="feature-card feature-card-pixel">
            <Card
              gap={9}
              speed={22}
              colors={['#f8fafc', '#c4b5fd', '#7b39fc']}
              className="feature-card-canvas"
            />
            <div className="feature-card-content">
              <h3 className="feature-card-title">Export Components</h3>
              <p className="feature-card-copy">
                Get clean CSS or component code ready for your projects.
              </p>

              <div className="feature-code-block">
                <p>
                  .btn-primary {'{'}
                </p>
                <p>
                  <span className="feature-code-key">background:</span> #3B82F6;
                </p>
                <p>
                  <span className="feature-code-key">padding:</span> 10px 16px;
                </p>
                <p>{'}'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}