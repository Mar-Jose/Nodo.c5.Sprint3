import { formatearPrecio } from '../utils/formato'

function CarritoItem({ item, onCambiarCantidad, onQuitar }) {
  const disminuirCantidad = () => {
    onCambiarCantidad(item.id, item.cantidad - 1)
  }

  const aumentarCantidad = () => {
    onCambiarCantidad(item.id, item.cantidad + 1)
  }

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-white">{item.nombre}</p>
        <p className="text-sm text-slate-400">
          {item.cantidad} x {formatearPrecio(item.precio)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={disminuirCantidad}
          aria-label={`Disminuir cantidad de ${item.nombre}`}
          className="h-8 w-8 rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10"
        >
          -
        </button>
        <span className="min-w-6 text-center text-white">{item.cantidad}</span>
        <button
          type="button"
          onClick={aumentarCantidad}
          disabled={item.stock != null && item.cantidad >= item.stock}
          aria-label={`Aumentar cantidad de ${item.nombre}`}
          className="h-8 w-8 rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => onQuitar(item.id)}
          className="ml-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200 transition hover:bg-rose-500/20"
        >
          Quitar
        </button>
      </div>
    </li>
  )
}

export default CarritoItem