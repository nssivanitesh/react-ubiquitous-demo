import { useState } from 'react'
import { UIStage } from 'react-ubiquitous'
import type { UIStageConfig, UISectionConfig } from 'react-ubiquitous'
import { useTheme } from '../contexts/ThemeContext'

export interface CategoryItem {
  id: string
  label: string
  config: object
}

interface CategoryPageProps {
  title: string
  description: string
  items: CategoryItem[]
}

type PanelTab = 'preview' | 'config'

export function CategoryPage({ title, description, items }: CategoryPageProps) {
  const { theme, transition, colors } = useTheme()
  const [configs, setConfigs] = useState<object[]>(items.map(i => i.config))
  const [activeIdx, setActiveIdx] = useState(0)
  const [editText, setEditText] = useState(JSON.stringify(items[0].config, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [panelTab, setPanelTab] = useState<PanelTab>('preview')

  function handlePageChange(pageId: string) {
    const idx = items.findIndex(i => i.id === pageId)
    if (idx >= 0 && idx !== activeIdx) {
      setActiveIdx(idx)
      setEditText(JSON.stringify(configs[idx], null, 2))
      setError(null)
    }
  }

  function handleJsonChange(val: string) {
    setEditText(val)
    try {
      const parsed = JSON.parse(val)
      setConfigs(prev => {
        const next = [...prev]
        next[activeIdx] = parsed
        return next
      })
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const stageConfig: UIStageConfig = {
    id: `stage-${title.replace(/\s+/g, '-')}`,
    theme,
    pageTransition: transition,
    pages: items.map((item, i) => ({
      id: item.id,
      title: item.label,
      order: i,
      sections: [configs[i] as UISectionConfig],
    })),
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.45rem 1.1rem',
    fontSize: '0.82rem',
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    border: 'none',
    borderBottom: active ? `2px solid ${colors.sidebarActive}` : '2px solid transparent',
    background: 'transparent',
    color: active ? colors.sidebarActive : colors.sidebarTextMuted,
  })

  return (
    <div>
      <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.75rem', fontWeight: 700, color: colors.contentText }}>{title}</h2>
      <p style={{ margin: '0 0 1rem', color: colors.sidebarTextMuted, fontSize: '0.9rem' }}>
        {description}{' '}
        <span style={{ opacity: 0.7 }}>Switch tabs in the preview to see the <strong>{transition}</strong> transition from the library.</span>
      </p>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${colors.sidebarBorder}`, marginBottom: '1.25rem' }}>
        <button style={tabStyle(panelTab === 'preview')} onClick={() => setPanelTab('preview')}>
          🖼 Preview
        </button>
        <button style={tabStyle(panelTab === 'config')} onClick={() => setPanelTab('config')}>
          ⚙️ JSON Config {error ? '⚠' : ''}
        </button>
      </div>

      {/* Preview tab */}
      {panelTab === 'preview' && (
        <UIStage config={stageConfig} onPageChange={handlePageChange} />
      )}

      {/* Config tab */}
      {panelTab === 'config' && (
        <div>
          <div style={{
            padding: '0.5rem 1rem',
            background: '#1e293b',
            fontSize: '0.72rem',
            color: '#64748b',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '6px 6px 0 0',
          }}>
            JSON Config — {items[activeIdx]?.label}
          </div>
          <textarea
            value={editText}
            onChange={e => handleJsonChange(e.target.value)}
            style={{
              width: '100%',
              height: '520px',
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              padding: '0.75rem',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              background: '#1e293b',
              color: '#e2e8f0',
              boxSizing: 'border-box',
              display: 'block',
            }}
          />
          {error
            ? <div style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#dc2626', fontSize: '0.8rem', borderRadius: '0 0 6px 6px' }}>⚠ {error}</div>
            : <div style={{ padding: '0.4rem 1rem', background: '#0f2027', color: '#334155', fontSize: '0.72rem', borderRadius: '0 0 6px 6px' }}>
                ✅ Valid JSON — edit and see live changes in the preview
              </div>
          }
        </div>
      )}
    </div>
  )
}
