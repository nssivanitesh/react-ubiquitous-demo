import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { UITheme, UIPageTransition } from 'react-ubiquitous'

export type { UITheme, UIPageTransition }

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

export const THEME_COLORS: Record<UITheme, ThemeColors> = {
  html: {
    sidebar: '#1e293b',
    sidebarBorder: '#334155',
    sidebarText: '#f1f5f9',
    sidebarTextMuted: '#94a3b8',
    sidebarActive: '#6366f1',
    topbar: '#0f172a',
    topbarBorder: '#1e293b',
    content: '#f8fafc',
    contentText: '#0f172a',
  },
  light: {
    sidebar: '#f1f5f9',
    sidebarBorder: '#e2e8f0',
    sidebarText: '#1e293b',
    sidebarTextMuted: '#64748b',
    sidebarActive: '#6366f1',
    topbar: '#ffffff',
    topbarBorder: '#e2e8f0',
    content: '#f8fafc',
    contentText: '#0f172a',
  },
  dark: {
    sidebar: '#111827',
    sidebarBorder: '#1f2937',
    sidebarText: '#f9fafb',
    sidebarTextMuted: '#9ca3af',
    sidebarActive: '#6366f1',
    topbar: '#030712',
    topbarBorder: '#111827',
    content: '#1f2937',
    contentText: '#f9fafb',
  },
  custom: {
    sidebar: '#1a0a2e',
    sidebarBorder: '#3b1f5e',
    sidebarText: '#f0e6ff',
    sidebarTextMuted: '#c4b5fd',
    sidebarActive: '#a855f7',
    topbar: '#0d0520',
    topbarBorder: '#3b1f5e',
    content: '#faf5ff',
    contentText: '#1a0a2e',
  },
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
  colors: THEME_COLORS.html,
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
    <ThemeContext.Provider value={{ theme, setTheme, transition, setTransition, colors: THEME_COLORS[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

