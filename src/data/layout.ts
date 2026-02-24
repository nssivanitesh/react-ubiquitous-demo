export const flexConfig = {
  id: 'flex-section',
  layout: 'flex',
  title: 'Flex Layout',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1rem',
  elements: [
    { id: 'f1', name: 'username', type: 'input', inputType: 'text', label: 'Username', placeholder: 'Enter username', order: 0 },
    { id: 'f2', name: 'email', type: 'input', inputType: 'email', label: 'Email', placeholder: 'Enter email', order: 1 },
    { id: 'f3', name: 'submit', type: 'button', text: 'Submit', variant: 'default', order: 2 },
  ],
}

export const gridConfig = {
  id: 'grid-section',
  layout: 'grid',
  title: 'Grid Layout',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  elements: [
    { id: 'g1', name: 'first', type: 'input', inputType: 'text', label: 'First Name', order: 0 },
    { id: 'g2', name: 'last', type: 'input', inputType: 'text', label: 'Last Name', order: 1 },
    { id: 'g3', name: 'age', type: 'input', inputType: 'number', label: 'Age', order: 2 },
    { id: 'g4', name: 'city', type: 'input', inputType: 'text', label: 'City', order: 3 },
    { id: 'g5', name: 'country', type: 'input', inputType: 'text', label: 'Country', order: 4 },
    { id: 'g6', name: 'zip', type: 'input', inputType: 'text', label: 'ZIP Code', order: 5 },
  ],
}

export const heroConfig = {
  id: 'hero-section',
  layout: 'hero',
  title: 'Welcome to Our Platform',
  description: 'Build stunning UIs with JSON-driven components.',
  subtitle: 'Fast. Flexible. Frontend-free complexity.',
  backgroundType: 'gradient',
  gradientFrom: '#6366f1',
  gradientTo: '#1e293b',
  gradientDirection: 'to bottom right',
  minHeight: '280px',
  textAlign: 'center',
  verticalAlign: 'center',
  linkUrl: 'https://github.com/nssivanitesh/react-ubiquitous',
  linkText: 'View on GitHub',
  elements: [],
}

export const listDetailConfig = {
  id: 'list-detail',
  layout: 'list-detail',
  title: 'Contacts',
  listTitle: 'All Contacts',
  listWidth: '260px',
  pageSize: 10,
  listItems: [
    { id: '1', label: 'Alice Johnson', sublabel: 'Engineering', avatar: 'AJ', badge: 'Active' },
    { id: '2', label: 'Bob Smith', sublabel: 'Marketing', avatar: 'BS', badge: 'Away' },
    { id: '3', label: 'Carol White', sublabel: 'Design', avatar: 'CW', badge: 'Active' },
    { id: '4', label: 'David Lee', sublabel: 'Sales', avatar: 'DL', badge: 'Offline' },
  ],
  detailPages: [
    {
      id: 'detail',
      title: 'Details',
      order: 0,
      sections: [
        {
          id: 'detail-grid',
          layout: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          elements: [
            { id: 'd1', name: 'name', type: 'input', inputType: 'text', label: 'Name', order: 0 },
            { id: 'd2', name: 'role', type: 'input', inputType: 'text', label: 'Role', order: 1 },
          ],
        },
      ],
    },
  ],
  elements: [],
}
