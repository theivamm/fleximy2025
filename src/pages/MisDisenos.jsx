import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ImageIcon, Trash2, Download, Loader2, AlertCircle, ExternalLink } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

const FORMATS = [
  { id: "square", w: 1080, h: 1080 },
  { id: "vertical", w: 1080, h: 1350 },
  { id: "horizontal", w: 1200, h: 630 },
  { id: "story", w: 1080, h: 1920 },
]

const FONT_FAMILY = "'Montserrat', sans-serif"

function renderThumbnail(design) {
  const fmt = FORMATS.find((f) => f.id === design.format) || FORMATS[0]
  const canvas = document.createElement("canvas")
  canvas.width = fmt.w
  canvas.height = fmt.h
  const ctx = canvas.getContext("2d")

  const bg = new Image()
  bg.crossOrigin = "anonymous"
  bg.src = design.background_url || ""
  const baseScale = Math.max(fmt.w / bg.naturalWidth, fmt.h / bg.naturalHeight) || 1
  const scale = baseScale
  const iw = bg.naturalWidth * scale || fmt.w
  const ih = bg.naturalHeight * scale || fmt.h
  const ix = (fmt.w - iw) / 2
  const iy = (fmt.h - ih) / 2

  bg.onload = () => {
    ctx.drawImage(bg, ix, iy, iw, ih)
    drawOverlay(ctx, fmt, design)
  }
  bg.onerror = () => {
    drawFallback(ctx, fmt)
    drawOverlay(ctx, fmt, design)
  }
  if (bg.complete && bg.naturalWidth > 0) {
    ctx.drawImage(bg, ix, iy, iw, ih)
  }
  drawOverlay(ctx, fmt, design)
  return canvas
}

function drawFallback(ctx, fmt) {
  const g = ctx.createLinearGradient(0, 0, fmt.w, fmt.h)
  g.addColorStop(0, "#cbd5e1")
  g.addColorStop(1, "#94a3b8")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, fmt.w, fmt.h)
}

function drawOverlay(ctx, fmt, design) {
  const grad = ctx.createLinearGradient(0, fmt.h * 0.1, 0, fmt.h)
  grad.addColorStop(0, "rgba(0,0,0,0)")
  grad.addColorStop(0.4, `rgba(0,0,0,${(design.gradient_opacity || 0.6) * 0.7})`)
  grad.addColorStop(1, `rgba(0,0,0,${design.gradient_opacity || 0.6})`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, fmt.w, fmt.h)

  const padX = fmt.w * 0.06
  const logoSvg = new Image()
  logoSvg.src = "data:image/svg+xml," + encodeURIComponent(`<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 28L16 4L28 28" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20H22" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>`)
  const logoSize = fmt.w * 0.055
  ctx.drawImage(logoSvg, padX, fmt.h * 0.05, logoSize, logoSize)
  ctx.font = `bold ${fmt.w * 0.038}px ${FONT_FAMILY}`
  ctx.fillStyle = "white"
  ctx.textBaseline = "middle"
  ctx.fillText("VESSEL", padX + logoSize + fmt.w * 0.02, fmt.h * 0.05 + logoSize / 2)

  if (design.title) {
    const fontSize = fmt.w * 0.065
    ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`
    ctx.fillStyle = "white"
    ctx.textBaseline = "bottom"
    const tLines = wrapTextCanvas(ctx, design.title, fmt.w - padX * 2, fontSize)
    const lineHeight = fontSize * 1.3
    const tY = fmt.h * 0.7 - tLines.length * lineHeight
    tLines.forEach((line, i) => {
      ctx.fillText(line, padX, tY + (i + 1) * lineHeight)
    })
  }

  if (design.subtitle) {
    const fontSize = fmt.w * 0.03
    ctx.font = `500 ${fontSize}px ${FONT_FAMILY}`
    ctx.fillStyle = "rgba(255,255,255,0.8)"
    ctx.textBaseline = "bottom"
    const sLines = wrapTextCanvas(ctx, design.subtitle, fmt.w - padX * 2, fontSize)
    const lineHeight = fontSize * 1.4
    const sY = fmt.h * 0.88 - sLines.length * lineHeight
    sLines.forEach((line, i) => {
      ctx.fillText(line, padX, sY + (i + 1) * lineHeight)
    })
  }
}

function wrapTextCanvas(ctx, text, maxWidth, fontSize) {
  const words = text.split(" ")
  const lines = []
  let current = ""
  for (const w of words) {
    const test = current ? current + " " + w : w
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = w
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

function DesignCard({ design, onDelete }) {
  const canvasRef = useRef(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rendered = renderThumbnail(design)
    const ctx = canvas.getContext("2d")
    canvas.width = rendered.width
    canvas.height = rendered.height
    ctx.drawImage(rendered, 0, 0)
  }, [design])

  const handleDelete = async () => {
    setDeleting(true)
    await supabase.from("vessel_designs").delete().eq("id", design.id)
    onDelete(design.id)
  }

  const fmt = FORMATS.find((f) => f.id === design.format) || FORMATS[0]

  return (
    <div className="glass overflow-hidden group">
      <div className="aspect-[1/1] bg-slate-100 dark:bg-slate-800 relative">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 rounded-xl bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
          {design.title || "Sin título"}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            {fmt.w}×{fmt.h}
          </span>
          <span className="text-[10px] text-slate-400">
            {new Date(design.created_at).toLocaleDateString("es-AR")}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function MisDisenos() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    supabase
      .from("vessel_designs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setDesigns(data || [])
        setLoading(false)
      })
  }, [user])

  const handleDelete = (id) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-indigo-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle size={32} className="text-red-400 mb-3" />
        <p className="text-sm text-red-500 mb-1">Error al cargar diseños</p>
        <p className="text-xs text-slate-400">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <ImageIcon size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Mis Diseños</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {designs.length} {designs.length === 1 ? "diseño guardado" : "diseños guardados"}
          </p>
        </div>
      </div>

      {designs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <ImageIcon size={28} className="text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            No tenés diseños guardados
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
            Creá tu primer diseño para verlo acá
          </p>
          <button
            onClick={() => navigate("/dashboard/crear-imagen")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            <ExternalLink size={14} />
            Crear imagen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DesignCard design={design} onDelete={handleDelete} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
