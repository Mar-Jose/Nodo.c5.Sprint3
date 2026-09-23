import CarritoItem from './components/CarritoItem'
import Tienda from './components/views/Tienda'
import Navbar from './components/layout/Navbar'
import { useCarritoContext } from './context/carritoContext'
import { formatearPrecio } from './utils/formato'
import dulcesCatamarca from './data/dulce'

function App() {
  const {
    carrito,
    cantidadTotal,
    total,
    cambiarCantidad,
    quitar,
    vaciar,
  } = useCarritoContext()

  return (
    <div>
      <Navbar items={dulcesCatamarca} />

      <main className="min-h-screen font-sans">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <Tienda />

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
              <p className="mt-5 rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-400">
                Todavía no agregaste productos.
              </p>
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
                  <button
                    type="button"
                    onClick={vaciar}
                    className="rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/20"
                  >
                    Vaciar carrito
                  </button>
                  <p className="text-xl font-bold text-brand">{formatearPrecio(total)}</p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
