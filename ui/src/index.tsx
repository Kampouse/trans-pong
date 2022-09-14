import { BrowserRouter } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import React from 'react'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
