import DulceCard from './DulceCard'

function DulceList({ items = [], miLista = [], toggleMiLista }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-surface/70 p-10 text-center text-slate-300">
        <p className="text-lg font-semibold text-white">No encontramos dulces que coincidan con tu búsqueda.</p>
        <p className="mt-2 text-sm text-slate-400">Probá con otro nombre, origen o categoría.</p>
      </div>
    )
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          estaEnMiLista={miLista.includes(item.id)}
          toggleMiLista={toggleMiLista}
        />
      ))}
    </section>
  )
}

export default DulceList