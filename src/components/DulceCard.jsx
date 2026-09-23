import { formatearPrecio } from '../utils/formato'
import { useCarritoContext } from '../context/carritoContext'
import { useListaContext } from '../context/listaContext'

function DulceCard({ item }) {
  const { lista, toggleItem } = useListaContext()
  const { agregar } = useCarritoContext()
  const isInMyList = lista.includes(item.id)

  let toggleButton
  //booleano:
  if (isInMyList) {
    toggleButton = (
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <button
          type="button"
          className="w-full rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200 transition hover:bg-emerald-500/20 sm:w-auto"
        >
          {isInMyList ? '✓ En mi lista' : '+ Agregar'}
        </button>
        <button
          type="button"
          onClick={() => toggleItem(item.id)}
          className="w-full rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-200 transition hover:bg-rose-500/20 sm:w-auto"
        >
          Quitar
        </button>
      </div>
    )
  } else {
    toggleButton = (
      <button
        type="button"
        onClick={() => toggleItem(item.id)}
        className="w-full rounded-full border border-brand/30 bg-brand/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand transition hover:bg-brand hover:text-white sm:w-auto"
      >
        + Agregar
      </button>
    )
  }
          //badge: destacado, nuevo, requiere refrigeración, en mi lista.
  return (
    <article className="rounded-2xl border border-white/10 bg-surface p-4 shadow-lg shadow-brand/5 transition-transform duration-200 hover:-translate-y-1 sm:p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {item.destacado && (
          <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Destacado
          </span>
        )}
        {item.nuevo && (
          <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Nuevo
          </span>
        )}
        {item.requiereRefrigeracion && (
          <span className="rounded-full bg-sky-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-200">
            Requiere frío
          </span>
        )}
        {isInMyList && (
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
            En mi lista
          </span>
        )}
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{item.categoria}</p>

      <h2 className="mt-3 font-display text-2xl font-bold text-white">{item.nombre}</h2>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
        <span>{item.origen}</span>
        <span className="font-medium text-amber-300">★ {item.puntaje.toFixed(1)}</span>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Año de la receta</p>
        <p className="mt-1 text-sm font-medium text-slate-200">{item.fechaReceta}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Precio</p>
          <p className="mt-1 text-2xl font-bold text-brand">
            {formatearPrecio(item.precio)}
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto">
          {toggleButton}
          <button
            type="button"
            onClick={() => agregar(item)}
            className="w-full rounded-full border border-brand/30 bg-brand px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brand/80 sm:w-auto"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}

export default DulceCard