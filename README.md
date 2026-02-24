# react-ubiquitous Demo

A live component explorer for the [`react-ubiquitous`](https://www.npmjs.com/package/react-ubiquitous) npm package — a JSON-driven UI renderer for React.

## What This Demo Shows

Browse and interact with all component categories:

| Category | Components |
|---|---|
| 📊 Charts | Bar, Line, Area, Pie, Donut, Radar, Scatter |
| 🏗️ Layout | Flex, Grid, Hero, List-Detail |
| 🧭 Navigation | Navbar, Sidebar, Breadcrumbs, Pagination, Stepper, Tabs |
| 💬 Feedback | Alert, Progress (linear/circular), Skeleton, Toast |
| 🪟 Overlays | Modal, Drawer, Tooltip, Popover |
| 📂 Disclosure | Accordion, Collapse |
| 📋 Data Display | Card, Table, Badge, Avatar, Timeline, Stat, Empty State, Code Block, iFrame, Media, Divider |
| 📝 Fields | Input, Checkbox, Radio, Textarea, Select, Button, Label, Fieldset, Datalist, Output, Datepicker, Multi-Select, Autocomplete, File Upload, Color Picker, Range Slider, Rating, OTP Input, Phone Input |

## Getting Started

```bash
git clone https://github.com/nssivanitesh/react-ubiquitous-demo
cd react-ubiquitous-demo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Use

1. **Browse categories** using the sidebar on the left
2. **Edit the JSON config** in the dark editor panel on the left side of each component
3. **See live changes** instantly reflected in the preview panel on the right

## Tech Stack

- [React](https://react.dev) + [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [react-ubiquitous](https://www.npmjs.com/package/react-ubiquitous)

## Library

The `react-ubiquitous` library lets you build UIs from plain JSON config objects:

```tsx
import { UISection } from 'react-ubiquitous'

const config = {
  id: 'my-form',
  layout: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  elements: [
    { id: 'name', name: 'fullName', type: 'input', inputType: 'text', label: 'Full Name' },
  ],
}

export function MyForm() {
  return <UISection config={config} />
}
```

📦 [View on npm](https://www.npmjs.com/package/react-ubiquitous)
