import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowLeft, MessageCircle, CalendarDays, Mail, Check } from "lucide-react"
import Button from "../components/ui/Button"
import PageHero from "../components/ui/PageHero"
import PrimaryCTA from "../components/ui/PrimaryCTA"
import { CONTACT } from "../data/navigation"
import { track } from "../lib/analytics"
import {
  RUBROS,
  NECESIDADES,
  CANTIDAD_USUARIOS,
  PLAZOS,
  INVERSION,
  PASOS_DESPUES,
  EXPECTATIVAS,
} from "../data/comercial"

const MODULOS_POR_RUBRO = {
  Gastronomía: ["Menú digital", "Reservas", "Pedidos", "Mesas"],
  "Servicios y turnos": ["Reservas", "Disponibilidad", "Recordatorios", "Clientes"],
  "Gestión de PyMEs": ["CRM", "Proyectos", "Tareas", "Reportes"],
  "Comercio y retail": ["Catálogo", "Stock", "Pedidos", "WhatsApp"],
  Inmobiliarias: ["Propiedades", "Leads", "Visitas", "Agenda"],
  Educación: ["Cursos", "Inscripción", "Alumnos", "Progreso"],
  "Talleres y reparaciones": ["Órdenes", "Presupuestos", "Repuestos", "Estados"],
  "Otro rubro": ["Sitio web", "Panel de gestión"],
}

const TOTAL_STEPS = 3

