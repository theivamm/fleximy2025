import { toneVar } from "./industries"

/**
 * Carcasa móvil del Laboratorio: header de app + contenido apilado en una
 * columna + barra de navegación inferior (bottom nav). Rellena el frame 16:9
 * en modo compacto para que cada dashboard se vea como una app vertical.
 *
 * `tabs` = [{ key, label, Icon, badge }] renderiza el menú inferior.
 * `overlay` = nodo absoluto (p. ej. HotspotLayer) anclado al frame completo.
 */
export default function MobileShell({
  tone,
  icon,
  brand,
  subtitle,
  status,
  tabs,
  tab,
  onTab,
  children,
  overlay,
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-surface-2">
      <div className="flex shrink-0 items-center gap-[0.55em] border-b border-outline bg-surface-1 px-[1em] py-[0.55em]">
        <span className="grid size-[1.7em] shrink-0 place-items-center rounded-[0.55em] text-white" style={{ backgroundColor: toneVar(tone) }}>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[0.78em] font-bold leading-none text-text-1">{brand}</p>
          <p className="mt-[0.18em] truncate font-mono text-[0.5em] uppercase tracking-[0.08em] text-text-3">{subtitle}</p>
        </div>
        {status}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[0.9em] py-[0.75em]">
        {children}
      </div>

      <nav aria-label={`Navegación de ${brand}`} className="flex shrink-0 items-stretch gap-[0.15em] border-t border-outline bg-surface-1/95 px-[0.35em] py-[0.35em]">
        {tabs.map(({ key, label, Icon, badge = 0, ref }) => {
          const active = tab === key
          return (
            <button
              key={key}
              type="button"
              ref={ref}
              onClick={() => onTab(key)}
              aria-current={active ? "page" : undefined}
              className="flex min-w-0 flex-1 flex-col items-center gap-[0.15em] rounded-[0.5em] px-[0.15em] py-[0.25em] transition-colors"
              style={{ color: active ? toneVar(tone) : "var(--color-text-3)" }}
            >
              <span className="relative">
                <Icon size="0.92em" />
                {badge > 0 && (
                  <span
                    className="absolute -right-[0.55em] -top-[0.35em] grid min-w-[1em] place-items-center rounded-full px-[0.22em] py-[0.05em] font-mono text-[0.52em] font-bold leading-none text-white"
                    style={{ backgroundColor: toneVar(tone) }}
                  >
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </span>
              <span className="max-w-full truncate text-[0.48em] font-semibold">{label}</span>
            </button>
          )
        })}
      </nav>

      {overlay}
    </div>
  )
}
