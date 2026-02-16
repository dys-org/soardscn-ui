import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/App'
import './styles.css'

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

const applySystemTheme = () => {
  document.documentElement.classList.toggle('dark', darkModeQuery.matches)
}

applySystemTheme()
darkModeQuery.addEventListener('change', applySystemTheme)

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element was not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
