// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TenantProvider } from './context/TenantContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <TenantProvider>
        <App />
      </TenantProvider>
    </ThemeProvider>
  </React.StrictMode>,
)