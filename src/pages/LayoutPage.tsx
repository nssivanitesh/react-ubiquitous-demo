import { CategoryPage } from '../components/CategoryPage'
import { flexConfig, gridConfig, heroConfig, listDetailConfig, chatConfig, treeViewConfig } from '../data/layout'

export default function LayoutPage() {
  return (
    <CategoryPage
      title="🏗️ Layout"
      description="Layout sections that arrange child elements."
      items={[
        { id: 'flex', label: 'Flex', config: flexConfig },
        { id: 'grid', label: 'Grid', config: gridConfig },
        { id: 'hero', label: 'Hero', config: heroConfig },
        { id: 'list-detail', label: 'List-Detail', config: listDetailConfig },
        { id: 'tree-view', label: 'Tree View', config: treeViewConfig },
        { id: 'chat', label: 'Chat', config: chatConfig },
      ]}
    />
  )
}
