import { useTheme } from "../../context/ThemeContext"

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Modo oscuro activo. Cambiar a modo claro." : "Modo claro activo. Cambiar a modo oscuro."}
      onClick={toggleTheme}
      className={`group relative inline-flex h-10 items-center gap-2 rounded-full border border-outline bg-surface-1/70 px-3 text-text-2 transition-colors duration-300 hover:border-outline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <span className="relative flex w-9 items-center">
        <span
          aria-hidden="true"
          className={`absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full shadow-[var(--shadow-sm)] transition-transform duration-300 ${
            isDark ? "translate-x-0" : "translate-x-3"
          }`}
          style={{ backgroundImage: isDark ? "linear-gradient(135deg,#2a3157,#1d2340)" : "var(--gradient-warm)" }}
        />
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative left-1 text-text-2">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="relative left-4 text-text-2">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="hidden text-xs font-medium sm:inline">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  )
}
