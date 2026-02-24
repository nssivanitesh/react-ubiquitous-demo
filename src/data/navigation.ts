export const navbarConfig = {
  id: 'navbar',
  layout: 'navbar',
  logoText: 'MyApp',
  position: 'static',
  theme: 'light',
  links: [
    { id: 'l1', label: 'Home', href: '/', active: true },
    { id: 'l2', label: 'About', href: '/about' },
    { id: 'l3', label: 'Docs', href: '/docs' },
    { id: 'l4', label: 'Blog', href: '/blog' },
  ],
  elements: [],
}

export const sidebarConfig = {
  id: 'sidebar',
  layout: 'sidebar',
  title: 'Navigation',
  items: [
    { id: 's1', label: 'Dashboard', href: '/', active: true, icon: 'home' },
    { id: 's2', label: 'Users', href: '/users', icon: 'users', children: [
      { id: 's2a', label: 'All Users', href: '/users' },
      { id: 's2b', label: 'Roles', href: '/users/roles' },
    ]},
    { id: 's3', label: 'Settings', href: '/settings', icon: 'settings' },
  ],
  elements: [],
}

export const breadcrumbsConfig = {
  id: 'breadcrumbs',
  layout: 'breadcrumbs',
  items: [
    { id: 'b1', label: 'Home', href: '/' },
    { id: 'b2', label: 'Products', href: '/products' },
    { id: 'b3', label: 'Electronics', href: '/products/electronics' },
    { id: 'b4', label: 'Laptops' },
  ],
  elements: [],
}

export const paginationConfig = {
  id: 'pagination',
  layout: 'pagination',
  title: 'Results',
  currentPage: 3,
  totalPages: 10,
  pageSize: 20,
  totalItems: 195,
  showFirstLast: true,
  elements: [],
}

export const stepperConfig = {
  id: 'stepper',
  layout: 'stepper',
  title: 'Order Process',
  currentStep: 1,
  steps: [
    { id: 'st1', label: 'Cart', description: 'Review your items', status: 'complete' },
    { id: 'st2', label: 'Address', description: 'Enter shipping info', status: 'current' },
    { id: 'st3', label: 'Payment', description: 'Add payment method', status: 'upcoming' },
    { id: 'st4', label: 'Confirm', description: 'Review and place order', status: 'upcoming' },
  ],
  elements: [],
}

export const tabsConfig = {
  id: 'tabs',
  layout: 'tabs',
  title: 'Account Settings',
  tabs: [
    {
      id: 't1',
      label: 'Profile',
      elements: [
        { id: 'te1', name: 'display_name', type: 'input', inputType: 'text', label: 'Display Name', defaultValue: 'John Doe', order: 0 },
        { id: 'te2', name: 'bio', type: 'textarea', label: 'Bio', placeholder: 'Tell us about yourself', rows: 3, order: 1 },
      ],
    },
    {
      id: 't2',
      label: 'Security',
      elements: [
        { id: 'te3', name: 'current_password', type: 'input', inputType: 'password', label: 'Current Password', order: 0 },
        { id: 'te4', name: 'new_password', type: 'input', inputType: 'password', label: 'New Password', order: 1 },
      ],
    },
    {
      id: 't3',
      label: 'Notifications',
      elements: [
        { id: 'te5', name: 'email_notif', type: 'checkbox', label: 'Email notifications', defaultChecked: true, order: 0 },
        { id: 'te6', name: 'sms_notif', type: 'checkbox', label: 'SMS notifications', order: 1 },
      ],
    },
  ],
  elements: [],
}
