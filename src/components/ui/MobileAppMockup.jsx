export default function MobileAppMockup({ children, className = "" }) {
  return (
    <div
      className={`relative w-[300px] max-w-full overflow-hidden rounded-[2.4rem] border-[6px] border-surface-highlight bg-surface-1 shadow-[var(--shadow-lg)] ${className}`}
    >
      <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-surface-highlight" aria-hidden="true" />
      <div className="h-full pt-6">{children}</div>
    </div>
  )
}
