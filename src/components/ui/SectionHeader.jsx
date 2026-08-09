export default function SectionHeader({
  index,
  kicker,
  title,
  description,
  align = "start",
  className = "",
  as: Tag = "h2",
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <header className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {(index || kicker) && (
        <p className="kicker">
          {index && <span className="text-accent">{index}</span>}
          {kicker}
        </p>
      )}
      {title && (
        <Tag className="text-h2 text-text max-w-[18ch]">{title}</Tag>
      )}
      {description && (
        <p className="text-lead text-muted measure-narrow">{description}</p>
      )}
    </header>
  )
}
