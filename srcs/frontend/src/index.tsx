import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import 'tailwindcss/tailwind.css'
import Router from './Router/Router'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)

root.render(
  
    <BrowserRouter>
      <CssBaseline />
      <Router />
    </BrowserRouter>

)
