import { ComponentDemo } from '../components/ComponentDemo'
import { cardConfig, tableConfig, badgeConfig, avatarConfig, timelineConfig, statConfig, emptyStateConfig, codeBlockConfig, iframeConfig, mediaConfig, dividerConfig } from '../data/dataDisplay'

export default function DataDisplayPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>📋 Data Display</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>Components for displaying data, content, and media.</p>
      <ComponentDemo title="Card" description="layout: 'card'" initialConfig={cardConfig} />
      <ComponentDemo title="Table" description="layout: 'table'" initialConfig={tableConfig} />
      <ComponentDemo title="Badge" description="layout: 'badge'" initialConfig={badgeConfig} />
      <ComponentDemo title="Avatar" description="layout: 'avatar'" initialConfig={avatarConfig} />
      <ComponentDemo title="Timeline" description="layout: 'timeline'" initialConfig={timelineConfig} />
      <ComponentDemo title="Stat / KPI" description="layout: 'stat'" initialConfig={statConfig} />
      <ComponentDemo title="Empty State" description="layout: 'empty-state'" initialConfig={emptyStateConfig} />
      <ComponentDemo title="Code Block" description="layout: 'code-block'" initialConfig={codeBlockConfig} />
      <ComponentDemo title="iFrame" description="layout: 'iframe'" initialConfig={iframeConfig} />
      <ComponentDemo title="Media / Carousel" description="layout: 'media'" initialConfig={mediaConfig} />
      <ComponentDemo title="Divider" description="layout: 'divider'" initialConfig={dividerConfig} />
    </div>
  )
}
