import { ComponentDemo } from '../components/ComponentDemo'
import { navbarConfig, sidebarConfig, breadcrumbsConfig, paginationConfig, stepperConfig, tabsConfig } from '../data/navigation'

export default function NavigationPage() {
  return (
    <div>
      <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>🧭 Navigation</h2>
      <p style={{ margin: '0 0 2rem', color: '#64748b' }}>Navigation components for moving through your application.</p>
      <ComponentDemo title="Navbar" description="layout: 'navbar'" initialConfig={navbarConfig} />
      <ComponentDemo title="Sidebar" description="layout: 'sidebar'" initialConfig={sidebarConfig} />
      <ComponentDemo title="Breadcrumbs" description="layout: 'breadcrumbs'" initialConfig={breadcrumbsConfig} />
      <ComponentDemo title="Pagination" description="layout: 'pagination'" initialConfig={paginationConfig} />
      <ComponentDemo title="Stepper" description="layout: 'stepper'" initialConfig={stepperConfig} />
      <ComponentDemo title="Tabs" description="layout: 'tabs'" initialConfig={tabsConfig} />
    </div>
  )
}
