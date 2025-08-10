import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkMode } from './Components/DarkMode.jsx'
import { CartProvider } from './Components/Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <DarkMode>
      <App />
      </DarkMode>
    </CartProvider>
  </StrictMode>,
)
