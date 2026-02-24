import { ComponentDemo } from '../components/ComponentDemo'
import { accordionConfig, collapseConfig } from '../data/disclosure'

export default function DisclosurePage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>📂 Disclosure</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>Expandable content sections with accordion and collapse patterns.</p>
      <ComponentDemo title="Accordion" description="layout: 'accordion'" initialConfig={accordionConfig} />
      <ComponentDemo title="Collapse" description="layout: 'collapse'" initialConfig={collapseConfig} />
    </div>
  )
}
