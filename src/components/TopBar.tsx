import { useTheme, type UITheme, type UIPageTransition } from '../contexts/ThemeContext'

export type AppMode = 'complete' | 'individual'

const MODE_OPTIONS: { id: AppMode; label: string; icon: string }[] = [
  { id: 'complete', label: 'Complete', icon: '🗂️' },
  { id: 'individual', label: 'Individual', icon: '🧩' },
]

const THEME_OPTIONS: { id: UITheme; label: string; icon: string; description: string }[] = [
  { id: 'html', label: 'HTML', icon: '🌐', description: 'Follows ambient/system styles' },
  { id: 'light', label: 'Light', icon: '☀️', description: 'Force light mode' },
  { id: 'dark', label: 'Dark', icon: '🌙', description: 'Force dark mode' },
  { id: 'custom', label: 'Custom', icon: '🎨', description: 'Purple accent theme' },
]

const TRANSITION_OPTIONS: { id: UIPageTransition; label: string; icon: string }[] = [
  { id: 'none', label: 'None', icon: '⚡' },
  { id: 'fade', label: 'Fade', icon: '✨' },
  { id: 'slide-left', label: 'Slide →', icon: '➡️' },
  { id: 'slide-right', label: 'Slide ←', icon: '⬅️' },
]

export function TopBar({ mode, setMode }: { mode: AppMode; setMode: (m: AppMode) => void }) {
  const { theme, setTheme, transition, setTransition, colors } = useTheme()

  const btnBase: React.CSSProperties = {
    padding: '0.28rem 0.75rem',
    fontSize: '0.78rem',
    borderRadius: '20px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    lineHeight: '1.5',
  }

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 1.5rem',
      height: '52px',
      background: colors.topbar,
      borderBottom: `1px solid ${colors.topbarBorder}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexShrink: 0,
      gap: '1.25rem',
    }}>
      {/* Mode */}
      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.73rem', color: colors.sidebarTextMuted, marginRight: '0.1rem' }}>Mode:</span>
        {MODE_OPTIONS.map(opt => {
          const isActive = mode === opt.id
          return (
            <button key={opt.id} onClick={() => setMode(opt.id)} title={opt.label} style={{
              ...btnBase,
              border: isActive ? `1.5px solid ${colors.sidebarActive}` : `1px solid ${colors.sidebarBorder}`,
              background: isActive ? colors.sidebarActive : 'transparent',
              color: isActive ? '#ffffff' : colors.sidebarTextMuted,
              fontWeight: isActive ? 600 : 400,
            }}>
              {opt.icon} {opt.label}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '24px', background: colors.sidebarBorder }} />

      {/* Theme */}
      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.73rem', color: colors.sidebarTextMuted, marginRight: '0.1rem' }}>Theme:</span>
        {THEME_OPTIONS.map(opt => {
          const isActive = theme === opt.id
          return (
            <button key={opt.id} onClick={() => setTheme(opt.id)} title={opt.description} style={{
              ...btnBase,
              border: isActive ? `1.5px solid ${colors.sidebarActive}` : `1px solid ${colors.sidebarBorder}`,
              background: isActive ? colors.sidebarActive : 'transparent',
              color: isActive ? '#ffffff' : colors.sidebarTextMuted,
              fontWeight: isActive ? 600 : 400,
            }}>
              {opt.icon} {opt.label}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ width: '1px', height: '24px', background: colors.sidebarBorder }} />

      {/* Transition */}
      <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.73rem', color: colors.sidebarTextMuted, marginRight: '0.1rem' }}>Transition:</span>
        {TRANSITION_OPTIONS.map(opt => {
          const isActive = transition === opt.id
          return (
            <button key={opt.id} onClick={() => setTransition(opt.id)} title={opt.id} style={{
              ...btnBase,
              border: isActive ? `1.5px solid ${colors.sidebarActive}` : `1px solid ${colors.sidebarBorder}`,
              background: isActive ? colors.sidebarActive : 'transparent',
              color: isActive ? '#ffffff' : colors.sidebarTextMuted,
              fontWeight: isActive ? 600 : 400,
            }}>
              {opt.icon} {opt.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
