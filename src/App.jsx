import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Checkout from './components/views/Checkout'
import Confirmacion from './components/views/Confirmacion'
import useLocalStorage from './hooks/useLocalStorage'
import Tienda from './components/views/Tienda'
import { useCarritoContext } from './context/carritoContext'
import { VISTAS } from './data/vistas'
import dulcesCatamarca from './data/dulce'

function App() {
  const [vista, setVista] = useState(VISTAS.TIENDA)
  const [nombreCliente, setNombreCliente] = useState('')
  const [pedidos, setPedidos] = useLocalStorage('historialPedidos', [])
  const { vaciar } = useCarritoContext()

  const confirmarPedido = (pedido) => {
    const pedidoConfirmado = {
      ...pedido,
      id: Date.now(),
      fecha: new Date().toISOString(),
    }

    setPedidos((actuales) => [pedidoConfirmado, ...actuales])
    setNombreCliente(pedido.nombreCompleto)
    vaciar()
    setVista(VISTAS.CONFIRMACION)
  }

  const renderVista = () => {
    if (vista === VISTAS.CHECKOUT) {
      return (
        <Checkout
          onVolver={() => setVista(VISTAS.TIENDA)}
          onConfirmar={confirmarPedido}
        />
      )
    }

    if (vista === VISTAS.CONFIRMACION) {
      return (
        <Confirmacion
          nombre={nombreCliente}
          pedidos={pedidos}
          onVolverTienda={() => setVista(VISTAS.TIENDA)}
        />
      )
    }

    return (
      <>
        <Tienda />
      </>
    )
  }

  return (
    <div>
      {vista === VISTAS.TIENDA && (
        <Navbar
          items={dulcesCatamarca}
          pedidos={pedidos}
          onIrAlCheckout={() => setVista(VISTAS.CHECKOUT)}
        />
      )}

      <main className="min-h-screen font-sans">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-16 lg:py-20">
          {renderVista()}
        </div>
      </main>
    </div>
  )
}

export default App
