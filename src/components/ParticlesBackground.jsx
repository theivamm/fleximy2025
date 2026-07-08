import { useRef, useEffect, useCallback } from "react"
import { useTheme } from "../context/ThemeContext"

const PARTICLE_COUNT = 120
const CONNECTION_DIST = 160
const MOUSE_RADIUS = 200

class Particle {
  constructor(w, h) {
    this.reset(w, h)
  }

  reset(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.vx = (Math.random() - 0.5) * 0.4
    this.vy = (Math.random() - 0.5) * 0.4
    this.radius = Math.random() * 2.5 + 1
  }

  update(w, h, mouse) {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > w) this.vx *= -1
    if (this.y < 0 || this.y > h) this.vy *= -1

    if (mouse) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
        this.x += (dx / dist) * force * 2.5
        this.y += (dy / dist) * force * 2.5
      }
    }
  }

  draw(ctx, dark) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = dark
      ? "rgba(99, 102, 241, 0.5)"
      : "rgba(99, 102, 241, 0.35)"
    ctx.fill()

    // Glow
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2)
    ctx.fillStyle = dark
      ? "rgba(99, 102, 241, 0.08)"
      : "rgba(99, 102, 241, 0.05)"
    ctx.fill()
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef(null)
  const rafRef = useRef(null)
  const { dark } = useTheme()

  const drawConnections = useCallback((ctx, particles, w, h) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.6
          ctx.strokeStyle = dark
            ? `rgba(99, 102, 241, ${alpha * 0.35})`
            : `rgba(99, 102, 241, ${alpha * 0.25})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    if (mouseRef.current) {
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          const alpha = (1 - dist / MOUSE_RADIUS) * 0.7
          ctx.strokeStyle = dark
            ? `rgba(99, 102, 241, ${alpha * 0.5})`
            : `rgba(99, 102, 241, ${alpha * 0.4})`
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }
    }
  }, [dark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let w, h

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => new Particle(w, h))
      }
    }

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = null
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        p.update(w, h, mouseRef.current)
        p.draw(ctx, dark)
      }

      drawConnections(ctx, particlesRef.current, w, h)
      rafRef.current = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [dark, drawConnections])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}
