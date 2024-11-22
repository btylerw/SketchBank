import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import ThemeProvider from './ThemeProvider.jsx';
import AuthProvider from './AuthProvider.jsx';
import routes from './routes.jsx'
import './index.css'

const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </ThemeProvider>
  </StrictMode>,
)
