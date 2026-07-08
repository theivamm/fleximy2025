import { createContext, useContext, useState } from "react"

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState("es")

  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"))

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
