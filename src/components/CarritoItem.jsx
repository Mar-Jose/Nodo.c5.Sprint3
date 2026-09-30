import { formatearPrecio } from '../utils/formato'

function CarritoItem({ item, onCambiarCantidad, onQuitar }) {
  const disminuirCantidad = () => {
    onCambiarCantidad(item.id, item.cantidad - 1)
  }

  const aumentarCantidad = () => {
    onCambiarCantidad(item.id, item.cantidad + 1)
  }

  return (
    <li className="flex flex-col gap-3 rounded-xl border border-token-white/10 bg-token-white/5 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="truncate font-medium text-token-white">{item.nombre}</p>
        <p className="text-sm text-token-slate-400">
          {item.cantidad} x {formatearPrecio(item.precio)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={disminuirCantidad}
          aria-label={`Disminuir cantidad de ${item.nombre}`}
          className="h-8 w-8 rounded-full border border-token-red-400/40 bg-token-rose-500/10 text-lg text-token-rose-200 transition hover:bg-token-rose-500/20"
        >
          -
        </button>
        <span className="min-w-6 text-center text-token-white">{item.cantidad}</span>
        <button
          type="button"
          onClick={aumentarCantidad}
          disabled={item.stock != null && item.cantidad >= item.stock}
          aria-label={`Aumentar cantidad de ${item.nombre}`}
          className="h-8 w-8 rounded-full border border-token-emerald-400/40 bg-token-emerald-500/10 text-lg text-token-emerald-200 transition hover:bg-token-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onQuitar(item.id)}
          className="rounded-full border border-token-rose-400/40 bg-token-rose-500/10 px-3 py-2 text-xs text-token-rose-200 transition hover:bg-token-rose-500/20 sm:ml-2"
        >
          Quitar
        </button>
      </div>
    </li>
  )
}

export default CarritoItem