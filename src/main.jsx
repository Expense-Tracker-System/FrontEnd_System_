import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './auth/auth.context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ModeProvider } from './auth/mode.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ModeProvider>
        <App />
      </ModeProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
