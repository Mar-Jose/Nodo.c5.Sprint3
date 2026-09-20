import { useCallback, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'

function limitarCantidad(item, cantidad) {
  const cantidadNumerica = Math.max(0, Number(cantidad) || 0)

  if (item.stock == null) return cantidadNumerica

  return Math.min(cantidadNumerica, item.stock)
}

export function useCarrito() {
  const [carrito, setCarrito] = useLocalStorage('carrito', [])

  const agregar = useCallback((item) => {
    setCarrito((actual) => {
      const itemExiste = actual.some((producto) => producto.id === item.id)

      if (itemExiste) {
        return actual.map((producto) => (
          producto.id === item.id
            ? {
                ...producto,
                cantidad: limitarCantidad(producto, producto.cantidad + 1),
              }
            : producto
        ))
      }

      const cantidadInicial = limitarCantidad(item, 1)
      return cantidadInicial > 0
        ? [...actual, { ...item, cantidad: cantidadInicial }]
        : actual
    })
  }, [setCarrito])

  const cambiarCantidad = useCallback((id, cantidad) => {
    setCarrito((actual) => actual
      .map((item) => {
        if (item.id !== id) return item

        return {
          ...item,
          cantidad: limitarCantidad(item, cantidad),
        }
      })
      .filter((item) => item.cantidad > 0))
  }, [setCarrito])

  const quitar = useCallback((id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id))
  }, [setCarrito])

  const vaciar = useCallback(() => {
    setCarrito([])
  }, [setCarrito])

  const cantidadTotal = useMemo(
    () => carrito.reduce((total, item) => total + item.cantidad, 0),
    [carrito]
  )

  const total = useMemo(
    () => carrito.reduce((total, item) => total + item.precio * item.cantidad, 0),
    [carrito]
  )

  const estaEnElCarrito = useCallback(
    (id) => carrito.some((item) => item.id === id),
    [carrito]
  )

  return {
    carrito,
    cantidadTotal,
    total,
    estaEnElCarrito,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  }
}

export default useCarrito
