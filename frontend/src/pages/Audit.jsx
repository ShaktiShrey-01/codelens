// Live Audit page: receives captured element payloads, renders specs, and generates CSS/Tailwind code snippets.
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Check, Copy, Folder, Palette, Ruler, Search, Settings2, Type, Sparkles, Loader2, Code2 } from 'lucide-react'
import AuditNavbar from '../components/AuditNavbar'
import './Audit.css'

const normalizeUnit = (value) => {
  if (value == null || value === '') return '0px'
  if (typeof value === 'number') return `${value}px`
  return String(value)
}

const normalizeColor = (value) => {
  if (!value) return '#000000'
  return String(value)
}

const mapPayloadToInspection = (payload = {}) => {
  return {
    tag: String(payload.tag || payload.tagName || 'DIV').toUpperCase(),
    label: payload.text || payload.label || 'Captured Element',
    selector: payload.selector || '.extracted',
    color: String(payload.color || '#000000'),
    fontFamily: payload.fontFamily || 'System UI',
    fontSize: normalizeUnit(payload.fontSize || '14px'),
    fontWeight: String(payload.fontWeight || '400'),
    background: String(payload.backgroundColor || payload.background || '#000000'),
    border: payload.border || 'none',
    padding: normalizeUnit(payload.padding || '0px'),
    radius: normalizeUnit(payload.borderRadius || payload.radius || '0px'),
    width: normalizeUnit(payload.width || '100px'),
    height: normalizeUnit(payload.height || '100px'),
    asset: payload.asset || null, 
  }
}

