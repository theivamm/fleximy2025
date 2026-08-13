const TRANSFORMATIONS = [
  {
    from: "Excel", fromTone: "success", fromIcon: "▦",
    to: "Dashboard en vivo", toTone: "primary", toIcon: "▤",
    desc: "Datos que se ven, filtran y actualizan solos.",
  },
  {
    from: "WhatsApp", fromTone: "secondary", fromIcon: "●",
    to: "Seguimiento de clientes", toTone: "blue", toIcon: "◉",
    desc: "Cada conversación con estado, historial y recordatorios.",
  },
  {
    from: "Agenda manual", fromTone: "warning", fromIcon: "☰",
    to: "Reservas online", toTone: "accent", toIcon: "◫",
    desc: "El cliente reserva solo y el negocio recibe el turno.",
  },
  {
    from: "Formularios", fromTone: "text-muted", fromIcon: "▣",
    to: "Portal de clientes", toTone: "primary", toIcon: "◨",
    desc: "Consultas, documentos y seguimiento en un solo lugar.",
  },
  {
    from: "Notas sueltas", fromTone: "accent", fromIcon: "▯",
    to: "Gestión de tareas", toTone: "warning", toIcon: "▤",
    desc: "Tareas con responsable, plazo y prioridad.",
  },
  {
    from: "Catálogo PDF", fromTone: "blue", fromIcon: "▭",
    to: "Ecommerce", toTone: "secondary", toIcon: "◱",
    desc: "Productos, stock, carrito y pagos conectados.",
  },
  {
    from: "Reportes manuales", fromTone: "text-muted", fromIcon: "▥",
    to: "Panel de métricas", toTone: "accent", toIcon: "◰",
    desc: "Los números que importan, siempre al día.",
  },
]

/**
 * CSS: cada fila transforma un origen en una interfaz objetivo.
 */
export default function TransformationDemo() {
  return (
    <ul className="container-wide flex flex-col divide-y divide-outline">
      {TRANSFORMATIONS.map((t) => (
        <li
          key={t.from}
          className="group grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-5 transition-colors duration-300 hover:bg-surface-1/40 sm:grid-cols-[1fr_auto_1fr_auto] sm:gap-6"
        >
          <span className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-xl text-base"
              style={{ backgroundColor: `var(--${t.fromTone}-soft)`, color: `var(--${t.fromTone})` }}
            >
              {t.fromIcon}
            </span>
            <span className="text-sm font-semibold text-text-2 group-hover:text-text-1">{t.from}</span>
          </span>

          <span
            aria-hidden="true"
            className="relative mx-1 flex w-16 items-center sm:w-24"
          >
            <span className="h-px w-full" style={{ backgroundImage: "var(--gradient-primary)" }} />
            <span className="absolute right-0 grid size-6 -translate-y-1/2 place-items-center rounded-full text-white shadow-[var(--shadow-sm)] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-50%]" style={{ backgroundImage: "var(--gradient-primary)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>

          <span className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-xl text-base text-white"
              style={{ backgroundColor: `var(--${t.toTone})` }}
            >
              {t.toIcon}
            </span>
            <span className="text-sm font-semibold text-text-1">{t.to}</span>
          </span>

          <span className="col-span-3 pl-[3.25rem] text-[13px] text-text-3 sm:col-span-1 sm:pl-0 sm:text-right">
            {t.desc}
          </span>
        </li>
      ))}
    </ul>
  )
}
