export const accordionConfig = {
  id: 'accordion',
  layout: 'accordion',
  title: 'Frequently Asked Questions',
  allowMultiple: false,
  panels: [
    {
      id: 'p1',
      label: 'What is react-ubiquitous?',
      description: 'Click to expand',
      defaultOpen: true,
      elements: [
        { id: 'pe1', name: 'answer1', type: 'label', text: 'react-ubiquitous is a JSON-driven UI renderer for React. You describe your UI as a plain config object and the library renders it.', order: 0 },
      ],
    },
    {
      id: 'p2',
      label: 'How do I install it?',
      elements: [
        { id: 'pe2', name: 'answer2', type: 'label', text: 'Run: npm install react-ubiquitous', order: 0 },
      ],
    },
    {
      id: 'p3',
      label: 'Does it support TypeScript?',
      elements: [
        { id: 'pe3', name: 'answer3', type: 'label', text: 'Yes! react-ubiquitous is built with TypeScript-first design, providing full type safety for all config objects.', order: 0 },
      ],
    },
  ],
  elements: [],
}

export const collapseConfig = {
  id: 'collapse',
  layout: 'collapse',
  title: 'Advanced Options',
  label: 'Show Advanced Options',
  defaultOpen: false,
  icon: true,
  elements: [
    { id: 'c1', name: 'debug_mode', type: 'checkbox', label: 'Enable debug mode', order: 0 },
    { id: 'c2', name: 'timeout', type: 'input', inputType: 'number', label: 'Timeout (ms)', defaultValue: 5000, order: 1 },
    { id: 'c3', name: 'retry', type: 'input', inputType: 'number', label: 'Max retries', defaultValue: 3, order: 2 },
  ],
}
