export default function BrowserWindow({ url = "fleximy.app", children, className = "", tone = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-outline bg-surface-1 shadow-[var(--shadow-md)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-outline bg-surface-2/60 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff747f]" />
          <span className="size-2.5 rounded-full bg-[#ffb45e]" />
          <span className="size-2.5 rounded-full bg-[#42d392]" />
        </span>
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-surface-1 px-3 py-1.5 text-xs text-text-3">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12h6m-5-7 4 7-4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="truncate font-mono text-[11px]">{url}</span>
        </span>
        <span className="flex gap-1.5 opacity-40">
          <span className="size-2.5 rounded-sm bg-text-3" />
          <span className="size-2.5 rounded-sm bg-text-3" />
          <span className="size-2.5 rounded-sm bg-text-3" />
        </span>
        {tone && (
          <span
            className="hidden size-2 rounded-full sm:block"
            style={{ backgroundColor: `var(--${tone})` }}
          />
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
