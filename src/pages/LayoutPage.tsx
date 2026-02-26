import { CategoryPage } from '../components/CategoryPage'
import { flexConfig, gridConfig, heroConfig, listDetailConfig, chatConfig, treeViewConfig } from '../data/layout'

export default function LayoutPage() {
  return (
    <CategoryPage
      title="🏗️ Layout"
      description="Layout sections that arrange child elements."
      items={[
        { id: 'flex',        label: 'Flex',        config: flexConfig,        status: 'wip'    },
        { id: 'grid',        label: 'Grid',        config: gridConfig,        status: 'wip'    },
        { id: 'hero',        label: 'Hero',        config: heroConfig,        status: 'active' },
        { id: 'list-detail', label: 'List-Detail', config: listDetailConfig,  status: 'wip'    },
        { id: 'tree-view',   label: 'Tree View',   config: treeViewConfig,    status: 'active' },
        { id: 'chat',        label: 'Chat',        config: chatConfig,        status: 'wip'    },
      ]}
    />
  )
}
