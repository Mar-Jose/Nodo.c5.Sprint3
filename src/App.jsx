import { useState } from 'react'
import dulcesCatamarca from './data/Dulce'
//import Footer from './components/Footer'

import DulceList from './components/DulceList'
//import ListCategoriasPanel from './components/ListCategoriasPanel'
import Navbar from './components/layout/Navbar'
//import BisTitle from './components/BisTitle'
//repasar:
//import useDocumentTitle from './hooks/useDocumentTitle'
//import useFilteredItems from './hooks/useFilteredItems'
//import useMyList from './hooks/useMyList'

function App(){
  const [count, setCount] = useState(0)

  function App() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [isCeleste, setIsCeleste] = useState(false)
  const { list: miLista, total, toggle: toggleMiLista, clear: clearMiLista } = useMyList()

  useDocumentTitle(total)

  const vaciarMiLista = () => {
    const confirmado = window.confirm('¿Seguro que querés vaciar tu lista?')

    if (!confirmado) return

    clearMiLista()
  }

  const itemsFiltrados = useFilteredItems(
    dulcesCatamarca,
    categoriaSeleccionada,
    busqueda
  )

  return (
    <>
      <Navbar lista={miLista} items={dulcesCatamarca} onToggleItem={toggleMiLista} onVaciarLista={vaciarMiLista} />

      <main
        className={[
          'min-h-screen font-sans transition-colors',
          isCeleste ? 'bg-sky-200 text-slate-900' : 'bg-black text-white'
        ].join(' ')}
      >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <BisTitle />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ListCategoriasPanel
            items={dulcesCatamarca}
            categoriaSeleccionada={categoriaSeleccionada}
            onSelectCategoria={setCategoriaSeleccionada}
          />

          <div className="flex items-center gap-3">
            <SearchBar value={busqueda} onChange={setBusqueda} />
          </div>
        </div>

        <DulceList items={itemsFiltrados} miLista={miLista} toggleMiLista={toggleMiLista} />
      </div>
    </main>
    <Footer isCeleste={isCeleste} onToggleTheme={() => setIsCeleste((current) => !current)} />
    </>
  )
  }
}
    

export default App
