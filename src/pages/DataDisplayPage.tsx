import { CategoryPage } from '../components/CategoryPage'
import { cardConfig, tableConfig, badgeConfig, avatarConfig, timelineConfig, statConfig, emptyStateConfig, codeBlockConfig, iframeConfig, mediaConfig, dividerConfig } from '../data/dataDisplay'

export default function DataDisplayPage() {
  return (
    <CategoryPage
      title="📋 Data Display"
      description="Components for presenting structured data and content."
      items={[
        { id: 'card',        label: 'Card',        config: cardConfig,        status: 'active' },
        { id: 'table',       label: 'Table',       config: tableConfig,       status: 'wip'    },
        { id: 'badge',       label: 'Badge',       config: badgeConfig,       status: 'active' },
        { id: 'avatar',      label: 'Avatar',      config: avatarConfig,      status: 'active' },
        { id: 'timeline',    label: 'Timeline',    config: timelineConfig,    status: 'active' },
        { id: 'stat',        label: 'Stat',        config: statConfig,        status: 'active' },
        { id: 'empty-state', label: 'Empty State', config: emptyStateConfig,  status: 'active' },
        { id: 'code-block',  label: 'Code Block',  config: codeBlockConfig,   status: 'active' },
        { id: 'iframe',      label: 'iFrame',      config: iframeConfig,      status: 'active' },
        { id: 'media',       label: 'Media',       config: mediaConfig,       status: 'active' },
        { id: 'divider',     label: 'Divider',     config: dividerConfig,     status: 'active' },
      ]}
    />
  )
}
