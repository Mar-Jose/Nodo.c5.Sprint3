import { useState } from 'react'
import { useCarritoContext } from '../context/carritoContext'
import { useThemeContext } from '../context/themeContext'
import { formatearPrecio } from '../utils/formato'
import CarritoItem from './CarritoItem'
import Modal from './ui/Modal'

function CarritoModal({ onIrAlCheckout }) {
  const [abierto, setAbierto] = useState(false)
  const {
    carrito,
    cantidadTotal,
    total,
    cambiarCantidad,
    quitar,
    vaciar,
  } = useCarritoContext()
  const { isDarkMode } = useThemeContext()

  const irAlCheckout = () => {
    setAbierto(false)
    onIrAlCheckout()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        aria-haspopup="dialog"
        aria-expanded={abierto}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition sm:gap-2 sm:px-3 sm:text-sm ${
          isDarkMode
            ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            : 'border-emerald-800/30 bg-emerald-700/10 text-emerald-950 hover:bg-emerald-700/20'
        }`}
      >
        <span>Mi carrito</span>
        <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-xs">
          {cantidadTotal}
        </span>
      </button>

      <Modal
        isOpen={abierto}
        onClose={() => setAbierto(false)}
        ariaLabel="Carrito de compras"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-blue-950 p-5 text-white shadow-2xl sm:p-6"
      >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Tu carrito</p>
                <h2 className="mt-1 text-2xl font-bold">
                  Productos seleccionados
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand/20 px-3 py-1 text-sm text-brand">
                  {cantidadTotal} {cantidadTotal === 1 ? 'unidad' : 'unidades'}
                </span>
                <button
                  type="button"
                  onClick={() => setAbierto(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                  Cerrar
                </button>
              </div>
            </div>

            {carrito.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-white/10 p-6 text-center">
                <p className="text-lg font-semibold text-white">Tu carrito está vacío</p>
                <p className="mt-2 text-sm text-slate-400">
                  Elegí un dulce de la tienda y lo vas a encontrar acá.
                </p>
              </div>
            ) : (
              <>
                <ul className="mt-5 space-y-3">
                  {carrito.map((item) => (
                    <CarritoItem
                      key={item.id}
                      item={item}
                      onCambiarCantidad={cambiarCantidad}
                      onQuitar={quitar}
                    />
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={vaciar}
                      className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/20"
                    >
                      Vaciar carrito
                    </button>
                    <button
                      type="button"
                      onClick={irAlCheckout}
                      className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
                    >
                      Realizar compra
                    </button>
                  </div>
                  <p className="text-xl font-bold text-brand">
                    Total {formatearPrecio(total)}
                  </p>
                </div>
              </>
            )}
      </Modal>
    </>
  )
}

export default CarritoModal