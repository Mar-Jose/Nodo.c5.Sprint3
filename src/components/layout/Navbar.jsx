import { useMemo, useState } from 'react'
import CarritoModal from '../CarritoModal'
import Modal from '../ui/Modal'
import { useListaContext } from '../../context/listaContext'
import { useThemeContext } from '../../context/themeContext'

function Navbar({ items = [], onIrAlCheckout }) {
  const [abierto, setAbierto] = useState(false)
  const { lista, toggleItem, vaciarLista } = useListaContext()
  const { isDarkMode } = useThemeContext()

  const hayItems = lista.length > 0
  const itemsSeleccionados = useMemo(
    () => items.filter((item) => lista.includes(item.id)),
    [items, lista]
  )

  return (
    <>
      <header>
        <nav className={`border-b border-token-white/10 ${isDarkMode ? 'bg-token-black' : 'bg-surface/80'} backdrop-blur-sm`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <svg
                viewBox="0 0 64 64"
                className="h-8 w-8 shrink-0 drop-shadow-[0_0_10px_var(--color-logo-glow)] sm:h-10 sm:w-10"
                aria-label="Logo de alfajor blanco"
                role="img"
              >
                <path
                  d="M12 22C12 15.4 17.4 10 24 10H40C46.6 10 52 15.4 52 22V25C52 27.8 49.8 30 47 30H17C14.2 30 12 27.8 12 25V22Z"
                  className="fill-logo-cream stroke-logo-crust"
                  strokeWidth="1.5"
                />
                <rect x="12" y="29" width="40" height="8" rx="4" className="fill-logo-filling" />
                <path
                  d="M12 38C12 43.1 17.1 49 32 49C46.9 49 52 43.1 52 38V35H12V38Z"
                  className="fill-logo-cream stroke-logo-edge"
                  strokeWidth="1.5"
                />
              </svg>

              <div className="truncate text-sm font-semibold text-token-white sm:text-lg">Dulces Catamarca</div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <CarritoModal onIrAlCheckout={onIrAlCheckout} />
              <button
                type="button"
                onClick={() => setAbierto((actual) => !actual)}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1.5 text-xs font-medium text-brand transition hover:bg-brand hover:text-token-white sm:gap-2 sm:px-3 sm:text-sm"
              >
                <span>Mi lista</span>
                {hayItems && (
                  <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] text-token-white sm:px-2 sm:text-xs">{lista.length}</span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <Modal
        isOpen={abierto}
        onClose={() => setAbierto(false)}
        ariaLabel="Mi lista de dulces guardados"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-token-pink-300 bg-token-pink-100 p-5 text-token-pink-950 shadow-2xl sm:p-6"
      >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-token-pink-700">Mi lista</p>
                <h2 className="mt-1 text-2xl font-bold text-token-pink-950">Dulces guardados</h2>
              </div>

              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar"
                className="rounded-full border border-token-pink-300 bg-token-pink-200 px-3 py-2 text-sm font-medium text-token-pink-950 transition hover:border-token-pink-500 hover:bg-token-pink-300"
              >
                Cerrar
              </button>
            </div>

            {itemsSeleccionados.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-token-pink-300 bg-token-pink-50 p-8 text-center text-token-pink-800">
                <p className="text-lg font-semibold text-token-pink-950">Todavía no agregaste dulces.</p>
                <p className="mt-2 text-sm text-token-pink-800">Guardá tus favoritos desde la grilla principal.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-end">
                  <button
                    type="button"
                    onClick={vaciarLista}
                    className="rounded-full border border-token-rose-300 bg-token-rose-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-token-rose-900 transition hover:bg-token-rose-200"
                  >
                    Vaciar mi lista
                  </button>
                </div>

                <ul className="space-y-3">
                  {itemsSeleccionados.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-token-pink-200 bg-token-pink-50 px-3 py-3"
                    >
                      <div>
                        <p className="font-medium text-token-pink-950">{item.nombre}</p>
                        <p className="text-sm text-token-pink-800">{item.origen}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className="rounded-full border border-token-rose-300 bg-token-rose-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-token-rose-900 transition hover:bg-token-rose-200"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
      </Modal>
    </>
  )
}

export default Navbar