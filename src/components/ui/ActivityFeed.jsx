export default function ActivityFeed({ items = [] }) {
  return (
    <ul className="flex flex-col gap-0">
      {items.map((item, i) => (
        <li key={i} className="relative flex gap-3 px-1 py-2">
          {i < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-[13px] top-8 h-[calc(100%-1.5rem)] w-px bg-outline" />
          )}
          <span
            aria-hidden="true"
            className="mt-1.5 flex size-[26px] shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `var(--${item.tone || "primary"}-soft)`, color: `var(--${item.tone || "primary"})` }}
          >
            {item.icon || <DotIcon />}
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-text-1">{item.title}</p>
            {item.meta && <p className="truncate text-xs text-text-3">{item.meta}</p>}
          </div>
          <span className="ml-auto shrink-0 font-mono text-[11px] text-text-4">{item.time}</span>
        </li>
      ))}
    </ul>
  )
}

function DotIcon() {
  return (
    <span className="block size-2 rounded-full bg-current" />
  )
}
