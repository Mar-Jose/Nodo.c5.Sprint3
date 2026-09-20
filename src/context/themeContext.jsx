import { createContext, useCallback, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('modoOscuro', true)

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((actual) => !actual)
  }, [setIsDarkMode])

  return (
    <ThemeContext.Provider value={{ toggleDarkMode }}>
      <div className={isDarkMode ? 'min-h-screen bg-black text-white' : 'min-h-screen bg-page text-heading'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// El Provider y su hook consumidor forman una única API pública del contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useThemeContext debe usarse dentro de ThemeProvider')
  }

  return context
}