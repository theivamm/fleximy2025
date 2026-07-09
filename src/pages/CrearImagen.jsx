import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { ChevronLeft, ChevronRight, Download, Type, Layout, Upload, Check, Loader2, PenSquare, Move, Bold as BoldIcon } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabase"

const STEPS = [
  { id: "template", label: "Plantilla", icon: Layout },
  { id: "content", label: "Contenido", icon: Type },
  { id: "export", label: "Exportar", icon: Download },
]

const FORMATS = [
  { id: "square", label: "Cuadrado", w: 1080, h: 1080, desc: "1:1 Instagram Feed" },
  { id: "vertical", label: "Vertical", w: 1080, h: 1350, desc: "4:5 Instagram/Threads" },
  { id: "horizontal", label: "Horizontal", w: 1200, h: 630, desc: "1.9:1 Facebook/LinkedIn" },
  { id: "story", label: "Historia", w: 1080, h: 1920, desc: "9:16 Stories/Reels" },
]

const TEMPLATES = [
  { id: "simple", name: "Simple", desc: "Logo VESSEL arriba izquierda, título grande, subtítulo, fondo imagen con degradado negro" },
]

const FONT_FAMILY = "'Montserrat', sans-serif"

const GRADIENT_PRESETS = [
  { id: "none", label: "Sin gradiente", from: "", to: "" },
  { id: "indigo-purple", label: "Indigo → Purple", from: "#6366f1", to: "#a855f7" },
  { id: "cyan-blue", label: "Cyan → Blue", from: "#06b6d4", to: "#3b82f6" },
  { id: "pink-orange", label: "Pink → Orange", from: "#ec4899", to: "#f97316" },
  { id: "emerald-teal", label: "Emerald → Teal", from: "#10b981", to: "#14b8a6" },
  { id: "white", label: "Blanco", from: "#ffffff", to: "#ffffff" },
]

