export const cardConfig = {
  id: 'card',
  layout: 'card',
  title: 'User Profile',
  description: 'Manage your account information',
  padded: true,
  bordered: true,
  shadow: 'md',
  elements: [
    { id: 'ca1', name: 'avatar', type: 'label', text: '👤 John Doe — Senior Engineer', order: 0 },
    { id: 'ca2', name: 'edit', type: 'button', text: 'Edit Profile', variant: 'outline', size: 'sm', order: 1 },
  ],
  footerElements: [
    { id: 'ca3', name: 'joined', type: 'label', text: 'Member since January 2022', order: 0 },
  ],
}

export const tableConfig = {
  id: 'table',
  layout: 'table',
  title: 'Employee Directory',
  searchable: true,
  pageSize: 5,
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'salary', label: 'Salary ($)', sortable: true },
  ],
  rows: [
    { name: 'Alice Johnson', department: 'Engineering', role: 'Senior Dev', status: 'Active', salary: 95000 },
    { name: 'Bob Smith', department: 'Marketing', role: 'Manager', status: 'Active', salary: 78000 },
    { name: 'Carol White', department: 'Design', role: 'Lead UX', status: 'Active', salary: 85000 },
    { name: 'David Lee', department: 'Sales', role: 'Account Exec', status: 'Away', salary: 72000 },
    { name: 'Eve Davis', department: 'Engineering', role: 'DevOps', status: 'Active', salary: 92000 },
    { name: 'Frank Brown', department: 'HR', role: 'Recruiter', status: 'Offline', salary: 65000 },
  ],
  emptyMessage: 'No employees found.',
  elements: [],
}

export const badgeConfig = {
  id: 'badge',
  layout: 'badge',
  title: 'Project Tags',
  appearance: 'subtle',
  size: 'md',
  badges: [
    { id: 'bg1', label: 'React', variant: 'primary' },
    { id: 'bg2', label: 'TypeScript', variant: 'info' },
    { id: 'bg3', label: 'Completed', variant: 'success' },
    { id: 'bg4', label: 'In Progress', variant: 'warning' },
    { id: 'bg5', label: 'Blocked', variant: 'danger' },
    { id: 'bg6', label: 'Open Source', variant: 'default' },
  ],
  elements: [],
}

export const avatarConfig = {
  id: 'avatar',
  layout: 'avatar',
  title: 'Team Members',
  size: 'md',
  stacked: false,
  avatars: [
    { id: 'av1', initials: 'AJ', name: 'Alice Johnson', alt: 'Alice' },
    { id: 'av2', initials: 'BS', name: 'Bob Smith', alt: 'Bob' },
    { id: 'av3', src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carol', name: 'Carol White', alt: 'Carol' },
    { id: 'av4', initials: 'DL', name: 'David Lee', alt: 'David' },
  ],
  elements: [],
}

export const timelineConfig = {
  id: 'timeline',
  layout: 'timeline',
  title: 'Project Milestones',
  events: [
    { id: 'tl1', title: 'Project Kickoff', description: 'Initial planning and team setup', timestamp: 'Jan 2025', variant: 'primary', icon: '🚀' },
    { id: 'tl2', title: 'Design Phase', description: 'UI/UX wireframes and prototypes', timestamp: 'Feb 2025', variant: 'success', icon: '🎨' },
    { id: 'tl3', title: 'Development Sprint 1', description: 'Core features implemented', timestamp: 'Mar 2025', variant: 'warning', icon: '⚙️' },
    { id: 'tl4', title: 'Beta Release', description: 'Internal testing and feedback', timestamp: 'Apr 2025', variant: 'default', icon: '🧪' },
    { id: 'tl5', title: 'Production Launch', description: 'Public release v1.0', timestamp: 'May 2025', variant: 'success', icon: '✅' },
  ],
  elements: [],
}

export const statConfig = {
  id: 'stat',
  layout: 'stat',
  title: 'Dashboard KPIs',
  columns: 4,
  stats: [
    { id: 'st1', value: '12,543', label: 'Total Users', subLabel: 'Registered accounts', trend: '+12%', trendDirection: 'up', icon: '👥' },
    { id: 'st2', value: '$84.2K', label: 'Revenue', subLabel: 'This month', trend: '+8.5%', trendDirection: 'up', icon: '💰' },
    { id: 'st3', value: '98.7%', label: 'Uptime', subLabel: 'Last 30 days', trend: '+0.2%', trendDirection: 'up', icon: '⚡' },
    { id: 'st4', value: '245', label: 'Open Tickets', subLabel: 'Support queue', trend: '-15', trendDirection: 'down', icon: '🎫' },
  ],
  elements: [],
}

export const emptyStateConfig = {
  id: 'empty-state',
  layout: 'empty-state',
  heading: 'No results found',
  message: 'Try adjusting your search or filter criteria to find what you are looking for.',
  icon: '🔍',
  actionLabel: 'Clear Filters',
  actionHref: '#',
  elements: [],
}

export const codeBlockConfig = {
  id: 'code-block',
  layout: 'code-block',
  title: 'Example Usage',
  language: 'typescript',
  lineNumbers: true,
  copyable: true,
  code: `import { UISection } from 'react-ubiquitous'

const config = {
  id: 'my-form',
  layout: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  elements: [
    {
      id: 'name',
      name: 'fullName',
      type: 'input',
      inputType: 'text',
      label: 'Full Name',
    },
  ],
}

export function MyForm() {
  return <UISection config={config} />
}`,
  elements: [],
}

export const iframeConfig = {
  id: 'iframe',
  layout: 'iframe',
  title: 'Embedded Content',
  src: 'https://example.com',
  frameWidth: '100%',
  frameHeight: '300px',
  frameTitle: 'Example website embed',
  allowFullscreen: true,
  showLoader: true,
  elements: [],
}

export const mediaConfig = {
  id: 'media',
  layout: 'media',
  title: 'Product Gallery',
  aspectRatio: '16/9',
  showArrows: true,
  showDots: true,
  items: [
    { id: 'mi1', type: 'image', url: 'https://picsum.photos/seed/demo1/800/450', alt: 'Demo image 1', caption: 'Beautiful landscape' },
    { id: 'mi2', type: 'image', url: 'https://picsum.photos/seed/demo2/800/450', alt: 'Demo image 2', caption: 'City skyline' },
    { id: 'mi3', type: 'image', url: 'https://picsum.photos/seed/demo3/800/450', alt: 'Demo image 3', caption: 'Mountain view' },
  ],
  elements: [],
}

export const dividerConfig = {
  id: 'divider',
  layout: 'divider',
  label: 'Section Break',
  orientation: 'horizontal',
  variant: 'solid',
  elements: [],
}
