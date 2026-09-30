import DulceCard from './DulceCard'

function DulceList({ items = [] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-token-white/10 bg-surface/70 p-10 text-center text-token-slate-300">
        <p className="text-lg font-semibold text-token-white">No encontramos dulces que coincidan con tu búsqueda.</p>
        <p className="mt-2 text-sm text-token-slate-400">Probá con otro nombre, origen o categoría.</p>
      </div>
    )
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <DulceCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  )
}

export default DulceList