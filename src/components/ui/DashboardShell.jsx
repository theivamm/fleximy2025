const DEFAULT_NAV = [
  { label: "Inicio", active: true, tone: "primary" },
  { label: "Ventas" },
  { label: "Clientes" },
  { label: "Proyectos" },
  { label: "Equipo" },
  { label: "Ajustes" },
]

export default function DashboardShell({
  nav = DEFAULT_NAV,
  title = "Panel",
  searchPlaceholder = "Buscar…",
  children,
  className = "",
  kpi = "Demo",
}) {
  return (
    <div className={`flex overflow-hidden rounded-xl border border-outline bg-surface-1 shadow-[var(--shadow-md)] ${className}`}>
      {/* Sidebar */}
      <aside className="hidden w-40 shrink-0 flex-col border-r border-outline bg-surface-2/40 p-2 sm:flex">
        <div className="mb-3 flex items-center gap-2 px-2 py-2">
          <span className="grid size-6 place-items-center rounded-md" style={{ backgroundImage: "var(--gradient-primary)" }}>
            <span className="size-2 rounded-full bg-white" />
          </span>
          <span className="text-xs font-bold text-text-1">Fleximy</span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {nav.map((item) => (
            <span
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${
                item.active
                  ? "font-semibold text-text-1"
                  : "text-text-3 transition-colors hover:bg-surface-1 hover:text-text-2"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${item.active ? "" : "bg-text-4"}`}
                style={item.active ? { backgroundColor: `var(--${item.tone || "primary"})` } : undefined}
              />
              {item.label}
            </span>
          ))}
        </nav>
      </aside>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <div className="flex items-center gap-3 border-b border-outline px-3 py-2.5 sm:px-4">
          <span className="text-sm font-semibold text-text-1">{title}</span>
          <span className="ml-auto hidden items-center gap-2 rounded-lg border border-outline bg-surface-1 px-3 py-1.5 text-xs text-text-3 md:flex">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {searchPlaceholder}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-4">
            {kpi}
          </span>
          <span className="grid size-7 place-items-center rounded-full text-[11px] font-bold text-white" style={{ backgroundImage: "var(--gradient-warm)" }}>
            M
          </span>
        </div>
        <div className="p-3 sm:p-4">{children}</div>
      </div>
    </div>
  )
}
