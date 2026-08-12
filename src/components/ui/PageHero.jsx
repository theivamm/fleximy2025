export default function PageHero({
  kicker,
  title,
  lead,
  meta,
  actions,
  center = false,
  children,
  className = "",
}) {
  return (
    <section className={`relative overflow-hidden pb-14 pt-32 lg:pb-16 lg:pt-40 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:linear-gradient(180deg,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(56% 46% at 14% 8%, var(--primary-soft), transparent 60%), radial-gradient(40% 38% at 88% 12%, var(--cyan-soft), transparent 60%), radial-gradient(48% 42% at 60% 100%, var(--accent-soft), transparent 60%)",
        }}
      />
      <div
        className={`container-site relative flex flex-col gap-6 ${
          center ? "items-center text-center" : "items-start"
        }`}
      >
        {kicker && <span className="kicker">{kicker}</span>}
        {title && (
          <h1 className="font-display text-h1 max-w-[22ch] text-text-1">{title}</h1>
        )}
        {lead && (
          <p className={`lead-text max-w-2xl text-text-2 ${center ? "mx-auto" : ""}`}>
            {lead}
          </p>
        )}
        {actions && (
          <div
            className={`mt-2 flex flex-wrap items-center gap-3 ${
              center ? "justify-center" : ""
            }`}
          >
            {actions}
          </div>
        )}
        {meta && <p className="font-mono text-micro text-text-3">{meta}</p>}
        {children}
      </div>
    </section>
  )
}
