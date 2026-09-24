import { useState } from 'react'
import Carrito from './components/Carrito'
import Navbar from './components/layout/Navbar'
import Checkout from './components/views/Checkout'
import Confirmacion from './components/views/Confirmacion'
import Tienda from './components/views/Tienda'
import { useCarritoContext } from './context/carritoContext'
import { VISTAS } from './data/vistas'
import dulcesCatamarca from './data/dulce'

function App() {
  const [vista, setVista] = useState(VISTAS.TIENDA)
  const [nombreCliente, setNombreCliente] = useState('')
  const { vaciar } = useCarritoContext()

  const confirmarPedido = (pedido) => {
    console.log('Pedido confirmado:', pedido)
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
          onVolverTienda={() => setVista(VISTAS.TIENDA)}
        />
      )
    }

    return (
      <>
        <Tienda />
        <Carrito onIrAlCheckout={() => setVista(VISTAS.CHECKOUT)} />
      </>
    )
  }

  return (
    <div>
      {vista === VISTAS.TIENDA && <Navbar items={dulcesCatamarca} />}

      <main className="min-h-screen font-sans">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          {renderVista()}
        </div>
      </main>
    </div>
  )
}

export default App
