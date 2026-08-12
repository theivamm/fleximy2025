/**
 * Kanban CSS: columnas con tarjetas y estados.
 */
export default function CssKanban({ columns = [] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {columns.map((col) => (
        <div key={col.title} className="rounded-xl border border-outline bg-surface-2/40 p-2">
          <div className="mb-2 flex items-center gap-1.5 px-1">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: `var(--${col.tone || "primary"})` }} />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-text-2">{col.title}</span>
            <span className="ml-auto font-mono text-[10px] text-text-4">{col.cards.length}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {col.cards.map((card, i) => (
              <div
                key={i}
                className="rounded-lg border border-outline bg-surface-1 px-2.5 py-2 text-[11px] leading-snug text-text-2"
              >
                {card}
              </div>
            ))}
            <button
              type="button"
              className="rounded-lg px-2.5 py-1.5 text-left text-[11px] text-text-4 transition-colors hover:bg-surface-1 hover:text-text-2"
            >
              + Añadir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
