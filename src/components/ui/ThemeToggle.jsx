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
      className={`group relative inline-flex h-11 items-center gap-2 rounded-[var(--radius-btn)] border border-outline bg-surface-1/70 px-2.5 pr-3 text-text-2 transition-colors duration-300 hover:border-outline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <span className="relative flex h-7 w-12 shrink-0 items-center overflow-hidden rounded-full border border-outline bg-surface-2 transition-colors duration-300">
        <span
          aria-hidden="true"
          className={`absolute left-[2px] top-[2px] grid size-6 place-items-center rounded-full bg-white shadow-[var(--shadow-sm)] transition-transform duration-300 ${
            isDark ? "translate-x-0" : "translate-x-[20px]"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={`col-start-1 row-start-1 text-[#ffb45e] transition-opacity duration-300 ${
              isDark ? "opacity-0" : "opacity-100"
            }`}
          >
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={`col-start-1 row-start-1 text-[#9aa7ff] transition-opacity duration-300 ${
              isDark ? "opacity-100" : "opacity-0"
            }`}
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      <span className="hidden text-xs font-medium sm:inline">{isDark ? "Oscuro" : "Claro"}</span>
    </button>
  )
}
