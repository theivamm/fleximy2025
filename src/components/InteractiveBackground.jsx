import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

function Orbs() {
  return (
    <>
      <motion.div
        className="absolute top-10 left-10 w-80 h-80 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)",
        }}
        animate={{ x: [0, 40, -25, 0], y: [0, -30, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.20) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)",
        }}
        animate={{ x: [0, -35, 20, 0], y: [0, 25, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(236,72,153,0.10) 50%, transparent 70%)",
        }}
        animate={{ x: [0, 20, -30, 0], y: [0, -15, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}

export default function InteractiveBackground() {
  const ref = useRef(null)
  const { dark } = useTheme()

  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const springX = useSpring(mouseX, { stiffness: 25, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 25, damping: 15 })

  const bg = useTransform(
    [springX, springY],
    ([x, y]) => {
      const ix = 100 - x
      const iy = 100 - y
      const a = dark ? "0.20" : "0.35"
      const b = dark ? "0.15" : "0.25"
      const c = dark ? "0.10" : "0.18"
      return [
        `radial-gradient(800px circle at ${x.toFixed(0)}% ${y.toFixed(0)}%, rgba(99,102,241,${a}) 0%, transparent 60%)`,
        `radial-gradient(600px circle at ${ix.toFixed(0)}% ${iy.toFixed(0)}%, rgba(168,85,247,${b}) 0%, transparent 50%)`,
        `radial-gradient(700px circle at ${(y * 0.8).toFixed(0)}% ${(x * 0.8).toFixed(0)}%, rgba(6,182,212,${c}) 0%, transparent 55%)`,
      ].join(",")
    }
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect()
      mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
      mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: bg }}
      />
      <Orbs />
    </div>
  )
}
