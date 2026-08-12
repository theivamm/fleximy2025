/**
 * Gráfico de barras hecho en CSS puro con datos de ejemplo.
 * `demo` identifica los datos como ilustrativos.
 */
export default function CssChart({
  data = [],
  height = 140,
  label = "",
  demo = true,
  className = "",
}) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        {label && <span className="text-xs font-medium text-text-2">{label}</span>}
        {demo && <span className="font-mono text-[10px] uppercase tracking-wider text-text-4">Demo</span>}
      </div>
      <div className="flex items-end gap-1.5" style={{ height }} role="img" aria-label={label || "Gráfico de barras ilustrativo"}>
        {data.map((d, i) => (
          <div key={i} className="group relative flex h-full flex-1 items-end" title={d.label}>
            <div
              className="w-full origin-bottom rounded-md transition-all duration-500"
              style={{
                height: `${Math.max((d.value / max) * 100, 6)}%`,
                background: d.color || "var(--gradient-primary)",
                animation: reduced ? undefined : "grow-bar 0.7s var(--motion-ease)",
                animationDelay: `${i * 60}ms`,
                opacity: 0.85 + 0.15 * (d.value / max),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const reduced =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
