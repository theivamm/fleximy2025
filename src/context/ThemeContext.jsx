import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

const THEME_KEY = "theme"

export function ThemeProvider({ children }) {
  const getInitial = () => {
    if (typeof window === "undefined") return "dark"
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === "dark" || saved === "light") {
      return saved === "dark" ? "dark" : "light"
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", theme)
    root.style.colorScheme = theme === "dark" ? "dark" : "light"
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#090b17" : "#f7f7fc")
    }
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch (_) {
      /* storage not available */
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