// 🔥 VS CODE SYNTAX HIGHLIGHTER LOGIC 🔥
const formatVSCode = (code) => {
  if (!code) return '';
  // Strip any leftover markdown backticks just in case
  let cleanCode = code.replace(/```[a-z]*\n?/g, '').replace(/```/g, '').trim();
  
  return cleanCode
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Strings (Green)
    .replace(/("[^"]*")/g, '<span style="color: #98c379;">$1</span>')
    // Keywords (Purple)
    .replace(/\b(const|let|var|function|return|export|default|import|from)\b/g, '<span style="color: #c678dd;">$1</span>')
    // Attributes (Blue)
    .replace(/\b(className|style|onClick|type|href|src)\b/g, '<span style="color: #61afef;">$1</span>')
    // JSX Tags (Red/Pink)
    .replace(/(&lt;\/?)([a-zA-Z0-9]+)/g, '$1<span style="color: #e06c75;">$2</span>');
};

export default function Audit() {
  const [inspection, setInspection] = useState(null)
  const [mainTab, setMainTab] = useState('SPECS')
  const [codeTab, setCodeTab] = useState('TAILWIND')
  const [copied, setCopied] = useState(false)
  const [aiInsight, setAiInsight] = useState("")
  const [isAiLoading, setIsAiLoading] = useState(false)
  
  // Credits now live only in session memory (no browser storage).
  const [credits, setCredits] = useState(15)

  const location = useLocation()

  useEffect(() => {
    // Parses extension payload from URL query so the dashboard can render without shared global state.
    const applyInspection = (payload) => {
      if (!payload || typeof payload !== 'object') return
      setInspection(mapPayloadToInspection(payload))
      setAiInsight("") 
    }

    const urlParams = new URLSearchParams(location.search)
    const dataParam = urlParams.get('data')
    
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam))
        const firstItem = Array.isArray(decodedData) ? decodedData[0] : decodedData
        applyInspection(firstItem)
      } catch (error) {
        console.warn('Failed to parse CodeLens extension data:', error)
      }
    }
  }, [location.search])

  const getAiInsight = async () => {
    if (!inspection) return;
    
    if (credits <= 0) {
      setAiInsight("// ⚠️ Out of credits! Please refill.");
      return;
    }

    setIsAiLoading(true);
    setAiInsight(""); 

    // Sends extracted design DNA to backend AI endpoint and stores generated component code.
    try {
      const response = await fetch('http://localhost:5000/api/ai-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tag: inspection.tag,
          background: inspection.background,
          fontFamily: inspection.fontFamily,
          color: inspection.color,
          fontSize: inspection.fontSize
        })
      });

      if (response.status === 429) {
        setAiInsight("// ⚠️ API Rate limit exceeded. Please wait a moment.");
        setIsAiLoading(false);
        return;
      }

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setAiInsight(data.text);
      setCredits(prev => prev - 1); 

    } catch (err) {
      setAiInsight("// ❌ Error connecting to backend server.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const syntaxPreview = useMemo(() => {
    if (!inspection) return '// Awaiting element capture...'
    return `${inspection.selector} {\n  tag: ${inspection.tag.toLowerCase()};\n  color: ${inspection.color};\n  background: ${inspection.background};\n}`
  }, [inspection])

  const generatedCode = useMemo(() => {
    if (!inspection) return ''
    const tag = inspection.tag.toLowerCase()

    // Tailwind generator maps extracted token values into utility classes.
    if (codeTab === 'TAILWIND') {
      const tw = []
      if (inspection.radius && inspection.radius !== '0px') tw.push(`rounded-[${inspection.radius}]`)
      if (inspection.padding && inspection.padding !== '0px') tw.push(`p-[${inspection.padding}]`)
      if (inspection.fontSize) tw.push(`text-[${inspection.fontSize}]`)
      if (inspection.color && inspection.color !== '#000000') tw.push(`text-[${inspection.color}]`)
      if (inspection.background && inspection.background !== '#000000' && inspection.background !== 'rgba(0, 0, 0, 0)') {
        tw.push(`bg-[${inspection.background}]`)
      }

      const classStr = tw.length > 0 ? ` className="${tw.join(' ')}"` : ''
      return `<${tag}${classStr}>\n  ${inspection.label}\n</${tag}>`
    }

    // CSS generator mirrors captured values for direct copy/paste usage.
    return `<${tag} className="extracted-${tag}">\n  ${inspection.label}\n</${tag}>\n\n/* CSS */\n.extracted-${tag} {\n  background-color: ${inspection.background};\n  color: ${inspection.color};\n  border-radius: ${inspection.radius};\n  padding: ${inspection.padding};\n  font-size: ${inspection.fontSize};\n}`
  }, [inspection, codeTab])

  const handleCopy = async () => {
    // Copies currently selected generated code tab (CSS or Tailwind) into clipboard.
    if (!generatedCode) return
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_error) {
      setCopied(false)
    }
  }

  // Copy AI Code Function
  const handleCopyAi = async () => {
    // Copies AI block as raw code by stripping markdown wrappers if present.
    if (!aiInsight) return
    try {
      await navigator.clipboard.writeText(aiInsight.replace(/```[a-z]*\n?/g, '').replace(/```/g, '').trim())
      alert("AI Code Copied!");
    } catch (_error) {
      console.error("Failed to copy");
    }
  }

  const handleExportAll = () => {
    if (!inspection) {
      alert("No data to export! Please capture an element first.");
      return;
    }
    // Exports the currently inspected DNA as JSON for reuse in other projects.
    const exportData = JSON.stringify(inspection, null, 2);
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `codelens-dna-${inspection.tag.toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const creditPercentage = (credits / 15) * 100;

  return (
    <div className="audit-page">
      <AuditNavbar onExport={handleExportAll} />

      <div className="audit-body">
        {/* LEFT SIDEBAR */}
        <aside className="audit-leftbar">
          <button 
            type="button" 
            className="audit-new-btn"
            onClick={() => { setInspection(null); setAiInsight(""); }}
          >
            New Analysis
          </button>

          <button 
            type="button" 
            className={`audit-ai-btn ${(!inspection || isAiLoading || credits <= 0) ? 'disabled' : ''}`}
            onClick={getAiInsight}
            disabled={!inspection || isAiLoading || credits <= 0}
          >
            {isAiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            <span>Generate Code</span>
          </button>

          {/* 🔥 FIXED CREDITS SECTION SPACING 🔥 */}
          <div className="audit-credits-card" style={{ marginTop: '24px' }}>
            <div className="audit-credits-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px' }}>AI CREDITS</span>
              
              <strong style={{ 
                color: credits > 0 ? '#7b39fc' : '#ef4444', 
                display: 'flex', 
                alignItems: 'baseline' /* Aligns text neatly */
              }}>
                <span style={{ fontSize: '16px', marginRight: '6px' }}>{credits}</span>
                <span style={{ fontSize: '11px' }}>LEFT</span>
              </strong>
            </div>
            <div 
              className="audit-credits-line" 
              style={{ 
                background: `linear-gradient(90deg, #7b39fc ${creditPercentage}%, rgba(255,255,255,0.1) ${creditPercentage}%)`,
                transition: 'background 0.3s ease'
              }} 
            />
            {credits <= 0 && (
               <button type="button" className="audit-upgrade-btn" style={{ fontSize: '13px', height: '40px' }} onClick={() => setCredits(15)}>
                 Refill Credits
               </button>
            )}
          </div>
          
          <div className="audit-recent-label" style={{ marginTop: '24px' }}>
            <Search size={15} /><span>RECENT</span>
          </div>
          
          <nav className="audit-menu" style={{ marginTop: '10px' }}>
            <NavLink to="/" end className={({ isActive }) => `audit-menu-item${isActive ? ' is-active' : ''}`}><Search size={18} />Home</NavLink>
            <NavLink to="/audit" className={({ isActive }) => `audit-menu-item${isActive ? ' is-active' : ''}`}><Code2 size={18} />Audit</NavLink>
            <NavLink to="/docs" className={({ isActive }) => `audit-menu-item${isActive ? ' is-active' : ''}`}><Folder size={18} />Docs</NavLink>
            <NavLink to="/settings" className={({ isActive }) => `audit-menu-item${isActive ? ' is-active' : ''}`}><Settings2 size={18} />Settings</NavLink>
          </nav>
          
          <span className="audit-beta">BETA VERSION</span>
        </aside>

        {/* MAIN CANVAS */}
        <main className="audit-canvas">
          <div className="audit-live-title"><span className="audit-live-dot" />LIVE AUDIT</div>

          {inspection ? (
            <section className="audit-live-shell" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div className="audit-capture-bar" style={{ marginTop: '0' }}>
                <span className="audit-tag-chip">{inspection.tag}</span>
                <span className="audit-capture-text">{inspection.label}</span>
              </div>

              <div className="audit-tabs" style={{ marginBottom: '0', minHeight: 'auto', paddingBottom: '10px' }}>
                <button type="button" className={`audit-tab ${mainTab === 'SPECS' ? 'audit-tab-active' : ''}`} onClick={() => setMainTab('SPECS')}>ELEMENT SPECS</button>
                <button type="button" className={`audit-tab ${mainTab === 'SOURCE' ? 'audit-tab-active' : ''}`} onClick={() => setMainTab('SOURCE')}>SOURCE CODE</button>
              </div>

              {mainTab === 'SPECS' ? (
                <div className="audit-spec-grid">
                  <article className="audit-spec-card">
                    <h3><Type size={16} /> TYPOGRAPHY</h3>
                    <div className="audit-spec-row"><span>FONT</span><strong>{inspection.fontFamily}</strong></div>
                    <div className="audit-spec-row"><span>SIZE</span><strong>{inspection.fontSize}</strong></div>
                    <div className="audit-spec-row"><span>WEIGHT</span><strong>{inspection.fontWeight}</strong></div>
                    <div className="audit-spec-row"><span>COLOR</span><strong className="audit-color-value"><i style={{ background: inspection.color }} />{inspection.color}</strong></div>
                  </article>
                  <article className="audit-spec-card">
                    <h3><Palette size={16} /> APPEARANCE</h3>
                    <div className="audit-spec-row"><span>BACKGROUND</span><strong className="audit-color-value"><i style={{ background: inspection.background }} />{inspection.background}</strong></div>
                    <div className="audit-spec-row"><span>BORDER</span><strong>{inspection.border}</strong></div>
                    <div className="audit-spec-row"><span>PADDING</span><strong>{inspection.padding}</strong></div>
                    <div className="audit-spec-row"><span>RADIUS</span><strong>{inspection.radius}</strong></div>
                  </article>
                  <article className="audit-spec-card">
                    <h3><Ruler size={16} /> GEOMETRY</h3>
                    <div className="audit-spec-row"><span>WIDTH</span><strong>{inspection.width}</strong></div>
                    <div className="audit-spec-row"><span>HEIGHT</span><strong>{inspection.height}</strong></div>
                    <div className="audit-spec-row"><span>TAG</span><strong>{inspection.tag}</strong></div>
                  </article>
                </div>
              ) : (
                <section className="audit-source-shell">
                  <div className="audit-source-toolbar">
                    <div className="audit-code-toggle">
                      <button type="button" className={`audit-code-toggle-btn ${codeTab === 'CSS' ? 'active' : ''}`} onClick={() => setCodeTab('CSS')}>CSS</button>
                      <button type="button" className={`audit-code-toggle-btn ${codeTab === 'TAILWIND' ? 'active' : ''}`} onClick={() => setCodeTab('TAILWIND')}>TAILWIND</button>
                    </div>
                    <button type="button" className="audit-copy-btn" onClick={handleCopy}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? 'COPIED!' : 'COPY CODE'}
                    </button>
                  </div>
                  <pre className="audit-source-code"><code>{generatedCode}</code></pre>
                </section>
              )}
            </section>
          ) : (
            <div className="audit-center-hint" aria-hidden="true"><div className="audit-cube" /><span>SELECT ELEMENT TO INSPECT</span></div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="audit-rightbar">
          <section className="audit-preview-card">
            <div className="audit-preview-head"><span>SYNTAX PREVIEW</span><strong>CYBERPUNK</strong></div>
            <pre className="audit-preview-code">{syntaxPreview}</pre>
          </section>

          {/* 🔥 NEW AI CODE SECTION (VS Code Formatting) 🔥 */}
          <section className="audit-panel-block ai-insight-section" style={{ borderTop: 'none', paddingTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 className="flex items-center gap-2" style={{ color: '#a855f7', margin: 0 }}>
                <Code2 size={16} /> AI CODE
              </h3>
              {aiInsight && !isAiLoading && (
                <button onClick={handleCopyAi} style={{ background: 'transparent', border: 'none', color: '#a855f7', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>
                  COPY
                </button>
              )}
            </div>
            
            <div style={{ padding: 0, background: 'transparent', border: 'none' }}>
              {isAiLoading ? (
                <div className="audit-source-shell" style={{ margin: 0, padding: '16px', background: 'rgba(5, 12, 29, 0.58)' }}>
                   <p style={{ color: '#888', fontStyle: 'italic', fontSize: '12px', margin: 0 }}>Writing Component...</p>
                </div>
              ) : aiInsight ? (
                <div className="audit-source-shell" style={{ margin: 0, padding: 0, border: 'none' }}>
                  <pre className="audit-source-code" style={{ margin: 0, minHeight: '100px', maxHeight: '300px', overflowY: 'auto', background: '#282c34', color: '#abb2bf', padding: '14px' }}>
                    {/* Injecting the formatted HTML directly */}
                    <code dangerouslySetInnerHTML={{ __html: formatVSCode(aiInsight) }} />
                  </pre>
                </div>
              ) : (
                <div className="audit-source-shell" style={{ margin: 0, padding: '16px', background: 'rgba(5, 12, 29, 0.58)' }}>
                  <p style={{ color: '#666', fontStyle: 'italic', fontSize: '12px', margin: 0 }}>Click "Generate Code" to build.</p>
                </div>
              )}
            </div>
          </section>

          {inspection && (
            <section className="audit-panel-block">
              <h3>DESIGN SYSTEM</h3>

              <div className="audit-panel-group">
                <h4>COLORS</h4>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  {inspection.background && inspection.background !== '#000000' && inspection.background !== 'rgba(0, 0, 0, 0)' && (
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <span className="audit-panel-color" style={{ background: inspection.background, width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #333' }} />
                       <span style={{ fontSize: '11px', color: '#888' }}>BG</span>
                     </div>
                  )}
                  {inspection.color && (
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <span className="audit-panel-color" style={{ background: inspection.color, width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #333' }} />
                       <span style={{ fontSize: '11px', color: '#888' }}>Text</span>
                     </div>
                  )}
                </div>
              </div>

              <div className="audit-panel-group">
                <h4>FONTS</h4>
                <p style={{ fontFamily: 'monospace', color: '#a855f7', marginTop: '8px', fontSize: '13px' }}>
                  {inspection.fontFamily}
                </p>
              </div>

              <div className="audit-panel-group">
                <h4 className="audit-assets-title"><Folder size={15} /> ASSETS</h4>
                
                <div className="audit-asset-item">
                  <span>Logos</span>
                  <strong>({inspection.asset?.type === 'logos' ? '1' : '0'})</strong>
                </div>
                {inspection.asset?.type === 'logos' ? (
                  <div style={{ padding: '10px', background: '#111', borderRadius: '8px', marginTop: '4px' }}>
                    <img src={inspection.asset.url} alt="Logo" style={{ maxWidth: '100%', maxHeight: '40px', objectFit: 'contain' }} />
                  </div>
                ) : <div className="audit-empty-card">NO LOGOS CAPTURED YET</div>}

                <div className="audit-asset-item">
                  <span>Icons</span>
                  <strong>({inspection.asset?.type === 'icons' ? '1' : '0'})</strong>
                </div>
                {inspection.asset?.type === 'icons' ? (
                  <div style={{ padding: '10px', background: '#111', borderRadius: '8px', marginTop: '4px', color: 'white' }} dangerouslySetInnerHTML={{ __html: inspection.asset.content }} />
                ) : <div className="audit-empty-card">NO ICONS CAPTURED YET</div>}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}