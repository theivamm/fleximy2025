/**
 * Calendario CSS: mes con días y eventos puntuales.
 */
export default function CssCalendar({ month = "Mayo", year = 2026, events = [] }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  return (
    <div className="rounded-xl border border-outline bg-surface-1 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-1">
          {month} <span className="text-text-3">{year}</span>
        </span>
        <span className="flex gap-1 text-text-3">
          <span className="grid size-6 place-items-center rounded-md hover:bg-surface-2">‹</span>
          <span className="grid size-6 place-items-center rounded-md hover:bg-surface-2">›</span>
        </span>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase text-text-4">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const ev = events.find((e) => e.day === d)
          const today = d === 12
          return (
            <span
              key={d}
              className={`relative grid aspect-square place-items-center rounded-md text-xs ${
                today ? "bg-primary font-semibold text-primary-on" : "text-text-2 hover:bg-surface-2"
              }`}
            >
              {d}
              {ev && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full"
                  style={{ backgroundColor: `var(--${ev.tone || "secondary"})` }}
                />
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}
