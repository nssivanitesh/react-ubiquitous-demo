export const blogHeroConfig = {
  id: 'blog-hero',
  layout: 'hero',
  order: 0,
  title: 'Break Free from the Loop',
  subtitle: 'One package. Every UI you need.',
  description:
    'Build the backend API and watch the frontend grow — automatically.',
  backgroundType: 'gradient',
  gradientFrom: '#4f46e5',
  gradientTo: '#0f172a',
  gradientDirection: 'to bottom right',
  minHeight: '320px',
  textAlign: 'center',
  verticalAlign: 'center',
  linkUrl: 'https://www.npmjs.com/package/react-ubiquitous',
  linkText: '📦 Get react-ubiquitous on npm',
  elements: [],
}

export const blogPainPointsConfig = {
  id: 'blog-pain-points',
  layout: 'accordion',
  order: 1,
  title: '🤔 Sound familiar?',
  description:
    'If you answered yes to any of these, react-ubiquitous was built for you.',
  allowMultiple: true,
  panels: [
    {
      id: 'pp1',
      label: 'Are you an individual developer or a small company?',
      description: 'Wearing all the hats at once',
      defaultOpen: true,
      elements: [
        {
          id: 'pp1e1',
          name: 'pp1answer',
          type: 'label',
          text: 'You\'re doing design, backend, frontend, devops — all at once. Every hour spent wiring up a new UI library is an hour not spent on the feature that matters.',
          order: 0,
        },
      ],
    },
    {
      id: 'pp2',
      label: 'Tired of doing the same thing over and over?',
      description: 'Creating new React project, navbar, sidebar, table, flexbox, grid, styling...',
      elements: [
        {
          id: 'pp2e1',
          name: 'pp2answer',
          type: 'label',
          text: 'Every new project starts with the same ceremony: scaffold, install, configure, style. You paste the same navbar, the same table wrapper, the same grid boilerplate — and call it "starting fresh".',
          order: 0,
        },
      ],
    },
    {
      id: 'pp3',
      label: 'Make changes to backend, fix frontend, fix backend, fix frontend again?',
      description: 'The endless ping-pong of full-stack development',
      elements: [
        {
          id: 'pp3e1',
          name: 'pp3answer',
          type: 'label',
          text: 'You update an API response shape and suddenly three React components break. You fix the components, but now the API contract drifted. The feedback loop never ends.',
          order: 0,
        },
      ],
    },
    {
      id: 'pp4',
      label: 'Writing fetch().then().then().then()?',
      description: 'Data-fetching boilerplate everywhere',
      elements: [
        {
          id: 'pp4e1',
          name: 'pp4answer',
          type: 'label',
          text: 'Loading state, error state, retry logic, caching — each endpoint becomes its own mini-saga. react-ubiquitous wires your API endpoints directly into UI sections so you never write that chain again.',
          order: 0,
        },
      ],
    },
    {
      id: 'pp5',
      label: 'Getting stuck in nested loop bugs?',
      description: 'Infinite renders, stale closures, dependency arrays...',
      elements: [
        {
          id: 'pp5e1',
          name: 'pp5answer',
          type: 'label',
          text: 'useEffect with the wrong deps, useMemo that never memoizes, re-renders that ripple through the entire tree. When your UI is pure JSON config, these problems simply don\'t exist.',
          order: 0,
        },
      ],
    },
  ],
  elements: [],
}

export const blogDivider1Config = {
  id: 'blog-divider-1',
  layout: 'divider',
  order: 2,
  label: 'The packages you\'d need — separately',
  orientation: 'horizontal',
  variant: 'solid',
  elements: [],
}

