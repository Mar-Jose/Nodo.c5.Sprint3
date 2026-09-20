import { useMemo, useState } from 'react'
import dulcesCatamarca from './data/dulce'
import CarritoItem from './components/CarritoItem'
import DulceList from './components/DulceList'
import Navbar from './components/layout/Navbar'
import { useCarritoContext } from './context/carritoContext'
import { formatearPrecio } from './utils/formato'

function App() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [miLista, setMiLista] = useState([])
  const {
    carrito,
    cantidadTotal,
    total,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
  } = useCarritoContext()

  const categorias = useMemo(
    () => ['Todas', ...new Set(dulcesCatamarca.map((item) => item.categoria))],
    []
  )

  const itemsFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    return dulcesCatamarca.filter((item) => {
      const coincideCategoria = categoriaSeleccionada === 'Todas'
        || item.categoria === categoriaSeleccionada
      const coincideBusqueda = !texto
        || `${item.nombre} ${item.origen}`.toLowerCase().includes(texto)

      return coincideCategoria && coincideBusqueda
    })
  }, [busqueda, categoriaSeleccionada])

  const toggleMiLista = (id) => {
    setMiLista((actual) => (
      actual.includes(id)
        ? actual.filter((itemId) => itemId !== id)
        : [...actual, id]
    ))
  }

  return (
    <>
      <Navbar
        lista={miLista}
        items={dulcesCatamarca}
        onToggleItem={toggleMiLista}
        onVaciarLista={() => setMiLista([])}
      />

      <main className="min-h-screen bg-black font-sans text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Sabores de Catamarca</p>
            <h1 className="mt-2 text-4xl font-bold">Dulces regionales</h1>
            <p className="mt-2 text-slate-400">Elegí tus productos y ajustá las cantidades en tu carrito.</p>
          </div>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => setCategoriaSeleccionada(categoria)}
                  className={[
                    'rounded-full px-3 py-2 text-xs font-semibold transition',
                    categoria === categoriaSeleccionada
                      ? 'bg-brand text-white'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10',
                  ].join(' ')}
                >
                  {categoria}
                </button>
              ))}
            </div>

            <label className="block w-full max-w-md">
              <span className="sr-only">Buscar dulces</span>
              <input
                type="search"
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Buscar por nombre u origen..."
                className="w-full rounded-full border border-white/10 bg-surface px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand focus:outline-none"
              />
            </label>
          </div>

          <DulceList
            items={itemsFiltrados}
            miLista={miLista}
            toggleMiLista={toggleMiLista}
            onAgregarCarrito={agregar}
          />

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
    </>
  )
}

export default App
