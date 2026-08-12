import { Link } from "react-router-dom"

export default function PrimaryCTA({ to = "/contacto", children, className = "", large = false }) {
  return (
    <Link
      to={to}
      data-track="cta_contanos_idea"
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-[var(--radius-btn)] font-semibold text-white shadow-[var(--shadow-md)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
        large ? "h-14 px-8 text-base" : "h-11 px-6 text-sm"
      } ${className}`}
      style={{ backgroundImage: "var(--gradient-primary)" }}
    >
      <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0" />
      <span className="relative">{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="relative transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}