export const blogPackagesBadgesConfig = {
  id: 'blog-packages-badges',
  layout: 'badge',
  order: 3,
  title: '📦 Without react-ubiquitous, you\'d need all of these',
  description:
    'Each of these is a separate install, separate config, separate learning curve, and separate version to keep up to date.',
  appearance: 'subtle',
  size: 'md',
  badges: [
    { id: 'pkg1', label: 'Create React App', variant: 'default' },
    { id: 'pkg2', label: 'Ant Design', variant: 'primary' },
    { id: 'pkg3', label: 'Chakra UI', variant: 'primary' },
    { id: 'pkg4', label: 'Mantine', variant: 'primary' },
    { id: 'pkg5', label: 'shadcn/ui', variant: 'primary' },
    { id: 'pkg6', label: 'Tailwind CSS', variant: 'info' },
    { id: 'pkg7', label: 'styled-components', variant: 'info' },
    { id: 'pkg8', label: 'Emotion', variant: 'info' },
    { id: 'pkg9', label: 'Sass', variant: 'info' },
    { id: 'pkg10', label: 'Axios', variant: 'warning' },
    { id: 'pkg11', label: 'Formik', variant: 'warning' },
    { id: 'pkg12', label: 'Yup', variant: 'warning' },
    { id: 'pkg13', label: 'Zod', variant: 'warning' },
    { id: 'pkg14', label: 'Zustand', variant: 'danger' },
    { id: 'pkg15', label: 'Recoil', variant: 'danger' },
    { id: 'pkg16', label: 'Jotai', variant: 'danger' },
    { id: 'pkg17', label: 'React Router', variant: 'danger' },
  ],
  elements: [],
}

export const blogDivider2Config = {
  id: 'blog-divider-2',
  layout: 'divider',
  order: 4,
  label: 'One package to replace them all',
  orientation: 'horizontal',
  variant: 'solid',
  elements: [],
}

export const blogStatsConfig = {
  id: 'blog-stats',
  layout: 'stat',
  order: 5,
  title: '⚡ react-ubiquitous at a glance',
  columns: 4,
  stats: [
    { id: 'bs1', value: '1', label: 'npm Install', subLabel: 'That\'s all it takes', trend: 'vs 17+', trendDirection: 'down', icon: '📦' },
    { id: 'bs2', value: '20+', label: 'UI Layouts', subLabel: 'Tables, charts, forms...', trend: 'built-in', trendDirection: 'up', icon: '🧩' },
    { id: 'bs3', value: '100%', label: 'JSON-Driven', subLabel: 'No JSX required', trend: 'declarative', trendDirection: 'up', icon: '🗂️' },
    { id: 'bs4', value: '0', label: 'Boilerplate', subLabel: 'Config → UI instantly', trend: 'zero setup', trendDirection: 'up', icon: '🚀' },
  ],
  elements: [],
}

export const blogCodeConfig = {
  id: 'blog-code',
  layout: 'code-block',
  order: 6,
  title: '🛠️ Go from backend API to full UI — in one config object',
  description:
    'Define your data source and layout. react-ubiquitous handles fetching, rendering, pagination, sorting, and state.',
  language: 'typescript',
  lineNumbers: true,
  copyable: true,
  code: `import { UIStage } from 'react-ubiquitous'
import type { UIStageConfig } from 'react-ubiquitous'

const config: UIStageConfig = {
  id: 'my-app',
  theme: 'light',
  pages: [
    {
      id: 'users',
      title: 'Users',
      order: 0,
      sections: [
        {
          id: 'users-table',
          layout: 'list-detail',
          title: 'All Users',
          listEndpoint: { url: '/api/users', method: 'GET' },
          filterEndpoint: { url: '/api/users/search', method: 'GET' },
          detailEndpoint: { url: '/api/users/:id', method: 'GET' },
          detailPages: [
            {
              id: 'profile',
              title: 'Profile',
              order: 0,
              sections: [
                {
                  id: 'profile-form',
                  layout: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  elements: [
                    { id: 'e1', name: 'name',  type: 'input', inputType: 'text',  label: 'Full Name', order: 0 },
                    { id: 'e2', name: 'email', type: 'input', inputType: 'email', label: 'Email',     order: 1 },
                    { id: 'e3', name: 'save',  type: 'button', text: 'Save Changes', variant: 'default', order: 2 },
                  ],
                },
              ],
            },
          ],
          elements: [],
        },
      ],
    },
  ],
}

export default function App() {
  return <UIStage config={config} />
}`,
  elements: [],
}

