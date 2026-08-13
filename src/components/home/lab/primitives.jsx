import { toneSoft, toneVar } from "./industries"

/** Píldora de estado con acento por tono. */
export function Pill({ children, tone, dot = false, className = "" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-[0.4em] rounded-full px-[0.7em] py-[0.22em] font-mono text-[0.62em] font-medium leading-none ${className}`}
      style={{ backgroundColor: toneSoft(tone), color: toneVar(tone) }}
    >
      {dot && <span className="size-[0.55em] rounded-full" style={{ backgroundColor: toneVar(tone) }} />}
      {children}
    </span>
  )
}

/** Tarjeta de métrica compacta. */
export function Kpi({ label, value, delta, tone, sub }) {
  return (
    <div className="rounded-[0.7em] border border-outline bg-surface-1 px-[0.8em] py-[0.6em]">
      <p className="truncate text-[0.6em] font-medium uppercase tracking-[0.08em] text-text-3">{label}</p>
      <p className="mt-[0.25em] truncate text-[1.25em] font-bold leading-none tracking-tight text-text-1">{value}</p>
      {delta ? (
        <span
          className="mt-[0.35em] inline-flex items-center gap-[0.3em] rounded-full px-[0.5em] py-[0.15em] font-mono text-[0.55em] font-semibold"
          style={{ backgroundColor: toneSoft(delta > 0 ? "acc-gestion" : "error"), color: toneVar(delta > 0 ? "acc-gestion" : "error") }}
        >
          {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}%
        </span>
      ) : (
        sub && <p className="mt-[0.3em] truncate text-[0.58em] text-text-3">{sub}</p>
      )}
    </div>
  )
}

/** Avatar circular con iniciales. */
export function Avatar({ name, tone, size = 1.9 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold text-white"
      style={{
        width: `${size}em`,
        height: `${size}em`,
        backgroundColor: toneVar(tone),
        fontSize: `${0.36 * size}em`,
      }}
    >
      {initials}
    </span>
  )
}

/** Barra de progreso con acento. */
export function Bar({ value, tone, track = "bg-surface-3", h = 0.45, className = "" }) {
  return (
    <div
      className={`min-w-0 flex-1 overflow-hidden rounded-full ${track} ${className}`}
      style={{ height: `${h}em` }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: toneVar(tone) }}
      />
    </div>
  )
}

/** Encabezado de módulo. */
export function SectionHead({ title, extra, icon, tone }) {
  return (
    <div className="flex items-center gap-[0.5em]">
      {icon && (
        <span className="grid size-[1.5em] shrink-0 place-items-center rounded-[0.4em]" style={{ backgroundColor: toneSoft(tone), color: toneVar(tone) }}>
          {icon}
        </span>
      )}
      <h4 className="min-w-0 flex-1 truncate text-[0.72em] font-semibold text-text-1">{title}</h4>
      {extra}
    </div>
  )
}

/** Mini gráfico de barras. */
export function MiniBars({ data, tone, h = 3.4, last }) {
  const max = Math.max(...data)
  return (
    <div className="flex h-full items-end gap-[0.25em]" aria-hidden="true">
      {data.map((v, i) => (
        <span
          key={i}
          className="min-w-0 flex-1 rounded-[0.15em]"
          style={{
            height: `${Math.max((v / max) * 100, 8)}%`,
            backgroundColor: i === last ? toneVar(tone) : toneVar("text-4"),
            opacity: i === last ? 1 : 0.45,
            transition: "height 0.6s var(--motion-ease)",
          }}
        />
      ))}
    </div>
  )
}

/** Fila lista con dot de color. */
export function ListRow({ lead, sub, right, dot }) {
  return (
    <div className="flex min-w-0 items-center gap-[0.6em]">
      {dot && <span className="size-[0.5em] shrink-0 rounded-full" style={{ backgroundColor: toneVar(dot) }} />}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.68em] font-medium text-text-1">{lead}</p>
        {sub && <p className="truncate text-[0.58em] text-text-3">{sub}</p>}
      </div>
      {right}
    </div>
  )
}

/** Botón primario compacto. */
export function Btn({ children, tone, className = "", onClick, innerRef }) {
  return (
    <button
      type="button"
      ref={innerRef}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-[0.4em] rounded-[0.55em] px-[0.9em] py-[0.42em] text-[0.68em] font-semibold text-white transition-transform duration-150 active:scale-[0.97] ${className}`}
      style={{ backgroundColor: toneVar(tone) }}
    >
      {children}
    </button>
  )
}

/** Botón secundario / fantasma. */
export function GhostBtn({ children, className = "", onClick, innerRef }) {
  return (
    <button
      type="button"
      ref={innerRef}
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-[0.4em] rounded-[0.55em] border border-outline-strong bg-surface-1 px-[0.9em] py-[0.42em] text-[0.68em] font-semibold text-text-1 transition-colors hover:bg-surface-2 ${className}`}
    >
      {children}
    </button>
  )
}

/** Icono en botón circular. */
export function IconBtn({ children, label, className = "", tone, onClick, innerRef }) {
  return (
    <button
      type="button"
      aria-label={label}
      ref={innerRef}
      onClick={onClick}
      className={`grid size-[1.9em] shrink-0 place-items-center rounded-[0.5em] text-text-2 transition-colors hover:bg-surface-2 hover:text-text-1 ${className}`}
      style={tone ? { color: toneVar(tone) } : undefined}
    >
      {children}
    </button>
  )
}
