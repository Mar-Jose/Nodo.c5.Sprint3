import HistorialPedidos from '../HistorialPedidos'

function Confirmacion({ nombre, pedidos = [], onVolverTienda }) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="rounded-2xl border border-token-emerald-400/30 bg-token-emerald-500/10 p-5 text-center sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-token-emerald-200">Pedido confirmado</p>
        <h1 className="mt-3 break-words text-2xl font-bold text-token-white sm:text-3xl">Gracias {nombre}</h1>
        <p className="mt-3 text-token-slate-300">
          Recibimos tu pedido. Pronto nos pondremos en contacto para coordinar la entrega.
        </p>
        <p className="mt-3 text-token-emerald-200">Tu carrito está vacío.</p>
        <button
          type="button"
          onClick={onVolverTienda}
          className="mt-6 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-token-white transition hover:bg-brand/80"
        >
          Volver a la tienda
        </button>
      </section>

      <section aria-labelledby="historial-pedidos-heading">
        <h2 id="historial-pedidos-heading" className="mb-4 text-2xl font-bold text-token-white">
          Historial de pedidos
        </h2>
        <HistorialPedidos pedidos={pedidos} />
      </section>
    </div>
  )
}

export default Confirmacion