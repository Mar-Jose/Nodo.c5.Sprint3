function Confirmacion({ nombre, onVolverTienda }) {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Pedido confirmado</p>
      <h1 className="mt-3 text-3xl font-bold text-white">¡Gracias por tu compra!</h1>
      <p className="mt-3 text-slate-300">
        {nombre}, recibimos tu pedido. Pronto nos pondremos en contacto para coordinar la entrega.
      </p>
      <button
        type="button"
        onClick={onVolverTienda}
        className="mt-6 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand/80"
      >
        Volver a la tienda
      </button>
    </section>
  )
}

export default Confirmacion