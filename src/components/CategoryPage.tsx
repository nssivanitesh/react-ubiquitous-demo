import { useState, useCallback, type ComponentType } from 'react'
import { UIStage, SectionErrorBoundary } from 'react-ubiquitous'
import type { UIStageConfig, UISectionConfig, I18nMessages, UIElementProps } from 'react-ubiquitous'
import { useTheme } from '../contexts/ThemeContext'
import { genDotNet, genPython, genLaravel } from '../utils/codeGen'

export type ComponentStatus = 'active' | 'wip'

export interface CategoryItem {
  id: string
  label: string
  config: object
  /** Whether this component is purely static (active) or requires user input / network (wip). */
  status?: ComponentStatus
}

interface CategoryPageProps {
  title: string
  description: string
  items: CategoryItem[]
  /** Feature 5 (1.0.13): persist form values to localStorage. */
  localStorageKey?: string
  /** Feature 6 (1.0.13): custom i18n validation messages. */
  i18n?: I18nMessages
  /** Feature 9 (1.0.13): debounced auto-save callback. */
  onAutoSave?: (values: Record<string, unknown>) => void
  /** Feature 4 (1.0.13): custom element renderers keyed by component name. */
  customComponents?: Record<string, ComponentType<UIElementProps>>
}

type PanelTab = 'preview' | 'config' | 'dotnet' | 'python' | 'laravel'

