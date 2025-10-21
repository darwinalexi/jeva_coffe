import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkMode } from './Components/DarkMode.jsx'
import { CartProvider } from './Components/Context/CartContext.jsx'
import { TourProvider } from './Components/Context/TourContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TourProvider>
      <CartProvider>
        <DarkMode>
          <App />
        </DarkMode>
      </CartProvider>
    </TourProvider>
  </StrictMode>,
)
