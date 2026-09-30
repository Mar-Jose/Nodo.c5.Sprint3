import { formatearPrecio } from '../utils/formato'

function HistorialPedidos({ pedidos = [] }) {
  if (pedidos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-token-pink-300 bg-token-pink-50 p-6 text-center text-token-pink-800">
        <p className="font-semibold text-token-pink-950">Todavía no hay pedidos.</p>
        <p className="mt-2 text-sm">Cuando confirmes una compra, aparecerá acá.</p>
      </div>
    )
  }

  return (
    <ol className="space-y-4">
      {pedidos.map((pedido) => (
        <li
          key={pedido.id}
          className="rounded-2xl border border-token-pink-200 bg-token-pink-50 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-token-pink-950">{pedido.nombreCompleto}</h3>
              <p className="text-sm text-token-pink-800">{pedido.email}</p>
            </div>
            <time className="text-sm text-token-pink-800" dateTime={pedido.fecha}>
              {new Intl.DateTimeFormat('es-AR', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date(pedido.fecha))}
            </time>
          </div>

          <ul className="mt-3 space-y-2 border-t border-token-pink-200 pt-3 text-sm">
            {pedido.items.map((item) => (
              <li key={item.id} className="flex flex-wrap justify-between gap-2">
                <span className="min-w-0 break-words text-token-pink-950">
                  {item.nombre} × {item.cantidad}
                </span>
                <span className="shrink-0 text-token-pink-800">
                  {formatearPrecio(item.precio * item.cantidad)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-token-pink-200 pt-3 text-sm">
            <span className="text-token-pink-800">
              {pedido.metodoEnvio === 'domicilio' ? 'Envío a domicilio' : 'Retiro en el local'}
            </span>
            <span className="font-bold text-token-pink-950">
              Total {formatearPrecio(pedido.total)}
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default HistorialPedidos
