import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner' // Ye import karein

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" richColors /> {/* Ye line add ki */}
    <App />
  </StrictMode>,
)