function WordChip({ word, config, isSelected, onClick }) {
  let style = {}
  if (config.isGradient && config.gradientId !== "none") {
    const g = GRADIENT_PRESETS.find(p => p.id === config.gradientId)
    if (g) {
      style = {
        backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }
    }
  } else if (config.color && config.color !== "#ffffff") {
    style = { color: config.color }
  }
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-sm cursor-pointer transition-all select-none border ${
        isSelected ? "ring-2 ring-indigo-400 border-indigo-300" : "border-slate-200/50 dark:border-slate-600/50"
      } ${config.bold ? "font-bold" : "font-medium"}`}
      style={{ ...style, fontFamily: FONT_FAMILY }}
    >
      {word}
      {config.bold && <BoldIcon size={10} className="text-indigo-400" />}
    </span>
  )
}

function RichTextInput({ words, onWordsChange, placeholder }) {
  const [selected, setSelected] = useState(-1)

  const handleText = (e) => {
    const parts = e.target.value.split(/\s+/).filter(Boolean)
    if (parts.length === 0) return onWordsChange([{ text: "", bold: false, color: "#ffffff", isGradient: false, gradientId: "none" }])
    onWordsChange(parts.map(t => ({ text: t, bold: false, color: "#ffffff", isGradient: false, gradientId: "none" })))
    setSelected(-1)
  }

  const toggleBold = (i) => {
    const next = [...words]
    next[i] = { ...next[i], bold: !next[i].bold }
    onWordsChange(next)
  }

  const applyGradient = (gid) => {
    if (selected < 0 || selected >= words.length) return
    const next = [...words]
    const w = next[selected]
    if (w.isGradient && w.gradientId === gid) {
      next[selected] = { ...w, isGradient: false, gradientId: "none" }
    } else {
      next[selected] = { ...w, isGradient: true, gradientId: gid }
    }
    onWordsChange(next)
  }

  const text = words.map(w => w.text).join(" ")

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={handleText}
        placeholder={placeholder}
        rows={2}
        className="w-full px-3 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
      />
      <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-white/30 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 min-h-[36px]">
        {words.map((w, i) => (
          <WordChip key={i} word={w.text} config={w} isSelected={selected === i} onClick={() => { setSelected(i); toggleBold(i) }} />
        ))}
      </div>
      {selected >= 0 && selected < words.length && (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mr-1">Gradiente</span>
          {GRADIENT_PRESETS.filter(g => g.id !== "none").map((g) => (
            <button
              key={g.id}
              onClick={() => applyGradient(g.id)}
              className={`w-7 h-7 rounded-lg border-2 cursor-pointer ${
                words[selected]?.gradientId === g.id && words[selected]?.isGradient
                  ? "border-indigo-400 ring-2 ring-indigo-400/30" : "border-transparent hover:border-slate-300"
              }`}
              style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
              title={g.label}
            />
          ))}
          {words[selected]?.isGradient && (
            <button onClick={() => { const n = [...words]; n[selected] = { ...n[selected], isGradient: false, gradientId: "none" }; onWordsChange(n) }} className="text-[10px] text-slate-400 hover:text-red-400 cursor-pointer px-2">
              Quitar
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function renderExportCanvas(fmt, bgImg, bgOffX, bgOffY, bgZoom, titleWords, subtitleWords, gradientOpacity, titleY, subtitleY) {
  const canvas = document.createElement("canvas")
  canvas.width = fmt.w
  canvas.height = fmt.h
  const ctx = canvas.getContext("2d")

  function getWordStyle(word) {
    if (word.isGradient && word.gradientId !== "none") {
      const g = GRADIENT_PRESETS.find(p => p.id === word.gradientId)
      if (g) {
        const gr = ctx.createLinearGradient(0, 0, fmt.w * 0.3, 0)
        gr.addColorStop(0, g.from)
        gr.addColorStop(1, g.to)
        return gr
      }
    }
    return word.color || "#ffffff"
  }

  const padX = fmt.w * 0.06

  const bg = new Image()
  bg.crossOrigin = "anonymous"
  bg.src = bgImg
  const drawBg = () => {
    if (bg.complete && bg.naturalWidth > 0) {
      const baseScale = Math.max(fmt.w / bg.naturalWidth, fmt.h / bg.naturalHeight)
      const scale = baseScale * bgZoom
      const iw = bg.naturalWidth * scale
      const ih = bg.naturalHeight * scale
      const maxOffX = (iw - fmt.w) / 2
      const maxOffY = (ih - fmt.h) / 2
      const cx = Math.max(-maxOffX, Math.min(maxOffX, bgOffX))
      const cy = Math.max(-maxOffY, Math.min(maxOffY, bgOffY))
      const ix = (fmt.w - iw) / 2 - cx
      const iy = (fmt.h - ih) / 2 - cy
      ctx.drawImage(bg, ix, iy, iw, ih)
    } else {
      const g = ctx.createLinearGradient(0, 0, fmt.w, fmt.h)
      g.addColorStop(0, "#cbd5e1")
      g.addColorStop(1, "#94a3b8")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, fmt.w, fmt.h)
    }
  }

  if (bgImg && (bg.complete && bg.naturalWidth > 0)) {
    drawBg()
  } else if (bgImg) {
    bg.onload = drawBg
    bg.onerror = drawBg
  } else {
    const g = ctx.createLinearGradient(0, 0, fmt.w, fmt.h)
    g.addColorStop(0, "#cbd5e1")
    g.addColorStop(1, "#94a3b8")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, fmt.w, fmt.h)
  }

  const grad = ctx.createLinearGradient(0, fmt.h * 0.1, 0, fmt.h)
  grad.addColorStop(0, "rgba(0,0,0,0)")
  grad.addColorStop(0.4, `rgba(0,0,0,${gradientOpacity * 0.7})`)
  grad.addColorStop(1, `rgba(0,0,0,${gradientOpacity})`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, fmt.w, fmt.h)

  const logoSvg = new Image()
  logoSvg.src = "data:image/svg+xml," + encodeURIComponent('<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 28L16 4L28 28" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 20H22" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>')
  const logoSize = fmt.w * 0.055
  ctx.drawImage(logoSvg, padX, fmt.h * 0.05, logoSize, logoSize)
  ctx.font = `bold ${fmt.w * 0.038}px ${FONT_FAMILY}`
  ctx.fillStyle = "white"
  ctx.textBaseline = "middle"
  ctx.fillText("VESSEL", padX + logoSize + fmt.w * 0.02, fmt.h * 0.05 + logoSize / 2)

  function wrapAndDraw(words, fontSize, baseY, isSubtitle) {
    if (words.length === 0) return
    const maxWidth = fmt.w - padX * 2
    const lineHeight = fontSize * (isSubtitle ? 1.4 : 1.3)
    const lines = []
    let currentLine = []
    let currentWidth = 0
    ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`
    for (const w of words) {
      ctx.fillStyle = getWordStyle(w)
      const m = ctx.measureText(w.text + " ")
      const ww = m.width
      if (currentWidth + ww > maxWidth && currentLine.length > 0) {
        lines.push(currentLine)
        currentLine = [w]
        currentWidth = ww
      } else {
        currentLine.push(w)
        currentWidth += ww
      }
    }
    if (currentLine.length > 0) lines.push(currentLine)

    const totalTextH = lines.length * lineHeight
    const startY = baseY - totalTextH

    ctx.textBaseline = "top"
    ctx.textAlign = "left"
    lines.forEach((line) => {
      let lx = padX
      for (const w of line) {
        ctx.fillStyle = getWordStyle(w)
        ctx.font = `${w.bold ? "bold" : "500"} ${fontSize}px ${FONT_FAMILY}`
        ctx.fillText(w.text, lx, startY)
        lx += ctx.measureText(w.text + " ").width
      }
    })
  }

  const titleFontSize = fmt.w * 0.075
  const subtitleFontSize = fmt.w * 0.035
  const bottomPad = fmt.h * 0.06
  const subtitleArea = subtitleWords.length > 0 ? subtitleFontSize * 1.5 + fmt.h * 0.015 : 0
  const titleBaseY = fmt.h - bottomPad - subtitleArea + titleY * fmt.h * 0.001
  const subtitleBaseY = fmt.h - bottomPad + subtitleY * fmt.h * 0.001

  wrapAndDraw(titleWords, titleFontSize, titleBaseY, false)
  wrapAndDraw(subtitleWords, subtitleFontSize, subtitleBaseY, true)

  return canvas
}

