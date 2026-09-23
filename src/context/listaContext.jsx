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

// El Provider y su hook consumidor forman una única API pública del contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useListaContext() {
  const context = useContext(ListaContext)

  if (context === null) {
    throw new Error('useListaContext debe usarse dentro de ListaProvider')
  }

  return context
}
