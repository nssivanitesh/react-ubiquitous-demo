import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import type { ThemeColors } from '../contexts/ThemeContext'

// ── Types ─────────────────────────────────────────────────────────────────────

type TokenKey =
  | 'background' | 'foreground'
  | 'card' | 'card-foreground'
  | 'popover' | 'popover-foreground'
  | 'primary' | 'primary-foreground'
  | 'secondary' | 'secondary-foreground'
  | 'muted' | 'muted-foreground'
  | 'accent' | 'accent-foreground'
  | 'destructive'
  | 'border' | 'input' | 'ring'
  | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5'
  | 'sidebar' | 'sidebar-foreground'
  | 'sidebar-primary' | 'sidebar-primary-foreground'
  | 'sidebar-accent' | 'sidebar-accent-foreground'
  | 'sidebar-border' | 'sidebar-ring'

type TokenValues = Record<TokenKey, string>
type PresetKey = 'default' | 'dark' | 'ocean' | 'forest' | 'sunset' | 'monokai'

// ── Token groups ──────────────────────────────────────────────────────────────

const TOKEN_GROUPS: {
  id: string
  label: string
  comment: string
  tokens: { key: TokenKey; label: string }[]
}[] = [
  {
    id: 'base',
    label: '🎨 Base',
    comment: 'Base',
    tokens: [
      { key: 'background', label: 'Background' },
      { key: 'foreground', label: 'Foreground' },
    ],
  },
  {
    id: 'card-popover',
    label: '🃏 Card & Popover',
    comment: 'Card & Popover',
    tokens: [
      { key: 'card', label: 'Card' },
      { key: 'card-foreground', label: 'Card Foreground' },
      { key: 'popover', label: 'Popover' },
      { key: 'popover-foreground', label: 'Popover Foreground' },
    ],
  },
  {
    id: 'primary',
    label: '✨ Primary',
    comment: 'Primary',
    tokens: [
      { key: 'primary', label: 'Primary' },
      { key: 'primary-foreground', label: 'Primary Foreground' },
    ],
  },
  {
    id: 'secondary-muted',
    label: '🔅 Secondary, Muted & Accent',
    comment: 'Secondary, Muted & Accent',
    tokens: [
      { key: 'secondary', label: 'Secondary' },
      { key: 'secondary-foreground', label: 'Secondary Foreground' },
      { key: 'muted', label: 'Muted' },
      { key: 'muted-foreground', label: 'Muted Foreground' },
      { key: 'accent', label: 'Accent' },
      { key: 'accent-foreground', label: 'Accent Foreground' },
    ],
  },
  {
    id: 'state',
    label: '⚠️ State',
    comment: 'State',
    tokens: [
      { key: 'destructive', label: 'Destructive' },
    ],
  },
  {
    id: 'border-input',
    label: '🔲 Border & Input',
    comment: 'Border & Input',
    tokens: [
      { key: 'border', label: 'Border' },
      { key: 'input', label: 'Input' },
      { key: 'ring', label: 'Ring' },
    ],
  },
  {
    id: 'charts',
    label: '📊 Charts',
    comment: 'Charts',
    tokens: [
      { key: 'chart-1', label: 'Chart 1' },
      { key: 'chart-2', label: 'Chart 2' },
      { key: 'chart-3', label: 'Chart 3' },
      { key: 'chart-4', label: 'Chart 4' },
      { key: 'chart-5', label: 'Chart 5' },
    ],
  },
  {
    id: 'sidebar',
    label: '🗃️ Sidebar',
    comment: 'Sidebar',
    tokens: [
      { key: 'sidebar', label: 'Sidebar' },
      { key: 'sidebar-foreground', label: 'Foreground' },
      { key: 'sidebar-primary', label: 'Primary' },
      { key: 'sidebar-primary-foreground', label: 'Primary Foreground' },
      { key: 'sidebar-accent', label: 'Accent' },
      { key: 'sidebar-accent-foreground', label: 'Accent Foreground' },
      { key: 'sidebar-border', label: 'Border' },
      { key: 'sidebar-ring', label: 'Ring' },
    ],
  },
]

// ── Presets ───────────────────────────────────────────────────────────────────