export default function CrearImagen() {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [selectedTemplate] = useState("simple")

  const [titleWords, setTitleWords] = useState([{ text: "Tu negocio merece un Vessel", bold: false, color: "#ffffff", isGradient: true, gradientId: "indigo-purple" }])
  const [subtitleWords, setSubtitleWords] = useState([{ text: "Unifica tu web y dashboard en un solo sistema", bold: false, color: "#ffffff", isGradient: false, gradientId: "none" }])

  const [backgroundImage, setBackgroundImage] = useState(null)
  const [backgroundPreview, setBackgroundPreview] = useState(null)
  const [gradientOpacity, setGradientOpacity] = useState(0.6)
  const [exportFormat, setExportFormat] = useState("square")
  const [exporting, setExporting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadingBg, setUploadingBg] = useState(false)
  const [titleY, setTitleY] = useState(0)
  const [subtitleY, setSubtitleY] = useState(0)

  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 })
  const [bgZoom, setBgZoom] = useState(1)
  const dragBg = useRef(null)
  const [isDraggingBg, setIsDraggingBg] = useState(false)
  const [draggingTitle, setDraggingTitle] = useState(false)
  const [draggingSubtitle, setDraggingSubtitle] = useState(false)
  const dragYRef = useRef(null)

  const previewRef = useRef(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    setUploadingBg(true)
    const preview = URL.createObjectURL(file)
    setBackgroundPreview(preview)
    setBgOffset({ x: 0, y: 0 })
    setBgZoom(1)
    const ext = file.name.split(".").pop()
    const filePath = `${user.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("vessel-backgrounds").upload(filePath, file)
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("vessel-backgrounds").getPublicUrl(filePath)
      setBackgroundImage(publicUrl)
    }
    setUploadingBg(false)
  }, [user])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  })

  const handleBgMouseDown = useCallback((e) => {
    if (e.target.closest("[data-no-drag]")) return
    setIsDraggingBg(true)
    dragBg.current = { startX: e.clientX, startY: e.clientY, offsetX: bgOffset.x, offsetY: bgOffset.y }
  }, [bgOffset])

  useEffect(() => {
    if (!isDraggingBg) return
    const handleMouseMove = (e) => {
      if (!dragBg.current) return
      setBgOffset({
        x: dragBg.current.offsetX + (e.clientX - dragBg.current.startX) * 0.6,
        y: dragBg.current.offsetY + (e.clientY - dragBg.current.startY) * 0.6,
      })
    }
    const handleMouseUp = () => setIsDraggingBg(false)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDraggingBg])

  const handleTitleDragStart = useCallback((e) => {
    if (e.target.closest("[data-word-editor]")) return
    setDraggingTitle(true)
    dragYRef.current = { startY: e.clientY, offset: titleY }
  }, [titleY])

  const handleSubtitleDragStart = useCallback((e) => {
    if (e.target.closest("[data-word-editor]")) return
    setDraggingSubtitle(true)
    dragYRef.current = { startY: e.clientY, offset: subtitleY }
  }, [subtitleY])

  useEffect(() => {
    if (!draggingTitle && !draggingSubtitle) return
    const handleMouseMove = (e) => {
      if (!dragYRef.current) return
      const delta = (e.clientY - dragYRef.current.startY) * 0.5
      if (draggingTitle) setTitleY(dragYRef.current.offset + delta)
      if (draggingSubtitle) setSubtitleY(dragYRef.current.offset + delta)
    }
    const handleMouseUp = () => { setDraggingTitle(false); setDraggingSubtitle(false) }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggingTitle, draggingSubtitle])

  const handleExport = async (formatId) => {
    setExporting(true)
    const fmt = FORMATS.find((f) => f.id === formatId)
    if (!fmt) { setExporting(false); return }
    try {
      const imgSrc = backgroundPreview || ""
      const canvas = renderExportCanvas(fmt, imgSrc, bgOffset.x, bgOffset.y, bgZoom, titleWords, subtitleWords, gradientOpacity, titleY, subtitleY)
      const dataUrl = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `vessel-${formatId}-${Date.now()}.png`
      a.click()
    } catch (err) { console.error("Export error:", err) }
    setExporting(false)
  }

  const handleSaveDesign = async () => {
    if (!user) return
    setSaving(true)
    const { error } = await supabase.from("vessel_designs").insert({
      user_id: user.id,
      template_id: selectedTemplate,
      title: titleWords.map(w => w.text).join(" "),
      subtitle: subtitleWords.map(w => w.text).join(" "),
      background_url: backgroundImage,
      gradient_opacity: gradientOpacity,
      format: exportFormat,
    })
    if (!error) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  useEffect(() => {
    return () => {
      if (backgroundPreview && backgroundPreview.startsWith("blob:")) URL.revokeObjectURL(backgroundPreview)
    }
  }, [backgroundPreview])

  const canNext = step === 0 || (step === 1 && titleWords.some(w => w.text.trim()) && backgroundPreview)

  const currentFmt = FORMATS.find((f) => f.id === exportFormat)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <PenSquare size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Crear Imagen</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Diseñá imágenes para redes sociales en 3 pasos</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isActive = step === i
          const isDone = step > i
          return (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border-[0.5px] ${
                  isActive ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50"
                  : isDone ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                  : "bg-white/30 dark:bg-slate-800/30 text-slate-400 dark:text-slate-500 border-transparent"
                }`}
              >
                {isDone ? <Check size={14} /> : <Icon size={14} />}
                {s.label}
              </button>
              {i < STEPS.length - 1 && <div className="w-6 h-px bg-slate-200 dark:bg-slate-700" />}
            </div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Elegí una plantilla</h2>
                {TEMPLATES.map((t) => (
                  <div key={t.id} className="w-full text-left p-4 rounded-xl border-[0.5px] bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shrink-0">
                        <span className="text-[8px] font-bold text-white tracking-widest">VESSEL</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="space-y-5">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Personalizá tu diseño</h2>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Título <span className="text-slate-400 font-normal">(click en palabra para bold + seleccionar, abajo elegí gradiente)</span>
                  </label>
                  <RichTextInput words={titleWords} onWordsChange={setTitleWords} placeholder="Escribí el título..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Subtítulo
                  </label>
                  <RichTextInput words={subtitleWords} onWordsChange={setSubtitleWords} placeholder="Escribí el subtítulo..." />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Imagen de fondo</label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      isDragActive ? "border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {uploadingBg ? (
                      <Loader2 size={24} className="animate-spin mx-auto text-slate-400" />
                    ) : backgroundPreview ? (
                      <div className="relative">
                        <img src={backgroundPreview} alt="Preview" className="max-h-24 mx-auto rounded-lg object-cover" />
                        <p className="text-xs text-slate-400 mt-1">Click para cambiar imagen</p>
                      </div>
                    ) : (
                      <div>
                        <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">Arrastrá una imagen o click para seleccionar</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG o WebP</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Zoom de fondo: {Math.round(bgZoom * 100)}%
                  </label>
                  <input type="range" min="0.5" max="3" step="0.1" value={bgZoom} onChange={(e) => setBgZoom(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                    Opacidad del degradado: {Math.round(gradientOpacity * 100)}%
                  </label>
                  <input type="range" min="0" max="1" step="0.05" value={gradientOpacity} onChange={(e) => setGradientOpacity(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1">
                    <Move size={12} /> Posicionamiento
                  </label>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    Arrastrá la imagen de fondo para encuadrar. Arrastrá el título o subtítulo en la preview para subir/bajar.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Exportar</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Elegí el formato y exportá tu diseño</p>
                <div className="space-y-2 mb-6">
                  {FORMATS.map((f) => (
                    <button key={f.id} onClick={() => setExportFormat(f.id)}
                      className={`w-full text-left p-3 rounded-xl border-[0.5px] transition-all cursor-pointer ${
                        exportFormat === f.id
                          ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50"
                          : "bg-white/30 dark:bg-slate-800/30 border-transparent hover:bg-white/50 dark:hover:bg-slate-700/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{f.label}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{f.desc}</p>
                        </div>
                        <span className="text-xs text-slate-400">{f.w}x{f.h}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {FORMATS.map((f) => (
                    <button key={f.id} onClick={() => handleExport(f.id)} disabled={exporting}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white/70 dark:hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <span>{f.label} ({f.w}x{f.h})</span>
                      {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                    </button>
                  ))}
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-1">
                    <button onClick={handleSaveDesign} disabled={saving || success}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-[0.5px] text-sm font-semibold transition-colors cursor-pointer ${
                        success
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                          : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-white/70 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      {success ? <><Check size={16} /> Guardado</> : saving ? <><Loader2 size={16} className="animate-spin" /> Guardando...</> : <><Check size={16} /> Guardar diseño</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            {step < 2 ? (
              <button onClick={() => setStep((s) => Math.min(2, s + 1))} disabled={!canNext}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Siguiente <ChevronRight size={16} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="sticky top-24">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">Vista previa</h3>
          <div className="glass p-4 flex items-center justify-center">
            <div ref={previewRef}
              className="relative overflow-hidden select-none"
              style={{
                width: "100%",
                aspectRatio: currentFmt ? currentFmt.w / currentFmt.h : 1,
                maxWidth: 420,
                borderRadius: 8,
                cursor: isDraggingBg ? "grabbing" : "grab",
              }}
              onMouseDown={backgroundPreview ? handleBgMouseDown : undefined}
            >
              {backgroundPreview ? (
                <div className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${backgroundPreview})`,
                    backgroundSize: `${bgZoom * 100}%`,
                    backgroundPosition: `calc(50% + ${bgOffset.x}px) calc(50% + ${bgOffset.y}px)`,
                    backgroundRepeat: "no-repeat",
                    transition: isDraggingBg ? "none" : "background-position 0.15s, background-size 0.15s",
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
              )}

              <div className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 10%, rgba(0,0,0,${gradientOpacity * 0.7}) 40%, rgba(0,0,0,${gradientOpacity}) 100%)`,
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div data-no-drag>
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white shrink-0">
                      <path d="M4 28L16 4L28 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs font-bold text-white tracking-widest">VESSEL</span>
                  </div>
                </div>

                <div>
                  <div data-no-drag className="relative" style={{ transform: `translateY(${titleY}px)` }} onMouseDown={handleTitleDragStart}>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                      {titleWords.map((w, i) => {
                        const s = w.isGradient && w.gradientId !== "none"
                          ? { backgroundImage: `linear-gradient(135deg, ${GRADIENT_PRESETS.find(g => g.id === w.gradientId)?.from}, ${GRADIENT_PRESETS.find(g => g.id === w.gradientId)?.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                          : { color: w.color }
                        return (
                          <span key={i} className={`text-xl sm:text-2xl leading-tight ${w.bold ? "font-bold" : "font-medium"}`}
                            style={{ ...s, fontFamily: FONT_FAMILY, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
                          >{w.text}</span>
                        )
                      })}
                    </div>
                  </div>

                  <div data-no-drag className="relative mt-1" style={{ transform: `translateY(${subtitleY}px)` }} onMouseDown={handleSubtitleDragStart}>
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                      {subtitleWords.map((w, i) => {
                        const s = w.isGradient && w.gradientId !== "none"
                          ? { backgroundImage: `linear-gradient(135deg, ${GRADIENT_PRESETS.find(g => g.id === w.gradientId)?.from}, ${GRADIENT_PRESETS.find(g => g.id === w.gradientId)?.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                          : { color: w.color }
                        return (
                          <span key={i} className={`text-xs sm:text-sm leading-relaxed ${w.bold ? "font-semibold" : "font-normal"}`}
                            style={{ ...s, fontFamily: FONT_FAMILY, textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}
                          >{w.text}</span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] text-white/50 px-1">
                <span>Arrastrá fondo para encuadrar</span>
                <span>Arrastrá textos para subir/bajar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
