import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { UITheme, UIPageTransition } from 'react-ubiquitous'

export type { UITheme, UIPageTransition }

/**
 * Shell color tokens — mapped to CSS variables from react-ubiquitous/theme.css
 * so the app shell automatically follows the active theme (light / dark / custom).
 */
export interface ThemeColors {
  sidebar: string
  sidebarBorder: string
  sidebarText: string
  sidebarTextMuted: string
  sidebarActive: string
  topbar: string
  topbarBorder: string
  content: string
  contentText: string
}

/** CSS-variable-based theme tokens — react-ubiquitous/theme.css provides these. */
export const CSS_VAR_COLORS: ThemeColors = {
  sidebar:          'var(--sidebar)',
  sidebarBorder:    'var(--sidebar-border)',
  sidebarText:      'var(--sidebar-foreground)',
  sidebarTextMuted: 'var(--muted-foreground)',
  sidebarActive:    'var(--sidebar-primary)',
  topbar:           'var(--card)',
  topbarBorder:     'var(--border)',
  content:          'var(--background)',
  contentText:      'var(--foreground)',
}

interface ThemeContextValue {
  theme: UITheme
  setTheme: (t: UITheme) => void
  transition: UIPageTransition
  setTransition: (t: UIPageTransition) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'html',
  setTheme: () => {},
  transition: 'fade',
  setTransition: () => {},
  colors: CSS_VAR_COLORS,
})

function applyThemeToHtml(next: UITheme) {
  const root = document.documentElement
  root.classList.remove('dark')
  root.removeAttribute('data-theme')
  if (next === 'dark') root.classList.add('dark')
  else if (next === 'custom') root.setAttribute('data-theme', 'custom')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<UITheme>('html')
  const [transition, setTransition] = useState<UIPageTransition>('fade')

  useEffect(() => { applyThemeToHtml('html') }, [])

  function setTheme(next: UITheme) {
    applyThemeToHtml(next)
    setThemeState(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, transition, setTransition, colors: CSS_VAR_COLORS }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