const DEFAULT_TOKENS: TokenValues = {
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  'card-foreground': '#09090b',
  popover: '#ffffff',
  'popover-foreground': '#09090b',
  primary: '#18181b',
  'primary-foreground': '#fafafa',
  secondary: '#f4f4f5',
  'secondary-foreground': '#18181b',
  muted: '#f4f4f5',
  'muted-foreground': '#71717a',
  accent: '#f4f4f5',
  'accent-foreground': '#18181b',
  destructive: '#ef4444',
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#a1a1aa',
  'chart-1': '#e07822',
  'chart-2': '#2da4af',
  'chart-3': '#3b5b8c',
  'chart-4': '#d4b43a',
  'chart-5': '#cba428',
  sidebar: '#fafafa',
  'sidebar-foreground': '#09090b',
  'sidebar-primary': '#18181b',
  'sidebar-primary-foreground': '#fafafa',
  'sidebar-accent': '#f4f4f5',
  'sidebar-accent-foreground': '#18181b',
  'sidebar-border': '#e4e4e7',
  'sidebar-ring': '#a1a1aa',
}

const PRESETS: Record<PresetKey, { name: string; icon: string; values: TokenValues }> = {
  default: { name: 'Default', icon: '🌗', values: DEFAULT_TOKENS },
  dark: {
    name: 'Dark',
    icon: '🌑',
    values: {
      background: '#09090b',
      foreground: '#fafafa',
      card: '#18181b',
      'card-foreground': '#fafafa',
      popover: '#18181b',
      'popover-foreground': '#fafafa',
      primary: '#e4e4e7',
      'primary-foreground': '#18181b',
      secondary: '#27272a',
      'secondary-foreground': '#fafafa',
      muted: '#27272a',
      'muted-foreground': '#a1a1aa',
      accent: '#27272a',
      'accent-foreground': '#fafafa',
      destructive: '#e8523a',
      border: '#27272a',
      input: '#27272a',
      ring: '#71717a',
      'chart-1': '#6366f1',
      'chart-2': '#2eb886',
      'chart-3': '#cba428',
      'chart-4': '#a855f7',
      'chart-5': '#f05b3a',
      sidebar: '#18181b',
      'sidebar-foreground': '#fafafa',
      'sidebar-primary': '#6366f1',
      'sidebar-primary-foreground': '#fafafa',
      'sidebar-accent': '#27272a',
      'sidebar-accent-foreground': '#fafafa',
      'sidebar-border': '#27272a',
      'sidebar-ring': '#71717a',
    },
  },
  ocean: {
    name: 'Ocean',
    icon: '🌊',
    values: {
      background: '#f0f9ff',
      foreground: '#0c1a2e',
      card: '#ffffff',
      'card-foreground': '#0c1a2e',
      popover: '#ffffff',
      'popover-foreground': '#0c1a2e',
      primary: '#0369a1',
      'primary-foreground': '#f0f9ff',
      secondary: '#e0f2fe',
      'secondary-foreground': '#0c4a6e',
      muted: '#e0f2fe',
      'muted-foreground': '#0369a1',
      accent: '#bae6fd',
      'accent-foreground': '#0c4a6e',
      destructive: '#ef4444',
      border: '#bae6fd',
      input: '#bae6fd',
      ring: '#38bdf8',
      'chart-1': '#0ea5e9',
      'chart-2': '#06b6d4',
      'chart-3': '#0891b2',
      'chart-4': '#0e7490',
      'chart-5': '#155e75',
      sidebar: '#e0f2fe',
      'sidebar-foreground': '#0c1a2e',
      'sidebar-primary': '#0369a1',
      'sidebar-primary-foreground': '#f0f9ff',
      'sidebar-accent': '#bae6fd',
      'sidebar-accent-foreground': '#0c4a6e',
      'sidebar-border': '#bae6fd',
      'sidebar-ring': '#38bdf8',
    },
  },
  forest: {
    name: 'Forest',
    icon: '🌲',
    values: {
      background: '#f0fdf4',
      foreground: '#052e16',
      card: '#ffffff',
      'card-foreground': '#052e16',
      popover: '#ffffff',
      'popover-foreground': '#052e16',
      primary: '#15803d',
      'primary-foreground': '#f0fdf4',
      secondary: '#dcfce7',
      'secondary-foreground': '#14532d',
      muted: '#dcfce7',
      'muted-foreground': '#166534',
      accent: '#bbf7d0',
      'accent-foreground': '#14532d',
      destructive: '#ef4444',
      border: '#bbf7d0',
      input: '#bbf7d0',
      ring: '#4ade80',
      'chart-1': '#22c55e',
      'chart-2': '#16a34a',
      'chart-3': '#15803d',
      'chart-4': '#86efac',
      'chart-5': '#4ade80',
      sidebar: '#dcfce7',
      'sidebar-foreground': '#052e16',
      'sidebar-primary': '#15803d',
      'sidebar-primary-foreground': '#f0fdf4',
      'sidebar-accent': '#bbf7d0',
      'sidebar-accent-foreground': '#14532d',
      'sidebar-border': '#bbf7d0',
      'sidebar-ring': '#4ade80',
    },
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    values: {
      background: '#fff7ed',
      foreground: '#1c0a00',
      card: '#ffffff',
      'card-foreground': '#1c0a00',
      popover: '#ffffff',
      'popover-foreground': '#1c0a00',
      primary: '#c2410c',
      'primary-foreground': '#fff7ed',
      secondary: '#ffedd5',
      'secondary-foreground': '#9a3412',
      muted: '#ffedd5',
      'muted-foreground': '#c2410c',
      accent: '#fed7aa',
      'accent-foreground': '#9a3412',
      destructive: '#dc2626',
      border: '#fed7aa',
      input: '#fed7aa',
      ring: '#fb923c',
      'chart-1': '#f97316',
      'chart-2': '#ef4444',
      'chart-3': '#eab308',
      'chart-4': '#f43f5e',
      'chart-5': '#fb923c',
      sidebar: '#ffedd5',
      'sidebar-foreground': '#1c0a00',
      'sidebar-primary': '#c2410c',
      'sidebar-primary-foreground': '#fff7ed',
      'sidebar-accent': '#fed7aa',
      'sidebar-accent-foreground': '#9a3412',
      'sidebar-border': '#fed7aa',
      'sidebar-ring': '#fb923c',
    },
  },
  monokai: {
    name: 'Monokai',
    icon: '🎨',
    values: {
      background: '#272822',
      foreground: '#f8f8f2',
      card: '#1e1f1c',
      'card-foreground': '#f8f8f2',
      popover: '#1e1f1c',
      'popover-foreground': '#f8f8f2',
      primary: '#a6e22e',
      'primary-foreground': '#272822',
      secondary: '#3e3d32',
      'secondary-foreground': '#f8f8f2',
      muted: '#3e3d32',
      'muted-foreground': '#75715e',
      accent: '#49483e',
      'accent-foreground': '#f8f8f2',
      destructive: '#f92672',
      border: '#49483e',
      input: '#49483e',
      ring: '#66d9e8',
      'chart-1': '#f92672',
      'chart-2': '#a6e22e',
      'chart-3': '#66d9e8',
      'chart-4': '#e6db74',
      'chart-5': '#ae81ff',
      sidebar: '#1e1f1c',
      'sidebar-foreground': '#f8f8f2',
      'sidebar-primary': '#a6e22e',
      'sidebar-primary-foreground': '#272822',
      'sidebar-accent': '#3e3d32',
      'sidebar-accent-foreground': '#f8f8f2',
      'sidebar-border': '#49483e',
      'sidebar-ring': '#66d9e8',
    },
  },
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function toInputColor(hex: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toLowerCase()
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    const [, r, g, b] = hex
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return '#000000'
}

function generateCSS(tokens: TokenValues, radius: string): string {
  const lines: string[] = [
    '/* Generated by react-ubiquitous Theme Generator */',
    ':root {',
    `  --radius: ${radius};`,
    '',
  ]
  TOKEN_GROUPS.forEach(group => {
    lines.push(`  /* ${group.comment} */`)
    group.tokens.forEach(({ key }) => {
      lines.push(`  --${key}: ${tokens[key]};`)
    })
    lines.push('')
  })
  while (lines[lines.length - 1] === '') lines.pop()
  lines.push('}')
  return lines.join('\n')
}

function generateJSON(tokens: TokenValues, radius: string): string {
  const obj: Record<string, string> = { '--radius': radius }
  TOKEN_GROUPS.forEach(group => {
    group.tokens.forEach(({ key }) => {
      obj[`--${key}`] = tokens[key]
    })
  })
  return JSON.stringify(obj, null, 2)
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ── TokenRow ──────────────────────────────────────────────────────────────────

interface TokenRowProps {
  tokenKey: TokenKey
  label: string
  value: string
  onChange: (key: TokenKey, value: string) => void
  colors: ThemeColors
}

function TokenRow({ tokenKey, label, value, onChange, colors }: TokenRowProps) {
  const [draft, setDraft] = useState(value)
  const [hovered, setHovered] = useState(false)

  useEffect(() => { setDraft(value) }, [value])

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setDraft(v)
    if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(tokenKey, v)
  }

  function handleBlur() {
    if (!/^#[0-9a-fA-F]{6}$/.test(draft)) setDraft(value)
  }

  const isValidHex = /^#[0-9a-fA-F]{6}$/.test(draft)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.4rem 0.75rem',
        borderRadius: '6px',
        background: hovered ? colors.sidebar : 'transparent',
        transition: 'background 0.1s',
      }}
    >
      {/* Color swatch / picker trigger */}
      <label style={{
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        background: value,
        border: `2px solid ${colors.sidebarBorder}`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'block',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}>
        <input
          type="color"
          value={toInputColor(value)}
          onChange={e => { const v = e.target.value; onChange(tokenKey, v); setDraft(v) }}
          style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer', padding: 0, border: 'none' }}
        />
      </label>

      {/* Token name + label */}
      <div style={{ overflow: 'hidden' }}>
        <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: colors.contentText }}>
          --{tokenKey}
        </span>
        <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: colors.sidebarTextMuted }}>
          {label}
        </span>
      </div>

      {/* Hex input */}
      <input
        type="text"
        value={draft}
        onChange={handleTextChange}
        onBlur={handleBlur}
        maxLength={7}
        spellCheck={false}
        style={{
          width: '86px',
          padding: '0.25rem 0.4rem',
          fontSize: '0.78rem',
          fontFamily: 'monospace',
          border: `1px solid ${isValidHex ? colors.sidebarBorder : '#ef4444'}`,
          borderRadius: '5px',
          background: colors.content,
          color: colors.contentText,
          outline: 'none',
        }}
      />
    </div>
  )
}

