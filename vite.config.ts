import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'fs'

const ruVersion: string = JSON.parse(
  readFileSync('./node_modules/react-ubiquitous/package.json', 'utf-8')
).version

export default defineConfig({
  define: {
    __RU_VERSION__: JSON.stringify(ruVersion),
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
