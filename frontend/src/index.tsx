import { BrowserRouter } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import ReactDOM from 'react-dom/client'
import Router from '@router/Router'
import React from 'react'
import { useState, createContext } from 'react'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
)
