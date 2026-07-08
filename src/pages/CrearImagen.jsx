import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { toPng, toJpeg } from "html-to-image"
import { ChevronLeft, ChevronRight, Download, ImageIcon, Type, Layout, Upload, Check, Loader2, PenSquare } from "lucide-react"
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
  {
    id: "simple",
    name: "Simple",
    desc: "Logo VESSEL arriba izquierda, título grande, subtítulo, fondo imagen con degradado negro",
  },
]

function getElementByIdSafe(id) {
  return document.getElementById(id)
}

export default function CrearImagen() {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState("simple")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [backgroundPreview, setBackgroundPreview] = useState(null)
  const [gradientOpacity, setGradientOpacity] = useState(0.6)
  const [exportFormat, setExportFormat] = useState("square")
  const [exporting, setExporting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadingBg, setUploadingBg] = useState(false)
  const previewRef = useRef(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return
    setUploadingBg(true)
    const preview = URL.createObjectURL(file)
    setBackgroundPreview(preview)

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

  const handleSaveDesign = async () => {
    setSaving(true)
    const fmt = FORMATS.find((f) => f.id === exportFormat)
    const node = previewRef.current
    if (!node || !user) return

    const dataUrl = await toPng(node, { width: fmt.w, height: fmt.h, pixelRatio: 1 })

    const { error } = await supabase.from("vessel_designs").insert({
      user_id: user.id,
      template_id: selectedTemplate,
      title,
      subtitle,
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

  const handleExport = async (format) => {
    setExporting(true)
    const fmt = FORMATS.find((f) => f.id === format)
    const node = previewRef.current
    if (!node) { setExporting(false); return }

    try {
      const dataUrl = await toPng(node, { width: fmt.w, height: fmt.h, pixelRatio: 1 })
      const a = document.createElement("a")
      a.href = dataUrl
      a.download = `vessel-${format}-${Date.now()}.png`
      a.click()
    } catch {}
    setExporting(false)
  }

  useEffect(() => {
    return () => {
      if (backgroundPreview) URL.revokeObjectURL(backgroundPreview)
    }
  }, [backgroundPreview])

  const canNext = step === 0 || (step === 1 && title.trim() && backgroundPreview)

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

      {/* Steps indicator */}
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
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50"
                    : isDone
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
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
        {/* Left: Editor */}
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
              >
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Elegí una plantilla</h2>
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`w-full text-left p-4 rounded-xl border-[0.5px] transition-all cursor-pointer ${
                      selectedTemplate === t.id
                        ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50"
                        : "bg-white/30 dark:bg-slate-800/30 border-transparent hover:bg-white/50 dark:hover:bg-slate-700/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shrink-0">
                        <span className="text-[8px] font-bold text-white tracking-widest">VESSEL</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{t.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                className="space-y-5"
              >
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Personalizá tu diseño</h2>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Título</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Tu negocio merece un Vessel"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Subtítulo</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Ej: Unifica tu web y dashboard en un solo sistema"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Imagen de fondo</label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {uploadingBg ? (
                      <Loader2 size={24} className="animate-spin mx-auto text-slate-400" />
                    ) : backgroundPreview ? (
                      <div className="relative">
                        <img src={backgroundPreview} alt="Preview" className="max-h-32 mx-auto rounded-lg object-cover" />
                        <p className="text-xs text-slate-400 mt-2">Click para cambiar imagen</p>
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
                    Opacidad del degradado: {Math.round(gradientOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={gradientOpacity}
                    onChange={(e) => setGradientOpacity(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
              >
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Exportar</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Elegí el formato y exportá tu diseño</p>

                <div className="space-y-2 mb-6">
                  {FORMATS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setExportFormat(f.id)}
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
                  <button
                    onClick={() => handleExport(exportFormat)}
                    disabled={exporting}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {exporting ? "Exportando..." : `Exportar como PNG (${FORMATS.find((f) => f.id === exportFormat)?.w}x${FORMATS.find((f) => f.id === exportFormat)?.h})`}
                  </button>

                  <button
                    onClick={handleSaveDesign}
                    disabled={saving || success}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-[0.5px] text-sm font-semibold transition-colors cursor-pointer ${
                      success
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50"
                        : "bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-white/70 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    {success ? (
                      <><Check size={16} /> Guardado</>
                    ) : saving ? (
                      <><Loader2 size={16} className="animate-spin" /> Guardando...</>
                    ) : (
                      <><Check size={16} /> Guardar diseño</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            {step < 2 ? (
              <button
                onClick={() => setStep((s) => Math.min(2, s + 1))}
                disabled={!canNext}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Siguiente
                <ChevronRight size={16} />
              </button>
            ) : null}
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="sticky top-24">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">Vista previa</h3>
          <div className="glass p-4 flex items-center justify-center">
            <div
              ref={previewRef}
              id="vessel-preview"
              className="relative overflow-hidden"
              style={{
                width: "100%",
                aspectRatio: FORMATS.find((f) => f.id === exportFormat)?.w / FORMATS.find((f) => f.id === exportFormat)?.h || 1,
                maxWidth: 400,
                borderRadius: 8,
              }}
            >
              {backgroundPreview ? (
                <img
                  src={backgroundPreview}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
              )}

              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,${gradientOpacity}) 100%)`,
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M4 28L16 4L28 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs font-bold text-white tracking-widest">VESSEL</span>
                  </div>
                </div>

                <div>
                  {title && (
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-xs text-white/80 leading-relaxed" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
