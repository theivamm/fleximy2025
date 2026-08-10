import { Check } from "lucide-react"

export function Chrome({ url, dark = false, right }) {
  return (
    <div
      className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${
        dark ? "border-line-dark" : "border-line"
      }`}
    >
      <span className="size-2.5 rounded-full bg-[#e8a33d]" />
      <span className="size-2.5 rounded-full bg-accent" />
      <span className="size-2.5 rounded-full bg-cyan" />
      <span
        className={`ml-2 flex-1 truncate rounded-md px-2 py-1 font-mono text-micro ${
          dark ? "bg-ink-soft text-text-invert/60" : "bg-paper text-muted"
        }`}
      >
        {url}
      </span>
      {right}
    </div>
  )
}

const TONES = {
  nueva: "bg-accent text-on-accent",
  activo: "bg-cyan/15 text-cyan",
  listo: "bg-ink-muted text-text-invert",
  gris: "bg-dark-surface/10 text-muted",
  vivo: "bg-accent text-on-accent",
  espera: "bg-ink-muted text-text-invert",
}

export function Status({ tone = "gris", children, dark = false }) {
  const cls = dark
    ? tone === "activo"
      ? "bg-cyan/15 text-cyan"
      : tone === "nueva"
        ? "bg-accent text-on-accent"
        : "bg-ink-muted text-text-invert"
    : TONES[tone] || TONES.gris
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 font-mono text-micro ${cls}`}>
      {children}
    </span>
  )
}

export function CheckDot({ accent = "var(--color-accent)" }) {
  return (
    <span
      className="grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold"
      style={{ backgroundColor: accent, color: "var(--color-ink)" }}
    >
      <Check className="size-3" strokeWidth={3} />
    </span>
  )
}

export function Bullet({ accent = "var(--color-accent)" }) {
  return (
    <span className="mt-2 size-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
  )
}

export function Avatar({ label, accent = "var(--color-ink)" }) {
  return (
    <span
      className="grid size-7 shrink-0 place-items-center rounded-full font-mono text-micro font-semibold text-text-invert"
      style={{ backgroundColor: accent }}
    >
      {label}
    </span>
  )
}

export function PanelTitle({ children, meta }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold">{children}</p>
      {meta && <span className="font-mono text-micro text-muted">{meta}</span>}
    </div>
  )
}
