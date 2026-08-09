import { Link } from "react-router-dom"

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
}

const variantClasses = {
  primary:
    "bg-accent text-ink hover:bg-[color-mix(in_srgb,var(--color-accent)_85%,white)] border border-transparent",
  secondary:
    "border border-line bg-paper-bright text-text hover:border-ink/30 hover:bg-paper-bright/70",
  dark: "bg-ink text-text-invert border border-line-dark hover:bg-ink-soft",
  text: "border border-transparent text-text hover:text-ink/70 underline-offset-4 hover:underline",
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
