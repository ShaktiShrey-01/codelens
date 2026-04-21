import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Search, Settings2, Zap } from 'lucide-react'
import logo from '../assets/logo11.png'
import './AuditNavbar.css'

export default function AuditNavbar({ onExport }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const handleAnalyze = () => {
    let url = query.trim()
    
    // Do nothing if input is empty
    if (!url) {
      inputRef.current?.focus()
      return
    }
    
    // Automatically append https:// if the user just types "google.com"
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    
    // Open the URL in a new tab so they don't lose the CodeLens dashboard
    window.open(url, '_blank')
    setQuery('') // Clear the input field after searching
  }

  return (
    <header className="auditbar">
      <Link to="/audit" className="auditbar-brand" aria-label="CodeLens Audit">
        <img src={logo} alt="CodeLens" className="auditbar-logo" />
        <span className="auditbar-name">CodeLens</span>
      </Link>

      <div className="auditbar-search-wrap">
        <div className="auditbar-search-field">
          <span className="auditbar-search-icon" aria-hidden="true">
            <Search size={15} />
          </span>
          <input
            ref={inputRef}
            className="auditbar-search-input"
            type="text"
            placeholder="Search or paste website URL..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleAnalyze()}
          />
        </div>

        <button type="button" className="auditbar-analyze-btn" onClick={handleAnalyze}>
          <Zap size={14} />
          <span>Analyze</span>
        </button>
      </div>

      <div className="auditbar-right">
        {/* The export function from Audit.jsx gets triggered here */}
        <button type="button" className="auditbar-export-btn" onClick={onExport}>
          <Download size={14} />
          <span>Export All</span>
        </button>

        <div className="auditbar-divider" />

        <Link to="/settings" className="auditbar-icon-btn" aria-label="Settings">
          <Settings2 size={17} />
        </Link>
      </div>
    </header>
  )
}