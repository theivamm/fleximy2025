import { useState, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Download, Square, RectangleVertical, RectangleHorizontal, Monitor, Trash2, Loader2 } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase"

const FORMATS = [
  { id: "square", icon: Square, label: "Cuadrado", w: 1080, h: 1080, desc: "1:1 Instagram Feed" },
  { id: "vertical", icon: RectangleVertical, label: "Vertical", w: 1080, h: 1350, desc: "4:5 Instagram/Threads" },
  { id: "horizontal", icon: RectangleHorizontal, label: "Horizontal", w: 1200, h: 630, desc: "1.9:1 Facebook/LinkedIn" },
  { id: "story", icon: Monitor, label: "Historia", w: 1080, h: 1920, desc: "9:16 Stories/Reels/Shorts" },
]

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6d2b79f5 | 0
    let t = Math.imul(a ^ a >>> 15, 1 | a)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function downloadImage(dataUrl, filename) {
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = filename
  a.click()
}

function renderCanvas(canvas, fmt, promptText, rng) {
  const ctx = canvas.getContext("2d")

  const colors = [
    "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
    "#ec4899", "#f43f5e", "#14b8a6", "#06b6d4",
    "#3b82f6", "#10b981", "#f59e0b", "#f97316",
  ]

  const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  g.addColorStop(0, colors[Math.floor(rng() * colors.length)])
  g.addColorStop(0.5, colors[Math.floor(rng() * colors.length)])
  g.addColorStop(1, colors[Math.floor(rng() * colors.length)])
  ctx.fillStyle = g
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const shapeCount = Math.floor(rng() * 20) + 15
  for (let i = 0; i < shapeCount; i++) {
    ctx.save()
    const x = rng() * canvas.width
    const y = rng() * canvas.height
    const size = rng() * canvas.width * 0.3 + 20
    const rot = rng() * Math.PI * 2
    ctx.translate(x, y)
    ctx.rotate(rot)

    const alpha = rng() * 0.5 + 0.2
    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    ctx.shadowColor = "rgba(0,0,0,0.1)"
    ctx.shadowBlur = 30

    const shapeType = Math.floor(rng() * 4)
    if (shapeType === 0) {
      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else if (shapeType === 1) {
      ctx.beginPath()
      for (let j = 0; j < 6; j++) {
        const angle = (j * 2 * Math.PI) / 6 - Math.PI / 2
        const r = size / 2
        if (j === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
        else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
      }
      ctx.closePath()
      ctx.fill()
    } else if (shapeType === 2) {
      ctx.roundRect(-size / 2, -size / 3, size, size * 0.6, 20)
      ctx.fill()
    } else {
      const w = size * rng()
      const h = size * (rng() * 0.5 + 0.2)
      ctx.roundRect(-w / 2, -h / 2, w, h, 10)
      ctx.fill()
    }
    ctx.restore()
  }

  for (let i = 0; i < 80; i++) {
    const x = rng() * canvas.width
    const y = rng() * canvas.height
    const r = rng() * 8 + 2
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${rng() * 0.6 + 0.2})`
    ctx.fill()
  }
}

export default function AiImages() {
  const [prompt, setPrompt] = useState("")
  const [format, setFormat] = useState("square")
  const [generating, setGenerating] = useState(false)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    supabase
      .from("generated_images")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setImages(data)
        setLoading(false)
      })
  }, [user])

  const generateImage = useCallback(async () => {
    if (!prompt.trim() || generating) return
    setGenerating(true)

    const fmt = FORMATS.find((f) => f.id === format)
    const canvas = canvasRef.current
    canvas.width = fmt.w
    canvas.height = fmt.h

    const seed = prompt.length + Date.now()
    const rng = mulberry32(seed)
    renderCanvas(canvas, fmt, prompt, rng)

    const imageData = canvas.toDataURL("image/png")

    const { data, error } = await supabase
      .from("generated_images")
      .insert({ user_id: user.id, prompt: prompt.trim(), format, image_data: imageData })
      .select()
      .single()

    if (!error && data) {
      setImages((prev) => [data, ...prev])
    }
    setGenerating(false)
  }, [prompt, format, generating, user])

  const deleteImage = async (id) => {
    await supabase.from("generated_images").delete().eq("id", id)
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const currentFmt = FORMATS.find((f) => f.id === format)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">AI Images</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Generá imágenes abstractas para redes sociales</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="glass p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {FORMATS.map((f) => {
            const Icon = f.icon
            return (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border-[0.5px] ${
                  format === f.id
                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50"
                    : "bg-white/30 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 border-transparent hover:bg-white/50 dark:hover:bg-slate-700/30"
                }`}
              >
                <Icon size={14} />
                {f.label}
                <span className="text-[10px] opacity-60">{f.w}x{f.h}</span>
              </button>
            )
          })}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateImage()}
            placeholder="Describí la imagen que querés generar..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          />
          <button
            onClick={generateImage}
            disabled={generating || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {generating ? "Generando..." : "Generar"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={24} className="animate-spin text-slate-400" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16">
          <Sparkles size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <p className="text-sm text-slate-400 dark:text-slate-500">Todavía no generaste ninguna imagen</p>
          <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">Escribí un prompt y hacé clic en Generar</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => {
            const fmt = FORMATS.find((f) => f.id === img.format)
            const aspectRatio = fmt ? `${fmt.w} / ${fmt.h}` : "1"
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass overflow-hidden group"
              >
                <div className="relative" style={{ aspectRatio }}>
                  <img
                    src={img.image_data}
                    alt={img.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => downloadImage(img.image_data, `vessel-${img.format}-${img.id.slice(0, 8)}.png`)}
                      className="p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white cursor-pointer"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="p-2 rounded-full bg-white/90 text-red-500 hover:bg-white cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">{img.prompt}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{fmt?.label}</span>
                    <span className="text-[10px] text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{new Date(img.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
