import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkMode } from './Components/DarkMode.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkMode>
    <App />
    </DarkMode>
  </StrictMode>,
)
