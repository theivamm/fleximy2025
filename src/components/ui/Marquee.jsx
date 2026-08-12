/**
 * Marquee continuo en CSS con pausa en hover.
 * El fallback estático (reduced motion) queda a cargo de global.css.
 */
export default function Marquee({ items = [], speed = 40, className = "", itemClassName = "" }) {
  const doubled = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className}`} style={{ "--marquee-speed": `${speed}s` }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={`shrink-0 ${itemClassName}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
