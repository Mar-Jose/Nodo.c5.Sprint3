import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from './context/carritoContext'
import { ListaProvider } from './context/listaContext'
import { ThemeProvider } from './context/themeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CarritoProvider>
        <ListaProvider>
          <App />
        </ListaProvider>
      </CarritoProvider>
    </ThemeProvider>
  </StrictMode>,
)