export function CategoryPage({
  title,
  description,
  items,
  localStorageKey,
  i18n,
  onAutoSave,
  customComponents,
}: CategoryPageProps) {
  const { theme, transition, colors } = useTheme()
  const [configs, setConfigs] = useState<object[]>(items.map(i => i.config))
  const [activeIdx, setActiveIdx] = useState(0)
  const [editText, setEditText] = useState(JSON.stringify(items[0].config, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [panelTab, setPanelTab] = useState<PanelTab>('preview')
  const [isPaneCollapsed, setIsPaneCollapsed] = useState(false)
  /** Feature 7 (1.0.13): readOnly toggle — forces every element into disabled/read-only mode. */
  const [readOnly, setReadOnly] = useState(false)
  /**
   * Feature 1 & 2 (1.0.13): formValues — passed to UIStage so hiddenExpr/disabledExpr
   * can evaluate against sibling field values in real time.
   */
  const [formValues, setFormValues] = useState<Record<string, unknown>>({})
  const handleChange = useCallback((name: string, value: unknown) => {
    setFormValues(prev => ({ ...prev, [name]: value }))
  }, [])

  const SIDE_PANE_LAYOUTS = new Set(['list-detail', 'tree-view', 'chat'])

  function hasSidePane(config: object): boolean {
    return SIDE_PANE_LAYOUTS.has((config as { layout?: string }).layout ?? '')
  }

  function applyPaneCollapse(config: object): object {
    const layout = (config as { layout?: string }).layout
    if (layout === 'tree-view') return { ...config, treeWidth: '0px' }
    return { ...config, listWidth: '0px' } // list-detail & chat
  }

  function handlePageChange(pageId: string) {
    const idx = items.findIndex(i => i.id === pageId)
    if (idx >= 0 && idx !== activeIdx) {
      setActiveIdx(idx)
      setEditText(JSON.stringify(configs[idx], null, 2))
      setError(null)
      setIsPaneCollapsed(false)
      setFormValues({})
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
    pages: items.map((item, i) => {
      const cfg = configs[i]
      const displayCfg = i === activeIdx && isPaneCollapsed && hasSidePane(cfg)
        ? applyPaneCollapse(cfg)
        : cfg
      const itemStatus = item.status
      return {
        id: item.id,
        title: item.label,
        description: itemStatus
          ? itemStatus === 'active' ? '🟢 Active — static display' : '🚧 WIP — user input / network'
          : undefined,
        order: i,
        sections: [displayCfg as UISectionConfig],
      }
    }),
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
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${colors.sidebarBorder}`, marginBottom: '1.25rem' }}>
        <button style={tabStyle(panelTab === 'preview')} onClick={() => setPanelTab('preview')}>
          🖼 Preview
        </button>
        <button style={tabStyle(panelTab === 'config')} onClick={() => setPanelTab('config')}>
          ⚙️ JSON Config {error ? '⚠' : ''}
        </button>
        <button style={tabStyle(panelTab === 'dotnet')} onClick={() => setPanelTab('dotnet')}>
          .NET
        </button>
        <button style={tabStyle(panelTab === 'python')} onClick={() => setPanelTab('python')}>
          Python
        </button>
        <button style={tabStyle(panelTab === 'laravel')} onClick={() => setPanelTab('laravel')}>
          Laravel
        </button>
        <div style={{ flex: 1 }} />

        {/* Feature 7 (1.0.13): readOnly toggle */}
        <button
          onClick={() => setReadOnly(r => !r)}
          title={readOnly ? 'Switch to edit mode' : 'Switch to read-only mode'}
          style={{
            padding: '0.28rem 0.75rem',
            fontSize: '0.75rem',
            borderRadius: '20px',
            cursor: 'pointer',
            border: `1px solid ${colors.sidebarBorder}`,
            background: readOnly ? '#0ea5e9' : 'transparent',
            color: readOnly ? '#ffffff' : colors.sidebarTextMuted,
            fontWeight: readOnly ? 600 : 400,
            marginBottom: '4px',
            marginRight: '0.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          {readOnly ? '🔒 Read-Only' : '✏️ Editable'}
        </button>

        {panelTab === 'preview' && hasSidePane(configs[activeIdx]) && (
          <button
            onClick={() => setIsPaneCollapsed(c => !c)}
            title={isPaneCollapsed ? 'Show side pane' : 'Hide side pane'}
            style={{
              padding: '0.28rem 0.75rem',
              fontSize: '0.75rem',
              borderRadius: '20px',
              cursor: 'pointer',
              border: `1px solid ${colors.sidebarBorder}`,
              background: isPaneCollapsed ? colors.sidebarActive : 'transparent',
              color: isPaneCollapsed ? '#ffffff' : colors.sidebarTextMuted,
              fontWeight: isPaneCollapsed ? 600 : 400,
              marginBottom: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {isPaneCollapsed ? '▶ Show Pane' : '◀ Hide Pane'}
          </button>
        )}
      </div>

      {/* Preview tab — wrapped in SectionErrorBoundary (Feature 9 / 1.0.13) */}
      {panelTab === 'preview' && (
        <SectionErrorBoundary>
          <UIStage
            config={stageConfig}
            onPageChange={handlePageChange}
            onChange={handleChange}
            formValues={formValues}
            readOnly={readOnly}
            localStorageKey={localStorageKey}
            i18n={i18n}
            onAutoSave={onAutoSave}
            customComponents={customComponents}
          />
        </SectionErrorBoundary>
      )}

      {/* Code tabs: .NET, Python, Laravel */}
      {(panelTab === 'dotnet' || panelTab === 'python' || panelTab === 'laravel') && (
        <CodeTab
          panelTab={panelTab}
          config={configs[activeIdx]}
          label={items[activeIdx]?.label}
          colors={colors}
        />
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

// ── CodeTab ───────────────────────────────────────────────────────────────────

const CODE_TAB_META: Record<string, { label: string; lang: string; gen: (c: object) => string }> = {
  dotnet:  { label: '.NET',    lang: 'csharp',  gen: c => genDotNet(c as Record<string, unknown>)  },
  python:  { label: 'Python',  lang: 'python',  gen: c => genPython(c as Record<string, unknown>)  },
  laravel: { label: 'Laravel', lang: 'php',     gen: c => genLaravel(c as Record<string, unknown>) },
}

interface CodeTabProps {
  panelTab: 'dotnet' | 'python' | 'laravel'
  config: object
  label: string
  colors: ReturnType<typeof useTheme>['colors']
}

function CodeTab({ panelTab, config, label, colors }: CodeTabProps) {
  const [copied, setCopied] = useState(false)
  const meta = CODE_TAB_META[panelTab]
  const code = meta.gen(config)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const PKG_LABEL: Record<string, string> = {
    dotnet:  'ReactUbiquitous.NuGet',
    python:  'react-ubiquitous-put',
    laravel: 'react-ubiquitous/composer',
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        background: '#1e293b',
        fontSize: '0.72rem',
        color: '#64748b',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderRadius: '6px 6px 0 0',
      }}>
        <span>{meta.label} Builder Code — {label}</span>
        <span style={{ marginLeft: '0.5rem', color: '#334155' }}>({PKG_LABEL[panelTab]})</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={handleCopy}
          style={{
            padding: '0.2rem 0.65rem',
            fontSize: '0.72rem',
            borderRadius: '4px',
            cursor: 'pointer',
            border: `1px solid ${colors.sidebarBorder}`,
            background: copied ? '#16a34a' : 'transparent',
            color: copied ? '#fff' : '#94a3b8',
            fontWeight: 500,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          width: '100%',
          minHeight: '520px',
          fontFamily: 'monospace',
          fontSize: '0.78rem',
          padding: '0.75rem',
          background: '#0f172a',
          color: '#e2e8f0',
          boxSizing: 'border-box',
          overflowX: 'auto',
          overflowY: 'auto',
          whiteSpace: 'pre',
          borderRadius: 0,
        }}
      >
        {code}
      </pre>
      <div style={{
        padding: '0.4rem 1rem',
        background: '#0f2027',
        color: '#334155',
        fontSize: '0.72rem',
        borderRadius: '0 0 6px 6px',
      }}>
        Auto-generated from JSON config above — copy and adapt for your {meta.label} project
      </div>
    </div>
  )
}
