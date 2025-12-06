import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './client/index.css'
import App from './client/App.jsx'
import Login from './client/Login.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
