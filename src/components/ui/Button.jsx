import { Link } from "react-router-dom"

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
}

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:bg-primary-deep border border-transparent",
  secondary:
    "border border-outline bg-surface text-ink-primary hover:border-outline-strong hover:bg-bg-secondary",
  ghost:
    "border border-transparent text-ink-primary hover:bg-bg-secondary active:bg-surface-soft",
  dark: "bg-night text-on-night border border-outline-night hover:bg-night-elevated",
  text: "border border-transparent text-ink-primary hover:text-ink-secondary underline-offset-4 hover:underline",
}

export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-btn)] transition-colors duration-[var(--motion-fast)] active:scale-[0.98] select-none min-h-11 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
