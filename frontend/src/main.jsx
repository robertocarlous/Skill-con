import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


 
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

  
<QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </QueryClientProvider>
)
