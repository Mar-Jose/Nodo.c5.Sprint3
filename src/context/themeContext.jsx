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
        <button
          type="button"
          onClick={toggleDarkMode}
          className="fixed bottom-4 right-4 z-50 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 shadow-lg backdrop-blur transition hover:bg-white/20"
        >
          Cambiar fondo-color
        </button>
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