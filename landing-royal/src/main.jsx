import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fuentes autoalojadas: sin CDN, sin fallback silencioso.
import '@fontsource-variable/playfair-display'
import '@fontsource-variable/inter'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
