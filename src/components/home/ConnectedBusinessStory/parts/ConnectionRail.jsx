export default function ConnectionRail({ progress, c }) {
  const railH = 600
  const dotY = progress * railH

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: 0,
        top: "40vh",
        height: `${railH}px`,
        width: "2px",
        zIndex: 0,
      }}
    >
      <svg
        width="2"
        height={railH}
        viewBox={`0 0 2 ${railH}`}
        className="absolute inset-0"
      >
        <line
          x1="1" y1="0" x2="1" y2={railH}
          stroke={c.border}
          strokeWidth="1"
        />
        <line
          x1="1" y1="0" x2="1" y2={dotY}
          stroke="url(#railGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="railGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.primary} />
            <stop offset="100%" stopColor={c.cyan} />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="absolute rounded-full transition-all duration-300"
        style={{
          left: "-3px",
          top: `${dotY - 4}px`,
          width: "8px",
          height: "8px",
          background: c.primary,
          boxShadow: `0 0 12px ${c.primary}60`,
        }}
      />
    </div>
  )
}
