import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <App />
            <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
