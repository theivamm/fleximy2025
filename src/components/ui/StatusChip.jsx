const TONES = {
  success: { color: "var(--success)", soft: "var(--success-soft)", text: "var(--success)" },
  warning: { color: "var(--warning)", soft: "var(--warning-soft)", text: "var(--warning)" },
  error: { color: "var(--error)", soft: "var(--error-soft)", text: "var(--error)" },
  info: { color: "var(--blue)", soft: "var(--blue-soft)", text: "var(--blue)" },
  primary: { color: "var(--primary)", soft: "var(--primary-soft)", text: "var(--primary)" },
  secondary: { color: "var(--secondary)", soft: "var(--secondary-soft)", text: "var(--secondary)" },
  accent: { color: "var(--accent)", soft: "var(--accent-soft)", text: "var(--accent)" },
  neutral: { color: "var(--text-muted)", soft: "rgba(125,135,163,0.14)", text: "var(--text-secondary)" },
}

export default function StatusChip({ label, tone = "neutral", dot = true, className = "" }) {
  const t = TONES[tone] || TONES.neutral
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-medium ${className}`}
      style={{ backgroundColor: t.soft, color: t.text }}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ backgroundColor: t.color }} />
          <span className="relative inline-flex size-1.5 rounded-full" style={{ backgroundColor: t.color }} />
        </span>
      )}
      {label}
    </span>
  )
}
