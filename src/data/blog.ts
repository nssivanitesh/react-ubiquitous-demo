export const blogHeroConfig = {
  id: 'blog-hero',
  layout: 'hero',
  order: 0,
  title: 'One Backend Change. Every Client Updated.',
  subtitle: 'Web · Desktop · iOS · Android — all from a single JSON config.',
  description:
    'Build your API once. react-ubiquitous turns it into a fully interactive UI across every platform — no per-client code, no App Store delays, no boilerplate.',
  backgroundType: 'gradient',
  gradientFrom: '#1e1b4b',
  gradientTo: '#0f172a',
  gradientDirection: 'to bottom right',
  minHeight: '380px',
  textAlign: 'center',
  verticalAlign: 'center',
  linkUrl: 'https://www.npmjs.com/package/react-ubiquitous',
  linkText: '📦 Get started — npm install react-ubiquitous',
  elements: [],
}

export const blogMediaConfig = {
  id: 'blog-media',
  layout: 'media',
  order: 1,
  aspectRatio: '16/9',
  items: [
    {
      id: 'arch-1',
      type: 'image',
      url: '/react-ubiquitous-architecture.png',
      alt: 'react-ubiquitous architecture diagram — one backend API powering web, desktop and mobile clients',
      caption: 'One backend API. Every client updated automatically.',
    },
  ],
  elements: [],
}

export const blogPainPointsConfig = {
  id: 'blog-pain-points',
  layout: 'accordion',
  order: 2,
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
  order: 3,
  label: 'The packages you\'d need — separately',
  orientation: 'horizontal',
  variant: 'solid',
  elements: [],
}

export const blogPackagesBadgesConfig = {
  id: 'blog-packages-badges',
  layout: 'badge',
  order: 4,
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
  order: 5,
  label: 'One package to replace them all',
  orientation: 'horizontal',
  variant: 'solid',
  elements: [],
}

export const blogStatsConfig = {
  id: 'blog-stats',
  layout: 'stat',
  order: 6,
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
  order: 7,
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

export const blogTreeViewConfig = {
  id: 'blog-tree-view',
  layout: 'tree-view',
  order: 8,
  title: '🗂️ How a react-ubiquitous app is structured',
  description:
    'Every app is a tree: one UIStage root holds Pages, each Page holds Sections, and Sections hold Elements. Navigate the nodes below to see how the hierarchy maps to real UI.',
  treeTitle: 'Config Hierarchy',
  treeWidth: '280px',
  treeMode: 'compact',
  treeNodes: [
    {
      id: 'stage',
      label: 'UIStage',
      sublabel: 'Root config object',
      badge: 'root',
      children: [
        {
          id: 'page-dashboard',
          label: 'Page: Dashboard',
          sublabel: 'order: 0',
          badge: 'page',
          children: [
            { id: 's-stat', label: 'stat', sublabel: 'KPI cards', badge: 'section' },
            { id: 's-chart', label: 'chart', sublabel: 'bar / line / area / pie', badge: 'section' },
            { id: 's-table', label: 'table', sublabel: 'sortable, searchable', badge: 'section' },
          ],
        },
        {
          id: 'page-contacts',
          label: 'Page: Contacts',
          sublabel: 'order: 1',
          badge: 'page',
          children: [
            {
              id: 's-list-detail',
              label: 'list-detail',
              sublabel: 'browse & inspect records',
              badge: 'section',
              children: [
                { id: 'dp-profile', label: 'DetailPage: Profile', sublabel: 'tab 0 — form fields', badge: 'detail' },
                { id: 'dp-activity', label: 'DetailPage: Activity', sublabel: 'tab 1 — timeline', badge: 'detail' },
              ],
            },
            { id: 's-tree', label: 'tree-view', sublabel: 'hierarchical data explorer', badge: 'section' },
            { id: 's-chat', label: 'chat', sublabel: 'messaging UI', badge: 'section' },
          ],
        },
        {
          id: 'page-settings',
          label: 'Page: Settings',
          sublabel: 'order: 2',
          badge: 'page',
          children: [
            { id: 's-stepper', label: 'stepper', sublabel: 'multi-step wizard', badge: 'section' },
            { id: 's-accordion', label: 'accordion', sublabel: 'expandable panels', badge: 'section' },
            { id: 's-modal', label: 'modal / drawer', sublabel: 'overlay actions', badge: 'section' },
          ],
        },
        {
          id: 'page-blog',
          label: 'Page: Blog / Home',
          sublabel: 'order: 3',
          badge: 'page',
          children: [
            { id: 's-hero', label: 'hero', sublabel: 'full-bleed header', badge: 'section' },
            { id: 's-timeline', label: 'timeline', sublabel: 'sequential steps', badge: 'section' },
            { id: 's-code-block', label: 'code-block', sublabel: 'syntax-highlighted code', badge: 'section' },
            { id: 's-badge', label: 'badge', sublabel: 'tag cloud', badge: 'section' },
          ],
        },
      ],
    },
  ],
  elements: [],
}

export const blogTimelineConfig = {
  id: 'blog-timeline',
  layout: 'timeline',
  order: 2,
  title: '🗺️ From API to every platform — in four steps',
  events: [
    {
      id: 'wf1',
      title: 'Build your backend API response in JSON',
      description:
        'Design your API endpoints in any language — Node, Python, Go, Java, .NET. Return structured JSON. That single response is the source of truth for every client that will ever consume it. Fix a bug or reshape the data here, and every platform benefits automatically. No per-client patches required.',
      timestamp: 'Step 1',
      variant: 'primary',
      icon: '🗄️',
    },
    {
      id: 'wf2',
      title: 'Build your web app with react-ubiquitous and publish',
      description:
        'Install @nssivanitesh/react-ubiquitous, write a UIStageConfig, and point it at your API endpoints. Tables, charts, forms, navbars, sidebars — all rendered from JSON. No JSX components, no state management, no styling boilerplate. Deploy to any static host or CDN in minutes.',
      timestamp: 'Step 2',
      variant: 'primary',
      icon: '🌐',
    },
    {
      id: 'wf3',
      title: 'Bundle for desktop with Electron — Mac, Windows & Linux',
      description:
        'Wrap the same React app in an Electron shell to produce native desktop installers for all three platforms. Zero UI code changes needed. When your backend API evolves, users get the updated interface the moment the app reloads — no new desktop release, no installer download.',
      timestamp: 'Step 3',
      variant: 'success',
      icon: '🖥️',
    },
    {
      id: 'wf4',
      title: 'Bundle for mobile with Capacitor — iPhone & Android',
      description:
        'Use Capacitor to package the same web app as a native iOS and Android binary. You do not need to test UI logic separately on each mobile platform. Logic bugs are resolved at the API layer once. UI rendering bugs are the responsibility of the react-ubiquitous package team — one fix there resolves the issue across every client simultaneously. No lengthy App Store review cycles just to ship a new button or feature.',
      timestamp: 'Step 4',
      variant: 'success',
      icon: '📱',
    },
  ],
  elements: [],
}

export const blogShowcaseChartConfig = {
  id: 'blog-showcase-chart',
  layout: 'chart',
  chartType: 'bar',
  order: 9,
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
  order: 10,
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
  order: 11,
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
  order: 12,
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