function Campo({ label, id, required, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-1.5 text-small font-semibold text-text-1">
        {label}
        {required && <span className="text-text-3" aria-hidden="true">*</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1.5 font-mono text-micro text-text-3">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 text-small font-medium text-error">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls =
  "w-full rounded-[var(--radius-field)] border border-outline bg-surface-1/60 px-4 py-3 text-sm text-text-1 placeholder:text-text-3/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"

function ChipGroup({ options, value, onChange, name }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(active ? "" : opt)}
            className={`rounded-full border px-4 py-2 text-small transition-colors ${
              active
                ? "border-text-1 bg-text-1 text-bg-0"
                : "border-outline bg-surface-1/60 text-text-2 hover:border-ink/30 hover:text-text-1"
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export default function Contacto() {
  const navigate = useNavigate()
  const [paso, setPaso] = useState(1)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const iniciado = useRef(false)

  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    whatsapp: "",
    rubro: "",
    necesidad: "",
    personas: "",
    comentario: "",
    sitio: "",
    herramientas: "",
    plazo: "",
    inversion: "",
    archivo: "",
    consentimiento: false,
  })

  const set = (campo) => (e) => {
    const valor = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [campo]: valor }))
    setErrores((err) => ({ ...err, [campo]: undefined }))
  }

  const validarPaso = () => {
    const err = {}
    if (paso === 1) {
      if (!form.nombre.trim()) err.nombre = "Ingresá tu nombre y apellido."
      if (!form.empresa.trim()) err.empresa = "Ingresá el nombre de tu empresa o proyecto."
      if (!form.email.trim()) err.email = "Ingresá tu email laboral."
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Ingresá un email válido."
      if (!form.whatsapp.trim()) err.whatsapp = "Ingresá tu WhatsApp para poder contactarte."
    }
    if (paso === 2) {
      if (!form.rubro) err.rubro = "Elegí el rubro de tu negocio."
      if (!form.necesidad) err.necesidad = "Elegí tu principal necesidad."
      if (!form.personas) err.personas = "Indicá cuántas personas usarían el sistema."
      if (!form.comentario.trim()) err.comentario = "Contanos brevemente tu situación."
    }
    if (paso === 3) {
      if (!form.consentimiento) err.consentimiento = "Necesitamos tu consentimiento para procesar tu solicitud."
    }
    setErrores(err)
    const primerError = Object.keys(err)[0]
    if (primerError) {
      requestAnimationFrame(() => {
        const el = document.getElementById(`campo-${primerError}`)
        el?.focus()
        el?.scrollIntoView({ behavior: "smooth", block: "center" })
      })
      return false
    }
    return true
  }

  const siguiente = () => {
    if (validarPaso()) {
      if (!iniciado.current) {
        iniciado.current = true
        track("formulario_iniciado")
      }
      setPaso((p) => Math.min(p + 1, TOTAL_STEPS))
    }
  }

  const atras = () => {
    setErrores({})
    setPaso((p) => Math.max(p - 1, 1))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validarPaso()) return
    setEnviando(true)
    window.sessionStorage.setItem("fleximy_rubro", form.rubro)
    track("formulario_enviado", { rubro: form.rubro, necesidad: form.necesidad })
    setTimeout(() => navigate("/gracias-diagnostico"), 350)
  }

  const resumenVisible = form.rubro || form.necesidad || form.personas
  const modulosPosibles = MODULOS_POR_RUBRO[form.rubro] || []

  return (
    <main>
      <PageHero
        kicker="Diagnóstico inicial"
        title={
          <>
            Contanos qué parte de tu <span className="text-gradient">negocio querés ordenar.</span>
          </>
        }
        lead="No necesitás preparar un documento técnico. Con algunas preguntas podemos entender tu situación y recomendarte un primer paso."
      />

      <section className="container-site pb-20 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start">
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-micro text-text-3">
                paso {paso} de {TOTAL_STEPS}
              </p>
              <p className="font-mono text-micro text-text-3">menos de 3 minutos</p>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-3/40">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${(paso / TOTAL_STEPS) * 100}%` }}
              />
            </div>

            <form onSubmit={submit} noValidate className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={paso}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-6"
                >
                  {paso === 1 && (
                    <>
                      <Campo id="campo-nombre" label="Nombre y apellido" required error={errores.nombre}>
                        <input
                          id="campo-nombre"
                          className={inputCls}
                          value={form.nombre}
                          onChange={set("nombre")}
                          autoComplete="name"
                          placeholder="María López"
                        />
                      </Campo>
                      <Campo id="campo-empresa" label="Empresa o proyecto" required error={errores.empresa}>
                        <input
                          id="campo-empresa"
                          className={inputCls}
                          value={form.empresa}
                          onChange={set("empresa")}
                          autoComplete="organization"
                          placeholder="Nombre de tu negocio"
                        />
                      </Campo>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Campo id="campo-email" label="Email laboral" required error={errores.email}>
                          <input
                            id="campo-email"
                            type="email"
                            className={inputCls}
                            value={form.email}
                            onChange={set("email")}
                            autoComplete="email"
                            placeholder="tu@empresa.com"
                          />
                        </Campo>
                        <Campo id="campo-whatsapp" label="WhatsApp" required error={errores.whatsapp}>
                          <input
                            id="campo-whatsapp"
                            type="tel"
                            className={inputCls}
                            value={form.whatsapp}
                            onChange={set("whatsapp")}
                            autoComplete="tel"
                            placeholder="+54 9 11 1234 5678"
                          />
                        </Campo>
                      </div>
                    </>
                  )}

                  {paso === 2 && (
                    <>
                      <Campo id="campo-rubro" label="Rubro" required error={errores.rubro}>
                        <ChipGroup
                          name="rubro"
                          options={RUBROS}
                          value={form.rubro}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, rubro: v }))
                            if (v) track("rubro_seleccionado", { rubro: v })
                          }}
                        />
                      </Campo>
                      <Campo id="campo-necesidad" label="Principal necesidad" required error={errores.necesidad}>
                        <ChipGroup name="necesidad" options={NECESIDADES} value={form.necesidad} onChange={(v) => setForm((f) => ({ ...f, necesidad: v }))} />
                      </Campo>
                      <Campo
                        id="campo-personas"
                        label="Personas que usarían el sistema"
                        required
                        error={errores.personas}
                      >
                        <ChipGroup name="personas" options={CANTIDAD_USUARIOS} value={form.personas} onChange={(v) => setForm((f) => ({ ...f, personas: v }))} />
                      </Campo>
                      <Campo id="campo-comentario" label="¿En qué te gustaría que te ayudemos?" required error={errores.comentario}>
                        <textarea
                          id="campo-comentario"
                          rows={4}
                          className={inputCls}
                          value={form.comentario}
                          onChange={set("comentario")}
                          placeholder="Contanos cómo trabajás hoy y qué querés mejorar."
                        />
                      </Campo>
                    </>
                  )}

                  {paso === 3 && (
                    <>
                      <p className="font-mono text-micro text-text-3">opcional · ayuda a preparar la conversación</p>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Campo id="campo-sitio" label="Sitio web actual">
                          <input
                            id="campo-sitio"
                            className={inputCls}
                            value={form.sitio}
                            onChange={set("sitio")}
                            placeholder="https://… o no tengo"
                          />
                        </Campo>
                        <Campo id="campo-herramientas" label="Herramientas que usás hoy">
                          <input
                            id="campo-herramientas"
                            className={inputCls}
                            value={form.herramientas}
                            onChange={set("herramientas")}
                            placeholder="WhatsApp, Excel, otro sistema…"
                          />
                        </Campo>
                      </div>
                      <Campo id="campo-plazo" label="Plazo deseado">
                        <ChipGroup name="plazo" options={PLAZOS} value={form.plazo} onChange={(v) => setForm((f) => ({ ...f, plazo: v }))} />
                      </Campo>
                      <Campo id="campo-inversion" label="Rango de inversión estimado">
                        <ChipGroup name="inversion" options={INVERSION} value={form.inversion} onChange={(v) => setForm((f) => ({ ...f, inversion: v }))} />
                      </Campo>
                      <Campo
                        id="campo-archivo"
                        label="Archivo de referencia"
                        hint="PDF, imagen o documento · opcional"
                      >
                        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-field)] border border-dashed border-outline bg-surface-1/60 px-4 py-3 text-small text-text-3 transition-colors hover:border-ink/30">
                          <span className="truncate">{form.archivo || "Elegir archivo…"}</span>
                          <input
                            id="campo-archivo"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            className="sr-only"
                            onChange={(e) => setForm((f) => ({ ...f, archivo: e.target.files?.[0]?.name || "" }))}
                          />
                          <span className="shrink-0 font-semibold text-text-1">Seleccionar</span>
                        </label>
                      </Campo>

                      <div>
                        <label className="flex items-start gap-3 rounded-xl border border-outline bg-surface-1/60 px-4 py-3.5">
                          <input
                            id="campo-consentimiento"
                            type="checkbox"
                            checked={form.consentimiento}
                            onChange={set("consentimiento")}
                            className="mt-0.5 size-4 shrink-0 accent-[var(--color-accent)]"
                          />
                          <span className="text-small text-text-1">
                            Acepto que Fleximy use estos datos para responder mi consulta y preparar
                            la conversación, según su política de privacidad.{" "}
                            <span className="text-text-3" aria-hidden="true">*</span>
                          </span>
                        </label>
                        {errores.consentimiento && (
                          <p role="alert" className="mt-1.5 text-small font-medium text-error">
                            {errores.consentimiento}
                          </p>
                        )}
                        <p className="mt-3 max-w-[56ch] font-mono text-micro text-text-3">
                          Usaremos estos datos para responder tu consulta y preparar la conversación.
                          No compartimos tu información con terceros con fines publicitarios.
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                {paso > 1 ? (
                  <Button type="button" variant="text" onClick={atras}>
                    <ArrowLeft className="size-4" />
                    Volver
                  </Button>
                ) : (
                  <span />
                )}
                {paso < TOTAL_STEPS ? (
                  <Button type="button" onClick={siguiente} size="lg">
                    Continuar
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button type="submit" size="lg" disabled={enviando} className="disabled:cursor-not-allowed disabled:opacity-60">
                    {enviando ? "Enviando…" : "Solicitar diagnóstico"}
                    <Check className="size-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>

          <aside>
            <div className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
              <p className="font-mono text-micro text-text-3">resumen del diagnóstico</p>
              {resumenVisible ? (
                <>
                  {form.rubro && (
                    <p className="mt-4 text-h4 text-text-1">
                      Rubro: <span className="text-text-2">{form.rubro}</span>
                    </p>
                  )}
                  {form.necesidad && (
                    <p className="mt-2 text-h4 text-text-1">
                      Necesidad: <span className="text-text-2">{form.necesidad}</span>
                    </p>
                  )}
                  {form.personas && (
                    <p className="mt-2 text-h4 text-text-1">
                      Usuarios: <span className="text-text-2">{form.personas}</span>
                    </p>
                  )}
                  {modulosPosibles.length > 0 && (
                    <div className="mt-5 border-t border-outline pt-5">
                      <p className="font-mono text-micro text-text-3">módulos posibles</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {modulosPosibles.map((m) => (
                          <li key={m} className="rounded-full border border-outline bg-surface-2/50 px-3 py-1.5 text-small text-text-1">
                            {m}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 font-mono text-micro text-text-3">
                        orientación inicial · no es una propuesta definitiva
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-3 text-small text-text-2">
                  A medida que completás los pasos, este panel muestra cómo se arma tu diagnóstico.
                </p>
              )}
            </div>

            <div className="mt-6 rounded-[var(--radius-card)] border border-outline bg-surface-2/40 p-6">
              <p className="font-mono text-micro text-text-3">expectativas</p>
              <ul className="mt-4 grid gap-2.5">
                {EXPECTATIVAS.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-small text-text-2">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-cyan/60" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-outline bg-surface-2/40 py-20 lg:py-28">
        <div className="container-site">
          <p className="kicker">Qué sucede después</p>
          <h2 className="text-h2 mt-4 max-w-[16ch] text-text-1">De la solicitud a una primera versión</h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {PASOS_DESPUES.map((paso) => (
              <li key={paso.n} className="rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 lg:p-8">
                <span className="font-mono text-micro text-text-3">paso {paso.n}</span>
                <h3 className="text-h3 mt-3 text-text-1">{paso.titulo}</h3>
                <p className="mt-3 text-small text-text-2">{paso.texto}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 transition-colors hover:border-primary/40"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-on">
                <MessageCircle className="size-5" />
              </span>
              <span>
                <span className="block text-small font-semibold text-text-1">WhatsApp</span>
                <span className="block text-small text-text-2">Para una consulta rápida</span>
              </span>
            </a>
            <div className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <CalendarDays className="size-5" />
              </span>
              <span>
                <span className="block text-small font-semibold text-text-1">Reunión de 20 minutos</span>
                <span className="block text-small text-text-2">Agenda por WhatsApp o email</span>
              </span>
            </div>
            <a
              href="mailto:[EMAIL COMERCIAL REAL]"
              className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-outline bg-surface-1/60 p-6 transition-colors hover:border-primary/40"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-surface-3/60 text-text-1">
                <Mail className="size-5" />
              </span>
              <span>
                <span className="block text-small font-semibold text-text-1">Email</span>
                <span className="block text-small text-text-2">[EMAIL COMERCIAL REAL]</span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
