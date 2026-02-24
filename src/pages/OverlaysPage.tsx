import { ComponentDemo } from '../components/ComponentDemo'
import { modalConfig, drawerConfig, tooltipConfig, popoverConfig } from '../data/overlays'

export default function OverlaysPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>🪟 Overlays</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>Modal dialogs, drawers, tooltips, and popovers. Modal and drawer configs have <code>open: true</code> for demo purposes.</p>
      <ComponentDemo title="Modal" description="layout: 'modal'" initialConfig={modalConfig} />
      <ComponentDemo title="Drawer" description="layout: 'drawer'" initialConfig={drawerConfig} />
      <ComponentDemo title="Tooltip" description="layout: 'tooltip'" initialConfig={tooltipConfig} />
      <ComponentDemo title="Popover" description="layout: 'popover'" initialConfig={popoverConfig} />
    </div>
  )
}
