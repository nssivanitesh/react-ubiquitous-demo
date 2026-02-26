import { CategoryPage } from '../components/CategoryPage'
import { navbarConfig, sidebarConfig, breadcrumbsConfig, paginationConfig, stepperConfig, tabsConfig } from '../data/navigation'

export default function NavigationPage() {
  return (
    <CategoryPage
      title="🧭 Navigation"
      description="Navigation components for moving through the app."
      items={[
        { id: 'navbar',      label: 'Navbar',      config: navbarConfig,      status: 'active' },
        { id: 'sidebar',     label: 'Sidebar',     config: sidebarConfig,     status: 'active' },
        { id: 'breadcrumbs', label: 'Breadcrumbs', config: breadcrumbsConfig, status: 'active' },
        { id: 'pagination',  label: 'Pagination',  config: paginationConfig,  status: 'active' },
        { id: 'stepper',     label: 'Stepper',     config: stepperConfig,     status: 'active' },
        { id: 'tabs',        label: 'Tabs',        config: tabsConfig,        status: 'active' },
      ]}
    />
  )
}
