import { CategoryPage } from '../components/CategoryPage'
import { modalConfig, drawerConfig, tooltipConfig, popoverConfig } from '../data/overlays'

export default function OverlaysPage() {
  return (
    <CategoryPage
      title="🪟 Overlays"
      description="Floating overlays. Edit the JSON to set open: true to show modal/drawer."
      items={[
        { id: 'modal',   label: 'Modal',   config: modalConfig,   status: 'active' },
        { id: 'drawer',  label: 'Drawer',  config: drawerConfig,  status: 'active' },
        { id: 'tooltip', label: 'Tooltip', config: tooltipConfig, status: 'active' },
        { id: 'popover', label: 'Popover', config: popoverConfig, status: 'active' },
      ]}
    />
  )
}
