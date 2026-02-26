import { useState } from 'react'
import BlogPage from './pages/BlogPage'
import ChartsPage from './pages/ChartsPage'
import LayoutPage from './pages/LayoutPage'
import NavigationPage from './pages/NavigationPage'
import FeedbackPage from './pages/FeedbackPage'
import OverlaysPage from './pages/OverlaysPage'
import DisclosurePage from './pages/DisclosurePage'
import DataDisplayPage from './pages/DataDisplayPage'
import FieldsPage from './pages/FieldsPage'
import CompletePage from './pages/CompletePage'
import ThemeGeneratorPage from './pages/ThemeGeneratorPage'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { TopBar, type AppMode } from './components/TopBar'

declare const __RU_VERSION__: string

type ComponentStatus = 'active' | 'wip'

const PAGES = [
  { id: 'home',         label: '🏠 Home',         component: BlogPage,        status: 'active' as ComponentStatus },
  { id: 'charts',       label: '📊 Charts',       component: ChartsPage,      status: 'active' as ComponentStatus },
  { id: 'layout',       label: '🏗️ Layout',       component: LayoutPage,      status: 'wip'    as ComponentStatus },
  { id: 'navigation',   label: '🧭 Navigation',   component: NavigationPage,  status: 'wip'    as ComponentStatus },
  { id: 'feedback',     label: '💬 Feedback',     component: FeedbackPage,    status: 'active' as ComponentStatus },
  { id: 'overlays',     label: '🪟 Overlays',     component: OverlaysPage,    status: 'wip'    as ComponentStatus },
  { id: 'disclosure',   label: '📂 Disclosure',   component: DisclosurePage,  status: 'active' as ComponentStatus },
  { id: 'data-display', label: '📋 Data Display', component: DataDisplayPage, status: 'active' as ComponentStatus },
  { id: 'fields',       label: '📝 Fields',       component: FieldsPage,      status: 'wip'    as ComponentStatus },
]

function StatusBadge({ status }: { status: ComponentStatus }) {
  const isActive = status === 'active'
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.1rem 0.45rem',
      borderRadius: '20px',
      fontSize: '0.6rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: isActive ? '#16a34a22' : '#d9770622',
      color: isActive ? '#16a34a' : '#d97706',
      border: `1px solid ${isActive ? '#16a34a44' : '#d9770644'}`,
      marginLeft: '0.4rem',
      verticalAlign: 'middle',
      flexShrink: 0,
    }}>
      {isActive ? 'Active' : 'WIP'}
    </span>
  )
}

function AppShell() {
  const [activePage, setActivePage] = useState('home')
  const [mode, setMode] = useState<AppMode>('complete')
  const { colors } = useTheme()
  const ActiveComponent = PAGES.find(p => p.id === activePage)?.component || BlogPage

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <TopBar mode={mode} setMode={setMode} />
      {mode === 'theme-generator' ? (
        <main style={{ flex: 1, overflow: 'auto', background: colors.content, color: colors.contentText }}>
          <ThemeGeneratorPage />
        </main>
      ) : mode === 'complete' ? (
        <main style={{ flex: 1, padding: '2rem', overflow: 'auto', background: colors.content, color: colors.contentText }}>
          <CompletePage />
        </main>
      ) : (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <aside style={{
            width: '220px',
            minWidth: '220px',
            background: colors.sidebar,
            color: colors.sidebarText,
            padding: '1.5rem 0',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}>
            <div style={{ padding: '0 1.5rem 1.5rem', borderBottom: `1px solid ${colors.sidebarBorder}` }}>
              <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: colors.sidebarText }}>react-ubiquitous</h1>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: colors.sidebarTextMuted }}>Component Demo v{__RU_VERSION__}</p>
            </div>
            <nav style={{ padding: '1rem 0', flex: 1 }}>
              {PAGES.map(page => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '0.6rem 1.5rem',
                    background: activePage === page.id ? colors.sidebarActive : 'transparent',
                    color: activePage === page.id ? '#ffffff' : colors.sidebarTextMuted,
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  <span>{page.label}</span>
                  <StatusBadge status={page.status} />
                </button>
              ))}
            </nav>
            <div style={{ padding: '1rem 1.5rem', borderTop: `1px solid ${colors.sidebarBorder}`, fontSize: '0.75rem', color: colors.sidebarTextMuted }}>
              Edit JSON configs to see live component changes
            </div>
          </aside>

          <main style={{ flex: 1, padding: '2rem', overflow: 'auto', background: colors.content, color: colors.contentText }}>
            <ActiveComponent />
          </main>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}
