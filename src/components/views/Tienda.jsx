import { useMemo, useState } from 'react'
import dulcesCatamarca from '../../data/dulce'
import DulceList from '../DulceList'

function Tienda() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

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

  return (
    <>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Sabores de Catamarca</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Dulces regionales</h1>
          <p className="mt-2 text-token-slate-400">Elegí tus productos y ajustá las cantidades en tu carrito.</p>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => {
            const seleccionada = categoria === categoriaSeleccionada

            return (
              <button
                key={categoria}
                type="button"
                onClick={() => setCategoriaSeleccionada(categoria)}
                aria-pressed={seleccionada}
                className={[
                  'rounded-full px-3 py-2 text-xs font-semibold transition',
                  seleccionada
                    ? 'bg-brand text-token-white'
                    : 'border border-token-white/10 bg-token-white/5 text-token-slate-300 hover:bg-token-white/10',
                ].join(' ')}
              >
                {seleccionada && <span aria-hidden="true">✓ </span>}
                {categoria}
              </button>
            )
          })}
        </div>

        <label className="block w-full max-w-md">
          <span className="sr-only">Buscar dulces</span>
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre u origen..."
            className="w-full rounded-full border border-token-white/10 bg-surface px-4 py-3 text-sm text-token-black placeholder:text-token-black focus:border-brand focus:outline-none"
          />
        </label>
      </div>

      <DulceList items={itemsFiltrados} />
    </>
  )
}

export default Tienda
