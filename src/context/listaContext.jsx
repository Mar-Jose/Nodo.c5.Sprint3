import { createContext, useContext, useState } from 'react'

const ListaContext = createContext(null)

export function ListaProvider({ children }) {
  const [lista, setLista] = useState([])

  const toggleItem = (id) => {
    setLista((actual) => (
      actual.includes(id)
        ? actual.filter((itemId) => itemId !== id)
        : [...actual, id]
    ))
  }

  const vaciarLista = () => {
    setLista([])
  }

  return (
    <ListaContext.Provider value={{ lista, toggleItem, vaciarLista }}>
      {children}
    </ListaContext.Provider>
  )
}

export function useListaContext() {
  const context = useContext(ListaContext)

  if (context === null) {
    throw new Error('useListaContext debe usarse dentro de ListaProvider')
  }

  return context
}