export const blogTimelineConfig = {
  id: 'blog-timeline',
  layout: 'timeline',
  order: 7,
  title: '🗺️ Your new development workflow',
  events: [
    {
      id: 'wf1',
      title: 'npm install react-ubiquitous',
      description: 'One command. No peer dependencies to juggle.',
      timestamp: 'Step 1',
      variant: 'primary',
      icon: '📦',
    },
    {
      id: 'wf2',
      title: 'Build your backend API',
      description: 'REST endpoints, any language, any framework. react-ubiquitous speaks HTTP.',
      timestamp: 'Step 2',
      variant: 'primary',
      icon: '🔧',
    },
    {
      id: 'wf3',
      title: 'Write a JSON config',
      description: 'Describe your pages, layouts, and data sources. No JSX, no CSS, no state management code.',
      timestamp: 'Step 3',
      variant: 'success',
      icon: '🗂️',
    },
    {
      id: 'wf4',
      title: 'Watch the frontend grow',
      description: 'Tables, charts, forms, sidebars, navbars — fully rendered, wired, and interactive.',
      timestamp: 'Step 4',
      variant: 'success',
      icon: '🚀',
    },
    {
      id: 'wf5',
      title: 'Ship your product',
      description: 'Focus on what makes your product unique, not on the plumbing underneath.',
      timestamp: 'Step 5',
      variant: 'success',
      icon: '✅',
    },
  ],
  elements: [],
}

export const blogShowcaseChartConfig = {
  id: 'blog-showcase-chart',
  layout: 'chart',
  chartType: 'bar',
  order: 8,
  title: '📊 Example: Instant dashboard — zero extra packages',
  description: 'This chart is rendered entirely by react-ubiquitous with a single section config. No Recharts, no Chart.js, no D3.',
  showGrid: true,
  showLabels: true,
  height: 260,
  data: [
    { label: 'Week 1', value: 120 },
    { label: 'Week 2', value: 340 },
    { label: 'Week 3', value: 520 },
    { label: 'Week 4', value: 780 },
    { label: 'Week 5', value: 960 },
    { label: 'Week 6', value: 1200 },
  ],
  elements: [],
}

export const blogShowcaseTableConfig = {
  id: 'blog-showcase-table',
  layout: 'table',
  order: 9,
  title: '📋 Example: Sortable, searchable table — zero extra packages',
  description: 'Sorting, search, pagination, and responsive layout — all from one config object. No AG Grid, no TanStack Table.',
  searchable: true,
  pageSize: 4,
  columns: [
    { key: 'package', label: 'Package', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'replaced', label: 'Replaced by', sortable: false },
  ],
  rows: [
    { package: 'Tailwind CSS + styled-components', category: 'Styling', replaced: 'react-ubiquitous themes' },
    { package: 'Formik + Yup', category: 'Forms & Validation', replaced: 'react-ubiquitous fields' },
    { package: 'Axios', category: 'Data Fetching', replaced: 'react-ubiquitous endpoints' },
    { package: 'React Router', category: 'Routing', replaced: 'react-ubiquitous pages' },
    { package: 'Zustand / Recoil', category: 'State Management', replaced: 'react-ubiquitous stage' },
    { package: 'Ant Design / Chakra UI', category: 'UI Components', replaced: 'react-ubiquitous layouts' },
    { package: 'Recharts / Chart.js', category: 'Charts', replaced: 'react-ubiquitous chart section' },
  ],
  emptyMessage: 'No packages found.',
  elements: [],
}

export const blogAlertConfig = {
  id: 'blog-alert',
  layout: 'alert',
  order: 10,
  title: '🎉 You\'re already seeing it in action',
  description:
    'This entire demo — dashboards, charts, forms, tables, navigation, and this blog — is rendered by react-ubiquitous from JSON configs. Not a single custom UI component was written.',
  severity: 'success',
  dismissible: false,
  icon: true,
  elements: [],
}

export const blogCtaHeroConfig = {
  id: 'blog-cta-hero',
  layout: 'hero',
  order: 11,
  title: '🚀 Ready to break out of the loop?',
  subtitle: 'npm install react-ubiquitous',
  description: 'Build your backend. Define a config. Ship your product.',
  backgroundType: 'gradient',
  gradientFrom: '#059669',
  gradientTo: '#0f172a',
  gradientDirection: 'to bottom right',
  minHeight: '260px',
  textAlign: 'center',
  verticalAlign: 'center',
  linkUrl: 'https://github.com/nssivanitesh/react-ubiquitous',
  linkText: '⭐ Star on GitHub',
  elements: [],
}
