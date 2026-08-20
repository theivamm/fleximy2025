import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DemoCursor({ active, visible }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    if (!active || !visible) return
    const path = [
      { x: 340, y: 220, delay: 1500 },
      { x: 520, y: 310, delay: 2500 },
      { x: 520, y: 340, delay: 4000 },
    ]
    const timers = path.map((p, i) =>
      setTimeout(() => {
        setPos({ x: p.x, y: p.y })
        if (i === 2) {
          setTimeout(() => setRipple(true), 200)
          setTimeout(() => setRipple(false), 600)
        }
      }, p.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [active, visible])

  if (!active || !visible) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        style={{ width: 18, height: 18, marginLeft: -9, marginTop: -9 }}
      >
        {/* Cursor dot */}
        <div
          className="w-[18px] h-[18px] rounded-full border-2 border-white/80"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        />
        {/* Ripple */}
        <AnimatePresence>
          {ripple && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-white/40"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
