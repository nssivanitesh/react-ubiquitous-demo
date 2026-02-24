import { CategoryPage } from '../components/CategoryPage'
import { cardConfig, tableConfig, badgeConfig, avatarConfig, timelineConfig, statConfig, emptyStateConfig, codeBlockConfig, iframeConfig, mediaConfig, dividerConfig } from '../data/dataDisplay'

export default function DataDisplayPage() {
  return (
    <CategoryPage
      title="📋 Data Display"
      description="Components for presenting structured data and content."
      items={[
        { id: 'card', label: 'Card', config: cardConfig },
        { id: 'table', label: 'Table', config: tableConfig },
        { id: 'badge', label: 'Badge', config: badgeConfig },
        { id: 'avatar', label: 'Avatar', config: avatarConfig },
        { id: 'timeline', label: 'Timeline', config: timelineConfig },
        { id: 'stat', label: 'Stat', config: statConfig },
        { id: 'empty-state', label: 'Empty State', config: emptyStateConfig },
        { id: 'code-block', label: 'Code Block', config: codeBlockConfig },
        { id: 'iframe', label: 'iFrame', config: iframeConfig },
        { id: 'media', label: 'Media', config: mediaConfig },
        { id: 'divider', label: 'Divider', config: dividerConfig },
      ]}
    />
  )
}