// ── TokenGroup ────────────────────────────────────────────────────────────────

interface TokenGroupProps {
  group: typeof TOKEN_GROUPS[number]
  tokens: TokenValues
  expanded: boolean
  onToggle: () => void
  onUpdate: (key: TokenKey, value: string) => void
  colors: ThemeColors
}

function TokenGroup({ group, tokens, expanded, onToggle, onUpdate, colors }: TokenGroupProps) {
  return (
    <div style={{
      marginBottom: '0.5rem',
      border: `1px solid ${colors.sidebarBorder}`,
      borderRadius: '10px',
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0.7rem 1rem',
          background: colors.sidebar,
          border: 'none',
          cursor: 'pointer',
          color: colors.sidebarText,
          fontSize: '0.875rem',
          fontWeight: 600,
          textAlign: 'left',
        }}
      >
        <span>{group.label}</span>
        <span style={{
          fontSize: '0.65rem',
          opacity: 0.6,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          display: 'inline-block',
        }}>▼</span>
      </button>

      {expanded && (
        <div style={{ padding: '0.4rem 0.25rem', background: colors.content }}>
          {group.tokens.map(({ key, label }) => (
            <TokenRow
              key={key}
              tokenKey={key}
              label={label}
              value={tokens[key]}
              onChange={onUpdate}
              colors={colors}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── LivePreview ───────────────────────────────────────────────────────────────

function LivePreview({ tokens: t, radius }: { tokens: TokenValues; radius: string }) {
  const borderRadius = `${radius}rem`
  return (
    <div style={{
      background: t.background,
      border: `1px solid ${t.border}`,
      borderRadius: '12px',
      padding: '1.25rem',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Card */}
      <div style={{
        background: t.card,
        border: `1px solid ${t.border}`,
        borderRadius,
        padding: '1rem',
        marginBottom: '1rem',
      }}>
        <h3 style={{ margin: '0 0 0.2rem', fontSize: '0.9rem', fontWeight: 600, color: t['card-foreground'] }}>
          Preview Card
        </h3>
        <p style={{ margin: '0 0 0.8rem', fontSize: '0.78rem', color: t['muted-foreground'], lineHeight: 1.5 }}>
          This shows how your theme looks on components.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
          <button style={{
            padding: '0.32rem 0.8rem', fontSize: '0.75rem', borderRadius,
            border: 'none', background: t.primary, color: t['primary-foreground'],
            cursor: 'pointer', fontWeight: 500,
          }}>Primary</button>
          <button style={{
            padding: '0.32rem 0.8rem', fontSize: '0.75rem', borderRadius,
            border: `1px solid ${t.border}`, background: t.secondary, color: t['secondary-foreground'],
            cursor: 'pointer',
          }}>Secondary</button>
          <button style={{
            padding: '0.32rem 0.8rem', fontSize: '0.75rem', borderRadius,
            border: 'none', background: t.destructive, color: '#ffffff',
            cursor: 'pointer',
          }}>Destructive</button>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Sample input…"
          readOnly
          style={{
            width: '100%', padding: '0.32rem 0.6rem', fontSize: '0.75rem',
            border: `1px solid ${t.input}`, borderRadius, background: t.background,
            color: t.foreground, outline: `2px solid ${t.ring}`, outlineOffset: '2px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Chart palette */}
      <div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.7rem', color: t['muted-foreground'], fontWeight: 500 }}>
          Chart Palette
        </p>
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-end', height: '64px' }}>
          {(['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const).map((key, i) => (
            <div
              key={key}
              title={`${key}: ${t[key]}`}
              style={{
                flex: 1,
                background: t[key],
                height: `${36 + i * 7}px`,
                borderRadius: '4px 4px 0 0',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '3px' }}>
          {(['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const).map((_, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', color: t['muted-foreground'] }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ThemeGeneratorPage() {
  const { colors } = useTheme()
  const [tokens, setTokens] = useState<TokenValues>(DEFAULT_TOKENS)
  const [radius, setRadius] = useState('0.625')
  const [activePreset, setActivePreset] = useState<PresetKey | null>('default')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(TOKEN_GROUPS.map(g => g.id))
  )
  const [codeView, setCodeView] = useState<'css' | 'json'>('css')
  const [copied, setCopied] = useState<string | null>(null)

  const applyPreset = useCallback((key: PresetKey) => {
    setTokens({ ...PRESETS[key].values })
    setActivePreset(key)
  }, [])

  const updateToken = useCallback((key: TokenKey, value: string) => {
    setTokens(prev => ({ ...prev, [key]: value }))
    setActivePreset(null)
  }, [])

  const toggleGroup = useCallback((id: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const radiusRem = `${radius}rem`
  const css = generateCSS(tokens, radiusRem)
  const json = generateJSON(tokens, radiusRem)
  const codeContent = codeView === 'css' ? css : json

  async function copyText(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch { /* ignore */ }
  }

  const btnBase: React.CSSProperties = {
    padding: '0.38rem 0.9rem',
    fontSize: '0.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    border: `1px solid ${colors.sidebarBorder}`,
    background: 'transparent',
    color: colors.contentText,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  }

  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: colors.sidebarActive,
    border: `1.5px solid ${colors.sidebarActive}`,
    color: '#ffffff',
    fontWeight: 600,
  }

  const divider = (
    <div style={{ flex: 1, height: '1px', background: colors.sidebarBorder }} />
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.5rem', fontWeight: 700, color: colors.contentText }}>
          🎨 Theme Generator
        </h1>
        <p style={{ margin: 0, color: colors.sidebarTextMuted, fontSize: '0.875rem' }}>
          Customize CSS custom properties, preview live, then export as a CSS file or JSON to paste into your project.
        </p>
      </div>

      {/* ── Preset Gallery ──────────────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: colors.contentText, whiteSpace: 'nowrap' }}>
            Preset Gallery
          </span>
          {divider}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(Object.entries(PRESETS) as [PresetKey, typeof PRESETS[PresetKey]][]).map(([key, preset]) => {
            const isActive = activePreset === key
            return (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                style={{
                  ...(isActive ? btnActive : { ...btnBase, background: colors.sidebar }),
                  padding: '0.42rem 1.1rem',
                  fontSize: '0.83rem',
                }}
              >
                {preset.icon} {preset.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Two-column layout ───────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 390px',
        gap: '2rem',
        alignItems: 'start',
      }}>

        {/* Left: Token groups ──────────────────────────────────────────── */}
        <div>
          {/* Expand / collapse all */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <button
              onClick={() => setExpandedGroups(new Set(TOKEN_GROUPS.map(g => g.id)))}
              style={{ ...btnBase, fontSize: '0.74rem', padding: '0.28rem 0.65rem' }}
            >
              Expand all
            </button>
            <button
              onClick={() => setExpandedGroups(new Set())}
              style={{ ...btnBase, fontSize: '0.74rem', padding: '0.28rem 0.65rem' }}
            >
              Collapse all
            </button>
          </div>

          {TOKEN_GROUPS.map(group => (
            <TokenGroup
              key={group.id}
              group={group}
              tokens={tokens}
              expanded={expandedGroups.has(group.id)}
              onToggle={() => toggleGroup(group.id)}
              onUpdate={updateToken}
              colors={colors}
            />
          ))}

          {/* Border Radius ───────────────────────────────────────────────── */}
          <div style={{
            marginTop: '0.5rem',
            border: `1px solid ${colors.sidebarBorder}`,
            borderRadius: '10px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.7rem 1rem',
              background: colors.sidebar,
            }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: colors.sidebarText, flex: 1 }}>
                ⬡ Border Radius
              </span>
              <code style={{ fontSize: '0.78rem', color: colors.sidebarTextMuted }}>
                --radius: {radius}rem
              </code>
            </div>
            <div style={{ padding: '0.9rem 1.25rem', background: colors.content }}>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.125"
                value={radius}
                onChange={e => { setRadius(e.target.value); setActivePreset(null) }}
                style={{ width: '100%', accentColor: colors.sidebarActive, cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: colors.sidebarTextMuted, marginTop: '0.3rem' }}>
                <span>0 (square)</span>
                <span>0.625 (default)</span>
                <span>1.5 (pill)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview + Export (sticky) ──────────────────────────── */}
        <div style={{
          position: 'sticky',
          top: '1rem',
          maxHeight: 'calc(100vh - 90px)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>

          {/* Live Preview */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: colors.contentText, whiteSpace: 'nowrap' }}>
                Live Preview
              </span>
              {divider}
            </div>
            <LivePreview tokens={tokens} radius={radius} />
          </div>

          {/* Export */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: colors.contentText, whiteSpace: 'nowrap' }}>
                Export
              </span>
              {divider}
            </div>

            {/* CSS / JSON tab toggle + inline copy */}
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', marginBottom: '0.6rem' }}>
              {(['css', 'json'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setCodeView(v)}
                  style={{
                    ...(codeView === v ? btnActive : { ...btnBase, background: colors.sidebar }),
                    padding: '0.3rem 0.8rem',
                    fontSize: '0.77rem',
                  }}
                >
                  {v.toUpperCase()}
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button
                onClick={() => copyText(codeContent, 'preview')}
                style={{ ...btnBase, padding: '0.3rem 0.7rem', fontSize: '0.76rem' }}
              >
                {copied === 'preview' ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>

            {/* Code block */}
            <pre style={{
              margin: 0,
              padding: '0.9rem 1rem',
              background: '#1e1e2e',
              color: '#cdd6f4',
              borderRadius: '8px',
              fontSize: '0.7rem',
              lineHeight: 1.65,
              overflowX: 'auto',
              overflowY: 'auto',
              maxHeight: '220px',
              fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
              border: `1px solid ${colors.sidebarBorder}`,
              whiteSpace: 'pre',
              tabSize: 2,
            }}>
              {codeContent}
            </pre>

            {/* Download / copy buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              marginTop: '0.75rem',
            }}>
              <button onClick={() => copyText(css, 'css')} style={copied === 'css' ? btnActive : btnBase}>
                {copied === 'css' ? '✅ Copied!' : '📋 Copy CSS'}
              </button>
              <button onClick={() => downloadFile(css, 'theme.css', 'text/css')} style={btnBase}>
                ⬇️ Download CSS
              </button>
              <button onClick={() => copyText(json, 'json')} style={copied === 'json' ? btnActive : btnBase}>
                {copied === 'json' ? '✅ Copied!' : '📋 Copy JSON'}
              </button>
              <button onClick={() => downloadFile(json, 'theme.json', 'application/json')} style={btnBase}>
                ⬇️ Download JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
