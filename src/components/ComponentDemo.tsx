import { useState } from 'react'
import { UISection } from 'react-ubiquitous'

interface ComponentDemoProps {
  title: string
  description?: string
  initialConfig: object
}

export function ComponentDemo({ title, description, initialConfig }: ComponentDemoProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(initialConfig, null, 2))
  const [config, setConfig] = useState(initialConfig)
  const [error, setError] = useState<string | null>(null)

  function handleChange(value: string) {
    setJsonText(value)
    try {
      const parsed = JSON.parse(value)
      setConfig(parsed)
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <div style={{ marginBottom: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{title}</h3>
        {description && <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>{description}</p>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ borderRight: '1px solid #e2e8f0' }}>
          <div style={{ padding: '0.5rem 1rem', background: '#f1f5f9', fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            JSON Config (edit to see live changes)
          </div>
          <textarea
            value={jsonText}
            onChange={(e) => handleChange(e.target.value)}
            style={{
              width: '100%',
              height: '300px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              padding: '0.75rem',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              background: '#1e293b',
              color: '#e2e8f0',
              boxSizing: 'border-box'
            }}
          />
          {error && (
            <div style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#dc2626', fontSize: '0.8rem' }}>
              ⚠ {error}
            </div>
          )}
        </div>
        <div style={{ padding: '1rem', overflow: 'auto' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Live Preview
          </div>
          {!error && (
            <UISection config={config as any} />
          )}
        </div>
      </div>
    </div>
  )
}
