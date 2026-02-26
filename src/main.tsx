import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { validatorRegistry } from 'react-ubiquitous'
import 'react-ubiquitous/theme.css'
import './index.css'
import App from './App.tsx'

/**
 * Feature 8 (1.0.13): validatorRegistry — register a custom "no-spaces" validator
 * that can be referenced in any element config via:
 *   validations: [{ rule: 'custom', validator: 'no-spaces' }]
 */
validatorRegistry.register('no-spaces', (value) => {
  if (typeof value === 'string' && value.includes(' ')) {
    return 'Value must not contain spaces.'
  }
  return null
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
