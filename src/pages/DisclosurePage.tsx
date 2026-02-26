import { CategoryPage } from '../components/CategoryPage'
import { accordionConfig, collapseConfig } from '../data/disclosure'

export default function DisclosurePage() {
  return (
    <CategoryPage
      title="📂 Disclosure"
      description="Expand/collapse components for progressive content reveal."
      items={[
        { id: 'accordion', label: 'Accordion', config: accordionConfig, status: 'active' },
        { id: 'collapse',  label: 'Collapse',  config: collapseConfig,  status: 'wip'    },
      ]}
    />
  )
}
