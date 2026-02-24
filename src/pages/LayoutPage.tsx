import { ComponentDemo } from '../components/ComponentDemo'
import { flexConfig, gridConfig, heroConfig, listDetailConfig } from '../data/layout'

export default function LayoutPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>🏗️ Layout</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>Layout sections that arrange child elements in different patterns.</p>
      <ComponentDemo title="Flex Layout" description="layout: 'flex'" initialConfig={flexConfig} />
      <ComponentDemo title="Grid Layout" description="layout: 'grid'" initialConfig={gridConfig} />
      <ComponentDemo title="Hero Section" description="layout: 'hero'" initialConfig={heroConfig} />
      <ComponentDemo title="List-Detail Layout" description="layout: 'list-detail'" initialConfig={listDetailConfig} />
    </div>
  )
}
