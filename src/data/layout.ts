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

export const chatConfig = {
  id: 'chat-section',
  layout: 'chat',
  listTitle: 'Messages',
  listWidth: '280px',
  inputPlaceholder: 'Type a message…',
  sendButtonText: 'Send',
  currentUserName: 'You',
  conversations: [
    {
      id: 'conv-1',
      label: 'Alice Johnson',
      sublabel: 'Sounds good, see you then!',
      avatar: 'AJ',
      badge: '2',
      messages: [
        { id: 'm1', sender: 'Alice Johnson', role: 'other', text: 'Hey! Are you free for a call tomorrow?', timestamp: '2026-02-25T09:00:00Z', avatar: 'AJ' },
        { id: 'm2', sender: 'You', role: 'me', text: 'Yes, works for me. What time?', timestamp: '2026-02-25T09:02:00Z' },
        { id: 'm3', sender: 'Alice Johnson', role: 'other', text: 'How about 10am?', timestamp: '2026-02-25T09:03:00Z', avatar: 'AJ' },
        { id: 'm4', sender: 'You', role: 'me', text: 'Perfect, I\'ll send a calendar invite.', timestamp: '2026-02-25T09:04:00Z' },
        { id: 'm5', sender: 'Alice Johnson', role: 'other', text: 'Sounds good, see you then!', timestamp: '2026-02-25T09:05:00Z', avatar: 'AJ' },
      ],
    },
    {
      id: 'conv-2',
      label: 'Bob Smith',
      sublabel: 'I\'ll review it this afternoon.',
      avatar: 'BS',
      messages: [
        { id: 'm1', sender: 'You', role: 'me', text: 'Hi Bob, I\'ve pushed the latest changes to the repo.', timestamp: '2026-02-25T10:15:00Z' },
        { id: 'm2', sender: 'Bob Smith', role: 'other', text: 'Nice, I\'ll review it this afternoon.', timestamp: '2026-02-25T10:20:00Z', avatar: 'BS' },
      ],
    },
    {
      id: 'conv-3',
      label: 'Design Team',
      sublabel: 'New mockups are ready for review.',
      avatar: 'DT',
      badge: '5',
      messages: [
        { id: 'm1', sender: 'Carol White', role: 'other', text: 'New mockups are ready for review in Figma.', timestamp: '2026-02-25T11:00:00Z', avatar: 'CW' },
        { id: 'm2', sender: 'You', role: 'me', text: 'Great, I\'ll take a look shortly.', timestamp: '2026-02-25T11:05:00Z' },
      ],
    },
  ],
  elements: [],
}
