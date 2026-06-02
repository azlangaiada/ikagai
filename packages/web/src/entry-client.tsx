import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { App } from './App'
import './globals.css'

const initialData = (window as any).__INITIAL_DATA__

hydrateRoot(
  document.getElementById('app')!,
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App initialData={initialData} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
