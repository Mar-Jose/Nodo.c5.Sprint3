import CarritoItem from './CarritoItem'
import { useCarritoContext } from '../context/carritoContext'
import { formatearPrecio } from '../utils/formato'

function Carrito({ onIrAlCheckout }) {
  const {
    carrito,
    cantidadTotal,
    total,
    cambiarCantidad,
    quitar,
    vaciar,
  } = useCarritoContext()

  return (
    <section className="mt-12 rounded-2xl border border-white/10 bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Tu carrito</p>
          <h2 className="mt-1 text-2xl font-bold">Productos seleccionados</h2>
        </div>
        <span className="rounded-full bg-brand/20 px-3 py-1 text-sm text-brand">
          {cantidadTotal} {cantidadTotal === 1 ? 'unidad' : 'unidades'}
        </span>
      </div>

      {carrito.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-white/10 p-6 text-center">
          <p className="text-lg font-semibold text-white">Tu carrito está vacío</p>
          <p className="mt-2 text-sm text-slate-400">
            Elegí un dulce de la tienda y lo vas a encontrar acá.
          </p>
          <button
            type="button"
            disabled
            className="mt-5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white opacity-40"
          >
            Ir al checkout
          </button>
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
                onClick={onIrAlCheckout}
                disabled={carrito.length === 0}
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand/80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ir al checkout
              </button>
            </div>
            <p className="text-xl font-bold text-brand">{formatearPrecio(total)}</p>
          </div>
        </>
      )}
    </section>
  )
}

export default Carrito
