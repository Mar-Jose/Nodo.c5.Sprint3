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
          <h1 className="mt-2 text-4xl font-bold">Dulces regionales</h1>
          <p className="mt-2 text-slate-400">Elegí tus productos y ajustá las cantidades en tu carrito.</p>
        </div>
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

      <DulceList items={itemsFiltrados} />
    </>
  )
}

export default Tienda
