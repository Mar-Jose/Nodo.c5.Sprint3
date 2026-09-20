import { CarritoProvider } from './context/carritoContext'
import { ThemeProvider } from './context/themeContext'

function Providers({ children }) {
  return (
    <ThemeProvider>
      <CarritoProvider>{children}</CarritoProvider>
    </ThemeProvider>
  )
}

export default Providers
