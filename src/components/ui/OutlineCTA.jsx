import { Link } from "react-router-dom"

export default function OutlineCTA({
  to,
  href,
  children,
  className = "",
  large = false,
}) {
  const base = `inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-outline-strong bg-surface-1/60 font-semibold text-text-1 backdrop-blur transition-colors duration-200 hover:bg-surface-2/70 active:translate-y-0 ${
    large ? "h-14 px-7 text-sm" : "h-11 px-6 text-sm"
  } ${className}`

  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    )
  }
  return <button className={base}>{children}</button>
}
