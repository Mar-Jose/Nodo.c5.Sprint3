import { createContext, useContext } from 'react'
import useCarrito from '../hooks/useCarrito'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const carrito = useCarrito()

  return (
    <CarritoContext.Provider value={carrito}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarritoContext() {
  const context = useContext(CarritoContext)

  if (context === null) {
    throw new Error('useCarritoContext debe usarse dentro de CarritoProvider')
  }

  return context
}