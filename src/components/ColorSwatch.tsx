/**
 * ColorSwatch — a custom React component used to demonstrate
 * Feature 4 (1.0.13): CustomElementConfig / customComponents prop on UIStage.
 *
 * Registered in FieldsPage via `customComponents={{ 'color-swatch': ColorSwatch }}`.
 * Config shape: { type: 'custom', component: 'color-swatch', props: { color, label } }
 */
import type { UIElementProps } from 'react-ubiquitous'

interface ColorSwatchProps {
  color: string
  label: string
}

export function ColorSwatch({ config }: UIElementProps) {
  const { color, label } = (config as unknown as { props: ColorSwatchProps }).props ?? {}
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.75rem', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--card)' }}>
      <span style={{ display: 'inline-block', width: '28px', height: '28px', borderRadius: '6px', background: color ?? '#6366f1', flexShrink: 0 }} />
      <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--foreground)' }}>{label ?? color}</span>
      <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>{color}</span>
    </div>
  )
}
