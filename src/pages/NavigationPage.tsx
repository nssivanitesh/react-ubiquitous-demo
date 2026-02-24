import { CategoryPage } from '../components/CategoryPage'
import { navbarConfig, sidebarConfig, breadcrumbsConfig, paginationConfig, stepperConfig, tabsConfig } from '../data/navigation'

export default function NavigationPage() {
  return (
    <CategoryPage
      title="🧭 Navigation"
      description="Navigation components for moving through the app."
      items={[
        { id: 'navbar', label: 'Navbar', config: navbarConfig },
        { id: 'sidebar', label: 'Sidebar', config: sidebarConfig },
        { id: 'breadcrumbs', label: 'Breadcrumbs', config: breadcrumbsConfig },
        { id: 'pagination', label: 'Pagination', config: paginationConfig },
        { id: 'stepper', label: 'Stepper', config: stepperConfig },
        { id: 'tabs', label: 'Tabs', config: tabsConfig },
      ]}
    />
  )
}
