import { useState } from 'react'
import ChartsPage from './pages/ChartsPage'
import LayoutPage from './pages/LayoutPage'
import NavigationPage from './pages/NavigationPage'
import FeedbackPage from './pages/FeedbackPage'
import OverlaysPage from './pages/OverlaysPage'
import DisclosurePage from './pages/DisclosurePage'
import DataDisplayPage from './pages/DataDisplayPage'
import FieldsPage from './pages/FieldsPage'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { TopBar } from './components/TopBar'

const PAGES = [
  { id: 'charts', label: '📊 Charts', component: ChartsPage },
  { id: 'layout', label: '🏗️ Layout', component: LayoutPage },
  { id: 'navigation', label: '🧭 Navigation', component: NavigationPage },
  { id: 'feedback', label: '💬 Feedback', component: FeedbackPage },
  { id: 'overlays', label: '🪟 Overlays', component: OverlaysPage },
  { id: 'disclosure', label: '📂 Disclosure', component: DisclosurePage },
  { id: 'data-display', label: '📋 Data Display', component: DataDisplayPage },
  { id: 'fields', label: '📝 Fields', component: FieldsPage },
]

function AppShell() {
  const [activePage, setActivePage] = useState('charts')
  const { colors } = useTheme()
  const ActiveComponent = PAGES.find(p => p.id === activePage)?.component || ChartsPage

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <TopBar />
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
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: colors.sidebarTextMuted }}>Component Demo v1.0.6</p>
          </div>
          <nav style={{ padding: '1rem 0', flex: 1 }}>
            {PAGES.map(page => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                style={{
                  display: 'block',
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
                {page.label}
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
