// Documentation page with sidebar navigation and static product usage guidance.
import { BookOpen, Zap, Cpu, Code2, Box, Info, ChevronRight } from 'lucide-react'
import logo from '../assets/logo11.png'
import './Docs.css'

const SIDEBAR_GROUPS = [
  {
    title: 'Foundation',
    items: [
      { icon: <BookOpen size={16} />, label: 'Introduction', href: '#introduction', active: true },
      { icon: <Zap size={16} />, label: 'Quick Start', href: '#quick-start' },
    ],
  },
  {
    title: 'Core Features',
    items: [
      { icon: <Cpu size={16} />, label: 'Element Inspector', href: '#element-inspector' },
      { icon: <Code2 size={16} />, label: 'CSS Extraction', href: '#feature-modules' },
      { icon: <Box size={16} />, label: 'Asset Handoff', href: '#example-output' },
    ],
  },
]

const QUICK_START_STEPS = [
  'Download the Beta package (.zip) from your dashboard.',
  'Open chrome://extensions and toggle "Developer Mode".',
  'Click "Load Unpacked" and select the unzipped directory.',
]

const DOC_FEATURES = [
  {
    title: 'CSS Extraction',
    body: 'Generate clean CSS variables and utility-ready snippets from any inspected section.',
    tags: ['Variables', 'Spacing', 'Typography'],
  },
  {
    title: 'Component Mapping',
    body: 'Detect repeatable patterns and map them into cards, buttons, forms, and layout blocks.',
    tags: ['Pattern Match', 'Auto Group', 'Semantic'],
  },
  {
    title: 'Asset Handoff',
    body: 'Export colors, font stacks, and structure notes so developers can rebuild quickly.',
    tags: ['Export JSON', 'Copy CSS', 'Share Link'],
  },
]

const FAQ_ITEMS = [
  {
    q: 'Does CodeLens work on any website?',
    a: 'Yes. It analyzes public pages that can be rendered by your browser session.',
  },
  {
    q: 'Can I export ready-to-use code?',
    a: 'You can export CSS snippets, token data, and component-level notes for faster implementation.',
  },
  {
    q: 'Is this available during beta for free?',
    a: 'Yes. Current beta users can access all features without extra charges.',
  },
]

export default function Docs() {
  return (
    <div className="docs-page">
      <div className="docs-shell">
        <aside className="docs-sidebar" aria-label="Documentation navigation">
          <div className="docs-brand">
            <img src={logo} alt="CodeLens" className="docs-brand-logo" />
            <span className="docs-brand-text">DOCS</span>
          </div>

          {SIDEBAR_GROUPS.map((group) => (
            <section key={group.title} className="docs-sidebar-group">
              <h3 className="docs-group-title">{group.title}</h3>
              <ul className="docs-nav-list">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`docs-nav-item${item.active ? ' is-active' : ''}`}
                      aria-current={item.active ? 'page' : undefined}
                    >
                      <span className="docs-nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                      {item.active && <ChevronRight size={16} className="docs-nav-arrow" />}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>

        <main className="docs-content">
          <span className="docs-badge">V1.0.0-BETA</span>
          <h1 id="introduction" className="docs-title">Introduction</h1>
          <p className="docs-lead">
            CodeLens is an architectural discovery engine that helps you bridge the gap between raw code and design
            systems. Instantly deconstruct any website into clean design tokens.
          </p>

          <section className="docs-alert" aria-label="Beta notice">
            <div className="docs-alert-icon">
              <Info size={18} />
            </div>
            <div>
              <h2 className="docs-alert-title">Beta Access Unlocked</h2>
              <p className="docs-alert-copy">
                During the Beta phase, all premium features including Batch Export and SVG Optimization are free for
                all early adopters.
              </p>
            </div>
          </section>

          <section id="quick-start" className="docs-section">
            <h2 className="docs-section-title">Quick Start</h2>
            <p className="docs-section-lead">Follow these three steps to integrate CodeLens into your browser.</p>

            <div className="docs-step-list">
              {QUICK_START_STEPS.map((step, index) => (
                <div key={step} className="docs-step-row">
                  <span className="docs-step-num">0{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="element-inspector" className="docs-section">
            <h2 className="docs-section-title">Element Inspector</h2>
            <p className="docs-section-lead">
              Hover any UI block on a page to instantly inspect typography, spacing, and token-level values.
            </p>
          </section>

          <section id="feature-modules" className="docs-section">
            <h2 className="docs-section-title">Feature Modules</h2>
            <p className="docs-section-lead">
              Core modules below replicate the same analysis flow used inside the extension panel.
            </p>

            <div className="docs-feature-grid">
              {DOC_FEATURES.map((item) => (
                <article key={item.title} className="docs-feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="docs-feature-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="example-output" className="docs-section">
            <h2 className="docs-section-title">Example Output</h2>
            <p className="docs-section-lead">A typical token export generated from a landing page analysis.</p>

            <pre className="docs-code-block">
              <code>{`{
  "font": {
    "family": "Inter",
    "size": "14px",
    "weight": 500
  },
  "colors": {
    "primary": "#7B39FC",
    "surface": "#111827",
    "text": "#F3F4F6"
  },
  "spacing": [4, 8, 12, 16, 24, 32]
}`}</code>
            </pre>
          </section>

          <section className="docs-section docs-section-last">
            <h2 className="docs-section-title">FAQs</h2>
            <p className="docs-section-lead">Common questions from design and frontend teams.</p>

            <div className="docs-faq-list">
              {FAQ_ITEMS.map((item) => (
                <article key={item.q} className="docs-faq-card">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
