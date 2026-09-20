import { CarritoProvider } from './context/carritoContext'

function Providers({ children }) {
  return <CarritoProvider>{children}</CarritoProvider>
}

export default Providers
