export default function StoryNavigation({ items, activeIdx, progress, c, onNavigate }) {
  return (
    <div
      className="sticky top-0 z-20 flex items-center gap-1 py-3 mb-6"
      style={{
        background: `${c.bg}dd`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      {items.map((item, i) => {
        const isActive = i === activeIdx
        const isPast = i < activeIdx
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(i)}
            aria-current={isActive ? "step" : undefined}
            className="relative px-4 py-2 rounded-lg text-left transition-all"
            style={{
              fontSize: "12px",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? c.white : isPast ? c.primary : c.textMuted,
              background: isActive ? c.primarySoft : "transparent",
              border: `1px solid ${isActive ? c.borderStrong : "transparent"}`,
            }}
          >
            {item.label}
            {isActive && (
              <span
                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                style={{ background: c.primary }}
              />
            )}
          </button>
        )
      })}

      <div
        className="ml-auto h-1 rounded-full overflow-hidden"
        style={{ width: "80px", background: c.border }}
      >
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${c.primary}, ${c.cyan})`,
          }}
        />
      </div>
    </div>
  )
}
