import { BrowserRouter } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import ReactDOM from 'react-dom/client'
import Router from './Router/Router'
import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)
const client = new QueryClient()
root.render(
  <React.StrictMode>
    < QueryClientProvider client={client}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
