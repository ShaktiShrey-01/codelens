import './Feature2.css'
import { Clock3, Search, Code2 } from 'lucide-react'
import Card from './ui/card'

// Core capability cards shown as a 6-item responsive grid.
const INSIGHTS = [
  {
    number: '1',
    title: 'Fonts Detection',
    body: 'Identify all fonts used on a website instantly.',
  },
  {
    number: '2',
    title: 'Color Palette',
    body: 'Extract the complete color system used across the site.',
  },
  {
    number: '3',
    title: 'UI Components',
    body: 'Detect reusable components like buttons, cards and navbars.',
  },
  {
    number: '4',
    title: 'Layout Structure',
    body: 'Understand the layout hierarchy of each section.',
  },
  {
    number: '5',
    title: 'Framework Detection',
    body: 'Identify frameworks like Tailwind, Bootstrap or others.',
  },
  {
    number: '6',
    title: 'Export Ready Code',
    body: 'Export clean CSS or component code for your projects.',
  },
]

// Supporting value-proposition rows placed below the grid.
const WORKFLOW_ROWS = [
  {
    icon: <Clock3 size={26} />,
    title: 'Save Hours of Manual Inspection',
    body: 'Stop digging through browser dev tools to identify fonts, colors, and layouts. CodeLens automatically reveals the design structure of any website in seconds.',
  },
  {
    icon: <Search size={26} />,
    title: 'Understand the Design Behind Any Website',
    body: 'Break down any interface into its building blocks. Discover fonts, color systems, layout patterns, and reusable UI components instantly.',
  },
  {
    icon: <Code2 size={26} />,
    title: 'Export Clean, Reusable Code',
    body: 'Generate clean CSS or component-ready code and reuse design patterns in your own projects faster without rebuilding everything from scratch.',
  },
]

export default function Feature2() {
  return (
    <section className="feature2-section">
      <div className="feature2-ambient" aria-hidden="true" />
      <div className="content-shell feature2-shell">
        <div className="section-header section-header-center feature2-header">
          <h2 className="section-title">
            Discover the building blocks of any <em>website</em>
          </h2>
          <p className="section-body feature2-lead">
            CodeLens reveals design tokens, layout structure, and reusable UI components behind every public page.
          </p>
        </div>

        <div className="feature2-grid">
          {INSIGHTS.map((item) => (
            <article key={item.number} className="feature2-card feature2-card-pixel">
              {/* Same reusable animated background used by other card sections. */}
              <Card
                gap={10}
                speed={20}
                colors={['#f8fafc', '#90b4ff', '#5b3fd6']}
                className="feature2-card-canvas"
              />
              <div className="feature2-card-content">
                <span className="feature2-num">{item.number}</span>
                <h3 className="feature2-title">{item.title}</h3>
                <p className="feature2-copy">{item.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="feature2-story">
          <p className="feature2-story-label">Built for modern workflows</p>
          <p className="feature2-story-quote">
            "Stop digging through browser dev tools. CodeLens reveals the structure of any website instantly."
          </p>

          {/* Horizontal story rows collapse to stacked cards on mobile via CSS media queries. */}
          <div className="feature2-story-list">
            {WORKFLOW_ROWS.map((row) => (
              <article key={row.title} className="feature2-story-card">
                <div className="feature2-story-icon">{row.icon}</div>
                <div className="feature2-story-copy">
                  <h3>{row.title}</h3>
                  <p>{row.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
