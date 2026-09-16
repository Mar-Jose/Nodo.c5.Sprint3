import { useMemo, useState } from 'react'

function Navbar({ lista = [], items = [], onToggleItem, onVaciarLista }) {
  const [abierto, setAbierto] = useState(false)

  const hayItems = lista.length > 0
  const itemsSeleccionados = useMemo(
    () => items.filter((item) => lista.includes(item.id)),
    [items, lista]
  )

  return (
    <>
      <nav className="border-b border-white/10 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8 shrink-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] sm:h-10 sm:w-10"
              aria-label="Logo de alfajor blanco"
              role="img"
            >
              <path
                d="M12 22C12 15.4 17.4 10 24 10H40C46.6 10 52 15.4 52 22V25C52 27.8 49.8 30 47 30H17C14.2 30 12 27.8 12 25V22Z"
                fill="#F8F7F4"
                stroke="#E7E1D7"
                strokeWidth="1.5"
              />
              <rect x="12" y="29" width="40" height="8" rx="4" fill="#F1E6D2" />
              <path
                d="M12 38C12 43.1 17.1 49 32 49C46.9 49 52 43.1 52 38V35H12V38Z"
                fill="#F8F7F4"
                stroke="#7e5715d7"
                strokeWidth="1.5"
              />
            </svg>

            <div className="truncate text-sm font-semibold text-white sm:text-lg">Dulces Catamarca</div>
          </div>

          <button
            type="button"
            onClick={() => setAbierto((actual) => !actual)}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1.5 text-xs font-medium text-brand transition hover:bg-brand hover:text-white sm:gap-2 sm:px-3 sm:text-sm"
          >
            <span>Mi lista</span>
            {hayItems && (
              <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-xs">{lista.length}</span>
            )}
          </button>
        </div>
      </nav>

      {abierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl shadow-brand/10">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Mi lista</p>
                <h2 className="mt-1 text-2xl font-bold text-white">Dulces guardados</h2>
              </div>

              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-brand/40 hover:text-white"
              >
                Cerrar
              </button>
            </div>

            {itemsSeleccionados.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-surface/70 p-8 text-center text-slate-300">
                <p className="text-lg font-semibold text-white">Todavía no agregaste dulces.</p>
                <p className="mt-2 text-sm text-slate-400">Guardá tus favoritos desde la grilla principal.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={onVaciarLista}
                    className="rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-200 transition hover:bg-rose-500/20"
                  >
                    Vaciar mi lista
                  </button>
                </div>

                <ul className="space-y-3">
                  {itemsSeleccionados.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                    >
                      <div>
                        <p className="font-medium text-white">{item.nombre}</p>
                        <p className="text-sm text-slate-400">{item.origen}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleItem(item.id)}
                        className="rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-200 transition hover:bg-rose-500/20"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar