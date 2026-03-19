import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { CartProvider } from './context/CartContext';
import { HamperProvider } from './context/HamperContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <HamperProvider>
          <App />
        </HamperProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
