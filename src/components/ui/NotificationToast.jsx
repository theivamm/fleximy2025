export default function NotificationToast({ title = "Nuevo turno confirmado", meta = "Hace un instante", tone = "success", className = "" }) {
  return (
    <div
      role="status"
      className={`flex items-center gap-3 rounded-xl border border-outline bg-surface-elevated/95 px-4 py-3 shadow-[var(--shadow-md)] backdrop-blur ${className}`}
    >
      <span
        className="relative flex size-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `var(--${tone}-soft)`, color: `var(--${tone})` }}
      >
        <span className="animate-pulse" style={{ animationDuration: "2s" }}>
          <CheckIcon />
        </span>
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold text-text-1">{title}</p>
        <p className="text-[11px] text-text-3">{meta}</p>
      </div>
      <button
        type="button"
        aria-label="Cerrar notificación"
        className="ml-auto grid size-6 shrink-0 place-items-center rounded-md text-text-4 transition-colors hover:bg-surface-2 hover:text-text-1"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
