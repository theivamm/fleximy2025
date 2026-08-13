export default function SectionIntro({
  kicker,
  title,
  lead,
  action,
  align = "center",
  className = "",
}) {
  const alignCls = align === "left" ? "text-left items-start" : "text-center items-center"
  return (
    <div className={`container-wide flex flex-col gap-5 ${alignCls} ${className}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      {title && <h2 className="h2-title font-display text-text-1">{title}</h2>}
      {lead && <p className={`lead-text max-w-2xl text-text-secondary ${align === "left" ? "" : "mx-auto"}`}>{lead}</p>}
      {action}
    </div>
  )
}
