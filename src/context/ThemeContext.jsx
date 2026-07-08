import { createContext, useContext, useState, useEffect, useCallback } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
